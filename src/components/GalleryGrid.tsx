"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Camera,
  ChefHat,
  Flame,
  GlassWater,
  MapPin,
  Sparkles,
  Star,
  Store,
  Utensils,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { restaurant, type GalleryImageData } from "@/lib/restaurant";

type GalleryCategory =
  | "All"
  | "Signature"
  | "Tandoori"
  | "Curry"
  | "Restaurant"
  | "Drinks"
  | "Details";

type GalleryImage = GalleryImageData;

type GalleryGridProps = {
  images: GalleryImage[];
};

type CategoryConfig = {
  Icon: LucideIcon;
  label: GalleryCategory;
};

const categories: CategoryConfig[] = [
  { label: "All", Icon: Sparkles },
  { label: "Signature", Icon: Star },
  { label: "Tandoori", Icon: Flame },
  { label: "Curry", Icon: Utensils },
  { label: "Restaurant", Icon: Store },
  { label: "Drinks", Icon: GlassWater },
  { label: "Details", Icon: BadgeCheck },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const chapterOrder = [
  "Signature dishes",
  "Start the table",
  "From the tandoor",
  "Curry comfort",
  "Vegetarian favourites",
  "High Street Winslow",
  "Drinks menu",
];

const chapterSummaries: Record<string, string> = {
  "Signature dishes": "Curry-night favourites with colour, heat, and comfort.",
  "Start the table": "Small plates that make the first few minutes count.",
  "From the tandoor": "Smoke, char, and the glow of the grill.",
  "Curry comfort": "Sauces, breads, and bowls built for sharing.",
  "Vegetarian favourites": "Warm vegetable dishes with proper depth.",
  "High Street Winslow": "The Bengal tiger mark and sense of place.",
  "Drinks menu": "Non-alcoholic drinks listed on the menu.",
};

function getChapterGridClass(count: number) {
  if (count === 1) {
    return "grid-cols-1";
  }

  if (count === 2) {
    return "grid-cols-1 md:grid-cols-2";
  }

  return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
}

function getChapterCardAspect(chapter: string) {
  if (chapter === "Trust signals") {
    return "aspect-[16/9]";
  }

  if (chapter === "High Street Winslow") {
    return "aspect-[4/3]";
  }

  return "aspect-[5/4]";
}

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function GalleryLink({
  href,
  className,
  children,
  ariaLabel,
}: {
  ariaLabel?: string;
  children: React.ReactNode;
  className: string;
  href: string;
}) {
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

function getImageAlt(image: GalleryImage) {
  return image.alt ?? `${image.title} at ${restaurant.name}`;
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const categoryRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const availableCategories = useMemo(() => {
    const available = new Set(images.map((image) => image.category));

    return categories.filter(
      (category) => category.label === "All" || available.has(category.label),
    );
  }, [images]);

  const featuredImages = useMemo(
    () => images.filter((image) => image.featured).slice(0, 3),
    [images],
  );

  const visibleImages = useMemo(
    () =>
      activeCategory === "All"
        ? images
        : images.filter((image) => image.category === activeCategory),
    [activeCategory, images],
  );

  const visibleImageIndexes = useMemo(
    () =>
      visibleImages.map((image) =>
        images.findIndex(
          (candidate) =>
            candidate.title === image.title && candidate.src === image.src,
        ),
      ),
    [images, visibleImages],
  );

  const groupedImages = useMemo(() => {
    const groups = new Map<string, GalleryImage[]>();

    visibleImages.forEach((image) => {
      const chapter = image.chapter ?? image.category;
      groups.set(chapter, [...(groups.get(chapter) ?? []), image]);
    });

    return Array.from(groups.entries()).sort(([first], [second]) => {
      const firstIndex = chapterOrder.indexOf(first);
      const secondIndex = chapterOrder.indexOf(second);

      if (firstIndex === -1 && secondIndex === -1) {
        return first.localeCompare(second);
      }

      if (firstIndex === -1) {
        return 1;
      }

      if (secondIndex === -1) {
        return -1;
      }

      return firstIndex - secondIndex;
    });
  }, [visibleImages]);

  const selectedImage = activeIndex === null ? null : images[activeIndex];
  const heroImage = featuredImages[0] ?? images[0];

  if (!heroImage) {
    return null;
  }

  useEffect(() => {
    categoryRefs.current[activeCategory]?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeCategory, shouldReduceMotion]);

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        goToNextImage();
      }

      if (event.key === "ArrowLeft") {
        goToPreviousImage();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  function openImage(image: GalleryImage) {
    const nextIndex = images.findIndex(
      (candidate) => candidate.title === image.title && candidate.src === image.src,
    );
    setActiveIndex(nextIndex === -1 ? 0 : nextIndex);
  }

  function goToNextImage() {
    setActiveIndex((current) =>
      current === null ? 0 : (current + 1) % images.length,
    );
  }

  function goToPreviousImage() {
    setActiveIndex((current) =>
      current === null ? images.length - 1 : (current - 1 + images.length) % images.length,
    );
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    if (touchStartX.current === null) {
      return;
    }

    const distance = event.clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < 48) {
      return;
    }

    if (distance < 0) {
      goToNextImage();
    } else {
      goToPreviousImage();
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#0D0A08] pb-28 text-white lg:pb-20">
      <section className="relative isolate overflow-hidden px-4 pb-8 pt-52 sm:px-6 sm:py-12 lg:min-h-[calc(100svh-76px)] lg:px-8 lg:py-14">
        <Image
          src={heroImage.src}
          alt={getImageAlt(heroImage)}
          fill
          priority
          sizes="100vw"
          className="cinematic-hero-image object-cover opacity-70"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,10,8,0.96)_0%,rgba(13,10,8,0.76)_45%,rgba(13,10,8,0.24)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,10,8,0.18)_0%,rgba(13,10,8,0.72)_72%,#0D0A08_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:min-h-[calc(100svh-150px)] lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.58fr)] lg:content-center lg:items-center lg:gap-12">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#F6DFA4] shadow-[0_14px_34px_rgba(0,0,0,0.32)] backdrop-blur">
              <Camera size={15} aria-hidden="true" />
              Gallery
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[0.98] text-white sm:text-6xl lg:mt-6 lg:text-[6.2rem]">
              Bengal Indian & Bengali Food Gallery
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/72 sm:text-lg">
              Bengal specials, tandoor smoke, biryani, vegetarian dishes and
              customer favourites from Bengal in Winslow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <GalleryLink
                href="/menu"
                className="inline-flex h-12 min-h-12 items-center justify-center gap-2 rounded-full bg-[#D7A542] px-6 text-sm font-black text-[#150D08] shadow-[0_16px_38px_rgba(215,165,66,0.24)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                <Utensils size={17} aria-hidden="true" />
                Order online
                <ArrowRight size={16} aria-hidden="true" />
              </GalleryLink>
              <GalleryLink
                href="/booking"
                className="inline-flex h-12 min-h-12 items-center justify-center gap-2 rounded-full border border-white/16 bg-white/10 px-6 text-sm font-black text-white shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur transition hover:border-[#D7A542] hover:text-[#F6DFA4]"
              >
                <CalendarCheck size={17} aria-hidden="true" />
                Book a table
              </GalleryLink>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.82, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"
          >
            {featuredImages.map((image, index) => (
              <button
                key={image.title}
                type="button"
                onClick={() => openImage(image)}
                className="group relative min-h-[150px] overflow-hidden rounded-lg border border-white/12 bg-white/8 text-left shadow-[0_22px_60px_rgba(0,0,0,0.34)] transition hover:-translate-y-1 hover:border-[#D7A542]/55 sm:min-h-[180px] lg:min-h-[172px]"
              >
                <Image
                  src={image.src}
                  alt={getImageAlt(image)}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.72)_100%)]" />
                <span className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-[#F6DFA4]">
                    {image.mood}
                  </span>
                  <span className="mt-1 block text-xl font-black text-white">
                    {image.title}
                  </span>
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="sticky top-[72px] z-30 border-y border-white/10 bg-[#0D0A08]/82 px-4 py-3 shadow-[0_16px_42px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto scrollbar-soft">
          {availableCategories.map(({ label, Icon }) => {
            const isActive = label === activeCategory;

            return (
              <button
                key={label}
                type="button"
                ref={(node) => {
                  categoryRefs.current[label] = node;
                }}
                onClick={() => setActiveCategory(label)}
                aria-pressed={isActive}
                className={`inline-flex h-11 min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border px-4 text-sm font-black transition ${
                  isActive
                    ? "border-[#D7A542] bg-[#D7A542] text-[#150D08] shadow-[0_10px_26px_rgba(215,165,66,0.2)]"
                    : "border-white/12 bg-white/8 text-white/70 hover:border-[#D7A542]/55 hover:text-white"
                }`}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#D7A542]">
              {activeCategory === "All" ? "Restaurant story" : activeCategory}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight text-white sm:text-5xl">
              The food, the room, the feeling.
            </h2>
          </div>
          <p className="max-w-2xl text-base font-semibold leading-8 text-white/62 lg:justify-self-end">
            {visibleImages.length} moments from the dishes, tables, and details
            behind a High Street Winslow dinner.
          </p>
        </div>

        <div className="mt-10 space-y-16">
          {groupedImages.map(([chapter, chapterImages]) => (
            <section key={chapter} id={chapter.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#D7A542]">
                    {chapter}
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                    {chapterSummaries[chapter] ?? chapterImages[0]?.caption}
                  </h3>
                </div>
                <span className="hidden rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/62 sm:inline-flex">
                  {chapterImages.length} photos
                </span>
              </div>

              <motion.div
                key={`${activeCategory}-${chapter}`}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: shouldReduceMotion ? 0 : 0.075,
                    },
                  },
                }}
                className={`grid gap-5 ${getChapterGridClass(chapterImages.length)}`}
              >
                {chapterImages.map((image) => (
                  <motion.article
                    key={`${image.title}-${image.src}`}
                    variants={cardVariants}
                    transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    <button
                      type="button"
                      onClick={() => openImage(image)}
                      className="group block h-full w-full overflow-hidden rounded-lg border border-white/10 bg-white/7 text-left shadow-[0_18px_50px_rgba(0,0,0,0.28)] outline-none transition hover:-translate-y-1 hover:border-[#D7A542]/55 focus-visible:border-[#D7A542]"
                    >
                      <span
                        className={`relative block w-full overflow-hidden bg-[#17100D] ${getChapterCardAspect(chapter)}`}
                      >
                        <Image
                          src={image.src}
                          alt={getImageAlt(image)}
                          fill
                          sizes="(min-width: 1280px) 410px, (min-width: 768px) 48vw, 100vw"
                          className={`object-cover transition duration-700 group-hover:scale-105 ${
                            image.title.toLowerCase().includes("hygiene") ||
                            image.title.toLowerCase() === "halal"
                              ? "bg-white object-contain p-5"
                              : ""
                          }`}
                        />
                        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_34%,rgba(0,0,0,0.78)_100%)] opacity-90 transition group-hover:opacity-100" />
                        <span className="absolute left-4 top-4 inline-flex rounded-full bg-[#D7A542] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-[#150D08] shadow-lg shadow-black/20">
                          {image.mood ?? image.category}
                        </span>
                        <span className="absolute bottom-4 left-4 right-4">
                          <span className="text-xl font-black text-white">
                            {image.title}
                          </span>
                          <span className="mt-2 block text-sm font-semibold leading-6 text-white/72">
                            {image.caption}
                          </span>
                        </span>
                      </span>
                    </button>
                  </motion.article>
                ))}
              </motion.div>
            </section>
          ))}
        </div>

        <section className="mt-16 overflow-hidden rounded-lg border border-[#D7A542]/22 bg-[radial-gradient(circle_at_top_left,rgba(215,165,66,0.22),transparent_38%),linear-gradient(135deg,#1A100C_0%,#0D0A08_100%)] p-6 shadow-[0_26px_70px_rgba(0,0,0,0.34)] sm:p-8 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D7A542]">
              Ready for dinner
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight text-white sm:text-5xl">
              Make the gallery real tonight.
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-white/64">
              Order the dishes that caught your eye, or reserve a table for a
              warmer High Street Winslow evening.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-0 lg:justify-end">
            <GalleryLink
              href="/menu"
              className="inline-flex h-12 min-h-12 items-center justify-center gap-2 rounded-full bg-[#D7A542] px-6 text-sm font-black text-[#150D08] transition hover:bg-white"
            >
              Order online
              <ArrowRight size={16} aria-hidden="true" />
            </GalleryLink>
            <GalleryLink
              href="/booking"
              className="inline-flex h-12 min-h-12 items-center justify-center gap-2 rounded-full border border-white/14 bg-white/8 px-6 text-sm font-black text-white transition hover:border-[#D7A542] hover:text-[#F6DFA4]"
            >
              Book a table
            </GalleryLink>
          </div>
        </section>
      </div>

      <nav
        aria-label="Gallery quick actions"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-[#0D0A08]/92 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-16px_40px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
          <GalleryLink
            href="/menu"
            className="inline-flex h-[52px] min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#D7A542] px-4 text-sm font-black text-[#150D08]"
          >
            <Utensils size={17} aria-hidden="true" />
            Order
          </GalleryLink>
          <GalleryLink
            href="/booking"
            className="inline-flex h-[52px] min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 text-sm font-black text-white"
          >
            <CalendarCheck size={17} aria-hidden="true" />
            Book
          </GalleryLink>
        </div>
      </nav>

      <div className="fixed bottom-6 right-6 z-40 hidden flex-col gap-2 lg:flex">
        <GalleryLink
          href="/menu"
          className="inline-flex h-12 min-h-12 items-center justify-center gap-2 rounded-full bg-[#D7A542] px-5 text-sm font-black text-[#150D08] shadow-[0_16px_38px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:bg-white"
        >
          <Utensils size={17} aria-hidden="true" />
          Order
        </GalleryLink>
        <GalleryLink
          href="/booking"
          className="inline-flex h-12 min-h-12 items-center justify-center gap-2 rounded-full border border-white/14 bg-[#15100E]/90 px-5 text-sm font-black text-white shadow-[0_16px_38px_rgba(0,0,0,0.26)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#D7A542]"
        >
          <CalendarCheck size={17} aria-hidden="true" />
          Book
        </GalleryLink>
      </div>

      <AnimatePresence>
        {selectedImage ? (
          <motion.div
            className="fixed inset-0 z-[90] bg-[#080604]/88 p-3 text-white backdrop-blur-2xl sm:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.title}
            onPointerDown={(event) => {
              touchStartX.current = event.clientX;
            }}
            onPointerUp={handlePointerEnd}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white backdrop-blur transition hover:border-[#D7A542]"
              aria-label="Close image"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goToPreviousImage}
              className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white backdrop-blur transition hover:border-[#D7A542] md:flex"
              aria-label="Previous image"
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goToNextImage}
              className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white backdrop-blur transition hover:border-[#D7A542] md:flex"
              aria-label="Next image"
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>

            <motion.div
              key={selectedImage.src}
              initial={{ opacity: 0, scale: 0.97, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 18 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="grid h-full content-center gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center"
            >
              <div className="relative min-h-[56svh] overflow-hidden rounded-lg border border-white/12 bg-[#15100E] shadow-[0_28px_90px_rgba(0,0,0,0.42)] sm:min-h-[72svh]">
                <Image
                  src={selectedImage.src}
                  alt={getImageAlt(selectedImage)}
                  fill
                  priority
                  sizes="(min-width: 1024px) 72vw, 100vw"
                  className={`object-contain ${
                    selectedImage.title.toLowerCase().includes("hygiene") ||
                    selectedImage.title.toLowerCase() === "halal"
                      ? "bg-white p-6"
                      : "bg-black"
                  }`}
                />
              </div>

              <aside className="rounded-lg border border-white/12 bg-[#15100E]/92 p-5 shadow-[0_22px_60px_rgba(0,0,0,0.34)] backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#D7A542]">
                  {selectedImage.mood ?? selectedImage.category}
                </p>
                <h2 className="mt-3 text-3xl font-black leading-tight text-white">
                  {selectedImage.title}
                </h2>
                <p className="mt-4 text-sm font-semibold leading-7 text-white/68">
                  {selectedImage.caption}
                </p>
                <div className="mt-5 flex items-center gap-2 rounded-lg border border-white/10 bg-white/7 p-3 text-sm font-bold text-white/70">
                  <MapPin className="text-[#D7A542]" size={17} aria-hidden="true" />
                  40 High St, Winslow
                </div>
                <GalleryLink
                  href={selectedImage.href ?? "/menu"}
                  className="mt-5 inline-flex h-12 min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D7A542] px-5 text-sm font-black text-[#150D08] transition hover:bg-white"
                >
                  {selectedImage.cta ?? "Order this tonight"}
                  <ArrowRight size={16} aria-hidden="true" />
                </GalleryLink>
              </aside>
            </motion.div>

            {activeIndex !== null ? (
              <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1">
                {visibleImageIndexes.slice(0, 9).map((imageIndex) => (
                  <span
                    key={imageIndex}
                    className={`h-1.5 rounded-full transition-all ${
                      imageIndex === activeIndex
                        ? "w-8 bg-[#D7A542]"
                        : "w-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
