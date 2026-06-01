"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, ChevronDown } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  options?: string[];
}

// ─── Knowledge Base ───────────────────────────────────────────────────────────
const QUICK_REPLIES = [
  "Lihat Katalog Mobil",
  "Harga & Promo",
  "Test Drive",
  "Layanan Service",
  "Lokasi Dealer",
  "Jam Operasional",
];

type Rule = {
  keywords: string[];
  answer: string;
  options?: string[];
};

const RULES: Rule[] = [
  {
    keywords: ["halo", "hai", "hi", "hello", "selamat", "hei", "pagi", "siang", "sore", "malam"],
    answer:
      "Halo! Selamat datang di Wuling Semarang 👋\nSaya siap membantu Anda. Silakan pilih topik di bawah atau ketik pertanyaan Anda.",
    options: QUICK_REPLIES,
  },
  {
    keywords: ["katalog", "model", "tipe", "jenis", "mobil apa", "produk", "lihat"],
    answer:
      "Wuling menawarkan beberapa model unggulan:\n\n🚗 **Almaz** — SUV premium 7-seater\n🚙 **Almaz RS** — SUV flagship dengan panoramic roof\n⚡ **Air ev** — Mobil listrik kompak\n🚐 **Confero** — MPV keluarga 7-seater\n🏎️ **BinguoEV** — City car listrik stylish\n\nKunjungi halaman /mobil untuk detail lengkap & harga.",
    options: ["Harga & Promo", "Test Drive", "Spesifikasi Almaz", "Spesifikasi Air ev"],
  },
  {
    keywords: ["harga", "promo", "diskon", "cicilan", "dp", "kredit", "angsuran", "biaya"],
    answer:
      "Untuk harga dan promo terkini:\n\n💰 Harga mulai dari **Rp 170 jutaan**\n🎁 Promo DP ringan tersedia untuk unit tertentu\n📋 Cicilan fleksibel 1–5 tahun\n\nHarga dapat berubah sewaktu-waktu. Hubungi sales kami untuk penawaran terbaik dan harga OTR Semarang!",
    options: ["Hubungi Sales", "Test Drive", "Lihat Katalog Mobil"],
  },
  {
    keywords: ["test drive", "coba", "test", "drive"],
    answer:
      "Ingin merasakan sensasi berkendara Wuling? 🚗\n\nDaftarkan test drive Anda sekarang:\n✅ Gratis tanpa syarat\n✅ Bisa di dealer atau lokasi Anda\n✅ Tersedia semua model\n\nSilakan isi form di halaman **/kontak** atau hubungi kami via WhatsApp.",
    options: ["Lokasi Dealer", "Hubungi Sales", "Lihat Katalog Mobil"],
  },
  {
    keywords: ["service", "servis", "perawatan", "bengkel", "oli", "tune up", "servis berkala"],
    answer:
      "Layanan Service Wuling Semarang:\n\n🔧 **Servis Berkala** — Gratis jasa s.d 50.000 KM / 4 tahun\n⚡ **Worry Free Program** — Garansi selesai 3 hari (215 item suku cadang)\n🛠️ **Teknisi Bersertifikat** Wuling resmi\n📅 **Booking** bisa via WhatsApp\n\nDetail lengkap ada di halaman **/service**.",
    options: ["Jam Operasional", "Lokasi Dealer", "Hubungi Sales"],
  },
  {
    keywords: ["lokasi", "alamat", "dimana", "maps", "peta", "tempat", "kantor"],
    answer:
      "📍 **Wuling Semarang**\nJl. Raya Kaligawe No.7, Semarang\n\n🗺️ Mudah dijangkau dari pusat kota Semarang. Tersedia area parkir luas.\n\nBuka Google Maps dari halaman **/dealer** untuk petunjuk arah.",
    options: ["Jam Operasional", "Test Drive", "Hubungi Sales"],
  },
  {
    keywords: ["jam", "buka", "tutup", "operasional", "waktu", "hari", "senin", "minggu", "sabtu"],
    answer:
      "🕐 **Jam Operasional Dealer:**\n\n📅 Senin – Sabtu: 08.00 – 17.00 WIB\n📅 Minggu: 08.00 – 15.00 WIB\n\nUntuk keperluan mendesak di luar jam operasional, silakan hubungi via WhatsApp.",
    options: ["Lokasi Dealer", "Hubungi Sales", "Test Drive"],
  },
  {
    keywords: ["garansi", "warranty", "jaminan"],
    answer:
      "🛡️ **Garansi Wuling:**\n\n✅ Garansi kendaraan **3 tahun / 100.000 KM**\n✅ Garansi baterai EV **8 tahun / 160.000 KM**\n✅ Worry Free Program — 215 item spare part, garansi selesai 3 hari\n\nDetail garansi lengkap bisa ditanyakan ke sales kami.",
    options: ["Layanan Service", "Hubungi Sales"],
  },
  {
    keywords: ["almaz"],
    answer:
      "🚗 **Wuling Almaz**\n\nSUV premium dengan kabin luas 7-seater. Tersedia varian:\n• Almaz 1.5T CVT Exclusive\n• Almaz 1.5T CVT Lux\n• Almaz RS Pro (flagship)\n\nFitur unggulan: panoramic roof, WIND (voice command), 360° camera, ADAS.\n\nLihat detail lengkap di halaman katalog.",
    options: ["Harga & Promo", "Test Drive", "Lihat Katalog Mobil"],
  },
  {
    keywords: ["air ev", "airev", "listrik", "ev", "electric", "binguo"],
    answer:
      "⚡ **Wuling Air ev & BinguoEV**\n\nMobil listrik Wuling pilihan terbaik untuk mobilitas kota!\n\n🔋 Air ev: range ~300 KM, pengisian cepat\n🔋 BinguoEV: desain stylish, range ~333 KM\n\nBonus: subsidi pajak EV dari pemerintah masih berlaku!\n\nTanya detail ke sales kami untuk penawaran terbaik.",
    options: ["Harga & Promo", "Test Drive", "Hubungi Sales"],
  },
  {
    keywords: ["confero"],
    answer:
      "🚐 **Wuling Confero**\n\nMPV keluarga tangguh dengan kabin lega 7-seater!\n• Mesin 1.5L bertenaga\n• Transmisi manual & otomatis\n• Bagasi luas\n• Harga terjangkau\n\nCocok untuk keluarga aktif yang butuh kendaraan serba bisa.",
    options: ["Harga & Promo", "Test Drive", "Lihat Katalog Mobil"],
  },
  {
    keywords: ["sales", "hubungi", "kontak", "wa", "whatsapp", "telepon", "telp", "call"],
    answer:
      "Hubungi tim sales kami:\n\n📱 **WhatsApp**: Klik tombol WhatsApp di pojok kanan bawah\n📞 **Telepon**: Tersedia di halaman /kontak\n💬 **Form Kontak**: Isi form di halaman /kontak\n\nTim kami siap membantu Anda dari Senin–Sabtu 08.00–17.00 WIB.",
    options: ["Lokasi Dealer", "Jam Operasional"],
  },
  {
    keywords: ["kredit", "kpr", "leasing", "bank", "finansial", "cicil"],
    answer:
      "💳 **Pembiayaan Wuling Semarang:**\n\nKami bekerja sama dengan berbagai lembaga pembiayaan terpercaya:\n🏦 BCA Finance, Mandiri Tunas Finance, Adira, FIF, dan lainnya\n\n✅ Proses cepat & mudah\n✅ DP mulai 20%\n✅ Tenor hingga 5 tahun\n\nKonsultasi gratis dengan tim sales kami!",
    options: ["Hubungi Sales", "Test Drive", "Harga & Promo"],
  },
];

const FALLBACK: Message = {
  id: 0,
  from: "bot",
  text: "Maaf, saya belum bisa menjawab pertanyaan itu 😅\n\nUntuk informasi lebih lengkap, silakan hubungi tim kami via WhatsApp atau pilih topik di bawah.",
  options: QUICK_REPLIES,
};

// ─── Engine ───────────────────────────────────────────────────────────────────
function getReply(input: string): Message {
  const lower = input.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return {
        id: 0, // will be overwritten by idCounter
        from: "bot",
        text: rule.answer,
        options: rule.options,
      };
    }
  }
  return { ...FALLBACK };
}

// ─── Bubble ───────────────────────────────────────────────────────────────────
function formatText(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((p, j) =>
          j % 2 === 1 ? <strong key={j}>{p}</strong> : p
        )}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    );
  });
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "bot",
      text: "Halo! Selamat datang di Wuling Semarang 👋\nAda yang bisa saya bantu?",
      options: QUICK_REPLIES,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idCounter = useRef(2);
  const openRef = useRef(open);

  // Sync openRef dengan state open
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Scroll visibility — identik dengan WhatsAppButton
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // cek posisi awal
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function handleToggle() {
    setOpen((v) => {
      const next = !v;
      if (next) {
        setUnread(0);
        setTimeout(() => inputRef.current?.focus(), 300);
      }
      return next;
    });
  }

  function send(text: string) {
    if (!text.trim()) return;
    const userId = idCounter.current++;
    const userMsg: Message = { id: userId, from: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = { ...getReply(text), id: idCounter.current++ };
      setTyping(false);
      setMessages((prev) => [...prev, reply]);
      if (!openRef.current) setUnread((n) => n + 1);
    }, 800);
  }

  return (
    <>
      {/* ── Chat Window ── */}
      <div
        className={`fixed bottom-[5.5rem] right-6 z-40 flex flex-col transition-all duration-500 ${
          open && visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ width: "min(360px, calc(100vw - 2rem))" }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-t-2xl"
          style={{ background: "var(--color-primary, #c00)" }}
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20">
            <Bot size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-tight">Wuling Assistant</p>
            <p className="text-white/70 text-xs">Online • Biasanya membalas instan</p>
          </div>
          <button
            onClick={handleToggle}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Tutup chat"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto bg-gray-50 px-3 py-3 space-y-3"
          style={{ maxHeight: "360px", minHeight: "200px" }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.from === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-2xl text-sm max-w-[85%] leading-relaxed whitespace-pre-line ${
                  msg.from === "user"
                    ? "text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                }`}
                style={
                  msg.from === "user"
                    ? { background: "var(--color-primary, #c00)" }
                    : undefined
                }
              >
                {formatText(msg.text)}
              </div>

              {/* Quick reply buttons */}
              {msg.from === "bot" && msg.options && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                  {msg.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => send(opt)}
                      className="text-xs px-2.5 py-1 rounded-full border transition-all duration-150 hover:text-white active:scale-95"
                      style={{
                        borderColor: "var(--color-primary, #c00)",
                        color: "var(--color-primary, #c00)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "var(--color-primary, #c00)";
                        (e.currentTarget as HTMLButtonElement).style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "var(--color-primary, #c00)";
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex items-start">
              <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 rounded-b-2xl px-3 py-2.5 flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
            placeholder="Ketik pesan..."
            className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim()}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150 disabled:opacity-30"
            style={{ background: "var(--color-primary, #c00)" }}
            aria-label="Kirim"
          >
            <Send size={14} className="text-white translate-x-px" />
          </button>
        </div>
      </div>

      {/* ── Toggle Button ── */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-[5.5rem] right-6 z-40 rounded-full shadow-lg flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          background: "var(--color-primary, #c00)",
          width: "3.25rem",
          height: "3.25rem",
        }}
        aria-label={open ? "Tutup chat" : "Buka chat"}
      >
        <div
          className={`transition-all duration-300 ${
            open ? "rotate-90 opacity-0 absolute" : "rotate-0 opacity-100"
          }`}
        >
          <MessageCircle size={22} className="text-white" />
        </div>
        <div
          className={`transition-all duration-300 ${
            open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0 absolute"
          }`}
        >
          <X size={22} className="text-white" />
        </div>

        {/* Unread badge */}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-400 text-gray-900 text-[10px] font-bold flex items-center justify-center shadow">
            {unread}
          </span>
        )}
      </button>
    </>
  );
}