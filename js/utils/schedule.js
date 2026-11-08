/**
 * schedule.js · Cálculo del estado de cada unidad a partir de units.config.js.
 *
 * | Estado      | Cuándo                                                      |
 * |-------------|-------------------------------------------------------------|
 * | bloqueada   | `forzar: 'bloqueada'`, o antes de `abreEl` si               |
 * |             | TODAS_LAS_UNIDADES_ABIERTAS es false                        |
 * | en-curso    | entre `abreEl` y `cierraEl`                                 |
 * | abierta     | antes de su hora con TODAS_LAS_UNIDADES_ABIERTAS,           |
 * |             | `forzar: 'abierta'` o ?preview=all                          |
 * | completada  | después de `cierraEl`                                       |
 */
import { TODAS_LAS_UNIDADES_ABIERTAS, UNITS_SCHEDULE } from '../config/units.config.js';
import { formatDay, formatTime } from './dates.js';

export const STATUS = Object.freeze({
  LOCKED: 'bloqueada',
  LIVE: 'en-curso',
  OPEN: 'abierta',
  DONE: 'completada',
});

/** ?preview=all → vista del instructor con todo abierto. */
export const isPreview = new URLSearchParams(window.location.search).get('preview') === 'all';

/** Fechas de una unidad como objetos Date. */
export function getUnitDates(id) {
  const entry = UNITS_SCHEDULE[id];
  if (!entry) throw new Error(`[schedule] Unidad sin calendario: ${id}`);
  return {
    opensAt: new Date(entry.abreEl),
    startsAt: new Date(entry.inicio),
    endsAt: new Date(entry.cierraEl),
    forced: entry.forzar ?? null,
  };
}

/** Estado de una unidad en el instante `now`. */
export function getUnitStatus(id, now, { preview = isPreview } = {}) {
  const { opensAt, endsAt, forced } = getUnitDates(id);

  if (forced === 'bloqueada' && !preview) return STATUS.LOCKED;
  if (now >= endsAt) return STATUS.DONE;
  if (now >= opensAt) return STATUS.LIVE;
  if (forced === 'abierta' || preview || TODAS_LAS_UNIDADES_ABIERTAS) return STATUS.OPEN;
  return STATUS.LOCKED;
}

/** true si el contenido de la unidad se puede desplegar. */
export const isUnlocked = (status) => status !== STATUS.LOCKED;

/**
 * Estado global del curso: estado por unidad, unidad en curso,
 * próxima unidad, cantidad de unidades abiertas y de completadas.
 */
export function getCourseState(unitIds, now) {
  const statuses = Object.fromEntries(unitIds.map((id) => [id, getUnitStatus(id, now)]));
  const current = unitIds.find((id) => statuses[id] === STATUS.LIVE) ?? null;
  const next = unitIds.find((id) => getUnitDates(id).startsAt > now) ?? null;
  const unlockedCount = unitIds.filter((id) => isUnlocked(statuses[id])).length;
  const doneCount = unitIds.filter((id) => statuses[id] === STATUS.DONE).length;
  return { statuses, current, next, unlockedCount, doneCount, total: unitIds.length };
}

/** Texto del estado bloqueado: "Se abre el lunes 9 de noviembre, 12:45 h". */
export function lockedMessage(id) {
  const { opensAt, forced } = getUnitDates(id);
  if (forced === 'bloqueada') return 'Bloqueada hasta nuevo aviso';
  return `Se abre el ${formatDay(opensAt)}, ${formatTime(opensAt)} h`;
}

/** Metadatos visibles de cada estado (DESIGN.md 2.6: ícono + texto). */
export const STATUS_META = {
  [STATUS.LOCKED]: { label: 'Bloqueada', icon: 'lock' },
  [STATUS.LIVE]: { label: 'Hoy · en curso', icon: 'schedule' },
  [STATUS.OPEN]: { label: 'Abierta', icon: 'lockOpen' },
  [STATUS.DONE]: { label: 'Completada', icon: 'checkCircle' },
};
