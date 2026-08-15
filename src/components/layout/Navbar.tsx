"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/mobil", label: "Mobil" },
  { href: "/dealer", label: "Dealer" },
  { href: "/promo", label: "Promo" },
  { href: "/service", label: "Service" },
  { href: "/event", label: "Event" },
  { href: "/kontak", label: "Kontak" },
];

// Props dari layout.tsx (data dealer di-fetch di server)
type Props = {
  city: string;
  phone: string;
};

export default function Navbar({ city, phone }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top bar */}
      <div className="bg-wuling-red text-white text-sm py-1.5">
        <div className="container-main flex justify-between items-center">
          <span>Dealer Resmi Wuling — {city}</span>
          <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:underline">
            <Phone size={13} />
            {phone}
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="container-main flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold text-wuling-red tracking-tight">
            WULING
          </span>
          <span className="hidden sm:block text-xs text-wuling-gray-mid font-medium uppercase tracking-widest border-l border-gray-300 pl-2">
            Semarang
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-wuling-red ${
                  pathname === link.href
                    ? "text-wuling-red border-b-2 border-wuling-red pb-0.5"
                    : "text-wuling-black"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded hover:bg-wuling-gray transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
          <ul className="flex flex-col gap-1 mt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-wuling-gray text-wuling-red font-semibold"
                      : "text-wuling-black hover:bg-wuling-gray"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}