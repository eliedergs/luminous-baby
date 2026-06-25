import { getAllPosts } from "@/lib/mdx";
import type { PostMeta } from "@/lib/types";

const TYPE_ORDER: Record<string, number> = {
  pilar: 0,
  review: 1,
  comparativo: 2,
};

export function getRelatedPosts(
  slug: string,
  cluster: string,
  limit = 4,
): PostMeta[] {
  return getAllPosts()
    .filter((post) => post.cluster === cluster && post.slug !== slug)
    .sort((a, b) => {
      const typeDiff =
        (TYPE_ORDER[a.type] ?? 9) - (TYPE_ORDER[b.type] ?? 9);
      if (typeDiff !== 0) {
        return typeDiff;
      }
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    })
    .slice(0, limit);
}
