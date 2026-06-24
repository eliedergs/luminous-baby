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

## 4. Deploy no Cloudflare Pages (recomendado — URL planejada)

**URL alvo deste projeto:** `https://luminousbaby.pages.dev`  
(definida em `lib/site.ts`, `.env.example` e sitemap/canonical)

| Produto | URL gerada | Usar neste blog? |
|---------|------------|------------------|
| **Cloudflare Pages** | `https://<nome>.pages.dev` | **Sim** — é o plano |
| **Workers + static assets** | `https://<nome>.<conta>.workers.dev` | Não |

---

### Onde está “Pages” no painel? (UI 2025+)

A Cloudflare **unificou** Workers e Pages. Em contas novas, **Create application** costuma mostrar só **Import a repository** (Worker) — a aba **Pages** nem sempre aparece.

Tente nesta ordem:

#### Caminho 1 — Aba Pages (se existir)

1. **Workers & Pages** → **Create application**
2. No topo, procure abas **Workers** | **Pages**
3. **Pages** → **Connect to Git** → repo `liedergs/luminous-baby`

#### Caminho 2 — Drag and drop (cria projeto `.pages.dev` sem Git)

1. **Workers & Pages** → **Create application**
2. **Get started** → **Drag and drop your files**
3. Nome do projeto: **`luminousbaby`**
4. Localmente: `npm run build` → arraste a pasta **`out/`** para o painel

Isso gera `https://luminousbaby.pages.dev`, mas **não** conecta Git (deploy manual ou via GitHub Actions depois).

#### Caminho 3 — Wrangler no terminal (recomendado se o painel não mostra Pages)

Cria o projeto Pages e publica a URL correta **sem** depender do painel:

```bash
cd "Projects/Social Blog"

npx wrangler login
npx wrangler pages project create luminousbaby --production-branch master

SITE_URL=https://luminousbaby.pages.dev npm run build
npx wrangler pages deploy out --project-name=luminousbaby --branch=master
```

O site fica em **`https://luminousbaby.pages.dev`**.

Para deploy automático a cada `git push`, use **GitHub Actions** (seção 4b abaixo) — é o fluxo oficial quando não há “Connect to Git” no Pages.

**Importante:** não use **Import a repository** neste fluxo — isso cria **Worker** (`*.workers.dev`), não Pages.

---

### 4a. Configuração Git no painel (quando a aba Pages aparecer)

| Campo | Valor |
|-------|--------|
| **Project name** | **`luminousbaby`** |
| **Production branch** | `master` |
| **Framework preset** | **None** |
| **Build command** | `npm run build` |
| **Build output directory** | **`out`** |

Variável: `SITE_URL` = `https://luminousbaby.pages.dev`

---

### 4b. GitHub Actions (Pages via Wrangler — sem aba Pages)

Se só existir Worker no painel, crie o projeto com o Caminho 3 e adicione no repo:

1. Token Cloudflare: **My Profile → API Tokens → Create** → permissão **Account → Cloudflare Pages → Edit**
2. GitHub repo → **Settings → Secrets → Actions**:
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_API_TOKEN`
3. Arquivo `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy to Cloudflare Pages
on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          SITE_URL: https://luminousbaby.pages.dev
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy out --project-name=luminousbaby --branch=master
```

Cada push em `master` publica em `luminousbaby.pages.dev`.

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

1. Confirme a URL do projeto Pages: `https://luminousbaby.pages.dev`
2. Em **Settings** → **Environment variables**, defina `SITE_URL=https://luminousbaby.pages.dev`
3. **Deployments** → **Retry deployment** para regenerar `sitemap.xml` e canonical

Sem isso, sitemap e Open Graph podem apontar para o placeholder `luminousbaby.pages.dev`.

---

## 6. Domínio customizado (opcional)

1. **Custom domains** → **Set up a custom domain**
2. Siga o assistente (DNS na Cloudflare ou CNAME no seu registrador)
3. Atualize `SITE_URL` para o domínio final e rode um novo deploy

---

## 7. Deploy manual (máquina local)

Pré-requisito único: `npx wrangler login` e projeto Pages criado (`npx wrangler pages project create luminousbaby --production-branch master`).

Defina `SITE_URL` no `.env` (copie de `.env.example`) e rode:

```bash
npm run deploy
```

Publica em `https://luminousbaby.pages.dev`.

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
| URL é `*.workers.dev` em vez de `luminousbaby.pages.dev` | Projeto criado como **Worker**. Crie um projeto **Pages** chamado `luminousbaby` (seção 4) e desconecte/delete o Worker. |
| Build passa, deploy falha com `opennextjs-cloudflare` | Worker com deploy errado. Use Pages, ou `--assets ./out` / `wrangler.jsonc`. |
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
- [ ] Site em `https://luminousbaby.pages.dev` (Pages, não Worker)
- [ ] `SITE_URL=https://luminousbaby.pages.dev` no Cloudflare
- [ ] `/sitemap.xml` e `/robots.txt` acessíveis na URL publicada
- [ ] Links de afiliado e posts principais testados no mobile
- [ ] Domínio customizado (se aplicável) com HTTPS ativo
