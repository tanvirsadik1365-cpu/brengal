"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarCheck,
  Clock3,
  Phone,
  RefreshCw,
  ShoppingBag,
  Users,
} from "lucide-react";
import { MerchantAppClock } from "@/components/MerchantAppClock";
import { MerchantStoreStatusControl } from "@/components/MerchantStoreStatusControl";
import type { ReservationRow } from "@/lib/database-reservations";

type MerchantReservationsClientProps = {
  initialError?: string;
  initialReservations: ReservationRow[];
};

type ReservationsResponse = {
  error?: string;
  reservations?: ReservationRow[];
};

function MerchantNav() {
  return (
    <nav className="mt-5 flex flex-wrap gap-2">
      <Link
        href="/merchant/orders"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#8A3430]/20 bg-white px-4 text-sm font-black text-[#8A3430] transition hover:border-[#8A3430] hover:bg-[#FFF7EC]"
      >
        <ShoppingBag size={16} aria-hidden="true" />
        Orders
      </Link>
      <Link
        href="/merchant/reservations"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#8A3430] px-4 text-sm font-black text-white transition hover:bg-[#6F2926]"
      >
        <CalendarCheck size={16} aria-hidden="true" />
        Reservations
      </Link>
    </nav>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(new Date(`${value}T00:00:00`));
}

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
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
          <p className="mt-1 flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#8A3430]">
            <Clock3 size={15} aria-hidden="true" />
            Sent {formatDateTime(reservation.created_at)}
          </p>
        </div>
        <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-[#8A3430]">
          {reservation.status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm leading-6 text-[#6B5D5B] sm:grid-cols-3">
        <p className="flex gap-2">
          <Users
            className="mt-0.5 shrink-0 text-[#8A3430]"
            size={17}
            aria-hidden="true"
          />
          {reservation.guests} {reservation.guests === 1 ? "guest" : "guests"}
        </p>
        <p className="break-all">{reservation.guest_email}</p>
        <p className="flex gap-2">
          <Phone
            className="mt-0.5 shrink-0 text-[#8A3430]"
            size={17}
            aria-hidden="true"
          />
          <a href={`tel:${reservation.guest_phone}`}>
            {reservation.guest_phone}
          </a>
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

export function MerchantReservationsClient({
  initialError = "",
  initialReservations,
}: MerchantReservationsClientProps) {
  const [reservations, setReservations] = useState(initialReservations);
  const [loadError, setLoadError] = useState(initialError);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const reservationsUrl = useMemo(() => "/api/merchant/reservations", []);

  const refreshReservations = useCallback(
    async (signal?: AbortSignal) => {
      setRefreshing(true);

      try {
        const response = await fetch(reservationsUrl, {
          cache: "no-store",
          signal,
        });
        const result = (await response.json().catch(() => ({}))) as
          ReservationsResponse;

        if (!response.ok) {
          throw new Error(result.error ?? "Reservations could not be loaded.");
        }

        setReservations(result.reservations ?? []);
        setLoadError("");
        setLastUpdated(new Date());
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setLoadError(
          error instanceof Error
            ? error.message
            : "Reservations could not be loaded.",
        );
      } finally {
        if (!signal?.aborted) {
          setRefreshing(false);
        }
      }
    },
    [reservationsUrl],
  );

  useEffect(() => {
    const controller = new AbortController();

    void refreshReservations(controller.signal);
    const timer = window.setInterval(() => {
      void refreshReservations(controller.signal);
    }, 10000);

    return () => {
      controller.abort();
      window.clearInterval(timer);
    };
  }, [refreshReservations]);

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#8A3430]">
            Merchant App
          </p>
          <h1 className="mt-2 text-4xl font-black">Table reservations</h1>
          <p className="mt-3 text-sm leading-7 text-[#6B5D5B]">
            New website booking requests are stored in Supabase and shown here
            for the restaurant team.
          </p>
          <MerchantNav />
          <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-[#8A3430]">
            {lastUpdated ? `Last checked ${formatDateTime(lastUpdated.toISOString())}` : ""}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[360px]">
          <MerchantAppClock />
          <div className="restaurant-card rounded-lg px-5 py-4">
            <p className="text-3xl font-black text-[#8A3430]">
              {reservations.length}
            </p>
            <p className="text-sm font-black text-[#6B5D5B]">
              loaded requests
            </p>
          </div>
          <button
            type="button"
            onClick={() => void refreshReservations()}
            disabled={refreshing}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#8A3430] px-4 text-sm font-black text-white transition hover:bg-[#6F2926] disabled:opacity-60 sm:col-span-2"
          >
            <RefreshCw
              className={refreshing ? "animate-spin" : ""}
              size={16}
              aria-hidden="true"
            />
            {refreshing ? "Checking" : "Refresh"}
          </button>
        </div>
      </div>

      <div className="mt-8">
        <MerchantStoreStatusControl />
      </div>

      {loadError ? (
        <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-5 text-sm font-black leading-6 text-red-900">
          <div className="flex gap-2">
            <AlertCircle className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
            <p>{loadError}</p>
          </div>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))
        ) : (
          <div className="restaurant-card rounded-lg p-8 text-center">
            <CalendarCheck
              className="mx-auto text-[#8A3430]"
              size={42}
              aria-hidden="true"
            />
            <h2 className="mt-5 text-2xl font-black">No reservations yet</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#6B5D5B]">
              Customer booking requests will appear here as soon as they are
              submitted from the booking page.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
