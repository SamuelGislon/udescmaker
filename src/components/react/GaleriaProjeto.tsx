import { startTransition, useState } from 'react';

interface ItemGaleria {
  src: string;
  alt: string;
}

interface GaleriaProjetoProps {
  itens: ItemGaleria[];
}

export function GaleriaProjeto({ itens }: GaleriaProjetoProps) {
  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const itemAtivo = itens[indiceAtivo] ?? itens[0];

  if (!itemAtivo) {
    return null;
  }

  return (
    <div className="project-gallery">
      <div className="project-gallery__main">
        <img src={itemAtivo.src} alt={itemAtivo.alt} />
      </div>
      <div className="project-gallery__thumbs">
        {itens.map((item, indice) => (
          <button
            className={`project-gallery__thumb ${indice === indiceAtivo ? 'is-active' : ''}`}
            key={`${item.src}-${indice}`}
            onClick={() => {
              startTransition(() => {
                setIndiceAtivo(indice);
              });
            }}
            type="button"
          >
            <img src={item.src} alt={item.alt} />
          </button>
        ))}
      </div>
    </div>
  );
}
