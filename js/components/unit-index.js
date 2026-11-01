/**
 * unit-index.js · Índice compacto de la ruta.
 * - Desktop: lista fija (sticky) U01…U10 con su estado.
 * - Móvil: barra superior de progreso con U01…U10 desplazable.
 */
import { UNITS, unitCode } from '../data/units/index.js';
import { escapeHtml, qsa } from '../utils/dom.js';
import { icon } from '../utils/icons.js';
import { STATUS_META } from '../utils/schedule.js';

export const indexMarkup = () => `
  <nav class="unit-index" aria-label="Índice de unidades">
    <p class="kicker mb-3">Índice</p>
    <ol class="list-none m-0 p-0 flex flex-col gap-0.5">
      ${UNITS.map(
        (unit) => `
          <li>
            <a href="#${unit.id}" data-index-link="${unit.id}">
              <span data-index-icon></span>
              <span class="unit-index__code">${unitCode(unit)}</span>
              <span>${escapeHtml(unit.tituloCorto)}</span>
            </a>
          </li>`,
      ).join('')}
    </ol>
  </nav>`;

export const stripMarkup = () => `
  <nav class="unit-strip mb-6" aria-label="Progreso por unidad">
    <ol>
      ${UNITS.map(
        (unit) => `<li><a href="#${unit.id}" data-index-link="${unit.id}"><span data-index-icon></span>${unitCode(unit)}</a></li>`,
      ).join('')}
    </ol>
  </nav>`;

/** Actualiza íconos y estado accesible de los enlaces del índice. */
export function updateIndex(root, statuses) {
  qsa('[data-index-link]', root).forEach((link) => {
    const status = statuses[link.dataset.indexLink];
    if (link.dataset.status === status) return;
    link.dataset.status = status;
    link.querySelector('[data-index-icon]').innerHTML = icon(STATUS_META[status].icon);
    const label = link.querySelector('.visually-hidden') ?? link.appendChild(document.createElement('span'));
    label.className = 'visually-hidden';
    label.textContent = ` (${STATUS_META[status].label})`;
  });
}

/** Marca la unidad visible en el índice y desplaza la barra móvil hasta ella. */
export function initIndexSpy(root) {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        qsa('[data-index-link]', root).forEach((link) => {
          const active = link.dataset.indexLink === id;
          if (active) {
            link.setAttribute('aria-current', 'true');
            const strip = link.closest('.unit-strip ol');
            if (strip) {
              const left = link.offsetLeft - strip.clientWidth / 2 + link.clientWidth / 2;
              strip.scrollTo({ left, behavior: 'auto' });
            }
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    },
    { rootMargin: '-35% 0px -55% 0px' },
  );
  qsa('article.unit', root).forEach((article) => observer.observe(article));
}
