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
  shouldRenderJsonLd,
  siteUrl,
} from "@/lib/seo";
import "./globals.css";

const googleTagManagerId = "GTM-MKW7PRTP";
const googleTagManagerScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${googleTagManagerId}');`;

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

const metadataBaseUrl = (() => {
  try {
    return new URL(siteUrl);
  } catch {
    return new URL("https://www.bengal.restaurant");
  }
})();

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl,
  applicationName: restaurant.name,
  title: {
    default: seoPages.home.title,
    template: "%s",
  },
  description: seoPages.home.description,
  authors: [{ name: "Bengal Winslow", url: siteUrl }],
  creator: "Bengal Winslow",
  publisher: "Bengal Winslow",
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
    "Bengal Winslow",
    "Indian restaurant Winslow",
    "Bengali restaurant Winslow",
    "Indian takeaway Winslow",
    "Curry Winslow",
    "Biryani Winslow",
    "Tandoori Winslow",
    "Indian food High Street Winslow",
    "Book Indian restaurant Winslow",
    "Order Indian food online Winslow",
    "MK18 Indian restaurant",
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
    title: "Bengal Winslow | Indian & Bengali Cuisine",
    description: "Authentic Indian and Bengali food in Winslow.",
    images: [ogImageUrl],
  },
  other: {
    "geo.region": "GB-BKM",
    "geo.placename": "Winslow",
    "geo.position": "51.9429;-0.8797",
    ICBM: "51.9429, -0.8797",
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
          content="Bengal Winslow | Indian & Bengali Cuisine"
        />
        <meta
          property="og:description"
          content="Authentic Indian and Bengali food in Winslow. Order online or book your table at Bengal High Street."
        />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:site_name" content="Bengal Winslow" />
        <meta property="og:locale" content="en_GB" />
        {shouldRenderJsonLd ? (
          <script
            id="restaurant-structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLdMarkup(createGlobalRestaurantJsonLd())}
          />
        ) : null}
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          id="google-tag-manager"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: googleTagManagerScript,
          }}
        />
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

