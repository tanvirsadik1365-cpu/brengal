import { isValidGbPhone, normalizeGbPhone } from "@/lib/order";

export const reservationTimes = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

export type ReservationPayload = {
  date?: string;
  email?: string;
  guests?: number | string;
  name?: string;
  occasion?: string;
  phone?: string;
  requests?: string;
  time?: string;
};

export type ValidatedReservation = {
  date: string;
  email: string;
  guests: number;
  name: string;
  normalizedPhone: string;
  occasion: string;
  phone: string;
  requests: string;
  time: string;
};

export type ReservationValidationResult =
  | {
      ok: true;
      reservation: ValidatedReservation;
    }
  | {
      error: string;
      ok: false;
      status?: number;
    };

function clean(value: unknown, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidReservationDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    return false;
  }

  const today = new Date();
  const todayUtc = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );

  return date >= todayUtc;
}

export function parseReservationPayload(
  value: unknown,
): ReservationPayload | null {
  if (!isRecord(value)) {
    return null;
  }

  return {
    date: clean(value.date, 20),
    email: clean(value.email, 180).toLowerCase(),
    guests: Number(value.guests),
    name: clean(value.name, 120),
    occasion: clean(value.occasion, 120),
    phone: clean(value.phone, 40),
    requests: clean(value.requests, 700),
    time: clean(value.time, 20),
  };
}

export function validateReservationPayload(
  value: unknown,
): ReservationValidationResult {
  const payload = parseReservationPayload(value);

  if (!payload) {
    return { error: "Reservation details are invalid.", ok: false };
  }

  const date = payload.date ?? "";
  const email = payload.email ?? "";
  const guests = Number(payload.guests);
  const name = payload.name ?? "";
  const occasion = payload.occasion ?? "";
  const phone = payload.phone ?? "";
  const requests = payload.requests ?? "";
  const time = payload.time ?? "";

  if (name.length < 2) {
    return { error: "Full name is required.", ok: false };
  }

  if (!isValidEmail(email)) {
    return { error: "A valid email address is required.", ok: false };
  }

  if (!isValidGbPhone(phone)) {
    return { error: "A valid UK phone number is required.", ok: false };
  }

  if (!isValidReservationDate(date)) {
    return {
      error: "Choose a valid reservation date from today onwards.",
      ok: false,
    };
  }

  if (!reservationTimes.includes(time)) {
    return { error: "Choose a valid reservation time.", ok: false };
  }

  if (!Number.isInteger(guests) || guests < 1 || guests > 200) {
    return { error: "Guest count must be between 1 and 200.", ok: false };
  }

  return {
    ok: true,
    reservation: {
      date,
      email,
      guests,
      name,
      normalizedPhone: normalizeGbPhone(phone),
      occasion,
      phone,
      requests,
      time,
    },
  };
}
