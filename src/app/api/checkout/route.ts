import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { toPence } from "@/lib/order";
import { restaurant } from "@/lib/restaurant";
import { validateOrderPayload } from "@/lib/order-validation";
import {
  createDatabaseOrder,
  markDatabaseOrderPaymentFailed,
  updateStripeCheckoutSession,
  type PersistedOrder,
} from "@/lib/database-orders";
import { getRequestUser } from "@/lib/database-reservations";
import { getPublicStoreStatus } from "@/lib/store-status";

export const runtime = "nodejs";

function badRequest(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

function getRequestOrigin(request: NextRequest) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    request.headers.get("origin") ??
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

function getBearerToken(request: NextRequest) {
  const authorization = request.headers.get("authorization") ?? "";

  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return null;
  }

  return authorization.slice(7).trim();
}

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return badRequest(
      "Stripe is not configured. Add STRIPE_SECRET_KEY to the frontend environment.",
      503,
    );
  }

  const validation = validateOrderPayload(
    await request.json().catch(() => null),
  );

  if (!validation.ok) {
    return badRequest(validation.error, validation.status);
  }

  const {
    cartItems,
    collectionDiscount,
    customer,
    customerMode,
    orderType,
    reward,
    selectedSideDish,
    subtotal,
    total,
  } = validation.order;
  const storeStatus = await getPublicStoreStatus();

  if (!storeStatus.orderingAllowed) {
    return badRequest(storeStatus.message, 423);
  }

  const stripe = new Stripe(secretKey);
  type SessionCreateParams = NonNullable<
    Parameters<typeof stripe.checkout.sessions.create>[0]
  >;
  const lineItems: NonNullable<SessionCreateParams["line_items"]> =
    cartItems.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
          metadata: {
            category: item.category,
            menu_item_id: item.id,
          },
        },
        unit_amount: toPence(item.unitPrice),
      },
      quantity: item.quantity,
    }));

  if (reward.type === "onion-bhaji" || reward.type === "combo") {
    lineItems.push({
      price_data: {
        currency: "gbp",
        product_data: {
          name: "Free Onion Bhaji",
          metadata: {
            reward: reward.type,
          },
        },
        unit_amount: 0,
      },
      quantity: 1,
    });
  }

  if (selectedSideDish) {
    lineItems.push({
      price_data: {
        currency: "gbp",
        product_data: {
          name: `Free Side Dish - ${selectedSideDish.name}`,
          metadata: {
            menu_item_id: selectedSideDish.id,
            reward: reward.type,
          },
        },
        unit_amount: 0,
      },
      quantity: 1,
    });
  }

  const discounts: NonNullable<SessionCreateParams["discounts"]> = [];

  if (collectionDiscount > 0) {
    if (process.env.STRIPE_COLLECTION_COUPON_ID) {
      discounts.push({ coupon: process.env.STRIPE_COLLECTION_COUPON_ID });
    } else {
      const coupon = await stripe.coupons.create({
        duration: "once",
        name: "Jamal's 10% collection discount",
        percent_off: 10,
      });
      discounts.push({ coupon: coupon.id });
    }
  }

  const origin = getRequestOrigin(request);
  let databaseOrder: PersistedOrder;

  try {
    const user = await getRequestUser(getBearerToken(request));

    databaseOrder = await createDatabaseOrder(validation.order, "online", user, {
      prepTimeMinutes: storeStatus.prepTimeMinutes,
    });
  } catch (error) {
    console.error(error);

    return badRequest(
      error instanceof Error &&
        error.message.includes("Supabase is not configured")
        ? "Database is not configured. Add the Supabase environment variables and restart the app."
        : "Order could not be saved to the database.",
      503,
    );
  }

  const metadata = {
    cart_lines: JSON.stringify(
      cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    ).slice(0, 450),
    customer_mode: customerMode,
    customer_name: customer.name,
    customer_phone: customer.normalizedPhone,
    database_order_id: databaseOrder.id,
    delivery_address:
      orderType === "delivery" ? customer.address.slice(0, 450) : "",
    delivery_postcode: orderType === "delivery" ? customer.postcode : "",
    notes: customer.notes.slice(0, 450),
    order_number: databaseOrder.orderNumber,
    order_type: orderType,
    payment_method: "online",
    reward_type: reward.type,
    reward_title: reward.title,
    selected_side_dish: selectedSideDish?.name ?? "",
    subtotal: toPence(subtotal).toString(),
    total: toPence(total).toString(),
  };

  let session: Stripe.Checkout.Session;

  try {
    session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      cancel_url: `${origin}/checkout/cancel`,
      client_reference_id: databaseOrder.orderNumber,
      customer_email: customer.email,
      line_items: lineItems,
      metadata,
      mode: "payment",
      payment_intent_data: {
        description: `${restaurant.name} ${orderType} order`,
        metadata,
      },
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${encodeURIComponent(
        databaseOrder.orderNumber,
      )}`,
    });
  } catch (error) {
    console.error(error);
    await markDatabaseOrderPaymentFailed(
      databaseOrder.id,
      "Stripe checkout could not be created.",
    ).catch(console.error);

    return badRequest("Payment could not be started.", 502);
  }

  if (!session.url) {
    await markDatabaseOrderPaymentFailed(
      databaseOrder.id,
      "Stripe did not return a Checkout URL.",
    ).catch(console.error);

    return badRequest("Stripe did not return a Checkout URL.", 502);
  }

  try {
    await updateStripeCheckoutSession(databaseOrder.id, session.id);
  } catch (error) {
    console.error(error);

    return badRequest("Stripe session could not be saved to the database.", 502);
  }

  return NextResponse.json({
    orderId: databaseOrder.orderNumber,
    url: session.url,
  });
}
