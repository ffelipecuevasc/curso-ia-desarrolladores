/**
 * code.js · Bloques de código con resaltado mínimo y botón "Copiar".
 * El resaltado usa solo clases (tok-kw, tok-str, tok-com, tok-num) cuyos
 * colores están en css/components/code.css (DESIGN.md 2.7).
 */
import { escapeHtml } from './dom.js';
import { icon } from './icons.js';

const LANGUAGE_LABELS = {
  bash: 'Terminal',
  json: 'JSON',
  yaml: 'YAML',
  markdown: 'Markdown',
  csharp: 'C#',
  javascript: 'JavaScript',
  sql: 'SQL',
  text: 'Texto',
};

const words = (list) => new RegExp(`\\b(?:${list.join('|')})\\b`, 'y');

/** Reglas por lenguaje: [clase, regex con flag "y" (sticky)]. El orden importa. */
const RULES = {
  bash: [
    ['tok-com', /#[^\n]*/y],
    ['tok-str', /"(?:[^"\\]|\\.)*"|'[^']*'/y],
    ['tok-kw', words(['if', 'then', 'fi', 'else', 'exit', 'echo', 'cd', 'cat', 'grep', 'claude', 'docker', 'dotnet', 'git', 'pip', 'playwright', 'npm', 'npx'])],
    ['tok-num', /(?<=\s)--?[\w-]+/y],
    ['tok-kw', /(?<=^|\s)\/[a-z][\w-]*(?=\s|$)/my], // comandos como /context o /compact
  ],
  json: [
    ['tok-kw', /"(?:[^"\\]|\\.)*"(?=\s*:)/y],
    ['tok-str', /"(?:[^"\\]|\\.)*"/y],
    ['tok-num', /\b(?:true|false|null|-?\d+(?:\.\d+)?)\b/y],
  ],
  yaml: [
    ['tok-com', /#[^\n]*/y],
    ['tok-kw', /[\w-]+(?=:(?:\s|$))/y],
    ['tok-str', /"(?:[^"\\]|\\.)*"|'[^']*'/y],
    ['tok-num', /\b\d+(?:\.\d+)?\b/y],
  ],
  markdown: [
    ['tok-kw', /^#{1,6} [^\n]*/my],
    ['tok-kw', /^(?:name|description|tools|allowed-tools):/my],
    ['tok-com', /^---$/my],
    ['tok-num', /^\s*(?:[-*]|\d+\.)(?= )/my],
    ['tok-str', /`[^`\n]*`/y],
  ],
  csharp: [
    ['tok-com', /\/\/[^\n]*/y],
    ['tok-str', /"(?:[^"\\]|\\.)*"/y],
    ['tok-num', /\[[A-Z]\w*(?:\([^)]*\))?\]/y],
    ['tok-kw', words(['public', 'private', 'void', 'var', 'new', 'return', 'class', 'static', 'decimal', 'int', 'string', 'nameof', 'using', 'namespace'])],
    ['tok-num', /\b\d+(?:\.\d+)?\b/y],
  ],
  javascript: [
    ['tok-com', /\/\/[^\n]*/y],
    ['tok-str', /`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/y],
    ['tok-kw', words(['const', 'let', 'function', 'return', 'export', 'import', 'from', 'default', 'if', 'else', 'new'])],
    ['tok-num', /\b\d+(?:\.\d+)?\b/y],
  ],
  sql: [
    ['tok-com', /--[^\n]*/y],
    ['tok-str', /'[^']*'/y],
    ['tok-kw', /\b(?:select|from|where|count|sum|insert|into|values|create|table|copy|and|or)\b/iy],
    ['tok-num', /\b\d+(?:\.\d+)?\b/y],
  ],
};

/** Devuelve HTML escapado con <span class="tok-…"> para los tokens reconocidos. */
export function highlight(source, language = 'text') {
  const rules = RULES[language];
  if (!rules) return escapeHtml(source);

  let html = '';
  let plain = '';
  let index = 0;

  while (index < source.length) {
    let matched = false;
    for (const [className, regex] of rules) {
      regex.lastIndex = index;
      const match = regex.exec(source);
      if (match && match[0].length > 0) {
        html += escapeHtml(plain) + `<span class="${className}">${escapeHtml(match[0])}</span>`;
        plain = '';
        index += match[0].length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      plain += source[index];
      index += 1;
    }
  }
  return html + escapeHtml(plain);
}

/**
 * Markup de un bloque de código.
 * @param {{lenguaje?: string, contenido: string, titulo?: string}} options
 */
export function codeBlock({ lenguaje = 'text', contenido = '', titulo = '' }) {
  const label = titulo || LANGUAGE_LABELS[lenguaje] || lenguaje;
  return `
    <figure class="code-block" data-code-block>
      <figcaption class="code-block__bar">
        <span class="code-block__name">${escapeHtml(label)}</span>
        <button type="button" class="copy-btn" data-copy aria-label="Copiar código${titulo ? `: ${escapeHtml(titulo)}` : ''}">
          ${icon('copy')}<span>Copiar</span>
        </button>
      </figcaption>
      <pre tabindex="0"><code class="language-${escapeHtml(lenguaje)}">${highlight(contenido, lenguaje)}</code></pre>
    </figure>`;
}

/** Copia texto al portapapeles (con alternativa para contextos sin Clipboard API). */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}

const announce = (message) => {
  const region = document.getElementById('live-region');
  if (!region) return;
  region.textContent = '';
  requestAnimationFrame(() => {
    region.textContent = message;
  });
};

/** Delegación de eventos: un solo listener para todos los botones "Copiar". */
export function initCopyButtons(root = document) {
  root.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-copy]');
    if (!button) return;
    const code = button.closest('[data-code-block]')?.querySelector('code');
    if (!code) return;

    const ok = await copyText(code.textContent);
    const label = button.querySelector('span');
    button.classList.toggle('is-copied', ok);
    label.textContent = ok ? 'Copiado' : 'No se pudo copiar';
    announce(ok ? 'Código copiado al portapapeles' : 'No se pudo copiar el código');
    clearTimeout(button._resetTimer);
    button._resetTimer = setTimeout(() => {
      button.classList.remove('is-copied');
      label.textContent = 'Copiar';
    }, 2000);
  });
}
