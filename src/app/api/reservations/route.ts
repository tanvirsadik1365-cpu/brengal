import { NextResponse, type NextRequest } from "next/server";
import {
  createDatabaseReservation,
  getRequestUser,
} from "@/lib/database-reservations";
import { validateReservationPayload } from "@/lib/reservation-validation";

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
  const validation = validateReservationPayload(
    await request.json().catch(() => null),
  );

  if (!validation.ok) {
    return badRequest(validation.error, validation.status);
  }

  try {
    const user = await getRequestUser(getBearerToken(request));
    const reservation = await createDatabaseReservation(
      validation.reservation,
      user,
    );

    return NextResponse.json({
      reservationId: reservation.id,
      reservationReference: reservation.reference,
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Error &&
      error.message.includes("Supabase is not configured")
    ) {
      return badRequest(
        "Database is not configured. Add the Supabase environment variables, restart the app, then try booking again.",
        503,
      );
    }

    return badRequest(
      "Reservation could not be saved. Check the Supabase reservations table setup.",
      502,
    );
  }
}
