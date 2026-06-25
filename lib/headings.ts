import { categoryToSlug } from "@/lib/taxonomy";

export type HeadingEntry = {
  id: string;
  title: string;
};

export function headingToSlug(title: string): string {
  return categoryToSlug(title);
}

export function extractH2Headings(content: string): HeadingEntry[] {
  const headings: HeadingEntry[] = [];
  const idCounts = new Map<string, number>();

  for (const line of content.split("\n")) {
    const match = line.match(/^##\s+(.+)$/);
    if (!match) {
      continue;
    }

    const title = match[1].trim();
    const baseId = headingToSlug(title);
    const count = idCounts.get(baseId) ?? 0;
    idCounts.set(baseId, count + 1);
    const id = count === 0 ? baseId : `${baseId}-${count}`;

    headings.push({ id, title });
  }

  return headings;
}
