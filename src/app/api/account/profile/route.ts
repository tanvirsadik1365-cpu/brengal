import { NextResponse, type NextRequest } from "next/server";
import { getRequestUser, saveCustomerProfile } from "@/lib/database-reservations";
import { isValidGbPhone, normalizeGbPhone } from "@/lib/order";

export const runtime = "nodejs";

function badRequest(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

function clean(value: unknown, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getBearerToken(request: NextRequest) {
  const authorization = request.headers.get("authorization") ?? "";

  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return null;
  }

  return authorization.slice(7).trim();
}

export async function POST(request: NextRequest) {
  try {
    const user = await getRequestUser(getBearerToken(request));

    if (!user?.email) {
      return badRequest("Sign in before saving customer details.", 401);
    }

    const body = await request.json().catch(() => null);
    const name = clean(body?.name, 120);
    const phone = clean(body?.phone, 40);

    if (name.length < 2) {
      return badRequest("Full name is required.");
    }

    if (!isValidGbPhone(phone)) {
      return badRequest("A valid UK phone number is required.");
    }

    const customerId = await saveCustomerProfile({
      email: user.email,
      name,
      phone: normalizeGbPhone(phone),
    });

    return NextResponse.json({ customerId });
  } catch (error) {
    console.error(error);

    return badRequest("Customer details could not be saved.", 502);
  }
}
