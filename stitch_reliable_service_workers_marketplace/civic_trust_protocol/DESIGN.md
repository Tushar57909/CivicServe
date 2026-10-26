---
name: Civic Trust Protocol
colors:
  surface: '#faf8ff'
  surface-dim: '#dad9e1'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3fa'
  surface-container: '#eeedf4'
  surface-container-high: '#e9e7ef'
  surface-container-highest: '#e3e1e9'
  on-surface: '#1a1b21'
  on-surface-variant: '#444651'
  inverse-surface: '#2f3036'
  inverse-on-surface: '#f1f0f7'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#5e5e5d'
  on-secondary: '#ffffff'
  secondary-container: '#e0dfde'
  on-secondary-container: '#626361'
  tertiary: '#2a2a2a'
  on-tertiary: '#ffffff'
  tertiary-container: '#404040'
  on-tertiary-container: '#adabab'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#e3e2e0'
  secondary-fixed-dim: '#c7c6c5'
  on-secondary-fixed: '#1a1c1b'
  on-secondary-fixed-variant: '#464746'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#faf8ff'
  on-background: '#1a1b21'
  surface-variant: '#e3e1e9'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-margin: 24px
  gutter: 16px
  section-gap: 64px
  card-padding: 20px
---

## Brand & Style
The design system is anchored in the concept of "Civic Tech Premium"—a synthesis of institutional reliability and modern digital efficiency. It targets a local-services marketplace where trust is the primary currency. The visual language moves away from the "gig economy" chaos toward a more structured, editorial, and authoritative aesthetic.

The style is **Corporate / Modern** with a focus on high-quality typography and intentional whitespace. It evokes a sense of permanence and transparency, utilizing a warm, tactile base to humanize the professional blue accents. Every interface element is designed to feel "verified" by default.

## Colors
The palette is built on a foundation of "Warm Neutral" surfaces to reduce eye strain and provide a more welcoming, local feel than pure white. 

- **Primary (Navy Blue):** Reserved for high-intent actions, navigation headers, and primary trust signals.
- **Neutral (Charcoal):** Used for all body text and headings to ensure maximum legibility and an authoritative tone.
- **Semantic Accents:** Used sparingly. Success (Emerald) is specifically for "Verified" badges and completed states. Warning (Amber) is for pending certifications or low availability. Error (Rose) is for critical alerts or destructive actions.

## Typography
This design system employs a dual-font strategy. **Inter** handles the majority of the UI for its exceptional legibility and neutral, systematic feel. **Geist** is introduced for labels, dashboard data, and technical metadata to provide a precise, modern edge.

- Use **Display-LG** for landing page hero sections only.
- Use **Headline-LG** for page titles.
- Use **Body-MD** for all standard content.
- Use **Label-SM** for "Verified" badges and technical status indicators.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for desktop (1280px max-width) to maintain a controlled, editorial feel. 

- **Desktop:** 12-column grid, 24px gutters, 40px margins.
- **Tablet:** 8-column grid, 16px gutters, 24px margins.
- **Mobile:** 4-column grid, 16px gutters, 16px margins.

Spacing is based on an 8px scale. Use generous vertical padding between sections (64px+) to reinforce the "Premium" brand positioning. Dashboard views should use a tighter 4px baseline for data density.

## Elevation & Depth
Depth is created through **Tonal Layers** and **Ambient Shadows**. 

1. **Base:** `#F9F8F6` (The canvas).
2. **Surface:** `#FFFFFF` (Card backgrounds).
3. **Shadow:** Use a very soft, diffused shadow for interactive cards: `0 4px 12px rgba(26, 26, 26, 0.05)`.
4. **Active Elevation:** On hover, cards should slightly lift and the shadow should intensify: `0 8px 24px rgba(26, 26, 26, 0.08)`.

Avoid heavy inner shadows or high-contrast borders. Use 1px borders in `#E5E4E2` for static elements that do not require elevation.

## Shapes
The shape language is "Approachable Geometric." 

- **Standard Elements (Buttons, Inputs):** 8px (0.5rem) radius.
- **Cards & Modals:** 16px (1rem) radius.
- **Badges/Chips:** Full pill (999px) for status, 4px (small radius) for technical tags.

## Components

### Navigation & Dashboards
- **Header:** Sticky, white background, bottom border (1px). Primary Navy Blue for the logo and the "Post a Job" primary button.
- **Sidebar:** Subtle light-grey background (`#F3F2F0`). Active states use a left-accent 4px Navy Blue border and 10% Navy Blue tint on the background.

### Cards & Trust Indicators
- **Worker Cards:** Must include a "Trust Score" ring (0-100). Scores above 90 use Emerald Green; 70-89 use Navy Blue; below 70 use Charcoal.
- **Badges:** "Verified" badges use a small checkmark icon + `Label-SM` text.
- **Trust Score:** A circular progress indicator with the number centered in `Headline-MD`.

### Search & Inputs
- **Standard Search:** White background, 1px border, 16px padding.
- **AI-Enabled Search:** Use a subtle gradient border (Navy to Emerald) and a "Sparkle" icon to denote the AI capabilities.
- **Forms:** Labels are `Label-MD` in Charcoal. Inputs use an 8px radius and a 2px Navy Blue border on focus.

### Feedback & Status
- **Availability:** Small 8px dot next to worker names. Emerald (Online), Amber (Busy), Grey (Offline).
- **Rating Stars:** Solid Navy Blue for filled stars, light-grey for empty. Use a numerical average next to the stars in `Label-MD`.
- **Data Tables:** Minimalist style. No vertical lines. Header row in `#F3F2F0` with `Label-SM` uppercase text.