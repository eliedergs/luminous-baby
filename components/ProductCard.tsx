import Link from "next/link";

type RelatedPostCardProps = {
  title: string;
  slug: string;
  description: string;
};

type ExternalProductCardProps = {
  nome: string;
  preco: string;
  rating: number;
  link: string;
};

export type ProductCardProps = RelatedPostCardProps | ExternalProductCardProps;

function isRelatedPost(props: ProductCardProps): props is RelatedPostCardProps {
  return "slug" in props;
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.round(rating);

  return (
    <div className="flex gap-0.5" aria-label={`Avaliação: ${rating} de 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={
            index < full
              ? "text-[var(--color-tan)]"
              : "text-[var(--color-cream-dark)]"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function ProductCard(props: ProductCardProps) {
  if (isRelatedPost(props)) {
    return (
      <article className="my-4 flex flex-col rounded-2xl border border-[var(--color-cream-dark)] bg-white p-5 shadow-sm transition hover:border-[var(--color-rose)]">
        <Link href={`/blog/${props.slug}`} className="group block">
          <h3 className="font-serif text-lg text-[var(--color-ink)] group-hover:text-[var(--color-rose-deep)]">
            {props.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-taupe)]">
            {props.description}
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-[var(--color-sage-deep)]">
            Ler artigo →
          </span>
        </Link>
      </article>
    );
  }

  return (
    <article className="my-4 flex flex-col rounded-2xl border border-[var(--color-cream-dark)] bg-white p-5 shadow-sm">
      <h3 className="font-serif text-lg text-[var(--color-ink)]">{props.nome}</h3>
      <p className="mt-2 text-sm text-[var(--color-taupe)]">{props.preco}</p>
      <div className="mt-3">
        <StarRating rating={props.rating} />
      </div>
      <a
        href={props.link}
        rel="nofollow sponsored"
        target="_blank"
        className="mt-4 text-sm font-medium text-[var(--color-sage-deep)] underline-offset-2 hover:underline"
      >
        Ver produto
      </a>
    </article>
  );
}
