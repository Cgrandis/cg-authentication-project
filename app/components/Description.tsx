"use client";

import CardTechs from "@/app/components/ui/CardTechs";

export default function Description() {
  return (
    <section className="w-full bg-[#F9FAFB] py-5 px-6 md:px-0">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Card: Sobre Mim */}
        <div className="bg-white p-10 md:p-14 border border-gray-200">
          <h2 className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-6">
            Sobre Mim
          </h2>
          <p className="text-md text-gray-700 leading-relaxed">
            Sou desenvolvedor full stack especializado em <strong>Next.js</strong>, com foco em criar aplicações
            modernas, responsivas e de alta performance. Tenho ampla experiência em transformar
            ideias em soluções digitais eficientes, utilizando todo o potencial do ecossistema
            React para entregar interfaces ricas e funcionais.
          </p>
          <p className="text-md text-gray-700 leading-relaxed mt-4">
            Minha abordagem combina <strong>tecnologia de ponta</strong> com <strong>inteligência artificial</strong>, aplicando
            automações e recursos avançados para resolver desafios reais com agilidade e precisão.
            Busco entender profundamente a necessidade de cada cliente para desenvolver soluções
            personalizadas, escaláveis e orientadas a resultados.
          </p>
          <p className="text-md text-gray-700 leading-relaxed mt-4">
            Acredito que as possibilidades de desenvolvimento são ilimitadas — meu objetivo é
            construir experiências digitais que sejam <strong>inteligentes</strong>, <strong>rápidas</strong> e <strong>impactantes</strong>,
            contribuindo diretamente para o crescimento e sucesso dos negócios dos meus clientes.
          </p>
        </div>

        {/* Card: Techs */}
        <div className="bg-white shadow-xl rounded-2xl p-10 md:p-14 border border-gray-200">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Techs
        </h2>
        <CardTechs />
        </div>

      </div>
    </section>
  );
}
