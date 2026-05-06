import type { Metadata } from "next";
import Script from "next/script";
import { CartProvider } from "@/components/CartProvider";
import { OfferPopup } from "@/components/OfferPopup";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const browserExtensionHydrationCleanupScript = `
(() => {
  const shouldRemoveAttribute = (name) =>
    name === "cz-shortcut-listen" ||
    name.startsWith("bis_") ||
    name.startsWith("__processed_");

  const cleanElement = (element) => {
    for (const { name } of Array.from(element.attributes)) {
      if (shouldRemoveAttribute(name)) {
        element.removeAttribute(name);
      }
    }
  };

  const cleanTree = (root) => {
    if (root.nodeType === Node.ELEMENT_NODE) {
      cleanElement(root);
    }

    if (typeof root.querySelectorAll === "function") {
      root.querySelectorAll("*").forEach(cleanElement);
    }
  };

  const cleanDocument = () => {
    if (document.documentElement) {
      cleanTree(document.documentElement);
    }
  };

  cleanDocument();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.target.nodeType === Node.ELEMENT_NODE) {
        cleanElement(mutation.target);
      }

      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(cleanTree);
      }
    }
  });

  if (document.documentElement) {
    observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }

  document.addEventListener("DOMContentLoaded", cleanDocument, { once: true });
  window.addEventListener("load", cleanDocument, { once: true });
  window.setTimeout(() => {
    cleanDocument();
    observer.disconnect();
  }, 5000);
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://jamals-saffron.co.uk",
  ),
  title: {
    default: "Jamal's Indian Restaurant Oxford | Indian Takeaway & Table Booking",
    template: "%s | Jamal's Indian Restaurant",
  },
  description:
    "Jamal's Indian Restaurant on Walton Street, Oxford. Order Indian takeaway for collection or delivery, or book a table online.",
  keywords: [
    "Jamal's Indian Restaurant",
    "Indian restaurant Oxford",
    "Indian takeaway Oxford",
    "Walton Street Indian food",
    "student offer Oxford restaurant",
  ],
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Jamal's Indian Restaurant Oxford",
    description:
      "Walton Street Indian restaurant for dine-in, collection, delivery, and group bookings.",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/jamals/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Jamal's Indian Restaurant brand banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jamal's Indian Restaurant Oxford",
    description:
      "Indian restaurant and takeaway on Walton Street, Oxford.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {process.env.NODE_ENV === "development" ? (
          <Script
            id="browser-extension-hydration-cleanup"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: browserExtensionHydrationCleanupScript,
            }}
          />
        ) : null}
        <CartProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
          <OfferPopup />
        </CartProvider>
      </body>
    </html>
  );
}
