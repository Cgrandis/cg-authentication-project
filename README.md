Autentication Portfolio project.

Este é um projeto de autenticação desenvolvido com Next.js 15.3.2, Prisma, PostgreSQL, e TailwindCSS. O foco principal do projeto é a implementação de um sistema de autenticação com diferentes níveis de acesso:

Administrador (Admin) → Gerencia usuários e serviços.

Prestador de Serviço (Provider) → Gerencia seus serviços e agendamentos.

Usuário (User) → Acessa a agenda de serviços e faz agendamentos.

🚀 Funcionalidades Implementadas:

✅ Autenticação Completa:

Login para os três tipos de usuários.

Criação de Administrador restrita a usuários autenticados.

Criação de Prestador de Serviço e Usuário aberta ao público.

Middleware para proteção de rotas baseado no tipo de usuário.

✅ Redirecionamento Automático:

Ao fazer login, o usuário é redirecionado para o dashboard correspondente:

Admin → /admin/dashboard

Provider → /provider/dashboard

User → /user/agenda

✅ Logout Completo:

Remoção do token do navegador e redirecionamento para a página de login.

✅ Interface de Dashboard:

Header reutilizável com botão de Logout.

Páginas de Dashboard para cada tipo de usuário.

⚙️ Instalação:

1️⃣ Clone o repositório:

$ git clone https://github.com/seuusuario/cg-authentication-project.git
$ cd cg-authentication-project

2️⃣ Instale as dependências:

$ npm install

3️⃣ Configure o arquivo .env:

DATABASE_URL=postgresql://user:password@localhost:5432/cg_auth_project_db
JWT_SECRET=sua_chave_secreta

4️⃣ Execute as migrações do Prisma:

$ npx prisma migrate dev

5️⃣ Rode o servidor:

$ npm run dev

Acesse em: http://localhost:3000

🛡️ Rotas Protegidas:

Rota

Nível de Acesso

/admin/dashboard

Administrador

/provider/dashboard

Prestador de Serviço

/user/agenda

Usuário


📄 Licença:

Este projeto está sob a licença MIT.

