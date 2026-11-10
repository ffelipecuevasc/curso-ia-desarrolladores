/**
 * Unidad 5 · Fuente: fuentes/unidades/unidad-05.md (versión 2, 10-nov-2026)
 */
import { BIBLIO, DOCS, MATERIAL_REPO, academyVideo } from '../links.js';

/** Carpeta de la Unidad 5 en el repositorio de material (rama main). */
const U5_BLOB = `${MATERIAL_REPO.url}/blob/main/unidad-5`;
const U5_TREE = `${MATERIAL_REPO.url}/tree/main/unidad-5`;

/** Descripción común de los apuntes de lenguajes (todos traen las mismas secciones). */
const LENGUAJE_DESCRIPCION = 'Ficha técnica, historia, usos, cuándo elegirlo y cómo pedirle código a la IA.';

export default {
  id: 'u05',
  numero: 5,
  titulo: 'Modernización de sistemas legados y migración entre tecnologías',
  tituloCorto: 'Modernización y migración',
  descripcionBreve: 'Migrar Delphi a C# sin cambiar un peso: golden master, tipos y un hook que prueba cada cambio.',
  dia: 3,
  bloque: 'mañana',
  nivel: '40 → 55',

  foco: 'Llevar el cálculo de totales de Delphi a C# sin que nadie pague distinto: congelar el comportamiento, traducir con criterio, verificar con un hook y corregir un defecto registrándolo.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Migrar módulo a módulo (strangler fig) en lugar de todo de una vez (big bang).',
    'Congelar el comportamiento actual con un golden master antes de escribir C#.',
    'Traducir tipos y reglas al estilo de .NET en lugar de copiar línea a línea.',
    'Verificar cada edición con un hook `PostToolUse` y un subagente de solo lectura.',
  ],
  licencias: ['Claude Team Standard (incluye Claude Code)', 'JetBrains Rider'],
  herramientas: ['Claude Code (hooks y subagentes)', 'Rider', '.NET 10 + xUnit', 'Tu `pedidos-web` con `legado/` y `migracion/`'],
  requisitos: [
    {
      titulo: 'Tu pedidos-web con lo nuevo de la Unidad 5',
      texto: 'En el receso, Claude Code trae solo `migracion/` y `docs/migracion/`. Se suma; no reemplaza nada tuyo.',
      enlace: { titulo: 'README de pedidos-web (camino A)', url: `${U5_TREE}/taller/pedidos-web` },
    },
    {
      titulo: 'Claude Code, Rider y .NET listos',
      texto: 'Verifica con `claude --version` y `dotnet --version`. Docker no se exige: PostgreSQL es una extensión opcional.',
    },
  ],
  pendientes: [],
  catedra: [
    { titulo: 'Apertura: conceptos fundamentales y material oficial', minutos: 5 },
    { titulo: 'Lenguajes: elegir bien para no migrar después (Delphi, Java, Python, JS/TS, C#)', minutos: 10 },
    { titulo: 'C1 · Paso a paso: big bang frente a strangler fig', minutos: 8 },
    { titulo: 'C2 · Congela el comportamiento y demo «Congelar la tarifa»', minutos: 15 },
    { titulo: 'C3 · Traducir no es copiar y demo «Traducir no es copiar»', minutos: 19 },
    { titulo: 'C4 · Verificación automática y demo «El hook que no perdona»', minutos: 13 },
    { titulo: 'Discusión: ¿migrar con defectos o corregirlos?', minutos: 5 },
    { titulo: 'Cierre: repaso con cuatro preguntas y temas para investigar', minutos: 10 },
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
        slug: 'subagente-solo-lectura',
        titulo: 'Subagente de solo lectura',
        resumen: 'Reutilizas `analista-legado` (`Read`, `Grep`, `Glob`): explica el Delphi antes de traducir.',
        explicacion: [
          'El subagente `analista-legado` de la Unidad 4 se reutiliza tal cual en `.claude/agents/`. Su campo `tools` es una lista blanca: solo `Read`, `Grep` y `Glob`.',
          'Quien lee no edita: explica `UCalculoTotales.pas` sin riesgo de modificar nada, antes de que Claude escriba el C#.',
          'Trabaja en su propio contexto y devuelve un resumen. Si es tu primer subagente en la carpeta, reinicia Claude Code para que lo reconozca.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: '.claude/agents/analista-legado.md (encabezado)',
          contenido: `---
name: analista-legado
description: Analiza código legado Delphi/DBISAM de solo lectura.
tools: Read, Grep, Glob
---`,
        },
        nota: '**Implementación de Claude Code:** los subagentes y su formato en `.claude/agents/` son propios de Claude Code.',
        fuente: DOCS.subAgents,
      },
      {
        slug: 'golden-master-csv',
        titulo: 'El golden master en CSV',
        resumen: 'El CSV es el contrato: 60 casos que el C# debe igualar y que no se editan para que un test pase.',
        explicacion: [
          '`migracion/golden-master.csv` tiene 60 casos, uno por pedido, con lo que calcula hoy `UCalculoTotales.pas`. Un solo `[Theory]` los recorre todos y compara descuento, flete, IVA y total.',
          'Usa punto decimal, así que se lee con `CultureInfo.InvariantCulture`; con la cultura de Chile, `0.19` falla o se lee mal.',
          '**No se edita para que un test pase.** Solo cambia en la etapa 3, cuando corriges un defecto, y cada caso que cambia queda registrado. Si un test pasa «demasiado rápido», revisa si cambió el CSV.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'csharp',
          titulo: 'Forma del test (ilustrativa; las columnas reales están en migracion/README.md)',
          contenido: `[Theory]
[MemberData(nameof(CasosGoldenMaster))]
public void Total_coincide_con_el_legado(Pedido pedido, decimal totalEsperado)
{
    Assert.Equal(totalEsperado, CalculoTotales.Calcular(pedido).Total);
}

// Al leer el CSV: decimal.Parse(campo, CultureInfo.InvariantCulture)`,
        },
        nota: '',
        fuente: BIBLIO.modernizingLegacyWebinar,
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
          'En la demo, la función `TarifaBase` de `UTarifas.pas` (arriendo-web) genera 20 casos que se congelan en un CSV. Sin implementación todavía, los 20 quedan en rojo: la red está lista antes de escribir C#.',
          'En el taller, el golden master tiene 60 casos. Primero migras igual al legado, defectos incluidos; después corriges solo R05, en un commit aparte y registrado en `docs/migracion/defectos-corregidos.md`.',
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
          'Correspondencias: una *unit* pasa a ser una clase o namespace; un formulario, un endpoint o una vista; un evento `OnClick`, un handler; una `TDBISAMQuery` con SQL concatenado, un repositorio con parámetros; una variable global, configuración inyectada.',
          'Con los tipos pasa lo mismo. Los reales del legado son `MONEY`, `BOOLEAN`, `DATE`, `CHAR(1)` (estado), `INTEGER` con folio `MAX+1` y `Double` en el `.pas`. Cada uno tiene su equivalente en C# y su riesgo de conversión; el dinero nunca va en `float` ni en `double`.',
          '`Round()` de Delphi lleva los ,5 al número par (redondeo bancario), que en C# es `MidpointRounding.ToEven`. Si la IA usa `AwayFromZero`, el cálculo cambia en silencio: solo los tests saben si tradujo bien.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'csharp',
          titulo: 'Los ,5 en Delphi y en C#',
          contenido: `Math.Round(2.5m, MidpointRounding.ToEven);        // 2  (como Round() de Delphi)
Math.Round(2.5m, MidpointRounding.AwayFromZero);  // 3  (el redondeo «de siempre»)`,
        },
        nota: '',
        fuente: DOCS.commonWorkflows,
      },
      {
        slug: 'verificacion-automatica',
        titulo: 'Verificación automática',
        resumen: 'El hook prueba cada cambio.',
        explicacion: [
          'Una regla que depende de la memoria de alguien no es una regla. Con un hook, cada edición dispara los tests y Claude recibe el error si algo se rompe.',
          'Con un subagente de solo lectura que explica el legado, la migración se vuelve un ciclo: entender → convertir → probar → comparar con el golden master → corregir. Igual se revisa el diff: el hook no reemplaza el criterio.',
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
    caso: 'Primer módulo de la modernización de Pedidos Legado. Según el diagnóstico de la Unidad 4, se empieza por `legado/src/UCalculoTotales.pas`: es crítico para el negocio, no depende de la interfaz y el portal web lo necesita.',
    problematica: 'El cálculo de totales define cuánto paga cada cliente. Si la versión en C# calcula distinto, la empresa pierde dinero o cobra de más. Además, el código Delphi tiene **defectos conocidos**, como el redondeo de los ,5 (R05).',
    objetivo: 'Llevar `UCalculoTotales.pas` a C# hasta pasar 60 de 60 casos del golden master, corregir R05 en un commit aparte, registrar los defectos y completar el plan de migración.',
    // Resumen visible en la pestaña Taller (máx. 1000 caracteres; el detalle está en la guía PDF).
    resumen: 'Primer módulo de la modernización de Pedidos Legado: llevar `UCalculoTotales.pas` a C# sin que ningún cliente pague un peso distinto, salvo el defecto que corriges y registras. En el receso traes a tu pedidos-web solo lo nuevo de la U5: el golden master (`migracion/golden-master.csv`, 60 casos) y dos plantillas. Trabajas en 3 etapas. Congelar: Claude escribe tests que leen el CSV y quedan 60 en rojo. Migrar: activas un hook que corre los tests después de cada edición y, con tu subagente `analista-legado`, conviertes el cálculo a C# igual al legado, defectos incluidos, hasta 60 de 60 en verde. Corregir y planificar: corriges solo el redondeo R05 en un commit aparte, registras ese defecto y un hallazgo que decide el negocio, y completas el plan de migración. Todo el C# va en carpetas `Totales/` dentro de Core: no se toca `PedidosWeb.sln`. El paso a paso está en la guía.',
    pasos: [
      { minutos: 10, texto: 'Preparación: confirma que llegó lo nuevo de la U5, que los tests dan lo mismo que en la U4 y haz el commit de base.', conceptos: [] },
      { minutos: 20, texto: 'Congelar: pídele a Claude Code un `[Theory]` en `tests/PedidosWeb.Core.Tests/Totales/` que lea `migracion/golden-master.csv` y compare descuento, flete, IVA y total, y solo la firma de `CalculoTotales.Calcular` en `src/PedidosWeb.Core/Totales/`, que lance `NotImplementedException`. Sin tocar `PedidosWeb.sln`.', conceptos: ['C2'] },
      { minutos: 25, texto: 'Migrar: activa el hook `PostToolUse` (JSON en el README del taller) y reinicia Claude Code. Con `analista-legado`, entiende `UCalculoTotales.pas` y conviértelo a C# igual al legado, defectos incluidos, con montos en `decimal`. Commit «igual al legado».', conceptos: ['C1', 'C3', 'C4'] },
      { minutos: 20, texto: 'Corregir y planificar: corrige R05 en un commit aparte y actualiza los casos que cambian en el CSV. Registra R05 y el hallazgo de los umbrales en `defectos-corregidos.md` y completa `plan-migracion.md`.', conceptos: ['C1', 'C2'] },
      { minutos: 5, texto: 'Cierre: dos alumnos muestran un defecto corregido y su justificación.', conceptos: [] },
    ],
    puntosControl: [
      'Los tests dan lo mismo que al cerrar la U4 y `PedidosWeb.sln` no cambió (preparación).',
      '60 tests en rojo, cargados desde el CSV, todos por `NotImplementedException` (etapa 1).',
      '60 de 60 en verde; la columna `total` del CSV suma 58.202.135 (etapa 2).',
      '13 casos actualizados, la suma pasa a 58.202.144 y los dos documentos están completos (etapa 3).',
    ],
    resultadoEsperado: [
      'Lo que el legado muestra en pantalla y lo que graba no siempre coincide en los umbrales: encuéntralo, no lo corrijas, regístralo.',
      'Un test que cambia su valor esperado sin quedar registrado en `defectos-corregidos.md` es una regresión escondida.',
      'Si un test pasa «demasiado rápido», revisa si cambió el CSV.',
    ],
    siTeTrabas: [
      'La configuración de hooks y los códigos de salida (*Hooks*).',
      'Cómo usar un subagente con herramientas restringidas (*Subagents* y el curso *Introduction to subagents*).',
      'Los tests parametrizados en xUnit (`[Theory]`, `[MemberData]`).',
      '`MidpointRounding` en .NET.',
    ],
    erroresFrecuentes: [
      'El hook no corre → cierra y vuelve a abrir Claude Code y revisa con `/hooks`.',
      'Los tests pasan rapidísimo → ¿cambió el CSV? Revierte: el CSV es el contrato.',
      'Claude no puede editar `legado/` → es lo correcto: es solo lectura (regla deny de la U4).',
      'No encuentra el CSV al correr los tests → el proyecto de tests debe copiarlo a su carpeta de salida (README del taller).',
      'Error al leer `0.19` → usa `CultureInfo.InvariantCulture`.',
      'Copiaste la carpeta completa y perdiste tu README o tu `AGENTS.md` → recupera con Git y usa el camino A.',
    ],
    planB: [
      'Carpeta `unidad-5/taller/u5-respaldo` del repo de material (no es una rama), con el lector del golden master y un `CalculoTotales` vacío, para saltar a la etapa 2.',
      'Sin Claude Code: sigue la migración que proyecta el instructor y trabaja con los tests.',
    ],
    extension: 'Llevar `PEDIDOS.csv` y `PEDIDO_LINEAS.csv` a PostgreSQL 16 en Docker con un esquema propio (`numeric` para los montos) y validar la carga con conteos y sumas (opcional).',
  },

  material: [
    { id: 'presentacion', tipo: 'pdf', variante: 'presentacion', titulo: 'Presentación de clases · Unidad 5', descripcion: 'Las diapositivas que usamos en el encuentro, para repasar o consultar después.', archivo: 'assets/material/u05/presentacion-clase.pdf', peso: '7,1 MB', disponible: true },
    { id: 'guia', tipo: 'pdf', titulo: 'Guía del taller "Migrar el cálculo de totales"', archivo: 'assets/material/u05/guia-taller.pdf', disponible: true },
    // destino: 'taller' → se ve en la pestaña Taller, no en Recursos.
    { tipo: 'enlace', titulo: 'Proyecto del taller: pedidos-web (base de la U5)', descripcion: 'El README explica qué traer a tu repo (camino A): `migracion/` y `docs/migracion/`.', url: `${U5_TREE}/taller/pedidos-web`, disponible: true, destino: 'taller' },
    { tipo: 'enlace', titulo: 'Respaldo del taller (plan B)', descripcion: 'El lector del golden master y un `CalculoTotales` vacío, para saltar a la etapa 2 si te trabas.', url: `${U5_TREE}/taller/u5-respaldo`, disponible: true, destino: 'taller' },
    { tipo: 'enlace', titulo: 'Demos de la unidad: arriendo-web', descripcion: 'El legado de arriendo-legado más una solución .NET, para las tres demos.', url: `${U5_TREE}/demos`, disponible: true },
    { tipo: 'pdf', titulo: 'Tabla de correspondencia de tipos DBISAM → C#', archivo: 'assets/material/u05/tipos-dbisam.pdf', peso: '0,3 MB', disponible: true },
    // Apuntes de lenguajes: variante 'lenguaje' → bloque propio al final de Recursos, con el logo de cada lenguaje.
    { tipo: 'pdf', variante: 'lenguaje', icono: 'lang-delphi', titulo: 'Lenguaje Object Pascal (Delphi)', descripcion: LENGUAJE_DESCRIPCION, archivo: 'assets/material/u05/lenguaje-object-pascal-delphi.pdf', peso: '0,7 MB', disponible: true },
    { tipo: 'pdf', variante: 'lenguaje', icono: 'lang-csharp', titulo: 'Lenguaje C# y .NET', descripcion: LENGUAJE_DESCRIPCION, archivo: 'assets/material/u05/lenguaje-csharp.pdf', peso: '0,8 MB', disponible: true },
    { tipo: 'pdf', variante: 'lenguaje', icono: 'lang-java', titulo: 'Lenguaje Java', descripcion: LENGUAJE_DESCRIPCION, archivo: 'assets/material/u05/lenguaje-java.pdf', peso: '0,7 MB', disponible: true },
    { tipo: 'pdf', variante: 'lenguaje', icono: 'lang-python', titulo: 'Lenguaje Python', descripcion: LENGUAJE_DESCRIPCION, archivo: 'assets/material/u05/lenguaje-python.pdf', peso: '0,7 MB', disponible: true },
    { tipo: 'pdf', variante: 'lenguaje', icono: 'lang-javascript', titulo: 'Lenguaje JavaScript', descripcion: LENGUAJE_DESCRIPCION, archivo: 'assets/material/u05/lenguaje-javascript.pdf', peso: '0,7 MB', disponible: true },
    { tipo: 'pdf', variante: 'lenguaje', icono: 'lang-php', titulo: 'Lenguaje PHP', descripcion: LENGUAJE_DESCRIPCION, archivo: 'assets/material/u05/lenguaje-php.pdf', peso: '0,7 MB', disponible: true },
  ],

  videos: [
    academyVideo('claudeCodeInAction', 'Hooks y verificación.'),
    academyVideo('subagents'),
    { titulo: 'Webinar "Modernizing Legacy Code with Claude Code"', url: BIBLIO.modernizingLegacyWebinar.url, origen: 'Anthropic', duracion: '', nota: 'On demand; pide registrarse con un formulario.' },
  ],

  paraInvestigar: [
    'Plugin `code-modernization` y el webinar de modernización, con las demos COBOL → Java y Java 8 → 17.',
    'Migración de formularios Delphi a una UI web (Blazor o un frontend JavaScript).',
    'Feature flags, plan de reversa (*rollback*) y ventanas de corte.',
    'Migración y validación de datos a gran escala.',
    'Artículo oficial sobre modernización de COBOL.',
    'Ecosistema .NET: ASP.NET Core, Entity Framework Core y Npgsql.',
    'PostgreSQL en Docker: extensión opcional del taller.',
  ],

  entregable: {
    nombre: 'Plan de modernización de aplicación legada',
    criterios: [
      'Totales en C# con los 60 casos del golden master en verde.',
      'R05 corregido en su propio commit.',
      '`docs/migracion/defectos-corregidos.md` con R05 y el hallazgo ≥ / >.',
      '`docs/migracion/plan-migracion.md` con etapas, convivencia, riesgos y criterio de corte.',
      'Nada cambió en `legado/` ni en `PedidosWeb.sln`.',
    ],
    alimentaA: 'u06',
  },
};
