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

## 4. Criar o projeto no Cloudflare Pages

1. Acesse **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Autorize o Git e selecione o repositório
3. Se o blog não estiver na raiz do repo, configure:

| Campo | Valor |
|-------|--------|
| **Production branch** | `main` (ou sua branch principal) |
| **Root directory** | caminho até `Social Blog` (ex.: `Projects/Social Blog`) |
| **Framework preset** | `None` |
| **Build command** | `npm ci && npm run build` |
| **Build output directory** | `out` |

4. Em **Environment variables** (Production e Preview):

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
| Build falha no CF | Verifique Node 20+, `npm ci` e logs; teste `npm run build` local |
| 404 em rotas do blog | Confirme **Build output directory** = `out` (não `.next`) |
| Sitemap com URL errada | Corrija `SITE_URL` e refaça o deploy |
| Imagens não aparecem | Arquivos devem estar em `public/images/posts/...` antes do build |
| `_headers` ignorado | Arquivo deve estar em `public/_headers`; confira em `out/_headers` após build |

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
