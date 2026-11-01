/**
 * dom.js · Ayudantes mínimos de DOM y de texto.
 * Los datos de las unidades usan una sintaxis tipo Markdown muy acotada:
 *   `código`  → <code>código</code>
 *   **fuerte** → <strong>fuerte</strong>
 *   *cursiva*  → <em>cursiva</em>
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

/** Convierte texto de datos (con `código`, **negrita** y *cursiva*) en HTML seguro. */
export function rich(value = '') {
  // Los segmentos impares son código: no se les aplica negrita ni cursiva.
  return String(value)
    .split('`')
    .map((segment, index) => {
      const safe = escapeHtml(segment);
      if (index % 2 === 1) return `<code>${safe}</code>`;
      return safe
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?=[^*\w]|$)/g, '$1<em>$2</em>');
    })
    .join('');
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
