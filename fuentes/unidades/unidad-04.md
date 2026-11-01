# Unidad 4 — Análisis y diagnóstico de sistemas legados con IA

**Día 2 · bloque tarde** · Nivel 30 → 40 · Bloque A 85' · Receso 15' · Bloque B 80' · Licencia: Claude Team Standard · Repo: `pedidos-legado` (Delphi + DBISAM, sintético)

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

**C1 · Mirar sin tocar (15').**
- Desafíos del legado: antigüedad, complejidad, deuda técnica y costo de mantención, y por qué se toca con miedo.
- **Plan mode** como modo de solo lectura. Preguntas de comprensión del tipo "¿qué hace?", "¿quién lo llama?", "¿qué pasa si…?".
- Diagramas Mermaid generados desde el código [17].
- *Demo "Arqueología en 10 minutos":* sobre un script PHP 5 ficticio de formulario de contacto (`contacto-viejo/`), pedir en plan mode un inventario, el mapa de dependencias y las reglas de negocio con su archivo y línea.

**C2 · Divide y explora (15').**
- Un código grande satura la ventana de contexto. Los subagentes exploran en su propio contexto y devuelven solo un resumen [14].
- Los subagentes incorporados (Explore, Plan) y los subagentes propios en `.claude/agents/`, con herramientas restringidas a lectura (`Read`, `Grep`, `Glob`).
- *Demo "Mi subagente analista":* crear `analista-legado` con `/agents` y comparar `/context` de la sesión principal con el subagente y sin él.

**C3 · Reglas ocultas (20').**
- Dónde se esconde el negocio en un legado: eventos de formularios, SQL dentro de la UI, números mágicos, variables globales, `if` anidados y código muerto.
- Cómo pedir que se extraigan las reglas: una por fila, con su ubicación exacta, su condición y su efecto. **Toda regla extraída se verifica leyendo el código** [20].
- *Mini-ejercicio en parejas:* se proyecta un fragmento de 30 líneas de un sistema ficticio de arriendo de autos. El curso encuentra 3 reglas antes que Claude y luego se compara.

**C4 · Decidir con datos (20').**
- Las cuatro opciones: **mantener** (funciona y casi no cambia), **refactorizar** (mismo stack, mejor código), **modernizar** (stack nuevo por partes) y **reemplazar** (producto nuevo o SaaS).
- Matriz de decisión con criterios y pesos: costo, complejidad, riesgo, impacto en el negocio y disponibilidad de personas que conozcan el sistema.
- *Actividad "¿Qué harías tú?" (votación):* 4 sistemas ficticios de una software factory.
  - Una intranet PHP sin tests que funciona bien.
  - Un ERP en Visual Basic 6 cuyo único desarrollador se jubila.
  - Una app Angular.js con dependencias vulnerables.
  - Un sistema de facturación en Delphi conectado a la autoridad tributaria.

  El curso vota y justifica cada caso con la matriz.

### A3. Cierre (10')
- **Repaso:** Mirar sin tocar · Divide y explora · Reglas ocultas · Decidir con datos.
- **Temas secundarios para investigar por su cuenta (también durante el taller, si terminas antes):**
  - **Delphi para desarrolladores web:** qué es una *unit* (`.pas`), un formulario (`.dfm`), un *data module*, los componentes de datos (`TTable`, `TQuery`, `TDataSource`) y los eventos (`OnClick`, `BeforePost`).
  - **DBISAM:** motor embebido de tablas en archivos y sus diferencias con un motor cliente-servidor como PostgreSQL.
  - **Por qué migrar Delphi a .NET:** las empresas empleadoras de este curso operan sistemas Delphi críticos. El costo de mantenerlos crece y cada vez hay menos especialistas.
  - Plugin oficial `code-modernization` [19][28] y el webinar de modernización [20].
  - Técnicas de estimación: estimación por analogía y puntos de función.
  - Curso completo *Introduction to subagents* [14].

## Bloque B — Taller "Diagnóstico del sistema legado" (80', individual)

**Caso de uso.** La distribuidora decidió modernizar **Pedidos Legado**, el sistema de escritorio en Delphi con DBISAM que usa hace 18 años. Antes de aprobar presupuesto, la gerencia pide un diagnóstico técnico que responda tres preguntas: qué hay, qué es riesgoso y por dónde empezar.

**Problemática.** No hay documentación. El autor original ya no trabaja en la empresa. Las reglas de negocio (descuentos, impuestos, bloqueos de clientes) están repartidas en formularios, *data modules* y unidades de utilidades. Nadie del equipo actual sabe Delphi, y el repo no compila en sus máquinas, así que solo se puede **leer**.

**Solución a implementar.** Hacer un diagnóstico completo **sin modificar ningún archivo**, usando plan mode y un subagente de análisis, y terminar con una recomendación respaldada por una matriz.

| Paso | Min | Qué haces | Concepto |
|---|---|---|---|
| 1 | 10 | Crear tu subagente `analista-legado` (solo lectura) y abrir Claude Code en **plan mode** sobre `pedidos-legado`. Pedir el inventario: unidades, formularios, tablas, líneas aproximadas y responsabilidad de cada una. | C1, C2 |
| 2 | 25 | Generar `diagnostico/dependencias.md` con un diagrama Mermaid, y `diagnostico/reglas-negocio.md` como tabla con regla, archivo y línea, condición y efecto. **Verifica al menos 5 reglas leyendo el código.** **Punto de control:** tu catálogo tiene al menos 8 reglas. | C2, C3 |
| 3 | 15 | Generar `diagnostico/riesgos.md` con riesgos y deuda técnica priorizados (alto, medio, bajo) y la evidencia en el código. | C3 |
| 4 | 25 | Construir `diagnostico/matriz-decision.md`: un puntaje por módulo con los criterios de C4 y la estrategia recomendada para cada uno. Cierra con un **resumen ejecutivo de 5 líneas** para la gerencia. | C4 |
| 5 | 5 | Cierre: tres alumnos leen su resumen ejecutivo. | — |

**Qué se espera, sin darte la respuesta.**
- El sistema tiene reglas que no están a la vista. Un diagnóstico que encuentra pocas reglas se quedó en la superficie.
- Cada afirmación del diagnóstico debe tener su evidencia: archivo y línea. Si Claude afirma algo que no puedes ubicar en el código, no entra al diagnóstico.
- No hay una única estrategia correcta. Lo que se evalúa es que la recomendación se desprenda de tu matriz.
- **Pista para la Unidad 5:** fíjate bien en el módulo que calcula los totales.

**Qué investigar si te trabas.**
- Cómo crear un subagente con herramientas restringidas [14].
- Qué es un formulario `.dfm` y dónde viven sus eventos (tema secundario de Delphi).
- La sección "Understand new codebases" de *Common workflows* [17].

- **Entregable:** *Diagnóstico técnico del sistema legado*: carpeta `diagnostico/` con inventario, dependencias, reglas de negocio, riesgos, matriz y resumen ejecutivo.
- **Plan B:** diagnóstico de referencia parcial en la rama `u4-respaldo` (solo inventario y dependencias), para completar desde el paso 3.
- **Extensión opcional:** instalar el plugin `code-modernization` y comparar su análisis con el tuyo [19].
