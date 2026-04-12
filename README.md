# UDESC Maker

Plataforma web de projetos maker construída com Astro + React, publicada no GitHub Pages e alimentada por arquivos Markdown com frontmatter YAML.

## Tecnologias

- Astro para rotas estáticas e composição de páginas
- React para busca, filtros, ordenação, cards dinâmicos, hero e galeria
- TypeScript no front-end
- GitHub Actions para build e deploy automáticos
- GitHub Pages para publicação

## Rodando localmente

Os comandos abaixo devem ser executados dentro da pasta `udescmaker/`:

```bash
cd udescmaker
npm install
npm run dev
```

Build de produção:

```bash
npm run build
```

Validação de tipos e conteúdo:

```bash
npm run check
```

## Como adicionar um novo projeto

1. Crie um diretório em `src/content/projects/<slug-do-projeto>/`.
2. Adicione o arquivo `index.md` com frontmatter YAML e o corpo do tutorial.
3. Coloque imagens, PDFs, STL e outros anexos no mesmo diretório.
4. Abra um pull request com o novo projeto.
5. Quando o PR for aprovado e entrar na branch `main`, o GitHub Actions recompila o site e publica no GitHub Pages.

## Modelo de frontmatter

```yaml
---
titulo: "Nome do projeto"
resumo: "Resumo curto do projeto."
publicadoEm: 2026-03-29
autor:
  nome: "Nome da pessoa autora"
  github: "usuario-opcional"
dificuldade: "iniciante"
idadeMinima: 10
duracaoMinutos: 90
categorias: ["educacao", "sustentabilidade"]
tags: ["maker", "exemplo"]
destaque: false
capa:
  src: "./capa.svg"
  alt: "Descrição da imagem principal"
galeria:
  - src: "./galeria-01.svg"
    alt: "Descrição da imagem adicional"
materiais:
  - "Item 1"
ferramentas:
  - "Ferramenta 1"
passos:
  - titulo: "Passo 1"
    corpo: "Explique o que fazer."
    imagem: "./galeria-01.svg"
dicas:
  - tom: "info"
    texto: "Dica importante."
baixaveis:
  - rotulo: "Manual em PDF"
    arquivo: "./manual.pdf"
    tipo: "pdf"
arquivos:
  - rotulo: "Arquivo complementar"
    arquivo: "./modelo.stl"
    tipo: "stl"
relacionados: []
---
```

## GitHub Pages

- O `astro.config.mjs` usa `base` derivado do nome do repositório durante o build do GitHub Actions.
- O workflow em `.github/workflows/deploy.yml` publica o conteúdo de `dist/` no GitHub Pages.
- Se a branch principal não for `main`, ajuste o gatilho do workflow.
