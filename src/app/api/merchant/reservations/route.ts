import { NextResponse, type NextRequest } from "next/server";
import { listMerchantReservations } from "@/lib/database-reservations";

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

  try {
    const reservations = await listMerchantReservations();

    return jsonResponse({ reservations });
  } catch (error) {
    console.error(error);

    return jsonResponse({ error: "Reservations could not be loaded." }, 502);
  }
}
