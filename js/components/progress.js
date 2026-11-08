/**
 * progress.js · Contador de la ruta del curso.
 * Con TODAS_LAS_UNIDADES_ABIERTAS: dice qué pasa ahora (en curso, próxima o
 * curso completado) y la barra muestra las unidades completadas.
 * Sin el interruptor: "Unidades abiertas: X de 10", como antes.
 */
import { TODAS_LAS_UNIDADES_ABIERTAS } from '../config/units.config.js';
import { getUnit, unitCode } from '../data/units/index.js';
import { escapeHtml } from '../utils/dom.js';
import { formatDay, formatTime } from '../utils/dates.js';
import { icon } from '../utils/icons.js';
import { getUnitDates } from '../utils/schedule.js';

export const progressMarkup = () => `
  <div class="course-progress flex flex-col gap-2 w-full max-w-sm" data-course-progress>
    <p class="text-sm text-text-muted m-0" data-progress-text>Unidades abiertas: <strong class="text-heading tabular">0 de 10</strong></p>
    <div class="course-progress__track" role="progressbar" aria-label="Unidades abiertas" aria-valuemin="0" aria-valuemax="10" aria-valuenow="0">
      <span class="course-progress__fill" style="width:0%"></span>
    </div>
  </div>`;

const unitLabel = (id) => {
  const unit = getUnit(id);
  return `${unitCode(unit)} · ${unit.tituloCorto}`;
};

/** Texto del estado actual, a partir de getCourseState(). */
function statusText({ current, next, doneCount, total }) {
  if (current) {
    return `${icon('schedule')}<span>En curso: <strong class="text-heading">${escapeHtml(unitLabel(current))}</strong></span>`;
  }
  if (next) {
    const { startsAt } = getUnitDates(next);
    return `${icon('calendar')}<span>Próxima: <strong class="text-heading">${escapeHtml(unitLabel(next))}</strong> · <span class="tabular">${escapeHtml(formatDay(startsAt))}, ${formatTime(startsAt)} h</span></span>`;
  }
  return `${icon('checkCircle')}<span><strong class="text-heading">Curso completado</strong> · <span class="tabular">${doneCount} de ${total}</span> unidades</span>`;
}

export function updateProgress(root, state) {
  const { unlockedCount, doneCount, total } = state;
  const count = TODAS_LAS_UNIDADES_ABIERTAS ? doneCount : unlockedCount;
  const noun = TODAS_LAS_UNIDADES_ABIERTAS ? 'completadas' : 'abiertas';
  root.querySelectorAll('[data-course-progress]').forEach((element) => {
    const text = element.querySelector('[data-progress-text]');
    if (TODAS_LAS_UNIDADES_ABIERTAS) {
      text.classList.add('course-progress__status');
      text.innerHTML = statusText(state);
    } else {
      text.innerHTML = `Unidades abiertas: <strong class="text-heading tabular">${unlockedCount} de ${total}</strong>`;
    }
    const bar = element.querySelector('[role="progressbar"]');
    bar.setAttribute('aria-label', `Unidades ${noun}`);
    bar.setAttribute('aria-valuenow', String(count));
    bar.setAttribute('aria-valuemax', String(total));
    bar.setAttribute('aria-valuetext', `${count} de ${total} unidades ${noun}`);
    element.querySelector('.course-progress__fill').style.width = `${(count / total) * 100}%`;
  });
}
