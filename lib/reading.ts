const WORDS_PER_MINUTE = 200;

export function getReadingTimeMinutes(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>\n]+>/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_`~[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = text ? text.split(" ").length : 0;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min de leitura`;
}
