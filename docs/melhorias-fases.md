# Luminous Baby — Roadmap de Melhorias

> Plano de evolução do blog após o MVP (Next.js + MDX, 4 posts piloto, componentes `AffiliateButton`, `ProductCard`, `FAQ`, `PostImage`).
>
> **Critério de prioridade:** desbloquear publicação → escalar conteúdo com qualidade → crescer tráfego e conversão.

---

## Visão geral das fases


| Fase  | Nome                   | Objetivo                                     | Depende de |
| ----- | ---------------------- | -------------------------------------------- | ---------- |
| **1** | Publicar com confiança | Site no ar com SEO mínimo e compliance       | MVP atual  |
| **2** | Escalar conteúdo       | Gerar e publicar posts sem quebrar o sistema | Fase 1     |
| **3** | Estrutura editorial    | Navegação por categoria/cluster e confiança  | Fase 2     |
| **4** | Dados e conversão      | Produtos frescos e métricas de afiliado      | Fase 2     |
| **5** | Distribuição e polish  | Redes sociais, performance e refinamentos UX | Fases 3–4  |


---

## Fase 1 — Publicar com confiança

**Meta:** colocar o blog no ar com base técnica e legal mínima para indexação e links de afiliado.

### Entregas

- [x] **Deploy estático** — Cloudflare Pages (`luminousbaby.pages.dev`); `npm run deploy`
- [x] **`sitemap.xml`** — todas as rotas (`/`, `/blog/[slug]`, `/afiliados`)
- [x] **`robots.txt`** — permitir crawl; apontar para o sitemap
- [x] **URL canônica** por post (`metadata.alternates.canonical`)
- [x] **Schema `BlogPosting`** — título, datas, descrição, imagem (`cover` / `hero`)
- [x] **Página de divulgação de afiliados** — `/afiliados`; link no footer
- [x] **Ajustar `description`** dos posts piloto para 140–155 caracteres
- [x] **Atualizar `spec.md`** — refletir `resources/posts/`, `PostImage`, `remark-gfm`, `cover`, `media_*`

### Fora de escopo nesta fase

- Hubs por categoria, analytics, integração com scraper

### Critério de conclusão

Site acessível em domínio real, indexável pelo Google, com disclosure de afiliados visível e build de produção estável.

---

## Fase 2 — Escalar conteúdo

**Meta:** publicar novos clusters sem regressões técnicas; alinhar blog ↔ post generator.

### Entregas

- [x] **Script `npm run validate:posts`** — validar:
  - `slug` único e formato correto
  - `description` entre 140–155 caracteres
  - `type` coerente com campos (`affiliate`, `affiliateLink`, `repurpose`)
  - slugs em `<ProductCard>` existem
  - reviews/comparativos têm `<AffiliateButton>` e `affiliateLink`
  - pilares têm `affiliate: false`
- [x] **Hook pré-build** — `prebuild` → `validate:posts` antes de `next build`
- [x] **Contrato documentado com post generator** — `docs/contrato-post-generator.md`
- [x] **`PostImage` em produção** — placeholder tracejado só em `development` (ou `SHOW_IMAGE_PLACEHOLDERS=true`)
- [x] **Checklist de publicação** — `docs/publicar-post.md`

### Fora de escopo nesta fase

- Páginas de categoria, componentes novos além de validação

### Critério de conclusão

Novo post gerado externamente passa em `validate:posts` e no build sem edição manual de código.

---

## Fase 3 — Estrutura editorial

**Meta:** organizar o conteúdo por jornada (categoria/cluster) e reforçar confiança editorial.

### Entregas

- [x] **Rota `/blog`** — listagem com filtro por `type` e `category`
- [ ] **Hub por categoria** — `/categoria/[slug]` (ex.: mobilidade-e-transporte)
- [ ] **Hub por cluster** (opcional se cluster = categoria no início) — `/cluster/[slug]`
- [ ] **Breadcrumbs** — `Início → Categoria → Post`
- [ ] **Página “Como avaliamos”** — metodologia (INMETRO, critérios, atualização de preços)
- [ ] **Bloco “Artigos relacionados”** automático — posts do mesmo `cluster`, excluindo o atual
- [ ] **TOC (índice)** em pilares — H2 gerados a partir do MDX ou manual via componente
- [ ] **Tempo de leitura** no header do post

### Fora de escopo nesta fase

- Busca full-text, comentários, CMS

### Critério de conclusão

Visitante navega do pilar aos reviews do cluster sem depender só da home; páginas de confiança publicadas.

---

## Fase 4 — Dados e conversão

**Meta:** manter preços/ratings atualizados e medir performance de afiliados.

### Entregas

- [ ] **Integração scraper → blog** — `ProductCard` aceitar `productId` ou SKU e ler `produtos.db` (ou API leve)
- [ ] **Campos dinâmicos em reviews** — preço, nota e link afiliado sincronizados na build ou via revalidação
- [ ] **Componente `<Veredito>`** — bloco visual padronizado no topo de review/comparativo
- [ ] **`<ComparisonTable>`** — tabela comparativa nativa (menos frágil que markdown GFM)
- [ ] **Rastreamento de cliques** em `AffiliateButton` — UTM consistente ou evento (Plausible/GA4)
- [ ] **Política de privacidade** — se analytics ou cookies forem adotados

### Fora de escopo nesta fase

- Checkout, conta de usuário, preços em tempo real a cada request

### Critério de conclusão

Atualizar preço no scraper reflete no blog após rebuild; cliques de afiliado são mensuráveis.

---

## Fase 5 — Distribuição e polish

**Meta:** facilitar repurposing em redes e refinar experiência visual/performance.

### Entregas

- [ ] **Script `npm run export:repurpose`** — gera JSON/txt por post a partir do frontmatter `repurpose` + `media_*`
- [ ] **OG/Twitter cards completos** — imagem default da marca quando `cover` ausente
- [ ] **Otimização de imagens** — WebP, dimensões, lazy load; revisar `images.unoptimized`
- [ ] **Hero na home** — destaque do pilar + últimos reviews
- [ ] **Componente `<Callout>`** — avisos de segurança, INMETRO, saúde
- [ ] **RSS `/feed.xml`** — para agregadores e distribuição
- [ ] **Busca simples** (opcional) — por título/slug no client ou Pagefind

### Fora de escopo nesta fase

- App mobile, área logada, comentários

### Critério de conclusão

Fluxo post → redes com export automático; Core Web Vitals aceitáveis em mobile.

---

## Backlog (sem fase definida)

Itens úteis, mas dependentes de tração ou decisão de produto:


| Item                       | Notas                                                        |
| -------------------------- | ------------------------------------------------------------ |
| Calculadoras interativas   | Data do parto, fraldas no 1º ano — tráfego de topo de funil  |
| CMS (TinaCMS / Decap)      | Reavaliar após 90 dias se edição colaborativa for necessária |
| Migração para Claude Haiku | Quando volume de geração justificar custo                    |
| Newsletter                 | Captura de e-mail + RSS                                      |
| Testes E2E                 | Playwright nas rotas críticas e validação de schema          |
| i18n                       | Só se houver expansão além do BR                             |


---

## Dependências entre projetos

```
scraper (produtos.db)
    └── Fase 4 → ProductCard dinâmico

post generator (specs.md)
    └── Fase 2 → output MDX + validação

Social Blog (este repo)
    └── Fases 1–5
```

---

## Ordem recomendada de execução

1. Fase 1 inteira (1–2 sessões)
2. Fase 2 — validação + alinhamento com post generator (1 sessão)
3. Fase 3 — hubs + “Como avaliamos” (2–3 sessões)
4. Fase 4 — scraper + Veredito (2 sessões)
5. Fase 5 — conforme necessidade de redes e performance

---

## Histórico


| Data       | Alteração                                                     |
| ---------- | ------------------------------------------------------------- |
| 2026-06-24 | Documento inicial — pós-MVP com 4 posts do cluster Mobilidade |


