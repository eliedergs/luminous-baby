import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-cream-dark)] bg-[var(--color-cream)]">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Luminous Baby"
            width={48}
            height={48}
            className="rounded-full"
          />
          <span className="font-serif text-xl leading-none">
            <span className="text-[var(--color-rose)]">Luminous</span>{" "}
            <span className="text-[var(--color-sage)]">Baby</span>
          </span>
        </Link>
        <nav className="text-sm">
          <Link
            href="/blog"
            className="font-medium text-[var(--color-sage-deep)] underline-offset-2 hover:underline"
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
