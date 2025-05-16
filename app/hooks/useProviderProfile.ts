"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  contactNumber: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  bio: z.string().optional(),
  specialties: z.string().optional(),
  linkedin: z.string().optional(),
  instagramLink: z.string().optional(),
  profilePhoto: z.string().optional(),
  portfolioPhotos: z.array(z.string()).optional(),
  slug: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export const useProviderProfile = () => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      city: "",
      country: "",
      bio: "",
      specialties: "",
      linkedin: "",
      instagramLink: "",
      profilePhoto: "",
      portfolioPhotos: [],
      slug: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
      const parsed = formSchema.safeParse(data);
      if (parsed.success) {
        Object.entries(parsed.data).forEach(([key, value]) => {
          setValue(key as keyof FormData, value as any);
        });
      } else {
        console.error("Dados inválidos do perfil:", parsed.error);
      }

      }
    };
    fetchProfile();
  }, [setValue]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("photos", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setValue("profilePhoto", data.urls[0]);
  };

  const handlePortfolioUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("photos", file));
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setValue("portfolioPhotos", data.urls);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const res = await fetch("/api/auth/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    alert(res.ok ? "Perfil atualizado com sucesso" : "Erro ao atualizar perfil");
    setLoading(false);
  };

  const handleDelete = async (onSuccess?: () => void) => {
    if (!confirm("Tem certeza que deseja deletar sua conta?")) return;
    const res = await fetch("/api/auth/delete", {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      alert("Conta deletada");
      onSuccess?.();
    } else {
      alert("Erro ao deletar conta");
    }
  };

  const handleCopyLink = (slug: string) => {
    const publicLink = `${window.location.origin}/profile/${slug}`;
    navigator.clipboard.writeText(publicLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    loading,
    copied,
    handlePhotoUpload,
    handlePortfolioUpload,
    onSubmit,
    handleDelete,
    handleCopyLink,
  };
};
