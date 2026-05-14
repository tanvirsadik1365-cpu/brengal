"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { offers } from "@/lib/restaurant";

const dismissedStorageKey = "bengal-offer-popup-dismissed-at-v3";
const seenSessionKey = "bengal-offer-popup-seen-session-v1";
const popupDelayMs = 900;
const slideDelayMs = 3600;
const dismissCooldownMs = 1000 * 60 * 60 * 6;

export function OfferPopup() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMerchantPage = pathname?.startsWith("/merchant");
  const isCheckoutFlow =
    pathname?.startsWith("/checkout") || pathname?.startsWith("/cart");
  const shouldSuppressPopup = isMerchantPage || isCheckoutFlow || pathname !== "/";
  const activeOffer = offers[activeIndex] ?? offers[0];

  function closePopup() {
    try {
      window.localStorage.setItem(dismissedStorageKey, String(Date.now()));
      window.sessionStorage.setItem(seenSessionKey, "1");
    } catch {
      // Ignore storage failures (private mode / blocked storage)
    }
    setIsVisible(false);
  }

  function showPreviousOffer() {
    setActiveIndex((current) => (current - 1 + offers.length) % offers.length);
  }

  function showNextOffer() {
    setActiveIndex((current) => (current + 1) % offers.length);
  }

  useEffect(() => {
    if (shouldSuppressPopup) {
      setIsVisible(false);
      return;
    }

    let dismissedAt = 0;
    let seenInSession = false;

    try {
      const dismissedAtRaw = window.localStorage.getItem(dismissedStorageKey);
      dismissedAt = dismissedAtRaw ? Number(dismissedAtRaw) : 0;
      seenInSession = window.sessionStorage.getItem(seenSessionKey) === "1";
    } catch {
      // If storage is blocked, still allow popup to show.
    }

    const withinCooldown =
      Number.isFinite(dismissedAt) &&
      dismissedAt > 0 &&
      Date.now() - dismissedAt < dismissCooldownMs;

    if (withinCooldown || seenInSession) {
      return;
    }

    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(seenSessionKey, "1");
      } catch {
        // Ignore storage failures.
      }
      setIsVisible(true);
    }, popupDelayMs);

    return () => window.clearTimeout(timer);
  }, [pathname, shouldSuppressPopup]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closePopup();
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const intervalId = window.setInterval(showNextOffer, slideDelayMs);

    return () => window.clearInterval(intervalId);
  }, [isVisible]);

  if (!isVisible || shouldSuppressPopup) {
    return null;
  }

  return (
    <aside
      aria-labelledby="offer-popup-title"
      aria-describedby="offer-popup-description"
      className="fixed inset-x-3 top-[86px] z-[80] mx-auto max-w-[440px] sm:inset-x-auto sm:right-5 sm:top-24 sm:w-[420px]"
    >
      <div className="relative overflow-hidden rounded-lg border border-[#FDBE35]/35 bg-[#1A1A1A]/96 p-3.5 text-white shadow-[0_18px_48px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#FDBE35,#FDE3A0,#FDBE35)]" />
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close offer popup"
          className="absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white hover:text-[#121212]"
        >
          <X size={16} aria-hidden="true" />
        </button>

        <div className="flex min-h-[86px] items-start gap-3 pr-8">
          <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FDBE35] text-[#121212] shadow-[0_12px_28px_rgba(215,165,66,0.24)]">
            <BadgePercent size={21} aria-hidden="true" />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#FDE3A0]">
                Offer {activeIndex + 1} of {offers.length}
              </p>
              <span className="rounded-full border border-[#FDBE35]/30 bg-[#FDBE35]/12 px-2 py-0.5 text-[10px] font-black uppercase text-[#FDE3A0]">
                {activeOffer.note}
              </span>
            </div>

            <div className="mt-1 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {offers.map((offer, index) => (
                  <div
                    key={offer.title}
                    className="w-full shrink-0 pr-1"
                    aria-hidden={activeIndex !== index}
                  >
                    <h2
                      id={index === activeIndex ? "offer-popup-title" : undefined}
                      className="text-lg font-black leading-tight text-white"
                    >
                      {offer.title}
                    </h2>
                    <p
                      id={
                        index === activeIndex
                          ? "offer-popup-description"
                          : undefined
                      }
                      className="mt-1 text-xs font-semibold leading-5 text-white/68"
                    >
                      {offer.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5" aria-label="Offer slides">
            {offers.map((offer, index) => (
              <button
                key={offer.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${offer.title}`}
                aria-pressed={activeIndex === index}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-7 bg-[#FDBE35]"
                    : "w-2 bg-white/28 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={showPreviousOffer}
              aria-label="Show previous offer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/72 transition hover:border-[#FDBE35]/45 hover:text-[#FDE3A0]"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNextOffer}
              aria-label="Show next offer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/72 transition hover:border-[#FDBE35]/45 hover:text-[#FDE3A0]"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <Link
          href="/menu"
          onClick={closePopup}
          className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#FDBE35] px-4 text-sm font-black text-[#121212] shadow-lg shadow-black/15 transition hover:bg-white"
        >
          <ShoppingBag size={17} aria-hidden="true" />
          Order online
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}

