import { NextResponse, type NextRequest } from "next/server";
import {
  isValidMerchantOrderDate,
  listMerchantOrders,
  updateMerchantOrderStatus,
} from "@/lib/database-orders";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = {
  "Cache-Control": "no-store",
};

function jsonResponse(body: unknown, status = 200) {
  return NextResponse.json(body, {
    headers: noStoreHeaders,
    status,
  });
}

export async function GET(request: NextRequest) {
  const tokenError = validateMerchantToken(request);

  if (tokenError) {
    return tokenError;
  }

  const orderDate = request.nextUrl.searchParams.get("date")?.trim() || "";

  if (orderDate && !isValidMerchantOrderDate(orderDate)) {
    return jsonResponse({ error: "Choose a valid order date." }, 400);
  }

  try {
    const orders = await listMerchantOrders({ orderDate });

    return jsonResponse({ orders });
  } catch (error) {
    console.error(error);

    return jsonResponse({ error: "Orders could not be loaded." }, 502);
  }
}

function validateMerchantToken(request: NextRequest) {
  const expectedToken = process.env.MERCHANT_DASHBOARD_TOKEN?.trim();

  if (!expectedToken) {
    return jsonResponse(
      {
        error:
          "Set MERCHANT_DASHBOARD_TOKEN in the environment, then restart the app.",
      },
      503,
    );
  }

  const token = request.nextUrl.searchParams.get("token")?.trim();

  if (token !== expectedToken) {
    return jsonResponse({ error: "Merchant access token is invalid." }, 401);
  }

  return null;
}

function clean(value: unknown, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function PATCH(request: NextRequest) {
  const tokenError = validateMerchantToken(request);

  if (tokenError) {
    return tokenError;
  }

  const body = (await request.json().catch(() => null)) as
    | Record<string, unknown>
    | null;
  const orderId = clean(body?.orderId, 120);
  const status = clean(body?.status, 40);
  const note = clean(body?.note, 500);

  if (!orderId || !status) {
    return jsonResponse({ error: "Choose an order and status." }, 422);
  }

  try {
    const order = await updateMerchantOrderStatus({
      note,
      orderId,
      status,
    });

    return jsonResponse({ order });
  } catch (error) {
    console.error(error);

    return jsonResponse(
      {
        error:
          error instanceof Error
            ? error.message
            : "Order status could not be updated.",
      },
      422,
    );
  }
}
