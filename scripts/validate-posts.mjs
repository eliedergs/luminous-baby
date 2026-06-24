import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "resources", "posts");
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DESC_MIN = 140;
const DESC_MAX = 155;

const AFFILIATE_TYPES = new Set(["review", "comparativo"]);
const REPURPOSE_AFFILIATE = [
  "pinterest_title",
  "pinterest_description",
  "instagram_hook",
  "tiktok_angle",
];
const REPURPOSE_PILAR = [
  "pinterest_title",
  "pinterest_description",
  "carousel_angle",
  "thread_angle",
];

/** @type {string[]} */
const errors = [];

function err(file, message) {
  errors.push(`${file}: ${message}`);
}

function extractProductCardSlugs(content) {
  /** @type {string[]} */
  const slugs = [];
  for (const match of content.matchAll(/<ProductCard[\s\S]*?\/>/g)) {
    const slugMatch = match[0].match(/\bslug="([^"]+)"/);
    if (slugMatch) {
      slugs.push(slugMatch[1]);
    }
  }
  return slugs;
}

function hasAffiliateButton(content) {
  return /<AffiliateButton\b/.test(content);
}

function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error("Pasta resources/posts/ não encontrada.");
    process.exit(1);
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"));

  if (files.length === 0) {
    console.error("Nenhum arquivo .mdx em resources/posts/.");
    process.exit(1);
  }

  /** @type {Map<string, string>} */
  const slugToFile = new Map();
  /** @type {Set<string>} */
  const allSlugs = new Set();

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const label = file;

    if (!data.title || typeof data.title !== "string") {
      err(label, "frontmatter `title` ausente ou inválido");
    }

    if (!data.slug || typeof data.slug !== "string") {
      err(label, "frontmatter `slug` ausente ou inválido");
    } else {
      if (!SLUG_RE.test(data.slug)) {
        err(
          label,
          `slug "${data.slug}" inválido (use minúsculas, hífens, sem acentos)`,
        );
      }
      if (slugToFile.has(data.slug)) {
        err(
          label,
          `slug duplicado "${data.slug}" (já usado em ${slugToFile.get(data.slug)})`,
        );
      } else {
        slugToFile.set(data.slug, file);
      }
      allSlugs.add(data.slug);
    }

    if (!data.description || typeof data.description !== "string") {
      err(label, "frontmatter `description` ausente ou inválido");
    } else {
      const len = data.description.length;
      if (len < DESC_MIN || len > DESC_MAX) {
        err(
          label,
          `description com ${len} caracteres (esperado ${DESC_MIN}–${DESC_MAX})`,
        );
      }
    }

    if (!data.type || !["review", "comparativo", "pilar"].includes(data.type)) {
      err(label, `type "${data.type}" inválido`);
    }

    if (data.type === "pilar") {
      if (data.affiliate !== false) {
        err(label, "pilar deve ter `affiliate: false`");
      }
      if (data.affiliateLink) {
        err(label, "pilar não deve ter `affiliateLink`");
      }
      if (hasAffiliateButton(content)) {
        err(label, "pilar não deve conter `<AffiliateButton>`");
      }
      validateRepurpose(label, data.repurpose, REPURPOSE_PILAR);
    }

    if (AFFILIATE_TYPES.has(data.type)) {
      if (data.affiliate !== true) {
        err(label, `${data.type} deve ter \`affiliate: true\``);
      }
      if (!data.affiliateLink || typeof data.affiliateLink !== "string") {
        err(label, `${data.type} deve ter \`affiliateLink\` no frontmatter`);
      } else if (!/^https?:\/\//.test(data.affiliateLink)) {
        err(label, "`affiliateLink` deve ser uma URL http(s)");
      }
      if (!hasAffiliateButton(content)) {
        err(label, `${data.type} deve conter pelo menos um \`<AffiliateButton>\``);
      }
      validateRepurpose(label, data.repurpose, REPURPOSE_AFFILIATE);
    }
  }

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const { data, content } = matter(fs.readFileSync(filePath, "utf8"));

    for (const cardSlug of extractProductCardSlugs(content)) {
      if (!allSlugs.has(cardSlug)) {
        err(
          file,
          `<ProductCard slug="${cardSlug}"> aponta para post inexistente`,
        );
      }
    }
  }

  if (errors.length > 0) {
    console.error(`\nvalidate:posts — ${errors.length} erro(s):\n`);
    for (const e of errors) {
      console.error(`  • ${e}`);
    }
    console.error("");
    process.exit(1);
  }

  console.log(`validate:posts — OK (${files.length} posts)`);
}

/**
 * @param {string} file
 * @param {unknown} repurpose
 * @param {string[]} required
 */
function validateRepurpose(file, repurpose, required) {
  if (!repurpose || typeof repurpose !== "object") {
    err(file, "`repurpose` ausente ou inválido no frontmatter");
    return;
  }
  for (const key of required) {
    const value = /** @type {Record<string, unknown>} */ (repurpose)[key];
    if (typeof value !== "string" || value.trim() === "") {
      err(file, `repurpose.${key} ausente ou vazio`);
    }
  }
}

main();
