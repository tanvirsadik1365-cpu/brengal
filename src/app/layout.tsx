import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { CartProvider } from "@/components/CartProvider";
import { OfferPopup } from "@/components/OfferPopup";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { restaurant } from "@/lib/restaurant";
import {
  createGlobalRestaurantJsonLd,
  jsonLdMarkup,
  ogImageUrl,
  seoPages,
  siteUrl,
} from "@/lib/seo";
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
  metadataBase: new URL(siteUrl),
  applicationName: restaurant.name,
  title: {
    default: seoPages.home.title,
    template: "%s",
  },
  description: seoPages.home.description,
  authors: [{ name: "Jamal's Oxford", url: siteUrl }],
  creator: "Jamal's Oxford",
  publisher: "Jamal's Oxford",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  keywords: [
    "Jamal's Oxford",
    "Indian restaurant Oxford",
    "Best Indian restaurant Oxford",
    "Indian takeaway Oxford",
    "Curry Oxford",
    "Biryani Oxford",
    "Tandoori Oxford",
    "Indian food Walton Street",
    "Book Indian restaurant Oxford",
    "Order Indian food online Oxford",
    "Jericho Oxford Indian restaurant",
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
  twitter: {
    card: "summary_large_image",
    title: "Jamal’s Oxford | Indian Restaurant Since 1956",
    description: "Authentic Indian food in Oxford since 1956.",
    images: [ogImageUrl],
  },
  other: {
    "geo.region": "GB-OXF",
    "geo.placename": "Oxford",
    "geo.position": "51.7649;-1.2641",
    ICBM: "51.7649, -1.2641",
    "format-detection": "telephone=yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#121212",
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
      <head>
        <meta property="og:type" content="restaurant" />
        <meta
          property="og:title"
          content="Jamal’s Oxford | Indian Restaurant Since 1956"
        />
        <meta
          property="og:description"
          content="Authentic Indian food in Oxford. Order online or book your table at Jamal’s Walton Street."
        />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:site_name" content="Jamal’s Oxford" />
        <meta property="og:locale" content="en_GB" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MKW7PRTP');`,
          }}
        />
        <script
          id="restaurant-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdMarkup(createGlobalRestaurantJsonLd())}
        />
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MKW7PRTP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
