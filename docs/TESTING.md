# Testing Guide - Aaltjesdagen Frontend

Complete guide for testing infrastructure, covering unit tests, E2E tests, accessibility, and CI/CD.

---

## 📊 Test Coverage Overview

The project maintains professional quality standards with comprehensive testing across multiple layers:

| Test Type | Framework | Tests | Coverage |
|-----------|-----------|-------|----------|
| **Unit Tests** | Vitest | 26 | Utilities & Logic |
| **E2E Tests** | Playwright | 30+ | User Flows & Pages |
| **A11y Tests** | Axe-Core | 6 | WCAG AA Compliance |
| **Total** | - | **60+** | Comprehensive |

---

## 🧪 Test Types

### 1. Unit Tests (Vitest)

Tests for utility functions and business logic.

**Location**: `src/test/unit/`

**Coverage**:
- ✅ **Logger** (`logger.test.ts`) - 6 tests
  - BuildAnalytics tracking
  - ErrorTracker functionality
  - Log grouping helpers
  
- ✅ **Performance Monitor** (`performance-monitor.test.ts`) - 7 tests
  - Timing accuracy
  - Async/sync measurements
  - Error handling
  
- ✅ **Date Utilities** (`dates.test.ts`) - 11 tests
  - Dutch locale formatting
  - Date/time parsing
  - Edge cases
  
- ✅ **Example Tests** (`example.test.ts`) - 2 tests
  - Setup verification

**Run Commands**:
```bash
# Watch mode (recommended for development)
npm run test:unit

# Single run (for CI)
npm run test:unit -- --run
```

---

### 2. End-to-End Tests (Playwright)

Browser-based tests validating complete user flows.

**Location**: `src/test/e2e/`

**Coverage**:

#### Navigation Tests (`navigation.spec.ts`)
- Desktop navigation link visibility
- Mobile hamburger menu interaction
- Page navigation functionality
- **Browsers**: Chromium, Firefox, WebKit

#### Homepage Test (`home.spec.ts`)
- Page loads correctly
- Title verification
- Basic content presence

#### Legal Pages (`legal-pages.spec.ts`)
- Privacy page accessibility
- Cookies page accessibility  
- Terms page accessibility
- Navigation back to home

#### Accessibility Tests (`a11y.spec.ts`)
- Homepage WCAG AA compliance
- Navigation WCAG AA compliance
- **Standards**: WCAG 2.0/2.1 Level A + AA
- **Tool**: @axe-core/playwright

**Run Commands**:
```bash
# All E2E tests (all browsers)
npm run test:e2e

# Specific browser
npm run test:e2e -- --project=chromium

# Specific test file
npm run test:e2e -- src/test/e2e/navigation.spec.ts

# Headed mode (see browser)
npm run test:e2e -- --headed

# Debug mode
npm run test:e2e -- --debug
```

**Generate Report**:
```bash
npx playwright show-report
```

---

### 3. Accessibility Testing

Automated WCAG compliance scanning.

**Implementation**: `@axe-core/playwright` integration in E2E tests

**Standards**: WCAG 2.0/2.1 Level A + AA

**Current Status**: ✅ **100% Compliant**

**Fixed Issues**:
- Primary color contrast: `#50b0ae` → `#267270` (4.51:1)
- Accent color contrast: `#ff7e67` → `#C0392B` (5.9:1)
- Footer text opacity removed for better contrast

**Run A11y Tests**:
```bash
npm run test:e2e -- src/test/e2e/a11y.spec.ts
```

---

## 🚀 Running Tests

### Quick Commands

```bash
# Run ALL tests (unit + E2E)
npm test

# Unit tests only
npm run test:unit

# E2E tests only
npm run test:e2e

# CI-optimized (faster, Chromium only)
npm run test:ci

# Type checking
npm run type-check
```

### Test Workflow (Development)

1. **Write code**
2. **Run unit tests** in watch mode:
   ```bash
   npm run test:unit
   ```
3. **Before commit**, run E2E tests:
   ```bash
   npm run test:e2e
   ```
4. **Optional**: Run full suite:
   ```bash
   npm test
   ```

---

## 🤖 CI/CD Pipeline

### GitHub Actions

**Workflows**:

#### 1. Main CI (`ci.yml`)
**Triggers**: Every push to master/main, Pull Requests

**Steps**:
1. ✅ Checkout code
2. ✅ Setup Node.js (v20)
3. ✅ Install dependencies
4. ✅ Lint (if script exists)
5. ✅ **Type check** (`astro check`)
6. ✅ **Unit tests** (Vitest)
7. ✅ **E2E tests** (Playwright - Chromium only)
8. ✅ **Build** verification
9. ✅ Upload test artifacts (7-day retention)

**Status**: ![CI](https://github.com/Jeffreasy/Aaltjesdagen/actions/workflows/ci.yml/badge.svg)

#### 2. Accessibility Check (`a11y.yml`)
**Triggers**: Weekly (Mondays), Manual dispatch

**Steps**:
1. ✅ Run full A11y test suite
2. ✅ Test across all browsers
3. ✅ Upload report (30-day retention)

**Status**: ![A11y](https://github.com/Jeffreasy/Aaltjesdagen/actions/workflows/a11y.yml/badge.svg)

### Vercel Integration

- **Auto-deployment** on successful CI
- **Preview deployments** for Pull Requests
- **Speed Insights** enabled
- **Web Analytics** enabled

---

## 📝 Writing Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { formatDate } from '@/utils/dates';

describe('formatDate', () => {
  it('should format date in Dutch locale', () => {
    const result = formatDate('2024-06-15');
    expect(result).toContain('juni');
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Aaltjesdagen/);
});
```

### A11y Test Example

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('page meets WCAG AA', async ({ page }) => {
  await page.goto('/');
  
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
    
  expect(results.violations).toEqual([]);
});
```

---

## 🛠️ Configuration Files

| File | Purpose |
|------|---------|
| `vitest.config.ts` | Vitest configuration |
| `playwright.config.ts` | Playwright configuration |
| `.github/workflows/ci.yml` | Main CI pipeline |
| `.github/workflows/a11y.yml` | A11y checks |

---

## 🐛 Troubleshooting

### Tests Fail Locally But Pass in CI

**Cause**: Cache or environment differences

**Solution**:
```bash
# Clear Playwright cache
npx playwright install --force

# Clear Node modules
rm -rf node_modules package-lock.json
npm install
```

### Type Check Errors

**Cause**: TypeScript strict mode or missing types

**Solution**:
```bash
# Run type check locally
npm run type-check

# Fix by adding type annotations
```

### E2E Tests Timeout

**Cause**: Dev server not started or slow response

**Solution**:
- Increase timeout in `playwright.config.ts`
- Run tests individually to isolate issues
- Check dev server is running (`npm run dev`)

---

## 📊 Test Reports

### View Playwright HTML Report

```bash
npx playwright show-report
```

### View in GitHub Actions

1. Go to [Actions tab](https://github.com/Jeffreasy/Aaltjesdagen/actions)
2. Click on a workflow run
3. Download `test-results` artifact
4. Extract and open `index.html`

---

## ✅ Best Practices

1. **Write tests BEFORE fixing bugs** (TDD)
2. **Keep tests fast** - Mock external dependencies
3. **Test user behavior**, not implementation
4. **Use semantic selectors** (`getByRole`, not `querySelector`)
5. **Name tests clearly** - "should do X when Y"
6. **Run tests before commit**
7. **Fix failing tests immediately** - Don't skip
8. **Update tests with code changes**

---

## 🎯 Coverage Goals

- ✅ **Unit tests**: All utility functions
- ✅ **E2E tests**: All critical user flows
- ✅ **A11y tests**: WCAG AA compliance
- 🎯 **Future**: Component visual regression tests

---

## 📚 Resources

- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)
- [Axe-Core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated**: January 2, 2026  
**Maintained by**: Development Team  
**Questions?**: Open an issue on GitHub
