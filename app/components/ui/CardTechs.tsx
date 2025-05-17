"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const techs = [
  {
    name: "Next.js",
    image: "/logos/next-js.webp",
    description:
      "Next.js é um framework React moderno para desenvolvimento full stack. Permite renderização híbrida, APIs integradas e performance otimizada.",
  },
  {
    name: "Google Cloud",
    image: "/logos/google-cloud.png",
    description:
      "Google Cloud oferece infraestrutura escalável, IA generativa, bancos de dados, autenticação e serviços para apps robustos e modernos.",
  },
  {
    name: "Vercel",
    image: "/logos/vercel.png",
    description:
      "Vercel é a plataforma ideal para deploy de apps em Next.js com foco em desempenho, cache automático, edge functions e integração contínua.",
  },
  {
    name: "PostgreSQL",
    image: "/logos/psql.png",
    description:
      "PostgreSQL é um banco de dados relacional robusto e confiável, ideal para aplicações modernas com dados relacionais e segurança.",
  },
];

export default function CardTechs() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {techs.map((tech, index) => (
        <div
          key={tech.name}
          className="w-full h-72 perspective"
          onClick={() =>
            setFlippedIndex(flippedIndex === index ? null : index)
          }
        >
          <motion.div
            className="relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer"
            animate={{ rotateY: flippedIndex === index ? 180 : 0 }}
          >
            {/* Front */}
            <div className="absolute inset-0 bg-white border border-gray-200 rounded-xl p-6 backface-hidden flex flex-col items-center justify-center">
              <Image
                src={tech.image}
                alt={tech.name}
                width={80}
                height={80}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{tech.name}</h3>
            </div>
            {/* Back */}
            <div className="absolute inset-0 bg-gray-100 border border-gray-200 rounded-xl p-6 backface-hidden rotate-y-180 flex items-center text-gray-700 text-sm">
              {tech.description}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
