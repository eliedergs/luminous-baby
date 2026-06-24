import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
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
};

function createMdxComponents(slug: string) {
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

export function MdxContent({ source, slug }: MdxContentProps) {
  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:text-[var(--color-ink)] prose-p:text-[var(--color-taupe)] prose-strong:text-[var(--color-ink)] prose-h3:text-xl prose-h3:font-medium">
      <MDXRemote
        source={source}
        components={createMdxComponents(slug)}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
