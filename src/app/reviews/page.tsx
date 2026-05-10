import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  ExternalLink,
  MessageSquare,
  Quote,
  Star,
  ThumbsUp,
  Utensils,
} from "lucide-react";
import { foodImages, restaurant, reviews } from "@/lib/restaurant";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  createReviewsJsonLd,
  jsonLdMarkup,
  seoPages,
  shouldRenderJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(seoPages.reviews);

const reviewsJsonLd = createReviewsJsonLd();
const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Reviews", path: "/reviews" },
]);

const ratings = [
  ["5", "89%"],
  ["4", "8%"],
  ["3", "2%"],
  ["2", "1%"],
  ["1", "0%"],
];

function Stars({ label = "Five star rating" }: { label?: string }) {
  return (
    <span className="inline-flex text-[#D7A542]" aria-label={label}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={18} fill="currentColor" aria-hidden="true" />
      ))}
    </span>
  );
}

export default function ReviewsPage() {
  return (
    <main className="bg-[#0D0A08] text-white">
      {shouldRenderJsonLd ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLdMarkup(reviewsJsonLd)}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLdMarkup(breadcrumbJsonLd)}
          />
        </>
      ) : null}
      <section className="relative isolate overflow-hidden px-4 pb-12 pt-52 sm:px-6 lg:px-8 lg:py-16">
        <Image
          src={foodImages.biryani}
          alt="Aromatic Indian food served for dinner at Jamal's Oxford"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-46"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,10,8,0.96)_0%,rgba(13,10,8,0.78)_48%,rgba(13,10,8,0.34)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,10,8,0.18)_0%,rgba(13,10,8,0.86)_82%,#0D0A08_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.94fr)_380px] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#F6DFA4] shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur">
              <MessageSquare size={15} aria-hidden="true" />
              Oxford reviews
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">
              What Customers Say About Jamal&rsquo;s
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/68">
              Notes from local diners, takeaway regulars, students, and guests
              who love authentic Indian food on Walton Street, Oxford.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={restaurant.googleReviewsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 min-h-12 items-center justify-center gap-2 rounded-full bg-[#D7A542] px-6 text-sm font-black text-[#150D08] shadow-[0_16px_38px_rgba(215,165,66,0.22)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Read Google reviews
                <ExternalLink size={16} aria-hidden="true" />
              </a>
              <Link
                href="/menu"
                className="inline-flex h-12 min-h-12 items-center justify-center gap-2 rounded-full border border-white/14 bg-white/10 px-6 text-sm font-black text-white transition hover:border-[#D7A542]/60 hover:text-[#F6DFA4]"
              >
                Order tonight
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-[#D7A542]/24 bg-[#15100E]/88 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#D7A542]">
              Customer highlights
            </p>
            <div className="mt-4 flex items-end gap-3">
              <p className="text-6xl font-black leading-none text-white">4.8</p>
              <div className="pb-1">
                <Stars />
                <p className="mt-1 text-sm font-semibold text-white/56">
                  From review highlights
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {ratings.map(([score, percent]) => (
                <div
                  key={score}
                  className="grid grid-cols-[24px_1fr_44px] items-center gap-3"
                >
                  <span className="text-sm font-black text-white/78">{score}</span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-white/10">
                    <span
                      className="block h-full rounded-full bg-[#D7A542]"
                      style={{ width: percent }}
                    />
                  </span>
                  <span className="text-right text-xs font-black text-white/50">
                    {percent}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.name}
                className="flex min-h-[310px] flex-col rounded-lg border border-white/10 bg-[#15100E]/88 p-6 shadow-[0_18px_52px_rgba(0,0,0,0.28)]"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D7A542] text-sm font-black text-[#150D08]">
                    {review.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <div>
                    <h2 className="font-black text-white">{review.name}</h2>
                    <p className="mt-1 text-xs font-black uppercase tracking-wide text-[#D7A542]">
                      Customer note
                    </p>
                  </div>
                  <p className="ml-auto text-xs font-semibold text-white/44">
                    {review.date}
                  </p>
                </div>
                <div className="mt-5">
                  <Stars />
                </div>
                <h3 className="mt-4 text-xl font-black leading-tight text-white">
                  {review.title}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-white/62">
                  {review.text}
                </p>
                <p className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-white/48">
                  <ThumbsUp size={16} aria-hidden="true" />
                  Helpful ({review.helpful})
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
            <blockquote className="rounded-lg border border-[#D7A542]/24 bg-[radial-gradient(circle_at_top_left,rgba(215,165,66,0.2),transparent_34%),#15100E] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.3)] sm:p-8">
              <Quote className="text-[#D7A542]" size={32} aria-hidden="true" />
              <p className="mt-5 max-w-3xl text-2xl font-black leading-tight sm:text-4xl">
                Warm service, generous dishes, and a Walton Street story since
                1956.
              </p>
              <footer className="mt-4 text-sm font-semibold text-white/56">
                Jamal&apos;s Indian Restaurant, Oxford
              </footer>
            </blockquote>

            <div className="rounded-lg border border-white/10 bg-white/6 p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#D7A542]">
                Share your visit
              </p>
              <h2 className="mt-3 text-2xl font-black">Review us on Google.</h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-white/58">
                Recent Google reviews help new customers choose dinner with
                confidence.
              </p>
              <a
                href={restaurant.googleReviewsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D7A542] px-5 text-sm font-black text-[#150D08] transition hover:bg-white"
              >
                Open Google reviews
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-lg border border-white/10 bg-[#15100E] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-8 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#D7A542]">
              Ready for dinner
            </p>
            <h2 className="mt-2 text-3xl font-black">Taste what people remember.</h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D7A542] px-6 text-sm font-black text-[#150D08] transition hover:bg-white"
          >
            <Utensils size={17} aria-hidden="true" />
            Order online
          </Link>
          <Link
            href="/booking"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-6 text-sm font-black text-white transition hover:border-[#D7A542]/60 hover:text-[#F6DFA4]"
          >
            <CalendarCheck size={17} aria-hidden="true" />
            Book table
          </Link>
        </div>
      </section>
    </main>
  );
}
