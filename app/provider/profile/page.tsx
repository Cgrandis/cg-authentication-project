"use client";

import Header from "@/app/components/authentication/utils/Header";
import { Eye, Trash2, Copy } from "lucide-react";
import UploadFotos from "@/app/components/authentication/profile/UploadPicsService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfilePhotoUploader from "@/app/components/authentication/profile/ProfilePhotoUploader";
import FormSection from "@/app/components/authentication/forms/FormSection";
import { useProviderProfile } from "@/app/hooks/useProviderProfile";

const ProviderProfile = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    loading,
    copied,
    handlePhotoUpload,
    handlePortfolioUpload,
    onSubmit,
    handleDelete,
    handleCopyLink,
  } = useProviderProfile();

  const watchSlug = watch("slug");
  const watchProfilePhoto = watch("profilePhoto");

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto p-6 sm:p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Editar Perfil</h2>
          {watchSlug && (
            <div className="flex gap-4 items-center">
              <Link
                href={`/profile/${watchSlug}`}
                target="_blank"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline text-sm"
              >
                <Eye className="w-4 h-4" /> Ver perfil público
              </Link>
              <button
                onClick={() => handleCopyLink(watchSlug)}
                className="flex items-center gap-1 text-gray-600 hover:text-black hover:underline text-sm"
              >
                <Copy className="w-4 h-4" /> {copied ? "Copiado!" : "Copiar"}
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow p-6 space-y-6">
          <ProfilePhotoUploader photoUrl={watchProfilePhoto} onUpload={handlePhotoUpload} />

          <FormSection register={register} watch={watch} setValue={setValue} />

          <UploadFotos onUpload={handlePortfolioUpload} />

          <div className="flex justify-between gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full"
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
            <button
              type="button"
              onClick={() => handleDelete(() => router.push("/register/prestadordeservico"))}
              className="text-red-600 hover:text-red-800 flex items-center gap-2 px-6 py-3 w-full justify-center border border-red-300 rounded-lg"
            >
              <Trash2 className="w-5 h-5" /> Deletar Conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProviderProfile;
