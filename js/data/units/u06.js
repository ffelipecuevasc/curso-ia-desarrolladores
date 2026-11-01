/**
 * Unidad 6 · Fuente: fuentes/unidades/unidad-06.md
 */
import { DOCS, academyVideo } from '../links.js';

export default {
  id: 'u06',
  numero: 6,
  titulo: 'IA aplicada a la calidad, las pruebas y la integración y entrega continuas (CI/CD)',
  tituloCorto: 'Calidad, pruebas y CI/CD',
  descripcionBreve: 'Tests que sí prueban, cobertura bien leída, pipeline seguro y Claude diagnosticando en CI.',
  dia: 3,
  bloque: 'tarde',
  nivel: '55 → 70',

  foco: 'Que ningún cambio llegue a `main` sin pruebas automáticas: tests confiables, un pipeline seguro en cada push y PR, y Claude en CI para diagnosticar sin decidir por el equipo.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Escribir y revisar tests con criterio: si no puede fallar, no prueba nada.',
    'Medir la cobertura e interpretarla: indica lo no probado, no la calidad.',
    'Construir un pipeline de GitHub Actions seguro, con permisos mínimos y secretos protegidos.',
    'Usar Claude en CI para diagnosticar y proponer, con una persona que revisa y hace merge.',
  ],
  licencias: ['Claude Team Standard', 'Credencial para GitHub Actions (pendiente)'],
  herramientas: ['.NET', 'xUnit', 'GitHub Actions', 'Claude GitHub App', '`claude-code-action`'],
  requisitos: [],
  pendientes: [
    {
      titulo: 'Credencial de Claude para GitHub Actions (también se usa en la Unidad 7)',
      texto: 'La GitHub Action de Claude necesita una credencial guardada como secreto en cada repositorio. **Opción A:** API key (`ANTHROPIC_API_KEY`) de la Claude Console, con facturación por uso; la entrega el Owner del cliente y requiere presupuesto y un límite de gasto. **Opción B:** token de suscripción (`CLAUDE_CODE_OAUTH_TOKEN`) que cada alumno genera con `claude setup-token` desde su asiento Team; sin costo extra, pero consume la cuota del asiento. **Estado:** solicitud enviada al Owner del cliente; si no hay respuesta antes del día 3, se usa la opción B.',
    },
  ],
  catedra: [
    { titulo: 'Apertura: conceptos fundamentales y material oficial', minutos: 5 },
    { titulo: 'C1 · Tests con criterio: "El test mentiroso"', minutos: 15 },
    { titulo: 'C2 · Cobertura ≠ calidad: cobertura 100 %, bug incluido', minutos: 10 },
    { titulo: 'C3 · Pipeline seguro: mi primer workflow', minutos: 20 },
    { titulo: 'C4 · Claude en CI: `claude-code-action` y `claude -p`', minutos: 25 },
    { titulo: 'Cierre y temas para investigar', minutos: 10 },
  ],

  conceptos: {
    obligatorios: [
      {
        slug: 'workflow-ci',
        titulo: 'ci.yml con permisos mínimos',
        resumen: 'Build y test en cada `push` y `pull_request`, con `permissions`, `timeout-minutes` y versiones fijas.',
        explicacion: [
          'Un workflow de GitHub Actions se organiza en `workflow` → `jobs` → `steps`, con disparadores como `push` y `pull_request`.',
          'Seguridad mínima obligatoria del curso: secretos en *Settings → Secrets* (nunca en el código ni en el YAML), `permissions:` con lo mínimo (`contents: read` por defecto), acciones con versión fija, no imprimir secretos en los logs y `timeout-minutes` para que un job no corra sin fin.',
          'Recuerda que los PR desde forks no reciben secretos.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'yaml',
          titulo: '.github/workflows/ci.yml',
          contenido: `name: CI
on:
  push:
  pull_request:
permissions:
  contents: read
jobs:
  build-test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '10.0.x'
      - run: dotnet build --nologo
      - run: dotnet test --nologo`,
        },
        nota: '',
        fuente: DOCS.githubActions,
      },
      {
        slug: 'claude-code-action',
        titulo: 'claude-code-action: interactivo y automatización',
        resumen: 'Responde a `@claude` en issues y PR, o ejecuta un `prompt` ante cada evento.',
        explicacion: [
          'Sin `prompt`, la acción funciona en **modo interactivo**: espera la mención `@claude` en un issue o PR y responde ahí mismo.',
          'Con `prompt`, funciona en **modo automatización**: se ejecuta ante cada evento configurado, sin esperar una mención.',
          'Regla del curso: Claude propone el arreglo en un PR o un comentario; una persona lo revisa y hace merge. Para controlar costos se usa `--max-turns` en `claude_args`, `timeout-minutes` y `concurrency`.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'yaml',
          titulo: '.github/workflows/claude.yml (modo interactivo, extracto)',
          contenido: `on:
  issue_comment:
    types: [created]
jobs:
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v6
      - uses: anthropics/claude-code-action@v1
        with:
          claude_code_oauth_token: \${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
          claude_args: "--max-turns 5"`,
        },
        nota: '**Implementación de Claude:** `claude-code-action` y la Claude GitHub App son productos de Anthropic. GitHub Actions es la plataforma de CI de GitHub.',
        fuente: DOCS.githubActions,
      },
      {
        slug: 'credencial-ci',
        titulo: 'API key frente a token de suscripción',
        resumen: '`ANTHROPIC_API_KEY` (facturación por uso) o `CLAUDE_CODE_OAUTH_TOKEN` (cuota del asiento).',
        explicacion: [
          'La acción necesita una credencial guardada como secreto del repositorio. Con una **API key** de la Claude Console se paga por uso y conviene un límite de gasto.',
          'Con un **token de suscripción**, generado con `claude setup-token`, no hay costo extra, pero consume la cuota del asiento y queda ligado a la cuenta de quien lo generó.',
          'En ningún caso la credencial aparece en un archivo del repositorio: si lo hace, el pipeline no está terminado.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Generar el token (opción B)',
          contenido: `claude setup-token
# Guarda el valor en GitHub: Settings → Secrets and variables → Actions
# Nombre del secreto: CLAUDE_CODE_OAUTH_TOKEN`,
        },
        nota: '',
        fuente: DOCS.githubActions,
      },
      {
        slug: 'headless',
        titulo: 'Modo headless: claude -p',
        resumen: 'Claude Code dentro de un script o pipeline propio, sin interfaz interactiva.',
        explicacion: [
          'Con `claude -p "<prompt>"` Claude Code se ejecuta de forma no interactiva: recibe la entrada por stdin y deja el resultado en stdout, como cualquier herramienta Unix.',
          'Sirve para scripts, hooks de pre-commit o pasos de un pipeline propio, por ejemplo para resumir el log de un job que falló.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Resumir un log de CI',
          contenido: 'cat test-output.log | claude -p "Explica en 5 líneas por qué falló este job y qué test lo provocó"',
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
          'La pirámide de tests ayuda a decidir qué delegar a la IA (unitarios repetitivos, casos borde) y qué no (decidir qué comportamiento importa).',
          'Para corregir un bug, el orden es: reproducir, escribir el test que falla y después corregir.',
          'En la demo "El test mentiroso" (PropinaApp), uno de los 8 tests generados compara el resultado consigo mismo: siempre pasa y no prueba nada.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'csharp',
          titulo: 'Un test mentiroso',
          contenido: `[Fact]
public void Calcula_propina()
{
    var resultado = Propina.Calcular(10000, 10);
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
          'La cobertura se mide con `dotnet test --collect:"XPlat Code Coverage"` (paquete `coverlet.collector`). Indica qué código **no** se probó, pero no garantiza que lo probado esté bien.',
          'En la demo, una función con 100 % de cobertura igual falla en el caso límite de 0 personas.',
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
          'Un pipeline seguro prueba cada cambio automáticamente y protege las credenciales: secretos fuera del código, permisos mínimos, versiones fijas, sin secretos en logs y con límite de tiempo.',
          'Si tu `claude.yml` tiene más permisos de los que necesita, o la credencial aparece en algún archivo, el pipeline no está terminado.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.githubActions,
      },
      {
        slug: 'claude-en-ci',
        titulo: 'Claude en CI',
        resumen: 'Diagnostica y propone; tú decides.',
        explicacion: [
          'Cuando un test falla en CI, se comenta `@claude ¿por qué falla este job?` y Claude responde con el diagnóstico y una propuesta.',
          'La propuesta se puede aceptar, ajustar o rechazar. Lo que importa es que justifiques la decisión; el merge lo hace una persona con el CI en verde.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.githubActions,
      },
    ],
  },

  laboratorio: {
    nombre: 'Pipeline con tests asistidos',
    modalidad: 'En parejas',
    duracion: 80,
    caso: 'El módulo de totales migrado en la Unidad 5 funciona en la máquina de cada alumno. Ahora el equipo trabajará con pull requests y la gerencia pide que **ningún cambio llegue a `main` sin pasar por pruebas automáticas**.',
    problematica: 'Los tests se ejecutan "cuando alguien se acuerda". El viernes pasado un cambio rompió el cálculo del IVA y nadie lo notó hasta el lunes. Además, cuando un test falla, el equipo pierde tiempo leyendo logs largos.',
    objetivo: 'Dejar el repositorio con tests confiables, un pipeline seguro que se ejecuta en cada push y PR, y Claude disponible en CI para diagnosticar fallas, sin que tome decisiones por el equipo.',
    pasos: [
      { minutos: 20, texto: 'Pedir a Claude Code tests para los casos que **no** cubre el golden master (valores límite, entradas inválidas). Revisarlos uno por uno y eliminar los que no prueban nada. Medir la cobertura antes y después.', conceptos: ['C1', 'C2'] },
      { minutos: 15, texto: 'Crear `.github/workflows/ci.yml` (build + test en `push` y `pull_request`) con `permissions` mínimos, `timeout-minutes` y acciones con versión fija.', conceptos: ['C3'] },
      { minutos: 20, texto: 'Instalar la Claude GitHub App, guardar la credencial como secreto y crear `.github/workflows/claude.yml` (modo interactivo con `@claude`) con `--max-turns 5`.', conceptos: ['C3', 'C4'] },
      { minutos: 20, texto: '**Juego de parejas:** uno inyecta una falla en una rama y abre un PR. El otro usa `@claude` para diagnosticar, evalúa la propuesta, la corrige y hace merge solo con el CI en verde. Después intercambian roles.', conceptos: ['C1', 'C4'] },
      { minutos: 5, texto: 'Cierre: dos parejas muestran el comentario de Claude y si aceptaron o no su propuesta.', conceptos: [] },
    ],
    puntosControl: ['El job de CI pasa en verde en GitHub (paso 2).'],
    resultadoEsperado: [
      'Un test nuevo vale si fallaría ante un error real. Pruébalo rompiendo el código a propósito.',
      'Si tu `claude.yml` tiene más permisos de los necesarios, o la credencial aparece en algún archivo, el pipeline no está terminado.',
      'La propuesta de Claude se puede aceptar, ajustar o rechazar: lo que importa es justificar la decisión.',
    ],
    siTeTrabas: [
      'El ejemplo "Respond to @claude mentions" y la sección "Protect your credentials" de la documentación de GitHub Actions.',
      'La sintaxis de `permissions` en la documentación de GitHub.',
      'Para la cobertura en .NET, el paquete `coverlet.collector`.',
    ],
    erroresFrecuentes: [], // TODO: el archivo fuente no trae una lista de errores frecuentes
    planB: [
      'Si la credencial no está disponible, el instructor demuestra el paso 3 en su repositorio, y en el paso 4 las parejas diagnostican con Claude Code local a partir del log del CI.',
      'Si GitHub Actions falla, ejecutar los pasos del pipeline en local con `dotnet build && dotnet test`.',
    ],
    extension: 'Agregar un workflow programado (`schedule`) que genere un resumen diario de los PR abiertos.',
  },

  material: [
    { tipo: 'pdf', titulo: 'Guía del taller "Pipeline con tests asistidos"', archivo: 'assets/material/u06/guia-taller.pdf', disponible: false },
    { tipo: 'pdf', titulo: 'Checklist de seguridad para workflows', archivo: 'assets/material/u06/checklist-workflows.pdf', disponible: false },
    { tipo: 'png', titulo: 'Infografía: pipeline seguro con Claude en CI', archivo: 'assets/material/u06/infografia.png', disponible: false },
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
      '`ci.yml` en verde con permisos mínimos, `timeout-minutes` y acciones con versión fija.',
      '`claude.yml` en modo interactivo con `--max-turns 5` y la credencial solo como secreto.',
      'Tests nuevos revisados uno a uno, con reporte de cobertura antes y después.',
      'PR de la falla inyectada, diagnosticada con `@claude` y resuelta con merge en verde.',
    ],
    alimentaA: 'u07',
  },
};
