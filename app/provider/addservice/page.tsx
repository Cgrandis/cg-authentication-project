"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import AvailabilitySelector from "@/app/components/ui/AddServiceAvailability";
import UploadFotos from "@/app/components/ui/UploadPicsService";

const AddService = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    photos: [],
    instagramLink: "",
    contactNumber: "",
    email: "",
    availability: "",
  });

  const [loading, setLoading] = useState(false);
  const [providerId, setProviderId] = useState<string | null>(null);

  useEffect(() => {
    const getUserFromToken = async () => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/login/prestadordeservico_usuario");
          return;
        }

        const data = await res.json();
        setProviderId(data.id);
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

  const handleFotosUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("photos", file));
  
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) {
      const text = await res.text();
      console.error("Erro ao fazer upload:", text);
      alert("Erro ao fazer upload das imagens.");
      return;
    }
  
    const data = await res.json();
    setForm((prev) => ({ ...prev, photos: data.urls }));
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
          availability: JSON.parse(form.availability),
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
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Adicionar Novo Serviço</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">
          <input
            type="text"
            name="title"
            placeholder="Título do Serviço"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-green-500"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Descrição"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-green-500"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Duração (minutos)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-green-500"
            value={form.duration}
            onChange={handleChange}
            required
          />

          <UploadFotos onUpload={handleFotosUpload} />

          <input
            type="text"
            name="instagramLink"
            placeholder="Link do Instagram"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-green-500"
            value={form.instagramLink}
            onChange={handleChange}
          />

          <input
            type="text"
            name="contactNumber"
            placeholder="Telefone para contato"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-green-500"
            value={form.contactNumber}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-green-500"
            value={form.email}
            onChange={handleChange}
          />

          <AvailabilitySelector
            onChange={(value) =>
              setForm((prev) => ({ ...prev, availability: JSON.stringify(value) }))
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Carregando..." : "Adicionar Serviço"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
