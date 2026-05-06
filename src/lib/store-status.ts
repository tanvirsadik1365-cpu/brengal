import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type {
  PublicStoreStatus,
  StoreOrderingStatus,
} from "@/lib/store-status-types";

type UnknownRecord = Record<string, unknown>;

const fallbackPrepTimeMinutes = 20;

function getRestaurantId() {
  return process.env.RESTAURANT_ID?.trim() || "jamals-restaurant";
}

function readString(row: UnknownRecord | null | undefined, key: string) {
  const value = row?.[key];

  return typeof value === "string" ? value.trim() : "";
}

function readNumber(
  row: UnknownRecord | null | undefined,
  key: string,
  fallback: number,
) {
  const value = row?.[key];

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);

    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
}

function normalizeStatus(value: string): StoreOrderingStatus {
  if (
    value === "busy" ||
    value === "closed" ||
    value === "open" ||
    value === "paused"
  ) {
    return value;
  }

  return "open";
}

function clampPrepTime(value: number) {
  return Math.min(Math.max(value, 5), 120);
}

function buildPublicStatus(
  status: StoreOrderingStatus,
  prepTimeMinutes: number,
): PublicStoreStatus {
  const effectivePrepTimeMinutes =
    status === "busy" ? Math.max(prepTimeMinutes, 30) : prepTimeMinutes;

  switch (status) {
    case "busy":
      return {
        label: "Busy",
        message: `Ordering is open. Prep time is longer, around ${effectivePrepTimeMinutes} minutes.`,
        orderingAllowed: true,
        prepTimeMinutes: effectivePrepTimeMinutes,
        status,
      };
    case "paused":
      return {
        label: "Paused",
        message: "Online ordering is temporarily unavailable.",
        orderingAllowed: false,
        prepTimeMinutes,
        status,
      };
    case "closed":
      return {
        label: "Closed",
        message: "The restaurant is closed, so online ordering is disabled.",
        orderingAllowed: false,
        prepTimeMinutes,
        status,
      };
    case "open":
      return {
        label: "Open",
        message: `Ordering is open. Prep time is around ${prepTimeMinutes} minutes.`,
        orderingAllowed: true,
        prepTimeMinutes,
        status,
      };
  }
}

export async function getPublicStoreStatus(): Promise<PublicStoreStatus> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("restaurant_operations")
      .select("store_status, prep_time_minutes")
      .eq("restaurant_id", getRestaurantId())
      .maybeSingle();

    if (error || !data || typeof data !== "object") {
      return buildPublicStatus("open", fallbackPrepTimeMinutes);
    }

    const row = data as UnknownRecord;
    const status = normalizeStatus(readString(row, "store_status"));
    const prepTimeMinutes = clampPrepTime(
      readNumber(row, "prep_time_minutes", fallbackPrepTimeMinutes),
    );

    return buildPublicStatus(status, prepTimeMinutes);
  } catch {
    return buildPublicStatus("open", fallbackPrepTimeMinutes);
  }
}
