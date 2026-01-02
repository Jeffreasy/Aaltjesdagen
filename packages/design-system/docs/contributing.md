# Contributing Guide

Welcome! This guide explains how to contribute to the `@aaltjesdagen/ui` design system.

## Table of Contents

- [Getting Started](#getting-started)
- [Adding New Components](#adding-new-components)
- [Component Template](#component-template)
- [Testing Requirements](#testing-requirements)
- [Documentation Standards](#documentation-standards)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Basic knowledge of Astro, TypeScript, and Tailwind CSS
- Familiarity with accessibility standards (WCAG AA)

### Setup

```bash
# Clone repository
git clone https://github.com/yourusername/aaltjesdagen-frontend.git
cd aaltjesdagen-frontend

# Install dependencies
npm install

# Navigate to design system
cd packages/design-system

# Start development
npm run dev
```

---

## Adding New Components

### Folder Structure

Place components in the correct category folder:

```
src/components/
├── forms/              # Form inputs
├──  feedback/          # Alerts, badges, spinners
├── layout/             # Cards, containers, dividers
├── overlay/            # Modals, tooltips, dropdowns
├── navigation/         # Links, breadcrumbs
├── media/              # Icons, avatars, images
├── core/               # Theme toggle, utilities
└── specialized/        # Project-specific components
```

### Choosing a Category

| Category | Examples | When to Use |
|----------|----------|-------------|
| `forms/` | Input, Select, Checkbox | User input elements |
| `feedback/` | Alert, Toast, Spinner | Status indicators |
| `layout/` | Card, Container, Tabs | Content organization |
| `overlay/` | Modal, Tooltip | Overlay UI |
| `navigation/` | Link, Breadcrumbs | Navigation elements |
| `media/` | Icon, Avatar | Media display |
| `core/` | ThemeToggle | Essential utilities |
| `specialized/` | Custom components | Project-specific needs |

---

## Component Template

### File Structure

```
src/components/[category]/ComponentName.astro
```

### Basic Template

```astro
---
/**
 * ComponentName
 * 
 * Brief description of what this component does
 * 
 * @component
 */

export interface Props {
  // Required props first
  name: string;
  
  // Optional props with defaults
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  class?: string;
}

const {
  name,
  variant = 'primary',
  size = 'md',
  disabled = false,
  class: className = '',
} = Astro.props;

// Component logic here
const sizeClasses = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2.5',
  lg: 'text-lg px-5 py-3',
};
---

<div
  class:list={[
    'component-base-classes',
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  ]}
  {...Astro.props}
>
  <slot />
</div>

<style>
  /* Component-specific styles (if needed) */
</style>
```

### Required Elements

Every component must have:

1. **TypeScript Props Interface**
   ```typescript
   export interface Props {
     required: type;
     optional?: type;
   }
   ```

2. **JSDoc Comment**
   ```typescript
   /**
    * ComponentName
    * 
    * Description of component
    * 
    * @component
    */
   ```

3. **Default Props**
   ```typescript
   const {
     prop = 'default',
   } = Astro.props;
   ```

4. **CSS Variables** (not hardcoded colors)
   ```css
   color: var(--text-primary);
   background: var(--bg-elevated);
   ```

5. **Accessibility Attributes**
   ```html
   aria-label="..."
   role="..."
   ```

---

## Testing Requirements

### Manual Testing Checklist

Before submitting, verify:

- [ ] **Light mode** - Component looks good
- [ ] **Dark mode** - Component looks good
- [ ] ** Responsive** - Works on mobile, tablet, desktop
- [ ] **Keyboard navigation** - Tab, Enter, Space work
- [ ] **Screen reader** - Content announced correctly
- [ ] **Disabled state** - Properly styled and non-interactive
- [ ] **Error state** - If applicable, displays correctly
- [ ] **Focus visible** - Focus indicator is clear
- [ ] **Reduced motion** - Respects user preference

### Automated Testing

Add unit tests for complex logic:

```typescript
// ComponentName.test.ts
import { test, expect } from 'vitest';
import { render } from '@testing-library/astro';
import ComponentName from './ComponentName.astro';

test('renders with default props', () => {
  const { container } = render(ComponentName, {
    props: { name: 'test' },
  });
  
  expect(container.querySelector('.component-name')).toBeTruthy();
});
```

### Accessibility Testing

```bash
# Run axe-core tests
npm run test:a11y
```

---

## Documentation Standards

### Component Documentation

Add to `docs/astro-components.md`:

```markdown
### ComponentName

**Import**: `import { ComponentName } from '@aaltjesdagen/ui/components';`

**Description**: Brief description.

**Props**:
\`\`\`typescript
interface Props {
  name: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}
\`\`\`

**Usage**:
\`\`\`astro
<ComponentName
  name="example"
  variant="primary"
  size="md"
/>
\`\`\`

**Features**:
- Feature 1
- Feature 2
```

### Code Comments

```typescript
/**
 * Calculate responsive size classes
 * @param size - Size variant (sm, md, lg)
 * @returns Tailwind CSS classes
 */
function getSizeClasses(size: Props['size']): string {
  // Implementation
}
```

---

## Code Style

### TypeScript

```typescript
// ✅ Good
export interface Props {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

// ❌ Bad
export interface Props {
  variant?: string;  // Too vague
  size?: any;        // No type safety
}
```

### Naming Conventions

- **Components**: PascalCase (`ComponentName.astro`)
- **Props**: camelCase (`fontSize`, `isActive`)
- **CSS classes**: kebab-case (`.component-name`)
- **CSS variables**: kebab-case (`--color-primary`)

### Tailwind CSS

```typescript
// ✅ Good - Use class:list with conditionals
<div class:list={[
  'base-classes',
  variant === 'primary' && 'primary-classes',
  size === 'lg' && 'large-classes',
]}>

// ❌ Bad - String concatenation
<div class={`base-classes ${variant === 'primary' ? 'primary-classes' : ''}`}>
```

### CSS Variables

```css
/* ✅ Good - Use design tokens */
.component {
  color: var(--text-primary);
  background: var(--bg-elevated);
  transition: all var(--transition-base);
}

/* ❌ Bad - Hardcoded values */
.component {
  color: #2c3e50;
  background: #ffffff;
  transition: all 200ms;
}
```

---

## Pull Request Process

### 1. Create Feature Branch

```bash
git checkout -b feature/add-component-name
```

**Branch Naming**:
- `feature/add-component-name` - New components
- `fix/component-name-issue` - Bug fixes
- `docs/update-readme` - Documentation
- `refactor/component-name` - Refactoring

### 2. Make Changes

- Add component file
- Update `src/components/index.ts` exports
- Add documentation to `docs/astro-components.md`
- Test thoroughly

### 3. Commit

```bash
git add .
git commit -m "feat: add ComponentName component

- Add new ComponentName component to [category]/ folder
- Supports variants: primary, secondary
- Includes accessibility attributes (ARIA)
- Fully documented in astro-components.md"
```

**Commit Message Format**:
```
type: short description

- Detail 1
- Detail 2
```

**Types**:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `refactor` - Code refactoring
- `test` - Adding tests
- `style` - Formatting, CSS

### 4. Push & Create PR

```bash
git push origin feature/add-component-name
```

Create pull request with:
- **Title**: `feat: Add ComponentName component`
- **Description**:
  - What does this component do?
  - Screenshots (if visual)
  - Testing checklist completed
  - Breaking changes (if any)

### 5. Code Review

Address feedback from reviewers:
- Make requested changes
- Update tests/docs as needed
- Push changes to same branch

### 6. Merge

Once approved:
- Squash and merge
- Delete feature branch

---

## Component Checklist

Before submitting a new component:

### Code Quality
- [ ] TypeScript Props interface defined
- [ ] Default props set for optional values
- [ ] JSDoc comments added
- [ ] Uses CSS variables (no hardcoded colors)
- [ ] Follows naming conventions

### Functionality
- [ ] Works in light mode
- [ ] Works in dark mode
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Handles edge cases (empty, long text)

### Accessibility
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] Color contrast passes WCAG AA

### Documentation
- [ ] Added to `docs/astro-components.md`
- [ ] Props documented
- [ ] Usage example provided
- [ ] Features listed

### Testing
- [ ] Manual testing completed
- [ ] Automated tests (if applicable)
- [ ] Accessibility tests pass

---

## Questions?

Need help? Reach out:

- **File an issue**: [GitHub Issues](https://github.com/yourusername/repo/issues)
- **Discussion**: [GitHub Discussions](https://github.com/yourusername/repo/discussions)

---

## Next Steps

- **[Astro Components](./astro-components.md)** - See existing components
- **[Design Tokens](./design-tokens.md)** - Available design tokens
- **[Accessibility](./accessibility.md)** - Accessibility requirements
