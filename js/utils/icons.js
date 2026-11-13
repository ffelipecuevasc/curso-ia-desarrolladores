/**
 * icons.js · Íconos SVG en línea.
 * - Material Symbols Light (Iconify, Apache 2.0) desde icons-data.js.
 * - Marcas de Claude y Claude Code con su color oficial (#D97757),
 *   que solo se usa en estas marcas (DESIGN.md 2.5).
 * - Logo oficial de LinkedIn (#0a66c2), solo en el enlace del instructor.
 * - Wordmark de Anthropic (currentColor, sin color propio), solo en la tarjeta del cuestionario final.
 * Los SVG originales también están en assets/icons/.
 */
import { ICONS } from './icons-data.js';

/**
 * Devuelve un <svg> en línea con currentColor.
 * Sin `label` es decorativo (aria-hidden). Con `label` es una imagen con nombre.
 */
export function icon(name, { className = 'size-5', label = '' } = {}) {
  const body = ICONS[name];
  if (!body) {
    console.warn(`[icons] Ícono desconocido: ${name}`);
    return '';
  }
  const a11y = label
    ? `role="img" aria-label="${label}"`
    : 'aria-hidden="true" focusable="false"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="${className}" ${a11y}>${body}</svg>`;
}

/**
 * Íconos de archivo con colores propios (no usan currentColor), cargados como <img>.
 * Excepción de color autorizada por el desarrollador (pendiente de sumarla a DESIGN.md 2.5, junto a las
 * marcas): el ícono oficial de PDF conserva su rojo en ambos temas y NO se recolorea. Para sumar otro, guarda el SVG tal cual
 * en assets/icons/ y regístralo aquí con el tamaño (px) que se reserva para evitar saltos de layout.
 *
 * Logos oficiales de lenguajes (apuntes de la Unidad 5): misma excepción de color, también pendiente de
 * sumar a DESIGN.md 2.5. Son marcas de terceros: se guardan tal cual y NO se recolorean. Van como <img> y no
 * en línea porque 'lang-python' usa ids de gradiente (a, b) que chocarían con otros SVG de la página.
 * Tamaño proporcional al viewBox, con el lado mayor en 32 px (PHP, horizontal, en 40 × 20).
 */
export const ICON_FILES = {
  'pdf-presentacion': { src: 'assets/icons/pdf-presentacion.svg', width: 39, height: 48 },
  'lang-csharp': { src: 'assets/icons/lang-csharp.svg', width: 28, height: 32 },
  'lang-java': { src: 'assets/icons/lang-java.svg', width: 24, height: 32 },
  'lang-javascript': { src: 'assets/icons/lang-javascript.svg', width: 32, height: 32 },
  'lang-php': { src: 'assets/icons/lang-php.svg', width: 40, height: 20 },
  'lang-python': { src: 'assets/icons/lang-python.svg', width: 32, height: 32 },
  'lang-delphi': { src: 'assets/icons/lang-delphi.svg', width: 32, height: 32 },
};

/** <img> decorativo de un ícono de ICON_FILES: el texto vecino ya describe el contenido. */
export function iconImage(name, { className = '' } = {}) {
  const file = ICON_FILES[name];
  if (!file) {
    console.warn(`[icons] Ícono de archivo desconocido: ${name}`);
    return '';
  }
  return `<img src="${file.src}" width="${file.width}" height="${file.height}" alt="" aria-hidden="true" decoding="async" class="${className}">`;
}

const CLAUDE_PATH =
  'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z';

const CLAUDE_CODE_PATH =
  'M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z';

/** Logo de Claude. `decorative` = true lo oculta a lectores de pantalla. */
export function claudeLogo({ className = 'size-6', decorative = false } = {}) {
  const a11y = decorative ? 'aria-hidden="true" focusable="false"' : 'role="img" aria-label="Claude"';
  return `<svg fill="#D97757" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="${className}" ${a11y}>${decorative ? '' : '<title>Claude</title>'}<path d="${CLAUDE_PATH}"/></svg>`;
}

const ANTHROPIC_PATH =
  'M38.247 15.874L29.553 2.338H24.86v19.337h4.002V8.139l8.694 13.536h4.693V2.338h-4.003v13.536zm7.313-9.807h6.487v15.608h4.14V6.067h6.487v-3.73H45.56v3.73zm33.686 3.978h-9.109V2.338h-4.14v19.337h4.14v-7.9h9.109v7.9h4.14V2.338h-4.14v7.707zm13.39-3.978h5.108c2.043 0 3.12.746 3.12 2.155 0 1.408-1.077 2.154-3.12 2.154h-5.107v-4.31zm12.37 2.155c0-3.647-2.679-5.884-7.068-5.884h-9.443v19.337h4.142v-7.57h4.61l4.142 7.57h4.583l-4.586-8.146c2.302-.885 3.62-2.75 3.62-5.307zm12.686 9.91c-3.257 0-5.244-2.32-5.244-6.104 0-3.84 1.987-6.16 5.244-6.16 3.23 0 5.189 2.32 5.189 6.16 0 3.784-1.96 6.105-5.189 6.105zm0-16.132c-5.575 0-9.522 4.144-9.522 10.028 0 5.828 3.947 9.972 9.522 9.972 5.547 0 9.466-4.144 9.466-9.972C127.158 6.144 123.24 2 117.692 2zm22.59 8.929h-5.109V6.067h5.11c2.043 0 3.12.829 3.12 2.43 0 1.603-1.077 2.432-3.12 2.432zm.194-8.591h-9.445v19.337h4.142v-7.017h5.303c4.39 0 7.07-2.32 7.07-6.16 0-3.84-2.68-6.16-7.07-6.16zm35.108 12.839c-.718 1.878-2.153 2.956-4.113 2.956-3.257 0-5.244-2.32-5.244-6.105 0-3.84 1.987-6.16 5.244-6.16 1.96 0 3.395 1.077 4.113 2.955h4.388C178.896 4.68 175.667 2 171.472 2c-5.576 0-9.523 4.144-9.523 10.028 0 5.828 3.947 9.972 9.522 9.972 4.223 0 7.453-2.707 8.529-6.823h-4.416zm-26.39-12.84l7.705 19.338h4.225L153.42 2.338h-4.225zM9.277 14.024l2.636-6.796 2.637 6.796H9.276zm.428-11.685L2 21.675h4.307l1.576-4.06h8.06l1.575 4.06h4.307L14.121 2.338H9.704z';

/**
 * Wordmark de Anthropic (marca de su titular). Va en línea, no como <img>, porque usa `currentColor`:
 * hereda el color del texto y se ve bien en ambos temas. El original está en assets/icons/anthropic.svg.
 * `decorative` = true (por defecto) lo oculta a lectores de pantalla: el texto vecino ya nombra el contenido.
 */
export function anthropicWordmark({ className = 'h-4 w-auto', decorative = true } = {}) {
  const a11y = decorative ? 'aria-hidden="true" focusable="false"' : 'role="img" aria-label="Anthropic"';
  return `<svg fill="currentColor" fill-rule="evenodd" viewBox="0 0 182 24" xmlns="http://www.w3.org/2000/svg" class="${className}" ${a11y}>${decorative ? '' : '<title>Anthropic</title>'}<path d="${ANTHROPIC_PATH}"/></svg>`;
}

/** Robot de Claude Code. */
export function claudeCodeLogo({ className = 'size-6', decorative = true } = {}) {
  const a11y = decorative ? 'aria-hidden="true" focusable="false"' : 'role="img" aria-label="Claude Code"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="${className}" ${a11y}>${decorative ? '' : '<title>Claude Code</title>'}<path clip-rule="evenodd" fill-rule="evenodd" fill="#D97757" d="${CLAUDE_CODE_PATH}"/></svg>`;
}

/** Logo oficial de LinkedIn con colores de marca fijos. Solo en el enlace del instructor (DESIGN.md 2.5). */
export function linkedinLogo({ className = 'size-6', decorative = true } = {}) {
  const a11y = decorative ? 'aria-hidden="true" focusable="false"' : 'role="img" aria-label="LinkedIn"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" class="${className}" ${a11y}>${decorative ? '' : '<title>LinkedIn</title>'}<circle cx="512" cy="512" r="512" style="fill:#0a66c2"/><path d="M693.05 693.16h-76v-119c0-28.39-.58-64.92-39.59-64.92-39.61 0-45.66 30.89-45.66 62.82v121.1h-76V448.38h73v33.37h1c10.2-19.24 35-39.54 72-39.54 77 0 91.21 50.66 91.21 116.6v134.35Zm-323-278.28a44.12 44.12 0 1 1 44.12-44.14 44.07 44.07 0 0 1-44.09 44.14Zm38.09 278.28H332V448.38h76.18ZM731.06 256h-437.2c-20.93 0-37.86 16.54-37.86 37v439c0 20.43 16.93 37 37.86 37H731c20.9 0 38-16.52 38-37V293c0-20.41-17.1-37-38-37Z" style="fill:#fff"/></svg>`;
}
