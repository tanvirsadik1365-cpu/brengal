import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Store,
} from "lucide-react";
import { foodImages, restaurant } from "@/lib/restaurant";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  jsonLdMarkup,
  seoPages,
  shouldRenderJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(seoPages.contact);

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

const fieldClass =
  "mt-2 h-12 w-full rounded-lg border border-white/10 bg-white/8 px-4 text-sm font-semibold text-white outline-none transition placeholder:text-white/32 focus:border-[#D7A542]/70 focus:ring-4 focus:ring-[#D7A542]/12";

const contactCards = [
  {
    Icon: MapPin,
    title: "Walton Street",
    body: "107-108 Walton Street, Oxford, OX2 6AJ",
    cta: "Open maps",
    href: restaurant.mapsUrl,
  },
  {
    Icon: Phone,
    title: "Call direct",
    body: restaurant.phone,
    cta: "Call restaurant",
    href: restaurant.phoneHref,
  },
  {
    Icon: Mail,
    title: "Email",
    body: restaurant.email,
    cta: "Send email",
    href: `mailto:${restaurant.email}`,
  },
  {
    Icon: Store,
    title: "Dinner service",
    body: "Collection, delivery, and table bookings from Walton Street.",
    cta: "Book table",
    href: "/booking",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-[#0D0A08] text-white">
      {shouldRenderJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdMarkup(breadcrumbJsonLd)}
        />
      ) : null}
      <section className="relative isolate overflow-hidden px-4 pb-12 pt-52 sm:px-6 lg:px-8 lg:py-16">
        <Image
          src={foodImages.exterior}
          alt="Jamal's Indian Restaurant exterior on Walton Street Oxford"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-54"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,10,8,0.96)_0%,rgba(13,10,8,0.76)_48%,rgba(13,10,8,0.3)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,10,8,0.08)_0%,rgba(13,10,8,0.82)_78%,#0D0A08_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.95fr)_390px] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#F6DFA4] shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur">
              <MessageCircle size={15} aria-hidden="true" />
              Contact Jamal&apos;s
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">
              Contact Jamal&rsquo;s Oxford
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/68">
              Speak to the restaurant for bookings, takeaway orders, delivery
              questions, and Walton Street directions.
            </p>
          </div>

          <aside className="rounded-lg border border-[#D7A542]/24 bg-[#15100E]/88 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#D7A542]">
              Direct line
            </p>
            <a
              href={restaurant.phoneHref}
              className="mt-4 inline-flex text-3xl font-black leading-tight text-white transition hover:text-[#F6DFA4]"
            >
              {restaurant.phone}
            </a>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/58">
              For active orders, allergy questions, delivery timing, and booking
              changes, calling is fastest.
            </p>
          </aside>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map(({ Icon, title, body, cta, href }) => (
              <article
                key={title}
                className="flex min-h-[220px] flex-col rounded-lg border border-white/10 bg-[#15100E]/88 p-5 shadow-[0_18px_52px_rgba(0,0,0,0.26)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D7A542] text-[#150D08]">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-xl font-black">{title}</h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-white/58">
                  {body}
                </p>
                <a
                  href={href}
                  className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-[#F6DFA4] transition hover:text-white"
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {cta}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
            <form
              action={`mailto:${restaurant.email}?subject=${encodeURIComponent(
                "Website enquiry",
              )}`}
              method="post"
              encType="text/plain"
              className="rounded-lg border border-white/10 bg-[#15100E]/88 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.32)] sm:p-8"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#D7A542]">
                Message
              </p>
              <h2 className="mt-2 text-3xl font-black">Send a note.</h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-white/58">
                Use this for booking questions, feedback, catering, or special
                occasions.
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-black">
                  Name
                  <input
                    className={fieldClass}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="text-sm font-black">
                  Phone
                  <input
                    className={fieldClass}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                  />
                </label>
                <label className="text-sm font-black">
                  Email
                  <input
                    className={fieldClass}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="text-sm font-black">
                  Subject
                  <select className={fieldClass} name="subject" defaultValue="" required>
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option>General enquiry</option>
                    <option>Booking question</option>
                    <option>Order question</option>
                    <option>Feedback</option>
                    <option>Catering request</option>
                  </select>
                </label>
              </div>

              <label className="mt-5 block text-sm font-black">
                Message
                <textarea
                  className="mt-2 min-h-40 w-full rounded-lg border border-white/10 bg-white/8 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-white/32 focus:border-[#D7A542]/70 focus:ring-4 focus:ring-[#D7A542]/12"
                  name="message"
                  required
                />
              </label>

              <button
                type="submit"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D7A542] px-4 py-3 text-center text-sm font-black text-[#150D08] transition hover:bg-white"
              >
                <Send size={18} aria-hidden="true" />
                Send message
              </button>
            </form>

            <div className="overflow-hidden rounded-lg border border-white/10 bg-[#15100E] shadow-[0_24px_70px_rgba(0,0,0,0.32)]">
              <div className="p-6 sm:p-8">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#D7A542]">
                  Map
                </p>
                <h2 className="mt-2 text-3xl font-black">
                  107-108 Walton Street, Oxford
                </h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-white/58">
                  Jamal&apos;s is on Walton Street in Jericho, Oxford, OX2 6AJ.
                </p>
                <a
                  href={restaurant.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#D7A542] px-5 text-sm font-black text-[#150D08] transition hover:bg-white"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  Open Google Maps
                </a>
              </div>
              <iframe
                title="Jamal's Indian Restaurant location on Google Maps"
                src={restaurant.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full border-0"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
