import type { HeadingEntry } from "@/lib/headings";

type PostTocProps = {
  headings: HeadingEntry[];
};

export function PostToc({ headings }: PostTocProps) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Índice do artigo"
      className="mt-8 rounded-2xl border border-[var(--color-cream-dark)] bg-[var(--color-cream)] px-5 py-4"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-sage-deep)]">
        Neste guia
      </p>
      <ol className="mt-3 space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="text-sm text-[var(--color-ink)] underline-offset-2 hover:text-[var(--color-rose-deep)] hover:underline"
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
