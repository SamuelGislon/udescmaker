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
  const [quantidadeCategoriasVisiveis, setQuantidadeCategoriasVisiveis] = useState(2);
  const categoriasRef = useRef<HTMLDivElement | null>(null);
  const medidorCategoriasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (itens.length <= 1) return;

    const idIntervalo = window.setInterval(() => {
      startTransition(() => {
        setIndiceAtivo((indiceAtual) => (indiceAtual + 1) % itens.length);
      });
    }, 5000);

    return () => window.clearInterval(idIntervalo);
  }, [itens.length]);

  if (itens.length === 0) return null;

  const itemAtivo = itens[indiceAtivo];
  const temImagem = Boolean(itemAtivo.imagemSrc);
  const rotulosCategoria = itemAtivo.rotulosCategoria;
  const categoriasVisiveis = rotulosCategoria.slice(0, quantidadeCategoriasVisiveis);

  useEffect(() => {
    if (rotulosCategoria.length <= 2) {
      setQuantidadeCategoriasVisiveis(rotulosCategoria.length || 1);
      return;
    }

    let cancelado = false;

    const recalcularCategoriasVisiveis = () => {
      const container = categoriasRef.current;
      const medidor = medidorCategoriasRef.current;

      if (!container || !medidor) return;

      const larguraDisponivel = container.clientWidth;
      const categoriasMedidas = Array.from(medidor.children) as HTMLElement[];

      let larguraAcumulada = 0;
      let visiveis = 0;

      for (const categoria of categoriasMedidas) {
        const largura = categoria.getBoundingClientRect().width + 8;

        if (larguraAcumulada + largura > larguraDisponivel) break;

        larguraAcumulada += largura;
        visiveis++;
      }

      if (!cancelado) {
        setQuantidadeCategoriasVisiveis(Math.max(1, visiveis));
      }
    };

    recalcularCategoriasVisiveis();

    const observer = new ResizeObserver(recalcularCategoriasVisiveis);
    if (categoriasRef.current) observer.observe(categoriasRef.current);

    return () => {
      cancelado = true;
      observer.disconnect();
    };
  }, [rotulosCategoria]);

  function irPara(indice: number) {
    startTransition(() => setIndiceAtivo(indice));
  }

  return (
    <section className="hero-showcase" style={{ padding: '40px 0' }}>
      <div className="hero-showcase__media">
        <div className="hero-showcase__frame">
          <img
            className="hero-showcase__scene"
            src={cenaSrc}
            alt=""
            aria-hidden="true"
            style={{ borderRadius: '16px' }}
          />
        </div>
      </div>

      <div className="hero-showcase__content">
        <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>
          Ninguém aprende nada sozinho. O <span style={{ color: '#ae2726' }}>UDESC</span>{' '}
          <span style={{ color: '#134829' }}>Maker</span> nasce para trocar experiências.
        </h2>

        <p style={{ marginBottom: '20px', opacity: 0.8 }}>
          Explore projetos feitos por estudantes, professores e pela comunidade.
        </p>

        <div className="hero-showcase__highlight-block">
          <div
            className={`hero-showcase__highlight ${
              temImagem ? 'hero-showcase__highlight--with-image' : ''
            }`}
            style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '16px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
            }}
          >
            {temImagem && (
              <div className="hero-showcase__highlight-media">
                <img
                  src={itemAtivo.imagemSrc}
                  alt={itemAtivo.imagemAlt ?? itemAtivo.titulo}
                  style={{
                    width: '100%',
                    height: '160px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                  }}
                />
              </div>
            )}

            <div className="hero-showcase__highlight-main">
              <div
                className="hero-showcase__highlight-categories"
                ref={categoriasRef}
                style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}
              >
                {categoriasVisiveis.map((rotuloCategoria) => (
                  <span
                    key={rotuloCategoria}
                    style={{
                      background: '#e6f4ea',
                      color: '#134829',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '12px',
                    }}
                  >
                    {rotuloCategoria}
                  </span>
                ))}
              </div>

              <div
                aria-hidden="true"
                ref={medidorCategoriasRef}
                style={{ position: 'absolute', visibility: 'hidden' }}
              >
                {rotulosCategoria.map((rotuloCategoria) => (
                  <span key={rotuloCategoria}>{rotuloCategoria}</span>
                ))}
              </div>

              <p>
                <strong style={{ fontSize: '16px' }}>{itemAtivo.titulo}</strong>
                <br />
                <span style={{ fontSize: '14px', opacity: 0.7 }}>
                  {itemAtivo.resumo}
                </span>
              </p>

              <div style={{ marginTop: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <a
                  href={itemAtivo.href}
                  style={{
                    background: '#1f7a4c',
                    color: '#fff',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  Ver projeto
                  <Icon name="arrowRight" size={16} />
                </a>

                <span style={{ fontSize: '13px', opacity: 0.6 }}>
                  {itemAtivo.nomeAutor}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-showcase__controls" style={{ marginTop: '20px' }}>
          <button onClick={() => irPara((indiceAtivo - 1 + itens.length) % itens.length)}>
            <Icon name="chevronLeft" />
          </button>

          {itens.map((_, i) => (
            <button key={i} onClick={() => irPara(i)}>
              •
            </button>
          ))}

          <button onClick={() => irPara((indiceAtivo + 1) % itens.length)}>
            <Icon name="chevronRight" />
          </button>
        </div>
      </div>
    </section>
  );
}