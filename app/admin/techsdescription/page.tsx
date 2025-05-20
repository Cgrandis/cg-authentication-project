"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import { TechDescription } from "@/types/interfaces";

export default function TechsDescriptionPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [techs, setTechs] = useState<TechDescription[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) return router.push("/login/administrador");

        const user = await res.json();
        if (user.role !== "ADMIN") return router.push("/login/administrador");

        setAuthorized(true);
        fetchTechs();
      } catch (err) {
        console.error("Erro ao verificar autenticação", err);
        router.push("/login/administrador");
      }
    };

    const fetchTechs = async () => {
      try {
        const res = await fetch("/api/techs");
        const data = await res.json();
        setTechs(data);
      } catch (error) {
        console.error("Erro ao carregar techs:", error);
      }
    };

    checkRole();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/techs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        setTitle("");
        setDescription("");
        const data = await res.json();
        setTechs(prev => [data, ...prev]);
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/techs/${id}`, { method: "DELETE" });
      if (res.ok) setTechs(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const startEditing = (tech: TechDescription) => {
    setEditingId(tech.id);
    setEditTitle(tech.title);
    setEditDescription(tech.description);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveEdit = async () => {
    if (!editingId) return;

    try {
      const res = await fetch(`/api/techs/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
      });

      if (res.ok) {
        setTechs(prev =>
          prev.map(t =>
            t.id === editingId ? { ...t, title: editTitle, description: editDescription } : t
          )
        );
        cancelEditing();
      }
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  if (!authorized) return null;

  return (
    <div>
      <Header />
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-6">Cadastrar Texto sobre Tech</h1>
        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={5}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-4">Techs cadastradas</h2>
        <ul className="space-y-4">
          {techs.map((tech) => (
            <li
              key={tech.id}
              className="bg-white shadow border rounded-md p-4"
            >
              {editingId === tech.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={3}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {tech.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {tech.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(tech)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(tech.id)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}