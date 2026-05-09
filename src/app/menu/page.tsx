import type { Metadata } from "next";
import { MenuOrderClient } from "@/components/MenuOrderClient";
import {
  createBreadcrumbJsonLd,
  createMenuJsonLd,
  createPageMetadata,
  jsonLdMarkup,
  seoPages,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(seoPages.menu);

const menuJsonLd = createMenuJsonLd();
const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
]);

export default function MenuPage() {
  return (
    <main className="bg-[#0D0A08] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdMarkup(menuJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdMarkup(breadcrumbJsonLd)}
      />
      <MenuOrderClient />
    </main>
  );
}
