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
  Gift,
  GraduationCap,
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
  menuCategories,
  offers,
  restaurant,
  reviews,
  studentOffer,
} from "@/lib/restaurant";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  jsonLdMarkup,
  seoPages,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(seoPages.home);

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
]);

const heroStats = [
  { value: "Since 1956", label: "Serving Oxford" },
  { value: "\u00a320+", label: "Delivery from" },
  { value: "Rated 5", label: "Food hygiene" },
];

const quickActions = [
  {
    Icon: ShoppingBag,
    title: "Order online",
    detail: "See offers as you build your meal.",
    href: "/menu",
    label: "Start ordering",
  },
  {
    Icon: CalendarCheck,
    title: "Book a table",
    detail: "Date nights, families, students, and groups.",
    href: "/booking",
    label: "Reserve",
  },
  {
    Icon: Phone,
    title: "Call direct",
    detail: "Speak to the restaurant before you order.",
    href: restaurant.phoneHref,
    label: restaurant.phone,
  },
];

const storyStats = [
  ["Since 1956", "Serving Oxford from Walton Street."],
  ["BYOB groups", "Students, birthdays and bigger tables."],
  ["Order online", "Collection and local delivery available."],
  ["Oxford OX2", "Easy to find, book and call direct."],
];

const contactCards = [
  {
    Icon: MapPin,
    title: "Walton Street",
    detail: "107-108 Walton Street, Oxford OX2 6AJ.",
  },
  {
    Icon: Clock,
    title: "Dinner service",
    detail: "Open from 5.00pm most evenings. Tuesday closed.",
  },
  {
    Icon: Truck,
    title: "Delivery",
    detail: "From \u00a320 in eligible Oxford postcodes.",
  },
];

const reviewHighlights = reviews.slice(0, 3);

const homeCriticalCss = `
.home-hero-section {
  padding-top: 2.5rem;
  padding-bottom: 3.5rem;
}

.home-hero-shell {
  display: grid;
  align-items: center;
  gap: 2rem;
}

.home-hero-copy,
.home-hero-asides {
  min-width: 0;
}

.home-offer-card {
  min-height: 12.375rem;
}

@media (min-width: 640px) {
  .home-hero-section {
    padding-top: 3rem;
    padding-bottom: 4rem;
  }
}

@media (min-width: 1024px) {
  .home-hero-section {
    padding-top: 3.5rem;
    padding-bottom: 4rem;
  }

  .home-hero-shell {
    grid-template-columns: minmax(0, 760px) minmax(320px, 360px);
    justify-content: space-between;
    gap: 3rem;
  }

  .home-hero-asides {
    justify-self: end;
  }
}
`;

export default function Home() {
  return (
      <main className="overflow-hidden bg-[#0D0A08] pb-24 text-white lg:pb-0">
      <style dangerouslySetInnerHTML={{ __html: homeCriticalCss }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdMarkup(breadcrumbJsonLd)}
      />

      <section className="home-hero-section relative isolate overflow-hidden bg-[#0D0A08] px-4 sm:px-6 lg:px-8">
        <Image
          src={foodImages.hero}
          alt="Jamal's Indian Restaurant curry dishes served for dinner in Oxford"
          fill
          priority
          sizes="100vw"
          className="cinematic-hero-image object-cover"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,10,8,0.98)_0%,rgba(13,10,8,0.76)_42%,rgba(13,10,8,0.28)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,10,8,0.18)_0%,rgba(13,10,8,0.5)_58%,#0D0A08_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="home-hero-shell">
            <MotionStagger className="home-hero-copy w-full max-w-3xl">
              <MotionItem>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#F6DFA4] shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur">
                  <Flame size={16} aria-hidden="true" />
                  Walton Street dinner, from 5pm
                </p>
              </MotionItem>

              <MotionItem>
                <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl">
                  Authentic Indian Restaurant in Oxford Since 1956
                </h1>
              </MotionItem>

              <MotionItem>
                <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/78 sm:text-lg">
                  Warm spice, smoky tandoor, rich curries, and the comfort of a
                  long-standing Oxford curry house. Order for collection or
                  delivery, or make tonight feel like a proper table.
                </p>
              </MotionItem>

              <MotionItem>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <MagneticLink
                    href="/menu"
                    className="inline-flex h-[52px] min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#D7A542] px-7 text-sm font-black text-[#150D08] shadow-[0_18px_42px_rgba(215,165,66,0.25)] transition hover:bg-white sm:w-auto"
                  >
                    <ShoppingBag size={18} aria-hidden="true" />
                    Order online
                    <ArrowRight size={17} aria-hidden="true" />
                  </MagneticLink>
                  <MagneticLink
                    href="/booking"
                    className="inline-flex h-[52px] min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-7 text-sm font-black text-white backdrop-blur transition hover:border-[#D7A542] hover:text-[#F6DFA4] sm:w-auto"
                  >
                    <CalendarCheck size={18} aria-hidden="true" />
                    Book a table
                  </MagneticLink>
                </div>
              </MotionItem>

              <MotionItem>
                <div className="mt-6 grid max-w-3xl grid-cols-3 gap-2 sm:gap-3 lg:max-w-none">
                  {heroStats.map((item) => (
                    <div
                      key={item.label}
                      className="luxury-glass flex min-h-[94px] flex-col items-center justify-center rounded-lg px-3 py-3 text-center"
                    >
                      <p className="text-xl font-black leading-tight text-[#D7A542] sm:text-2xl lg:text-[1.55rem]">
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

            <MotionReveal delay={0.4} className="home-hero-asides grid w-full max-w-sm gap-3 justify-self-start">
              <div className="hero-float-card luxury-glass min-h-[148px] rounded-lg p-5">
                <div className="flex items-center gap-2 text-[#D7A542]" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-3 text-lg font-black">Oxford favourite</p>
                <p className="mt-2 text-sm leading-6 text-white/74">
                  Curry-night comfort, quick collection, and generous portions.
                </p>
              </div>

              <div className="hero-float-card luxury-glass hero-float-dish min-h-[148px] rounded-lg p-5">
                <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#F6DFA4]">
                  <BadgePercent size={16} aria-hidden="true" />
                  Tonight&apos;s reward
                </p>
                <p className="mt-3 text-2xl font-black">Best offer in cart</p>
                <p className="mt-2 text-sm leading-6 text-white/74">
                  Collection discount or delivery reward shown before checkout.
                </p>
              </div>
            </MotionReveal>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3 lg:mt-8">
            {quickActions.map(({ Icon, title, detail, href, label }, index) => (
              <MotionReveal key={title} delay={index * 0.06}>
                <Link
                  href={href}
                  className="group luxury-card flex min-h-[116px] items-center rounded-lg p-4 transition duration-300 hover:-translate-y-1 hover:border-[#D7A542]/70"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D7A542] text-[#150D08]">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="ml-4 min-w-0">
                    <span className="block text-lg font-black text-white">
                      {title}
                    </span>
                    <span className="mt-1.5 block text-sm leading-5 text-white/66">
                      {detail}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-[#D7A542]">
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

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MotionReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#D7A542]">
                Craveable favourites
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
                Start with the dishes people picture before they order.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/68">
                Creamy curries, tandoori grills and house favourites ready for
                collection, delivery or dinner on Walton Street.
              </p>
            </div>
            <Link
              href="/menu"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-6 text-sm font-black text-white transition hover:border-[#D7A542] hover:text-[#F6DFA4]"
            >
              See full menu
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </MotionReveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredDishes.map((dish, index) => (
              <MotionReveal key={dish.name} delay={index * 0.08}>
                <article className="group luxury-card flex h-full flex-col overflow-hidden rounded-lg transition duration-300 hover:-translate-y-1 hover:border-[#D7A542]/65">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#170F0C]">
                    <Image
                      src={dish.image}
                      alt={`${dish.name} from Jamal's Indian Restaurant`}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(13,10,8,0.84)_100%)]" />
                    <span className="absolute left-4 top-4 rounded-full bg-[#D7A542] px-3 py-1 text-xs font-black text-[#150D08]">
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
                      className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-white px-4 text-sm font-black text-[#150D08] transition hover:bg-[#D7A542]"
                    >
                      Add from menu
                      <ShoppingBag size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#140D0B] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <MotionReveal>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#D7A542]">
              Menu rhythm
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Find the food you came for.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/68">
              Browse starters, tandoori grills, chef specials, classic curries,
              rice and fresh bread from one clear menu.
            </p>
            <div className="mt-7 h-px w-full gold-divider" aria-hidden="true" />
          </MotionReveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {menuCategories.map((category, index) => (
              <MotionReveal key={category.name} delay={index * 0.04}>
                <Link
                  href="/menu"
                  className="group luxury-card block min-h-[184px] rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:border-[#D7A542]/70"
                >
                  <Sparkles className="text-[#D7A542]" size={23} aria-hidden="true" />
                  <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#D7A542]">
                    {category.count} choices
                  </p>
                  <h3 className="mt-2 text-xl font-black text-white group-hover:text-[#F6DFA4]">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-white/64">
                    {category.detail}
                  </p>
                </Link>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <MotionReveal className="h-full">
            <div className="flex h-full flex-col">
              <div className="flex items-start gap-3">
                <Gift className="mt-1 text-[#D7A542]" size={26} aria-hidden="true" />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-[#D7A542]">
                    Offers
                  </p>
                  <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
                    Tonight&apos;s best rewards.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
                    Collection discounts and free delivery extras are shown
                    before checkout when your order qualifies.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid flex-1 gap-4 sm:grid-cols-2">
                {offers.map((offer) => (
                  <article
                    key={offer.title}
                    className="home-offer-card luxury-card flex flex-col rounded-lg p-5"
                  >
                    <h3 className="text-lg font-black leading-7 text-white">
                      {offer.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/66">
                      {offer.detail}
                    </p>
                    <p className="mt-auto pt-4 text-xs font-black uppercase tracking-wide text-[#D7A542]">
                      {offer.note}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.12} className="h-full">
            <div className="luxury-card flex h-full flex-col rounded-lg p-5 sm:p-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#D7A542] px-4 py-2 text-sm font-black text-[#150D08]">
                <GraduationCap size={18} aria-hidden="true" />
                Student Offer
              </p>
              <h2 className="mt-6 text-3xl font-black leading-tight sm:text-4xl">
                Student nights and group tables.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/68">
                BYOB-friendly evenings, birthdays and bigger bookings with
                simple per-head pricing.
              </p>

              <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-2">
                {[
                  [`\u00a3${studentOffer.price}`, "per head"],
                  [`\u00a3${studentOffer.nonEaterPrice}`, "non-eaters"],
                  [studentOffer.discount, "student discount"],
                  ["200", "capacity"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="flex min-h-[82px] flex-col justify-center rounded-lg border border-white/12 p-4"
                  >
                    <p className="text-2xl font-black text-[#D7A542]">{value}</p>
                    <p className="mt-1 text-sm font-semibold text-white/68">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-[#100B09] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <MotionReveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {aboutImages.map((image) => (
                <div
                  key={image.alt}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-[#17100D] shadow-[0_16px_42px_rgba(0,0,0,0.24)]"
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
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#D7A542]">
              Since 1956
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              A Walton Street favourite since 1956.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/68">
              From quiet dinners to busy group tables, Jamal&apos;s brings
              generous Indian food, friendly service and familiar Oxford
              hospitality together.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {storyStats.map(([title, detail]) => (
                <div key={title} className="flex gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-[#D7A542]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-black text-white">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/64">
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MotionReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#D7A542]">
                Customer proof
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
                What customers say after dinner.
              </h2>
            </div>
            <Link
              href="/reviews"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-6 text-sm font-black text-white transition hover:border-[#D7A542] hover:text-[#F6DFA4]"
            >
              Read reviews
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </MotionReveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {reviewHighlights.map((review, index) => (
              <MotionReveal key={review.name} delay={index * 0.08}>
                <article className="luxury-card flex h-full flex-col rounded-lg p-5">
                  <Quote className="text-[#D7A542]" size={25} aria-hidden="true" />
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
                      <div className="flex text-[#D7A542]" aria-hidden="true">
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

      <section className="bg-[#140D0B] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
          <MotionReveal>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#D7A542]">
              Visit or order
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Order tonight or visit Walton Street.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/68">
              Find us in Oxford, call the restaurant, or start an order for
              collection and local delivery.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D7A542] px-6 text-sm font-black text-[#150D08] transition hover:bg-white"
              >
                <ShoppingBag size={17} aria-hidden="true" />
                Order tonight
              </Link>
              <a
                href={restaurant.phoneHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-6 text-sm font-black text-white transition hover:border-[#D7A542] hover:text-[#F6DFA4]"
              >
                <Phone size={17} aria-hidden="true" />
                {restaurant.phone}
              </a>
            </div>
          </MotionReveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {contactCards.map(({ Icon, title, detail }, index) => (
              <MotionReveal key={title} delay={index * 0.06} className="h-full">
                <article className="luxury-card flex h-full min-h-[168px] flex-col rounded-lg p-5">
                  <Icon className="text-[#D7A542]" size={23} aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-black text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/64">
                    {detail}
                  </p>
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
