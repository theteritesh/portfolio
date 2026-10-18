# Ritesh Thete | Java Full Stack Developer Portfolio

A modern, high-performance developer portfolio styled like an interactive Git repository and terminal workspace. Built for **Ritesh Thete**, Java Full Stack Developer based in Pune, India.

![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-14-f43f5e?logo=framer)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack, Server & Client Components)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) with CSS custom property design tokens
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) with class strategy (Git Dark Mode + GitHub Light Mode)
- **Animations**: [Framer Motion 14](https://www.framer.com/motion/) with `prefers-reduced-motion` compliance
- **Typography**: Local [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) loading (Inter, JetBrains Mono, Material Symbols Outlined)
- **Contact Dispatch**: [@emailjs/browser](https://www.emailjs.com/) client-side email delivery with spam honeypot
- **SEO & Social**: Next.js Metadata API, dynamic Open Graph images (`next/og`), `sitemap.xml`, `robots.txt`, and JSON-LD `Person` schema

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/theteritesh/portfolio.git
cd portfolio
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory (based on `.env.example`):

```env
# Production domain for SEO canonicals, OpenGraph, sitemap & robots
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# EmailJS Client Credentials (for the contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 3. Replace the Resume PDF Placeholder

A placeholder file exists at [`public/resume.pdf`](public/resume.pdf). Replace this file with your actual resume PDF before deploying to production. The "Download Resume" button in the Navbar and Drawer links directly to `/resume.pdf`.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Production Build & Linting

Validate TypeScript types, compile static pages, and check ESLint rules:

```bash
# Run ESLint across src/
npm run lint

# Compile optimized production build
npm run build

# Start local production server
npm run start
```

---

## ⚙️ Environment Variables Reference

| Variable | Description | Default / Example |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical root URL used in `metadataBase`, `robots.txt`, `sitemap.xml`, and JSON-LD schema | `http://localhost:3000` (Local) / `https://ritesh-thete.dev` (Prod) |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS Service ID | `service_xxxxxxx` |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS Template ID (fields: `from_name`, `from_email`, `subject`, `message`) | `template_xxxxxxx` |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS Public API Key | `xxxxxxxxxxxxxxxx` |

---

## ☁️ Deploying to Vercel

The portfolio is optimized for zero-configuration deployment on [Vercel](https://vercel.com):

1. **Push your code** to GitHub:
   ```bash
   git push origin main
   ```
2. **Import Repository** in Vercel:
   - Go to [vercel.com/new](https://vercel.com/new) and select your `theteritesh/portfolio` repository.
   - Framework preset will automatically detect **Next.js**.
3. **Add Environment Variables** in the Vercel project settings:
   - `NEXT_PUBLIC_SITE_URL`: Your Vercel production domain (e.g. `https://your-portfolio.vercel.app` or custom domain)
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`: Your EmailJS Service ID
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`: Your EmailJS Template ID
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: Your EmailJS Public Key
4. Click **Deploy**. Vercel will build and deploy the production bundle with Edge OG image generation and instant CDN invalidation.

---

## 📂 Project Structure

```
portfolio/
├── public/
│   ├── images/
│   │   ├── avatars/             # SVG review avatars
│   │   └── projects/            # Project showcase previews
│   └── resume.pdf               # Resume download file
├── src/
│   ├── app/
│   │   ├── fonts/               # Offline Material Symbols font
│   │   ├── globals.css          # Design system & Git light/dark tokens
│   │   ├── icon.tsx             # Dynamic 32x32 favicon
│   │   ├── apple-icon.tsx       # Dynamic 180x180 Apple touch icon
│   │   ├── opengraph-image.tsx  # Dynamic 1200x630 dark Git-themed OG image
│   │   ├── layout.tsx           # SEO metadata, JSON-LD Person, ThemeProvider
│   │   ├── not-found.tsx        # Git terminal-style 404 page
│   │   ├── page.tsx             # Main page with lazy/dynamic imports
│   │   ├── robots.ts            # Dynamic robots.txt
│   │   └── sitemap.ts           # Dynamic sitemap.xml
│   ├── components/
│   │   ├── Navbar.tsx           # Git branch pill, search, theme toggle, resume CTA
│   │   ├── Hero.tsx             # Single H1, typewriter role, live terminal preview
│   │   ├── About.tsx            # README.md tabbed layout with credentials
│   │   ├── Skills.tsx           # Grouped backend/frontend/db/cloud folders
│   │   ├── Experience.tsx       # Scroll-animated Git commit timeline
│   │   ├── Projects.tsx         # GitHub repo/PR cards with animated filter tabs
│   │   ├── GitHubActivity.tsx   # 52-week contribution heatmap & interactive graph
│   │   ├── Education.tsx        # MCA, BBA, and AWS certification cards
│   │   ├── Testimonials.tsx     # GitHub review comment cards with code diffs
│   │   ├── Contact.tsx          # Terminal form with EmailJS & honeypot
│   │   ├── Footer.tsx           # Repository index, social bounce icons, status bar
│   │   └── ThemeProvider.tsx    # next-themes client wrapper
│   └── data/
│       └── portfolio.ts         # Centralized typed portfolio data source
├── .env.example                 # Environment variables template
├── package.json
└── tsconfig.json
```

---

## 📄 License

MIT License • Built with ❤️ and commits by [Ritesh Thete](https://github.com/theteritesh).
