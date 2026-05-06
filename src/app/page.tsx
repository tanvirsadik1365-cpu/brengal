import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  Gift,
  GraduationCap,
  MapPin,
  Phone,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { HomeHeroSlider } from "@/components/HomeHeroSlider";
import {
  aboutImages,
  brandHeroImage,
  featuredDishes,
  foodImages,
  menuCategories,
  offers,
  restaurant,
  studentOffer,
} from "@/lib/restaurant";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurant.name,
  image: [`https://${restaurant.website}${brandHeroImage}`],
  description: restaurant.description,
  servesCuisine: ["Indian", "Curry", "Tandoori", "Biryani"],
  priceRange: "\u00a3\u00a3",
  telephone: restaurant.phone,
  url: `https://${restaurant.website}`,
  menu: `https://${restaurant.website}/menu`,
  acceptsReservations: true,
  address: {
    "@type": "PostalAddress",
    streetAddress: restaurant.address[0],
    addressLocality: "Oxford",
    postalCode: "OX2 6AJ",
    addressCountry: "GB",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Wednesday", "Thursday"],
      opens: "17:00",
      closes: "22:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "17:00",
      closes: "23:00",
    },
  ],
};

const quickActions = [
  {
    Icon: ShoppingBag,
    title: "Order Online",
    detail: "Build your meal, see the best available offer, and checkout securely.",
    href: "/menu",
    label: "Start order",
  },
  {
    Icon: CalendarCheck,
    title: "Book a Table",
    detail: "Reserve dinner for date nights, families, students, and groups.",
    href: "/booking",
    label: "Reserve now",
  },
  {
    Icon: Phone,
    title: "Call Jamal's",
    detail: "Need help with an order or booking? Call us direct.",
    href: restaurant.secondaryPhoneHref,
    label: "Call now",
  },
];

const trustItems = [
  { value: restaurant.established, label: "Serving Oxford since" },
  { value: "5 miles", label: "Local delivery area" },
  { value: "Best offer", label: "Applied in the cart" },
  { value: "BYOB", label: "Groups welcome" },
];

const contactCards = [
  {
    Icon: MapPin,
    title: "Find Us",
    detail: "107 Walton Street, Oxford OX2 6AJ.",
  },
  {
    Icon: Clock,
    title: "Dinner Hours",
    detail: "Sun, Mon, Wed & Thu 5.00pm-10.30pm. Fri & Sat until 11.00pm. Tuesday closed.",
  },
  {
    Icon: Truck,
    title: "Delivery",
    detail: "Delivery from \u00a320 within 5 miles.",
  },
];

const heroSlides = [
  {
    alt: "Warm Indian restaurant interior ready for dinner service",
    eyebrow: "Interior",
    image: foodImages.restaurant,
    summary:
      "A warm dining room for date nights, families, students, and group tables.",
    title: "Settle in on Walton Street.",
  },
  {
    alt: "Warmly lit restaurant exterior at night",
    eyebrow: "Exterior",
    image: foodImages.exterior,
    summary:
      "A long-standing Oxford curry house serving local diners since 1956.",
    title: "Easy to find, easy to order.",
  },
  {
    alt: featuredDishes[0].name,
    eyebrow: "Popular Food",
    image: featuredDishes[0].image,
    summary: `${featuredDishes[0].name}, tandoori grills, biryani, and chef-selected feasts ready from the menu.`,
    title: "Start with the favourites.",
  },
];

export default function Home() {
  return (
    <main className="bg-white text-[var(--brand-ink)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative isolate overflow-hidden bg-[#FFFCF6] text-[var(--brand-ink)]">
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,#fff_0%,#FFFCF6_46%,#fff_100%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 sm:py-14 lg:min-h-[calc(82svh-88px)] lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.82fr)] lg:gap-14 lg:px-8 lg:py-10 xl:gap-16">
          <div className="home-reveal w-full min-w-0 max-w-[680px]">
            <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-black text-[var(--brand-primary)] shadow-sm">
              <Clock size={17} aria-hidden="true" />
              Open from 5.00pm
            </p>

            <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-[var(--brand-primary)]">
              Walton Street, Oxford
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[1.02] sm:text-6xl lg:text-[4.7rem] xl:text-[5rem]">
              Jamal&apos;s Indian Restaurant
            </h1>
            <p className="mt-6 max-w-full text-lg leading-8 text-[var(--brand-muted)] sm:max-w-2xl">
              Fresh curries, tandoori grills, biryani, and warm dine-in
              service on Walton Street. Order online for collection or
              delivery, or reserve a table tonight.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/menu"
                className="inline-flex h-12 w-full min-w-40 items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-6 text-sm font-black text-white shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--brand-primary-dark)] sm:w-auto"
              >
                <ShoppingBag size={18} aria-hidden="true" />
                Order Online
              </Link>
              <Link
                href="/booking"
                className="inline-flex h-12 w-full min-w-40 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 text-sm font-black text-[var(--brand-primary)] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-primary)] sm:w-auto"
              >
                <CalendarCheck size={18} aria-hidden="true" />
                Book a Table
              </Link>
            </div>

            <div className="mt-9 flex flex-col gap-4 text-sm text-[var(--brand-muted)] sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <span className="flex text-[var(--brand-primary)]" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={17} fill="currentColor" />
                  ))}
                </span>
                <span className="font-black text-[var(--brand-ink)]">4.8</span>
                <span>Oxford favourite</span>
              </div>
              <a
                href={restaurant.secondaryPhoneHref}
                className="inline-flex items-center gap-2 transition hover:text-[var(--brand-primary)]"
              >
                <Phone size={17} className="text-[var(--brand-primary)]" aria-hidden="true" />
                <span>{restaurant.secondaryPhone}</span>
              </a>
            </div>

            <div className="mt-10 grid w-full max-w-[680px] grid-cols-2 gap-3 lg:grid-cols-4">
              {trustItems.map((item) => (
                <div
                  key={item.label}
                  className="restaurant-surface min-h-[108px] rounded-lg p-4 transition duration-300 hover:-translate-y-1 hover:border-[var(--brand-primary)]"
                >
                  <p className="text-2xl font-black text-[var(--brand-primary)]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[var(--brand-muted)]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="home-reveal home-reveal-delay mx-auto w-full min-w-0 max-w-[570px] lg:justify-self-end">
            <HomeHeroSlider slides={heroSlides} />
          </div>
        </div>
      </section>

      <section className="section-reveal relative z-10 bg-white px-4 pb-12 pt-0 sm:px-6 sm:pb-14 lg:px-8">
        <div className="mx-auto -mt-4 grid max-w-7xl gap-3 md:grid-cols-3">
          {quickActions.map(({ Icon, title, detail, href, label }) => (
            <Link
              key={title}
              href={href}
              className="group restaurant-surface min-h-[156px] rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--brand-primary)] sm:p-6"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-lg font-black">{title}</span>
                  <span className="mt-2 block text-sm leading-6 text-[var(--brand-muted)]">
                    {detail}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[var(--brand-primary)]">
                    {label}
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-reveal bg-white px-4 py-16 text-[var(--brand-ink)] sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--brand-primary)]">
                Popular Orders
              </p>
              <h2 className="mt-3 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
                Start with the dishes people come back for.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--brand-muted)]">
                Rich curries, smoky grills, and generous sharing meals, all
                ready to add from the online menu.
              </p>
            </div>
            <Link
              href="/menu"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-6 text-sm font-black text-white transition hover:bg-[var(--brand-primary-dark)]"
            >
              See full menu
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredDishes.map((dish) => (
              <article
                key={dish.name}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-[var(--brand-line)] bg-[#FFFCF6] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(52,35,28,0.1)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[var(--brand-accent)] px-3 py-1 text-xs font-black text-[var(--brand-ink)]">
                    {dish.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-black">{dish.name}</h3>
                    <p className="shrink-0 text-xl font-black text-[var(--brand-accent)]">
                      &pound;{dish.price}
                    </p>
                  </div>
                  <p className="mt-3 min-h-14 text-sm leading-7 text-[var(--brand-muted)]">
                    {dish.description}
                  </p>
                  <Link
                    href="/menu"
                    className="mt-auto inline-flex h-10 items-center gap-2 self-start rounded-full border border-black/10 px-4 text-sm font-black text-[var(--brand-primary)] transition hover:border-[var(--brand-primary)]"
                  >
                    Add from menu
                    <ShoppingBag size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-reveal bg-[#FFFCF6] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.68fr_1.32fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--brand-primary)]">
              Browse the Menu
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Pick your favourites without hunting.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--brand-muted)]">
              Jump straight to starters, curry styles, tandoori grills,
              biryani, rice, bread, and set meals before you order.
            </p>
            <Link
              href="/menu"
              className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-6 text-sm font-black text-white shadow-lg shadow-black/10 transition hover:bg-[var(--brand-primary-dark)]"
            >
              Explore Menu
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {menuCategories.map((category) => (
              <Link
                key={category.name}
                href="/menu"
                className="group restaurant-surface min-h-[188px] rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--brand-primary)]"
              >
                <Sparkles className="text-[var(--brand-primary)]" size={24} aria-hidden="true" />
                <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[var(--brand-primary)]">
                  {category.count}
                </p>
                <h3 className="mt-2 text-xl font-black group-hover:text-[var(--brand-primary)]">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--brand-muted)]">
                  {category.detail}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-reveal bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {aboutImages.map((image) => (
              <div
                key={image.alt}
                className="group relative aspect-square overflow-hidden rounded-lg border border-[var(--brand-line)] bg-white shadow-sm"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--brand-primary)]">
              Our Story
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              A Walton Street favourite since 1956.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--brand-muted)]">
              Jamal&apos;s is built around the things customers actually come
              for: generous portions, familiar curries, friendly service, and
              an easy way to order or book before you arrive.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Since 1956", "Cooking for Oxford diners"],
                ["Walton Street", "Easy to find and call"],
                ["Collection & Delivery", "Order online and see your reward"],
                ["Groups Welcome", "Students, BYOB, and parties"],
              ].map(([title, detail]) => (
                <div key={title} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--brand-primary)]" />
                  <div>
                    <p className="font-black">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--brand-muted)]">
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-reveal restaurant-brand-panel px-4 py-16 text-[var(--brand-ink)] sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="flex items-center gap-3">
              <Gift className="text-[var(--brand-accent)]" size={28} aria-hidden="true" />
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--brand-accent)]">
                  Offers
                </p>
                <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                  Get the best available reward automatically.
                </h2>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/82">
              Add your food and the cart shows the strongest eligible reward
              before checkout.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {offers.map((offer) => (
                <article
                  key={offer.title}
                  className="rounded-lg border border-white/16 bg-white/12 p-5 shadow-sm backdrop-blur"
                >
                  <h3 className="text-xl font-black">{offer.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/82">
                    {offer.detail}
                  </p>
                  <p className="mt-4 text-xs font-black uppercase tracking-wide text-[var(--brand-accent)]">
                    {offer.note}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="pt-2 lg:pl-8">
            <p className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-accent)] px-4 py-2 text-sm font-black text-[var(--brand-ink)]">
              <GraduationCap size={18} aria-hidden="true" />
              Student Offer
            </p>
            <h2 className="mt-6 text-3xl font-black sm:text-4xl">
              Bring the group. Keep it simple.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/82">
              Clear student pricing, BYOB-friendly dinners, birthdays, and
              bigger tables, all with booking details in one place.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                [`\u00a3${studentOffer.price}`, "per head"],
                [`\u00a3${studentOffer.nonEaterPrice}`, "non-eaters"],
                [studentOffer.discount, "student discount"],
                ["200", "capacity"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/16 bg-white/12 p-4 shadow-sm"
                >
                  <p className="text-2xl font-black text-[var(--brand-accent)]">{value}</p>
                  <p className="mt-1 text-sm font-semibold text-white/78">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-reveal bg-white px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--brand-primary)]">
              Visit or Order
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Find us, call us, or order tonight.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--brand-muted)]">
              Check tonight&apos;s hours, get directions to Walton Street, or
              speak to the restaurant before you order.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {contactCards.map(({ Icon, title, detail }) => (
              <article
                key={title}
                className="restaurant-surface rounded-lg p-5"
              >
                <Icon className="text-[var(--brand-primary)]" size={23} aria-hidden="true" />
                <h3 className="mt-5 text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--brand-muted)]">
                  {detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
