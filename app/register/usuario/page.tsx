"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterUser = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
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
      const response = await fetch("/api/auth/register/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Usuário criado com sucesso!");
        router.push("/login/prestadordeservico_usuario");
      } else {
        alert("Erro ao criar Usuário.");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-1/3 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-5">Registrar Usuário</h2>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="w-full p-2 mb-3 border rounded"
          value={form.name}
          onChange={handleChange}
          required
        />

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
          className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          {loading ? "Carregando..." : "Registrar Usuário"}
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
