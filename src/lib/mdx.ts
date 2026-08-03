import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const contentDir = path.join(process.cwd(), 'src/content');

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  featured: z.boolean().default(false),
  year: z.string(),
  duration: z.string(),
  role: z.string(),
  executiveSummary: z.object({
    problem: z.string(),
    solution: z.string(),
    primaryImpact: z.string(),
  }),
});

export type ProjectFrontmatter = z.infer<typeof ProjectSchema>;

export function getProjectBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(contentDir, 'projects', `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`MDX file not found: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Zod validation will throw at build time if frontmatter is invalid
  const parsedData = ProjectSchema.parse({ ...data, id: realSlug });

  return { slug: realSlug, frontmatter: parsedData, content };
}
