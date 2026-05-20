import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronDown, ArrowRight, Wrench, Shield, Clock, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Layanan Service — Wuling Semarang",
  description:
    "Informasi layanan service resmi Wuling Semarang — servis berkala gratis, Worry Free Program, spare part original, dan FAQ lengkap.",
};

// ============================================================
// Data statis — FAQ & konten service
// ============================================================
const faqs = [
  {
    question: "Apa saja yang termasuk Free Jasa Servis Perawatan Berkala?",
    answer:
      "Wuling memberikan gratis biaya jasa servis berkala sampai dengan 50.000 KM atau 4 tahun, mana yang tercapai lebih dahulu. Program ini mencakup servis berkala di interval 1.000 km, 5.000 km, 10.000 km, dan kelipatannya sesuai buku panduan servis kendaraan.",
  },
  {
    question: "Apa itu Worry Free Program?",
    answer:
      "Worry Free Program adalah garansi pengerjaan servis maksimal 3 hari untuk 215 item suku cadang pilihan pada model Air ev, BinguoEV, Cloud EV, Almaz, Alvez, Cortez, Confero, dan Formo Max. Jika perbaikan melebihi 3 hari, pelanggan berhak mendapat voucher servis senilai IDR 50.000 per hari dihitung dari hari ke-4 dan berlaku untuk servis berikutnya (valid 1 tahun).",
  },
  {
    question: "Apakah Wuling memiliki layanan 24 jam?",
    answer:
      "Wuling memiliki Wuling Mobile Service (WMS) yang melayani perawatan servis berkala sesuai buku servis, layanan darurat, dan perbaikan umum ringan. Konsumen yang membutuhkan layanan WMS dapat menghubungi Call Center Wuling di 0-800-100-5050 atau menghubungi dealer Wuling terdekat. Informasi selengkapnya dapat dilihat di wuling.id/purna-jual.",
  },
  {
    question: "Di mana bisa mendapatkan spare part asli untuk mobil Wuling?",
    answer:
      "Wuling Motors menyediakan spare part original di setiap dealer resmi Wuling yang tersebar di Indonesia, termasuk dealer kami di Semarang. Kunjungi showroom atau hubungi kami via WhatsApp untuk berkonsultasi dengan Service Advisor terkait ketersediaan part yang dibutuhkan.",
  },
  {
    question: "Berapa harga spare part kendaraan Wuling?",
    answer:
      "Wuling Motors menyediakan spare part original di setiap dealer resmi dengan harga yang transparan. Silakan kunjungi dealer atau hubungi Service Advisor kami untuk informasi harga spare part sesuai model dan tahun kendaraan Anda.",
  },
  {
    question: "Bagaimana cara booking servis di Wuling Semarang?",
    answer:
      "Booking servis bisa dilakukan melalui beberapa cara: (1) Chat WhatsApp ke nomor dealer kami, (2) Telepon langsung ke nomor dealer, (3) Datang langsung ke showroom. Kami menyarankan booking terlebih dahulu agar estimasi waktu pengerjaan lebih akurat.",
  },
  {
    question: "Berapa lama garansi kendaraan Wuling?",
    answer:
      "Wuling memberikan garansi kendaraan selama 5 tahun atau 150.000 km (mana yang tercapai lebih dahulu) untuk kendaraan baru. Untuk kendaraan listrik, baterai mendapat garansi khusus selama 8 tahun atau 160.000 km.",
  },
  {
    question: "Apakah bisa servis di dealer Wuling lain selain tempat beli?",
    answer:
      "Ya, servis berkala dan perbaikan dapat dilakukan di dealer resmi Wuling mana pun di seluruh Indonesia, tidak terbatas pada dealer tempat pembelian. Program Free Jasa Servis Berkala dan garansi tetap berlaku di semua dealer resmi.",
  },
];

const services = [
  {
    icon: <Wrench size={24} className="text-wuling-red" />,
    title: "Servis Berkala",
    desc: "Perawatan rutin sesuai buku panduan untuk menjaga performa optimal kendaraan Anda.",
  },
  {
    icon: <Shield size={24} className="text-wuling-red" />,
    title: "Garansi Resmi",
    desc: "Garansi kendaraan 5 tahun / 150.000 km dan garansi baterai EV 8 tahun / 160.000 km.",
  },
  {
    icon: <Clock size={24} className="text-wuling-red" />,
    title: "Worry Free Program",
    desc: "Garansi pengerjaan servis maksimal 3 hari untuk 215 item suku cadang pilihan.",
  },
  {
    icon: <Star size={24} className="text-wuling-red" />,
    title: "Spare Part Original",
    desc: "Suku cadang asli Wuling tersedia lengkap untuk semua model kendaraan.",
  },
];

// ============================================================
// Component FAQ Item (accordion statis via CSS)
// ============================================================
function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  return (
    <details
      className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
      open={index === 0}
    >
      <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none hover:bg-wuling-gray/50 transition-colors">
        <span className="font-display font-semibold text-sm md:text-base text-wuling-black pr-4">
          {question}
        </span>
        <ChevronDown
          size={18}
          className="text-wuling-red shrink-0 transition-transform duration-300 group-open:rotate-180"
        />
      </summary>
      <div className="px-6 pb-5 pt-1 text-sm text-wuling-gray-mid leading-relaxed border-t border-gray-100">
        {answer}
      </div>
    </details>
  );
}

// ============================================================
// Page
// ============================================================
export default function ServicePage() {
  return (
    <div>
      {/* ===== HEADER ===== */}
      <section className="bg-wuling-black text-white py-14">
        <div className="container-main">
          <p className="text-wuling-red font-semibold text-sm uppercase tracking-widest mb-2">
            Purna Jual
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Layanan Service
          </h1>
          <p className="text-gray-400 mt-3 text-lg max-w-xl">
            Kami berkomitmen memberikan layanan purna jual terbaik untuk menjaga
            kendaraan Wuling Anda selalu dalam kondisi prima.
          </p>
          <a
            href="https://wa.me/628133399568?text=Halo, saya ingin booking service kendaraan Wuling"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 btn-primary text-sm"
          >
            Booking Service Sekarang
            <ArrowRight size={15} />
          </a>
        </div>
      </section>

      {/* ===== LAYANAN UNGGULAN ===== */}
      <section className="py-14 bg-wuling-gray">
        <div className="container-main">
          <div className="text-center mb-10">
            <p className="text-wuling-red font-semibold text-sm uppercase tracking-widest mb-1">
              Keunggulan Kami
            </p>
            <h2 className="section-title">Layanan Purna Jual Terpercaya</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-3">
                <div className="w-11 h-11 bg-wuling-gray rounded-lg flex items-center justify-center">
                  {s.icon}
                </div>
                <h3 className="font-display font-semibold text-wuling-black">{s.title}</h3>
                <p className="text-sm text-wuling-gray-mid leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FREE SERVIS BERKALA ===== */}
      <section className="py-14">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-wuling-red font-semibold text-sm uppercase tracking-widest mb-2">
                Program Unggulan
              </p>
              <h2 className="font-display text-3xl font-bold text-wuling-black mb-4">
                Free Jasa Servis Perawatan Berkala
              </h2>
              <p className="text-wuling-gray-mid leading-relaxed mb-6">
                Wuling memberikan <span className="font-semibold text-wuling-black">gratis biaya jasa servis berkala</span> sampai
                dengan <span className="font-semibold text-wuling-black">50.000 KM atau 4 tahun</span> mana yang
                tercapai lebih dahulu. Berlaku untuk semua model Wuling baru yang dibeli di dealer resmi.
              </p>
              <ul className="space-y-3">
                {[
                  "Gratis biaya jasa servis (tidak termasuk suku cadang & oli)",
                  "Berlaku di seluruh dealer resmi Wuling Indonesia",
                  "Interval servis sesuai buku panduan kendaraan",
                  "Dikerjakan oleh teknisi bersertifikat Wuling",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-wuling-gray-mid">
                    <CheckCircle2 size={16} className="text-wuling-red shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Worry Free Program card */}
            <div className="bg-wuling-black text-white rounded-2xl p-8">
              <p className="text-wuling-red font-semibold text-sm uppercase tracking-widest mb-2">
                Worry Free Program
              </p>
              <h3 className="font-display text-2xl font-bold mb-1">
                Garansi Selesai <span className="text-wuling-red">3 Hari</span>
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Untuk 215 item suku cadang pilihan pada model berikut:
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Air ev", "BinguoEV", "Cloud EV", "Almaz", "Alvez", "Cortez", "Confero", "Formo Max"].map((model) => (
                  <span key={model} className="bg-white/10 text-gray-200 text-xs px-3 py-1.5 rounded-full">
                    {model}
                  </span>
                ))}
              </div>
              <div className="border-t border-white/10 pt-5 space-y-3">
                <p className="text-sm text-gray-300 font-medium">Jika perbaikan &gt; 3 hari:</p>
                <div className="bg-white/10 rounded-lg p-3 text-sm text-gray-200">
                  Voucher servis <span className="text-wuling-red font-semibold">IDR 50.000/hari</span> dihitung dari hari ke-4
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-sm text-gray-200">
                  Voucher berlaku untuk servis berikutnya (valid 1 tahun)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-14 bg-wuling-gray">
        <div className="container-main max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-wuling-red font-semibold text-sm uppercase tracking-widest mb-1">
              FAQ
            </p>
            <h2 className="section-title">Pertanyaan Seputar Service</h2>
            <p className="section-subtitle">
              Jawaban atas pertanyaan yang paling sering ditanyakan pelanggan kami.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-14">
        <div className="container-main text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-wuling-black mb-2">
            Ada pertanyaan lain?
          </h2>
          <p className="text-wuling-gray-mid mb-6 max-w-md mx-auto">
            Tim Service Advisor kami siap membantu menjawab pertanyaan seputar
            perawatan kendaraan Wuling Anda.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://wa.me/628133399568?text=Halo, saya ingin bertanya tentang service Wuling"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              Chat via WhatsApp
              <ArrowRight size={15} />
            </a>
            <Link href="/kontak" className="btn-outline inline-flex items-center gap-2 text-sm">
              Booking Test Drive
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}