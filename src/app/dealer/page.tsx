import { MapPin, Phone, Mail, Clock, Car, Wrench, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import CarImage from "@/components/ui/CarImage";

// ============================================================
// Types
// ============================================================
interface DealerHours {
  weekday: string;
  saturday: string;
  sunday: string;
}

interface Dealer {
  name: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  lat: number;
  lng: number;
  hours: DealerHours | null;
}

import { prisma } from "@/lib/prisma";

// ============================================================
// Data fetching — langsung Prisma
// ============================================================
async function getDealer(): Promise<Dealer | null> {
  const raw = await prisma.dealer.findFirst({ include: { hours: true } });
  if (!raw) return null;
  return {
    name:     raw.name,
    address:  raw.address,
    city:     raw.city     ?? "",
    phone:    raw.phone    ?? "",
    whatsapp: raw.whatsapp ?? "",
    email:    raw.email    ?? "",
    lat:      raw.lat      ?? -6.9667,
    lng:      raw.lng      ?? 110.4167,
    hours: raw.hours
      ? { weekday: raw.hours.weekday, saturday: raw.hours.saturday, sunday: raw.hours.sunday }
      : null,
  };
}

export const metadata = {
  title: "Info Dealer — Wuling Semarang",
  description: "Informasi lengkap dealer resmi Wuling Semarang — lokasi, jam operasional, dan layanan kami.",
};

const services = [
  {
    icon: <Car size={24} className="text-wuling-red" />,
    title: "Penjualan Mobil Baru",
    desc: "Dapatkan unit baru langsung dari dealer resmi dengan harga OTR terbaik dan proses yang mudah.",
  },
  {
    icon: <ShieldCheck size={24} className="text-wuling-red" />,
    title: "Test Drive",
    desc: "Rasakan langsung pengalaman berkendara sebelum memutuskan. Gratis, tanpa syarat.",
  },
  {
    icon: <Wrench size={24} className="text-wuling-red" />,
    title: "Servis & Perawatan",
    desc: "Bengkel resmi Wuling dengan teknisi bersertifikat dan suku cadang original.",
  },
];

const faqs = [
  {
    q: "Apakah bisa test drive tanpa appointment?",
    a: "Kami menyarankan booking terlebih dahulu agar unit siap, namun walk-in juga kami layani sesuai ketersediaan.",
  },
  {
    q: "Apakah tersedia layanan trade-in?",
    a: "Ya, kami menerima tukar tambah kendaraan lama dengan estimasi harga yang kompetitif.",
  },
  {
    q: "Berapa lama proses pengajuan kredit?",
    a: "Proses pengajuan kredit umumnya 1–3 hari kerja setelah dokumen lengkap.",
  },
  {
    q: "Apakah ada layanan antar unit ke rumah?",
    a: "Ya, kami menyediakan layanan pengiriman unit ke lokasi pembeli dalam area Semarang dan sekitarnya.",
  },
];

export default async function DealerPage() {
  const dealer = await getDealer();

  // Fallback ke nilai default jika fetch gagal
  const name     = dealer?.name     ?? "Wuling Motors Semarang";
  const address  = dealer?.address  ?? "";
  const city     = dealer?.city     ?? "";
  const phone    = dealer?.phone    ?? "";
  const whatsapp = dealer?.whatsapp ?? "628133399568";
  const email    = dealer?.email    ?? "";
  const lat      = dealer?.lat      ?? -6.9667;
  const lng      = dealer?.lng      ?? 110.4167;
  const hours    = dealer?.hours    ?? { weekday: "-", saturday: "-", sunday: "-" };

  const mapsUrl  = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;

  return (
    <div>
      {/* ===== HEADER ===== */}
      <section className="bg-wuling-black text-white py-14">
        <div className="container-main">
          <p className="text-wuling-red font-semibold text-sm uppercase tracking-widest mb-2">
            Dealer Resmi
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            {name}
          </h1>
          <p className="text-gray-400 mt-3 text-lg max-w-xl">
            Melayani kebutuhan otomotif Anda dengan sepenuh hati di Semarang dan sekitarnya.
          </p>
        </div>
      </section>

      {/* ===== INFO + PETA ===== */}
      <section className="py-12">
        <div className="container-main grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Info Dealer */}
          <div className="space-y-5">
            <h2 className="font-display font-bold text-2xl text-wuling-black">
              Informasi Kontak
            </h2>

            {/* Alamat */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex gap-4 items-start">
              <div className="w-10 h-10 bg-wuling-gray rounded-lg flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-wuling-red" />
              </div>
              <div>
                <p className="text-xs text-wuling-gray-mid uppercase tracking-widest mb-1">Alamat</p>
                <p className="font-medium text-wuling-black">{address}</p>
                <p className="text-sm text-wuling-gray-mid">{city}</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-wuling-red hover:underline mt-2"
                >
                  Buka di Google Maps
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>

            {/* Telepon */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex gap-4 items-start">
              <div className="w-10 h-10 bg-wuling-gray rounded-lg flex items-center justify-center shrink-0">
                <Phone size={20} className="text-wuling-red" />
              </div>
              <div>
                <p className="text-xs text-wuling-gray-mid uppercase tracking-widest mb-1">Telepon</p>
                <a
                  href={`tel:${phone}`}
                  className="font-medium text-wuling-black hover:text-wuling-red transition-colors"
                >
                  {phone}
                </a>
                <p className="text-sm text-wuling-gray-mid mt-0.5">Layanan pelanggan & informasi umum</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex gap-4 items-start">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#16a34a">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.925a.75.75 0 0 0 .918.918l6.068-1.477A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 0 1-4.946-1.349l-.355-.211-3.608.878.893-3.508-.231-.371A9.715 9.715 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-wuling-gray-mid uppercase tracking-widest mb-1">WhatsApp</p>
                <a
                  href={`https://wa.me/${whatsapp}?text=Halo, saya ingin bertanya tentang Wuling`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-wuling-black hover:text-green-600 transition-colors"
                >
                  {whatsapp}
                </a>
                <p className="text-sm text-wuling-gray-mid mt-0.5">Chat langsung dengan tim kami</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex gap-4 items-start">
              <div className="w-10 h-10 bg-wuling-gray rounded-lg flex items-center justify-center shrink-0">
                <Mail size={20} className="text-wuling-red" />
              </div>
              <div>
                <p className="text-xs text-wuling-gray-mid uppercase tracking-widest mb-1">Email</p>
                <a
                  href={`mailto:${email}`}
                  className="font-medium text-wuling-black hover:text-wuling-red transition-colors"
                >
                  {email}
                </a>
                <p className="text-sm text-wuling-gray-mid mt-0.5">Untuk pertanyaan & penawaran tertulis</p>
              </div>
            </div>

            {/* Jam Operasional */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex gap-4 items-start">
              <div className="w-10 h-10 bg-wuling-gray rounded-lg flex items-center justify-center shrink-0">
                <Clock size={20} className="text-wuling-red" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-wuling-gray-mid uppercase tracking-widest mb-3">Jam Operasional</p>
                <div className="space-y-2">
                  {[
                    { day: "Senin – Jumat", hours: hours.weekday },
                    { day: "Sabtu", hours: hours.saturday },
                    { day: "Minggu", hours: hours.sunday },
                  ].map((item) => (
                    <div key={item.day} className="flex justify-between items-center">
                      <span className="text-sm text-wuling-gray-mid">{item.day}</span>
                      <span className={`text-sm font-medium ${item.hours === "Tutup" ? "text-red-500" : "text-wuling-black"}`}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Peta & Foto Showroom */}
          <div className="space-y-5">
            {/* Embed Google Maps */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-wuling-gray px-5 py-3 border-b border-gray-200">
                <h3 className="font-display font-semibold text-sm text-wuling-black">Lokasi Showroom</h3>
              </div>
              <div className="h-72 bg-wuling-gray relative">
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
              <div className="px-5 py-3 flex justify-between items-center">
                <p className="text-xs text-wuling-gray-mid">{address}</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-wuling-red font-medium hover:underline flex items-center gap-1"
                >
                  Petunjuk Arah
                  <ArrowRight size={11} />
                </a>
              </div>
            </div>

            {/* Foto Showroom */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-wuling-gray px-5 py-3 border-b border-gray-200">
                <h3 className="font-display font-semibold text-sm text-wuling-black">Foto Showroom</h3>
              </div>
              <div className="grid grid-cols-2 gap-1 p-1">
                {[
                  { url: "/images/dealer/showroom-1.jpg", alt: "Tampak Depan Showroom" },
                  { url: "/images/dealer/showroom-2.jpg", alt: "Area Display Mobil" },
                  { url: "/images/dealer/showroom-3.jpg", alt: "Ruang Tunggu" },
                  { url: "/images/dealer/showroom-4.jpg", alt: "Area Servis" },
                ].map((img) => (
                  <div key={img.alt} className="relative aspect-video bg-wuling-gray rounded overflow-hidden">
                    <CarImage
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      fallback={img.alt}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LAYANAN ===== */}
      <section className="py-12 bg-wuling-gray">
        <div className="container-main">
          <div className="text-center mb-10">
            <p className="text-wuling-red font-semibold text-sm uppercase tracking-widest mb-1">
              Yang Kami Tawarkan
            </p>
            <h2 className="section-title">Layanan Dealer</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-xl p-6 shadow-sm flex gap-4 items-start">
                <div className="w-11 h-11 bg-wuling-gray rounded-lg flex items-center justify-center shrink-0">
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-wuling-black mb-1">{service.title}</h3>
                  <p className="text-sm text-wuling-gray-mid leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-12">
        <div className="container-main max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-wuling-red font-semibold text-sm uppercase tracking-widest mb-1">
              Pertanyaan Umum
            </p>
            <h2 className="section-title">FAQ</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <h3 className="font-display font-semibold text-wuling-black mb-2 flex items-start gap-2">
                  <span className="text-wuling-red shrink-0 font-bold">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-sm text-wuling-gray-mid leading-relaxed pl-5">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-12 bg-wuling-red text-white">
        <div className="container-main text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
            Siap mengunjungi showroom kami?
          </h2>
          <p className="text-red-100 mb-6">
            Tim kami siap menyambut dan membantu Anda menemukan mobil yang tepat.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${whatsapp}?text=Halo, saya ingin booking kunjungan ke showroom Wuling`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-wuling-red font-semibold px-6 py-3 rounded hover:bg-gray-100 transition-colors"
            >
              Booking Kunjungan
              <ArrowRight size={16} />
            </a>
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded hover:bg-white hover:text-wuling-red transition-colors"
            >
              Form Test Drive
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}