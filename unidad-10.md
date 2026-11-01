# Unidad 10 — Retorno de la inversión (ROI), productividad y taller integrador

**Día 5 · bloque tarde** · Nivel 95 → 100 · Bloque A 85' · Receso 15' · Bloque B 80' · Licencia: Claude Team Standard · Grupos: los mismos de 3 de la Unidad 9

> ⚠️ **PENDIENTE — Cuestionario final.** El instructor entrega `cuestionario-final.md`. A partir de ese archivo se genera una **página web interactiva** (artefacto) con puntaje y la explicación de cada respuesta. Se publica en el paso 5 del taller.

## Bloque A — Cátedra (85')

### A1. Apertura: conceptos fundamentales y material oficial (5')
| # | Concepto | En una frase | Material oficial |
|---|---|---|---|
| C1 | **Medir lo que importa** | Velocidad y calidad, no líneas de código. | Docs *Analytics* [29][31] · DORA [58] |
| C2 | **ROI con supuestos** | Sin supuestos escritos, el número no vale. | Docs *Costs* de Claude Code [13] |
| C3 | **Contar para decidir** | Una página, una recomendación. | AI Fluency: Descripción y Diligencia [5] |
| C4 | **Integrar** | Nueve entregables, un solo plan. | AI-native SDLC playbook [4] |

No existe un curso oficial de Anthropic sobre ROI. El método de esta unidad es propio y se apoya en las métricas oficiales de uso y costo.

### A2. Desarrollo (70')

**C1 · Medir lo que importa (15').**
- **Métricas de entrega (DORA)** [58]: frecuencia de despliegue, tiempo de entrega de un cambio, tasa de fallas por cambio y tiempo de recuperación. Se complementan con los defectos escapados a producción.
- **Métricas de adopción del panel de Claude Code** [29][31]: usuarios activos, líneas aceptadas, tasa de aceptación y PR con asistencia. Son útiles, pero **no miden valor por sí solas**. Las líneas aceptadas no descuentan las que después se borran.
- *Demo "La métrica trampa":* dos equipos ficticios. El equipo A acepta 10.000 líneas de IA al mes y tiene 30 defectos; el B acepta 2.000 y tiene 4. ¿Cuál rinde más y qué falta saber para decidir?

**C2 · ROI con supuestos (25').**
- **Fórmula:** ROI = (beneficio − costo) / costo.
- **Costos:** asientos según el contrato, uso de API (Unidades 6 y 7), tiempo de capacitación y tiempo de adopción (la curva de aprendizaje). Para el uso de Claude Code, `/cost` da el consumo de una sesión y el panel da el de la organización [13][29].
- **Beneficios:** horas ahorradas por tarea × valor hora, defectos evitados × costo de un defecto en producción y un tiempo de entrega más corto.
- **Cada supuesto queda escrito**, junto con su fuente. Siempre se presentan dos escenarios, **conservador** y **optimista**, más un análisis de sensibilidad: ¿qué pasa si el ahorro real es la mitad?
- *Demo "ROI en una planilla":* Claude arma en vivo un modelo de ROI para **CódigoSur**, una software factory ficticia de 20 desarrolladores. Luego se le pide cambiar un supuesto y ver cuánto se mueve el resultado.

**C3 · Contar para decidir (15').**
- **Estructura de un informe ejecutivo:** problema, qué se hizo, resultados con su incertidumbre, recomendación y próximo paso. Todo en una página.
- **Diligencia:** se declara que el informe se preparó con apoyo de IA y que los números fueron verificados por una persona [5].
- *Demo "El informe en 1 página":* se comparan un informe malo (lleno de tecnicismos, sin recomendación y con cifras sin respaldo) y uno bueno.

**C4 · Integrar (15').**
- **Repaso del recorrido de 0 a 100:** cómo cada entregable alimenta al siguiente. El mapa del SDLC lleva al flujo SDD; de ahí salen el módulo documentado, el diagnóstico, la migración, el pipeline, el code review, la gobernanza, el plan de la BU y, finalmente, el plan integrado.
- **Buenas prácticas consolidadas y próximos pasos:**
  - Comunidad Pulso Devs.
  - Cursos de Claude Academy.
  - La ruta *Claude Certified Developer – Foundations* [32], que requiere pertenecer a una organización del Claude Partner Network [34].

### A3. Cierre (10')
- **Repaso:** Medir lo que importa · ROI con supuestos · Contar para decidir · Integrar.
- **Temas secundarios para investigar por su cuenta:**
  - API de analytics de Enterprise y OpenTelemetry para métricas propias [29][26].
  - Estudios publicados sobre productividad con IA en desarrollo de software (citar siempre la fecha y la muestra).
  - El marco DORA completo [58].
  - Ruta *Claude Certified Developer – Foundations* y su curso previo *Claude Platform 101* [32][33].

## Bloque B — Taller integrador "Plan integrado de adopción de IA" (80', grupos de 3)

**Caso de uso.** Termina el piloto de modernización de Pedidos. La gerencia general debe decidir si extiende la forma de trabajar del equipo de Pedidos Web a toda la empresa, y pide **un solo documento** que lo resuma todo y que la ayude a decidir.

**Problemática.** El equipo tiene muchos artefactos (mapa, specs, diagnóstico, código migrado, pipeline, `REVIEW.md`, gobernanza y plan de la BU), pero repartidos en carpetas y escritos para técnicos. La gerencia no va a leer nueve documentos y necesita saber **cuánto cuesta, cuánto aporta, qué riesgos hay y qué sigue**.

**Solución a implementar.** Cada grupo reúne los datos reales del caso hilo, calcula el ROI con supuestos explícitos y entrega el plan integrado como PDF, con la Skill `pdf-con-estilo` de la Unidad 9.

| Paso | Min | Qué hacen | Concepto |
|---|---|---|---|
| 1 | 15 | Reunir los datos del caso hilo con Claude: tiempos con y sin IA (Unidad 1), tests y cobertura (Unidad 6), defectos corregidos (Unidad 5), hallazgos de revisión (Unidad 7) y riesgos validados (Unidad 8). Usar el dataset de respaldo si falta algún dato. | C1 |
| 2 | 20 | Calcular el ROI en `roi/modelo-roi.md` o en una planilla: costos, beneficios y supuestos con su fuente, los escenarios conservador y optimista, y una sensibilidad. **Punto de control:** cada número tiene su supuesto escrito. | C2 |
| 3 | 20 | Redactar el **informe ejecutivo de 1 página** y armar el plan integrado: roadmap, indicadores, gobernanza, ganancias estimadas y estrategia de evolución. Generar el PDF con `pdf-con-estilo`. | C3, C4 |
| 4 | 15 | **Entrega y presentaciones.** Todos los grupos suben su PDF. Se sortean 3 grupos, que presentan 4' cada uno, y se dejan 3' de comentarios en total. | C3 |
| 5 | 10 | **Cuestionario final** (página web interactiva) y cierre del curso. | — |

**Qué se espera, sin darte la respuesta.**
- Un ROI con supuestos honestos y un resultado modesto vale más que uno espectacular sin respaldo.
- Si alguien de la gerencia lee solo la primera página, debe saber qué decidir.
- El plan integrado no repite los nueve entregables: los conecta.

**Qué investigar si te trabas.**
- Las definiciones de las métricas DORA [58].
- La documentación de costos y de analytics de Claude Code [13][29].
- Tu propia Skill `pdf-con-estilo` de la Unidad 9.

- **Entregable:** *Plan integrado de adopción de IA* (PDF): informe ejecutivo, roadmap, indicadores, gobernanza, ROI con supuestos y estrategia de evolución.
- **Plan B:** dataset de respaldo para grupos sin mediciones completas. Si la Skill de PDF falla, se entrega el HTML.
- **Advertencia para el curso:** los datos de un curso son una muestra pequeña. El ROI se trabaja como **ejercicio de método**, no como evidencia de productividad.
