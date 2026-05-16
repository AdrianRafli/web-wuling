"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

type Props = {
  carOptions: string[];
  whatsapp: string;
};

type FormData = {
  name: string;
  phone: string;
  email: string;
  carInterest: string;
  type: "test-drive" | "pertanyaan" | "penawaran";
  preferredDate: string;
  message: string;
};

export default function ContactForm({ carOptions, whatsapp }: Props) {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    carInterest: "",
    type: "test-drive",
    preferredDate: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const typeLabel = {
      "test-drive": "Test Drive",
      pertanyaan: "Pertanyaan",
      penawaran: "Penawaran Harga",
    }[form.type];

    const message = `Halo, saya ingin ${typeLabel}:

Nama: ${form.name}
No. HP: ${form.phone}
Email: ${form.email || "-"}
Mobil yang diminati: ${form.carInterest || "-"}
Tanggal yang diinginkan: ${form.preferredDate || "-"}
Pesan: ${form.message || "-"}`;

    const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(waUrl, "_blank");
    }, 800);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        <h3 className="font-display font-bold text-xl text-wuling-black mb-2">
          Pesan Terkirim!
        </h3>
        <p className="text-wuling-gray-mid text-sm max-w-sm mb-6">
          WhatsApp sudah terbuka dengan pesan Anda. Tim kami akan segera merespons.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "", phone: "", email: "",
              carInterest: "", type: "test-drive",
              preferredDate: "", message: "",
            });
          }}
          className="btn-outline text-sm"
        >
          Kirim Pesan Lagi
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Tipe Request */}
      <div>
        <label className="block text-sm font-medium text-wuling-black mb-2">
          Saya ingin
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "test-drive", label: "🚗 Test Drive" },
            { value: "pertanyaan", label: "💬 Bertanya" },
            { value: "penawaran", label: "💰 Penawaran Harga" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, type: opt.value as FormData["type"] }))}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                form.type === opt.value
                  ? "bg-wuling-red text-white border-wuling-red"
                  : "bg-white text-wuling-gray-mid border-gray-200 hover:border-wuling-red hover:text-wuling-red"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Nama & No HP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-wuling-black mb-1.5">
            Nama Lengkap <span className="text-wuling-red">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Contoh: Budi Santoso"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-wuling-red transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-wuling-black mb-1.5">
            No. HP / WhatsApp <span className="text-wuling-red">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Contoh: 08123456789"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-wuling-red transition-colors"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-wuling-black mb-1.5">
          Email <span className="text-wuling-gray-mid font-normal">(opsional)</span>
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="email@contoh.com"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-wuling-red transition-colors"
        />
      </div>

      {/* Pilih Mobil & Tanggal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-wuling-black mb-1.5">
            Mobil yang Diminati
          </label>
          <select
            name="carInterest"
            value={form.carInterest}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-wuling-red transition-colors bg-white"
          >
            <option value="">-- Pilih Mobil --</option>
            {carOptions.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
            <option value="Belum tahu">Belum tahu / ingin konsultasi</option>
          </select>
        </div>
        {form.type === "test-drive" && (
          <div>
            <label className="block text-sm font-medium text-wuling-black mb-1.5">
              Tanggal yang Diinginkan
            </label>
            <input
              type="date"
              name="preferredDate"
              value={form.preferredDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-wuling-red transition-colors"
            />
          </div>
        )}
      </div>

      {/* Pesan */}
      <div>
        <label className="block text-sm font-medium text-wuling-black mb-1.5">
          Pesan / Pertanyaan <span className="text-wuling-gray-mid font-normal">(opsional)</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tuliskan pertanyaan atau kebutuhan Anda di sini..."
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-wuling-red transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Memproses...
          </>
        ) : (
          <>
            <Send size={15} />
            Kirim via WhatsApp
          </>
        )}
      </button>

      <p className="text-xs text-center text-wuling-gray-mid">
        Form ini akan membuka WhatsApp dengan pesan otomatis ke nomor dealer kami.
      </p>
    </form>
  );
}