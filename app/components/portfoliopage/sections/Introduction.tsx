"use client";

import BaseSection from "../shared/BaseSection";

export default function Introduction() {
  return (
    <BaseSection title="Introdução" className="bg-white dark:bg-black text-gray-800 dark:text-white">
      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        Este portfólio apresenta uma aplicação web moderna com autenticação completa usando <strong>Next.js</strong>, <strong>NextAuth.js</strong> e integração com <strong>Google Auth</strong>.
      </p>

      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mt-4">
        O sistema permite <strong>registro</strong>, <strong>login</strong>, atualização de perfil, e acesso a interfaces responsivas para diferentes papéis de usuário.
      </p>

      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mt-4">
        A stack combina <strong>TypeScript</strong>, <strong>PostgreSQL</strong>, <strong>Prisma ORM</strong> e <strong>Node.js</strong> com foco em boas práticas, performance e escalabilidade.
      </p>
    </BaseSection>
  );
}