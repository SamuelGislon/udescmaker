import { startTransition, useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

interface ItemVitrineProjeto {
  titulo: string;
  resumo: string;
  href: string;
  rotulosCategoria: string[];
  nomeAutor: string;
  imagemSrc?: string;
  imagemAlt?: string;
}

interface VitrineProjetosProps {
  itens: ItemVitrineProjeto[];
  cenaSrc: string;
}

export function VitrineProjetos({ itens, cenaSrc }: VitrineProjetosProps) {
  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const [quantidadeCategoriasVisiveis, setQuantidadeCategoriasVisiveis] = useState(1);
  const categoriasRef = useRef<HTMLDivElement | null>(null);
  const medidorCategoriasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (itens.length <= 1) {
      return undefined;
    }

    const idIntervalo = window.setInterval(() => {
      startTransition(() => {
        setIndiceAtivo((indiceAtual) => (indiceAtual + 1) % itens.length);
      });
    }, 5000);

    return () => window.clearInterval(idIntervalo);
  }, [itens.length]);

  if (itens.length === 0) {
    return null;
  }

  const itemAtivo = itens[indiceAtivo];
  const temImagem = Boolean(itemAtivo.imagemSrc);
  const rotulosCategoria = itemAtivo.rotulosCategoria;
  const categoriasVisiveis = rotulosCategoria.slice(0, quantidadeCategoriasVisiveis);

  useEffect(() => {
    if (rotulosCategoria.length <= 1) {
      setQuantidadeCategoriasVisiveis(rotulosCategoria.length || 1);
      return undefined;
    }

    let cancelado = false;

    const recalcularCategoriasVisiveis = () => {
      const container = categoriasRef.current;
      const medidor = medidorCategoriasRef.current;

      if (!container || !medidor) {
        return;
      }

      const larguraDisponivel = container.clientWidth;
      const categoriasMedidas = Array.from(medidor.children) as HTMLElement[];

      if (larguraDisponivel <= 0 || categoriasMedidas.length === 0) {
        return;
      }

      const estilos = window.getComputedStyle(medidor);
      const gap = Number.parseFloat(estilos.columnGap || estilos.gap || '0');

      let larguraAcumulada = 0;
      let visiveis = 0;

      for (const categoria of categoriasMedidas) {
        const larguraCategoria = categoria.getBoundingClientRect().width;
        const larguraTotal = larguraCategoria + (visiveis > 0 ? gap : 0);

        if (visiveis > 0 && larguraAcumulada + larguraTotal > larguraDisponivel) {
          break;
        }

        larguraAcumulada += larguraTotal;
        visiveis += 1;
      }

      if (!cancelado) {
        setQuantidadeCategoriasVisiveis(Math.max(1, visiveis));
      }
    };

    recalcularCategoriasVisiveis();

    const observer = new ResizeObserver(recalcularCategoriasVisiveis);

    if (categoriasRef.current) {
      observer.observe(categoriasRef.current);
    }

    document.fonts?.ready.then(() => {
      recalcularCategoriasVisiveis();
    });

    return () => {
      cancelado = true;
      observer.disconnect();
    };
  }, [rotulosCategoria]);

  function irPara(indice: number) {
    startTransition(() => {
      setIndiceAtivo(indice);
    });
  }

  return (
    <section className="hero-showcase">
      <div className="hero-showcase__media">
        <div className="hero-showcase__frame">
          <img className="hero-showcase__scene" src={cenaSrc} alt="" aria-hidden="true" />
        </div>
      </div>

      <div className="hero-showcase__content">
        <h2>
          Ninguém aprende nada sozinho. O <span style={{ color: '#ae2726' }}>UDESC</span>{' '}
          <span style={{ color: '#134829' }}>Maker</span> nasce para trocar experiências.
        </h2>
        <p>
          Explore projetos feitos por estudantes, professores e pela comunidade. Inspire seu
          espírito criativo para juntos construirmos um futuro mais inovador e colaborativo.
        </p>
        <div className="hero-showcase__highlight-block">
          <div
            className={`hero-showcase__highlight ${
              temImagem ? 'hero-showcase__highlight--with-image' : ''
            }`}
          >
            {temImagem ? (
              <div className="hero-showcase__highlight-media">
                <img
                  src={itemAtivo.imagemSrc}
                  alt={itemAtivo.imagemAlt ?? itemAtivo.titulo}
                  loading="lazy"
                />
              </div>
            ) : null}
            <div className="hero-showcase__highlight-main">
              <div className="hero-showcase__highlight-categories" ref={categoriasRef}>
                {categoriasVisiveis.map((rotuloCategoria) => (
                  <span className="category-pill category-pill--muted" key={rotuloCategoria}>
                    <Icon name="book" size={15} />
                    {rotuloCategoria}
                  </span>
                ))}
              </div>
              <div
                aria-hidden="true"
                className="hero-showcase__highlight-categories hero-showcase__highlight-categories--measure"
                ref={medidorCategoriasRef}
              >
                {rotulosCategoria.map((rotuloCategoria) => (
                  <span className="category-pill category-pill--muted" key={rotuloCategoria}>
                    <Icon name="book" size={15} />
                    {rotuloCategoria}
                  </span>
                ))}
              </div>
              <p className="hero-showcase__highlight-copy">
                <strong className="hero-showcase__highlight-title" title={itemAtivo.titulo}>
                  {itemAtivo.titulo}
                </strong>
                <span className="hero-showcase__highlight-summary" title={itemAtivo.resumo}>
                  {itemAtivo.resumo}
                </span>
              </p>
              <div className="hero-showcase__actions">
                <a className="button button--cta" href={itemAtivo.href}>
                  Ver projeto
                  <Icon name="arrowRight" size={18} />
                </a>
                <span className="hero-showcase__author">
                  <Icon name="user" size={16} />
                  Autor(a): {itemAtivo.nomeAutor}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-showcase__controls">
          <button
            aria-label="Projeto anterior"
            className="hero-showcase__control"
            onClick={() => irPara((indiceAtivo - 1 + itens.length) % itens.length)}
            type="button"
          >
            <Icon name="chevronLeft" size={20} />
          </button>
          <div className="hero-showcase__dots">
            {itens.map((item, indice) => (
              <button
                aria-label={`Ir para ${item.titulo}`}
                className={`hero-showcase__dot ${indice === indiceAtivo ? 'is-active' : ''}`}
                key={item.href}
                onClick={() => irPara(indice)}
                type="button"
              />
            ))}
          </div>
          <button
            aria-label="Próximo projeto"
            className="hero-showcase__control"
            onClick={() => irPara((indiceAtivo + 1) % itens.length)}
            type="button"
          >
            <Icon name="chevronRight" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
