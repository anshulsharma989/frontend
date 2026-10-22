---
name: Luminous Kinetic
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#4a4455'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#7b7487'
  outline-variant: '#ccc3d8'
  surface-tint: '#732ee4'
  primary: '#630ed4'
  on-primary: '#ffffff'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#d2bbff'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#005b3d'
  on-tertiary: '#ffffff'
  tertiary-container: '#007650'
  on-tertiary-container: '#76ffc2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.005em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
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

This design system delivers a luminous, precision-engineered educational workspace designed for students, educators, and institutions interacting with AI-augmented learning workflows. Serving as the light mode counterpart to Obsidian Kinetic, the aesthetic draws inspiration from high-performance toolsets like Linear, Stripe, and Base360.ai—rejecting cluttered, juvenile EdTech tropes in favor of razor-sharp clarity, intellectual rigor, and serene atmospheric depth.

The emotional signature is clean, empowering, and focused. The interface pairs crisp optic whites and cool slate foundation planes with electric optical accents: tech violet for cognitive action and generative states, electric cyan for data and navigation, and radiant emerald for validation and mastery. Tactile depth is maintained through layered surface micro-borders, ultra-subtle ambient drop shadows, delicate inset highlights, and soft frosted-glass backdrops that keep spatial orientation intuitive across dense curricular data.

## Colors

The palette establishes an ultra-clean, luminous environment built upon neutral slate foundations and vibrant technical signals:

- **Primary (`#7c3aed` / Tech Violet):** Anchors high-priority actions, active state transitions, AI generation triggers, and key brand moments. Paired with `#8b5cf6` for hover states and active gradients.
- **Secondary (`#0ea5e9` / Electric Sky & Cyan):** Highlights analytical vectors, telemetry, interactive filters, code-level metadata, and informational status.
- **Tertiary (`#10b981` / Emerald Mastery):** Dedicated to verified correct outcomes, mastery badges, progress milestones, and positive state changes.
- **Neutral (`#0f172a` / Deep Slate):** Primary reading canvas baseline, anchoring headline clarity and deep structural hierarchy down to secondary text tones (`#334155` and `#64748b`).

### Surface Architecture
- **Base Canvas:** Pure optic white (`#ffffff`) for elevated panels and cards, sitting on an ambient canvas tint of cool slate-50 (`#f8fafc`).
- **Sub-surfaces & Insets:** Slate-100 (`#f1f5f9`) for recessed wells, input fills, and inactive tracks.
- **Micro-Borders:** Slate-200 (`#e2e8f0`) for resting structural borders; Slate-300 (`#cbd5e1`) for interactive borders and card hover boundaries.

## Typography

Typography relies uniformly on **Plus Jakarta Sans** across all roles to achieve a cohesive, architectural precision with friendly geometric nuance. 

- **Headlines:** Set with tightened tracking (`-0.02em` to `-0.03em`) and medium-to-bold weights to produce a crisp editorial posture reminiscent of modern desktop tools.
- **Body:** Engineered for extended educational reading sessions and complex prompts, utilizing generous line heights (`1.55` to `1.65`) and neutral weights to minimize visual fatigue against pure light surfaces.
- **Labels & Micro-data:** Set in medium and bold weights, with uppercase instances (`label-sm`) tracked generously for pill badges, AI operational statuses, and tabular metadata.

## Layout & Spacing

The layout model is governed by a fluid 12-column architectural grid with responsive column collapses:
- **Desktop (1280px+):** 12 columns, `gutter: 1.5rem` (24px), outer canvas `margin: 2rem` (32px), with maximum content containment capped at 1440px for dashboard balance.
- **Tablet (768px - 1279px):** 8 columns, `gutter: 1.25rem` (20px), outer canvas `margin: 1.5rem` (24px). Dual-pane layouts collapse into single active viewports or drawer-based panels.
- **Mobile (< 768px):** 4 columns, `gutter-mobile: 1rem` (16px), outer canvas `margin-mobile: 1rem` (16px). Cards span full grid widths, stack vertically, and sticky controls anchor to bottom edge sheets.

Rhythm across component interiors relies on consistent multiples of 4px, where `space-sm` (8px) separates tight icon-text clusters, `space-md` (16px) governs standard card padding, and `space-xl` (40px) demarcates major thematic section bounds.

## Elevation & Depth

Visual hierarchy uses a refined combination of frosted glassmorphism, multi-stop ambient light diffusion, and hairline micro-borders rather than dense, muddy drop shadows.

- **Level 0 (Base Canvas):** Solid cool slate `#f8fafc`. Elements at this plane feature no elevation or shadow.
- **Level 1 (Structural Cards & Modules):** Pure optic white `#ffffff` fill framed by a crisp 1px border (`#e2e8f0`). Shadows are double-layered: an ultra-subtle ambient floor shadow (`0 1px 3px rgba(15, 23, 42, 0.04)`) plus a secondary soft envelope (`0 6px 16px -4px rgba(15, 23, 42, 0.03)`). Cards also feature a delicate inner top border highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.8)`).
- **Level 2 (Dropdowns, Floating Toolbars, Active Modals):** White with slight glass opacity (`rgba(255, 255, 255, 0.85)` with `backdrop-filter: blur(12px)`), 1px border (`#cbd5e1`), and elevated projection (`0 12px 32px -6px rgba(15, 23, 42, 0.08)`).
- **Level 3 (AI Focus Nodes & Critical Dialogues):** Pure white floating over a softly blurred translucent backdrop (`rgba(15, 23, 42, 0.25)`). Elevated with a concentrated kinetic violet glow aura (`0 0 0 1px rgba(124, 58, 237, 0.2), 0 20px 48px -10px rgba(124, 58, 237, 0.12)`).

## Shapes

The geometric vernacular uses balanced, modern curvature that feels ergonomic and contemporary:
- **Base Components (Inputs, Buttons, Dropdowns):** 8px (`0.5rem`) corner radius for sharp, click-target discipline.
- **Cards and Analytical Containers:** 16px (`1rem` / `rounded-lg`) up to 24px (`1.5rem` / `rounded-xl`) corner radiuses for content framing, ensuring modular cards preserve soft interior negative space.
- **Badges, Tags, and Filters:** Full pill radii (`9999px`) to immediately signal interactive micro-status, category identification, and AI confidence telemetry.

## Components

### Buttons
- **Primary:** Filled in `#7c3aed` with white typography, a 1px border of `#6d28d9`, and an inset top highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.2)`). Hover transitions smoothly to `#6d28d9` accompanied by a micro-shadow lift.
- **Secondary / Action Ghost:** Crisp white background with a 1px Slate-200 (`#e2e8f0`) border, slate-800 text (`#1e293b`), and an ambient shadow (`0 1px 2px rgba(0, 0, 0, 0.04)`). On hover, transitions to Slate-50 with Slate-300 border.
- **AI Kinetic Action:** Gradient fill from Tech Violet (`#7c3aed`) to Electric Sky (`#0ea5e9`), finished with white text and an ambient electric violet blur on hover.

### Chips & Badges
- Pill-shaped (`rounded-full`) with uppercase tracking.
- **Status (Mastery/Correct):** Emerald-50 background (`#ecfdf5`), Emerald-600 text (`#059669`), and a delicate Emerald-200 border (`#a7f3d0`).
- **Status (AI Telemetry):** Violet-50 background (`#f5f3ff`), Violet-700 text (`#6d28d9`), and a Violet-200 border (`#ddd6fe`).
- **Informational/Neutral:** Slate-100 background (`#f1f5f9`), Slate-700 text (`#334155`), and a Slate-200 border.

### Input Fields & Search Bars
- Resting state: Optic white surface (`#ffffff`) with 1px border `#e2e8f0`, soft inset shadow (`inset 0 1px 2px rgba(15, 23, 42, 0.04)`), and slate-400 placeholder text.
- Focus state: Border transitions to Tech Violet (`#7c3aed`) with an outward 3px focus ring (`rgba(124, 58, 237, 0.15)`).

### Cards & Content Modules
- Rendered on Level 1 elevation (optic white, slate-200 border, subtle dual ambient shadow).
- Internal content separation utilizes hairline slate-100 dividers rather than heavy bounding lines.
- Interactive cards feature a hover lift that brightens the border to `#cbd5e1` and extends a clean 8px soft shadow.

### Checkboxes & Radios
- Checkboxes feature a 4px corner radius; radios are circular.
- Resting on a slate-100 fill with a slate-300 border. Checked state transitions to solid `#7c3aed` with a white checkmark or center pip, illuminated by a micro-halo (`0 0 0 2px rgba(124, 58, 237, 0.2)`).

### AI Reasoning Drawer / Interactive Solution Nodes
- Educational solution blocks feature frosted glass backgrounds (`rgba(255, 255, 255, 0.95)` with 8px blur), bounded by a left accent rail in Electric Sky (`#0ea5e9`) or Emerald (`#10b981`) denoting algorithmic hints and verified steps.