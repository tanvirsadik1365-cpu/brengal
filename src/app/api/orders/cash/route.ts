import { NextResponse, type NextRequest } from "next/server";
import { createDatabaseOrder } from "@/lib/database-orders";
import { getRequestUser } from "@/lib/database-reservations";
import { validateOrderPayload } from "@/lib/order-validation";
import { getPublicStoreStatus } from "@/lib/store-status";

export const runtime = "nodejs";

function badRequest(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

function getBearerToken(request: NextRequest) {
  const authorization = request.headers.get("authorization") ?? "";

  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return null;
  }

  return authorization.slice(7).trim();
}

export async function POST(request: NextRequest) {
  const validation = validateOrderPayload(
    await request.json().catch(() => null),
  );

  if (!validation.ok) {
    return badRequest(validation.error, validation.status);
  }

  const { order } = validation;
  const storeStatus = await getPublicStoreStatus();

  if (!storeStatus.orderingAllowed) {
    return badRequest(storeStatus.message, 423);
  }

  try {
    const user = await getRequestUser(getBearerToken(request));
    const databaseOrder = await createDatabaseOrder(order, "cash", user, {
      prepTimeMinutes: storeStatus.prepTimeMinutes,
    });

    return NextResponse.json({
      databaseOrderId: databaseOrder.id,
      orderId: databaseOrder.orderNumber,
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Error &&
      error.message.includes("Supabase is not configured")
    ) {
      return badRequest(
        "Database is not configured. Add the Supabase environment variables, restart the app, then try the cash order again.",
        503,
      );
    }

    return badRequest(
      "Cash order could not be saved to the database. Check the Supabase project and table setup.",
      502,
    );
  }
}
