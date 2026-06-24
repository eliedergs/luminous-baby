import type { FAQItem } from "@/lib/types";

type FAQProps = {
  items: FAQItem[];
};

export function FAQ({ items }: FAQProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="mt-12 rounded-2xl border border-[var(--color-cream-dark)] bg-white p-6 md:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h2 className="font-serif text-2xl text-[var(--color-ink)]">
        Perguntas frequentes
      </h2>
      <dl className="mt-6 space-y-6">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="font-medium text-[var(--color-ink)]">
              {item.question}
            </dt>
            <dd className="mt-2 text-[var(--color-taupe)] leading-relaxed">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
