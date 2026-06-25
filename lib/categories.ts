import { getAllPosts } from "@/lib/mdx";
import { categoryToSlug, getUniqueCategories } from "@/lib/taxonomy";
import type { PostMeta } from "@/lib/types";

const TYPE_ORDER: Record<string, number> = {
  pilar: 0,
  review: 1,
  comparativo: 2,
};

export function getAllCategories() {
  return getUniqueCategories(getAllPosts().map((post) => post.category));
}

export function getCategoryBySlug(slug: string) {
  return getAllCategories().find((category) => category.slug === slug) ?? null;
}

export function getPostsByCategorySlug(slug: string): PostMeta[] {
  return getAllPosts()
    .filter((post) => categoryToSlug(post.category) === slug)
    .sort((a, b) => {
      const typeDiff =
        (TYPE_ORDER[a.type] ?? 9) - (TYPE_ORDER[b.type] ?? 9);
      if (typeDiff !== 0) {
        return typeDiff;
      }
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    });
}
