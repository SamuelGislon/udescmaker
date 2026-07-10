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

- Node.js 22 ou uma versão compatível com o Astro 5;
- npm 10 ou superior.

```bash
cd udescmaker
npm ci
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
3. Coloque imagens, PDFs, DOC, ZIP, STL, XLSX e outros anexos no mesmo diretório.
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
videoYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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

Descrição longa do projeto em Markdown.
```

`videoYoutube` é opcional para preservar os conteúdos antigos. Quando informado, são exibidos
somente vídeos com ID válido nos formatos `youtube.com/watch`, `youtu.be` e
`youtube.com/shorts` (incluindo os hosts `www` e `m`). O site converte essas URLs para um embed
em `youtube-nocookie.com`; outros hosts ou formatos não são incorporados.

O campo `relacionados` continua aceito no frontmatter por retrocompatibilidade, mas a vitrine é
calculada automaticamente. Cada categoria em comum vale 5 pontos, cada tag em comum vale 3 e
somente projetos com pontuação positiva são exibidos. Empates são resolvidos pela data mais
recente e, por fim, pelo slug.

Referências de capa, galeria, etapas e anexos devem ser relativas à pasta do projeto, como
`./capa.png` e `./manual.pdf`. Arquivos marcados como `other`, incluindo formatos históricos como
Scratch `.sb3`, também são resolvidos desde que estejam dentro dessa pasta. O corpo após o segundo
delimitador `---` contém a descrição longa em Markdown.

## Segurança do Markdown

O corpo dos projetos aceita Markdown compatível com GitHub, mas não deve depender de HTML bruto.
Durante o build, `rehype-sanitize` aplica uma lista segura de elementos e atributos: scripts,
handlers de evento, URLs com protocolos perigosos e outras construções HTML não permitidas são
descartados antes da geração das páginas. Essa defesa também se aplica aos conteúdos publicados
pelo aplicativo mobile, sem modificar os arquivos Markdown históricos.

## GitHub Pages

- O `astro.config.mjs` usa `base` derivado do nome do repositório durante o build do GitHub Actions.
- O workflow em `.github/workflows/deploy.yml` publica o conteúdo de `dist/` no GitHub Pages.
- Se a branch principal não for `main`, ajuste o gatilho do workflow.
