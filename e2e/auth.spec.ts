import { test, expect } from '@playwright/test';

// Use test.beforeAll para limpar o banco de dados uma vez antes de todos os testes neste arquivo
test.beforeAll(async ({ request }) => {
  // Você precisaria criar um endpoint de API no seu backend para limpar o DB.
  // Exemplo: await request.post('/api/test/reset-db');
  // Por enquanto, vamos apenas garantir que o email seja único.
  // Para um ambiente de CI/CD, é ALTAMENTE recomendado ter um script de limpeza de DB.
  console.log('Iniciando testes E2E. Certifique-se de que seu banco de dados esteja limpo.');
});

test('should allow a user to register and then login', async ({ page }) => {
  // Gera um email único para cada execução de teste
  const uniqueEmail = `joao.teste.${Date.now()}@example.com`;

  // 1. Registro
  await page.goto('http://localhost:3000/register/usuario');
  await expect(page).toHaveTitle(/Create Next App/); // Verifique o título da sua página

  await page.fill('input[name="name"]', 'João Teste');
  await page.fill('input[name="email"]', uniqueEmail); // Usa o email único
  await page.fill('input[name="password"]', 'senhaforte123');
  await page.fill('input[name="confirmPassword"]', 'senhaforte123');

  await page.click('button[type="submit"]');

  // Aguarde a mensagem de sucesso na tela
  // A mensagem agora deve aparecer se o registro for bem-sucedido
  await expect(page.getByText('Conta criada com sucesso!')).toBeVisible({ timeout: 10000 }); // Aumentei o timeout para garantir
  
  // Agora, aguarde o redirecionamento
  await expect(page).toHaveURL(/login\/prestadordeservico_usuario/, { timeout: 10000 }); // Aumentei o timeout
  await expect(page.getByText('Bem-vindo de volta')).toBeVisible();

  // 2. Login
  await page.fill('input[name="email"]', uniqueEmail); // Usa o email único para login
  await page.fill('input[name="password"]', 'senhaforte123');

  await page.click('button[type="submit"]');

  // Aguarde o redirecionamento para o dashboard do usuário
  await expect(page).toHaveURL(/user\/agenda/, { timeout: 10000 }); // Aumentei o timeout
  await expect(page.getByText('Agenda do Usuário')).toBeVisible();

  // 3. Logout
  await page.click('button[title="Sair"]');
  await expect(page).toHaveURL(/login\/prestadordeservico_usuario/);
  await expect(page.getByText('Bem-vindo de volta')).toBeVisible();
});

test('should prevent admin registration without admin role', async ({ page }) => {
  // Tenta acessar a página de registro de admin sem estar logado como admin
  await page.goto('http://localhost:3000/register/administrador');
  await expect(page).toHaveURL(/login\/administrador/); // Espera ser redirecionado para o login de admin
});

// Adicionar mais testes E2E para outros fluxos críticos:
// - Login de Admin e acesso ao dashboard
// - Login de Provider, adição de serviço, edição de perfil
// - Verificação de perfil público do provider
