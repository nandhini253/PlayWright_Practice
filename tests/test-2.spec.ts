import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await expect(page.locator('h3')).toContainText('We Care About Your Health');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByLabel('Username').click();
  await page.getByRole('textbox', { name: 'Username' }).first().click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Login failed! Please ensure').click();
  await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
});