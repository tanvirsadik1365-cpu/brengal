import { NextResponse, type NextRequest } from "next/server";
import { findCustomerOrderTracking } from "@/lib/order-tracking";

export const runtime = "nodejs";

function badRequest(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

function clean(value: unknown, maxLength = 180) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | Record<string, unknown>
    | null;
  const orderNumber = clean(body?.orderNumber, 120);
  const contact = clean(body?.contact, 180);

  if (!orderNumber || !contact) {
    return badRequest("Enter your order number and phone or email.", 422);
  }

  try {
    const tracking = await findCustomerOrderTracking({
      contact,
      orderNumber,
    });

    if (!tracking) {
      return badRequest(
        "Order could not be found. Check the order number and phone or email.",
        404,
      );
    }

    return NextResponse.json({ tracking });
  } catch (error) {
    console.error(error);

    return badRequest(
      error instanceof Error && error.message.includes("Supabase is not configured")
        ? "Order tracking is not configured yet."
        : "Order tracking could not load. Please try again.",
      502,
    );
  }
}
