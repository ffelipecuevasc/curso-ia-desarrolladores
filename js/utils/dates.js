/**
 * dates.js · Fechas y horas del curso.
 * Las clases son en UTC-03:00. Se formatea con la zona America/Sao_Paulo
 * (UTC-03:00 todo el año) y en español de Chile.
 *
 * Solo para pruebas: `?now=2026-11-10T14:00:00-03:00` simula la hora actual.
 * El reloj simulado avanza en tiempo real desde ese instante.
 */

export const CLASS_TIME_ZONE = 'America/Sao_Paulo';
export const CLASS_TIME_LABEL = 'hora de clases, UTC-03:00';

const params = new URLSearchParams(window.location.search);
const simulated = params.get('now') ? new Date(params.get('now')) : null;
const offsetMs = simulated && !Number.isNaN(simulated.getTime()) ? simulated.getTime() - Date.now() : 0;

/** true si la hora actual está simulada con ?now= */
export const isSimulatedNow = offsetMs !== 0;

/** Hora actual (real o simulada con ?now=). */
export const getNow = () => new Date(Date.now() + offsetMs);

const dayFormatter = new Intl.DateTimeFormat('es-CL', {
  timeZone: CLASS_TIME_ZONE,
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

const shortDayFormatter = new Intl.DateTimeFormat('es-CL', {
  timeZone: CLASS_TIME_ZONE,
  weekday: 'short',
  day: 'numeric',
  month: 'short',
});

const timeFormatter = new Intl.DateTimeFormat('es-CL', {
  timeZone: CLASS_TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

const keyFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: CLASS_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const toDate = (value) => (value instanceof Date ? value : new Date(value));

/** "lunes 9 de noviembre" (sin la coma que agrega Intl después del día de la semana) */
export function formatDay(value) {
  const parts = Object.fromEntries(
    dayFormatter.formatToParts(toDate(value)).map((part) => [part.type, part.value]),
  );
  return `${parts.weekday} ${parts.day} de ${parts.month}`;
}

/** "lun, 9 nov" */
export const formatShortDay = (value) => shortDayFormatter.format(toDate(value));

/** "09:00" */
export const formatTime = (value) => timeFormatter.format(toDate(value));

/** "lunes 9 de noviembre, 09:00" */
export const formatDayTime = (value) => `${formatDay(value)}, ${formatTime(value)}`;

/** "09:00–12:00" */
export const formatRange = (start, end) => `${formatTime(start)}–${formatTime(end)}`;

/** Clave de día en la zona de clases ("2026-11-09"), útil para comparar días. */
export const dayKey = (value) => keyFormatter.format(toDate(value));

/** true si ambas fechas caen el mismo día en la zona de clases. */
export const isSameClassDay = (a, b) => dayKey(a) === dayKey(b);
