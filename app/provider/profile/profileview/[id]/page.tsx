"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import { Instagram, Linkedin } from "lucide-react";

const PublicProfileView = () => {
  const params = useParams();
  const providerId = params?.id as string;
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await fetch(`/api/auth/profile?id=${providerId}`);
        if (res.ok) {
          const data = await res.json();
          setProvider(data);
        }
      } catch (error) {
        console.error("Erro ao carregar perfil público:", error);
      } finally {
        setLoading(false);
      }
    };

    if (providerId) fetchProvider();
  }, [providerId]);

  if (loading) return <p className="p-10">Carregando...</p>;
  if (!provider) return <p className="p-10 text-red-600">Perfil não encontrado.</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto p-6 sm:p-10">
        <div className="bg-white rounded-xl shadow p-6 space-y-6 text-center">
          {provider.profilePhoto ? (
            <img
              src={provider.profilePhoto}
              alt="Foto de perfil"
              className="w-32 h-32 mx-auto rounded-full object-cover border"
            />
          ) : (
            <div className="w-32 h-32 mx-auto rounded-full bg-gray-200" />
          )}

          <h2 className="text-2xl font-bold text-gray-800">{provider.name}</h2>
          <p className="text-gray-500">{provider.email}</p>

          {provider.contactNumber && (
            <p className="text-gray-500">{provider.contactNumber}</p>
          )}

          {provider.city || provider.country ? (
            <p className="text-gray-500 italic">
              {provider.city ?? ""} {provider.city && provider.country ? "," : ""} {provider.country ?? ""}
            </p>
          ) : null}

          {provider.bio && (
            <p className="text-gray-700 mt-4 whitespace-pre-line">{provider.bio}</p>
          )}

          {provider.specialties && (
            <p className="text-sm text-gray-500">
              <strong>Especialidades:</strong> {provider.specialties}
            </p>
          )}

          <div className="flex justify-center gap-6 pt-4">
            {provider.instagramLink && (
              <a
                href={provider.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="text-gray-500 hover:text-pink-600 transition"
              >
                <Instagram className="w-6 h-6" />
              </a>
            )}
            {provider.linkedin && (
              <a
                href={provider.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="text-gray-500 hover:text-blue-700 transition"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            )}
          </div>

          {provider.portfolioPhotos?.length > 0 && (
            <div className="pt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Portfólio</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {provider.portfolioPhotos.map((src: string, index: number) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Portfólio ${index + 1}`}
                    className="w-full h-32 object-cover rounded shadow"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfileView;
