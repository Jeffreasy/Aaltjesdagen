import { test, expect } from '@playwright/test';

test.describe('Legal & Compliance Pages', () => {

    test('privacy page should load and be accessible', async ({ page }) => {
        await page.goto('/privacy');

        // Check page loaded
        await expect(page).toHaveTitle(/Privacy/i);

        // Check for key content indicators
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

        // Check page has substantial content
        const bodyText = await page.locator('body').textContent();
        expect(bodyText?.length).toBeGreaterThan(100);
    });

    test('cookies page should load and be accessible', async ({ page }) => {
        await page.goto('/cookies');

        // Check page loaded
        await expect(page).toHaveTitle(/Cookie/i);

        // Check for main heading
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

        // Check page has substantial content
        const bodyText = await page.locator('body').textContent();
        expect(bodyText?.length).toBeGreaterThan(100);
    });

    test('voorwaarden page should load and be accessible', async ({ page }) => {
        await page.goto('/voorwaarden');

        // Check page loaded
        await expect(page).toHaveTitle(/Voorwaarden|Algemene/i);

        // Check for main heading
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });

    test('all legal pages should have navigation back to home', async ({ page }) => {
        const legalPages = ['/privacy', '/cookies', '/voorwaarden'];

        for (const pagePath of legalPages) {
            await page.goto(pagePath);

            // Check for navigation (either logo or home link)
            const homeLink = page.getByRole('link', { name: /home|aaltjesdagen/i }).first();
            await expect(homeLink).toBeVisible();
        }
    });
});
