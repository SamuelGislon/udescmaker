export function comCaminhoBase(caminho: string) {
  const urlBase = import.meta.env.BASE_URL ?? '/';
  const baseNormalizada = urlBase.endsWith('/') ? urlBase : `${urlBase}/`;
  const caminhoNormalizado = caminho.replace(/^\/+/, '');
  return `${baseNormalizada}${caminhoNormalizado}`;
}
