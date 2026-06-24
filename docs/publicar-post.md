# Publicar um post no Luminous Baby

Checklist do fluxo: gerar → validar → imagens → build → deploy.

---

## 1. Gerar o MDX (post generator)

```bash
cd "../post generator"
uv run main.py gerar --tipo review --modo bootstrap --produto-id <id>
```

O arquivo deve ser gravado em **`Social Blog/resources/posts/`** com nome `{tipo}-{tema}.mdx`.

Validação rápida no gerador:

```bash
uv run main.py validar --arquivo "../Social Blog/resources/posts/seu-arquivo.mdx"
```

---

## 2. Validar no blog

```bash
cd "../Social Blog"
npm run validate:posts
```

Verifica slug, description (140–155), coerência de `type`/`affiliate`, `<ProductCard>` e `<AffiliateButton>`.

O mesmo comando roda automaticamente antes de `npm run build`.

---

## 3. Imagens

Coloque arquivos em:

```
public/images/posts/{slug-do-post}/{name}.webp
```

Referência no MDX:

```mdx
<PostImage name="hero" alt="Descrição acessível" />
```

Frontmatter opcional: `cover: hero` para Open Graph.

Em produção, imagens ausentes **não** exibem placeholder tracejado (só em `npm run dev`).

---

## 4. Build local (opcional)

```bash
npm run build
npm run preview
```

Confira home, URL do post e links de afiliado.

---

## 5. Deploy

```bash
npm run deploy
```

Publica em `https://luminousbaby.pages.dev`.

Certifique-se de que `.env` contém `SITE_URL=https://luminousbaby.pages.dev`.

---

## Referências

- Contrato blog ↔ gerador: `docs/contrato-post-generator.md`
- Deploy: `docs/deploy-cloudflare-pages.md`
- Formato dos posts: `spec.md`
