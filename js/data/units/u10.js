/**
 * Unidad 10 · Fuente: fuentes/unidades/unidad-10.md (versión 2, 12-nov-2026)
 */
import { ACADEMY_COURSES, BIBLIO, COURSE_SITES, DOCS, MATERIAL_REPO, academyVideo } from '../links.js';

/** Carpeta de la Unidad 10 en el repositorio de material (rama main). */
const U10_TREE = `${MATERIAL_REPO.url}/tree/main/unidad-10`;

export default {
  id: 'u10',
  numero: 10,
  titulo: 'Retorno de la inversión (ROI), productividad y taller integrador',
  tituloCorto: 'ROI y taller integrador',
  descripcionBreve: 'Medir lo que importa, ROI con supuestos y un plan integrado en PDF para la gerencia.',
  dia: 5,
  bloque: 'tarde',
  nivel: '95 → 100',

  foco: 'Decirle a la gerencia, en un PDF, cuánto cuesta, cuánto aporta y qué sigue con la forma de trabajar de Pedidos Web: un ROI honesto, un informe de 1 página y un plan que conecta tus entregables.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Medir si la forma de trabajar sirve con las 5 métricas DORA, no solo si se usa.',
    'Calcular un ROI como rango: supuestos con tipo y fuente, dos escenarios y sensibilidad.',
    'Contar para decidir: un informe de 1 página en 5 franjas, con recomendación y Diligencia.',
    'Conectar tus nueve entregables en un plan que la gerencia pueda aprobar o rechazar.',
  ],
  licencias: ['Claude Pro (demos del instructor)', 'Claude Team Standard (taller; también funciona con Pro)'],
  herramientas: ['Claude Code 2.1.281 o superior', 'Skill `pdf-con-estilo` de la U9 (Python con Playwright)'],
  requisitos: [
    {
      titulo: 'Tu pedidos-web con lo nuevo de la Unidad 10',
      texto: 'En el receso, Claude Code trae `docs/roi/` (el CSV y dos plantillas). Se suma; no reemplaza nada tuyo.',
      enlace: { titulo: 'README de pedidos-web (camino A)', url: `${U10_TREE}/taller/pedidos-web` },
    },
    {
      titulo: 'Tu Skill `pdf-con-estilo` funcionando',
      texto: 'La usas en la etapa 3. Si falla, reinstala Playwright (en Windows PowerShell, `py -m` en vez de `python3 -m`).',
      codigo: { lenguaje: 'bash', contenido: 'python3 -m pip install playwright markdown\npython3 -m playwright install chromium' },
    },
  ],
  pendientes: [],
  catedra: [
    { titulo: 'Apertura (láminas 1–3) y repaso «Antes del receso» (lámina 18)', minutos: 6 },
    { titulo: 'C1 · Medir lo que importa: DORA, panel de analytics y demo «La métrica trampa» (arriendo-web)', minutos: 16 },
    { titulo: 'C2 · ROI con supuestos: tres tipos de supuesto, escenarios, sensibilidad y demo «ROI con supuestos» (arriendo-web)', minutos: 18 },
    { titulo: 'C3 · Contar para decidir: informe en 5 franjas, Diligencia y demo «El informe en 1 página» (arriendo-web)', minutos: 14 },
    { titulo: 'C4 · Integrar: de 0 a 100, seis prácticas y cómo seguir', minutos: 6 },
  ],

  conceptos: {
    obligatorios: [
      {
        slug: 'metricas-dora',
        titulo: 'Métricas DORA',
        resumen: 'Cinco métricas en dos grupos: throughput e inestabilidad.',
        explicacion: [
          'DORA mide la entrega de software con **5 métricas** en 2 grupos. **Throughput:** change lead time, deployment frequency y failed deployment recovery time. **Inestabilidad:** change fail rate y deployment rework rate. La adopción dice si se usa; DORA dice si sirve.',
          'El panel de analytics de Claude Code mide adopción: usuarios activos y sesiones, líneas aceptadas y tasa de aceptación. La contribución (PR y líneas con Claude Code) está en beta con la GitHub app y no está disponible con Zero Data Retention. Usar no es aportar, aceptar no es revisar, y las líneas aceptadas no descuentan las que después se borran.',
        ],
        ejemplo: {
          tipo: 'texto',
          contenido: 'Demo 1, «La métrica trampa» (arriendo-web): los equipos ficticios Tarifas y Reservas, 8 semanas. Primero: «Con solo la columna lineas_aceptadas, ¿qué equipo rinde más?». Después: «Ahora usa las columnas DORA, defectos y retrabajo. ¿Cambia tu respuesta?». La conclusión se da vuelta: Reservas rinde más, y cada afirmación cita una columna del CSV.',
        },
        nota: '',
        fuente: BIBLIO.doraMetrics,
      },
      {
        slug: 'modelo-roi',
        titulo: 'Modelo de ROI con escenarios y sensibilidad',
        resumen: 'ROI = (beneficio − costo) / costo, con cada supuesto marcado como oficial, medido o estimado.',
        explicacion: [
          '**Costos:** asientos, capacitación y curva de adopción; es decir, lo que pagas y lo que cuesta aprender. **Beneficios:** horas ahorradas × valor hora y defectos evitados × costo en producción. El uso extra se revisa con `/usage`.',
          'Cada supuesto lleva su **tipo** y su fuente. **Oficial:** publicado por el proveedor, con fecha (asiento Team Standard, USD 25/mes en la página de precios, 12-nov-2026). **Medido:** dato del propio piloto (lead time, defectos y retrabajo del CSV). **Estimado:** juicio del equipo, siempre el más débil (valor hora de USD 20, supuesto del ejercicio). Si no puedes decir de dónde salió un número, no entra al modelo.',
          'Siempre dos escenarios, **conservador** (el ahorro más bajo que defenderías) y **optimista** (el piloto se replica tal cual), y una sensibilidad: ¿y si el ahorro es la mitad? Si el ROI cambia de signo con un solo supuesto, ese supuesto es lo primero que hay que medir.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'text',
          titulo: 'Demo 2 · resultado esperado (arriendo-web, 6 meses, 8 devs)',
          contenido: `Costo             USD 6.000
Conservador       +58,7 %
Optimista         +128 %
Ahorro a la mitad -10,7 %`,
        },
        nota: '',
        fuente: DOCS.costs,
      },
      {
        slug: 'informe-ejecutivo',
        titulo: 'Informe ejecutivo de una página',
        resumen: 'Cinco franjas: problema, qué se hizo, resultados, recomendación y próximo paso.',
        explicacion: [
          'Si alguien de la gerencia lee solo la primera página, debe saber qué decidir. Las 5 franjas: **1 Problema** (qué decisión hay que tomar y por qué ahora), **2 Qué se hizo** (el piloto en dos líneas, sin jerga), **3 Resultados** (con su rango e incertidumbre), **4 Recomendación** (una sola, que se pueda aprobar o rechazar) y **5 Próximo paso** (quién, qué y para cuándo).',
          '**Diligencia:** el informe declara que se preparó con apoyo de IA y que una persona verificó las cifras: «Preparado con apoyo de IA; cifras verificadas por [nombre]».',
          'En la demo 3, «El informe en 1 página» (arriendo-web), Claude Code critica `informe-malo.md` con las 5 franjas y lo reescribe en `docs/roi/informe-ejecutivo.md`, usando solo cifras de `modelo-roi.md` y con la línea de Diligencia.',
        ],
        ejemplo: {
          tipo: 'texto',
          contenido: 'Así no: «Implementamos subagentes y hooks; la productividad subió 300 %.» (jerga y ninguna decisión). Así sí: «Recomendamos extenderlo a [__] equipos por [__] meses. Decisión antes del [fecha].» (se aprueba o se rechaza).',
        },
        nota: '',
        fuente: ACADEMY_COURSES.aiFluency,
      },
    ],
    fundamentales: [
      {
        slug: 'medir-lo-que-importa',
        titulo: 'Medir lo que importa',
        resumen: 'Velocidad y calidad, no líneas de código.',
        explicacion: [
          'Medir solo actividad (líneas, sesiones) premia el volumen, no el valor. La adopción dice si se usa; DORA dice si sirve: velocidad de entrega (throughput) y estabilidad (inestabilidad).',
          'Ningún indicador se mira solo. En la demo 1, Tarifas y Reservas (equipos ficticios) se leen primero con `lineas_aceptadas` y después con DORA, defectos y retrabajo: la métrica trampa es quedarse con la primera lectura.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.analytics,
      },
      {
        slug: 'roi-con-supuestos',
        titulo: 'ROI con supuestos',
        resumen: 'Sin supuestos escritos, el número no vale.',
        explicacion: [
          'Cada supuesto es **oficial**, **medido** o **estimado**, y lleva su fuente. Un ROI honesto y modesto convence más que uno espectacular sin respaldo.',
          'Es un rango, no un número: conservador, optimista y sensibilidad. Si no puedes decir de dónde salió un número, no entra al modelo.',
          'Advertencia del curso: los datos son ficticios y la muestra es pequeña. El ROI se trabaja como **ejercicio de método**, no como evidencia de productividad.',
        ],
        ejemplo: null,
        nota: '',
        fuente: BIBLIO.pricing,
      },
      {
        slug: 'contar-para-decidir',
        titulo: 'Contar para decidir',
        resumen: 'Una página, una recomendación.',
        explicacion: [
          'Un informe malo está lleno de tecnicismos, no tiene recomendación y trae cifras sin fuente. Uno bueno cabe en una página, abre con la recomendación y termina en una decisión.',
          'La Diligencia declara el apoyo de IA y quién verificó las cifras. El anexo del plan no repite tus entregables: los cita.',
        ],
        ejemplo: null,
        nota: '',
        fuente: ACADEMY_COURSES.aiFluency,
      },
      {
        slug: 'integrar',
        titulo: 'Integrar',
        resumen: 'Nueve entregables, un solo plan.',
        explicacion: [
          'De 0 a 100, cada entregable alimenta al siguiente: mapa del SDLC (U1), flujo SDD (U2), módulo documentado (U3), diagnóstico del legado (U4), plan de migración (U5), pipeline con tests (U6), code review (U7), guía de gobernanza (U8) y plan de la BU con el playbook (U9). El plan integrado (U10) no repite los nueve: los conecta.',
          'Seis prácticas que te llevas: spec primero (U2), tú firmas (U2), pasos chicos y tests (U3 · U6), mirar sin tocar (U4 · U5), la IA comenta y tú decides (U7) y política ejecutable (U8 · U9). MCP, Agent Skills y `AGENTS.md` son estándares abiertos que otras herramientas leen en distinto grado.',
          'Para seguir: los cursos oficiales de Claude Academy y la certificación *Claude Certified Developer – Foundations* (USD 125, solo para personas de organizaciones del Claude Partner Network).',
        ],
        ejemplo: null,
        nota: '',
        fuente: BIBLIO.certFaq,
      },
    ],
  },

  laboratorio: {
    nombre: 'Plan integrado de adopción de IA',
    modalidad: 'Individual',
    duracion: 90,
    caso: 'Terminó el piloto. La gerencia decide si extiende la forma de trabajar de Pedidos Web, y no va a leer nueve documentos.',
    problematica: 'La gerencia necesita cuatro respuestas: **¿cuánto cuesta?** (asientos, capacitación y aprendizaje), **¿cuánto aporta?** (horas, defectos y tiempos de entrega), **¿qué riesgos hay?** (qué podría salir mal y cómo se controla) y **¿qué sigue?** (la recomendación y el próximo paso). Los datos son ficticios y la muestra es pequeña: este ROI es un ejercicio de método, no una prueba de productividad.',
    objetivo: 'Decirle a la gerencia, en un PDF, cuánto cuesta, cuánto aporta y qué sigue con la forma de trabajar de Pedidos Web.',
    // Resumen visible en la pestaña Taller (máx. 1000 caracteres; el detalle está en la guía PDF).
    resumen: 'Trabajas solo en tu `pedidos-web` para decirle a la gerencia, en un PDF, cuánto cuesta, cuánto aporta y qué sigue con la forma de trabajar de Pedidos Web. Terminó el piloto y la gerencia decide si la extiende; no va a leer nueve documentos. Traes `docs/roi/` con Claude Code (el CSV del piloto y dos plantillas) y avanzas en 3 etapas. Primero mides: reúnes `datos-piloto.csv` y tu evidencia de las unidades 5 a 9, cada número con su fuente y FALTA donde no hay dato. Después armas `modelo-roi.md`: cada supuesto con su tipo (oficial, medido o estimado), dos escenarios y la sensibilidad. Por último completas `plan-integrado.md` (informe de 1 página en 5 franjas y anexo) y generas `plan-integrado.pdf` con tu Skill `pdf-con-estilo`. Cierras con «Tu reto», obligatorio: el punto de equilibrio, como sección nueva en tu modelo y en tu PDF. Los datos son ficticios y la muestra es pequeña: es un ejercicio de método. El paso a paso está en la guía.',
    pasos: [
      { minutos: 5, texto: 'Preparación: pídele a Claude Code que traiga a tu repo lo nuevo de la Unidad 10 (`docs/roi/` con `datos-piloto.csv`, `modelo-roi.md` y `plan-integrado.md`), sin tocar ningún otro archivo y mostrándote el diff antes del commit. Comprueba que tu Skill `pdf-con-estilo` genera un PDF de prueba.', conceptos: [] },
      { minutos: 20, texto: 'Medir: pídele a Claude Code que lea `docs/roi/datos-piloto.csv` y tus entregables de las unidades 5 a 9, y que complete la sección «Datos» de `docs/roi/modelo-roi.md` con cada número y su fuente (archivo y semanas). Si un dato no está, que escriba FALTA.', conceptos: ['C1'] },
      { minutos: 30, texto: 'ROI con supuestos: pídele a Claude Code que complete `docs/roi/modelo-roi.md`: cada supuesto con su tipo (oficial, medido o estimado) y su fuente, escenarios conservador y optimista, y la sensibilidad con el ahorro a la mitad, mostrando cada cálculo. Revisa a mano al menos una cuenta y sube el commit.', conceptos: ['C2'] },
      { minutos: 35, texto: 'Plan integrado en PDF: pídele a Claude Code que complete `docs/roi/plan-integrado.md` (informe de 1 página en 5 franjas, con la línea de Diligencia, y el anexo), solo con cifras de `modelo-roi.md`, y que genere `docs/roi/plan-integrado.pdf` con tu Skill `pdf-con-estilo`, sin tocar su CSS. Súbelo a `main`.', conceptos: ['C3', 'C4'] },
      // Etapa obligatoria sin minutos asignados: si no alcanzas en clase, se termina en casa.
      { minutos: null, texto: 'Tu reto (obligatorio): ¿cuántas horas ahorradas por dev al mes dejan el ROI en 0? Súmalo como sección «Punto de equilibrio» a tu modelo y a tu PDF, con el mismo modelo de la etapa 2, y revisa tú el despeje. El pedido a Claude Code lo escribes tú, con contexto, qué quieres y cómo sabes que quedó bien.', conceptos: ['C2'] },
    ],
    puntosControl: [
      '`docs/roi/` está en tu repo, el diff no muestra nada más y tu Skill genera un PDF de prueba (preparación).',
      'Cada dato tiene archivo y semanas; lo que falta dice FALTA (etapa 1).',
      'Ningún número sin supuesto: cada uno con su tipo y su fuente (etapa 2).',
      'El PDF abre con la recomendación en la página 1 y la línea de Diligencia (etapa 3).',
      '`modelo-roi.md` y `plan-integrado.pdf` tienen la sección «Punto de equilibrio» y están en `main` (Tu reto).',
    ],
    resultadoEsperado: [
      'Un ROI honesto, con sus supuestos: un rango, no un solo número.',
      'Un informe de 1 página para decidir: la recomendación está en la página 1.',
      'Un plan que conecta tus entregables: el anexo los cita, no los repite.',
      'Un ROI honesto y modesto convence más que uno espectacular sin respaldo.',
    ],
    siTeTrabas: [
      '*Track team usage with analytics*, para entender qué mide el panel y qué no (etapa 1).',
      '*DORA\'s software delivery performance metrics*, para las 5 métricas en dos grupos (etapa 1).',
      '*Manage costs effectively*, para los costos de Claude Code por dev (etapa 2).',
      '*Planes y precios de Claude*, para el asiento Team Standard (etapa 2).',
      '*AI Fluency: Framework & Foundations*, para Descripción y Diligencia (etapa 3).',
    ],
    erroresFrecuentes: [
      'El ROI da 900 % → ¿multiplicaste una sola tarea por todo el horizonte? Revisa las horas ahorradas.',
      'Los costos son solo los asientos → faltan la capacitación y la curva de adopción.',
      'Claude agregó un dato que no está en el CSV → cada número necesita archivo y semanas; si no está, dice FALTA.',
      'El ROI da negativo → no es un error: infórmalo con su rango y el supuesto que lo mueve.',
      'La Skill no genera el PDF → ¿está Playwright instalado y la Skill en `.claude/skills/pdf-con-estilo/`?',
    ],
    planB: [],
    extension: '',
  },

  material: [
    { id: 'presentacion', tipo: 'pdf', variante: 'presentacion', titulo: 'Presentación de clases · Unidad 10', descripcion: 'Las diapositivas que usamos en el encuentro, para repasar o consultar después.', archivo: 'assets/material/u10/presentacion-clase.pdf', peso: '6,8 MB', disponible: true },
    // variante 'cuestionario' → tarjeta destacada, justo después de la presentación (sin destino: va en Recursos).
    { id: 'cuestionario', tipo: 'enlace', variante: 'cuestionario', titulo: 'Cuestionario final del curso', descripcion: 'Practica para la certificación Claude Certified Developer – Foundations: 30 preguntas, 20 minutos y tu resultado al final.', url: COURSE_SITES.cuestionarioFinal.url, preguntas: 30, minutos: 20, aprobacion: '70 %', disponible: true },
    { id: 'guia', tipo: 'pdf', titulo: 'Guía del taller "Plan integrado de adopción de IA"', archivo: 'assets/material/u10/guia-taller.pdf', disponible: true },
    // destino: 'taller' → se ve en la pestaña Taller, no en Recursos.
    { tipo: 'enlace', titulo: 'Proyecto del taller: pedidos-web (base de la U10)', descripcion: 'El README explica qué traer a tu repo (camino A): solo se suma `docs/roi/`.', url: `${U10_TREE}/taller/pedidos-web`, disponible: true, destino: 'taller' },
    { tipo: 'enlace', titulo: 'Demos de la unidad: arriendo-web', descripcion: 'Mide, calcula y cuenta.', url: `${U10_TREE}/demos`, disponible: true },
  ],

  videos: [
    academyVideo('aiFluency', 'Descripción y Diligencia.'),
    academyVideo('aiNativeSdlc'),
    academyVideo('claudePlatform101', 'Curso de Claude Academy sobre la plataforma.'),
  ],

  paraInvestigar: [
    'API de analytics de Enterprise y OpenTelemetry para métricas propias.',
    'Estudios publicados sobre productividad con IA en desarrollo de software (citar siempre la fecha y la muestra).',
    'El marco DORA completo.',
    'La certificación *Claude Certified Developer – Foundations* (USD 125, solo para personas de organizaciones del Claude Partner Network).',
  ],

  entregable: {
    nombre: 'Plan integrado de adopción de IA',
    criterios: [
      '`docs/roi/modelo-roi.md` con cada número con su tipo y su fuente, dos escenarios y la sensibilidad.',
      '`docs/roi/plan-integrado.pdf` en `main` con el informe de 1 página en 5 franjas, la línea de Diligencia y el anexo, generado con `pdf-con-estilo`.',
      'La sección «Punto de equilibrio» en el modelo y en el PDF (tu reto).',
    ],
    alimentaA: null, // Cierre del curso
  },
};
