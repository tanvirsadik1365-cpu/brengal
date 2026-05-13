import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Flame,
  MapPin,
  Phone,
  Quote,
  ShoppingBag,
  Sparkles,
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
  { value: "10%", label: "Direct offer" },
  { value: "Free", label: "Local delivery" },
  { value: "MK17/MK18", label: "Postcodes" },
];

const quickActions = [
  {
    Icon: ShoppingBag,
    title: "Order direct",
    detail: "Bengal specials, grill, biryani, rice and naans.",
    href: "/menu",
    label: "Start order",
  },
  {
    Icon: CalendarCheck,
    title: "Book a table",
    detail: "Lunch, dinner, Sunday buffet and group meals.",
    href: "/booking",
    label: "Reserve",
  },
  {
    Icon: Phone,
    title: "Call Bengal",
    detail: "Talk through orders, allergens or delivery timing.",
    href: restaurant.phoneHref,
    label: restaurant.phone,
  },
];

const visitCards = [
  {
    Icon: MapPin,
    title: "High Street Winslow",
    detail: "40 High St, Winslow, Buckingham MK18 3HB.",
  },
  {
    Icon: Truck,
    title: "Free delivery",
    detail: "Within 5 miles for MK18 and MK17 postcodes.",
  },
  {
    Icon: Clock,
    title: "Lunch and dinner",
    detail: "Menu lists lunch, dinner and Sunday buffet service.",
  },
];

const reviewHighlights = reviews.slice(0, 3);

const serviceHighlights = [
  ["Family dining", "Comfortable dine-in space for family meals and celebrations."],
  ["Takeaway and delivery", "Direct ordering with free local delivery within 5 miles."],
  ["Bengali and Indian menu", "From tandoori grill and curries to biryani and fresh naan."],
  ["Winslow High Street location", "Easy to find at 40 High St, MK18 3HB."],
];

const homeCriticalCss = `
.bengal-hero {
  min-height: calc(100svh - 82px);
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.bengal-hero-grid {
  display: grid;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .bengal-hero-grid {
    align-items: center;
    grid-template-columns: minmax(0, 1fr) minmax(330px, 420px);
  }
}
`;

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#0B0907] pb-24 text-white lg:pb-0">
      <style dangerouslySetInnerHTML={{ __html: homeCriticalCss }} />
      {shouldRenderJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdMarkup(breadcrumbJsonLd)}
        />
      ) : null}

      <section className="bengal-hero relative isolate overflow-hidden px-4 sm:px-6 lg:px-8">
        <Image
          src={foodImages.hero}
          alt="Bengal biryani and Indian Bengali cuisine"
          fill
          priority
          sizes="100vw"
          className="cinematic-hero-image object-cover"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,9,7,0.97)_0%,rgba(11,9,7,0.82)_44%,rgba(11,9,7,0.42)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,9,7,0.08)_0%,#0B0907_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="bengal-hero-grid">
            <MotionStagger className="max-w-4xl">
              <MotionItem>
                <p className="inline-flex items-center gap-2 rounded-full border border-[#F8BC37]/28 bg-black/38 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#F8BC37] backdrop-blur">
                  <Flame size={16} aria-hidden="true" />
                  Winslow High Street restaurant
                </p>
              </MotionItem>

              <MotionItem>
                <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl">
                  Bengal Restaurant
                </h1>
              </MotionItem>

              <MotionItem>
                <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/78 sm:text-lg">
                  Indian and Bangladeshi cuisine, freshly cooked for dine-in,
                  takeaway and delivery. Visit us in Winslow or order direct
                  for local service across MK18 and MK17.
                </p>
              </MotionItem>

              <MotionItem>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <MagneticLink
                    href="/menu"
                    className="inline-flex h-[52px] min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#F8BC37] px-7 text-sm font-black text-[#130D08] shadow-[0_18px_42px_rgba(248,188,55,0.24)] transition hover:bg-white sm:w-auto"
                  >
                    <ShoppingBag size={18} aria-hidden="true" />
                    Order online
                    <ArrowRight size={17} aria-hidden="true" />
                  </MagneticLink>
                  <MagneticLink
                    href="/booking"
                    className="inline-flex h-[52px] min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-7 text-sm font-black text-white backdrop-blur transition hover:border-[#F8BC37] hover:text-[#F8BC37] sm:w-auto"
                  >
                    <CalendarCheck size={18} aria-hidden="true" />
                    Book table
                  </MagneticLink>
                </div>
              </MotionItem>

              <MotionItem>
                <div className="mt-7 grid max-w-3xl grid-cols-3 gap-2 sm:gap-3">
                  {heroStats.map((item) => (
                    <div
                      key={item.label}
                      className="min-h-[94px] rounded-lg border border-white/12 bg-black/34 px-3 py-4 text-center backdrop-blur"
                    >
                      <p className="text-xl font-black leading-tight text-[#F8BC37] sm:text-2xl">
                        {item.value}
                      </p>
                      <p className="mt-2 text-[11px] font-bold uppercase leading-5 tracking-[0.08em] text-white/70">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </MotionItem>
            </MotionStagger>

            <MotionReveal delay={0.22}>
              <aside className="border-l-4 border-[#F8BC37] bg-[#0F0D0A]/88 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur">
                <div className="relative mx-auto aspect-square max-w-[250px]">
                  <Image
                    src={logoImage}
                    alt={`${restaurant.name} logo`}
                    fill
                    sizes="250px"
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="mt-5 border-t border-white/10 pt-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#F8BC37]">
                    Direct from Bengal
                  </p>
                  <p className="mt-2 text-2xl font-black">10% offer</p>
                  <p className="mt-2 text-sm font-semibold leading-7 text-white/64">
                    Collection, delivery, bookings and menu enquiries all from
                    the Winslow restaurant team.
                  </p>
                </div>
              </aside>
            </MotionReveal>
          </div>

          <div className="mt-8 grid auto-rows-fr gap-3 md:grid-cols-3">
            {quickActions.map(({ Icon, title, detail, href, label }, index) => (
              <MotionReveal key={title} delay={index * 0.05}>
                <Link
                  href={href}
                  className="group flex h-full min-h-[124px] items-start rounded-lg border border-white/10 bg-[#11100E]/92 p-4 transition hover:-translate-y-1 hover:border-[#F8BC37]/70"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F8BC37] text-[#130D08]">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="ml-4 flex min-w-0 flex-1 flex-col">
                    <span className="block text-lg font-black text-white">
                      {title}
                    </span>
                    <span className="mt-1.5 block text-sm leading-5 text-white/66">
                      {detail}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-black text-[#F8BC37]">
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

      <section className="bg-[#120D09] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MotionReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F8BC37]">
                Popular dishes
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
                Customer favourites from Bengal kitchen.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/68">
                We kept this section simple so customers can quickly choose a
                few trusted dishes and start ordering in seconds.
              </p>
            </div>
            <Link
              href="/menu"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-6 text-sm font-black text-white transition hover:border-[#F8BC37] hover:text-[#F8BC37]"
            >
              See full menu
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </MotionReveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredDishes.map((dish, index) => (
              <MotionReveal key={dish.name} delay={index * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-[#11100E] transition hover:-translate-y-1 hover:border-[#F8BC37]/65">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#160F0A]">
                    <Image
                      src={dish.image}
                      alt={`${dish.name} from Bengal Winslow`}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(11,9,7,0.84)_100%)]" />
                    <span className="absolute left-4 top-4 rounded-full bg-[#F8BC37] px-3 py-1 text-xs font-black text-[#130D08]">
                      {dish.badge}
                    </span>
                    <p className="absolute bottom-4 left-4 text-2xl font-black text-white">
                      &pound;{dish.price}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-xl font-black text-white">{dish.name}</h3>
                    <p className="mt-3 min-h-14 text-sm leading-7 text-white/66">
                      {dish.description}
                    </p>
                    <Link
                      href="/menu"
                      className="mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#F8BC37] px-4 text-sm font-black text-[#130D08] transition hover:bg-white sm:w-auto sm:min-w-[172px]"
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

      <section className="bg-[#F6E8C9] px-4 py-16 text-[#1A120B] sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.76fr_1.24fr]">
          <MotionReveal>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#9B6B12]">
              Menu routes
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-[#1A120B] sm:text-5xl">
              From Bengali specials to Sunday buffet.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#3A2A1A]/84">
              Bengal's menu is broad, so the home page gives customers simple
              starting points before they enter the full ordering screen.
            </p>
          </MotionReveal>

          <div className="grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {menuCategories.map((category, index) => (
              <MotionReveal key={category.name} delay={index * 0.04}>
                <Link
                  href="/menu"
                  className="group flex h-full min-h-[200px] flex-col rounded-lg border border-[#E7D4A8] bg-white p-5 transition hover:-translate-y-1 hover:border-[#9B6B12]/70"
                >
                  <Sparkles className="text-[#9B6B12]" size={23} aria-hidden="true" />
                  <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#9B6B12]">
                    {category.count} choices
                  </p>
                  <h3 className="mt-2 text-xl font-black text-[#1A120B] group-hover:text-[#9B6B12]">
                    {category.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-[#3A2A1A]/80">
                    {category.detail}
                  </p>
                </Link>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-[#1A120B] sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <MotionReveal className="h-full">
            <div className="grid h-full auto-rows-fr gap-4 sm:grid-cols-2">
              {offers.map((offer) => (
                <article
                  key={offer.title}
                  className="flex min-h-[190px] flex-col rounded-lg border border-white/10 bg-[#11100E] p-5"
                >
                  <BadgePercent className="text-[#F8BC37]" size={23} aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-black leading-7 text-white">
                    {offer.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/66">
                    {offer.detail}
                  </p>
                  <p className="mt-auto pt-4 text-xs font-black uppercase tracking-wide text-[#F8BC37]">
                    {offer.note}
                  </p>
                </article>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.12} className="h-full">
            <div className="flex h-full flex-col rounded-lg border border-[#F8BC37]/24 bg-[#F8BC37]/10 p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#9B6B12]">
                Visit or order
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight text-[#1A120B] sm:text-4xl">
                Built for local dining and easy ordering.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#3A2A1A]/80">
                Bengal serves customers from 40 High St, Winslow, Buckingham
                MK18 3HB. Delivery is free within 5 miles for MK18 and MK17.
              </p>
              <div className="mt-7 grid gap-3">
                {visitCards.map(({ Icon, title, detail }) => (
                  <div key={title} className="flex gap-3">
                    <Icon className="mt-0.5 shrink-0 text-[#9B6B12]" size={20} aria-hidden="true" />
                    <div>
                      <p className="font-black text-[#1A120B]">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-[#3A2A1A]/80">
                        {detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-[#F6E8C9] px-4 py-16 text-[#1A120B] sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <MotionReveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {aboutImages.map((image) => (
                <div
                  key={image.alt}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-[#E7D4A8] bg-white"
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
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#9B6B12]">
              Visit Bengal
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-[#1A120B] sm:text-5xl">
              See Bengal before you order.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#3A2A1A]/84">
              Browse real photos of our food, dining room and Winslow
              restaurant so you know exactly what to expect.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {serviceHighlights.map(([title, detail]) => (
                <div key={title} className="flex gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-[#9B6B12]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-black text-[#1A120B]">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#3A2A1A]/80">
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-[#120D09] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MotionReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F8BC37]">
                Customer reviews
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
                What guests say after dining or ordering.
              </h2>
            </div>
            <Link
              href="/reviews"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-6 text-sm font-black text-white transition hover:border-[#F8BC37] hover:text-[#F8BC37]"
            >
              Read reviews
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </MotionReveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {reviewHighlights.map((review, index) => (
              <MotionReveal key={review.name} delay={index * 0.08}>
                <article className="flex h-full flex-col rounded-lg border border-white/10 bg-[#11100E] p-5">
                  <Quote className="text-[#F8BC37]" size={25} aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-black text-white">
                    {review.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/66">
                    {review.text}
                  </p>
                  <footer className="mt-auto pt-6">
                    <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <div>
                        <p className="font-black text-white">{review.name}</p>
                        <p className="mt-1 text-xs font-semibold text-white/48">
                          {review.date}
                        </p>
                      </div>
                      <div className="flex text-[#F8BC37]" aria-hidden="true">
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
