"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  CalendarCheck,
  Clock,
  LogOut,
  ReceiptText,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import {
  getSupabaseBrowser,
  isSupabaseBrowserConfigured,
} from "@/lib/supabase-browser";
import { formatCurrency } from "@/lib/order";

type Reservation = {
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

type CustomerOrder = {
  cancellationReason: string | null;
  createdAt: string;
  estimatedReadyAt: string | null;
  id: string;
  orderNumber: string;
  orderType: string;
  paymentStatus: string;
  phaseLabel: string;
  prepTimeMinutes: number;
  status: string;
  statusLabel: string;
  totalPence: number;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(new Date(`${value}T00:00:00`));
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not available yet";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatPence(value: number) {
  return formatCurrency(value / 100);
}

export function AccountDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseBrowserConfigured()) {
      setError("Customer accounts are not configured yet.");
      setLoading(false);
      return;
    }

    const supabase = getSupabaseBrowser();

    async function loadAccount() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) {
        setLoading(false);
        return;
      }

      setUser(session.user);

      const headers = {
        Authorization: `Bearer ${session.access_token}`,
      };
      const [ordersResponse, reservationsResponse] = await Promise.all([
        fetch("/api/account/orders", { headers }),
        fetch("/api/account/reservations", { headers }),
      ]);
      const ordersResult = (await ordersResponse.json().catch(() => ({}))) as {
        error?: string;
        orders?: CustomerOrder[];
      };
      const reservationsResult = (await reservationsResponse
        .json()
        .catch(() => ({}))) as {
        error?: string;
        reservations?: Reservation[];
      };

      if (!ordersResponse.ok || !reservationsResponse.ok) {
        setError(
          ordersResult.error ??
            reservationsResult.error ??
            "Account history could not be loaded.",
        );
      } else {
        setOrders(ordersResult.orders ?? []);
        setReservations(reservationsResult.reservations ?? []);
      }

      setLoading(false);
    }

    loadAccount().catch((loadError) => {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Account could not be loaded.",
      );
      setLoading(false);
    });
  }, []);

  async function signOut() {
    const supabase = getSupabaseBrowser();
    await supabase.auth.signOut();
    setUser(null);
    setOrders([]);
    setReservations([]);
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="restaurant-card rounded-lg p-8">
          <p className="font-black">Loading your account...</p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="restaurant-card rounded-lg p-8 text-center">
          <UserRound className="mx-auto text-[#8A3430]" size={42} aria-hidden="true" />
          <h1 className="mt-5 text-3xl font-black">Sign in to your account</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#6B5D5B]">
            Save your details, make bookings faster, and see orders and
            reservation requests linked to your account.
          </p>
          {error ? (
            <p className="mx-auto mt-4 max-w-xl rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-black text-red-900">
              {error}
            </p>
          ) : null}
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/account/sign-in"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#8A3430] px-6 text-sm font-black text-white transition hover:bg-[#6F2926]"
            >
              Sign in
            </Link>
            <Link
              href="/account/sign-up"
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-black text-[#8A3430] transition hover:border-[#8A3430]"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:items-start xl:grid-cols-[0.58fr_1fr_1fr]">
        <aside className="restaurant-card rounded-lg p-6">
          <UserRound className="text-[#8A3430]" size={34} aria-hidden="true" />
          <h1 className="mt-4 text-3xl font-black">Your account</h1>
          <p className="mt-3 break-all text-sm leading-7 text-[#6B5D5B]">
            {user.email}
          </p>
          <div className="mt-7 grid gap-3">
            <Link
              href="/booking"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#8A3430] px-4 text-sm font-black text-white transition hover:bg-[#6F2926]"
            >
              <CalendarCheck size={17} aria-hidden="true" />
              Book a table
            </Link>
            <Link
              href="/menu"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font-black text-[#8A3430] transition hover:border-[#8A3430]"
            >
              <ShoppingBag size={17} aria-hidden="true" />
              Order food
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font-black text-[#6B5D5B] transition hover:border-[#8A3430] hover:text-[#8A3430]"
            >
              <LogOut size={17} aria-hidden="true" />
              Sign out
            </button>
          </div>
        </aside>

        <div className="restaurant-card rounded-lg p-6">
          <div className="flex items-center gap-2">
            <ReceiptText className="text-[#8A3430]" size={22} aria-hidden="true" />
            <h2 className="text-2xl font-black">Your orders</h2>
          </div>
          <p className="mt-2 text-sm leading-7 text-[#6B5D5B]">
            Food orders linked to this account appear here.
          </p>

          {error ? (
            <p className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-black text-red-900">
              {error}
            </p>
          ) : null}

          <div className="mt-6 grid gap-3">
            {orders.length > 0 ? (
              orders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-lg border border-[#E4D6C4] bg-[#FFFCF6] p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8A3430]">
                        {order.orderNumber}
                      </p>
                      <h3 className="mt-2 text-xl font-black">
                        {order.statusLabel}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#6B5D5B]">
                        {order.phaseLabel}
                      </p>
                    </div>
                    <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-[#8A3430]">
                      {formatPence(order.totalPence)}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm">
                    <p className="flex items-center gap-2 text-[#6B5D5B]">
                      <Clock size={15} aria-hidden="true" />
                      {order.prepTimeMinutes} min prep
                    </p>
                    <p className="font-semibold text-[#6B5D5B]">
                      Ready: {formatDateTime(order.estimatedReadyAt)}
                    </p>
                    <p className="font-semibold capitalize text-[#6B5D5B]">
                      {order.orderType} | {order.paymentStatus}
                    </p>
                    <p className="font-semibold text-[#6B5D5B]">
                      Ordered: {formatDateTime(order.createdAt)}
                    </p>
                  </div>

                  {order.status === "cancelled" ? (
                    <p className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-bold leading-6 text-red-900">
                      {order.cancellationReason ??
                        "The restaurant cancelled this order."}
                    </p>
                  ) : null}

                  <Link
                    href={`/track-order?order_id=${encodeURIComponent(
                      order.orderNumber,
                    )}`}
                    className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-[#8A3430]/20 bg-white px-4 text-xs font-black uppercase text-[#8A3430] transition hover:border-[#8A3430] hover:bg-[#FFF7EC]"
                  >
                    Full tracking
                  </Link>
                </article>
              ))
            ) : (
              <div className="rounded-lg border border-[#E4D6C4] bg-[#FFFCF6] p-6 text-sm leading-7 text-[#6B5D5B]">
                No orders saved to this account yet.
              </div>
            )}
          </div>
        </div>

        <div className="restaurant-card rounded-lg p-6">
          <h2 className="text-2xl font-black">Your reservations</h2>
          <p className="mt-2 text-sm leading-7 text-[#6B5D5B]">
            New booking requests appear here after they are sent to the restaurant.
          </p>

          {error ? (
            <p className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-black text-red-900">
              {error}
            </p>
          ) : null}

          <div className="mt-6 grid gap-3">
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <article
                  key={reservation.id}
                  className="rounded-lg border border-[#E4D6C4] bg-[#FFFCF6] p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8A3430]">
                        {reservation.reservation_reference}
                      </p>
                      <h3 className="mt-2 text-xl font-black">
                        {formatDate(reservation.reservation_date)} at{" "}
                        {reservation.reservation_time}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#6B5D5B]">
                        {reservation.guests}{" "}
                        {reservation.guests === 1 ? "guest" : "guests"}
                        {reservation.occasion ? ` · ${reservation.occasion}` : ""}
                      </p>
                    </div>
                    <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-[#8A3430]">
                      {reservation.status}
                    </span>
                  </div>
                  {reservation.special_requests ? (
                    <p className="mt-3 text-sm leading-6 text-[#6B5D5B]">
                      {reservation.special_requests}
                    </p>
                  ) : null}
                </article>
              ))
            ) : (
              <div className="rounded-lg border border-[#E4D6C4] bg-[#FFFCF6] p-6 text-sm leading-7 text-[#6B5D5B]">
                No reservations saved to this account yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
