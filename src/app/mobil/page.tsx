import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import KatalogClient, { type Car } from "./KatalogClient";

export const metadata = {
  title: "Katalog Mobil Wuling — Dealer Resmi Semarang",
  description:
    "Temukan semua lineup mobil Wuling terbaru — SUV, MPV, hingga kendaraan listrik. Harga OTR Semarang terbaik.",
};

// ============================================================
// Data fetching — Server Component, langsung Prisma
// ============================================================
async function getCars(): Promise<Car[]> {
  const cars = await prisma.car.findMany({
    orderBy: { id: "asc" },
    select: {
      id: true,
      slug: true,
      name: true,
      tagline: true,
      category: true,
      thumbnail: true,
      isNew: true,
      isElectric: true,
      highlights: {
        orderBy: { order: "asc" },
        select: { text: true },
      },
      variants: {
        orderBy: { order: "asc" },
        take: 1,
        select: {
          price: true,
          transmission: true,
          specs: {
            select: {
              seats: true,
              fuelType: true,
              transmission: true,
              power: true,
            },
          },
        },
      },
    },
  });

  // Konversi BigInt price ke Number
  return cars.map((car) => ({
    ...car,
    variants: car.variants.map((v) => ({
      ...v,
      price: Number(v.price),
    })),
  }));
}

// ============================================================
// Page — Server Component
// ============================================================
export default async function KatalogPage() {
  const cars = await getCars();

  return (
    <div>
      {/* ===== PAGE HEADER — dirender di server, terindeks Google ===== */}
      <section className="bg-wuling-black text-white py-14">
        <div className="container-main">
          <p className="text-wuling-red font-semibold text-sm uppercase tracking-widest mb-2">
            Katalog Lengkap
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Semua Mobil Wuling
          </h1>
          <p className="text-gray-400 mt-3 text-lg max-w-xl">
            Temukan mobil yang sesuai dengan kebutuhan dan gaya hidup Anda dari
            lineup lengkap Wuling.
          </p>
        </div>
      </section>

      {/* ===== FILTER + GRID — Client Component untuk interaktivitas ===== */}
      <KatalogClient cars={cars} />

      {/* ===== CTA BAWAH — dirender di server ===== */}
      <section className="py-12 bg-wuling-red text-white">
        <div className="container-main text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
            Tidak yakin pilih yang mana?
          </h2>
          <p className="text-red-100 mb-6">
            Konsultasikan kebutuhan Anda dengan tim kami — gratis dan tanpa paksaan.
          </p>
          <a
            href="https://wa.me/628133399568?text=Halo, saya butuh rekomendasi mobil Wuling"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-wuling-red font-semibold px-6 py-3 rounded hover:bg-gray-100 transition-colors"
          >
            Konsultasi via WhatsApp
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}