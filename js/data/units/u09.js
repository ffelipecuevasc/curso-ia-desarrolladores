/**
 * Unidad 9 · Fuente: fuentes/unidades/unidad-09.md (versión 2, 12-nov-2026)
 */
import { ACADEMY_CATALOG, BIBLIO, DOCS, MATERIAL_REPO, STANDARDS, academyVideo } from '../links.js';

/** Carpeta de la Unidad 9 en el repositorio de material (rama main). */
const U9_TREE = `${MATERIAL_REPO.url}/tree/main/unidad-9`;

export default {
  id: 'u09',
  numero: 9,
  titulo: 'Escalabilidad, madurez organizacional y adopción de la IA',
  tituloCorto: 'Madurez y adopción',
  descripcionBreve: 'Madurez, multiplicadores, playbook como plugin instalable y el MCP de Claude Academy.',
  dia: 5,
  bloque: 'mañana',
  nivel: '88 → 95',

  foco: 'Que otro equipo instale con un comando la forma de trabajar de Pedidos Web, y entregar a la BU un plan de evolución en PDF: diagnóstico de madurez, playbook como plugin y una Skill de PDF.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Ubicar equipos en el modelo de madurez de 5 niveles, con indicadores del panel como evidencia.',
    'Armar una adopción con piloto chico, champions por equipo y un senior que multiplica.',
    'Empaquetar tus buenas prácticas en un plugin que otro equipo instala con un comando.',
    'Elegir superficie y modelo según la tarea, y apoyarte en estándares abiertos para no quedar atado.',
  ],
  licencias: ['Claude Pro (demos del instructor)', 'Claude Team Standard (taller; también funciona con Pro)', 'GitHub gratis con repo público'],
  herramientas: ['Claude Code 2.1.281 o superior (plugins y marketplaces)', '`claude plugin validate`', '`/plugin` y `/mcp`', 'MCP `claude-academy`', 'Python 3 con Playwright', 'Git Bash (solo Windows)'],
  requisitos: [
    {
      titulo: 'Tu pedidos-web con lo nuevo de la Unidad 9',
      texto: 'En el receso, Claude Code trae `docs/adopcion/` (el CSV y una plantilla). Se suma; no reemplaza nada tuyo.',
      enlace: { titulo: 'README de pedidos-web (camino A)', url: `${U9_TREE}/taller/pedidos-web` },
    },
    {
      titulo: 'Playwright, antes de la clase',
      texto: 'Lo usa tu Skill de PDF en la etapa 3. En Windows PowerShell usa `py -m` en vez de `python3 -m`.',
      codigo: { lenguaje: 'bash', contenido: 'python3 -m pip install playwright markdown\npython3 -m playwright install chromium' },
    },
    {
      titulo: 'Repo público y un compañero de tu grupo de 3',
      texto: 'Tu compañero instala tu plugin desde tu GitHub: sin repo público no hay plugin. Decide quién instalará el tuyo.',
    },
  ],
  pendientes: [],
  catedra: [
    { titulo: 'Apertura (láminas 1–3) y repaso «Antes del receso» (lámina 22)', minutos: 6 },
    { titulo: 'C1 · Madurez: modelo de 5 niveles, analytics y actividad «¿En qué nivel estamos?»', minutos: 10 },
    { titulo: 'C2 · Multiplicadores: piloto, champions, ritmo y tres errores', minutos: 6 },
    { titulo: 'C3 · Playbook como código: plugins, marketplace y demos «Empaqueta lo que ya funciona» e «Instálalo como otro equipo» (arriendo-web)', minutos: 25 },
    { titulo: 'C4 · Herramienta justa: superficie, modelo, actividad y demo «Súmale datos de solo lectura» (arriendo-web)', minutos: 13 },
  ],

  conceptos: {
    obligatorios: [
      {
        slug: 'plugin',
        titulo: 'Plugin de Claude Code',
        resumen: 'Empaqueta Skills, subagentes, hooks y servidores MCP en una unidad versionada.',
        explicacion: [
          'Un plugin reúne Skills, subagentes, hooks y servidores MCP en una unidad versionada que se instala con un comando. `plugin.json` es opcional (solo `name` es obligatorio), pero lo usamos para declarar la `version`. Solo ese archivo va dentro de `.claude-plugin/`: el resto va en la raíz del plugin.',
          'Todo lo del plugin lleva prefijo (`arriendo-playbook:revisor`) y las rutas internas usan `${CLAUDE_PLUGIN_ROOT}`, nunca una ruta de tu máquina. Se valida con `claude plugin validate`.',
          '**Lo que no viaja:** `AGENTS.md`, `CLAUDE.md`, `REVIEW.md` y las reglas de permisos son archivos de cada repositorio, así que el playbook los entrega como **plantilla** para copiar. Los secretos tampoco viajan: se piden al instalar. Y un plugin se valida en otra máquina: si solo funciona en la tuya, no es un playbook.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'text',
          titulo: 'arriendo-playbook/ (demo 1)',
          contenido: `arriendo-playbook/
├── .claude-plugin/plugin.json
├── skills/
├── agents/revisor.md
├── hooks/hooks.json
├── scripts/guardian.sh
└── .mcp.json`,
        },
        nota: '**Implementación de Claude Code:** el formato de plugins y marketplaces es propio de Claude Code; las Skills y MCP que empaqueta son estándares abiertos.',
        fuente: DOCS.pluginsCreate,
      },
      {
        slug: 'marketplace',
        titulo: 'Marketplace interno',
        resumen: 'Un repo de GitHub con `.claude-plugin/marketplace.json` desde donde los equipos instalan.',
        explicacion: [
          'Un marketplace interno es un repositorio de GitHub con `.claude-plugin/marketplace.json`: su `name`, un `owner` y la lista de `plugins`, cada uno con su `source` (por ejemplo `./plugins/arriendo-playbook`). En el taller, tu propio repo `pedidos-web` es el marketplace.',
          'El id de un plugin es `plugin@marketplace` (`arriendo-playbook@arriendo-vela`). Una actualización llega a los equipos cuando cambia `version`. En el curso, los repos son públicos y sin secretos.',
          'Así las buenas prácticas se instalan con un comando, en vez de leerse.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Dentro de Claude Code',
          contenido: `/plugin marketplace add <ruta-local>
/plugin install arriendo-playbook@arriendo-vela
/plugin marketplace update arriendo-vela`,
        },
        nota: '',
        fuente: DOCS.pluginMarketplaces,
      },
      {
        slug: 'mcp',
        titulo: 'MCP: Model Context Protocol',
        resumen: 'Un protocolo abierto para conectar agentes con herramientas y datos externos.',
        explicacion: [
          'MCP define cómo un agente se conecta con servidores que exponen herramientas y datos. Un mismo servidor MCP sirve para distintos clientes compatibles.',
          'Un servidor MCP también puede viajar dentro de un plugin, en su `.mcp.json`. En la demo 3, «Súmale datos de solo lectura», el instructor lo hace con el MCP de Claude Academy; en el taller lo sumas tú a `pedidos-playbook`.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Conectar un servidor MCP por HTTP, a mano',
          contenido: 'claude mcp add --transport http claude-academy https://academy.claude.com/mcp',
        },
        nota: '**Estándar abierto:** MCP (modelcontextprotocol.io). **Implementación de Claude Code:** el comando `claude mcp add`, el archivo `.mcp.json` y `/mcp`.',
        fuente: STANDARDS.mcp,
      },
      {
        slug: 'mcp-solo-lectura',
        titulo: 'MCP de solo lectura: claude-academy',
        resumen: 'Un servidor que solo consulta: si no tiene una herramienta para escribir, no se puede escribir.',
        explicacion: [
          'Sumas datos externos al playbook con un `.mcp.json` en la raíz del plugin, no dentro de `.claude-plugin/`. El servidor `claude-academy` usa transporte HTTP y es de solo lectura: busca cursos y devuelve enlaces.',
          'Punto de control de la demo 3: `/mcp` muestra `claude-academy` con 3 herramientas y, al pedir «Busca en Claude Academy un curso sobre plugins» sin nombrar la herramienta, la búsqueda trae enlaces. Si le pides escribir, no hay herramienta para hacerlo.',
          'Para llegar a los equipos, el cambio se publica como una versión nueva (1.1.0) y se trae con `/plugin marketplace update arriendo-vela`.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Dentro de Claude Code (demo 3)',
          contenido: `/plugin marketplace update arriendo-vela
/mcp`,
        },
        nota: '**Implementación de Claude Code:** `.mcp.json`, `/mcp` y la actualización de plugins por versión.',
        fuente: BIBLIO.academyMcp,
      },
    ],
    fundamentales: [
      {
        slug: 'madurez',
        titulo: 'Madurez',
        resumen: 'Mide dónde estás antes de decidir hacia dónde ir.',
        explicacion: [
          'Modelo de 5 niveles de Vela LATAM: **1** Uso a escondidas · **2** Uso individual · **3** Equipo con reglas (`AGENTS.md`, `REVIEW.md` y hooks compartidos) · **4** Proceso AI-native (spec → plan → CI → revisión) · **5** Organización que mide y mejora.',
          'El panel de analytics de Claude Code muestra usuarios activos, sesiones, líneas aceptadas, tasa de aceptación y PR con Claude Code. Está en Team y Enterprise y lo ven Admin y Owner. Mucho uso con poca aceptación no es éxito: es una señal, así que ningún indicador se mira solo. En clase y en el taller se usan datos ficticios.',
          'En la actividad «¿En qué nivel estamos?» ubicas 4 equipos ficticios (Alfa, Beta, Gamma y Delta) y propones un siguiente paso concreto para cada uno.',
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
          'Pocos primero, todos después: un **piloto chico** (un equipo, un objetivo medible), **champions** por equipo (muestran, no imponen) y un **senior multiplicador** (revisa, enseña y ajusta).',
          'El ritmo tiene 4 pasos: **estandarizar** un flujo común, **medir** uso y resultados, **ajustar** lo que no funcionó y **escalar** al siguiente equipo.',
          'Tres errores típicos: comprar licencias sin capacitar (todos tienen la herramienta, nadie cambia cómo trabaja), imponer sin piloto y medir solo líneas de código (premia generar mucho, no entregar bien).',
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
          'Un documento de buenas prácticas se olvida; un plugin instalado se usa. El playbook del equipo reúne el subagente `revisor`, las Skills, el hook guardián de la Unidad 8 y la plantilla de `AGENTS.md`, y se instala con un comando.',
          'En las demos 1 y 2 (arriendo-web), el instructor empaqueta el plugin `arriendo-playbook`, lo publica en el marketplace `arriendo-vela` y lo instala como lo haría otro equipo. Punto de control de la demo 2: `/plugin` lo muestra y el guardián bloquea leer `.env`.',
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
          '**Superficie:** el chat (pensar, planificar, documentos y specs), Claude Code en terminal o IDE (el trabajo diario en el repo), Desktop (lo mismo, con interfaz gráfica; opcional), la web (tareas en la nube, en paralelo; opcional) y CI (revisiones y diagnósticos sin pedirlos). La pregunta: ¿necesita tu repo, tu terminal o que nadie lo pida?',
          '**Modelo, por familia:** Haiku para tareas simples y rápidas (menos costo), Sonnet para el día a día del código (el predeterminado) y Opus para razonamiento complejo (más capacidad). Con `opusplan`, Opus planifica y Sonnet ejecuta. Confírmalo con `/model` en tu cuenta.',
          '**Portabilidad:** MCP, Agent Skills y `AGENTS.md` son formatos abiertos, así que reducen el costo de cambiar de herramienta. Copilot, Codex y Gemini CLI los leen en distinto grado.',
        ],
        ejemplo: null,
        nota: '**Estándares abiertos:** MCP, Agent Skills y `AGENTS.md`.',
        fuente: DOCS.modelConfig,
      },
    ],
  },

  laboratorio: {
    nombre: 'Tu playbook instalable y el plan de la BU',
    modalidad: 'Individual',
    duracion: 90,
    caso: 'La BU de Desarrollo tiene 4 equipos y cada uno adoptó la IA a su manera. La gerencia quiere que todos trabajen como Pedidos Web.',
    problematica: 'Pedidos Web ya trabaja en el nivel 4 (el equipo del curso, de la U1 a la U8). Facturación, Bodega y Reportes no: su nivel lo descubres en `analytics-ficticio.csv`. Un documento de buenas prácticas se olvida; lo que se instala, se usa.',
    objetivo: 'Que otro equipo instale con un comando la forma de trabajar de Pedidos Web, y entregar el plan para que la BU la adopte.',
    // Resumen visible en la pestaña Taller (máx. 1000 caracteres; el detalle está en la guía PDF).
    resumen: 'Trabajas solo en tu `pedidos-web` para que otro equipo instale con un comando la forma de trabajar de Pedidos Web, y para entregar a la BU el plan con que la adopte. Traes `docs/adopcion/` con Claude Code y avanzas en 3 etapas. Primero ubicas a los 4 equipos en el modelo de madurez con `analytics-ficticio.csv`: cada nivel con 2 indicadores del CSV, sin inventar datos. Después armas `pedidos-playbook` con el revisor, `documentar-modulo`, `planificador-proyectos-web`, el guardián, la plantilla de `AGENTS.md` y el MCP `claude-academy`, lo publicas en tu marketplace y un compañero de tu grupo de 3 lo instala desde tu GitHub. Por último creas la Skill `pdf-con-estilo` y generas `plan-evolucion.pdf`. Cierras con «Tu reto», obligatorio: publicar la versión 1.1.0 y lograr que tu compañero la reciba. El paso a paso está en la guía.',
    pasos: [
      { minutos: 7, texto: 'Preparación: pídele a Claude Code que traiga a tu repo lo nuevo de la Unidad 9 (`docs/adopcion/analytics-ficticio.csv` y `docs/adopcion/plan-evolucion.md`), sin tocar ningún otro archivo y mostrándote el diff antes del commit. Deja tu repo al día y público en GitHub, y define qué compañero de tu grupo de 3 instalará tu plugin.', conceptos: [] },
      { minutos: 18, texto: 'Diagnóstico: pídele a Claude Code que lea `docs/adopcion/analytics-ficticio.csv` y ubique a cada uno de los 4 equipos en el modelo de 5 niveles, con al menos dos indicadores como evidencia, y que escriba el diagnóstico en `docs/adopcion/plan-evolucion.md` siguiendo la plantilla, sin inventar datos que no estén en el CSV. Revisa que cada nivel tenga sus 2 indicadores y sube el commit.', conceptos: ['C1'] },
      { minutos: 35, texto: 'Playbook instalable: pídele a Claude Code que arme `plugins/pedidos-playbook/` versión 1.0.0 con el revisor, `documentar-modulo`, `planificador-proyectos-web`, el guardián de la U8 (`scripts/guardian.sh`), la plantilla de `AGENTS.md` y el MCP `claude-academy` de solo lectura, que lo publique en `.claude-plugin/marketplace.json` con el nombre `pedidos-<usuario-github>` y que lo valide. Súbelo a `main`: tu compañero lo instala desde tu GitHub y ve `claude-academy` en `/mcp`.', conceptos: ['C3', 'C4'] },
      { minutos: 20, texto: 'El plan en PDF: pídele a Claude Code que cree la Skill `.claude/skills/pdf-con-estilo/` con `SKILL.md`, `assets/plantilla.html` y `scripts/html_a_pdf.py` (Playwright), y que la use para convertir `docs/adopcion/plan-evolucion.md` en `plan-evolucion.pdf`. Pruébala también con `docs/gobernanza/politica-ia.md`: si tienes que tocar el CSS para que se vea bien, todavía no es reutilizable.', conceptos: ['C3'] },
      // Etapa obligatoria sin minutos asignados: si no alcanzas en clase, se termina en casa.
      { minutos: null, texto: 'Tu reto (obligatorio): haz un cambio tuyo en `pedidos-playbook` (por ejemplo, mejora la `description` de una Skill o suma una regla al revisor), publícalo como versión 1.1.0 y logra que tu compañero lo reciba. El pedido a Claude Code lo escribes tú, con contexto, qué quieres y cómo sabes que quedó bien.', conceptos: ['C3'] },
    ],
    puntosControl: [
      'El diff solo muestra los 2 archivos nuevos en `docs/adopcion/` y tu repo sigue público en GitHub (preparación).',
      'Cada equipo tiene un nivel y dos indicadores del CSV que lo respaldan, escritos en `plan-evolucion.md` (etapa 1).',
      'Tu compañero instala tu plugin desde tu GitHub y ve `claude-academy` en `/mcp` (etapa 2).',
      '`plan-evolucion.pdf` tiene portada, títulos y tablas legibles, y `politica-ia.md` sale con el mismo diseño (etapa 3).',
      'Tu compañero ve la versión 1.1.0 y tu cambio funciona en su equipo (Tu reto).',
    ],
    resultadoEsperado: [
      'Ningún indicador solo basta: mucho uso con poca aceptación es una señal, no un éxito.',
      'Un plugin que solo funciona en tu máquina no es un playbook: se valida cuando tu compañero lo instala desde tu GitHub.',
      'Una Skill reutilizable separa el diseño del contenido: si tienes que tocar el CSS para que se vea bien, todavía no lo es.',
    ],
    siTeTrabas: [
      '*Rastrear el uso del equipo con análisis* (analytics), para entender qué mide cada indicador.',
      '*Create a Claude Code plugin*, para la estructura del plugin.',
      '*Create a marketplace*, para `marketplace.json`, en la etapa 2 y en tu reto.',
      '*Use Claude Academy from Claude*, para conectar el MCP `claude-academy`.',
      '*Extend Claude with skills*, para la estructura de una Skill.',
    ],
    erroresFrecuentes: [
      'Tu compañero no logra agregar tu marketplace → ¿tu repo es público? ¿`marketplace.json` está en `.claude-plugin/`, en la raíz?',
      'La validación marca una ruta del plugin → la ruta parte de la raíz del marketplace con `./` y la carpeta existe.',
      'El guardián no corre en el equipo de tu compañero → la ruta a `guardian.sh` usa `${CLAUDE_PLUGIN_ROOT}`, no una ruta de tu máquina.',
      '`claude-academy` no aparece en `/mcp` → `.mcp.json` va en la raíz del plugin, no dentro de `.claude-plugin/`.',
      'El PDF sale sin colores de fondo → el script debe imprimir el fondo y el CSS no debe desactivarlo.',
    ],
    planB: [],
    extension: '',
  },

  material: [
    { id: 'presentacion', tipo: 'pdf', variante: 'presentacion', titulo: 'Presentación de clases · Unidad 9', descripcion: 'Las diapositivas que usamos en el encuentro, para repasar o consultar después.', archivo: 'assets/material/u09/presentacion-clase.pdf', peso: '6,9 MB', disponible: true },
    { id: 'guia', tipo: 'pdf', titulo: 'Guía del taller "Tu playbook instalable y el plan de la BU"', archivo: 'assets/material/u09/guia-taller.pdf', disponible: true },
    // destino: 'taller' → se ve en la pestaña Taller, no en Recursos.
    { tipo: 'enlace', titulo: 'Proyecto del taller: pedidos-web (base de la U9)', descripcion: 'El README explica qué traer a tu repo (camino A): solo se suma `docs/adopcion/`.', url: `${U9_TREE}/taller/pedidos-web`, disponible: true, destino: 'taller' },
    { tipo: 'enlace', titulo: 'Skill planificador-proyectos-web', descripcion: 'La copias dentro de tu plugin en la etapa 2.', url: BIBLIO.planificador.url, disponible: true, destino: 'taller' },
    { tipo: 'enlace', titulo: 'Demos de la unidad: arriendo-web', descripcion: 'Empaqueta, instala y súmale MCP.', url: `${U9_TREE}/demos`, disponible: true },
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
    'Curso *Deploying Claude Enterprise with confidence* (Anthropic Academy).',
    'Informes organizacionales de Claude Academy para medir la capacitación.',
    'API de analytics de Enterprise.',
    '*Introduction to MCP* (Anthropic Academy).',
    'Plays "skills como conocimiento institucional" y "sesiones paralelas y subagentes" del AI-native SDLC.',
    'CSS para impresión: `@page`, saltos de página y fuentes embebidas.',
  ],

  entregable: {
    nombre: 'Plan de evolución de la IA para una Business Unit',
    criterios: [
      '`docs/adopcion/plan-evolucion.md` con el diagnóstico de los 4 equipos y su PDF generado con `pdf-con-estilo`.',
      '`pedidos-playbook` 1.0.0 en `main`, instalado por un compañero (incluye `planificador-proyectos-web` y el MCP `claude-academy`).',
      'La Skill `pdf-con-estilo` reutilizable.',
      'La versión 1.1.0 de `pedidos-playbook`, recibida por tu compañero (tu reto).',
    ],
    alimentaA: 'u10',
  },
};
