import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { galleryImages } from "@/lib/restaurant";
import {
  createBreadcrumbJsonLd,
  createGalleryJsonLd,
  createPageMetadata,
  jsonLdMarkup,
  seoPages,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(seoPages.gallery);

const galleryJsonLd = createGalleryJsonLd();
const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
]);

export default function GalleryPage() {
  return (
    <main className="bg-[#0D0A08] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdMarkup(galleryJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdMarkup(breadcrumbJsonLd)}
      />
      <GalleryGrid images={galleryImages} />
    </main>
  );
}
