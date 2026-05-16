"use client";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
};

export default function CarImage({ src, alt, className, fallback }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.style.display = "none";
        if (fallback) {
          const parent = e.currentTarget.parentElement;
          if (parent) {
            const div = document.createElement("div");
            div.className = "w-full h-full flex items-center justify-center text-gray-300 text-sm";
            div.innerText = fallback;
            parent.appendChild(div);
          }
        }
      }}
    />
  );
}