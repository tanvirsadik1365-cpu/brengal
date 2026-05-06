"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Clock,
  Phone,
  RefreshCw,
  Search,
  Store,
  XCircle,
} from "lucide-react";
import { restaurant } from "@/lib/restaurant";
import type { OrderTrackingResult } from "@/lib/order-tracking";

type LookupDetails = {
  contact: string;
  orderNumber: string;
};

type TrackingResponse = {
  error?: string;
  tracking?: OrderTrackingResult;
};

const terminalStatuses = new Set(["completed", "cancelled"]);

const statusSteps = [
  { id: "pending", label: "Pending", text: "Restaurant confirmation" },
  { id: "preparing", label: "Accepted / Preparing", text: "Kitchen is preparing" },
  { id: "ready", label: "Ready", text: "Ready for collection or handoff" },
  { id: "completed", label: "Completed", text: "Order finished" },
] as const;

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not available yet";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatCurrencyFromPence(value: number) {
  return new Intl.NumberFormat("en-GB", {
    currency: "GBP",
    style: "currency",
  }).format(value / 100);
}

function phoneHref(value: string) {
  return `tel:${value.replace(/[^\d+]/g, "")}`;
}

function statusTone(status: OrderTrackingResult["status"]) {
  switch (status) {
    case "pending":
      return "border-amber-200 bg-amber-50 text-amber-900";
    case "preparing":
      return "border-blue-200 bg-blue-50 text-blue-900";
    case "ready":
      return "border-emerald-200 bg-emerald-50 text-emerald-900";
    case "completed":
      return "border-zinc-200 bg-zinc-50 text-zinc-900";
    case "cancelled":
      return "border-red-200 bg-red-50 text-red-900";
  }
}

function compactStatusText(tracking: OrderTrackingResult) {
  if (tracking.status === "pending" && tracking.secondsUntilAutoAccept > 0) {
    return `Auto accepts in ${tracking.secondsUntilAutoAccept}s`;
  }

  if (tracking.status === "cancelled" && tracking.cancellationReason) {
    return tracking.cancellationReason;
  }

  return tracking.phaseLabel;
}

export function OrderTrackingClient() {
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastLookup, setLastLookup] = useState<LookupDetails | null>(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [tracking, setTracking] = useState<OrderTrackingResult | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialOrder =
      params.get("order_id") ??
      params.get("order") ??
      params.get("orderNumber") ??
      "";

    if (initialOrder) {
      setOrderNumber(initialOrder);
    }
  }, []);

  const runLookup = useCallback(
    async (lookup: LookupDetails, silent = false) => {
      if (!lookup.orderNumber.trim() || !lookup.contact.trim()) {
        setError("Enter your order number and phone or email.");
        return;
      }

      if (silent) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError("");

      try {
        const response = await fetch("/api/orders/track", {
          body: JSON.stringify(lookup),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });
        const payload = (await response.json().catch(() => ({}))) as TrackingResponse;

        if (!response.ok || !payload.tracking) {
          throw new Error(payload.error ?? "Order tracking could not load.");
        }

        setTracking(payload.tracking);
        setLastLookup(lookup);
      } catch (lookupError) {
        if (!silent) {
          setTracking(null);
        }
        setError(
          lookupError instanceof Error
            ? lookupError.message
            : "Order tracking could not load.",
        );
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!lastLookup || !tracking || terminalStatuses.has(tracking.status)) {
      return;
    }

    const interval = window.setInterval(() => {
      void runLookup(lastLookup, true);
    }, 15000);

    return () => window.clearInterval(interval);
  }, [lastLookup, runLookup, tracking]);

  const activeStepIndex = useMemo(() => {
    if (!tracking || tracking.status === "cancelled") {
      return -1;
    }

    return statusSteps.findIndex((step) => step.id === tracking.status);
  }, [tracking]);

  return (
    <section className="bg-white px-4 py-12 text-[#241D1D] sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="restaurant-card rounded-lg p-6 shadow-lg shadow-black/5 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#8A3430]">
            Order tracking
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            Track your food order
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#6B5D5B]">
            Enter the order number from checkout and the phone or email used on
            the order. We only show tracking details when both match.
          </p>

          <form
            className="mt-7 grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              void runLookup({ contact, orderNumber });
            }}
          >
            <label className="text-sm font-black">
              Order number
              <input
                value={orderNumber}
                onChange={(event) => setOrderNumber(event.target.value)}
                className="mt-2 h-12 w-full rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold uppercase outline-none transition focus:border-[#8A3430] focus:ring-4 focus:ring-[#8A3430]/10"
                placeholder="JAMALS-..."
                autoComplete="off"
              />
            </label>

            <label className="text-sm font-black">
              Phone or email
              <input
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                className="mt-2 h-12 w-full rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold outline-none transition focus:border-[#8A3430] focus:ring-4 focus:ring-[#8A3430]/10"
                placeholder="Phone number or email"
                autoComplete="email"
              />
            </label>

            {error ? (
              <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-black leading-6 text-red-900">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#8A3430] px-6 text-sm font-black text-white shadow-lg shadow-[#8A3430]/20 transition hover:bg-[#6F2926] disabled:cursor-not-allowed disabled:bg-[#B8ADA3]"
            >
              {isLoading ? (
                <RefreshCw className="animate-spin" size={17} aria-hidden="true" />
              ) : (
                <Search size={17} aria-hidden="true" />
              )}
              {isLoading ? "Checking..." : "Track order"}
            </button>
          </form>

          <div className="mt-8 rounded-lg border border-[#EADAC5] bg-[#FFF9EF] p-4 text-sm leading-7 text-[#6B5D5B]">
            <p className="font-black text-[#241D1D]">Need help ordering?</p>
            <a
              href={restaurant.secondaryPhoneHref}
              className="mt-2 inline-flex items-center gap-2 font-black text-[#8A3430]"
            >
              <Phone size={16} aria-hidden="true" />
              {restaurant.secondaryPhone}
            </a>
          </div>
        </div>

        <div className="grid gap-5">
          {tracking ? (
            <>
              <article
                className={`rounded-lg border p-5 shadow-sm ${statusTone(
                  tracking.status,
                )}`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] opacity-75">
                      {tracking.orderNumber}
                    </p>
                    <h2 className="mt-2 text-3xl font-black">
                      {tracking.statusLabel}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm font-bold leading-7">
                      {compactStatusText(tracking)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      lastLookup ? void runLookup(lastLookup, true) : undefined
                    }
                    disabled={isRefreshing || !lastLookup}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-current/20 bg-white/70 px-4 text-sm font-black transition hover:bg-white disabled:opacity-60"
                  >
                    <RefreshCw
                      className={isRefreshing ? "animate-spin" : ""}
                      size={16}
                      aria-hidden="true"
                    />
                    Refresh
                  </button>
                </div>
              </article>

              <article className="restaurant-card rounded-lg p-5 shadow-lg shadow-black/5 sm:p-6">
                <h2 className="flex items-center gap-2 text-2xl font-black">
                  <ClipboardList size={22} aria-hidden="true" />
                  Order progress
                </h2>

                {tracking.status === "cancelled" ? (
                  <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-900">
                    <div className="flex items-start gap-3">
                      <XCircle className="mt-0.5 shrink-0" size={22} aria-hidden="true" />
                      <div>
                        <p className="font-black">Order cancelled</p>
                        <p className="mt-1 text-sm font-bold leading-6">
                          {tracking.cancellationReason ??
                            "The restaurant cancelled this order."}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ol className="mt-5 grid gap-3">
                    {statusSteps.map((step, index) => {
                      const complete = activeStepIndex >= index;
                      const active = activeStepIndex === index;

                      return (
                        <li
                          key={step.id}
                          className={`rounded-lg border p-4 ${
                            complete
                              ? "border-[#8A3430]/30 bg-[#FFF7EC]"
                              : "border-[#EADAC5] bg-white"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                                complete
                                  ? "bg-[#8A3430] text-white"
                                  : "bg-[#EADAC5] text-[#6B5D5B]"
                              }`}
                            >
                              {complete ? (
                                <CheckCircle2 size={18} aria-hidden="true" />
                              ) : (
                                index + 1
                              )}
                            </span>
                            <div>
                              <p className="font-black">
                                {step.label}
                                {active ? (
                                  <span className="ml-2 text-xs uppercase tracking-wide text-[#8A3430]">
                                    Current
                                  </span>
                                ) : null}
                              </p>
                              <p className="mt-1 text-sm font-semibold leading-6 text-[#6B5D5B]">
                                {step.text}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </article>

              <article className="restaurant-card rounded-lg p-5 shadow-lg shadow-black/5 sm:p-6">
                <h2 className="flex items-center gap-2 text-2xl font-black">
                  <Clock size={22} aria-hidden="true" />
                  Timing
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-[#EADAC5] bg-white p-4">
                    <p className="text-xs font-black uppercase tracking-wide text-[#8A3430]">
                      Prep time
                    </p>
                    <p className="mt-2 text-2xl font-black">
                      {tracking.prepTimeMinutes} min
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#EADAC5] bg-white p-4">
                    <p className="text-xs font-black uppercase tracking-wide text-[#8A3430]">
                      Estimated ready
                    </p>
                    <p className="mt-2 text-lg font-black leading-7">
                      {formatDateTime(tracking.estimatedReadyAt)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#EADAC5] bg-white p-4">
                    <p className="text-xs font-black uppercase tracking-wide text-[#8A3430]">
                      Order type
                    </p>
                    <p className="mt-2 text-lg font-black capitalize">
                      {tracking.orderType}
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#EADAC5] bg-white p-4">
                    <p className="text-xs font-black uppercase tracking-wide text-[#8A3430]">
                      Total
                    </p>
                    <p className="mt-2 text-lg font-black">
                      {formatCurrencyFromPence(tracking.totalPence)}
                    </p>
                  </div>
                </div>
              </article>

              <article className="restaurant-card rounded-lg p-5 shadow-lg shadow-black/5 sm:p-6">
                <h2 className="flex items-center gap-2 text-2xl font-black">
                  <Store size={22} aria-hidden="true" />
                  Restaurant support
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#6B5D5B]">
                  For allergy, timing, delivery, or payment questions, call the
                  restaurant with your order number.
                </p>
                <a
                  href={phoneHref(tracking.restaurantSupportPhone)}
                  className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#8A3430] px-6 text-sm font-black text-white transition hover:bg-[#6F2926]"
                >
                  <Phone size={17} aria-hidden="true" />
                  {tracking.restaurantSupportPhone}
                </a>
              </article>
            </>
          ) : (
            <div className="restaurant-card rounded-lg p-8 text-center shadow-lg shadow-black/5">
              <ClipboardList
                className="mx-auto text-[#8A3430]"
                size={42}
                aria-hidden="true"
              />
              <h2 className="mt-5 text-2xl font-black">
                Your live order status will appear here
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#6B5D5B]">
                After lookup, this page refreshes automatically while the order
                is still active.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
