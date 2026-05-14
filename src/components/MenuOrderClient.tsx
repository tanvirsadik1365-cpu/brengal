"use client";

import Link from "next/link";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BadgePercent,
  CheckCircle2,
  Clock,
  Flame,
  Gift,
  Minus,
  Plus,
  ReceiptText,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { StoreStatusNotice } from "@/components/StoreStatusNotice";
import { useStoreStatus } from "@/components/useStoreStatus";
import {
  DELIVERY_MINIMUM,
  formatCurrency,
  getActiveReward,
  getCollectionDiscount,
  getOrderTotal,
  parseFirstPrice,
  type ActiveReward,
  type CartItem,
  type OrderType,
} from "@/lib/order";
import {
  menuSections,
  offers,
  restaurant,
} from "@/lib/restaurant";

type MenuCategory = {
  id: string;
  title: string;
  detail: string;
  count: number;
  icon: string;
};

const featuredPickNames = [
  "Bengal Boat Curry",
  "Tandoori Mixed Grill",
  "Old Delhi Butter Chicken",
  "Hyderabadi Dum Biriyani",
];

const featuredPicks = featuredPickNames
  .map((name) => {
    const section = menuSections.find((menuSection) =>
      menuSection.items.some((item) => item.name === name),
    );
    const item = section?.items.find((menuItem) => menuItem.name === name);

    if (!section || !item) {
      return null;
    }

    return {
      id: `${section.id}-${item.name}`,
      name: item.name,
      displayName: item.name,
      category: section.title,
      priceLabel: item.price,
      unitPrice: parseFirstPrice(item.price),
      reason:
        {
          "Bengal Boat Curry": "Tiger king prawns with Bengal coriander sauce.",
          "Tandoori Mixed Grill": "A generous sizzling mix from the tandoor.",
          "Old Delhi Butter Chicken": "Mild, buttery and built for comfort.",
          "Hyderabadi Dum Biriyani": "Clay-pot rice with aromatic Hyderabad spices.",
        }[item.name] ?? section.description,
    };
  })
  .filter((item): item is NonNullable<typeof item> => item !== null);

function Price({ value }: { value: string }) {
  const parts = value.split(" / ");

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          {index > 0 ? " / " : ""}
          &pound;{part}
        </Fragment>
      ))}
    </>
  );
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function categoryMatches(query: string, values: Array<string | undefined>) {
  if (!query) {
    return true;
  }

  return values.some((value) => value?.toLowerCase().includes(query));
}

function getCategoryIcon(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("tandoori")) {
    return "Fire";
  }

  if (normalized.includes("biryani")) {
    return "Rice";
  }

  if (
    normalized.includes("bread") ||
    normalized.includes("rice") ||
    normalized.includes("roti") ||
    normalized.includes("nan")
  ) {
    return "Side";
  }

  if (normalized.includes("vegetable")) {
    return "Veg";
  }

  if (normalized.includes("starter")) {
    return "Bite";
  }

  if (normalized.includes("set meal") || normalized.includes("feast")) {
    return "Feast";
  }

  return "Dish";
}

function getItemTags(name: string, category: string, popular?: boolean) {
  const normalized = `${name} ${category}`.toLowerCase();
  const tags = new Set<string>();

  if (popular) {
    tags.add("Bestseller");
  }

  if (
    normalized.includes("chef") ||
    normalized.includes("special") ||
    normalized.includes("balti") ||
    normalized.includes("mixed grill")
  ) {
    tags.add("Chef pick");
  }

  if (normalized.includes("vegetable") || normalized.includes("paneer")) {
    tags.add("Vegetarian");
  }

  if (
    normalized.includes("tandoori") ||
    normalized.includes("tikka") ||
    normalized.includes("shashlick")
  ) {
    tags.add("Tandoor");
  }

  return Array.from(tags).slice(0, 3);
}

function getSpiceLevel(name: string, detail: string) {
  const normalized = `${name} ${detail}`.toLowerCase();

  if (
    normalized.includes("naga") ||
    normalized.includes("vindaloo") ||
    normalized.includes("very hot")
  ) {
    return 3;
  }

  if (
    normalized.includes("madras") ||
    normalized.includes("jalfrezi") ||
    normalized.includes("hot")
  ) {
    return 2;
  }

  if (
    normalized.includes("spice") ||
    normalized.includes("medium") ||
    normalized.includes("balti")
  ) {
    return 1;
  }

  return 0;
}

function SpiceIndicator({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.1em] text-[#6A5B49]">
      <span className="text-[#8B7B66]">Spice</span>
      <span className="inline-flex gap-0.5">
        {[1, 2, 3].map((item) => (
          <span
            key={item}
            className={`h-1.5 w-1.5 rounded-full ${
              item <= level ? "bg-[#FDBE35]" : "bg-[#D8CBB7]"
            }`}
          />
        ))}
      </span>
    </span>
  );
}

function getRewardLabel(subtotal: number, orderType: OrderType) {
  if (orderType === "delivery") {
    return subtotal > 0 ? "10% direct offer + free delivery" : "Free delivery in MK18 and MK17";
  }

  if (subtotal > 0) {
    return "10% direct offer active";
  }

  return "Add a dish to unlock 10% off";
}

function getCompactRewardTitle(reward: ActiveReward) {
  switch (reward.type) {
    case "direct-discount":
      return "10% off";
    default:
      return reward.title;
  }
}

export function MenuOrderClient() {
  const cartStore = useCart();
  const { cart, cartItems, itemCount, orderType } = cartStore;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    menuSections[0]?.id ?? "",
  );
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [rewardNotice, setRewardNotice] = useState<ActiveReward | null>(null);
  const { orderingAllowed, storeStatus } = useStoreStatus();

  const menuTopRef = useRef<HTMLDivElement>(null);
  const previousRewardTypeRef = useRef<ActiveReward["type"]>("none");
  const compactCategoryButtonRefs = useRef<
    Record<string, HTMLButtonElement | null>
  >({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const subtotal = cartItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
  const activeReward = getActiveReward(subtotal, orderType);
  const collectionDiscount = getCollectionDiscount(subtotal, activeReward);
  const unlockedReward =
    activeReward.type === "none" ? null : activeReward.title;
  const total = getOrderTotal(subtotal, activeReward);
  const progressPercent = subtotal > 0 ? 100 : 0;
  const needsDeliveryMinimum =
    orderType === "delivery" && subtotal > 0 && subtotal < DELIVERY_MINIMUM;
  const normalizedSearch = normalize(searchQuery);

  const visibleSections = useMemo(
    () =>
      menuSections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) =>
            categoryMatches(normalizedSearch, [
              item.name,
              item.price,
              item.description,
              section.title,
              section.description,
              section.priceNote,
            ]),
          ),
        }))
        .filter((section) => section.items.length > 0),
    [normalizedSearch],
  );

  const displayedSections = useMemo(() => {
    return visibleSections;
  }, [visibleSections]);
  const displayedCategories: MenuCategory[] = useMemo(
    () =>
      displayedSections.map((section) => ({
        id: section.id,
        title: section.title,
        detail: section.description,
        count: section.items.length,
        icon: getCategoryIcon(section.title),
      })),
    [displayedSections],
  );
  const displayedItemCount = displayedSections.reduce(
    (totalItems, section) => totalItems + section.items.length,
    0,
  );

  useEffect(() => {
    if (!displayedCategories.some((category) => category.id === activeCategory)) {
      setActiveCategory(displayedCategories[0]?.id ?? "");
    }
  }, [activeCategory, displayedCategories]);
  useEffect(() => {
    const previousType = previousRewardTypeRef.current;
    previousRewardTypeRef.current = activeReward.type;

    if (
      activeReward.type === "none" ||
      activeReward.type === previousType ||
      subtotal <= 0
    ) {
      return;
    }

    setRewardNotice(activeReward);
    const timeout = window.setTimeout(() => {
      setRewardNotice(null);
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, [activeReward, subtotal]);

  useEffect(() => {
    compactCategoryButtonRefs.current[activeCategory]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeCategory]);

  useEffect(() => {
    if (displayedSections.length < 2) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aTop = Math.abs(a.boundingClientRect.top - 190);
            const bTop = Math.abs(b.boundingClientRect.top - 190);

            return aTop - bTop;
          })[0];

        if (visibleSection?.target.id) {
          setActiveCategory(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-170px 0px -58% 0px",
        threshold: [0.08, 0.2, 0.4],
      },
    );

    displayedSections.forEach((section) => {
      const element = sectionRefs.current[section.id];

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [displayedSections]);

  function setSectionRef(id: string) {
    return (element: HTMLElement | null) => {
      sectionRefs.current[id] = element;
    };
  }

  function addItem(item: Omit<CartItem, "quantity">) {
    if (!orderingAllowed) {
      return;
    }

    cartStore.addItem(item);
  }

  function updateOrderType(nextOrderType: OrderType) {
    cartStore.setOrderType(nextOrderType);
  }

  function decreaseItem(id: string) {
    cartStore.decreaseItem(id);
  }

  function removeItem(id: string) {
    cartStore.removeItem(id);
  }

  function clearCart() {
    cartStore.clearCart();
  }

  function getQuantity(id: string) {
    return cart[id]?.quantity ?? 0;
  }

  function scrollToCategory(categoryId: string, clearSearch = false) {
    if (!displayedCategories.some((category) => category.id === categoryId)) {
      return;
    }

    setActiveCategory(categoryId);

    if (clearSearch) {
      setSearchQuery("");
    }

    window.setTimeout(() => {
      sectionRefs.current[categoryId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  }

  function resetMenuView() {
    setSearchQuery("");
    setActiveCategory(menuSections[0]?.id ?? "");
    menuTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function QuantityAction({
    id,
    item,
    quantity,
    compact = false,
  }: {
    id: string;
    item: Omit<CartItem, "quantity">;
    quantity: number;
    compact?: boolean;
  }) {
    if (quantity > 0) {
      return (
        <div
          className={`grid h-11 shrink-0 overflow-hidden rounded-full border border-[#E3D7C5] bg-[#FFFCF7] text-[#121212] ${
            compact
              ? "min-w-[100px] grid-cols-[32px_34px_32px]"
              : "grid-cols-[38px_34px_38px]"
          }`}
        >
          <button
            type="button"
            onClick={() => decreaseItem(id)}
            className="flex h-full items-center justify-center text-[#5F5A53] transition hover:bg-[#F5F2EC] hover:text-[#121212]"
            aria-label={`Decrease ${item.name}`}
          >
            <Minus size={15} aria-hidden="true" />
          </button>
          <span className="flex h-full items-center justify-center text-sm font-black text-[#121212]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => addItem(item)}
            disabled={!orderingAllowed}
            className="flex h-full items-center justify-center text-[#5F5A53] transition hover:bg-[#F5F2EC] hover:text-[#121212] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={`Increase ${item.name}`}
          >
            <Plus size={15} aria-hidden="true" />
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={() => addItem(item)}
        disabled={!orderingAllowed}
        aria-label={`Add ${item.name}`}
        className={`inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#FDBE35] text-sm font-black text-[#121212] shadow-[0_14px_34px_rgba(215,165,66,0.22)] transition hover:-translate-y-0.5 hover:bg-[#FFEFCB] disabled:cursor-not-allowed disabled:bg-[#F5F2EC] disabled:text-[#5F5A53] disabled:shadow-none ${
          compact ? "min-w-[86px] px-3" : "px-4"
        }`}
      >
        <Plus size={16} aria-hidden="true" />
        {orderingAllowed ? "Add" : storeStatus?.label ?? "Closed"}
      </button>
    );
  }

  function OrderMethodSelector({
    className = "",
    compact = false,
    idPrefix = "menu",
    showHelper = true,
  }: {
    className?: string;
    compact?: boolean;
    idPrefix?: string;
    showHelper?: boolean;
  }) {
    const methods = [
      {
        id: "collection" as const,
        title: "Collect",
        helper:
          subtotal > 0
            ? "10% direct offer active"
            : "Add a dish for 10% off",
      },
      {
        id: "delivery" as const,
        title: "Delivery",
        helper:
          getRewardLabel(subtotal, "delivery"),
      },
    ];
    const activeMethod =
      methods.find((method) => method.id === orderType) ?? methods[0];

    return (
      <div
        className={`border border-[#E3D7C5] bg-[#FFFCF7] shadow-[0_10px_24px_rgba(43,20,8,0.08)] ${
          compact ? "rounded-full p-1" : "max-w-2xl rounded-lg p-3"
        } ${className}`}
      >
        {!compact ? (
          <div className="mb-3 flex flex-col gap-1 px-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#FDBE35]">
              Order type
            </p>
            {showHelper ? (
              <p className="text-xs font-bold text-[#5F5A53]">
                {activeMethod.helper}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className="grid grid-cols-2 gap-1">
          {methods.map((method) => {
            const active = orderType === method.id;

            return (
              <button
                key={`${idPrefix}-${method.id}`}
                type="button"
                onClick={() => updateOrderType(method.id)}
                aria-pressed={active}
                className={`flex min-h-10 items-center justify-center rounded-full px-4 text-sm font-black transition ${
                  active
                    ? "bg-[#FDBE35] text-[#121212] shadow-md shadow-[#FDBE35]/15"
                    : "text-[#5F5A53] hover:bg-[#F5F2EC] hover:text-[#121212]"
                }`}
              >
                {method.title}
              </button>
            );
          })}
        </div>
        {compact && showHelper ? (
          <p className="px-3 pb-1 pt-2 text-center text-xs font-bold leading-5 text-[#5F5A53]">
            {activeMethod.helper}
          </p>
        ) : null}
      </div>
    );
  }

  function CategoryNav({ compact = false }: { compact?: boolean }) {
    return (
      <nav
        aria-label="Menu categories"
        className={
          compact
            ? "scrollbar-soft menu-category-rail flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 pt-0.5"
            : "scrollbar-soft grid max-h-[calc(100vh-210px)] gap-2 overflow-y-auto pr-1"
        }
      >
        {displayedCategories.map((category) => {
          const active = activeCategory === category.id;

          return (
            <button
              key={category.id}
              ref={
                compact
                  ? (element) => {
                      compactCategoryButtonRefs.current[category.id] = element;
                    }
                  : undefined
              }
              type="button"
              onClick={() => scrollToCategory(category.id, Boolean(normalizedSearch))}
              aria-pressed={active}
              className={`group ${
                compact
                  ? "flex h-12 w-[176px] shrink-0 snap-center items-center justify-center gap-2 rounded-full border px-3"
                  : "grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border px-4 py-3 text-left"
              } transition ${
                active
                  ? "border-[#FDBE35]/90 bg-[#FDBE35] text-[#121212] shadow-[0_12px_28px_rgba(215,165,66,0.24)]"
                  : compact
                    ? "border-[#E3D7C5] bg-[#FFFCF7] text-[#5F5A53] hover:border-[#FDBE35]/45 hover:text-[#121212]"
                    : "border-[#E3D7C5] bg-[#FFFCF7] text-[#5F5A53] hover:border-[#FDBE35]/45 hover:text-[#121212]"
              }`}
            >
              <span
                className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-black uppercase sm:inline-flex ${
                  active ? "bg-[#121212]/12" : "bg-[#F5F2EC] text-[#8F6216]"
                }`}
              >
                {category.icon}
              </span>
                <span className="min-w-0">
                  <span className="block text-sm font-black leading-[1.2]">
                    {category.title}
                  </span>
                  {!compact ? (
                    <span
                      className={`mt-1 block text-xs font-semibold leading-[1.3] ${
                        active ? "text-[#121212]/65" : "text-[#5F5A53]"
                      }`}
                    >
                      {category.detail}
                    </span>
                ) : null}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-black ${
                  active
                    ? "bg-[#121212]/12 text-[#121212]"
                    : "bg-[#F5F2EC] text-[#8F6216]"
                }`}
              >
                {category.count}
              </span>
            </button>
          );
        })}
      </nav>
    );
  }

  function MenuItemRow({
    id,
    name,
    category,
    priceLabel,
    unitPrice,
    detail,
    popular = false,
  }: Omit<CartItem, "quantity" | "displayName"> & {
    detail: string;
    popular?: boolean;
  }) {
    const orderItem = {
      id,
      name,
      displayName: name,
      category,
      priceLabel,
      unitPrice,
    };
    const quantity = getQuantity(id);
    const tags = getItemTags(name, category, popular);
    const spiceLevel = getSpiceLevel(name, detail);

    return (
      <article
        className="group rounded-2xl border border-[#DACCB6] bg-[#FFFCF7] p-4 shadow-[0_10px_20px_rgba(43,20,8,0.08)] transition hover:-translate-y-0.5 hover:border-[#C89626] sm:p-5"
      >
        <div className="grid min-w-0 gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start gap-2">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#B98316]">
                {category}
              </p>
              {tags.includes("Bestseller") ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#121212] px-2 py-0.5 text-[10px] font-black uppercase text-[#FDE3A0]">
                  <Sparkles size={11} aria-hidden="true" />
                  Bestseller
                </span>
              ) : null}
            </div>
            <h3 className="mt-2 break-words font-sans text-[1.72rem] font-extrabold leading-[1.18] text-[#121212]">
              {name}
            </h3>

            <p className="mt-3 max-w-3xl text-[1.02rem] leading-7 text-[#5F5A53]">
              {detail}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[#5F5A53]">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex min-h-7 items-center rounded-full border border-[#E3D7C5] bg-[#F5F2EC] px-2.5 text-[11px] font-black uppercase tracking-[0.06em] text-[#5F5A53]"
                >
                  {tag}
                </span>
              ))}
              <span className="inline-flex min-h-7 items-center gap-1 rounded-full border border-[#E3D7C5] bg-[#F5F2EC] px-2.5 text-[11px] font-black uppercase tracking-[0.06em] text-[#5F5A53]">
                <CheckCircle2 size={13} aria-hidden="true" />
                Cooked to order
              </span>
              {spiceLevel > 0 ? <SpiceIndicator level={spiceLevel} /> : null}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 sm:min-w-[148px] sm:flex-col sm:items-stretch sm:justify-center">
            <p className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#121212] px-5 text-xl font-black text-[#FDE3A0] shadow-[inset_0_0_0_1px_rgba(253,190,53,0.35)]">
              <Price value={priceLabel} />
            </p>
            <QuantityAction id={id} item={orderItem} quantity={quantity} compact />
          </div>
        </div>
      </article>
    );
  }

  function FeaturedPicks() {
    return (
      <section
        id="popular-picks"
        ref={setSectionRef("popular-picks")}
        className="scroll-mt-[178px] rounded-2xl border border-[#E3D7C5] bg-[#FFFCF7] p-5 shadow-[0_12px_28px_rgba(43,20,8,0.08)] sm:p-6 lg:scroll-mt-[116px]"
      >
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#FDBE35] px-3 py-1.5 text-xs font-black uppercase text-[#121212]">
            <Sparkles size={14} aria-hidden="true" />
            Popular picks
          </p>
          <h2 className="mt-3 text-[2.2rem] font-black leading-tight text-[#121212]">
            Start with a favourite
          </h2>
          <p className="mt-2 text-[1.02rem] leading-7 text-[#5F5A53]">
            Comfort curries, tandoor favourites and sharing dishes people come
            back for.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {featuredPicks.map((item) => {
            const quantity = getQuantity(item.id);

            return (
              <article
                key={item.id}
                className="group flex min-h-[238px] flex-col rounded-2xl border border-[#E3D7C5] bg-[#FFFCF7] p-4 shadow-[0_10px_24px_rgba(43,20,8,0.08)] transition hover:-translate-y-1 hover:border-[#FDBE35]/55"
              >
                <div className="flex flex-1 flex-col">
                  <span className="w-fit rounded-full bg-[#FDBE35] px-2.5 py-1 text-[11px] font-black uppercase text-[#121212]">
                    Chef pick
                  </span>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-[#FDBE35]">
                    {item.category}
                  </p>
                  <h3 className="mt-2 break-words font-sans text-[1.5rem] font-extrabold leading-snug text-[#121212]">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-[1.02rem] leading-7 text-[#5F5A53]">
                    {item.reason}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <p className="inline-flex min-h-10 items-center rounded-full border border-[#FDBE35]/25 bg-[#FDBE35]/12 px-4 text-lg font-black text-[#FDBE35]">
                      <Price value={item.priceLabel} />
                    </p>
                    <QuantityAction
                      id={item.id}
                      item={item}
                      quantity={quantity}
                      compact
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  function BasketPanel() {
    const recommendedAddOns = featuredPicks
      .filter((item) => !cart[item.id])
      .slice(0, 2);

    return (
      <aside
        id="checkout"
        className="hidden h-fit max-h-[calc(100vh-112px)] scroll-mt-[170px] flex-col overflow-hidden rounded-2xl border border-[#E3D7C5] bg-[#FFFCF7] p-5 text-[#121212] shadow-[0_14px_34px_rgba(43,20,8,0.1)] lg:sticky lg:top-24 lg:flex lg:scroll-mt-24"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FDBE35]">
              Basket
            </p>
            <h2 className="mt-1 text-2xl font-black">Your order</h2>
            <p className="mt-1 text-sm font-semibold text-[#5F5A53]">
              {itemCount} {itemCount === 1 ? "item" : "items"} selected
            </p>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FDBE35] text-[#121212] shadow-lg shadow-[#FDBE35]/20">
            <ShoppingBag size={21} aria-hidden="true" />
          </span>
        </div>

        {orderingAllowed ? (
          <Link
            href="/cart"
            className="mt-5 grid min-h-12 grid-cols-[1fr_auto] items-center gap-3 rounded-full bg-[#FDBE35] px-5 text-sm font-black text-[#121212] shadow-lg shadow-[#FDBE35]/20 transition hover:bg-[#FFEFCB]"
          >
            <span className="inline-flex items-center gap-2">
              <ShoppingBag size={16} aria-hidden="true" />
              Go to Cart & Pay
            </span>
            <span className="rounded-full bg-[#121212]/12 px-3 py-1 text-xs text-[#121212]">
              {formatCurrency(total)}
            </span>
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="mt-5 grid min-h-12 w-full grid-cols-[1fr_auto] items-center gap-3 rounded-full bg-[#F5F2EC] px-5 text-sm font-black text-[#121212]/55"
          >
            <span className="inline-flex items-center gap-2">
              <ShoppingBag size={16} aria-hidden="true" />
              Ordering unavailable
            </span>
            <span className="rounded-full bg-[#EEDBB2] px-3 py-1 text-xs text-[#121212]">
              {storeStatus?.label ?? "Closed"}
            </span>
          </button>
        )}

        <div className="scrollbar-soft mt-5 min-h-0 flex-1 overflow-y-auto pr-1">
          <OrderMethodSelector compact idPrefix="basket" showHelper={false} />

        <StoreStatusNotice className="mt-4" storeStatus={storeStatus} />

        {unlockedReward ? (
          <div
            className="mt-4 rounded-lg border border-[#FDBE35]/35 bg-[#FDBE35]/12 p-4"
          >
            <p className="flex items-center gap-2 text-sm font-black text-[#FDE3A0]">
              <Sparkles size={17} aria-hidden="true" />
              Offer unlocked
            </p>
            <p className="mt-2 text-lg font-black text-[#121212]">
              {activeReward.title}
            </p>
            <p className="mt-1 text-[1.02rem] leading-7 text-[#5F5A53]">
              {activeReward.detail}
            </p>
          </div>
        ) : null}

        {cartItems.length > 0 ? (
          <button
            type="button"
            onClick={clearCart}
            className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-[#E3D7C5] bg-[#F5F2EC] text-xs font-black uppercase text-[#5F5A53] transition hover:border-[#FDBE35]/45 hover:text-[#121212]"
          >
            <Trash2 size={14} aria-hidden="true" />
            Clear all
          </button>
        ) : null}

        {cartItems.length === 0 ? (
          <div className="mt-5 rounded-lg border border-dashed border-[#E3D7C5] bg-[#F5F2EC] p-6 text-center">
            <ShoppingBag
              className="mx-auto text-[#FDBE35]"
              size={32}
              aria-hidden="true"
            />
            <p className="mt-3 font-black">Your cart is empty</p>
            <p className="mt-2 text-[1.02rem] leading-7 text-[#5F5A53]">
              Add dishes to see your offers and total.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="rounded-lg border border-[#E3D7C5] bg-[#FFFCF7] p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="break-words font-black text-[#121212]">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#5F5A53]">
                      {item.category} | <Price value={item.priceLabel} />
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E3D7C5] text-[#5F5A53] transition hover:border-[#FDBE35]/45 hover:text-[#121212]"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <QuantityAction id={item.id} item={item} quantity={item.quantity} />
                  <p className="font-black text-[#FDBE35]">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-5 rounded-lg border border-[#FDBE35]/25 bg-[linear-gradient(135deg,rgba(253,190,53,0.2),rgba(43,20,8,0.08))] p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="text-[#FDBE35]" size={20} aria-hidden="true" />
            <h3 className="font-black">Offer progress</h3>
          </div>
          <p className="mt-3 text-sm leading-7 text-[#2A1D12]">
            {getRewardLabel(subtotal, orderType)}
          </p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#E3D7C5]">
            <div
              className="h-full rounded-full bg-[#FDBE35] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-3 text-xs leading-6 text-[#5F5A53]">
            {restaurant.deliveryInfo}. Bengal's 10% direct offer is applied
            before checkout.
          </p>
        </div>

        {recommendedAddOns.length > 0 ? (
          <div className="mt-5 rounded-lg border border-[#E3D7C5] bg-[#FFFCF7] p-4">
            <h3 className="flex items-center gap-2 font-black text-[#121212]">
              <Flame size={18} className="text-[#FDBE35]" aria-hidden="true" />
              Add something popular
            </h3>
            <div className="mt-3 grid gap-2">
              {recommendedAddOns.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => addItem(item)}
                  disabled={!orderingAllowed}
                  className="grid min-h-14 grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-[#E3D7C5] bg-[#FFFCF7] px-3 text-left transition hover:border-[#FDBE35]/45 disabled:opacity-50"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-black text-[#121212]">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block text-xs font-semibold text-[#5F5A53]">
                      <Price value={item.priceLabel} />
                    </span>
                  </span>
                  <Plus size={17} className="text-[#FDBE35]" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-5 rounded-lg border border-[#E3D7C5] bg-[#FFFCF7] p-4">
          <h3 className="flex items-center gap-2 font-black text-[#FDBE35]">
            <BadgePercent size={18} aria-hidden="true" />
            Bengal offers
          </h3>
          <div className="mt-3 grid gap-2">
            {offers.map((offer) => (
              <div key={offer.title} className="flex gap-3 rounded-lg bg-[#FFFCF7] p-3 shadow-sm">
                <Gift
                  className="mt-0.5 shrink-0 text-[#FDBE35]"
                  size={16}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-black text-[#121212]">{offer.title}</p>
                  <p className="mt-1 text-xs leading-5 text-[#5F5A53]">
                    {offer.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-3 rounded-lg border border-[#E3D7C5] bg-[#FFFCF7] p-4 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-[#5F5A53]">Subtotal</span>
            <span className="font-black">{formatCurrency(subtotal)}</span>
          </div>
          {collectionDiscount > 0 ? (
            <div className="flex justify-between gap-4">
              <span className="text-[#5F5A53]">Direct discount</span>
              <span className="font-black text-[#FDBE35]">
                -{formatCurrency(collectionDiscount)}
              </span>
            </div>
          ) : orderType === "delivery" ? (
            <div className="flex justify-between gap-4">
              <span className="text-[#5F5A53]">Delivery charge</span>
              <span className="font-black text-[#121212]">
                Free
              </span>
            </div>
          ) : null}
          <div className="flex justify-between gap-4">
             <span className="text-[#5F5A53]">Order type</span>
            <span className="font-black capitalize">{orderType}</span>
          </div>
          {unlockedReward ? (
            <div className="flex justify-between gap-4">
              <span className="text-[#5F5A53]">Offer</span>
              <span className="text-right font-black text-[#FDBE35]">
                {unlockedReward}
              </span>
            </div>
          ) : null}
          <div className="flex justify-between gap-4 border-t border-[#E3D7C5] pt-3 text-base">
            <span className="font-black">Total</span>
            <span className="font-black text-[#FDBE35]">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        {needsDeliveryMinimum ? (
          <p className="mt-3 rounded-lg border border-[#FDBE35]/25 bg-[#FDBE35]/10 p-3 text-xs font-bold leading-6 text-[#FDE3A0]">
            Delivery requires a minimum order of &pound;20. Add{" "}
            {formatCurrency(20 - subtotal)} more to continue.
          </p>
        ) : null}
        {orderingAllowed ? (
          <Link
            href="/cart"
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#FDBE35] text-sm font-black text-[#121212] shadow-lg shadow-[#FDBE35]/20 transition hover:bg-[#FFEFCB]"
          >
            <ShoppingBag size={16} aria-hidden="true" />
            Go to Cart & Pay
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#F5F2EC] text-sm font-black text-[#121212]/55"
          >
            <ShoppingBag size={16} aria-hidden="true" />
            {storeStatus?.label ?? "Ordering unavailable"}
          </button>
        )}
        </div>
      </aside>
    );
  }

  function MobileCartDrawer() {
    return (
      <>
        {mobileCartOpen ? (
          <>
            <button
              type="button"
              aria-label="Close cart"
              className="fixed inset-0 z-40 bg-black/62 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileCartOpen(false)}
            />
            <aside
              className="fixed inset-x-0 bottom-0 z-50 max-h-[86svh] overflow-hidden rounded-t-[1.5rem] border border-white/10 bg-[#120D0B] text-white shadow-[0_-24px_70px_rgba(0,0,0,0.48)] lg:hidden"
              aria-label="Cart drawer"
            >
              <div className="mx-auto h-1.5 w-12 rounded-full bg-[#FCE8C1]/18 mt-3" />
              <div className="flex items-start justify-between gap-4 px-4 pb-3 pt-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#FDBE35]">
                    Your cart
                  </p>
                  <h2 className="mt-1 text-2xl font-black">
                    {itemCount} {itemCount === 1 ? "item" : "items"} ready
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-[#5F5A53]">
                    {getRewardLabel(subtotal, orderType)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileCartOpen(false)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-[#FCE8C1]/8 text-white"
                  aria-label="Close cart"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="px-4 pb-3">
                <OrderMethodSelector compact idPrefix="drawer" showHelper={false} />
              </div>

              <div className="px-4 pb-3">
                <div className="h-2 overflow-hidden rounded-full bg-[#FCE8C1]/12">
                  <div
                    className="h-full rounded-full bg-[#FDBE35] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="scrollbar-soft max-h-[44svh] space-y-3 overflow-y-auto px-4 pb-4">
                {cartItems.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-lg border border-[#E3D7C5] bg-[#FFFCF7] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="break-words font-black">{item.name}</h3>
                        <p className="mt-1 text-xs font-semibold text-white/48">
                          {item.category} | <Price value={item.priceLabel} />
                        </p>
                      </div>
                      <p className="shrink-0 font-black text-[#FDBE35]">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <QuantityAction id={item.id} item={item} quantity={item.quantity} compact />
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#E3D7C5] px-3 text-xs font-black uppercase text-[#5F5A53]"
                      >
                        <Trash2 size={14} aria-hidden="true" />
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="border-t border-white/10 bg-[#121212] px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-[#5F5A53]">Total</span>
                  <span className="text-xl font-black text-[#FDBE35]">
                    {formatCurrency(total)}
                  </span>
                </div>
                <Link
                  href="/cart"
                  className="grid min-h-14 grid-cols-[1fr_auto] items-center rounded-full bg-[#FDBE35] px-5 text-sm font-black text-[#121212] shadow-[0_16px_38px_rgba(215,165,66,0.24)]"
                >
                  <span>Checkout</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </>
        ) : null}
      </>
    );
  }

  return (
    <section className="bg-[radial-gradient(circle_at_top,rgba(253,190,53,0.14),transparent_42%),#F5F2EC] px-4 pb-28 pt-6 text-[#121212] sm:px-6 sm:pt-8 lg:px-8 lg:pb-16">
      <div className="mx-auto max-w-[1500px]">
        <div className="relative mb-5 overflow-hidden rounded-2xl border border-[#E3D7C5] bg-[#FFFCF7] p-4 shadow-[0_14px_34px_rgba(43,20,8,0.08)] sm:p-5 lg:p-6">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(253,190,53,0.14),rgba(43,20,8,0.06)_48%,rgba(245,242,236,0)_100%)]" />
          <div className="relative z-10">
            <div className="grid gap-5">
              <div className="min-w-0">
                <p className="inline-flex items-center gap-2 rounded-full bg-[#FDBE35] px-3 py-1.5 text-xs font-black uppercase text-[#121212]">
                  <Flame size={14} aria-hidden="true" />
                  Bengal menu
                </p>
                <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-[#121212] sm:text-5xl">
                  Order Bengal Menu Online
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5F5A53] sm:text-base">
                  Explore starters, curries, biryani, tandoori grill, rice and
                  fresh naan. Choose collection or free local delivery in MK17
                  and MK18.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-2 rounded-xl border border-[#E3D7C5] bg-[#FFFCF7] p-2 shadow-[0_10px_24px_rgba(43,20,8,0.08)] min-[920px]:grid-cols-[minmax(260px,1fr)_150px_150px_minmax(270px,1fr)] min-[920px]:items-stretch">
              <OrderMethodSelector
                className="h-full min-h-14"
                compact
                idPrefix="hero"
                showHelper={false}
              />

              {[
                ["Free", "Delivery charge"],
                ["MK17/MK18", "Delivery area"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="flex min-h-14 items-center rounded-lg border border-[#E3D7C5] bg-[#FFFCF7] px-4 py-2 shadow-sm"
                >
                  <div>
                    <p className="whitespace-nowrap text-xl font-black leading-none text-[#FDBE35]">
                      {value}
                    </p>
                    <p className="mt-1 whitespace-nowrap text-[10px] font-black uppercase tracking-wide text-[#5F5A53]">
                      {label}
                    </p>
                  </div>
                </div>
              ))}

              {storeStatus ? (
                <div className="flex min-h-14 items-center rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold leading-5 text-emerald-900">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 font-black">
                    {storeStatus.status === "busy" ? (
                      <Clock size={16} aria-hidden="true" />
                    ) : (
                      <CheckCircle2 size={16} aria-hidden="true" />
                    )}
                    Store status: {storeStatus.label}
                    </p>
                    <p className="mt-1 text-xs font-bold min-[920px]:truncate">
                      {storeStatus.message}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="menu-order-layout">
          <aside className="hidden h-fit rounded-2xl border border-[#E3D7C5] bg-[#FFFCF7] p-4 text-[#121212] shadow-[0_10px_24px_rgba(43,20,8,0.08)] lg:sticky lg:top-24 lg:block">
            <div className="flex items-center gap-2">
              <ReceiptText className="text-[#FDBE35]" size={20} aria-hidden="true" />
              <h2 className="font-black text-[#121212]">Categories</h2>
            </div>
            <div className="mt-4">
              <CategoryNav />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="sticky top-[72px] z-30 -mx-4 border-y border-[#E3D7C5] bg-[#F5F2EC]/96 px-4 py-3 shadow-[0_8px_20px_rgba(43,20,8,0.08)] backdrop-blur-xl sm:-mx-6 sm:px-6 lg:top-24 lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:shadow-none lg:backdrop-blur-none">
              <label className="relative block rounded-full border border-[#E3D7C5] bg-white shadow-[0_6px_16px_rgba(43,20,8,0.08)]">
                <span className="sr-only">Search menu</span>
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#5F5A53]"
                  size={18}
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search curry, biryani, naan..."
                  className="h-12 w-full rounded-full bg-transparent pl-11 pr-11 text-sm font-semibold text-[#121212] outline-none transition placeholder:text-[#5F5A53] focus:ring-4 focus:ring-[#FDBE35]/12"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#5F5A53] transition hover:bg-[#F5F2EC] hover:text-[#121212]"
                    aria-label="Clear search"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                ) : null}
              </label>

              <div className="menu-category-rail-wrap mt-3 lg:hidden">
                <CategoryNav compact />
              </div>
            </div>

            <div className="mt-6">
              <FeaturedPicks />
            </div>

            <div
              ref={menuTopRef}
              className="mt-6 scroll-mt-[178px] lg:scroll-mt-[116px]"
            >
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FDBE35]">
                    {normalizedSearch ? "Search results" : "Full menu"}
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-[#121212]">
                    {normalizedSearch
                      ? "Dishes matching your search"
                      : "Browse the full menu"}
                  </h2>
                  <p className="mt-2 text-[1.02rem] leading-7 text-[#5F5A53]">
                    {displayedItemCount} dishes shown.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-black uppercase text-[#5F5A53]">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#E3D7C5] bg-[#FFFCF7] px-3 py-2">
                    <Clock size={14} aria-hidden="true" />
                    Lunch & dinner service
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#E3D7C5] bg-[#FFFCF7] px-3 py-2">
                    <ShoppingBag size={14} aria-hidden="true" />
                    {itemCount} in basket
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {displayedSections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    ref={setSectionRef(section.id)}
                    className="scroll-mt-[178px] overflow-hidden rounded-2xl border border-[#E3D7C5] bg-[#FFFCF7] shadow-[0_12px_28px_rgba(43,20,8,0.08)] lg:scroll-mt-[116px]"
                  >
                    <div className="border-b border-[#E3D7C5] bg-[#FFFCF7] p-5 sm:p-6">
                      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_150px] sm:items-stretch">
                        <div className="flex min-w-0 flex-col justify-center">
                          <h2 className="break-words text-3xl font-black leading-tight text-[#121212] sm:text-4xl">
                            {section.title}
                          </h2>
                          <p className="mt-3 max-w-2xl text-base leading-7 text-[#5F5A53]">
                            {section.description}
                          </p>
                        </div>
                        <div className="grid gap-2 sm:justify-items-end">
                          <span className="grid min-h-24 w-full place-items-center rounded-lg border border-[#FDBE35]/20 bg-[#FDBE35]/10 px-4 text-center text-[#FDBE35] sm:min-h-full">
                            <span>
                              <span className="block text-3xl font-black leading-none">
                                {section.items.length}
                              </span>
                              <span className="mt-2 block text-xs font-black uppercase tracking-[0.18em]">
                                dishes
                              </span>
                            </span>
                          </span>
                          {section.priceNote ? (
                            <span className="inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-[#FDBE35] px-4 text-center text-xs font-black uppercase text-[#121212]">
                              {section.priceNote}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 p-4 sm:p-5">
                      {section.items.map((item) => {
                        const id = `${section.id}-${item.name}`;

                        return (
                          <MenuItemRow
                            key={item.name}
                            id={id}
                            name={item.name}
                            category={section.title}
                            priceLabel={item.price}
                            unitPrice={parseFirstPrice(item.price)}
                            detail={item.description || section.description}
                            popular={"popular" in item && Boolean(item.popular)}
                          />
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>

              {normalizedSearch && displayedItemCount === 0 ? (
                <div className="rounded-lg border border-dashed border-[#E3D7C5] bg-[#F5F2EC] p-8 text-center">
                  <Search
                    className="mx-auto text-[#FDBE35]"
                    size={34}
                    aria-hidden="true"
                  />
                  <h2 className="mt-4 text-[2.2rem] font-black leading-tight text-[#121212]">No dishes found</h2>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#5F5A53]">
                    Try another dish name or clear the search.
                  </p>
                  <button
                    type="button"
                    onClick={resetMenuView}
                    className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#FDBE35] px-5 text-sm font-black text-[#121212] transition hover:bg-[#FFEFCB]"
                  >
                    Clear search
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <BasketPanel />
        </div>
      </div>

      {cartItems.length > 0 ? (
        <>
          <button
            type="button"
            onClick={() => setMobileCartOpen(true)}
            className="fixed bottom-4 left-4 right-4 z-30 grid h-14 grid-cols-[1fr_auto] items-center rounded-full bg-[#FDBE35] px-5 text-sm font-black text-[#121212] shadow-2xl shadow-black/25 lg:hidden"
            aria-label="Open cart"
          >
            <span>
              {itemCount} {itemCount === 1 ? "Item" : "Items"} &bull;{" "}
              {formatCurrency(total)}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#121212]/12 px-3 py-1 text-[#121212]">
              Checkout
              <ArrowRight size={15} aria-hidden="true" />
            </span>
          </button>
          <Link
            href="/cart"
            className="fixed bottom-6 right-6 z-30 hidden min-h-14 items-center gap-4 rounded-full border border-[#FDBE35]/30 bg-[#FDBE35] px-5 text-sm font-black text-[#121212] shadow-[0_18px_46px_rgba(0,0,0,0.36)] transition hover:-translate-y-0.5 hover:bg-[#FFEFCB] lg:left-1/2 lg:right-auto lg:flex lg:-translate-x-1/2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#121212]/12">
              <ShoppingBag size={17} aria-hidden="true" />
            </span>
            <span>
              Cart
              <span className="block text-xs font-bold text-[#121212]/70">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </span>
            <span className="rounded-full bg-[#121212]/12 px-3 py-1 text-[#121212]">
              {formatCurrency(total)}
            </span>
          </Link>
          <MobileCartDrawer />
        </>
      ) : null}

      {rewardNotice ? (
          <div
            className="fixed inset-x-3 bottom-24 z-40 mx-auto max-w-md overflow-hidden rounded-lg border border-[#FDBE35]/35 bg-[#1A1A1A]/96 p-3 text-white shadow-[0_18px_46px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:inset-x-auto lg:bottom-6 lg:right-6 lg:w-[380px]"
            role="status"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-[#FDBE35]" />
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FDBE35] text-[#121212]">
                <Sparkles size={19} aria-hidden="true" />
              </span>
              <p className="min-w-0">
                <span className="block text-[11px] font-black uppercase tracking-[0.14em] text-[#FDE3A0]">
                  Offer unlocked
                </span>
                <span className="mt-0.5 block truncate text-base font-black">
                  {getCompactRewardTitle(rewardNotice)}
                </span>
                <span className="mt-0.5 block truncate text-xs font-semibold text-white/62">
                  {rewardNotice.detail}
                </span>
              </p>
            </div>
          </div>
        ) : null}
    </section>
  );
}





