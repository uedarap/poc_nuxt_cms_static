# POC Nuxt CMS Static

Blog estático com Nuxt 4, Nuxt Content, GitHub Pages e Pages CMS. O conteúdo fica em arquivos Markdown versionados no Git, a edição pode ser feita pelo Pages CMS e a publicação final não depende de servidor Node em runtime.

## Arquitetura

- `Nuxt 4` renderiza as páginas e gera a saída estática.
- `@nuxt/content` lê os posts em `content/blog/*.md`.
- `Pages CMS` edita os Markdown diretamente no repositório usando `.pages.yml`.
- `GitHub Actions` executa o build e publica `.output/public` no GitHub Pages.
- `GitHub Pages` hospeda somente arquivos estáticos.

## Por que esta stack

Esta combinação mantém o fluxo atual de site estático, melhora a experiência de desenvolvimento com Nuxt e preserva o conteúdo como arquivos no Git. O Pages CMS entra apenas como camada editorial: ele não adiciona banco, backend ou serviço Node em produção.

Não foi usada biblioteca visual. CSS simples é suficiente para a POC, reduz dependências e facilita manter a saída estática previsível.

## Versões

O projeto usa Nuxt 4 e Nuxt Content 3, que é a linha atual compatível com `queryCollection()` e `content.config.ts`.

- `nuxt`: `^4.4.2`
- `@nuxt/content`: `^3.13.0`
- Node recomendado: `22`

Se alguma versão futura quebrar compatibilidade, fixe as versões no `package.json` antes de publicar em produção.

## Instalação

```bash
npm install
```

## Rodar localmente

```bash
npm run dev
```

Por padrão, o ambiente local usa `baseURL` igual a `/`, o que deixa a navegação simples em desenvolvimento.

## Gerar build estático

Para simular o GitHub Pages de projeto:

```bash
NUXT_APP_BASE_URL=/poc_nuxt_cms_static/ npm run build
```

No Windows PowerShell:

```powershell
$env:NUXT_APP_BASE_URL="/poc_nuxt_cms_static/"; npm run build
```

A saída publicada fica em:

```text
.output/public
```

## Publicar no GitHub Pages

O workflow está em `.github/workflows/deploy.yml`.

Antes do primeiro deploy:

1. Publique o repositório no GitHub.
2. Vá em `Settings > Pages`.
3. Em `Build and deployment`, selecione `GitHub Actions`.
4. Faça push na branch `main`.

Como este é um GitHub Pages de projeto, o workflow define:

```yaml
NUXT_APP_BASE_URL: /poc_nuxt_cms_static/
```

Troque `poc_nuxt_cms_static` pelo nome real do repositório em:

- `nuxt.config.ts`
- `.github/workflows/deploy.yml`
- `README.md`

## Domínio customizado

Com domínio customizado, o site normalmente usa `baseURL` igual a `/`.

Depois de configurar o domínio no GitHub Pages, ajuste o workflow:

```yaml
NUXT_APP_BASE_URL: /
NUXT_PUBLIC_SITE_URL: https://www.seudominio.com
```

Se quiser versionar o domínio no repositório, adicione um arquivo `public/CNAME` com o domínio.

## Criar posts manualmente

Crie um arquivo em `content/blog`, por exemplo:

```text
content/blog/meu-post.md
```

Modelo:

```md
---
title: "Meu post"
description: "Descrição curta para listagem e SEO."
date: "2026-04-22"
cover: "/images/minha-capa.webp"
tags:
  - Nuxt
  - SEO
draft: false
slug: "meu-post"
---

Conteúdo do post em Markdown.
```

Posts com `draft: true` não aparecem na listagem pública nem na página de detalhe.

## Usar Pages CMS

O arquivo `.pages.yml` configura uma coleção `Blog` apontando para `content/blog`.

Campos disponíveis:

- `title`
- `description`
- `date`
- `cover`
- `tags`
- `draft`
- `slug`
- `body`

As mídias sobem para `public/images` e são gravadas no Markdown como caminhos públicos começando com `/images`.

Limitação prática: o slug deve ficar coerente com o nome do arquivo, porque o Nuxt Content gera o caminho público a partir do arquivo em `content/blog`. A configuração atual usa `{fields.slug}.md` ao criar novos posts para manter isso alinhado.

## SEO

As páginas usam `useSeoMeta` e `useHead` para configurar:

- `title`
- `description`
- `ogTitle`
- `ogDescription`
- `ogType`
- `ogImage`
- `twitterCard`
- `canonical`

A home e a listagem usam metadados fixos. A página de post usa o frontmatter do Markdown.

## Site 100% estático

Este projeto não usa API externa para buscar posts e não depende de servidor Node depois do build. Isso é excelente para simplicidade, custo e cache, mas impõe limites:

- Conteúdo novo exige commit e novo build.
- Busca, filtros e paginação avançada precisam ser pré-gerados ou rodar no cliente.
- Formulários e comentários exigem serviço externo ou outra arquitetura.
- Imagens OG dinâmicas precisam ser geradas antes do deploy ou substituídas por imagens estáticas.

## Próximos passos

- sitemap
- robots.txt
- RSS
- paginação
- página de tags
- página de categorias
- busca local
- domínio customizado
- analytics
- imagem OG dinâmica ou estática
- melhora de performance e acessibilidade
