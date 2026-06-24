type AffiliateButtonProps = {
  href: string;
  label: string;
};

export function AffiliateButton({ href, label }: AffiliateButtonProps) {
  return (
    <a
      href={href}
      rel="nofollow sponsored"
      target="_blank"
      className="inline-flex items-center justify-center rounded-full bg-[var(--color-rose)] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-rose-deep)]"
    >
      {label}
    </a>
  );
}
