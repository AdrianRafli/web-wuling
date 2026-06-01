import { prisma } from "@/lib/prisma";
import { Calendar, MapPin, Clock, ChevronRight, Tag } from "lucide-react";
import Link from "next/link";

export const revalidate = 3600; // ISR 1 jam

export const metadata = {
  title: "Event & Pameran | Wuling Semarang",
  description:
    "Jadwal event dan pameran Wuling Semarang. Temukan promo eksklusif, test drive, dan penawaran spesial di setiap event.",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getEventStatus(startDate: Date, endDate: Date): "ongoing" | "upcoming" | "past" {
  const now = new Date();
  if (now >= startDate && now <= endDate) return "ongoing";
  if (now < startDate) return "upcoming";
  return "past";
}

function formatDateRange(startDate: Date, endDate: Date): string {
  const opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  };
  const start = startDate.toLocaleDateString("id-ID", opts);
  const end = endDate.toLocaleDateString("id-ID", opts);

  // Hari yang sama
  if (start === end) return start;
  return `${start} – ${end}`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }) + " WIB";
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta" }) ===
    b.toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta" })
  );
}

// ─── Event Card ───────────────────────────────────────────────────────────────

type EventRow = {
  id: number;
  title: string;
  description: string;
  location: string;
  address: string | null;
  startDate: Date;
  endDate: Date;
};

function EventCard({ event, status }: { event: EventRow; status: "ongoing" | "upcoming" }) {
  const mapsUrl = event.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        event.address
      )}`
    : null;

  const isOneDay = isSameDay(event.startDate, event.endDate);

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Accent bar kiri */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{
          background:
            status === "ongoing"
              ? "var(--color-primary, #c00)"
              : "linear-gradient(to bottom, #f97316, #fb923c)",
        }}
      />

      <div className="pl-6 pr-5 py-5">
        {/* Badge status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
              status === "ongoing"
                ? "bg-red-50 text-red-600"
                : "bg-orange-50 text-orange-600"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status === "ongoing" ? "bg-red-500 animate-pulse" : "bg-orange-400"
              }`}
            />
            {status === "ongoing" ? "Sedang Berlangsung" : "Akan Datang"}
          </span>
        </div>

        {/* Judul */}
        <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-red-600 transition-colors duration-200">
          {event.title}
        </h3>

        {/* Deskripsi */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Info tanggal & lokasi */}
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Calendar size={15} className="mt-0.5 shrink-0 text-gray-400" />
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </div>

          {isOneDay && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={15} className="shrink-0 text-gray-400" />
              <span>
                {formatTime(event.startDate)} – {formatTime(event.endDate)}
              </span>
            </div>
          )}

          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin size={15} className="mt-0.5 shrink-0 text-gray-400" />
            <div>
              <span className="font-medium text-gray-700">{event.location}</span>
              {event.address && (
                <span className="block text-xs text-gray-400 mt-0.5">{event.address}</span>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        {mapsUrl && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              <MapPin size={13} />
              Lihat di Maps
            </a>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              Info lebih lanjut <ChevronRight size={13} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function EventPage() {
  const now = new Date();

  const allEvents = await prisma.event.findMany({
    where: { isActive: true },
    orderBy: { startDate: "asc" },
  });

  const ongoing = allEvents.filter(
    (e) => now >= e.startDate && now <= e.endDate
  );
  const upcoming = allEvents.filter((e) => now < e.startDate);
  const hasEvents = ongoing.length > 0 || upcoming.length > 0;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ── Hero ── */}
      <section className="relative bg-wuling-red overflow-hidden" style={{ background: "var(--color-primary, #c00)" }}>
        {/* Dekorasi geometris */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute right-24 top-8 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute -left-8 bottom-0 w-48 h-48 rounded-full bg-black/10" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="flex items-center gap-2 mb-4">
            <Tag size={16} className="text-white/70" />
            <span className="text-white/70 text-sm font-medium tracking-wider uppercase">
              Event & Pameran
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Temui Kami di<br className="hidden sm:block" /> Event Terdekat
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl leading-relaxed">
            Kunjungi booth Wuling Semarang di berbagai pameran dan event otomotif.
            Dapatkan promo eksklusif, test drive gratis, dan penawaran spesial.
          </p>

          {/* Stats */}
          {hasEvents && (
            <div className="flex gap-6 mt-8">
              {ongoing.length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                  <p className="text-2xl font-bold text-white">{ongoing.length}</p>
                  <p className="text-white/70 text-xs mt-0.5">Sedang Berlangsung</p>
                </div>
              )}
              {upcoming.length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                  <p className="text-2xl font-bold text-white">{upcoming.length}</p>
                  <p className="text-white/70 text-xs mt-0.5">Akan Datang</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Konten ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14">

        {!hasEvents && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Calendar size={28} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Belum Ada Event Terjadwal
            </h2>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              Pantau terus halaman ini untuk informasi event dan pameran Wuling Semarang terbaru.
            </p>
            <Link
              href="/kontak"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--color-primary, #c00)" }}
            >
              Hubungi Kami
            </Link>
          </div>
        )}

        {/* Sedang Berlangsung */}
        {ongoing.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-red-600">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Sedang Berlangsung
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ongoing.map((event) => (
                <EventCard key={event.id} event={event} status="ongoing" />
              ))}
            </div>
          </div>
        )}

        {/* Akan Datang */}
        {upcoming.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-orange-600">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                Akan Datang
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} status="upcoming" />
              ))}
            </div>
          </div>
        )}

        {/* CTA bawah */}
        {hasEvents && (
          <div className="rounded-2xl p-8 text-center" style={{ background: "var(--color-primary, #c00)" }}>
            <h2 className="text-xl font-bold text-white mb-2">
              Ingin Info Event Lebih Awal?
            </h2>
            <p className="text-white/80 text-sm mb-5">
              Hubungi sales kami dan jadilah yang pertama mendapat undangan event eksklusif Wuling Semarang.
            </p>
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 bg-white font-semibold text-sm px-6 py-2.5 rounded-full transition-opacity hover:opacity-90"
              style={{ color: "var(--color-primary, #c00)" }}
            >
              Hubungi Sales <ChevronRight size={16} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}