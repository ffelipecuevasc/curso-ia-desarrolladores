/**
 * timeline.js · Ruta del curso (sección principal).
 * - Línea de tiempo vertical por día, con dos nodos (mañana y tarde).
 * - Hilo lateral de entregables del caso integrador (U01 → U10).
 * - Acordeón accesible por unidad; el contenido se genera al abrirla.
 * - Estados recalculados cada 60 s sin recargar (ver main.js).
 * - Deep links: #u03 abre la unidad; #u02/concepto/plan-mode abre el modal.
 */
import { COURSE } from '../data/course.js';
import { getUnit, UNITS, unitCode } from '../data/units/index.js';
import { escapeHtml, qs } from '../utils/dom.js';
import { icon } from '../utils/icons.js';
import { formatDay, formatRange } from '../utils/dates.js';
import { getUnitDates, isUnlocked, lockedMessage, STATUS, STATUS_META } from '../utils/schedule.js';
import { statusBadge } from './status-badge.js';
import { progressMarkup } from './progress.js';
import { TODAS_LAS_UNIDADES_ABIERTAS } from '../config/units.config.js';
import { indexMarkup, initIndexSpy, stripMarkup, updateIndex } from './unit-index.js';
import { initTabs, selectTab, unitBodyMarkup } from './unit-panel.js';
import { openConcept } from './concept-modal.js';

const statuses = {};
const expanded = new Set();
const collapsedByUser = new Set();
let section;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollToElement = (element) =>
  element.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });

/* ---------------------------------------------------------------- Markup */

const deliverableRail = (unit, position) => {
  const classes = ['deliverable-rail', position].filter(Boolean).join(' ');
  if (!unit) return `<div class="${classes}" aria-hidden="true"></div>`;
  const next = unit.entregable.alimentaA ? getUnit(unit.entregable.alimentaA) : null;
  return `
    <div class="${classes}">
      <div class="deliverable-item">
        <span class="deliverable-item__node" aria-hidden="true"></span>
        <div>
          <p class="deliverable-item__label">Entregable ${unitCode(unit)}</p>
          <p class="deliverable-item__name">${escapeHtml(unit.entregable.nombre)}</p>
          <p class="deliverable-item__feeds">${
            next ? `Alimenta a <a href="#${next.id}">${unitCode(next)}</a>` : 'Cierre del caso integrador'
          }</p>
        </div>
      </div>
    </div>`;
};

const unitRow = (unit, position) => `
  <li class="timeline-row">
    <div class="timeline-rail"><span class="timeline-node" data-node="${unit.id}" aria-hidden="true"></span></div>
    <article class="unit" id="${unit.id}" data-unit="${unit.id}" aria-labelledby="${unit.id}-title"></article>
    ${deliverableRail(unit, position)}
  </li>`;

const dayRow = (day, firstUnit, position) => `
  <li class="timeline-row">
    <div class="timeline-rail"><span class="timeline-day-marker" aria-hidden="true">D${day}</span></div>
    <h3 class="timeline-day-title pt-1 pb-2" id="dia-${day}">Día ${day} <span class="text-text-soft text-lg font-sans font-normal">· ${formatDay(getUnitDates(firstUnit.id).startsAt)}</span></h3>
    ${deliverableRail(null, position)}
  </li>`;

const breakRow = () => `
  <li class="timeline-row" aria-hidden="true">
    <div class="timeline-rail"></div>
    <p class="timeline-break">${escapeHtml(COURSE.lunch)}</p>
    ${deliverableRail(null, '')}
  </li>`;

function timelineRows() {
  const lastId = UNITS.at(-1).id;
  return COURSE.schedule
    .map(({ day, units }, dayIndex) => {
      const [morning, afternoon] = units.map(getUnit);
      const railPosition = (unit) => (unit.id === 'u01' ? 'is-first' : unit.id === lastId ? 'is-last' : '');
      return [
        dayRow(day, morning, dayIndex === 0 ? 'is-before-first' : ''),
        unitRow(morning, railPosition(morning)),
        breakRow(),
        unitRow(afternoon, railPosition(afternoon)),
      ].join('');
    })
    .join('');
}

const legend = () => `
  <ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Estados de una unidad">
    ${Object.keys(STATUS_META).map((status) => `<li>${statusBadge(status)}</li>`).join('')}
  </ul>`;

export function renderTimeline(element) {
  section = element;
  section.innerHTML = `
    <div class="container-page">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-8">
        <div class="flex flex-col gap-4">
          <p class="kicker kicker--rule">Caso integrador · ${escapeHtml(COURSE.integrator)}</p>
          <h2 class="section-title" id="ruta-title">Ruta del curso</h2>
          <p class="section-lead">
            Cinco días, dos unidades por día. Cada unidad dura 3 horas (85 minutos de clase,
            15 de receso y 80 de taller)${TODAS_LAS_UNIDADES_ABIERTAS ? '' : ', se abre en su horario'} y su entregable
            alimenta al siguiente hasta llegar al plan integrado.${
              TODAS_LAS_UNIDADES_ABIERTAS
                ? ' Todas las unidades están abiertas; la que se está dictando se marca en amarillo.'
                : ''
            }
          </p>
          ${legend()}
        </div>
        ${progressMarkup()}
      </div>

      ${stripMarkup()}

      <div class="grid grid-cols-1 gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-8">
        <aside class="hidden lg:block">${indexMarkup()}</aside>
        <ol class="timeline list-none m-0 p-0" data-timeline>${timelineRows()}</ol>
      </div>
    </div>`;

  section.addEventListener('click', onClick);
  initIndexSpy(section);
}

/* -------------------------------------------------------------- Unidades */

function headerMarkup(unit, status) {
  const { startsAt, endsAt } = getUnitDates(unit.id);
  const meta = `Día ${unit.dia} · ${escapeHtml(unit.bloque)} · ${formatRange(startsAt, endsAt)} h · Nivel ${escapeHtml(unit.nivel)}`;
  const next = unit.entregable.alimentaA ? getUnit(unit.entregable.alimentaA) : null;
  const inlineDeliverable = `
    <span class="deliverable-inline w-full">
      <span>Entregable: <strong class="text-heading font-semibold">${escapeHtml(unit.entregable.nombre)}</strong>${next ? ` → ${unitCode(next)}` : ''}</span>
    </span>`;

  const inner = (side) => `
    <span class="unit__number">${unitCode(unit)}</span>
    <span class="min-w-0">
      <span class="unit__title" id="${unit.id}-title">${escapeHtml(unit.titulo)}</span>
      <span class="unit__meta tabular">${meta}</span>
    </span>
    ${status === STATUS.LOCKED ? '' : `<span class="unit__chevron" aria-hidden="true">${icon('expand')}</span>`}
    <span class="unit__head-side">${side}</span>`;

  if (status === STATUS.LOCKED) {
    return `
      <div class="unit__trigger">
        ${inner(`${statusBadge(status)}<span class="unit__lock tabular">${escapeHtml(lockedMessage(unit.id))}</span>${inlineDeliverable}`)}
      </div>`;
  }
  const isOpen = expanded.has(unit.id);
  return `
    <h4 class="m-0">
      <button type="button" class="unit__trigger" id="${unit.id}-trigger" data-toggle-unit="${unit.id}"
        aria-expanded="${isOpen}" aria-controls="${unit.id}-body">
        ${inner(`${statusBadge(status)}${inlineDeliverable}`)}
      </button>
    </h4>
    <div class="unit__body" id="${unit.id}-body" role="region" aria-labelledby="${unit.id}-title" ${isOpen ? '' : 'hidden'}></div>`;
}

/** Re-renderiza una unidad completa según su estado. */
function renderUnit(unit, status) {
  const article = qs(`#${unit.id}`, section);
  article.className = `unit unit--${status}`;
  article.innerHTML = headerMarkup(unit, status);
  if (expanded.has(unit.id) && isUnlocked(status)) fillBody(unit);

  const node = qs(`[data-node="${unit.id}"]`, section);
  node.className = `timeline-node timeline-node--${status}`;
  node.innerHTML = icon(STATUS_META[status].icon);
}

function fillBody(unit, tab = 'resumen') {
  const body = qs(`#${unit.id}-body`, section);
  if (!body) return null;
  if (!body.dataset.ready) {
    body.innerHTML = unitBodyMarkup(unit, tab);
    body.dataset.ready = 'true';
    initTabs(body);
  }
  return body;
}

/** Abre o cierra el acordeón de una unidad. */
export function setExpanded(id, open, { tab } = {}) {
  const unit = getUnit(id);
  if (!unit || !isUnlocked(statuses[id])) return null;
  const trigger = qs(`#${id}-trigger`, section);
  const body = qs(`#${id}-body`, section);
  if (!trigger || !body) return null;

  if (open) {
    expanded.add(id);
    fillBody(unit);
    if (tab) selectTab(body, tab);
  } else {
    expanded.delete(id);
  }
  trigger.setAttribute('aria-expanded', String(open));
  body.hidden = !open;
  return body;
}

function onClick(event) {
  const trigger = event.target.closest('[data-toggle-unit]');
  if (!trigger) return;
  const id = trigger.dataset.toggleUnit;
  const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
  if (!willOpen) collapsedByUser.add(id);
  else collapsedByUser.delete(id);
  setExpanded(id, willOpen);
}

/**
 * Sincroniza la ruta con el estado actual. Solo re-renderiza las unidades
 * cuyo estado cambió; la unidad en curso se expande por defecto.
 */
export function updateTimeline(element, state) {
  UNITS.forEach((unit) => {
    const status = state.statuses[unit.id];
    if (statuses[unit.id] === status) return;
    statuses[unit.id] = status;
    if (status === STATUS.LIVE && !collapsedByUser.has(unit.id)) expanded.add(unit.id);
    if (!isUnlocked(status)) expanded.delete(unit.id);
    renderUnit(unit, status);
  });
  updateIndex(element, state.statuses);
}

/* ------------------------------------------------------------ Deep links */

const HASH_PATTERN = /^#(u\d{2})(?:\/concepto\/([a-z0-9-]+))?$/;

/** Procesa el hash actual. Devuelve true si correspondía a una unidad. */
export function handleHash({ initial = false } = {}) {
  const match = window.location.hash.match(HASH_PATTERN);
  if (!match) return false;
  const [, id, slug] = match;
  const article = qs(`#${id}`, section);
  if (!article) return false;

  if (isUnlocked(statuses[id])) {
    const body = setExpanded(id, true, { tab: slug ? 'conceptos' : undefined });
    if (slug && body) {
      const chip = body.querySelector(`[data-concept="${id}/${slug}"]`);
      article.scrollIntoView({ block: 'start' }); // instantáneo: el modal se abre encima
      openConcept(id, slug, chip);
      return true;
    }
  }
  // Tras renderizar, el navegador no siempre alcanzó a saltar al ancla.
  requestAnimationFrame(() => scrollToElement(article));
  if (initial) article.setAttribute('tabindex', '-1');
  return true;
}

/** Al cargar sin hash, lleva a la unidad en curso (si la hay). */
export function scrollToLiveUnit(currentId) {
  if (!currentId || window.location.hash) return;
  const article = qs(`#${currentId}`, section);
  if (article) requestAnimationFrame(() => scrollToElement(article));
}
