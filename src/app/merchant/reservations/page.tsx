import type { Metadata } from "next";
import { CalendarCheck, LockKeyhole, Phone, Users } from "lucide-react";
import {
  listMerchantReservations,
  type ReservationRow,
} from "@/lib/database-reservations";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Merchant Reservations",
  description: "Merchant view of Jamal's Indian Restaurant table reservations.",
};

type MerchantReservationsPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(new Date(`${value}T00:00:00`));
}

function MerchantGate({
  message,
}: {
  message: string;
}) {
  return (
    <main className="bg-white px-4 py-16 text-[#241D1D] sm:px-6 lg:px-8">
      <section className="restaurant-card mx-auto max-w-2xl rounded-lg p-8 text-center">
        <LockKeyhole className="mx-auto text-[#8A3430]" size={44} aria-hidden="true" />
        <h1 className="mt-5 text-3xl font-black">Merchant access needed</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#6B5D5B]">
          {message}
        </p>
      </section>
    </main>
  );
}

function ReservationCard({ reservation }: { reservation: ReservationRow }) {
  return (
    <article className="rounded-lg border border-[#E4D6C4] bg-[#FFFCF6] p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8A3430]">
            {reservation.reservation_reference}
          </p>
          <h2 className="mt-2 text-2xl font-black">
            {formatDate(reservation.reservation_date)} at{" "}
            {reservation.reservation_time}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6B5D5B]">
            Requested by {reservation.guest_name}
          </p>
        </div>
        <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-[#8A3430]">
          {reservation.status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm leading-6 text-[#6B5D5B] sm:grid-cols-3">
        <p className="flex gap-2">
          <Users className="mt-0.5 shrink-0 text-[#8A3430]" size={17} aria-hidden="true" />
          {reservation.guests} {reservation.guests === 1 ? "guest" : "guests"}
        </p>
        <p className="break-all">{reservation.guest_email}</p>
        <p className="flex gap-2">
          <Phone className="mt-0.5 shrink-0 text-[#8A3430]" size={17} aria-hidden="true" />
          <a href={`tel:${reservation.guest_phone}`}>{reservation.guest_phone}</a>
        </p>
      </div>

      {reservation.occasion || reservation.special_requests ? (
        <div className="mt-5 rounded-lg bg-white p-4 text-sm leading-6 text-[#6B5D5B]">
          {reservation.occasion ? (
            <p>
              <span className="font-black text-[#241D1D]">Occasion:</span>{" "}
              {reservation.occasion}
            </p>
          ) : null}
          {reservation.special_requests ? (
            <p className="mt-2">
              <span className="font-black text-[#241D1D]">Notes:</span>{" "}
              {reservation.special_requests}
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export default async function MerchantReservationsPage({
  searchParams,
}: MerchantReservationsPageProps) {
  const params = await searchParams;
  const expectedToken = process.env.MERCHANT_DASHBOARD_TOKEN?.trim();

  if (!expectedToken) {
    return (
      <MerchantGate message="Set MERCHANT_DASHBOARD_TOKEN in the environment, restart the app, then open this page with ?token=your-token." />
    );
  }

  if (params.token !== expectedToken) {
    return (
      <MerchantGate message="Open this merchant page with the correct dashboard token." />
    );
  }

  let reservations: ReservationRow[] = [];
  let loadError = "";

  try {
    reservations = await listMerchantReservations();
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Reservations could not be loaded.";
  }

  return (
    <main className="bg-white px-4 py-10 text-[#241D1D] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#8A3430]">
              Merchant App
            </p>
            <h1 className="mt-2 text-4xl font-black">Table reservations</h1>
            <p className="mt-3 text-sm leading-7 text-[#6B5D5B]">
              New website booking requests are stored in Supabase and shown here
              for the restaurant team.
            </p>
          </div>
          <div className="restaurant-card rounded-lg px-5 py-4">
            <p className="text-3xl font-black text-[#8A3430]">
              {reservations.length}
            </p>
            <p className="text-sm font-black text-[#6B5D5B]">loaded requests</p>
          </div>
        </div>

        {loadError ? (
          <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-5 text-sm font-black leading-6 text-red-900">
            {loadError}
          </div>
        ) : null}

        <div className="mt-8 grid gap-4">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
              />
            ))
          ) : (
            <div className="restaurant-card rounded-lg p-8 text-center">
              <CalendarCheck className="mx-auto text-[#8A3430]" size={42} aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-black">No reservations yet</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#6B5D5B]">
                Customer booking requests will appear here as soon as they are
                submitted from the booking page.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
