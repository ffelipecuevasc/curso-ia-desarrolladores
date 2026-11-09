# AGENTS.md · Sitio de estudio «Desarrollando con Inteligencia»

Instrucciones para agentes de código que trabajen en este repositorio.

## Antes de cualquier tarea

1. **Lee `.claude/README.md` completo.** Es la referencia interna del sitio: arquitectura, datos, calendario de unidades, convenciones y reglas de trabajo. Léelo **cada vez** que vayas a leer, crear o modificar algo del sitio, aunque la tarea parezca pequeña.
2. Si `.claude/README.md` no existe, **detente y pídeselo al desarrollador**. No reconstruyas su contenido de memoria.
3. Si vas a tocar color, tipografía o componentes visuales, lee también `DESIGN.md`. Manda sobre cualquier otra preferencia de diseño.

## Qué es este proyecto

Sitio estático de estudio para el curso «Desarrollando con Inteligencia — IA para Desarrolladores» (Vela LATAM, Grupo 02, 2026). Reemplaza los PDF y PPT del curso. Se publica en GitHub Pages sin build step.

- **Stack:** HTML5, Tailwind CSS v4 **precompilado** (`css/tailwind.css`), CSS modular por capas, fuentes autoalojadas y JavaScript ES6+ con módulos nativos. No depende de ningún CDN.
- **Sin:** frameworks, bundler ni npm en runtime. Tailwind se compila con el CLI solo cuando cambian las clases, y el CSS resultante se versiona.
- **Idioma:** todo texto visible en español de Chile (`es-CL`). Términos técnicos en inglés cuando sea el uso habitual.

## Estructura

```
index.html              Página única
DESIGN.md               Sistema de diseño (color y tipografía vinculantes)
AGENTS.md               Este archivo
.claude/README.md       Referencia interna del sitio ← LEER SIEMPRE
.claude/settings.json   Permisos del agente
assets/                 docs/, fonts/, img/, icons/, material/u01…u10/
css/                    tokens.css, fonts.css, tailwind.input.css, tailwind.css, base.css, utilities.css, components/
js/config/              units.config.js → calendario y apertura de unidades
js/data/                course.js, instructor.js, links.js, units/u01…u10.js
js/components/          Componentes de interfaz
js/utils/               Utilidades (fechas, DOM, íconos, validación…)
fuentes/                Fuente de verdad del contenido académico (unidad-XX.md)
```

Separación obligatoria: **configuración** (`js/config`) / **datos** (`js/data`) / **componentes** (`js/components`) / **estilos** (`css`). El contenido se cambia en los datos, nunca escribiéndolo dentro de un componente.

## Reglas no negociables

- **Git es del desarrollador.** No crees, borres, renombres, cambies, unas (merge), rebases ni publiques ramas. No hagas `add`, `commit`, `push`, `reset`, `stash`, `tag` ni nada que modifique el historial o el índice. Solo puedes usar comandos de lectura (`git status`, `git diff`, `git log`, `git show`).
- **Propón siempre un mensaje de commit.** Al terminar cualquier cambio en el sitio, cierra tu respuesta con un mensaje de commit claro, en español, de **100 caracteres o menos** (formato detallado en `.claude/README.md`).
- **No inventes URLs, cifras ni credenciales.** Si un dato no está en `fuentes/` o en la documentación oficial, márcalo como `TODO` y avísalo.
- **No edites `fuentes/`** salvo que el desarrollador lo pida explícitamente.
- **Respeta `DESIGN.md`.** No agregues colores ni tipografías fuera de lo definido ahí.
- **Tailwind está precompilado.** Si agregas o cambias clases de Tailwind en `index.html` o `js/`, avisa al desarrollador que debe recompilar `css/tailwind.css` (comando en `.claude/README.md`) y que ambos archivos van en el mismo commit.
- **Material y enlaces:** los talleres y demos viven en el repo `material-curso-ia-desarrolladores` y el sitio solo los enlaza. Nunca marques `disponible: true` si el archivo o la URL no existen. La tarjeta que corresponde al taller lleva `destino: 'taller'`; las demás van a Recursos.

## Verificación

- Sirve el sitio con un servidor local (`python3 -m http.server 8000` o `npx serve .`); los módulos ES no funcionan con `file://`.
- Revisa con `?debug` que la consola no muestre advertencias de datos.
- Comprueba la vista en 360 px de ancho y en ambos temas cuando cambies algo visual.