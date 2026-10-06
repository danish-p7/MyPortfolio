# 02 — High-Level Architecture

## 1. System Architecture Overview

This project is built around the Next.js 14 App Router paradigm. It merges server-side pre-rendering with interactive client components and a decoupled headless Markdown content layer. Rather than depending on a network-attached database or an external content management API, all data queries operate synchronously against the local file system during build time, resulting in static HTML and lightweight JavaScript bundles distributed globally over a Content Delivery Network (CDN).

The following diagram illustrates every major subsystem in the application and how data and user requests move between them:

```mermaid
graph TD
    subgraph ClientLayer["🖥️ Client Layer (User Browsers & Web Crawlers)"]
        Browser["Desktop & Mobile Browsers"]
        Crawler["Search Engine Spiders (Googlebot, Bingbot)"]
    end

    subgraph AppRouter["⚡ Next.js 14 App Router (app/)"]
        RootLayout["Root Layout (layout.tsx) + Inter Font"]
        HomePage["Home Page (page.tsx)"]
        ProjectsArchive["Projects Gallery (projects/page.tsx)"]
        ProjectReader["Case Study Dynamic Route (projects/[slug]/page.tsx)"]
        BlogArchive["Blog Index (blog/page.tsx)"]
        BlogReader["Article Dynamic Route (blog/[slug]/page.tsx)"]
        ContactPage["Contact View (contact/page.tsx)"]
        APIRoute["Serverless Contact API (api/contact/route.ts)"]
        Robots["SEO Crawl Rules (robots.ts)"]
        Sitemap["Dynamic Sitemap (sitemap.ts)"]
    end

    subgraph UIComponents["🧩 UI Component System (components/)"]
        LayoutComps["Layout Components (Navbar.tsx, Footer.tsx)"]
        SectionComps["Section Views (Hero, About, SkillsGrid, ProjectCard)"]
        ClientForm["Interactive Client Form (ContactForm.tsx)"]
        UIPrimitives["Design Tokens & Primitives (Button, Badge, SectionHeading)"]
    end

    subgraph ContentEngine["📁 Decoupled Content Layer"]
        SkillsStore["data/skills.ts (Typed SkillCategory[] Data)"]
        ProjectDocs["content/projects/*.md (YAML Frontmatter + Markdown)"]
        BlogDocs["content/blog/*.md (YAML Frontmatter + Markdown)"]
        ContentLib["lib/content.ts (gray-matter & remark parser)"]
        SEOLib["lib/seo.ts (Metadata & OpenGraph Generator)"]
    end

    subgraph StaticStorage["📦 Static Storage (public/)"]
        ResumeFile["resume.pdf (Downloadable CV)"]
        ProjectImages["images/projects/*.svg (Vector Previews)"]
        Favicons["favicon.svg & app/icon.svg"]
    end

    %% Client Interactions
    Browser <-->|HTTP GET HTML & Hydration Bundles| RootLayout
    Crawler <-->|HTTP GET /robots.txt & /sitemap.xml| Robots
    Crawler <-->|Indexes Pre-rendered Pages| Sitemap
    Browser <-->|HTTP POST JSON Payload| ClientForm
    ClientForm -->|fetch('/api/contact')| APIRoute

    %% Router to UI Hierarchy
    RootLayout --> LayoutComps
    RootLayout --> HomePage
    RootLayout --> ProjectsArchive
    RootLayout --> ProjectReader
    RootLayout --> BlogArchive
    RootLayout --> BlogReader
    RootLayout --> ContactPage

    HomePage --> SectionComps
    HomePage --> UIPrimitives
    ProjectsArchive --> SectionComps
    ContactPage --> ClientForm

    %% Content Ingestion
    HomePage -.->|getAllProjects(), getAllBlogPosts()| ContentLib
    ProjectsArchive -.->|getAllProjects()| ContentLib
    ProjectReader -.->|getProjectBySlug()| ContentLib
    BlogArchive -.->|getAllBlogPosts()| ContentLib
    BlogReader -.->|getBlogPostBySlug()| ContentLib
    SectionComps -.->|reads skillCategories| SkillsStore
    ContentLib -.->|fs.readdirSync & matter()| ProjectDocs
    ContentLib -.->|fs.readdirSync & matter()| BlogDocs
    ProjectReader -.->|constructMetadata()| SEOLib
    BlogReader -.->|constructMetadata()| SEOLib
    Sitemap -.->|getAllProjects(), getAllBlogPosts()| ContentLib

    %% Static Assets
    LayoutComps -.->|serves link| ResumeFile
    SectionComps -.->|displays vector thumb| ProjectImages
    RootLayout -.->|serves icon| Favicons
```

---

## 2. Component Breakdown and Responsibilities

### Next.js 14 App Router (`app/`)
The App Router is the routing and rendering engine of the application. It maps file-system paths to accessible URLs, handles nested layouts, injects the optimized Google Inter font, controls HTTP response headers, and statically generates dynamic pages via `generateStaticParams()`. It is also responsible for executing serverless Route Handlers (`app/api/contact/route.ts`) without maintaining a separate backend Node.js server.

### UI Component System (`components/`)
The component layer contains modular, reusable React 18 components divided into three distinct sub-packages:
- **`components/layout/`**: Persistent structural chrome, including the responsive sticky header [`Navbar.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/layout/Navbar.tsx) and the dark-themed footer [`Footer.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/layout/Footer.tsx).
- **`components/sections/`**: High-level page sections encapsulating business presentation logic, such as [`Hero.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/Hero.tsx), [`About.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/About.tsx), [`SkillsGrid.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/SkillsGrid.tsx), [`ProjectCard.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/ProjectCard.tsx), and [`ContactForm.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/ContactForm.tsx).
- **`components/ui/`**: Atomic, brand-consistent design primitives ([`Button.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/ui/Button.tsx), [`Badge.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/ui/Badge.tsx), [`SectionHeading.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/ui/SectionHeading.tsx)) that standardize button variants, chip sizes, and section title typography.

### Decoupled Content Layer (`content/`, `data/`, `lib/`)
This subsystem serves as the database replacement. It houses raw content in Markdown files with YAML frontmatter headers ([`content/projects/`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/content/projects) and [`content/blog/`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/content/blog)) and structured TypeScript arrays ([`data/skills.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/data/skills.ts)). The parser module ([`lib/content.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts)) reads these files using Node.js `fs`, parses the frontmatter via `gray-matter`, converts Markdown syntax into sanitized HTML using `remark` and `remark-html`, and calculates reading times.

### SEO & Metadata Subsystem (`lib/seo.ts`, `app/robots.ts`, `app/sitemap.ts`)
Responsible for search visibility, social link unfurling, and search crawler management. [`lib/seo.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/seo.ts) provides a centralized `siteConfig` object and a `constructMetadata()` helper that generates OpenGraph and Twitter card metadata for any page. [`robots.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/robots.ts) blocks crawlers from indexing `/api/`, while [`sitemap.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/sitemap.ts) iterates over all project and blog slugs to output an up-to-date XML sitemap.

### Serverless Contact API (`app/api/contact/route.ts`)
A lightweight backend route handler executing within the Next.js runtime. It accepts HTTP `POST` requests with JSON payloads, verifies the existence and length of all required fields (`name`, `email`, `subject`, `message`), checks email syntax via a regular expression, logs the inquiry to standard output, and provides documented hook points for transactional email providers like Resend, Formspree, or SendGrid.

### Static Assets (`public/`)
Houses static binary files served directly by the web server root without build processing, including the downloadable resume [`resume.pdf`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/public/resume.pdf), vector SVG project mockups in [`public/images/projects/`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/public/images/projects), and the site favicon.

---

## 3. Technology Stack & Rationale

The table below lists every technology, framework, and library in use, citing exact versions from [`package.json`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/package.json). The rationale distinguishes between reasons explicitly recorded in repository documentation/code and reasons inferred from architectural best practices.

| Technology | Exact Version | Role in Project | Selection Rationale (Explicit vs. Inferred) |
|---|---|---|---|
| **Next.js** | `^14.2.15` | Core Web Framework & App Router | **Explicit**: Chosen as the "Industry gold standard for React web applications" to generate pre-rendered static HTML with instant page loads, zero layout shift, and top SEO score (documented in [`ARCHITECTURE_GUIDE.md`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/ARCHITECTURE_GUIDE.md#L94)).<br/>*Inferred*: Provides integrated serverless API routes without needing an Express server. |
| **React & React DOM** | `^18.3.1` | UI Library & DOM Renderer | *Inferred*: Required peer dependency of Next.js 14, providing React Server Components (RSC) and concurrent hydration capabilities. |
| **TypeScript** | `^5.6.3` | Static Type Checker & Language | **Explicit**: "Strict static type-checking. Catches mistakes before you deploy; guarantees data schemas for projects, skills, and blog posts" (documented in [`ARCHITECTURE_GUIDE.md`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/ARCHITECTURE_GUIDE.md#L95)). |
| **Tailwind CSS** | `^3.4.14` | Styling Engine & Design System | **Explicit**: "Utility-first styling engine with customized corporate design tokens. Easy to adjust colors, spacing, and typography without writing custom CSS files" (documented in [`ARCHITECTURE_GUIDE.md`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/ARCHITECTURE_GUIDE.md#L96)). |
| **@tailwindcss/typography** | `^0.5.15` | Prose Styling Plugin | *Inferred*: Provides the `.prose` utility classes in [`app/globals.css`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/globals.css#L44-L75) to style raw HTML output generated from Markdown case studies and articles. |
| **gray-matter** | `^4.0.3` | Frontmatter Extraction | **Explicit**: Part of the "Headless content management" architecture allowing projects and articles to be written in text files without an external CMS (documented in [`ARCHITECTURE_GUIDE.md`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/ARCHITECTURE_GUIDE.md#L97)). |
| **remark & remark-html** | `^15.0.1` / `^16.0.1` | Markdown AST & HTML Serialization | *Inferred*: Converts Markdown syntax into standardized HTML strings in [`lib/content.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts#L100) for rendering inside Server Components via `dangerouslySetInnerHTML`. |
| **reading-time** | `^1.5.0` | Reading Duration Calculation | *Inferred*: Installed to estimate article reading speed based on word count. *(Note: [`lib/content.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts#L125) also contains a custom 200 WPM estimation helper).* |
| **lucide-react** | `^0.453.0` | UI Icons | **Explicit**: "Lightweight, modern SVG icon library. Crisp, retina-ready corporate icons with zero bundle bloat" (documented in [`ARCHITECTURE_GUIDE.md`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/ARCHITECTURE_GUIDE.md#L98)). |
| **Next/Font (Google Inter)** | Native to Next.js | Primary Sans-Serif Font Family | **Explicit**: "Self-hosted Google Inter font automatically optimized by Next.js. Eliminates external font requests, guarantees privacy compliance, and prevents font flicker" (documented in [`ARCHITECTURE_GUIDE.md`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/ARCHITECTURE_GUIDE.md#L99)). |
| **PostCSS & Autoprefixer** | `^8.4.47` / `^10.4.20` | CSS Transformation Pipeline | *Inferred*: Standard build tools invoked by Tailwind to inject vendor prefixes across cross-browser stylesheets. |
| **ESLint & eslint-config-next** | `^8.57.1` / `^14.2.15` | Code Quality & Linter | *Inferred*: Enforces Next.js-specific linting rules (e.g. image optimization rules, anchor tag correctness, and unused variables). |
