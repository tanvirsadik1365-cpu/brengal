import { NextResponse, type NextRequest } from "next/server";
import {
  getMerchantStoreStatus,
  updateMerchantStoreStatus,
} from "@/lib/store-status";

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

function cleanString(value: unknown, maxLength = 80) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);

    return Number.isFinite(parsed) ? parsed : Number.NaN;
  }

  return Number.NaN;
}

export async function GET(request: NextRequest) {
  const tokenError = validateMerchantToken(request);

  if (tokenError) {
    return tokenError;
  }

  try {
    const storeStatus = await getMerchantStoreStatus();

    return jsonResponse({ storeStatus });
  } catch (error) {
    console.error(error);

    return jsonResponse(
      {
        error:
          error instanceof Error
            ? error.message
            : "Store status could not be loaded.",
      },
      502,
    );
  }
}

export async function PATCH(request: NextRequest) {
  const tokenError = validateMerchantToken(request);

  if (tokenError) {
    return tokenError;
  }

  const body = (await request.json().catch(() => null)) as
    | Record<string, unknown>
    | null;
  const status = cleanString(body?.status, 20);
  const prepTimeMinutes = cleanNumber(body?.prepTimeMinutes);
  const supportPhone = cleanString(body?.supportPhone, 80);

  if (!status || !Number.isFinite(prepTimeMinutes)) {
    return jsonResponse({ error: "Choose a status and prep time." }, 422);
  }

  try {
    const storeStatus = await updateMerchantStoreStatus({
      prepTimeMinutes,
      status,
      supportPhone,
    });

    return jsonResponse({ storeStatus });
  } catch (error) {
    console.error(error);

    return jsonResponse(
      {
        error:
          error instanceof Error
            ? error.message
            : "Store status could not be updated.",
      },
      422,
    );
  }
}
