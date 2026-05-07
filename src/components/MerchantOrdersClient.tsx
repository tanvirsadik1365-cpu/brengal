"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  PackageCheck,
  Phone,
  ReceiptText,
  RefreshCw,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { MerchantAppClock } from "@/components/MerchantAppClock";
import { formatCurrency } from "@/lib/order";
import type { MerchantOrder } from "@/lib/database-orders";

type MerchantOrdersClientProps = {
  initialError?: string;
  initialOrderDate: string;
  initialOrders: MerchantOrder[];
  token: string;
};

type OrdersResponse = {
  error?: string;
  orders?: MerchantOrder[];
};

type OrderStatusResponse = {
  error?: string;
  order?: MerchantOrder;
};

type MerchantOrderStatusUpdate =
  | "accepted"
  | "ready"
  | "completed"
  | "cancelled";

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not set";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatDateInput(value: string) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(new Date(`${value}T00:00:00`));
}

function getTodayInputValue() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatPence(value: number) {
  return formatCurrency(value / 100);
}

function displayValue(value: string) {
  return value.replace(/-/g, " ");
}

function countsTowardTurnover(order: MerchantOrder) {
  return order.status !== "pending" && order.status !== "cancelled";
}

function MerchantNav({ token }: { token: string }) {
  const encodedToken = encodeURIComponent(token);

  return (
    <nav className="mt-5 flex flex-wrap gap-2">
      <Link
        href={`/merchant/orders?token=${encodedToken}`}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#8A3430] px-4 text-sm font-black text-white transition hover:bg-[#6F2926]"
      >
        <ShoppingBag size={16} aria-hidden="true" />
        Orders
      </Link>
      <Link
        href={`/merchant/reservations?token=${encodedToken}`}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#8A3430]/20 bg-white px-4 text-sm font-black text-[#8A3430] transition hover:border-[#8A3430] hover:bg-[#FFF7EC]"
      >
        <CalendarCheck size={16} aria-hidden="true" />
        Reservations
      </Link>
    </nav>
  );
}

function getOrderActions(order: MerchantOrder) {
  if (order.status === "cancelled" || order.status === "completed") {
    return [];
  }

  if (order.status === "pending") {
    return [
      { icon: CheckCircle2, label: "Accept", status: "accepted" },
      { icon: XCircle, label: "Cancel", status: "cancelled" },
    ] satisfies Array<{
      icon: typeof CheckCircle2;
      label: string;
      status: MerchantOrderStatusUpdate;
    }>;
  }

  if (order.status === "preparing") {
    return [
      { icon: PackageCheck, label: "Ready", status: "ready" },
      { icon: CheckCircle2, label: "Complete", status: "completed" },
      { icon: XCircle, label: "Cancel", status: "cancelled" },
    ] satisfies Array<{
      icon: typeof CheckCircle2;
      label: string;
      status: MerchantOrderStatusUpdate;
    }>;
  }

  return [
    { icon: CheckCircle2, label: "Complete", status: "completed" },
    { icon: XCircle, label: "Cancel", status: "cancelled" },
  ] satisfies Array<{
    icon: typeof CheckCircle2;
    label: string;
    status: MerchantOrderStatusUpdate;
  }>;
}

function OrderCard({
  actioningStatus,
  onStatusChange,
  order,
}: {
  actioningStatus: string;
  onStatusChange: (orderId: string, status: MerchantOrderStatusUpdate) => void;
  order: MerchantOrder;
}) {
  const actions = getOrderActions(order);

  return (
    <article className="rounded-lg border border-[#E4D6C4] bg-[#FFFCF6] p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8A3430]">
            {order.orderNumber}
          </p>
          <h2 className="mt-2 text-2xl font-black">{order.customerName}</h2>
          <div className="mt-3 grid gap-2 text-sm font-semibold text-[#6B5D5B] sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <Clock3 size={15} aria-hidden="true" />
              Placed {formatDateTime(order.createdAt)}
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays size={15} aria-hidden="true" />
              Ready {formatDateTime(order.estimatedReadyAt)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end">
          <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-[#8A3430]">
            {order.statusLabel}
          </span>
          <span className="inline-flex rounded-full bg-[#8A3430] px-3 py-1 text-xs font-black uppercase text-white">
            {formatPence(order.totalPence)}
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm leading-6 text-[#6B5D5B] md:grid-cols-4">
        <p>
          <span className="font-black text-[#241D1D]">Type:</span>{" "}
          {displayValue(order.orderType)}
        </p>
        <p>
          <span className="font-black text-[#241D1D]">Payment:</span>{" "}
          {displayValue(order.paymentMethod)} / {displayValue(order.paymentStatus)}
        </p>
        <p>
          <span className="font-black text-[#241D1D]">Prep:</span>{" "}
          {order.prepTimeMinutes} min
        </p>
        <p className="flex gap-2">
          <Phone
            className="mt-0.5 shrink-0 text-[#8A3430]"
            size={17}
            aria-hidden="true"
          />
          {order.customerPhone ? (
            <a href={`tel:${order.customerPhone}`}>{order.customerPhone}</a>
          ) : (
            "No phone"
          )}
        </p>
      </div>

      {order.customerEmail ? (
        <p className="mt-3 break-all text-sm leading-6 text-[#6B5D5B]">
          <span className="font-black text-[#241D1D]">Email:</span>{" "}
          {order.customerEmail}
        </p>
      ) : null}

      {order.deliveryAddress || order.notes ? (
        <div className="mt-5 grid gap-3 text-sm leading-6 text-[#6B5D5B] md:grid-cols-2">
          {order.deliveryAddress ? (
            <p className="rounded-lg bg-white p-4">
              <span className="font-black text-[#241D1D]">Delivery:</span>{" "}
              {order.deliveryAddress}
              {order.deliveryPostcode ? `, ${order.deliveryPostcode}` : ""}
            </p>
          ) : null}
          {order.notes ? (
            <p className="rounded-lg bg-white p-4">
              <span className="font-black text-[#241D1D]">Notes:</span>{" "}
              {order.notes}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-5 rounded-lg bg-white p-4">
        <p className="text-sm font-black text-[#241D1D]">Items</p>
        {order.items.length > 0 ? (
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#6B5D5B]">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-1 border-t border-[#E4D6C4] pt-2 first:border-t-0 first:pt-0 sm:flex-row sm:items-start sm:justify-between"
              >
                <span>
                  <span className="font-black text-[#241D1D]">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="block text-xs font-bold uppercase tracking-[0.1em] text-[#8A3430]">
                    {item.category}
                    {item.isReward ? " / reward" : ""}
                  </span>
                </span>
                <span className="font-black text-[#241D1D]">
                  {formatPence(item.lineTotalPence)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm leading-6 text-[#6B5D5B]">
            No item rows were found for this order.
          </p>
        )}
      </div>

      {order.status === "cancelled" ? (
        <p className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-bold leading-6 text-red-900">
          {order.cancellationReason ?? "This order was cancelled."}
        </p>
      ) : null}

      {actions.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            const actionKey = `${order.id}:${action.status}`;
            const isActioning = actioningStatus === actionKey;

            return (
              <button
                key={action.status}
                type="button"
                onClick={() => onStatusChange(order.id, action.status)}
                disabled={Boolean(actioningStatus)}
                className={`inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-black transition disabled:opacity-60 ${
                  action.status === "cancelled"
                    ? "border border-red-200 bg-white text-red-800 hover:bg-red-50"
                    : "bg-[#8A3430] text-white hover:bg-[#6F2926]"
                }`}
              >
                <Icon
                  className={isActioning ? "animate-spin" : ""}
                  size={16}
                  aria-hidden="true"
                />
                {isActioning ? "Updating" : action.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </article>
  );
}

function OrderSection({
  actioningStatus,
  description,
  onStatusChange,
  orders,
  title,
}: {
  actioningStatus: string;
  description: string;
  onStatusChange: (orderId: string, status: MerchantOrderStatusUpdate) => void;
  orders: MerchantOrder[];
  title: string;
}) {
  if (orders.length === 0) {
    return null;
  }

  return (
    <section className="grid gap-4">
      <div>
        <h2 className="text-2xl font-black">{title}</h2>
        <p className="mt-1 text-sm font-semibold leading-6 text-[#6B5D5B]">
          {description}
        </p>
      </div>
      {orders.map((order) => (
        <OrderCard
          actioningStatus={actioningStatus}
          key={order.id}
          onStatusChange={onStatusChange}
          order={order}
        />
      ))}
    </section>
  );
}

export function MerchantOrdersClient({
  initialError = "",
  initialOrderDate,
  initialOrders,
  token,
}: MerchantOrdersClientProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedDate, setSelectedDate] = useState(initialOrderDate);
  const [loadError, setLoadError] = useState(initialError);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [actioningStatus, setActioningStatus] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const ordersUrl = useMemo(() => {
    const params = new URLSearchParams({
      token,
    });

    if (selectedDate) {
      params.set("date", selectedDate);
    }

    return `/api/merchant/orders?${params.toString()}`;
  }, [selectedDate, token]);

  const refreshOrders = useCallback(
    async (signal?: AbortSignal) => {
      setRefreshing(true);

      try {
        const response = await fetch(ordersUrl, {
          cache: "no-store",
          signal,
        });
        const result = (await response.json().catch(() => ({}))) as OrdersResponse;

        if (!response.ok) {
          throw new Error(result.error ?? "Orders could not be loaded.");
        }

        setOrders(result.orders ?? []);
        setLoadError("");
        setLastUpdated(new Date());
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setLoadError(
          error instanceof Error ? error.message : "Orders could not be loaded.",
        );
      } finally {
        if (!signal?.aborted) {
          setRefreshing(false);
        }
      }
    },
    [ordersUrl],
  );

  const updateOrderStatus = useCallback(
    async (orderId: string, status: MerchantOrderStatusUpdate) => {
      const actionKey = `${orderId}:${status}`;

      setActioningStatus(actionKey);
      setLoadError("");

      try {
        const params = new URLSearchParams({ token });
        const response = await fetch(`/api/merchant/orders?${params.toString()}`, {
          body: JSON.stringify({ orderId, status }),
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
          method: "PATCH",
        });
        const result = (await response.json().catch(() => ({}))) as
          OrderStatusResponse;

        if (!response.ok || !result.order) {
          throw new Error(result.error ?? "Order status could not be updated.");
        }

        setOrders((currentOrders) =>
          currentOrders.map((order) =>
            order.id === result.order?.id ? result.order : order,
          ),
        );
        setLastUpdated(new Date());
      } catch (error) {
        setLoadError(
          error instanceof Error
            ? error.message
            : "Order status could not be updated.",
        );
      } finally {
        setActioningStatus("");
      }
    },
    [token],
  );

  useEffect(() => {
    const controller = new AbortController();

    void refreshOrders(controller.signal);
    const timer = window.setInterval(() => {
      void refreshOrders(controller.signal);
    }, 10000);

    return () => {
      controller.abort();
      window.clearInterval(timer);
    };
  }, [refreshOrders]);

  useEffect(() => {
    const url = new URL(window.location.href);

    url.searchParams.set("token", token);

    if (selectedDate) {
      url.searchParams.set("date", selectedDate);
    } else {
      url.searchParams.delete("date");
    }

    window.history.replaceState(null, "", `${url.pathname}?${url.searchParams}`);
  }, [selectedDate, token]);

  const pendingOrders = orders.filter((order) => order.status === "pending");
  const activeOrders = orders.filter(
    (order) => order.status === "preparing" || order.status === "ready",
  );
  const finishedOrders = orders.filter(
    (order) => order.status === "completed" || order.status === "cancelled",
  );
  const acceptedTurnoverPence = orders
    .filter(countsTowardTurnover)
    .reduce((total, order) => total + order.totalPence, 0);

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#8A3430]">
            Merchant App
          </p>
          <h1 className="mt-2 text-4xl font-black">Website orders</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B5D5B]">
            Website checkout orders are stored in Supabase and shown here for
            the restaurant team.
          </p>
          <MerchantNav token={token} />
          <p className="mt-3 text-xs font-black uppercase tracking-[0.12em] text-[#8A3430]">
            {lastUpdated
              ? `Last checked ${formatDateTime(lastUpdated.toISOString())}`
              : ""}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[360px]">
          <MerchantAppClock />
          <div className="restaurant-card rounded-lg px-5 py-4">
            <p className="text-3xl font-black text-[#8A3430]">
              {orders.length}
            </p>
            <p className="text-sm font-black text-[#6B5D5B]">loaded orders</p>
          </div>
          <div className="restaurant-card rounded-lg px-5 py-4">
            <p className="text-3xl font-black text-[#8A3430]">
              {pendingOrders.length}
            </p>
            <p className="text-sm font-black text-[#6B5D5B]">
              pending acceptance
            </p>
          </div>
          <div className="restaurant-card rounded-lg px-5 py-4">
            <p className="text-3xl font-black text-[#8A3430]">
              {formatPence(acceptedTurnoverPence)}
            </p>
            <p className="text-sm font-black text-[#6B5D5B]">
              accepted turnover
            </p>
          </div>
          <button
            type="button"
            onClick={() => void refreshOrders()}
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

      <div className="restaurant-card mt-8 rounded-lg p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <label className="block lg:min-w-72">
            <span className="text-sm font-black text-[#241D1D]">
              Filter by order date
            </span>
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="mt-2 h-12 w-full rounded-lg border border-black/10 bg-white px-3 text-sm font-black text-[#241D1D] outline-none transition focus:border-[#8A3430] focus:ring-4 focus:ring-[#8A3430]/10"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedDate(getTodayInputValue())}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#8A3430]/20 bg-white px-4 text-sm font-black text-[#8A3430] transition hover:border-[#8A3430] hover:bg-[#FFF7EC]"
            >
              <CalendarDays size={16} aria-hidden="true" />
              Today
            </button>
            <button
              type="button"
              onClick={() => setSelectedDate("")}
              disabled={!selectedDate}
              className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-sm font-black text-[#6B5D5B] transition hover:border-[#8A3430] hover:text-[#8A3430] disabled:opacity-50"
            >
              All orders
            </button>
          </div>
        </div>
        <p className="mt-3 text-sm font-semibold text-[#6B5D5B]">
          {selectedDate
            ? `Showing orders placed on ${formatDateInput(selectedDate)}.`
            : "Showing the latest orders across all dates."}
        </p>
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
        {orders.length > 0 ? (
          <>
            <OrderSection
              actioningStatus={actioningStatus}
              description="Paid online orders and cash orders wait here until the restaurant accepts them."
              onStatusChange={updateOrderStatus}
              orders={pendingOrders}
              title="Pending orders"
            />
            <OrderSection
              actioningStatus={actioningStatus}
              description="These orders count toward turnover because they have been accepted."
              onStatusChange={updateOrderStatus}
              orders={activeOrders}
              title="Accepted orders"
            />
            <OrderSection
              actioningStatus={actioningStatus}
              description="Completed and cancelled orders for the selected date view."
              onStatusChange={updateOrderStatus}
              orders={finishedOrders}
              title="Finished orders"
            />
          </>
        ) : (
          <div className="restaurant-card rounded-lg p-8 text-center">
            <ReceiptText
              className="mx-auto text-[#8A3430]"
              size={42}
              aria-hidden="true"
            />
            <h2 className="mt-5 text-2xl font-black">No orders found</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#6B5D5B]">
              Website orders will appear here as soon as customers checkout.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
