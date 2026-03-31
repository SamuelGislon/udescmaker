import { getCollection, type CollectionEntry } from 'astro:content';
import {
  MAPA_CATEGORIA,
  MAPA_DIFICULDADE,
  formatarData,
  formatarDuracao,
  type CategoriaProjeto,
  type DificuldadeProjeto,
  type IconeCategoriaProjeto
} from '../data/taxonomia';
import { comCaminhoBase } from './site';

type EntradaProjeto = CollectionEntry<'projects'>;

const modulosArquivosProjeto = import.meta.glob('../content/projects/**/*.{pdf,stl,zip,svg,png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url'
});

export interface LinkArquivoProjeto {
  rotulo: string;
  tipo: string;
  url: string;
}

export interface ItemGaleriaProjeto {
  src: string;
  alt: string;
}

export interface EtapaProjeto {
  titulo: string;
  corpo: string;
  imagem?: string;
}

export interface DadosCartaoProjeto {
  slug: string;
  href: string;
  titulo: string;
  resumo: string;
  publicadoEmISO: string;
  publicadoEmLabel: string;
  nomeAutor: string;
  dificuldade: DificuldadeProjeto;
  dificuldadeLabel: string;
  idadeMinima: number;
  duracaoMinutos: number;
  duracaoLabel: string;
  categorias: CategoriaProjeto[];
  categoriasLabel: string[];
  categoriaPrincipal: CategoriaProjeto;
  categoriaPrincipalLabel: string;
  iconeCategoriaPrincipal: IconeCategoriaProjeto;
  tags: string[];
  capaSrc: string;
  capaAlt: string;
  destaque: boolean;
  textoBusca: string;
}

export interface DadosDetalheProjeto extends DadosCartaoProjeto {
  entrada: EntradaProjeto;
  galeria: ItemGaleriaProjeto[];
  materiais: string[];
  ferramentas: string[];
  passos: EtapaProjeto[];
  dicas: Array<{ tom: 'info' | 'warning' | 'success'; texto: string }>;
  baixaveis: LinkArquivoProjeto[];
  arquivos: LinkArquivoProjeto[];
  relacionadosConfigurados: string[];
  projetosRelacionados: DadosCartaoProjeto[];
}

export type DadosBuscaProjeto = Omit<DadosCartaoProjeto, 'destaque'>;

function removerMarkdown(textoMarkdown: string) {
  return textoMarkdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/[>#*_~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function obterPastaProjeto(entrada: EntradaProjeto) {
  return entrada.id.replace(/\/index(?:\.md|\.mdx)?$/, '');
}

function obterSlugProjeto(entrada: EntradaProjeto) {
  return obterPastaProjeto(entrada).split('/').pop() ?? entrada.id;
}

function resolverArquivoProjeto(entrada: EntradaProjeto, arquivo: string) {
  const arquivoNormalizado = arquivo.replace(/^\.\//, '');
  const chave = `../content/projects/${obterPastaProjeto(entrada)}/${arquivoNormalizado}`;
  const resolvido = modulosArquivosProjeto[chave];

  if (!resolvido || typeof resolvido !== 'string') {
    throw new Error(`Arquivo complementar não encontrado para ${entrada.id}: ${arquivo}`);
  }

  return resolvido;
}

function removerDuplicadosGaleria(itens: ItemGaleriaProjeto[]) {
  const visitados = new Set<string>();

  return itens.filter((item) => {
    if (visitados.has(item.src)) {
      return false;
    }

    visitados.add(item.src);
    return true;
  });
}

function montarTextoBusca(entrada: EntradaProjeto) {
  const { data } = entrada;

  return [
    data.titulo,
    data.resumo,
    data.autor.nome,
    data.tags.join(' '),
    data.materiais.join(' '),
    data.ferramentas.join(' '),
    data.passos.map((passo) => `${passo.titulo} ${passo.corpo}`).join(' '),
    data.dicas.map((dica) => dica.texto).join(' '),
    removerMarkdown(entrada.body)
  ]
    .join(' ')
    .toLowerCase();
}

function serializarProjeto(entrada: EntradaProjeto): DadosDetalheProjeto {
  const slug = obterSlugProjeto(entrada);
  const categoriaPrincipal = entrada.data.categorias[0];
  const galeria = removerDuplicadosGaleria([
    {
      src: resolverArquivoProjeto(entrada, entrada.data.capa.src),
      alt: entrada.data.capa.alt
    },
    ...entrada.data.galeria.map((item) => ({
      src: resolverArquivoProjeto(entrada, item.src),
      alt: item.alt
    }))
  ]);

  return {
    slug,
    href: comCaminhoBase(`/projetos/${slug}/`),
    titulo: entrada.data.titulo,
    resumo: entrada.data.resumo,
    publicadoEmISO: entrada.data.publicadoEm.toISOString(),
    publicadoEmLabel: formatarData(entrada.data.publicadoEm),
    nomeAutor: entrada.data.autor.nome,
    dificuldade: entrada.data.dificuldade,
    dificuldadeLabel: MAPA_DIFICULDADE[entrada.data.dificuldade].label,
    idadeMinima: entrada.data.idadeMinima,
    duracaoMinutos: entrada.data.duracaoMinutos,
    duracaoLabel: formatarDuracao(entrada.data.duracaoMinutos),
    categorias: entrada.data.categorias,
    categoriasLabel: entrada.data.categorias.map((categoria) => MAPA_CATEGORIA[categoria].label),
    categoriaPrincipal,
    categoriaPrincipalLabel: MAPA_CATEGORIA[categoriaPrincipal].label,
    iconeCategoriaPrincipal: MAPA_CATEGORIA[categoriaPrincipal].icon,
    tags: entrada.data.tags,
    capaSrc: resolverArquivoProjeto(entrada, entrada.data.capa.src),
    capaAlt: entrada.data.capa.alt,
    destaque: entrada.data.destaque,
    textoBusca: montarTextoBusca(entrada),
    entrada,
    galeria,
    materiais: entrada.data.materiais,
    ferramentas: entrada.data.ferramentas,
    passos: entrada.data.passos.map((passo) => ({
      titulo: passo.titulo,
      corpo: passo.corpo,
      imagem: passo.imagem ? resolverArquivoProjeto(entrada, passo.imagem) : undefined
    })),
    dicas: entrada.data.dicas,
    baixaveis: entrada.data.baixaveis.map((item) => ({
      rotulo: item.rotulo,
      tipo: item.tipo,
      url: resolverArquivoProjeto(entrada, item.arquivo)
    })),
    arquivos: entrada.data.arquivos.map((item) => ({
      rotulo: item.rotulo,
      tipo: item.tipo,
      url: resolverArquivoProjeto(entrada, item.arquivo)
    })),
    relacionadosConfigurados: entrada.data.relacionados,
    projetosRelacionados: []
  };
}

function pontuarProjetosRelacionados(atual: DadosDetalheProjeto, candidato: DadosDetalheProjeto) {
  if (atual.slug === candidato.slug) {
    return -1;
  }

  const categoriasCompartilhadas = candidato.categorias.filter((categoria) =>
    atual.categorias.includes(categoria)
  ).length;
  const tagsCompartilhadas = candidato.tags.filter((tag) => atual.tags.includes(tag)).length;
  const pesoRecencia =
    new Date(candidato.publicadoEmISO).getTime() / new Date('2026-01-01').getTime();

  return categoriasCompartilhadas * 10 + tagsCompartilhadas * 3 + pesoRecencia;
}

function anexarProjetosRelacionados(projetos: DadosDetalheProjeto[]) {
  return projetos.map((projeto) => {
    const projetosRelacionados =
      projeto.relacionadosConfigurados.length > 0
        ? projeto.relacionadosConfigurados
            .map((slug) => projetos.find((candidato) => candidato.slug === slug))
            .filter((candidato): candidato is DadosDetalheProjeto => Boolean(candidato))
            .map((candidato) => paraDadosCartao(candidato))
        : projetos
            .filter((candidato) => candidato.slug !== projeto.slug)
            .map((candidato) => ({
              candidato,
              pontuacao: pontuarProjetosRelacionados(projeto, candidato)
            }))
            .sort((esquerda, direita) => direita.pontuacao - esquerda.pontuacao)
            .slice(0, 3)
            .map(({ candidato }) => paraDadosCartao(candidato));

    return {
      ...projeto,
      projetosRelacionados
    };
  });
}

function paraDadosCartao(projeto: DadosDetalheProjeto): DadosCartaoProjeto {
  return {
    slug: projeto.slug,
    href: projeto.href,
    titulo: projeto.titulo,
    resumo: projeto.resumo,
    publicadoEmISO: projeto.publicadoEmISO,
    publicadoEmLabel: projeto.publicadoEmLabel,
    nomeAutor: projeto.nomeAutor,
    dificuldade: projeto.dificuldade,
    dificuldadeLabel: projeto.dificuldadeLabel,
    idadeMinima: projeto.idadeMinima,
    duracaoMinutos: projeto.duracaoMinutos,
    duracaoLabel: projeto.duracaoLabel,
    categorias: projeto.categorias,
    categoriasLabel: projeto.categoriasLabel,
    categoriaPrincipal: projeto.categoriaPrincipal,
    categoriaPrincipalLabel: projeto.categoriaPrincipalLabel,
    iconeCategoriaPrincipal: projeto.iconeCategoriaPrincipal,
    tags: projeto.tags,
    capaSrc: projeto.capaSrc,
    capaAlt: projeto.capaAlt,
    destaque: projeto.destaque,
    textoBusca: projeto.textoBusca
  };
}

let cacheProjetos: DadosDetalheProjeto[] | undefined;

export async function listarTodosProjetos() {
  if (!cacheProjetos) {
    const entradas = await getCollection('projects');
    const projetosSerializados = entradas
      .map(serializarProjeto)
      .sort((esquerda, direita) => direita.publicadoEmISO.localeCompare(esquerda.publicadoEmISO));

    cacheProjetos = anexarProjetosRelacionados(projetosSerializados);
  }

  return cacheProjetos;
}

export async function listarProjetosEmDestaque(limite = 3) {
  const projetos = await listarTodosProjetos();
  return projetos.filter((projeto) => projeto.destaque).slice(0, limite);
}

export async function buscarProjetoPorSlug(slug: string) {
  const projetos = await listarTodosProjetos();
  return projetos.find((projeto) => projeto.slug === slug);
}

export async function listarProjetosBusca(): Promise<DadosBuscaProjeto[]> {
  const projetos = await listarTodosProjetos();
  return projetos.map((projeto) => paraDadosCartao(projeto));
}
