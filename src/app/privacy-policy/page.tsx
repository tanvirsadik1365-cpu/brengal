import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Mail, ReceiptText, ShieldCheck, UserRound } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { foodImages, restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Bengal online ordering, bookings, customer accounts, and order tracking.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const privacyItems = [
  {
    Icon: UserRound,
    title: "Details You Provide",
    body:
      "We collect details needed to handle orders, reservations, account access, and enquiries. This can include your name, email, phone number, delivery address, postcode, order notes, booking details, and account email.",
  },
  {
    Icon: ReceiptText,
    title: "Orders & Reservations",
    body:
      "Order and reservation records are kept so the restaurant can prepare food, contact customers, track order status, support account history, and respond to customer service requests.",
  },
  {
    Icon: ShieldCheck,
    title: "Payments",
    body:
      "Online card payments are handled by Stripe. This website does not store full card numbers. Payment references may be stored with the order so payment status can be confirmed.",
  },
  {
    Icon: Lock,
    title: "Access & Security",
    body:
      "Customer account authentication and database records use Supabase services. Access to merchant tools is intended only for authorised restaurant users.",
  },
];

const sections = [
  {
    title: "How Information Is Used",
    body:
      "Information is used to process orders, take payment, manage delivery or collection, handle reservations, provide order tracking, save account history, support customer service, and keep the website working reliably.",
  },
  {
    title: "Sharing",
    body:
      "Information may be shared with service providers that power the website, database, authentication, email/order notifications, and payments. Information may also be shared where required by law or to protect the website and restaurant operations.",
  },
  {
    title: "Retention",
    body:
      "Order, payment reference, reservation, and account records may be retained for operational, customer support, accounting, and legal reasons. Customers can contact the restaurant about account or data questions.",
  },
  {
    title: "Cookies & Local Storage",
    body:
      "The website may use cookies or browser storage for basket contents, order type preference, account sessions, and basic site functionality. Disabling these may affect ordering or account features.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white text-[#121212]">
      <PageIntro
        eyebrow="Privacy"
        title="Privacy Policy"
        description={`How ${restaurant.website} handles customer details for ordering, bookings, accounts, and order tracking.`}
        imageSrc={foodImages.restaurant}
        imageAlt="Bengal restaurant branding"
        meta="Last updated May 8, 2026"
      />

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-2">
            {privacyItems.map(({ Icon, title, body }) => (
              <article key={title} className="restaurant-card rounded-lg p-5">
                <Icon className="text-[#2B1408]" size={24} aria-hidden="true" />
                <h2 className="mt-4 text-xl font-black">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#5F5A53]">
                  {body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 restaurant-card rounded-lg p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-lg font-black">{section.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#5F5A53]">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-[#E3D7C5] bg-[#F5F2EC] p-6">
            <h2 className="text-xl font-black">Privacy questions</h2>
            <p className="mt-2 text-sm leading-7 text-[#5F5A53]">
              Contact the restaurant for privacy, account, order history, or
              reservation data questions.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`mailto:${restaurant.email}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#2B1408] px-5 text-sm font-black text-white transition hover:bg-[#1F0F06]"
              >
                <Mail size={16} aria-hidden="true" />
                {restaurant.email}
              </a>
              <Link
                href="/terms-and-conditions"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#2B1408]/20 bg-white px-5 text-sm font-black text-[#2B1408] transition hover:border-[#2B1408]"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

