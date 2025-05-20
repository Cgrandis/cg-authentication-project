"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { TechDescription } from "@/types/interfaces";

const images: Record<string, string> = {
  "Next.js": "/logos/next-js.webp",
  "Google Cloud": "/logos/google-cloud.png",
  "Vercel": "/logos/vercel.png",
  "PostgreSQL": "/logos/psql.png",
};

export default function CardTechs() {
  const [index, setIndex] = useState(0);
  const [techs, setTechs] = useState<TechDescription[]>([]);

  useEffect(() => {
    const fetchTechs = async () => {
      const res = await fetch("/api/techs", { cache: "no-store" });
      const data = await res.json();
      setTechs(data);
    };
    fetchTechs();
  }, []);

  useEffect(() => {
    if (techs.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % techs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [techs]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        {techs.length > 0 && (
          <motion.div
            key={techs[index].id}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-4">
              {images[techs[index].title] && (
                <Image
                  src={images[techs[index].title]}
                  alt={techs[index].title}
                  width={50}
                  height={50}
                  className="rounded"
                />
              )}
              <h3 className="text-2xl font-bold text-gray-800">
                {techs[index].title}
              </h3>
            </div>

            <div className="text-sm text-gray-700 leading-relaxed text-justify min-h-100 max-h-130 overflow-hidden hover:overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {techs[index].description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
