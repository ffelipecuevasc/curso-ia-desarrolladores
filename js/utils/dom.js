/**
 * dom.js · Ayudantes mínimos de DOM y de texto.
 * Los datos de las unidades usan una sintaxis tipo Markdown muy acotada:
 *   `código`  → <code>código</code>
 *   **fuerte** → <strong>fuerte</strong>
 * Todo lo demás se escapa, así que los archivos de datos nunca inyectan HTML.
 */

export const qs = (selector, root = document) => root.querySelector(selector);
export const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

/** Escapa caracteres especiales de HTML. */
export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/** Convierte texto de datos (con `código` y **negrita**) en HTML seguro. */
export function rich(value = '') {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

/** Crea un elemento a partir de un string HTML (primer nodo). */
export function fromHtml(markup) {
  const template = document.createElement('template');
  template.innerHTML = markup.trim();
  return template.content.firstElementChild;
}

/** Une clases ignorando valores vacíos. */
export const cx = (...classes) => classes.filter(Boolean).join(' ');

/** Atributo opcional: devuelve ` name="value"` o un string vacío. */
export const attr = (name, value) =>
  value === undefined || value === null || value === false ? '' : ` ${name}="${escapeHtml(value)}"`;
