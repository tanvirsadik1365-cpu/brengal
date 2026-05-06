import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { markDatabaseOrderPaidFromStripe } from "@/lib/database-orders";

export const runtime = "nodejs";

function getPaymentIntentId(value: Stripe.Checkout.Session["payment_intent"]) {
  if (typeof value === "string") {
    return value;
  }

  return value?.id ?? null;
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") {
    return;
  }

  const metadata = session.metadata ?? {};

  await markDatabaseOrderPaidFromStripe({
    databaseOrderId: metadata.database_order_id,
    orderNumber: metadata.order_number ?? session.client_reference_id,
    stripePaymentIntentId: getPaymentIntentId(session.payment_intent),
    stripeSessionId: session.id,
  });
}

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!secretKey || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured." },
      { status: 503 },
    );
  }

  if (!signature) {
    return NextResponse.json(
      { error: "Stripe webhook signature is missing." },
      { status: 400 },
    );
  }

  const stripe = new Stripe(secretKey);
  const body = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json(
      { error: "Stripe webhook signature is invalid." },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    try {
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
    } catch (error) {
      console.error(error);
    }
  }

  return NextResponse.json({ received: true });
}
