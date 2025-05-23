"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/authentication/utils/Header";

const UserAgenda = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          router.push("/login/prestadordeservico_usuario");
        } else {
          setLoading(false);
        }
      } catch (error) {
        router.push("/login/prestadordeservico_usuario");
      }
    };

    verifyUser();
  }, [router]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
        <Header />
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-5">Agenda do Usuário</h1>
        <p>Bem-vindo à sua agenda!</p>
      </div>
    </div>
  );
};

export default UserAgenda;
