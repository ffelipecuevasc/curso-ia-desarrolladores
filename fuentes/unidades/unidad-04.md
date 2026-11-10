# Unidad 4 — Análisis y diagnóstico de sistemas legados con IA

**Día 2 · bloque tarde** · Nivel 30 → 40 · Bloque A 85' · Receso 15' · Bloque B 80' · Licencia: Claude Team Standard (incluye Claude Code) + JetBrains Rider · Stack: Claude Code + Rider · legado en Delphi 7 + DBISAM 4 (no se instala Delphi: el legado no se compila, solo se lee)

> Versión 2 (10-nov-2026): demos sobre un solo proyecto (arriendo-legado), legado dentro de pedidos-web y taller en 3 etapas.

## Bloque A — Cátedra (85')

### A1. Apertura: conceptos fundamentales y material oficial (5')
| # | Concepto | En una frase | Material oficial |
|---|---|---|---|
| C1 | **Mirar sin tocar** | Primero entender, después cambiar. | *Common workflows*: "Understand new codebases" [17] · *Claude Code in action*: plan mode [10] |
| C2 | **Divide y explora** | Un subagente por frente, el contexto limpio. | *Introduction to subagents* [14] |
| C3 | **Reglas ocultas** | El negocio está enterrado en el código. | Webinar *Modernizing Legacy Code with Claude Code* [20] · *Code modernization* [21] |
| C4 | **Decidir con datos** | Mantener, refactorizar, modernizar o reemplazar. | *Code modernization*: playbook y casos [21] |

No existe material oficial de Anthropic específico de Delphi ni DBISAM. El método que se enseña es general y se aplica a cualquier legado.

### A2. Desarrollo (70')

Las cuatro demos ocurren sobre **un solo proyecto, arriendo-legado** (sistema ficticio de arriendo de autos en Delphi 7 + DBISAM 4, carpeta `unidad-4/demos/arriendo-legado` del repo de material), y cuentan una historia seguida: **Mirar → Explorar → Encontrar → Decidir**. El código no se compila ni se instala Delphi: se lee.

**C1 · Mirar sin tocar (15').** Por qué un legado se toca con miedo: antigüedad, complejidad, deuda técnica, costo de mantención y autor ausente. Sin tests ni documentación, cada cambio es una apuesta. La primera fase es solo de lectura: **plan mode** (Shift+Tab hasta verlo, o `/plan`) permite preguntar "¿qué hace?", "¿quién lo llama?" y "¿qué pasa si…?" sin modificar nada (*Permission modes*, documentación de Claude Code). Las dependencias se dibujan como diagramas Mermaid generados desde el código [17].
- *Demo 1 "Arqueología en plan mode" (6'):* en plan mode sobre `arriendo-legado`, pedir inventario, dependencias en Mermaid y reglas con `archivo:línea`, sin cambiar nada. Si no tiene archivo y línea, no es un hallazgo: es una suposición.

**C2 · Divide y explora (15').** Un código grande satura la ventana de contexto. Un subagente lee en su propia ventana y devuelve solo un resumen [14]. Hay subagentes incorporados (**Explore**, que busca y explora código, y **Plan**, que investiga durante plan mode; ambos de solo lectura) y subagentes propios en `.claude/agents/` (*Subagents*, documentación de Claude Code).
- **Cómo se crea uno propio:** pídeselo a Claude o escribe el archivo `.claude/agents/<nombre>.md`. `/agents` ya no abre un asistente de creación. Solo `name` y `description` son obligatorios.
- `tools` es una lista blanca: con `tools: Read, Grep, Glob`, sin `Write` ni `Edit`, el subagente no puede modificar nada. Reinicia Claude Code solo si es el primer agente en una carpeta `agents` nueva.
- *Demo 2 "Mi subagente analista" (6'):* en modo por defecto (en plan mode Claude no escribe archivos), pedir que cree `analista-legado` en `.claude/agents/` con `tools: Read, Grep, Glob`; cerrar y reabrir porque es el primer agente; pedir el mismo inventario sin subagente y con subagente, en sesiones separadas, y comparar `/context`.

**C3 · Reglas ocultas (20').** Dónde se esconde el negocio en un legado: eventos de formularios, SQL dentro de la UI, números mágicos, variables globales, `if` anidados y código muerto. Una regla puede estar repetida en dos lugares y hacer cosas distintas. Las reglas se piden una por fila, con id, regla, `archivo:línea`, condición y efecto, y lo dudoso queda «por verificar». **Toda regla extraída se verifica abriendo el archivo en esa línea** [20].
- *Demo 3 "Reglas ocultas", parte 1 (7', en parejas):* sin IA, leer el método `btnCalcularClick` de `UFrmArriendo.pas` (líneas 81–107) y anotar al menos 3 reglas con el formato Regla · Línea · Condición · Efecto.
- *Demo 3, parte 2 "Comparemos con Claude" (4'):* en modo por defecto, pedir las reglas de `btnCalcularClick` una por fila, con `archivo:línea`, condición y efecto, sin cambiar nada, y clasificar: solo el curso · ambos · solo Claude. Claude encuentra rápido; tú decides qué es verdad.

**C4 · Decidir con datos (20').** Las cuatro opciones: **mantener** (funciona y casi no cambia), **refactorizar** (mismo stack, mejor código), **modernizar** (stack nuevo por partes) y **reemplazar** (producto nuevo o SaaS) [21]. Se decide con una matriz de criterios y pesos: costo, complejidad, riesgo, impacto en el negocio y personas que conocen el sistema. Los pesos suman 100 % y la recomendación sale de la matriz, no de la intuición.
- *Demo 4 "Matriz de decisión de arriendo-legado" (5'):* puntuar de 1 a 5 (5 = más conveniente) los módulos `UTarifas`, `UFrmArriendo`, `UDMArriendo` + DBISAM y `UUtilidades` con los cinco criterios, y leer la recomendación que se desprende.
- *Actividad "¿Qué harías tú?" (8', votación, sin proyecto):* 4 sistemas ficticios.
  - Una intranet PHP sin tests que funciona bien y casi nadie la toca.
  - Un ERP en Visual Basic 6 cuyo único desarrollador se jubila.
  - Una app en Angular.js con dependencias vulnerables.
  - Un sistema de facturación en Delphi conectado a la autoridad tributaria (SII).

  El curso vota y justifica cada caso con los criterios de la matriz.

### A3. Cierre (10')
- **Repaso con cuatro preguntas:** Mirar sin tocar (¿Qué hace Claude en plan mode y qué cambia cuando apruebas el plan?) · Divide y explora (¿Por qué un subagente cuida tu ventana de contexto?) · Reglas ocultas (¿Cuándo una regla que encontró Claude entra a tu diagnóstico?) · Decidir con datos (¿De dónde tiene que salir tu recomendación?).
- **Temas para investigar por su cuenta (también durante el taller, si terminas antes):**
  - **Delphi para desarrolladores web** (apunte del sitio, U4): qué es una *unit* (`.pas`), un formulario (`.dfm`), un *data module*, los componentes de datos (`TTable`, `TQuery`, `TDataSource`) y los eventos (`OnClick`, `BeforePost`).
  - **DBISAM:** motor embebido de tablas en archivos y sus diferencias con un motor cliente-servidor como PostgreSQL.
  - **Por qué migrar Delphi a .NET:** las empresas empleadoras de este curso operan sistemas Delphi críticos. El costo de mantenerlos crece y cada vez hay menos especialistas.
  - Plugin oficial `code-modernization` [19][28] y el webinar de modernización [20].
  - Técnicas de estimación: estimación por analogía y puntos de función.
  - Curso completo *Introduction to subagents* [14].

## Bloque B — Taller "Diagnóstico de Pedidos Legado" (80', individual)

**Misión.** ¿Qué hay en Pedidos Legado? ¿Qué es riesgoso? ¿Por dónde empezar? Respondes las tres preguntas con un diagnóstico técnico en tu `pedidos-web`, sin tocar el legado.

**Caso.** La distribuidora decidió modernizar **Pedidos Legado**, el sistema de escritorio en Delphi con DBISAM que usa hace 18 años, y `pedidos-web` es esa modernización. Antes de aprobar presupuesto, la gerencia pide un diagnóstico técnico. No hay documentación y el autor original ya no trabaja en la empresa. Las reglas de negocio (descuentos, impuestos, bloqueos de clientes) están repartidas en formularios, *data modules* y unidades de utilidades. Nadie del equipo actual sabe Delphi y el código no compila: solo se puede **leer**.

**Preparación (en el receso).** Traer a tu repo solo lo nuevo de la U4 con el camino A del README de `unidad-4/taller/pedidos-web`, pidiéndoselo a Claude Code con este texto: «Trae a pedidos-web solo lo nuevo de la Unidad 4 desde el repo de material (legado/, docs/diagnostico/ y docs/plantilla-subagente.md). No toques nada más y explícame cada paso.» Se suma; no reemplaza `README.md`, `AGENTS.md`, `PedidosWeb.sln`, `src/`, `tests/` ni `specs/`.

| Etapa | Min | Qué haces | Concepto |
|---|---|---|---|
| Preparación | 5 | Pedirle a Claude Code una regla deny `Edit(/legado/**)` en `.claude/settings.json`, sin borrar lo que ya tenga, y crear el subagente `.claude/agents/analista-legado.md` desde `docs/plantilla-subagente.md`, solo con `Read`, `Grep` y `Glob`. Si es tu primer subagente, cerrar y volver a abrir Claude Code. | C2 |
| 1 · Entender | 20 | En **plan mode** (la única etapa que lo usa): explorar `legado/` y llenar `docs/diagnostico/inventario.md` (cada `.pas`, `.dfm` y tabla, con su responsabilidad y líneas) y `dependencias.md` (diagrama Mermaid, incluida la base). | C1 |
| 2 · Encontrar | 30 | En modo por defecto, con el subagente `analista-legado`: llenar `reglas-negocio.md` y `riesgos.md` según sus plantillas, cada fila con `archivo:línea` y lo dudoso «por verificar». Verificar al menos 5 reglas abriendo el archivo en Rider. | C2, C3 |
| 3 · Decidir | 20 | En modo por defecto: llenar `matriz-decision.md` con pesos y puntajes por módulo (Claude propone y explica, tú decides) y cerrar con un resumen ejecutivo de 5 líneas para la gerencia. | C4 |
| Cierre | 5 | Revisar que estén los 5 archivos y que nada cambió en `legado/`, y hacer tu commit: «docs: diagnóstico de Pedidos Legado (U4)». | — |

**Datos clave.** `legado/` trae 16 archivos en `legado/src/` (10 `.pas` y 6 `.dfm`), el esquema DBISAM y datos de ejemplo en CSV en `legado/db/`. `docs/diagnostico/` trae 5 plantillas con instrucciones y el punto de control de cada etapa. `legado/` no es parte de `PedidosWeb.sln`: en Rider se ve con la vista de archivos.

**Qué se espera, sin darte la respuesta.**
- El sistema tiene reglas que no están a la vista. Un diagnóstico que encuentra pocas reglas se quedó en la superficie.
- Las reglas no viven en un solo archivo, un comentario puede mentir, una regla puede estar dos veces y comportarse distinto, y hay código que nunca se ejecuta.
- Cada afirmación del diagnóstico debe tener su evidencia: archivo y línea. Si Claude afirma algo que no puedes ubicar en el código, no entra al diagnóstico.
- No hay una única estrategia correcta. Lo que se evalúa es que la recomendación se desprenda de tu matriz.
- **Pista para la Unidad 5:** ¿El total que ve el vendedor en pantalla es el mismo que queda grabado?

**Qué investigar si te trabas.**
- Cómo crear un subagente con herramientas restringidas [14].
- Cómo impedir que Claude edite una carpeta con una regla deny (*Permissions*, documentación de Claude Code).
- Qué es un formulario `.dfm` y dónde viven sus eventos (apunte «Delphi para desarrolladores web»).
- La sección "Understand new codebases" de *Common workflows* [17].

- **Entregable:** *Diagnóstico técnico de Pedidos Legado*: carpeta `pedidos-web/docs/diagnostico/` con `inventario.md`, `dependencias.md` (Mermaid), `reglas-negocio.md`, `riesgos.md` y `matriz-decision.md` (incluye el resumen ejecutivo de 5 líneas). Sin cambios en `legado/` y con el commit hecho por el alumno: «docs: diagnóstico de Pedidos Legado (U4)».
- **Puntos de control:**
  - **Etapa 1:** el inventario tiene todos los archivos de `legado/src/` y el diagrama incluye la base de datos.
  - **Etapa 2:** al menos 8 reglas, al menos 5 verificadas leyendo el código, y al menos 5 riesgos con evidencia y prioridad.
  - **Etapa 3:** pesos que suman 100 %, al menos 4 módulos puntuados, una recomendación que se desprende de la matriz y un resumen de 5 líneas.
- **Errores frecuentes:**
  - El subagente no aparece → cierra y vuelve a abrir Claude Code.
  - En la etapa 1 Claude no escribe → es lo esperado en plan mode: aprueba el plan.
  - Claude quiere «arreglar» el código → recházalo: tu trabajo es diagnosticar. La regla deny lo frena.
  - Una regla cita una línea que no calza → sale del catálogo hasta que la ubiques tú.
  - No ves `legado/` en Rider → no es parte de la solución .NET: cambia el explorador de Rider a la vista de archivos.
  - ¿Atrasado? → pídele a Claude Code que copie inventario y dependencias de `unidad-4/taller/u4-respaldo/` (repo de material) y sigue en la etapa 2.
- **Plan B:** carpeta `unidad-4/taller/u4-respaldo` del repo de material, con `inventario.md` y `dependencias.md` de referencia, para saltar a la etapa 2. Sin Claude Code: seguir la exploración que proyecta el instructor y trabajar leyendo el código.
- **Extensión opcional:** instalar el plugin oficial `code-modernization` y comparar su análisis con el tuyo [19].
