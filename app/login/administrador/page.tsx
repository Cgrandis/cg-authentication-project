"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

const LoginAdmin = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (result?.ok) {
      try {
        const res = await fetch("/api/auth/me");
        const user = await res.json();

        if (user?.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          setError("Apenas administradores têm acesso.");
        }
      } catch (err) {
        console.error("Erro ao verificar role:", err);
        setError("Erro ao verificar role do usuário.");
      }
    } else {
      setError("Email ou senha inválidos.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-10 bg-white rounded-2xl shadow-2xl border border-gray-100"
      >
        <h2 className="text-4xl font-semibold text-center text-[#1E293B] mb-8">
          Acesso Administrativo
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@email.com"
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
              placeholder="Sua senha"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#1E293B] text-white rounded-lg text-sm font-semibold hover:bg-[#334155] transition-all duration-300"
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginAdmin;
