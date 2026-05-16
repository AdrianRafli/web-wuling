import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceShort(price: number): string {
  if (price >= 1_000_000_000) {
    return `${(price / 1_000_000_000).toFixed(1)} M`;
  }
  if (price >= 1_000_000) {
    return `${(price / 1_000_000).toFixed(0)} Jt`;
  }
  return formatPrice(price);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}