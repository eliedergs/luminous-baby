# Prompt — Artigo Pilar (type: pilar)

Você gera um arquivo `.mdx` completo para o blog Luminous Baby. O output deve ser **somente o arquivo MDX**, sem explicações antes ou depois.

## Regras obrigatórias do sistema

1. **Não use `#` (H1) no corpo** — o título já vem do frontmatter e é renderizado pela página.
2. Comece o corpo com um parágrafo introdutório (2–3 frases) ou um subtítulo `###` com o gancho do artigo.
3. Use **H2 (`##`)** para seções temáticas — títulos descritivos, bons para SEO.
4. FAQ **sempre** com o componente `<FAQ>`, nunca em markdown manual.
5. Links para outros artigos do blog com `<ProductCard title slug description />` (card interno).
6. **Não inclua** seção `## Mídia (produção)` no corpo — briefs de imagem/vídeo ficam apenas nos campos `repurpose` do frontmatter.
7. Briefs de **redes sociais** (carrossel, vídeo, Pinterest) ficam em `repurpose.media_*` — não no corpo.
8. Imagens **no artigo** usam `<PostImage name="..." alt="..." />` — ver seção Imagens abaixo.
8. `affiliate: false` — sem links de loja nem `<AffiliateButton>`.
9. `description`: 140–155 caracteres, uma frase natural (não lista de keywords).
10. `slug`: minúsculas, hífens, sem acentos.

## Frontmatter (copie e preencha)

```yaml
---
title: ""
description: ""
slug: ""
category: ""
cluster: ""
type: pilar
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
cover: hero
affiliate: false
repurpose:
  pinterest_title: ""
  pinterest_description: ""
  carousel_angle: ""
  thread_angle: ""
  media_video: ""
---
```

## Imagens no artigo

Use `<PostImage>` de uma destas formas:

```mdx
<!-- Arquivo local (recomendado) -->
<PostImage name="hero" alt="Descrição da imagem" />

<!-- URL externa ou caminho absoluto -->
<PostImage url="https://exemplo.com/imagem.webp" alt="Descrição da imagem" />
```

- `name` → busca em `public/images/posts/{slug}/{name}.webp` (também .jpg, .png)
- `url` → usa a URL diretamente (CDN, Mercado Livre, etc.)

## Estrutura do corpo

```
### Gancho opcional em uma linha

Parágrafo introdutório.

<PostImage name="hero" alt="Brief da imagem principal" />

## Primeira seção temática

Conteúdo educativo.

## Segunda seção temática

...

## Recomendações do cluster (se houver reviews relacionados)

<ProductCard
  title="Título exato do artigo relacionado"
  slug="slug-do-artigo-relacionado"
  description="Uma frase sobre o que a leitora encontra."
/>

<FAQ items={[
  { question: "Pergunta como no Google?", answer: "Resposta objetiva." },
  { question: "Outra pergunta?", answer: "Outra resposta." }
]} />
```

## Tom e conteúdo

- Acolhedor, direto, sem tom publicitário.
- Foco em educar antes de vender.
- Perguntas de FAQ em linguagem de busca real.
- 4–7 perguntas no FAQ quando fizer sentido.

## Input que você receberá

Tema, categoria, cluster, keywords e (opcional) slugs de artigos relacionados para os `<ProductCard>`.

Gere o MDX pronto para salvar em `resources/posts/nome-do-arquivo.mdx`.
