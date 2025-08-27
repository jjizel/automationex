const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('./pages/registerpage');

test('Test Case 5 - Register User with existing email', async ({ page }) => {
  const user = {
    name: 'TestUsertucuma',
    email: 'testusertucuma@example.com',
    password: 'TestPassword123',
  };

  // 1. Launch browser and navigate to url
  await page.goto('https://automationexercise.com/test_cases');

  // 2. Click on 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 3. Tentar registrar usuário
  await page.fill('input[data-qa="signup-name"]', user.name);
  await page.fill('input[data-qa="signup-email"]', user.email);
  await page.click('button[data-qa="signup-button"]');

  // 4. Verifica se a mensagem de e-mail já existente aparece
  const emailExists = await page.locator('p:has-text("Email Address already exist!")').isVisible();
  if (emailExists) {
    // Teste PASS: e-mail já existe
    expect(emailExists).toBeTruthy();
    return;
  }

  // 5. Se não existe, cria usuário normalmente
  const registerPage = new RegisterPage(page);
  await registerPage.fillSignupForm(user);

  // Aguarda a mensagem de sucesso ou navegação
  await page.waitForSelector('h2[data-qa="account-created"]');
  await page.click('a[data-qa="continue-button"]');

  // 6. Logout e tenta registrar novamente para validar mensagem
  await page.click('a[href="/logout"]');
  await page.click('a[href="/login"]');
  await page.fill('input[data-qa="signup-name"]', user.name);
  await page.fill('input[data-qa="signup-email"]', user.email);
  await page.click('button[data-qa="signup-button"]');
  await expect(page.locator('p:has-text("Email Address already exist!")')).toBeVisible();
});
