---
name: Alex Morgan Portfolio
colors:
  surface: '#0c141a'
  surface-dim: '#0c141a'
  surface-bright: '#323a40'
  surface-container-lowest: '#070f15'
  surface-container-low: '#151d22'
  surface-container: '#192126'
  surface-container-high: '#232b31'
  surface-container-highest: '#2e363c'
  on-surface: '#dbe3ec'
  on-surface-variant: '#becaba'
  inverse-surface: '#dbe3ec'
  inverse-on-surface: '#293138'
  outline: '#899485'
  outline-variant: '#3f4a3d'
  surface-tint: '#7bdb80'
  primary: '#7bdb80'
  on-primary: '#00390e'
  primary-container: '#238636'
  on-primary-container: '#f9fff3'
  inverse-primary: '#006e23'
  secondary: '#d3bbff'
  on-secondary: '#3f008d'
  secondary-container: '#5b21b5'
  on-secondary-container: '#c7aaff'
  tertiary: '#a2c9ff'
  on-tertiary: '#00315c'
  tertiary-container: '#1377cd'
  on-tertiary-container: '#fffdff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#97f999'
  primary-fixed-dim: '#7bdb80'
  on-primary-fixed: '#002106'
  on-primary-fixed-variant: '#005319'
  secondary-fixed: '#ebddff'
  secondary-fixed-dim: '#d3bbff'
  on-secondary-fixed: '#250059'
  on-secondary-fixed-variant: '#591db3'
  tertiary-fixed: '#d3e4ff'
  tertiary-fixed-dim: '#a2c9ff'
  on-tertiary-fixed: '#001c38'
  on-tertiary-fixed-variant: '#004882'
  background: '#0c141a'
  on-background: '#dbe3ec'
  surface-variant: '#2e363c'
typography:
  display-hero:
    fontFamily: JetBrains Mono
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
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

This design system channels the utilitarian, engineer-first aesthetic of high-performance developer workflows, heavily influenced by GitHub Dark Mode and modern code orchestration environments. It bridges technical authenticity with modern portfolio storytelling for Full Stack Developer Alex Morgan.

### Target Audience & Tone
- **Audience:** Engineering leads, CTOs, open-source maintainers, and product-focused recruiters seeking elite engineering craftsmanship.
- **Personality:** Methodical, precise, transparent, and quietly confident.
- **Visual Style:** Technical Brutalism blended with Modern Utility. Form directly mirrors function through Git metaphors—diff lines, terminal chrome, commit hash anchors, release badges, and contribution matrices. Every design decision evokes the feeling of reviewing an expertly managed repository.

## Colors

The palette directly adapts GitHub's signature dark workspace, delivering strong contrast and familiar developer feedback cues while eliminating eye strain.

### Palette Roles
- **Canvas / Background (`#0d1117`):** Base canvas depth for the entire application viewport.
- **Surface Elevation 1 (`#161b22`):** Primary card bodies, terminal viewports, panel backgrounds, and code block containers.
- **Surface Elevation 2 / Hover (`#21262d`):** Hover states, interactive list items, table row highlights, and tertiary button fills.
- **Borders & Dividers (`#30363d`):** Monolithic structural 1px strokes across containers, cards, tables, and tab groups.
- **Primary Action Green (`#238636` resting, `#2ea043` hover):** High-priority calls-to-action ("Deploy", "Hire", "Merge").
- **Secondary Merged Purple (`#8957e5` base, `#a371f7` accent):** Merged PR badges, completed milestones, feature tags, and structural highlights.
- **Tertiary Link Blue (`#58a6ff`):** Interactive references, repository breadcrumbs, commit hashes, and file tree items.
- **Semantic Status Signals:**
  - **Open / Success Green (`#3fb950`):** Open branches, live deployment status, online indicator.
  - **Attention / Warning Orange (`#d29922`):** Pending reviews, work-in-progress experiments, architecture trade-offs.
  - **Headings & High-Emphasis Text (`#f0f6fc`):** Primary headings, titles, code keyword emphasis.
  - **Body Text (`#c9d1d9`):** Neutral body copy and narrative descriptions.
  - **Subtle Muted Text (`#8b949e`):** Metadata, commit timestamps, file permissions, and labels.

## Typography

The typography pairings contrast engineered, mechanical discipline with clean legibility.

- **JetBrains Mono** serves as the authoritative voice: page headings, interactive tabs, branch badges, commit anchors, terminal outputs, and numerical metadata. Its fixed-width cadence grounds the interface in developer tooling.
- **Inter** renders long-form technical prose, case study narratives, project overviews, and system architecture breakdowns, ensuring long-form readability without visual fatigue.
- **Tabular Numerals & Monospace Attributes:** All data matrices, performance metrics (e.g., latency, throughput), and diff counts must strictly leverage `JetBrains Mono` to ensure tabular vertical alignment.

## Layout & Spacing

The layout system is modeled on high-density code inspection tools: structured, horizontally bounded, and vertically rhythmic.

### Grid & Fluid Boundaries
- **Container Architecture:** Fixed-width container capped at `1280px` for desktop viewports, centered with balanced exterior margins.
- **Column System:** 12-column layout on desktop (`gutter: 1.5rem`), transitioning to 6 columns on tablet (`768px-1024px`), and 1 column on mobile (`< 768px`).
- **Vertical Spacing Cadence:** Built around standard 4px/8px modular increments. Section margins consume `space-xl` (40px) up to `80px` for major section breaks. Compact list items adhere to `space-xs` (4px) and `space-sm` (8px).
- **Responsive Stacking:** On mobile devices, terminal sidebars and repository metadata bars wrap beneath main content streams, while maintaining edge gutters of `1rem`.

## Elevation & Depth

This system avoids blurred drop shadows and skeuomorphic drop-offs. Visual depth is established through tonal containment, distinct surface boundaries, and explicit perimeter strokes.

- **Tonal Layering:**
  - Base layer: `#0d1117`
  - Cards & Viewports: `#161b22`
  - Popovers, Flyouts, Menus: `#161b22` with a `#30363d` outline
- **Structural Outlines:** Every container, card, table, or popover utilizes a strict `1px solid #30363d` border. Boundaries do not dissolve or blend into the backdrop.
- **Terminal Chrome:** Floating modal windows and interactive code sandboxes simulate native OS terminal frames, utilizing a `#161b22` header bar separated by a `#30363d` bottom border, complete with mini window dots (`#ff5f56`, `#ffbd2e`, `#27c93f`) styled at 10px diameter.

## Shapes

The design uses tight, controlled corner radii that align with software engineering workflows (e.g., repository tabs, file pickers, diff viewers).

- **Base Radius (`0.25rem` / `4px` - 6px):** Applied to standard buttons, input fields, code tags, repository cards, and context menus.
- **Pill Radius (`9999px`):** Reserved exclusively for semantic Git badges: PR states (`Open`, `Merged`), issue counters, release tags, and branch pills (`main`, `feat/v2`).
- **Precision Corners:** Code preview windows and diff panels retain standard 6px outer bounds with sharp inner content borders to preserve rigid code alignment.

## Components

### Buttons
- **Primary ("Commit / Merge"):** Background `#238636`, border `1px solid rgba(240, 246, 252, 0.1)`, text `#ffffff`, weight 600, typography `label-md`. Hover triggers `#2ea043`. Active triggers scale `0.98`.
- **Secondary ("Outline / Branch Action"):** Background `#21262d`, border `1px solid #30363d`, text `#c9d1d9`. Hover transitions background to `#30363d` and text to `#f0f6fc`.
- **Ghost / Icon Action:** Transparent background, text `#8b949e`. Hover shifts background to `#21262d` and text to `#58a6ff`.

### Badges, Branch Chips & Git Identifiers
- **Branch Chips:** Background `#21262d`, border `1px solid #30363d`, text `#58a6ff`, font `JetBrains Mono` at `label-sm`. Prefixed with an SVG branch fork icon.
- **Pull Request Status Badges:**
  - *Merged:* Background `#8957e5`, text `#ffffff`, pill shape, icon git-merge.
  - *Open:* Background `#238636`, text `#ffffff`, pill shape, icon git-pull-request.
- **Commit Hash Anchors:** Background `rgba(110, 118, 129, 0.4)`, text `#58a6ff`, font `JetBrains Mono` at `12px`, padding `2px 6px`, radius `4px`. Hover triggers underline and color shift to `#79c0ff`.

### Repository & Project Cards
- **Container:** Background `#161b22`, border `1px solid #30363d`, radius `6px`, padding `space-md`. Hover shifts border to `#8b949e`.
- **Header:** Project title rendered in `headline-sm` with text `#58a6ff`, accompanied by a public/private pill indicator (`border: 1px solid #30363d`, color `#8b949e`).
- **Footer:** Stacking row showing primary language indicator (colored circle + name), star count (`#8b949e`), and updated timestamp.

### Contribution Heatmap Matrix
- **Layout:** 7-row CSS grid containing `10px x 10px` cells with `3px` gap.
- **Tiers:**
  - Tier 0 (Empty): `#161b22` with `1px solid rgba(255, 255, 255, 0.05)`
  - Tier 1: `#0e4429`
  - Tier 2: `#006d32`
  - Tier 3: `#26a641`
  - Tier 4: `#39d353`
- **Interactive Tooltip:** Hover triggers a dark popover (`#161b22`, border `#30363d`, font `label-sm`) displaying: `"{N} contributions on {Month} {Day}"`.

### Code Blocks & Diff Highlighting
- **Container:** Background `#0d1117`, border `1px solid #30363d`, radius `6px`.
- **Diff Additions:** Line background `rgba(46, 160, 67, 0.15)`, text color `#3fb950`, prefixed with `+`.
- **Diff Deletions:** Line background `rgba(248, 81, 73, 0.15)`, text color `#f85149`, prefixed with `-`.

### Form Inputs & Terminal Command Line
- **Interactive Terminal Input:** Background `#0d1117`, border `1px solid #30363d`, font `JetBrains Mono`, text `#f0f6fc`. Focus state activates `border: 1px solid #58a6ff` with a zero-spread `box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.3)`. Prompt displays terminal symbol `alex@morgan:~$ ` in green `#3fb950`.