"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Header from "@/app/components/Header";
import { Eye, Camera, Trash2, Copy } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import UploadFotos from "@/app/components/ui/UploadPicsService";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProviderProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState({
    id: "",
    name: "",
    email: "",
    contactNumber: "",
    instagramLink: "",
    profilePhoto: "",
    city: "",
    country: "",
    bio: "",
    specialties: "",
    linkedin: "",
    portfolioPhotos: [] as string[],
    slug: "",
  });
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const bioRef = useRef<HTMLTextAreaElement>(null);
  const specialtiesRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (bioRef.current) {
      bioRef.current.style.height = "auto";
      bioRef.current.style.height = `${bioRef.current.scrollHeight}px`;
    }
    if (specialtiesRef.current) {
      specialtiesRef.current.style.height = "auto";
      specialtiesRef.current.style.height = `${specialtiesRef.current.scrollHeight}px`;
    }
  }, [provider.bio, provider.specialties]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProvider({ ...provider, [e.target.name]: e.target.value });
  };

  const fetchProfile = async () => {
    const res = await fetch("/api/auth/me", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setProvider(data);
      setPhotoPreview(data.profilePhoto || "");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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

  const handlePortfolioUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("photos", file));

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setProvider((prev) => ({ ...prev, portfolioPhotos: data.urls }));
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

  const handleCopyLink = () => {
    if (!provider.slug) return;

    const publicLink = `${window.location.origin}/profile/${provider.slug}`;
    navigator.clipboard.writeText(publicLink);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto p-6 sm:p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Editar Perfil</h2>
          <div className="flex gap-4 items-center">
            {provider.id && (
              <Link
                href={`/provider/profile/profileview/${provider.id}`}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline text-sm"
                title="Visualizar perfil público"
              >
                <Eye className="w-4 h-4" /> Ver perfil público
              </Link>
            )}
            {provider.slug && (
              <div className="flex items-center gap-3">
                <Link
                  href={`/profile/${provider.slug}`}
                  target="_blank"
                  className="text-sm text-green-700 hover:text-green-900 hover:underline"
                  title="Ver página pública"
                >
                  /profile/{provider.slug}
                </Link>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 text-gray-600 hover:text-black hover:underline text-sm"
                  title="Copiar link público"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copiado!" : "Copiar"}
                </button>
              </div>
            )}
          </div>
        </div>

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
            <label className="cursor-pointer text-[#260E59] hover:underline">
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

          <div>
            <label className="block text-sm text-gray-600 mb-1">Telefone de contato</label>
            <PhoneInput
              country={'br'}
              value={provider.contactNumber ?? ""}
              onChange={(value) => setProvider((prev) => ({ ...prev, contactNumber: value }))}
              inputStyle={{
                width: '100%',
                padding: '14px',
                borderRadius: '0.5rem',
                border: '1px solid #d1d5db',
              }}
              specialLabel=""
            />
          </div>

          <input
            type="text"
            name="city"
            placeholder="Cidade"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={provider.city ?? ""}
            onChange={handleChange}
          />

          <input
            type="text"
            name="country"
            placeholder="País"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={provider.country ?? ""}
            onChange={handleChange}
          />

          <textarea
            ref={bioRef}
            name="bio"
            placeholder="Biografia"
            className="w-full p-3 border border-gray-300 rounded-lg overflow-hidden resize-none"
            value={provider.bio ?? ""}
            onChange={handleChange}
          />

          <textarea
            ref={specialtiesRef}
            name="specialties"
            placeholder="Especialidades (separadas por vírgula)"
            className="w-full p-3 border border-gray-300 rounded-lg overflow-hidden resize-none"
            value={provider.specialties ?? ""}
            onChange={handleChange}
          />

          <input
            type="text"
            name="linkedin"
            placeholder="Perfil do LinkedIn"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={provider.linkedin ?? ""}
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

          <UploadFotos onUpload={handlePortfolioUpload} />

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
