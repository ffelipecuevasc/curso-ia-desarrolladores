/**
 * program-button.js · Botón "Descargar programa" (solo en el hero).
 * Si el PDF aún no está disponible (PROGRAM_PDF_AVAILABLE = false en
 * data/course.js), se muestra un aviso en lugar de un enlace roto.
 */
import { PROGRAM_PDF, PROGRAM_PDF_AVAILABLE } from '../data/course.js';
import { icon } from '../utils/icons.js';

const LABEL = 'Descargar programa';

/** Botón del hero. */
export function programButton({ variant = 'ghost', className = '' } = {}) {
  if (PROGRAM_PDF_AVAILABLE) {
    return `<a class="btn btn--${variant} ${className}" href="${PROGRAM_PDF}" download>${icon('download')}<span>${LABEL}</span></a>`;
  }
  // Sin PDF no se muestra nada: un botón deshabilitado repetido es ruido.
  return '';
}
