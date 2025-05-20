"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PortfolioLinks() {
  const links = [
    {
      title: "Registre-se como Prestador de Serviço",
      description:
        "Permite o cadastro de profissionais que desejam oferecer seus serviços na plataforma.",
      href: "/register/prestadordeservico",
    },
    {
      title: "Registre-se como Usuário",
      description:
        "Permite o cadastro de usuários que desejam contratar serviços disponíveis na plataforma.",
      href: "/register/usuario",
    },
    {
      title: "Login de Usuário ou Prestador de Serviço",
      description:
        "Permite o acesso de usuários cadastrados, tanto contratantes quanto prestadores.",
      href: "/login/prestadordeservico_usuario",
    },
  ];

  return (
    <section className="w-full px-6 py-6 bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 inline-block">
          Acesse a Aplicação
        </h2>

        <div className="space-y-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:border-black hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-black">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {link.description}
                  </p>
                </div>
                <ArrowRight className="text-black w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
