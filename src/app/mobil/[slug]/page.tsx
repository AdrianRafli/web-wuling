import Link from "next/link";
import { notFound } from "next/navigation";
import { getCarBySlug, cars } from "@/data/cars";
import { dealerInfo } from "@/data/dealer";
import { formatPrice } from "@/lib/utils";
import {
  ArrowLeft, Zap, Users, Fuel,
  Settings, ArrowRight, CheckCircle2,
} from "lucide-react";
import CarCarousel from "@/components/sections/CarCarousel";
import SpecTabs from "@/components/sections/SpecTabs";
import CarImage from "@/components/ui/CarImage";

export async function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return {};
  return {
    title: `${car.name} — Wuling Semarang`,
    description: `${car.name} — ${car.tagline}. Spesifikasi lengkap, varian, dan harga OTR di dealer resmi Wuling Semarang.`,
  };
}

export default async function DetailMobilPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  const waText = encodeURIComponent(
    `Halo, saya tertarik dengan ${car.name}. Boleh minta info lebih lanjut?`
  );

  const defaultVariant = car.variants?.[0];
  const heroImage = car.thumbnail;

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
            <div className="relative rounded-xl h-72 md:h-96 overflow-hidden bg-white/10 flex items-center justify-center p-6">
                {heroImage ? (
                  <CarImage
                    src={heroImage}
                    alt={car.name}
                    className="bg-white overflow-hidden relative flex items-center justify-center p-2"
                    fallback={car.name}
                  />
                ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                  Foto {car.name}
                </div>
              )}
              {/* Badges */}
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
              {defaultVariant && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {[
                    { icon: <Users size={16} />, label: "Kapasitas", value: `${defaultVariant.specs.seats} Orang` },
                    { icon: <Fuel size={16} />, label: "Bahan Bakar", value: defaultVariant.specs.fuelType },
                    { icon: <Settings size={16} />, label: "Transmisi", value: defaultVariant.specs.transmission },
                    { icon: <Zap size={16} />, label: "Tenaga", value: defaultVariant.specs.power },
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
              {defaultVariant?.specs.battery && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {defaultVariant.specs.battery.capacity && (
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400">Baterai</p>
                      <p className="text-sm font-semibold">{defaultVariant.specs.battery.capacity}</p>
                    </div>
                  )}
                  {defaultVariant.specs.range?.electric && (
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400">Range Listrik</p>
                      <p className="text-sm font-semibold">{defaultVariant.specs.range.electric}</p>
                    </div>
                  )}
                  {defaultVariant.specs.range?.hybrid && (
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400">Range Hybrid</p>
                      <p className="text-sm font-semibold">{defaultVariant.specs.range.hybrid}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Highlights */}
              <div className="flex flex-wrap gap-2">
                {car.highlights.map((h) => (
                  <span
                    key={h}
                    className="flex items-center gap-1.5 text-sm bg-white/10 text-gray-200 px-3 py-1.5 rounded-full"
                  >
                    <CheckCircle2 size={13} className="text-wuling-red" />
                    {h}
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
              <CarCarousel images={car.images} type="exterior" title="Eksterior" />
              <div className="border-t border-gray-100 pt-6">
                <CarCarousel images={car.images} type="interior" title="Interior" />
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
              <SpecTabs variants={car.variants} />
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
                {car.variants.map((variant, i) => (
                  <div key={i} className="px-5 py-4 hover:bg-wuling-gray/50 transition-colors">
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
                  href={`https://wa.me/${dealerInfo.whatsapp}?text=${waText}`}
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
      <section className="py-12 bg-wuling-gray border-t border-gray-200">
        <div className="container-main">
          <h2 className="font-display font-bold text-xl text-wuling-black mb-6">
            Lihat Mobil Lainnya
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cars
              .filter((c) => c.slug !== car.slug)
              .slice(0, 4)
              .map((c) => {
                const thumb = c.thumbnail;
                return (
                  <Link
                    key={c.id}
                    href={`/mobil/${c.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div className="h-32 bg-wuling-gray overflow-hidden relative">
                      {thumb ? (
                        <CarImage
                          src={thumb}
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
                      <p className="text-xs text-wuling-gray-mid">{c.category}</p>
                      <p className="text-sm font-semibold text-wuling-black group-hover:text-wuling-red transition-colors leading-tight">
                        {c.name}
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
          <div className="mt-6 text-center">
            <Link href="/mobil" className="inline-flex items-center gap-2 btn-outline text-sm">
              Lihat Semua Mobil
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}