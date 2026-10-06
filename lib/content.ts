import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface ProjectMetadata {
  title: string;
  slug: string;
  description: string;
  techTags: string[];
  thumbnail: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  date: string;
  clientOrCompany?: string;
  role?: string;
}

export interface ProjectPost {
  metadata: ProjectMetadata;
  content: string;
  contentHtml: string;
}

export interface BlogPostMetadata {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime?: string;
  author?: string;
}

export interface BlogPost {
  metadata: BlogPostMetadata;
  content: string;
  contentHtml: string;
}

const projectsDirectory = path.join(process.cwd(), "content/projects");
const blogDirectory = path.join(process.cwd(), "content/blog");

// PROJECTS HELPERS
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

export function getFeaturedProjects(): ProjectMetadata[] {
  return getAllProjects().filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<ProjectPost | null> {
  const possibleFiles = [`${slug}.md`, `${slug}.mdx`];
  let fullPath = "";

  for (const file of possibleFiles) {
    const candidate = path.join(projectsDirectory, file);
    if (fs.existsSync(candidate)) {
      fullPath = candidate;
      break;
    }
  }

  if (!fullPath) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html, { sanitize: false }).process(content);
  const contentHtml = processedContent.toString();

  const metadata: ProjectMetadata = {
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
  };

  return {
    metadata,
    content,
    contentHtml,
  };
}

// BLOG HELPERS
function estimateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllBlogPosts(): BlogPostMetadata[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const posts = fileNames
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        title: data.title || "Untitled Post",
        slug: data.slug || slug,
        excerpt: data.excerpt || "",
        date: data.date || "2024-01-01",
        tags: data.tags || [],
        readingTime: data.readingTime || estimateReadingTime(content),
        author: data.author || "Professional Developer",
      } as BlogPostMetadata;
    });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const possibleFiles = [`${slug}.md`, `${slug}.mdx`];
  let fullPath = "";

  for (const file of possibleFiles) {
    const candidate = path.join(blogDirectory, file);
    if (fs.existsSync(candidate)) {
      fullPath = candidate;
      break;
    }
  }

  if (!fullPath) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html, { sanitize: false }).process(content);
  const contentHtml = processedContent.toString();

  const metadata: BlogPostMetadata = {
    title: data.title || "Untitled Post",
    slug: data.slug || slug,
    excerpt: data.excerpt || "",
    date: data.date || "2024-01-01",
    tags: data.tags || [],
    readingTime: data.readingTime || estimateReadingTime(content),
    author: data.author || "Professional Developer",
  };

  return {
    metadata,
    content,
    contentHtml,
  };
}
