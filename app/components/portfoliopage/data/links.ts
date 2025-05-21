export type PortfolioLink = {
  title: string;
  description: string;
  href: string;
};

export const portfolioLinks: PortfolioLink[] = [
  {
    title: "Registre-se como Prestador de Serviço",
    description: "Permite o cadastro de profissionais que desejam oferecer seus serviços na plataforma.",
    href: "/register/prestadordeservico",
  },
  {
    title: "Registre-se como Usuário",
    description: "Permite o cadastro de usuários que desejam contratar serviços disponíveis na plataforma.",
    href: "/register/usuario",
  },
  {
    title: "Login de Usuário ou Prestador de Serviço",
    description: "Permite o acesso de usuários cadastrados, tanto contratantes quanto prestadores.",
    href: "/login/prestadordeservico_usuario",
  },
];
