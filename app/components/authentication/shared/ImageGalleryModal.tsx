"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryModalProps {
  images: string[];
  selectedIndex: number;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  zoomed: boolean;
  toggleZoom: () => void;
}

export default function ImageGalleryModal({
  images,
  selectedIndex,
  onClose,
  onNavigate,
  zoomed,
  toggleZoom,
}: ImageGalleryModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-red-300"
      >
        <X size={28} />
      </button>

      <button
        onClick={() => onNavigate("prev")}
        className="absolute left-4 text-white hover:text-blue-400"
      >
        <ChevronLeft size={40} />
      </button>

      <div className="max-w-4xl max-h-[90vh] flex items-center justify-center">
        <img
          src={images[selectedIndex]}
          alt="Imagem ampliada"
          onClick={toggleZoom}
          className={`rounded shadow-lg cursor-zoom-in transition-transform duration-300 ${
            zoomed ? "scale-125" : "scale-100"
          }`}
        />
      </div>

      <button
        onClick={() => onNavigate("next")}
        className="absolute right-4 text-white hover:text-blue-400"
      >
        <ChevronRight size={40} />
      </button>
    </div>
  );
}
