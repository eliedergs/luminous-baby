const DEFAULT_SITE_URL = "https://luminousbaby.pages.dev";

export function getSiteUrl(): string {
  const url = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;

  if (!url) {
    return DEFAULT_SITE_URL;
  }

  return url.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
