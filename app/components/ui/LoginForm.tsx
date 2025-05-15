"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

interface LoginFormProps {
  onSuccessRedirect?: string;
}

export default function LoginForm({ onSuccessRedirect = "/" }: LoginFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
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
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (res?.ok) {
        const session = await getSession();
        const role = session?.user?.role;

        if (role === "PROVIDER") {
          router.push("/provider/dashboard");
        } else if (role === "USER") {
          router.push("/user/agenda");
        } else if (role === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push(onSuccessRedirect);
        }
      } else {
        alert("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    
    signIn("google", { callbackUrl: "/auth/redirect-by-role" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-10 bg-white rounded-2xl shadow-2xl border border-gray-100"
    >
      <h2 className="text-4xl font-semibold text-center text-[#1E293B] mb-8">
        Bem-vindo de volta
      </h2>

      <div className="space-y-5">
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
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="relative text-center text-gray-400 text-sm my-2">
          <span className="bg-white px-2 z-10 relative">ou</span>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-px bg-gray-200"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
        >
          <FcGoogle size={22} />
          <span className="text-gray-700 text-sm font-medium">
            Entrar com Google
          </span>
        </button>
      </div>
    </form>
  );
}
