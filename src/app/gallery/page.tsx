import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageIntro } from "@/components/PageIntro";
import { brandHeroImage, galleryImages } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View food and restaurant photos from Jamal's Indian Restaurant in Oxford.",
};

export default function GalleryPage() {
  return (
    <main className="bg-white text-[#241D1D]">
      <PageIntro
        eyebrow="Gallery"
        title="Food, room, and details."
        description="A quick look at Jamal's before you order or book a table."
        imageSrc={brandHeroImage}
        imageAlt="Jamal's Indian Restaurant food and brand banner"
        meta="Food and restaurant photos"
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <GalleryGrid images={galleryImages} />
        </div>
      </section>
    </main>
  );
}
