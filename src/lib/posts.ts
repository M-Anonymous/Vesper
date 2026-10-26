import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getCategory } from "@/lib/categories";

export type Post = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  tags: string[];
  content: string;
  minutes: number;
  draft: boolean;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");
let cached: Post[] | null = null;

function readingMinutes(text: string) {
  const cjk = text.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const words = text
    .replace(/[\u4e00-\u9fff]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(cjk / 400 + words / 220));
}

function normalizeDate(value: unknown, file: string) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }
  throw new Error(`${file}: date must be YYYY-MM-DD`);
}

function loadPosts() {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error(
        `${file}: use a lowercase latin slug, like lamp-still-on.md`,
      );
    }

    const raw = fs.readFileSync(path.join(postsDirectory, file), "utf8");
    const { data, content } = matter(raw);
    const title = typeof data.title === "string" ? data.title.trim() : "";
    const summary = typeof data.summary === "string" ? data.summary.trim() : "";
    const category = typeof data.category === "string" ? data.category : "";

    if (!title) throw new Error(`${file}: missing title`);
    if (!summary) throw new Error(`${file}: missing summary`);
    if (!content.trim()) throw new Error(`${file}: empty body`);
    if (!getCategory(category)) {
      throw new Error(`${file}: unknown category "${category}"`);
    }

    const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];

    return {
      slug,
      title,
      summary,
      category,
      date: normalizeDate(data.date, file),
      tags,
      content: content.trim(),
      minutes: readingMinutes(content),
      draft: data.draft === true,
    } satisfies Post;
  });

  return posts.sort((a, b) =>
    a.date === b.date ? a.slug.localeCompare(b.slug) : b.date.localeCompare(a.date),
  );
}

export function getAllPosts() {
  if (process.env.NODE_ENV === "production" && cached) return cached;
  cached = loadPosts();
  return cached;
}

export function getPublishedPosts() {
  return getAllPosts().filter((post) => !post.draft);
}

export function getPost(slug: string) {
  return getPublishedPosts().find((post) => post.slug === slug) ?? null;
}

export function getPostsByCategory(slug: string) {
  return getPublishedPosts().filter((post) => post.category === slug);
}

export function groupByYear(posts: Post[]) {
  const groups = new Map<string, Post[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    const list = groups.get(year) ?? [];
    list.push(post);
    groups.set(year, list);
  }
  return [...groups.entries()];
}
