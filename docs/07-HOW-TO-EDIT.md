# 07 — How to Edit & Maintenance Manual

## 1. Overview

This manual provides concrete, step-by-step procedures for the most frequent modifications you or any future maintainer will perform on this codebase. Each recipe outlines:
- Exactly which files to touch,
- In what order to make the changes,
- What dependent files must be updated alongside them,
- How to verify that your changes were successful without introducing regressions.

---

## 2. Recipe 1: Updating Personal Identity, Bio, & Social Links

When transferring this portfolio to a new engineer or updating your personal contact channels, update the central configuration first.

### Files to Touch (In Order)
1. **[`lib/seo.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/seo.ts)**: Primary source of truth for site identity and meta tags.
2. **[`components/sections/Hero.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/Hero.tsx)**: Personal greeting, credential counters, and visual terminal snippet.
3. **[`components/sections/About.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/About.tsx)**: Biographical paragraphs and engineering value pillars.
4. **[`components/layout/Navbar.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/layout/Navbar.tsx)** & **[`components/layout/Footer.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/layout/Footer.tsx)**: Brand logo text and footer bio string.

### Concrete Step-by-Step
1. Open [`lib/seo.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/seo.ts#L3-L17) and update the `siteConfig` object:
   ```typescript
   export const siteConfig = {
     name: "Jane Smith | Staff Systems Architect",
     shortName: "Jane Smith",
     title: "Jane Smith — Staff Systems Architect & Cloud Consultant",
     description: "Senior engineering portfolio of Jane Smith...",
     url: "https://janesmith.dev",
     author: "Jane Smith",
     links: {
       github: "https://github.com/janesmith",
       linkedin: "https://linkedin.com/in/janesmith",
       email: "mailto:jane@janesmith.dev",
       twitter: "https://twitter.com/janesmith",
     },
   };
   ```
2. Open [`components/sections/Hero.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/Hero.tsx#L25-L27) and customize the headline, bio text, and terminal snippet attributes (`role`, `coreStack`, `currentFocus`).
3. Open [`components/sections/About.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/About.tsx#L38-L47) and replace the biographical narrative with your real professional history and company experiences.

### Verification
Run `npm run dev` and navigate to `http://localhost:3000`. Inspect the document `<title>` in your browser tab, inspect the social links in the footer, and check the Hero section text.

---

## 3. Recipe 2: Adding or Editing a Technical Skill

Skills are maintained as typed data in a central array.

### Files to Touch
1. **[`data/skills.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/data/skills.ts)**

### Concrete Step-by-Step
1. Open [`data/skills.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/data/skills.ts#L13-L67).
2. Locate the relevant category (`"Languages"`, `"Frameworks & Libraries"`, `"Databases & Storage"`, `"DevOps & Cloud"`, or `"Architecture & Tools"`).
3. Append a new typed skill object into the `skills` array:
   ```typescript
   {
     category: "Languages",
     skills: [
       { name: "Rust", proficiency: "Familiar" }, // <-- Your newly added skill
       { name: "TypeScript", proficiency: "Advanced" },
       // ... existing skills
     ],
   }
   ```
4. If you wish to create a brand-new category, you must also update the `category` union type on line 9:
   ```typescript
   export interface SkillCategory {
     category: "Languages" | "Frameworks & Libraries" | "Databases & Storage" | "DevOps & Cloud" | "Architecture & Tools" | "AI & Machine Learning";
     skills: Skill[];
   }
   ```
   And add the corresponding icon mapping case in [`components/sections/SkillsGrid.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/SkillsGrid.tsx#L8-L23).

### Verification
Run `npx tsc --noEmit` to confirm type compliance. Refresh `http://localhost:3000/#skills` to see the new skill badge rendered with its proficiency indicator.

---

## 4. Recipe 3: Publishing a New Project Case Study

Projects are added via decoupled Markdown files without touching any database or writing React code.

### Files to Touch
1. **[`content/projects/<your-project-slug>.md`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/content/projects)** (New file)
2. **[`public/images/projects/<your-thumbnail>.svg`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/public/images/projects)** (Optional new visual asset)

### Concrete Step-by-Step
1. Create a new file in [`content/projects/`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/content/projects), named after your desired URL slug (e.g. `distributed-event-broker.md`).
2. Populate the file with strict YAML frontmatter followed by your Markdown case study:
   ```markdown
   ---
   title: "High-Throughput Distributed Event Broker"
   slug: "distributed-event-broker"
   description: "An event-driven streaming broker in Go and Rust handling 500k events/sec with zero packet loss."
   techTags: ["Go", "Rust", "gRPC", "Docker", "Kafka"]
   thumbnail: "/images/projects/orchestrator.svg"
   liveUrl: "https://broker.example.com"
   repoUrl: "https://github.com/example/event-broker"
   featured: true
   date: "2024-07-01"
   clientOrCompany: "Cloud Infrastructure Labs"
   role: "Lead Systems Architect"
   ---

   ## Executive Overview
   Write your case study here using standard Markdown!

   ### Architecture Highlights
   - Implemented zero-copy memory buffers using Go memory pools.
   - Built custom gRPC streaming channels.

   ```typescript
   const eventStream = new BrokerClient({ endpoint: "broker.internal:50051" });
   ```
   ```
3. Set `featured: true` if you want it spotlighted on the home page.

### Verification
Visit `http://localhost:3000/projects`. The new project card appears automatically. Click "Read Case Study" to confirm that `http://localhost:3000/projects/distributed-event-broker` renders the typography, tech chips, and live links cleanly.

---

## 5. Recipe 4: Publishing a New Technical Blog Article

Articles follow the same decoupled pattern as case studies.

### Files to Touch
1. **[`content/blog/<article-slug>.md`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/content/blog)** (New file)

### Concrete Step-by-Step
1. Create `content/blog/zero-cost-abstractions-in-rust.md`.
2. Populate the YAML frontmatter:
   ```markdown
   ---
   title: "Zero-Cost Abstractions and Memory Safety in Systems Programming"
   slug: "zero-cost-abstractions-in-rust"
   excerpt: "An architectural analysis of compiler monomorphization and ownership semantics in high-scale backends."
   date: "2024-08-15"
   tags: ["Rust", "Systems", "Performance", "Architecture"]
   author: "Jane Smith"
   ---

   ## Introduction
   Write your technical breakdown here...
   ```
3. The reading time is calculated automatically at 200 words per minute if omitted.

### Verification
Navigate to `http://localhost:3000/blog` to verify the article appears in the chronological list, then click to view the rendered article on `/blog/zero-cost-abstractions-in-rust`. Check `/sitemap.xml` to verify the slug was dynamically added.

---

## 6. Recipe 5: Updating the Downloadable Resume (PDF)

All resume download buttons on the site link directly to [`public/resume.pdf`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/public/resume.pdf).

### Files to Touch
1. **`public/resume.pdf`**

### Concrete Step-by-Step
1. Export your latest CV or resume as a PDF.
2. Copy the file into [`public/`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/public), naming it exactly `resume.pdf` (overwriting the existing file).
3. No code changes are necessary. The Navbar, Hero section, and Footer download buttons will immediately deliver the new PDF.

---

## 7. Recipe 6: Changing Brand Theme Colors

Brand colors are defined in Tailwind configuration tokens.

### Files to Touch
1. **[`tailwind.config.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/tailwind.config.ts)**

### Concrete Step-by-Step
1. Open [`tailwind.config.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/tailwind.config.ts#L27-L39).
2. To modify the primary brand accent (currently blue `#2563eb`), change the hex values under `accent`:
   ```typescript
   accent: {
     50: "#ecfdf5",
     100: "#d1fae5",
     500: "#10b981", // Emerald accent
     600: "#059669", // Primary interactive buttons & active states
     700: "#047857",
   }
   ```
3. Save the file. Tailwind's compiler immediately recompiles all button hovers, link highlights, and badge borders across all pages.

---

## 8. Recipe 7: Modifying a Data Model (Extending a Schema)

Suppose you want to add an optional `githubStars` count to all projects.

### Files to Touch (In Order)
1. **[`lib/content.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts)**: Update `ProjectMetadata` interface and parsing logic.
2. **[`content/projects/*.md`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/content/projects)**: Add the attribute to markdown frontmatter.
3. **[`components/sections/ProjectCard.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/ProjectCard.tsx)**: Render the stars in the card UI.

### Step-by-Step Execution
1. In [`lib/content.ts`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/lib/content.ts#L7-L19), add `githubStars?: number;` to `ProjectMetadata`.
2. In `getAllProjects()` and `getProjectBySlug()`, add `githubStars: data.githubStars ? Number(data.githubStars) : undefined,`.
3. In [`components/sections/ProjectCard.tsx`](file:///c:/Users/Adqura1/OneDrive%20-%20Adqura/Desktop/MyPortfolio/components/sections/ProjectCard.tsx), render the badge if `project.githubStars` exists.
4. Run `npx tsc --noEmit` to verify type safety across the entire application.
