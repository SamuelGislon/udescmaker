import type { NomeIcone } from '../components/react/Icon';

export const IDS_DIFICULDADE = ['iniciante', 'intermediario', 'avancado'] as const;

export type DificuldadeProjeto = (typeof IDS_DIFICULDADE)[number];

export const IDS_CATEGORIA = [
  'arduino',
  'automacao',
  'brinquedos',
  'costura',
  'decoracao',
  'educacao',
  'eletronica',
  'impressao-3d',
  'jardinagem',
  'marcenaria',
  'papelaria',
  'roupa',
  'sustentabilidade'
] as const;

export type CategoriaProjeto = (typeof IDS_CATEGORIA)[number];

export const OPCOES_DIFICULDADE = [
  { id: 'iniciante', label: 'Iniciante' },
  { id: 'intermediario', label: 'Intermediário' },
  { id: 'avancado', label: 'Avançado' }
] as const satisfies ReadonlyArray<{ id: DificuldadeProjeto; label: string }>;

export const OPCOES_CATEGORIA = [
  { id: 'arduino', label: 'Arduino', icon: 'bot' },
  { id: 'automacao', label: 'Automação', icon: 'sparkles' },
  { id: 'brinquedos', label: 'Brinquedos', icon: 'blocks' },
  { id: 'costura', label: 'Costura', icon: 'scissors' },
  { id: 'decoracao', label: 'Decoração', icon: 'palette' },
  { id: 'educacao', label: 'Educação', icon: 'book' },
  { id: 'eletronica', label: 'Eletrônica', icon: 'circuit' },
  { id: 'impressao-3d', label: 'Impressão 3D', icon: 'cube' },
  { id: 'jardinagem', label: 'Jardinagem', icon: 'flower' },
  { id: 'marcenaria', label: 'Marcenaria', icon: 'hammer' },
  { id: 'papelaria', label: 'Papelaria', icon: 'pen' },
  { id: 'roupa', label: 'Roupa', icon: 'shirt' },
  { id: 'sustentabilidade', label: 'Sustentabilidade', icon: 'leaf' }
] as const satisfies ReadonlyArray<{ id: CategoriaProjeto; label: string; icon: NomeIcone }>;

export type IconeCategoriaProjeto = (typeof OPCOES_CATEGORIA)[number]['icon'];

export const OPCOES_IDADE = [3, 6, 10, 12, 14, 16] as const;

export const OPCOES_DURACAO = [
  { id: 'ate-30', label: 'Até 30 min' },
  { id: '31-60', label: '30 min a 1 h' },
  { id: '61-120', label: '1 a 2 h' },
  { id: '121-240', label: '2 a 4 h' },
  { id: 'mais-240', label: 'Mais de 4 h' }
] as const;

export type OpcaoDuracao = (typeof OPCOES_DURACAO)[number]['id'];

export const OPCOES_ORDENACAO = [
  { id: 'recentes', label: 'Mais recentes' },
  { id: 'duracao', label: 'Mais rápidos' },
  { id: 'dificuldade', label: 'Mais fáceis' }
] as const;

export type OpcaoOrdenacao = (typeof OPCOES_ORDENACAO)[number]['id'];

export const MAPA_CATEGORIA = Object.fromEntries(
  OPCOES_CATEGORIA.map((categoria) => [categoria.id, categoria])
) as Record<CategoriaProjeto, (typeof OPCOES_CATEGORIA)[number]>;

export const MAPA_DIFICULDADE = Object.fromEntries(
  OPCOES_DIFICULDADE.map((dificuldade) => [dificuldade.id, dificuldade])
) as Record<DificuldadeProjeto, (typeof OPCOES_DIFICULDADE)[number]>;

export function formatarDuracao(duracaoMinutos: number) {
  if (duracaoMinutos < 60) {
    return `${duracaoMinutos} min`;
  }

  const horas = Math.floor(duracaoMinutos / 60);
  const minutos = duracaoMinutos % 60;

  if (minutos === 0) {
    return `${horas}h`;
  }

  return `${horas}h${minutos.toString().padStart(2, '0')}`;
}

export function formatarData(data: Date) {
  return new Intl.DateTimeFormat('pt-BR').format(data);
}

export function correspondeFaixaDuracao(duracaoMinutos: number, faixa: OpcaoDuracao | null) {
  if (!faixa) {
    return true;
  }

  if (faixa === 'ate-30') {
    return duracaoMinutos <= 30;
  }

  if (faixa === '31-60') {
    return duracaoMinutos >= 31 && duracaoMinutos <= 60;
  }

  if (faixa === '61-120') {
    return duracaoMinutos >= 61 && duracaoMinutos <= 120;
  }

  if (faixa === '121-240') {
    return duracaoMinutos >= 121 && duracaoMinutos <= 240;
  }

  return duracaoMinutos > 240;
}
