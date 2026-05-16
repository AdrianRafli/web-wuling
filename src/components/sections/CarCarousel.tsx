"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CarImage } from "@/types";

type Props = {
  images: CarImage[];
  type: "exterior" | "interior";
  title: string;
};

export default function CarCarousel({ images, type, title }: Props) {
  const filtered = images.filter((img) => img.type === type);
  const pairs: CarImage[][] = [];
  for (let i = 0; i < filtered.length; i += 2) {
    pairs.push(filtered.slice(i, i + 2));
  }

  const [current, setCurrent] = useState(0);

  if (pairs.length === 0) return null;

  const prev = () => setCurrent((c) => (c === 0 ? pairs.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === pairs.length - 1 ? 0 : c + 1));

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold text-base text-wuling-black capitalize">
          {title}
        </h3>
        <div className="flex items-center gap-1.5">
          {pairs.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === current
                  ? "w-5 bg-wuling-red"
                  : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative group">
        <div className="grid grid-cols-2 gap-3">
          {pairs[current].map((img, i) => (
            <div
              key={i}
              className="relative bg-wuling-gray rounded-lg overflow-hidden aspect-video flex flex-col"
            >
              {/* Gambar */}
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement("div");
                    fallback.className =
                      "flex-1 flex items-center justify-center text-gray-400 text-xs p-2 text-center";
                    fallback.innerText = img.alt;
                    parent.appendChild(fallback);
                  }
                }}
              />
              {/* Deskripsi */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                <p className="text-white text-xs font-medium truncate">{img.alt}</p>
              </div>
            </div>
          ))}

          {/* Jika slide terakhir hanya 1 gambar */}
          {pairs[current].length === 1 && (
            <div className="bg-wuling-gray rounded-lg aspect-video flex items-center justify-center">
              <span className="text-gray-300 text-xs">—</span>
            </div>
          )}
        </div>

        {/* Nav arrows */}
        {pairs.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-wuling-black hover:text-wuling-red transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-wuling-black hover:text-wuling-red transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}