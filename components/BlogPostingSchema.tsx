import { absoluteUrl } from "@/lib/site";
import type { Post } from "@/lib/types";

type BlogPostingSchemaProps = {
  post: Post;
  coverUrl?: string | null;
};

export function BlogPostingSchema({ post, coverUrl }: BlogPostingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: "Luminous Baby",
    },
    publisher: {
      "@type": "Organization",
      name: "Luminous Baby",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    ...(coverUrl
      ? {
          image: absoluteUrl(coverUrl),
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
