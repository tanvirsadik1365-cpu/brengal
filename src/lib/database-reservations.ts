import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { ValidatedReservation } from "@/lib/reservation-validation";

export type ReservationUser = {
  email?: string | null;
  id: string;
};

export type PersistedReservation = {
  id: string;
  reference: string;
};

export type ReservationRow = {
  created_at: string;
  guest_email: string;
  guest_name: string;
  guest_phone: string;
  guests: number;
  id: string;
  occasion: string | null;
  reservation_date: string;
  reservation_reference: string;
  reservation_time: string;
  special_requests: string | null;
  status: string;
};

type DbError = {
  message: string;
};

function getDbErrorMessage(action: string, error?: DbError | null) {
  return `${action}: ${error?.message ?? "Unknown database error."}`;
}

function getRestaurantId() {
  return process.env.RESTAURANT_ID?.trim() || "bengal-restaurant";
}

function createReservationReference() {
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `BENGAL-RES-${Date.now()}-${suffix}`;
}

export async function getRequestUser(accessToken?: string | null) {
  if (!accessToken) {
    return null;
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user) {
    return null;
  }

  return {
    email: data.user.email,
    id: data.user.id,
  } satisfies ReservationUser;
}

export async function saveCustomerProfile({
  email,
  name,
  phone,
}: {
  email: string;
  name: string;
  phone: string;
}) {
  const supabase = getSupabaseAdmin();
  const normalizedEmail = email.trim().toLowerCase();

  const { data: existingCustomer, error: selectError } = await supabase
    .from("customers")
    .select("id")
    .eq("email", normalizedEmail)
    .limit(1)
    .maybeSingle();

  if (selectError) {
    throw new Error(
      getDbErrorMessage("Customer profile could not be loaded", selectError),
    );
  }

  if (existingCustomer) {
    const { error } = await supabase
      .from("customers")
      .update({
        email: normalizedEmail,
        name,
        phone,
      })
      .eq("id", existingCustomer.id);

    if (error) {
      throw new Error(
        getDbErrorMessage("Customer profile could not be updated", error),
      );
    }

    return existingCustomer.id as string;
  }

  const { data: customer, error } = await supabase
    .from("customers")
    .insert({
      email: normalizedEmail,
      name,
      phone,
    })
    .select("id")
    .single();

  if (error || !customer) {
    throw new Error(
      getDbErrorMessage("Customer profile could not be saved", error),
    );
  }

  return customer.id as string;
}

export async function createDatabaseReservation(
  reservation: ValidatedReservation,
  user?: ReservationUser | null,
): Promise<PersistedReservation> {
  const supabase = getSupabaseAdmin();
  const customerId = await saveCustomerProfile({
    email: reservation.email,
    name: reservation.name,
    phone: reservation.normalizedPhone,
  });
  const reference = createReservationReference();

  const { data, error } = await supabase
    .from("reservations")
    .insert({
      customer_auth_user_id: user?.id ?? null,
      customer_id: customerId,
      guest_email: reservation.email,
      guest_name: reservation.name,
      guest_phone: reservation.normalizedPhone,
      guests: reservation.guests,
      occasion: reservation.occasion || null,
      reservation_date: reservation.date,
      reservation_reference: reference,
      reservation_time: reservation.time,
      restaurant_id: getRestaurantId(),
      source: "website",
      special_requests: reservation.requests || null,
      status: "new",
    })
    .select("id, reservation_reference")
    .single();

  if (error || !data) {
    throw new Error(
      getDbErrorMessage("Reservation could not be saved", error),
    );
  }

  return {
    id: data.id as string,
    reference: data.reservation_reference as string,
  };
}

export async function listCustomerReservations(user: ReservationUser) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("reservations")
    .select(
      "id, reservation_reference, reservation_date, reservation_time, guests, guest_name, guest_email, guest_phone, occasion, special_requests, status, created_at",
    )
    .eq("customer_auth_user_id", user.id)
    .order("reservation_date", { ascending: false })
    .order("reservation_time", { ascending: false })
    .limit(25);

  if (error) {
    throw new Error(
      getDbErrorMessage("Customer reservations could not be loaded", error),
    );
  }

  return (data ?? []) as ReservationRow[];
}

export async function listMerchantReservations() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("reservations")
    .select(
      "id, reservation_reference, reservation_date, reservation_time, guests, guest_name, guest_email, guest_phone, occasion, special_requests, status, created_at",
    )
    .eq("restaurant_id", getRestaurantId())
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    throw new Error(
      getDbErrorMessage("Merchant reservations could not be loaded", error),
    );
  }

  return (data ?? []) as ReservationRow[];
}
