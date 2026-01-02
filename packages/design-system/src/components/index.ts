// Re-export all UI components

// ===== FORMS =====
export { default as Input } from './forms/Input.astro';
export { default as Textarea } from './forms/Textarea.astro';
export { default as Select } from './forms/Select.astro';
export { default as Checkbox } from './forms/Checkbox.astro';
export { default as Radio } from './forms/Radio.astro';
export { default as Toggle } from './forms/Toggle.astro';
export { default as Label } from './forms/Label.astro';
export { default as FormField } from './forms/FormField.astro';

// ===== FEEDBACK =====
export { default as Alert } from './feedback/Alert.astro';
export { default as Badge } from './feedback/Badge.astro';
export { default as Toast } from './feedback/Toast.astro';
export { default as Spinner } from './feedback/Spinner.astro';
export { default as Progress } from './feedback/Progress.astro';
export { default as Skeleton } from './feedback/Skeleton.astro';
export { default as EmptyState } from './feedback/EmptyState.astro';

// ===== LAYOUT =====
export { default as Tabs } from './layout/Tabs.astro';
export { default as Accordion } from './layout/Accordion.astro';
export { default as Divider } from './layout/Divider.astro';
export { default as Breadcrumbs } from './layout/Breadcrumbs.astro';
export { default as Card } from './layout/Card.astro';
export { default as Container } from './layout/Container.astro';
export { default as Grid } from './layout/Grid.astro';
export { default as Stack } from './layout/Stack.astro';
export { default as Table } from './layout/Table.astro';
export { default as Footer } from './layout/Footer.astro';
export { default as Hero } from './layout/Hero.astro';
export { default as Carousel } from './layout/Carousel.astro';

// ===== OVERLAY =====
export { default as Modal } from './overlay/Modal.astro';
export { default as Tooltip } from './overlay/Tooltip.astro';
export { default as Dropdown } from './overlay/Dropdown.astro';
export { default as Popover } from './overlay/Popover.astro';

// ===== NAVIGATION =====
export { default as Link } from './navigation/Link.astro';
export { default as Pagination } from './navigation/Pagination.astro';
export { default as Navbar } from './navigation/Navbar.astro';
export { default as Drawer } from './navigation/Drawer.astro';

// ===== MEDIA =====
export { default as Icon } from './media/Icon.astro';
export { default as Avatar } from './media/Avatar.astro';
export { default as Image } from './media/Image.astro';

// ===== CORE =====
export { default as ThemeToggle } from './core/ThemeToggle.astro';
export { default as VisuallyHidden } from './core/VisuallyHidden.astro';
export { default as Button } from './core/Button.astro';
export { default as SkipLink } from './core/SkipLink.astro';
export { default as ThemeProvider } from './ThemeProvider.astro';

// ===== SPECIALIZED =====
export { default as FilterBar } from './specialized/FilterBar.astro';
export { default as ProgramModal } from './specialized/ProgramModal.astro';
export { default as ContentCard } from './specialized/ContentCard.astro';
export { default as IconBadge } from './specialized/IconBadge.astro';
export { default as DecorativeUnderline } from './specialized/DecorativeUnderline.astro';

// ===== TYPE EXPORTS =====
// Export Props interfaces for better TypeScript support
export type { Props as InputProps } from './forms/Input.astro';
export type { Props as TextareaProps } from './forms/Textarea.astro';
export type { Props as SelectProps } from './forms/Select.astro';
export type { Props as CheckboxProps } from './forms/Checkbox.astro';
export type { Props as RadioProps } from './forms/Radio.astro';
export type { Props as ToggleProps } from './forms/Toggle.astro';
export type { Props as LabelProps } from './forms/Label.astro';
export type { Props as FormFieldProps } from './forms/FormField.astro';

export type { Props as AlertProps } from './feedback/Alert.astro';
export type { Props as BadgeProps } from './feedback/Badge.astro';
export type { Props as ToastProps } from './feedback/Toast.astro';
export type { Props as SpinnerProps } from './feedback/Spinner.astro';
export type { Props as ProgressProps } from './feedback/Progress.astro';
export type { Props as SkeletonProps } from './feedback/Skeleton.astro';
export type { Props as EmptyStateProps } from './feedback/EmptyState.astro';

export type { Props as TabsProps } from './layout/Tabs.astro';
export type { Props as AccordionProps } from './layout/Accordion.astro';
export type { Props as DividerProps } from './layout/Divider.astro';
export type { Props as BreadcrumbsProps } from './layout/Breadcrumbs.astro';
export type { Props as CardProps } from './layout/Card.astro';
export type { Props as ContainerProps } from './layout/Container.astro';
export type { Props as GridProps } from './layout/Grid.astro';
export type { Props as StackProps } from './layout/Stack.astro';
export type { Props as TableProps } from './layout/Table.astro';
export type { Props as FooterProps } from './layout/Footer.astro';
export type { Props as HeroProps } from './layout/Hero.astro';
export type { Props as CarouselProps } from './layout/Carousel.astro';

export type { Props as ModalProps } from './overlay/Modal.astro';
export type { Props as TooltipProps } from './overlay/Tooltip.astro';
export type { Props as DropdownProps } from './overlay/Dropdown.astro';
export type { Props as PopoverProps } from './overlay/Popover.astro';

export type { Props as LinkProps } from './navigation/Link.astro';
export type { Props as PaginationProps } from './navigation/Pagination.astro';
export type { Props as NavbarProps } from './navigation/Navbar.astro';
export type { Props as DrawerProps } from './navigation/Drawer.astro';

export type { Props as IconProps } from './media/Icon.astro';
export type { Props as AvatarProps } from './media/Avatar.astro';
export type { Props as ImageProps } from './media/Image.astro';

export type { Props as ThemeToggleProps } from './core/ThemeToggle.astro';
export type { Props as VisuallyHiddenProps } from './core/VisuallyHidden.astro';
export type { Props as ButtonProps } from './core/Button.astro';
export type { Props as SkipLinkProps } from './core/SkipLink.astro';
export type { Props as ThemeProviderProps } from './ThemeProvider.astro';

export type { Props as ContentCardProps } from './specialized/ContentCard.astro';
export type { Props as IconBadgeProps } from './specialized/IconBadge.astro';
export type { Props as DecorativeUnderlineProps } from './specialized/DecorativeUnderline.astro';
