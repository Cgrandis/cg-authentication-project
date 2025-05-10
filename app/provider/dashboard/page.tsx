"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";

const ProviderDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyProvider = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          router.push("/login/prestadordeservico_usuario");
        } else {
          setLoading(false);
        }
      } catch (error) {
        router.push("/login/prestadordeservico_usuario");
      }
    };

    verifyProvider();
  }, [router]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
        <Header />
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-5">Dashboard do Prestador de Serviço</h1>
        <p>Bem-vindo ao painel do prestador!</p>
      </div>
    </div>
  );
};

export default ProviderDashboard;
