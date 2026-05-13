import { test, expect } from '@playwright/test';

const BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto(BASE_URL);
  });

  test('should display login page elements', async ({ page }) => {
    // Verify login page is loaded with required elements
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Fill username
    await page.getByPlaceholder('Username').fill('Admin');
    // Fill password
    await page.getByPlaceholder('Password').fill('admin123');
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify successful login by checking for expected page elements
    await page.waitForURL('**/dashboard**', { timeout: 10000 });
    await expect(page).toHaveURL(/.*dashboard.*/);
  });

  test('should show error with invalid username', async ({ page }) => {
    // Fill invalid username
    await page.getByPlaceholder('Username').fill('InvalidUser');
    // Fill password
    await page.getByPlaceholder('Password').fill('admin123');
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify error message is displayed
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('should show error with invalid password', async ({ page }) => {
    // Fill username
    await page.getByPlaceholder('Username').fill('Admin');
    // Fill invalid password
    await page.getByPlaceholder('Password').fill('wrongpassword');
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify error message is displayed
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('should show error when credentials are empty', async ({ page }) => {
    // Click login button without filling any fields
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify required field error messages
    const usernameField = page.getByPlaceholder('Username');
    const passwordField = page.getByPlaceholder('Password');
    
    // Check for validation errors
    await expect(usernameField).toBeFocused();
  });

  test('should clear fields when cleared', async ({ page }) => {
    const usernameField = page.getByPlaceholder('Username');
    const passwordField = page.getByPlaceholder('Password');
    
    // Fill fields
    await usernameField.fill('Admin');
    await passwordField.fill('admin123');
    
    // Verify fields are filled
    await expect(usernameField).toHaveValue('Admin');
    await expect(passwordField).toHaveValue('admin123');
    
    // Clear fields
    await usernameField.clear();
    await passwordField.clear();
    
    // Verify fields are empty
    await expect(usernameField).toHaveValue('');
    await expect(passwordField).toHaveValue('');
  });

  test('should handle special characters in username', async ({ page }) => {
    // Fill username with special characters
    await page.getByPlaceholder('Username').fill('Admin@#$%');
    await page.getByPlaceholder('Password').fill('admin123');
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify error message is displayed
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
});
