"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import StatCard from "@/app/components/StatCard";

const AdminDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    providers: 0,
    services: 0,
  });

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          router.push("/login/administrador");
        } else {
          setLoading(false);
        }
      } catch (error) {
        router.push("/login/administrador");
      }
    };

    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      }
    };

    verifyAdmin();
    fetchStats();
  }, [router]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <Header />
      <div className="p-10 grid grid-cols-3 gap-6">
        <StatCard
          title="Usuários Registrados"
          value={stats.users}
          description="Total de usuários cadastrados"
          color="border-blue-500"
        />
        <StatCard
          title="Prestadores de Serviço"
          value={stats.providers}
          description="Total de prestadores ativos"
          color="border-green-500"
        />
        <StatCard
          title="Serviços Cadastrados"
          value={stats.services}
          description="Serviços disponíveis no sistema"
          color="border-purple-500"
        />
      </div>

      <div className="p-10 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push("/register/administrador")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
        >
          Registrar Novo Administrador
        </button>
        <button
          onClick={() => router.push("/admin/techsdescription")}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
        >
          Gerenciar Textos de Techs
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
