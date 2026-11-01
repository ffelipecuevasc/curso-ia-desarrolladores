/**
 * concept-modal.js · Modal de concepto con <dialog> nativo.
 * - Se cierra con Esc, con el botón de cerrar o con clic en el fondo.
 * - Devuelve el foco al chip que lo abrió.
 * - Navega al concepto anterior/siguiente de la misma unidad.
 * - Deep link: #u02/concepto/plan-mode
 */
import { getUnit, unitCode, unitConcepts } from '../data/units/index.js';
import { escapeHtml, rich } from '../utils/dom.js';
import { icon } from '../utils/icons.js';
import { codeBlock } from '../utils/code.js';

let dialog;
let returnFocusTo = null;
let current = { unitId: null, index: 0 };

const conceptHash = (unitId, slug) => `#${unitId}/concepto/${slug}`;

function exampleMarkup(example) {
  if (!example) return '';
  if (example.tipo === 'codigo') return codeBlock(example);
  return `<div class="example-text">${rich(example.contenido)}</div>`;
}

function render() {
  const unit = getUnit(current.unitId);
  const concepts = unitConcepts(unit);
  const concept = concepts[current.index];
  const isRequired = current.index < unit.conceptos.obligatorios.length;
  const coreNumber = current.index - unit.conceptos.obligatorios.length + 1;
  const prev = concepts[current.index - 1];
  const next = concepts[current.index + 1];

  dialog.innerHTML = `
    <header class="concept-modal__head">
      <div>
        <p class="kicker">${unitCode(unit)} · ${isRequired ? 'Concepto obligatorio' : `Concepto fundamental · C${coreNumber}`}</p>
        <h2 class="concept-modal__title" id="concept-modal-title">${escapeHtml(concept.titulo)}</h2>
      </div>
      <button type="button" class="btn btn--ghost btn--icon" data-modal-close aria-label="Cerrar">
        ${icon('close', { className: 'size-6' })}
      </button>
    </header>

    <div class="concept-modal__body" tabindex="-1">
      <p class="concept-modal__lead">${rich(concept.resumen)}</p>
      ${concept.explicacion.map((paragraph) => `<p>${rich(paragraph)}</p>`).join('')}
      ${concept.ejemplo ? `<h3 class="content-title mt-6">Ejemplo</h3>${exampleMarkup(concept.ejemplo)}` : ''}
      ${
        concept.nota
          ? `<aside class="concept-modal__note">
               <p class="concept-modal__note-title">${icon('info')}Estándar abierto vs. implementación de Claude</p>
               <p class="text-text">${rich(concept.nota)}</p>
             </aside>`
          : ''
      }
      <p>
        <a class="source-link" href="${escapeHtml(concept.fuente.url)}" target="_blank" rel="noopener noreferrer">
          ${icon('external')}Profundizar en la fuente oficial: ${escapeHtml(concept.fuente.titulo)}
          <span class="visually-hidden">(se abre en una pestaña nueva)</span>
        </a>
      </p>
    </div>

    <footer class="concept-modal__foot">
      <button type="button" class="concept-modal__nav" data-modal-step="-1" ${prev ? '' : 'disabled'}
        aria-label="${prev ? `Concepto anterior: ${escapeHtml(prev.titulo)}` : 'Sin concepto anterior'}">
        ${icon('chevronLeft')}<span>${prev ? escapeHtml(prev.titulo) : ''}</span>
      </button>
      <span class="concept-modal__count tabular" aria-live="polite">${current.index + 1} de ${concepts.length}</span>
      <button type="button" class="concept-modal__nav" data-modal-step="1" ${next ? '' : 'disabled'}
        aria-label="${next ? `Concepto siguiente: ${escapeHtml(next.titulo)}` : 'Sin concepto siguiente'}">
        <span>${next ? escapeHtml(next.titulo) : ''}</span>${icon('chevronRight')}
      </button>
    </footer>`;

  history.replaceState(null, '', conceptHash(unit.id, concept.slug));
}

/** Abre el modal de un concepto. Devuelve false si no existe. */
export function openConcept(unitId, slug, trigger = null) {
  const unit = getUnit(unitId);
  if (!unit || !dialog) return false;
  const index = unitConcepts(unit).findIndex((concept) => concept.slug === slug);
  if (index === -1) return false;

  current = { unitId, index };
  returnFocusTo = trigger ?? document.activeElement;
  render();
  if (!dialog.open) dialog.showModal();
  dialog.querySelector('[data-modal-close]').focus();
  return true;
}

function step(delta) {
  const total = unitConcepts(getUnit(current.unitId)).length;
  const nextIndex = current.index + delta;
  if (nextIndex < 0 || nextIndex >= total) return;
  current.index = nextIndex;
  render();
  // Mantener el foco en el mismo control de navegación (o en cerrar si quedó deshabilitado).
  const sameButton = dialog.querySelector(`[data-modal-step="${delta}"]:not([disabled])`);
  (sameButton ?? dialog.querySelector('[data-modal-close]')).focus();
}

export function initConceptModal() {
  dialog = document.getElementById('concept-modal');
  if (!dialog) return;

  dialog.addEventListener('click', (event) => {
    // Clic en el fondo: el target es el propio <dialog>, fuera de su contenido.
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) dialog.close();
      return;
    }
    if (event.target.closest('[data-modal-close]')) dialog.close();
    const stepButton = event.target.closest('[data-modal-step]');
    if (stepButton) step(Number(stepButton.dataset.modalStep));
  });

  // Flechas izquierda/derecha para navegar entre conceptos (fuera de bloques de código).
  dialog.addEventListener('keydown', (event) => {
    if (event.target.closest('pre')) return;
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  });

  dialog.addEventListener('close', () => {
    history.replaceState(null, '', `#${current.unitId}`);
    // Si el chip original ya no existe (p. ej., se re-renderizó), buscar uno equivalente.
    const fallback = document.querySelector(
      `[data-concept="${current.unitId}/${unitConcepts(getUnit(current.unitId))[current.index].slug}"]`,
    );
    const target = returnFocusTo?.isConnected ? returnFocusTo : fallback;
    target?.focus();
    returnFocusTo = null;
  });

  // Delegación: cualquier chip [data-concept="u02/plan-mode"] abre el modal.
  document.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-concept]');
    if (!chip) return;
    const [unitId, slug] = chip.dataset.concept.split('/');
    openConcept(unitId, slug, chip);
  });
}
