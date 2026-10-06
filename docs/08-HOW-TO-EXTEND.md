# 08 — How to Extend & Architectural Guidelines

## 1. Architectural Extension Philosophy

This codebase is structured around low-coupling and high-cohesion principles. Adding new capabilities—whether a new route, a third-party dependency, or an external backend service—should follow established design boundaries:
- Keep React Server Components (RSC) as the default; only introduce `"use client"` when DOM event listeners or React hooks (`useState`, `useEffect`) are strictly necessary.
- Preserve the decoupled content layer: data retrieval belongs in [`lib/content.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts) or dedicated services, not inside UI component files.
- Adhere to the design token hierarchy: leverage `corporate` and `accent` color tokens defined in [`tailwind.config.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/tailwind.config.ts) rather than introducing arbitrary hex values.

---

## 2. Recipe: Adding a New Top-Level Page (e.g., `/experience`)

To add an "Experience & Career History" timeline page that adheres to existing routing, styling, and navigation patterns:

### Step 1: Create the Page Route (`app/experience/page.tsx`)
Create a new Server Component utilizing [`SectionHeading`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/ui/SectionHeading.tsx) and [`constructMetadata`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/seo.ts):

```tsx
// app/experience/page.tsx
import React from "react";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = constructMetadata({
  title: "Career & Engineering Experience",
  description: "Detailed timeline of senior leadership and staff engineering roles.",
});

export default function ExperiencePage() {
  return (
    <div className="py-16 sm:py-24 bg-corporate-50/40 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Career Timeline"
          title="Engineering Experience & Leadership"
          description="A chronological record of staff software engineering positions, technical milestones, and team impact."
        />

        {/* Timeline Items */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-corporate-200 p-8 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-corporate-900">Lead Systems Architect</h3>
              <span className="text-xs font-mono text-corporate-500">2022 — Present</span>
            </div>
            <p className="text-sm font-semibold text-accent-600 mb-4">Enterprise Tech Corp</p>
            <p className="text-sm text-corporate-600 leading-relaxed">
              Architected distributed streaming ingestion engines handling 10M+ daily events...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Step 2: Register in Navigation (`components/layout/Navbar.tsx`)
Open [`components/layout/Navbar.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/layout/Navbar.tsx#L27-L33) and append the route to `navLinks`:
```typescript
const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" }, // <-- Add here
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
```

### Step 3: Register in Sitemap (`app/sitemap.ts`)
Open [`app/sitemap.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/sitemap.ts#L9) and add `"/experience"` to the static routes array:
```typescript
const routes = ["", "/projects", "/experience", "/blog", "/contact"].map((route) => ({
  url: `${baseUrl}${route}`,
  lastModified: new Date().toISOString().split("T")[0],
  changeFrequency: "weekly" as const,
  priority: 0.8,
}));
```

---

## 3. How to Safely Add New Dependencies

When adding external npm packages, follow these guidelines:

1. **Verify Bundle Impact**: Ensure the library supports Tree Shaking and does not bundle heavy Node-specific C++ binaries if used on the client.
2. **Execute Installation**:
   ```bash
   npm install <package-name>
   ```
3. **Check Type Declarations**: If installing an untyped library, install its community types:
   ```bash
   npm install -D @types/<package-name>
   ```
4. **Audit and Validate**: Always run `npm run build` immediately following installation to ensure there are no module resolution conflicts with Next.js or React 18.

---

## 4. Built-In Extension Points

The architecture includes several pre-configured extension points:

### A. Production Transactional Email Dispatcher
In [`app/api/contact/route.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/api/contact/route.ts#L34-L62), a documented hook is reserved for transactional email providers. To wire up **Resend**:
```bash
npm install resend
```
Then uncomment the Resend block in [`app/api/contact/route.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/api/contact/route.ts):
```typescript
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "Portfolio Contact <onboarding@resend.dev>",
  to: "your-email@domain.com",
  reply_to: email,
  subject: `[Portfolio Inquiry] ${subject} from ${name}`,
  text: `From: ${name} (${email})\n\nMessage:\n${message}`,
});
```

### B. Remark Code Syntax Highlighting
Currently, [`lib/content.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts#L100) serializes Markdown to HTML via `remark().use(html)`. You can enrich code blocks with syntax highlighting by inserting `rehype` and `rehype-highlight` or `prismjs` into the processing pipeline:
```typescript
// Example extension in lib/content.ts
const processedContent = await remark()
  .use(html, { sanitize: false })
  .process(content);
```

### C. Adding a Custom UI Primitive
When creating a new atomic component (e.g. `components/ui/Modal.tsx` or `components/ui/Tooltip.tsx`), place it in [`components/ui/`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/ui) and export its TypeScript props interface (`ModalProps`) to maintain uniform composition throughout the UI tree.

---

## 5. Antipatterns to Avoid

Based on the patterns established in this codebase, avoid the following practices:

| Antipattern | Why It Is Problematic | Proper Architectural Approach |
|---|---|---|
| **Adding `"use client"` to page files** | Converts the entire route tree into client-rendered JavaScript, eliminating SEO advantages and increasing bundle weight. | Keep page files (`page.tsx`) as Server Components. Extract interactive controls into small client components (e.g. [`ContactForm.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/ContactForm.tsx)). |
| **Direct File-System Reads Inside UI Components** | Reading `fs.readFileSync` inside React components couples UI rendering to the host file system. | Centralize all data access inside [`lib/content.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts) and pass typed data as props to components. |
| **Hardcoding Secret Keys in Client Components** | Next.js bundles client component code into public JavaScript files, exposing API keys to any user. | Only access private environment variables (`process.env.SECRET_KEY`) inside serverless Route Handlers ([`app/api/`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/app/api)) or Server Components. |
| **Ad-Hoc Hex Colors in Tailwind Classnames** | Using arbitrary values like `bg-[#2461aa]` fragments the visual identity. | Use the configured semantic tokens (`bg-corporate-900`, `text-accent-600`) defined in [`tailwind.config.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/tailwind.config.ts). |
| **Mutating Content Markdown Without Slug Alignment** | Changing the frontmatter `slug` without renaming the `.md` file can cause 404s in static generators. | Always keep the Markdown file name matching the `slug` property (e.g., `content/projects/my-slug.md` with `slug: "my-slug"`). |
