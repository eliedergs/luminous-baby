import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostMeta } from "./types";

const POSTS_DIR = path.join(process.cwd(), "resources", "posts");

function parsePostFile(filePath: string): Post | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  if (!data.slug || !data.title) {
    return null;
  }

  return {
    ...(data as Post),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => parsePostFile(path.join(POSTS_DIR, file)))
    .filter((post): post is Post => post !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .map(({ content: _content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(POSTS_DIR)) {
    return null;
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"));

  for (const file of files) {
    const post = parsePostFile(path.join(POSTS_DIR, file));
    if (post?.slug === slug) {
      return post;
    }
  }

  return null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
