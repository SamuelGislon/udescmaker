const EXPRESSAO_ID_YOUTUBE = /^[A-Za-z0-9_-]{11}$/;

const HOSTS_YOUTUBE = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com']);
const HOSTS_YOUTU_BE = new Set(['youtu.be', 'www.youtu.be']);

function validarIdYoutube(id: string | null | undefined) {
  return id && EXPRESSAO_ID_YOUTUBE.test(id) ? id : undefined;
}

/**
 * Extrai um ID somente dos formatos públicos aceitos pelo aplicativo.
 * Outros hosts, caminhos e protocolos são recusados, mesmo que contenham um
 * parâmetro parecido com um vídeo do YouTube.
 */
export function extrairIdVideoYoutube(valor: string) {
  let url: URL;

  try {
    url = new URL(valor);
  } catch {
    return undefined;
  }

  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password
  ) {
    return undefined;
  }

  const host = url.hostname.toLowerCase();

  if (HOSTS_YOUTU_BE.has(host)) {
    const correspondencia = url.pathname.match(/^\/([^/]+)\/?$/);
    return validarIdYoutube(correspondencia?.[1]);
  }

  if (!HOSTS_YOUTUBE.has(host)) {
    return undefined;
  }

  if (url.pathname === '/watch') {
    return validarIdYoutube(url.searchParams.get('v'));
  }

  const correspondenciaShorts = url.pathname.match(/^\/shorts\/([^/]+)\/?$/);
  return validarIdYoutube(correspondenciaShorts?.[1]);
}

export function criarUrlEmbedYoutube(valor: string | undefined) {
  if (!valor) {
    return undefined;
  }

  const idVideo = extrairIdVideoYoutube(valor);
  return idVideo ? `https://www.youtube-nocookie.com/embed/${idVideo}` : undefined;
}
