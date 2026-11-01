/**
 * units/index.js · Lista ordenada de las 10 unidades.
 * Para agregar contenido, edita el archivo de la unidad (u01.js … u10.js);
 * este índice solo las reúne.
 */
import u01 from './u01.js';
import u02 from './u02.js';
import u03 from './u03.js';
import u04 from './u04.js';
import u05 from './u05.js';
import u06 from './u06.js';
import u07 from './u07.js';
import u08 from './u08.js';
import u09 from './u09.js';
import u10 from './u10.js';

export const UNITS = [u01, u02, u03, u04, u05, u06, u07, u08, u09, u10];

/** Busca una unidad por id ('u01'…'u10'). */
export const getUnit = (id) => UNITS.find((unit) => unit.id === id);

/** "U01" a partir del número de unidad. */
export const unitCode = (unit) => `U${String(unit.numero).padStart(2, '0')}`;

/** Todos los conceptos de una unidad, en el orden en que se muestran. */
export const unitConcepts = (unit) => [...unit.conceptos.obligatorios, ...unit.conceptos.fundamentales];
