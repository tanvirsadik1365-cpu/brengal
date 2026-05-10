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
    title: "Jamal’s Oxford | Indian Restaurant & Takeaway Since 1956",
    description:
      "Enjoy authentic Indian food at Jamal’s Oxford, serving Walton Street since 1956. Order online, book a table, or enjoy classic Indian curry, biryani, tandoori and grill dishes.",
  },
  menu: {
    path: "/menu",
    title: "Indian Food Menu Oxford | Curry, Biryani & Tandoori | Jamal’s",
    description:
      "Explore Jamal’s Indian food menu in Oxford. From curry and biryani to tandoori grills and vegetarian dishes, order online or book your table today.",
  },
  gallery: {
    path: "/gallery",
    title: "Indian Restaurant Food Gallery Oxford | Jamal’s",
    description:
      "View authentic Indian dishes, restaurant atmosphere and customer favourites at Jamal’s Oxford. Explore our Indian food gallery online.",
  },
  booking: {
    path: "/booking",
    title: "Book Indian Restaurant Table in Oxford | Jamal’s",
    description:
      "Reserve your table at Jamal’s Oxford. Enjoy authentic Indian cuisine, family dining and traditional curry dishes in the heart of Oxford.",
  },
  reviews: {
    path: "/reviews",
    title: "Customer Reviews | Jamal’s Indian Restaurant Oxford",
    description:
      "Read customer reviews for Jamal’s Oxford. Discover why locals and visitors love our authentic Indian food and restaurant experience.",
  },
  contact: {
    path: "/contact",
    title: "Contact Jamal’s Oxford | Indian Restaurant & Takeaway",
    description:
      "Contact Jamal’s Oxford for bookings, takeaway orders and restaurant enquiries. Visit us on Walton Street, Oxford OX2 6AJ.",
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
        name: "Jamals",
        alternateName: [
          "Jamal's Oxford",
          "Jamal's Indian Restaurant",
          "Jamal's Indian Restaurant & Takeaway",
        ],
        image: [ogImageUrl, absoluteUrl(brandHeroImage)],
        url: `${siteUrl}/`,
        telephone: "+44 1865 554905",
        priceRange: "££",
        menu: absoluteUrl("/menu"),
        hasMenu: {
          "@id": `${siteUrl}/menu#menu`,
        },
        servesCuisine: ["Indian", "Curry", "Biryani", "Tandoori"],
        acceptsReservations: true,
        foundingDate: "1956",
        slogan: "Serving Oxford since 1956",
        description:
          "Jamal's is an Indian restaurant and takeaway on Walton Street, Oxford, serving curry, biryani, tandoori grills, online ordering and table bookings.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "107-108 Walton St",
          addressLocality: "Oxford",
          postalCode: "OX2 6AJ",
          addressCountry: "GB",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 51.7608058,
          longitude: -1.2669998,
        },
        areaServed: [
          "Oxford",
          "Walton Street",
          "Jericho Oxford",
          "Oxford University area",
          "OX1",
          "OX2",
          "OX3",
          "OX4",
          "OX5",
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Wednesday", "Thursday", "Sunday"],
            opens: "17:00",
            closes: "22:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Friday", "Saturday"],
            opens: "17:00",
            closes: "23:00",
          },
        ],
        sameAs: [
          "https://www.facebook.com/jamals.oxford",
          "https://www.instagram.com/jamals_oxford/",
          `${siteUrl}/`,
        ],
        potentialAction: [
          {
            "@type": "OrderAction",
            name: "Order Direct From Jamal’s Oxford",
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
        name: "Jamal’s Oxford",
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
    name: "Indian Food Menu in Oxford",
    url: absoluteUrl("/menu"),
    inLanguage: "en-GB",
    provider: {
      "@id": `${siteUrl}/#restaurant`,
    },
    hasMenuSection: menuSections.map((section) => ({
      "@type": "MenuSection",
      "@id": `${siteUrl}/menu#${section.id}`,
      name: section.title,
      description: `${section.description} Order Indian food online from Jamal's Oxford.`,
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
      caption: "Authentic Indian food served at Jamal's Oxford",
    },
    image: galleryImages.map((image) => ({
      "@type": "ImageObject",
      name: image.title,
      caption: image.caption,
      contentUrl: absoluteUrl(image.src),
    })),
  };
}
