"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "@/app/components/authentication/shared/GoogleButton";
import FormInput from "@/app/components/authentication/shared/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "@/app/lib/validations/authSchema";

interface RegisterFormProps {
  role: "USER" | "PROVIDER";
  onSuccessRedirect?: string;
}

export default function RegisterForm({
  role,
  onSuccessRedirect = "/login/prestadordeservico_usuario",
}: RegisterFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (form: RegisterSchema) => {
    setLoading(true);
    setMessage(null);

    const endpoint =
      role === "PROVIDER"
        ? "/api/auth/register/registerProvider"
        : "/api/auth/register/registerUser";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: "Conta criada com sucesso!", type: "success" }); 

        setTimeout(() => {
          router.push(onSuccessRedirect);
        }, 500); 
      } else {
        setMessage({ text: data.error || "Erro ao criar a conta.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Erro inesperado.", type: "error" }); 
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-section">
      <h2 className="form-title">
        Criar Conta de {role === "PROVIDER" ? "Prestador" : "Usuário"}
      </h2>

      <div className="space-y-5">
        {message && ( 
          <div
            className={`p-3 rounded-lg text-center ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
            role="status"
          >
            {message.text}
          </div>
        )}

        <FormInput
          label="Nome completo"
          placeholder="Seu nome"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-red-600 -mt-2">{errors.name.message}</p>
        )}

        <FormInput
          label="Email"
          placeholder="seu@email.com"
          type="email"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-600 -mt-2">{errors.email.message}</p>
        )}

        <FormInput
          label="Senha"
          placeholder="Crie uma senha"
          type="password"
          autoComplete="new-password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-600 -mt-2">{errors.password.message}</p>
        )}

        <FormInput
          label="Confirmar senha"
          placeholder="Confirme sua senha"
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 -mt-2">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#1E293B] text-white rounded-lg text-sm font-semibold hover:bg-[#334155] transition-all duration-300"
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>

        <div className="form-divider">
          <span>ou</span>
        </div>

        <GoogleSignInButton role={role} />
      </div>
    </form>
  );
}
