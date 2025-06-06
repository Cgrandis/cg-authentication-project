# **Projeto de Autenticação e Portfólio com Next.js**

Este repositório apresenta uma aplicação web robusta, desenvolvida com **Next.js**, que serve como um portfólio demonstrativo de minhas habilidades em desenvolvimento Full Stack. O projeto integra um sistema de autenticação complexo com múltiplos perfis de usuário e diversas funcionalidades de gerenciamento de dados e interação.

## **✨ Visão Geral do Projeto**

O objetivo principal deste projeto é demonstrar proficiência na construção de aplicações Next.js de ponta a ponta, incluindo autenticação, roteamento, consumo de API, gerenciamento de estado e persistência de dados. A aplicação foi concebida com um sistema de autenticação de três níveis, cada um com dashboards e funcionalidades específicas.

### **Papéis de Usuário:**

* **Administrador (Admin)**: Gerencia usuários, prestadores de serviço e conteúdos da plataforma, como descrições de tecnologias.  
* **Prestador de Serviço (Provider)**: Oferece e gerencia seus próprios serviços, além de poder personalizar seu perfil público.  
* **Usuário (User)**: Acessa e agenda serviços oferecidos pelos prestadores.

## **🚀 Funcionalidades Principais**

* **Autenticação Completa**:  
  * Fluxos de login e registro para usuários, prestadores de serviço e administradores.  
  * Integração com **NextAuth.js** para gerenciamento seguro de sessões e autenticação via credenciais ou **Google Auth**.  
  * Criação de administradores restrita a usuários autenticados, enquanto o registro de prestadores e usuários é público.  
  * **Melhoria**: A rota de registro de usuário agora verifica se o e-mail já está em uso, garantindo a unicidade dos cadastros.  
* **Controle de Acesso Baseado em Papéis (RBAC)**:  
  * Middleware para proteção de rotas, garantindo que apenas usuários com o devido nível de acesso possam acessar determinadas páginas.  
  * Redirecionamento automático após o login para o dashboard correspondente (/admin/dashboard, /provider/dashboard, /user/agenda).  
* **Gerenciamento de Perfil (Prestador de Serviço)**:  
  * Páginas dedicadas para que prestadores editem seus dados de perfil, incluindo informações de contato, biografia, especialidades e links para redes sociais.  
  * Funcionalidade de upload de foto de perfil e múltiplas fotos para um portfólio de serviços, com armazenamento local (/public/uploads).  
  * Geração de links públicos para perfis de prestadores de serviço, exibindo suas informações e portfólio.  
* **Gerenciamento de Serviços (Prestador de Serviço)**:  
  * Adição, edição e exclusão de serviços, incluindo título, descrição, duração, fotos e disponibilidade.  
  * Seleção de disponibilidade de serviços (fins de semana, dias da semana e intervalos de datas personalizados).  
* **Dashboard Administrativo**:  
  * Visualização de estatísticas do sistema (total de usuários, prestadores e serviços).  
  * Gerenciamento de descrições de tecnologias exibidas na página inicial, permitindo adicionar, editar e excluir textos dinamicamente.  
* **Portfólio Dinâmico**:  
  * A página principal do portfólio demonstra diferentes seções e componentes, como uma seção de câmbio de moedas (integrando uma API externa).  
* **Feedback Visual Aprimorado**:  
  * Substituição dos alert() nativos por mensagens de feedback integradas à UI, melhorando a experiência do usuário e a testabilidade.

## **🛠️ Tecnologias Utilizadas**

O projeto foi construído utilizando as seguintes tecnologias:

* **Next.js 15.3.2**: Framework React para renderização do lado do servidor (SSR) e geração de sites estáticos (SSG).  
* **React**: Biblioteca JavaScript para construção de interfaces de usuário.  
* **TypeScript**: Superconjunto tipado do JavaScript para maior robustez e manutenibilidade.  
* **NextAuth.js**: Solução completa de autenticação para Next.js.  
* **Prisma ORM**: ORM moderno para Node.js e TypeScript, facilitando a interação com o banco de dados.  
* **PostgreSQL**: Sistema de banco de dados relacional robusto.  
* **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.  
* **Zod**: Biblioteca de validação de esquemas para garantir a integridade dos dados.  
* **Framer Motion**: Biblioteca para animações fluidas na interface do usuário.  
* **SWR**: Hook para requisição de dados em React, garantindo cache e revalidação.  
* **Upstash Redis**: Para gerenciamento de rate limiting em rotas de API.  
* **bcrypt**: Para hashing seguro de senhas.  
* **file-type**: Para detecção de tipos de arquivo.  
* **react-phone-input-2**: Componente para entrada de números de telefone com formatação.  
* **react-datepicker**: Componente para seleção de datas.  
* **Jest & React Testing Library**: Para testes unitários e de integração de componentes e hooks.  
* **Playwright**: Para testes End-to-End (E2E), simulando interações de usuário em navegadores reais.

## **📁 Estrutura do Projeto**

O projeto segue a estrutura padrão do Next.js App Router, com as seguintes pastas chave:

* **app/**: Contém as rotas da aplicação, incluindo as páginas de autenticação (/login, /register), dashboards (/admin, /provider, /user) e o portfólio (/portfolio). As API Routes estão em app/api.  
* **app/api/**: Direto do Next.js, contém as rotas de API para o backend da aplicação, incluindo endpoints para autenticação, gerenciamento de usuários, serviços e upload de arquivos.  
* **app/auth/**: Componentes e configurações relacionados à autenticação, como o AuthProvider do NextAuth.js e a lógica de redirecionamento por role.  
* **app/components/**: Componentes reutilizáveis, organizados por funcionalidade (autenticação, landing page, portfólio).  
* **app/hooks/**: Custom hooks para encapsular lógicas complexas e reutilizáveis (e.g., useLoginForm, useLogout, useExchangeRates).  
* **app/lib/**: Arquivos de utilidade e validações (e.g., authSchema.ts para validação com Zod).  
* **app/services/**: Camada de serviço para abstrair chamadas de API (e.g., authService.ts).  
* **app/types/**: Definições de tipos TypeScript e interfaces.  
* **lib/prisma.ts**: Configuração e instância do Prisma Client para conexão com o banco de dados.  
* **middleware.ts**: Lógica de middleware do Next.js para proteção de rotas e rate limiting.  
* **public/**: Ativos estáticos, incluindo uma pasta uploads para fotos de perfil e portfólio.  
* **e2e/**: Contém os testes End-to-End usando Playwright.  
* **\_\_tests\_\_/ ou pastas .test.ts/.tsx**: Para testes unitários e de integração.

## **⚙️ Instalação e Execução Local**

Siga estas instruções para configurar e executar o projeto em sua máquina local.

### **Pré-requisitos**

Certifique-se de ter o Node.js (versão 18.18 ou superior) e o npm instalados.

### **Passos**

1. **Clone o repositório:**  
   git clone https://github.com/Cgrandis/cg-authentication-project.git  
   cd cg-authentication-project

2. **Instale as dependências:**  
   npm install

3. Configure o arquivo .env:  
   Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:  
   DATABASE\_URL="postgresql://\[USUARIO\]:\[SENHA\]@localhost:5432/\[SEU\_BANCO\_DE\_DADOS\]?schema=public"  
   NEXTAUTH\_SECRET="SUA\_CHAVE\_SECRETA\_PARA\_NEXTAUTH"  
   NEXT\_PUBLIC\_EXCHANGE\_API\_KEY="SUA\_CHAVE\_API\_EXCHANGE\_RATE" \# Opcional, para o componente de câmbio  
   GOOGLE\_CLIENT\_ID="SEU\_ID\_CLIENTE\_GOOGLE" \# Opcional, para Google Auth  
   GOOGLE\_CLIENT\_SECRET="SEU\_SECRET\_CLIENTE\_GOOGLE" \# Opcional, para Google Auth  
   UPSTASH\_REDIS\_REST\_URL="SUA\_URL\_REDIS\_UPSTASH" \# Opcional, para Rate Limit  
   UPSTASH\_REDIS\_REST\_TOKEN="SEU\_TOKEN\_REDIS\_UPSTASH" \# Opcional, para Rate Limit

   * Substitua \[USUARIO\], \[SENHA\], \[SEU\_BANCO\_DE\_DADOS\] com as credenciais do seu PostgreSQL.  
   * Gere uma string longa e aleatória para NEXTAUTH\_SECRET (pode usar openssl rand \-base64 32).  
   * As chaves NEXT\_PUBLIC\_EXCHANGE\_API\_KEY, GOOGLE\_CLIENT\_ID, GOOGLE\_CLIENT\_SECRET, UPSTASH\_REDIS\_REST\_URL e UPSTASH\_REDIS\_REST\_TOKEN são opcionais e necessárias apenas se você quiser habilitar as funcionalidades correspondentes (câmbio de moedas, login com Google, e rate limiting com Upstash).  
4. Execute as migrações do Prisma:  
   Isso criará as tabelas necessárias no seu banco de dados.  
   npx prisma migrate dev \--name init

5. Crie a pasta para uploads (se não existir):  
   As fotos de perfil e portfólio são salvas localmente.  
   mkdir \-p public/uploads

6. **Rode o servidor de desenvolvimento:**  
   npm run dev

   A aplicação estará disponível em http://localhost:3000.

### **Configuração Adicional para Testes E2E (Playwright)**

Para rodar os testes End-to-End, é necessário garantir que o Playwright tenha suas dependências de sistema instaladas e que o servidor de desenvolvimento seja iniciado automaticamente.

1. **Instale as dependências de sistema do Playwright:**  
   sudo npx playwright install-deps

   *Certifique-se de que sudo apt update esteja funcionando sem erros antes de executar este comando.*  
2. Verifique a configuração do playwright.config.ts:  
   Certifique-se de que a seção webServer está configurada para iniciar o servidor de desenvolvimento e que as URLs de base estão corretas. O arquivo já deve ter sido configurado na etapa de solução de erros.  
   // playwright.config.ts  
   // ...  
   webServer: {  
     command: 'npm run dev', // Inicia o servidor de desenvolvimento do Next.js  
     url: 'http://localhost:3000', // URL que o Playwright deve esperar  
     timeout: 120 \* 1000, // Tempo máximo para o servidor iniciar  
     reuseExistingServer: \!process.env.CI, // Reutiliza o servidor se já estiver rodando  
   },  
   // ...

3. **Para evitar problemas com navegadores específicos (como WebKit em certos ambientes Linux), você pode desabilitá-los no playwright.config.ts se necessário:**  
   // playwright.config.ts  
   // ...  
   projects: \[  
     {  
       name: 'chromium',  
       use: { ...devices\['Desktop Chrome'\] },  
     },  
     {  
       name: 'firefox',  
       use: { ...devices\['Desktop Firefox'\] },  
     },  
     // { // Comente ou remova esta seção para desabilitar o WebKit  
     //   name: 'webkit',  
     //   use: { ...devices\['Desktop Safari'\] },  
     // },  
   \],  
   // ...

4. **Execute os testes E2E:**  
   npm run test:e2e

## **🛡️ Rotas Protegidas**

As seguintes rotas são protegidas por middleware, exigindo autenticação e o papel de usuário correspondente:

| Rota | Nível de Acesso |
| :---- | :---- |
| /admin/dashboard | Administrador |
| /admin/techsdescription | Administrador |
| /provider/dashboard | Prestador de Serviço |
| /provider/addservice | Prestador de Serviço |
| /provider/profile | Prestador de Serviço |
| /provider/service/\[id\] | Prestador de Serviço |
| /user/agenda | Usuário |
| /register/administrador | Administrador (requer login de Admin para criar) |

## **📄 Licença**

Este projeto está sob a licença [MIT](http://docs.google.com/LICENSE).