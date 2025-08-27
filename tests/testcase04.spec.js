const { test, expect } = require('@playwright/test');

test('Test Case 4 - Logout User', async ({ page, browser }) => {
  // Dados do usuário
  const user = {
    name: 'TestUser4',
    email: 'testuser4_' + Date.now() + '@example.com',
    password: 'TestPassword123',
  };

  // 1. Launch browser and navigate to url
  await page.goto('https://automationexercise.com/test_cases');

  // 2. Click on 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 3. Register a new user
  await page.fill('input[data-qa="signup-name"]', user.name);
  await page.fill('input[data-qa="signup-email"]', user.email);
  await page.click('button[data-qa="signup-button"]');
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

  // 4. Login with the newly created user
  await expect(page.locator(`a:has-text('Logged in as ${user.name}')`)).toBeVisible();

  // 5. Click 'Logout' button
  await page.click('a[href="/logout"]');

  // 6. Verify that user is navigated to login page and 'Signup / Login' is visible
  await expect(page.locator('a[href="/login"]')).toBeVisible();
});
