"use client";

export default function AboutMe() {
  return (
    <section className="w-full bg-white dark:bg-gray-950 py-16 px-6 md:px-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
          Sobre Mim
        </h2>

        <div className="space-y-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
          <p>
            Sou <strong className="text-gray-900 dark:text-white">Carlos Grandis</strong>, desenvolvedor full stack com foco em aplicações modernas utilizando{" "}
            <span className="font-semibold text-black dark:text-white">Next.js</span>. Minha formação em automação e logística, combinada com uma transição sólida para o desenvolvimento de software, me proporciona uma visão estratégica e orientada à entrega de soluções digitais robustas, eficientes e escaláveis.
          </p>

          <p>
            Atuo com ênfase em <strong className="text-gray-900 dark:text-white">tecnologias de ponta</strong>, explorando o ecossistema React aliado a práticas modernas como Server Components, data fetching assíncrono e integração com APIs, para construir experiências digitais de alta performance, tanto no frontend quanto no backend.
          </p>

          <p>
            Minha base técnica inclui JavaScript (Node.js, React, Next.js), testes automatizados com Jest e Supertest, integração com bancos de dados relacionais (PostgreSQL, Supabase), além de práticas sólidas com TypeScript, Tailwind CSS, princípios ágeis e CI/CD em ambientes como Vercel e Netlify.
          </p>

          <p>
            Antes de ingressar na área de tecnologia, atuei como <strong className="text-gray-900 dark:text-white">Gerente de Automação</strong> em uma operação multinacional de logística, liderando equipes e implementando sistemas robotizados de alta complexidade. Essa experiência reforçou em mim três pilares fundamentais para qualquer desafio técnico: <span className="italic">comprometimento, foco e lealdade</span>.
          </p>

          <p>
            Hoje, meu objetivo é contribuir com projetos que exijam <strong className="text-gray-900 dark:text-white">qualidade técnica, visão de produto e responsabilidade com entregas</strong>. Estou aberto a colaborações freelancers ou oportunidades contínuas, com especial interesse em atuar em equipes que valorizam inovação, excelência em código e impacto real no negócio.
          </p>

          <p>
            Busco constantemente unir minha experiência em processos inteligentes com o potencial da inteligência artificial e automações web, agregando valor por meio de soluções que realmente fazem a diferença.
          </p>

          <p className="border-l-4 border-blue-600 dark:border-blue-400 pl-4 italic text-gray-800 dark:text-gray-200">
            “Transformar ideias em aplicações inteligentes, rápidas e impactantes — é esse o compromisso que assumo em cada linha de código que escrevo.”
          </p>
        </div>
      </div>
    </section>
  );
}
