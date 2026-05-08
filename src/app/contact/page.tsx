import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { foodImages, restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Jamal's Indian Restaurant in Oxford by phone, email, or message form.",
};

const fieldClass =
  "mt-2 h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#8A3430] focus:ring-4 focus:ring-[#8A3430]/10";

export default function ContactPage() {
  return (
    <main className="bg-white text-[#241D1D]">
      <PageIntro
        eyebrow="Contact Us"
        title="Call, visit, or message Jamal's."
        description="Address, phone numbers, opening hours, and a simple message form."
        imageSrc={foodImages.exterior}
        imageAlt="Jamal's exterior on Walton Street"
        meta={restaurant.location}
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              {
                Icon: MapPin,
                title: "Visit us",
                lines: restaurant.address,
                type: "address",
              },
              {
                Icon: Phone,
                title: "Call us",
                lines: [restaurant.phone, restaurant.secondaryPhone],
                type: "phone",
              },
              {
                Icon: Mail,
                title: "Email us",
                lines: [restaurant.email, restaurant.bookingEmail, restaurant.website],
                type: "email",
              },
              {
                Icon: MessageCircle,
                title: "Opening Hours",
                lines: restaurant.hours.map((item) => `${item.days}: ${item.time}`),
                type: "hours",
              },
            ].map(({ Icon, title, lines, type }) => (
              <article
                key={title}
                className="restaurant-card rounded-lg p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8A3430] text-white">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-xl font-black">{title}</h2>
                <div className="mt-3 space-y-1 text-sm leading-7 text-[#6B5D5B]">
                  {lines.map((line) => {
                    const href =
                      type === "phone"
                        ? line === restaurant.phone
                          ? restaurant.phoneHref
                          : restaurant.secondaryPhoneHref
                        : type === "email"
                          ? line.includes("@")
                            ? `mailto:${line}`
                            : `https://${line}`
                          : type === "address"
                            ? restaurant.mapsUrl
                          : undefined;

                    return href ? (
                      <a
                        key={line}
                        href={href}
                        className="block break-words font-semibold text-[#241D1D] transition hover:text-[#8A3430]"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line}>{line}</p>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>

          <form
            action={`mailto:${restaurant.email}?subject=${encodeURIComponent(
              "Website enquiry",
            )}`}
            method="post"
            encType="text/plain"
            className="restaurant-card rounded-lg p-6"
          >
            <h2 className="text-2xl font-black">Send a message</h2>
            <p className="mt-2 text-sm leading-7 text-[#6B5D5B]">
              Use this for bookings, feedback, catering, or special occasions.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-black">
                Name
                <input className={fieldClass} name="name" type="text" autoComplete="name" required />
              </label>
              <label className="text-sm font-black">
                Phone
                <input className={fieldClass} name="phone" type="tel" autoComplete="tel" />
              </label>
              <label className="text-sm font-black">
                Email
                <input className={fieldClass} name="email" type="email" autoComplete="email" required />
              </label>
              <label className="text-sm font-black">
                Subject
                <select className={fieldClass} name="subject" defaultValue="" required>
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option>General enquiry</option>
                  <option>Booking question</option>
                  <option>Feedback</option>
                  <option>Catering request</option>
                  <option>Complaint</option>
                  <option>Other</option>
                </select>
              </label>
            </div>

            <label className="mt-5 block text-sm font-black">
              Message
              <textarea
                className="mt-2 min-h-40 w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8A3430] focus:ring-4 focus:ring-[#8A3430]/10"
                name="message"
                required
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#8A3430] px-4 py-3 text-center text-sm font-black text-white transition hover:bg-[#6F2926]"
            >
              <Send size={18} aria-hidden="true" />
              Send message
            </button>
          </form>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="restaurant-card overflow-hidden rounded-lg">
            <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
              <div className="p-6 sm:p-8">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8A3430]">
                  Map
                </p>
                <h2 className="mt-2 text-3xl font-black">
                  107-108 Walton Street, Oxford
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#6B5D5B]">
                  Jamal&apos;s is on Walton Street in Jericho, Oxford, OX2 6AJ.
                </p>
                <a
                  href={restaurant.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#8A3430] px-5 text-sm font-black text-white transition hover:bg-[#6F2926]"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  Open Google Maps
                </a>
              </div>
              <iframe
                title="Jamal's Indian Restaurant location on Google Maps"
                src={restaurant.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full border-0 lg:h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
