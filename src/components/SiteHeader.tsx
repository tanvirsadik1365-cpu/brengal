"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { logoImage, navLinks, restaurant } from "@/lib/restaurant";

const headerLinks = navLinks.filter((link) =>
  [
    "/",
    "/menu",
    "/gallery",
    "/booking",
    "/track-order",
    "/reviews",
    "/contact",
  ].includes(link.href),
);

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 12);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 bg-[#0D0A08]/88 text-white backdrop-blur-xl transition-all duration-500 ${
        isScrolled ? "shadow-[0_16px_42px_rgba(0,0,0,0.28)]" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-6 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-4 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center justify-self-start"
          aria-label="Home"
        >
          <span className="relative h-[50px] w-[72px] shrink-0 sm:h-[62px] sm:w-[90px] lg:h-[66px] lg:w-[96px]">
            <Image
              src={logoImage}
              alt={`${restaurant.name} logo`}
              fill
              sizes="(min-width: 1024px) 92px, (min-width: 640px) 84px, 72px"
              className="object-contain"
              loading="eager"
            />
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden justify-self-center rounded-full border border-white/10 bg-white/8 p-1 text-sm font-bold text-white/70 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur lg:flex"
        >
          {headerLinks.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2.5 transition xl:px-4 ${
                  active
                    ? "bg-[#D7A542] text-[#150D08] shadow-sm"
                    : "hover:bg-white/10 hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-1.5 justify-self-end sm:gap-2">
          <Link
            href="/account"
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white shadow-sm transition hover:border-[#D7A542] hover:text-[#D7A542] sm:flex"
            aria-label="Customer account"
          >
            <UserRound size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/menu"
            className="flex h-10 min-w-10 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#D7A542] px-2.5 text-sm font-black text-[#150D08] shadow-[0_12px_30px_rgba(215,165,66,0.22)] transition hover:-translate-y-0.5 hover:bg-white sm:h-11 sm:min-w-[132px] sm:px-4"
          >
            <ShoppingBag size={17} aria-hidden="true" />
            <span className="hidden sm:inline">Order Online</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition hover:border-[#D7A542] lg:hidden"
          >
            {isMenuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#0D0A08]/96 lg:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="mx-auto grid max-w-7xl gap-2 px-4 py-4 text-sm font-black sm:px-6"
            >
              {headerLinks.map((link) => {
                const active = isActivePath(pathname, link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex min-h-12 items-center justify-between rounded-lg border px-4 transition ${
                      active
                        ? "border-[#D7A542] bg-[#D7A542] text-[#150D08]"
                        : "border-white/10 bg-white/6 text-white/82 hover:border-white/22 hover:text-white"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                    <span className="text-xs uppercase tracking-[0.16em] opacity-60">
                      {active ? "Now" : "Go"}
                    </span>
                  </Link>
                );
              })}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/booking"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/8 px-4 text-white"
                >
                  <CalendarCheck size={17} aria-hidden="true" />
                  Book
                </Link>
                <Link
                  href="/account"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/8 px-4 text-white"
                >
                  <UserRound size={17} aria-hidden="true" />
                  Account
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
