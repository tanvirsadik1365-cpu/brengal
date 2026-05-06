import type { SupabaseClient } from "@supabase/supabase-js";
import { toPence, type CartItem } from "@/lib/order";
import type { ValidatedOrder } from "@/lib/order-validation";
import { saveCustomerProfile } from "@/lib/database-reservations";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type DatabasePaymentMethod = "cash" | "online";

export type PersistedOrder = {
  id: string;
  orderNumber: string;
  orderStatus: string;
  paymentStatus: string;
};

export type OrderAccountUser = {
  email?: string | null;
  id: string;
};

export type CustomerAccountOrder = {
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

type DbError = {
  details?: string | null;
  message: string;
};

type UnknownRecord = Record<string, unknown>;

function getDbErrorMessage(action: string, error?: DbError | null) {
  return `${action}: ${error?.message ?? "Unknown database error."}`;
}

function getRestaurantId() {
  return process.env.RESTAURANT_ID?.trim() || "jamals-restaurant";
}

function readString(row: UnknownRecord, key: string) {
  const value = row[key];

  return typeof value === "string" ? value : "";
}

function readNullableString(row: UnknownRecord, key: string) {
  const value = readString(row, key).trim();

  return value.length > 0 ? value : null;
}

function readNumber(row: UnknownRecord, key: string, fallback = 0) {
  const value = row[key];

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);

    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
}

function readDate(row: UnknownRecord, key: string) {
  const value = readString(row, key);
  const date = value ? new Date(value) : null;

  if (!date || Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function toIsoString(date: Date | null) {
  return date ? date.toISOString() : null;
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function getAutoAcceptAt(order: UnknownRecord) {
  const autoAcceptAt = readDate(order, "auto_accept_at");

  if (autoAcceptAt) {
    return autoAcceptAt;
  }

  const createdAt = readDate(order, "created_at");

  return createdAt ? new Date(createdAt.getTime() + 15 * 1000) : null;
}

function getEffectiveStatus(order: UnknownRecord) {
  const rawStatus = readString(order, "order_status").toLowerCase();
  const autoAcceptAt = getAutoAcceptAt(order);

  if (!rawStatus || rawStatus === "new" || rawStatus === "pending") {
    return autoAcceptAt && autoAcceptAt <= new Date() ? "preparing" : "pending";
  }

  if (rawStatus === "accepted") {
    return "preparing";
  }

  if (
    rawStatus === "preparing" ||
    rawStatus === "ready" ||
    rawStatus === "completed" ||
    rawStatus === "cancelled"
  ) {
    return rawStatus;
  }

  return "pending";
}

function getStatusLabel(status: string) {
  switch (status) {
    case "pending":
      return "Pending";
    case "preparing":
      return "Accepted / Preparing";
    case "ready":
      return "Ready";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    default:
      return "Pending";
  }
}

function getPhaseLabel(status: string, orderType: string) {
  switch (status) {
    case "pending":
      return "Waiting for restaurant confirmation.";
    case "preparing":
      return "The restaurant accepted your order and is preparing it.";
    case "ready":
      return orderType === "delivery"
        ? "Ready for delivery handoff."
        : "Ready for collection.";
    case "completed":
      return "Order completed.";
    case "cancelled":
      return "Order cancelled.";
    default:
      return "Waiting for restaurant confirmation.";
  }
}

export function createOrderReference() {
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `JAMALS-${Date.now()}-${suffix}`;
}

function createRewardItems(order: ValidatedOrder): CartItem[] {
  const rewardItems: CartItem[] = [];

  if (order.reward.type === "onion-bhaji" || order.reward.type === "combo") {
    rewardItems.push({
      category: "Reward",
      displayName: "Free Onion Bhaji",
      id: "reward-onion-bhaji",
      name: "Free Onion Bhaji",
      priceLabel: "0",
      quantity: 1,
      unitPrice: 0,
    });
  }

  if (order.selectedSideDish) {
    rewardItems.push({
      ...order.selectedSideDish,
      category: "Reward",
      displayName: `Free Side Dish - ${order.selectedSideDish.displayName}`,
      name: `Free Side Dish - ${order.selectedSideDish.name}`,
      priceLabel: "0",
      quantity: 1,
      unitPrice: 0,
    });
  }

  return rewardItems;
}

function createOrderItemRows(orderId: string, order: ValidatedOrder) {
  const paidItems = order.cartItems.map((item) => ({
    category: item.category,
    is_reward: false,
    line_total_pence: toPence(item.unitPrice * item.quantity),
    menu_item_id: item.id,
    name: item.name,
    order_id: orderId,
    quantity: item.quantity,
    unit_price_pence: toPence(item.unitPrice),
  }));

  const rewardItems = createRewardItems(order).map((item) => ({
    category: item.category,
    is_reward: true,
    line_total_pence: 0,
    menu_item_id: item.id,
    name: item.name,
    order_id: orderId,
    quantity: item.quantity,
    unit_price_pence: 0,
  }));

  return [...paidItems, ...rewardItems];
}

async function addStatusEvent(
  supabase: SupabaseClient,
  orderId: string,
  toStatus: string,
  note: string,
  fromStatus?: string | null,
) {
  const { error } = await supabase.from("order_status_events").insert({
    from_status: fromStatus ?? null,
    note,
    order_id: orderId,
    to_status: toStatus,
  });

  if (error) {
    throw new Error(
      getDbErrorMessage("Order status event could not be saved", error),
    );
  }
}

export async function createDatabaseOrder(
  order: ValidatedOrder,
  paymentMethod: DatabasePaymentMethod,
  user?: OrderAccountUser | null,
  options?: {
    prepTimeMinutes?: number;
  },
): Promise<PersistedOrder> {
  const supabase = getSupabaseAdmin();
  const orderNumber = createOrderReference();
  const prepTimeMinutes = Math.min(
    Math.max(options?.prepTimeMinutes ?? 20, 5),
    120,
  );

  const customerId = await saveCustomerProfile({
    email: order.customer.email,
    name: order.customer.name,
    phone: order.customer.normalizedPhone,
  });

  const { data: databaseOrder, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_auth_user_id: user?.id ?? null,
      customer_id: customerId,
      delivery_address:
        order.orderType === "delivery" ? order.customer.address : null,
      delivery_postcode:
        order.orderType === "delivery" ? order.customer.postcode : null,
      discount_pence: toPence(order.collectionDiscount),
      notes: order.customer.notes || null,
      order_number: orderNumber,
      order_status: "new",
      order_type: order.orderType,
      payment_method: paymentMethod,
      payment_status: "pending",
      prep_time_minutes: prepTimeMinutes,
      restaurant_id: getRestaurantId(),
      reward_title: order.reward.type === "none" ? null : order.reward.title,
      reward_type: order.reward.type,
      selected_side_dish: order.selectedSideDish?.name ?? null,
      subtotal_pence: toPence(order.subtotal),
      total_pence: toPence(order.total),
    })
    .select("id, order_number, order_status, payment_status")
    .single();

  if (orderError || !databaseOrder) {
    throw new Error(getDbErrorMessage("Order could not be saved", orderError));
  }

  const orderItemRows = createOrderItemRows(databaseOrder.id, order);
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemRows);

  if (itemsError) {
    throw new Error(
      getDbErrorMessage("Order items could not be saved", itemsError),
    );
  }

  await addStatusEvent(
    supabase,
    databaseOrder.id,
    "new",
    paymentMethod === "online"
      ? "Online checkout started."
      : "Cash order placed.",
  );

  return {
    id: databaseOrder.id,
    orderNumber: databaseOrder.order_number,
    orderStatus: databaseOrder.order_status,
    paymentStatus: databaseOrder.payment_status,
  };
}

const customerOrderSelect =
  "id, order_number, order_status, order_type, payment_status, prep_time_minutes, total_pence, created_at, accepted_at, ready_at, completed_at, cancelled_at, cancellation_reason, auto_accept_at";

function mapCustomerOrder(row: UnknownRecord): CustomerAccountOrder {
  const status = getEffectiveStatus(row);
  const orderType = readString(row, "order_type") || "collection";
  const prepTimeMinutes = Math.max(readNumber(row, "prep_time_minutes", 20), 1);
  const acceptedAt = readDate(row, "accepted_at");
  const autoAcceptAt = getAutoAcceptAt(row);
  const effectiveAcceptedAt =
    acceptedAt ?? (status === "pending" ? null : autoAcceptAt);
  const estimatedReadyAt = effectiveAcceptedAt
    ? addMinutes(effectiveAcceptedAt, prepTimeMinutes)
    : autoAcceptAt
      ? addMinutes(autoAcceptAt, prepTimeMinutes)
      : null;

  return {
    cancellationReason: readNullableString(row, "cancellation_reason"),
    createdAt: readString(row, "created_at"),
    estimatedReadyAt: toIsoString(estimatedReadyAt),
    id: readString(row, "id"),
    orderNumber: readString(row, "order_number"),
    orderType,
    paymentStatus: readString(row, "payment_status") || "pending",
    phaseLabel: getPhaseLabel(status, orderType),
    prepTimeMinutes,
    status,
    statusLabel: getStatusLabel(status),
    totalPence: readNumber(row, "total_pence", 0),
  };
}

export async function listCustomerOrders(user: OrderAccountUser) {
  const supabase = getSupabaseAdmin();
  const orderMap = new Map<string, CustomerAccountOrder>();

  const { data: linkedOrders, error: linkedError } = await supabase
    .from("orders")
    .select(customerOrderSelect)
    .eq("customer_auth_user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(25);

  if (linkedError) {
    throw new Error(
      getDbErrorMessage("Customer orders could not be loaded", linkedError),
    );
  }

  for (const row of (linkedOrders ?? []) as UnknownRecord[]) {
    const order = mapCustomerOrder(row);
    orderMap.set(order.id, order);
  }

  const email = user.email?.trim().toLowerCase();

  if (email) {
    const { data: customers, error: customerError } = await supabase
      .from("customers")
      .select("id")
      .eq("email", email)
      .limit(10);

    if (customerError) {
      throw new Error(
        getDbErrorMessage("Customer profile could not be loaded", customerError),
      );
    }

    const customerIds = ((customers ?? []) as UnknownRecord[])
      .map((customer) => readString(customer, "id"))
      .filter(Boolean);

    if (customerIds.length > 0) {
      const { data: emailOrders, error: emailOrdersError } = await supabase
        .from("orders")
        .select(customerOrderSelect)
        .in("customer_id", customerIds)
        .order("created_at", { ascending: false })
        .limit(25);

      if (emailOrdersError) {
        throw new Error(
          getDbErrorMessage(
            "Customer email orders could not be loaded",
            emailOrdersError,
          ),
        );
      }

      for (const row of (emailOrders ?? []) as UnknownRecord[]) {
        const order = mapCustomerOrder(row);
        orderMap.set(order.id, order);
      }
    }
  }

  return [...orderMap.values()]
    .sort(
      (first, second) =>
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime(),
    )
    .slice(0, 25);
}

export async function updateStripeCheckoutSession(
  orderId: string,
  stripeSessionId: string,
) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("orders")
    .update({
      stripe_session_id: stripeSessionId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (error) {
    throw new Error(
      getDbErrorMessage("Stripe session could not be saved", error),
    );
  }
}

export async function markDatabaseOrderPaymentFailed(
  orderId: string,
  note: string,
) {
  const supabase = getSupabaseAdmin();
  const { data: order, error: selectError } = await supabase
    .from("orders")
    .select("id, order_status")
    .eq("id", orderId)
    .single();

  if (selectError || !order) {
    throw new Error(
      getDbErrorMessage("Order could not be loaded", selectError),
    );
  }

  const { error } = await supabase
    .from("orders")
    .update({
      payment_status: "failed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (error) {
    throw new Error(
      getDbErrorMessage("Payment failure could not be saved", error),
    );
  }

  await addStatusEvent(
    supabase,
    order.id,
    order.order_status,
    note,
    order.order_status,
  );
}

export async function markDatabaseOrderPaidFromStripe({
  databaseOrderId,
  orderNumber,
  stripePaymentIntentId,
  stripeSessionId,
}: {
  databaseOrderId?: string | null;
  orderNumber?: string | null;
  stripePaymentIntentId?: string | null;
  stripeSessionId: string;
}) {
  const supabase = getSupabaseAdmin();
  let query = supabase.from("orders").select("id, order_status").limit(1);

  if (databaseOrderId) {
    query = query.eq("id", databaseOrderId);
  } else if (stripeSessionId) {
    query = query.eq("stripe_session_id", stripeSessionId);
  } else if (orderNumber) {
    query = query.eq("order_number", orderNumber);
  }

  const { data: order, error: selectError } = await query.single();

  if (selectError || !order) {
    throw new Error(
      getDbErrorMessage("Paid order could not be loaded", selectError),
    );
  }

  const { error } = await supabase
    .from("orders")
    .update({
      payment_status: "paid",
      stripe_payment_intent_id: stripePaymentIntentId,
      stripe_session_id: stripeSessionId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", order.id);

  if (error) {
    throw new Error(
      getDbErrorMessage("Paid order could not be updated", error),
    );
  }

  await addStatusEvent(
    supabase,
    order.id,
    order.order_status,
    "Stripe payment confirmed.",
    order.order_status,
  );
}
