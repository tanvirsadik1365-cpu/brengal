"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, UserRound } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_8px_24px_rgba(52,35,28,0.08)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-4 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center justify-self-start"
          aria-label="Home"
        >
          <span className="relative h-[58px] w-[76px] shrink-0 sm:h-[68px] sm:w-[88px] lg:h-[74px] lg:w-[96px]">
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
          className="hidden justify-self-center rounded-full bg-white p-1 text-sm font-bold text-[var(--brand-muted)] ring-1 ring-[var(--brand-line)] lg:flex"
        >
          {headerLinks.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2.5 transition xl:px-4 ${
                  active
                    ? "bg-[#FFF7EC] text-[var(--brand-primary)] shadow-sm"
                    : "hover:bg-white hover:text-[var(--brand-primary)]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-2 justify-self-end">
          <Link
            href="/account"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--brand-line)] bg-white text-[var(--brand-primary)] shadow-sm transition hover:border-[var(--brand-primary)]"
            aria-label="Customer account"
          >
            <UserRound size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/menu"
            className="flex h-11 min-w-[86px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[var(--brand-primary)] px-3 text-sm font-black text-white shadow-md shadow-black/10 transition hover:bg-[var(--brand-primary-dark)] sm:min-w-[132px] sm:px-4"
          >
            <ShoppingBag size={17} aria-hidden="true" />
            <span className="hidden sm:inline">Order Online</span>
            <span className="sm:hidden">Order</span>
          </Link>
        </div>
      </div>

      <div className="bg-white lg:hidden">
        <nav
          aria-label="Mobile navigation"
          className="scrollbar-soft mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2 text-sm font-bold text-[var(--brand-muted)] sm:px-6"
        >
          {headerLinks.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 rounded-full px-3.5 py-2 transition ${
                  active
                    ? "bg-[#FFF7EC] text-[var(--brand-primary)] ring-1 ring-[var(--brand-line)]"
                    : "hover:bg-[#FFF7EC] hover:text-[var(--brand-primary)]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
