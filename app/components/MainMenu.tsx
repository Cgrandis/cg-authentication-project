"use client";

import { motion } from "framer-motion";
import { X, Home, Info, Mail, FileText } from "lucide-react";
import Link from "next/link";

interface MainMenuProps {
  onClose: () => void;
}

const mockLinks = [
  { label: "Início", href: "/", icon: <Home size={18} /> },
  { label: "Sobre", href: "/profile/carlos-grandis", icon: <Info size={18} /> },
  { label: "Portfólio", href: "#projetos", icon: <FileText size={18} /> },
  { label: "Contato", href: "#contato", icon: <Mail size={18} /> },
];

export default function MainMenu({ onClose }: MainMenuProps) {
  return (
    <>
      
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
      />

      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 p-6 flex flex-col"
      >
      
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-4">
          {mockLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"
              onClick={onClose}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}
