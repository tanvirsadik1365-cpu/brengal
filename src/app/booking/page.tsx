import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, Phone, Wine } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { PageIntro } from "@/components/PageIntro";
import { foodImages, restaurant, studentOffer } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Book a Table",
  description:
    "Book a table at Jamal's Indian Restaurant in Oxford for dinner, student groups, birthdays, and BYOB evenings.",
};

export default function BookingPage() {
  return (
    <main className="bg-white text-[#241D1D]">
      <PageIntro
        eyebrow="Book a Table"
        title="Book a table at Jamal's."
        description="Dinner, student groups, birthdays, and BYOB evenings on Walton Street."
        imageSrc={foodImages.restaurant}
        imageAlt="Warm restaurant dining area set for dinner"
        meta="107 Walton Street · from 5.00pm"
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="grid gap-5">
            <div className="relative aspect-[4/3]">
              <Image
                src={foodImages.restaurant}
                alt="Restaurant dining area"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="rounded-lg object-cover"
              />
            </div>
            <div className="restaurant-card rounded-lg p-6">
              <h2 className="text-2xl font-black">Dine with us</h2>
              <p className="mt-3 text-sm leading-7 text-[#6B5D5B]">
                Warm service, familiar Indian dishes, and space for small
                tables or larger groups.
              </p>

              <div className="mt-6 border-t border-black/10 pt-5">
                <h3 className="font-black">Opening Hours</h3>
                <div className="mt-4 space-y-3 text-sm">
                  {restaurant.hours.map((item) => (
                    <div
                      key={item.days}
                      className="grid gap-1 sm:grid-cols-[1fr_auto]"
                    >
                      <span className="font-semibold">{item.days}</span>
                      <span className="text-[#6B5D5B]">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-black/10 pt-5">
                <div className="flex items-center gap-2 text-[#8A3430]">
                  <GraduationCap size={19} aria-hidden="true" />
                  <h3 className="font-black">{studentOffer.title}</h3>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-[#6B5D5B] sm:grid-cols-2">
                  <p>&pound;{studentOffer.price} per head</p>
                  <p>&pound;{studentOffer.nonEaterPrice} for non-eaters</p>
                  <p>{studentOffer.discount} student discount</p>
                  <p>{studentOffer.capacity}</p>
                </div>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#8A3430]">
                  <Wine size={17} aria-hidden="true" />
                  {studentOffer.drinks}
                </p>
              </div>

              <div className="mt-6 border-t border-black/10 pt-5">
                <h3 className="font-black">Need help?</h3>
                <p className="mt-2 text-sm leading-7 text-[#6B5D5B]">
                  For 10+ guests or special requests, call the restaurant.
                </p>
                <a
                  href={restaurant.phoneHref}
                  className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[#8A3430] px-4 text-sm font-black text-white transition hover:bg-[#6F2926]"
                >
                  <Phone size={17} aria-hidden="true" />
                  {restaurant.phone}
                </a>
              </div>
            </div>
          </aside>

          <BookingForm />
        </div>
      </section>
    </main>
  );
}
