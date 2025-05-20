"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import MainMenu from "./MainMenu";
import { AnimatePresence } from "framer-motion";

export default function MainHeader() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);
  const closeMenu = () => setShowMenu(false);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-md border-b relative z-50">
      <div className="flex items-center gap-3">
        <button onClick={toggleMenu} className="text-gray-700 hover:text-black">
          <Menu size={24} />
        </button>
        <span className="text-xl font-semibold text-gray-800">
          Carlos Grandis Desenvolvimento
        </span>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/Cgrandis"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black transition"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/carlos-grandis-3b1413252/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black transition"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="https://instagram.com/seu-perfil"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black transition"
        >
          <FaInstagram size={20} />
        </a>
      </div>

      <AnimatePresence>
        {showMenu && <MainMenu onClose={closeMenu} />}
      </AnimatePresence>
    </header>
  );
}
