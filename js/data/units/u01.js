/**
 * Unidad 1 · Fuente: fuentes/unidades/unidad-01.md
 * Sintaxis de texto: `código` y **negrita** (ver js/utils/dom.js → rich()).
 */
import { ACADEMY_CATALOG, BIBLIO, DOCS, STANDARDS, academyVideo } from '../links.js';

export default {
  id: 'u01',
  numero: 1,
  titulo: 'IA generativa aplicada al desarrollo moderno y al ciclo de vida del software (SDLC)',
  tituloCorto: 'IA generativa y SDLC',
  descripcionBreve: 'Qué es un LLM, asistente frente a agente, SDLC con IA y tu entorno profesional listo.',
  dia: 1,
  bloque: 'mañana',
  nivel: '0 → 10',

  foco: 'Pasar del vibe coding a la ingeniería asistida: entender cómo funciona un LLM, qué hace un agente, dónde aporta la IA en el SDLC y quién sigue siendo responsable.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Explicar un LLM como motor probabilístico con memoria limitada: tokens, ventana de contexto, variabilidad y alucinaciones.',
    'Distinguir un asistente que responde de un agente que actúa y verifica.',
    'Ubicar la IA en el SDLC y entender cómo conviven Scrum y SDD.',
    'Aplicar el marco 4D (Delegación, Descripción, Discernimiento y Diligencia) al programar.',
  ],
  licencias: ['Claude Team Standard', 'JetBrains All Products Pack'],
  herramientas: [
    'Claude Code 2.1.277 o superior',
    'WebStorm y Rider',
    'Plugin Claude Code [Beta] para JetBrains',
    'Claude web (Projects)',
  ],
  requisitos: [],
  pendientes: [],
  catedra: [
    { titulo: 'Presentación del curso: instructor, mapa de 0 a 100, modalidad y proyecto integrador', minutos: 12 },
    { titulo: 'Conceptos fundamentales y material oficial', minutos: 5 },
    { titulo: 'C1 · LLM: tokens, contexto, no determinismo y alucinaciones', minutos: 12 },
    { titulo: 'C2 · Asistente frente a agente; convención `AGENTS.md`', minutos: 10 },
    { titulo: 'C3 · SDLC con IA y SDD: vibe coding, ingeniería asistida, Scrum + SDD', minutos: 25 },
    { titulo: 'C4 · Responsabilidad y marco 4D; actividad "¿Delegar o no?"', minutos: 12 },
    { titulo: 'Cierre y temas para investigar', minutos: 9 },
  ],

  conceptos: {
    obligatorios: [
      {
        slug: 'agents-md',
        titulo: 'AGENTS.md como archivo de instrucciones',
        resumen: 'La memoria del proyecto: comandos, estilo y reglas que el agente no puede adivinar.',
        explicacion: [
          '`AGENTS.md` es un archivo Markdown en la raíz del repositorio con las instrucciones del proyecto para agentes de código: cómo se instala, cómo se prueban los cambios, qué convenciones se siguen y qué está prohibido.',
          'En este curso usamos `AGENTS.md` en lugar de `CLAUDE.md` porque es un estándar abierto que leen agentes de distintos proveedores. Así, las reglas del equipo no quedan atadas a una sola herramienta.',
          'Claude Code lo acepta desde la versión **2.1.277**, pero solo como respaldo: lo lee únicamente si no existe ningún `CLAUDE.md`, ni en el proyecto ni en carpetas superiores (por ejemplo, el home). Por eso, en el taller verificas que no haya un `CLAUDE.md` que lo tape.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: 'AGENTS.md',
          contenido: `# Pedidos Web

## Comandos
- Compilar: dotnet build
- Probar: dotnet test

## Reglas
- Toda funcionalidad nueva parte de un spec.md aprobado.
- Nunca leas ni modifiques archivos .env.
- Commits pequeños, con mensaje en español.`,
        },
        nota: '**Estándar abierto:** `AGENTS.md` (agents.md) lo leen varios agentes de distintos proveedores. **Implementación de Claude:** Claude Code usa `CLAUDE.md` como archivo principal y lee `AGENTS.md` solo como respaldo, desde la versión 2.1.277.',
        fuente: STANDARDS.agentsMd,
      },
      {
        slug: 'entorno-claude-code',
        titulo: 'Entorno profesional: Claude Code + JetBrains',
        resumen: 'Instalar, autenticar y verificar Claude Code, y conectarlo con WebStorm y Rider.',
        explicacion: [
          'El primer paso del taller es que todo el equipo tenga el mismo entorno: Claude Code autenticado con la cuenta Team, en una versión que lea `AGENTS.md`, y conectado al IDE.',
          'En JetBrains se instala el plugin **Claude Code [Beta]** y se abre `claude` desde la terminal integrada. Si el plugin falla, ejecutas `claude` en una terminal externa y te conectas al IDE con `/ide`.',
          'La documentación advierte que, en JetBrains, el modo `acceptEdits` puede modificar archivos de configuración del IDE. El mensaje del curso: pocos plugins, de fuentes confiables, y aprobación manual de las ediciones.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Verificación del entorno',
          contenido: `# Debe mostrar 2.1.277 o superior
claude --version

# Dentro de Claude Code: revisar la configuración
/config

# Si el plugin del IDE falla, conectar desde una terminal externa
/ide`,
        },
        nota: '',
        fuente: DOCS.jetbrainsEs,
      },
      {
        slug: 'mapa-sdlc',
        titulo: 'Mapa de uso de IA en el SDLC',
        resumen: 'Para cada etapa: qué se delega, qué artefacto queda y qué revisa una persona.',
        explicacion: [
          'El entregable de la unidad es `docs/mapa-sdlc.md`: una tabla que recorre las etapas del ciclo de vida del software y deja explícito dónde aporta la IA y con qué control.',
          'Para cada etapa indicas qué tarea se delega a Claude, qué artefacto queda versionado, qué revisa una persona, qué riesgo hay y en qué evento de Scrum ocurre.',
          'El mapa no es una lista de "la IA hace todo". Cada fila debe dejar claro dónde decide una persona. Si en el taller viste a la IA equivocarse y tú lo corregiste, úsalo como evidencia.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: 'docs/mapa-sdlc.md (estructura)',
          contenido: `| Etapa | Se delega a Claude | Artefacto versionado | Revisa una persona | Riesgo | Evento Scrum |
|---|---|---|---|---|---|
| Requisitos | ... | ... | ... | ... | ... |
| Diseño | ... | ... | ... | ... | ... |`,
        },
        nota: '',
        fuente: { titulo: 'AI-native SDLC playbook (Anthropic Academy)', url: ACADEMY_CATALOG },
      },
    ],
    fundamentales: [
      {
        slug: 'llm',
        titulo: 'LLM: motor probabilístico con memoria limitada',
        resumen: 'Tokens, ventana de contexto como presupuesto, variabilidad y alucinaciones.',
        explicacion: [
          'Un modelo de lenguaje (LLM) genera texto token a token según probabilidades. Por eso el mismo prompt puede producir dos respuestas distintas: no es determinista.',
          'Todo lo que el modelo "sabe" durante una conversación cabe en su **ventana de contexto**, que funciona como un presupuesto: instrucciones, archivos leídos y respuestas compiten por el mismo espacio.',
          'Cuando le falta información, el modelo puede completar con supuestos verosímiles pero falsos: una alucinación. En la demo del curso, pedir dos veces una función que valide un RUT chileno muestra diferencias y errores con el dígito verificador "K".',
        ],
        ejemplo: {
          tipo: 'texto',
          contenido: 'Pide dos veces la misma función a Claude y compara: ¿cambió la firma?, ¿manejó la "K"?, ¿inventó alguna regla que no pediste?',
        },
        nota: '',
        fuente: DOCS.contextWindow,
      },
      {
        slug: 'asistente-vs-agente',
        titulo: 'Asistente frente a agente',
        resumen: 'Un asistente responde; un agente actúa y verifica.',
        explicacion: [
          'Un asistente conversacional responde con texto: tú copias, pegas y pruebas. Un agente, como Claude Code, trabaja dentro del repositorio: lee archivos, ejecuta comandos, edita código y verifica el resultado.',
          'Claude tiene varias superficies: la web, los Projects, Claude Code en la terminal, el plugin de JetBrains y Desktop. Y varios modelos (Haiku, Sonnet y Opus) que se eligen según la tarea.',
          'En la demo "Chat, Project o agente" el mismo pedido se hace en las tres superficies para comparar qué entiende y qué hace cada una.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.overview,
      },
      {
        slug: 'sdlc-ia-sdd',
        titulo: 'SDLC con IA y SDD: de vibe coding a ingeniería',
        resumen: 'Cada etapa deja un artefacto versionado; Scrum organiza el trabajo y SDD el desarrollo.',
        explicacion: [
          '**Vibe coding** es programar describiendo "la onda" y aceptando lo que salga sin leerlo. Sirve para prototipos desechables, pero es una pésima práctica para producción: casos reales como Replit/SaaStr (2025) y Lovable (CVE-2025-48757) lo muestran.',
          'La **ingeniería asistida** reconoce que la IA resuelve rápido gran parte del trabajo, pero los casos borde, la seguridad, la integración y la mantenibilidad los exige el desarrollador con objetivos, restricciones y revisión crítica.',
          'En un **SDLC AI-native** cada etapa deja un artefacto versionado que la siguiente lee. **Scrum** dice qué se hace en el sprint y **SDD** dice cómo se construye cada ítem: primero la especificación, después el código.',
        ],
        ejemplo: null,
        nota: '',
        fuente: BIBLIO.osmani,
      },
      {
        slug: 'marco-4d',
        titulo: 'Responsabilidad y marco 4D',
        resumen: 'Delegación, Descripción, Discernimiento y Diligencia aplicados a programar.',
        explicacion: [
          'El marco 4D de AI Fluency ordena cómo trabajar con IA: **Delegación** (qué conviene delegar), **Descripción** (cómo pedirlo bien), **Discernimiento** (cómo evaluar lo que entrega) y **Diligencia** (hacerte responsable de lo que entregas).',
          'El desarrollador sigue siendo responsable del resultado. En la actividad "¿Delegar o no?" el curso decide, para tareas reales de una software factory, si se delegan, se delegan con revisión o no se delegan, y qué "D" pesa más.',
        ],
        ejemplo: {
          tipo: 'texto',
          contenido: 'Escribir tests de un formulario de login: se delega con revisión. Aprobar un PR propio: no se delega.',
        },
        nota: '',
        fuente: { titulo: 'AI Fluency: Framework & Foundations (Anthropic Academy)', url: ACADEMY_CATALOG },
      },
    ],
  },

  laboratorio: {
    nombre: 'Mi entorno y mi mapa',
    modalidad: '', // TODO: el archivo fuente no indica la modalidad (individual/parejas/tríos)
    duracion: 80,
    caso: 'Ingresas como desarrollador al equipo que heredó **"Pedidos Legado → Pedidos Web"**, el sistema de pedidos de una distribuidora, hecho en Delphi con DBISAM. La empresa quiere un portal web nuevo y migrar parte del legado a .NET + PostgreSQL.',
    problematica: 'El equipo trabaja sin IA o con vibe coding aislado: cada uno usa la herramienta a su manera y nadie sabe en qué etapas ayuda de verdad. El líder técnico pide un entorno profesional igual para todos y un mapa de dónde la IA aporta y con qué control.',
    objetivo: 'Dejar tu entorno listo y construir, con ayuda de Claude, el mapa de uso de IA del proyecto.',
    pasos: [
      { minutos: 35, texto: 'Instalar Claude Code, autenticarte con la cuenta Team y verificar con `claude --version` que sea **2.1.277 o superior**. Activar la lectura de instrucciones del proyecto en `/config` y confirmar que no exista ningún `CLAUDE.md` en el home ni en carpetas superiores. Activar la licencia JetBrains, instalar WebStorm y Rider, instalar el plugin Claude Code [Beta] y abrir `claude` desde la terminal integrada. Crear un Project en Claude web con el README del caso.', conceptos: ['C2'] },
      { minutos: 8, texto: 'Responder el cuestionario de madurez entregado y pedirle a Claude que tabule las respuestas.', conceptos: ['C4'] },
      { minutos: 12, texto: 'Implementar la función `formatearFolio()` descrita en el README, primero sin IA y después con Claude Code. Registrar tiempo, errores y qué tuviste que corregir.', conceptos: ['C1', 'C4'] },
      { minutos: 20, texto: 'Construir `docs/mapa-sdlc.md`: para cada etapa del SDLC, qué tarea se delega a Claude, qué artefacto queda versionado, qué revisa una persona, qué riesgo hay y en qué evento de Scrum ocurre.', conceptos: ['C3', 'C4'] },
      { minutos: 5, texto: 'Commit del mapa y cierre grupal: cada fila comparte una etapa.', conceptos: [] },
    ],
    puntosControl: [
      'Claude Code responde dentro del repo desde el IDE y, al preguntarle por las reglas del proyecto, cita el `AGENTS.md` de ejemplo.',
    ],
    resultadoEsperado: [
      'El mapa no es una lista de "la IA hace todo": cada etapa deja claro dónde decide una persona.',
      'Si el paso 3 te mostró un error que la IA cometió y tú corregiste, úsalo como evidencia en el mapa.',
    ],
    siTeTrabas: [
      'La guía de instalación del plugin para JetBrains y la lección "Installing Claude Code" de Claude Code 101.',
      'Cómo se activa `AGENTS.md` en Claude Code.',
      'Para el mapa, la tabla tradicional frente a AI-native del playbook.',
    ],
    erroresFrecuentes: [], // TODO: el archivo fuente no trae una lista de errores frecuentes
    planB: [
      'Si falla la terminal, usar la pestaña "Code" de Claude Desktop.',
      'Si falla el plugin, ejecutar `claude` en una terminal externa y conectarse con `/ide`.',
      'Si falla la red, hacer el mapa en papel con la plantilla impresa.',
    ],
    extension: '',
  },

  material: [
    { tipo: 'pdf', titulo: 'Guía del taller "Mi entorno y mi mapa"', archivo: 'assets/material/u01/guia-taller.pdf', disponible: false },
    { tipo: 'pdf', titulo: 'Caso guiado Scrum + SDD', archivo: 'assets/material/u01/caso-scrum-y-sdd.pdf', disponible: false },
    { tipo: 'pdf', titulo: 'Plantilla impresa del mapa SDLC', archivo: 'assets/material/u01/plantilla-mapa-sdlc.pdf', disponible: false },
    { tipo: 'png', titulo: 'Infografía de la unidad', archivo: 'assets/material/u01/infografia.png', disponible: false },
  ],

  videos: [
    academyVideo('aiFluency', 'Curso completo, base del marco 4D.'),
    academyVideo('aiFluencyBuilders', 'Variante de AI Fluency para quienes construyen software.'),
    academyVideo('claude101'),
    academyVideo('claudeCode101', 'Lecciones "What is Claude Code?" e "Installing Claude Code".'),
    academyVideo('aiNativeSdlc', 'Lectura completa del playbook.'),
  ],

  paraInvestigar: [
    'Estándar `AGENTS.md` en agents.md.',
    'Guía oficial de Scrum (scrumguides.org).',
    'Prefacio y capítulo "The 70% Problem" de *Beyond Vibe Coding* (Osmani).',
    'Historia de los asistentes de código y casos de adopción (customer stories de claude.com).',
  ],

  entregable: {
    nombre: 'Mapa de uso de IA en el SDLC',
    criterios: [
      '`docs/mapa-sdlc.md` versionado en el repo del caso hilo.',
      'Cada etapa indica qué se delega, qué artefacto queda, qué revisa una persona, el riesgo y el evento de Scrum.',
      'Tabla del paso 3: tiempo, errores y correcciones con y sin IA.',
    ],
    alimentaA: 'u02',
  },
};
