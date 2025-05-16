"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import { SiInstagram, SiLinkedin } from "react-icons/si";
import ImageGalleryModal from "@/app/components/ui/ImageGalleryModal";

const PublicProfileView = () => {
  const params = useParams();
  const providerId = params?.id as string;
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [zoomed, setZoomed] = useState<boolean>(false);

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

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setSelectedPhoto(provider.portfolioPhotos[index]);
  };

  const navigate = (direction: "prev" | "next") => {
    const total = provider.portfolioPhotos.length;
    const newIndex =
      direction === "next"
        ? (selectedIndex + 1) % total
        : (selectedIndex - 1 + total) % total;
    setSelectedIndex(newIndex);
    setSelectedPhoto(provider.portfolioPhotos[newIndex]);
  };

  if (loading) return <p className="p-10">Carregando...</p>;
  if (!provider) return <p className="p-10 text-red-600">Perfil não encontrado.</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto p-6 sm:p-10">
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center lg:items-start gap-14 text-left">
            {provider.profilePhoto ? (
              <img
                src={provider.profilePhoto}
                alt="Foto de perfil"
                className="w-56 h-56 rounded-full aspect-square object-cover border shadow"
              />
            ) : (
              <div className="w-56 h-56 rounded-full bg-gray-200" />
            )}

            <div className="space-y-2 w-full">
              <h2 className="text-2xl font-bold text-gray-800">{provider.name}</h2>
              <p className="text-gray-600">{provider.email}</p>
              {provider.contactNumber && (
                <p className="text-gray-600">📞 {provider.contactNumber}</p>
              )}
              {(provider.city || provider.country) && (
                <p className="text-gray-500 italic">
                  {provider.city}
                  {provider.city && provider.country ? ", " : ""}
                  {provider.country}
                </p>
              )}
              <div className="flex gap-4 pt-2">
                {provider.instagramLink && (
                  <a
                    href={provider.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="text-gray-500 hover:text-pink-600 transition"
                  >
                    <SiInstagram className="w-5 h-5" />
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
                    <SiLinkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {provider.bio && (
            <p className="text-gray-700 whitespace-pre-line mt-10">{provider.bio}</p>
          )}

          {provider.specialties && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Especialidades:</h3>
              <div className="flex flex-wrap gap-2">
                {provider.specialties.split(',').map((item: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white border border-gray-300 text-blue-700 text-sm rounded-full shadow-sm hover:bg-blue-200 transition"
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {provider.portfolioPhotos?.length > 0 && (
            <div className="pt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Portfólio</h3>
              <div className="flex flex-col gap-4">
                {provider.portfolioPhotos.map((src: string, index: number) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Portfólio ${index + 1}`}
                    className="w-full max-h-[400px] object-cover rounded-lg shadow cursor-pointer hover:brightness-90"
                    onClick={() => openModal(index)}
                  />
                ))}
              </div>
            </div>
          )}

            {selectedPhoto && (
              <ImageGalleryModal
                images={provider.portfolioPhotos}
                selectedIndex={selectedIndex}
                onClose={() => setSelectedPhoto(null)}
                onNavigate={navigate}
                zoomed={zoomed}
                toggleZoom={() => setZoomed(!zoomed)}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfileView;
