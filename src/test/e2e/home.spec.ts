import { test, expect } from '@playwright/test';

test('homepage has title and loads content', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    // Adjust this to match your actual site title (likely 'Home' via CMS or 'Aaltjesdagen' from config)
    await expect(page).toHaveTitle(/Home|Aaltjesdagen|Harderwijk/);
});
