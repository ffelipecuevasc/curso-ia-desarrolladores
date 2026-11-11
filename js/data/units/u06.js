/**
 * Unidad 6 · Fuente: fuentes/unidades/unidad-06.md (versión 2, 10-nov-2026)
 */
import { DOCS, MATERIAL_REPO, academyVideo } from '../links.js';

/** Carpeta de la Unidad 6 en el repositorio de material (rama main). */
const U6_TREE = `${MATERIAL_REPO.url}/tree/main/unidad-6`;

export default {
  id: 'u06',
  numero: 6,
  titulo: 'IA aplicada a la calidad, las pruebas y la integración y entrega continuas (CI/CD)',
  tituloCorto: 'Calidad, pruebas y CI/CD',
  descripcionBreve: 'Tests que sí prueban, cobertura bien leída, pipeline seguro y Claude diagnosticando en CI.',
  dia: 3,
  bloque: 'tarde',
  nivel: '55 → 70',

  foco: 'Que ningún cambio llegue a `main` sin pruebas: tests que sí prueban, cobertura bien leída, un pipeline seguro en cada push y PR, y Claude en CI que diagnostica mientras tú decides.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Escribir tests con criterio: si no pueden fallar, no prueban nada. Compruébalo rompiendo el código a mano.',
    'Leer la cobertura como un mapa de lo que nunca se ejecutó, no como una meta de calidad.',
    'Armar un pipeline de GitHub Actions seguro: permisos mínimos, versiones fijas, timeout y secretos protegidos.',
    'Usar Claude en CI para diagnosticar; tú corriges y haces merge con el CI en verde.',
  ],
  licencias: ['Claude Pro (incluye Claude Code)', 'GitHub gratis con repo público'],
  herramientas: ['.NET 10', 'xUnit', 'Rider', 'GitHub Actions', 'Claude GitHub App', '`claude-code-action`'],
  requisitos: [
    {
      titulo: 'Tu pedidos-web con lo nuevo de la Unidad 6',
      texto: 'En el receso, Claude Code trae solo `docs/calidad/`. Se suma; no reemplaza nada tuyo.',
      enlace: { titulo: 'README de pedidos-web (camino A)', url: `${U6_TREE}/taller/pedidos-web` },
    },
    {
      titulo: 'Tu repo pedidos-web es público en GitHub',
      texto: 'En repos públicos, los runners estándar de GitHub Actions son gratis. Lo necesitas así para la etapa 2.',
    },
  ],
  pendientes: [],
  catedra: [
    { titulo: 'Apertura: conceptos fundamentales y material oficial', minutos: 5 },
    { titulo: 'C1 · Tests con criterio: demo «El test mentiroso» (arriendo-web)', minutos: 15 },
    { titulo: 'C2 · Cobertura ≠ calidad: demo «Cobertura 100 %, verificación 0»', minutos: 10 },
    { titulo: 'C3 · Pipeline seguro: demo «Mi primer workflow» y ejercicio «Encuentra el error»', minutos: 20 },
    { titulo: 'C4 · Claude en CI: demo «@claude, ¿por qué falla?»', minutos: 25 },
    { titulo: 'Cierre y temas para investigar', minutos: 10 },
  ],

  conceptos: {
    obligatorios: [
      {
        slug: 'workflow-ci',
        titulo: 'ci.yml con permisos mínimos',
        resumen: 'Build y test en cada `push` a `main` y en cada PR, con `permissions`, `timeout-minutes` y versiones fijas.',
        explicacion: [
          'Un workflow de GitHub Actions se organiza en `on` (qué lo dispara: `push`, `pull_request`) → `jobs` → `steps`, en un runner: una máquina limpia de GitHub.',
          'Seguridad mínima del curso: secretos en *Settings → Secrets and variables → Actions* (nunca en el código ni en el YAML), `permissions:` con lo mínimo (parte por `contents: read`), acciones con versión fija (lo más estricto es el SHA completo), nunca imprimir un secreto en los logs y `timeout-minutes` para que ningún job corra sin fin.',
          'Recuerda que los PR desde forks no reciben secretos.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'yaml',
          titulo: '.github/workflows/ci.yml',
          contenido: `name: CI
on:
  push:
    branches: [main]
  pull_request:
permissions:
  contents: read
jobs:
  build-test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-dotnet@v5
        with:
          dotnet-version: '10.0.x'
      - run: dotnet build --nologo
      - run: dotnet test --no-build --nologo`,
        },
        nota: '',
        fuente: DOCS.githubActions,
      },
      {
        slug: 'claude-code-action',
        titulo: 'claude-code-action: interactivo y automatización',
        resumen: 'Responde a `@claude` en issues y PR, o ejecuta un `prompt` ante cada evento.',
        explicacion: [
          'Sin `prompt`, la acción funciona en **modo interactivo**: espera la mención `@claude` en un issue o PR y responde ahí mismo. Es el modo del taller. Con `prompt`, funciona en **modo automatización**: se ejecuta ante cada evento configurado.',
          'Solo responde a quien tiene permiso de escritura en el repositorio.',
          'Tres frenos de costo y riesgo: `--max-turns 5` en `claude_args`, `timeout-minutes: 10` y `concurrency` (una ejecución a la vez por issue o PR).',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'yaml',
          titulo: '.github/workflows/claude.yml (modo interactivo)',
          contenido: `name: Claude
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
concurrency:
  group: claude-\${{ github.event.issue.number || github.event.pull_request.number }}
jobs:
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    timeout-minutes: 10
    permissions:
      contents: write
      pull-requests: write
      issues: write
      id-token: write
      actions: read
    steps:
      - uses: actions/checkout@v6
      - uses: anthropics/claude-code-action@v1
        with:
          claude_code_oauth_token: \${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
          claude_args: '--max-turns 5 --disallowedTools "Edit,Write"'`,
        },
        nota: '**Implementación de Claude:** `claude-code-action` y la Claude GitHub App son productos de Anthropic. GitHub Actions es la plataforma de CI de GitHub.',
        fuente: DOCS.githubActions,
      },
      {
        slug: 'credencial-ci',
        titulo: 'Tu credencial: el token de tu Claude Pro',
        resumen: 'Lo generas con `claude setup-token` y lo guardas como secreto del repositorio.',
        explicacion: [
          'Son 3 pasos: `claude setup-token` genera el token → lo guardas como secreto `CLAUDE_CODE_OAUTH_TOKEN` del repositorio → `claude.yml` lo usa con `${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}`.',
          'Cada ejecución gasta la cuota de tu Claude Pro, porque el token queda ligado a tu cuenta.',
          'El token nunca va en un archivo del repositorio: si se sube, se genera uno nuevo con `claude setup-token` y se actualiza el secreto, porque git no olvida.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Generar y guardar el token',
          contenido: `# 1. Genera el token en tu terminal
claude setup-token
# 2. Guárdalo en GitHub: Settings → Secrets and variables → Actions
#    Nombre del secreto: CLAUDE_CODE_OAUTH_TOKEN
# 3. claude.yml lo lee así (nunca pegues el valor en el archivo):
#    claude_code_oauth_token: \${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}`,
        },
        nota: '',
        fuente: DOCS.githubActions,
      },
      {
        slug: 'headless',
        titulo: 'Plan B local: claude -p',
        resumen: 'Claude Code sin interfaz, en tu terminal, para leer una falla si la Action no funciona.',
        explicacion: [
          'Con `claude -p "<prompt>"` Claude Code se ejecuta de forma no interactiva: recibe la entrada por stdin y deja el resultado en stdout, como cualquier herramienta Unix.',
          'En el taller es el plan B local: si la App o el token fallan, le pasas la salida de `dotnet test` y Claude te explica la falla sin pasar por GitHub.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Leer una falla en local',
          contenido: 'dotnet test 2>&1 | claude -p "Explica en 3 líneas por qué falla"',
        },
        nota: '**Implementación de Claude Code.**',
        fuente: DOCS.headless,
      },
    ],
    fundamentales: [
      {
        slug: 'tests-con-criterio',
        titulo: 'Tests con criterio',
        resumen: 'Si no puede fallar, no prueba nada.',
        explicacion: [
          'La pirámide de tests ayuda a decidir qué delegar a la IA (unitarios repetitivos, casos borde) y qué no: decidir qué comportamiento importa es cosa tuya.',
          'Para corregir un bug, el orden es: reproducir, escribir el test que falla, corregir y dejar el test.',
          'En la demo 1, «El test mentiroso» (`TarifaBase` de arriendo-web), Claude propone tests de borde y uno compara el resultado consigo mismo: siempre pasa. El instructor rompe `FactorTemporada` a mano en Rider y ese test sigue en verde. Para saber si un test prueba algo, rómpelo tú, a mano.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'csharp',
          titulo: 'Un test mentiroso de TarifaBase',
          contenido: `[Fact]
public void TarifaBase_calcula_la_tarifa()
{
    var resultado = Tarifas.TarifaBase(50000m, 3, new DateTime(2026, 12, 10), 0);
    Assert.Equal(resultado, resultado); // siempre pasa
}`,
        },
        nota: '',
        fuente: DOCS.commonWorkflows,
      },
      {
        slug: 'cobertura',
        titulo: 'Cobertura ≠ calidad',
        resumen: 'Se mide, no se persigue.',
        explicacion: [
          '`dotnet test --collect:"XPlat Code Coverage"` (paquete `coverlet.collector`) genera `coverage.cobertura.xml`: dice qué líneas y ramas **nunca se ejecutaron**, pero no si lo ejecutado está bien. Un test sin `Assert` útil también cubre. Es un mapa, no una meta.',
          'En la demo 2, «Cobertura 100 %, verificación 0», solo con el test mentiroso, `TarifaBase` queda cubierta al 100 % y nada quedó verificado. Claude te lee el XML del reporte y te dice qué falta.',
          'La cobertura se ve solo en la demo: el taller no la mide.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Medir cobertura en .NET',
          contenido: 'dotnet test --collect:"XPlat Code Coverage"',
        },
        nota: '',
        fuente: DOCS.bestPractices,
      },
      {
        slug: 'pipeline-seguro',
        titulo: 'Pipeline seguro',
        resumen: 'Cada push se prueba solo, sin exponer secretos.',
        explicacion: [
          'Un pipeline seguro prueba cada cambio automáticamente y protege las credenciales con 6 reglas: secretos fuera del código, `permissions:` mínimos, acciones con versión fija, sin secretos en los logs, sin secretos para los PR desde forks y `timeout-minutes`.',
          'Si tu `claude.yml` tiene más permisos de los que necesita, o el token aparece en algún archivo, el pipeline no está terminado.',
          'En la demo 3, «Mi primer workflow», Claude Code escribe `ci.yml` y se ve verde en la pestaña Actions. En el ejercicio «Encuentra el error», un `claude.yml` trae el token pegado y un `echo` del secreto.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.githubActions,
      },
      {
        slug: 'claude-en-ci',
        titulo: 'Claude en CI',
        resumen: 'Claude diagnostica; tú corriges y haces merge.',
        explicacion: [
          'Cuando un job falla en un PR, comentas `@claude ¿por qué falla este job? Solo diagnostica, no hagas commits.` y Claude responde con el diagnóstico.',
          'Regla del curso: CI en rojo → `@claude` → diagnóstico → tú corriges → CI en verde → merge. Las capas son el workflow (permisos), las herramientas (`--max-turns`, `--disallowedTools "Edit,Write"`) y las personas (merge solo en verde).',
          'La propuesta se puede aceptar, ajustar o rechazar: lo que importa es justificar la decisión. En la demo 4, «@claude, ¿por qué falla?», el instructor corrige a mano y hace merge con el CI en verde.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.githubActions,
      },
    ],
  },

  laboratorio: {
    nombre: 'Que ningún cambio llegue a main sin pruebas',
    modalidad: 'Individual',
    duracion: 80,
    caso: 'El módulo de totales de la Unidad 5 funciona en la máquina de cada alumno, pero los tests se ejecutan «cuando alguien se acuerda».',
    problematica: 'Un viernes, un cambio rompió el cálculo del IVA y nadie lo notó hasta el lunes, con un log de cientos de líneas.',
    objetivo: 'Que ningún cambio llegue a `main` sin pruebas automáticas, con Claude ayudando a leer la falla y tú decidiendo.',
    // Resumen visible en la pestaña Taller (máx. 1000 caracteres; el detalle está en la guía PDF).
    resumen: 'Trabajas solo, en tu `pedidos-web`: ningún cambio debe llegar a `main` sin pruebas automáticas. En el receso traes `docs/calidad/` con Claude Code y avanzas en 3 etapas. Primero, le pides a Claude 5 tests de borde y rompes el código a mano en Rider: los que no fallan se borran. Después, Claude escribe `ci.yml` (permisos mínimos, timeout y versiones fijas), instalas la Claude GitHub App, guardas el token de tu Claude Pro como secreto y creas `claude.yml`. Por último, rompes una línea a mano en una rama, abres un PR, ves el CI en rojo, le preguntas a `@claude` por qué falla, decides y haces merge con el CI en verde. El CI corre lo que haya de la U5: lo que quedó sin terminar se marca con `Skip`. El paso a paso está en la guía.',
    pasos: [
      { minutos: 5, texto: 'Preparación: trae `docs/calidad/registro-u6.md`, deja `dotnet test` sin rojos (lo que quedó sin terminar de la U5 se marca con `Skip` y un motivo, nunca se borra) y haz commit.', conceptos: [] },
      { minutos: 20, texto: 'Tests que sí prueban: pídele a Claude Code 5 tests de borde que el golden master no cubra, para el módulo que tengas funcionando. Rompe el código **a mano en Rider**, mira qué test falla, borra los que no fallan y deshaz el cambio. Commit.', conceptos: ['C1'] },
      { minutos: 25, texto: 'Pipeline seguro: Claude Code escribe `.github/workflows/ci.yml` (build y test en push y PR, permisos mínimos, timeout de 10 min, versiones fijas); push y verde en Actions. Instala la Claude GitHub App, corre `claude setup-token`, guarda el secreto `CLAUDE_CODE_OAUTH_TOKEN` y crea `claude.yml` con 5 turnos. Ambos en `main`.', conceptos: ['C3', 'C4'] },
      { minutos: 25, texto: 'La falla: en una rama, rompe una línea a mano, abre el PR y mira el CI en rojo. Comenta «@claude ¿por qué falla este job? Solo diagnostica, no hagas commits.». Decide (aceptar, ajustar o rechazar), corrige a mano, verde y merge. Completa el registro.', conceptos: ['C1', 'C4'] },
      { minutos: 5, texto: 'Cierre: dos alumnos muestran su PR, el comentario de Claude y su decisión.', conceptos: [] },
    ],
    puntosControl: [
      '`dotnet test` sin rojos y commit hecho (preparación).',
      'Cada test nuevo falló al menos una vez ante un cambio hecho a mano (etapa 1).',
      '`ci.yml` en verde y `claude.yml` en `main` (etapa 2).',
      'PR en verde, merge hecho y registro completo (etapa 3).',
    ],
    resultadoEsperado: [
      'Un test nuevo vale si falla ante un error real. Pruébalo rompiendo el código a mano.',
      'Si tu `claude.yml` tiene más permisos de los necesarios, o el token aparece en algún archivo, el pipeline no está terminado.',
      'La propuesta de Claude se puede aceptar, ajustar o rechazar: lo que importa es justificar la decisión.',
    ],
    siTeTrabas: [
      'El ejemplo "Respond to @claude mentions" y la sección "Protect your credentials" de la documentación de Claude Code GitHub Actions.',
      'La sintaxis de `permissions` en la documentación de GitHub.',
      '*Common workflows*, para trabajar con tests.',
    ],
    erroresFrecuentes: [
      '`@claude` no responde → revisa que la App esté instalada, que `claude.yml` esté en `main` y el nombre exacto del secreto.',
      'El CI sigue verde tras romper el código → rompiste código sin tests: elige una línea que cubran tus tests.',
      'Token pegado en un archivo → genera otro con `claude setup-token` y actualiza el secreto.',
      'CI en rojo por la U5 → márcalo con `Skip` y su motivo.',
    ],
    planB: [
      'Carpeta `unidad-6/taller/u6-respaldo` del repo de material (no es una rama), con un `claude.yml` basado en el ejemplo oficial.',
      'Si la App o el token fallan: Claude Code local lee la falla con `claude -p`.',
      'Si GitHub Actions falla: `dotnet build` y `dotnet test` en local.',
    ],
    extension: 'Un workflow programado (`schedule`) con un `prompt` que resuma los PR abiertos (modo automatización).',
  },

  material: [
    { id: 'presentacion', tipo: 'pdf', variante: 'presentacion', titulo: 'Presentación de clases · Unidad 6', descripcion: 'Las diapositivas que usamos en el encuentro, para repasar o consultar después.', archivo: 'assets/material/u06/presentacion-clase.pdf', peso: '7,5 MB', disponible: true },
    { id: 'guia', tipo: 'pdf', titulo: 'Guía del taller "Que ningún cambio llegue a main sin pruebas"', archivo: 'assets/material/u06/guia-taller.pdf', disponible: true },
    { tipo: 'pdf', titulo: 'Checklist de seguridad para workflows', archivo: 'assets/material/u06/checklist-workflows.pdf', peso: '0,1 MB', disponible: true },
    // destino: 'taller' → se ve en la pestaña Taller, no en Recursos.
    { tipo: 'enlace', titulo: 'Proyecto del taller: pedidos-web (base de la U6)', descripcion: 'El README explica qué traer a tu repo (camino A): `docs/calidad/`.', url: `${U6_TREE}/taller/pedidos-web`, disponible: true, destino: 'taller' },
    { tipo: 'enlace', titulo: 'Respaldo del taller (plan B)', descripcion: 'Un `claude.yml` basado en el ejemplo oficial, si el tuyo no funciona.', url: `${U6_TREE}/taller/u6-respaldo`, disponible: true, destino: 'taller' },
    { tipo: 'enlace', titulo: 'Demos de la unidad: arriendo-web', descripcion: 'TarifaBase migrada en la U5: test mentiroso, cobertura, ci.yml y @claude.', url: `${U6_TREE}/demos`, disponible: true },
  ],

  videos: [
    academyVideo('claudeCodeInAction', 'Modo headless y GitHub Action.'),
    academyVideo('aiNativeSdlc', 'Feedback loop y CI.'),
  ],

  paraInvestigar: [
    'Tests end-to-end del portal web con Playwright.',
    'Mutation testing (Stryker.NET): ¿mis tests detectan cambios en el código?',
    'GitLab CI/CD y GitHub Enterprise Server.',
    'Evals continuas en CI, uno de los plays del AI-native SDLC.',
    'Tareas programadas (routines) y Agent SDK.',
    'Autenticación sin secretos de larga duración (workload identity federation).',
  ],

  entregable: {
    nombre: 'Pipeline con tests automatizados asistidos por IA',
    criterios: [
      '`ci.yml` en verde con permisos mínimos, `timeout-minutes` y versiones fijas.',
      '`claude.yml` en `main` con `--max-turns 5` y el token solo como secreto.',
      'Tests nuevos que fallaron ante un cambio hecho a mano.',
      'PR con el diagnóstico de `@claude`, corrección humana y merge en verde.',
      '`docs/calidad/registro-u6.md` completo.',
    ],
    alimentaA: 'u07',
  },
};
