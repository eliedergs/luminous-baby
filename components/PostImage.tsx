import Image from "next/image";
import { resolvePostImage } from "@/lib/images";

export type PostImageProps = {
  alt: string;
  caption?: string;
  slug: string;
  name?: string;
  url?: string;
  src?: string;
};

function PostImageFigure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="w-full rounded-2xl object-cover"
        sizes="(max-width: 768px) 100vw, 720px"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-[var(--color-taupe)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function PostImagePlaceholder({
  slug,
  name,
  alt,
  caption,
}: {
  slug: string;
  name: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--color-cream-dark)] bg-[var(--color-cream)] px-6 py-10 text-center">
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-sage-deep)]">
          Imagem pendente
        </span>
        <span className="mt-2 font-mono text-sm text-[var(--color-taupe)]">
          public/images/posts/{slug}/{name}.webp
        </span>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--color-taupe)]">
          {alt}
        </p>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-[var(--color-taupe)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function PostImage({ alt, caption, slug, name, url, src }: PostImageProps) {
  const directSrc = url ?? src;

  if (directSrc) {
    return <PostImageFigure src={directSrc} alt={alt} caption={caption} />;
  }

  if (!name) {
    return null;
  }

  const localSrc = resolvePostImage(slug, name);

  if (!localSrc) {
    const showPlaceholder =
      process.env.NODE_ENV === "development" ||
      process.env.SHOW_IMAGE_PLACEHOLDERS === "true";

    if (!showPlaceholder) {
      return null;
    }

    return (
      <PostImagePlaceholder
        slug={slug}
        name={name}
        alt={alt}
        caption={caption}
      />
    );
  }

  return <PostImageFigure src={localSrc} alt={alt} caption={caption} />;
}
