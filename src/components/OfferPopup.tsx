"use client";

import Link from "next/link";
import { BadgePercent, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { offers } from "@/lib/restaurant";

const slideDelayMs = 4200;

export function OfferPopup() {
  const [isVisible, setIsVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsVisible(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % offers.length);
    }, slideDelayMs);

    return () => window.clearInterval(intervalId);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      aria-labelledby="offer-popup-title"
      aria-describedby="offer-popup-description"
      className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-[420px] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[360px]"
    >
      <div className="relative overflow-hidden rounded-lg border border-[#5F241F] bg-[#8A3430] px-5 pb-5 pt-6 text-white shadow-2xl shadow-black/20 sm:px-6">
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Close offer popup"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white text-[#241D1D] transition hover:bg-white"
        >
          <X size={19} aria-hidden="true" />
        </button>

        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#D7A542] text-[#241D1D] shadow-sm">
          <BadgePercent size={22} aria-hidden="true" />
        </span>

        <div
          className="mt-4 flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {offers.map((offer, index) => (
            <div
              key={offer.title}
              className="w-full shrink-0 px-1 text-center"
              aria-hidden={activeIndex !== index}
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#F6DFA4]">
                Offer {index + 1} of {offers.length}
              </p>
              <h2
                id={index === activeIndex ? "offer-popup-title" : undefined}
                className="mt-2 text-2xl font-black leading-tight"
              >
                {offer.title}
              </h2>
              <p
                id={
                  index === activeIndex
                    ? "offer-popup-description"
                    : undefined
                }
                className="mx-auto mt-3 max-w-[290px] text-sm font-semibold leading-6 text-white/88"
              >
                {offer.detail}
              </p>
              <p className="mx-auto mt-3 inline-flex max-w-full rounded-full bg-white px-3 py-1.5 text-xs font-black uppercase text-[#8A3430]">
                {offer.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-2" aria-label="Offer slides">
          {offers.map((offer, index) => (
            <button
              key={offer.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${offer.title}`}
              aria-pressed={activeIndex === index}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index
                  ? "w-7 bg-[#D7A542]"
                  : "w-2.5 bg-white/35 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <Link
          href="/menu"
          onClick={() => setIsVisible(false)}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D7A542] px-5 text-sm font-black text-[#241D1D] shadow-lg shadow-black/15 transition hover:bg-white"
        >
          <ShoppingBag size={17} aria-hidden="true" />
          Order now
        </Link>
      </div>
    </aside>
  );
}
