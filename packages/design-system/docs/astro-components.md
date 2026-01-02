# Astro Components Reference

Complete reference for all 44 Astro components in the `@aaltjesdagen/ui` design system. Import from `@aaltjesdagen/ui/components`.

## Table of Contents

- [Forms](#forms)
- [Feedback](#feedback)
- [Layout](#layout)
- [Overlay](#overlay)
- [Navigation](#navigation)
- [Media](#media)
- [Core](#core)
- [Specialized](#specialized)

---

## Forms

### Input

**Import**: `import { Input } from '@aaltjesdagen/ui/components';`

**Description**: Accessible text input with validation states and size variants.

**Props**:
```typescript
interface Props {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  name: string;
  id?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}
```

**Usage**:
```astro
<Input
  type="email"
  name="email"
  placeholder="your@email.com"
  required
  fullWidth
  size="md"
/>

<!-- With error state -->
<Input
  name="username"
  error
  value="invalid"
/>
```

---

### Textarea

**Import**: `import { Textarea } from '@aaltjesdagen/ui/components';`

**Description**: Multi-line text input with resize control.

**Props**:
```typescript
interface Props {
  name: string;
  id?: string;
  placeholder?: string;
  value?: string;
  rows?: number;  // default: 4
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  fullWidth?: boolean;
  resize?: boolean;  // default: true
  class?: string;
}
```

**Usage**:
```astro
<Textarea
  name="message"
  placeholder="Your message..."
  rows={6}
  fullWidth
  resize={false}
/>
```

---

### Select

**Import**: `import { Select } from '@aaltjesdagen/ui/components';`

**Description**: Dropdown select with custom styling.

**Props**:
```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface Props {
  name: string;
  id?: string;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  fullWidth?: boolean;
  class?: string;
}
```

**Usage**:
```astro
---
const categories = [
  { value: 'music', label: 'Music' },
  { value: 'art', label: 'Art' },
  { value: 'food', label: 'Food', disabled: true },
];
---

<Select
  name="category"
  options={categories}
  placeholder="Select a category"
  fullWidth
/>
```

---

### Checkbox

**Import**: `import { Checkbox } from '@aaltjesdagen/ui/components';`

**Description**: Custom styled checkbox with animated checkmark.

**Props**:
```typescript
interface Props {
  name: string;
  id?: string;
  label: string;
  checked?: boolean;
  value?: string;
  disabled?: boolean;
  error?: boolean;
  class?: string;
}
```

**Usage**:
```astro
<Checkbox
  name="newsletter"
  label="Subscribe to newsletter"
  checked
/>
```

---

### Radio

**Import**: `import { Radio } from '@aaltjesdagen/ui/components';`

**Description**: Custom styled radio button.

**Props**:
```typescript
interface Props {
  name: string;
  id?: string;
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  class?: string;
}
```

**Usage**:
```astro
<Radio name="plan" value="basic" label="Basic Plan" />
<Radio name="plan" value="pro" label="Pro Plan" checked />
<Radio name="plan" value="enterprise" label="Enterprise" />
```

---

### Toggle

**Import**: `import { Toggle } from '@aaltjesdagen/ui/components';`

**Description**: iOS-style toggle switch.

**Props**:
```typescript
interface Props {
  name: string;
  id?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}
```

**Usage**:
```astro
<Toggle
  name="notifications"
  label="Push Notifications"
  checked
  size="md"
/>
```

---

### Label

**Import**: `import { Label } from '@aaltjesdagen/ui/components';`

**Description**: Form label with required indicator.

**Props**:
```typescript
interface Props {
  for: string;
  required?: boolean;
  class?: string;
}
```

**Usage**:
```astro
<Label for="email" required>
  Email Address
</Label>
<Input name="email" id="email" type="email" />
```

---

### FormField

**Import**: `import { FormField } from '@aaltjesdagen/ui/components';`

**Description**: Wrapper component combining label, input, and error/hint messages.

**Props**:
```typescript
interface Props {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  class?: string;
}
```

**Usage**:
```astro
<FormField
  label="Email Address"
  name="email"
  required
  hint="We'll never share your email"
>
  <Input
    type="email"
    name="email"
    fullWidth
  />
</FormField>

<!-- With error -->
<FormField
  label="Username"
  name="username"
  error="Username is already taken"
>
  <Input name="username" error fullWidth />
</FormField>
```

---

## Feedback

### Alert

**Import**: `import { Alert } from '@aaltjesdagen/ui/components';`

**Description**: Color-coded alert for notifications.

**Props**:
```typescript
interface Props {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible?: boolean;
  class?: string;
}
```

**Usage**:
```astro
<Alert variant="success" title="Success!" dismissible>
  Your changes have been saved.
</Alert>

<Alert variant="error" title="Error">
  Something went wrong. Please try again.
</Alert>
```

---

### Badge

**Import**: `import { Badge } from '@aaltjesdagen/ui/components';`

**Description**: Small label for status, categories, or counts.

**Props**:
```typescript
interface Props {
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  pulse?: boolean;
  class?: string;
}
```

**Usage**:
```astro
<Badge variant="primary">New</Badge>
<Badge variant="success" dot pulse>Online</Badge>
<Badge variant="warning" size="lg">Beta</Badge>
```

---

### Spinner

**Import**: `import { Spinner } from '@aaltjesdagen/ui/components';`

**Description**: Loading spinner indicator.

**Props**:
```typescript
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  class?: string;
}
```

**Usage**:
```astro
<Spinner size="md" />
<Spinner size="lg" color="text-accent" />
```

---

### Progress

**Import**: `import { Progress } from '@aaltjesdagen/ui/components';`

**Description**: Progress bar with determinate and indeterminate modes.

**Props**:
```typescript
interface Props {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  indeterminate?: boolean;
  color?: string;
  class?: string;
}
```

**Usage**:
```astro
<!-- Determinate -->
<Progress value={75} max={100} showLabel />

<!-- Indeterminate loading -->
<Progress indeterminate />
```

---

### Skeleton

**Import**: `import { Skeleton } from '@aaltjesdagen/ui/components';`

**Description**: Loading placeholder with shimmer animation.

**Props**:
```typescript
interface Props {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
  animate?: boolean;
  class?: string;
}
```

**Usage**:
```astro
<Skeleton variant="text" width="100%" />
<Skeleton variant="circular" width="3rem" height="3rem" />
<Skeleton variant="rectangular" height="200px" />
```

---

### Toast

**Import**: `import { Toast } from '@aaltjesdagen/ui/components';`

**Description**: Temporary notification with auto-dismiss.

**Props**:
```typescript
interface Props {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title: string;
  description?: string;
  durationMs?: number;  // default: 5000
  class?: string;
}
```

**Usage**:
```astro
<Toast
  variant="success"
  title="Ticket Booked!"
  description="Check your email for confirmation"
  durationMs={7000}
/>
```

---

## Layout

### Card

**Import**: `import { Card } from '@aaltjesdagen/ui/components';`

**Description**: Content card with header and footer slots.

**Props**:
```typescript
interface Props {
  variant?: 'base' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  class?: string;
}
```

**Slots  **: `header`, `default`, `footer`

**Usage**:
```astro
<Card variant="base" padding="md">
  <h3 slot="header">Card Title</h3>
  <p>Card content goes here</p>
  <div slot="footer">
    <button class="btn-primary">Action</button>
  </div>
</Card>
```

---

### Container

**Import**: `import { Container } from '@aaltjesdagen/ui/components';`

**Description**: Responsive container with max-width.

**Props**:
```typescript
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  class?: string;
}
```

**Usage**:
```astro
<Container size="lg" spacing="md">
  <h1>Page Content</h1>
</Container>
```

---

### Divider

**Import**: `import { Divider } from '@aaltjesdagen/ui/components';`

**Description**: Horizontal or vertical divider.

**Props**:
```typescript
interface Props {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  variant?: 'solid' | 'dashed' | 'dotted';
  class?: string;
}
```

**Usage**:
```astro
<Divider />
<Divider label="OR" />
<Divider orientation="vertical" variant="dashed" />
```

---

### Breadcrumbs

**Import**: `import { Breadcrumbs } from '@aaltjesdagen/ui/components';`

**Description**: Navigation breadcrumb trail.

**Props**:
```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface Props {
  items: BreadcrumbItem[];
  separator?: string;
  class?: string;
}
```

**Usage**:
```astro
---
const items = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'Festival', current: true },
];
---

<Breadcrumbs items={items} separator="/" />
```

---

### Tabs

**Import**: `import { Tabs } from '@aaltjesdagen/ui/components';`

**Description**: Tabbed interface with Alpine.js.

**Props**:
```typescript
interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
}

interface Props {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'line' | 'pills';
  class?: string;
}
```

**Slots**: Named slots for each tab ID

**Usage**:
```astro
---
const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'reviews', label: 'Reviews' },
];
---

<Tabs tabs={tabs} variant="line" defaultTab="overview">
  <div slot="overview">Overview content</div>
  <div slot="details">Details content</div>
  <div slot="reviews">Reviews content</div>
</Tabs>
```

---

### Accordion

**Import**: `import { Accordion } from '@aaltjesdagen/ui/components';`

**Description**: Expandable content sections.

**Props**:
```typescript
interface AccordionItem {
  id: string;
  title: string;
  content?: string;
  disabled?: boolean;
}

interface Props {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  class?: string;
}
```

**Slots**: Named slots for each item ID (if no content provided)

**Usage**:
```astro
---
const items = [
  { id: 'faq1', title: 'What is included?', content: 'All features...' },
  { id: 'faq2', title: 'How does it work?' },
];
---

<Accordion items={items} allowMultiple>
  <div slot="faq2">Custom content for FAQ 2</div>
</Accordion>
```

---

## Overlay

### Modal

**Import**: `import { Modal } from '@aaltjesdagen/ui/components';`

**Description**: Generic modal dialog with backdrop.

**Props**:
```typescript
interface Props {
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnEscape?: boolean;  // default: true
  closeOnBackdrop?: boolean;  // default: true
  showClose?: boolean;  // default: true
  class?: string;
}
```

**Slots**: `trigger`, `default`, `footer`

**Usage**:
```astro
<Modal title="Confirm Action" size="md">
  <button slot="trigger" class="btn-primary">
    Open Modal
  </button>
  
  <p>Are you sure you want to continue?</p>
  
  <div slot="footer">
    <button class="btn-secondary">Cancel</button>
    <button class="btn-accent">Confirm</button>
  </div>
</Modal>
```

---

### Tooltip

**Import**: `import { Tooltip } from '@aaltjesdagen/ui/components';`

**Description**: Hover tooltip with positioning.

**Props**:
```typescript
interface Props {
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;  // default: 200ms
  class?: string;
}
```

**Usage**:
```astro
<Tooltip content="Click to learn more" placement="top">
  <button class="btn-secondary">Info</button>
</Tooltip>
```

---

### Dropdown

**Import**: `import { Dropdown } from '@aaltjesdagen/ui/components';`

**Description**: Dropdown menu with items.

**Props**:
```typescript
interface DropdownItem {
  label: string;
  href?: string;
  onClick?: string;
  divider?: boolean;
  disabled?: boolean;
}

interface Props {
  items: DropdownItem[];
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  class?: string;
}
```

**Slots**: `trigger`

**Usage**:
```astro
---
const items = [
  { label: 'Profile', href: '/profile' },
  { label: 'Settings', href: '/settings' },
  { divider: true },
  { label: 'Logout', onClick: 'handleLogout()' },
];
---

<Dropdown items={items} placement="bottom-end">
  <button slot="trigger" class="btn-secondary">
    Menu
  </button>
</Dropdown>
```

---

### Popover

**Import**: `import { Popover } from '@aaltjesdagen/ui/components';`

**Description**: Popover for complex content.

**Props**:
```typescript
interface Props {
  title?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'click' | 'hover';
  class?: string;
}
```

**Slots**: `trigger`, `default`

**Usage**:
```astro
<Popover title="More Info" placement="right" trigger="click">
  <button slot="trigger" class="btn-secondary">
    Learn More
  </button>
  
  <p>Detailed information goes here...</p>
</Popover>
```

---

## Navigation

### Link

**Import**: `import { Link } from '@aaltjesdagen/ui/components';`

**Description**: Enhanced link component.

**Usage**:
```astro
<Link href="/about">About Us</Link>
```

---

### Navbar

**Import**: `import { Navbar } from '@aaltjesdagen/ui/components';`

**Description**: Responsive navigation header with desktop/mobile support.

**Props**:
```typescript
interface NavItem {
  name: string;
  href: string;
}

interface Props {
  items: NavItem[];
  logoSrc?: string;
  logoAlt?: string;
  sticky?: boolean;
  variant?: 'solid' | 'glass' | 'transparent';
  class?: string;
}
```

**Slots**: `logo`, `actions`

**Usage**:
```astro
---
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];
---

<Navbar items={navItems} sticky variant="glass">
  <img slot="logo" src="/logo.png" alt="Logo" class="h-8" />
  <button slot="actions" class="btn-primary">Sign In</button>
</Navbar>
```

---

### Drawer

**Import**: `import { Drawer } from '@aaltjesdagen/ui/components';`

**Description**: Slide-in drawer/sidebar with backdrop.

**Props**:
```typescript
interface Props {
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  class?: string;
}
```

**Slots**: `trigger`, `default`, `footer`

**Usage**:
```astro
<Drawer placement="right" size="20rem">
  <button slot="trigger" class="btn-primary">Open Menu</button>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
  <div slot="footer">
    <button class="btn-secondary">Close</button>
  </div>
</Drawer>
```

---

### Pagination

**Import**: `import { Pagination } from '@aaltjesdagen/ui/components';`

**Description**: Page navigation component.

**Usage**:
```astro
<Pagination currentPage={1} totalPages={10} />
```

---

## Media

### Icon

**Import**: `import { Icon } from '@aaltjesdagen/ui/components';`

**Description**: SVG icon component.

**Usage**:
```astro
<Icon name="menu" class="h-6 w-6" />
```

---

### Avatar

**Import**: `import { Avatar } from '@aaltjesdagen/ui/components';`

**Description**: User avatar with image, initials, or icon fallback.

**Props**:
```typescript
interface Props {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  initials?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  class?: string;
}
```

**Usage**:
```astro
<Avatar src="/avatar.jpg" alt="User" size="md" status="online" />
<Avatar initials="JD" size="lg" />
<Avatar size="sm" />  <!-- Fallback icon -->
```

---

## Core

### ThemeToggle

**Import**: `import { ThemeToggle } from '@aaltjesdagen/ui/components';`

**Description**: Light/dark mode toggle button.

**Usage**:
```astro
<ThemeToggle />
```

---

### VisuallyHidden

**Import**: `import { VisuallyHidden } from '@aaltjesdagen/ui/components';`

**Description**: Screen-reader only content.

**Usage**:
```astro
<VisuallyHidden>Skip to main content</VisuallyHidden>
```

---

## Specialized

### FilterBar

**Import**: `import { FilterBar } from '@aaltjesdagen/ui/components';`

**Description**: Filter component for program/events.

---

### ProgramModal

**Import**: `import { ProgramModal } from '@aaltjesdagen/ui/components';`

**Description**: Program-specific modal dialog.

---

## Complete Example

Here's a complete page using multiple components:

```astro
---
import {
  Container,
  Card,
  FormField,
  Input,
  Textarea,
  Select,
  Checkbox,
  Toggle,
  Alert,
  Badge,
  Spinner,
  Modal,
  Tabs,
} from '@aaltjesdagen/ui/components';

const categories = [
  { value: 'general', label: 'General' },
  { value: 'feedback', label: 'Feedback' },
];

const tabs = [
  { id: 'form', label: 'Contact Form' },
  { id: 'info', label: 'Information' },
];
---

<Container size="lg">
  <h1 class="heading-hero mb-8">Contact Us</h1>
  
  <Alert variant="info" title="Office Hours" dismissible>
    We're available Monday-Friday, 9AM-5PM
  </Alert>
  
  <Tabs tabs={tabs} variant="line" class="mt-8">
    <div slot="form">
      <Card>
        <form class="space-y-6">
          <FormField label="Name" name="name" required>
            <Input name="name" placeholder="Your name" fullWidth />
          </FormField>
          
          <FormField label="Email" name="email" required>
            <Input type="email" name="email" fullWidth />
          </FormField>
          
          <FormField label="Category" name="category">
            <Select name="category" options={categories} fullWidth />
          </FormField>
          
          <FormField label="Message" name="message" required>
            <Textarea name="message" rows={6} fullWidth />
          </FormField>
          
          <Checkbox
            name="newsletter"
            label="Subscribe to newsletter"
          />
          
          <Toggle name="urgent" label="Mark as urgent" />
          
          <button type="submit" class="btn-primary">
            Submit <Spinner size="sm" class="hidden" />
          </button>
        </form>
      </Card>
    </div>
    
    <div slot="info">
      <Card>
        <h3 class="text-xl font-bold mb-4">Get in Touch</h3>
        <p class="text-text-secondary">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </Card>
    </div>
  </Tabs>
</Container>
```

---

## Next Steps

- **[Design Tokens](./design-tokens.md)** - Understand the token system
- **[Animations](./animations.md)** - Add motion to components
- **[Utilities](./utilities.md)** - Helper functions
- **[Theming](./theming.md)** - Customize themes
