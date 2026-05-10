import { menuSections } from "@/lib/restaurant";

export type OrderType = "collection" | "delivery";
export type CustomerMode = "guest" | "signin";

export type CatalogItem = {
  id: string;
  name: string;
  displayName: string;
  category: string;
  priceLabel: string;
  unitPrice: number;
};

export type CartLine = {
  id: string;
  quantity: number;
};

export type CartItem = CatalogItem & {
  quantity: number;
};

export type RewardType =
  | "none"
  | "collection-discount"
  | "onion-bhaji"
  | "side-dish"
  | "combo";

export type ActiveReward = {
  type: RewardType;
  title: string;
  detail: string;
  requiresSideDish: boolean;
};

export const DELIVERY_MINIMUM = 20;
export const COLLECTION_DISCOUNT_THRESHOLD = 20;
export const DELIVERY_ONION_BHAJI_THRESHOLD = 30;
export const DELIVERY_SIDE_DISH_THRESHOLD = 45;
export const DELIVERY_COMBO_THRESHOLD = 60;

export const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function parseFirstPrice(value: string) {
  const firstPrice = value.split("/")[0]?.trim() ?? "0";
  return Number.parseFloat(firstPrice) || 0;
}

export function toPence(value: number) {
  return Math.round(value * 100);
}

export function getCatalogItems(): CatalogItem[] {
  const sectionItems = menuSections.flatMap((section) =>
    section.items.map((item) => ({
      id: `${section.id}-${item.name}`,
      name: item.name,
      displayName: item.name,
      category: section.title,
      priceLabel: item.price,
      unitPrice: parseFirstPrice(item.price),
    })),
  );

  return sectionItems;
}

export function getCatalogMap() {
  return new Map(getCatalogItems().map((item) => [item.id, item]));
}

export function buildCartItems(lines: CartLine[]) {
  const catalog = getCatalogMap();
  const merged = new Map<string, number>();

  for (const line of lines) {
    if (!line.id || !Number.isFinite(line.quantity)) {
      continue;
    }

    const quantity = Math.max(0, Math.min(Math.floor(line.quantity), 99));

    if (quantity > 0) {
      merged.set(line.id, (merged.get(line.id) ?? 0) + quantity);
    }
  }

  return Array.from(merged.entries())
    .map(([id, quantity]) => {
      const item = catalog.get(id);

      if (!item) {
        return null;
      }

      return { ...item, quantity };
    })
    .filter((item): item is CartItem => item !== null);
}

export function getSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
}

export function getActiveReward(subtotal: number, orderType: OrderType): ActiveReward {
  if (orderType === "delivery") {
    if (subtotal >= DELIVERY_COMBO_THRESHOLD) {
      return {
        type: "combo",
        title: "Free Onion Bhaji + Side Dish",
        detail:
          "Delivery reward: choose any side dish and receive a free Onion Bhaji.",
        requiresSideDish: true,
      };
    }

    if (subtotal >= DELIVERY_SIDE_DISH_THRESHOLD) {
      return {
        type: "side-dish",
        title: "Free Side Dish",
        detail: "Delivery reward: choose any side dish from the side dish menu.",
        requiresSideDish: true,
      };
    }

    if (subtotal >= DELIVERY_ONION_BHAJI_THRESHOLD) {
      return {
        type: "onion-bhaji",
        title: "Free Onion Bhaji",
        detail: "Delivery reward: Onion Bhaji is included automatically.",
        requiresSideDish: false,
      };
    }
  }

  if (orderType === "collection" && subtotal >= COLLECTION_DISCOUNT_THRESHOLD) {
    return {
      type: "collection-discount",
      title: "10% Collection Discount",
      detail: "Collection order reward. No other offer is applied.",
      requiresSideDish: false,
    };
  }

  return {
    type: "none",
    title: "No reward yet",
    detail:
      orderType === "delivery"
        ? `${formatCurrency(
            Math.max(DELIVERY_ONION_BHAJI_THRESHOLD - subtotal, 0),
          )} more for the first delivery reward.`
        : `${formatCurrency(Math.max(COLLECTION_DISCOUNT_THRESHOLD - subtotal, 0))} more for the first reward.`,
    requiresSideDish: false,
  };
}

export function getCollectionDiscount(subtotal: number, reward: ActiveReward) {
  return reward.type === "collection-discount" ? subtotal * 0.1 : 0;
}

export function getOrderTotal(subtotal: number, reward: ActiveReward) {
  return Math.max(subtotal - getCollectionDiscount(subtotal, reward), 0);
}

export function getSideDishOptions() {
  return getCatalogItems().filter(
    (item) => item.category === "Vegetable Side Dishes",
  );
}

export function normalizeGbPhone(value: string) {
  const compact = value.replace(/[\s().-]/g, "");

  if (compact.startsWith("+44")) {
    const rest = compact.slice(3);
    return `0${rest.replace(/^0/, "")}`;
  }

  if (compact.startsWith("0044")) {
    const rest = compact.slice(4);
    return `0${rest.replace(/^0/, "")}`;
  }

  return compact;
}

export function isValidGbPhone(value: string) {
  const normalized = normalizeGbPhone(value);

  return /^0(?:1\d{8,9}|2\d{8,9}|3\d{8,9}|7\d{9}|8\d{8,9})$/.test(
    normalized,
  );
}

export function formatPostcode(value: string) {
  const compact = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

  if (compact.length <= 3) {
    return compact;
  }

  return `${compact.slice(0, -3)} ${compact.slice(-3)}`;
}

export function isValidDeliveryPostcode(value: string) {
  const formatted = formatPostcode(value);

  if (!/^[A-Z]{1,2}\d[A-Z\d]?\s\d[A-Z]{2}$/.test(formatted)) {
    return false;
  }

  return ["OX1", "OX2", "OX3", "OX4", "OX5"].includes(
    formatted.split(" ")[0],
  );
}
