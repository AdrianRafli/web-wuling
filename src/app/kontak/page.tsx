import { MapPin, Phone, Mail, Clock, ArrowRight, Car } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/sections/ContactForm";
export const revalidate = 3600;

export const metadata = {
  title: "Kontak & Test Drive — Wuling Semarang",
  description: "Hubungi dealer resmi Wuling Semarang atau booking test drive sekarang.",
};

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

interface CarOption {
  name: string;
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

async function getCarOptions(): Promise<string[]> {
  const cars = await prisma.car.findMany({ select: { name: true }, orderBy: { id: "asc" } });
  return cars.map((c) => c.name);
}

// ============================================================
// Page
// ============================================================
export default async function KontakPage() {
  const [dealer, carOptions] = await Promise.all([
    getDealer(),
    getCarOptions(),
  ]);

  const whatsapp = dealer?.whatsapp ?? "628133399568";
  const phone    = dealer?.phone    ?? "";
  const email    = dealer?.email    ?? "";
  const address  = dealer ? `${dealer.address}, ${dealer.city}` : "";
  const hours    = dealer?.hours;
  const mapsUrl  = dealer
    ? `https://www.google.com/maps/search/?api=1&query=${dealer.lat},${dealer.lng}`
    : "#";

  return (
    <div>
      {/* ===== HEADER ===== */}
      <section className="bg-wuling-black text-white py-14">
        <div className="container-main">
          <p className="text-wuling-red font-semibold text-sm uppercase tracking-widest mb-2">
            Hubungi Kami
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Kontak & Test Drive
          </h1>
          <p className="text-gray-400 mt-3 text-lg max-w-xl">
            Ada pertanyaan atau ingin merasakan langsung mobil pilihan Anda? Kami siap membantu.
          </p>
        </div>
      </section>

      {/* ===== MAIN ===== */}
      <section className="py-12">
        <div className="container-main grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Kiri — Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="font-display font-bold text-xl text-wuling-black mb-1">
                Formulir Test Drive & Pertanyaan
              </h2>
              <p className="text-sm text-wuling-gray-mid mb-6">
                Isi form di bawah dan tim kami akan menghubungi Anda dalam 1x24 jam.
              </p>
              <ContactForm carOptions={carOptions} whatsapp={whatsapp} />
            </div>
          </div>

          {/* Kanan — Info singkat */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-xl text-wuling-black">
              Atau Hubungi Langsung
            </h2>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${whatsapp}?text=Halo, saya ingin bertanya tentang Wuling`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 items-center bg-green-50 border border-green-100 rounded-xl p-4 hover:bg-green-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.925a.75.75 0 0 0 .918.918l6.068-1.477A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 0 1-4.946-1.349l-.355-.211-3.608.878.893-3.508-.231-.371A9.715 9.715 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-green-700 font-medium uppercase tracking-widest mb-0.5">WhatsApp</p>
                <p className="font-semibold text-wuling-black">{whatsapp}</p>
                <p className="text-xs text-green-700 mt-0.5 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Chat sekarang <ArrowRight size={11} />
                </p>
              </div>
            </a>

            {/* Telepon */}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex gap-4 items-center bg-white border border-gray-100 rounded-xl p-4 hover:border-wuling-red transition-colors shadow-sm"
              >
                <div className="w-10 h-10 bg-wuling-gray rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-wuling-red" />
                </div>
                <div>
                  <p className="text-xs text-wuling-gray-mid uppercase tracking-widest mb-0.5">Telepon</p>
                  <p className="font-semibold text-wuling-black">{phone}</p>
                </div>
              </a>
            )}

            {/* Email */}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex gap-4 items-center bg-white border border-gray-100 rounded-xl p-4 hover:border-wuling-red transition-colors shadow-sm"
              >
                <div className="w-10 h-10 bg-wuling-gray rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-wuling-red" />
                </div>
                <div>
                  <p className="text-xs text-wuling-gray-mid uppercase tracking-widest mb-0.5">Email</p>
                  <p className="font-semibold text-wuling-black">{email}</p>
                </div>
              </a>
            )}

            {/* Jam Operasional */}
            {hours && (
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <div className="flex gap-3 items-center mb-3">
                  <div className="w-10 h-10 bg-wuling-gray rounded-lg flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-wuling-red" />
                  </div>
                  <p className="text-xs text-wuling-gray-mid uppercase tracking-widest">Jam Operasional</p>
                </div>
                <div className="space-y-2 pl-1">
                  {[
                    { day: "Senin – Jumat", value: hours.weekday },
                    { day: "Sabtu",         value: hours.saturday },
                    { day: "Minggu",        value: hours.sunday },
                  ].map((item) => (
                    <div key={item.day} className="flex justify-between text-sm">
                      <span className="text-wuling-gray-mid">{item.day}</span>
                      <span className={`font-medium ${item.value === "Tutup" ? "text-red-500" : "text-wuling-black"}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alamat */}
            {address && (
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <div className="flex gap-3 items-center mb-2">
                  <div className="w-10 h-10 bg-wuling-gray rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-wuling-red" />
                  </div>
                  <p className="text-xs text-wuling-gray-mid uppercase tracking-widest">Lokasi</p>
                </div>
                <p className="text-sm text-wuling-black pl-1">{address}</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-wuling-red hover:underline mt-2 pl-1"
                >
                  Lihat di Google Maps <ArrowRight size={11} />
                </a>
              </div>
            )}

            {/* Link ke katalog */}
            <div className="bg-wuling-gray rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Car size={16} className="text-wuling-red" />
                <p className="text-sm font-semibold text-wuling-black">Belum pilih mobil?</p>
              </div>
              <p className="text-xs text-wuling-gray-mid mb-3">
                Lihat dulu katalog lengkap kami sebelum booking test drive.
              </p>
              <Link
                href="/mobil"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-wuling-red hover:underline"
              >
                Lihat Katalog <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}