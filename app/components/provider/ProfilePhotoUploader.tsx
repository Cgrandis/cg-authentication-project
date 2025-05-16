"use client";

import { Camera } from "lucide-react";
import React from "react";

type Props = {
  photoUrl?: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProfilePhotoUploader = ({ photoUrl, onUpload }: Props) => {
  return (
    <div className="flex items-center gap-4">
      {photoUrl ? (
        <img
          src={photoUrl}
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
        <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
      </label>
    </div>
  );
};

export default ProfilePhotoUploader;