import { useEffect, useRef, useState } from 'react';
import type { NomeIcone } from './Icon';
import { Icon } from './Icon';

interface CategoriaProjetoItem {
  id: string;
  icon: NomeIcone;
  label: string;
}

interface CategoriasProjetoProps {
  categorias: CategoriaProjetoItem[];
}

export function CategoriasProjeto({ categorias }: CategoriasProjetoProps) {
  const [quantidadeCategoriasVisiveis, setQuantidadeCategoriasVisiveis] = useState(
    categorias.length > 0 ? 1 : 0
  );
  const categoriasRef = useRef<HTMLDivElement | null>(null);
  const medidorCategoriasRef = useRef<HTMLDivElement | null>(null);
  const categoriasVisiveis = categorias.slice(0, quantidadeCategoriasVisiveis);
  const assinaturaCategorias = categorias.map((categoria) => categoria.id).join('|');

  useEffect(() => {
    if (categorias.length <= 1) {
      setQuantidadeCategoriasVisiveis(categorias.length);
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
  }, [assinaturaCategorias, categorias.length]);

  return (
    <div className="project-card__categories-shell">
      <div
        className="project-card__categories project-card__categories--limited"
        aria-label="Categorias do projeto"
        ref={categoriasRef}
      >
        {categoriasVisiveis.map((categoria) => (
          <span className="category-pill category-pill--muted" key={categoria.id}>
            <Icon name={categoria.icon} size={15} />
            {categoria.label}
          </span>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="project-card__categories project-card__categories--measure"
        ref={medidorCategoriasRef}
      >
        {categorias.map((categoria) => (
          <span className="category-pill category-pill--muted" key={categoria.id}>
            <Icon name={categoria.icon} size={15} />
            {categoria.label}
          </span>
        ))}
      </div>
    </div>
  );
}
