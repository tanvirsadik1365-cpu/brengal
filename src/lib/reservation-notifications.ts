import { restaurant } from "@/lib/restaurant";
import type { ValidatedReservation } from "@/lib/reservation-validation";

type ReservationNotification = {
  reference: string;
  reservation: ValidatedReservation;
};

type ResendEmailResponse = {
  id?: string;
  message?: string;
  name?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatReservationDate(value: string) {
  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeZone: "Europe/London",
  }).format(date);
}

function getRecipients() {
  const configuredRecipients =
    process.env.BOOKING_EMAIL_TO?.trim() || restaurant.bookingEmail;

  return configuredRecipients
    .split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean);
}

function buildReservationEmailHtml({
  reference,
  reservation,
}: ReservationNotification) {
  const rows = [
    ["Reference", reference],
    ["Name", reservation.name],
    ["Phone", reservation.normalizedPhone || reservation.phone],
    ["Customer email", reservation.email],
    ["Date", formatReservationDate(reservation.date)],
    ["Time", reservation.time],
    [
      "Guests",
      `${reservation.guests} ${
        reservation.guests === 1 ? "guest" : "guests"
      }`,
    ],
    ["Occasion", reservation.occasion || "Not provided"],
    ["Special requests", reservation.requests || "Not provided"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#211A18;line-height:1.6">
      <h1 style="color:#7F2F2A">New booking request</h1>
      <p>A new table booking request has been submitted from ${escapeHtml(
        restaurant.website,
      )}.</p>
      <table style="border-collapse:collapse;width:100%;max-width:720px">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <th style="border:1px solid #E8DDD8;background:#F8F1EE;padding:10px;text-align:left;width:180px">${escapeHtml(
                    label,
                  )}</th>
                  <td style="border:1px solid #E8DDD8;padding:10px">${escapeHtml(
                    value,
                  )}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <p style="margin-top:18px">Reply to this email to contact the customer directly.</p>
    </div>
  `;
}

function buildReservationEmailText({
  reference,
  reservation,
}: ReservationNotification) {
  return [
    "New booking request",
    "",
    `Reference: ${reference}`,
    `Name: ${reservation.name}`,
    `Phone: ${reservation.normalizedPhone || reservation.phone}`,
    `Customer email: ${reservation.email}`,
    `Date: ${formatReservationDate(reservation.date)}`,
    `Time: ${reservation.time}`,
    `Guests: ${reservation.guests} ${
      reservation.guests === 1 ? "guest" : "guests"
    }`,
    `Occasion: ${reservation.occasion || "Not provided"}`,
    `Special requests: ${reservation.requests || "Not provided"}`,
    "",
    "Reply to this email to contact the customer directly.",
  ].join("\n");
}

export async function sendReservationNotificationEmail(
  notification: ReservationNotification,
) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.BOOKING_EMAIL_FROM?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    process.env.ORDER_EMAIL_FROM?.trim();
  const to = getRecipients();

  if (!apiKey || !from || to.length === 0) {
    return {
      sent: false,
      skippedReason:
        "Reservation email skipped because RESEND_API_KEY, BOOKING_EMAIL_FROM/RESEND_FROM_EMAIL, or BOOKING_EMAIL_TO is missing.",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    body: JSON.stringify({
      from,
      html: buildReservationEmailHtml(notification),
      reply_to:
        process.env.BOOKING_EMAIL_REPLY_TO?.trim() ||
        notification.reservation.email,
      subject: `New ${restaurant.shortName} booking request ${notification.reference}`,
      text: buildReservationEmailText(notification),
      to,
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const payload = (await response.json().catch(() => ({}))) as
    ResendEmailResponse;

  if (!response.ok) {
    throw new Error(
      payload.message ||
        payload.name ||
        "Reservation notification email could not be sent.",
    );
  }

  return {
    id: payload.id ?? "",
    sent: true,
  };
}
