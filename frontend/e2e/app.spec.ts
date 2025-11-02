import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test('should load and display basic content', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Verify the page title
    await expect(page).toHaveTitle(/Frontend/i);

    // Verify the app root element is present
    const appRoot = page.locator('app-root');
    await expect(appRoot).toBeVisible();

    // Verify the main heading is displayed
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Hello');

    // Verify the Angular logo is present (if it exists)
    const angularLogo = page.locator('.angular-logo');
    await expect(angularLogo).toBeVisible();
  });

  test('should have responsive layout', async ({ page }) => {
    await page.goto('/');

    // Check desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    const appRoot = page.locator('app-root');
    await expect(appRoot).toBeVisible();

    // Check mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(appRoot).toBeVisible();
  });

  test('should call backend health endpoint', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Call the backend health endpoint using fetch API
    const response = await page.evaluate(async () => {
      const res = await fetch('http://localhost:5000/api/health');
      return {
        status: res.status,
        statusText: res.statusText,
        body: await res.json(),
      };
    });

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toBe('healthy');
    expect(response.body).toHaveProperty('timestamp');
  });
});
