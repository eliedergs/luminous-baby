import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Divulgação de links de afiliados",
  description:
    "Como funcionam os links de afiliados no Luminous Baby: transparência, independência editorial e o que isso significa para você ao clicar em recomendações.",
};

export default function AfiliadosPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-serif text-3xl text-[var(--color-ink)] md:text-4xl">
        Divulgação de links de afiliados
      </h1>

      <div className="mt-8 space-y-6 text-[var(--color-taupe)] leading-relaxed">
        <p>
          O Luminous Baby pode receber comissão quando você compra um produto
          através de links de afiliados neste site — sem custo adicional para
          você. Essa é uma das formas que nos permitem manter o conteúdo
          gratuito e continuar publicando reviews e guias.
        </p>

        <h2 className="font-serif text-xl text-[var(--color-ink)]">
          Independência editorial
        </h2>
        <p>
          Nossas recomendações são baseadas em critérios editoriais: segurança,
          uso no dia a dia, custo-benefício e feedback de compradores. A
          possibilidade de comissão não determina qual produto recomendamos nem
          a ordem em comparativos.
        </p>

        <h2 className="font-serif text-xl text-[var(--color-ink)]">
          Como identificar links de afiliado
        </h2>
        <p>
          Artigos com links de afiliado incluem um aviso no topo do conteúdo.
          Os botões de compra usam o atributo técnico exigido pelas diretrizes
          de busca (<code className="text-sm">rel="nofollow sponsored"</code>).
        </p>

        <h2 className="font-serif text-xl text-[var(--color-ink)]">
          Preços e disponibilidade
        </h2>
        <p>
          Preços e estoque podem mudar a qualquer momento na loja parceira. Sempre
          confira o valor final no site do vendedor antes de concluir a compra.
        </p>

        <p>
          <Link
            href="/"
            className="font-medium text-[var(--color-sage-deep)] underline-offset-2 hover:underline"
          >
            ← Voltar ao início
          </Link>
        </p>
      </div>
    </div>
  );
}
