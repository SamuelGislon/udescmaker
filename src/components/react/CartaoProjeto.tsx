import type { DadosBuscaProjeto } from '../../lib/projetos';
import { MAPA_CATEGORIA } from '../../data/taxonomia';
import { CategoriasProjeto } from './CategoriasProjeto';
import { Icon } from './Icon';

interface CartaoProjetoProps {
  projeto: DadosBuscaProjeto;
}

export function CartaoProjeto({ projeto }: CartaoProjetoProps) {
  const categorias = projeto.categorias.map((categoria, indice) => ({
    id: categoria,
    icon: MAPA_CATEGORIA[categoria].icon,
    label: projeto.categoriasLabel[indice] ?? MAPA_CATEGORIA[categoria].label
  }));

  return (
    <article className="project-card project-card--interactive">
      <a className="project-card__image-link" href={projeto.href}>
        <img className="project-card__image" src={projeto.capaSrc} alt={projeto.capaAlt} loading="lazy" />
      </a>
      <div className="project-card__body">
        <div className="project-card__eyebrow project-card__eyebrow--stacked">
          <CategoriasProjeto categorias={categorias} />
          <span className="category-pill category-pill--muted">
            <Icon name="sparkles" size={15} />
            {projeto.dificuldadeLabel}
          </span>
        </div>
        <div className="project-card__content">
          <h3>
            <a href={projeto.href}>{projeto.titulo}</a>
          </h3>
          <p>{projeto.resumo}</p>
        </div>
        <div className="project-card__footer">
          <div className="project-card__meta">
            <span>
              <Icon name="user" size={15} />
              {projeto.nomeAutor}
            </span>
            <span>
              <Icon name="calendar" size={15} />
              {projeto.publicadoEmLabel}
            </span>
          </div>
          <a className="button button--cta project-card__button" href={projeto.href}>
            Ver Projeto
          </a>
        </div>
      </div>
    </article>
  );
}
