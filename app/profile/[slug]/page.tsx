import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Instagram, Linkedin } from "lucide-react";
import Header from "@/app/components/Header";

export default async function PublicProfilePage({ params }: { params: { slug: string } }) {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/profile/${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const provider = await res.json();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto p-6 sm:p-10">
        <div className="bg-white rounded-xl shadow p-6 space-y-6 text-center">
          {/* Foto de perfil */}
          {provider.profilePhoto ? (
            <img
              src={provider.profilePhoto}
              alt="Foto de perfil"
              className="w-32 h-32 mx-auto rounded-full object-cover border"
            />
          ) : (
            <div className="w-32 h-32 mx-auto rounded-full bg-gray-200" />
          )}

          {/* Nome e bio */}
          <h2 className="text-2xl font-bold text-gray-800">{provider.name}</h2>

          {provider.bio && (
            <p className="text-gray-700 whitespace-pre-line">{provider.bio}</p>
          )}

          {/* Localização */}
          {(provider.city || provider.country) && (
            <p className="text-gray-500 italic">
              {provider.city}
              {provider.city && provider.country ? ", " : ""}
              {provider.country}
            </p>
          )}

          {/* Especialidades */}
          {provider.specialties && (
            <p className="text-sm text-gray-500">
              <strong>Especialidades:</strong> {provider.specialties}
            </p>
          )}

          {/* Redes sociais */}
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

          {/* Portfólio */}
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
}
