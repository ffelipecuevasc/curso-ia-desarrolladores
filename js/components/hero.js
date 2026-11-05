/**
 * hero.js · Portada del sitio.
 * - Textos desde data/course.js (portada del programa oficial).
 * - Indicador dinámico "Unidad en curso" / "Próxima unidad" desde units.config.js.
 * - Logo de Claude protagonista con halo y "respiración".
 * - Robots de Claude Code de fondo con flotación y parallax leve (decorativos).
 */
import { COURSE } from '../data/course.js';
import { programButton } from './program-button.js';
import { claudeCodeLogo, claudeLogo, icon } from '../utils/icons.js';
import { escapeHtml, qs } from '../utils/dom.js';
import { formatDay, formatTime } from '../utils/dates.js';
import { getUnitDates } from '../utils/schedule.js';

/**
 * Robots del fondo: posición (%), ancho (rem), opacidad (0,06–0,2),
 * profundidad de parallax y ritmo de flotación. Ajusta aquí para moverlos.
 */
const ROBOTS = [
  { top: 8, left: 4, size: 2.6, opacity: 0.14, depth: 10, duration: 13 },
  { top: 18, left: 44, size: 1.6, opacity: 0.08, depth: 4, duration: 17 },
  { top: 6, left: 72, size: 2.2, opacity: 0.12, depth: 8, duration: 15 },
  { top: 30, left: 92, size: 3.2, opacity: 0.16, depth: 14, duration: 12 },
  { top: 52, left: 2, size: 1.8, opacity: 0.1, depth: 6, duration: 16 },
  { top: 74, left: 10, size: 3.4, opacity: 0.18, depth: 16, duration: 14 },
  { top: 86, left: 36, size: 2, opacity: 0.1, depth: 6, duration: 18 },
  { top: 64, left: 52, size: 1.4, opacity: 0.07, depth: 3, duration: 19 },
  { top: 88, left: 66, size: 2.8, opacity: 0.15, depth: 12, duration: 13 },
  { top: 70, left: 94, size: 2, opacity: 0.12, depth: 9, duration: 15 },
  { top: 40, left: 30, size: 1.2, opacity: 0.06, depth: 2, duration: 20 },
  { top: 2, left: 24, size: 1.7, opacity: 0.09, depth: 5, duration: 16 },
];

const robotsMarkup = () =>
  ROBOTS.map(
    (r, i) => `
      <span class="hero__robot" style="top:${r.top}%;left:${r.left}%;width:${r.size}rem;opacity:${r.opacity};--depth:${r.depth / 10};--float-duration:${r.duration}s;--float-delay:${-i * 1.7}s">
        ${claudeCodeLogo({ className: '', decorative: true })}
      </span>`,
  ).join('');

export function renderHero(section) {
  section.innerHTML = `
    <div class="hero__robots" aria-hidden="true">${robotsMarkup()}</div>

    <div class="container-page grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
      <div class="order-2 lg:order-1 flex flex-col items-start gap-5">
        <p class="kicker kicker--rule">${escapeHtml(COURSE.overline)}</p>
        <p class="mono-tag">${escapeHtml(COURSE.tag)}</p>

        <div class="flex flex-col gap-3">
          <h1 class="hero__title" id="hero-title">${escapeHtml(COURSE.title)}</h1>
          <p class="hero__subtitle">${escapeHtml(COURSE.subtitle)}</p>
        </div>

        <p class="text-text-muted text-lg max-w-[52ch]">${escapeHtml(COURSE.lead)}</p>

        <ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Temas clave">
          ${COURSE.pills
            .map(
              (pill, index) =>
                `<li class="pill">${index === 0 ? claudeLogo({ decorative: true, className: '' }) : ''}${escapeHtml(pill)}</li>`,
            )
            .join('')}
        </ul>

        <p class="flex items-center gap-2 text-text-muted">
          ${icon('school', { className: 'size-5 shrink-0 text-icon' })}
          <span>${escapeHtml(COURSE.instructorLine)}</span>
        </p>

        <div data-hero-status aria-live="polite"></div>

        <div class="flex flex-wrap gap-3 pt-1">
          <a class="btn btn--primary" href="#ruta">Ver la ruta del curso ${icon('arrowUp', { className: 'size-5 rotate-180' })}</a>
          ${programButton()}
        </div>
      </div>

      <div class="order-1 lg:order-2">
        <div class="hero__visual">
          <span class="hero__halo" aria-hidden="true"></span>
          <span class="hero__ring" aria-hidden="true"></span>
          ${claudeLogo({ className: 'hero__logo' })}
        </div>
      </div>
    </div>`;

  initParallax(section);
}

/**
 * Actualiza el indicador según el estado del curso.
 * @param {HTMLElement} section
 * @param {{current: string|null, next: string|null}} state
 */
export function updateHeroStatus(section, state) {
  const slot = qs('[data-hero-status]', section);
  if (!slot) return;
  const label = (id) => id.toUpperCase();

  let markup;
  if (state.current) {
    markup = `
      <a class="hero-status hero-status--live" href="#${state.current}">
        <span class="hero-status__dot" aria-hidden="true"></span>
        <span><strong class="font-semibold text-heading">Unidad en curso:</strong> <span class="tabular">${label(state.current)}</span></span>
      </a>`;
  } else if (state.next) {
    const { startsAt } = getUnitDates(state.next);
    markup = `
      <a class="hero-status" href="#${state.next}">
        ${icon('calendar')}
        <span><strong class="font-semibold text-heading">Próxima unidad:</strong>
        <span class="tabular">${label(state.next)} · ${formatDay(startsAt)}, ${formatTime(startsAt)} h</span>
        <span class="text-text-soft text-sm">(hora de clases)</span></span>
      </a>`;
  } else {
    markup = `
      <span class="hero-status">
        ${icon('checkCircle')}
        <span><strong class="font-semibold text-heading">Curso finalizado.</strong> Todas las unidades quedan disponibles para repasar.</span>
      </span>`;
  }
  if (slot.dataset.markup !== markup) {
    slot.innerHTML = markup;
    slot.dataset.markup = markup;
  }
}

/** Parallax leve con el mouse (solo puntero fino y sin movimiento reducido). */
function initParallax(section) {
  const allowMotion = window.matchMedia('(prefers-reduced-motion: no-preference) and (pointer: fine)');
  if (!allowMotion.matches) return;
  const robots = qs('.hero__robots', section);
  let frame = 0;

  section.addEventListener('pointermove', (event) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      robots.style.setProperty('--px', (x * -24).toFixed(2));
      robots.style.setProperty('--py', (y * -24).toFixed(2));
    });
  });

  section.addEventListener('pointerleave', () => {
    robots.style.setProperty('--px', 0);
    robots.style.setProperty('--py', 0);
  });
}
