import Link from "next/link";
import type { PostMeta } from "@/lib/types";
import { getTypeLabel } from "@/lib/taxonomy";

type PostListCardProps = {
  post: PostMeta;
};

export function PostListCard({ post }: PostListCardProps) {
  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-2xl border border-[var(--color-cream-dark)] bg-white p-5 transition hover:border-[var(--color-rose)]"
      >
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-[var(--color-sage-deep)]">
          <span>{post.category}</span>
          <span aria-hidden>·</span>
          <span>{getTypeLabel(post.type)}</span>
        </div>
        <h3 className="mt-2 font-serif text-xl text-[var(--color-ink)] group-hover:text-[var(--color-rose-deep)]">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--color-taupe)]">{post.description}</p>
      </Link>
    </li>
  );
}
