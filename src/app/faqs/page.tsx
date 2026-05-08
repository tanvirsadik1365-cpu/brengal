import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { FaqList } from "@/components/FaqList";
import { PageIntro } from "@/components/PageIntro";
import { faqs, foodImages } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Find answers about ordering, delivery, offers, bookings, and Jamal's Indian Restaurant in Oxford.",
};

export default function FaqsPage() {
  return (
    <main className="bg-white text-[#241D1D]">
      <PageIntro
        eyebrow="FAQs"
        title="Quick answers before you order."
        description="Ordering, delivery, rewards, bookings, student groups, and restaurant details."
        imageSrc={foodImages.hero}
        imageAlt="Jamal's curry and tandoori dishes"
        meta="Ordering, delivery, bookings"
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <FaqList faqs={faqs} />

          <div className="restaurant-card mt-10 rounded-lg p-8 text-center">
            <HelpCircle className="mx-auto text-[#8A3430]" size={34} aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-black">Still have a question?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#6B5D5B]">
              The restaurant can help with orders, bookings, allergens, and
              catering.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#8A3430] px-6 text-sm font-black text-white transition hover:bg-[#6F2926]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
