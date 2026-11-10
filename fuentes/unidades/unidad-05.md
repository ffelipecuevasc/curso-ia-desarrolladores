# Unidad 5 — Modernización de sistemas legados y migración entre tecnologías

**Día 3 · bloque mañana** · Nivel 40 → 55 · Bloque A 85' · Receso 15' · Bloque B 80' · Licencia: Claude Team Standard (incluye Claude Code) + JetBrains Rider · Stack: Rider + .NET 10 + xUnit + Claude Code (hooks y subagentes) · legado en Delphi 7 + DBISAM 4 (no se compila) · Docker no se exige

> Versión 2 (10-nov-2026): demos sobre un solo proyecto (arriendo-web), golden master regenerado desde el legado de la U4, C# dentro de PedidosWeb.Core y taller en 3 etapas. PostgreSQL pasa a extensión opcional.

## Bloque A — Cátedra (85')

### A1. Apertura: conceptos fundamentales y material oficial (5')
| # | Concepto | En una frase | Material oficial |
|---|---|---|---|
| C1 | **Paso a paso** | Lo viejo y lo nuevo conviven. | *Code modernization* [21] · Webinar de modernización [20] |
| C2 | **Congela el comportamiento** | Primero el golden master, después el código. | Webinar de modernización [20] · Artículo COBOL [13] |
| C3 | **Traducir no es copiar** | Cada tecnología tiene su forma. | *Common workflows*: refactor [17] |
| C4 | **Verificación automática** | El hook prueba cada cambio. | Docs de hooks [47] · *Claude Code in action* [10] · *Introduction to subagents* [14] |

Hoy hay dos proyectos y una sola historia. Las demos del instructor ocurren en **arriendo-web** (el arriendo-legado de las demos de la U4 más una solución .NET, carpeta `unidad-5/demos/arriendo-web` del repo de material) y cuentan una historia seguida: **Congelar → Traducir → Verificar**. En el taller, cada alumno repite el mismo método en su `pedidos-web` con `legado/src/UCalculoTotales.pas`.

### A2. Lenguajes: elegir bien para no migrar después (10')
La IA puede escribir en cualquier lenguaje, pero **elegir el lenguaje es una decisión de arquitectura**: define quién lo mantiene, qué librerías hay y cuánto cuesta en cinco años.

| Lenguaje | Dónde brilla |
|---|---|
| **Delphi** (Object Pascal) | Escritorio Windows con base de datos: ERP, facturación, inventario. |
| **Java** | Banca, gobierno y grandes empresas: décadas de estabilidad. |
| **Python** | IA y datos: tiene las librerías dominantes del área. |
| **JavaScript / TypeScript** | El único lenguaje nativo del navegador; full stack con Node.js. |
| **C#** | APIs web y escritorio sobre .NET. Su diseñador, **Anders Hejlsberg**, también creó Turbo Pascal y fue arquitecto de Delphi. |

- **Índice TIOBE de noviembre 2026** [46]: Python #1, C# #5 y Delphi/Object Pascal #19 (0,78 %, a la baja). Mide cuánto se busca un lenguaje, no cuánto código hay en producción. Cambia cada mes.
- **Delphi hoy:** pocos desarrolladores y cada vez menos, licencias comerciales costosas y poca cultura de testing y CI/CD.
- **Por qué C#:** comparte la filosofía de Delphi (tipado fuerte, objetos, propiedades), sirve para web y escritorio y es la decisión que tomaron las empresas de los alumnos.

### A3. Desarrollo (55')

**C1 · Paso a paso (8').** La migración *big bang* cambia todo en un día de corte; si algo falla, falla todo. La **incremental**, con el patrón *strangler fig*, migra un módulo a la vez: el sistema viejo y el nuevo conviven y, si algo falla, se vuelve al legado [21]. En `pedidos-web` se migran primero los totales y las pantallas después.

**C2 · Congela el comportamiento (15').** Los tests de caracterización registran lo que el sistema **hace hoy**, aunque esté mal, antes de tocarlo. Su forma más simple es un **golden master**: un archivo con entradas reales y las salidas del sistema viejo, que el código nuevo debe igualar fila por fila [20]. Ejemplo real del taller: el pedido 1002 (5 × 8.210 y 30 × 5.000) da subtotal 191.050, flete 3.500, IVA 36.964 y total 231.514.
- *Demo 1 "Congelar la tarifa" (8'):* en arriendo-web, Claude escribe un `[Theory]` que lee `migracion/tarifas-golden.csv` (20 casos de `TarifaBase` de `UTarifas.pas`). Sin implementación todavía: los 20 casos quedan en rojo. El rojo es el resultado correcto: la red está lista antes de escribir C#.

**C3 · Traducir no es copiar (19').** Correspondencia de conceptos: *unit* → clase o namespace, formulario → endpoint o vista, evento `OnClick` → handler, `TDBISAMQuery` con SQL concatenado → repositorio con parámetros, variable global → configuración inyectada.
- *Actividad "Traduce el tipo" (8', en parejas):* los tipos reales de `legado/db/esquema-dbisam.sql` y de `UCalculoTotales.pas` (`MONEY`, `BOOLEAN`, `DATE`, `CHAR(1)` de estado, `INTEGER` con folio `MAX+1` y `Double` en el `.pas`). El curso propone el tipo equivalente en PostgreSQL y en C# y el riesgo de cada conversión. El dinero nunca va en `float` ni en `double`.
- *Demo 2 "Traducir no es copiar" (8'):* Claude convierte `TarifaBase` a C# con montos en `decimal`. Si redondea con `MidpointRounding.AwayFromZero` (el redondeo «de siempre»), un caso queda en rojo. `Round()` de Delphi lleva los ,5 al número par (redondeo bancario), que en C# es `MidpointRounding.ToEven`. Corregido, los 20 casos quedan en verde. La IA traduce rápido; solo los tests saben si tradujo bien.

**C4 · Verificación automática (13').**
- Un **hook `PostToolUse`** ejecuta `dotnet test` después de cada edición de Claude. Si falla, sale con código 2 y Claude recibe el error para corregirlo [47].
- **Subagente de solo lectura:** se reutiliza `analista-legado` de la U4 (`tools: Read, Grep, Glob`) para que explique el Delphi antes de traducir. Quien lee no edita [14].
- *Demo 3 "El hook que no perdona" (6'):* con el hook activo en arriendo-web, pedir «Simplifica FactorTemporada usando un switch». Si el cambio rompe un caso, el hook sale con código 2 y Claude corrige solo. Igual se revisa el diff: el hook no reemplaza el criterio.

```json
{ "hooks": { "PostToolUse": [ { "matcher": "Edit|Write", "hooks": [
  { "type": "command", "command": "cd \"$CLAUDE_PROJECT_DIR\" && dotnet test --nologo 1>&2 || exit 2" } ] } ] } }
```

**Discusión «¿Migrar con defectos o corregirlos?» (5').**
| Migrar tal cual | Corregir en el camino |
|---|---|
| Más rápido. La comparación con el legado es exacta. | El sistema nuevo queda limpio. |
| Arrastra la deuda técnica a la nueva plataforma. | Más lento. Rompe la comparación directa con el legado. |

Commits separados («igual al legado» y luego «defecto corregido»); si toca dinero o impuestos, decide el negocio; cada corrección queda registrada con su caso. **En el taller:** se corrige solo R05, en su propio commit. La diferencia ≥ frente a > en los umbrales se registra como hallazgo: la decide el negocio.

### A4. Cierre (10')
- **Antes del receso: 4 preguntas.** Paso a paso (¿Por qué empezamos por el cálculo de totales y no por las pantallas?) · Congela el comportamiento (¿Qué guarda un golden master: lo correcto o lo que el sistema hace hoy?) · Traducir no es copiar (¿Por qué un monto en pesos nunca va en double?) · Verificación automática (¿Qué hace Claude cuando el hook sale con código 2?).
- **Temas secundarios para investigar por su cuenta:**
  - Plugin `code-modernization` [19] y el webinar de modernización, con las demos COBOL → Java y Java 8 → 17 [20].
  - Migración de formularios Delphi a una UI web (Blazor o un frontend JavaScript).
  - Feature flags, plan de reversa (*rollback*) y ventanas de corte.
  - Migración y validación de datos a gran escala.
  - Artículo oficial sobre modernización de COBOL [13].
  - Ecosistema .NET: ASP.NET Core, Entity Framework Core y Npgsql.
  - PostgreSQL en Docker: extensión opcional del taller [48].

## Bloque B — Taller "Migrar el cálculo de totales" (80', individual)

**Misión.** Llevar `UCalculoTotales.pas` a C# sin que ningún cliente pague un peso distinto, salvo el defecto que corriges y registras.

**Caso.** Primer módulo de la modernización de Pedidos Legado. Según el diagnóstico de la Unidad 4, se empieza por `legado/src/UCalculoTotales.pas`: es crítico para el negocio, no depende de la interfaz y el portal web lo necesita. El código Delphi tiene **defectos conocidos**, como el redondeo de los ,5 (R05).

**Preparación (en el receso).** Traer a tu repo solo lo nuevo de la U5 con el camino A del README de `unidad-5/taller/pedidos-web`, pidiéndoselo a Claude Code con este texto: «Trae a pedidos-web solo lo nuevo de la Unidad 5 desde el repo de material (migracion/ y docs/migracion/). No toques nada más y explícame cada paso.» Se suma `migracion/golden-master.csv`, `migracion/README.md`, `docs/migracion/defectos-corregidos.md` y `docs/migracion/plan-migracion.md`; no reemplaza `README.md`, `AGENTS.md`, `PedidosWeb.sln`, `src/`, `tests/`, `legado/`, `specs/` ni `.claude/`.

| Etapa | Min | Qué haces | Concepto |
|---|---|---|---|
| Preparación | 10 | Confirmar que llegó lo nuevo de la U5, que los tests dan lo mismo que en la U4 y hacer el commit de base. | — |
| 1 · Congelar | 20 | Pedirle a Claude Code un `[Theory]` en `tests/PedidosWeb.Core.Tests/Totales/` que lea `migracion/golden-master.csv` y compare descuento, flete, IVA y total, y solo la firma de `CalculoTotales.Calcular` en `src/PedidosWeb.Core/Totales/`, que lance `NotImplementedException`. Sin tocar `PedidosWeb.sln`. | C2 |
| 2 · Migrar | 25 | Activar el hook `PostToolUse` (JSON en el README del taller) y reiniciar Claude Code. Con `analista-legado`, entender `UCalculoTotales.pas` y convertirlo a C# igual al legado, defectos incluidos, con montos en `decimal`. Commit «igual al legado». | C1, C3, C4 |
| 3 · Corregir y planificar | 20 | Corregir R05 en un commit aparte y actualizar los casos que cambian en el CSV. Registrar R05 y el hallazgo de los umbrales en `defectos-corregidos.md` y completar `plan-migracion.md`. | C1, C2 |
| Cierre | 5 | Dos alumnos muestran un defecto corregido y su justificación. | — |

**Datos clave.** `golden-master.csv` tiene 60 casos, uno por pedido, con lo que calcula hoy `UCalculoTotales.pas`. Usa punto decimal: se lee con `CultureInfo.InvariantCulture`. **No se edita para que un test pase**: solo cambia en la etapa 3, con registro. Las columnas están en `migracion/README.md`.

**Qué se espera, sin darte la respuesta.**
- Lo que el legado muestra en pantalla y lo que graba no siempre coincide en los umbrales: encuéntralo, no lo corrijas, regístralo.
- Un test que cambia su valor esperado sin quedar registrado en `defectos-corregidos.md` es una regresión escondida.
- Si un test pasa «demasiado rápido», revisa si cambió el CSV.

**Qué investigar si te trabas.** La configuración de hooks y los códigos de salida [47], cómo usar un subagente con herramientas restringidas [14], los tests parametrizados en xUnit (`[Theory]`, `[MemberData]`) y `MidpointRounding` en .NET.

- **Entregable:** *Plan de modernización de aplicación legada*: totales en C# con 60 casos en verde, R05 corregido en su propio commit, `docs/migracion/defectos-corregidos.md` (R05 + hallazgo ≥ / >) y `docs/migracion/plan-migracion.md`.
- **Puntos de control:**
  - **Preparación:** los tests dan lo mismo que al cerrar la U4 y `PedidosWeb.sln` no cambió.
  - **Etapa 1:** 60 tests en rojo, cargados desde el CSV, todos por `NotImplementedException`.
  - **Etapa 2:** 60 de 60 en verde; la columna `total` del CSV suma 58.202.135.
  - **Etapa 3:** 13 casos actualizados, la suma pasa a 58.202.144 y los dos documentos están completos.
- **Errores frecuentes:**
  - El hook no corre → cierra y vuelve a abrir Claude Code y revisa con `/hooks`.
  - Tests que pasan rapidísimo → ¿cambió el CSV? Revierte: el CSV es el contrato.
  - Claude no puede editar `legado/` → correcto: es solo lectura (regla deny de la U4).
  - No encuentra el CSV al correr los tests → el proyecto de tests debe copiarlo a su carpeta de salida (README del taller).
  - Error al leer `0.19` → usa `CultureInfo.InvariantCulture`.
  - Copiaste la carpeta completa y perdiste tu README o tu `AGENTS.md` → recupera con Git y usa el camino A.
- **Plan B:** carpeta `unidad-5/taller/u5-respaldo` del repo de material (no es una rama), con el lector del golden master y un `CalculoTotales` vacío, para saltar a la etapa 2. Sin Claude Code: seguir la migración que proyecta el instructor y trabajar con los tests.
- **Extensión opcional:** llevar `PEDIDOS.csv` y `PEDIDO_LINEAS.csv` a PostgreSQL 16 en Docker con un esquema propio (`numeric` para los montos) y validar la carga con conteos y sumas [48].
