"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className="px-4 py-2 text-sm rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600"
    >
      {isDark ? "Modo Claro" : "Modo Escuro"}
    </button>
  );
}