import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import {
  ArrowLeft, Zap, Users, Fuel,
  Settings, ArrowRight, CheckCircle2,
} from "lucide-react";
import CarCarousel from "@/components/sections/CarCarousel";
import SpecTabs from "@/components/sections/SpecTabs";
import CarImage from "@/components/ui/CarImage";

export const revalidate = 3600;

// ============================================================
// Types — sesuai response /api/cars/[slug]
// ============================================================
interface CarVariantSpec {
  engine: string;
  transmission: string;
  power: string;
  torque: string;
  fuelType: string;
  seats: number;
  drivetrain: string | null;
  dimLength: number | null;
  dimWidth: number | null;
  dimHeight: number | null;
  dimWheelbase: number | null;
  batteryCapacity: string | null;
  batteryType: string | null;
  rangeElectric: string | null;
  rangeHybrid: string | null;
  chargingAc: string | null;
  chargingDc: string | null;
  features: string[];
}

interface CarVariant {
  id: number;
  name: string;
  price: number;
  transmission: string;
  order: number;
  specs: CarVariantSpec | null;
}

interface CarImage {
  id: number;
  url: string;
  alt: string;
  type: string;
  order: number;
}

interface RelatedCar {
  slug: string;
  name: string;
  tagline: string;
  thumbnail: string;
  isNew: boolean;
  isElectric: boolean;
  variants: { price: number; name: string }[];
}

interface CarDetail {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  thumbnail: string;
  isNew: boolean;
  isElectric: boolean;
  highlights: { text: string; order: number }[];
  images: CarImage[];
  variants: CarVariant[];
  related: RelatedCar[];
}

import { prisma } from "@/lib/prisma";

// ============================================================
// Data fetching — langsung Prisma
// ============================================================
async function getCar(slug: string): Promise<CarDetail | null> {
  const car = await prisma.car.findUnique({
    where: { slug },
    include: {
      images:     { orderBy: { order: "asc" } },
      highlights: { orderBy: { order: "asc" } },
      variants:   { orderBy: { order: "asc" }, include: { specs: true } },
    },
  });
  if (!car) return null;

  // Ambil related (same category, exclude current, max 3)
  const relatedRaw = await prisma.car.findMany({
    where: { category: car.category, slug: { not: slug } },
    take: 3,
    select: {
      slug: true, name: true, tagline: true,
      thumbnail: true, isNew: true, isElectric: true,
      variants: { orderBy: { order: "asc" }, take: 1, select: { price: true, name: true } },
    },
  });

  return {
    ...car,
    variants: car.variants.map((v) => ({
      ...v,
      price: Number(v.price),
      specs: v.specs
        ? { ...v.specs, features: v.specs.features as string[] }
        : null,
    })),
    related: relatedRaw.map((r) => ({
      ...r,
      variants: r.variants.map((v) => ({ ...v, price: Number(v.price) })),
    })),
  } as CarDetail;
}

// generateStaticParams — pre-render semua halaman detail saat build
export async function generateStaticParams() {
  const cars = await prisma.car.findMany({ select: { slug: true } });
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = await getCar(slug);
  if (!car) return {};
  return {
    title: `${car.name} — Wuling Semarang`,
    description: `${car.name} — ${car.tagline}. Spesifikasi lengkap, varian, dan harga OTR di dealer resmi Wuling Semarang.`,
  };
}

// ============================================================
// Page
// ============================================================
export default async function DetailMobilPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = await getCar(slug);
  if (!car) notFound();

  const waText = encodeURIComponent(
    `Halo, saya tertarik dengan ${car.name}. Boleh minta info lebih lanjut?`
  );

  // Ambil nomor WA dari env atau fallback
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? "628133399568";

  const defaultVariant = car.variants?.[0];
  const defaultSpec    = defaultVariant?.specs;

  // Konversi images ke format yang dipakai CarCarousel (sesuaikan dengan CarImage type di components)
  const carouselImages = car.images.map((img) => ({
    url: img.url,
    alt: img.alt,
    type: img.type as "exterior" | "interior",
  }));

  // Cast transmission ke union type CarVariant dari @/types agar kompatibel dengan SpecTabs
  type ValidTransmission = "MT" | "AT" | "CVT" | "Single Speed" | "Dedicated Hybrid Transmission";
  const specTabVariants = car.variants.map((v) => ({
    name: v.name,
    price: v.price,
    transmission: v.transmission as ValidTransmission,
    specs: v.specs
      ? {
          engine: v.specs.engine,
          transmission: v.specs.transmission,
          power: v.specs.power,
          torque: v.specs.torque,
          fuelType: v.specs.fuelType,
          seats: v.specs.seats,
          drivetrain: v.specs.drivetrain ?? undefined,
          dimensions: {
            length: v.specs.dimLength ?? 0,
            width:  v.specs.dimWidth  ?? 0,
            height: v.specs.dimHeight ?? 0,
            wheelbase: v.specs.dimWheelbase ?? 0,
          },
          battery: v.specs.batteryCapacity
            ? { capacity: v.specs.batteryCapacity, type: v.specs.batteryType ?? "" }
            : undefined,
          range: (v.specs.rangeElectric || v.specs.rangeHybrid)
            ? {
                electric: v.specs.rangeElectric ?? undefined,
                hybrid:   v.specs.rangeHybrid   ?? undefined,
              }
            : undefined,
          charging: (v.specs.chargingAc || v.specs.chargingDc)
            ? {
                ac: v.specs.chargingAc ?? undefined,
                dc: v.specs.chargingDc ?? undefined,
              }
            : undefined,
          features: v.specs.features,
        }
      : {
          // Fallback specs kosong — seharusnya tidak terjadi jika seed benar
          engine: "-", transmission: "-", power: "-", torque: "-",
          fuelType: "-", seats: 0, features: [],
        },
  })) as import("@/types").CarVariant[];

  return (
    <div>
      {/* ===== BREADCRUMB ===== */}
      <div className="bg-wuling-gray border-b border-gray-200">
        <div className="container-main py-3 flex items-center gap-2 text-sm text-wuling-gray-mid">
          <Link href="/" className="hover:text-wuling-red transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/mobil" className="hover:text-wuling-red transition-colors">Mobil</Link>
          <span>/</span>
          <span className="text-wuling-black font-medium">{car.name}</span>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section className="bg-wuling-black text-white py-12">
        <div className="container-main">
          <Link
            href="/mobil"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={15} />
            Kembali ke Katalog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Gambar hero */}
            <div className="relative rounded-xl h-72 md:h-96 overflow-hidden bg-white/10 flex items-center justify-center p-6">
              {car.thumbnail ? (
                <CarImage
                  src={car.thumbnail}
                  alt={car.name}
                  className="w-full h-full object-contain"
                  fallback={car.name}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                  Foto {car.name}
                </div>
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                {car.isNew && (
                  <span className="bg-wuling-red text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Baru
                  </span>
                )}
                {car.isElectric && (
                  <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Zap size={11} />
                    Electric
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div>
              <p className="text-wuling-red font-semibold text-sm uppercase tracking-widest mb-1">
                {car.category}
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                {car.name}
              </h1>
              <p className="text-gray-400 text-lg mt-2 mb-6">{car.tagline}</p>

              {/* Spec ringkas */}
              {defaultSpec && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {[
                    { icon: <Users size={16} />, label: "Kapasitas",   value: `${defaultSpec.seats} Orang` },
                    { icon: <Fuel size={16} />,  label: "Bahan Bakar", value: defaultSpec.fuelType },
                    { icon: <Settings size={16} />, label: "Transmisi", value: defaultSpec.transmission },
                    { icon: <Zap size={16} />,   label: "Tenaga",      value: defaultSpec.power },
                  ].map((spec) => (
                    <div key={spec.label} className="bg-white/10 rounded-lg p-3 text-center">
                      <div className="flex justify-center text-wuling-red mb-1">{spec.icon}</div>
                      <p className="text-xs text-gray-400">{spec.label}</p>
                      <p className="text-sm font-semibold mt-0.5">{spec.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Spec EV tambahan */}
              {defaultSpec?.batteryCapacity && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400">Baterai</p>
                    <p className="text-sm font-semibold">{defaultSpec.batteryCapacity}</p>
                  </div>
                  {defaultSpec.rangeElectric && (
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400">Range Listrik</p>
                      <p className="text-sm font-semibold">{defaultSpec.rangeElectric}</p>
                    </div>
                  )}
                  {defaultSpec.rangeHybrid && (
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400">Range Hybrid</p>
                      <p className="text-sm font-semibold">{defaultSpec.rangeHybrid}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Highlights */}
              <div className="flex flex-wrap gap-2">
                {car.highlights.map((h) => (
                  <span
                    key={h.text}
                    className="flex items-center gap-1.5 text-sm bg-white/10 text-gray-200 px-3 py-1.5 rounded-full"
                  >
                    <CheckCircle2 size={13} className="text-wuling-red" />
                    {h.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="py-12">
        <div className="container-main grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Kiri */}
          <div className="lg:col-span-2 space-y-10">
            {/* Carousel */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-6">
              <CarCarousel images={carouselImages} type="exterior" title="Eksterior" />
              <div className="border-t border-gray-100 pt-6">
                <CarCarousel images={carouselImages} type="interior" title="Interior" />
              </div>
            </div>

            {/* Spec Tabs */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h2 className="font-display font-bold text-lg text-wuling-black mb-1">
                Spesifikasi & Fitur per Varian
              </h2>
              <p className="text-sm text-wuling-gray-mid mb-5">
                Pilih varian untuk melihat spesifikasi dan fitur yang berbeda.
              </p>
              <SpecTabs variants={specTabVariants} />
            </div>
          </div>

          {/* Kanan — sidebar */}
          <div>
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm sticky top-24">
              <div className="bg-wuling-black px-6 py-4">
                <h2 className="font-display font-bold text-lg text-white">Varian & Harga</h2>
                <p className="text-xs text-gray-400 mt-0.5">Harga OTR Semarang</p>
              </div>
              <div className="divide-y divide-gray-100">
                {car.variants.map((variant) => (
                  <div key={variant.id} className="px-5 py-4 hover:bg-wuling-gray/50 transition-colors">
                    <p className="text-sm font-semibold text-wuling-black leading-snug mb-1">
                      {variant.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-wuling-gray-mid bg-wuling-gray px-2 py-0.5 rounded-full">
                        {variant.transmission}
                      </span>
                      <span className="font-display font-bold text-wuling-red text-base">
                        {variant.price > 0 ? formatPrice(variant.price) : "Hubungi Kami"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-5 space-y-3 border-t border-gray-100">
                <a
                  href={`https://wa.me/${whatsapp}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-primary flex items-center justify-center gap-2 text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.925a.75.75 0 0 0 .918.918l6.068-1.477A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 0 1-4.946-1.349l-.355-.211-3.608.878.893-3.508-.231-.371A9.715 9.715 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                  </svg>
                  Tanya via WhatsApp
                </a>
                <Link
                  href="/kontak"
                  className="w-full btn-outline flex items-center justify-center gap-2 text-sm"
                >
                  Booking Test Drive
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MOBIL LAINNYA ===== */}
      {car.related.length > 0 && (
        <section className="py-12 bg-wuling-gray border-t border-gray-200">
          <div className="container-main">
            <h2 className="font-display font-bold text-xl text-wuling-black mb-6">
              Lihat Mobil Lainnya
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {car.related.map((c) => (
                <Link
                  key={c.slug}
                  href={`/mobil/${c.slug}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="h-32 bg-wuling-gray overflow-hidden relative flex items-center justify-center p-2">
                    {c.thumbnail ? (
                      <CarImage
                        src={c.thumbnail}
                        alt={c.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        fallback={c.name}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-300">
                        {c.name}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-wuling-gray-mid">{c.isElectric ? "Electric" : "ICE"}</p>
                    <p className="text-sm font-semibold text-wuling-black group-hover:text-wuling-red transition-colors leading-tight">
                      {c.name}
                    </p>
                    {c.variants[0]?.price > 0 && (
                      <p className="text-xs text-wuling-red font-medium mt-0.5">
                        {formatPrice(c.variants[0].price)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/mobil" className="inline-flex items-center gap-2 btn-outline text-sm">
                Lihat Semua Mobil
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}