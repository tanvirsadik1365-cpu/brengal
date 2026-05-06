import { NextResponse, type NextRequest } from "next/server";
import {
  getRequestUser,
  listCustomerReservations,
} from "@/lib/database-reservations";

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

export async function GET(request: NextRequest) {
  try {
    const user = await getRequestUser(getBearerToken(request));

    if (!user) {
      return badRequest("Sign in to view reservations.", 401);
    }

    const reservations = await listCustomerReservations(user);

    return NextResponse.json({ reservations });
  } catch (error) {
    console.error(error);

    return badRequest(
      error instanceof Error && error.message.includes("Supabase is not configured")
        ? "Database is not configured. Add the Supabase environment variables and restart the app."
        : "Reservations could not be loaded.",
      502,
    );
  }
}
