import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('desktop: should have main navigation links', async ({ page, isMobile }) => {
        // Only run on desktop
        if (isMobile) return;

        const nav = page.locator('header nav');

        // Use proper role selectors which are generally more reliable for accessibility
        // ensuring we hit the visible desktop links, not the hidden mobile ones
        const bereikbaarheidLink = page.getByRole('link', { name: 'Bereikbaarheid' }).filter({ hasNot: page.locator('.md\\:hidden') }).first();

        // Simple check: The desktop nav should be visible
        await expect(nav).toBeVisible();

        // Check for specific links
        // We use .first() because sometimes responsive layouts duplicate links (though here they are separate DOM trees)
        await expect(page.getByRole('link', { name: 'Bereikbaarheid', exact: true }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: 'Braderie', exact: true }).first()).toBeVisible();
    });

    test('mobile: should open menu when hamburger is clicked', async ({ page, isMobile }) => {
        if (!isMobile) return;

        // Check that menu is initially hidden or hamburger is present
        const menuButton = page.getByLabel(/menu|open/i).first();
        await expect(menuButton).toBeVisible();

        // Opening menu
        await menuButton.click();

        // Check for a link that should now be visible in the drawer
        const mobileLink = page.getByRole('link', { name: 'Bereikbaarheid' }).last(); // Mobile links usually come after desktop in DOM order or specific
        await expect(mobileLink).toBeVisible();
    });

    test('should navigate to Bereikbaarheid page', async ({ page, isMobile }) => {
        if (isMobile) {
            const menuButton = page.getByLabel(/menu|open/i).first();
            if (await menuButton.isVisible()) {
                await menuButton.click();
            }
            // Click the mobile link
            await page.getByRole('link', { name: 'Bereikbaarheid' }).last().click();
        } else {
            // Click the desktop link
            await page.getByRole('link', { name: 'Bereikbaarheid' }).first().click();
        }

        // Check URL
        await expect(page).toHaveURL(/.*bereikbaarheid/);
        await expect(page).toHaveTitle(/Bereikbaarheid/i);
    });
});
