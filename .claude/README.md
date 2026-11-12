# Referencia interna · Sitio «Desarrollando con Inteligencia»

> **Para el agente de IA.** Lee este archivo completo antes de cualquier tarea en el sitio.
> Es la documentación técnica interna del sitio. El `README.md` de la raíz es la guía pública (cómo se ve, cómo correrlo y cómo mantenerlo); si cambias algo que ahí se describe, actualiza ambos archivos para que digan lo mismo.

---

## 0. Reglas de trabajo del agente

### 0.1 Git: solo lectura

El desarrollador controla Git de principio a fin. El agente **nunca**:

- Crea, borra, renombra, cambia ni publica ramas (`git branch`, `git checkout`, `git switch`, `git push`).
- Une, rebasa o reescribe historial (`git merge`, `git rebase`, `git cherry-pick`, `git reset`, `git revert`, `git commit --amend`).
- Prepara o confirma cambios (`git add`, `git commit`, `git stash`, `git tag`, `git restore`, `git clean`).
- Crea, aprueba o une pull requests (`gh pr …`).

Comandos permitidos, solo para entender el estado del repositorio: `git status`, `git diff`, `git log`, `git show`, `git blame`.

Estas reglas también están bloqueadas en `.claude/settings.json`. Si una tarea parece requerir una operación de Git, **detente y explícale al desarrollador qué comando debería ejecutar él**.

### 0.2 Mensaje de commit: obligatorio al terminar

Cada vez que el agente modifique cualquier archivo del sitio, termina su respuesta con un mensaje de commit propuesto:

- **Máximo 100 caracteres**, contando el prefijo. Una sola línea.
- En **español**, en tercera persona del presente, sin punto final.
- Formato Conventional Commits: `tipo(ámbito opcional): descripción`.
- Describe **qué cambia y para qué**, no cómo se hizo.
- Si los cambios no tienen relación entre sí, propone un mensaje por cada grupo e indica qué archivos van en cada uno.

| Tipo | Cuándo |
|---|---|
| `feat` | Funcionalidad o sección nueva del sitio |
| `fix` | Corrección de un error visible o de datos |
| `content` | Contenido académico: conceptos, laboratorios, videos, material |
| `style` | Cambios visuales sin cambio de comportamiento |
| `refactor` | Reorganización de código sin cambio visible |
| `docs` | `AGENTS.md`, `DESIGN.md` o `README.md` |
| `chore` | Calendario, configuración, apertura de unidades, archivos auxiliares |

Formato de entrega al final de la respuesta:

```text
Mensaje de commit propuesto (68 caracteres):
content(u03): agrega concepto de rewind con ejemplo y fuente oficial
```

Más ejemplos válidos:

- `chore: abre la unidad 3 antes de su fecha`
- `fix(timeline): corrige el estado de la U05 al cruzar el cierre`
- `content(u02): marca como disponible la guía del taller de SDD`

### 0.3 Otras reglas

- **No inventes URLs.** Si no puedes verificar una fuente oficial, deja `// TODO` y avisa.
- **No edites `fuentes/`** salvo pedido explícito. Es la fuente de verdad del contenido.
- **Respeta `DESIGN.md`.** Ningún color ni tipografía fuera de §2 y §3.
- **Diff mínimo.** Cambia solo lo necesario para la tarea; no reformatees archivos completos.
- Al terminar, indica en una línea qué archivos cambiaste y cómo verificarlo (URL local con parámetros, si aplica).

---

## 1. Qué es el sitio

Sitio de estudio del programa **«Desarrollando con Inteligencia — IA para Desarrolladores»** (Vela LATAM, Grupo 02, 2026): 30 horas, 10 unidades, 5 días, enfocado en el ecosistema Anthropic (Claude y Claude Code).

Reemplaza los PDF y PPT del curso. Aquí los alumnos entienden el programa, estudian cada unidad (conceptos, laboratorio, material, videos y entregable), descargan material y llegan a los recursos oficiales. Por pedido del cliente, todas las unidades están abiertas; el calendario marca la unidad en curso.

Es un sitio **estático**: HTML5, Tailwind CSS v4 **precompilado** (`css/tailwind.css`), CSS modular, fuentes autoalojadas y JavaScript ES6+ con módulos nativos. No depende de ningún CDN, y no usa frameworks, bundler ni npm en runtime. Solo hay que recompilar Tailwind si cambian las clases (§9.1). Se publica tal cual en GitHub Pages.

---

## 2. Cómo se ve

Dirección visual **"Orient Night"**, derivada de [felipecuevas.dev](https://felipecuevas.dev) (ver `DESIGN.md`):

- **Navbar** fija con fondo translúcido al hacer scroll y botón de tema.
- **Hero** a pantalla completa: el logo de Claude como protagonista, con halo y una respiración suave, y 12 robots de Claude Code flotando al fondo. Muestra solo título, subtítulo, enfoque, la unidad en curso o la próxima, y dos botones. **El botón «Descargar programa» vive solo aquí** (no está en la navbar, el menú móvil ni el footer).
- **Ruta del curso**: línea de tiempo por día con dos unidades (mañana y tarde). A la derecha corre el hilo dorado de los entregables del caso integrador *Pedidos Legado → Pedidos Web*. Cada unidad se despliega con 4 pestañas (Resumen, Conceptos, Taller y Recursos; ver «Qué muestra cada unidad»), y cada concepto abre un modal.
- **Instructor**: banda compacta.
- **Footer** con enlaces de interés.

El modo oscuro es el predeterminado. El modo claro tiene la misma terminación.

---

## 3. Estructura de carpetas

```
/
├── index.html                 Página única (HTML semántico + clases de Tailwind)
├── DESIGN.md                  Sistema de diseño (color y tipografía vinculantes)
├── AGENTS.md                  Instrucciones para agentes (apunta a este archivo)
├── README.md                  Presentación pública del proyecto (sin contenido técnico)
├── .gitignore
├── .nojekyll                  GitHub Pages sirve los archivos tal cual
├── .claude/
│   ├── README.md              Este archivo
│   └── settings.json          Permisos del agente
├── assets/
│   ├── docs/                  PDF del Programa y glosario del curso
│   ├── fonts/                 Cinzel, Josefin Sans y JetBrains Mono (WOFF, subconjunto latino, OFL)
│   ├── img/                   favicon.svg y foto del instructor (opcional)
│   ├── icons/                 SVG de Claude, Claude Code y Material Symbols Light
│   └── material/u01 … u10/    PDF y PNG de cada unidad
├── css/
│   ├── tokens.css             Variables de color por modo (DESIGN.md §2) y orden de capas
│   ├── fonts.css              @font-face de las fuentes autoalojadas
│   ├── tailwind.input.css     Fuente de Tailwind (tokens @theme). NO se carga en el navegador
│   ├── tailwind.css           Tailwind compilado (sí se carga). Se regenera con el CLI (§9.1)
│   ├── base.css               Tipografía, foco visible, movimiento reducido
│   ├── utilities.css          Botones, rótulos, contenido sin JS e impresión
│   └── components/            navbar, hero, cards, timeline, unit-panel, code, modal, instructor, footer
├── js/
│   ├── main.js                Punto de entrada
│   ├── config/
│   │   └── units.config.js    ← CALENDARIO Y CONTROL DE APERTURA
│   ├── data/
│   │   ├── course.js          Datos generales del curso
│   │   ├── instructor.js
│   │   ├── links.js           Enlaces del footer, fuentes y cursos de la Academy
│   │   └── units/             u01.js … u10.js (contenido de cada unidad) + index.js
│   ├── components/            navbar, hero, timeline, unit-index, unit-panel, concept-modal, …
│   └── utils/                 dates, schedule, dom, storage, icons, code, reveal, validate
└── fuentes/
    ├── unidades/              unidad-01.md … unidad-10.md (fuente de verdad del contenido)
    └── bibliografia-curso.md
```

La separación es: **configuración** (`js/config`) / **datos** (`js/data`) / **componentes** (`js/components`) / **estilos** (`css`). El renderizado sale 100 % de los datos: para agregar contenido, se edita solo el archivo de datos.

---

## 4. Correrlo en local

Los módulos ES **no funcionan con `file://`**, así que se necesita un servidor local:

- **WebStorm:** abrir `index.html` y usar el ícono del navegador (servidor integrado), o clic derecho → *Open in Browser*.
- **Node:**

  ```bash
  npx serve .
  ```

- **Python:**

  ```bash
  python3 -m http.server 8000
  ```

  Luego abrir `http://localhost:8000`.

### Parámetros útiles en la URL

| Parámetro | Para qué |
|---|---|
| `?preview=all` | Vista previa del instructor: todas las unidades abiertas, con un aviso discreto. No es seguridad, es comodidad. |
| `?now=2026-11-10T14:00:00-03:00` | **Solo para pruebas:** simula la hora actual. El reloj simulado avanza en tiempo real. |
| `?debug` | Ejecuta `validateData()`: avisa en consola si una descripción breve supera 100 caracteres, si hay slugs repetidos o conceptos sin fuente. |
| `#u03` | Abre y muestra la unidad 3 (si no está bloqueada). |
| `#u02/concepto/plan-mode` | Abre la unidad 2, la pestaña Conceptos y el modal de *Plan mode*. |

Se pueden combinar: `?now=2026-11-10T14:00:00-03:00&preview=all&debug`.

---

## 5. Cómo abrir o bloquear unidades

Todo se controla desde **un solo archivo**: `js/config/units.config.js`. Para estas tareas, el agente **solo** edita ese archivo.

```js
u03: { abreEl: '2026-11-10T08:45:00-03:00', inicio: '2026-11-10T09:00:00-03:00', cierraEl: '2026-11-10T12:00:00-03:00', forzar: null },
```

| Estado | Cuándo |
|---|---|
| `bloqueada` | Con `forzar: 'bloqueada'`. Solo si `TODAS_LAS_UNIDADES_ABIERTAS` es `false`: también antes de `abreEl`. |
| `en-curso` | Entre `abreEl` (15 min antes del inicio) y `cierraEl`. Se destaca en dorado y se despliega sola. |
| `abierta` | Antes de su hora, con `TODAS_LAS_UNIDADES_ABIERTAS`, `forzar: 'abierta'` o `?preview=all`. |
| `completada` | Después de `cierraEl`. |

### Todas las unidades abiertas (pedido del cliente)

En `js/config/units.config.js`, `TODAS_LAS_UNIDADES_ABIERTAS = true` deja todas las unidades abiertas desde ya: ninguna se bloquea por fecha y el calendario solo sirve para marcar la unidad en curso. Para volver al calendario (cada unidad se abre en su `abreEl`), cámbialo a `false`. `forzar: 'bloqueada'` en una unidad sigue mandando siempre: es la salida de emergencia. Toda la decisión está en `getUnitStatus()` (`js/utils/schedule.js`).

### Unidad en curso resaltada

`getCourseState()` entrega `current` (la unidad `en-curso`) y `main.js` lo recalcula cada 60 s, al volver a la pestaña (`visibilitychange`) y al recuperar el foco. Con eso:

- En el índice de escritorio (`.unit-index`), la fila de la unidad en curso lleva un fondo dorado suave y la etiqueta «En curso» con un reloj. En la barra móvil (`.unit-strip`), relleno dorado. Los lectores de pantalla oyen «(En curso)».
- Es una señal distinta de `aria-current="true"` (la unidad que el alumno está mirando, por scroll): esa conserva su regla izquierda de acento y pueden coexistir en la misma fila.
- El contador de la ruta dice «En curso: U01 · …», «Próxima: U02 · … · día, hora h» o «Curso completado · 10 de 10 unidades», y su barra muestra las unidades completadas.
- Entre las 12:00 y las 12:45 (almuerzo) no hay unidad en curso.

Para probarlo, simula la hora: `?now=2026-11-10T09:30:00-03:00` deja la U03 en curso; `?now=2026-11-09T12:30:00-03:00`, ninguna (próxima U02). Las fechas llevan `-03:00`, así que el resultado no depende de la zona horaria del navegador.

El estado se recalcula al cargar y **cada 60 segundos**, sin recargar la página. Las horas son UTC-03:00 y se muestran en formato `es-CL`.

> El bloqueo es un ritmo pedagógico, **no una medida de seguridad**: todo el contenido está en el repositorio.

### 5.1 Dejar que se abran por fecha

Con `TODAS_LAS_UNIDADES_ABIERTAS = false`, no hacer nada más: cada unidad se abre en su `abreEl` (15 minutos antes de la clase) y queda completada en su `cierraEl`.

### 5.2 Forzar apertura o bloqueo

```js
u03: { ..., forzar: 'abierta' },    // abre la U03 ahora
u05: { ..., forzar: 'bloqueada' },  // bloquea la U05 hasta nuevo aviso
u05: { ..., forzar: null },         // vuelve a usar las fechas
```

Después del cambio, el agente propone el mensaje de commit (§0.2). El desarrollador hace el commit y el push; GitHub Pages publica en uno o dos minutos.

### 5.3 Pedidos típicos del desarrollador

- «Abre la unidad 3 ahora.»
- «Bloquea la unidad 5 hasta nuevo aviso.»
- «Vuelve a dejar todas las unidades según sus fechas.»
- «Cambia el calendario: el día 2 se movió al miércoles 11 de noviembre, mismo horario.»

---

## 6. Cómo agregar material (PDF o PNG)

1. El archivo va en `assets/material/uXX/`, por ejemplo `assets/material/u03/guia-taller.pdf`.
2. En `js/data/units/u03.js`, buscar `material` y marcar la tarjeta como disponible:

   ```js
   { tipo: 'pdf', titulo: 'Guía del taller', archivo: 'assets/material/u03/guia-taller.pdf', disponible: true },
   ```

3. Para una tarjeta nueva, agregar otro objeto al arreglo. `tipo` puede ser `pdf`, `png`, `jpg` o `webp` (cualquier otro usa un ícono genérico).
4. **Enlace externo** (formulario, repositorio, archivo en GitHub): `tipo: 'enlace'` con `url` en vez de `archivo`, y `descripcion` opcional. Se abre en pestaña nueva y la tarjeta dice «Abrir» en vez de «Descargar»:

   ```js
   { tipo: 'enlace', titulo: 'Cuestionario de madurez (formulario)', descripcion: 'Lo respondes en el paso 2 del taller.', url: 'https://forms.gle/…', disponible: true },
   ```

5. **Requisitos con enlace** («Antes de la clase», en `requisitos`): campo opcional `enlace: { titulo, url }`, que se muestra como enlace externo debajo del texto (y del bloque de `codigo`, si lo hay):

   ```js
   { titulo: 'SDK de .NET 10 instalado antes de la clase', texto: 'Verifica con `dotnet --version`.', enlace: { titulo: 'Descargar el SDK de .NET 10 (sitio oficial)', url: 'https://dotnet.microsoft.com/en-us/download/dotnet/10.0' } },
   ```

6. **Material del taller.** Una tarjeta con `destino: 'taller'` se muestra en la pestaña **Taller** (sección «Material del taller»), debajo del botón de la guía. Sin ese campo, la tarjeta va a **Recursos**. Usar `destino: 'taller'` solo para lo que el alumno emplea durante el taller (prompt maestro, plantilla, proyecto base); las demos de clase, las infografías y las lecturas van a Recursos:

   ```js
   { tipo: 'enlace', titulo: 'Prompt maestro del taller', descripcion: 'Lo pegas en Claude Code en el paso 1.', url: `${U2_BLOB}/taller/prompt-maestro.md`, destino: 'taller', disponible: true },
   ```

7. **Presentación de clases.** Una tarjeta con `variante: 'presentacion'` (único valor admitido; lo valida `?debug`) se muestra destacada: primera de **Recursos** y a todo el ancho, con ícono de PDF, píldoras «Presentación de clases» y «PDF · X MB» (clave opcional `peso: '4,2 MB'`, en MB decimales, medido del archivo real) y botón «Descargar». Con `disponible: false` queda atenuada, sin enlace y dice «Disponible después de la clase». Está en las 10 unidades (`id: 'presentacion'`, `archivo: 'assets/material/uNN/presentacion-clase.pdf'`); para publicar una nueva basta copiar el PDF, poner `disponible: true` y el `peso`. El ícono (`assets/icons/pdf-presentacion.svg`, registrado en `ICON_FILES` de `js/utils/icons.js` y cargado como `<img>`) conserva su rojo oficial: es una excepción de color autorizada por el desarrollador (pendiente de sumarla a DESIGN.md 2.5). Estilos en `css/components/unit-panel.css` (`.resource-card--presentacion`).

8. **Apuntes de lenguajes.** Las tarjetas con `variante: 'lenguaje'` (hoy solo en la U5) se muestran juntas, **después del resto del material** de Recursos, en un bloque «Apuntes de lenguajes de programación» (rótulo de interfaz en `LANGUAGE_LABELS`, `js/components/unit-panel.js`). Cada una reutiliza `.resource-card` y lleva el logo oficial del lenguaje en un recuadro de 48 × 48 px, en vez del ícono genérico: a la derecha, título, `descripcion` y «PDF · X MB · Descargar». Claves: `tipo: 'pdf'`, `icono` (nombre registrado en `ICON_FILES`: `lang-csharp`, `lang-java`, `lang-javascript`, `lang-php`, `lang-python` o `lang-delphi`), `titulo`, `descripcion`, `archivo`, `peso` y `disponible`. Sin archivo, la tarjeta queda atenuada, sin enlace, con «Disponible pronto». `?debug` avisa si falta `archivo` o `icono`, si el `icono` no está en `ICON_FILES`, si el tipo no es `pdf` o si el `peso` no tiene el formato `'4,2 MB'`.

   ```js
   { tipo: 'pdf', variante: 'lenguaje', icono: 'lang-java', titulo: 'Lenguaje Java', descripcion: '…', archivo: 'assets/material/u05/lenguaje-java.pdf', peso: '0,7 MB', disponible: true },
   ```

   Los 6 logos (`assets/icons/lang-*.svg`) son los oficiales de cada lenguaje: se guardan tal cual y **no se recolorean**. Van como `<img>` (el de Python usa ids de gradiente que chocarían en línea) y son otra excepción de color, igual que el ícono de PDF (pendiente de sumarla a DESIGN.md 2.5). El logo de PHP es blanco puro, así que su recuadro (`.lang-card__icon--php`) usa el morado oficial `#777BB4` de fondo; los demás van sobre `white`. Estilos en `css/components/unit-panel.css` (`.resource-card--lenguaje`, `.lang-card__icon`).

Mientras `disponible` sea `false`, la tarjeta dice «Disponible pronto» y no hay enlace roto. **Nunca** marcar `disponible: true` si el archivo no existe en la ruta.

### 6.0 Material que vive en el repositorio de material

El código, las specs y los prompts de demos y talleres viven en [material-curso-ia-desarrolladores](https://github.com/ffelipecuevasc/material-curso-ia-desarrolladores) (`MATERIAL_REPO` en `js/data/links.js`). El sitio solo los enlaza con tarjetas `tipo: 'enlace'`.

- Las URLs apuntan a la rama `main`. Si una carpeta se mueve o se renombra en ese repositorio, hay que actualizar el enlace aquí.
- En la U2, `u02.js` arma las URLs con `U2_BLOB` (archivos, `…/blob/main/unidad-2`) y `U2_TREE` (carpetas, `…/tree/main/unidad-2`).
- Estructura de la U2 en ese repositorio: `unidad-2/demos/` (TodoMini y TiendaMini, que muestra el instructor) y `unidad-2/taller/` (`pedidos-web`, `prompt-maestro.md` y `u2-respaldo`, que usa el alumno).
- Antes de marcar `disponible: true`, confirmar que el archivo o la carpeta existen en `main`.

## 6.1 Qué muestra cada unidad

Criterio: **cada dato aparece una sola vez, donde se usa.** Lo que ya está en la guía PDF del taller, en las láminas o en el Programa no se repite en el sitio. Los datos completos siguen en `js/data/units/uXX.js` (pasos, errores frecuentes, plan B, agenda de la clase…); simplemente no se muestran.

| Pestaña | Muestra | No muestra (queda en los datos) |
|---|---|---|
| **Resumen** | `foco`, línea «Nivel 0 → 10 de 100», `objetivos`, `herramientas` y «Antes de la clase» (`requisitos`: texto y `enlace`) | horario, duración, licencias, agenda (`catedra`), bloque `codigo` de los requisitos. Los avisos `pendientes` solo se ven con `?preview=all` |
| **Conceptos** | chips de conceptos obligatorios y fundamentales (cada uno abre su modal) | — |
| **Taller** | nombre, fila de íconos (modalidad, duración y entregable), `laboratorio.resumen`, botón grande «Descargar la guía (PDF)» y «Material del taller» (tarjetas con `destino: 'taller'`) | caso, problemática, pasos, puntos de control, errores frecuentes, plan B, extensión y criterios del entregable |
| **Recursos** | material (menos la guía y las tarjetas con `destino: 'taller'`, que están en Taller), videos y cursos, temas para investigar | — |

En el encabezado de cada unidad ya no aparece el nivel. El entregable se muestra una vez por tamaño de pantalla: en el riel lateral en escritorio y bajo el título en móvil.

### 6.2 Campo `laboratorio.resumen` y guía del taller

- `laboratorio.resumen`: un párrafo en segunda persona, **máximo 1000 caracteres** (`?debug` avisa si falta o si se pasa). Se escribe solo con datos que ya estén en el sitio y termina remitiendo a la guía.
- La tarjeta de la guía se identifica por **`id: 'guia'`**, no por su título:

  ```js
  { id: 'guia', tipo: 'pdf', titulo: 'Guía del taller "Mi entorno y mi mapa"', archivo: 'assets/material/u01/guia-taller.pdf', disponible: true },
  ```

  Con `disponible: false`, el botón de Taller aparece deshabilitado con «Guía disponible pronto» (nunca un enlace roto).

### 6.3 Topes de longitud (revisión editorial)

| Campo | Tope |
|---|---|
| `descripcionBreve` | 100 caracteres (lo valida `?debug`) |
| `laboratorio.resumen` | 1000 caracteres (lo valida `?debug`) |
| `foco` | 220 caracteres |
| `objetivos` | 5 como máximo, de 110 caracteres cada uno |
| `herramientas` | 6 como máximo |
| `requisitos` | 3 como máximo, de 220 caracteres (título + texto) |

## 7. Cómo agregar conceptos

En `js/data/units/uXX.js`, agregar un objeto a `conceptos.obligatorios` (lo que el alumno debe dominar para el laboratorio y el entregable) o a `conceptos.fundamentales` (la base teórica, C1–C4):

```js
{
  slug: 'mi-concepto',              // minúsculas y guiones; se usa en #u03/concepto/mi-concepto
  titulo: 'Mi concepto',
  resumen: 'Una frase.',
  explicacion: ['Párrafo 1.', 'Párrafo 2.'],   // 2–4 párrafos breves
  ejemplo: { tipo: 'codigo', lenguaje: 'bash', titulo: 'Terminal', contenido: `claude --version` },
  // o: ejemplo: { tipo: 'texto', contenido: '...' }, o ejemplo: null
  nota: '**Estándar abierto:** … **Implementación de Claude:** …',  // o ''
  fuente: { titulo: 'Documentación', url: 'https://code.claude.com/docs/...' },
},
```

En los textos se puede usar `` `código` ``, `**negrita**` y `*cursiva*`. Lenguajes con resaltado: `bash`, `json`, `yaml`, `markdown`, `csharp`, `javascript`, `sql` y `text`.

## 8. Cómo agregar videos y cursos

En `videos` de cada unidad:

```js
// Curso de Anthropic Academy (se abre en pestaña nueva)
academyVideo('claudeCodeInAction', 'Nota opcional.'),

// Video de YouTube (lite embed: el iframe se carga al hacer clic, desde youtube-nocookie.com)
{ titulo: 'Título', url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX', origen: 'YouTube', duracion: '12 min' },
```

Los cursos de la Academy viven en `js/data/links.js` (`ACADEMY_COURSES`). Al verificar la URL de un curso, reemplazar `url` y marcar `verificado: true`.

## 9. Cómo cambiar colores o tipografía

- **Colores:** `css/tokens.css`. Los tokens semánticos (`--bg`, `--surface`, `--accent`…) tienen un valor en `:root` (claro) y otro en `.dark` (oscuro). Tailwind los usa a través de `@theme inline` en `css/tailwind.input.css` (`bg-surface`, `text-accent`, etc.). Los colores por defecto de Tailwind están desactivados, así que solo existen los de `DESIGN.md`.
- **Tipografía:** `css/fonts.css` y `assets/fonts/` (autoalojadas, sin Google Fonts), más las variables `--font-display`, `--font-sans` y `--font-mono` de `css/tailwind.input.css`.
- `DESIGN.md` manda en color y tipografía. Todo color nuevo se comprueba con un verificador de contraste (meta: WCAG 2.2 AA).

> Los archivos `.css` del sitio son CSS estándar (sin `@apply`) y van en capas (`@layer site-base` y `@layer components`) para que las utilidades de Tailwind siempre ganen.

### 9.1 Compilar Tailwind

Si se agregan o cambian **clases de Tailwind** en `index.html` o en `js/`, o se edita `css/tailwind.input.css`, hay que regenerar `css/tailwind.css` y hacer commit de ambos archivos:

```bash
npx @tailwindcss/cli -i css/tailwind.input.css -o css/tailwind.css --minify
```

Si solo se editan datos (`js/data/…`, `units.config.js`) o los `.css` de componentes, **no** hace falta compilar. Si se olvida compilar, la clase nueva simplemente no tendrá estilo. El agente avisa al desarrollador cuando su cambio lo requiere.

## 10. Cómo cambiar la foto del instructor

Subir `assets/img/felipe-cuevas.webp` (cuadrada, unos 480 × 480 px) y en `js/data/instructor.js` cambiar `photoAvailable` a `true`. Si la imagen no carga, se muestran las iniciales. No agregar certificaciones, logros ni cifras que no estén en `instructor.js`.

---

## 11. Publicación en GitHub Pages (la gestiona el desarrollador)

1. Repositorio en GitHub con la rama `main`.
2. **Settings → Pages**.
3. **Build and deployment → Source**: **Deploy from a branch**.
4. **Branch**: `main`, carpeta `/ (root)`.
5. El sitio queda en `https://<usuario>.github.io/<repo>/`.

Notas para el agente:

- `.nojekyll` evita que GitHub Pages procese el sitio con Jekyll. No borrarlo.
- Todas las rutas son **relativas** (`css/…`, `js/…`, `assets/…`) para que funcionen bajo el subpath `/<repo>/`. Nunca usar rutas absolutas que empiecen con `/`.
- Cada push a `main` vuelve a publicar.

---

## 12. Accesibilidad y rendimiento

- Meta WCAG 2.2 AA: contraste comprobado en los pares nuevos, foco visible (`:focus-visible`), zona táctil de 44 px.
- Teclado: Tab por todo el sitio, Enter/Espacio en acordeones, flechas/Inicio/Fin en pestañas, Esc en el modal (con retorno del foco al chip).
- Los estados de unidad nunca se comunican solo con color: siempre llevan ícono y texto.
- `prefers-reduced-motion`: sin animaciones decorativas ni desplazamiento suave.
- Sin JavaScript se ve un resumen de las unidades y los enlaces principales (`<noscript>` en `index.html`; si cambia el título de una unidad, actualizarlo también ahí).
- Sin scroll horizontal en 360 px. Los iframes de video solo se cargan al hacer clic.

---

## 13. Pedidos de mantenimiento frecuentes

- «Abre la unidad 4 ahora y deja las demás según sus fechas.»
- «Subí `assets/material/u03/guia-taller.pdf`: márcalo como disponible en `u03.js`.»
- «Agrega a la U05 un concepto obligatorio sobre feature flags, con ejemplo y fuente oficial de code.claude.com. No inventes URLs.»
- «Verifica las URLs de los cursos de Anthropic Academy en `js/data/links.js` y reemplaza las que puedas confirmar; deja el TODO en las demás.»
- «Ejecuta el sitio con `?debug` y corrige cualquier descripción breve de más de 100 caracteres.»
- «Revisa que no haya colores fuera de `DESIGN.md` §2 en `css/` ni en clases de Tailwind.»
- «En la U04, mueve la tarjeta del repositorio demo a la pestaña Taller con `destino: 'taller'`.»

---

## 14. Pendientes (TODO)

- **Webinar «Modernizing Legacy Code with Claude Code»:** URL verificada el 10-nov-2026 en `BIBLIO.modernizingLegacyWebinar` (`js/data/links.js`) y usada en la U04 y la U05.
- **Material de las unidades U09–U10** (guías del taller y demás tarjetas): están en «Disponible pronto». La U01 está completa, la U02 solo espera su infografía, y de la U03 a la U08 están completas (no llevan infografía).
- **Errores frecuentes** de los laboratorios U02, U09 y U10: los archivos fuente no los traen (la sección se oculta mientras esté vacía). De la U03 a la U08 ya los tienen.
- **Foto del instructor:** opcional (`photoAvailable`).

---

## 15. Créditos y licencias

- Contenido académico: Felipe Cuevas, a partir de `fuentes/unidades/`.
- Íconos: [Material Symbols Light](https://icon-sets.iconify.design/material-symbols-light/) de Google vía Iconify, licencia **Apache 2.0**. Los SVG están en `assets/icons/` y en línea en `js/utils/icons-data.js`, sin dependencia en runtime.
- Claude y Claude Code son marcas de Anthropic; sus logos se usan solo como marca, con su color oficial.
- Los logos de Delphi, C#, Java, Python, JavaScript y PHP (`assets/icons/lang-*.svg`) son marcas de sus respectivos titulares; se usan solo para identificar cada apunte de lenguaje, con su color oficial.
- Tipografías: Cinzel, Josefin Sans y JetBrains Mono (SIL Open Font License 1.1), autoalojadas en `assets/fonts/`.