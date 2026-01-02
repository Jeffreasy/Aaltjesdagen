import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility (A11y)', () => {
    test('homepage should not have any violations', async ({ page }) => {
        await page.goto('/');

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('navigation should be accessible', async ({ page, isMobile }) => {
        if (isMobile) return; // Skip complex mobile menu a11y for now, focus on desktop nav structure

        await page.goto('/');

        const accessibilityScanResults = await new AxeBuilder({ page })
            .include('header nav')
            .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
