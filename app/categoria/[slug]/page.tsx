import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PostListCard } from "@/components/PostListCard";
import {
  getAllCategories,
  getCategoryBySlug,
  getPostsByCategorySlug,
} from "@/lib/categories";
import { absoluteUrl } from "@/lib/site";
import { getTypeLabel } from "@/lib/taxonomy";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCategories().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  const description = `Guias, reviews e comparativos sobre ${category.name.toLowerCase()} — Luminous Baby.`;

  return {
    title: category.name,
    description,
    alternates: {
      canonical: absoluteUrl(`/categoria/${slug}`),
    },
    openGraph: {
      title: category.name,
      description,
      url: absoluteUrl(`/categoria/${slug}`),
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategorySlug(slug);
  const pilar = posts.find((post) => post.type === "pilar");
  const others = posts.filter((post) => post.slug !== pilar?.slug);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: category.name },
        ]}
      />

      <h1 className="mt-4 font-serif text-3xl text-[var(--color-ink)] md:text-4xl">
        {category.name}
      </h1>
      <p className="mt-4 text-[var(--color-taupe)]">
        Artigos para ajudar você a escolher com critério em{" "}
        {category.name.toLowerCase()}.
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 text-[var(--color-taupe)]">
          Nenhum artigo nesta categoria ainda.
        </p>
      ) : (
        <div className="mt-10 space-y-10">
          {pilar && (
            <section>
              <h2 className="font-serif text-xl text-[var(--color-ink)]">
                {getTypeLabel("pilar")}
              </h2>
              <ul className="mt-4 space-y-4">
                <PostListCard post={pilar} />
              </ul>
            </section>
          )}

          {others.length > 0 && (
            <section>
              <h2 className="font-serif text-xl text-[var(--color-ink)]">
                {pilar ? "Mais artigos" : "Artigos"}
              </h2>
              <ul className="mt-4 space-y-4">
                {others.map((post) => (
                  <PostListCard key={post.slug} post={post} />
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
