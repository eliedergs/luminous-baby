# Deploy no Cloudflare Pages

Guia para publicar o Luminous Baby como site **estático** (`output: export`). Adequado para este blog: só SSG, sem API routes nem servidor Node em produção.

---

## 1. O que já está configurado no projeto

| Item | Detalhe |
|------|---------|
| Export estático | `next.config.ts` → `output: "export"` → pasta `out/` |
| Node | `.nvmrc` e `engines` → Node 20+ |
| URL do site | `lib/site.ts` + variável `SITE_URL` |
| SEO | `app/sitemap.ts`, `app/robots.ts`, canonical nos posts |
| Headers | `public/_headers` (copiado para `out/` no build) |
| Preview local | `npm run preview` (serve a pasta `out/`) |

---

## 2. Pré-requisitos

- Conta [Cloudflare](https://dash.cloudflare.com/)
- Repositório Git (GitHub ou GitLab) com o projeto **Social Blog** — ou upload manual
- Node 20+ localmente para testar o build

---

## 3. Testar o build localmente

```bash
cd "Projects/Social Blog"

# Opcional: copiar e ajustar a URL
cp .env.example .env
# Edite SITE_URL para a URL que o Cloudflare vai usar

npm ci
npm run build
```

Se terminar sem erro, a pasta `out/` contém o site pronto.

Confira localmente:

```bash
npm run preview
# Abra http://localhost:3000 (porta pode variar)
```

Valide:

- `/` — home
- `/blog/como-escolher-carrinho-de-bebe` — post
- `/sitemap.xml`
- `/robots.txt`

---

## 4. Conectar o repositório no Cloudflare

Este blog exporta HTML estático para `out/`. Existem **dois fluxos** no painel — o seu provavelmente é **Workers Builds** (sem campo “preset”).

---

### Opção A — Workers Builds (painel atual, o mais comum em 2025+)

Você criou em **Workers & Pages → Create application** conectado ao Git. Não há “Framework preset”; o Wrangler **auto-detecta** Next.js e tenta OpenNext (SSR) — errado para este projeto.

**Onde ajustar:**

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages**
2. Clique no projeto **`luminous-baby`**
3. Aba **Settings** (Configurações)
4. Seção **Build** (ou **Builds**)
5. Edite e salve:

| Campo | Valor |
|-------|--------|
| **Git branch** | `master` |
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy --assets ./out` |
| **Root directory** | *(vazio)* |

6. Na mesma página ou em **Settings → Variables**, adicione variável de **build** (precisa existir durante o `next build`):

| Variável | Valor |
|----------|--------|
| `SITE_URL` | `https://luminous-baby.pages.dev` *(ajuste após o 1º deploy)* |

7. **Deployments** → **Retry deployment**

O repositório inclui `wrangler.jsonc` apontando `assets.directory` para `./out`. Depois do push, o deploy command pode ser só `npx wrangler deploy` — o Wrangler **não** tentará OpenNext se o arquivo já existir.

**Build command:** o Cloudflare já roda `npm clean-install` antes — use só `npm run build`, sem repetir `npm ci`.

---

### Opção B — Cloudflare Pages clássico (se recriar o projeto)

Só aparece “Framework preset” ao criar via **Pages → Connect to Git** (aba **Pages**, não Worker):

| Campo | Valor |
|-------|--------|
| **Production branch** | `master` |
| **Framework preset** | **None** |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Deploy command** | *(não existe — Pages publica `out` sozinho)* |

Se você **não** vir preset, está na Opção A — use a seção acima.

---

### Variáveis de ambiente

| Variável | Valor |
|----------|--------|
| `SITE_URL` | URL final do site, **sem** barra no final |

Exemplos:

- Staging: `https://luminousbaby.pages.dev`
- Produção: `https://www.seudominio.com.br`

5. **Save and Deploy**

O primeiro deploy pode levar alguns minutos. A URL padrão será `https://<nome-do-projeto>.pages.dev`.

---

## 5. Ajustar `SITE_URL` após o primeiro deploy

1. Anote a URL que o Cloudflare gerou (ex.: `https://luminous-baby.pages.dev`)
2. Em **Settings** → **Environment variables**, atualize `SITE_URL` com essa URL exata
3. **Deployments** → **Retry deployment** (ou faça um commit vazio) para regenerar `sitemap.xml` e canonical com a URL correta

Sem isso, sitemap e Open Graph podem apontar para o placeholder `luminousbaby.pages.dev`.

---

## 6. Domínio customizado (opcional)

1. **Custom domains** → **Set up a custom domain**
2. Siga o assistente (DNS na Cloudflare ou CNAME no seu registrador)
3. Atualize `SITE_URL` para o domínio final e rode um novo deploy

---

## 7. Deploy manual (sem Git)

Se ainda não usar Git no Cloudflare:

```bash
npm run build
npx wrangler pages deploy out --project-name=luminous-baby
```

Requer [Wrangler](https://developers.cloudflare.com/workers/wrangler/) instalado e login (`npx wrangler login`).

---

## 8. Publicar conteúdo novo

Fluxo habitual:

1. Adicione ou edite `.mdx` em `resources/posts/`
2. Coloque imagens em `public/images/posts/{slug}/`
3. Commit e push → Cloudflare faz build automático

Ou, manualmente: `npm run build` + deploy da pasta `out/`.

---

## 9. Problemas comuns

| Sintoma | Solução |
|---------|---------|
| Build passa, deploy falha com `opennextjs-cloudflare` / `pages-manifest.json` | Projeto configurado como **Worker/Next.js SSR**. Em **Settings → Build** mude preset para **None**, output para **`out`**, e **apague o Deploy command** (`npx wrangler deploy`). Retry deployment. |
| `wrangler deploy` roda após o build | Remova o **Deploy command** — Pages publica a pasta `out/` automaticamente; não precisa de Wrangler no deploy Git. |
| Build falha no CF | Verifique Node 20+, logs; teste `npm run build` local |
| 404 em rotas do blog | Confirme **Build output directory** = `out` (não `.next`) |
| Sitemap com URL errada | Corrija `SITE_URL` e refaça o deploy |
| Imagens não aparecem | Arquivos devem estar em `public/images/posts/...` antes do build |
| `_headers` ignorado | Arquivo deve estar em `public/_headers`; confira em `out/_headers` após build |

### Erro típico (OpenNext após build bem-sucedido)

Se o log mostra `Success: Build command completed` e depois falha em `npx wrangler deploy` ou `opennextjs-cloudflare build` com:

```
ENOENT: .../.next/standalone/.next/server/pages-manifest.json
```

**Causa:** o painel detectou Next.js e tentou publicar como **Cloudflare Worker** (SSR), mas o projeto exporta HTML estático para `out/` — não gera `.next/standalone`.

**Correção no painel** (Settings → **Build** / Builds):

1. **Build command** → `npm run build`
2. **Deploy command** → `npx wrangler deploy --assets ./out` *(ou `npx wrangler deploy` após push do `wrangler.jsonc`)*
3. Confirme que **não** está rodando só `npx wrangler deploy` sem `--assets ./out` e sem `wrangler.jsonc` — isso dispara auto-config OpenNext
4. **Retry deployment**

Não é necessário instalar `@opennextjs/cloudflare`, `wrangler.jsonc` nem mudar `next.config.ts`.

---

## 10. O que não usar neste projeto

- **@cloudflare/next-on-pages** — para SSR/Edge; este blog é 100% estático
- **`next start`** em produção — não há servidor Node no Pages com export estático
- Preset **Next.js** automático do CF — pode assumir SSR; prefira **None** + `out`

---

## Checklist antes de ir ao ar

- [ ] `npm run build` passa localmente
- [ ] `SITE_URL` configurada no Cloudflare
- [ ] `/sitemap.xml` e `/robots.txt` acessíveis na URL publicada
- [ ] Links de afiliado e posts principais testados no mobile
- [ ] Domínio customizado (se aplicável) com HTTPS ativo
