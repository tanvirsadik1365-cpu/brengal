"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Camera } from "lucide-react";

type GalleryImage = {
  title: string;
  category: string;
  src: string;
};

type GalleryGridProps = {
  images: GalleryImage[];
};

export function GalleryGrid({ images }: GalleryGridProps) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((image) => image.category)))],
    [images],
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleImages =
    activeCategory === "All"
      ? images
      : images.filter((image) => image.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={`h-10 rounded-full border px-4 text-sm font-black transition ${
                isActive
                  ? "border-[#8A3430] bg-[#8A3430] text-white"
                  : "border-black/10 bg-white text-[#6B5D5B] hover:border-[#8A3430] hover:text-[#8A3430]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleImages.map((item) => (
          <article
            key={item.title}
            className="group restaurant-card overflow-hidden rounded-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-white">
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className={`transition duration-500 group-hover:scale-105 ${
                  item.title.toLowerCase().includes("logo")
                    ? "object-contain p-8"
                    : "object-cover"
                }`}
              />
            </div>
            <div className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <h2 className="break-words font-black">{item.title}</h2>
                <p className="mt-1 text-sm text-[#6B5D5B]">{item.category}</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8A3430] text-white">
                <Camera size={18} aria-hidden="true" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
