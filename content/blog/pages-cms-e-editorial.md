---
title: "Edição editorial com Pages CMS"
description: "Como o Pages CMS entra como camada de edição para arquivos Markdown do próprio repositório."
date: "2026-04-18"
cover: "/blog/images/blog-cover-cms.svg"
tags:
  - CMS
  - Conteúdo
  - Git
draft: false
slug: "pages-cms-e-editorial"
---

O Pages CMS usa a configuração `.pages.yml` para entender quais arquivos podem ser editados e quais campos aparecem no formulário.

## Fluxo sugerido

1. O editor acessa o Pages CMS conectado ao repositório.
2. Cria ou edita um post em `content/blog`.
3. O CMS salva a alteração no Git.
4. O GitHub Actions publica uma nova versão estática no GitHub Pages.

Esse modelo evita backend em produção e mantém o conteúdo auditável no histórico do repositório.

![Teste Web](https://i.pinimg.com/564x/0b/f9/33/0bf9330d30535065fdeb463720d6f3c7.jpg)
![Teste](/blog/images/blog-cover-cms.svg)