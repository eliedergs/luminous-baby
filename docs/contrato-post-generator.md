# Contrato — Post Generator → Luminous Baby

Acordo entre o **post generator** e este repositório para posts MDX compatíveis sem edição manual de código.

---

## Onde cada coisa fica

| Artefato | Caminho no blog | Caminho no gerador |
|----------|-----------------|-------------------|
| Posts publicados | `resources/posts/*.mdx` | output configurado em `config.yaml` |
| Prompts por tipo | `resources/prompts/` | espelhado / referenciado pelo gerador |
| Templates de estrutura | `resources/templates/` | base para prompts |

---

## Frontmatter obrigatório

Ver `spec.md` e `lib/types.ts`. Resumo:

| Campo | Regra |
|-------|--------|
| `slug` | minúsculas, hífens, único no repo |
| `description` | 140–155 caracteres |
| `type` | `review` \| `comparativo` \| `pilar` |
| `affiliate` | `true` (review/comparativo) ou `false` (pilar) |
| `affiliateLink` | URL — obrigatório em review/comparativo |
| `repurpose` | campos conforme o `type` (ver spec) |

---

## Componentes MDX no corpo

| Tipo | Obrigatório no corpo |
|------|----------------------|
| `review` | `<AffiliateButton>`, `<FAQ>`, `<PostImage>` |
| `comparativo` | `<AffiliateButton>` (por produto), `<FAQ>`, `<PostImage>` |
| `pilar` | `<ProductCard slug="...">` (posts do cluster), `<FAQ>`, `<PostImage>` — **sem** `<AffiliateButton>` |

`<ProductCard slug="...">` deve apontar para um `slug` existente em outro post.

---

## Validação

**No blog** (fonte da verdade para publicação):

```bash
npm run validate:posts
```

**No gerador** (antes de copiar/gravar):

```bash
uv run main.py validar --arquivo "../Social Blog/resources/posts/arquivo.mdx"
```

Ambos devem passar antes do deploy.

---

## Fluxo completo

Documentado em `docs/publicar-post.md`.
