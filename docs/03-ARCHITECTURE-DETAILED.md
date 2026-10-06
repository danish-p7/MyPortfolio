# 03 — Detailed Architecture & Code Organization

## 1. Directory and Module Organization

Every file in the codebase is organized by architectural responsibility rather than file type. Below is the complete directory structure, along with a single-line summary of each top-level and intermediate folder.

```
MyPortfolio/
├── app/                  # Next.js 14 App Router: layouts, pages, API route handlers, and SEO route configs
│   ├── api/              # Serverless backend HTTP endpoints (BFF layer)
│   │   └── contact/      # Contact form submission route handler
│   ├── blog/             # Technical publication route group
│   │   └── [slug]/       # Dynamic parameterized route for individual blog articles
│   ├── contact/          # Interactive contact view and direct communication channels
│   ├── projects/         # Engineering project directory route group
│   │   └── [slug]/       # Dynamic parameterized route for individual project case studies
│   ├── globals.css       # Global Tailwind directives, font variables, and prose styling
│   ├── icon.svg          # Dynamic vector favicon served automatically by Next.js
│   ├── layout.tsx        # Top-level shell wrapping the HTML skeleton, Google Inter font, Navbar, and Footer
│   ├── page.tsx          # Landing page assembling the Hero, About, Skills, Highlights, and CTAs
│   ├── robots.ts         # Search crawler directives generating dynamic /robots.txt
│   └── sitemap.ts        # Dynamic XML sitemap generator indexing static and dynamic paths
│
├── components/           # Reusable React 18 UI components
│   ├── layout/           # Global application chrome (sticky Navbar and Footer)
│   ├── sections/         # Domain-specific page sections (Hero, About, SkillsGrid, ProjectCard, ContactForm)
│   └── ui/               # Atomic design primitives (Button, Badge, SectionHeading)
│
├── content/              # File-based headless content repository (raw Markdown + YAML frontmatter)
│   ├── blog/             # Long-form Markdown articles (*.md)
│   └── projects/         # Deep-dive engineering case studies (*.md)
│
├── data/                 # In-memory typed static datasets (skills categories and proficiencies)
│
├── docs/                 # Architectural manuals, operational runbooks, and developer documentation
│
├── lib/                  # Core domain logic, file-system content parsers, and SEO metadata factories
│
└── public/               # Raw static assets served directly at the root URL (resume PDF, project SVGs)
    └── images/
        └── projects/     # Vector preview thumbnails referenced by project frontmatter
```

---

## 2. Key Modules, Functions, and Component References

### A. Content Ingestion & Markdown Parser Engine (`lib/content.ts`)
This module is the core data-access layer. It reads files from [`content/projects/`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/content/projects) and [`content/blog/`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/content/blog) using Node.js `fs`, extracts YAML frontmatter via `gray-matter`, and compiles Markdown content into HTML using `remark` and `remark-html`.

```typescript
// From lib/content.ts (lines 47-77)
export function getAllProjects(): ProjectMetadata[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjects = fileNames
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        title: data.title || "Untitled Project",
        slug: data.slug || slug,
        description: data.description || "",
        techTags: data.techTags || [],
        thumbnail: data.thumbnail || "/images/projects/placeholder.svg",
        liveUrl: data.liveUrl || "",
        repoUrl: data.repoUrl || "",
        featured: Boolean(data.featured),
        date: data.date || "2024-01-01",
        clientOrCompany: data.clientOrCompany || "",
        role: data.role || "",
      } as ProjectMetadata;
    });

  return allProjects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
```

Other critical functions in [`lib/content.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts):
- [`getFeaturedProjects()`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts#L79-L81): Filters all projects where `featured === true` for display on the homepage.
- [`getProjectBySlug(slug)`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts#L83-L122): Finds the matching `.md` or `.mdx` file, parses its markdown body into HTML using `remark().use(html, { sanitize: false }).process(content)`, and returns a combined `ProjectPost` object.
- [`estimateReadingTime(text)`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts#L125-L130): Calculates minutes required to read text assuming an average reading speed of 200 words per minute.
- [`getAllBlogPosts()`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts#L132-L158): Returns all blog metadata sorted in descending chronological order.
- [`getBlogPostBySlug(slug)`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts#L160-L195): Resolves a single article by slug, generating serialized HTML and returning `BlogPost`.

---

### B. Central Metadata Factory (`lib/seo.ts`)
Standardizes site configuration and generates Next.js 14 `Metadata` objects across all static and dynamic pages.

```typescript
// From lib/seo.ts (lines 19-35)
export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = "/images/og-preview.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.shortName}`,
    },
    description,
    authors: [{ name: siteConfig.author }],
    // ... OpenGraph and Twitter card builders
```

- [`siteConfig`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/seo.ts#L3-L17): Source of truth for developer name, site URL, social URLs (`github`, `linkedin`, `email`, `twitter`), and default fallback metadata.

---

### C. Serverless Contact Route Handler (`app/api/contact/route.ts`)
A server-side HTTP `POST` handler executing inside the Node.js / Edge runtime to process contact form submissions.

```typescript
// From app/api/contact/route.ts (lines 3-24)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address format." },
        { status: 400 }
      );
    }
    // ... logs payload and returns 200 JSON response
```

---

### D. Interactive Client Form (`components/sections/ContactForm.tsx`)
A `"use client"` React component managing local form inputs, real-time error messaging, loading states, and network submission.

- [`validate()`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/ContactForm.tsx#L33-L58): Validates that `name`, `email`, `subject`, and `message` are non-empty, checks email syntax, and enforces that the message is at least 15 characters long.
- [`handleSubmit()`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/ContactForm.tsx#L72-L105): Dispatches the payload to `/api/contact` using the browser `fetch` API, toggling `"submitting"`, `"success"`, and `"error"` states.

---

### E. Static Page Generators (`app/projects/[slug]/page.tsx`, `app/blog/[slug]/page.tsx`)
Leverages Next.js 14 Static Site Generation (SSG) to build HTML files for all Markdown files ahead of time.

```typescript
// From app/projects/[slug]/page.tsx (lines 17-22)
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}
```

- [`generateMetadata()`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/projects/[slug]/page.tsx#L24-L34): Fetches the project metadata asynchronously at build time and returns SEO tags tailored to the specific case study.
- [`ProjectDetailPage`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/projects/[slug]/page.tsx#L36-L172): Renders case study headers, meta tags, and markdown HTML via `dangerouslySetInnerHTML`. Invokes Next.js `notFound()` if the slug does not exist on disk.

---

## 3. Design Patterns in Use

| Design Pattern | Location in Codebase | Concrete Implementation Details |
|---|---|---|
| **Decoupled Headless Content Layer** | [`lib/content.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts), [`content/`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/content) | Content storage is completely separated from the presentation layer. Pages query content via programmatic helper functions rather than reading file buffers directly. |
| **Backend-for-Frontend (BFF)** | [`app/api/contact/route.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/api/contact/route.ts) | The frontend does not expose external API credentials or direct SMTP credentials to the browser. Instead, an internal API route acts as an intermediary validating requests and isolating external services. |
| **Server & Client Component Boundary Separation** | [`app/page.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/page.tsx) vs [`components/sections/ContactForm.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/ContactForm.tsx) | Pages and static sections remain React Server Components (RSC) to minimize client JavaScript bundle size. Only components requiring DOM listeners or hooks (`useState`, `useEffect`, `usePathname`) include `"use client"`. |
| **Polymorphic UI Primitives** | [`components/ui/Button.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/ui/Button.tsx) | The `Button` component dynamically renders as an internal Next.js `<Link>`, an external HTML anchor `<a>`, or a standard HTML `<button>` based on the presence of the `href` and `external` props. |
| **Builder / Metadata Factory** | [`lib/seo.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/seo.ts) | The `constructMetadata()` function accepts optional overrides while guaranteeing standard OpenGraph dimensions, Twitter card formats, and title templates (`%s | Danish Parveez`). |

---

## 4. Naming and Coding Conventions

### File & Directory Naming
- **React Components**: PascalCase (e.g., [`Navbar.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/layout/Navbar.tsx), [`ProjectCard.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/ProjectCard.tsx), [`SectionHeading.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/ui/SectionHeading.tsx)).
- **Next.js Routing Conventions**: Lowercase filenames reserved by the App Router (`page.tsx`, `layout.tsx`, `route.ts`, `robots.ts`, `sitemap.ts`, `[slug]/page.tsx`).
- **Utility and Data Modules**: camelCase (e.g., [`content.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts), [`seo.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/seo.ts), [`skills.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/data/skills.ts)).
- **Content Markdown Files**: Lowercase kebab-case matching the frontmatter `slug` attribute (e.g., `enterprise-analytics-platform.md`, `clean-architecture-in-typescript.md`).

### TypeScript Standards
- **Path Aliasing**: The `@/*` alias is mapped to the workspace root in [`tsconfig.json`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/tsconfig.json#L22), enabling absolute imports like `@/components/ui/Button` and `@/lib/content` across all files.
- **Strict Interfaces**: All frontmatter schemas, component props, and API request shapes are defined with explicit TypeScript interfaces (`ProjectMetadata`, `BlogPostMetadata`, `ButtonProps`, `FormState`).
- **Zero `any` in Core APIs**: Explicit typing is used throughout `lib/content.ts` and `lib/seo.ts`.

### Styling & Design Tokens
- **Tailwind Extension**: Custom color palettes are centralized in [`tailwind.config.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/tailwind.config.ts#L14-L39) under `corporate` (deep slate/charcoal tones, `#0f172a` to `#f8fafc`) and `accent` (brand blue tones, `#2563eb`).
- **Prose Styling**: Markdown output rendered through `remark-html` is styled using `@tailwindcss/typography` via `.prose` and custom modifiers defined in [`app/globals.css`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/globals.css#L44-L75).
