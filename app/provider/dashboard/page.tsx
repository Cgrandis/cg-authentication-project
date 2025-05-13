"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import ServiceCard from "@/app/components/ServiceCard";

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

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <Header />
      <div className="p-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard do Prestador de Serviço</h1>
        <button
          onClick={() => router.push("/provider/addservice")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all"
        >
          Adicionar Novo Serviço
        </button>
      </div>

      <div className="p-10 grid grid-cols-3 gap-6">
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
          <p className="text-gray-600">Nenhum serviço cadastrado.</p>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
