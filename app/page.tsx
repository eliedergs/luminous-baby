import Image from "next/image";
import Link from "next/link";
import { PostListCard } from "@/components/PostListCard";
import { getAllPosts } from "@/lib/mdx";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <section className="text-center">
        <Image
          src="/logo.png"
          alt="Luminous Baby — mãe segurando bebê"
          width={200}
          height={200}
          className="mx-auto"
          priority
        />
        <h1 className="mt-6 font-serif text-4xl md:text-5xl">
          <span className="text-[var(--color-rose)]">Luminous</span>{" "}
          <span className="text-[var(--color-sage)]">Baby</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[var(--color-taupe)]">
          Carinho para bebê e maternidade — guias práticos, reviews honestos e
          dicas para cada fase da jornada.
        </p>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl text-[var(--color-ink)]">
            Artigos recentes
          </h2>
          {posts.length > 0 && (
            <Link
              href="/blog"
              className="text-sm font-medium text-[var(--color-sage-deep)] underline-offset-2 hover:underline"
            >
              Ver todos
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <p className="mt-4 text-[var(--color-taupe)]">
            Nenhum artigo publicado ainda. Adicione arquivos{" "}
            <code className="rounded bg-[var(--color-cream-dark)] px-1.5 py-0.5 text-sm">
              .mdx
            </code>{" "}
            em{" "}
            <code className="rounded bg-[var(--color-cream-dark)] px-1.5 py-0.5 text-sm">
              resources/posts/
            </code>
            .
          </p>
        ) : (
          <ul className="mt-6 space-y-4">
            {posts.slice(0, 3).map((post) => (
              <PostListCard key={post.slug} post={post} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
