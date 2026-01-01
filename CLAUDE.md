# Project Architecture Documentation

> **For AI Agents**: This document defines strict architectural rules for implementing Figma designs as React TypeScript components. Follow all rules exactly.

## Tech Stack

- **Vite** - Build tool
- **React 18+** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling (⚠️ v4 has different configuration than v3)
- **Base UI** (`@base-ui/react`) - Headless component primitives from npm

## Project Structure

```
src/
├── routes/              # Route-specific implementations
│   ├── index/          # Navigation hub (/)
│   └── homepage/       # Homepage route (/homepage)
├── App.tsx             # Root component
└── main.tsx           # Application entry
```

## Architecture Principles

### Pure Route Isolation

**DEFINITION**: Each route is completely self-contained with its own components, styles, and logic. Routes share npm dependencies but NOT local component code.

**CRITICAL RULES FOR AGENTS:**

1. **✅ ALLOWED - Direct npm imports in routes:**
   ```tsx
   // src/routes/homepage/index.tsx
   import { Button } from '@base-ui/react/button';
   import { Input } from '@base-ui/react/input';
   ```

2. **❌ FORBIDDEN - Shared local component wrappers:**
   ```tsx
   // ❌ DO NOT CREATE src/components/shared/ or src/components/ui/
   // ❌ DO NOT import components from other routes
   import { CustomButton } from '@/components/shared/CustomButton';
   import { Header } from '@/routes/other-route/Header';
   ```

3. **✅ ALLOWED - Route-internal components:**
   ```tsx
   // src/routes/homepage/atoms/ProductCard.tsx
   // Can be imported within homepage route ONLY
   import { ProductCard } from './atoms/ProductCard';
   ```

**Import Sources (in order of preference):**
1. Base UI from npm: `@base-ui/react/*`
2. React built-ins: `react`, `react-dom`
3. Route-internal components: `./atoms/*`, `./molecules/*`, `./organisms/*`
4. Never: Cross-route imports, shared wrappers

### Only Create What You Need
- No empty directories or placeholder files
- No unused abstractions or "future-proofing"
- Create components only when implementing actual features
- Keep it simple and focused

### Component Architecture (Atomic Design)

When a route requires internal components, organize them atomically:

```
src/routes/homepage/
├── index.tsx           # Route entry point
├── atoms/             # Smallest UI pieces (only if needed)
├── molecules/         # Simple component groups (only if needed)
└── organisms/         # Complex sections (only if needed)
```

**Only create directories and components as you need them.** Don't scaffold empty folders.

## TypeScript Standards

### Strict Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Type Definitions
- Use `interface` for object shapes and component props
- Use `type` for unions, intersections, and utilities
- Always type component props explicitly
- Avoid `any` - use `unknown` if type is truly unknown

### Examples
```typescript
// Component props
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// State types
interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

// Union types
type Status = 'idle' | 'loading' | 'success' | 'error';
```

## Base UI Usage

### Import Pattern
Base UI is installed via npm and imported from `@base-ui/react`:

```tsx
import { Button } from '@base-ui/react/button';
import { Input } from '@base-ui/react/input';
import { Dialog } from '@base-ui/react/dialog';
```

### Key Characteristics
- **Headless/Unstyled**: Base UI provides NO default styles
- **Source location**: Lives in `node_modules/`, NOT your project
- **Accessibility**: Built-in ARIA patterns and keyboard navigation
- **Customization**: Style completely with Tailwind CSS

### Styling Base UI Components

Base UI components accept `className` for Tailwind styling:

```tsx
<Button.Root className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  Click me
</Button.Root>
```

**Agent Rule**: Always check Base UI documentation for component API before implementing. Different components have different slot structures (e.g., `Button.Root`, `Dialog.Backdrop`, etc.).

### Base UI Button Styling

Base UI buttons are completely unstyled. To make them work with both Tailwind and inline styles, use this CSS reset in `src/index.css`:

```css
/* Reset button styles for Base UI compatibility */
button {
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  box-sizing: border-box;
}
```

**❌ NEVER use `all: unset`** - it removes ALL styles including Tailwind utilities, making them ineffective.

**Example button styling:**
```tsx
import { Button } from '@base-ui/react/button';

// With Tailwind classes
<Button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
  Click me
</Button>

// With inline styles (for exact Figma matching)
<Button style={{
  padding: '16px 24px',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  borderRadius: '8px'
}}>
  Click me
</Button>

// Combined approach
<Button
  className="flex items-center gap-2"
  style={{
    padding: '24px',
    borderRadius: '20px',
    backgroundImage: 'linear-gradient(-64deg, rgba(26, 30, 36, 1) 69.65%, rgba(40, 45, 54, 1) 91.12%)'
  }}
>
  Click me
</Button>
```

## Styling Guidelines

### Tailwind CSS v4 Configuration

**⚠️ IMPORTANT**: This project uses Tailwind CSS v4, which differs significantly from v3:

1. **CSS-based configuration** instead of `tailwind.config.js`:
```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --color-text-bright: #e6eaf0;
  --color-surface-level-3: #2e353d;
  --font-family-gt-walsheim: "GT Walsheim Trial", sans-serif;
}
```

2. **Vite plugin integration** (already configured in `vite.config.ts`):
```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()]
})
```

3. **No `postcss.config.js` needed** when using the Vite plugin
4. **No `tailwind.config.js` needed** - use `@theme` in CSS instead

### Styling Approach Priority

Use this priority order when styling components:

1. **Tailwind utility classes** (preferred when they work):
```tsx
<Button className="p-6 rounded-2xl bg-surface-level-3">
```

2. **Inline styles with exact Figma values** (when Tailwind utilities aren't generated):
```tsx
<Button style={{
  padding: '24px',
  borderRadius: '20px',
  backgroundColor: '#2e353d'
}}>
```

**When to use inline styles:**
- Exact pixel values from Figma that don't match Tailwind's scale
- Complex gradients from Figma
- Tailwind v4 configuration issues prevent utility class generation
- Achieving pixel-perfect match to design is critical

### Tailwind CSS Conventions
- Build complete visual design with Tailwind (Base UI has NO styles)
- Use consistent spacing scale when possible (4px base: `p-4`, `mt-2`, `gap-6`)
- Leverage Tailwind's design tokens for colors, typography, shadows
- Combine Tailwind classes with inline styles when needed

### Responsive Design
```tsx
// Mobile-first approach
<div className="p-4 md:p-8 lg:p-12">
  <h1 className="text-2xl md:text-4xl lg:text-5xl">
    Responsive heading
  </h1>
</div>
```

### Custom Colors in Tailwind v4
Add custom colors using `@theme` in `src/index.css`:

```css
@theme {
  --color-brand-blue: #1a73e8;
  --color-surface-dark: #1e232e;
}
```

Then use them with Tailwind classes:
```tsx
<div className="bg-brand-blue text-surface-dark">
```

### Tailwind v4 Troubleshooting

**Problem**: Tailwind utility classes not being applied (padding, margins showing as 0px)

**Diagnosis**:
1. Check browser dev tools: `window.getComputedStyle(element)` shows default values instead of Tailwind values
2. Check CSS rules count: Very low number (< 100 rules) indicates Tailwind isn't processing

**Common causes:**
- `postcss.config.js` file exists (conflicts with Vite plugin - delete it)
- `tailwind.config.js` file exists (v4 uses CSS-based config - delete it)
- CSS reset with `all: unset` on buttons (removes all styles - use selective reset instead)
- Tailwind Vite plugin not configured in `vite.config.ts`

**Solution**: Use inline styles with exact Figma values as fallback:
```tsx
// Instead of relying on Tailwind classes that may not be generated
<Button className="p-6 rounded-2xl"> // May not work

// Use inline styles for critical styling
<Button style={{ padding: '24px', borderRadius: '20px' }}>
```

This ensures pixel-perfect implementation regardless of Tailwind configuration issues.

## Figma-to-React Workflow (For Agents)

**INSTRUCTION**: Follow these steps in exact order when implementing a route from Figma.

### Step 1: Extract Design Context
Use Figma MCP tools to get design node:
```bash
# Agent: Use mcp__figma__get_design_context with nodeId and fileKey
```

**Extract from Figma:**
- Layout structure (container, grid, flex)
- Exact spacing values (padding, margin, gap)
- Color values (hex/rgb/hsl)
- Typography (font family, size, weight, line-height)
- Border radius, shadows, borders
- Asset URLs (images, icons)

### Step 2: Identify Base UI Components
Map Figma interactive elements to Base UI:
- Buttons → `@base-ui/react/button`
- Text inputs → `@base-ui/react/input`
- Dropdowns → `@base-ui/react/select`
- Modals/overlays → `@base-ui/react/dialog`
- Tabs → `@base-ui/react/tabs`
- Accordions → `@base-ui/react/accordion`
- Checkboxes → `@base-ui/react/checkbox`
- Radio groups → `@base-ui/react/radio-group`

**Agent Rule**: For non-interactive elements (divs, text, images), use plain HTML/React elements. Only use Base UI for interactive components.

### Step 3: Add Custom Colors to Tailwind
If Figma uses colors not in Tailwind's default palette:

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        'brand-primary': '#1a73e8',    // Example from Figma
        'surface-dark': '#1e232e',     // Example from Figma
      }
    }
  }
}
```

### Step 4: Build Layout Structure
1. Create route entry point: `src/routes/[route-name]/index.tsx`
2. Build HTML structure matching Figma hierarchy
3. Use semantic HTML (`<header>`, `<main>`, `<section>`, `<nav>`)
4. Apply Tailwind layout utilities (`flex`, `grid`, `space-y-*`)

### Step 5: Style Components
Match Figma design exactly using the appropriate styling approach:

**Option A - Tailwind classes** (when utilities are generated correctly):
- Spacing: `p-4`, `m-2`, `gap-6`, `space-y-4`
- Colors: `bg-blue-600`, `text-gray-900`, `border-gray-200`
- Typography: `text-xl`, `font-bold`, `leading-tight`
- Borders: `rounded-lg`, `border`, `border-2`
- Shadows: `shadow-md`, `shadow-lg`

**Option B - Inline styles** (for exact Figma values or when Tailwind has issues):
- Exact spacing: `padding: '24px'`, `gap: '8px'`
- Exact colors: `color: '#e6eaf0'`, `backgroundColor: '#2e353d'`
- Typography: `fontSize: '20px'`, `fontWeight: 500`, `letterSpacing: '-0.5px'`
- Gradients: `backgroundImage: 'linear-gradient(...)'`

**Recommended approach**: Combine both - use Tailwind for layout/positioning, inline styles for exact values:
```tsx
<Button
  className="flex flex-col items-start justify-between relative w-full"
  style={{
    padding: '24px',
    borderRadius: '20px',
    backgroundImage: 'linear-gradient(-64deg, rgba(26, 30, 36, 1) 69.65%, rgba(40, 45, 54, 1) 91.12%)'
  }}
>
```

### Step 6: Create Atomic Components (If Needed)
**Only create subdirectories when route has repeated patterns:**

```
src/routes/homepage/
├── index.tsx           # Main route file
├── atoms/             # Create only if needed
│   └── ProductCard.tsx
└── organisms/         # Create only if needed
    └── ProductGrid.tsx
```

**Agent Rule**: Start with everything in `index.tsx`. Only extract components when code becomes repetitive or file exceeds ~200 lines.

### Step 7: Add TypeScript Types
Define interfaces for data structures:

```tsx
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface HomepageProps {
  products: Product[];
}
```

## Implementation Checklist (For Agents)

**INSTRUCTION**: Use this checklist for every route implementation. Complete in order.

### Pre-Implementation
- [ ] Extract Figma design context via `mcp__figma__get_design_context`
- [ ] Identify all interactive components (buttons, inputs, etc.)
- [ ] List custom colors not in default Tailwind palette
- [ ] Note required Base UI imports

### Implementation
- [ ] Create `src/routes/[route-name]/index.tsx`
- [ ] Add custom colors to `tailwind.config.js` (if needed)
- [ ] Install Base UI if not present: `npm i @base-ui/react`
- [ ] Build HTML structure matching Figma hierarchy
- [ ] Import required Base UI components
- [ ] Apply Tailwind classes to match design pixel-perfectly
- [ ] Add TypeScript interfaces for props/data
- [ ] Implement interactive states (hover, focus, active, disabled)

### Post-Implementation
- [ ] Extract repeated patterns to atoms/molecules (if needed)
- [ ] Verify responsive behavior (mobile, tablet, desktop)
- [ ] Compare with Figma design for pixel-perfect match
- [ ] Check TypeScript has no errors: `npm run build`

### Common Mistakes to Avoid
- ❌ Creating `src/components/shared/` directory
- ❌ Wrapping Base UI in custom components
- ❌ Importing from other routes
- ❌ Creating empty atoms/molecules directories upfront
- ❌ Using overly aggressive CSS resets like `button { all: unset }` (removes Tailwind classes)
- ❌ Guessing Base UI component APIs (always check docs)
- ❌ Creating `postcss.config.js` or `tailwind.config.js` files (Tailwind v4 uses CSS-based config)

## Routes

- `/` - Navigation hub
- `/homepage` - Homepage implementation from Figma design

---

## Quick Reference for Agents

### ✅ DO:
- Import Base UI directly: `import { Button } from '@base-ui/react/button'`
- Style with Tailwind: `className="px-4 py-2 bg-blue-600"`
- Create route directories: `src/routes/homepage/index.tsx`
- Keep components within route: `src/routes/homepage/atoms/Card.tsx`
- Use TypeScript interfaces for all props and data
- Follow Figma design pixel-perfectly

### ❌ DON'T:
- Create `src/components/shared/` or `src/components/ui/`
- Wrap Base UI in custom components
- Import components from other routes
- Create empty directories upfront
- Use `button { all: unset }` CSS reset (removes all styles including Tailwind)
- Create `postcss.config.js` or `tailwind.config.js` (Tailwind v4 uses CSS-based config)
- Guess Base UI APIs without checking documentation

### Key Files:
- **Route entry**: `src/routes/[name]/index.tsx`
- **Tailwind config**: `src/index.css` (use `@theme` for custom colors in Tailwind v4)
- **Global styles**: `src/index.css` (CSS resets, font imports, Base UI button reset)
- **Package**: Base UI from npm `@base-ui/react`

---

**Core Principle**: Each route is self-contained. Import from npm, not from other routes.

---

## Implementation Plan: Client Dashboard (Figma Node 184:3661)

> **Status**: ✅ **IMPLEMENTED** with Atomic Design Architecture
> **Figma URL**: `https://www.figma.com/design/MAzIbPSnkgSyZELRWCAuqM/Agate--WS-Design-System-?node-id=184-3661`
> **Route**: `/homepage` (implemented as homepage route)
> **Last Updated**: 2025-12-31
> **Implementation Location**: `src/routes/homepage/` (atomic design structure)

### High-Level Design Analysis

The client dashboard is a financial advisor/wealth management home screen with the following sections:

1. **Top Navigation Bar**
   - Hamburger menu (left)
   - "Add New Client" button with plus icon
   - "All Clients" dropdown menu (right)

2. **Hero Section**
   - Large welcome title: "Welcome back, Laura"
   - Search bar with placeholder "Search by client name or characteristics"
   - AI prompt chips (pill-shaped filter buttons):
     - "Clients with estate planning gaps"
     - "New Parents without a 529 established"
     - "Clients above 2M net worth"

3. **Client Lists Section**
   - Section label: "CLIENT LISTS" (small caps)
   - 6 cards in a 3x2 grid layout
   - Each card contains:
     - Icon (top right)
     - Title
     - Description text
     - Client count (e.g., "10 CLIENTS")
   - Card types:
     - Recent (recently viewed clients)
     - Upcoming Meetings (meetings in next 14 days)
     - Time Sensitive (upcoming deadlines and overdue actions)
     - Pending Review (new recs pending advisor review)
     - Planning Gaps (financial health vulnerabilities)
     - Needs Outreach (contact or client-pending actions)

4. **Footer**
   - "Customize" button with gear icon (centered)

### Design System

**Theme**: Dark mode
- Primary background: Dark blue-gray (#1a1f2e or similar)
- Surface background: Slightly lighter dark (#252b3b or similar)
- Text primary: White/light gray (#ffffff, #e5e7eb)
- Text secondary: Medium gray (#9ca3af)
- Accent: Subtle blue highlights
- Borders: Subtle dark borders (#374151 or similar)

**Typography**:
- Hero title: Large serif font (~40px)
- Section labels: Small caps, letter-spacing, light weight
- Card titles: Medium weight sans-serif
- Body text: Regular sans-serif

**Spacing**:
- Container padding: ~32px horizontal
- Card gap: ~16px
- Internal card padding: ~24px
- Section spacing: ~32-48px vertical

**Visual Elements**:
- Rounded corners on cards: ~12px
- Rounded corners on inputs/buttons: ~8px
- Subtle shadows on cards
- Icons: Line-style icons (~20-24px)

### Component Mapping to Base UI

| UI Element | Base UI Component | Notes |
|------------|-------------------|-------|
| Hamburger menu button | `<Button>` from `@base-ui/react/button` | Opens navigation menu |
| "Add New Client" button | `<Button>` from `@base-ui/react/button` | Primary action button |
| "All Clients" dropdown | `<Menu>` from `@base-ui/react/menu` | Menu.Root + Menu.Trigger + Menu.Popup |
| Search input | `<Input>` from `@base-ui/react/input` | Or `<Autocomplete>` if search suggests |
| AI prompt chips | `<Button>` variant | Styled as pills, possibly toggleable |
| Client list cards | Custom `<div>` | No interactivity, pure layout |
| Card icons | Inline `<svg>` | Custom SVG icons |
| "Customize" button | `<Button>` from `@base-ui/react/button` | Secondary style |

**Non-Base UI Elements** (use plain HTML):
- Hero title: `<h1>`
- Section label: `<h2>` or `<div>`
- Card container: `<div>` with grid layout
- Card content: `<div>`, `<p>`, etc.

### Semantic Decomposition Strategy

**Route Structure**:
```
src/routes/client-dashboard/
├── index.tsx              # Main route entry point
├── atoms/                 # (Create only if needed)
│   ├── ClientListCard.tsx # Repeating card component
│   └── FilterChip.tsx     # AI prompt chip button
└── organisms/             # (Create only if needed)
    └── TopNav.tsx         # Navigation bar (if extracted)
```

**Initial Approach**: Start with everything in `index.tsx`. Only extract components if:
- File exceeds ~200 lines
- Obvious repetition (e.g., 6 identical cards → extract `ClientListCard`)

### Base UI Component APIs

Based on Context7 documentation:

**Button**:
```tsx
import { Button } from '@base-ui/react/button';

<Button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
  Add New Client
</Button>
```

**Menu** (for "All Clients" dropdown):
```tsx
import { Menu } from '@base-ui/react/menu';

<Menu.Root>
  <Menu.Trigger className="...">
    All Clients
  </Menu.Trigger>
  <Menu.Portal>
    <Menu.Positioner sideOffset={8}>
      <Menu.Popup className="...">
        <Menu.Item className="...">Option 1</Menu.Item>
        <Menu.Item className="...">Option 2</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>
```

**Input** (for search bar):
```tsx
import { Input } from '@base-ui/react/input';

<Input
  placeholder="Search by client name or characteristics"
  className="w-full px-4 py-3 rounded-lg bg-surface-dark text-white border border-gray-700"
/>
```

### Custom Colors for Tailwind Config

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        // Dark theme palette (extract exact values from Figma)
        'primary-bg': '#1a1f2e',        // Main background
        'surface-bg': '#252b3b',        // Card/surface background
        'surface-hover': '#2d3548',     // Hover state
        'border-dark': '#374151',       // Borders
        'text-primary': '#ffffff',      // Primary text
        'text-secondary': '#9ca3af',    // Secondary text
        'accent-blue': '#3b82f6',       // Accent color
      }
    }
  }
}
```

### TypeScript Interfaces

```typescript
// Client list card data structure
interface ClientListCard {
  id: string;
  title: string;
  description: string;
  count: number;
  countLabel: string;      // e.g., "CLIENTS"
  iconName: string;        // Identifier for icon type
}

// Mock data for cards
const clientListCards: ClientListCard[] = [
  {
    id: 'recent',
    title: 'Recent',
    description: 'Recently viewed clients',
    count: 10,
    countLabel: 'CLIENTS',
    iconName: 'clock',
  },
  {
    id: 'upcoming-meetings',
    title: 'Upcoming Meetings',
    description: 'Meetings in the next 14 days',
    count: 35,
    countLabel: 'CLIENTS',
    iconName: 'calendar',
  },
  // ... etc
];
```

### Implementation Steps

1. **Setup** (if not already done):
   ```bash
   npm install @base-ui/react
   ```

2. **Extract exact colors from Figma**:
   - Use Figma inspect mode to get hex values
   - Add to `tailwind.config.js`

3. **Create route structure**:
   ```
   src/routes/client-dashboard/index.tsx
   ```

4. **Build layout in order**:
   - Top navigation bar with hamburger, buttons, menu
   - Hero section with title
   - Search bar
   - Filter chips row
   - Client lists grid (3 columns, 2 rows)
   - Footer with customize button

5. **Style with Tailwind**:
   - Dark background colors
   - White/gray text
   - Rounded corners
   - Proper spacing and gaps
   - Hover states

6. **Add interactivity**:
   - Menu dropdown functionality
   - Button hover states
   - Search input focus states
   - Filter chip toggle (if needed)

7. **Extract components** (only if needed):
   - If cards are repetitive → `atoms/ClientListCard.tsx`
   - If chips are complex → `atoms/FilterChip.tsx`

### Accessibility Considerations

- Use semantic HTML (`<nav>`, `<main>`, `<header>`)
- Ensure proper heading hierarchy (`<h1>`, `<h2>`)
- Add `aria-label` to icon-only buttons (hamburger menu)
- Base UI components provide ARIA patterns automatically
- Ensure sufficient color contrast for dark theme
- Support keyboard navigation (Tab, Enter, Escape)

### Responsive Strategy

- **Desktop** (default): 3-column grid for cards
- **Tablet** (md breakpoint): 2-column grid
- **Mobile** (sm breakpoint): 1-column stack

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

### Implementation Summary

**Completed Steps:**

1. ✅ Extract Figma design context via MCP tools
2. ✅ Analyze high-level structure and semantic breakdown
3. ✅ Map all UI components to Base UI primitives
4. ✅ Plan semantic decomposition (route-based architecture)
5. ✅ Extract exact color values from Figma (#e6eaf0, #aeb4bc, #7a828d, etc.)
6. ✅ Create tailwind.config.js with custom design tokens
7. ✅ Create `src/routes/homepage/` directory structure
8. ✅ Implement complete layout with Tailwind CSS
9. ✅ Integrate Base UI components (Button, Menu)
10. ✅ Add TypeScript interfaces (ClientListCard)
11. ✅ Build succeeds with zero errors
12. ✅ Update App.tsx to render homepage route

**Implementation Decisions:**

- ✅ **Colors**: Extracted exact hex values from Figma and added to Tailwind config
- ✅ **Icons**: Used inline SVG components for icons (simple, no external dependencies)
- ✅ **Search bar**: Implemented as plain `<input>` with button (can upgrade to Autocomplete later)
- ✅ **Filter chips**: Static `<Button>` components with hover states (can add toggle state if needed)
- ✅ **Customize button**: Renders as button with icon (behavior can be added later)
- ✅ **Card layout**: Non-interactive cards with hover scale effect
- ✅ **Fonts**: Used Google Fonts for available fonts (Noto Serif JP, Plus Jakarta Sans, IBM Plex Mono)
- ✅ **GT Walsheim**: Commercial font - using system font fallback (would need license to use actual font)

**Key Files Created:**

- `src/routes/homepage/index.tsx` - Complete homepage implementation (276 lines)
- `tailwind.config.js` - Custom color palette and typography tokens
- Updated `src/index.css` - Font imports and base styles
- Updated `src/App.tsx` - Routes to homepage component

**Component Architecture (Atomic Design):**

The homepage has been decomposed into a semantic hierarchy following Atomic Design principles:

```
src/routes/homepage/
├── index.tsx                          # Route entry (40 lines - clean composition)
├── atoms/                             # Smallest, indivisible UI components
│   ├── icons/                         # Icon library (12 SVG components)
│   │   ├── index.ts                   # Barrel export
│   │   ├── HamburgerIcon.tsx
│   │   ├── PlusIcon.tsx
│   │   ├── FolderIcon.tsx
│   │   ├── CaretDownIcon.tsx
│   │   ├── SearchPlusIcon.tsx
│   │   ├── ClockIcon.tsx
│   │   ├── CalendarIcon.tsx
│   │   ├── AlertIcon.tsx
│   │   ├── DocumentIcon.tsx
│   │   ├── ChartIcon.tsx
│   │   ├── UserIcon.tsx
│   │   └── GearIcon.tsx
│   └── IconBadge.tsx                  # Circular icon container (Figma: 6px padding, 32px radius)
├── molecules/                         # Composite components
│   ├── ClientListCard.tsx             # Interactive card (Figma node 184-3727)
│   ├── FilterChip.tsx                 # Pill-shaped filter button
│   └── SearchBar.tsx                  # Search input with gradient bg
└── organisms/                         # Complex page sections
    ├── TopNavigation.tsx              # Nav bar with menu & actions
    ├── HeroSection.tsx                # Welcome heading
    ├── SearchSection.tsx              # Search bar + filter chips
    ├── ClientListsGrid.tsx            # Grid of client list cards
    └── Footer.tsx                     # Customize button
```

**Benefits of this decomposition:**
- **Maintainability**: Each component has single responsibility
- **Reusability**: Atoms and molecules can be reused across the route
- **Testability**: Small, focused components are easier to test
- **Readability**: Homepage index.tsx reduced from 379 lines to 40 lines
- **Design fidelity**: Each component matches exact Figma specs
- **Type safety**: Proper TypeScript interfaces for all props

**Architecture Adherence:**

✅ Pure route isolation - all components in `src/routes/homepage/`
✅ Direct Base UI imports - no wrapper components
✅ Atomic design pattern - proper hierarchy (atoms → molecules → organisms)
✅ Styling approach - Tailwind classes combined with inline styles for exact Figma values
✅ TypeScript strict mode - all types defined properly with interfaces
✅ Component documentation - JSDoc comments with Figma node references
✅ Proper button reset - selective CSS reset that preserves Tailwind classes
✅ Barrel exports - clean icon imports via index.ts

---
