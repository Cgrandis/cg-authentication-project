"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "GET",
      });

      if (response.ok) {
        router.push("/login/prestadordeservico_usuario");
      } else {
        alert("Erro ao fazer logout.");
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <button
        onClick={handleLogout}
        disabled={loading}
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        {loading ? "Saindo..." : "Logout"}
      </button>
    </header>
  );
};

export default Header;
