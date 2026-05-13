import type { NextRequest } from "next/server";
import {
  createDatabaseReservation,
  getRequestUser,
} from "@/lib/database-reservations";
import {
  jsonResponse,
  rateLimitRequest,
  rejectDisallowedOrigin,
  rejectSpamSubmission,
} from "@/lib/request-protection";
import { sendReservationNotificationEmail } from "@/lib/reservation-notifications";
import { validateReservationPayload } from "@/lib/reservation-validation";

export const runtime = "nodejs";

function badRequest(error: string, status = 400) {
  return jsonResponse({ error }, status);
}

function getBearerToken(request: NextRequest) {
  const authorization = request.headers.get("authorization") ?? "";

  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return null;
  }

  return authorization.slice(7).trim();
}

export async function POST(request: NextRequest) {
  const originError = rejectDisallowedOrigin(request);

  if (originError) {
    return originError;
  }

  const rateLimitError = rateLimitRequest(request, {
    key: "reservation-post",
    limit: 8,
    windowMs: 10 * 60 * 1000,
  });

  if (rateLimitError) {
    return rateLimitError;
  }

  const body = await request.json().catch(() => null);
  const spamError = rejectSpamSubmission(body);

  if (spamError) {
    return spamError;
  }

  const validation = validateReservationPayload(body);

  if (!validation.ok) {
    return badRequest(validation.error, validation.status);
  }

  try {
    const user = await getRequestUser(getBearerToken(request));
    const reservation = await createDatabaseReservation(
      validation.reservation,
      user,
    );

    try {
      const emailResult = await sendReservationNotificationEmail({
        reference: reservation.reference,
        reservation: validation.reservation,
      });

      if (!emailResult.sent && emailResult.skippedReason) {
        console.warn(emailResult.skippedReason);
      }
    } catch (emailError) {
      console.error("Reservation notification email could not be sent.", emailError);
    }

    return jsonResponse({
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
