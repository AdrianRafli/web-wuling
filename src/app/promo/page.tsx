import { Tag, ChevronRight, Zap, Shield, Wrench, Gift, Car, Percent } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Promo | Wuling Semarang",
  description:
    "Promo terbaik Wuling Semarang — bunga 0%, DP ringan, garansi seumur hidup, gratis charging device, free maintenance, dan free insurance.",
};

// ─── Data Promo ───────────────────────────────────────────────────────────────

const PROMOS = [
  {
    id: 1,
    tag: "Pembiayaan",
    icon: Percent,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
    accentColor: "#eab308",
    title: "Bunga 0%",
    subtitle: "Selama 1 Tahun",
    description:
      "Nikmati kemudahan kredit tanpa bunga selama 1 tahun penuh. Cicilan lebih ringan, impian memiliki Wuling semakin dekat.",
    highlight: "Berlaku untuk Wuling Almaz & Almaz RS",
    syarat: "Syarat & ketentuan berlaku",
  },
  {
    id: 2,
    tag: "Pembiayaan",
    icon: Car,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    accentColor: "#3b82f6",
    title: "DP Hanya 50%",
    subtitle: "Sisa Bayar Tahun Depan",
    description:
      "Bawa pulang Wuling impian Anda dengan DP 50% saja. Sisa pembayaran dilunasi di tahun pertama — fleksibel dan tidak membebani.",
    highlight: "Berlaku untuk Wuling Almaz & Almaz RS",
    syarat: "Syarat & ketentuan berlaku",
  },
  {
    id: 3,
    tag: "Garansi",
    icon: Shield,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    accentColor: "#22c55e",
    title: "Lifetime Warranty",
    subtitle: "Garansi Seumur Hidup",
    description:
      "Tenang berkendara seumur hidup! Komponen inti kendaraan EV, HEV, dan Plug-in Hybrid Wuling dijamin dengan garansi tanpa batas waktu.",
    highlight: "Berlaku untuk EV, HEV & Plug-in Hybrid",
    syarat: "Syarat & ketentuan berlaku",
  },
  {
    id: 4,
    tag: "Hadiah",
    icon: Gift,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    accentColor: "#a855f7",
    title: "Gratis Charging Device",
    subtitle: "Home Charging Gratis",
    description:
      "Dapatkan perangkat pengisian daya rumahan secara gratis! Isi daya kendaraan listrik Anda kapan saja dari rumah tanpa biaya tambahan.",
    highlight: "Berlaku untuk Wuling Air ev & BinguoEV",
    syarat: "Syarat & ketentuan berlaku",
  },
  {
    id: 5,
    tag: "Perawatan",
    icon: Wrench,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    accentColor: "#f97316",
    title: "Free Maintenance",
    subtitle: "Gratis Jasa Servis Berkala",
    description:
      "Hemat biaya perawatan dengan paket servis gratis jangka panjang. Kendaraan Anda terawat optimal tanpa khawatir biaya servis.",
    highlight: "EV: 10 tahun / 100.000 km  •  Plug-in Hybrid: 10 tahun / 80.000 km",
    syarat: "Syarat & ketentuan berlaku",
  },
  {
    id: 6,
    tag: "Asuransi",
    icon: Zap,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    accentColor: "var(--color-primary, #c00)",
    title: "Free Insurance",
    subtitle: "Asuransi Gratis 2 Tahun",
    description:
      "Berkendara dengan tenang! Dapatkan perlindungan asuransi kendaraan secara gratis selama 2 tahun pertama tanpa premi tambahan.",
    highlight: "Berlaku untuk Wuling Air ev",
    syarat: "Syarat & ketentuan berlaku",
  },
];

// ─── Promo Card ───────────────────────────────────────────────────────────────

function PromoCard({ promo }: { promo: (typeof PROMOS)[number] }) {
  const Icon = promo.icon;

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      {/* Accent bar atas */}
      <div
        className="h-1 w-full"
        style={{ background: promo.accentColor }}
      />

      <div className="p-6">
        {/* Tag & Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${promo.iconBg}`}>
            <Icon size={22} className={promo.iconColor} />
          </div>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: `${promo.accentColor}15`,
              color: promo.accentColor,
            }}
          >
            {promo.tag}
          </span>
        </div>

        {/* Judul */}
        <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">
          {promo.title}
        </h3>
        <p
          className="text-sm font-semibold mt-0.5 mb-3"
          style={{ color: promo.accentColor }}
        >
          {promo.subtitle}
        </p>

        {/* Deskripsi */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {promo.description}
        </p>

        {/* Highlight */}
        <div
          className="text-xs font-medium px-3 py-2 rounded-lg leading-relaxed"
          style={{
            background: `${promo.accentColor}10`,
            color: promo.accentColor,
          }}
        >
          ✓ {promo.highlight}
        </div>

        {/* Syarat */}
        <p className="text-[11px] text-gray-400 mt-3">{promo.syarat}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PromoPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--color-primary, #c00)" }}
      >
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
              Promo Spesial
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Amayzing Deals<br className="hidden sm:block" /> Wuling Semarang
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
            Penawaran terbaik untuk Anda — bunga ringan, garansi panjang, dan
            berbagai keuntungan eksklusif yang sayang untuk dilewatkan.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
              <p className="text-2xl font-bold text-white">{PROMOS.length}</p>
              <p className="text-white/70 text-xs mt-0.5">Promo Aktif</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
              <p className="text-2xl font-bold text-white">0%</p>
              <p className="text-white/70 text-xs mt-0.5">Bunga Kredit</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
              <p className="text-2xl font-bold text-white">Lifetime</p>
              <p className="text-white/70 text-xs mt-0.5">Garansi EV</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid Promo ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROMOS.map((promo) => (
            <PromoCard key={promo.id} promo={promo} />
          ))}
        </div>

        {/* Banner CTA */}
        <div
          className="mt-12 rounded-2xl p-8 sm:p-10 text-center"
          style={{ background: "var(--color-primary, #c00)" }}
        >
          <p className="text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
            Eksplor promo menarik lainnya, kapanpun kamu tertarik
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Yuk Tanya Kami Ya! 👋
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center gap-2 bg-white font-semibold text-sm px-6 py-3 rounded-full transition-opacity hover:opacity-90"
              style={{ color: "var(--color-primary, #c00)" }}
            >
              Hubungi Sales <ChevronRight size={16} />
            </Link>
            <Link
              href="/mobil"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:bg-white/20"
            >
              Lihat Katalog Mobil
            </Link>
          </div>
          <p className="text-white/50 text-xs mt-6">*Syarat dan ketentuan berlaku</p>
        </div>
      </section>
    </main>
  );
}