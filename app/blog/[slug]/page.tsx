import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/MdxContent";
import { resolvePostCover } from "@/lib/images";
import { getAllSlugs, getPostBySlug } from "@/lib/mdx";
import { absoluteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const cover = resolvePostCover(post.slug, post.cover);
  const coverPath = cover ?? undefined;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      url: absoluteUrl(`/blog/${post.slug}`),
      ...(coverPath ? { images: [{ url: coverPath }] } : {}),
    },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header>
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-[var(--color-sage-deep)]">
          <span>{post.category}</span>
          <span aria-hidden>·</span>
          <span>{post.cluster}</span>
          <span aria-hidden>·</span>
          <span>{post.type}</span>
        </div>

        <h1 className="mt-4 font-serif text-3xl leading-tight text-[var(--color-ink)] md:text-4xl">
          {post.title}
        </h1>

        <p className="mt-4 text-lg text-[var(--color-taupe)]">
          {post.description}
        </p>

        <p className="mt-4 text-sm text-[var(--color-taupe)]">
          Publicado em {formatDate(post.publishedAt)}
          {post.updatedAt !== post.publishedAt && (
            <> · Atualizado em {formatDate(post.updatedAt)}</>
          )}
        </p>

        {post.affiliate && (
          <p className="mt-4 rounded-xl bg-[var(--color-cream-dark)] px-4 py-3 text-xs text-[var(--color-taupe)]">
            Este artigo contém links de afiliados. Podemos receber comissão sem
            custo extra para você.
          </p>
        )}
      </header>

      <div className="mt-10">
        <MdxContent source={post.content} slug={post.slug} />
      </div>
    </article>
  );
}
