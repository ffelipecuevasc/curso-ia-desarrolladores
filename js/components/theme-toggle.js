/**
 * theme-toggle.js · Botón de tema claro/oscuro (DESIGN.md 5).
 * - Ícono de luna en claro y de sol en oscuro.
 * - El nombre accesible dice la acción: "Activar tema oscuro" / "Activar tema claro".
 * - Guarda la elección en localStorage ("theme": "light" | "dark").
 * - Sin elección guardada, sigue a prefers-color-scheme (y por defecto, oscuro).
 */
import { icon } from '../utils/icons.js';
import { readStorage, writeStorage } from '../utils/storage.js';

const root = document.documentElement;
const STORAGE_KEY = 'theme';
const buttons = new Set();

const isDark = () => root.classList.contains('dark');

function render(button) {
  const dark = isDark();
  const label = dark ? 'Activar tema claro' : 'Activar tema oscuro';
  button.innerHTML = icon(dark ? 'sun' : 'moon', { className: 'size-6' });
  button.setAttribute('aria-label', label);
  button.setAttribute('title', label);
}

function applyTheme(dark) {
  // Evita animar colores durante el cambio de tema.
  root.classList.add('theme-switching');
  root.classList.toggle('dark', dark);
  buttons.forEach(render);
  document.dispatchEvent(new CustomEvent('themechange', { detail: { dark } }));
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-switching')));
}

/** Markup del botón (lo completa initThemeToggle). */
export const themeToggleMarkup = () =>
  '<button type="button" class="btn btn--ghost btn--icon theme-toggle" data-theme-toggle></button>';

export function initThemeToggle(scope = document) {
  scope.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    if (buttons.has(button)) return;
    buttons.add(button);
    render(button);
    button.addEventListener('click', () => {
      const next = !isDark();
      applyTheme(next);
      writeStorage(STORAGE_KEY, next ? 'dark' : 'light');
    });
  });
}

// Si la persona no eligió tema, el sitio sigue los cambios del sistema.
const media = window.matchMedia?.('(prefers-color-scheme: light)');
media?.addEventListener?.('change', (event) => {
  const stored = readStorage(STORAGE_KEY);
  if (stored !== 'light' && stored !== 'dark') applyTheme(!event.matches);
});
