/**
 * overview.js · Resumen de unidades: grilla de 10 tarjetas.
 * Cada tarjeta lleva a la unidad en la ruta del curso (aunque esté bloqueada,
 * para mostrar su ubicación y cuándo se abre).
 */
import { UNITS, unitCode } from '../data/units/index.js';
import { COURSE } from '../data/course.js';
import { escapeHtml, qsa } from '../utils/dom.js';
import { formatRange, formatShortDay } from '../utils/dates.js';
import { getUnitDates, lockedMessage, STATUS } from '../utils/schedule.js';
import { statusBadge } from './status-badge.js';
import { progressMarkup } from './progress.js';

const cardMarkup = (unit) => {
  const { startsAt, endsAt } = getUnitDates(unit.id);
  return `
    <li data-reveal>
      <a class="unit-card" href="#${unit.id}" data-overview-card="${unit.id}" aria-describedby="${unit.id}-card-status">
        <div class="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
          <span class="unit-card__number">${unitCode(unit)}</span>
          <span data-card-badge></span>
        </div>
        <h3 class="unit-card__title">${escapeHtml(unit.titulo)}</h3>
        <p class="unit-card__desc">${escapeHtml(unit.descripcionBreve)}</p>
        <p class="unit-card__meta tabular">
          Día ${unit.dia} · ${escapeHtml(unit.bloque)}<br />
          ${formatShortDay(startsAt)} · ${formatRange(startsAt, endsAt)} h
        </p>
        <p class="text-xs text-text-soft m-0" id="${unit.id}-card-status" data-card-lock></p>
      </a>
    </li>`;
};

export function renderOverview(section) {
  section.innerHTML = `
    <div class="container-page">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10">
        <div class="flex flex-col gap-4">
          <p class="kicker kicker--rule">${COURSE.unitsCount} unidades · ${COURSE.days} días · ${COURSE.hours} horas</p>
          <h2 class="section-title" id="unidades-title">Unidades</h2>
          <p class="section-lead">
            Cada unidad dura 3 horas: 85 minutos de cátedra, 15 de receso y 80 de taller.
            Toca una tarjeta para ir a su lugar en la ruta del curso.
          </p>
        </div>
        ${progressMarkup()}
      </div>
      <ol class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-5 list-none m-0 p-0">
        ${UNITS.map(cardMarkup).join('')}
      </ol>
    </div>`;
}

/** Sincroniza badges y estilos con el estado actual. */
export function updateOverview(section, { statuses }) {
  qsa('[data-overview-card]', section).forEach((card) => {
    const id = card.dataset.overviewCard;
    const status = statuses[id];
    if (card.dataset.status === status) return;
    card.dataset.status = status;
    card.className = `unit-card unit-card--${status}`;
    card.querySelector('[data-card-badge]').innerHTML = statusBadge(status);
    card.querySelector('[data-card-lock]').textContent =
      status === STATUS.LOCKED ? lockedMessage(id) : '';
  });
}
