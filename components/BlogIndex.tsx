"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PostListCard } from "@/components/PostListCard";
import {
  getTypeLabel,
  getUniqueCategories,
  getUniqueTypes,
} from "@/lib/taxonomy";
import type { PostMeta } from "@/lib/types";

type BlogIndexProps = {
  posts: PostMeta[];
};

function filterLink(
  base: URLSearchParams,
  key: "type" | "category",
  value: string | null,
) {
  const params = new URLSearchParams(base);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "rounded-full bg-[var(--color-sage-deep)] px-3 py-1 text-xs font-medium text-white"
          : "rounded-full border border-[var(--color-cream-dark)] bg-white px-3 py-1 text-xs font-medium text-[var(--color-taupe)] transition hover:border-[var(--color-sage)]"
      }
    >
      {children}
    </Link>
  );
}

export function BlogIndex({ posts }: BlogIndexProps) {
  const searchParams = useSearchParams();
  const activeType = searchParams.get("type");

  const types = getUniqueTypes(posts.map((p) => p.type));
  const categories = getUniqueCategories(posts.map((p) => p.category));

  const filtered = activeType
    ? posts.filter((post) => post.type === activeType)
    : posts;

  const baseParams = new URLSearchParams(searchParams.toString());

  return (
    <>
      <div className="mt-8 space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-sage-deep)]">
            Tipo
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <FilterChip
              href={filterLink(baseParams, "type", null)}
              active={!activeType}
            >
              Todos
            </FilterChip>
            {types.map((type) => (
              <FilterChip
                key={type}
                href={filterLink(baseParams, "type", type)}
                active={activeType === type}
              >
                {getTypeLabel(type)}
              </FilterChip>
            ))}
          </div>
        </div>

        {categories.length > 1 && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-sage-deep)]">
              Categoria
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <FilterChip
                href={activeType ? `/blog?type=${activeType}` : "/blog"}
                active={false}
              >
                Todas
              </FilterChip>
              {categories.map(({ slug, name }) => (
                <FilterChip key={slug} href={`/categoria/${slug}`} active={false}>
                  {name}
                </FilterChip>
              ))}
            </div>
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-[var(--color-taupe)]">
          Nenhum artigo com esses filtros.{" "}
          <Link
            href="/blog"
            className="text-[var(--color-sage-deep)] underline-offset-2 hover:underline"
          >
            Limpar filtros
          </Link>
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {filtered.map((post) => (
            <PostListCard key={post.slug} post={post} />
          ))}
        </ul>
      )}
    </>
  );
}
