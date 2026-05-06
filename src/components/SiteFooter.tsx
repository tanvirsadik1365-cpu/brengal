import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
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
  { label: "Track Order", href: "/track-order" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "Google Maps",
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      restaurant.address.join(", "),
    )}`,
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
    label: "Google Search",
    href: `https://www.google.com/search?q=${encodeURIComponent(
      restaurant.name,
    )}`,
    content: <GoogleIcon />,
    className: "",
  },
];

const cards = [
  { label: "Mastercard", className: "bg-[#eb001b] text-white" },
  { label: "VISA", className: "bg-[#f7f9ff] text-[#1434cb]" },
  { label: "DISCOVER", className: "bg-white text-[#f58220]" },
  { label: "AMEX", className: "bg-[#2e77bc] text-white" },
];

const brandHoverClass = "transition hover:text-[#C99635]";

export function SiteFooter() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.05fr_0.95fr_0.95fr] lg:px-8 lg:py-16">
        <div className="flex flex-col items-start">
          <Link
            href="/"
            className="group relative block h-36 w-56 max-w-full overflow-hidden rounded-lg bg-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:ring-[#C99635] sm:h-40 sm:w-64"
            aria-label={`${restaurant.name} home`}
          >
            <Image
              src={logoImage}
              alt={`${restaurant.name} logo`}
              fill
              sizes="(min-width: 640px) 256px, 224px"
              className="object-contain p-5 transition duration-300 group-hover:scale-[1.03]"
              loading="eager"
            />
          </Link>

          <p className="mt-6 max-w-xs text-xl font-medium leading-8 text-white">
            Indian food, takeaway, and table bookings on Walton Street,
            Oxford.
          </p>

          <div className="mt-10">
            <p className="text-base font-black text-white">We Accept</p>
            <div className="mt-3 w-[202px] rounded-sm bg-white p-3 text-[#111111] shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-2">
                <span className="flex h-12 w-10 shrink-0 items-center justify-center rounded-sm bg-[#111111] text-white">
                  <ShieldCheck size={24} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-black leading-none">
                    Secure payments
                  </p>
                  <p className="mt-2 rounded-sm bg-[#111111] px-2 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                    Powered by Stripe
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-1">
                {cards.map((card) => (
                  <span
                    key={card.label}
                    className={`flex h-6 items-center justify-center rounded-sm text-[8px] font-black ${card.className}`}
                  >
                    {card.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 w-[252px] max-w-full overflow-hidden rounded-lg bg-[#b5db13] text-[#111111] shadow-[0_18px_38px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
            <div className="flex items-center justify-between gap-3 bg-[#d9ef62] px-4 py-3">
              <div>
                <p className="text-[10px] font-black uppercase leading-none tracking-wide">
                  Food Hygiene Rating
                </p>
                <p className="mt-1 text-sm font-black">Very good</p>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#111111] text-3xl font-black text-white">
                5
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <span
                    key={rating}
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#111111] text-sm font-black ${
                      rating === 5 ? "bg-[#111111] text-white" : "bg-[#e9fb8a]"
                    }`}
                  >
                    {rating}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[11px] font-black uppercase tracking-wide">
                Food Standards Agency style rating
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-black text-white">Address</h2>
          <div className="mt-8 space-y-4 text-xl font-medium leading-7 text-white">
            <p>{restaurant.address.join(", ")}</p>
            <p>
              <a href={restaurant.phoneHref} className={brandHoverClass}>
                {restaurant.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${restaurant.email}`}
                className={`break-all ${brandHoverClass}`}
              >
                {restaurant.email}
              </a>
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-black text-white">Quick Links</h2>
          <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-base font-medium text-white">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`min-h-9 ${brandHoverClass}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <h2 className="mt-10 text-xl font-black text-white">Social Media</h2>
          <div className="mt-5 flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${link.label} opens in a new tab`}
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-[#8A3430] hover:text-white hover:ring-[#C99635] ${link.className}`}
              >
                {link.content}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-9 sm:px-6 lg:px-8">
        <p className="text-base font-black text-white">Powered By</p>
        <a
          href="https://talentpull.uk"
          target="_blank"
          rel="noreferrer"
          className="relative mt-5 block h-9 w-36"
          aria-label="Powered by Talentpull"
        >
          <Image
            src="/powered-by/logo-wordmark.png"
            alt="Talentpull"
            fill
            sizes="144px"
            className="object-contain"
          />
        </a>
      </div>

      <div className="border-t border-white/15 px-4 py-5 text-center text-sm text-white sm:px-6 lg:px-8">
        <p>
          &copy; 2026 {restaurant.shortName} &middot; Terms &amp; Conditions
          &middot; Privacy Policy
        </p>
      </div>
    </footer>
  );
}
