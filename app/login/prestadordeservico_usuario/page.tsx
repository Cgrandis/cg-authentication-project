"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginProviderUser = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const role = data.role;

        document.cookie = `token=${token}; Path=/`;

        if (role === "PROVIDER") {
          router.push("/provider/dashboard");
        } else if (role === "USER") {
          router.push("/user/agenda");
        } else {
          alert("Tipo de usuário inválido");
        }
      } else {
        alert("Login ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-1/3 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-5">Login - Prestador de Serviço / Usuário</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Senha"
          className="w-full p-2 mb-5 border rounded"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "Carregando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default LoginProviderUser;
