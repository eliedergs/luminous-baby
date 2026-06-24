import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-serif text-3xl text-[var(--color-ink)]">
        Página não encontrada
      </h1>
      <p className="mt-4 text-[var(--color-taupe)]">
        O artigo que você procura não existe ou foi removido.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-[var(--color-sage-deep)] underline-offset-2 hover:underline"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
