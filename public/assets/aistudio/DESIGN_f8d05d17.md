---
name: Executive Precision HRIS
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#5c403f'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#906f6e'
  outline-variant: '#e5bdbb'
  surface-tint: '#bf0229'
  primary: '#9e001f'
  on-primary: '#ffffff'
  primary-container: '#c8102e'
  on-primary-container: '#ffdad8'
  inverse-primary: '#ffb3b1'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#005468'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e87'
  on-tertiary-container: '#b6ebff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001c'
  secondary-fixed: '#d5e3fd'
  secondary-fixed-dim: '#b9c7e0'
  on-secondary-fixed: '#0d1c2f'
  on-secondary-fixed-variant: '#3a485c'
  tertiary-fixed: '#b6ebff'
  tertiary-fixed-dim: '#82d1ed'
  on-tertiary-fixed: '#001f28'
  on-tertiary-fixed-variant: '#004e60'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  display-kpi:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
  headline-h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '800'
    lineHeight: 34px
  headline-h1-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '800'
    lineHeight: 28px
  headline-h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  title-card:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 24px
  body-default:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-medium:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 22px
  table-data:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  table-header:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-badge:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-dense: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system drives an enterprise human resources intelligence and operational command center. Designed for organizational governance, workforce oversight, and executive decision-making, it balances corporate rigor with modern digital fluency.

### Brand Personality & Emotional Profile
- **Executive Authority:** Clean, dependable, and audit-ready. The interface inspires confidence across administrative divisions and C-suite leadership.
- **Paperless Clarity:** Eliminates visual clutter in favor of crisp borders, generous breathing room, structured metric cards, and tactile digital receipts (QR indicators, audit stamps, and approval trails).
- **Controlled Vibrancy:** Pure neutral substrates allow the brand red (`#C8102E`) to function with high surgical precision—strictly directing focus, signifying actionable workflows, or validating system states without visual fatigue.

### Design Movement
**Corporate Modernism** blended with **Executive Flat Precision**. Taking cues from SAP Fiori and modern enterprise tools, the design relies on 1px structural borders (`#E8EBF0`), paper-white surfaces (`#FFFFFF`), whisper-soft tinted backgrounds (`#F6F7F9`), and subdued ambient depth rather than dramatic gradients or heavy elevation.

## Colors

The palette operates in strict Light Mode to uphold high administrative legibility and documentation accuracy.

### Core Swatches
- **Primary Accent (`#C8102E`):** Reserved strictly for primary action buttons, focused input states, active navigation indicators, and urgent administrative alerts.
- **Active Background Tint (`#FDEEF0`):** Used for selected navigation items, interactive hover states of primary elements, and highlight backdrops.
- **Canvas Base (`#F6F7F9`):** Application-wide neutral canvas.
- **Surfaces & Sidebar (`#FFFFFF`):** High-density cards, side navigation panels, modal dialogs, and flyout menus.
- **Divider & Border (`#E8EBF0`):** Subtle dividers and structural boundary strokes.
- **Table Header Tint (`#FAFBFC`):** Used for dense data grid header tracks.
- **Interactive Neutral Hover (`#F3F5F8`):** Data row hovers, secondary button hover states, and inactive tab feedback.

### Text Contrast Tiers
- **Primary Headings (`#334155`):** Slate-800 for high-contrast titles, KPI figures, and executive summaries.
- **Body Text (`#475569`):** Slate-600 for primary descriptive copy, form entries, and table cell records.
- **Secondary & Meta (`#64748B`):** Slate-500 for captions, timestamps, column headers, and helper descriptions.

### Status Semantic System (Soft Pastels)
- **Success:** Background `#E8F6EE` | Text `#1E7A46` (Approved, Active, Present)
- **Warning:** Background `#FFF4E0` | Text `#9A5B00` (Pending, In Review, Incomplete)
- **Danger:** Background `#FDECEC` | Text `#B42318` (Rejected, Terminated, Critical Alert)
- **Info:** Background `#EAF2FF` | Text `#1D4ED8` (Processing, Reassigned, Informational)
- **Neutral:** Background `#F1F3F6` | Text `#475569` (Draft, Inactive, Archived)

## Typography

The typographic hierarchy blends structured executive headings with systematic, high-density tabular body text.

- **Headlines (Plus Jakarta Sans):** High-impact geometry suited for executive dashboards. Used exclusively for primary titles, view headers, modal headers, and dominant KPI figures.
- **Body & Data (Inter):** Highly legible across varied pixel densities. Neutral tracking and open apertures ensure dense personnel rosters, payroll grids, and logs remain legible without eye fatigue.
- **Micro-copy & Tables:** Table headers utilize uppercase, tracked-out styling (`0.05em`) at 12px weight 600 in `#64748B`. Standard table cell data is rendered at 14px in `#475569`.

## Layout & Spacing

### Layout Architecture
- **Desktop System:** 12-column responsive fluid grid with a permanent 260px left sidebar and flexible operational viewport. Page margins are set to `1.5rem` (`24px`) with `1.25rem` (`20px`) gutters between major cards and analytics widgets.
- **Data Table Density:** Dense data zones employ `gutter-dense` (`12px`) and internal padding of `8px 16px` per cell to maximize vertical information capacity on standard enterprise screens (1366x768 to 1920x1080).
- **Responsive Adaptations:**
  - **Desktop (>=1200px):** Full-bleed grid; cards sit in multi-column configurations (e.g., 4-up KPI stat clusters, 8/4 split for main table and side audit trails).
  - **Tablet (768px - 1199px):** Sidebar collapses to a 68px icon-only rail; KPI cards stack into a 2-up grid; data tables enable horizontal touch-scroll.
  - **Mobile (<768px):** Canvas margin drops to `1rem`; sidebar shifts to an overlay drawer; multi-step forms and metrics stack into a single column.

## Elevation & Depth

Visual hierarchy is communicated through perimeter definition rather than heavy drop shadows:

- **Border-First Structure:** Every card, container, and input is bound by a crisp 1px solid stroke in `#E8EBF0`. This maintains structure across complex multi-panel dashboards.
- **Ambient Shadowing:** Surfaces floating above the `#F6F7F9` canvas carry a subtle, low-contrast shadow: `0 2px 10px rgba(0, 0, 0, 0.04)`.
- **Raised Interactive Overlays:** Dropdowns, contextual popovers, and date-range pickers use an elevated shadow: `0 4px 16px rgba(0, 0, 0, 0.08)` paired with an `#E8EBF0` border.
- **Modal Depth:** Full modal dialogs use an executive backdrop of `rgba(51, 65, 85, 0.4)` (Slate tint) combined with an elevation of `0 12px 32px rgba(0, 0, 0, 0.12)`.

## Shapes

The geometric identity balances clean enterprise lines with subtle edge rounding:

- **Cards & Data Panels:** `12px` border radius (`rounded-lg` adaptation) creates structured content grouping.
- **Interactive Controls (Buttons, Inputs, Selects):** `8px` (`0.5rem`) border radius maintains a crisp, tool-like affordance.
- **Status Badges & Avatar Containers:** `999px` pill contours, providing immediate shape differentiation between structural containers and status indicators.
- **Digital Audit Seals & QR Containers:** Crisp `8px` corners with interior hairline nested framing.

## Components

### Buttons
- **Primary:** Solid `#C8102E` background, `#FFFFFF` text, `8px` radius, `10px 18px` padding. Hover: `#A50D25`. Active: `#890B1F`. Focus ring: `0 0 0 3px rgba(200, 16, 46, 0.2)`.
- **Secondary / Outline:** Background `#FFFFFF`, border `1px solid #E8EBF0`, text `#334155`. Hover: `#F3F5F8` background, `#C8102E` border.
- **Tertiary / Ghost:** Text `#475569`, transparent background. Hover: `#F3F5F8`.

### Status Badges & Pills
- Pill shape (`roundedness: 999px`), `4px 10px` padding, typography: 12px weight 600.
- Rendered in designated soft pastel backgrounds with high-contrast text (e.g., Success: `#E8F6EE` background with `#1E7A46` text).

### Form Inputs & Selectors
- Background `#FFFFFF`, border `1px solid #E8EBF0`, radius `8px`, height `40px`, text `15px #475569`.
- Placeholder text in `#64748B`.
- Focus state: border `#C8102E` with a `0 0 0 3px rgba(200, 16, 46, 0.15)` halo.

### Checkboxes & Radio Controls
- Base: `18px x 18px`, `1px solid #E8EBF0`, radius `4px` (checkbox) or `50%` (radio).
- Checked: Background `#C8102E`, border `#C8102E`, displaying a crisp white check or center pip.

### Cards & KPI Containers
- Background `#FFFFFF`, border `1px solid #E8EBF0`, radius `12px`, padding `20px`.
- Ambient shadow: `0 2px 10px rgba(0, 0, 0, 0.04)`.
- KPI Stat Block: Top caption (12px uppercase `#64748B`), bold numeric display (32px Plus Jakarta Sans `#334155`), followed by a bottom comparison trend badge.

### Data Tables
- Header: `#FAFBFC` track background, border-bottom `1px solid #E8EBF0`, typography `12px` bold uppercase `#64748B`.
- Rows: `#FFFFFF` surface, height `48px`, border-bottom `1px solid #E8EBF0`.
- Row Hover: Smooth transition to `#F3F5F8`.
- Action Columns: Inline icon buttons (16px) with ghost hover padding.

### Digital Stamps & Verification Badges
- **Digital Audit Stamp:** Enclosed rectangular badge with dashed `1px solid #C8102E` or `#1E7A46`, containing an uppercase verification slug, timestamp, and operator identifier.
- **Verification QR Element:** Framed container `64px x 64px` in `#FFFFFF`, border `1px solid #E8EBF0`, radius `8px`, housing high-density scannable approval codes for paperless certification.