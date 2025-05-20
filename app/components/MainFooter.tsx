"use client";

import Link from "next/link";

export default function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-center md:text-left">
          <p>
            &copy; {currentYear} Carlos Grandis. Todos os direitos reservados.
          </p>
        </div>

        <div className="flex gap-4 text-sm">
          <Link href="https://github.com/seu-usuario" target="_blank" className="hover:text-white transition">
            GitHub
          </Link>
          <Link href="https://linkedin.com/in/seu-perfil" target="_blank" className="hover:text-white transition">
            LinkedIn
          </Link>
          <Link href="mailto:carlosgrandis@gmail.com" className="hover:text-white transition">
            Contato
          </Link>
        </div>
      </div>
    </footer>
  );
}
