"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/authentication/utils/Header";
import ServiceCard from "@/app/components/authentication/dashboard/ServiceCard";
import { UserCircle } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  duration: number;
}

const ProviderDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [providerName, setProviderName] = useState<string>("");

  useEffect(() => {
    const fetchServicesAndUser = async () => {
      try {
        const verifyRes = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include",
        });

        if (!verifyRes.ok) {
          router.push("/login/prestadordeservico_usuario");
          return;
        }

        const { id, name } = await verifyRes.json();
        setProviderName(name);

        const response = await fetch(`/api/services/list?providerId=${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setServices(data.services);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        router.push("/login/prestadordeservico_usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchServicesAndUser();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div>
      <Header />
      <div className="p-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-[#260E59]">
          Dashboard do {providerName || "Prestador de Serviço"}
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/provider/profile")}
            title="Editar Perfil"
            className="flex items-center gap-2 border border-[#0E1126] px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            <UserCircle className="w-5 h-5 text-[#0E1126" />
            <span className="hidden sm:inline text-[#0E1126] font-medium">Perfil</span>
          </button>

          <button
            onClick={() => router.push("/provider/addservice")}
            className="bg-[#0E1126] text-[#05C7F2] px-4 py-2 rounded hover:bg-green-700 transition-all"
          >
            Adicionar Novo Serviço
          </button>
        </div>
      </div>

      <div className="px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service.id}
              onClick={() => router.push(`/provider/service/${service.id}`)}
              className="cursor-pointer hover:shadow-lg transition-shadow"
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                duration={service.duration}
              />
            </div>
          ))
        ) : (
          <p className="text-[#0E1126] col-span-full">Nenhum serviço cadastrado.</p>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
