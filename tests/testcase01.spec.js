import { test, expect } from '@playwright/test';

test('Test Case 1 - Register User', async ({ page }) => {
  // 1. Launch browser and navigate to url
  await page.goto('https://automationexercise.com/test_cases');

  // 2. Click on 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 3. Enter name and email address
  await page.fill('input[data-qa="signup-name"]', 'TestUser');
  await page.fill('input[data-qa="signup-email"]', 'testuser_' + Date.now() + '@example.com');

  // 4. Click 'Signup' button
  await page.click('button[data-qa="signup-button"]');

  // 5. Fill details: Title, Name, Email, Password, Date of birth
  await page.check('input[id="id_gender1"]'); // Mr
  await page.fill('input[id="name"]', 'TestUser');
  //await page.fill('input[id="email"]', 'testuser_' + Date.now() + '@example.com');
  await page.fill('input[id="password"]', 'TestPassword123');
  await page.selectOption('select[id="days"]', '1');
  await page.selectOption('select[id="months"]', '1');
  await page.selectOption('select[id="years"]', '2000');

  // 6. Select checkbox 'Sign up for our newsletter!'
  await page.check('input[id="newsletter"]');

  // 7. Select checkbox 'Receive special offers from our partners!'
  await page.check('input[id="optin"]');

  // 8. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  await page.fill('input[id="first_name"]', 'Test');
  await page.fill('input[id="last_name"]', 'User');
  await page.fill('input[id="company"]', 'TestCompany');
  await page.fill('input[id="address1"]', '123 Test St');
  await page.fill('input[id="address2"]', 'Apt 1');
  await page.selectOption('select[id="country"]', 'Canada');
  await page.fill('input[id="state"]', 'TestState');
  await page.fill('input[id="city"]', 'TestCity');
  await page.fill('input[id="zipcode"]', '12345');
  await page.fill('input[id="mobile_number"]', '+1234567890');

  // 9. Click 'Create Account button'
  await page.click('button[data-qa="create-account"]');

  // 10. Verify that 'ACCOUNT CREATED!' is visible
  await expect(page.locator('h2[data-qa="account-created"]')).toBeVisible();

  // 11. Click 'Continue' button
  await page.click('a[data-qa="continue-button"]');

  // 12. Verify that 'Logged in as username' is visible
  await expect(page.locator('a:has-text("Logged in as TestUser")')).toBeVisible();

  // 13. Click 'Delete Account' button
  await page.click('a[href="/delete_account"]');

  // 14. Verify that 'ACCOUNT DELETED!' is visible
  await expect(page.locator('h2[data-qa="account-deleted"]')).toBeVisible();
});
