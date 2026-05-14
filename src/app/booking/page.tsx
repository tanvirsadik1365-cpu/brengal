import type { Metadata } from "next";
import Image from "next/image";
import {
  CalendarCheck,
  Clock,
  MapPin,
  Phone,
  Users,
  Utensils,
} from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { foodImages, restaurant } from "@/lib/restaurant";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  jsonLdMarkup,
  seoPages,
  shouldRenderJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(seoPages.booking);

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Booking", path: "/booking" },
]);

export default function BookingPage() {
  const bookingHighlights = [
    {
      Icon: Clock,
      title: "Lunch and dinner",
      detail: "Lunch, dinner and Sunday buffet service.",
    },
    {
      Icon: Users,
      title: "Groups welcome",
      detail: "Small tables, birthdays, family meals and larger parties.",
    },
    {
      Icon: Utensils,
      title: "Sunday buffet",
      detail: "Adult and child buffet pricing is listed on the menu.",
    },
    {
      Icon: CalendarCheck,
      title: "Direct booking",
      detail: "Send a request online or call Bengal directly.",
    },
  ];

  return (
    <main className="bg-[#F5F2EC] text-[#121212]">
      {shouldRenderJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdMarkup(breadcrumbJsonLd)}
        />
      ) : null}
      <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Image
          src={foodImages.restaurant}
          alt="Warm restaurant dining area set for dinner"
          fill
          priority
          sizes="100vw"
          className="cinematic-hero-image object-cover opacity-58"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,10,8,0.98)_0%,rgba(13,10,8,0.78)_48%,rgba(13,10,8,0.38)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,10,8,0.2)_0%,#F5F2EC_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid max-w-7xl min-w-0 gap-8 lg:min-h-[430px] lg:grid-cols-[minmax(0,0.92fr)_420px] lg:items-center">
          <div className="min-w-0 max-w-[22rem] sm:max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#FDE3A0] shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur">
              <CalendarCheck size={15} aria-hidden="true" />
              Book a table
            </p>
            <h1 className="mt-5 max-w-4xl break-words text-[2rem] font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl">
              Book a Table at Bengal Winslow
            </h1>
            <p className="mt-5 max-w-[22rem] break-words text-base font-semibold leading-8 text-white/70 sm:max-w-2xl sm:text-lg">
              Lunch, dinner, Sunday buffet, birthdays and group meals at an
              Indian and Bengali restaurant in Winslow.
            </p>
            <div className="mt-7 grid max-w-[22rem] gap-3 sm:flex sm:max-w-md sm:flex-wrap">
              <a
                href="#booking-form"
                className="inline-flex h-12 min-h-12 items-center justify-center gap-2 rounded-full bg-[#FDBE35] px-6 text-sm font-black text-[#121212] shadow-[0_16px_38px_rgba(215,165,66,0.22)] transition hover:bg-white"
              >
                Start booking
              </a>
              <a
                href={restaurant.phoneHref}
                className="inline-flex h-12 min-h-12 items-center justify-center gap-2 rounded-full border border-white/14 bg-white/10 px-6 text-sm font-black text-white backdrop-blur transition hover:border-[#FDBE35] hover:text-[#FDE3A0]"
              >
                <Phone size={17} aria-hidden="true" />
                {restaurant.phone}
              </a>
            </div>
          </div>

          <aside className="w-full max-w-[22rem] min-w-0 overflow-hidden rounded-2xl border border-[#E3D7C5] bg-[#FFFCF7] p-5 shadow-[0_12px_28px_rgba(43,20,8,0.1)] sm:max-w-none">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FDBE35] text-[#121212]">
                <MapPin size={18} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl font-black text-[#121212]">40 High St, Winslow</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#5F5A53]">
                  Buckingham MK18 3HB. Free local delivery for MK18 and MK17.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="min-h-[92px] rounded-lg border border-[#E3D7C5] bg-[#F5F2EC] p-4">
                <p className="text-2xl font-black text-[#FDBE35]">
                  MK18
                </p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-[#5F5A53]">
                  High Street
                </p>
              </div>
              <div className="min-h-[92px] rounded-lg border border-[#E3D7C5] bg-[#F5F2EC] p-4">
                <p className="text-2xl font-black text-[#FDBE35]">
                  Free
                </p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-[#5F5A53]">
                  Delivery
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl min-w-0 items-stretch gap-6 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1fr)]">
          <aside className="h-full w-full max-w-[22rem] overflow-hidden rounded-2xl border border-[#E3D7C5] bg-[#FFFCF7] shadow-[0_12px_28px_rgba(43,20,8,0.1)] sm:max-w-none">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={foodImages.restaurant}
                alt="Restaurant dining area"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_38%,rgba(0,0,0,0.72)_100%)]"
                aria-hidden="true"
              />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FDE3A0]">
                  Dine with us
                </p>
                <h2 className="mt-2 text-3xl font-black text-white">
                  Tables set for curry night.
                </h2>
              </div>
            </div>

            <div className="p-5 sm:p-6 lg:p-7">
              <p className="text-sm font-semibold leading-7 text-[#5F5A53]">
                Warm service, Bengali specials, familiar Indian dishes and
                space for small tables or larger groups.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {bookingHighlights.map(({ Icon, title, detail }) => (
                  <article
                    key={title}
                    className="min-h-[138px] rounded-lg border border-[#E3D7C5] bg-white p-4"
                  >
                    <Icon className="text-[#FDBE35]" size={19} aria-hidden="true" />
                    <h3 className="mt-3 font-black text-[#121212]">{title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#5F5A53]">
                      {detail}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-[#FDBE35]/24 bg-[#FDBE35]/10 p-4">
                <h3 className="font-black text-[#121212]">Need help?</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-[#5F5A53]">
                  For 10+ guests or special requests, call the restaurant.
                </p>
                <a
                  href={restaurant.phoneHref}
                  className="mt-4 inline-flex h-11 min-h-11 items-center gap-2 rounded-full bg-[#FDBE35] px-4 text-sm font-black text-[#121212] transition hover:bg-white"
                >
                  <Phone size={17} aria-hidden="true" />
                  {restaurant.phone}
                </a>
              </div>
            </div>
          </aside>

          <div id="booking-form" className="scroll-mt-24">
            <BookingForm />
          </div>
        </div>
      </section>
    </main>
  );
}

