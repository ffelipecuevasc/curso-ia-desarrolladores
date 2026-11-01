/**
 * units.config.js · CALENDARIO Y CONTROL DE APERTURA DE LAS UNIDADES
 * ---------------------------------------------------------------------------
 * Este es el ÚNICO archivo que hay que tocar para abrir o bloquear unidades.
 * El bloqueo es un ritmo pedagógico, no una medida de seguridad: todo el
 * contenido está en el repositorio.
 *
 * Zona horaria de las clases: UTC-03:00
 * abreEl:   cuándo se abre sola la unidad (15 min antes de la clase).
 * inicio:   inicio de la clase (se muestra como horario).
 * cierraEl: fin de la clase. Después de esta hora la unidad queda "completada".
 * forzar:   null (usa las fechas) | 'abierta' | 'bloqueada' (manda sobre las fechas)
 *
 * Ejemplos:
 *   u03: { ..., forzar: 'abierta' }    → U03 abierta ahora, sin esperar la fecha.
 *   u05: { ..., forzar: 'bloqueada' }  → U05 bloqueada hasta nuevo aviso.
 *
 * Vista del instructor: agrega ?preview=all a la URL para ver todo abierto.
 * Solo para pruebas:    agrega ?now=2026-11-10T14:00:00-03:00 para simular la hora.
 */
export const UNITS_SCHEDULE = {
  u01: { abreEl: '2026-11-09T08:45:00-03:00', inicio: '2026-11-09T09:00:00-03:00', cierraEl: '2026-11-09T12:00:00-03:00', forzar: null },
  u02: { abreEl: '2026-11-09T12:45:00-03:00', inicio: '2026-11-09T13:00:00-03:00', cierraEl: '2026-11-09T16:00:00-03:00', forzar: null },
  u03: { abreEl: '2026-11-10T08:45:00-03:00', inicio: '2026-11-10T09:00:00-03:00', cierraEl: '2026-11-10T12:00:00-03:00', forzar: null },
  u04: { abreEl: '2026-11-10T12:45:00-03:00', inicio: '2026-11-10T13:00:00-03:00', cierraEl: '2026-11-10T16:00:00-03:00', forzar: null },
  u05: { abreEl: '2026-11-11T08:45:00-03:00', inicio: '2026-11-11T09:00:00-03:00', cierraEl: '2026-11-11T12:00:00-03:00', forzar: null },
  u06: { abreEl: '2026-11-11T12:45:00-03:00', inicio: '2026-11-11T13:00:00-03:00', cierraEl: '2026-11-11T16:00:00-03:00', forzar: null },
  u07: { abreEl: '2026-11-12T08:45:00-03:00', inicio: '2026-11-12T09:00:00-03:00', cierraEl: '2026-11-12T12:00:00-03:00', forzar: null },
  u08: { abreEl: '2026-11-12T12:45:00-03:00', inicio: '2026-11-12T13:00:00-03:00', cierraEl: '2026-11-12T16:00:00-03:00', forzar: null },
  u09: { abreEl: '2026-11-13T08:45:00-03:00', inicio: '2026-11-13T09:00:00-03:00', cierraEl: '2026-11-13T12:00:00-03:00', forzar: null },
  u10: { abreEl: '2026-11-13T12:45:00-03:00', inicio: '2026-11-13T13:00:00-03:00', cierraEl: '2026-11-13T16:00:00-03:00', forzar: null },
};

/** Cada cuánto se recalculan los estados sin recargar la página. */
export const REFRESH_INTERVAL_MS = 60_000;
