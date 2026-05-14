import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { FaqList } from "@/components/FaqList";
import { PageIntro } from "@/components/PageIntro";
import { faqs, foodImages } from "@/lib/restaurant";
import {
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  jsonLdMarkup,
  shouldRenderJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Bengal Restaurant FAQs Winslow",
  },
  description:
    "Find answers about ordering, delivery, offers, bookings, and Bengal Indian and Bengali Cuisine in Winslow.",
  alternates: {
    canonical: "https://www.bengal.restaurant/faqs",
  },
};

const faqJsonLd = createFaqJsonLd();
const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "FAQs", path: "/faqs" },
]);

export default function FaqsPage() {
  return (
    <main className="bg-white text-[#121212]">
      {shouldRenderJsonLd ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLdMarkup(faqJsonLd)}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLdMarkup(breadcrumbJsonLd)}
          />
        </>
      ) : null}
      <PageIntro
        eyebrow="FAQs"
        title="Quick answers before you order."
        description="Ordering, delivery, offers, bookings, buffet service, and restaurant details."
        imageSrc={foodImages.hero}
        imageAlt="Bengal curry and tandoori dishes"
        meta="Ordering, delivery, bookings"
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <FaqList faqs={faqs} />

          <div className="restaurant-card mt-10 rounded-lg p-8 text-center">
            <HelpCircle className="mx-auto text-[#2B1408]" size={34} aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-black">Still have a question?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#5F5A53]">
              The restaurant can help with orders, bookings, allergens, and
              catering.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#2B1408] px-6 text-sm font-black text-white transition hover:bg-[#1F0F06]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

