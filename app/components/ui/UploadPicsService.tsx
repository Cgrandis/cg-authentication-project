"use client";

import { useState } from "react";
import { UploadCloud, Trash2 } from "lucide-react";

const MAX_FILES = 6;

const UploadFotos = ({ onUpload }: { onUpload: (files: File[]) => void }) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, MAX_FILES);
    const urls = fileArray.map((file) => URL.createObjectURL(file));

    setPreviews(urls);
    setSelectedFiles(fileArray);
    onUpload(fileArray);
  };

  const handleRemove = (index: number) => {
    const newPreviews = [...previews];
    const newFiles = [...selectedFiles];
    newPreviews.splice(index, 1);
    newFiles.splice(index, 1);

    setPreviews(newPreviews);
    setSelectedFiles(newFiles);
    onUpload(newFiles);
  };

  return (
    <div className="space-y-4">
      <label className="font-semibold text-lg">Fotos (máx. 6)</label>

      <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-green-500 transition-all">
        <label className="cursor-pointer text-gray-600 flex flex-col items-center space-y-2">
          <UploadCloud className="w-8 h-8 text-green-500" />
          <span className="text-sm">Clique ou arraste as imagens aqui</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {previews.length > 0 && (
          <p className="text-xs text-gray-400 mt-2">
            {previews.length} imagem{previews.length > 1 ? "s" : ""} carregada{previews.length > 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {previews.map((src, index) => (
          <div key={index} className="relative group">
            <img
              src={src}
              alt={`Preview ${index + 1}`}
              className="w-full h-32 object-cover rounded shadow-md border"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow hover:bg-red-600 hover:text-white transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadFotos;
