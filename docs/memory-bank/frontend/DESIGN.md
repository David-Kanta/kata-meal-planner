# DESIGN.md

## Design Implementation

- **Design System Approach**: Component-based design with consistent color palette, typography, and spacing
- **Styling Method**: CSS-based styling with consistent design tokens

## Design System Files

- **Theme Config**: Design tokens defined in theme configuration
- **Design Components**: Reusable UI components (buttons, cards, inputs, tables)
- **Style Guidelines**: Consistent spacing, borders, shadows, and responsive breakpoints

## Design System

- **Spacing Scale**: 12px vertical spacing between cards, 16px horizontal padding
- **Border Radius**: 8px for meal cards, 20px for filter buttons
- **Shadows**: Subtle shadows on cards (white background with rounded corners)
- **Breakpoints**: Mobile-first responsive design with desktop adaptations

- **Color Palette**: See theme config above

  - Primary: Orange (#FF8C00) - Action buttons, selected states, meal names, calendar highlights
  - Secondary: Light Orange (#FFD700) - Button borders, accent elements
  - Accent: White (#FFFFFF) - Card backgrounds, header backgrounds
  - Gray: Dark Gray (#424242, #616161, #757575, #9E9E9E) - Text colors, borders, unselected states
  - Background: Very Light Gray (#F8F8F8, #E0E0E0) - Unselected button backgrounds, card borders

- **Typography**: See theme config above
  - Primary Font: Title Large (24px, bold) - Page titles, section headers
  - Secondary Font: Subtitle Bold (16px, bold) - Meal names, recipe titles
  - Body Font: Body Regular (14px, regular) - Descriptions, body text
  - Fallback: System fonts

## Component Standards and Variantes

- **Button Variants**: 
  - Primary: Orange background (#FF8C00), white text - "Cook Now", "Add Item"
  - Secondary: Transparent background, orange border (#FFD700), orange text (#FF8C00) - "Swap Meal", "Add Recipe", "Create Meal Plan"
  - Unselected: Light gray background (#F8F8F8), dark gray text (#424242) - Filter buttons, preference buttons
  - Selected: Orange background (#FF8C00), white text - Selected filters, preferences
  
- **Input States**: 
  - Default: White background, light gray border (#E0E0E0)
  - Focus: Orange border (#FF8C00)
  - Dropdown: White background, light gray border, down arrow icon
  
- **Card Patterns**: 
  - Meal Cards: White background, rounded corners (8px), subtle shadow, full-width image, fixed height
  - Recipe Cards: White background, square image (80px x 80px), rounded corners (8px), horizontal layout
  - Calendar Days: Grid layout, current day highlighted with orange background (#FF8C00) and white circle

## Layout System

- **Grid System**: 
  - Mobile: Single column layout, full-width containers
  - Desktop: Multi-column layouts for calendar (7-column grid for weekdays), meal table (4-column: Day, Breakfast, Lunch, Dinner)
  
- **Container Widths**: 
  - Mobile: Full width with 16px horizontal padding
  - Desktop: Responsive container with consistent spacing
  
- **Spacing Rules**: 
  - Vertical: 12px between meal cards, consistent section spacing
  - Horizontal: 16px padding for cards and containers
  - Consistent alignment for buttons (horizontal alignment below meal names)

## Accessibility

- **Color Contrast**: Minimum 4.5:1 ratio for text and buttons (WCAG AA compliance)
- **Focus Management**: Keyboard navigation for all interactive elements (calendar, buttons, meals, dropdowns)
- **Screen Reader**: 
  - Alt text for all meal images
  - ARIA labels for action buttons and interactive elements
  - Semantic HTML structure for proper screen reader interpretation
