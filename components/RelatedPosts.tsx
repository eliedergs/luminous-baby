import { PostListCard } from "@/components/PostListCard";
import type { PostMeta } from "@/lib/types";

type RelatedPostsProps = {
  posts: PostMeta[];
  cluster: string;
};

export function RelatedPosts({ posts, cluster }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-[var(--color-cream-dark)] pt-10">
      <h2 className="font-serif text-2xl text-[var(--color-ink)]">
        Artigos relacionados
      </h2>
      <p className="mt-2 text-sm text-[var(--color-taupe)]">
        Mais conteúdo sobre {cluster.toLowerCase()}.
      </p>
      <ul className="mt-6 space-y-4">
        {posts.map((post) => (
          <PostListCard key={post.slug} post={post} />
        ))}
      </ul>
    </section>
  );
}
