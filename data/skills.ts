export interface Skill {
  name: string;
  icon?: string;
  description?: string;
  proficiency?: "Advanced" | "Proficient" | "Familiar";
}

export interface SkillCategory {
  category: "Languages" | "Frameworks & Libraries" | "Databases & Storage" | "DevOps & Cloud" | "Architecture & Tools" | "Pega Ecosystem" | "AI & Testing";
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "C/C++(20/23)", proficiency: "Advanced" },
      { name: "TypeScript", proficiency: "Proficient" },
      // { name: "JavaScript (ES6+)", proficiency: "Advanced" },
      { name: "Python", proficiency: "Proficient" },
      { name: "SQL", proficiency: "Advanced" },
      // { name: "HTML5 & CSS3", proficiency: "Advanced" },
    ],
  },
  {
    category: "Pega Ecosystem",
    skills: [
      { name: "Pega Platform", proficiency: "Advanced" },
      { name: "Pega Customer Decison Hub (CDH)", proficiency: "Advanced" },
      { name: "Decisioning", proficiency: "Proficient" },
      { name: "Channel Management(Inbound/Outbound)", proficiency: "Advanced" },
      { name: "Real Time/Batcch Communications", proficiency: "Proficient" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      // { name: "React", proficiency: "Advanced" },
      // { name: "Next.js (App Router)", proficiency: "Advanced" },
      { name: "Node.js", proficiency: "Advanced" },
      // { name: "Express.js", proficiency: "Advanced" },
      // { name: "Tailwind CSS", proficiency: "Advanced" },
      // { name: "GraphQL", proficiency: "Proficient" },
    ],
  },
  {
    category: "Databases & Storage",
    skills: [
      { name: "PostgreSQL", proficiency: "Advanced" },
      { name: "Redis", proficiency: "Proficient" },
      { name: "MongoDB", proficiency: "Familiar" },
      { name: "DBeaver", proficiency: "Advanced" },
      { name: "SupaBase", proficiency: "Advanced" },
    ],
  },
  {
    category: "DevOps & Cloud",
    skills: [
      { name: "Docker", proficiency: "Proficient" },
      // { name: "Kubernetes", proficiency: "Familiar" },
      // { name: "AWS (S3, Lambda, ECS)", proficiency: "Familiar" },
      { name: "GitHub Actions / CI-CD", proficiency: "Proficient" },
      { name: "Vercel", proficiency: "Proficient" },
      { name: "Shell / Bash", proficiency: "Proficient" },
    ],
  },
  {
    category: "AI & Testing",
    skills: [
      { name: "Gen AI", proficiency: "Advanced" },
      { name: "Claude API", proficiency: "Advanced" },
      { name: "Postman(API Testing)", proficiency: "Advanced" },
      { name: "Retrieval-Augmented Generation (RAG)", proficiency: "Proficient" },
      { name: "End-to-End (E2E) Testing", proficiency: "Advanced" },
    ],
  },
  {
    category: "Architecture & Tools",
    skills: [
      { name: "Data Structures and Algorithms", proficiency: "Advanced" },
      { name: "RESTful API Design", proficiency: "Advanced" },
      { name: "n8n(Workflow Automation)", proficiency: "Advanced" },
      // { name: "Microservices", proficiency: "Proficient" },
      { name: "Git & GitHub", proficiency: "Proficient" },
      { name: "Object-Oriented Design", proficiency: "Advanced" },
      { name: "Operating Systems", proficiency: "Advanced" },
      { name: "Computer Networks", proficiency: "Advanced" },
      { name: "System Design", proficiency: "Proficient" },
    ],
  },
];
