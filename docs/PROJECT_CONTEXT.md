# Project Context & AI Continuity Guide

> **Notice for AI Assistants & Developers**:
> Read this document (`docs/PROJECT_CONTEXT.md`) and [`docs/CONTENT.md`](file:///e:/My_Project/portfolio/docs/CONTENT.md) before making any code or content changes. Never assume or invent metrics, companies, or credentials.

---

## 1. Project Purpose & Vision

This application is the personal developer portfolio for **Ritesh Thete**, a **Software Developer** (working as Java Full Stack Developer at Mahendra Technosoft) based in Pune, Maharashtra, India.

- **Theme & Aesthetic**: Engineered with an authentic Git & GitHub developer aesthetic (commit timelines, pull request statuses, terminal sandboxes, branch selectors, telemetry indicators, contribution graphs).
- **Dark-Default with Theme Switching**: Defaults to a sleek GitHub dark matte theme (`#0c141a`) with full support for light mode via `next-themes`.
- **Motion & Responsiveness**: Smooth, performance-conscious micro-animations powered by Framer Motion with `useReducedMotion` support. Fully responsive from mobile (390px) to ultra-wide (1920px+) with zero horizontal overflow.
- **Design Provenance**: Faithfully realized from Google Stitch design exports (`design/DESIGN.md`, `design/home-desktop.html`, `design/home-mobile.html`).
- **SEO & Discoverability**: Native Next.js App Router metadata, automated Open Graph generation, sitemap, robots.txt, and structured Schema.org JSON-LD data.

---

## 2. Technology Stack & Dependencies

All dependencies are defined in [`package.json`](file:///e:/My_Project/portfolio/package.json):

| Package / Tool | Version | Purpose |
| :--- | :--- | :--- |
| **`next`** | `16.4.2` | Core framework (Next.js App Router, Turbopack, Partial Prerendering) |
| **`react`** / **`react-dom`** | `19.3.0` | React 19 concurrent component architecture |
| **`tailwindcss`** | `^4.0.0` | Utility-first styling engine (Tailwind CSS v4 with `@theme` in CSS) |
| **`@tailwindcss/turbopack`** | `^4.0.0` | Turbo integration for Tailwind CSS v4 |
| **`framer-motion`** | `^14.3.0` | Motion graphics, layout animations, and tab transitions |
| **`next-themes`** | `^0.4.6` | Client theme switcher (dark / light / system) using `class` strategy |
| **`react-icons`** | `^5.7.0` | Brand technology icons (SimpleIcons `Si*`, FontAwesome `Fa*`) |
| **`@emailjs/browser`** | `^5.0.3` | Client-side email dispatch for the contact form |
| **`server-only`** | `^0.0.1` | Guards server-only modules (`github.ts`) against client bundling |
| **`typescript`** | `^5.0.0` | Strict type checking across data structures and components |
| **`eslint`** / **`eslint-config-next`** | `^9` / `16.4.2` | Code quality and React Hooks rules |

---

## 3. Directory & Component Structure

```
portfolio/
├── AGENTS.md                  # Project rules and mandatory reading directive for AI agents
├── CLAUDE.md                  # Claude-specific agent guidelines
├── README.md                  # Public overview, local setup, and repository documentation
├── design/                    # Source Stitch design exports, tokens, and HTML/PNG mockups
├── docs/                      # Persistent project context and content specifications
│   ├── PROJECT_CONTEXT.md     # This comprehensive architecture and reference guide
│   └── CONTENT.md             # Content truth reference (verified profile details and copy)
├── public/                    # Static public assets (images, icons, resume.pdf)
└── src/
    ├── app/                   # Next.js App Router pages, layouts, and route handlers
    ├── components/            # Reusable UI sections and client components
    ├── data/                  # Single source of truth data models and portfolio records
    └── lib/                   # Server-only utilities and API data fetching layer
```

### Components (`src/components/`)
- [`Navbar.tsx`](file:///e:/My_Project/portfolio/src/components/Navbar.tsx): Fixed top navigation with branch selector, section links, theme toggle, mobile drawer, and resume download CTA.
- [`Hero.tsx`](file:///e:/My_Project/portfolio/src/components/Hero.tsx): Top hero section with telemetry badge, headline, dynamic typewriter role animation, intro bio, project/contact/resume CTAs, responsive 3-card stats row, interactive terminal sandbox, and verified profile badge.
- [`About.tsx`](file:///e:/My_Project/portfolio/src/components/About.tsx): README.md-styled developer overview with tabs (README.md, architecture.md, stack.log, git-stats.sh), academic summary, and AWS certification.
- [`Skills.tsx`](file:///e:/My_Project/portfolio/src/components/Skills.tsx): Technical competency directory organized into backend, frontend, database, and cloud/DevOps categories with interactive tab filtering and skill chips.
- [`Experience.tsx`](file:///e:/My_Project/portfolio/src/components/Experience.tsx): Git commit log-styled career timeline highlighting full-stack engineering at Mahendra Technosoft and internship accomplishments.
- [`Projects.tsx`](file:///e:/My_Project/portfolio/src/components/Projects.tsx): Pull request-styled project cards with interactive technology filtering (All, Java, Spring Boot, React, etc.), tag chips, live demo, and GitHub links.
- [`GitHubActivity.tsx`](file:///e:/My_Project/portfolio/src/components/GitHubActivity.tsx): 52-week contribution heatmap, streak telemetry, top language percentage bars, and pinned repository cards.
- [`Education.tsx`](file:///e:/My_Project/portfolio/src/components/Education.tsx): Academic degrees (MCA, BBA CA) and AWS certification credentials with verified badge.
- [`Testimonials.tsx`](file:///e:/My_Project/portfolio/src/components/Testimonials.tsx): Peer review quotes styled like GitHub pull request approval reviews.
- [`Contact.tsx`](file:///e:/My_Project/portfolio/src/components/Contact.tsx): Interactive terminal and form supporting real message dispatch via EmailJS with feedback alerts and social channels.
- [`Footer.tsx`](file:///e:/My_Project/portfolio/src/components/Footer.tsx): Git status line footer with branch info, commit telemetry, quick links, and system uptime indicator.
- [`ThemeProvider.tsx`](file:///e:/My_Project/portfolio/src/components/ThemeProvider.tsx): `next-themes` client context provider enabling seamless dark/light switching.

### App Router (`src/app/`)
- [`layout.tsx`](file:///e:/My_Project/portfolio/src/app/layout.tsx): Root layout configuring fonts (JetBrains Mono, Inter, Material Symbols), global SEO metadata, Open Graph, and JSON-LD structured data.
- [`page.tsx`](file:///e:/My_Project/portfolio/src/app/page.tsx): Main single-page application orchestrating asynchronous server data fetching (`getGitHubData()`) and dynamic section imports.
- [`globals.css`](file:///e:/My_Project/portfolio/src/app/globals.css): Tailwind CSS v4 design tokens, theme color variables, font tokens, and Git visual utilities.
- [`opengraph-image.tsx`](file:///e:/My_Project/portfolio/src/app/opengraph-image.tsx): Dynamic Edge-rendered 1200x630 Open Graph image with Git branch aesthetics.
- [`sitemap.ts`](file:///e:/My_Project/portfolio/src/app/sitemap.ts): Automated XML sitemap generator configured with `NEXT_PUBLIC_SITE_URL`.
- [`robots.ts`](file:///e:/My_Project/portfolio/src/app/robots.ts): Web crawler directives permitting indexation and pointing to the sitemap.
- [`icon.tsx`](file:///e:/My_Project/portfolio/src/app/icon.tsx) / [`apple-icon.tsx`](file:///e:/My_Project/portfolio/src/app/apple-icon.tsx): Dynamic terminal-style SVG favicons (`>_`).
- [`not-found.tsx`](file:///e:/My_Project/portfolio/src/app/not-found.tsx): Git-styled 404 error page with `git checkout main` recovery action.

---

## 4. Design System & Tokens

### Source Files
- [`design/DESIGN.md`](file:///e:/My_Project/portfolio/design/DESIGN.md): Authoritative design token specifications (colors, typography scales, spacing, shadows).
- [`design/home-desktop.html`](file:///e:/My_Project/portfolio/design/home-desktop.html) & [`design/home-mobile.html`](file:///e:/My_Project/portfolio/design/home-mobile.html): Reference HTML/CSS exports from Stitch.
- [`src/app/globals.css`](file:///e:/My_Project/portfolio/src/app/globals.css): Active implementation of design tokens using CSS variables bound to Tailwind v4 `@theme`.

### Color Palette (Dark Theme Defaults)
- **Surface**: `#0c141a` (page background), `#151d22` (surface-container-low), `#192126` (surface-container), `#232b31` (surface-container-high).
- **Primary (Git Green)**: `#7bdb80` (accent & active states), `#238636` (primary-container / buttons), `#f9fff3` (on-primary-container).
- **Secondary (Git Purple / Merged)**: `#d3bbff` (labels), `#5b21b5` (merged container), `#c7aaff`.
- **Tertiary (Git Blue / Issues & Telemetry)**: `#a2c9ff` (links, secondary badges), `#1377cd`.
- **Outline / Borders**: `#3f4a3d` (`outline-variant` for card borders), `#899485` (`outline` for subtle borders).

### Typography
- **Headings & Code**: `JetBrains Mono` (`font-mono`, `--font-jetbrains`).
- **Body & Prose**: `Inter` (`font-sans`, `--font-inter`).
- **Icons**: Google `Material Symbols Outlined` via self-hosted font in `src/app/fonts/material-symbols-outlined.ttf`.

### Key Design Invariants
1. **Never use standard generic colors** (raw red, blue, green). Always reference semantic tokens (`text-primary`, `bg-surface-container`, `border-outline-variant`).
2. **Ambient Glow Background**: The Hero background consists of animated radial blur blobs (`primary/10`, `tertiary/10`) with an ellipse mask to prevent box edge clipping.
3. **No Horizontal Scroll**: All containers must adhere to `max-w-[1280px] mx-auto px-gutter-mobile sm:px-gutter` with overflow protection.

---

## 5. Data Model (`src/data/portfolio.ts`)

All portfolio content is centralized in [`src/data/portfolio.ts`](file:///e:/My_Project/portfolio/src/data/portfolio.ts). Component props receive data from this file, ensuring zero hard-coded copy inside UI components.

| Field / Export | Type | Consumed By | Status (Real vs Demo) |
| :--- | :--- | :--- | :--- |
| `personal` | `PersonalData` | `Navbar`, `Hero`, `About`, `Footer`, `layout.tsx` | **Real**: Ritesh Thete, Java Full Stack Developer, Pune, Mahendra Technosoft, startDate `2025-08-01`. (Avatar is demo photograph). |
| `getExperienceYears` | `(startDate) => number` | `Hero`, `portfolio.ts` | **Real**: Computes elapsed full years (`1+ yrs`). |
| `getHeroExperienceBadge` | `(years) => string` | `Hero` | **Real**: Produces badge text `"Java Full Stack Developer • {years}+ yr experience"`. |
| `getHeroBio` | `(years) => string` | `Hero` | **Real**: Formatted intro paragraph highlighting enterprise Java and React production experience. |
| `about` | `AboutData` | `About` | **Real**: Academic background (MCA, Pune Univ), honors, AWS certification, engineering philosophy. |
| `metrics` | `MetricItem[]` | `Hero`, `github.ts` (fallback) | **Real / Dynamic**: Experience (1+ yrs), Repositories, Contributions (updated via GitHub API when live). |
| `terminal` | `TerminalData` | `Hero` | **Real**: Realistic commands (`git log --oneline -3`, `git status --short`) matching actual Java/React codebase files. |
| `navigation` | `NavItem[]` | `Navbar` | **Real**: Section navigation IDs (`#home`, `#about`, `#skills`, etc.). |
| `skills` | `SkillCategory[]` | `Skills` | **Real**: Categorized competencies across Backend, Frontend, Databases, and Cloud/DevOps with verified skill chips. |
| `experience` | `ExperienceItem[]` | `Experience` | **Real**: Professional experience at Mahendra Technosoft and internship, with commit hashes and bullet points. |
| `projects` | `ProjectItem[]` | `Projects` | **Demo Showcase**: 6 representative full-stack projects with demo GitHub/demo links. |
| `github` | `GitHubActivityData` | `github.ts` (fallback), `GitHubActivity` | **Demo Fallback**: Used only if GitHub API is unreachable or rate-limited. |
| `education` | `EducationItem[]` | `Education` | **Real**: MCA (Pune University), BBA (Computer Application), and AWS Certified Cloud Practitioner. |
| `testimonials` | `TestimonialItem[]` | `Testimonials` | **Demo**: Pull request review testimonials from colleagues/managers. |
| `contact` | `ContactData` | `Contact`, `Hero`, `Navbar`, `layout.tsx` | **Real**: Email, phone, location (Pune, India), GitHub handle `@theteritesh`. |
| `footer` | `FooterData` | `Footer` | **Real**: System status, copyright year, repository branch telemetry. |

---

## 6. External Integrations & Services

### 1. Contact Form via EmailJS
- **Component**: [`src/components/Contact.tsx`](file:///e:/My_Project/portfolio/src/components/Contact.tsx)
- **Library**: `@emailjs/browser`
- **Method**: `emailjs.send(serviceId, templateId, templateParams, publicKey)`
- **Behavior**:
  - Validates name, email, and message inputs.
  - Displays interactive Git terminal output simulating `git commit` and `git push origin message`.
  - Gracefully alerts the user if environment variables are not configured in development.

### 2. Live GitHub GraphQL Data Fetching
- **Module**: [`src/lib/github.ts`](file:///e:/My_Project/portfolio/src/lib/github.ts) (guarded by `import "server-only"`)
- **API Endpoint**: `https://api.github.com/graphql`
- **Caching / ISR**: `fetch(..., { next: { revalidate: 3600 } })` (cached for 1 hour).
- **Data Fetched**:
  - Total public repositories count.
  - Follower count.
  - Contributions calendar (weeks, days, counts, intensity levels).
  - Pinned repositories (name, description, stars, forks, primary language color).
  - Language breakdown across recent repositories for top language percentage calculations.
- **Resilience**: If `GITHUB_TOKEN` is missing, invalid, or hits rate limits, it falls back seamlessly to `portfolioData.github` with zero page crashes.

### 3. SEO, Metadata & Structured Data
- **Metadata Base**: Uses `NEXT_PUBLIC_SITE_URL` (defaults to `http://localhost:3000`).
- **Open Graph**: Auto-generated on the Edge via [`src/app/opengraph-image.tsx`](file:///e:/My_Project/portfolio/src/app/opengraph-image.tsx) (1200x630 PNG).
- **Crawlers**: [`src/app/robots.ts`](file:///e:/My_Project/portfolio/src/app/robots.ts) permits indexing and references [`src/app/sitemap.ts`](file:///e:/My_Project/portfolio/src/app/sitemap.ts).
- **JSON-LD**: Embedded `Person` entity schema in [`src/app/layout.tsx`](file:///e:/My_Project/portfolio/src/app/layout.tsx) detailing alumni info, job title, and technical proficiencies.

---

## 7. Environment Variables

Reference template is in [`.env.example`](file:///e:/My_Project/portfolio/.env.example):

| Variable Name | Exposure | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Client & Server | Canonical site URL for metadata, sitemaps, robots, and OpenGraph. |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Client | EmailJS Service ID for contact form message delivery. |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Client | EmailJS Template ID for contact email formatting. |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Client | EmailJS Account Public Key. |
| `GITHUB_TOKEN` | Server-only | Personal Access Token (classic, no scopes needed for public data) for GraphQL queries. |
| `GITHUB_USERNAME` | Server-only | Target GitHub username to fetch telemetry for (default: `theteritesh`). |

---

## 8. Coding Standards & Conventions

1. **Client vs Server Components**:
   - Keep components Server Components by default.
   - Use `"use client"` *only* where user interactivity, browser APIs, React state, or Framer Motion are strictly required.
   - Never call `new Date()` or unstable APIs during server prerender pass in a Client Component. Pass computed numbers or use deferred client state.
2. **Zero Hardcoded Content**:
   - All text, URLs, headings, and labels must originate from `src/data/portfolio.ts` or `docs/CONTENT.md`.
3. **Responsive Breakpoint Discipline**:
   - Always verify layouts at **390px** (mobile), **768px** (tablet), and **1440px** (desktop).
   - Ensure `document.documentElement.scrollWidth <= window.innerWidth` (no horizontal overflow).
4. **Mandatory Quality Gates**:
   - Before completing any task, run:
     - `cmd.exe /c "npm run lint"` (must pass with 0 errors and 0 warnings).
     - `cmd.exe /c "npm run build"` (must compile all static pages with code 0).

---

## 9. Current Project Status & Roadmap

### What is Finished & Verified
- [x] Full Git/GitHub-styled responsive design implemented across all 10 sections.
- [x] Hero section highlights professional full-stack Java experience at Mahendra Technosoft.
- [x] Responsive 3-card stats row (`EXPERIENCE`, `REPOSITORIES`, `CONTRIBUTIONS`).
- [x] Typewriter animation with 3-phase state machine and leak-free cleanups.
- [x] Dynamic GitHub Activity heatmap with live GraphQL integration and fallback support.
- [x] Working EmailJS contact form with feedback alerts.
- [x] Complete SEO setup (Metadata API, Open Graph Image, Sitemap, Robots, JSON-LD).
- [x] Dark/light theme toggle.

### Known Work / Next Steps
1. **Real Content Replacement**: Replace demo project URLs and screenshots in `src/data/portfolio.ts` with Ritesh's live production projects when ready.
2. **Resume PDF**: Replace placeholder `public/resume.pdf` with Ritesh's finalized resume document.
3. **Avatar Photograph**: Replace placeholder profile photograph in `portfolioData.personal.avatarUrl` with Ritesh's official headshot.
4. **Vercel Deployment**: Connect the repository to Vercel, set production environment variables, and verify custom domain configuration.
5. **Google Search Console**: Submit `sitemap.xml` after domain deployment.

---

## 10. Working Rules for Future AI Sessions

> [!IMPORTANT]
> **Strict Content Integrity Rules**:
> 1. **Never invent facts, metrics, company names, or testimonials.** Only use verified data provided in `docs/CONTENT.md` or `src/data/portfolio.ts`.
> 2. **Never add fake AWS account IDs, IAM ARNs, or artificial ports.**
> 3. If required information is missing, **ask the user** or provide a clearly marked placeholder adhering to existing schema.
> 4. Keep existing comments and structural conventions intact.
