"use client";

import { LogOut, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react"; 
import { useLogout } from "@/app/hooks/authentication/useLogout"; 

const Header = () => {
  const { loading, handleLogout } = useLogout();
  
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">Carlos Grandis Portofolio</h1>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-800">Carlos Grandis Portofolio</h1>
      <div className="flex items-center gap-4">
  
        {session?.user && (
          <span className="text-gray-700 text-base font-medium hidden sm:inline">
            Olá, {session.user.name || session.user.email}!{" "}
            {session.user.role && `(${session.user.role})`}
          </span>
        )}

        <button
          onClick={handleLogout}
          disabled={loading}
          className="text-gray-600 hover:text-red-600 transition flex items-center gap-1"
          title="Sair"
          aria-label={loading ? "Saindo da aplicação" : "Sair da aplicação"}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <LogOut className="w-6 h-6" />
          )}
          {loading && <span className="text-sm">Saindo...</span>}
        </button>
      </div>
    </header>
  );
};

export default Header;