"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import { Camera, Trash2 } from "lucide-react";

const ProviderProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState({
    name: "",
    email: "",
    contactNumber: "",
    instagramLink: "",
    profilePhoto: "",
  });
  const [photoPreview, setPhotoPreview] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setProvider(data);
        setPhotoPreview(data.profilePhoto || "");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProvider({ ...provider, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photos", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setProvider((prev) => ({ ...prev, profilePhoto: data.urls[0] }));
    setPhotoPreview(data.urls[0]);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(provider),
    });
    if (res.ok) {
      alert("Perfil atualizado com sucesso");
    } else {
      alert("Erro ao atualizar perfil");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja deletar sua conta?")) return;
    const res = await fetch("/api/auth/delete", {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      alert("Conta deletada");
      router.push("/register/prestadordeservico");
    } else {
      alert("Erro ao deletar conta");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto p-6 sm:p-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Editar Perfil</h2>
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <div className="flex items-center gap-4">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Foto de perfil"
                className="w-20 h-20 rounded-full object-cover border"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <Camera className="text-gray-500" />
              </div>
            )}
            <label className="cursor-pointer text-blue-600 hover:underline">
              Trocar foto
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>
          </div>

          <input
            type="text"
            name="name"
            placeholder="Nome"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={provider.name ?? ""}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={provider.email ?? ""}
            onChange={handleChange}
            disabled
          />

          <input
            type="text"
            name="contactNumber"
            placeholder="Telefone de contato"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={provider.contactNumber ?? ""}
            onChange={handleChange}
          />

          <input
            type="text"
            name="instagramLink"
            placeholder="Link do Instagram"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={provider.instagramLink ?? ""}
            onChange={handleChange}
          />

          <div className="flex justify-between gap-4 pt-4">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full"
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>

            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 flex items-center gap-2 px-6 py-3 w-full justify-center border border-red-300 rounded-lg"
            >
              <Trash2 className="w-5 h-5" /> Deletar Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
