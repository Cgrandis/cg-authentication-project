"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BaseSection from "../shared/BaseSection";
import { portfolioLinks } from "../data/links";

export default function PortfolioLinks() {
  return (
    <BaseSection title="Acesse a Aplicação" className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <nav className="space-y-6" aria-label="Navegação para registro e login">
        {portfolioLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:border-black hover:shadow-lg transition"
          >
            <article className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white">{link.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{link.description}</p>
              </div>
              <ArrowRight className="text-black dark:text-white w-5 h-5" />
            </article>
          </Link>
        ))}
      </nav>
    </BaseSection>
  );
}