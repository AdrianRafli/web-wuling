import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsappButton";
import ChatBot from "@/components/ChatBot";
import { prisma } from "@/lib/prisma";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Wuling Semarang — Dealer Resmi Wuling",
  description:
    "Dealer resmi Wuling di Semarang. Temukan koleksi mobil Wuling terbaru — SUV, MPV, dan Electric Vehicle dengan harga terbaik.",
  keywords: ["Wuling", "dealer mobil", "Semarang", "SUV", "MPV", "mobil listrik"],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch dealer sekali di root layout — dipakai Navbar & WhatsAppButton
  const dealer = await prisma.dealer.findFirst({
    select: { city: true, phone: true, whatsapp: true },
  }).catch(() => null);

  const city     = dealer?.city     ?? "Semarang, Jawa Tengah";
  const phone    = dealer?.phone    ?? "628133399568";
  const whatsapp = dealer?.whatsapp ?? "628133399568";

  return (
    <html lang="id">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <Navbar city={city} phone={phone} />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton whatsapp={whatsapp} />
        <ChatBot />
      </body>
    </html>
  );
}