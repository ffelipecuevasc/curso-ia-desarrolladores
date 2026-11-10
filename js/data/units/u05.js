/**
 * Unidad 5 · Fuente: fuentes/unidades/unidad-05.md
 */
import { BIBLIO, DOCS, academyVideo } from '../links.js';

export default {
  id: 'u05',
  numero: 5,
  titulo: 'Modernización de sistemas legados y migración entre tecnologías',
  tituloCorto: 'Modernización y migración',
  descripcionBreve: 'Migrar Delphi a C# paso a paso: golden master, tipos correctos y un hook que prueba cada cambio.',
  dia: 3,
  bloque: 'mañana',
  nivel: '40 → 55',

  foco: 'Migrar el cálculo de totales de Delphi a C# sin perder dinero: congelar el comportamiento, traducir con criterio, corregir defectos registrándolos y verificar cada cambio automáticamente.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Planificar una migración incremental (strangler fig) en lugar de un big bang.',
    'Congelar el comportamiento actual con tests de caracterización (golden master).',
    'Traducir conceptos y tipos entre tecnologías sin copiar línea a línea.',
    'Verificar cada cambio con un hook `PostToolUse` y subagentes por rol.',
  ],
  licencias: ['Claude Team Standard'],
  herramientas: ['Rider', '.NET', 'xUnit', 'Docker (PostgreSQL 16 Alpine)', 'Claude Code (hooks y subagentes)'],
  requisitos: [
    {
      titulo: 'Docker funcionando antes de la clase',
      texto: 'Verifica con `docker --version`. Durante la clase se levanta PostgreSQL con un solo comando. La contraseña es solo para el curso; nunca se usa así en producción.',
      codigo: {
        lenguaje: 'bash',
        contenido: `docker run -d --name pedidos-pg --restart unless-stopped -p 5432:5432 -e POSTGRES_USER=pedidos -e POSTGRES_PASSWORD=pedidos123 -e POSTGRES_DB=pedidos_web -e POSTGRES_INITDB_ARGS="--encoding=UTF8" -e TZ=America/Santiago -e PGTZ=America/Santiago -v pedidos-pgdata:/var/lib/postgresql/data postgres:16-alpine

# Verificar
docker exec -it pedidos-pg psql -U pedidos -d pedidos_web -c "select version();"

# Si el puerto 5432 está ocupado, usa -p 5433:5432`,
      },
    },
  ],
  pendientes: [],
  catedra: [
    { titulo: 'Apertura: conceptos fundamentales y material oficial', minutos: 5 },
    { titulo: 'Lenguajes: elegir bien para no migrar después (Delphi, Java, Python, JS/TS, C#)', minutos: 15 },
    { titulo: 'C1 · Paso a paso: big bang frente a strangler fig', minutos: 10 },
    { titulo: 'C2 · Congela el comportamiento: golden master en 10 minutos', minutos: 15 },
    { titulo: 'C3 · Traducir no es copiar: "Traduce el tipo"', minutos: 15 },
    { titulo: 'C4 · Verificación automática: el hook que no perdona', minutos: 15 },
    { titulo: 'Cierre y temas para investigar', minutos: 10 },
  ],

  conceptos: {
    obligatorios: [
      {
        slug: 'hook-posttooluse',
        titulo: 'Hook PostToolUse que ejecuta los tests',
        resumen: 'Después de cada edición corre `dotnet test`; si falla, Claude recibe el error y corrige.',
        explicacion: [
          'Un hook es un comando que Claude Code ejecuta automáticamente en un momento del ciclo. `PostToolUse` corre después de que una herramienta termina; con el `matcher` `Edit|Write` se dispara tras cada edición de archivos.',
          'Si el comando sale con **código 2**, Claude recibe el error (stderr) y lo usa para corregir. Así la verificación no depende de que alguien se acuerde de ejecutar los tests.',
          'El hook va en `.claude/settings.json`, versionado, para que todo el equipo tenga la misma red.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'json',
          titulo: '.claude/settings.json',
          contenido: `{ "hooks": { "PostToolUse": [ { "matcher": "Edit|Write", "hooks": [
  { "type": "command", "command": "cd \\"$CLAUDE_PROJECT_DIR\\" && dotnet test --nologo 1>&2 || exit 2" } ] } ] } }`,
        },
        nota: '**Implementación de Claude Code:** los hooks y sus eventos (`PostToolUse`, `PreToolUse`) son propios de Claude Code.',
        fuente: DOCS.hooks,
      },
      {
        slug: 'subagentes-por-rol',
        titulo: 'Subagentes por rol',
        resumen: '`analizador` (lee), `conversor` (edita C#) y `verificador` (ejecuta y compara).',
        explicacion: [
          'Separar la migración en roles reduce errores: el `analizador` solo lee el Delphi, el `conversor` solo edita el C# y el `verificador` ejecuta los tests y compara con el golden master.',
          'Cada rol tiene solo las herramientas que necesita, definidas en su archivo de `.claude/agents/`.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'text',
          titulo: 'Roles de la migración',
          contenido: `.claude/agents/
├── analizador.md    # tools: Read, Grep, Glob
├── conversor.md     # tools: Read, Edit, Write
└── verificador.md   # tools: Read, Bash`,
        },
        nota: '**Implementación de Claude Code:** subagentes en `.claude/agents/`.',
        fuente: DOCS.subAgents,
      },
      {
        slug: 'postgres-docker',
        titulo: 'PostgreSQL en Docker con tipos correctos',
        resumen: 'Esquema `db/001_pedidos.sql`, carga de los CSV del legado y validación por conteos y sumas.',
        explicacion: [
          'La base del portal es PostgreSQL 16 en un contenedor (`pedidos-pg`). El esquema se versiona en `db/001_pedidos.sql` con las tablas `pedidos` y `pedido_lineas`.',
          'Los tipos importan: los montos van en `numeric` y `decimal`, nunca en `float`. La carga de los CSV se valida con conteos y con la suma de totales, que debe cuadrar con el legado salvo por los defectos que corregiste.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'sql',
          titulo: 'Validación después de la carga',
          contenido: `select count(*) from pedidos;
select sum(total) from pedidos;  -- debe cuadrar con el legado`,
        },
        nota: '',
        fuente: BIBLIO.dockerPostgres,
      },
    ],
    fundamentales: [
      {
        slug: 'strangler-fig',
        titulo: 'Paso a paso: strangler fig',
        resumen: 'Lo viejo y lo nuevo conviven.',
        explicacion: [
          'La migración big bang cambia todo de una vez. La incremental, con el patrón **strangler fig**, migra un módulo a la vez: el sistema viejo y el nuevo conviven y el tráfico pasa al nuevo gradualmente.',
          'Por eso se empieza por `UCalculoTotales.pas`: es crítico, no depende de la interfaz y el portal web lo necesita.',
        ],
        ejemplo: null,
        nota: '',
        fuente: BIBLIO.codeMigrationBlog,
      },
      {
        slug: 'golden-master',
        titulo: 'Congela el comportamiento (golden master)',
        resumen: 'Primero el golden master, después el código.',
        explicacion: [
          'Los tests de caracterización registran lo que el sistema **hace hoy**, aunque esté mal, antes de tocarlo. Ese registro es el golden master.',
          'En la demo, la función ficticia `precioEntrada()` (cine: adulto, niño, tercera edad, miércoles 2x1) genera 20 casos que se congelan en un CSV, y la versión en C# se migra hasta que los 20 pasen.',
          'En el taller se migra corrigiendo defectos: cada caso cuyo valor esperado cambia se registra en `docs/defectos-corregidos.md`, en commits separados.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'csharp',
          titulo: 'Test parametrizado desde el golden master',
          contenido: `[Theory]
[MemberData(nameof(CasosGoldenMaster))]
public void Total_coincide_con_golden_master(Pedido pedido, decimal esperado)
{
    Assert.Equal(esperado, CalculoTotales.Calcular(pedido));
}`,
        },
        nota: '',
        fuente: DOCS.commonWorkflows,
      },
      {
        slug: 'traducir-no-es-copiar',
        titulo: 'Traducir no es copiar',
        resumen: 'Cada tecnología tiene su forma.',
        explicacion: [
          'Correspondencias: una *unit* pasa a ser una clase o namespace; un formulario, un endpoint o una vista; un evento `OnClick`, un handler; una `TDBISAMQuery`, un repositorio con parámetros.',
          'Con los tipos pasa lo mismo: `CURRENCY` → `numeric(12,0)` en PostgreSQL y `decimal` en C#, nunca `float`. Las fechas `dd/mm/yy` y los `AUTOINC` también tienen riesgos de conversión.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.commonWorkflows,
      },
      {
        slug: 'verificacion-automatica',
        titulo: 'Verificación automática',
        resumen: 'El hook prueba cada cambio.',
        explicacion: [
          'Una regla que depende de la memoria de alguien no es una regla. Con un hook, cada edición dispara los tests y Claude recibe el error si algo se rompe.',
          'Combinado con subagentes por rol, la migración se vuelve un ciclo: convertir → probar → comparar con el golden master → corregir.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.hooksGuide,
      },
    ],
  },

  laboratorio: {
    nombre: 'Migrar el cálculo de totales',
    modalidad: 'Individual',
    duracion: 80,
    caso: 'Primer módulo de la modernización de Pedidos Legado. Según el diagnóstico de la Unidad 4, se empieza por `UCalculoTotales.pas`: es crítico, no depende de la interfaz y el portal web lo necesita.',
    problematica: 'El cálculo de totales define cuánto paga cada cliente. Si la versión en C# calcula distinto, la empresa pierde dinero o cobra de más. Además, el código Delphi tiene **defectos conocidos** (por ejemplo, el redondeo en los ,5). Indicación para este taller: **migrar corrigiendo los defectos**.',
    objetivo: 'Convertir `UCalculoTotales.pas` a C# hasta pasar el golden master, corregir los defectos registrándolos, crear el esquema PostgreSQL con su carga y redactar el plan de migración.',
    // Resumen visible en la pestaña Taller (máx. 1000 caracteres; el detalle está en la guía PDF).
    resumen: 'Primer módulo de la modernización: `UCalculoTotales.pas`, el cálculo que define cuánto paga cada cliente. Si la versión en C# calcula distinto, la empresa pierde dinero o cobra de más, y el código Delphi trae defectos conocidos, como el redondeo en los ,5. En 80 minutos congelas el comportamiento con tests desde el golden master, conviertes el módulo a C# con subagentes y un hook, corriges los defectos registrándolos en commits separados, creas el esquema PostgreSQL en Docker con su carga y redactas el plan de migración. Todo el paso a paso está en la guía.',
    pasos: [
      { minutos: 15, texto: 'Crear `PedidosWeb.Totales.Tests` y escribir tests xUnit parametrizados desde `golden-master.csv`.', conceptos: ['C2'] },
      { minutos: 25, texto: 'Crear los subagentes `analizador`, `conversor` y `verificador`, y activar el hook. Convertir `UCalculoTotales.pas` a C# hasta pasar el golden master. Luego **corregir los defectos encontrados**: ajustar cada caso afectado y registrarlo en `docs/defectos-corregidos.md`, en commits separados.', conceptos: ['C1', 'C3', 'C4'] },
      { minutos: 20, texto: 'Con PostgreSQL en Docker, generar `db/001_pedidos.sql` (tablas `pedidos` y `pedido_lineas` con tipos correctos) y un script que cargue los CSV del legado. Validar con conteos y con la suma de totales.', conceptos: ['C3'] },
      { minutos: 15, texto: 'Redactar `docs/plan-migracion.md`: etapas, convivencia del sistema viejo y el nuevo, riesgos y criterio de corte.', conceptos: ['C1'] },
      { minutos: 5, texto: 'Cierre: dos alumnos muestran un defecto corregido y su justificación.', conceptos: [] },
    ],
    puntosControl: ['Todos los casos del golden master cargados y en rojo, porque todavía no hay implementación (paso 1).'],
    resultadoEsperado: [
      'Hay defectos que el golden master no muestra a simple vista. Tu diagnóstico de la Unidad 4 te dice dónde buscar.',
      'Un test que cambia su valor esperado sin quedar registrado en `defectos-corregidos.md` es una regresión escondida.',
      'La suma de totales en PostgreSQL debe cuadrar con la del legado, salvo por los defectos que corregiste.',
    ],
    siTeTrabas: [
      'La configuración de hooks y los códigos de salida.',
      'Cómo crear subagentes con herramientas restringidas.',
      'Los tests parametrizados en xUnit (`[Theory]`, `[MemberData]`).',
      'La carga de CSV con `COPY` en PostgreSQL.',
    ],
    erroresFrecuentes: [], // TODO: el archivo fuente no trae una lista de errores frecuentes
    planB: [
      'Rama `u5-respaldo` con el proyecto de tests y el lector de CSV ya listos.',
      'Si Docker falla, revisar el script SQL sin ejecutarlo y validar la lógica con los tests de C#.',
    ],
    extension: 'Pedirle al subagente `verificador` un informe de diferencias entre el legado y C# caso por caso.',
  },

  material: [
    { id: 'presentacion', tipo: 'pdf', variante: 'presentacion', titulo: 'Presentación de clases · Unidad 5', descripcion: 'Las diapositivas que usamos en el encuentro, para repasar o consultar después.', archivo: 'assets/material/u05/presentacion-clase.pdf', disponible: false },
    { id: 'guia', tipo: 'pdf', titulo: 'Guía del taller "Migrar el cálculo de totales"', archivo: 'assets/material/u05/guia-taller.pdf', disponible: false },
    { tipo: 'pdf', titulo: 'Tabla de correspondencia de tipos DBISAM → PostgreSQL → C#', archivo: 'assets/material/u05/tipos-dbisam.pdf', disponible: false },
    { tipo: 'png', titulo: 'Infografía: strangler fig y golden master', archivo: 'assets/material/u05/infografia.png', disponible: false },
  ],

  videos: [
    academyVideo('claudeCodeInAction', 'Hooks y verificación.'),
    academyVideo('subagents'),
    // TODO: URL del webinar "Modernizing Legacy Code with Claude Code" (fuente [20] sin URL en la bibliografía)
    { titulo: 'Webinar "Modernizing Legacy Code with Claude Code" (demos COBOL → Java y Java 8 → 17)', url: '', origen: 'Anthropic', duracion: '', nota: 'Enlace pendiente.' },
  ],

  paraInvestigar: [
    'Plugin `code-modernization` y el webinar de modernización.',
    'Migración de formularios Delphi a una UI web (Blazor o un frontend JavaScript).',
    'Feature flags, plan de reversa (rollback) y ventanas de corte.',
    'Migración y validación de datos a gran escala.',
    'Artículo oficial sobre modernización de COBOL.',
    'Ecosistema .NET: ASP.NET Core, Entity Framework Core y Npgsql.',
  ],

  entregable: {
    nombre: 'Plan de modernización de aplicación legada',
    criterios: [
      'Módulo de totales en C# con sus tests en verde contra el golden master.',
      '`docs/defectos-corregidos.md`: qué cambió, por qué y qué caso cambia su valor esperado, en commits separados.',
      'Esquema PostgreSQL (`db/001_pedidos.sql`) y script de carga validados con conteos y sumas.',
      '`docs/plan-migracion.md` con etapas, convivencia, riesgos y criterio de corte.',
    ],
    alimentaA: 'u06',
  },
};
