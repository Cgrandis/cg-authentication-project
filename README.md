### Projeto de Autenticação e Portfólio com Next.js

    Este repositório apresenta uma aplicação web robusta, desenvolvida com Next.js, que serve como um portfólio demonstrativo de minhas habilidades em desenvolvimento Full Stack. O projeto integra um sistema de autenticação complexo com múltiplos perfis de usuário e diversas funcionalidades de gerenciamento de dados e interação.

### ✨ Visão Geral do Projeto

    O objetivo principal deste projeto é demonstrar proficiência na construção de aplicações Next.js de ponta a ponta, incluindo autenticação, roteamento, consumo de API, gerenciamento de estado e persistência de dados. A aplicação foi concebida com um sistema de autenticação de três níveis, cada um com dashboards e funcionalidades específicas.

# Papéis de Usuário:

    • Administrador (Admin): Gerencia usuários, prestadores de serviço e conteúdos da plataforma, como descrições de tecnologias. 
    • Prestador de Serviço (Provider): Oferece e gerencia seus próprios serviços, além de poder personalizar seu perfil público. 
    • Usuário (User): Acessa e agenda serviços oferecidos pelos prestadores. 

    🚀 Funcionalidades Principais

    • Autenticação Completa: 

        ◦ Fluxos de login e registro para usuários, prestadores de serviço e administradores. 
        ◦ Integração com NextAuth.js para gerenciamento seguro de sessões e autenticação via credenciais ou Google Auth. 
        ◦ Criação de administradores restrita a usuários autenticados, enquanto o registro de prestadores e usuários é público. 

    • Controle de Acesso Baseado em Papéis (RBAC):    

        ◦ Middleware para proteção de rotas, garantindo que apenas usuários com o devido nível de acesso possam acessar determinadas páginas. 
        ◦ Redirecionamento automático após o login para o dashboard correspondente (/admin/dashboard, /provider/dashboard, /user/agenda). 

    • Gerenciamento de Perfil (Prestador de Serviço): 

        ◦ Páginas dedicadas para que prestadores editem seus dados de perfil, incluindo         informações de contato, biografia, especialidades e links para redes sociais. 
        ◦ Funcionalidade de upload de foto de perfil e múltiplas fotos para um portfólio de serviços, com armazenamento local (/public/uploads). 
        ◦ Geração de links públicos para perfis de prestadores de serviço, exibindo suas informações e portfólio./page.tsx, uploaded:cgrandis/cg-authentication-project/cg-authentication-project-0df5c179dc5dfdbaec03480fae38e6cd79093b29/app/components/authentication/profile/PublicProfileCard.tsx

    • Gerenciamento de Serviços (Prestador de Serviço): 

        ◦ Adição, edição e exclusão de serviços, incluindo título, descrição, duração, fotos e disponibilidade./route.ts
        ◦ Seleção de disponibilidade de serviços (fins de semana, dias da semana e intervalos de datas personalizados). 

    • Dashboard Administrativo: 

        ◦ Visualização de estatísticas do sistema (total de usuários, prestadores e serviços). 
        ◦ Gerenciamento de descrições de tecnologias exibidas na página inicial, permitindo adicionar, editar e excluir textos dinamicamente. 

    • Portfólio Dinâmico: 

        ◦ A página principal do portfólio demonstra diferentes seções e componentes, como uma seção de câmbio de moedas (integrando uma API externa). 

### 🛠️ Tecnologias Utilizadas

    O projeto foi construído utilizando as seguintes tecnologias:

    • Next.js 15.3.2: Framework React para renderização do lado do servidor (SSR) e geração de sites estáticos (SSG). 

    • React: Biblioteca JavaScript para construção de interfaces de usuário. 

    • TypeScript: Superconjunto tipado do JavaScript para maior robustez e manutenibilidade. 

    • NextAuth.js: Solução completa de autenticação para Next.js. 

    • Prisma ORM: ORM moderno para Node.js e TypeScript, facilitando a interação com o banco de dados. 

    • PostgreSQL: Sistema de banco de dados relacional robusto. 

    • Tailwind CSS: Framework CSS utilitário para estilização rápida e responsiva. 

    • Zod: Biblioteca de validação de esquemas para garantir a integridade dos dados. 

    • Framer Motion: Biblioteca para animações fluidas na interface do usuário. 

    • SWR: Hook para requisição de dados em React, garantindo cache e revalidação. 

    • Upstash Redis: Para gerenciamento de rate limiting em rotas de API. 

    • bcrypt: Para hashing seguro de senhas. 

    • file-type: Para detecção de tipos de arquivo. 

    • react-phone-input-2: Componente para entrada de números de telefone com formatação. 

    • react-datepicker: Componente para seleção de datas. 

## 📁 Estrutura do Projeto
    O projeto segue a estrutura padrão do Next.js App Router, com as seguintes pastas chave:

    • app/: Contém as rotas da aplicação, incluindo as páginas de autenticação (/login, /register), dashboards (/admin, /provider, /user) e o portfólio (/portfolio). As API Routes estão em app/api. 

    • app/api/: Direto do Next.js, contém as rotas de API para o backend da aplicação, incluindo endpoints para autenticação, gerenciamento de usuários, serviços e upload de arquivos./route.ts, uploaded:cgrandis/cg-authentication-project/cg-authentication-project-0df5c179dc5dfdbaec03480fae38e6cd79093b29/app/api/services/create/route.ts, uploaded:cgrandis/cg-authentication-project/
    cg-authentication-project-0df5c179dc5dfdbaec03480fae38e6cd79093b29/app/api/techs/route.ts, uploaded:cgrandis/cg-authentication-project/cg-authentication-project-0df5c179dc5dfdbaec03480fae38e6cd79093b29/app/api/upload/route.ts

    • app/auth/: Componentes e configurações relacionados à autenticação, como o AuthProvider do NextAuth.js e a lógica de redirecionamento por role. 

    • app/components/: Componentes reutilizáveis, organizados por funcionalidade (autenticação, landing page, portfólio). 

    • app/hooks/: Custom hooks para encapsular lógicas complexas e reutilizáveis (e.g., useLoginForm, useLogout, useExchangeRates). 

    • app/lib/: Arquivos de utilidade e validações (e.g., authSchema.ts para validação com Zod).

    • app/services/: Camada de serviço para abstrair chamadas de API (e.g., authService.ts). 

    • app/types/: Definições de tipos TypeScript e interfaces. 

    • lib/prisma.ts: Configuração e instância do Prisma Client para conexão com o banco de dados. 

    • middleware.ts: Lógica de middleware do Next.js para proteção de rotas e rate limiting. 

    • public/: Ativos estáticos, incluindo uma pasta uploads para fotos de perfil e portfólio.

## ⚙️ Instalação e Execução Local

    Siga estas instruções para configurar e executar o projeto em sua máquina local.
    Pré-requisitos

    Certifique-se de ter o Node.js (versão 18.18 ou superior) e o npm instalados.
    Passos

    1. Clone o repositório:

      ``` Bash
       git clone https://github.com/Cgrandis/cg-authentication-project.git
       cd cg-authentication-project
```

    2. Instale as dependências:

       ```Bash
       npm install
```

    3. Configure o arquivo .env: Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

       Fragmento do código

       DATABASE_URL="postgresql://[USUARIO]:[SENHA]@localhost:5432/[SEU_BANCO_DE_DADOS]?schema=public"
       NEXTAUTH_SECRET="SUA_CHAVE_SECRETA_PARA_NEXTAUTH"
       NEXT_PUBLIC_EXCHANGE_API_KEY="SUA_CHAVE_API_EXCHANGE_RATE" # Opcional, para o componente de câmbio
       GOOGLE_CLIENT_ID="SEU_ID_CLIENTE_GOOGLE" # Opcional, para Google Auth
       GOOGLE_CLIENT_SECRET="SEU_SECRET_CLIENTE_GOOGLE" # Opcional, para Google Auth
       UPSTASH_REDIS_REST_URL="SUA_URL_REDIS_UPSTASH" # Opcional, para Rate Limit
       UPSTASH_REDIS_REST_TOKEN="SEU_TOKEN_REDIS_UPSTASH" # Opcional, para Rate Limit

        ◦ Substitua [USUARIO], [SENHA], [SEU_BANCO_DE_DADOS] com as credenciais do seu PostgreSQL. 

        ◦ Gere uma string longa e aleatória para NEXTAUTH_SECRET (pode usar openssl rand -base64 32). 

        ◦ As chaves NEXT_PUBLIC_EXCHANGE_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN são opcionais e necessárias apenas se você quiser habilitar as funcionalidades correspondentes (câmbio de moedas, login com Google, e rate limiting com Upstash). 

    4. Execute as migrações do Prisma: Isso criará as tabelas necessárias no seu banco de dados.
       
       ``` Bash
       npx prisma migrate dev --name init
```
    5. Crie a pasta para uploads (se não existir): As fotos de perfil e portfólio são salvas localmente.

      ``` Bash
       mkdir -p public/uploads
```
    6. Rode o servidor de desenvolvimento:

       ``` Bash
       npm run dev
```
       A aplicação estará disponível em http://localhost:3000.

## 🛡️ Rotas Protegidas

    As seguintes rotas são protegidas por middleware, exigindo autenticação e o papel de usuário correspondente:

        Rota	Nível de Acesso
            /admin/dashboard	Administrador
            /admin/techsdescription	Administrador
            /provider/dashboard	Prestador de Serviço
            /provider/addservice	Prestador de Serviço
            /provider/profile	Prestador de Serviço
            /provider/service/[id]	Prestador de Serviço
            /user/agenda	Usuário
            /register/administrador	Administrador (requer login de Admin para criar)


## 📄 Licença

    Este projeto está sob a licença MIT.
