const { test, expect } = require('@playwright/test');

test('Test Case 3 - Login User with incorrect email and password', async ({ page }) => {
  // 1. Launch browser and navigate to url
  await page.goto('https://automationexercise.com/test_cases');

  // 2. Click on 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 3. Enter incorrect email address and password
  await page.fill('input[data-qa="login-email"]', 'wronguser@example.com');
  await page.fill('input[data-qa="login-password"]', 'WrongPassword123');

  // 4. Click 'login' button
  await page.click('button[data-qa="login-button"]');

  // 5. Verify error 'Your email or password is incorrect!' is visible
  await expect(page.locator('p:has-text("Your email or password is incorrect!")')).toBeVisible();
});
