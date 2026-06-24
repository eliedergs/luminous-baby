# Luminous Baby — Especificação Técnica do Blog

> Documento de referência técnica do projeto. Cobre stack, estrutura de código, formato dos posts e regras de SEO. Para estratégia de conteúdo, tom, posicionamento e clusters temáticos, consulte o Documento Base.

---

## Stack

| Camada | Escolha | Justificativa |
|---|---|---|
| Framework | Next.js (App Router) | SSG nativa, rotas dinâmicas, suporte a MDX |
| Formato de conteúdo | MDX | Suporta frontmatter estruturado e componentes React inline |
| Processamento MDX | `next-mdx-remote` + `gray-matter` | Leitura de frontmatter rico com campos customizados; compatível com App Router |
| API de geração de conteúdo | Gemini Flash (fase inicial) | Valida pipeline sem custo; migra para Claude Haiku quando houver tração comprovada |
| Deploy | A definir | — |

---

## Estrutura de Pastas

```
/
├── app/
│   └── blog/
│       └── [slug]/
│           └── page.tsx          ← lê o MDX pelo slug, renderiza o post
├── content/
│   └── posts/
│       ├── melhor-carrinho-bebe.mdx
│       ├── como-escolher-cadeirinha.mdx
│       └── ...                   ← todos os posts aqui, um arquivo por post
├── lib/
│   └── mdx.ts                    ← getAllPosts(), getPostBySlug()
└── components/
    ├── AffiliateButton.tsx        ← CTA de afiliado com rel="nofollow sponsored"
    ├── ProductCard.tsx            ← cards de "Produtos relacionados"
    └── FAQ.tsx                    ← FAQ com schema markup FAQPage (Schema.org)
```

---

## Componentes MDX

Os posts usam três componentes customizados que encapsulam lógica repetível e requisitos técnicos:

### `<AffiliateButton>`

Recebe `href` e `label`. Renderiza o CTA com `rel="nofollow sponsored"` automaticamente — obrigatório para links de afiliado segundo as diretrizes do Google. O atributo nunca precisa ser lembrado na hora de escrever o post.

### `<ProductCard>`

Recebe `nome`, `preco`, `rating` e `link`. Usado na seção "Produtos relacionados" de cada post. Pode puxar os dados diretamente do frontmatter do post relacionado.

### `<FAQ>`

Renderiza as perguntas com o schema markup `FAQPage` do Schema.org embutido. Aumenta a chance de aparecer em rich snippets no Google sem esforço adicional no momento de criação do conteúdo.

---

## Formato dos Posts (MDX)

Todos os posts são arquivos `.mdx` em `/content/posts/`. Cada arquivo tem duas partes: frontmatter YAML e corpo em MDX.

### Frontmatter — Post de Produto (`type: review` ou `type: comparativo`)

```yaml
---
title: ""
description: ""        # meta description, 140–155 chars, frase real — não lista de keywords
slug: ""               # curto, com hífens, sem acentos ou caracteres especiais
category: ""           # uma das 7 categorias do Documento Base
cluster: ""            # nome do cluster temático
type: review           # review | comparativo | pilar
publishedAt: ""
updatedAt: ""
affiliate: true
affiliateLink: ""
repurpose:
  pinterest_title: ""        # ≤100 chars, começa com a keyword principal
  pinterest_description: ""  # ≤500 chars, linguagem natural com keywords, sem hashtags
  instagram_hook: ""         # ≤125 chars — o que aparece antes do "...mais"
  tiktok_angle: ""           # uma frase descrevendo o ângulo/gancho do vídeo curto (15–30s)
---
```

### Frontmatter — Post Pilar (`type: pilar`)

```yaml
---
title: ""
description: ""
slug: ""
category: ""
cluster: ""
type: pilar
publishedAt: ""
updatedAt: ""
affiliate: false
repurpose:
  pinterest_title: ""
  pinterest_description: ""
  carousel_angle: ""   # tema e formato do carrossel Instagram derivado do pilar
  thread_angle: ""     # tema da sequência de posts derivados do pilar
---
```

---

## Regras de SEO (nível técnico)

- `title`: contém a keyword principal de forma natural — sem stuffing
- `description`: entre 140 e 155 caracteres; lê como frase real, não lista de palavras-chave
- `slug`: curto, hifenizado, sem acentos, sem caracteres especiais
- Links de afiliado: sempre com `rel="nofollow sponsored"` — encapsulado no `<AffiliateButton>`
- FAQ: perguntas em linguagem natural de busca (como a pessoa pesquisaria no Google)
- H2 nas seções temáticas dos pilares: descritivos e diretos — bons para ranqueamento de seção e featured snippets
- Schema markup `FAQPage`: gerado automaticamente pelo componente `<FAQ>`

---

## Decisões Técnicas Registradas

| Decisão | Escolha | Justificativa |
|---|---|---|
| Biblioteca MDX | `next-mdx-remote` + `gray-matter` | Suporta frontmatter rico com campos customizados; compatível com App Router; escala bem |
| Contentlayer | Descartado | Projeto descontinuado em 2024; incompatível com versões futuras do Next.js |
| `@next/mdx` (pages na pasta `app/`) | Descartado | Não processa frontmatter nativo — inviável para os campos customizados do projeto |
| CMS headless (Contentful, Sanity, Hygraph) | Descartado na fase inicial | Complexidade desnecessária na fase de validação; planos gratuitos têm limites; reavalia com tração comprovada |
| CMS baseado em Git (TinaCMS, Decap) | Descartado na fase inicial | Configuração não trivial sem retorno claro antes de validar tração; reavalia após 90 dias se houver necessidade de edição colaborativa |
| Abordagem de build | Código do zero (MVP mínimo) | Projeto em fase de validação; CMS seria complexidade prematura |
| Geração de conteúdo (fase inicial) | Gemini Flash (gratuito) | Valida pipeline sem custo; migra para Claude Haiku quando houver tração |
| Links de afiliado | Encapsulados em `<AffiliateButton>` | Garante `rel="nofollow sponsored"` sem depender de memória na criação do post |
| Schema FAQ | Encapsulado em `<FAQ>` | Rich snippets sem esforço extra no momento de escrita |
| Renderização | SSG (geração estática) | Ideal para SEO; tempo de resposta mínimo; sem custo de servidor por requisição |
