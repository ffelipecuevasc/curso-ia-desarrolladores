/**
 * validate.js · Validación de los datos en desarrollo.
 * Se ejecuta con ?debug en la URL. Avisa en consola si:
 * - una descripción breve supera 100 caracteres;
 * - falta el calendario de una unidad o hay slugs de concepto repetidos;
 * - un concepto no tiene fuente, o un "alimentaA" apunta a una unidad inexistente.
 */
import { UNITS_SCHEDULE } from '../config/units.config.js';

export const MAX_SHORT_DESCRIPTION = 100;

export function validateData(units) {
  const problems = [];
  const ids = new Set(units.map((unit) => unit.id));

  units.forEach((unit) => {
    const length = [...(unit.descripcionBreve ?? '')].length;
    if (length > MAX_SHORT_DESCRIPTION) {
      problems.push(`${unit.id}: descripcionBreve tiene ${length} caracteres (máximo ${MAX_SHORT_DESCRIPTION}).`);
    }
    if (!UNITS_SCHEDULE[unit.id]) problems.push(`${unit.id}: no tiene calendario en units.config.js.`);
    if (unit.entregable?.alimentaA && !ids.has(unit.entregable.alimentaA)) {
      problems.push(`${unit.id}: entregable.alimentaA apunta a «${unit.entregable.alimentaA}», que no existe.`);
    }

    const slugs = new Set();
    [...unit.conceptos.obligatorios, ...unit.conceptos.fundamentales].forEach((concept) => {
      if (slugs.has(concept.slug)) problems.push(`${unit.id}: slug de concepto repetido «${concept.slug}».`);
      slugs.add(concept.slug);
      if (!/^[a-z0-9-]+$/.test(concept.slug)) problems.push(`${unit.id}: slug inválido «${concept.slug}».`);
      if (!concept.fuente?.url) problems.push(`${unit.id}/${concept.slug}: falta la fuente.`);
      if (!concept.explicacion?.length) problems.push(`${unit.id}/${concept.slug}: falta la explicación.`);
    });
  });

  if (problems.length) {
    console.warn(`[validateData] ${problems.length} problema(s) en los datos:`);
    problems.forEach((problem) => console.warn(` · ${problem}`));
  } else {
    console.info(`[validateData] OK: ${units.length} unidades revisadas, sin problemas.`);
  }
  return problems;
}
