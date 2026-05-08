"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  BadgePercent,
  ChevronDown,
  CheckCircle2,
  Clock,
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
  COLLECTION_DISCOUNT_THRESHOLD,
  DELIVERY_BOMBAY_ALOO_THRESHOLD,
  DELIVERY_COMBO_THRESHOLD,
  DELIVERY_MINIMUM,
  DELIVERY_ONION_BHAJI_THRESHOLD,
  formatCurrency,
  getActiveReward,
  getCollectionDiscount,
  getOrderTotal,
  parseFirstPrice,
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
};

const menuItemCount = menuSections.reduce(
  (total, section) => total + section.items.length,
  0,
);

const featuredPickNames = [
  "Butter Chicken",
  "Tandoori Mixed Grill Main",
  "Special Biryani",
  "Non Vegetarian Feast (per person)",
];

const categories: MenuCategory[] = [
  {
    id: "popular-picks",
    title: "Popular",
    detail: "Fast favourites",
    count: featuredPickNames.length,
  },
  {
    id: "all",
    title: "Full Menu",
    detail: "Browse everything",
    count: menuItemCount,
  },
  ...menuSections.map((section) => ({
    id: section.id,
    title: section.title,
    detail: section.description,
    count: section.items.length,
  })),
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
          "Butter Chicken": "Creamy, gently spiced, and always popular.",
          "Tandoori Mixed Grill Main": "A generous sizzling mix from the tandoor.",
          "Special Biryani": "Fragrant rice with a fuller house mix.",
          "Non Vegetarian Feast (per person)": "A ready-made feast for sharing.",
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

function getRewardLabel(subtotal: number, orderType: OrderType) {
  if (orderType === "delivery" && subtotal < DELIVERY_MINIMUM) {
    return `${formatCurrency(DELIVERY_MINIMUM - subtotal)} more for delivery`;
  }

  if (orderType === "delivery") {
    if (subtotal >= DELIVERY_COMBO_THRESHOLD) {
      return `${formatCurrency(DELIVERY_COMBO_THRESHOLD)} offer: Onion Bhaji + Bombay Aloo`;
    }

    if (subtotal >= DELIVERY_BOMBAY_ALOO_THRESHOLD) {
      return `${formatCurrency(DELIVERY_BOMBAY_ALOO_THRESHOLD)} offer: free Bombay Aloo`;
    }

    if (subtotal >= DELIVERY_ONION_BHAJI_THRESHOLD) {
      return `${formatCurrency(DELIVERY_ONION_BHAJI_THRESHOLD)} offer: free Onion Bhaji`;
    }
  }

  if (subtotal >= COLLECTION_DISCOUNT_THRESHOLD) {
    return orderType === "collection"
      ? "10% collection discount"
      : "Delivery minimum reached";
  }

  return `${formatCurrency(
    Math.max(COLLECTION_DISCOUNT_THRESHOLD - subtotal, 0),
  )} more for your first offer`;
}

export function MenuOrderClient() {
  const cartStore = useCart();
  const { cart, cartItems, itemCount, orderType } = cartStore;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [mobileOffersOpen, setMobileOffersOpen] = useState(false);
  const { orderingAllowed, storeStatus } = useStoreStatus();

  const menuTopRef = useRef<HTMLDivElement>(null);
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
  const rewardGoal =
    orderType === "delivery"
      ? DELIVERY_COMBO_THRESHOLD
      : COLLECTION_DISCOUNT_THRESHOLD;
  const progressPercent = Math.min((subtotal / rewardGoal) * 100, 100);
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

  const visibleItemCount = visibleSections.reduce(
    (totalItems, section) => totalItems + section.items.length,
    0,
  );

  useEffect(() => {
    if (normalizedSearch) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveCategory(visible.target.id);
        }
      },
      {
        rootMargin: "-170px 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [normalizedSearch, visibleSections.length]);

  useEffect(() => {
    compactCategoryButtonRefs.current[activeCategory]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeCategory]);

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
    setActiveCategory(categoryId);

    if (clearSearch) {
      setSearchQuery("");
    }

    window.setTimeout(() => {
      if (categoryId === "popular-picks") {
        scrollToPopularPicks();
        return;
      }

      if (categoryId === "all") {
        menuTopRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }

      sectionRefs.current[categoryId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  }

  function resetMenuView() {
    setSearchQuery("");
    scrollToCategory("all");
  }

  function scrollToPopularPicks() {
    setActiveCategory("popular-picks");
    document.getElementById("popular-picks")?.scrollIntoView({
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
          className={`grid h-10 shrink-0 overflow-hidden rounded-full border border-[#8A3430]/20 bg-white ${
            compact
              ? "min-w-[100px] grid-cols-[32px_34px_32px]"
              : "grid-cols-[38px_34px_38px]"
          }`}
        >
          <button
            type="button"
            onClick={() => decreaseItem(id)}
            className="flex h-full items-center justify-center text-[#241D1D] transition hover:bg-white hover:text-[#8A3430]"
            aria-label={`Decrease ${item.name}`}
          >
            <Minus size={15} aria-hidden="true" />
          </button>
          <span className="flex h-full items-center justify-center text-sm font-black text-[#241D1D]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => addItem(item)}
            disabled={!orderingAllowed}
            className="flex h-full items-center justify-center text-[#241D1D] transition hover:bg-white hover:text-[#8A3430] disabled:cursor-not-allowed disabled:opacity-40"
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
        className={`inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#8A3430] text-sm font-black text-white shadow-sm shadow-[#8A3430]/15 transition hover:-translate-y-0.5 hover:bg-[#6F2926] disabled:cursor-not-allowed disabled:bg-[#B8ADA3] disabled:shadow-none ${
          compact ? "min-w-[86px] px-3" : "px-4"
        }`}
      >
        <Plus size={16} aria-hidden="true" />
        {orderingAllowed ? "Add" : storeStatus?.label ?? "Closed"}
      </button>
    );
  }

  function CategoryNav({ compact = false }: { compact?: boolean }) {
    return (
      <nav
        aria-label="Menu categories"
        className={
          compact
            ? "scrollbar-soft flex snap-x gap-2 overflow-x-auto border-b border-[#E9DED2] pb-2"
            : "scrollbar-soft grid max-h-[calc(100vh-210px)] gap-2 overflow-y-auto pr-1"
        }
      >
        {categories.map((category) => {
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
              onClick={() => scrollToCategory(category.id)}
              aria-pressed={active}
              className={`group ${
                compact
                  ? "flex h-11 min-w-[118px] shrink-0 snap-start items-center justify-center gap-2 rounded-full border px-3"
                  : "grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border px-4 py-3 text-left"
              } transition ${
                active
                  ? "border-[#8A3430] bg-[#8A3430] text-white shadow-md shadow-[#8A3430]/15"
                  : compact
                    ? "border-[#E4D6C4] bg-white text-[#5F5552] hover:border-[#8A3430]/35 hover:text-[#8A3430]"
                    : "border-black/10 bg-white text-[#6B5D5B] hover:border-[#8A3430]/35 hover:text-[#8A3430]"
              }`}
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-black leading-none">
                  {category.title}
                </span>
                {!compact && category.id !== "all" ? (
                  <span
                    className={`mt-1 block truncate text-xs font-semibold ${
                      active ? "text-white/68" : "text-[#7B6D68]"
                    }`}
                  >
                    {category.detail}
                  </span>
                ) : null}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-black ${
                  active
                    ? "bg-white/18 text-white"
                    : "bg-[#FFF7EC] text-[#8A3430]"
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

  function MobileOffersDropdown() {
    return (
      <div className="mt-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOffersOpen((open) => !open)}
          aria-expanded={mobileOffersOpen}
          className="flex min-h-[58px] w-full items-center justify-between gap-3 rounded-lg border border-[#E4D6C4] bg-white px-3.5 text-left shadow-[0_10px_24px_rgba(52,35,28,0.08)]"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8A3430] text-white shadow-sm shadow-[#8A3430]/20">
              <BadgePercent size={17} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#8A3430]">
                Offers
              </span>
              <span className="mt-0.5 block truncate text-sm font-black leading-5 text-[#241D1D]">
                View today&apos;s rewards
              </span>
            </span>
          </span>
          <span className="hidden shrink-0 rounded-full bg-[#FFF7EC] px-2.5 py-1 text-[11px] font-black text-[#8A3430] min-[380px]:inline-flex">
            {offers.length}
          </span>
          <ChevronDown
            className={`shrink-0 text-[#8A3430] transition ${
              mobileOffersOpen ? "rotate-180" : ""
            }`}
            size={19}
            aria-hidden="true"
          />
        </button>

        {mobileOffersOpen ? (
          <div className="mt-2 overflow-hidden rounded-lg border border-[#E4D6C4] bg-white shadow-xl shadow-black/10">
            <div className="grid divide-y divide-[#F0E3D2]">
              {offers.map((offer) => (
                <div key={offer.title} className="grid gap-1 px-4 py-3">
                  <div className="flex items-start gap-3">
                    <Gift
                      className="mt-0.5 shrink-0 text-[#8A3430]"
                      size={17}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-black text-[#241D1D]">
                        {offer.title}
                      </p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-[#6B5D5B]">
                        {offer.detail}
                      </p>
                      <p className="mt-2 inline-flex rounded-full bg-[#FFF7EC] px-2.5 py-1 text-[11px] font-black uppercase text-[#8A3430]">
                        {offer.note}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#F0E3D2] bg-[#FFF9EF] p-3">
              <button
                type="button"
                onClick={() => {
                  setMobileOffersOpen(false);
                  scrollToPopularPicks();
                }}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#8A3430] px-4 text-sm font-black text-white shadow-md shadow-[#8A3430]/15 transition hover:bg-[#6F2926]"
              >
                <Sparkles size={16} aria-hidden="true" />
                Browse popular dishes
              </button>
            </div>
          </div>
        ) : null}
      </div>
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

    return (
      <article className="group rounded-lg border border-[#EADAC5] bg-white p-4 shadow-sm transition hover:border-[#8A3430]/35 hover:shadow-lg hover:shadow-black/5">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="break-words text-base font-black text-[#241D1D]">
                {name}
              </h3>
              {popular ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF7EC] px-2 py-1 text-[11px] font-black uppercase text-[#8A3430]">
                  <Sparkles size={12} aria-hidden="true" />
                  Popular
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm leading-6 text-[#6B5D5B]">{detail}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#7B6D68]">
              <CheckCircle2 size={14} aria-hidden="true" />
              Cooked to order
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
            <p className="text-lg font-black text-[#8A3430]">
              <Price value={priceLabel} />
            </p>
            <QuantityAction id={id} item={orderItem} quantity={quantity} />
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
        className="restaurant-card scroll-mt-[178px] rounded-lg p-5 shadow-lg shadow-black/5 sm:p-6 lg:scroll-mt-[116px]"
      >
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#FFF7EC] px-3 py-1.5 text-xs font-black uppercase text-[#8A3430]">
            <Sparkles size={14} aria-hidden="true" />
            Popular picks
          </p>
          <h2 className="mt-3 text-2xl font-black text-[#241D1D]">
            Start with a favourite
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6B5D5B]">
            Quick choices customers often add first.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featuredPicks.map((item) => {
            const quantity = getQuantity(item.id);

            return (
              <article
                key={item.id}
                className="flex min-h-[230px] flex-col rounded-lg border border-[#EADAC5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#8A3430]/35 hover:shadow-lg hover:shadow-black/5"
              >
                <div className="flex-1">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8A3430]">
                    {item.category}
                  </p>
                  <h3 className="mt-3 break-words text-xl font-black leading-snug text-[#241D1D]">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#6B5D5B]">
                    {item.reason}
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                  <p className="text-lg font-black text-[#8A3430]">
                    <Price value={item.priceLabel} />
                  </p>
                  <QuantityAction
                    id={item.id}
                    item={item}
                    quantity={quantity}
                    compact
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  function BasketPanel() {
    return (
      <aside
        id="checkout"
        className="restaurant-card h-fit scroll-mt-[170px] rounded-lg p-5 shadow-xl shadow-black/10 lg:sticky lg:top-24 lg:scroll-mt-24"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8A3430]">
              Basket
            </p>
            <h2 className="mt-1 text-2xl font-black">Your order</h2>
            <p className="mt-1 text-sm font-semibold text-[#6B5D5B]">
              {itemCount} {itemCount === 1 ? "item" : "items"} selected
            </p>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8A3430] text-white shadow-lg shadow-[#8A3430]/20">
            <ShoppingBag size={21} aria-hidden="true" />
          </span>
        </div>

        {orderingAllowed ? (
          <Link
            href="/cart"
            className="mt-5 grid min-h-12 grid-cols-[1fr_auto] items-center gap-3 rounded-full bg-[#8A3430] px-5 text-sm font-black text-white shadow-lg shadow-[#8A3430]/20 transition hover:bg-[#6F2926]"
          >
            <span className="inline-flex items-center gap-2">
              <ShoppingBag size={16} aria-hidden="true" />
              Go to Cart & Pay
            </span>
            <span className="rounded-full bg-[#D7A542] px-3 py-1 text-xs text-[#241D1D]">
              {formatCurrency(total)}
            </span>
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="mt-5 grid min-h-12 w-full grid-cols-[1fr_auto] items-center gap-3 rounded-full bg-[#B8ADA3] px-5 text-sm font-black text-white"
          >
            <span className="inline-flex items-center gap-2">
              <ShoppingBag size={16} aria-hidden="true" />
              Ordering unavailable
            </span>
            <span className="rounded-full bg-white/40 px-3 py-1 text-xs text-[#241D1D]">
              {storeStatus?.label ?? "Closed"}
            </span>
          </button>
        )}

        <StoreStatusNotice className="mt-5" storeStatus={storeStatus} />

        <div className="mt-5 rounded-lg border border-[#EADAC5] bg-[#FFF9EF] p-4">
          <p className="text-sm font-black text-[#241D1D]">
            Next: checkout
          </p>
          <p className="mt-2 text-xs font-semibold leading-6 text-[#6B5D5B]">
            Review your food, choose collection or delivery, then pay.
          </p>
        </div>

        {cartItems.length > 0 ? (
          <button
            type="button"
            onClick={clearCart}
            className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white text-xs font-black uppercase text-[#6B5D5B] transition hover:border-[#8A3430] hover:text-[#8A3430]"
          >
            <Trash2 size={14} aria-hidden="true" />
            Clear all
          </button>
        ) : null}

        {cartItems.length === 0 ? (
          <div className="mt-5 rounded-lg border border-dashed border-black/20 bg-white p-6 text-center">
            <ShoppingBag
              className="mx-auto text-[#8A3430]"
              size={32}
              aria-hidden="true"
            />
            <p className="mt-3 font-black">Your cart is empty</p>
            <p className="mt-2 text-sm leading-6 text-[#6B5D5B]">
              Add dishes to see your offers and total.
            </p>
          </div>
        ) : (
          <div className="scrollbar-soft mt-5 max-h-[360px] space-y-3 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="rounded-lg border border-black/10 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="break-words font-black text-[#241D1D]">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#756865]">
                      {item.category} | <Price value={item.priceLabel} />
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-[#6B5D5B] transition hover:border-[#8A3430] hover:text-[#8A3430]"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <QuantityAction id={item.id} item={item} quantity={item.quantity} />
                  <p className="font-black text-[#8A3430]">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="restaurant-brand-panel mt-5 rounded-lg p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="text-[#D7A542]" size={20} aria-hidden="true" />
            <h3 className="font-black">Offer progress</h3>
          </div>
          <p className="mt-3 text-sm leading-7 text-white/82">
            {getRewardLabel(subtotal, orderType)}
          </p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/18">
            <div
              className="h-full rounded-full bg-[#D7A542] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-3 text-xs leading-6 text-white/68">
            {restaurant.deliveryInfo}. Only one reward applies per order.
          </p>
        </div>

        <div className="mt-5 rounded-lg border border-[#EADAC5] bg-[#FFF9EF] p-4">
          <h3 className="flex items-center gap-2 font-black text-[#8A3430]">
            <BadgePercent size={18} aria-hidden="true" />
            One active reward
          </h3>
          <div className="mt-3 grid gap-2">
            {offers.map((offer) => (
              <div key={offer.title} className="flex gap-3 rounded-lg bg-white p-3 shadow-sm">
                <Gift
                  className="mt-0.5 shrink-0 text-[#8A3430]"
                  size={16}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-black">{offer.title}</p>
                  <p className="mt-1 text-xs leading-5 text-[#6B5D5B]">
                    {offer.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-[#EADAC5] bg-white p-4">
          <h3 className="font-black">Ready?</h3>
          <p className="mt-2 text-xs font-semibold leading-6 text-[#6B5D5B]">
            Go to the cart to choose collection or delivery and payment.
          </p>
        </div>

        <div className="mt-5 space-y-3 rounded-lg border border-[#EADAC5] bg-white p-4 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-[#6B5D5B]">Subtotal</span>
            <span className="font-black">{formatCurrency(subtotal)}</span>
          </div>
          {orderType === "collection" ? (
            <div className="flex justify-between gap-4">
              <span className="text-[#6B5D5B]">Collection discount</span>
              <span className="font-black text-[#8A3430]">
                -{formatCurrency(collectionDiscount)}
              </span>
            </div>
          ) : (
            <div className="flex justify-between gap-4">
              <span className="text-[#6B5D5B]">Delivery minimum</span>
              <span className="font-black text-[#241D1D]">
                {formatCurrency(20)}
              </span>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <span className="text-[#6B5D5B]">Order type</span>
            <span className="font-black capitalize">{orderType}</span>
          </div>
          {unlockedReward ? (
            <div className="flex justify-between gap-4">
              <span className="text-[#6B5D5B]">Reward</span>
              <span className="text-right font-black text-[#8A3430]">
                {unlockedReward}
              </span>
            </div>
          ) : null}
          <div className="flex justify-between gap-4 border-t border-black/10 pt-3 text-base">
            <span className="font-black">Total</span>
            <span className="font-black text-[#8A3430]">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        {needsDeliveryMinimum ? (
          <p className="mt-3 rounded-lg border border-[#8A3430]/15 bg-white p-3 text-xs font-bold leading-6 text-[#6F2926]">
            Delivery requires a minimum order of &pound;20. Add{" "}
            {formatCurrency(20 - subtotal)} more to continue.
          </p>
        ) : null}
        {orderingAllowed ? (
          <Link
            href="/cart"
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#8A3430] text-sm font-black text-white shadow-lg shadow-[#8A3430]/20 transition hover:bg-[#6F2926]"
          >
            <ShoppingBag size={16} aria-hidden="true" />
            Go to Cart & Pay
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#B8ADA3] text-sm font-black text-white"
          >
            <ShoppingBag size={16} aria-hidden="true" />
            {storeStatus?.label ?? "Ordering unavailable"}
          </button>
        )}
      </aside>
    );
  }

  return (
    <section className="bg-white px-4 pb-28 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pb-16">
      <div className="mx-auto max-w-[1500px]">
        <div className="restaurant-card mb-5 rounded-lg p-4 shadow-lg shadow-black/5 sm:p-5 lg:p-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="min-w-0">
              <p className="inline-flex items-center rounded-full bg-[#FFF7EC] px-3 py-1.5 text-xs font-black uppercase text-[#8A3430]">
                Jamal&apos;s menu
              </p>
              <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight text-[#241D1D] sm:text-4xl">
                Order your Jamal&apos;s favourites
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B5D5B] sm:text-base">
                Choose your dishes, then head to the basket for collection,
                delivery and payment.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              <button
                type="button"
                onClick={scrollToPopularPicks}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#8A3430] px-4 text-sm font-black text-white shadow-md shadow-[#8A3430]/20 transition hover:bg-[#6F2926]"
              >
                <Sparkles size={16} aria-hidden="true" />
                Popular dishes
              </button>
              <Link
                href="/cart"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#8A3430]/20 bg-white px-4 text-sm font-black text-[#8A3430] transition hover:border-[#8A3430] hover:bg-[#FFF7EC]"
              >
                <ShoppingBag size={16} aria-hidden="true" />
                Basket {itemCount > 0 ? `(${itemCount})` : ""}
              </Link>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {[
              [
                storeStatus?.label ?? "Open",
                orderingAllowed
                  ? `${storeStatus?.prepTimeMinutes ?? 20} min prep`
                  : "Ordering disabled",
              ],
              ["10%", "Collection from \u00a320"],
              ["\u00a320", "Delivery minimum"],
              ["OX1-OX5", "Delivery area"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border border-[#EADAC5] bg-white px-4 py-3 shadow-sm"
              >
                <p className="text-xl font-black leading-none text-[#8A3430]">
                  {value}
                </p>
                <p className="mt-1 text-[11px] font-black uppercase tracking-wide text-[#6B5D5B]">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <StoreStatusNotice className="mt-4" storeStatus={storeStatus} />
        </div>

        <div className="grid gap-5 lg:grid-cols-[250px_minmax(0,1fr)_370px]">
          <aside className="restaurant-card hidden h-fit rounded-lg p-4 shadow-lg shadow-black/5 lg:sticky lg:top-24 lg:block">
            <div className="flex items-center gap-2">
              <ReceiptText className="text-[#8A3430]" size={20} aria-hidden="true" />
              <h2 className="font-black">Categories</h2>
            </div>
            <div className="mt-4">
              <CategoryNav />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="sticky top-[122px] z-20 -mx-4 bg-white/95 px-4 py-3 shadow-[0_10px_24px_rgba(52,35,28,0.06)] backdrop-blur sm:-mx-6 sm:px-6 lg:top-24 lg:mx-0 lg:bg-white lg:px-0 lg:shadow-none lg:backdrop-blur-none">
              <label className="relative block rounded-full border border-[#E4D6C4] bg-white shadow-[0_8px_20px_rgba(52,35,28,0.08)]">
                <span className="sr-only">Search menu</span>
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7B6D68]"
                  size={18}
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search curry, biryani, naan..."
                  className="h-12 w-full rounded-full bg-white pl-11 pr-11 text-sm font-semibold text-[#241D1D] outline-none transition focus:ring-4 focus:ring-[#8A3430]/10"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#6B5D5B] transition hover:bg-[#FFF7EC] hover:text-[#8A3430]"
                    aria-label="Clear search"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                ) : null}
              </label>

              <div className="mt-3 space-y-3 lg:hidden">
                <CategoryNav compact />
                <MobileOffersDropdown />
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
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8A3430]">
                    {normalizedSearch ? "Search results" : "Full menu"}
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-[#241D1D]">
                    {normalizedSearch
                      ? "Dishes matching your search"
                      : "Browse the full menu"}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#6B5D5B]">
                    {visibleItemCount} dishes shown.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-black uppercase text-[#6B5D5B]">
                  <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2">
                    <Clock size={14} aria-hidden="true" />
                    Closed Tuesday
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2">
                    <ShoppingBag size={14} aria-hidden="true" />
                    {itemCount} in basket
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {visibleSections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    ref={setSectionRef(section.id)}
                    className="restaurant-card scroll-mt-[178px] overflow-hidden rounded-lg lg:scroll-mt-[116px]"
                  >
                    <div className="border-b border-black/10 bg-white p-5 sm:p-6">
                      <div className="grid gap-4 sm:grid-cols-[112px_minmax(0,1fr)_150px] sm:items-stretch">
                        <div className="relative h-28 overflow-hidden rounded-lg bg-[#241D1D]">
                          <Image
                            src={section.image}
                            alt={section.title}
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex min-w-0 flex-col justify-center">
                          <h2 className="break-words text-3xl font-black leading-tight text-[#241D1D] sm:text-4xl">
                            {section.title}
                          </h2>
                          <p className="mt-3 max-w-2xl text-base leading-7 text-[#6B5D5B]">
                            {section.description}
                          </p>
                        </div>
                        <div className="grid gap-2 sm:justify-items-end">
                          <span className="grid min-h-24 w-full place-items-center rounded-lg border border-[#EADAC5] bg-[#FFF7EC] px-4 text-center text-[#8A3430] sm:min-h-full">
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
                            <span className="inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-[#8A3430] px-4 text-center text-xs font-black uppercase text-white">
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

              {visibleItemCount === 0 ? (
                <div className="rounded-lg border border-dashed border-black/20 bg-white p-8 text-center">
                  <Search
                    className="mx-auto text-[#8A3430]"
                    size={34}
                    aria-hidden="true"
                  />
                  <h2 className="mt-4 text-2xl font-black">No dishes found</h2>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#6B5D5B]">
                    Try another dish name or browse the full menu.
                  </p>
                  <button
                    type="button"
                    onClick={resetMenuView}
                    className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#8A3430] px-5 text-sm font-black text-white transition hover:bg-[#6F2926]"
                  >
                    Show full menu
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
          <Link
            href="/cart"
            className="fixed bottom-4 left-4 right-4 z-30 grid h-14 grid-cols-[1fr_auto] items-center rounded-full bg-[#8A3430] px-5 text-sm font-black text-white shadow-2xl shadow-black/20 lg:hidden"
          >
            <span>
              {itemCount} {itemCount === 1 ? "item" : "items"} in basket
            </span>
            <span className="rounded-full bg-[#D7A542] px-3 py-1 text-[#241D1D]">
              {formatCurrency(total)}
            </span>
          </Link>
          <Link
            href="/cart"
            className="fixed bottom-6 right-6 z-30 hidden min-h-14 items-center gap-4 rounded-full bg-[#8A3430] px-5 text-sm font-black text-white shadow-2xl shadow-black/20 transition hover:bg-[#6F2926] lg:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/12">
              <ShoppingBag size={17} aria-hidden="true" />
            </span>
            <span>
              Cart
              <span className="block text-xs font-bold text-white/75">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </span>
            <span className="rounded-full bg-[#D7A542] px-3 py-1 text-[#241D1D]">
              {formatCurrency(total)}
            </span>
          </Link>
        </>
      ) : null}
    </section>
  );
}
