"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginAdmin = () => {
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
        body: JSON.stringify({ ...form, role: "ADMIN" }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        router.push("/admin/dashboard");
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
        <h2 className="text-2xl font-bold mb-5">Login - Administrador</h2>

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
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Carregando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default LoginAdmin;
