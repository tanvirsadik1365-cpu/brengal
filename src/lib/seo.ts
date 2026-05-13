import type { Metadata } from "next";
import {
  brandHeroImage,
  faqs,
  foodImages,
  galleryImages,
  menuSections,
  restaurant,
  reviews,
} from "@/lib/restaurant";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? restaurant.siteUrl;

export const ogImageUrl = `${siteUrl}/og-image.jpg`;
export const shouldRenderJsonLd = process.env.NODE_ENV === "production";

export const seoPages = {
  home: {
    path: "/",
    title: "Bengal Winslow | Indian & Bengali Cuisine",
    description:
      "Order Indian and Bengali food from Bengal in Winslow. Enjoy Bengal specials, tandoori grill, biryani, free local delivery in MK18 and MK17, or book a table.",
  },
  menu: {
    path: "/menu",
    title: "Bengal Menu Winslow | Indian & Bengali Food",
    description:
      "Explore Bengal's Indian and Bengali menu in Winslow, including Bengal specials, classic curries, tandoori grill, biryani, rice, naans and non-alcoholic drinks.",
  },
  gallery: {
    path: "/gallery",
    title: "Bengal Food Gallery Winslow",
    description:
      "View Bengal specials, tandoori grill, biryani, vegetarian dishes and Indian food favourites from Bengal in Winslow.",
  },
  booking: {
    path: "/booking",
    title: "Book a Table at Bengal Winslow",
    description:
      "Reserve a table at Bengal on High Street, Winslow for Indian and Bengali cuisine, family dining, group meals and Sunday buffet service.",
  },
  reviews: {
    path: "/reviews",
    title: "Customer Reviews | Bengal Winslow",
    description:
      "Read customer notes for Bengal in Winslow, from Bengal specials and tandoori grill to free local delivery and collection.",
  },
  contact: {
    path: "/contact",
    title: "Contact Bengal Winslow | Indian & Bengali Cuisine",
    description:
      "Contact Bengal in Winslow for bookings, takeaway orders, free local delivery, collection and restaurant enquiries.",
  },
} as const;

type SeoPage = (typeof seoPages)[keyof typeof seoPages];

export function absoluteUrl(path = "/") {
  if (path === "/") {
    return `${siteUrl}/`;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata(page: SeoPage): Metadata {
  return {
    title: {
      absolute: page.title,
    },
    description: page.description,
    alternates: {
      canonical: absoluteUrl(page.path),
    },
  };
}

export function jsonLdMarkup(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function createBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createGlobalRestaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Restaurant", "LocalBusiness"],
        "@id": `${siteUrl}/#restaurant`,
        name: restaurant.name,
        alternateName: [
          "Bengal Winslow",
          "Bengal Restaurant",
          "Bengal Indian and Bengali Cuisine",
        ],
        image: [ogImageUrl, absoluteUrl(brandHeroImage)],
        url: `${siteUrl}/`,
        telephone: "+44 1296 712222",
        priceRange: "GBP GBP",
        menu: absoluteUrl("/menu"),
        hasMenu: {
          "@id": `${siteUrl}/menu#menu`,
        },
        servesCuisine: ["Indian", "Bengali", "Curry", "Biryani", "Tandoori"],
        acceptsReservations: true,
        foundingDate: restaurant.established || undefined,
        slogan: "Flavours of India and Bangladesh in Winslow",
        description:
          "Bengal is an Indian and Bengali restaurant and takeaway on High Street, Winslow, serving curry, biryani, tandoori grills, Bengal specials, free local delivery and table bookings.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "40 High St",
          addressLocality: "Winslow",
          postalCode: "MK18 3HB",
          addressCountry: "GB",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 51.9429,
          longitude: -0.8797,
        },
        areaServed: [
          "Winslow",
          "Buckingham",
          "MK18",
          "MK17",
          "Within 5 miles of Winslow",
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "12:00",
            closes: "14:30",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "18:00",
            closes: "22:30",
          },
        ],
        sameAs: [`${siteUrl}/`, restaurant.menuPdfUrl],
        potentialAction: [
          {
            "@type": "OrderAction",
            name: "Order Direct From Bengal Winslow",
            target: absoluteUrl("/menu"),
          },
          {
            "@type": "ReserveAction",
            name: "Book Your Table Today",
            target: absoluteUrl("/booking"),
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Bengal Winslow",
        url: `${siteUrl}/`,
        inLanguage: "en-GB",
        publisher: {
          "@id": `${siteUrl}/#restaurant`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/menu?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

export function createMenuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${siteUrl}/menu#menu`,
    name: "Bengal Indian and Bengali Food Menu in Winslow",
    url: absoluteUrl("/menu"),
    inLanguage: "en-GB",
    provider: {
      "@id": `${siteUrl}/#restaurant`,
    },
    hasMenuSection: menuSections.map((section) => ({
      "@type": "MenuSection",
      "@id": `${siteUrl}/menu#${section.id}`,
      name: section.title,
      description: `${section.description} Order Indian and Bengali food online from Bengal Winslow.`,
      image: absoluteUrl(section.image),
      numberOfItems: section.items.length,
    })),
  };
}

export function createFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createReviewsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/reviews#webpage`,
    name: seoPages.reviews.title,
    url: absoluteUrl("/reviews"),
    about: {
      "@id": `${siteUrl}/#restaurant`,
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      name: review.title,
      reviewBody: review.text,
      itemReviewed: {
        "@id": `${siteUrl}/#restaurant`,
      },
    })),
  };
}

export function createGalleryJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seoPages.gallery.title,
    description: seoPages.gallery.description,
    url: absoluteUrl("/gallery"),
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@id": `${siteUrl}/#restaurant`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: absoluteUrl(foodImages.curry),
      caption: "Authentic Indian and Bengali food served at Bengal Winslow",
    },
    image: galleryImages.map((image) => ({
      "@type": "ImageObject",
      name: image.title,
      caption: image.caption,
      contentUrl: absoluteUrl(image.src),
    })),
  };
}
