import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Quote,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import {
  MagneticLink,
  MobileStickyCta,
  MotionItem,
  MotionReveal,
  MotionStagger,
} from "@/components/MotionPrimitives";
import {
  aboutImages,
  featuredDishes,
  foodImages,
  logoImage,
  menuCategories,
  offers,
  restaurant,
  reviews,
} from "@/lib/restaurant";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  jsonLdMarkup,
  seoPages,
  shouldRenderJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(seoPages.home);

const breadcrumbJsonLd = createBreadcrumbJsonLd([{ name: "Home", path: "/" }]);

const heroStats = [
  { value: "10%", label: "Direct order savings" },
  { value: "Free", label: "Delivery within 5 miles" },
  { value: "MK17 + MK18", label: "Main delivery area" },
];

const quickActions = [
  {
    Icon: ShoppingBag,
    title: "Order takeaway",
    detail: "Go straight to the menu and place your order in minutes.",
    href: "/menu",
    label: "Open menu",
  },
  {
    Icon: CalendarCheck,
    title: "Reserve a table",
    detail: "Book lunch or dinner for family nights and special occasions.",
    href: "/booking",
    label: "Book now",
  },
  {
    Icon: Phone,
    title: "Call the team",
    detail: "Speak to us about allergens, timing, or large-group orders.",
    href: restaurant.phoneHref,
    label: restaurant.phone,
  },
];

const trustPills = [
  "Free delivery within 5 miles",
  "Direct ordering discount available",
  "Dine-in, takeaway, and reservations",
];

const visitCards = [
  {
    Icon: MapPin,
    title: "Find us in Winslow",
    detail: "40 High St, Winslow, Buckingham MK18 3HB.",
  },
  {
    Icon: Truck,
    title: "Free local delivery",
    detail: "Available within 5 miles across MK18 and MK17.",
  },
  {
    Icon: Clock,
    title: "Lunch to evening",
    detail: "Open for dine-in, collection, and evening delivery runs.",
  },
];

const reviewHighlights = reviews.slice(0, 3);

const serviceHighlights = [
  ["Family-friendly dining", "Comfortable, relaxed space for everyday meals and celebrations."],
  ["Takeaway built for speed", "Simple online flow for fast ordering and collection."],
  ["Bengali and Indian classics", "Curries, biryani, tandoori, and freshly made naan."],
  ["Trusted local kitchen", "Serving Winslow and nearby postcodes from our High Street base."],
];

const homeCriticalCss = `
.bengal-home {
  background:
    radial-gradient(1000px 420px at 88% -8%, rgba(253, 190, 53, 0.18), transparent 62%),
    radial-gradient(840px 460px at -18% 14%, rgba(245, 242, 236, 0.08), transparent 72%),
    #2B1408;
}

.bengal-hero {
  min-height: calc(100svh - 84px);
  padding-top: 2.8rem;
  padding-bottom: 3rem;
}

.bengal-hero-grid {
  display: grid;
  gap: 1.6rem;
}

@media (min-width: 1024px) {
  .bengal-hero-grid {
    align-items: start;
    grid-template-columns: minmax(0, 1.06fr) minmax(320px, 0.94fr);
    gap: 2rem;
  }
}

@media (max-width: 640px) {
  .bengal-hero {
    min-height: auto;
    padding-top: 2.2rem;
    padding-bottom: 2.2rem;
  }
}
`;

export default function Home() {
  return (
    <main className="bengal-home overflow-hidden pb-24 text-white lg:pb-0">
      <style dangerouslySetInnerHTML={{ __html: homeCriticalCss }} />
      {shouldRenderJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdMarkup(breadcrumbJsonLd)}
        />
      ) : null}

      <section className="bengal-hero relative isolate overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src={foodImages.hero}
              alt="Bengal biryani and Indian Bengali cuisine"
              fill
              priority
              sizes="100vw"
              className="cinematic-hero-image object-cover opacity-50"
            />
          <div className="absolute inset-0 bg-[linear-gradient(106deg,rgba(18,18,18,0.92)_0%,rgba(18,18,18,0.74)_42%,rgba(18,18,18,0.86)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_42%,rgba(253,190,53,0.16)_0%,transparent_48%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="bengal-hero-grid">
            <MotionStagger className="max-w-3xl">
              <MotionItem>
                <p className="inline-flex rounded-full border border-[#FDBE35]/45 bg-[#2B1408]/70 px-4 py-1.5 text-sm font-medium tracking-wide text-[#FDE3A0]">
                  Bengali and Indian kitchen in Winslow
                </p>
              </MotionItem>

              <MotionItem>
                <h1 className="mt-5 max-w-4xl text-5xl leading-[1.02] text-[#F5F2EC] sm:text-6xl lg:text-[4.4rem]">
                  Bengal Restaurant
                </h1>
              </MotionItem>

              <MotionItem>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-[#F5F2EC]/90">
                  Freshly cooked curries, biryani, and grill favourites for
                  dine-in, takeaway, and local delivery across MK17 and MK18.
                </p>
              </MotionItem>

              <MotionItem>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {trustPills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full border border-[#F5F2EC]/28 bg-[#121212]/52 px-3 py-1.5 text-xs font-medium text-[#F5F2EC]/88 backdrop-blur"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </MotionItem>

              <MotionItem>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <MagneticLink
                    href="/menu"
                    className="inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#FDBE35] px-8 text-base font-semibold text-[#121212] shadow-[0_16px_34px_rgba(253,190,53,0.26)] transition hover:bg-[#F5F2EC] sm:w-auto"
                  >
                    <ShoppingBag size={18} aria-hidden="true" />
                    Start order
                    <ArrowRight size={17} aria-hidden="true" />
                  </MagneticLink>
                  <MagneticLink
                    href="/booking"
                    className="inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full border border-[#F5F2EC]/26 bg-[#121212]/38 px-8 text-base font-semibold text-[#F5F2EC] backdrop-blur transition hover:border-[#FDBE35] hover:text-[#FDBE35] sm:w-auto"
                  >
                    <CalendarCheck size={18} aria-hidden="true" />
                    Book table
                  </MagneticLink>
                </div>
              </MotionItem>

              <MotionItem>
                <div className="mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
                  {heroStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-[#F5F2EC]/20 bg-[#121212]/62 px-4 py-3.5 backdrop-blur"
                    >
                      <p className="text-2xl font-semibold text-[#FDBE35]">{item.value}</p>
                      <p className="mt-1 text-sm text-[#F5F2EC]/72">{item.label}</p>
                    </div>
                  ))}
                </div>
              </MotionItem>
            </MotionStagger>

            <MotionReveal delay={0.2}>
              <aside className="relative grid gap-3 lg:mt-1">
                <article className="hero-float-card relative overflow-hidden rounded-3xl border border-white/24 bg-[linear-gradient(155deg,rgba(255,255,255,0.13)_0%,rgba(255,255,255,0.06)_100%)] p-4 backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.34)]">
                  <div
                    className="pointer-events-none absolute -right-12 -top-14 h-44 w-44 rounded-full bg-[#FDBE35]/18 blur-3xl"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-[#FDBE35]/10 blur-3xl"
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    <p className="inline-flex rounded-full border border-[#FDBE35]/35 bg-[#FDBE35]/14 px-3 py-1 text-xs font-semibold tracking-wide text-[#FDE3A0]">
                      Running offer
                    </p>

                    <h3 className="mt-2 text-3xl leading-tight text-[#F5F2EC] sm:text-[2.2rem]">
                      10% Off
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#F5F2EC]/82">
                      Direct online orders with fast local delivery.
                    </p>
                  </div>

                  <div className="relative z-10 mt-3 grid gap-2">
                    {[
                      "Free delivery within 5 miles",
                      "Collection and dine-in available",
                    ].map((line) => (
                      <div
                        key={line}
                        className="rounded-xl border border-white/16 bg-white/8 px-3.5 py-2 text-sm text-[#F5F2EC]/88"
                      >
                        {line}
                      </div>
                    ))}
                  </div>


                  <Link
                    href="/menu"
                    className="relative z-10 mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#FDBE35] px-4 text-sm font-semibold text-[#121212] shadow-[0_14px_30px_rgba(253,190,53,0.24)] transition hover:bg-[#F5F2EC]"
                  >
                    Claim offer and order
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </article>

                <article className="hero-float-card hero-float-dish relative overflow-hidden rounded-3xl border border-white/24 bg-[linear-gradient(155deg,rgba(255,255,255,0.13)_0%,rgba(255,255,255,0.06)_100%)] p-4 backdrop-blur-md shadow-[0_16px_38px_rgba(0,0,0,0.3)]">
                  <div
                    className="pointer-events-none absolute -left-8 -top-10 h-32 w-32 rounded-full bg-[#FDBE35]/14 blur-3xl"
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#F4CC79]">
                      Sunday Buffet
                    </p>
                    <h4 className="mt-1 text-[2rem] leading-tight font-semibold text-[#F5F2EC]">
                      Lunch &amp; Dinner Service
                    </h4>
                    <div className="mt-2 grid gap-2">
                      <p className="rounded-xl border border-white/16 bg-white/8 px-3 py-2 text-sm text-[#F5F2EC]/88">
                        Lunch 12:00pm - 2:30pm | Adult £22 | Child £12
                      </p>
                      <p className="rounded-xl border border-white/16 bg-white/8 px-3 py-2 text-sm text-[#F5F2EC]/88">
                        Dinner 6:00pm - 10:30pm | A-LA-CARTE
                      </p>
                    </div>
                  </div>
                </article>

              </aside>
            </MotionReveal>
          </div>

          <div className="mt-6 grid auto-rows-fr gap-4 md:grid-cols-3">
            {quickActions.map(({ Icon, title, detail, href, label }, index) => (
              <MotionReveal key={title} delay={index * 0.05}>
                <Link
                  href={href}
                className="group flex h-full min-h-[124px] items-start rounded-2xl border border-[#F5F2EC]/16 bg-[#121212]/52 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-[#FDBE35]/64"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FDBE35] text-[#121212]">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="ml-4 flex min-w-0 flex-1 flex-col">
                    <span className="block text-lg font-semibold text-[#F5F2EC]">{title}</span>
                    <span className="mt-1.5 block text-sm leading-6 text-[#F5F2EC]/70">{detail}</span>
                    <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-medium text-[#FDBE35]">
                      {label}
                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </Link>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F2EC] px-4 py-16 text-[#23170F] sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MotionReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold tracking-wide text-[#8B5F15]">Popular dishes</p>
              <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
                What our regulars order most often
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#433021]/82">
                Start with these favourites, then explore the full menu for more
                curries, grills, and house specials.
              </p>
            </div>
            <Link
              href="/menu"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#CFB684] bg-white px-6 text-sm font-medium text-[#2A1D12] transition hover:bg-[#FFF5E4]"
            >
              See full menu
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </MotionReveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredDishes.map((dish, index) => (
              <MotionReveal key={dish.name} delay={index * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#DCC8A2] bg-white transition hover:-translate-y-1 hover:border-[#B88422]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F3E6CB]">
                    <Image
                      src={dish.image}
                      alt={`${dish.name} from Bengal Winslow`}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(20,14,9,0.6)_100%)]" />
                    <span className="absolute left-4 top-4 rounded-full bg-[#FDBE35] px-3 py-1 text-xs font-medium text-[#26190F]">
                      {dish.badge}
                    </span>
                    <p className="absolute bottom-4 left-4 text-2xl font-semibold text-white">
                      &pound;{dish.price}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-xl font-semibold text-[#26190F]">{dish.name}</h3>
                    <p className="mt-3 min-h-14 text-sm leading-7 text-[#4D3927]">{dish.description}</p>
                    <Link
                      href="/menu"
                      className="mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2B1408] px-4 text-sm font-medium text-[#FFE7B2] transition hover:bg-[#432F1F] sm:w-auto sm:min-w-[172px]"
                    >
                      <ShoppingBag size={16} aria-hidden="true" />
                      Order this dish
                    </Link>
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17120E] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MotionReveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-wide text-[#EBC77A]">Menu routes</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-[#F5F2EC] sm:text-5xl">
              Choose how you want to start
            </h2>
            <p className="mt-5 text-base leading-8 text-[#EEDFC3]/74">
              Whether you want a quick curry order or a full family spread, the
              menu sections below help you jump in fast.
            </p>
          </MotionReveal>

          <div className="mt-10 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {menuCategories.map((category, index) => (
              <MotionReveal key={category.name} delay={index * 0.04}>
                <Link
                  href="/menu"
                  className="group flex h-full min-h-[190px] flex-col rounded-2xl border border-[#EED8AA]/16 bg-[#1B1510] p-5 transition hover:-translate-y-1 hover:border-[#FDBE35]/60"
                >
                  <p className="text-sm text-[#F4CC79]">{category.count} choices</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#FFF0D2] group-hover:text-[#FFD987]">
                    {category.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-[#EEDFC3]/72">
                    {category.detail}
                  </p>
                </Link>
              </MotionReveal>
            ))}

            {menuCategories.length % 3 !== 0 ? (
              <MotionReveal delay={0.16} className="hidden lg:block">
                <Link
                  href="/menu"
                  className="group flex h-full min-h-[190px] flex-col justify-between rounded-2xl border border-[#FDBE35]/36 bg-[radial-gradient(circle_at_top_left,rgba(253,190,53,0.2),transparent_52%),#1B1510] p-5 transition hover:-translate-y-1 hover:border-[#FDBE35]"
                >
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-[#F4CC79]">
                      Ready to order
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#FFF0D2]">
                      Explore the full Bengal menu
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#EEDFC3]/74">
                      Open all categories, customise your dishes, and checkout in
                      minutes.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#FDBE35]">
                    Open full menu
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </MotionReveal>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-[#FFFCF7] px-4 py-16 text-[#121212] sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <MotionReveal className="h-full">
            <div className="grid h-full auto-rows-fr gap-4 sm:grid-cols-2">
              {offers.map((offer) => (
                <article
                  key={offer.title}
                  className="flex min-h-[190px] flex-col rounded-2xl border border-[#E6D2AA] bg-[#FFF9EC] p-5"
                >
                  <h3 className="text-lg font-semibold leading-7 text-[#2A1D12]">{offer.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#4D3927]">{offer.detail}</p>
                  <p className="mt-auto pt-4 text-xs font-medium tracking-wide text-[#8F6216]">{offer.note}</p>
                </article>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.12} className="h-full">
            <div className="flex h-full flex-col rounded-3xl border border-[#E9D1A1] bg-[linear-gradient(155deg,#FFF4DC_0%,#FCE7BD_100%)] p-6">
              <p className="text-sm font-semibold tracking-wide text-[#8F6216]">Visit or order</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#2A1D12] sm:text-4xl">
                Built for local dining and easy ordering
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#4D3927]">
                Bengal serves from 40 High St, Winslow, Buckingham MK18 3HB.
                Delivery is free within 5 miles for MK18 and MK17.
              </p>
              <div className="mt-7 grid gap-3">
                {visitCards.map(({ Icon, title, detail }) => (
                  <div key={title} className="flex gap-3">
                    <Icon className="mt-0.5 shrink-0 text-[#8F6216]" size={20} aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[#2A1D12]">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-[#4D3927]">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-[#F5F2EC] px-4 py-16 text-[#121212] sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <MotionReveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {aboutImages.map((image) => (
                <div
                  key={image.alt}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E2CCA1] bg-white"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <p className="text-sm font-semibold tracking-wide text-[#8B5F15]">Inside Bengal</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-[#121212] sm:text-5xl">
              Know the place before you visit
            </h2>
            <p className="mt-5 text-base leading-8 text-[#3A2A1A]/84">
              Browse real photos of the food, dining room, and restaurant so
              you know what to expect before ordering or booking.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {serviceHighlights.map(([title, detail]) => (
                <div key={title} className="flex gap-3">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#8B5F15]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#121212]">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#3A2A1A]/80">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-[#17120E] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MotionReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold tracking-wide text-[#EBC77A]">Customer reviews</p>
              <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-[#F5F2EC] sm:text-5xl">
                What guests say after ordering or dining in
              </h2>
            </div>
            <Link
              href="/reviews"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#EED8AA]/25 bg-white/8 px-6 text-sm font-medium text-[#F5F2EC] transition hover:border-[#FDBE35] hover:text-[#FFE7B1]"
            >
              Read reviews
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </MotionReveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {reviewHighlights.map((review, index) => (
              <MotionReveal key={review.name} delay={index * 0.08}>
                <article className="flex h-full flex-col rounded-2xl border border-[#EED8AA]/18 bg-[#1C1510] p-5">
                  <Quote className="text-[#FDBE35]" size={25} aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-semibold text-[#F5F2EC]">{review.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#EEDFC3]/70">{review.text}</p>
                  <footer className="mt-auto pt-6">
                    <div className="flex items-center justify-between gap-3 border-t border-[#EED8AA]/14 pt-4">
                      <div>
                        <p className="font-semibold text-[#F5F2EC]">{review.name}</p>
                        <p className="mt-1 text-xs text-[#EEDFC3]/56">{review.date}</p>
                      </div>
                      <div className="flex text-[#FDBE35]" aria-hidden="true">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star key={starIndex} size={14} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </footer>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <MobileStickyCta />
    </main>
  );
}



