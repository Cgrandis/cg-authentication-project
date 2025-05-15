"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import GoogleSignInButton from "@/app/components/ui/GoogleButton";

interface RegisterFormProps {
  role: "USER" | "PROVIDER";
  onSuccessRedirect?: string;
}

export default function RegisterForm({
  role,
  onSuccessRedirect = "/login/prestadordeservico_usuario",
}: RegisterFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    setLoading(true);

    const endpoint =
      role === "PROVIDER"
        ? "/api/auth/register/registerProvider"
        : "/api/auth/register/registerUser";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Conta criada com sucesso!");
        router.push(onSuccessRedirect);
      } else {
        alert(data.error || "Erro ao criar a conta.");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl p-10 bg-white rounded-2xl shadow-2xl border border-gray-100 space-y-6"
    >
      <h2 className="text-4xl font-semibold text-center text-[#1E293B]">
        Criar Conta de {role === "PROVIDER" ? "Prestador" : "Usuário"}
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block mb-1 text-sm text-gray-700 font-medium">
            Nome completo
          </label>
          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            className="w-full px-4 py-3 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="seu@email.com"
            className="w-full px-4 py-3 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="relative">
          <label className="block mb-1 text-sm text-gray-700 font-medium">
            Senha
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Crie uma senha"
            className="w-full px-4 py-3 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-700 transition"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <label className="block mb-1 text-sm text-gray-700 font-medium">
            Confirmar senha
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirme sua senha"
            className="w-full px-4 py-3 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-700 transition"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#1E293B] text-white rounded-lg text-sm font-semibold hover:bg-[#334155] transition-all duration-300"
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>

        <div className="relative text-center text-gray-400 text-sm">
          <span className="bg-white px-2 z-10 relative">ou</span>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-px bg-gray-200"></div>
        </div>

        <GoogleSignInButton role={role} />
      </div>
    </form>
  );
}
