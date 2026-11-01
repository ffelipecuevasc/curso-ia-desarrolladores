/**
 * instructor.js · Sección del instructor (banda compacta).
 */
import { INSTRUCTOR } from '../data/instructor.js';
import { escapeHtml } from '../utils/dom.js';
import { claudeLogo, icon } from '../utils/icons.js';

const avatarMarkup = () => {
  const initials = `<span aria-hidden="true">${escapeHtml(INSTRUCTOR.initials)}</span>`;
  if (!INSTRUCTOR.photoAvailable) return `<div class="avatar" role="img" aria-label="${escapeHtml(INSTRUCTOR.name)}">${initials}</div>`;
  // Si la imagen falla, se reemplaza por las iniciales.
  return `
    <div class="avatar">
      <img src="${encodeURI(INSTRUCTOR.photo)}" alt="${escapeHtml(INSTRUCTOR.name)}" width="240" height="240" loading="lazy"
        onerror="this.replaceWith(Object.assign(document.createElement('span'), { textContent: '${escapeHtml(INSTRUCTOR.initials)}' }))" />
    </div>`;
};

export function renderInstructor(section) {
  section.innerHTML = `
    <div class="container-page">
      <div class="instructor">
        ${avatarMarkup()}

        <div class="flex flex-col gap-3 min-w-0">
          <p class="kicker kicker--rule">Instructor</p>
          <h2 class="font-display text-heading text-[clamp(1.8rem,3.4vw,2.5rem)] leading-tight" id="instructor-title">${escapeHtml(INSTRUCTOR.name)}</h2>
          <p class="text-text-muted -mt-1">${escapeHtml(INSTRUCTOR.fullName)} · ${escapeHtml(INSTRUCTOR.role)}</p>

          <ul class="flex flex-wrap gap-2 list-none m-0 p-0 mt-1" aria-label="Credenciales destacadas">
            ${INSTRUCTOR.credentials
              .map(
                (cred) =>
                  `<li class="pill${cred.featured ? ' credential--featured' : ''}">${cred.featured ? claudeLogo({ decorative: true, className: '' }) : ''}${escapeHtml(cred.label)}</li>`,
              )
              .join('')}
          </ul>

          <p class="text-sm text-text-muted mt-1">
            <strong class="text-heading font-semibold">Formación:</strong> ${escapeHtml(INSTRUCTOR.education)}.<br />
            <strong class="text-heading font-semibold">Trayectoria:</strong> ${INSTRUCTOR.career.map(escapeHtml).join(' · ')}. ${escapeHtml(INSTRUCTOR.community)}.
          </p>

          <div class="flex flex-wrap gap-2 mt-1">
            ${INSTRUCTOR.links
              .map(
                (link) => `
                  <a class="btn btn--ghost normal-case tracking-normal text-sm" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">
                    ${icon(link.kind === 'web' ? 'language' : 'link')}${escapeHtml(link.label)}
                    <span class="visually-hidden">(se abre en una pestaña nueva)</span>
                  </a>`,
              )
              .join('')}
          </div>
        </div>

        <dl class="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6 m-0 lg:min-w-[11rem]">
          ${INSTRUCTOR.metrics
            .map(
              (metric) => `
                <div class="flex flex-col-reverse">
                  <dt class="metric__label">${escapeHtml(metric.label)}</dt>
                  <dd class="metric__value m-0">${escapeHtml(metric.value)}</dd>
                </div>`,
            )
            .join('')}
        </dl>
      </div>
    </div>`;
}
