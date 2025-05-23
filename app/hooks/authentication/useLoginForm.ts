"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { loginSchema, LoginSchema } from "@/app/lib/validations/authSchema";

export function useLoginForm(onSuccessRedirect: string = "/") {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

const onSubmit = async (data: LoginSchema) => {
  setLoading(true);
  try {
   const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!res || res.error) {
      throw new Error(res?.error || "Credenciais inválidas");
    }

    if (res?.ok) {
      router.push("/auth/redirect-by-role");
    } else {
      throw new Error("Credenciais inválidas");
    }
  } catch (error: any) {
    alert(error.message || "Erro ao fazer login.");
    console.error("Erro:", error);
  } finally {
    setLoading(false);
  }
};

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/auth/redirect-by-role" });
  };

  return {
    register,
    handleSubmit,
    errors,
    loading,
    onSubmit,
    handleGoogleLogin,
  };
}
