"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap, SlidersHorizontal } from "lucide-react";
import CarImage from "@/components/ui/CarImage";
import { formatPrice } from "@/lib/utils";

// ============================================================
// Types
// ============================================================
export interface CarVariant {
  price: number;
  transmission: string;
  specs: {
    seats: number;
    fuelType: string;
    transmission: string;
    power: string;
  } | null;
}

export interface Car {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  thumbnail: string;
  isNew: boolean;
  isElectric: boolean;
  highlights: { text: string }[];
  variants: CarVariant[];
}

const CATEGORIES = ["Semua", "SUV", "MPV", "Electric"] as const;
type Category = (typeof CATEGORIES)[number];

// ============================================================
// Client Component — hanya filter & state, data sudah dari server
// ============================================================
export default function KatalogClient({ cars }: { cars: Car[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("Semua");

  const filtered =
    activeCategory === "Semua"
      ? cars
      : cars.filter((car) => car.category === activeCategory);

  const countFor = (cat: Category) =>
    cat === "Semua" ? cars.length : cars.filter((c) => c.category === cat).length;

  return (
    <>
      {/* ===== FILTER ===== */}
      <section className="border-b border-gray-100 bg-white sticky top-16 z-30 shadow-sm">
        <div className="container-main py-3 flex items-center gap-3 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-wuling-gray-mid shrink-0 pr-2 border-r border-gray-200">
            <SlidersHorizontal size={15} />
            <span className="text-sm font-medium">Filter</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 text-sm font-medium px-4 py-1.5 rounded-full border transition-colors duration-200 ${
                activeCategory === cat
                  ? "bg-wuling-red text-white border-wuling-red"
                  : "border-gray-200 text-wuling-gray-mid hover:border-wuling-red hover:text-wuling-red"
              }`}
            >
              {cat}
              <span className="ml-1.5 text-xs opacity-70">({countFor(cat)})</span>
            </button>
          ))}
        </div>
      </section>

      {/* ===== GRID MOBIL ===== */}
      <section className="py-12 bg-wuling-gray min-h-screen">
        <div className="container-main">
          <p className="text-sm text-wuling-gray-mid mb-6">
            Menampilkan{" "}
            <span className="font-semibold text-wuling-black">{filtered.length}</span>{" "}
            mobil
            {activeCategory !== "Semua" && (
              <span>
                {" "}dalam kategori{" "}
                <span className="font-semibold text-wuling-black">{activeCategory}</span>
              </span>
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((car) => {
              const baseSpec  = car.variants[0]?.specs;
              const basePrice = car.variants[0]?.price ?? 0;
              return (
                <Link
                  key={car.id}
                  href={`/mobil/${car.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
                >
                  {/* Gambar */}
                  <div className="relative h-48 bg-white overflow-hidden flex items-center justify-center p-4">
                    {car.thumbnail ? (
                      <CarImage
                        src={car.thumbnail}
                        alt={car.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        fallback={car.name}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                        {car.name}
                      </div>
                    )}
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {car.isNew && (
                        <span className="bg-wuling-red text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          Baru
                        </span>
                      )}
                      {car.isElectric && (
                        <span className="bg-green-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Zap size={10} />
                          EV
                        </span>
                      )}
                    </div>
                    {/* Category */}
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-black/50 text-white text-xs px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                        {car.category}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-base text-wuling-black group-hover:text-wuling-red transition-colors leading-tight">
                      {car.name}
                    </h3>
                    <p className="text-xs text-wuling-gray-mid mt-0.5 mb-3">{car.tagline}</p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1 mb-4 flex-1">
                      {car.highlights.slice(0, 3).map((h) => (
                        <span
                          key={h.text}
                          className="text-xs bg-wuling-gray text-wuling-gray-mid px-2 py-0.5 rounded-full"
                        >
                          {h.text}
                        </span>
                      ))}
                    </div>

                    {/* Specs ringkas */}
                    {baseSpec && (
                      <div className="grid grid-cols-2 gap-2 mb-4 py-3 border-t border-b border-gray-100">
                        <div>
                          <p className="text-xs text-wuling-gray-mid">Kapasitas</p>
                          <p className="text-xs font-semibold text-wuling-black">
                            {baseSpec.seats} Penumpang
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-wuling-gray-mid">Bahan Bakar</p>
                          <p className="text-xs font-semibold text-wuling-black">
                            {baseSpec.fuelType}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-wuling-gray-mid">Transmisi</p>
                          <p className="text-xs font-semibold text-wuling-black">
                            {baseSpec.transmission}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-wuling-gray-mid">Tenaga</p>
                          <p className="text-xs font-semibold text-wuling-black">
                            {baseSpec.power}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Harga + CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-wuling-gray-mid">Mulai dari</p>
                        <p className="text-sm font-bold text-wuling-red">
                          {basePrice > 0 ? formatPrice(basePrice) : "Hubungi Dealer"}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-wuling-red flex items-center gap-1 group-hover:gap-2 transition-all">
                        Detail
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}