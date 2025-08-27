const { test, expect } = require('@playwright/test');

test('Valida alerta do Contact Us', async ({ page }) => {
  await page.goto('https://automationexercise.com/contact_us');

  // Preenche campos obrigatórios
  await page.fill('input[data-qa="name"]', 'TestUser');
  await page.fill('input[data-qa="email"]', 'testuser_contact@example.com');
  await page.fill('input[data-qa="subject"]', 'Test Subject');
  await page.fill('textarea[data-qa="message"]', 'Test message for contact form.');

  // Upload de arquivo
  const filePath = 'tests/fixtures/contactus.txt';
  await page.setInputFiles('input[name="upload_file"]', filePath);

  // Registra o handler do alerta antes do clique
  page.once('dialog', async dialog => {
    console.log('Texto do alerta:', dialog.message());
    await dialog.accept();
  });
  // Clica em submit
  await page.click('input[type="submit"]');
  await expect(page.locator('//*[@id="contact-page"]/div[2]/div[1]/div/div[2]').getByText('Success!')).toBeVisible();
  await page.getByRole('link', { name: ' Home' }).click();

});
