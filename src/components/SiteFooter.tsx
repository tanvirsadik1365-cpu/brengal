import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { logoImage, restaurant } from "@/lib/restaurant";

function FacebookIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.05 8.44V6.81c0-.8.54-.99.92-.99h2.34V2.18L14.08 2C10.5 2 9.69 4.68 9.69 6.39v2.05H7.31v3.75h2.38V22h4.36v-9.81h2.95l.39-3.75h-3.34Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <rect
        x="3.2"
        y="3.2"
        width="17.6"
        height="17.6"
        rx="5.2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.35" cy="6.65" r="1.35" fill="currentColor" />
    </svg>
  );
}

function GoogleMapsIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
      <path
        fill="#34A853"
        d="M12 22s6.7-7.37 6.7-12.12C18.7 5.53 15.7 2 12 2S5.3 5.53 5.3 9.88C5.3 14.63 12 22 12 22Z"
      />
      <path
        fill="#EA4335"
        d="M12 2c3.7 0 6.7 3.53 6.7 7.88 0 1.74-.9 3.95-2.05 6.02L12 9.88V2Z"
      />
      <path
        fill="#FBBC04"
        d="M12 22s-6.7-7.37-6.7-12.12C5.3 5.53 8.3 2 12 2v7.88l-4.64 6.03C8.5 17.98 12 22 12 22Z"
      />
      <circle cx="12" cy="9.85" r="2.7" fill="#4285F4" />
      <circle cx="12" cy="9.85" r="1.25" fill="white" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.74-.07-1.45-.2-2.13H12v4.03h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.98-4.32 2.98-7.42Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.62-2.35l-3.24-2.5c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.76-5.59-4.12H3.06v2.59A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC04"
        d="M6.41 13.98A6 6 0 0 1 6.1 12c0-.68.11-1.35.31-1.98V7.43H3.06A10 10 0 0 0 2 12c0 1.61.39 3.13 1.06 4.57l3.35-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.9c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.61 9.61 0 0 0 12 2a10 10 0 0 0-8.94 5.43l3.35 2.59C7.2 7.66 9.4 5.9 12 5.9Z"
      />
    </svg>
  );
}

const quickLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Book Table", href: "/booking" },
  { label: "Track Order", href: "/track-order" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const socialLinks = [
  {
    label: "Google Maps",
    href: restaurant.mapsUrl,
    content: <GoogleMapsIcon />,
    className: "",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/jamals_saffron-631210494185120/",
    content: <FacebookIcon />,
    className: "text-[#1877f2]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/jamals_saffron/?hl=en",
    content: <InstagramIcon />,
    className: "text-[#e4405f]",
  },
  {
    label: "Google Business Profile",
    href: restaurant.mapsUrl,
    content: <GoogleIcon />,
    className: "",
  },
];

const paymentCards = [
  { label: "Mastercard", className: "bg-[#eb001b] text-white" },
  { label: "VISA", className: "bg-[#f7f9ff] text-[#1434cb]" },
  { label: "AMEX", className: "bg-[#2e77bc] text-white" },
];

const footerLinkClass =
  "inline-flex items-center gap-2 text-sm font-semibold text-white/78 transition hover:text-[#D7A542]";

export function SiteFooter() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr_0.82fr_0.78fr] lg:items-start">
          <div className="min-w-0">
            <Link
              href="/"
              className="group relative block h-28 w-44 overflow-hidden rounded-lg bg-white shadow-[0_18px_40px_rgba(0,0,0,0.28)] ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:ring-[#D7A542]"
              aria-label={`${restaurant.name} home`}
            >
              <Image
                src={logoImage}
                alt={`${restaurant.name} logo`}
                fill
                sizes="176px"
                className="object-contain p-4 transition duration-300 group-hover:scale-[1.03]"
                loading="eager"
              />
            </Link>

            <p className="mt-5 max-w-sm text-base font-semibold leading-7 text-white/82">
              Indian food, takeaway, delivery, and table bookings on Walton
              Street, Oxford.
            </p>

            <a
              href={restaurant.siteUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-black text-white transition hover:border-[#D7A542] hover:text-[#D7A542]"
            >
              <ExternalLink size={15} aria-hidden="true" />
              {restaurant.website}
            </a>
          </div>

          <div>
            <h2 className="text-lg font-black text-white">Visit & Contact</h2>
            <div className="mt-5 grid gap-3">
              <a
                href={restaurant.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className={footerLinkClass}
              >
                <MapPin size={17} className="shrink-0 text-[#D7A542]" aria-hidden="true" />
                <span>{restaurant.address.join(", ")}</span>
              </a>
              <a href={restaurant.phoneHref} className={footerLinkClass}>
                <Phone size={17} className="shrink-0 text-[#D7A542]" aria-hidden="true" />
                {restaurant.phone}
              </a>
              <a
                href={`mailto:${restaurant.email}`}
                className={`${footerLinkClass} break-all`}
              >
                <Mail size={17} className="shrink-0 text-[#D7A542]" aria-hidden="true" />
                {restaurant.email}
              </a>
            </div>

            <div className="mt-6 rounded-lg border border-white/12 bg-white/6 p-4">
              <h3 className="flex items-center gap-2 text-sm font-black text-white">
                <Clock size={17} className="text-[#D7A542]" aria-hidden="true" />
                Opening Hours
              </h3>
              <div className="mt-3 grid gap-2 text-sm text-white/72">
                {restaurant.hours.map((item) => (
                  <p key={item.days} className="flex justify-between gap-4">
                    <span>{item.days}</span>
                    <span className="text-right font-semibold text-white/88">
                      {item.time}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-black text-white">Quick Links</h2>
            <nav className="mt-5 grid grid-cols-2 gap-3 text-sm sm:max-w-sm lg:grid-cols-1">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className={footerLinkClass}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <h2 className="mt-7 text-lg font-black text-white">Social Media</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${link.label} opens in a new tab`}
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-[#8A3430] hover:text-white hover:ring-[#D7A542] ${link.className}`}
                >
                  {link.content}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-black text-white">Trust & Payments</h2>
            <div className="mt-5 rounded-lg border border-white/12 bg-white p-4 text-[#111111] shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#111111] text-white">
                  <ShieldCheck size={22} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-black">Secure payments</p>
                  <p className="mt-1 text-xs font-bold text-[#5F5552]">
                    Powered by Stripe
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-1.5">
                {paymentCards.map((card) => (
                  <span
                    key={card.label}
                    className={`flex h-7 items-center justify-center rounded-sm text-[9px] font-black ${card.className}`}
                  >
                    {card.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-[#BEE01C] bg-[#D9F359] p-4 text-[#111111] shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wide">
                    Food Hygiene Rating
                  </p>
                  <p className="mt-1 text-sm font-black">Very good</p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111111] text-2xl font-black text-white">
                  5
                </span>
              </div>
              <p className="mt-3 text-xs font-black uppercase tracking-wide">
                Food Standards Agency style rating
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/12 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className={footerLinkClass}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 text-sm font-semibold text-white/64 sm:flex-row sm:items-center">
            <p>&copy; 2026 {restaurant.shortName}</p>
            <span className="hidden h-1 w-1 rounded-full bg-white/28 sm:block" />
            <a
              href="https://talentpull.uk"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-[#D7A542]"
            >
              Powered by
              <span className="relative inline-block h-6 w-24 align-middle">
                <Image
                  src="/powered-by/logo-wordmark.png"
                  alt="Talentpull"
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
