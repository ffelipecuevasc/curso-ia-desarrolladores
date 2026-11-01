/**
 * program-button.js · Botón "Descargar programa".
 * Si el PDF aún no está disponible (PROGRAM_PDF_AVAILABLE = false en
 * data/course.js), se muestra un aviso en lugar de un enlace roto.
 */
import { PROGRAM_PDF, PROGRAM_PDF_AVAILABLE } from '../data/course.js';
import { icon } from '../utils/icons.js';

const LABEL = 'Descargar programa';
const PENDING_LABEL = 'Programa: disponible pronto';

/** Botón para navbar, hero y footer. */
export function programButton({ variant = 'ghost', className = '' } = {}) {
  if (PROGRAM_PDF_AVAILABLE) {
    return `<a class="btn btn--${variant} ${className}" href="${PROGRAM_PDF}" download>${icon('download')}<span>${LABEL}</span></a>`;
  }
  return `<span class="btn btn--ghost btn--disabled ${className}" aria-disabled="true">${icon('hourglass')}<span>${PENDING_LABEL}</span></span>`;
}

/** Variante para el menú móvil. */
export function programMenuItem() {
  if (PROGRAM_PDF_AVAILABLE) {
    return `<a href="${PROGRAM_PDF}" download>${icon('download')}<span>${LABEL}</span></a>`;
  }
  return `<span class="mobile-menu__disabled">${icon('hourglass')}<span>${PENDING_LABEL}</span></span>`;
}
