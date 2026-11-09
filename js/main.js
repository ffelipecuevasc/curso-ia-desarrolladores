/**
 * main.js · Punto de entrada del sitio.
 * Renderiza cada componente en su contenedor [data-component] y coordina
 * el recálculo de estados de las unidades cada 60 segundos.
 * Cada componente se inicia por separado: si uno falla, el resto sigue.
 *
 * Parámetros de URL:
 *   ?preview=all   Vista previa del instructor (todas las unidades abiertas).
 *   ?now=<ISO>     Solo para pruebas: simula la hora actual.
 *   ?debug         Valida los datos (descripciones ≤ 100 caracteres, slugs, fuentes…).
 */
import { REFRESH_INTERVAL_MS } from './config/units.config.js';
import { UNITS } from './data/units/index.js';
import { renderNavbar } from './components/navbar.js';
import { renderHero, updateHeroStatus } from './components/hero.js';
import { renderTimeline, updateTimeline, handleHash } from './components/timeline.js';
import { initConceptModal } from './components/concept-modal.js';
import { initLiteEmbeds } from './components/unit-panel.js';
import { updateProgress } from './components/progress.js';
import { renderInstructor } from './components/instructor.js';
import { renderFooter } from './components/footer.js';
import { initCopyButtons } from './utils/code.js';
import { formatDay, formatTime, getNow, isSimulatedNow } from './utils/dates.js';
import { getCourseState, isPreview } from './utils/schedule.js';
import { icon } from './utils/icons.js';
import { initReveal } from './utils/reveal.js';
import { validateData, validateMaterialFiles } from './utils/validate.js';

const unitIds = UNITS.map((unit) => unit.id);
const params = new URLSearchParams(window.location.search);

const mount = (name, render) => {
  const element = document.querySelector(`[data-component="${name}"]`);
  if (!element) return null;
  try {
    render(element);
  } catch (error) {
    console.error(`[main] Error al renderizar «${name}»`, error);
  }
  return element;
};

mount('navbar', renderNavbar);
const hero = mount('hero', renderHero);
const timeline = mount('timeline', renderTimeline);
mount('instructor', renderInstructor);
mount('footer', renderFooter);

initConceptModal();
initCopyButtons();
initLiteEmbeds();

/** Recalcula estados y actualiza todo lo que depende de la hora. */
function refresh() {
  const state = getCourseState(unitIds, getNow());
  const safely = (label, fn) => {
    try {
      fn();
    } catch (error) {
      console.error(`[main] Error al actualizar «${label}»`, error);
    }
  };
  if (hero) safely('hero', () => updateHeroStatus(hero, state));
  if (timeline) safely('timeline', () => updateTimeline(timeline, state));
  safely('progress', () => updateProgress(document, state));
  return state;
}

refresh();
setInterval(refresh, REFRESH_INTERVAL_MS);
// Los temporizadores de pestañas en segundo plano se frenan: recalcular al volver.
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) refresh();
});
window.addEventListener('focus', refresh);

// Deep links (#u03, #u02/concepto/plan-mode). Sin hash, la página parte arriba:
// el botón del hero lleva a la clase de hoy cuando el alumno lo decide.
handleHash({ initial: true });
window.addEventListener('hashchange', () => handleHash());

initReveal();

// Aviso discreto en la vista previa del instructor o con hora simulada.
if (isPreview || isSimulatedNow) {
  const now = getNow();
  const notice = document.createElement('p');
  notice.className = 'preview-notice';
  notice.setAttribute('role', 'note');
  notice.innerHTML = `${icon('preview')}<span>${[
    isPreview ? 'Vista previa del instructor' : '',
    isSimulatedNow ? `Hora simulada: ${formatDay(now)}, ${formatTime(now)} h` : '',
  ]
    .filter(Boolean)
    .join(' · ')}</span>`;
  document.body.prepend(notice);
}

// Validación de datos en desarrollo: agrega ?debug a la URL.
if (params.has('debug')) {
  validateData(UNITS);
  validateMaterialFiles(UNITS);
}
