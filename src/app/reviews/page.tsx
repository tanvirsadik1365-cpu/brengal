import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Star, ThumbsUp } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { foodImages, reviews } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read customer review highlights for Jamal's Indian Restaurant in Oxford.",
};

const ratings = [
  ["5", "89%"],
  ["4", "8%"],
  ["3", "2%"],
  ["2", "1%"],
  ["1", "0%"],
];

export default function ReviewsPage() {
  return (
    <main className="bg-white text-[#241D1D]">
      <PageIntro
        eyebrow="Reviews"
        title="What Oxford diners say."
        description="Customer notes on the food, service, student dinners, and takeaway orders."
        imageSrc={foodImages.biryani}
        imageAlt="Aromatic Indian biryani served for dinner"
        meta="4.8 average from customer highlights"
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 restaurant-card rounded-lg p-6 md:grid-cols-[280px_1fr_220px] md:items-center">
            <div className="text-center">
              <p className="text-6xl font-black text-[#8A3430]">4.8</p>
              <div className="mt-3 flex justify-center text-[#8A3430]" aria-label="Five star rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="mt-2 text-sm font-semibold text-[#6B5D5B]">
                Customer highlights
              </p>
            </div>

            <div className="space-y-3">
              {ratings.map(([score, percent]) => (
                <div key={score} className="grid grid-cols-[24px_1fr_44px] items-center gap-3">
                  <span className="text-sm font-black">{score}</span>
                  <span className="h-3 overflow-hidden rounded-full bg-black/10">
                    <span
                      className="block h-full rounded-full bg-[#8A3430]"
                      style={{ width: percent }}
                    />
                  </span>
                  <span className="text-right text-sm font-semibold text-[#6B5D5B]">
                    {percent}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#8A3430] px-5 text-sm font-black text-white transition hover:bg-[#6F2926]"
            >
              <MessageSquare size={18} aria-hidden="true" />
              Leave feedback
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.name}
                className="restaurant-card rounded-lg p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8A3430] text-sm font-black text-white">
                    {review.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <div>
                    <h2 className="font-black">{review.name}</h2>
                    <p className="mt-1 text-xs font-black uppercase tracking-wide text-[#8A3430]">
                      Verified
                    </p>
                  </div>
                  <p className="ml-auto text-xs font-semibold text-[#6B5D5B]">
                    {review.date}
                  </p>
                </div>
                <div className="mt-5 flex text-[#8A3430]" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={17} fill="currentColor" />
                  ))}
                </div>
                <h3 className="mt-4 text-lg font-black">{review.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#6B5D5B]">
                  {review.text}
                </p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#6B5D5B]">
                  <ThumbsUp size={16} aria-hidden="true" />
                  Helpful ({review.helpful})
                </p>
              </article>
            ))}
          </div>

          <blockquote className="mt-10 restaurant-card rounded-lg p-8 text-center">
            <p className="text-2xl font-black leading-tight">
              "Warm service, generous dishes, and a Walton Street story since
              1956."
            </p>
            <footer className="mt-4 text-sm font-semibold text-[#6B5D5B]">
              - Jamal's Indian Restaurant
            </footer>
          </blockquote>
        </div>
      </section>
    </main>
  );
}
