---
name: Obsidian Kinetic
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353942'
  surface-container-lowest: '#0a0e16'
  surface-container-low: '#181c24'
  surface-container: '#1c2028'
  surface-container-high: '#262a33'
  surface-container-highest: '#31353e'
  on-surface: '#dfe2ee'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#dfe2ee'
  inverse-on-surface: '#2c3039'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00a572'
  on-tertiary-container: '#00311f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0f131c'
  on-background: '#dfe2ee'
  surface-variant: '#31353e'
typography:
  headline-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: 4.25rem
    letterSpacing: -0.03em
  headline-display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.5rem
    fontWeight: '600'
    lineHeight: 3rem
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.04em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies high-velocity intelligence, precision, and immersive modern learning. Targeted at technical professionals, digital creators, and lifelong learners navigating complex domains, the aesthetic combines the deep focus of an IDE with the curated polish of high-end computational tools.

The visual direction fuses **Dark Glassmorphism** with an architectural **Obsidian Surface** paradigm:
- **Atmospheric Depth:** Multi-tiered obsidian and slate foundations that draw focus inward, eliminating visual noise.
- **Luminescent Signposts:** Electric violet and cyan/emerald chromatic energy applied selectively to signpost progression, state transitions, and interactive thresholds.
- **Precision Engineering:** Razor-sharp typography and hairline borders that give complex data models, code sandboxes, and learning paths an immediate sense of authority and structure.

## Colors

The palette is engineered specifically for prolonged cognitive endurance in dark environments. 

### Palette Architecture
- **Canvas & Backgrounds:** Deep space foundations anchored by `#0B0F17` (Canvas Base) and `#131B2B` (Surface Raised).
- **Surfaces & Containers:** Mid-level card backings use translucent navy-slates (`rgba(30, 41, 59, 0.7)` to `#1E293B`), bounded by hairline strokes (`#334155`).
- **Accent Signals:**
  - **Electric Violet (`#8B5CF6`):** Primary actions, course milestones, focused navigation, and active system nodes.
  - **Cyan (`#06B6D4`):** Real-time analytics, live collaboration indicators, and code-evaluation badges.
  - **Emerald (`#10B981`):** Success states, mastered competencies, and completed progress paths.
- **Text & Foreground Hierarchy:**
  - High Emphasis: `#F8FAFC` (95% white balance for crisp readability).
  - Medium Emphasis: `#94A3B8` (Slate-400 for structural labels, secondary descriptions, and metadata).
  - Low Emphasis: `#64748B` (Slate-500 for non-essential annotations and disabled states).

## Typography

The typography system pairs **Plus Jakarta Sans** for headlines and structural markers with **Inter** for dense instructional copy and contextual dashboards. **JetBrains Mono** is reserved strictly for syntax blocks, statistical trackers, and algorithmic keys.

### Implementation Rules
- Apply tracking clamp: Headlines tighten spacing (`-0.02em` to `-0.03em`) to enhance cohesion at large sizes.
- Dense technical bodies must maintain a minimum line height of `1.5` to prevent fatigue during complex conceptual study.
- All uppercase label-sm indicators require `0.04em` letter spacing for legibility against glass textures.

## Layout & Spacing

The layout is built on a responsive 12-column fluid grid system pinned to an 8pt architectural rhythm, with a max canvas ceiling of 1440px for learning dashboards and documentation.

### Grid & Breakpoints
- **Desktop (1024px+):** 12 columns, `1.5rem` gutters, `2rem` margins. Split-screen workbenches (e.g., lecture video/reading alongside interactive terminal) follow a 7/5 or 8/4 column distribution.
- **Tablet (768px – 1023px):** 8 columns, `1.25rem` gutters, `1.5rem` margins. Modules reflow to single-column interactive flows with sticky utility drawers.
- **Mobile (< 768px):** 4 columns, `1rem` gutters, `1rem` margins. Touch targets maintain a minimum vertical clearance of `48px` with compact vertical stacks.

## Elevation & Depth

Visual hierarchy is constructed through luminous layering, frosted depth, and hairline radiance rather than traditional heavy drop shadows.

### Surface Tiers
- **Tier 0 (Canvas Base):** Solid `#0B0F17`.
- **Tier 1 (Panels & Shelves):** Background `#131B2B` with 80% opacity, `backdrop-filter: blur(12px)`, and a 1px solid stroke of `rgba(51, 65, 85, 0.4)`.
- **Tier 2 (Interactive Cards):** Background `rgba(30, 41, 59, 0.6)`, `backdrop-filter: blur(16px)`, border `1px solid rgba(51, 65, 85, 0.7)`. 
- **Tier 3 (Floating Overlays & Modals):** Background `rgba(19, 27, 43, 0.85)`, `backdrop-filter: blur(24px)`, bordered by `rgba(139, 92, 246, 0.3)` with an ambient shadow of `0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px -5px rgba(139, 92, 246, 0.15)`.

### Chromatic Edge Lighting
Hover states and active focal modules exchange static borders for directional linear gradients running from `#8B5CF6` to `#06B6D4` at 1px thickness, coupled with an interior edge-glow of `0 0 15px rgba(139, 92, 246, 0.2)`.

## Shapes

The system relies on balanced roundedness (`roundedness: 2`), reflecting precision-molded glass panels.

### Radius Assignments
- **Core Elements (0.5rem / 8px):** Input fields, inline code snippets, contextual popovers, dropdown lists.
- **Containers & Cards (1rem / 16px):** Course modules, content cards, modal windows, workbench panels.
- **Full Shells (9999px / Pill):** Status indicators, action pills, category badges, progress capsules, and avatar halos.

## Components

### Buttons
- **Primary:** Background gradient from `#8B5CF6` to `#7C3AED`, `#FFFFFF` text, subtle radial sheen on hover. Box shadow: `0 0 20px -3px rgba(139, 92, 246, 0.45)`. Minimum height: 44px (mobile: 48px).
- **Secondary:** Background `rgba(30, 41, 59, 0.6)` with a 1px border of `#334155`. Text in `#F8FAFC`. On hover, border transitions to `#8B5CF6` with background shifting to `rgba(139, 92, 246, 0.1)`.
- **Ghost:** Transparent background, `#94A3B8` text, hover reveals subtle `rgba(255, 255, 255, 0.05)` fill.

### Cards & Modules
- Structured with `Tier 2` glass treatments. Hover states trigger a subtle -2px Y-axis translate and an escalated glowing border shifting from `#334155` to `rgba(6, 182, 212, 0.5)`. Content margins strictly follow `space-lg`.

### Badges & Status Pills
- Pill-shaped (`rounded-full`), padding `0.25rem 0.75rem`.
- **In-Progress:** Cyan-tinted fill (`rgba(6, 182, 212, 0.1)`), cyan border (`rgba(6, 182, 212, 0.3)`), `#06B6D4` text with an animated pulse dot.
- **Completed:** Emerald-tinted fill (`rgba(16, 185, 129, 0.1)`), emerald border (`rgba(16, 185, 129, 0.3)`), `#10B981` text.
- **Specialization / Premium:** Electric Violet tint (`rgba(139, 92, 246, 0.15)`), `#C4B5FD` text.

### Form Inputs
- Background `rgba(11, 15, 23, 0.6)`, bordered by 1px solid `#334155`. Text in `#F8FAFC`, placeholder in `#64748B`.
- **Focus State:** Border changes to `#8B5CF6`, accompanied by an exterior ring of `0 0 0 3px rgba(139, 92, 246, 0.25)`.

### Selection Controls (Checkboxes & Radios)
- Base geometry constructed with `#1E293B` background and `#334155` stroke.
- Checked state fills with `#8B5CF6`, displaying a crisp `#FFFFFF` icon marker and an ambient violet halo.

### Progress Gauges & Trackers
- Track backdrop uses `#1E293B` with inner inset shadow.
- Filled indicator utilizes a continuous gradient from `#8B5CF6` to `#06B6D4`, terminating in a luminous vertical spark tip.