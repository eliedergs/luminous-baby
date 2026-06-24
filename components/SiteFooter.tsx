import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--color-cream-dark)] bg-white">
      <div className="mx-auto max-w-3xl px-6 py-8 text-center text-sm text-[var(--color-taupe)]">
        <p className="font-serif text-base text-[var(--color-ink)]">
          <span className="text-[var(--color-rose)]">Luminous</span>{" "}
          <span className="text-[var(--color-sage)]">Baby</span>
        </p>
        <p className="mt-1">Carinho para bebê e maternidade</p>
        <p className="mt-4 text-xs leading-relaxed">
          Alguns links neste site são de afiliados. Podemos receber comissão
          sem custo extra para você.{" "}
          <Link
            href="/afiliados"
            className="text-[var(--color-sage-deep)] underline-offset-2 hover:underline"
          >
            Saiba mais
          </Link>
        </p>
      </div>
    </footer>
  );
}
