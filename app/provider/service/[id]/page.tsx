"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "@/app/components/authentication/utils/Header";
import UploadFotos from "@/app/components/authentication/profile/UploadPicsService";
import AvailabilitySelector from "@/app/components/authentication/availablility/AddServiceAvailability";

const ServiceDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const serviceId = params?.id as string;

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    photos: [],
    instagramLink: "",
    contactNumber: "",
    email: "",
    availability: [],
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/services/${serviceId}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setService(data);
          setForm({
            title: data.title,
            description: data.description,
            duration: data.duration.toString(),
            photos: data.photos || [],
            instagramLink: data.instagramLink || "",
            contactNumber: data.contactNumber || "",
            email: data.email || "",
            availability: data.availability || [],
          });
        }
      } catch (error) {
        console.error("Erro ao buscar serviço:", error);
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

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
      alert("Erro ao fazer upload das fotos");
      return;
    }

    const data = await res.json();
    setForm((prev) => ({ ...prev, photos: data.urls }));
  };

  const handleAvailabilityChange = (value: any) => {
    setForm((prev) => ({ ...prev, availability: value }));
  };

  const handleUpdate = async () => {
    const response = await fetch(`/api/services/${serviceId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        duration: parseInt(form.duration),
      }),
    });

    if (response.ok) {
      alert("Serviço atualizado com sucesso!");
      router.push("/provider/dashboard");
    } else {
      alert("Erro ao atualizar serviço");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Deseja mesmo deletar este serviço?")) return;

    const response = await fetch(`/api/services/${serviceId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Serviço deletado com sucesso");
      router.push("/provider/dashboard");
    } else {
      alert("Erro ao deletar serviço");
    }
  };

  if (loading) return <p className="p-10">Carregando...</p>;

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto p-10 space-y-6">
        <h1 className="text-2xl font-bold">Detalhes do Serviço</h1>

        {editing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Título"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <textarea
              name="description"
              placeholder="Descrição"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              name="duration"
              placeholder="Duração (minutos)"
              value={form.duration}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="instagramLink"
              placeholder="Link do Instagram"
              value={form.instagramLink}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Telefone para contato"
              value={form.contactNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />

            <UploadFotos onUpload={handleFotosUpload} />
            <AvailabilitySelector onChange={handleAvailabilityChange} />

            <div className="flex gap-4">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Salvar Alterações
              </button>
              <button
                onClick={() => setEditing(false)}
                className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p><strong>Título:</strong> {service?.title}</p>
            <p><strong>Descrição:</strong> {service?.description}</p>
            <p><strong>Duração:</strong> {service?.duration} minutos</p>
            <p><strong>Instagram:</strong> {service?.instagramLink}</p>
            <p><strong>Contato:</strong> {service?.contactNumber}</p>
            <p><strong>Email:</strong> {service?.email}</p>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Editar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Deletar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
