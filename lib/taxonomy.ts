const TYPE_LABELS: Record<string, string> = {
  pilar: "Guias",
  review: "Reviews",
  comparativo: "Comparativos",
};

export function categoryToSlug(category: string): string {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getTypeLabel(type: string): string {
  return TYPE_LABELS[type] ?? type;
}

export function getUniqueTypes(types: string[]): string[] {
  return [...new Set(types)].sort((a, b) =>
    (TYPE_LABELS[a] ?? a).localeCompare(TYPE_LABELS[b] ?? b, "pt-BR"),
  );
}

export function getUniqueCategories(
  categories: string[],
): { name: string; slug: string }[] {
  const seen = new Map<string, string>();
  for (const name of categories) {
    seen.set(categoryToSlug(name), name);
  }
  return [...seen.entries()]
    .map(([slug, name]) => ({ slug, name }))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}
