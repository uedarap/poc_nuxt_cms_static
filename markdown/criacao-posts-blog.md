<!--
  Documento de apoio editorial para manter o fluxo de criacao de posts claro.
  Este arquivo fica fora de content/blog para nao ser tratado como uma publicacao pelo Nuxt Content.
-->

## Guia de criacao e manutencao de posts do blog

Este projeto usa arquivos Markdown em `content/blog` como fonte dos posts. Cada arquivo `.md` tem duas partes:

1. **Front matter**: bloco inicial entre `---`, com os metadados do post.
2. **Conteudo**: texto do artigo em Markdown, renderizado na pagina do blog.

<!--
  A estrutura abaixo acompanha o schema de content.config.ts e os campos configurados no Pages CMS.
-->

## Onde criar novos posts

Crie novos arquivos em:

```txt
content/blog
```

O nome do arquivo deve seguir o `slug` do post:

```txt
content/blog/meu-novo-post.md
```

O post ficara disponivel em:

```txt
/blog/meu-novo-post
```

## Modelo de post

Use este modelo como base para uma nova publicacao:

```md
---
title: "Titulo do post"
description: "Resumo curto usado nos cards, SEO e compartilhamento."
date: "2026-05-13"
cover: "/images/nome-da-imagem.png"
tags:
  - Tecnologia
  - Operacao
draft: false
slug: "titulo-do-post"
---

Introducao do artigo.

## Primeiro subtitulo

Texto do conteudo.

![Descricao da imagem](/images/nome-da-imagem.png)
```

<!--
  Os campos obrigatorios e opcionais abaixo evitam erro de build e explicam o impacto visual de cada metadado.
-->

## Campos do front matter

`title`: titulo exibido no card, na pagina do artigo e nos metadados de SEO.

`description`: resumo exibido na listagem e no topo do artigo.

`date`: data da publicacao no formato `AAAA-MM-DD`. A listagem ordena os posts pela data mais recente.

`cover`: imagem de capa do card e do hero do artigo. Se estiver vazio, o blog usa uma imagem padrao.

`tags`: lista de temas do post. Elas aparecem como etiquetas na listagem e no artigo.

`draft`: quando `true`, o post nao aparece no blog. Use `false` para publicar.

`slug`: texto usado para montar o nome do arquivo no Pages CMS e a URL do post.

## Como criar um post pelo Pages CMS

1. Acesse o Pages CMS conectado ao repositorio.
2. Abra a colecao **Blog**.
3. Crie uma nova entrada.
4. Preencha titulo, descricao, data, capa, tags, rascunho e slug.
5. Escreva o conteudo no campo de texto rico.
6. Salve a alteracao para o CMS gravar o Markdown no Git.

<!--
  O Pages CMS usa .pages.yml; por isso o campo slug tambem define o nome do arquivo criado.
-->

## Como criar um post manualmente

1. Copie o modelo acima.
2. Crie um arquivo `.md` em `content/blog`.
3. Use o mesmo valor no nome do arquivo e no campo `slug`.
4. Ajuste `draft: true` enquanto o texto ainda estiver em revisao.
5. Troque para `draft: false` quando estiver pronto para publicar.

Exemplo:

```txt
Arquivo: content/blog/automacao-portuaria.md
Slug: automacao-portuaria
URL: /blog/automacao-portuaria
```

## Como definir um post em destaque

A pagina do blog trata como destaque o primeiro arquivo Markdown cujo nome comece com `destaque`.

Exemplo:

```txt
content/blog/destaque-automacao-portuaria.md
```

Se nao existir nenhum arquivo com esse prefixo, o blog usa o post mais recente como destaque.

## Imagens

As imagens publicas devem ficar dentro de:

```txt
public/images
```

No Markdown, use o caminho a partir da raiz publica:

```md
![Descricao da imagem](/images/minha-imagem.png)
```

Tambem e possivel usar imagens especificas do blog, como:

```md
![Descricao da capa](/blog/images/blog-cover-cms.svg)
```

## Boas praticas

Use slugs curtos, em minusculas e separados por hifen.

Mantenha a descricao curta, porque ela aparece nos cards e no compartilhamento.

Evite publicar posts sem capa quando o artigo precisar de forte apelo visual.

Use `draft: true` para textos incompletos.

Revise imagens, links e titulo antes de publicar.

## Checklist rapido antes de publicar

- O arquivo esta em `content/blog`.
- O `slug` combina com o nome do arquivo.
- A data esta no formato `AAAA-MM-DD`.
- `draft` esta como `false`.
- A imagem de capa existe no caminho informado.
- O conteudo tem titulo, subtitulos e imagens com texto alternativo.
