/**
 * validate.js · Validación de los datos en desarrollo.
 * Se ejecuta con ?debug en la URL. Avisa en consola si:
 * - una descripción breve supera 100 caracteres;
 * - falta el calendario de una unidad o hay slugs de concepto repetidos;
 * - un concepto no tiene fuente, o un "alimentaA" apunta a una unidad inexistente;
 * - falta laboratorio.resumen o supera 1000 caracteres;
 * - la guía del taller (material con id 'guia') no existe o es un enlace;
 * - un material con disponible: true apunta a un archivo local que no responde;
 * - un material tiene una `variante` desconocida, o la presentación no es PDF, no tiene archivo
 *   o su `peso` no tiene el formato '4,2 MB';
 * - un cuestionario (variante 'cuestionario') no es un enlace https, o le faltan `preguntas`, `minutos` o `aprobacion`;
 * - un apunte de lenguaje (variante 'lenguaje') no es PDF, no tiene archivo, no tiene `icono` registrado
 *   en ICON_FILES o su `peso` no tiene el formato '4,2 MB'.
 */
import { UNITS_SCHEDULE } from '../config/units.config.js';
import { ICON_FILES } from './icons.js';

export const MAX_SHORT_DESCRIPTION = 100;
export const MAX_LAB_SUMMARY = 1000;
/** Valores admitidos de `variante` en un material. */
export const MATERIAL_VARIANTS = ['presentacion', 'lenguaje', 'cuestionario'];

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

    (unit.material ?? []).forEach((item) => {
      if (item.variante !== undefined && !MATERIAL_VARIANTS.includes(item.variante)) {
        problems.push(`${unit.id}: «${item.titulo}» tiene variante «${item.variante}» (admitidas: ${MATERIAL_VARIANTS.join(', ')}).`);
      }
      if (item.variante === 'presentacion') {
        if (item.tipo !== 'pdf') problems.push(`${unit.id}: la presentación «${item.titulo}» debe ser tipo 'pdf'.`);
        if (!item.archivo) problems.push(`${unit.id}: la presentación «${item.titulo}» no tiene archivo.`);
        if (item.peso && !/^\d+(,\d)? MB$/.test(item.peso)) {
          problems.push(`${unit.id}: peso «${item.peso}» no tiene el formato '4,2 MB'.`);
        }
      }
      if (item.variante === 'cuestionario') {
        if (item.tipo !== 'enlace') problems.push(`${unit.id}: el cuestionario «${item.titulo}» debe ser tipo 'enlace'.`);
        if (!/^https:\/\//.test(item.url ?? '')) problems.push(`${unit.id}: el cuestionario «${item.titulo}» necesita una url https.`);
        ['preguntas', 'minutos'].forEach((key) => {
          if (!Number.isInteger(item[key]) || item[key] <= 0) {
            problems.push(`${unit.id}: el cuestionario «${item.titulo}» necesita ${key} (número entero positivo).`);
          }
        });
        if (!item.aprobacion) problems.push(`${unit.id}: el cuestionario «${item.titulo}» necesita aprobacion (por ejemplo '70 %').`);
      }
      if (item.variante === 'lenguaje') {
        if (item.tipo !== 'pdf') problems.push(`${unit.id}: el apunte «${item.titulo}» debe ser tipo 'pdf'.`);
        if (!item.archivo) problems.push(`${unit.id}: el apunte «${item.titulo}» no tiene archivo.`);
        if (!item.icono) problems.push(`${unit.id}: el apunte «${item.titulo}» no tiene icono.`);
        else if (!(item.icono in ICON_FILES)) {
          problems.push(`${unit.id}: el icono «${item.icono}» de «${item.titulo}» no está en ICON_FILES.`);
        }
        if (item.peso && !/^\d+(,\d)? MB$/.test(item.peso)) {
          problems.push(`${unit.id}: peso «${item.peso}» de «${item.titulo}» no tiene el formato '4,2 MB'.`);
        }
      }
    });

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
