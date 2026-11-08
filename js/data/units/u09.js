/**
 * Unidad 9 · Fuente: fuentes/unidades/unidad-09.md
 */
import { ACADEMY_CATALOG, BIBLIO, DOCS, STANDARDS, academyVideo } from '../links.js';

export default {
  id: 'u09',
  numero: 9,
  titulo: 'Escalabilidad, madurez organizacional y adopción de la IA',
  tituloCorto: 'Madurez y adopción',
  descripcionBreve: 'Modelo de madurez, multiplicadores, playbook como plugin y MCP de solo lectura.',
  dia: 5,
  bloque: 'mañana',
  nivel: '88 → 95',

  foco: 'Diagnosticar la madurez de una Business Unit, diseñar su roadmap y entregar un playbook instalable (plugin con MCP de solo lectura) y un plan en PDF generado por una Skill propia.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Ubicar equipos en un modelo de madurez de 5 niveles con indicadores de adopción.',
    'Diseñar una estrategia de adopción con piloto, champions y multiplicadores.',
    'Empaquetar las buenas prácticas como plugin instalable desde un marketplace interno.',
    'Elegir superficie y modelo según la tarea, y apoyarse en estándares abiertos para no quedar atado.',
  ],
  licencias: ['Claude Team Standard'],
  herramientas: ['Docker con `pedidos-pg` (Unidad 5)', 'Python 3 con Playwright', 'Plugins y marketplaces de Claude Code', 'Servidor MCP de PostgreSQL'],
  requisitos: [
    {
      titulo: 'Preparación previa',
      texto: 'Lo usa la Skill de PDF del taller. Si falla, sirve Chrome o Edge en modo headless.',
      codigo: { lenguaje: 'bash', contenido: 'pip install playwright && playwright install chromium' },
    },
  ],
  pendientes: [],
  catedra: [
    { titulo: 'Apertura: conceptos fundamentales y material oficial', minutos: 5 },
    { titulo: 'C1 · Madurez: modelo de 5 niveles e indicadores', minutos: 15 },
    { titulo: 'C2 · Multiplicadores: piloto, champions y ritmo', minutos: 10 },
    { titulo: 'C3 · Playbook como código: plugins y marketplace', minutos: 25 },
    { titulo: 'C4 · Herramienta justa: superficie, modelo y MCP', minutos: 20 },
    { titulo: 'Cierre y temas para investigar', minutos: 10 },
  ],

  conceptos: {
    obligatorios: [
      {
        slug: 'plugin',
        titulo: 'Plugin de Claude Code',
        resumen: 'Empaqueta Skills, subagentes, hooks y servidores MCP en una unidad versionada.',
        explicacion: [
          'Un plugin reúne Skills, subagentes, hooks y servidores MCP para instalarlos de una vez. Su estructura mínima es `.claude-plugin/plugin.json` más las carpetas `skills/`, `agents/`, `hooks/` y `.mcp.json`.',
          'Limitación: `AGENTS.md` no viaja dentro del plugin, porque es un archivo de cada repositorio. El playbook lo entrega como **plantilla** para copiar.',
          'El plugin se valida en una máquina que no sea la de quien lo creó: si solo funciona en la máquina de A, no es un playbook.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'text',
          titulo: 'pedidos-playbook/',
          contenido: `pedidos-playbook/
├── .claude-plugin/plugin.json
├── skills/
│   ├── documentar-modulo/SKILL.md
│   └── planificador-proyectos-web/SKILL.md
├── agents/revisor.md
├── hooks/
├── .mcp.json
└── plantillas/AGENTS.md`,
        },
        nota: '**Implementación de Claude Code:** el formato de plugins y marketplaces es propio de Claude Code; las Skills y MCP que empaqueta son estándares abiertos.',
        fuente: BIBLIO.pluginsEs,
      },
      {
        slug: 'marketplace',
        titulo: 'Marketplace interno',
        resumen: 'Un repo de GitHub con `.claude-plugin/marketplace.json` desde donde los equipos instalan.',
        explicacion: [
          'Un marketplace interno es un repositorio de GitHub con `.claude-plugin/marketplace.json`. Los equipos lo agregan una vez y luego instalan los plugins que publica.',
          'Así, "las buenas prácticas se instalan, no se leen": una actualización del playbook llega a todos los equipos.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Dentro de Claude Code',
          contenido: `/plugin marketplace add org/repo
/plugin install pedidos-playbook`,
        },
        nota: '',
        fuente: BIBLIO.pluginsReference,
      },
      {
        slug: 'mcp',
        titulo: 'MCP: Model Context Protocol',
        resumen: 'Un protocolo abierto para conectar agentes con herramientas y datos externos.',
        explicacion: [
          'MCP define cómo un agente se conecta con servidores que exponen herramientas y datos. Un mismo servidor MCP sirve para distintos clientes compatibles.',
          'En la demo "Mi primer MCP en 3 minutos" se conecta el servidor MCP oficial de Claude Academy (solo lectura, sin autenticación), se le pide buscar cursos sobre subagentes y se revisan sus herramientas en `/mcp`.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Conectar un servidor MCP por HTTP',
          contenido: 'claude mcp add --transport http claude-academy https://academy.claude.com/mcp',
        },
        nota: '**Estándar abierto:** MCP (modelcontextprotocol.io). **Implementación de Claude Code:** el comando `claude mcp add`, el archivo `.mcp.json` y `/mcp`.',
        fuente: STANDARDS.mcp,
      },
      {
        slug: 'mcp-solo-lectura',
        titulo: 'MCP de PostgreSQL en modo solo lectura',
        resumen: '"Solo lectura" se demuestra: una instrucción de escritura debe ser rechazada.',
        explicacion: [
          'Los equipos de reportes necesitan consultar la base del portal **sin permiso de escritura**. En el plugin se agrega en `.mcp.json` un servidor MCP de PostgreSQL en modo restringido apuntando a `pedidos-pg`.',
          'Punto de control: preguntar "¿cuántos pedidos hay por estado?" y verificar que una instrucción de escritura sea rechazada. Si Claude logra escribir en la base, el MCP está mal configurado.',
          'En Linux, para que el contenedor alcance la base, agrega `--add-host=host.docker.internal:host-gateway`.',
        ],
        ejemplo: null,
        nota: '**Servidor de terceros:** Postgres MCP Pro (modo `--access-mode=restricted`). Anthropic no audita servidores MCP de terceros.',
        fuente: BIBLIO.postgresMcp,
      },
    ],
    fundamentales: [
      {
        slug: 'madurez',
        titulo: 'Madurez',
        resumen: 'Mide dónde estás antes de decidir hacia dónde ir.',
        explicacion: [
          'Modelo de 5 niveles de Vela LATAM: **1** Uso a escondidas · **2** Uso individual · **3** Equipo con reglas (`AGENTS.md`, `REVIEW.md` y hooks compartidos) · **4** Proceso AI-native (spec → plan → CI → revisión) · **5** Organización que mide y mejora.',
          'Indicadores del panel de analytics: usuarios activos, sesiones, líneas aceptadas, tasa de aceptación y PR con asistencia de Claude Code. En clase se muestran con datos ficticios.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.analytics,
      },
      {
        slug: 'multiplicadores',
        titulo: 'Multiplicadores',
        resumen: 'La adopción la empujan personas, no licencias.',
        explicacion: [
          'Estrategia: un piloto chico, champions por equipo y un desarrollador senior que actúa como multiplicador. Ritmo: estandarizar flujos, medir, ajustar y escalar.',
          'Errores típicos: comprar licencias sin capacitar, imponer sin piloto y medir solo líneas de código.',
        ],
        ejemplo: null,
        nota: '',
        fuente: { titulo: 'Deploying Claude Enterprise with confidence (Anthropic Academy)', url: ACADEMY_CATALOG },
      },
      {
        slug: 'playbook-como-codigo',
        titulo: 'Playbook como código',
        resumen: 'Las buenas prácticas se instalan, no se leen.',
        explicacion: [
          'Un documento de buenas prácticas se olvida; un plugin instalado se usa. El playbook del equipo incluye Skills, subagente revisor, el hook guardián de la Unidad 8 y la plantilla de `AGENTS.md`.',
          'En la demo, el instructor publica `vela-playbook` con la Skill `planificador-proyectos-web` y los alumnos lo instalan en vivo.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.pluginsOverview,
      },
      {
        slug: 'herramienta-justa',
        titulo: 'Herramienta justa',
        resumen: 'Superficie y modelo según la tarea; estándares para no quedar atado.',
        explicacion: [
          'Dentro del ecosistema: qué superficie usar (chat, Claude Code en terminal o IDE, Desktop, web, CI) y qué modelo (Haiku para tareas simples y baratas, Sonnet para el día a día, Opus para lo complejo).',
          'Portabilidad: MCP, Agent Skills y `AGENTS.md` son formatos abiertos, así que reducen el costo de cambiar de herramienta en el futuro.',
        ],
        ejemplo: null,
        nota: '**Estándares abiertos:** MCP, Agent Skills y `AGENTS.md`.',
        fuente: DOCS.modelConfig,
      },
    ],
  },

  laboratorio: {
    nombre: 'Plan de evolución para una Business Unit',
    modalidad: 'Grupos de 3',
    duracion: 80,
    caso: 'La BU de Desarrollo de la distribuidora tiene 4 equipos. El de Pedidos Web ya trabaja como en este curso. La gerencia quiere que los otros tres adopten la misma forma de trabajar y pide un **plan de evolución** en PDF y un **playbook instalable**.',
    problematica: '`analytics-ficticio.csv` muestra una adopción muy dispar: un equipo usa Claude Code a diario y bien, otro casi no lo usa y otro lo usa mucho pero con una tasa de aceptación bajísima. Cada equipo tiene sus reglas, y los equipos de reportes piden consultar la base del portal **sin permiso de escritura**.',
    objetivo: 'Diagnosticar la BU, diseñar el roadmap y entregar el plugin del playbook (con acceso de solo lectura a la base vía MCP) y el plan en PDF generado por una Skill propia.',
    roles: [
      '**A, arquitecto del playbook:** plugin + MCP.',
      '**B, diseñador:** Skill de PDF.',
      '**C, estratega:** diagnóstico y roadmap.',
    ],
    // Resumen visible en la pestaña Taller (máx. 1000 caracteres; el detalle está en la guía PDF).
    resumen: 'La BU de Desarrollo tiene 4 equipos con una adopción muy dispar, y la gerencia quiere que los otros tres trabajen como el de Pedidos Web: pide un plan de evolución en PDF y un playbook instalable. En grupos de 3, ubicas a cada equipo en el modelo de madurez a partir de `analytics-ficticio.csv`, creas el plugin `pedidos-playbook` con un servidor MCP de PostgreSQL en solo lectura, creas la Skill `pdf-con-estilo` y redactas el roadmap a 6 y 12 meses. Cada integrante instala el plugin y el grupo genera el PDF. Todo el paso a paso está en la guía.',
    pasos: [
      { minutos: 10, quien: 'Todos', texto: 'Leer `analytics-ficticio.csv` con Claude y ubicar a cada equipo en el modelo de madurez.', conceptos: ['C1'] },
      { minutos: 35, quien: 'A', texto: 'Crear el plugin `pedidos-playbook`: subagente `revisor`, Skills `documentar-modulo` y `planificador-proyectos-web`, hook guardián de la Unidad 8 y plantilla `AGENTS.md`. Agregar en `.mcp.json` un servidor MCP de PostgreSQL **en modo de solo lectura** apuntando a `pedidos-pg`. Publicarlo en un marketplace del grupo.', conceptos: ['C3', 'C4'] },
      { minutos: 35, quien: 'B', texto: 'Crear la Skill `.claude/skills/pdf-con-estilo/`: un `SKILL.md` con la paleta y la tipografía que elija el grupo, una plantilla HTML con CSS profesional (portada, encabezados, tablas e índice) y un script que convierta el HTML a PDF.', conceptos: ['C3'] },
      { minutos: 35, quien: 'C', texto: 'Redactar el contenido del plan: diagnóstico por equipo, roadmap a 6 y 12 meses con hitos e indicadores, champions y plan de adopción.', conceptos: ['C1', 'C2'] },
      { minutos: 20, quien: 'Todos', texto: 'Cada integrante instala el plugin desde el marketplace del grupo. Revisión cruzada de los tres trabajos.', conceptos: ['C3', 'C4'] },
      { minutos: 10, quien: 'Todos', texto: 'Generar el PDF con la Skill de B a partir del contenido de C, revisarlo y corregirlo.', conceptos: ['C3'] },
      { minutos: 5, quien: '—', texto: 'Cierre: tres grupos muestran su PDF y su `/plugin` instalado.', conceptos: [] },
    ],
    puntosControl: ['Punto de control MCP: preguntar "¿cuántos pedidos hay por estado?" y verificar que una instrucción de escritura sea rechazada (paso 3).'],
    resultadoEsperado: [
      '**El plugin se valida en una máquina que no sea la de quien lo creó.** Si solo funciona en la máquina de A, no es un playbook.',
      '**"Solo lectura" se demuestra.** Si Claude logra escribir en la base, el MCP está mal configurado.',
      '**La Skill de PDF tiene que poder reutilizarse.** Con otro contenido, debe producir un documento con el mismo diseño, sin tocar el CSS.',
    ],
    siTeTrabas: [
      'La estructura de `plugin.json` y `marketplace.json`.',
      'La configuración del servidor Postgres MCP en modo restringido. En Linux agrega `--add-host=host.docker.internal:host-gateway`.',
      'La estructura de una Skill con `assets/` y `scripts/`, usando el planificador como modelo.',
      'Para el PDF, `page.pdf()` de Playwright y CSS `@page`.',
    ],
    erroresFrecuentes: [], // TODO: el archivo fuente no trae una lista de errores frecuentes
    planB: [
      'Si Playwright no instala, el script usa Chrome o Edge headless: `--headless --print-to-pdf`.',
      'Si el MCP no conecta, se documenta la configuración y se valida durante la Unidad 10.',
      'Hay una estructura de plugin de ejemplo lista para completar.',
    ],
    extension: 'Agregar al plugin un comando o Skill que genere el informe de madurez de un equipo a partir del CSV.',
  },

  material: [
    { id: 'guia', tipo: 'pdf', titulo: 'Guía del taller "Plan de evolución para una BU"', archivo: 'assets/material/u09/guia-taller.pdf', disponible: false },
    { tipo: 'pdf', titulo: 'Modelo de madurez de 5 niveles', archivo: 'assets/material/u09/modelo-madurez.pdf', disponible: false },
    { tipo: 'png', titulo: 'Infografía: anatomía de un plugin', archivo: 'assets/material/u09/infografia.png', disponible: false },
  ],

  videos: [
    academyVideo('deployingEnterprise'),
    academyVideo('mcp'),
    academyVideo('mcpAdvanced', 'En Python.'),
    academyVideo('agentSkills'),
    academyVideo('aiNativeSdlc', 'Plays "skills como conocimiento institucional" y "sesiones paralelas y subagentes".'),
  ],

  paraInvestigar: [
    'Comparación con otros proveedores y estrategias multi-proveedor (lectura complementaria).',
    'Informes organizacionales de Claude Academy para medir la capacitación.',
    'API de analytics de Enterprise.',
    'CSS para impresión: `@page`, saltos de página y fuentes embebidas.',
  ],

  entregable: {
    nombre: 'Plan de evolución de la IA para una Business Unit',
    criterios: [
      'Plan en PDF generado con la Skill `pdf-con-estilo` del grupo.',
      'Repositorio del marketplace con el plugin `pedidos-playbook`.',
      'MCP de PostgreSQL de solo lectura, demostrado con una escritura rechazada.',
      'Plugin instalado y probado en una máquina distinta a la de quien lo creó.',
    ],
    alimentaA: 'u10',
  },
};
