
import { test, expect } from '@playwright/test';

const timestamp = Date.now();
const user = {
  name: `TestUser${timestamp}`,
  email: `testuser${timestamp}@example.com`,
  password: 'TestPassword123',
};

test.describe('Test Case 2 - Login User with correct email and password', () => {
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto('https://automationexercise.com/test_cases');
    await page.click('a[href="/login"]');
    await page.fill('input[data-qa="signup-name"]', user.name);
    await page.fill('input[data-qa="signup-email"]', user.email);
    await page.click('button[data-qa="signup-button"]');
    // Preencher dados mínimos obrigatórios para cadastro
    await page.check('input[id="id_gender1"]');
    await page.fill('input[id="password"]', user.password);
    await page.selectOption('select[id="days"]', '1');
    await page.selectOption('select[id="months"]', '1');
    await page.selectOption('select[id="years"]', '2000');
    await page.fill('input[id="first_name"]', 'Test');
    await page.fill('input[id="last_name"]', 'User');
    await page.fill('input[id="address1"]', '123 Test St');
    await page.selectOption('select[id="country"]', 'Canada');
    await page.fill('input[id="state"]', 'TestState');
    await page.fill('input[id="city"]', 'TestCity');
    await page.fill('input[id="zipcode"]', '12345');
    await page.fill('input[id="mobile_number"]', '+1234567890');
    await page.click('button[data-qa="create-account"]');
    await expect(page.locator('h2[data-qa="account-created"]')).toBeVisible();
    await page.click('a[data-qa="continue-button"]');
    await page.close();
  });

  test('Login User with correct email and password', async ({ page }) => {
    // 1. Launch browser and navigate to url
    await page.goto('https://automationexercise.com/test_cases');

    // 2. Click on 'Signup / Login' button
    await page.click('a[href="/login"]');

    // 3. Enter correct email address and password
    await page.fill('input[data-qa="login-email"]', user.email);
    await page.fill('input[data-qa="login-password"]', user.password);

    // 4. Click 'login' button
    await page.click('button[data-qa="login-button"]');

    // 5. Verify that 'Logged in as username' is visible
    await expect(page.locator(`a:has-text('Logged in as ${user.name}')`)).toBeVisible();

    // 6. Click 'Delete Account' button
    await page.click('a[href="/delete_account"]');

    // 7. Verify that 'ACCOUNT DELETED!' is visible
    await expect(page.locator('h2[data-qa="account-deleted"]')).toBeVisible();
  });
});
