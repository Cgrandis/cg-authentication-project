"use client";

export default function Introduction() {
  return (
    <section className="w-full px-6 py-6 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 inline-block">
          Introdução
        </h1>

        <p className="text-lg leading-relaxed text-gray-700">
          Este portfólio apresenta uma aplicação web moderna que demonstra, na prática, a implementação de um sistema completo de autenticação com{" "}
          <strong className="text-gray-900">Next.js</strong>, utilizando{" "}
          <strong className="text-gray-900">NextAuth.js</strong> integrado ao{" "}
          <strong className="text-gray-900">Google Auth</strong> e autenticação por email/senha. A aplicação foi cuidadosamente projetada para
          contemplar três níveis distintos de usuários: <em>administradores</em>, <em>prestadores de serviço</em> e <em>clientes</em> que desejam contratar serviços.
        </p>

        <p className="text-lg leading-relaxed text-gray-700 mt-4">
          O sistema inclui fluxos completos de <strong>registro</strong> e <strong>login</strong>, com validação segura e integração direta com a API do Google.
          Além disso, o usuário tem acesso a um formulário de atualização de perfil, onde pode editar informações como cidade, país, especialidades e dados de contato,
          além de visualizar perfis públicos em uma interface limpa e responsiva.
        </p>

        <p className="text-lg leading-relaxed text-gray-700 mt-4">
          A stack utilizada combina <strong>Next.js</strong> com <strong>TypeScript</strong> para tipagem estática, <strong>Prisma ORM</strong> com{" "}
          <strong>PostgreSQL</strong> para persistência de dados, e <strong>Node.js</strong> no backend, garantindo escalabilidade, performance e segurança. 
          Tudo foi construído com foco em boas práticas, separação de responsabilidades e experiência do usuário.
        </p>

        <p className="text-lg leading-relaxed text-gray-700 mt-4">
          Esta aplicação é um exemplo vivo e funcional de como criar um sistema de autenticação robusto e adaptável, pronto para ser aplicado em 
          ambientes reais que exigem controle de acesso baseado em papéis e uma gestão eficiente de usuários e dados.
        </p>
      </div>
    </section>
  );
}
