# Unidad 5 — Modernización de sistemas legados y migración entre tecnologías

**Día 3 · bloque mañana** · Nivel 40 → 55 · Bloque A 85' · Receso 15' · Bloque B 80' · Licencia: Claude Team Standard · Stack: Rider + .NET + xUnit + **Docker (PostgreSQL 16 Alpine)**

> **Requisito previo: Docker.** Antes de esta clase, cada alumno debe tener Docker funcionando (`docker --version`). Durante la cátedra, se levanta PostgreSQL con **un solo comando**:
> ```bash
> docker run -d --name pedidos-pg --restart unless-stopped -p 5432:5432 -e POSTGRES_USER=pedidos -e POSTGRES_PASSWORD=pedidos123 -e POSTGRES_DB=pedidos_web -e POSTGRES_INITDB_ARGS="--encoding=UTF8" -e TZ=America/Santiago -e PGTZ=America/Santiago -v pedidos-pgdata:/var/lib/postgresql/data postgres:16-alpine
> ```
> - **Verificar:** `docker exec -it pedidos-pg psql -U pedidos -d pedidos_web -c "select version();"`
> - **Si el puerto 5432 está ocupado:** cambiar a `-p 5433:5432`.
> - La contraseña es solo para el curso. Nunca se usa así en producción [48].

## Bloque A — Cátedra (85')

### A1. Apertura: conceptos fundamentales y material oficial (5')
| # | Concepto | En una frase | Material oficial |
|---|---|---|---|
| C1 | **Paso a paso** | Lo viejo y lo nuevo conviven. | *Code modernization* [21] · Webinar de modernización [20] |
| C2 | **Congela el comportamiento** | Primero el golden master, después el código. | Webinar de modernización [20] · Artículo COBOL [13] |
| C3 | **Traducir no es copiar** | Cada tecnología tiene su forma. | *Common workflows*: refactor [17] |
| C4 | **Verificación automática** | El hook prueba cada cambio. | Docs de hooks [47] · *Claude Code in action* [10] · *Introduction to subagents* [14] |

### A2. Lenguajes: elegir bien para no migrar después (15')
La IA puede escribir en cualquier lenguaje, pero **elegir el lenguaje es una decisión de arquitectura**. Conocer las fortalezas de cada uno evita migraciones innecesarias en el futuro.

| Lenguaje | Qué es | Dónde brilla y por qué se elige | TIOBE oct-2026 [46] |
|---|---|---|---|
| **Delphi** (Object Pascal) | Compilado a código nativo, con desarrollo visual RAD | En los 90 y 2000 fue el favorito para apps de escritorio Windows con base de datos (ERP, facturación, inventario): se arrastraban componentes y conectaban tablas en horas, y los ejecutables eran rápidos | #19 (0,83%, a la baja) |
| **Java** | Corre en la JVM: "se escribe una vez, se ejecuta en todas partes" | Banca, gobierno y grandes empresas. Ecosistema gigante (Spring) y estabilidad de décadas | #4 |
| **Python** | Interpretado, de sintaxis simple | IA, ciencia de datos y Big Data. Tiene las librerías dominantes del área (PyTorch, Pandas, Spark) | #1 |
| **JavaScript / TypeScript** | El único lenguaje nativo del navegador | Sitios con mucha interacción y full stack con Node.js. El ecosistema npm es el más grande que existe | #6 |
| **C#** | Tipado estático y moderno, sobre .NET (multiplataforma desde .NET Core) | APIs web (ASP.NET Core), escritorio Windows, nube Azure y videojuegos (Unity). Su diseñador, **Anders Hejlsberg**, también creó Turbo Pascal y Delphi | #5 |

- **Desventajas de Delphi hoy:**
  - Pocos desarrolladores disponibles y cada vez menos.
  - Licencias comerciales costosas.
  - Ecosistema chico de librerías.
  - Orientado al escritorio Windows, con poco soporte nativo para web, nube y contenedores.
  - Menos herramientas de testing y CI/CD.
- **Por qué C# es el destino natural:**
  - Comparte la filosofía de Delphi (tipado fuerte, orientación a objetos y propiedades), así que la traducción es más directa.
  - Sirve tanto para web (el portal) como para escritorio, si hace falta.
  - Tiene respaldo de Microsoft y una comunidad grande.
  - Es la decisión que tomaron las empresas de los alumnos.

### A3. Desarrollo (55')

**C1 · Paso a paso (10').** La migración "big bang" (todo de una vez) frente a la **incremental** con el patrón *strangler fig*: se migra un módulo a la vez, el sistema viejo y el nuevo conviven y el tráfico se pasa al nuevo gradualmente [21].

**C2 · Congela el comportamiento (15').** Los tests de caracterización (*golden master*) registran lo que el sistema **hace hoy**, aunque esté mal, antes de tocarlo [20].
- *Demo "Golden master en 10 minutos":* una función ficticia en PHP antiguo, `precioEntrada()`, que calcula el precio de una entrada de cine (adulto, niño, tercera edad, miércoles 2x1). Generar 20 casos, congelarlos en un CSV y migrar la función a C# hasta que los 20 pasen.

**C3 · Traducir no es copiar (15').** Correspondencia de conceptos: *unit* → clase o namespace, formulario → endpoint o vista, evento `OnClick` → handler, `TDBISAMQuery` → repositorio con parámetros.
- *Actividad "Traduce el tipo":* tabla de tipos DBISAM (`CURRENCY`, `BOOLEAN`, `MEMO`, `AUTOINC`, fechas `dd/mm/yy`). El curso propone el tipo equivalente en PostgreSQL y en C#, y el riesgo de cada conversión. Por ejemplo, `CURRENCY` → `numeric(12,0)` y `decimal`, nunca `float`.

**C4 · Verificación automática (15').**
- Un **hook `PostToolUse`** ejecuta `dotnet test` después de cada edición. Si falla, sale con código 2 y Claude recibe el error para corregirlo [47].
- **Subagentes por rol:** `analizador` (solo lectura), `conversor` (edita C#) y `verificador` (ejecuta tests y compara con el golden master) [14].
- *Demo "El hook que no perdona":* sobre la migración de `precioEntrada()`, introducir un error y ver cómo Claude lo corrige solo.

```json
{ "hooks": { "PostToolUse": [ { "matcher": "Edit|Write", "hooks": [
  { "type": "command", "command": "cd \"$CLAUDE_PROJECT_DIR\" && dotnet test --nologo 1>&2 || exit 2" } ] } ] } }
```

### A4. Cierre (10')
- **Repaso:** Paso a paso · Congela el comportamiento · Traducir no es copiar · Verificación automática.
- **Temas secundarios para investigar por su cuenta:**
  - Plugin `code-modernization` [19] y el webinar de modernización, con las demos COBOL → Java y Java 8 → 17 [20].
  - Migración de formularios Delphi a una UI web (Blazor o un frontend JavaScript).
  - Feature flags, plan de reversa (*rollback*) y ventanas de corte.
  - Migración y validación de datos a gran escala.
  - Artículo oficial sobre modernización de COBOL [13].
  - Ecosistema .NET: ASP.NET Core, Entity Framework Core y Npgsql.

## Bloque B — Taller "Migrar el cálculo de totales" (80', individual)

**Caso de uso.** Primer módulo de la modernización de Pedidos Legado. Según el diagnóstico de la Unidad 4, se empieza por `UCalculoTotales.pas`: es crítico para el negocio, no depende de la interfaz y el portal web lo necesita.

**Problemática.** El cálculo de totales define cuánto paga cada cliente. Si la versión en C# calcula distinto, la empresa pierde dinero o cobra de más. Además, el código Delphi tiene **defectos conocidos**, por ejemplo el redondeo en los ,5. Hay que decidir si se migran tal cual o se corrigen.

**Discusión inicial del instructor (5'): ¿migrar con defectos o corregirlos?**
| Migrar tal cual | Corregir en el camino |
|---|---|
| Más rápido. La comparación con el legado es exacta. | Más lento. El sistema nuevo queda limpio. |
| Arrastra la deuda técnica a la nueva plataforma. | Rompe la comparación directa con el legado. |

**Recomendaciones para la discusión:**
- **Separa los commits:** primero "migrado igual que el legado" y después "defecto corregido". Así cada diferencia es explicable.
- **Alguien puede depender del defecto:** contabilidad pudo haber cuadrado informes con el redondeo antiguo. Durante la convivencia, las diferencias deben conciliarse.
- **Si el defecto toca dinero o impuestos**, lo decide el negocio, no el desarrollador.
- **Cada corrección queda registrada:** qué cambió, por qué y qué caso del golden master cambia su valor esperado.

**Indicación para este taller: migrar corrigiendo los defectos.**

| Paso | Min | Qué haces | Concepto |
|---|---|---|---|
| 1 | 15 | Crear `PedidosWeb.Totales.Tests` y escribir tests xUnit parametrizados desde `golden-master.csv`. **Punto de control:** todos los casos cargados y en rojo, porque todavía no hay implementación. | C2 |
| 2 | 25 | Crear los subagentes `analizador`, `conversor` y `verificador`, y activar el hook. Convertir `UCalculoTotales.pas` a C# hasta pasar el golden master. Luego **corregir los defectos encontrados**: ajustar cada caso afectado y registrarlo en `docs/defectos-corregidos.md`, en commits separados. | C1, C3, C4 |
| 3 | 20 | Con PostgreSQL en Docker, generar `db/001_pedidos.sql` (tablas `pedidos` y `pedido_lineas` con tipos correctos) y un script que cargue los CSV del legado. Validar con conteos y con la suma de totales. | C3 |
| 4 | 15 | Redactar `docs/plan-migracion.md`: etapas, convivencia del sistema viejo y el nuevo, riesgos y criterio de corte. | C1 |
| 5 | 5 | Cierre: dos alumnos muestran un defecto corregido y su justificación. | — |

**Qué se espera, sin darte la respuesta.**
- Hay defectos que el golden master no muestra a simple vista. Tu diagnóstico de la Unidad 4 te dice dónde buscar.
- Un test que cambia su valor esperado sin quedar registrado en `defectos-corregidos.md` es una regresión escondida.
- La suma de totales en PostgreSQL debe cuadrar con la del legado, salvo por los defectos que corregiste.

**Qué investigar si te trabas.** La configuración de hooks y los códigos de salida [47], cómo crear subagentes con herramientas restringidas [14], los tests parametrizados en xUnit (`[Theory]`, `[MemberData]`) y la carga de CSV con `COPY` en PostgreSQL.

- **Entregable (ajuste aprobado):** *Plan de modernización de aplicación legada*, más el módulo de totales en C# con sus tests en verde, `defectos-corregidos.md`, el esquema PostgreSQL y el script de carga.
- **Plan B:** rama `u5-respaldo` con el proyecto de tests y el lector de CSV ya listos. Si Docker falla, revisar el script SQL sin ejecutarlo y validar la lógica con los tests de C#.
- **Extensión opcional:** pedirle al subagente `verificador` un informe de diferencias entre el legado y C# caso por caso.
