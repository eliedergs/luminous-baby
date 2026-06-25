import Link from "next/link";
import type { PostMeta } from "@/lib/types";
import { categoryToSlug, getTypeLabel } from "@/lib/taxonomy";

type PostListCardProps = {
  post: PostMeta;
};

export function PostListCard({ post }: PostListCardProps) {
  return (
    <li>
      <article className="rounded-2xl border border-[var(--color-cream-dark)] bg-white p-5 transition hover:border-[var(--color-rose)]">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-[var(--color-sage-deep)]">
          <Link
            href={`/categoria/${categoryToSlug(post.category)}`}
            className="hover:text-[var(--color-rose-deep)] hover:underline"
          >
            {post.category}
          </Link>
          <span aria-hidden>·</span>
          <span>{getTypeLabel(post.type)}</span>
        </div>
        <Link href={`/blog/${post.slug}`} className="group mt-2 block">
          <h3 className="font-serif text-xl text-[var(--color-ink)] group-hover:text-[var(--color-rose-deep)]">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-[var(--color-taupe)]">
            {post.description}
          </p>
        </Link>
      </article>
    </li>
  );
}
