import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogIndex } from "@/components/BlogIndex";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guias, reviews e comparativos sobre produtos para bebê e maternidade — filtros por tipo e categoria.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Blog" },
        ]}
      />

      <h1 className="mt-4 font-serif text-3xl text-[var(--color-ink)] md:text-4xl">
        Blog
      </h1>
      <p className="mt-4 text-[var(--color-taupe)]">
        Guias práticos, reviews honestos e comparativos para ajudar na hora de
        escolher.
      </p>

      <Suspense
        fallback={
          <ul className="mt-8 space-y-4">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="h-28 animate-pulse rounded-2xl bg-[var(--color-cream-dark)]"
              />
            ))}
          </ul>
        }
      >
        <BlogIndex posts={posts} />
      </Suspense>
    </div>
  );
}
