# Implementation Plan: Software Developer Portfolio Website

## 1. Overview

**Goal:** A professional, corporate-styled portfolio website for a software
developer, showcasing projects, skills, blog posts, and a downloadable
resume, with a working contact form.

**Audience:** Recruiters, hiring managers, potential clients, collaborators.

**Tone:** Clean, credible, restrained — not flashy or experimental.

---

## 2. Tech Stack Decision

| Layer | Choice | Reasoning |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | Best-in-class for a portfolio: static generation, file-based routing, built-in image optimization, easy Vercel deploy, huge community/hire-ability signal for a dev portfolio |
| Language | **TypeScript** | Type safety for data schemas (projects, blog posts); expected baseline for a professional dev portfolio |
| Styling | **Tailwind CSS** | Fast to build a clean, consistent design system; easy to theme with a restrained palette |
| Content | **MDX + gray-matter (or Contentlayer)** | Blog posts and project write-ups as markdown files with frontmatter — no CMS/backend needed, easy to edit later |
| Icons | **lucide-react** | Clean, consistent icon set for skills/tech badges |
| Form handling | **Client-side validation now; stub submit handler for Formspree/Resend later** | No backend required initially, but structured so wiring a real email service is a 10-minute job |
| Hosting | **Vercel** | Zero-config deploy for Next.js, free tier, custom domain support |
| Fonts | **next/font with Inter (or similar) system-adjacent sans-serif** | Professional, highly legible, fast-loading (self-hosted via next/font, no layout shift) |

**Alternative considered:** Astro — better raw performance for a mostly-static
site, but Next.js was chosen for stronger ecosystem support, easier future
extension (e.g., adding an API route for the contact form), and better
signal-value on a developer's own portfolio (shows familiarity with the most
widely used React framework).

---

## 3. Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx                 # Root layout, fonts, metadata, nav/footer
│   ├── page.tsx                   # Home page (About + highlights)
│   ├── globals.css                # Tailwind base + custom CSS variables
│   ├── projects/
│   │   ├── page.tsx                # Projects grid page
│   │   └── [slug]/page.tsx         # Individual project detail page
│   ├── blog/
│   │   ├── page.tsx                # Blog index page
│   │   └── [slug]/page.tsx         # Individual blog post page
│   ├── contact/
│   │   └── page.tsx                # Contact page
│   └── api/
│       └── contact/route.ts        # Stub API route for form submission
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── SkillsGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   └── ContactForm.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       └── SectionHeading.tsx
├── content/
│   ├── projects/                   # One .mdx file per project
│   │   ├── project-one.mdx
│   │   └── project-two.mdx
│   └── blog/                       # One .mdx file per blog post
│       ├── first-post.mdx
│       └── second-post.mdx
├── data/
│   └── skills.ts                   # Structured skills data (see schema below)
├── lib/
│   ├── mdx.ts                       # MDX/frontmatter parsing helpers
│   └── seo.ts                       # Shared metadata helper
├── public/
│   ├── resume.pdf                  # Placeholder resume file
│   ├── favicon.ico                 # Placeholder favicon
│   └── images/
│       ├── headshot-placeholder.jpg
│       └── projects/               # Project thumbnail placeholders
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Data Schemas

### Project (frontmatter in `content/projects/*.mdx`)
```ts
{
  title: string;
  slug: string;
  description: string;       // 1-2 sentence summary for card view
  techTags: string[];        // e.g. ["React", "Node.js", "PostgreSQL"]
  thumbnail: string;         // path to image
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;         // shows on homepage highlights
  date: string;              // ISO date
}
```

### Blog Post (frontmatter in `content/blog/*.mdx`)
```ts
{
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime?: string;      // auto-calculated
}
```

### Skill (`data/skills.ts`)
```ts
{
  category: "Languages" | "Frameworks" | "Tools" | "Databases" | "Cloud/DevOps";
  items: { name: string; icon?: string }[];
}
```

---

## 5. Pages & Routes

| Route | Purpose |
|---|---|
| `/` | Home — Hero, short About, featured skills, 2-3 featured projects, CTA to resume/contact |
| `/projects` | Full projects grid (all projects, filterable by tech tag — stretch goal) |
| `/projects/[slug]` | Individual project detail page (long description, screenshots, links) |
| `/blog` | Blog index, list of posts sorted by date |
| `/blog/[slug]` | Individual blog post rendered from MDX |
| `/contact` | Contact form + alternative contact info (email, LinkedIn, GitHub) |

Resume download is a persistent nav-bar button/link, not a separate route.

---

## 6. Section-by-Section Plan

### Hero / About (Home)
- Name, title (e.g. "Software Developer"), one-line value proposition
- Short professional summary (2-3 sentences, placeholder text)
- Headshot placeholder (circular, optimized via `next/image`)
- Primary CTA: "View Projects" | Secondary CTA: "Download Resume"

### Skills / Tech Stack
- Grouped by category (Languages, Frameworks, Tools, Databases, Cloud/DevOps)
- Rendered as badges/chips with icons (lucide-react or simple-icons)
- Clean grid layout, not a wall of text

### Projects Grid
- Card per project: thumbnail, title, 1-2 line description, tech tags, links
- Grid responsive: 1 col mobile, 2 col tablet, 3 col desktop
- Click-through to detail page for full write-up

### Blog
- Simple index list: title, date, excerpt, tags
- Individual post page renders MDX with typography plugin (`@tailwindcss/typography`)
- Placeholder posts included so the layout can be reviewed with real content

### Resume/CV
- Visible "Download Resume" button in navbar and homepage
- Links to a placeholder PDF in `/public/resume.pdf`

### Contact Form
- Fields: Name, Email, Message
- Client-side validation (required fields, email format)
- Submits to `/api/contact` stub route — logs payload for now, with a
  clearly marked `// TODO: wire up Formspree/Resend/SendGrid here` comment
- Success/error UI states handled without a real backend yet

---

## 7. Design System

- **Palette:** Charcoal (#1A1A1D) / Navy (#0F1B3C) as primary dark tones,
  off-white (#FAFAFA) background, one accent color (e.g. muted blue
  #3B82F6) for links/CTAs
- **Typography:** Single sans-serif family (Inter or similar) — larger
  weight contrast (bold headings, regular body) instead of multiple fonts
- **Spacing:** Consistent 8px-based spacing scale via Tailwind defaults
- **Motion:** Subtle fade/slide-in on scroll (Framer Motion or CSS only) —
  no more than that
- **Components:** Buttons, badges, and section headings built as shared
  UI components for consistency across pages

---

## 8. Non-Functional Requirements

- **Accessibility:** Semantic HTML5 landmarks, proper heading hierarchy,
  alt text on all images, visible focus states, AA contrast minimum
- **Responsive:** Mobile-first, tested at 375px / 768px / 1280px widths
- **SEO:** Per-page `<title>` and meta description via Next.js Metadata
  API, Open Graph tags, sitemap.xml, robots.txt
- **Performance:** Lazy-loaded images, `next/image` optimization, minimal
  client-side JS (favor server components where possible)
- **Favicon:** Placeholder included, swappable later

---

## 9. Phased Task Checklist

**Phase 1 — Setup**
- [ ] Scaffold Next.js + TypeScript + Tailwind project
- [ ] Configure fonts, base theme (colors, typography) in `tailwind.config.ts`
- [ ] Build shared layout: Navbar, Footer

**Phase 2 — Core Content Pages**
- [ ] Home page: Hero + About + featured skills/projects
- [ ] Skills data file + SkillsGrid component
- [ ] Projects data (2-3 placeholder MDX files) + grid page + detail page

**Phase 3 — Blog**
- [ ] MDX parsing setup (`lib/mdx.ts`)
- [ ] Blog index page
- [ ] Blog post detail page with typography styling

**Phase 4 — Resume & Contact**
- [ ] Add placeholder resume PDF + download button in nav/home
- [ ] Contact page + form with validation
- [ ] Stub `/api/contact` route with TODO for real email service

**Phase 5 — Polish & Verification**
- [ ] SEO metadata, Open Graph tags, sitemap, robots.txt
- [ ] Accessibility pass (alt text, contrast, focus states)
- [ ] Responsive check at mobile/tablet/desktop breakpoints
- [ ] Run `npm run build` — confirm no errors
- [ ] Run dev server, screenshot each page for visual review

**Phase 6 — Deployment**
- [ ] Push to GitHub repo
- [ ] Connect to Vercel, configure custom domain (if applicable)
- [ ] Verify production build

---

## 10. Assumptions & Open Questions

- All content (bio, project details, blog posts, skills, resume, headshot)
  will initially be **placeholder** and swapped in later.
- No CMS or database — content lives in MDX/data files in the repo.
- Contact form will not send real emails until a provider (Formspree,
  Resend, SendGrid, etc.) is chosen and API keys are added.
- Analytics (e.g. Vercel Analytics, Plausible) not included by default —
  flag if you want this added.
- Dark mode not included by default given the "professional/corporate"
  direction — flag if you'd like a toggle added.

---

## 11. Definition of Done

- All pages build and render without errors (`npm run build` passes)
- All six required sections (About, Skills, Projects, Blog, Resume,
  Contact) are present and navigable
- Site is responsive and accessible per Section 8
- Placeholder content is clearly marked and easy to locate/replace
- Project structure supports adding new projects/blog posts by dropping
  in a new `.mdx` file — no component code changes required
