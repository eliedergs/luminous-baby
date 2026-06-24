import fs from "fs";
import path from "path";

const EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png"] as const;

export function resolvePostImage(slug: string, name: string): string | null {
  const dir = path.join(process.cwd(), "public", "images", "posts", slug);

  for (const ext of EXTENSIONS) {
    const filePath = path.join(dir, `${name}${ext}`);
    if (fs.existsSync(filePath)) {
      return `/images/posts/${slug}/${name}${ext}`;
    }
  }

  return null;
}

export function resolvePostCover(slug: string, cover?: string): string | null {
  if (!cover) {
    return resolvePostImage(slug, "hero");
  }

  return resolvePostImage(slug, cover);
}
