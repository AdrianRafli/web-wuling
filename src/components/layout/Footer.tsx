import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/mobil", label: "Katalog Mobil" },
  { href: "/dealer", label: "Info Dealer" },
  { href: "/event", label: "Event" },
  { href: "/service", label: "Info Service" },
  { href: "/kontak", label: "Kontak & Test Drive" },
];

const carLinks = [
  { href: "/mobil/eksion",    label: "Wuling Eksion" },
  { href: "/mobil/darion",    label: "Wuling Darion" },
  { href: "/mobil/air-ev",    label: "Wuling Air ev" },
  { href: "/mobil/binguo-ev", label: "Wuling Binguo EV" },
  { href: "/mobil/alvez",     label: "Wuling Alvez" },
  { href: "/mobil/mitra-ev",  label: "Wuling Mitra EV" },
];

export default async function Footer() {
  const dealer = await prisma.dealer.findFirst({
    include: { hours: true },
  });

  const name     = dealer?.name     ?? "Wuling Motors Semarang";
  const city     = dealer?.city     ?? "Semarang, Jawa Tengah";
  const address  = dealer?.address  ?? "";
  const phone    = dealer?.phone    ?? "";
  const email    = dealer?.email    ?? "";
  const whatsapp = dealer?.whatsapp ?? "628133399568";
  const hours    = dealer?.hours;

  return (
    <footer className="bg-wuling-black text-white">
      {/* Main footer */}
      <div className="container-main py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1">
          <span className="font-display text-2xl font-bold text-wuling-red tracking-tight">
            WULING
          </span>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5 mb-4">
            Dealer Resmi — {city}
          </p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Dealer resmi Wuling Motors dengan layanan penjualan, test drive,
            dan purna jual terpercaya.
          </p>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.925a.75.75 0 0 0 .918.918l6.068-1.477A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 0 1-4.946-1.349l-.355-.211-3.608.878.893-3.508-.231-.371A9.715 9.715 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
            </svg>
            Chat WhatsApp
          </a>
        </div>

        {/* Navigasi */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-gray-400 mb-4">
            Navigasi
          </h4>
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-gray-300 hover:text-wuling-red transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Produk */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-gray-400 mb-4">
            Produk
          </h4>
          <ul className="space-y-2.5">
            {carLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-gray-300 hover:text-wuling-red transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info Dealer */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-gray-400 mb-4">
            Informasi Dealer
          </h4>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-gray-300">
              <MapPin size={16} className="text-wuling-red shrink-0 mt-0.5" />
              <span>{address}, {city}</span>
            </li>
            <li className="flex gap-3 text-sm text-gray-300">
              <Phone size={16} className="text-wuling-red shrink-0 mt-0.5" />
              <a href={`tel:${phone}`} className="hover:text-wuling-red transition-colors">
                {phone}
              </a>
            </li>
            <li className="flex gap-3 text-sm text-gray-300">
              <Mail size={16} className="text-wuling-red shrink-0 mt-0.5" />
              <a href={`mailto:${email}`} className="hover:text-wuling-red transition-colors">
                {email}
              </a>
            </li>
            {hours && (
              <li className="flex gap-3 text-sm text-gray-300">
                <Clock size={16} className="text-wuling-red shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p>Senin – Jumat: {hours.weekday}</p>
                  <p>Sabtu: {hours.saturday}</p>
                  <p>Minggu: {hours.sunday}</p>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-main py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <p>Dealer Resmi Wuling Motors Indonesia</p>
        </div>
      </div>
    </footer>
  );
}