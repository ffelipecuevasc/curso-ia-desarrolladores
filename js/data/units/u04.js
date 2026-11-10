/**
 * Unidad 4 · Fuente: fuentes/unidades/unidad-04.md
 */
import { BIBLIO, DOCS, MATERIAL_REPO, academyVideo } from '../links.js';

/** Carpeta de la Unidad 4 en el repositorio de material (rama main). */
const U4_BLOB = `${MATERIAL_REPO.url}/blob/main/unidad-4`;
const U4_TREE = `${MATERIAL_REPO.url}/tree/main/unidad-4`;

export default {
  id: 'u04',
  numero: 4,
  titulo: 'Análisis y diagnóstico de sistemas legados con IA',
  tituloCorto: 'Diagnóstico de sistemas legados',
  descripcionBreve: 'Diagnosticar un legado sin tocarlo: plan mode, subagentes, reglas ocultas y matriz de decisión.',
  dia: 2,
  bloque: 'tarde',
  nivel: '30 → 40',

  foco: 'Diagnosticar Pedidos Legado sin modificar un solo archivo: entenderlo en plan mode, encontrar sus reglas con un subagente de solo lectura y decidir con una matriz.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Explorar un sistema legado en plan mode antes de cambiar nada.',
    'Crear un subagente de solo lectura para explorar sin saturar el contexto principal.',
    'Extraer reglas de negocio con archivo:línea y verificarlas leyendo el código.',
    'Decidir con una matriz entre mantener, refactorizar, modernizar o reemplazar.',
  ],
  licencias: ['Claude Team Standard (incluye Claude Code)', 'JetBrains Rider'],
  herramientas: ['Claude Code (plan mode y subagentes)', 'Rider', 'Tu `pedidos-web` con `legado/` (Delphi 7 + DBISAM 4, solo lectura)'],
  requisitos: [
    {
      titulo: 'Tu pedidos-web con lo nuevo de la Unidad 4',
      texto: 'En el receso, pídele a Claude Code que traiga solo lo nuevo: la carpeta `legado/`, las plantillas de `docs/diagnostico/` y la del subagente. Se suma; no reemplaza nada tuyo.',
      enlace: { titulo: 'README de pedidos-web (camino A)', url: `${U4_TREE}/taller/pedidos-web` },
    },
    {
      titulo: 'Claude Code y Rider listos',
      texto: 'No instalas Delphi: el legado no se compila, solo se lee. Verifica con `claude --version` y abre tu pedidos-web en Rider.',
    },
  ],
  pendientes: [],
  catedra: [
    { titulo: 'Apertura: conceptos fundamentales y material oficial', minutos: 5 },
    { titulo: 'C1 · Mirar sin tocar: arqueología en plan mode (arriendo-legado)', minutos: 15 },
    { titulo: 'C2 · Divide y explora: mi subagente analista (arriendo-legado)', minutos: 15 },
    { titulo: 'C3 · Reglas ocultas: parejas sobre `btnCalcularClick` y comparación con Claude', minutos: 20 },
    { titulo: 'C4 · Decidir con datos: matriz de arriendo-legado y "¿Qué harías tú?"', minutos: 20 },
    { titulo: 'Cierre: repaso con cuatro preguntas y temas para investigar', minutos: 10 },
  ],

  conceptos: {
    obligatorios: [
      {
        slug: 'subagente-solo-lectura',
        titulo: 'Subagente con herramientas restringidas',
        resumen: 'Un analista que solo puede leer: `Read`, `Grep` y `Glob`.',
        explicacion: [
          'Un subagente propio es un archivo Markdown en `.claude/agents/<nombre>.md`: se crea pidiéndoselo a Claude o escribiendo el archivo. `/agents` ya no abre un asistente de creación. En el frontmatter solo `name` y `description` son obligatorios, y si es el primer agente en una carpeta `agents` nueva hay que reiniciar Claude Code.',
          'El campo `tools` es una lista blanca. Para diagnosticar un legado, el subagente `analista-legado` se limita a herramientas de lectura (`Read`, `Grep`, `Glob`). Así es imposible que modifique un archivo, aunque se lo pidan.',
          'Trabaja en su propio contexto y devuelve solo un resumen, lo que puedes comprobar comparando `/context` con y sin el subagente.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: '.claude/agents/analista-legado.md',
          contenido: `---
name: analista-legado
description: Analiza código legado Delphi/DBISAM de solo lectura. Úsalo para encontrar reglas de negocio, dependencias y riesgos en el código, siempre con evidencia archivo:línea.
tools: Read, Grep, Glob
---

Eres un analista de sistemas legados. Lees código Delphi (Object Pascal, archivos .pas y .dfm) y esquemas DBISAM para explicar qué hace el sistema.

Reglas:
1. Cada hallazgo lleva evidencia en formato \`archivo:línea\`, con la línea de código citada tal como está.
2. Si no encuentras evidencia en el código, lo dices con todas sus letras («no encontré evidencia de…»). No supones ni completas con lo que «debería» hacer el sistema.
…`,
        },
        nota: '**Implementación de Claude Code:** los subagentes y su formato en `.claude/agents/` son propios de Claude Code.',
        fuente: DOCS.subAgents,
      },
      {
        slug: 'catalogo-reglas',
        titulo: 'Catálogo de reglas con evidencia',
        resumen: 'Una regla por fila: archivo y línea, condición y efecto. Verificada leyendo el código.',
        explicacion: [
          'El catálogo de reglas de negocio (`docs/diagnostico/reglas-negocio.md`) es una tabla con una regla por fila: archivo y línea, condición y efecto.',
          'Toda regla extraída se verifica leyendo el código. Si Claude afirma algo que no puedes ubicar, no entra al diagnóstico.',
          'Un diagnóstico que encuentra pocas reglas se quedó en la superficie: el sistema tiene reglas que no están a la vista.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: 'docs/diagnostico/reglas-negocio.md (formato)',
          contenido: `| # | Regla | Archivo:línea | Condición | Efecto | Verificada |
|---|---|---|---|---|---|
| R1 | ... | UArchivo.pas:123 | ... | ... | Sí |`,
        },
        nota: '',
        fuente: DOCS.commonWorkflows,
      },
      {
        slug: 'mermaid-dependencias',
        titulo: 'Diagramas Mermaid desde el código',
        resumen: 'Un mapa de dependencias versionable, generado por Claude y revisado por ti.',
        explicacion: [
          'Mermaid describe diagramas como texto, así que el mapa de dependencias vive en el repo junto al diagnóstico y se puede revisar en un diff.',
          'Pide a Claude el diagrama a partir del código y compáralo con lo que tú lees: unidades, formularios, data modules y tablas.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'text',
          titulo: 'Sintaxis Mermaid (ejemplo genérico, no es el legado real)',
          contenido: `graph TD
  UFrmFormulario --> UDMDatos
  UFrmFormulario --> UUtilidades
  UDMDatos --> TABLA[(Tabla)]`,
        },
        nota: '',
        fuente: DOCS.commonWorkflows,
      },
    ],
    fundamentales: [
      {
        slug: 'mirar-sin-tocar',
        titulo: 'Mirar sin tocar',
        resumen: 'Primero entender, después cambiar.',
        explicacion: [
          'Un legado se toca con miedo por su antigüedad, complejidad, deuda técnica, costo de mantención y autor ausente. La primera fase es solo de lectura.',
          'Plan mode (Shift+Tab hasta verlo, o `/plan`) permite preguntar "¿qué hace?", "¿quién lo llama?" y "¿qué pasa si…?" sin riesgo de modificar nada.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.permissionModes,
      },
      {
        slug: 'divide-y-explora',
        titulo: 'Divide y explora',
        resumen: 'Un subagente por frente, el contexto limpio.',
        explicacion: [
          'Un código grande satura la ventana de contexto. Los subagentes exploran en su propio contexto y devuelven solo un resumen.',
          'Existen subagentes incorporados (**Explore**, que busca y explora código, y **Plan**, que investiga durante plan mode; ambos de solo lectura) y subagentes propios en `.claude/agents/`, con herramientas restringidas.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.subAgents,
      },
      {
        slug: 'reglas-ocultas',
        titulo: 'Reglas ocultas',
        resumen: 'El negocio está enterrado en el código.',
        explicacion: [
          'En un legado, el negocio se esconde en eventos de formularios, SQL dentro de la UI, números mágicos, variables globales, `if` anidados y código muerto. Una regla puede estar repetida en dos lugares y hacer cosas distintas.',
          'Se piden una por fila, con ubicación exacta, condición y efecto; lo dudoso queda «por verificar», y cada una se verifica leyendo el código.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.commonWorkflows,
      },
      {
        slug: 'decidir-con-datos',
        titulo: 'Decidir con datos',
        resumen: 'Mantener, refactorizar, modernizar o reemplazar.',
        explicacion: [
          'Cuatro opciones: **mantener** (funciona y casi no cambia), **refactorizar** (mismo stack, mejor código), **modernizar** (stack nuevo por partes) y **reemplazar** (producto nuevo o SaaS).',
          'Se decide con una matriz de criterios y pesos: costo, complejidad, riesgo, impacto en el negocio y personas que conocen el sistema. **Los pesos suman 100 %** y la recomendación sale de la matriz, no de la intuición.',
          'No hay una única estrategia correcta: lo que se evalúa es que la recomendación se desprenda de tu matriz.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: 'docs/diagnostico/matriz-decision.md (formato)',
          contenido: `## Pesos

| Criterio | Qué mide | Peso |
|---|---|---|
| Costo | Cuánto cuesta en horas y dinero | … % |
| Complejidad | Qué tan difícil es técnicamente | … % |
| Riesgo | Qué puede salir mal en el camino | … % |
| Impacto | Cuánto valor entrega al negocio | … % |
| Personas | Conocimiento disponible en el equipo | … % |
| **Total** |  | **100 %** |

## Matriz

| Módulo | Mantener | Refactorizar | Modernizar | Reemplazar | Recomendación |
|---|---|---|---|---|---|
| … |  |  |  |  |  |`,
        },
        nota: '',
        fuente: BIBLIO.codeMigrationBlog,
      },
    ],
  },

  laboratorio: {
    nombre: 'Diagnóstico de Pedidos Legado',
    modalidad: 'Individual',
    duracion: 80,
    caso: 'La distribuidora decidió modernizar **Pedidos Legado**, su sistema de escritorio en Delphi con DBISAM de hace 18 años, y **pedidos-web** es esa modernización. Antes de aprobar presupuesto, la gerencia pide un diagnóstico técnico: qué hay, qué es riesgoso y por dónde empezar.',
    problematica: 'No hay documentación y el autor original ya no está. Las reglas de negocio (descuentos, impuestos, bloqueos de clientes) están repartidas en formularios, data modules y utilidades. Nadie sabe Delphi y el código no compila: solo se puede **leer**.',
    objetivo: 'Hacer un diagnóstico completo en tu pedidos-web **sin modificar ningún archivo de legado/**, en 3 etapas (entender, encontrar y decidir), y terminar con una recomendación respaldada por una matriz.',
    // Resumen visible en la pestaña Taller (máx. 1000 caracteres; el detalle está en la guía PDF).
    resumen: 'La distribuidora quiere modernizar Pedidos Legado, su sistema de escritorio en Delphi 7 con DBISAM 4 de hace 18 años, y la gerencia pide un diagnóstico antes de aprobar presupuesto: qué hay, qué es riesgoso y por dónde empezar. El código llega a tu pedidos-web en el receso, en la carpeta `legado/`: no compila y no se toca, solo se lee. Trabajas en 3 etapas. Entender: en plan mode, la única etapa que lo usa, haces el inventario y el diagrama de dependencias. Encontrar: con tu subagente de solo lectura `analista-legado`, catalogas reglas de negocio y riesgos con `archivo:línea`, y verificas al menos 5 reglas leyendo el código. Decidir: armas una matriz de decisión por módulo y cierras con un resumen ejecutivo de 5 líneas para la gerencia. Todo queda en `docs/diagnostico/` y en un commit hecho por ti. El paso a paso está en la guía.',
    pasos: [
      { minutos: 5, texto: 'Preparación: pídele a Claude Code una regla deny `Edit(/legado/**)` en `.claude/settings.json`, sin borrar lo que ya tenga, y crea el subagente `analista-legado` desde `docs/plantilla-subagente.md`, solo con `Read`, `Grep` y `Glob`. Si es tu primer subagente, cierra y vuelve a abrir Claude Code.', conceptos: ['C2'] },
      { minutos: 20, texto: 'Entender (en **plan mode**, la única etapa que lo usa): explora `legado/` y llena `docs/diagnostico/inventario.md` (cada `.pas`, `.dfm` y tabla, con su responsabilidad y líneas) y `dependencias.md` (diagrama Mermaid, incluida la base).', conceptos: ['C1'] },
      { minutos: 30, texto: 'Encontrar (modo por defecto + subagente): con `analista-legado`, llena `reglas-negocio.md` y `riesgos.md` según sus plantillas, cada fila con `archivo:línea`. **Verifica al menos 5 reglas abriendo el archivo en Rider.**', conceptos: ['C2', 'C3'] },
      { minutos: 20, texto: 'Decidir (modo por defecto): llena `matriz-decision.md` con pesos y puntajes por módulo. Claude propone y explica; tú decides. Cierra con un **resumen ejecutivo de 5 líneas** para la gerencia.', conceptos: ['C4'] },
      { minutos: 5, texto: 'Cierre: revisa que estén los 5 archivos y que nada cambió en `legado/`, y haz tu commit «docs: diagnóstico de Pedidos Legado (U4)».', conceptos: [] },
    ],
    puntosControl: [
      'El inventario tiene todos los archivos de `legado/src/` y el diagrama incluye la base de datos (etapa 1).',
      'Al menos 8 reglas, al menos 5 verificadas leyendo el código, y al menos 5 riesgos con evidencia y prioridad (etapa 2).',
      'Pesos que suman 100 %, al menos 4 módulos puntuados, una recomendación que se desprende de la matriz y un resumen de 5 líneas (etapa 3).',
    ],
    resultadoEsperado: [
      'El sistema tiene reglas que no están a la vista. Un diagnóstico que encuentra pocas reglas se quedó en la superficie.',
      'Las reglas no viven en un solo archivo, un comentario puede mentir, una regla puede estar dos veces y comportarse distinto, y hay código que nunca se ejecuta.',
      'Cada afirmación tiene su evidencia: archivo y línea. Si Claude afirma algo que no puedes ubicar en el código, no entra.',
      'No hay una única estrategia correcta: la recomendación debe desprenderse de tu matriz.',
      '**Pista para la Unidad 5:** ¿El total que ve el vendedor en pantalla es el mismo que queda grabado?',
    ],
    siTeTrabas: [
      'Cómo crear un subagente con herramientas restringidas (*Subagents* y el curso *Introduction to subagents*).',
      'Cómo impedir que Claude edite una carpeta con una regla deny (*Permissions*).',
      'Qué es un formulario `.dfm` y dónde viven sus eventos (apunte «Delphi para desarrolladores web»).',
      'La sección "Understand new codebases" de *Common workflows*.',
    ],
    erroresFrecuentes: [
      'El subagente no aparece → cierra y vuelve a abrir Claude Code.',
      'En la etapa 1 Claude no escribe → es lo esperado en plan mode: aprueba el plan.',
      'Claude quiere «arreglar» el código → recházalo: tu trabajo es diagnosticar. La regla deny lo frena.',
      'Una regla cita una línea que no calza → sale del catálogo hasta que la ubiques tú.',
      'No ves `legado/` en Rider → no es parte de la solución .NET: cambia el explorador a la vista de archivos.',
      '¿Atrasado? → pídele a Claude Code que copie inventario y dependencias de la carpeta `u4-respaldo` del repo de material y sigue en la etapa 2.',
    ],
    planB: [
      'Carpeta `unidad-4/taller/u4-respaldo` del repo de material (no es una rama), con `inventario.md` y `dependencias.md` de referencia, para saltar a la etapa 2.',
      'Sin Claude Code: sigue la exploración que proyecta el instructor y trabaja leyendo el código.',
    ],
    extension: 'Instalar el plugin oficial `code-modernization` y comparar su análisis con el tuyo.',
  },

  material: [
    { id: 'guia', tipo: 'pdf', titulo: 'Guía del taller "Diagnóstico de Pedidos Legado"', archivo: 'assets/material/u04/guia-taller.pdf', disponible: true },
    // destino: 'taller' → se ve en la pestaña Taller, no en Recursos.
    { tipo: 'enlace', titulo: 'Proyecto del taller: pedidos-web (base de la U4)', descripcion: 'El README explica qué traer a tu repo (camino A): `legado/`, `docs/diagnostico/` y la plantilla del subagente.', url: `${U4_TREE}/taller/pedidos-web`, disponible: true, destino: 'taller' },
    { tipo: 'enlace', titulo: 'Diagnóstico de respaldo (plan B)', descripcion: 'Inventario y dependencias de referencia, para saltar a la etapa 2 si te trabas.', url: `${U4_TREE}/taller/u4-respaldo`, disponible: true, destino: 'taller' },
    { tipo: 'enlace', titulo: 'Demos de la unidad: arriendo-legado', descripcion: 'Sistema ficticio en Delphi 7 + DBISAM 4 para las cuatro demos.', url: `${U4_TREE}/demos`, disponible: true },
    { tipo: 'enlace', titulo: 'Subagente de la demo: analista-legado', descripcion: 'El archivo de `.claude/agents/` que se crea en clase.', url: `${U4_BLOB}/demos/analista-legado.md`, disponible: true },
    { tipo: 'pdf', titulo: 'Delphi para desarrolladores web (apunte)', archivo: 'assets/material/u04/delphi-para-web.pdf', disponible: true },
  ],

  videos: [
    academyVideo('subagents', 'Curso completo.'),
    academyVideo('claudeCodeInAction', 'Plan mode.'),
    { titulo: 'Webinar "Modernizing Legacy Code with Claude Code"', url: BIBLIO.modernizingLegacyWebinar.url, origen: 'Anthropic', duracion: '', nota: 'On demand; pide registrarse con un formulario.' },
  ],

  paraInvestigar: [
    '**Delphi para desarrolladores web** (apunte en Recursos): qué es una unit (`.pas`), un formulario (`.dfm`), un data module, los componentes de datos (`TTable`, `TQuery`, `TDataSource`) y los eventos (`OnClick`, `BeforePost`).',
    '**DBISAM:** motor embebido de tablas en archivos y sus diferencias con un motor cliente-servidor como PostgreSQL.',
    '**Por qué migrar Delphi a .NET:** el costo de mantener sistemas Delphi crece y cada vez hay menos especialistas.',
    'Plugin oficial `code-modernization` y el webinar de modernización.',
    'Técnicas de estimación: estimación por analogía y puntos de función.',
    'El curso completo *Introduction to subagents*.',
  ],

  entregable: {
    nombre: 'Diagnóstico técnico de Pedidos Legado',
    criterios: [
      '`docs/diagnostico/` con inventario, dependencias (Mermaid), reglas de negocio, riesgos y matriz de decisión.',
      'Al menos 8 reglas catalogadas y 5 verificadas leyendo el código; al menos 5 riesgos con evidencia y prioridad.',
      'Cada afirmación con evidencia: archivo y línea.',
      'Matriz con pesos que suman 100 % y resumen ejecutivo de 5 líneas.',
      'Nada cambió en `legado/` y el commit «docs: diagnóstico de Pedidos Legado (U4)» lo hiciste tú.',
    ],
    alimentaA: 'u05',
  },
};
