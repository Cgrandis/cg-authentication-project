"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";

const AddService = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);
  const [providerId, setProviderId] = useState<string | null>(null);

  // ✅ Obtem o ID do provider do servidor, que tem acesso ao cookie HttpOnly
  useEffect(() => {
    const getUserFromToken = async () => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include", // importante para enviar o cookie
        });

        if (!res.ok) {
          router.push("/login/prestadordeservico_usuario");
          return;
        }

        const data = await res.json();
        setProviderId(data.id); // <- recebido do backend
      } catch (error) {
        console.error("Erro ao verificar token:", error);
        router.push("/login/prestadordeservico_usuario");
      }
    };

    getUserFromToken();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!providerId) {
        alert("ID do prestador não encontrado.");
        return;
      }

      const response = await fetch("/api/services/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          duration: parseInt(form.duration),
          providerId,
        }),
      });

      if (response.ok) {
        alert("Serviço criado com sucesso!");
        router.push("/provider/dashboard");
      } else {
        const error = await response.json();
        alert(`Erro: ${error.error}`);
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Adicionar Novo Serviço</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Título do Serviço"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Descrição"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Duração (minutos)"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={form.duration}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
          >
            {loading ? "Carregando..." : "Adicionar Serviço"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
