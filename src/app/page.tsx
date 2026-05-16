import Link from "next/link";
import { cars } from "@/data/cars";
import { dealerInfo } from "@/data/dealer";
import { formatPrice } from "@/lib/utils";
import { MapPin, Phone, Mail, ArrowRight, Zap, Shield, Award } from "lucide-react";
import CarImage from "@/components/ui/CarImage";

const featuredCars = cars.slice(0, 3);

export default function HomePage() {
  return (
    <div>
      {/* ===== HERO BANNER ===== */}
      <section className="relative h-[85vh] min-h-[500px] bg-wuling-black flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-wuling-black via-wuling-black/80 to-transparent z-10" />
        <div className="absolute inset-0">
          <CarImage
            src="/images/dealer/hero-bg.jpg"
            alt="Wuling Dealer Semarang"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="container-main relative z-20">
          <p className="text-wuling-red font-semibold text-sm uppercase tracking-widest mb-3">
            Dealer Resmi Wuling — {dealerInfo.city}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight max-w-2xl">
            Temukan Mobil <span className="text-wuling-red">Impian</span> Anda
          </h1>
          <p className="text-gray-300 mt-4 text-lg max-w-xl leading-relaxed">
            Dapatkan penawaran terbaik untuk seluruh lineup Wuling — SUV, MPV,
            hingga kendaraan listrik terkini.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/mobil" className="btn-primary inline-flex items-center gap-2">
              Lihat Semua Mobil
              <ArrowRight size={16} />
            </Link>
            <a
              href={`https://wa.me/${dealerInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2 border-white text-white hover:bg-white hover:text-wuling-black"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>

      {/* ===== PROMO BANNER ===== */}
      <section className="bg-wuling-red text-white py-5">
        <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <p className="font-semibold text-sm sm:text-base">
              Promo Spesial Bulan Ini — DP Ringan & Cicilan 0% untuk model pilihan!
            </p>
          </div>
          <a
            href={`https://wa.me/${dealerInfo.whatsapp}?text=Halo, saya ingin tahu info promo Wuling bulan ini`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-white text-wuling-red font-semibold text-sm px-5 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            Tanya Promo
          </a>
        </div>
      </section>

      {/* ===== KEUNGGULAN ===== */}
      <section className="py-14 bg-wuling-gray">
        <div className="container-main grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: <Award size={28} className="text-wuling-red" />,
              title: "Dealer Resmi",
              desc: "Bergaransi resmi Wuling Motors Indonesia dengan layanan purna jual terpercaya.",
            },
            {
              icon: <Shield size={28} className="text-wuling-red" />,
              title: "Harga Transparan",
              desc: "Harga OTR terbaik tanpa biaya tersembunyi. Proses pembelian mudah dan jelas.",
            },
            {
              icon: <Zap size={28} className="text-wuling-red" />,
              title: "Test Drive Gratis",
              desc: "Rasakan sensasi berkendara langsung. Booking test drive kapan saja.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-lg p-6 flex gap-4 items-start shadow-sm">
              <div className="shrink-0 mt-0.5">{item.icon}</div>
              <div>
                <h3 className="font-display font-semibold text-wuling-black mb-1">{item.title}</h3>
                <p className="text-sm text-wuling-gray-mid leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED CARS ===== */}
      <section className="py-16">
        <div className="container-main">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-wuling-red font-semibold text-sm uppercase tracking-widest mb-1">
                Pilihan Utama
              </p>
              <h2 className="section-title">Mobil Terlaris</h2>
            </div>
            <Link
              href="/mobil"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-wuling-red hover:underline"
            >
              Lihat Semua
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => {
              const thumb = car.thumbnail;
              const basePrice = car.variants[0]?.price ?? 0;
              return (
                <Link
                  key={car.id}
                  href={`/mobil/${car.slug}`}
                  className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Gambar */}
                  <div className="relative h-52 bg-white overflow-hidden flex items-center justify-center p-4">
                    {thumb ? (
                      <CarImage
                        src={thumb}
                        alt={car.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        fallback={car.name}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                        {car.name}
                      </div>
                    )}
                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-20 flex gap-2">
                      {car.isNew && (
                        <span className="bg-wuling-red text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          Baru
                        </span>
                      )}
                      {car.isElectric && (
                        <span className="bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          Electric
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <p className="text-xs text-wuling-gray-mid uppercase tracking-widest mb-1">
                      {car.category}
                    </p>
                    <h3 className="font-display font-bold text-lg text-wuling-black group-hover:text-wuling-red transition-colors">
                      {car.name}
                    </h3>
                    <p className="text-sm text-wuling-gray-mid mt-0.5 mb-3">{car.tagline}</p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {car.highlights.slice(0, 3).map((h) => (
                        <span
                          key={h}
                          className="text-xs bg-wuling-gray text-wuling-gray-mid px-2.5 py-1 rounded-full"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Harga */}
                    <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-wuling-gray-mid">Mulai dari</p>
                        {basePrice > 0 ? (
                          <p className="font-display font-bold text-wuling-red text-lg">
                            {formatPrice(basePrice)}
                          </p>
                        ) : (
                          <p className="font-display font-bold text-wuling-red text-base">
                            Hubungi Dealer
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-medium text-wuling-red flex items-center gap-1 group-hover:gap-2 transition-all">
                        Detail
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/mobil" className="btn-outline inline-flex items-center gap-2">
              Lihat Semua Mobil
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== KONTAK ===== */}
      <section className="py-16 bg-wuling-gray">
        <div className="container-main">
          <div className="text-center mb-10">
            <p className="text-wuling-red font-semibold text-sm uppercase tracking-widest mb-1">
              Hubungi Kami
            </p>
            <h2 className="section-title">Siap Membantu Anda</h2>
            <p className="section-subtitle">
              Ada pertanyaan? Tim kami siap membantu melalui WhatsApp atau email.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            <a
              href={`https://wa.me/${dealerInfo.whatsapp}?text=Halo, saya ingin bertanya tentang mobil Wuling`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#16a34a">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.925a.75.75 0 0 0 .918.918l6.068-1.477A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 0 1-4.946-1.349l-.355-.211-3.608.878.893-3.508-.231-.371A9.715 9.715 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
              </div>
              <h4 className="font-display font-semibold text-wuling-black mb-1">WhatsApp</h4>
              <p className="text-sm text-wuling-gray-mid">{dealerInfo.whatsapp}</p>
            </a>

            <a
              href={`tel:${dealerInfo.phone}`}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-wuling-gray rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-200 transition-colors">
                <Phone size={22} className="text-wuling-red" />
              </div>
              <h4 className="font-display font-semibold text-wuling-black mb-1">Telepon</h4>
              <p className="text-sm text-wuling-gray-mid">{dealerInfo.phone}</p>
            </a>

            <a
              href={`mailto:${dealerInfo.email}`}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-wuling-gray rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-200 transition-colors">
                <Mail size={22} className="text-wuling-red" />
              </div>
              <h4 className="font-display font-semibold text-wuling-black mb-1">Email</h4>
              <p className="text-sm text-wuling-gray-mid">{dealerInfo.email}</p>
            </a>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-wuling-gray-mid">
              <MapPin size={15} className="text-wuling-red" />
              {dealerInfo.address}, {dealerInfo.city}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}