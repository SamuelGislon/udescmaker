import Fuse from 'fuse.js';
import { startTransition, useDeferredValue, useState } from 'react';
import {
  OPCOES_CATEGORIA,
  OPCOES_DIFICULDADE,
  OPCOES_DURACAO,
  OPCOES_IDADE,
  correspondeFaixaDuracao,
  type CategoriaProjeto,
  type DificuldadeProjeto,
  type OpcaoDuracao,
  type OpcaoOrdenacao
} from '../../data/taxonomia';
import type { DadosBuscaProjeto } from '../../lib/projetos';
import { Icon } from './Icon';
import { CartaoProjeto } from './CartaoProjeto';

interface ExplorarProjetosProps {
  projetos: DadosBuscaProjeto[];
  buscaInicial?: string;
}

interface EstadoFiltros {
  textoBusca: string;
  termosTag: string;
  idadeMinima: number | null;
  dificuldades: DificuldadeProjeto[];
  duracao: OpcaoDuracao | null;
  categorias: CategoriaProjeto[];
  ordenarPor: OpcaoOrdenacao;
}

const RESULTADOS_POR_LOTE = 8;

function criarEstadoInicialFiltros(buscaInicial: string): EstadoFiltros {
  return {
    textoBusca: buscaInicial,
    termosTag: '',
    idadeMinima: null,
    dificuldades: [],
    duracao: null,
    categorias: [],
    ordenarPor: 'recentes'
  };
}

function alternarItemLista<T extends string>(listaAtual: T[], valor: T) {
  return listaAtual.includes(valor)
    ? listaAtual.filter((item) => item !== valor)
    : [...listaAtual, valor];
}

function formatarTotalResultados(total: number) {
  return `${total} projeto${total === 1 ? '' : 's'} encontrado${total === 1 ? '' : 's'}`;
}

function formatarFaixaEtaria(idade: number) {
  return `${idade}+`;
}

export function ExplorarProjetos({ projetos, buscaInicial = '' }: ExplorarProjetosProps) {
  const estadoInicial = criarEstadoInicialFiltros(buscaInicial);

  const [filtrosRascunho, setFiltrosRascunho] = useState<EstadoFiltros>(estadoInicial);
  const [filtrosAplicados, setFiltrosAplicados] = useState<EstadoFiltros>(estadoInicial);
  const [quantidadeVisivel, setQuantidadeVisivel] = useState(RESULTADOS_POR_LOTE);
  const [mostrarTodasCategorias, setMostrarTodasCategorias] = useState(false);

  const buscaDiferida = useDeferredValue(filtrosAplicados.textoBusca);

  const buscador = new Fuse(projetos, {
    ignoreLocation: true,
    threshold: 0.32,
    keys: [
      { name: 'titulo', weight: 0.35 },
      { name: 'resumo', weight: 0.2 },
      { name: 'tags', weight: 0.2 },
      { name: 'textoBusca', weight: 0.25 }
    ]
  });

  const termosTags = filtrosAplicados.termosTag
    .split(',')
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);

  const projetosBuscados = buscaDiferida
    ? buscador.search(buscaDiferida).map((resultado) => resultado.item)
    : [...projetos];

  const projetosFiltrados = projetosBuscados
    .filter((projeto) =>
      filtrosAplicados.idadeMinima ? projeto.idadeMinima <= filtrosAplicados.idadeMinima : true
    )
    .filter((projeto) =>
      filtrosAplicados.dificuldades.length > 0
        ? filtrosAplicados.dificuldades.includes(projeto.dificuldade)
        : true
    )
    .filter((projeto) => correspondeFaixaDuracao(projeto.duracaoMinutos, filtrosAplicados.duracao))
    .filter((projeto) =>
      filtrosAplicados.categorias.length > 0
        ? filtrosAplicados.categorias.some((categoria) => projeto.categorias.includes(categoria))
        : true
    )
    .filter((projeto) =>
      termosTags.length > 0
        ? termosTags.every(
            (tag) =>
              projeto.tags.some((item) => item.toLowerCase().includes(tag)) ||
              projeto.textoBusca.includes(tag)
          )
        : true
    )
    .sort((esquerda, direita) => {
      if (filtrosAplicados.ordenarPor === 'titulo') {
        return esquerda.titulo.localeCompare(direita.titulo, 'pt-BR');
      }

      if (filtrosAplicados.ordenarPor === 'duracao') {
        return esquerda.duracaoMinutos - direita.duracaoMinutos;
      }

      return direita.publicadoEmISO.localeCompare(esquerda.publicadoEmISO);
    });

  const projetosVisiveis = projetosFiltrados.slice(0, quantidadeVisivel);
  const haMais = quantidadeVisivel < projetosFiltrados.length;
  const totalResultadosLabel = formatarTotalResultados(projetosFiltrados.length);

  const categoriasVisiveis = mostrarTodasCategorias
    ? OPCOES_CATEGORIA
    : OPCOES_CATEGORIA.slice(0, 6);

  function aplicarFiltros() {
    startTransition(() => {
      setFiltrosAplicados(filtrosRascunho);
      setQuantidadeVisivel(RESULTADOS_POR_LOTE);
    });
  }

  function limparFiltros() {
    startTransition(() => {
      setFiltrosRascunho(estadoInicial);
      setFiltrosAplicados(estadoInicial);
      setQuantidadeVisivel(RESULTADOS_POR_LOTE);
    });
  }

  return (
    <div className="explore-layout">
      <aside className="filters-panel">
        <div className="filters-panel__header">
          <h2>Buscar projeto</h2>
        </div>

        <div className="filters-panel__group">
          <label className="filters-panel__label" htmlFor="textoBusca">
            Busque por título, tags ou conteúdo
          </label>
          <div className="filters-panel__search">
            <Icon name="search" size={18} />
            <input
              id="textoBusca"
              onChange={(event) =>
                setFiltrosRascunho((atual) => ({ ...atual, textoBusca: event.target.value }))
              }
              placeholder="Busque por título, tags ou conteúdo"
              type="search"
              value={filtrosRascunho.textoBusca}
            />
          </div>
        </div>

        <div className="filters-panel__group">
          <label className="filters-panel__label" htmlFor="termosTag">
            Tags ou palavras-chave
          </label>
          <input
            className="filters-panel__input"
            id="termosTag"
            onChange={(event) =>
              setFiltrosRascunho((atual) => ({ ...atual, termosTag: event.target.value }))
            }
            placeholder="Digite palavras-chave separadas por vírgula"
            type="text"
            value={filtrosRascunho.termosTag}
          />
        </div>

        <div className="filters-panel__group">
          <h3>Idade mínima</h3>
          <div className="choice-row choice-row--compact" role="group" aria-label="Filtrar por idade mínima">
            <button
              className={`choice-chip choice-chip--filter choice-chip--compact ${
                filtrosRascunho.idadeMinima === null ? 'is-active' : ''
              }`}
              onClick={() =>
                setFiltrosRascunho((atual) => ({
                  ...atual,
                  idadeMinima: null
                }))
              }
              type="button"
            >
              Todas
            </button>
            {OPCOES_IDADE.map((idade) => (
              <button
                className={`choice-chip choice-chip--filter choice-chip--compact ${
                  filtrosRascunho.idadeMinima === idade ? 'is-active' : ''
                }`}
                key={idade}
                onClick={() =>
                  setFiltrosRascunho((atual) => ({
                    ...atual,
                    idadeMinima: idade
                  }))
                }
                type="button"
              >
                {formatarFaixaEtaria(idade)}
              </button>
            ))}
          </div>
        </div>

        <div className="filters-panel__group">
          <h3>Nível de dificuldade</h3>
          <div
            className="choice-row choice-row--fill"
            role="group"
            aria-label="Filtrar por nível de dificuldade"
          >
            {OPCOES_DIFICULDADE.map((dificuldade) => (
              <button
                className={`choice-chip choice-chip--filter choice-chip--wide ${
                  filtrosRascunho.dificuldades.includes(dificuldade.id) ? 'is-active' : ''
                }`}
                key={dificuldade.id}
                onClick={() =>
                  setFiltrosRascunho((atual) => ({
                    ...atual,
                    dificuldades: alternarItemLista(atual.dificuldades, dificuldade.id)
                  }))
                }
                type="button"
              >
                {dificuldade.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filters-panel__group">
          <h3>Tempo necessário</h3>
          <div className="radio-list radio-list--inline" role="radiogroup" aria-label="Filtrar por tempo necessário">
            {OPCOES_DURACAO.map((duracao) => (
              <label className="radio-list__item" key={duracao.id}>
                <input
                  checked={filtrosRascunho.duracao === duracao.id}
                  name="duracao"
                  onChange={() =>
                    setFiltrosRascunho((atual) => ({
                      ...atual,
                      duracao: duracao.id
                    }))
                  }
                  type="radio"
                />
                <span>{duracao.label}</span>
              </label>
            ))}
            <label className="radio-list__item">
              <input
                checked={filtrosRascunho.duracao === null}
                name="duracao"
                onChange={() =>
                  setFiltrosRascunho((atual) => ({
                    ...atual,
                    duracao: null
                  }))
                }
                type="radio"
              />
              <span>Todos</span>
            </label>
          </div>
        </div>

        <div className="filters-panel__group">
          <h3>Categorias</h3>
          <div className="choice-grid choice-grid--categories">
            {categoriasVisiveis.map((categoria) => (
              <button
                className={`choice-chip choice-chip--filter ${
                  filtrosRascunho.categorias.includes(categoria.id) ? 'is-active' : ''
                }`}
                key={categoria.id}
                onClick={() =>
                  setFiltrosRascunho((atual) => ({
                    ...atual,
                    categorias: alternarItemLista(atual.categorias, categoria.id)
                  }))
                }
                type="button"
              >
                <Icon name={categoria.icon} size={16} />
                {categoria.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="choice-chip choice-chip--filter choice-chip--toggle"
            onClick={() => setMostrarTodasCategorias((prev) => !prev)}
          >
            {mostrarTodasCategorias ? 'Menos categorias' : 'Mais categorias'}
          </button>
        </div>

        <div className="filters-panel__actions">
          <button className="button button--cta" onClick={aplicarFiltros} type="button">
            Aplicar filtros
          </button>
          <button className="button button--ghost" onClick={limparFiltros} type="button">
            Limpar filtros
          </button>
        </div>
      </aside>

      <section className="results-panel">
        <div className="results-panel__topbar">
          <p>{totalResultadosLabel}</p>
        </div>

        <div className="project-grid project-grid--explore">
          {projetosVisiveis.map((projeto) => (
            <CartaoProjeto key={projeto.slug} projeto={projeto} />
          ))}
        </div>
      </section>
    </div>
  );
}
