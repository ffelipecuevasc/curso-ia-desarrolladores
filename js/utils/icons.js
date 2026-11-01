/**
 * icons.js · Íconos SVG en línea.
 * - Material Symbols Light (Iconify, Apache 2.0) desde icons-data.js.
 * - Marcas de Claude y Claude Code con su color oficial (#D97757),
 *   que solo se usa en estas marcas (DESIGN.md 2.5).
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

const CLAUDE_PATH =
  'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z';

const CLAUDE_CODE_PATH =
  'M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z';

/** Logo de Claude. `decorative` = true lo oculta a lectores de pantalla. */
export function claudeLogo({ className = 'size-6', decorative = false } = {}) {
  const a11y = decorative ? 'aria-hidden="true" focusable="false"' : 'role="img" aria-label="Claude"';
  return `<svg fill="#D97757" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="${className}" ${a11y}>${decorative ? '' : '<title>Claude</title>'}<path d="${CLAUDE_PATH}"/></svg>`;
}

/** Robot de Claude Code. */
export function claudeCodeLogo({ className = 'size-6', decorative = true } = {}) {
  const a11y = decorative ? 'aria-hidden="true" focusable="false"' : 'role="img" aria-label="Claude Code"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="${className}" ${a11y}>${decorative ? '' : '<title>Claude Code</title>'}<path clip-rule="evenodd" fill-rule="evenodd" fill="#D97757" d="${CLAUDE_CODE_PATH}"/></svg>`;
}
