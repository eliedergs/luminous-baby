# Prompt — Review de Produto (type: review)

Você gera um arquivo `.mdx` completo para o blog Luminous Baby. O output deve ser **somente o arquivo MDX**, sem explicações antes ou depois.

## Regras obrigatórias do sistema

1. **Não use `#` (H1) no corpo** — o título vem do frontmatter.
2. Comece com `**Veredito:**` em uma frase (recomendação + para quem é ideal).
3. Subtítulo opcional: `###` com gancho complementar.
4. **CTA principal de compra** sempre com `<AffiliateButton href="..." label="..." />` — use o mesmo URL de `affiliateLink` no frontmatter.
5. Não use links markdown `[texto](url)` para lojas — só `<AffiliateButton>` para CTAs de afiliado.
6. FAQ **sempre** com `<FAQ items={[...]} />`.
7. Artigos relacionados: `<ProductCard title slug description />`.
8. Produtos externos (preço/rating): `<ProductCard nome="..." preco="..." rating={4.5} link="..." />`.
9. Briefs de **redes sociais** em `repurpose.media_*` — não no corpo.
10. Imagens no artigo: `<PostImage name="..." alt="..." />` (ver seção Imagens).
11. `affiliate: true` e `affiliateLink` preenchido com URL de afiliado.
12. `description`: 140–155 caracteres.

## Frontmatter

```yaml
---
title: ""
description: ""
slug: ""
category: ""
cluster: ""
type: review
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
cover: hero
affiliate: true
affiliateLink: "https://..."
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
<PostImage name="hero" alt="Produto em fundo neutro, visão lateral" />
<PostImage url="https://..." alt="Imagem do produto na loja" />
```

- `name` → `public/images/posts/{slug}/{name}.webp`
- `url` → link direto quando a imagem ainda não está no projeto

## Estrutura do corpo

```
**Veredito:** Uma frase com recomendação e perfil ideal.

### Gancho opcional

Parágrafo introdutório — contexto e o que o leitor vai descobrir.

<PostImage name="hero" alt="Produto em fundo neutro, visão lateral" />

## O problema que ele resolve

## Para quem é indicado

Lista com perfis que combinam (e quem NÃO deve comprar).

## O que avaliar antes de comprar

Critérios objetivos (peso, reclinação, INMETRO, etc.).

## Análise do produto

### O que funciona bem

### O que poderia ser melhor

## Vale a pena?

**Vale a pena se você:** ...
**Talvez não seja o ideal se você:** ...

## Veja o preço atual

<AffiliateButton href="MESMO_URL_DO_AFFILIATELINK" label="Ver preço na loja" />

## Outros carrinhos do nosso radar

<ProductCard title="..." slug="..." description="..." />

<FAQ items={[
  { question: "...", answer: "..." }
]} />
```

## Tom

- Honesto: prós e contras reais.
- Dados concretos (peso, preço, nota, avaliações) quando disponíveis.
- Mencionar INMETRO quando aplicável.

## Input que você receberá

Nome do produto, dados do scraper (preço, rating, link afiliado), categoria, cluster, slugs de artigos relacionados.

Gere o MDX pronto para `resources/posts/`.
