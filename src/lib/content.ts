import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDir = path.join(process.cwd(), 'content');

export type Person = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  portfolioUrl: string;
  avatar?: string;
  order?: number;
};

export type TimelineEntry = {
  slug: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
};

export type Project = {
  slug: string;
  name: string;
  type: string;
  description: string;
  techTags: string[];
  url?: string;
  status: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  readingTime: string;
  content: string;
};

function readMdxFiles<T>(subdir: string, transform: (slug: string, data: Record<string, unknown>, content: string) => T): T[] {
  const dir = path.join(contentDir, subdir);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  return files.map(file => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const {data, content} = matter(raw);
    return transform(slug, data as Record<string, unknown>, content);
  });
}

export function getPeople(): Person[] {
  return readMdxFiles<Person>('people', (slug, data) => ({
    slug,
    name: data.name as string,
    role: data.role as string,
    bio: data.bio as string,
    portfolioUrl: data.portfolioUrl as string,
    avatar: data.avatar as string | undefined,
    order: data.order as number | undefined,
  })).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getTimelineEntries(): TimelineEntry[] {
  return readMdxFiles<TimelineEntry>('timeline', (slug, data) => ({
    slug,
    date: data.date as string,
    title: data.title as string,
    description: data.description as string,
    tags: (data.tags as string[]) ?? [],
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjects(): Project[] {
  return readMdxFiles<Project>('projects', (slug, data) => ({
    slug,
    name: data.name as string,
    type: data.type as string,
    description: data.description as string,
    techTags: (data.techTags as string[]) ?? [],
    url: data.url as string | undefined,
    status: (data.status as string) ?? 'active',
  }));
}

export function getBlogPosts(): BlogPost[] {
  return readMdxFiles<BlogPost>('blog', (slug, data, content) => ({
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    tags: (data.tags as string[]) ?? [],
    author: (data.author as string) ?? 'Gregor Krykon',
    readingTime: readingTime(content).text,
    content,
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find(p => p.slug === slug);
}
