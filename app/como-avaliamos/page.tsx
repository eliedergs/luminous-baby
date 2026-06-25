import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Como avaliamos produtos",
  description:
    "Metodologia editorial do Luminous Baby: fontes, critérios, limitações e como interpretamos reviews e comparativos de produtos para bebê.",
};

export default function ComoAvaliamosPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Como avaliamos" },
        ]}
      />

      <h1 className="mt-4 font-serif text-3xl text-[var(--color-ink)] md:text-4xl">
        Como avaliamos produtos
      </h1>

      <div className="mt-8 space-y-6 text-[var(--color-taupe)] leading-relaxed">
        <p>
          O Luminous Baby publica guias, reviews e comparativos para ajudar
          famílias a escolher produtos para bebê com mais critério — sem
          prometer a &ldquo;melhor compra&rdquo; universal nem empurrar link de
          afiliado.
        </p>

        <h2 className="font-serif text-xl text-[var(--color-ink)]">
          De onde vêm as informações
        </h2>
        <p>
          Nossa análise parte de dados públicos: ficha técnica e descrição do
          fabricante ou vendedor, especificações (peso, materiais, faixa etária,
          certificações quando informadas), preço no momento da redação e
          feedback recorrente de compradores nas lojas parceiras.
        </p>
        <p>
          <strong className="font-medium text-[var(--color-ink)]">
            Nem todo produto foi testado fisicamente por nós.
          </strong>{" "}
          Quando a avaliação é baseada em pesquisa editorial — e não em uso
          prolongado em casa — o texto prioriza specs verificáveis, padrões de
          segurança e relatos consistentes de quem comprou, em vez de impressões
          subjetivas que não podemos comprovar.
        </p>

        <h2 className="font-serif text-xl text-[var(--color-ink)]">
          Critérios que priorizamos
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-medium text-[var(--color-ink)]">
              Segurança
            </strong>{" "}
            — certificações citadas pelo fabricante (como INMETRO, quando
            aplicável), idade indicada, materiais e sistemas de retenção ou
            fixação.
          </li>
          <li>
            <strong className="font-medium text-[var(--color-ink)]">
              Uso no dia a dia
            </strong>{" "}
            — peso, dobra, limpeza, adaptação à rotina urbana ou viagem, conforme
            o tipo de produto.
          </li>
          <li>
            <strong className="font-medium text-[var(--color-ink)]">
              Custo-benefício
            </strong>{" "}
            — o que o preço entrega em relação a alternativas parecidas; o mais
            barato nem sempre é o mais adequado.
          </li>
          <li>
            <strong className="font-medium text-[var(--color-ink)]">
              Opinião de compradores
            </strong>{" "}
            — notas e comentários recorrentes, sempre com ressalva de que podem
            ser enviesados ou desatualizados.
          </li>
        </ul>

        <h2 className="font-serif text-xl text-[var(--color-ink)]">
          Tipos de artigo
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-medium text-[var(--color-ink)]">
              Guia (pilar)
            </strong>{" "}
            — critérios gerais para escolher bem; sem botão de compra direto.
          </li>
          <li>
            <strong className="font-medium text-[var(--color-ink)]">
              Review
            </strong>{" "}
            — um produto, com prós e contras explícitos.
          </li>
          <li>
            <strong className="font-medium text-[var(--color-ink)]">
              Comparativo
            </strong>{" "}
            — dois ou mais produtos no mesmo conjunto de critérios.
          </li>
        </ul>

        <h2 className="font-serif text-xl text-[var(--color-ink)]">
          O que não fazemos
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Não vendemos posição em ranking por pagamento de marca.</li>
          <li>
            Não publicamos review só porque existe link de afiliado disponível.
          </li>
          <li>
            Não garantimos que um produto será ideal para toda família — peso,
            rotina e orçamento variam.
          </li>
        </ul>

        <h2 className="font-serif text-xl text-[var(--color-ink)]">
          Preços, datas e atualizações
        </h2>
        <p>
          Preços citados refletem o momento da publicação ou da última
          atualização do artigo (veja a data no topo de cada post). Estoque e
          valor final podem mudar a qualquer momento na loja — confira antes de
          concluir a compra.
        </p>
        <p>
          Revisamos artigos quando specs, normas ou preços mudam de forma
          relevante, mas não monitoramos catálogos em tempo real.
        </p>

        <h2 className="font-serif text-xl text-[var(--color-ink)]">
          Links de afiliado
        </h2>
        <p>
          Alguns artigos incluem links de afiliado. A possibilidade de comissão
          não define qual produto recomendamos nem a ordem em comparativos. Para
          detalhes sobre disclosure e independência editorial, veja{" "}
          <Link
            href="/afiliados"
            className="font-medium text-[var(--color-sage-deep)] underline-offset-2 hover:underline"
          >
            divulgação de links de afiliados
          </Link>
          .
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
