# Infrastructure & Patterns

> **Scope**: Logging, Performance Monitoring, Data Services
> **Key Files**: `src/utils/logger.ts`, `src/services/`

This document details the backend-of-the-frontend infrastructure that powers the Aaltjesdagen application.

---

## 🪵 Professional Logging System

The application uses **Consola** wrapped in a custom utility for consistent, scoped, and improved logging during development and build times.

**Location**: [`src/utils/logger.ts`](../../src/utils/logger.ts)

### 1. Scoped Loggers

We use tagged loggers to filter and identify noise in the terminal.

| Logger | Tag | Usage |
|--------|-----|-------|
| `storyblokLogger` | `[storyblok]` | CMS fetches and API interactions |
| `imagesLogger` | `[images]` | Image optimization and transformation details |
| `buildLogger` | `[build]` | General build steps and milestones |
| `datesLogger` | `[dates]` | Date formatting and locale debugging |

### 2. Usage

```typescript
import { storyblokLogger, logError } from '../utils/logger';

// Info logging
storyblokLogger.info('Fetching stories...');

// Error logging (tracks for summary)
logError('Fetch failed', errorObject, { context: 'Storyblok' });
```

### 3. Build Analytics & Summary

The logger includes a `BuildAnalytics` class that tracks the duration of operations. At the end of a build (`npm run build`), it outputs a summary box with:
- Total build time
- Breakdown of fetch times
- Error summary (if any)

---

## 🔌 Service Layer Pattern

To keep components clean (`.astro` files should strictly handle view logic), all data fetching logic is encapsulated in **Services**.

**Location**: [`src/services/`](../../src/services/)

### Rules
1. **Never fetch data in components**: Do not use `fetch()` or `useStoryblokApi()` directly in Astro frontmatter for complex data.
2. **Centralize Logic**: Put the API call, error handling, and logging in a service function.
3. **Return Clean Data**: Service functions should return ready-to-use data structures.

### Example: Storyblok Service

**`src/services/storyblok.ts`**
Wraps the Storyblok SDK with our custom logger and caching logic.

```typescript
import { getStory } from '../services/storyblok';

// ✅ GOOD: Component is clean
const story = await getStory('home', 'published');
```

---

## 📈 Performance Monitoring

We track build performance to ensure the site remains fast to deploy.

**Functions**:
- `logBuildMetric(name, duration)`: Records a timing metric.
- `analytics.summarize()`: Prints the report.

Used primarily in `src/services/` to verify that API calls are not slowing down the build process.

---

**Last Updated**: January 1, 2026
