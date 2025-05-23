"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import useDimensions from "react-cool-dimensions";
import {
  Bot,
  LayoutTemplate,
  MessageCircleMore,
  Settings,
  ShoppingCart,
} from "lucide-react";

const services = [
  { icon: LayoutTemplate, label: "Landing Pages" },
  { icon: Bot, label: "AI Chat Bots" },
  { icon: MessageCircleMore, label: "WhatsApp Connect" },
  { icon: ShoppingCart, label: "Next.js Commerce" },
  { icon: Settings, label: "Aplicações sob demanda." },
];

const techStack = [
  { src: "/logos/javascript.png", alt: "JavaScript" },
  { src: "/logos/tailwind-css.svg", alt: "Tailwind CSS" },
  { src: "/logos/next-auth.png", alt: "NextAuth" },
  { src: "/logos/typescript.png", alt: "TypeScript" },
  { src: "/logos/node-js.png", alt: "Node.js" },
  { src: "/logos/next-js.webp", alt: "Next.js" },
  { src: "/logos/google-cloud.png", alt: "Google Cloud" },
  { src: "/logos/react.png", alt: "React" },
  { src: "/logos/psql.png", alt: "PostgreSQL" },
  { src: "/logos/prisma-psql.jpg", alt: "prisma"},
  { src: "/logos/vercel.png", alt: "vercel" },
  { src: "/logos/github.png", alt: "github" },
];

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { observe, width } = useDimensions();
  const gridCols =
    width > 900 ? "grid-cols-4" : width > 500 ? "grid-cols-3" : "grid-cols-2";

  return (
    <section
      ref={observe}
      className="relative w-full bg-[#000] overflow-hidden"
    >
      <div className="relative w-full h-[630px]">
        <Image
          src="/textures/world-tech.jpeg"
          alt="Plano de fundo tecnológico"
          width={1920}
          height={1080}
          priority
          quality={80}
          loading="eager"
          className="w-full h-full object-cover"
          onLoadingComplete={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div
        className={`absolute top-0 left-0 right-0 bottom-0 z-10 transition-opacity duration-700 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } px-6 md:px-16 py-16 max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 items-center`}
      >
       
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-[#72E5F2]">
            Back-end <span className="text-[#2175BF]">e Front-end Dev</span>
          </h1>
          <p className="text-lg text-[#72E5F2] mb-6">
            Desenvolvimento ágil e inteligente.
          </p>
          <ul className="space-y-4 text-lg text-white font-medium">
            {services.map(({ icon: Icon, label }, index) => (
              <li key={index} className="flex items-center gap-4">
                <Icon size={24} className="text-[#72E5F2]" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:block"
        >
          <h2 className="text-3xl font-semibold mb-6 text-[#72E5F2]">
            Technologias que utilizo:
          </h2>
          <div className={`grid ${gridCols} gap-6 justify-items-center`}>
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 bg-white hover:bg-[#031059] transition-all rounded-xl flex items-center justify-center"
              >
                <Image
                  src={tech.src}
                  alt={tech.alt}
                  width={96}
                  height={96}
                  className="rounded-md"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
