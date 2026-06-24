# Prompt — Comparativo (type: comparativo)

Você gera um arquivo `.mdx` completo para o blog Luminous Baby. O output deve ser **somente o arquivo MDX**, sem explicações antes ou depois.

## Regras obrigatórias do sistema

1. **Não use `#` (H1) no corpo** — o título vem do frontmatter.
2. Comece com `**Veredito:**` nomeando o vencedor geral e a alternativa por perfil.
3. `affiliateLink` no frontmatter = URL do produto **recomendado para a maioria** (vencedor).
4. CTAs de compra com `<AffiliateButton href="..." label="..." />` — um por produto comparado, nunca links markdown para lojas.
5. FAQ com `<FAQ items={[...]} />`.
6. Reviews aprofundados: `<ProductCard title slug description />` apontando para os reviews individuais.
7. Briefs de **redes sociais** em `repurpose.media_*`.
8. Imagens no artigo: `<PostImage name="..." alt="..." />`.
9. `description`: 140–155 caracteres.

## Frontmatter

```yaml
---
title: ""
description: ""
slug: ""
category: ""
cluster: ""
type: comparativo
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
cover: hero
affiliate: true
affiliateLink: "https://url-do-produto-vencedor"
repurpose:
  pinterest_title: ""
  pinterest_description: ""
  instagram_hook: ""
  tiktok_angle: ""
  media_video: ""
---
```

## Imagens no artigo

```mdx
<PostImage name="hero" alt="Produtos lado a lado, mesma perspectiva, fundo neutro" />
<PostImage url="https://..." alt="Comparativo visual dos produtos" />
```

## Estrutura do corpo (comparativo por critério)

Preferido para 2 produtos head-to-head:

```
**Veredito:** Melhor para a maioria: [Produto A]. Alternativa se [condição]: [Produto B].

### Gancho opcional

## Por que comparar esses dois?

## Ficha técnica comparativa

| | **Produto A** | **Produto B** |
|---|---|---|
| Preço | ... | ... |

(Não coloque links de loja na tabela — use AffiliateButton nas seções abaixo.)

## [Critério 1 — ex.: Peso]

Texto comparativo.

**Vantagem:** Produto X

## [Critério 2 — ex.: Cesto]

...

## Qual escolher?

### Escolha o **Produto A** se você:
- ...

<AffiliateButton href="..." label="Ver Produto A" />

### Escolha o **Produto B** se você:
- ...

<AffiliateButton href="..." label="Ver Produto B" />

## Quer aprofundar?

<ProductCard title="..." slug="review-produto-a" description="..." />
<ProductCard title="..." slug="review-produto-b" description="..." />

<FAQ items={[
  { question: "...", answer: "..." }
]} />
```

## Alternativa: comparativo por ranking (3+ produtos)

Use quando comparar 3 ou mais itens:

```
## Comparativo rápido
(tabela resumo)

## 1. [Produto] — melhor para a maioria
<AffiliateButton ... />

## 2. [Produto] — melhor custo-benefício
...
```

## Tom

- Objetivo, critério a critério, com "Vantagem:" explícita.
- Dados reais na ficha técnica.
- Recomendação final por perfil de uso, não genérica.

## Input que você receberá

Produtos a comparar (nome, preço, rating, link afiliado, specs), categoria, cluster, slugs dos reviews individuais.

Gere o MDX pronto para `resources/posts/`.
