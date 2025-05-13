"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import ServiceCard from "@/app/components/ServiceCard";
import { UserCircle } from "lucide-react";

const ProviderDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Array<{
    title: string;
    description: string;
    duration: number;
  }>>([]);

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

    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services/list", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setServices(data.services);
        }
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
      }
    };

    verifyProvider();
    fetchServices();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div>
      <Header />
      <div className="p-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard do Prestador de Serviço</h1>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/provider/profile")}
            title="Editar Perfil"
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            <UserCircle className="w-5 h-5 text-gray-700" />
            <span className="hidden sm:inline text-gray-700 font-medium">Perfil</span>
          </button>

          <button
            onClick={() => router.push("/provider/addservice")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all"
          >
            Adicionar Novo Serviço
          </button>
        </div>
      </div>

      <div className="px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length > 0 ? (
          services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              duration={service.duration}
            />
          ))
        ) : (
          <p className="text-gray-600 col-span-full">Nenhum serviço cadastrado.</p>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
