/**
 * validate.js · Validación de los datos en desarrollo.
 * Se ejecuta con ?debug en la URL. Avisa en consola si:
 * - una descripción breve supera 100 caracteres;
 * - falta el calendario de una unidad o hay slugs de concepto repetidos;
 * - un concepto no tiene fuente, o un "alimentaA" apunta a una unidad inexistente;
 * - falta laboratorio.resumen o supera 1000 caracteres;
 * - la guía del taller (material con id 'guia') no existe o es un enlace;
 * - un material con disponible: true apunta a un archivo local que no responde.
 */
import { UNITS_SCHEDULE } from '../config/units.config.js';

export const MAX_SHORT_DESCRIPTION = 100;
export const MAX_LAB_SUMMARY = 1000;

/**
 * Avisa en consola si un material con `disponible: true` apunta a un archivo local
 * que no responde (los enlaces externos no se comprueban: el navegador lo impediría por CORS).
 */
export async function validateMaterialFiles(units) {
  const files = units.flatMap((unit) =>
    (unit.material ?? [])
      .filter((item) => item.disponible && item.archivo)
      .map((item) => ({ unit: unit.id, titulo: item.titulo, archivo: item.archivo })),
  );
  const missing = [];
  await Promise.all(
    files.map(async ({ unit, titulo, archivo }) => {
      try {
        const response = await fetch(encodeURI(archivo), { method: 'HEAD', cache: 'no-store' });
        if (!response.ok) missing.push(`${unit}: «${titulo}» está disponible pero ${archivo} responde ${response.status}.`);
      } catch {
        missing.push(`${unit}: «${titulo}» está disponible pero ${archivo} no responde.`);
      }
    }),
  );
  if (missing.length) {
    console.warn(`[validateMaterialFiles] ${missing.length} archivo(s) de material no responden:`);
    missing.forEach((problem) => console.warn(` · ${problem}`));
  } else {
    console.info(`[validateMaterialFiles] OK: ${files.length} archivo(s) de material disponibles responden.`);
  }
  return missing;
}

export function validateData(units) {
  const problems = [];
  const ids = new Set(units.map((unit) => unit.id));

  units.forEach((unit) => {
    const length = [...(unit.descripcionBreve ?? '')].length;
    if (length > MAX_SHORT_DESCRIPTION) {
      problems.push(`${unit.id}: descripcionBreve tiene ${length} caracteres (máximo ${MAX_SHORT_DESCRIPTION}).`);
    }
    const summary = [...(unit.laboratorio?.resumen ?? '')].length;
    if (!summary) problems.push(`${unit.id}: falta laboratorio.resumen.`);
    if (summary > MAX_LAB_SUMMARY) {
      problems.push(`${unit.id}: laboratorio.resumen tiene ${summary} caracteres (máximo ${MAX_LAB_SUMMARY}).`);
    }
    const guide = unit.material?.find((item) => item.id === 'guia');
    if (!guide) problems.push(`${unit.id}: no hay material con id 'guia' (botón de la pestaña Taller).`);
    else if (!guide.archivo) problems.push(`${unit.id}: la guía (id 'guia') no tiene archivo.`);

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
