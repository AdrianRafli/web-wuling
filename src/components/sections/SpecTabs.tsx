"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { CarVariant } from "@/types";
import { formatPrice } from "@/lib/utils";

type Props = {
  variants: CarVariant[];
};

export default function SpecTabs({ variants }: Props) {
  const [active, setActive] = useState(0);
  const variant = variants[active];

  const specRows = [
    { label: "Mesin", value: variant.specs.engine },
    { label: "Transmisi", value: variant.specs.transmission },
    { label: "Tenaga Maksimal", value: variant.specs.power },
    { label: "Torsi Maksimal", value: variant.specs.torque },
    { label: "Bahan Bakar", value: variant.specs.fuelType },
    { label: "Kapasitas Penumpang", value: `${variant.specs.seats} Orang` },
    ...(variant.specs.dimensions
      ? [
          { label: "Panjang", value: `${variant.specs.dimensions.length} mm` },
          { label: "Lebar", value: `${variant.specs.dimensions.width} mm` },
          { label: "Tinggi", value: `${variant.specs.dimensions.height} mm` },
          { label: "Wheelbase", value: `${variant.specs.dimensions.wheelbase} mm` },
        ]
      : []),
  ];

  return (
    <div>
      {/* Tab list */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide">
        {variants.map((v, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              active === i
                ? "bg-wuling-red text-white border-wuling-red shadow-sm"
                : "bg-white text-wuling-gray-mid border-gray-200 hover:border-wuling-red hover:text-wuling-red"
            }`}
          >
            <span className="block text-xs opacity-70 mb-0.5">
              {formatPrice(v.price)}
            </span>
            {v.name.replace(/^(Wuling\s|New\s)/i, "").split(" ").slice(-2).join(" ")}
          </button>
        ))}
      </div>

      {/* Nama varian aktif */}
      <div className="bg-wuling-black text-white rounded-t-xl px-5 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Varian yang dipilih</p>
          <p className="font-display font-semibold text-sm">{variant.name}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 mb-0.5">Harga OTR Semarang</p>
          <p className="font-display font-bold text-wuling-red text-base">
            {formatPrice(variant.price)}
          </p>
        </div>
      </div>

      {/* Spesifikasi */}
      <div className="border border-t-0 border-gray-200 rounded-b-xl overflow-hidden mb-6">
        <div className="divide-y divide-gray-100">
          {specRows.map((row) => (
            <div
              key={row.label}
              className="flex px-5 py-3 hover:bg-wuling-gray/50 transition-colors"
            >
              <span className="w-44 text-sm text-wuling-gray-mid shrink-0">
                {row.label}
              </span>
              <span className="text-sm font-medium text-wuling-black">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fitur unggulan */}
      {variant.specs.features && variant.specs.features.length > 0 && (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-wuling-gray px-5 py-3 border-b border-gray-200">
            <h3 className="font-display font-semibold text-sm text-wuling-black">
              Fitur Unggulan — {variant.name.split(" ").slice(-2).join(" ")}
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {variant.specs.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-wuling-red shrink-0" />
                <span className="text-sm text-wuling-black">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}