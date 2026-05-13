import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.demoblaze.com/';
const VALID_USERNAME = 'testuser123';
const VALID_PASSWORD = 'Test@1234';

test.describe('Demoblaze Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to demoblaze home page
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  });

  test('should login successfully with valid credentials and display username', async ({ page }) => {
    // Click on Login link
    await page.getByRole('link', { name: 'Log in' }).click();
    
    // Wait for login modal to appear
    await page.locator('#loginModal').waitFor({ state: 'visible' });
    
    // Enter username
    await page.locator('#loginusername').fill(VALID_USERNAME);
    
    // Enter password
    await page.locator('#loginpassword').fill(VALID_PASSWORD);
    
    // Click login button
    await page.getByRole('button', { name: 'Log in' }).click();
    
    // Wait for login to complete
    await page.waitForTimeout(2000);
    
    // Assert that username is displayed on the page (typically in navbar)
    // The username usually replaces the "Log in" link after successful login
    const navbarElement = page.locator('a#nameofuser');
    await expect(navbarElement).toBeVisible();
    await expect(navbarElement).toContainText(VALID_USERNAME);
  });

  test('should display login modal when login link is clicked', async ({ page }) => {
    // Click on Login link
    await page.getByRole('link', { name: 'Log in' }).click();
    
    // Verify login modal is visible
    const loginModal = page.locator('#loginModal');
    await expect(loginModal).toBeVisible();
    
    // Verify login form fields exist
    await expect(page.locator('#loginusername')).toBeVisible();
    await expect(page.locator('#loginpassword')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
  });

  test('should be able to close login modal', async ({ page }) => {
    // Click on Login link
    await page.getByRole('link', { name: 'Log in' }).click();
    
    // Wait for modal to appear
    await page.locator('#loginModal').waitFor({ state: 'visible' });
    
    // Click close button
    await page.locator('#loginModal .close').click();
    
    // Verify modal is closed
    await expect(page.locator('#loginModal')).not.toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    // Click on Login link
    await page.getByRole('link', { name: 'Log in' }).click();
    
    // Wait for login modal to appear
    await page.locator('#loginModal').waitFor({ state: 'visible' });
    
    // Enter invalid username
    await page.locator('#loginusername').fill('invaliduser');
    
    // Enter invalid password
    await page.locator('#loginpassword').fill('wrongpassword');
    
    // Click login button
    await page.getByRole('button', { name: 'Log in' }).click();
    
    // Wait for error message
    await page.waitForTimeout(1000);
    
    // Verify error alert is displayed
    const alertBox = page.locator('text=/Wrong/i | text=/Invalid/i');
    await expect(alertBox).toBeVisible();
  });
});
