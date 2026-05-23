# Vishnu Priyan — Portfolio
**Creative Developer · ML Engineer · UI/UX Designer**

Live Website: [vishnupriyan.dev](https://vishnupriyan.dev)

---

## Tech Stack

This website is built with state-of-the-art frontend and animation technologies:

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-20232a?style=flat-square&logo=react&logoColor=61dafb)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.15-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15.0-green?style=flat-square&logo=greensock&logoColor=white)](https://gsap.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.40.0-ff00c8?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Lenis Scroll](https://img.shields.io/badge/Lenis_Scroll-1.3.23-black?style=flat-square)](https://github.com/darkroomengineering/lenis)

---

## Getting Started

To run the development server locally:

```bash
git clone https://github.com/V1shnuuu/Portfolio-new.git
cd vishnu-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Build & Deploy

To compile production bundles locally or deploy the build:

```bash
npm run build   # Production build
npm run start   # Start production server
```

### Vercel Deployment

Deploy directly on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

The application is pre-configured with a custom `vercel.json` file pointing routes, install commands, headers (security options), and edge routing (`sin1` Singapore servers) for minimal latency.

---

## Project Structure

Below is the directory tree of the portfolio repository:

```text
vishnu-portfolio/
├── animations/           # GSAP & Framer Motion animation configurations
│   ├── useGSAPTimeline.ts
│   ├── useLenis.ts
│   ├── useScrollReveal.ts
│   └── variants.ts
├── app/                  # Next.js App Router (Layouts, pages, sitemaps)
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── sitemap.ts
├── components/           # React elements
│   ├── layout/           # Shared wrap layouts (Preloader, Nav, Footer, Cursor)
│   │   ├── CustomCursor.tsx
│   │   ├── Footer.tsx
│   │   ├── LayoutProvider.tsx
│   │   ├── LenisProvider.tsx
│   │   ├── Navbar.tsx
│   │   ├── Preloader.tsx
│   │   ├── ScrollProgress.tsx
│   │   └── ThemeProvider.tsx
│   ├── sections/         # Individual sections (Hero, About, Projects, etc.)
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Services.tsx
│   │   ├── Skills.tsx
│   │   └── Testimonials.tsx
│   └── ui/               # Core design system tokens and micro-components
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── GlowCard.tsx
│       ├── MagneticButton.tsx
│       └── SectionHeading.tsx
├── data/                 # JSON-like data layers for all static text copy
│   ├── experience.ts
│   ├── projects.ts
│   ├── services.ts
│   └── skills.ts
├── hooks/                # Specialized custom React hooks
│   ├── useMediaQuery.ts
│   └── useMousePosition.ts
├── lib/                  # Helper utilities and site constant variables
│   ├── constants.ts
│   └── utils.ts
├── public/               # Static assets
│   ├── robots.txt
│   └── og-image.png
├── next.config.mjs       # Next.js optimization parameters
├── tailwind.config.ts    # Tailwind CSS layout spacing & custom color scheme
├── tsconfig.json         # Strict TypeScript compiler definitions
└── vercel.json           # Vercel infrastructure routing headers
```

---

## Customization Guide

- **Content**: Update arrays and details inside `data/` files to change projects, skills, experience milestones, services offered, and testimonials.
- **Colors**: Modify the custom CSS variables inside `app/globals.css` or key colors under the `extend` block of `tailwind.config.ts`.
- **Fonts**: Modify the imports in `app/globals.css` and font family mapping inside `tailwind.config.ts`.
- **Contact Form**: Update the email fields inside `lib/constants.ts` or set the Formspree endpoint parameters inside `.env.local`.

---

## Adding Real Project Images

1. Save optimized project mockups/images inside `public/images/` (recommended size: `1200×675px` in WebP format).
2. Inside `data/projects.ts`, modify the static path reference of the project `image` key:
   ```typescript
   image: '/images/project-name.webp'
   ```
3. Inside `components/sections/Projects.tsx`, replace the placeholder `<GlowCard>` image area with the `<Image>` component from `next/image` to take advantage of next-gen image resizing and lazy loading.

---

## SEO Checklist

- [x] Title & Description metadata configured
- [x] OpenGraph & Twitter Cards setup
- [x] Dynamic `sitemap.ts` configured
- [x] Public `robots.txt` index rule defined
- [ ] Add real `og-image.png` (1200×630px WebP/PNG) to the `public/` directory
- [ ] Submit sitemap URL (`https://vishnupriyan.dev/sitemap.xml`) to Google Search Console

---

## Performance Targets

- **Lighthouse Performance**: 90+
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: 0

---

## License

MIT — Feel free to use this portfolio as layout inspiration, but please don't copy the personal copy/contents directly.
