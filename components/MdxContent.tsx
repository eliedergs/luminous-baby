import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { HeadingEntry } from "@/lib/headings";
import { headingToSlug } from "@/lib/headings";
import { AffiliateButton } from "./AffiliateButton";
import { FAQ } from "./FAQ";
import { PostImage } from "./PostImage";
import { ProductCard } from "./ProductCard";

function MdxLink({ href, children, ...props }: ComponentPropsWithoutRef<"a">) {
  if (!href) {
    return <a {...props}>{children}</a>;
  }

  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        rel="nofollow sponsored"
        target="_blank"
        className="font-medium text-[var(--color-sage-deep)] underline-offset-2 hover:underline"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="font-medium text-[var(--color-sage-deep)] underline-offset-2 hover:underline"
    >
      {children}
    </Link>
  );
}

type MdxContentProps = {
  source: string;
  slug: string;
  headings?: HeadingEntry[];
};

function flattenText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(flattenText).join("");
  }
  if (children && typeof children === "object" && "props" in children) {
    const props = children.props as { children?: ReactNode };
    return flattenText(props.children);
  }
  return "";
}

function createMdxComponents(slug: string, headings: HeadingEntry[] = []) {
  let h2Index = 0;

  return {
    AffiliateButton,
    ProductCard,
    FAQ,
    PostImage: (props: Omit<React.ComponentProps<typeof PostImage>, "slug">) => (
      <PostImage slug={slug} {...props} />
    ),
    a: MdxLink,
    h1: ({ children }: { children?: ReactNode }) => (
      <span className="sr-only">{children}</span>
    ),
    h2: ({ children }: { children?: ReactNode }) => {
      const entry = headings[h2Index];
      h2Index += 1;
      const id = entry?.id ?? headingToSlug(flattenText(children));

      return (
        <h2
          id={id}
          className="mt-10 scroll-mt-24 font-serif text-2xl text-[var(--color-ink)]"
        >
          {children}
        </h2>
      );
    },
    hr: () => (
      <hr className="my-8 border-0 border-t border-[var(--color-cream-dark)]" />
    ),
    table: ({ children }: { children?: ReactNode }) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          {children}
        </table>
      </div>
    ),
    th: ({ children }: { children?: ReactNode }) => (
      <th className="border border-[var(--color-cream-dark)] bg-[var(--color-cream)] px-3 py-2 text-left font-medium text-[var(--color-ink)]">
        {children}
      </th>
    ),
    td: ({ children }: { children?: ReactNode }) => (
      <td className="border border-[var(--color-cream-dark)] px-3 py-2 text-[var(--color-taupe)]">
        {children}
      </td>
    ),
  };
}

export function MdxContent({ source, slug, headings }: MdxContentProps) {
  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:text-[var(--color-ink)] prose-p:text-[var(--color-taupe)] prose-strong:text-[var(--color-ink)] prose-h3:text-xl prose-h3:font-medium prose-h2:mt-0">
      <MDXRemote
        source={source}
        components={createMdxComponents(slug, headings)}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
