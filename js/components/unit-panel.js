/**
 * unit-panel.js · Contenido desplegable de una unidad: 6 pestañas
 * (Resumen, Conceptos, Laboratorio, Material, Videos y Entregable).
 * Todo se genera desde js/data/units/uXX.js: para agregar un concepto,
 * un material o un video, basta con editar ese archivo.
 */
import { COURSE } from '../data/course.js';
import { getUnit, unitCode } from '../data/units/index.js';
import { attr, escapeHtml, qsa, rich } from '../utils/dom.js';
import { icon } from '../utils/icons.js';
import { codeBlock } from '../utils/code.js';
import { CLASS_TIME_LABEL, formatDay, formatRange } from '../utils/dates.js';
import { getUnitDates } from '../utils/schedule.js';

export const TABS = [
  { key: 'resumen', label: 'Resumen', icon: 'article' },
  { key: 'conceptos', label: 'Conceptos', icon: 'lightbulb' },
  { key: 'laboratorio', label: 'Laboratorio', icon: 'science' },
  { key: 'material', label: 'Material', icon: 'folder' },
  { key: 'videos', label: 'Videos', icon: 'play' },
  { key: 'entregable', label: 'Entregable', icon: 'assignment' },
];

const list = (items, className = 'prose-list') =>
  items?.length ? `<ul class="${className}">${items.map((item) => `<li>${rich(item)}</li>`).join('')}</ul>` : '';

const block = (title, content) =>
  content ? `<section class="content-block"><h5 class="content-title">${escapeHtml(title)}</h5>${content}</section>` : '';

/* ---------------------------------------------------------------- Resumen */
function summaryTab(unit) {
  const { startsAt, endsAt } = getUnitDates(unit.id);
  const total = COURSE.distribution.reduce((sum, part) => sum + part.minutes, 0);

  const requirements = (unit.requisitos ?? [])
    .map(
      (req) => `
        <div class="callout">${icon('info')}
          <div class="flex flex-col gap-3 min-w-0">
            <p><strong>${escapeHtml(req.titulo)}.</strong> ${rich(req.texto)}</p>
            ${req.codigo ? codeBlock(req.codigo) : ''}
          </div>
        </div>`,
    )
    .join('');

  const pending = (unit.pendientes ?? [])
    .map(
      (item) => `
        <div class="callout callout--pending">${icon('warning')}
          <p><strong>Pendiente · ${escapeHtml(item.titulo)}.</strong> ${rich(item.texto)}</p>
        </div>`,
    )
    .join('');

  return `
    <p class="lead-text">${rich(unit.foco)}</p>

    <section class="content-block">
      <dl class="info-grid m-0">
        <div class="info-tile">
          <dt>Día y horario</dt>
          <dd class="tabular">Día ${unit.dia} · ${formatDay(startsAt)}<br />
            Bloque ${escapeHtml(unit.bloque)} · ${formatRange(startsAt, endsAt)} h
            <span class="text-text-soft text-sm">(${CLASS_TIME_LABEL})</span></dd>
        </div>
        <div class="info-tile">
          <dt>Distribución · 3 horas</dt>
          <dd>${COURSE.distribution.map((part) => `${part.minutes} min de ${part.label.toLowerCase()}`).join(' · ')}
            <span class="distribution" aria-hidden="true">
              ${COURSE.distribution.map((part) => `<span style="flex:${part.minutes / total}"></span>`).join('')}
            </span>
          </dd>
        </div>
        <div class="info-tile">
          <dt>Licencias</dt>
          <dd>${unit.licencias.map(rich).join(' · ')}</dd>
        </div>
        <div class="info-tile">
          <dt>Nivel del recorrido</dt>
          <dd class="tabular">${escapeHtml(unit.nivel)} <span class="text-text-soft text-sm">(de 0 a 100)</span></dd>
        </div>
      </dl>
    </section>

    ${pending ? `<section class="content-block flex flex-col gap-3">${pending}</section>` : ''}
    ${block('Objetivos', list(unit.objetivos, 'prose-list prose-list--check'))}
    ${block('Herramientas', `<ul class="flex flex-wrap gap-2 list-none m-0 p-0">${unit.herramientas.map((tool) => `<li class="tag">${rich(tool)}</li>`).join('')}</ul>`)}
    ${requirements ? `<section class="content-block flex flex-col gap-3"><h5 class="content-title">Antes de la clase</h5>${requirements}</section>` : ''}
    ${block(
      'Cátedra · 85 minutos',
      `<ol class="agenda">${unit.catedra
        .map((item) => `<li><span>${item.minutos}′</span><span>${rich(item.titulo)}</span></li>`)
        .join('')}</ol>`,
    )}`;
}

/* -------------------------------------------------------------- Conceptos */
function conceptsTab(unit) {
  const chip = (concept, kind, index) => `
    <li>
      <button type="button" class="chip chip--${kind}" data-concept="${unit.id}/${concept.slug}"
        aria-haspopup="dialog">
        ${kind === 'core' ? `<span class="chip__code">C${index + 1}</span>` : icon('flag')}
        <span>${escapeHtml(concept.titulo)}</span>
      </button>
    </li>`;

  return `
    <section class="concept-group">
      <div class="concept-group__head">
        <h5 class="concept-group__title">Conceptos obligatorios</h5>
        <p class="concept-group__hint">Lo que debes dominar para el laboratorio y el entregable.</p>
      </div>
      <ul class="chips">${unit.conceptos.obligatorios.map((c, i) => chip(c, 'required', i)).join('')}</ul>
    </section>
    <section class="concept-group">
      <div class="concept-group__head">
        <h5 class="concept-group__title">Conceptos fundamentales</h5>
        <p class="concept-group__hint">La base teórica de la unidad (C1 a C4 de la cátedra).</p>
      </div>
      <ul class="chips">${unit.conceptos.fundamentales.map((c, i) => chip(c, 'core', i)).join('')}</ul>
    </section>
    <p class="mt-6 text-sm text-text-soft">Toca un concepto para ver su explicación, un ejemplo y la fuente oficial.</p>`;
}

/* ------------------------------------------------------------ Laboratorio */
function labTab(unit) {
  const lab = unit.laboratorio;
  const steps = lab.pasos
    .map(
      (step) => `
        <li class="step">
          <div>
            <p class="step__text">${rich(step.texto)}</p>
            <p class="step__meta tabular">
              <span>${step.minutos} min</span>
              ${step.quien ? `<span>${escapeHtml(step.quien)}</span>` : ''}
              ${(step.conceptos ?? []).map((code) => `<span>${escapeHtml(code)}</span>`).join('')}
            </p>
          </div>
        </li>`,
    )
    .join('');

  const checkpoints = lab.puntosControl?.length
    ? `<div class="callout checkpoint">${icon('checkCircle')}<div><p><strong>Puntos de control</strong></p>${list(lab.puntosControl)}</div></div>`
    : '';

  return `
    <div class="flex flex-wrap items-center gap-2 mb-4">
      <h5 class="text-xl font-semibold text-heading m-0 mr-2">${escapeHtml(lab.nombre)}</h5>
      ${lab.modalidad ? `<span class="tag">${icon('groups', { className: 'size-4' })}${escapeHtml(lab.modalidad)}</span>` : ''}
      <span class="tag tabular">${icon('schedule', { className: 'size-4' })}${lab.duracion} min</span>
    </div>
    ${block('Caso de uso', `<p class="text-text-muted max-w-[68ch]">${rich(lab.caso)}</p>`)}
    ${block('Problemática', `<p class="text-text-muted max-w-[68ch]">${rich(lab.problematica)}</p>`)}
    ${block('Objetivo', `<p class="lead-text">${rich(lab.objetivo)}</p>`)}
    ${block('Roles', list(lab.roles))}
    ${block('Pasos', `<ol class="steps">${steps}</ol>`)}
    ${checkpoints ? `<section class="content-block">${checkpoints}</section>` : ''}
    ${block('Qué se espera (sin darte la respuesta)', list(lab.resultadoEsperado))}
    ${block('Errores frecuentes', list(lab.erroresFrecuentes))}
    ${block('Qué investigar si te trabas', list(lab.siTeTrabas))}
    ${block('Plan B', list(lab.planB))}
    ${lab.extension ? block('Extensión opcional', `<p class="text-text-muted">${rich(lab.extension)}</p>`) : ''}`;
}

/* --------------------------------------------------------------- Material */
const MATERIAL_ICONS = { pdf: 'pdf', png: 'image', jpg: 'image', webp: 'image' };

function materialTab(unit) {
  if (!unit.material?.length) return '<p class="text-text-muted">Esta unidad todavía no tiene material.</p>';
  const cards = unit.material
    .map((item) => {
      const type = item.tipo.toUpperCase();
      const iconName = MATERIAL_ICONS[item.tipo] ?? 'file';
      if (!item.disponible) {
        return `
          <li>
            <div class="resource-card resource-card--soon">
              <span class="resource-card__icon">${icon(iconName)}</span>
              <div>
                <p class="resource-card__title">${escapeHtml(item.titulo)}</p>
                <p class="resource-card__meta">${icon('hourglass')}<span>${type} · Disponible pronto</span></p>
              </div>
            </div>
          </li>`;
      }
      return `
        <li>
          <a class="resource-card" href="${encodeURI(item.archivo)}" download>
            <span class="resource-card__icon">${icon(iconName)}</span>
            <span>
              <span class="resource-card__title block">${escapeHtml(item.titulo)}</span>
              <span class="resource-card__meta">${type} · <span class="resource-card__action inline-flex items-center gap-1">${icon('download')}Descargar</span></span>
            </span>
          </a>
        </li>`;
    })
    .join('');
  return `<ul class="resource-grid">${cards}</ul>`;
}

/* ----------------------------------------------------------------- Videos */
const youtubeId = (url) => url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)?.[1] ?? '';

function videoCard(video) {
  if (video.origen === 'YouTube' && youtubeId(video.url)) {
    const id = youtubeId(video.url);
    return `
      <li class="sm:col-span-2">
        <button type="button" class="lite-embed" data-youtube="${id}" data-title="${escapeHtml(video.titulo)}"
          style="background-image:url('https://i.ytimg.com/vi/${id}/hqdefault.jpg')"
          aria-label="Reproducir video: ${escapeHtml(video.titulo)}">
          <span class="lite-embed__play">${icon('play')}</span>
        </button>
        <p class="mt-2 text-sm text-text-muted">${escapeHtml(video.titulo)}${video.duracion ? ` · ${escapeHtml(video.duracion)}` : ''}</p>
      </li>`;
  }

  const meta = [video.origen, video.duracion].filter(Boolean).map(escapeHtml).join(' · ');
  if (!video.url) {
    return `
      <li>
        <div class="resource-card resource-card--soon">
          <span class="resource-card__icon">${icon('play')}</span>
          <div>
            <p class="resource-card__title">${escapeHtml(video.titulo)}</p>
            <p class="resource-card__meta">${icon('hourglass')}<span>${meta} · Enlace pendiente</span></p>
          </div>
        </div>
      </li>`;
  }

  const catalogHint = video.verificado === false ? 'Búscalo en el catálogo por su nombre.' : '';
  return `
    <li>
      <a class="resource-card" href="${escapeHtml(video.url)}" target="_blank" rel="noopener noreferrer">
        <span class="resource-card__icon">${icon('school')}</span>
        <span>
          <span class="resource-card__title block">${escapeHtml(video.titulo)}</span>
          ${video.nota ? `<span class="block mt-1 text-sm text-text-muted">${rich(video.nota)}</span>` : ''}
          <span class="resource-card__meta">${meta}${catalogHint ? ` · ${catalogHint}` : ''}
            <span class="resource-card__action inline-flex items-center gap-1">${icon('external')}Abrir<span class="visually-hidden"> (se abre en una pestaña nueva)</span></span>
          </span>
        </span>
      </a>
    </li>`;
}

function videosTab(unit) {
  const cards = (unit.videos ?? []).map(videoCard).join('');
  return `
    ${cards ? `<ul class="resource-grid">${cards}</ul>` : '<p class="text-text-muted">Sin videos asociados por ahora.</p>'}
    <p class="mt-3 text-sm text-text-soft">Los cursos de Anthropic Academy se abren en una pestaña nueva.</p>
    ${block('Para investigar por tu cuenta', list(unit.paraInvestigar))}`;
}

/* ------------------------------------------------------------- Entregable */
function deliverableTab(unit) {
  const next = unit.entregable.alimentaA ? getUnit(unit.entregable.alimentaA) : null;
  const feeds = next
    ? `<a class="feeds-link" href="#${next.id}" data-goto-unit="${next.id}">
         ${icon('arrowForward')}<span>Alimenta a: <strong class="tabular">${unitCode(next)}</strong> · ${escapeHtml(next.titulo)}</span>
       </a>`
    : `<p class="feeds-link">${icon('flag')}<span>Cierre del curso: integra los nueve entregables anteriores.</span></p>`;

  return `
    <div class="deliverable-card">
      <p class="deliverable-card__label">Entregable · ${unitCode(unit)}</p>
      <h5 class="deliverable-card__name">${escapeHtml(unit.entregable.nombre)}</h5>
      <div class="mt-4">
        <p class="content-title">Criterios clave</p>
        ${list(unit.entregable.criterios, 'prose-list prose-list--check')}
      </div>
      ${feeds}
    </div>
    <p class="mt-4 text-sm text-text-soft">Caso integrador: ${escapeHtml(COURSE.integrator)}. Cada entregable alimenta al siguiente.</p>`;
}

const RENDERERS = {
  resumen: summaryTab,
  conceptos: conceptsTab,
  laboratorio: labTab,
  material: materialTab,
  videos: videosTab,
  entregable: deliverableTab,
};

/** Markup del cuerpo desplegable (pestañas + paneles). */
export function unitBodyMarkup(unit, activeTab = 'resumen') {
  const tabs = TABS.map((tab) => {
    const selected = tab.key === activeTab;
    return `
      <button type="button" role="tab" class="tab" id="${unit.id}-tab-${tab.key}"
        aria-controls="${unit.id}-panel-${tab.key}" aria-selected="${selected}"
        tabindex="${selected ? 0 : -1}" data-tab="${tab.key}">
        ${icon(tab.icon)}<span>${tab.label}</span>
      </button>`;
  }).join('');

  const panels = TABS.map(
    (tab) => `
      <div role="tabpanel" class="tab-panel" id="${unit.id}-panel-${tab.key}"
        aria-labelledby="${unit.id}-tab-${tab.key}" tabindex="0"${attr('hidden', tab.key !== activeTab)}>
        ${RENDERERS[tab.key](unit)}
      </div>`,
  ).join('');

  return `
    <div role="tablist" class="tablist" aria-label="Contenido de ${unitCode(unit)}">${tabs}</div>
    ${panels}`;
}

/** Activa una pestaña por clave. */
export function selectTab(container, key, { focus = false } = {}) {
  const tabs = qsa('[role="tab"]', container);
  tabs.forEach((tab) => {
    const selected = tab.dataset.tab === key;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    const panel = container.querySelector(`#${tab.getAttribute('aria-controls')}`);
    panel.hidden = !selected;
    if (selected && focus) tab.focus();
  });
}

/** Navegación por teclado del patrón ARIA tabs (flechas, Inicio y Fin). */
export function initTabs(container) {
  const tablist = container.querySelector('[role="tablist"]');
  if (!tablist || tablist.dataset.ready) return;
  tablist.dataset.ready = 'true';

  tablist.addEventListener('click', (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (tab) selectTab(container, tab.dataset.tab);
  });

  tablist.addEventListener('keydown', (event) => {
    const tabs = qsa('[role="tab"]', tablist);
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;
    const keys = {
      ArrowRight: (current + 1) % tabs.length,
      ArrowLeft: (current - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    selectTab(container, tabs[keys[event.key]].dataset.tab, { focus: true });
  });
}

/** Lite embed de YouTube: el iframe se carga solo al hacer clic. */
export function initLiteEmbeds(root = document) {
  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-youtube]');
    if (!button) return;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${button.dataset.youtube}?autoplay=1`;
    iframe.title = button.dataset.title;
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    const wrapper = document.createElement('div');
    wrapper.className = 'lite-embed';
    wrapper.append(iframe);
    button.replaceWith(wrapper);
    iframe.focus();
  });
}
