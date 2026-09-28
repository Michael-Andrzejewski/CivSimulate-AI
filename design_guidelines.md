# Design Guidelines: LLM-Powered Civilization Simulator

## Design Approach

**Selected Approach:** Design System + Strategic Game Aesthetics

This utility-focused strategic simulation tool requires clarity, information hierarchy, and immersive focus. Drawing inspiration from Linear's clean interfaces, Paradox Interactive's grand strategy games (Crusader Kings, Europa Universalis), and Notion's organized data management, while maintaining the professionalism of modern dashboard applications.

**Core Principle:** Create an interface that feels like a strategic command center - serious, focused, and immersive without visual distractions that would interrupt strategic thinking.

---

## Color Palette

### Dark Mode Primary (Default Theme)
- **Background Base:** 220 15% 8% (deep slate, command center feel)
- **Background Elevated:** 220 15% 12% (cards, panels)
- **Background Interactive:** 220 15% 16% (hover states)
- **Text Primary:** 220 10% 95%
- **Text Secondary:** 220 8% 65%
- **Text Tertiary:** 220 6% 45%

### Accent & Brand Colors
- **Primary Accent:** 210 85% 55% (strategic blue for CTAs, active states)
- **Success/Positive:** 145 70% 50% (civilization growth indicators)
- **Warning/Caution:** 35 95% 60% (catastrophe warnings)
- **Error/Danger:** 0 85% 60% (critical alerts)
- **Neutral Accent:** 220 12% 30% (borders, dividers)

### Light Mode (Optional Toggle)
- **Background Base:** 220 15% 98%
- **Background Elevated:** 220 15% 100%
- **Text Primary:** 220 15% 15%
- Maintain same accent colors with adjusted opacity for readability

---

## Typography

**Font Stack:**
- **Primary (UI):** Inter (via Google Fonts CDN)
- **Monospace (Data/Timestamps):** 'JetBrains Mono' (for civilization stats, dates)

**Scale & Weights:**
- **Hero/Page Titles:** text-4xl font-bold (civilization names, main headings)
- **Section Headers:** text-2xl font-semibold
- **Card Titles:** text-lg font-medium
- **Body Text:** text-base font-normal
- **Labels/Meta:** text-sm font-medium
- **Timestamps/Data:** text-sm font-mono
- **Helper Text:** text-xs text-secondary

**Line Heights:** Use tight leading for headers (leading-tight), relaxed for body text (leading-relaxed)

---

## Layout System

**Spacing Primitives:** Consistently use Tailwind units of **2, 4, 6, 8, 12, 16, 20** for all spacing
- Component padding: p-6 or p-8
- Section gaps: gap-6 or gap-8
- Page margins: px-6 md:px-12
- Vertical rhythm: space-y-8 for major sections, space-y-4 for grouped elements

**Container Strategy:**
- Max width: max-w-7xl mx-auto (main content area)
- Chat/simulation area: max-w-4xl for optimal reading
- Forms/settings panels: max-w-2xl
- Full-width panels for civilization selection grid

**Responsive Breakpoints:**
- Mobile: Single column, stacked layouts
- Tablet (md:): Two-column settings panels
- Desktop (lg:): Full three-column grids for civilization slots

---

## Component Library

### Authentication Screen
- Centered card (max-w-md) on neutral gradient background
- Title with game name in text-3xl
- Input fields with labels, clear focus states (ring-2 ring-primary)
- Primary CTA button (full width)
- Subtle footer with version/credits

### Civilization Dashboard (Save File Selection)
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Each save slot as elevated card (bg-elevated, rounded-xl, border)
- Empty slots: dashed border, "Create New Civilization" prompt with plus icon
- Active slots: Show civilization name, location, current date, last played timestamp
- Hover effect: subtle scale and border glow
- Delete/edit actions in top-right corner (icon buttons)

### Civilization Creation Form
- Two-column layout on desktop (settings left, preview/context right)
- **Required Settings Section:**
  - Location: Large text input with placeholder "e.g., Mesopotamia, Nile Valley..."
  - Starting Century: Custom dropdown with range display
  - Timescale: Dropdown with default highlighted, custom input conditionally shown
- **Optional Settings Panel:**
  - Collapsible accordion or always-visible with subtle background distinction
  - Each setting as row: Label + Dropdown/Toggle
  - Use toggle switches for yes/no options
  - Dropdowns with clear selected state
- Submit CTA: Large, prominent "Begin Civilization" button

### Simulation Chat Interface
- **Header Bar:** 
  - Civilization name (left), current date/era (center), settings icon (right)
  - Thin bottom border
- **Message Area:**
  - Full height scroll container with subtle scrollbar
  - System messages (LLM responses): Left-aligned, subtle background, rounded corners
  - User inputs: Right-aligned, primary accent background
  - Timestamps in monospace font
  - Generous message spacing (space-y-6)
- **Input Zone:**
  - Fixed bottom position
  - Multi-line textarea with auto-expand (max 5 lines)
  - Character count/word count for goals
  - Send button (primary) + settings dropdown (secondary)
  - Shows "Simulating..." loader state during LLM processing

### Dropdowns & Selects
- Custom styled (not native select elements)
- Rounded corners (rounded-lg)
- Clear active/selected state with checkmark icon
- Smooth dropdown animation (transform + opacity)
- Max height with scroll for long lists

### Buttons
- **Primary:** bg-primary text-white with hover brightness
- **Secondary:** border with hover background fill
- **Icon Buttons:** Rounded-full with hover background
- Consistent padding: px-6 py-3 for standard, px-4 py-2 for compact
- Focus ring: ring-2 ring-offset-2 for accessibility

### Cards & Panels
- Background: bg-elevated
- Border: 1px solid neutral accent
- Border radius: rounded-xl for major cards, rounded-lg for smaller elements
- Shadow: Minimal, only on elevation changes (shadow-sm)

---

## Navigation & Interaction

**Top Navigation (In-App):**
- Horizontal bar with logo/title left, user menu right
- Breadcrumb trail for civilization > settings > simulation
- Persistent access to save/load/settings

**Modal Overlays:**
- Semi-transparent backdrop (bg-black/60)
- Centered modal with max-w-2xl
- Close button (top-right X icon)
- Subtle entry/exit animation (scale + fade)

**Loading States:**
- Skeleton screens for data loading
- Spinner with civilization-themed icon for LLM processing
- Progress indicator for multi-step processes

---

## Animations & Interactions

**Minimal Animation Philosophy:** Motion only for functional feedback, not decoration
- **Hover States:** Subtle scale (scale-105) or brightness change
- **Transitions:** duration-200 for UI feedback, duration-300 for panel slides
- **Focus Indicators:** Instant ring appearance (transition-none)
- **Page Transitions:** Simple fade between routes
- **No:** Parallax, continuous animations, distracting particle effects

---

## Icons

**Library:** Heroicons (via CDN)
- Use outline variant for navigation/secondary actions
- Use solid variant for active states and primary CTAs
- Size: w-5 h-5 for inline, w-6 h-6 for prominent actions

**Key Icons:**
- Globe/Map for location
- Calendar for time settings
- Cog for settings
- Save/bookmark for save files
- Plus for create new
- Trash for delete
- Play/forward for simulate

---

## Images

This project is simulation-focused and does not require decorative hero images. Visual content limited to:
- Optional: Subtle map texture or parchment pattern as background overlay (low opacity, non-distracting)
- User civilization icons/flags (if user uploads custom imagery)
- All other visuals are UI-driven (icons, data visualization)

---

## Accessibility & Polish

- All interactive elements keyboard navigable
- ARIA labels for icon-only buttons
- Form validation with inline error messages
- Clear focus indicators (never remove outline)
- Sufficient color contrast (WCAG AA minimum)
- Responsive text sizing
- Dark mode as default with consistent implementation across all form inputs, textareas, and dropdowns