# Utilities Reference

TypeScript/JavaScript helper functions for working with Storyblok content, images, and dates. All utilities are fully typed and handle edge cases gracefully.

## Table of Contents

- [Installation](#installation)
- [Storyblok Utilities](#storyblok-utilities)
- [Image Utilities](#image-utilities)
- [Date Utilities](#date-utilities)
- [Logger Utilities](#logger-utilities)

---

## Installation

Import utilities from `@aaltjesdagen/ui/utils`:

```typescript
import { 
  renderText, 
  getTitle, 
  storyblokImage, 
  formatDate 
} from '@aaltjesdagen/ui/utils';
```

---

## Storyblok Utilities

Helper functions for safely working with Storyblok rich text and bloks.

### renderText()

Safely renders Storyblok rich text content with graceful undefined/null handling.

**Signature:**
```typescript
function renderText(content: any): string
```

**Parameters:**
- `content` - Storyblok rich text field (can be undefined/null)

**Returns:**
- HTML string or empty string if no content

**Usage:**
```astro
---
import { renderText } from '@aaltjesdagen/ui/utils';

const { blok } = Astro.props;
const html = renderText(blok.tekst);
---

<div set:html={html} />
```

**Example Output:**
```typescript
// Input: Storyblok rich text object
renderText(blok.description)
// Output: "<p>Welkom bij <strong>Aaltjesdagen</strong>!</p>"

// Input: undefined
renderText(undefined)
// Output: ""
```

---

### getTitle()

Extract title field from a Storyblok blok with fallback to empty string.

**Signature:**
```typescript
function getTitle(blok: any, field: string = 'title'): string
```

**Parameters:**
- `blok` - Storyblok blok object
- `field` - Field name to extract (default: `'title'`)

**Returns:**
- Title string or empty string if not found

**Usage:**
```astro
---
import { getTitle } from '@aaltjesdagen/ui/utils';

const { blok } = Astro.props;
const title = getTitle(blok);
const customTitle = getTitle(blok, 'Title'); // Different field name
---

<h2>{title}</h2>
```

**Example:**
```typescript
const blok = { title: "Programma", subtitle: "Line-up" };

getTitle(blok);              // "Programma"
getTitle(blok, 'subtitle');  // "Line-up"
getTitle(blok, 'missing');   // ""
```

---

### getTekst()

Extract rich text field from a Storyblok blok.

**Signature:**
```typescript
function getTekst(blok: any, field: string = 'tekst'): any
```

**Parameters:**
- `blok` - Storyblok blok object
- `field` - Field name to extract (default: `'tekst'`)

**Returns:**
- Rich text content or `undefined`

**Usage:**
```astro
---
import { getTekst, renderText } from '@aaltjesdagen/ui/utils';

const { blok } = Astro.props;
const tekst = getTekst(blok);
const text = getTekst(blok, 'text'); // English field name
---

{tekst && <div set:html={renderText(tekst)} />}
```

---

### hasContent()

Check if a rich text field has content.

**Signature:**
```typescript
function hasContent(content: any): boolean
```

**Parameters:**
- `content` - Storyblok rich text field or string

**Returns:**
- `true` if content exists and is not empty

**Usage:**
```astro
---
import { hasContent, renderText } from '@aaltjesdagen/ui/utils';

const { blok } = Astro.props;
---

{hasContent(blok.description) && (
  <div class="description" set:html={renderText(blok.description)} />
)}
```

**Example:**
```typescript
hasContent({ type: "doc", content: [...] });  // true
hasContent("Some text");                       // true
hasContent("");                                // false
hasContent("   ");                             // false (trimmed)
hasContent(null);                              // false
hasContent(undefined);                         // false
```

---

## Image Utilities

Helper functions for optimizing Storyblok images with CDN transformations.

### storyblokImage()

Generate a Storyblok CDN URL with image transformations (resize, format, quality).

**Signature:**
```typescript
function storyblokImage(
  filename: string,
  width: number = 800,
  height: number = 600,
  quality: number = 80,
  format: 'webp' | 'jpg' | 'png' = 'webp'
): string
```

**Parameters:**
- `filename` - Full Storyblok image URL
- `width` - Desired width in pixels (default: `800`)
- `height` - Desired height in pixels (default: `600`)
- `quality` - Image quality 0-100 (default: `80`)
- `format` - Output format (default: `'webp'`)

**Returns:**
- Optimized image URL with transformations

**Usage:**
```astro
---
import { storyblokImage } from '@aaltjesdagen/ui/utils';
import { Image } from 'astro:assets';

const { blok } = Astro.props;
const optimizedUrl = storyblokImage(blok.image.filename, 1200, 800, 85, 'webp');
---

<Image 
  src={optimizedUrl}
  alt={blok.image.alt || ''}
  width={1200}
  height={800}
  format="webp"
/>
```

**Example:**
```typescript
const original = "https://a.storyblok.com/f/12345/2400x1600/abc/image.jpg";

storyblokImage(original, 1200, 800);
// "https://a.storyblok.com/f/12345/2400x1600/abc/image.jpg/m/1200x800/filters:quality(80):format(webp)"

storyblokImage(original, 800, 600, 90, 'jpg');
// "https://a.storyblok.com/f/12345/2400x1600/abc/image.jpg/m/800x600/filters:quality(90):format(jpg)"
```

**Benefits:**
- ✅ Reduces image file size (webp = ~30% smaller than jpg)
- ✅ Serves correct dimensions (no over-downloading)
- ✅ Leverages Storyblok's CDN edge caching
- ✅ Automatic logging in development mode

---

### responsiveImageSrcset()

Generate a responsive `srcset` string for Storyblok images.

**Signature:**
```typescript
function responsiveImageSrcset(
  filename: string,
  sizes: number[] = [400, 800, 1200, 1600],
  quality: number = 80
): string
```

**Parameters:**
- `filename` - Full Storyblok image URL
- `sizes` - Array of widths for srcset (default: `[400, 800, 1200, 1600]`)
- `quality` - Image quality (default: `80`)

**Returns:**
- Srcset string (e.g., `"...400w, ...800w, ...1200w"`)

**Usage:**
```astro
---
import { responsiveImageSrcset, storyblokImage } from '@aaltjesdagen/ui/utils';

const { blok } = Astro.props;
const srcset = responsiveImageSrcset(blok.image.filename);
const src = storyblokImage(blok.image.filename, 800, 600);
---

<img 
  src={src}
  srcset={srcset}
  sizes="(max-width: 768px) 100vw, 50vw"
  alt={blok.image.alt || ''}
/>
```

**Example:**
```typescript
responsiveImageSrcset("https://a.storyblok.com/.../image.jpg");
// Returns:
// ".../m/400x300/filters:quality(80):format(webp) 400w,
//  .../m/800x600/filters:quality(80):format(webp) 800w,
//  .../m/1200x900/filters:quality(80):format(webp) 1200w,
//  .../m/1600x1200/filters:quality(80):format(webp) 1600w"
```

**Note:** Automatically maintains **4:3 aspect ratio** for all sizes.

---

## Date Utilities

Helper functions for formatting dates and times with Dutch locale.

### formatDate()

Format a date to a Dutch locale string.

**Signature:**
```typescript
function formatDate(
  date: string | Date,
  locale: string = 'nl-NL'
): string
```

**Parameters:**
- `date` - Date string (ISO 8601) or `Date` object
- `locale` - Locale string (default: `'nl-NL'`)

**Returns:**
- Formatted date string (e.g., `"zaterdag 15 juni"`)

**Usage:**
```astro
---
import { formatDate } from '@aaltjesdagen/ui/utils';

const { blok } = Astro.props;
const formattedDate = formatDate(blok.datum);
---

<time datetime={blok.datum}>{formattedDate}</time>
```

**Example:**
```typescript
formatDate('2024-06-15');
// "zaterdag 15 juni"

formatDate(new Date('2024-12-25'));
// "woensdag 25 december"

formatDate('2024-06-15', 'en-US');
// "Saturday, June 15"
```

---

### formatDateWithYear()

Format a date with the year included.

**Signature:**
```typescript
function formatDateWithYear(
  date: string | Date,
  locale: string = 'nl-NL'
): string
```

**Parameters:**
- `date` - Date string or `Date` object
- `locale` - Locale string (default: `'nl-NL'`)

**Returns:**
- Formatted date string with year (e.g., `"zaterdag 15 juni 2024"`)

**Usage:**
```typescript
formatDateWithYear('2024-06-15');
// "zaterdag 15 juni 2024"
```

---

### formatTime()

Format time in 24-hour format.

**Signature:**
```typescript
function formatTime(
  date: string | Date,
  locale: string = 'nl-NL'
): string
```

**Parameters:**
- `date` - Date/time string or `Date` object
- `locale` - Locale string (default: `'nl-NL'`)

**Returns:**
- Formatted time string (e.g., `"14:30"`)

**Usage:**
```astro
---
import { formatTime } from '@aaltjesdagen/ui/utils';

const { blok } = Astro.props;
---

<span>{formatTime(blok.starttijd)}</span>
```

**Example:**
```typescript
formatTime('2024-06-15T14:30:00');
// "14:30"

formatTime('2024-06-15T09:05:00');
// "09:05"
```

---

### getYear()

Extract year from a date.

**Signature:**
```typescript
function getYear(date: string | Date): number
```

**Parameters:**
- `date` - Date string or `Date` object

**Returns:**
- Year as a number

**Usage:**
```typescript
getYear('2024-06-15');
// 2024

getYear(new Date());
// 2026

getYear(null);
// 2026 (current year as fallback)
```

---

## Logger Utilities

Development logging utilities (automatically silent in production).

### Available Loggers

```typescript
import { 
  logImageOptimization,
  logDateFormatting
} from '@aaltjesdagen/ui/utils';
```

**Features:**
- ✅ Automatically logs in development mode
- ✅ Silent in production (`NODE_ENV === 'production'`)
- ✅ Color-coded console output
- ✅ Performance tracking

**Note:** These are used internally by the image and date utilities. You typically won't call them directly.

---

## Usage Patterns

### Complete Example: Event Card

```astro
---
import { 
  getTitle, 
  renderText, 
  formatDate, 
  formatTime, 
  storyblokImage 
} from '@aaltjesdagen/ui/utils';
import { Image } from 'astro:assets';

const { blok } = Astro.props;

const title = getTitle(blok);
const description = renderText(blok.description);
const date = formatDate(blok.datum);
const time = formatTime(blok.starttijd);
const imageUrl = storyblokImage(blok.image.filename, 800, 600, 85);
---

<article class="card-base">
  <Image 
    src={imageUrl}
    alt={blok.image.alt || title}
    width={800}
    height={600}
    class="rounded-lg mb-4"
  />
  
  <h3 class="text-2xl font-bold mb-2">{title}</h3>
  
  <time class="text-sm text-text-sub block mb-4">
    {date} om {time}
  </time>
  
  <div class="prose" set:html={description} />
</article>
```

---

## Type Safety

All utilities are fully typed. Import types from the utils module:

```typescript
import type { 
  // Add type imports if needed
} from '@aaltjesdagen/ui/utils';
```

---

## Performance Notes

### Image Optimization

The `storyblokImage()` function:
- ✅ Uses Storyblok's CDN (globally distributed)
- ✅ Caches transformations permanently
- ✅ Supports WebP for maximum compression
- ⚡ First request may be slower (transformation), subsequent requests are instant

### Date Formatting

The date utilities use `Intl.DateTimeFormat` which:
- ✅ Is built into JavaScript (no dependencies)
- ✅ Caches formatting automatically
- ✅ Respects user's locale preferences

---

## Next Steps

- **[Astro Components](./astro-components.md)** - See utilities in component context
- **[Getting Started](./getting-started.md)** - Setup and basic usage
- **[Design Tokens](./design-tokens.md)** - Understanding the token system
