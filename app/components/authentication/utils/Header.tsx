"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleLogout = async () => {
    setLoading(true);

    try {
      let callbackUrl = "/login/prestadordeservico_usuario";

      if (session?.user?.role === "ADMIN") {
        callbackUrl = "/login/administrador";
      }

      await signOut({
        redirect: true,
        callbackUrl: callbackUrl,
      });

    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Erro ao fazer logout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-800">Carlos Grandis Portofolio</h1>
      <button
        onClick={handleLogout}
        disabled={loading}
        className="text-gray-600 hover:text-red-600 transition"
        title="Sair"
      >
        {loading ? (
          <span className="text-sm">Saindo...</span>
        ) : (
          <LogOut className="w-6 h-6" />
        )}
      </button>
    </header>
  );
};

export default Header;