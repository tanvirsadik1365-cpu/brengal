import { NextResponse, type NextRequest } from "next/server";
import { listMerchantReservations } from "@/lib/database-reservations";
import {
  isMerchantAuthConfigured,
  isMerchantRequestAuthorized,
} from "@/lib/merchant-auth";

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
  if (!isMerchantAuthConfigured()) {
    return jsonResponse(
      {
        error:
          "Set MERCHANT_DASHBOARD_TOKEN in the environment, then restart the app.",
      },
      503,
    );
  }

  if (!isMerchantRequestAuthorized(request)) {
    return jsonResponse({ error: "Merchant session is invalid." }, 401);
  }

  try {
    const reservations = await listMerchantReservations();

    return jsonResponse({ reservations });
  } catch (error) {
    console.error(error);

    return jsonResponse({ error: "Reservations could not be loaded." }, 502);
  }
}
