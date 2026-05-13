import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { logoImage, restaurant, trustImages } from "@/lib/restaurant";

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
    label: "Google Business Profile",
    href: restaurant.mapsUrl,
    content: <GoogleIcon />,
    className: "",
  },
];

const footerLinkClass =
  "inline-flex min-w-0 items-center gap-2 text-sm font-semibold leading-6 text-white/76 transition hover:text-[#D7A542]";

const footerHeadingClass =
  "text-sm font-black uppercase tracking-[0.14em] text-[#D7A542]";

export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      className="scroll-mt-28 bg-[#101010] text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-10 md:grid-cols-[1.05fr_1fr] xl:grid-cols-[1.05fr_1fr_0.82fr] xl:items-start xl:gap-14">
          <div className="min-w-0 text-center md:text-left">
            <a
              href={restaurant.siteUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex transition hover:-translate-y-0.5"
              aria-label={`Open ${restaurant.name} website`}
            >
              <span className="relative block h-[94px] w-[128px] sm:h-[108px] sm:w-[148px]">
                <Image
                  src={logoImage}
                  alt={`${restaurant.name} logo`}
                  fill
                  sizes="(min-width: 640px) 148px, 128px"
                  className="object-contain transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </span>
            </a>

            <p className="mx-auto mt-4 max-w-sm text-sm font-semibold leading-6 text-white/76 md:mx-0">
              Indian and Bengali food, takeaway, and free local delivery from
              High Street, Winslow.
            </p>
          </div>

          <div className="min-w-0 text-center md:text-left">
            <h2 className={footerHeadingClass}>Visit & Contact</h2>
            <div className="mx-auto mt-5 grid max-w-md gap-3 md:mx-0">
              <a
                href={restaurant.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className={`${footerLinkClass} justify-center md:justify-start`}
              >
                <MapPin size={17} className="shrink-0 text-[#D7A542]" aria-hidden="true" />
                <span>{restaurant.address.join(", ")}</span>
              </a>
              <a
                href={restaurant.phoneHref}
                className={`${footerLinkClass} justify-center md:justify-start`}
              >
                <Phone size={17} className="shrink-0 text-[#D7A542]" aria-hidden="true" />
                {restaurant.phone}
              </a>
              <a
                href={`mailto:${restaurant.email}`}
                className={`${footerLinkClass} justify-center break-all md:justify-start`}
              >
                <Mail size={17} className="shrink-0 text-[#D7A542]" aria-hidden="true" />
                {restaurant.email}
              </a>
            </div>

            <h2 className="mt-7 text-sm font-black uppercase tracking-[0.14em] text-[#D7A542]">
              Social Media
            </h2>
            <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
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

          <div className="min-w-0 text-center md:col-span-2 xl:col-span-1 xl:text-left">
            <h2 className={footerHeadingClass}>Trust & Payments</h2>
            <div className="mt-5 flex flex-col items-center gap-4 xl:items-start">
              <Image
                src={trustImages.securePayments}
                alt="Secure payments powered by Stripe with accepted card brands"
                width={344}
                height={168}
                sizes="(min-width: 1280px) 238px, (min-width: 768px) 252px, 78vw"
                className="h-auto w-full max-w-[252px] rounded-md bg-white shadow-[0_12px_24px_rgba(0,0,0,0.16)] sm:max-w-[268px] xl:max-w-[238px]"
                loading="lazy"
              />
              <div className="w-full max-w-[252px] rounded-md border border-white/10 bg-white p-5 text-left text-[#211A18] shadow-[0_12px_24px_rgba(0,0,0,0.16)] xl:max-w-[238px]">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#7A5410]">
                  Delivery
                </p>
                <p className="mt-2 text-lg font-black">Free within 5 miles</p>
                <p className="mt-1 text-sm font-semibold text-[#685C57]">
                  MK18 and MK17 postcodes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://talentpull.uk"
            target="_blank"
            rel="noreferrer"
            className="mx-auto inline-flex flex-col items-center gap-3 transition hover:opacity-85"
          >
            <span className="text-base font-semibold text-white">
              Powered By
            </span>
            <Image
              src="/powered-by/logo-wordmark.png"
              alt="Talentpull"
              width={150}
              height={38}
              sizes="150px"
              className="h-auto"
              loading="lazy"
            />
          </a>

          <div className="mt-8 border-t border-white/10 pt-5">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm font-semibold leading-6 text-white/72">
              <span>&copy; 2026 {restaurant.shortName}</span>
              {legalLinks.map((link) => (
                <span key={link.href} className="inline-flex items-center gap-x-2">
                  <span className="text-white/40" aria-hidden="true">
                    &middot;
                  </span>
                  <Link
                    href={link.href}
                    className="transition hover:text-[#D7A542]"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
