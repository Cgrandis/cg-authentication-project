"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";

const AdminDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          router.push("/login/administrador");
        } else {
          setLoading(false);
        }
      } catch (error) {
        router.push("/login/administrador");
      }
    };

    verifyAdmin();
  }, [router]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <Header />
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>
        <p>Bem-vindo ao painel do administrador!</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
