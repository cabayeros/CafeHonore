# DESIGN_RULES.md — Sistema de diseño «Emerald Trust» para rediseñar sitios existentes

> **Versión:** 1.0 · **Fuente analizada:** `plantilla.zip` (8 archivos) · **Idioma de las reglas:** español
> **Uso previsto:** adjuntar este archivo al contexto de una IA o agente de programación junto con el sitio web que se quiere modernizar.
> Este documento es **autónomo**. Los archivos complementarios (`DESIGN_TOKENS.md`, `COMPONENT_RULES.md`, `RESPONSIVE_RULES.md`, `REDESIGN_WORKFLOW.md`) amplían el detalle, nunca lo contradicen. Si hubiera discrepancia, **prevalece este archivo**.

---

## Convenciones de lectura

| Etiqueta | Significado |
|---|---|
| `[E]` | **Extraída** del ZIP: hecho verificable en el código. Se cita el archivo de origen. |
| `[B]` | **Buena práctica / recomendación** no presente en el ZIP, o corrección de un defecto del ZIP. |
| `[A]` | **Adaptable**: la decisión final depende del sitio objetivo. |
| `OBL` / `REC` / `OPC` | Prioridad: obligatoria / recomendada / opcional. |

**Referencias de origen:** `HTML:NNN` = línea de `index.html`; `CSS` = `styles.css`; `JS:NNN` = línea de `app.js`; `TW` = `tailwind-config.js`; `DMD` = `DESIGN.md`; `PNG` = `screen.png`.

**Regla de oro de interpretación:** cuando una regla `[E]` entra en conflicto con la identidad, el contenido o la funcionalidad del sitio objetivo, **gana el sitio objetivo** (ver §12 y `RED-01`).

---

## 1. Propósito y alcance

**Propósito.** Convertir el estilo visual de la referencia en reglas ejecutables para que una IA tome un sitio web existente y modernice **solo su presentación**, conservando contenido, imágenes, secciones, identidad de marca y funcionalidad.

**Dentro del alcance:** color, tipografía, layout, espaciado, componentes, imágenes, formas, movimiento, responsive, accesibilidad y calidad de implementación.

**Fuera del alcance (no forma parte del sistema visual, no debe copiarse):**
- Marca, nombre, textos, cifras, testimonios y logotipos ficticios de «Emerald Trust».
- El selector de idioma ES/EN y el diccionario de traducciones (`JS:5-325`): es funcionalidad del proyecto de referencia.
- El interruptor de modo oscuro como *funcionalidad* (el sistema de color oscuro sí es parte del diseño; ver `COL-12`).
- La lógica simulada del formulario (`JS:670-686`).
- Las URL de imágenes remotas de Google (`HTML:36, 183, 641`).

---

## 2. Resumen del diseño de referencia

**Qué es.** Una landing page corporativa de una sola página, ficticia, de «Emerald Trust» (servicios financieros y tecnológicos B2B), con 9 bloques en este orden: Hero → Nosotros (trayectoria) → Servicios (recorrido por scroll) → Soluciones → Clientes y testimonios → Ventajas competitivas → FAQ → Contacto → Footer.

**Tecnología real.** HTML estático + Tailwind CSS por CDN (`cdn.tailwindcss.com`) con configuración propia (`tailwind-config.js`, `darkMode: "class"`) + `styles.css` (base, accesibilidad, deck de servicios) + JavaScript vanilla en un IIFE (`app.js`). Tipografía Plus Jakarta Sans y iconos Material Symbols Outlined, ambos desde Google Fonts.

**Carácter visual (síntesis verificable).**
- Corporativo sobrio, «confiable pero cercano»: superficies tonales azul-lavanda muy claras (`#faf8ff`, `#f2f3ff`), un verde esmeralda muy oscuro como color de autoridad (`#003527`) y un verde medio (`#006c49`) como acento puntual. `[E]` TW, DMD.
- Jerarquía por **capas tonales y espacio en blanco**, no por bordes duros. Bordes a 20–30 % de opacidad; sombras suaves. `[E]` HTML (22 usos de `outline-variant/20`, 15 de `/30`).
- Geometría **redondeada** generosa (16–24 px en contenedores, 12 px en botones). `[E]` TW + HTML.
- Titulares en negrita con tracking ajustado, párrafos amplios con interlineado relajado, microetiquetas en mayúsculas con espaciado.
- Movimiento contenido: transiciones de 200–300 ms, un único efecto de scroll complejo (deck de servicios) con alternativa estática y respeto de `prefers-reduced-motion`.
- Modo claro por defecto + modo oscuro completo con paleta propia (azul-petróleo muy oscuro y verde esmeralda claro como acento). `[E]`

---

## 3. Evidencias analizadas del ZIP

| Archivo | Tamaño | Qué aportó | Fiabilidad como fuente |
|---|---|---|---|
| `index.html` | 83 KB, 824 líneas | Estructura, clases reales de cada componente, orden de secciones, valores de espaciado/radio/sombra | **Máxima** (es lo que se renderiza) |
| `styles.css` | 6.8 KB | Base global, foco, selección, scrollbar, deck de servicios, breakpoints personalizados, `prefers-reduced-motion` | **Máxima** |
| `app.js` | 38 KB | Comportamiento: deck por scroll, menú móvil, scrollspy, tema, idioma, formulario simulado | **Máxima** |
| `tailwind-config.js` | 5 KB | Tokens aplicados: 47 colores, radios, espaciados, familias y escala tipográfica | **Máxima** (define lo que el HTML aplica) |
| `DESIGN.md` | 8.4 KB | Intención declarada: frontmatter (coincide con TW) y prosa descriptiva | **Parcial**: la prosa contiene valores que NO coinciden con la implementación (ver §3.1) |
| `README.md` | 2 KB | Contexto de la iteración («plantilla actualizada»), comportamiento deck/idioma | **Media**: contiene al menos una afirmación incorrecta (validación del formulario, ver §3.1) |
| `screen.png` | 297×1600 px | Composición general de una versión **anterior** | **Baja**: resolución muy baja y desactualizada respecto al HTML |

### 3.1 Conflictos entre fuentes y precedencia

**Precedencia obligatoria:** `TW` + clases del `HTML` + `CSS` + `JS` **>** frontmatter de `DMD` **>** prosa de `DMD` **>** `PNG`.

| # | Conflicto detectado | Lo que realmente se aplica (usar esto) | Lo que dice la fuente descartada |
|---|---|---|---|
| C1 | Color primario | `primary = #003527`, `primary-container = #064e3b` (TW, HTML: botones `bg-primary`, hover `primary-container`) | Prosa DMD: «Primary `#064e3b`», hover a `#10b981`, «Secondary `#10b981`», «Tertiary `#f8fafc`» |
| C2 | Radios | TW: `lg .75rem`, `xl 1rem`, `2xl 1.25rem`, `3xl 1.5rem` → botones 12 px, inputs 16 px, tarjetas 20/24 px | Prosa y frontmatter DMD: botones 8 px, tarjetas 16 px, modales 24 px |
| C3 | Escala tipográfica | Titulares reales con utilidades de Tailwind y valores arbitrarios (H1 30→36→48 px; H2 24→30→40/44 px). Solo `headline-lg` (32/40) se usa, en H3 de tarjetas de servicio | DMD: `headline-lg` 32/40 como escala principal |
| C4 | Botón secundario | Tonal: `bg-surface-container-high`, sin borde en claro (HTML:157) | DMD: «ghost border» slate 20 % sobre transparente |
| C5 | Captura vs. HTML | HTML: Soluciones en layout editorial abierto sobre `surface`; Servicios como deck con scroll | PNG: Soluciones en banda verde oscura con tarjetas translúcidas; Servicios con flechas de carrusel |
| C6 | Validación de formulario | `novalidate="false"` (HTML:731): en HTML, `novalidate` es booleano y **su sola presencia desactiva** la validación nativa; `submit` no revisa validez (JS:672) | README: «valida los campos del navegador» |

**Decisión sobre «cuál es la referencia más moderna».** Se toma como referencia visual el estado actual de `index.html` + `styles.css` + `app.js`. Justificación (no basada solo en fechas): (1) el README lo declara iteración actualizada; (2) incorpora mejoras de accesibilidad que la captura no refleja (skip-link, `:focus-visible`, `prefers-reduced-motion`, gestión de `aria-hidden` en tarjetas); (3) el layout editorial de Soluciones y el deck de Servicios son evolución explícita respecto a la captura. `screen.png` solo se usa como apoyo de composición.

### 3.2 Defectos de la referencia: NO replicar

Estos hallazgos están en el código del ZIP y deben **corregirse**, no copiarse. Cada uno enlaza con la regla que lo corrige.

| Defecto | Evidencia | Regla correctiva |
|---|---|---|
| Botón primario en oscuro: texto blanco sobre `emerald-600` = **3,77:1**; hover `emerald-500` = **2,54:1** | HTML (todos los `dark:bg-emerald-600`) | `COL-11` |
| Placeholder `outline/70` sobre `surface-container-low` = **2,47:1** | HTML:737+ | `COL-11` |
| Copyright `slate-500` sobre `#080d14` a 12 px = **4,09:1** | HTML:821 | `COL-11` |
| Texto de 11 px en 10 puntos (KPIs, etiquetas) | HTML | `TIP-08` |
| Imágenes como `background-image` con `data-alt` (no es un nombre accesible) | HTML:183, 641 | `IMG-05` |
| `novalidate="false"` desactiva validación; éxito con `alert()` | HTML:731, JS:683 | `CMP-FORM`, `A11-07` |
| `sm:font-title-md`, `sm:font-body-sm`, `font-label-lg`: en Tailwind `font-*` fija **familia**, no tamaño; el tamaño pretendido nunca se aplica | HTML (labels, nombres de testimonios) | `TIP-10` |
| Capa «ambient glow» fija con imagen (`HTML:34-39`) tapada por fondos opacos de `body`, `main` y secciones: no aporta nada visible `[inferencia]` | HTML:34, 133, 137 | `IDV-08` |
| `overflow-x:hidden` en `html` **y** `body` puede anular `position:sticky` del deck `[riesgo no verificado en navegador]` | CSS (`@layer base`) | `IMP-07` |
| Iconos Material Symbols sin `aria-hidden` y fuente cargada sin `display` | HTML:20, iconos | `A11-09`, `IMP-09` |
| Footer: títulos de columna son `<span>`, no encabezados; sección «Ventajas» sin `id` ni nombre accesible | HTML:618, 781+ | `A11-03` |
| Tokens definidos pero nunca usados (`tertiary*`, `inverse-*`, `surface-dim`, `surface-tint`, `surface-bright`, `surface-variant`, `error-container`, `secondary-fixed*`, `on-primary-container`) | TW vs. HTML | `IMP-02` |
| `@layer base` nativo en `styles.css` (CSS plano, no compilado por Tailwind): tiene **menor** precedencia que cualquier CSS sin capa | CSS | `IMP-06` |
| Tailwind Play CDN en producción | HTML:25 | `IMP-04` |

---

## 4. Principios fundamentales del sistema de diseño

1. **Tono sobre contraste.** La profundidad nace de capas tonales (escalera de superficies), no de bordes marcados.
2. **Un color de autoridad, un acento.** El verde oscuro ancla; el verde medio puntúa. Nunca más de un acento.
3. **Espacio generoso, mensaje único por sección.** Eyebrow → H2 → lead → contenido.
4. **Geometría redondeada y coherente.** Cada tipo de contenedor tiene un radio fijo del conjunto; no se inventan radios.
5. **Movimiento al servicio de la lectura.** Microtransiciones de 200–300 ms; el único efecto grande es opcional y tiene alternativa estática.
6. **Accesibilidad por defecto.** Skip-link, foco visible, reducción de movimiento, objetivos táctiles y semántica son parte del diseño.
7. **Tokens, no valores sueltos.** Todo color/tamaño/radio sale de roles semánticos.
8. **Adaptar, no copiar.** Se trasladan principios y patrones; se conservan contenido, marca y funcionalidad del destino.

---

## 5. Tokens de diseño y variables

> Los valores completos (47 colores, escala oscura, bloque CSS listo para pegar, configuración Tailwind y tabla de contrastes calculados) están en `DESIGN_TOKENS.md`. Aquí se incluye lo imprescindible para trabajar sin él.

### 5.1 Colores (modo claro) — solo los realmente usados en el HTML `[E]`

| Rol (token) | HEX | Uso |
|---|---|---|
| `primary` | `#003527` | CTA sólido, ítem activo de navegación, tiles de icono/logo, avatares, enlaces y eyebrows |
| `on-primary` | `#ffffff` | Texto/iconos sobre `primary` |
| `primary-container` | `#064e3b` | Hover de botones primarios; cifras KPI destacadas; palabra clave del H1 |
| `secondary` | `#006c49` | Check/iconos de lista, métricas positivas, estrellas |
| `secondary-container` | `#6cf8bb` | Fondo de chips de estado y badges circulares con check |
| `on-secondary-container` | `#00714d` | Texto/icono sobre `secondary-container` |
| `primary-fixed-dim` | `#95d3ba` | Texto secundario sobre superposición verde oscura sobre imagen (1 uso) |
| `surface` | `#faf8ff` | Fondo de página y de secciones «base» |
| `surface-container-low` | `#f2f3ff` | Secciones alternas, tarjetas tonales, inputs, FAQ, footer |
| `surface-container-lowest` | `#ffffff` | Header (al 90 %), tarjetas elevadas, paneles |
| `surface-container` | `#eaedff` | Fondo del panel del hero (1 uso) |
| `surface-container-high` | `#e2e7ff` | Botón secundario, botones de icono, chips neutros, hover de iconos |
| `surface-container-highest` | `#dae2fd` | Hover de controles; borde de tarjetas elevadas |
| `on-surface` | `#131b2e` | Titulares y texto fuerte |
| `on-surface-variant` | `#404944` | Párrafos y texto secundario |
| `outline` | `#707974` | Base de placeholders (con opacidad) |
| `outline-variant` | `#bfc9c3` | Bordes y divisores (a 20/30/50 % de opacidad) |
| `error` | `#ba1a1a` | Punto decorativo del panel del hero; **estado de error** `[B]` |

### 5.2 Tipografía `[E]`

- **Familia:** `Plus Jakarta Sans` (400, 500, 600, 700), `font-display: swap`. Fallback declarado: `sans-serif`.
- **Escala implementada** (móvil → `sm` 640 → `lg` 1024):

| Elemento | Tamaño / interlineado | Peso | Tracking |
|---|---|---|---|
| H1 | 30/36 → 36/40 → 48/48 | 700 | −0,025 em (`tracking-tight`) |
| H2 de sección | 24/32 → 30/36 → 40/48 (o 44/52 en «Nosotros» y «Soluciones») | 700 | −0,025 em en los de 44 px |
| H3 tarjeta de servicio | 20/28 → 24/32 → 32/40 (`headline-lg`, −0,02 em) | 700 | — |
| H3 pilar / solución | 18 → 18/24 (`title-lg`) | 700 | — |
| Eyebrow | 14/20 (`label-lg`), MAYÚSCULAS | 600 | +0,05 em |
| Micro-etiqueta | 11/14 (`label-sm`), MAYÚSCULAS | 600 | +0,1 em |
| Lead / párrafo principal | 16 → 18, `leading-relaxed` (1,625) | 400 | — |
| Párrafo secundario | 14/20 (`body-md`), `leading-relaxed` | 400 | — |
| Texto auxiliar | 11 → 12/16 (`body-sm`) | 400 | — |
| KPI | 20 → 24 → 30 (hero); 28 (nosotros); 24 → 32 (soluciones) | 700 | — |

### 5.3 Espaciado y layout `[E]`

- Escala efectiva (px): 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96, 128 (con semipasos de 2 px: 10, 14).
- Tokens nombrados: `gutter 1.5rem`, `margin 2rem`, `space-xs .25`, `space-sm .5`, `space-md 1`, `space-lg 1.5`, `space-xl 2.5` rem.
- Contenedor ancho: `max-width 80rem (1280px)`, `padding-x 16 / 24 / 48 px` (base / `sm` / `lg`).
- Contenedor estrecho: `56rem (896px)` para FAQ, formulario y deck.
- Padding vertical de sección: **64 px (móvil) / 96 px (`sm`+)**. Hero: 48 / 80 / 128 px.
- Alto del header: **64 px**.

### 5.4 Radios efectivos (según `TW`, que es lo que aplica Tailwind) `[E]`

| Clase | Valor | Uso |
|---|---|---|
| `rounded` / `rounded-sm` | 4 px | Checkbox |
| `rounded-md` | 8 px | (definido, uso marginal) |
| `rounded-lg` | **12 px** | Botones, enlaces de navegación, iconos pequeños |
| `rounded-xl` | **16 px** | Inputs, logo, botones de icono, tarjetas pequeñas, FAQ (móvil), tiles de logos |
| `rounded-2xl` | **20 px** | Tarjetas (móvil), tile de icono de servicio, FAQ (`sm`+), panel del hero |
| `rounded-3xl` | **24 px** | Tarjetas grandes (`sm`+), panel de imagen |
| `rounded-full` | 9999 px | Chips, avatares, puntos, badges circulares |

### 5.5 Sombras `[E]`

`shadow-sm` (controles, tarjetas de lista) · `shadow-md shadow-primary/20` (CTA principal del hero) · `shadow-xl` (tarjetas de servicio y formulario) · `shadow-2xl` (panel del hero y panel de imagen) · header: `0 1px 8px rgba(6,78,59,.04)` (claro) / `0 1px 12px rgba(0,0,0,.5)` (oscuro) · `shadow-inner` (franja de imagen del hero).

### 5.6 Movimiento y capas `[E]`

- Duraciones: 200 ms (cambios de color/fondo), 300 ms (giro de chevron, `transition-all` de tarjetas), 220 ms `ease-out` (tarjetas del deck), 250 ms `ease` (cambio de tema en `body`), 200 ms (skip-link).
- Z-index: `-10` (capa ambiental), `10` (contenido del hero sobre blobs), `40` (backdrop del menú móvil), `50` (header y panel móvil), `100` (skip-link).

### 5.7 Breakpoints `[E]`

Tailwind por defecto: `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Uso real: `sm:` 317 veces, `lg:` 85, `md:` 28, `xl:` 1. CSS/JS personalizados: `max-width: 1023px` (tablet y móvil → deck estático) y `max-width: 767px` (relleno del header y de secciones de servicios).

---

## 6. Reglas visuales por categoría

### 6.1 Identidad visual y dirección artística

#### IDV-01 `[E]` `OBL` — Profundidad por capas tonales
- **Regla:** Separar y jerarquizar con la escalera de superficies (`surface` → `container-low` → `lowest`) y con hairlines de ≤30 % de opacidad. No usar bordes sólidos oscuros de 1 px ni sombras negras duras.
- **Fundamento:** `DMD` «Elevation & Depth»; HTML: `border-outline-variant/20` (22 usos), `/30` (15).
- **Aplicación:** Reemplazar bordes `#ccc/#ddd/#000` del sitio original por `outline-variant` al 20–30 %; usar fondo tonal en lugar de borde para delimitar tarjetas.
- **Excepciones:** Inputs (50 %); bordes semánticos de error/éxito.
- **Validación:** Buscar `border:` con opacidad ≥ 60 % o color oscuro en tarjetas/secciones → 0 resultados.

#### IDV-02 `[E]` `OBL` — Un mensaje por sección
- **Regla:** Cada sección tiene una cabecera con jerarquía fija: eyebrow (opcional) → H2 → lead (opcional) → contenido. Un único H2 por sección.
- **Fundamento:** HTML: Servicios, Clientes, Ventajas, FAQ y Contacto usan eyebrow + H2 (+ lead).
- **Aplicación:** Reordenar el encabezado de cada sección del destino a ese patrón sin cambiar su texto. Si el destino no tiene eyebrow, no inventarlo: omitirlo.
- **Validación:** Cada `<section>` tiene exactamente un `<h2>`.

#### IDV-03 `[E]` `REC` — Un color de autoridad y un acento
- **Regla:** `primary` (oscuro) para acciones y estructura; `secondary` (medio) solo para señales positivas y énfasis puntual. Ningún tercer color de acento.
- **Fundamento:** Uso en HTML: `primary` 109 apariciones; `secondary` 20; ningún otro matiz cromático salvo `error`.
- **Aplicación:** Si el destino usa varios colores de acento, conservar el de marca como `primary` y neutralizar el resto a superficies/grises tintados (ver `COL-08`).
- **Validación:** Máximo 2 tonos cromáticos (más semánticos de estado) en la página.

#### IDV-04 `[E]` `REC` — Alternancia de fondos entre secciones
- **Regla:** Alternar `surface` y `surface-container-low` para marcar el ritmo sin líneas. Se pueden repetir dos secciones `surface` consecutivas si el relleno vertical (64/96 px) las separa.
- **Fundamento:** HTML: Hero `surface` → Nosotros `low` → Servicios/Soluciones/Clientes `surface` → Ventajas `low` → FAQ `surface` → Contacto/Footer `low`.
- **Validación:** No hay dos secciones consecutivas con superficie `low` salvo Contacto→Footer.

#### IDV-05 `[B]` `REC` — Variar el patrón de layout de secciones consecutivas
- **Regla:** No repetir el mismo patrón (tarjetas, columnas con divisores, 7/5, lista+imagen, deck) en dos secciones seguidas.
- **Fundamento:** La referencia alterna cinco patrones distintos.
- **Validación:** Revisión del mapa sección→patrón (`REDESIGN_WORKFLOW.md`, Paso 4).

#### IDV-06 `[E]` `REC` — Tratamiento de cifras («trust metrics»)
- **Regla:** Mostrar KPI como número en negrita `primary-container` + etiqueta pequeña `on-surface-variant`, en fila de 3 separada del bloque superior por un `border-t`.
- **Fundamento:** HTML:164-180 (hero) y 228-247 (nosotros).
- **Aplicación:** Solo si el destino **ya tiene** cifras reales. Nunca inventar métricas.
- **Validación:** Todas las cifras mostradas existen en el contenido original.

#### IDV-07 `[A]` `OBL` — Identidad del destino prevalece
- **Regla:** Logotipo, nombre, voz, eslogan y color de marca del destino se conservan. Se adapta el *sistema*, no la marca de la referencia.
- **Validación:** Ninguna cadena «Emerald», ni los textos o cifras de la referencia, aparecen en el resultado.

#### IDV-08 `[E]` `OPC` — Decoración mínima
- **Regla:** Permitidos solo dos blobs difuminados (`w-80/96 h-80/96`, color de marca al 10 %, `blur-3xl`) en el hero. No añadir blobs, patrones ni degradados de fondo a otras secciones. No replicar la capa «ambient glow» con imagen fija.
- **Fundamento:** HTML:138-139 (blobs). La capa de `HTML:34-39` queda oculta tras fondos opacos `[inferencia]`.
- **Validación:** ≤ 2 elementos decorativos difuminados en toda la página.

### 6.2 Paleta de colores

#### COL-01 `[E]` `OBL` — Roles semánticos, nunca HEX sueltos
- **Regla:** Todo color en componentes se referencia por rol (`primary`, `surface-container-low`, `on-surface-variant`…), vía variable CSS o token Tailwind. Prohibido incrustar HEX en reglas de componente.
- **Fundamento:** `TW` define 47 roles; HTML los usa por nombre.
- **Aplicación:** Crear la capa de tokens (§5.1 / `DESIGN_TOKENS.md`) y referenciarla.
- **Excepciones:** Valores del modo oscuro (ver `COL-12`): la referencia los incrusta como HEX; aquí **se exige tokenizarlos**.
- **Validación:** `grep -E '#[0-9a-f]{6}'` fuera del archivo de tokens → 0 resultados.

#### COL-02 `[E]` `OBL` — Mapa rol → uso

| Elemento | Fondo | Texto | Borde |
|---|---|---|---|
| Página | `surface` | `on-surface` / `on-surface-variant` | — |
| Sección alterna | `surface-container-low` | ídem | — |
| Header | `surface-container-lowest` 90 % + blur | `on-surface-variant` | `outline-variant` 20 % |
| Botón primario | `primary` (hover `primary-container`) | `on-primary` | — |
| Botón secundario | `surface-container-high` (hover `-highest`) | `on-surface` | transparente |
| Enlace de texto/eyebrow | — | `primary` (hover `secondary`) | — |
| Tarjeta elevada | `surface-container-lowest` | ídem | `surface-container-highest` |
| Tarjeta tonal | `surface-container-low` | ídem | transparente |
| Chip de estado | `secondary-container` | `on-secondary-container` | — |
| Chip neutro | `surface-container-high` | `primary` | — |
| Input | `surface-container-low` | `on-surface` | `outline-variant` 50 % |
| Ítem de navegación activo | `primary` | `on-primary` (600) | — |
| Divisor | — | — | `outline-variant` 20–30 % |

- **Validación:** Cada elemento del destino mapeado en la tabla usa el rol indicado.

#### COL-03 `[E]` `OBL` — Texto nunca negro puro
- **Regla:** Titulares `on-surface` (`#131b2e`), cuerpo `on-surface-variant` (`#404944`). `#000` solo en superposiciones con alfa (`bg-black/60`).
- **Fundamento:** Ningún texto de la referencia usa `#000`.
- **Validación:** `color: #000` / `black` → 0 resultados en texto.

#### COL-04 `[E]` `OBL` — Estados de color interactivo
- **Regla:** Enlaces de navegación: `on-surface-variant` → `primary` en hover (200 ms). Botón primario: `primary` → `primary-container`. Botón secundario: `-high` → `-highest`. Enlaces con flecha: `primary` → `secondary` y la flecha se desplaza 4 px. Foco: contorno 3 px `#00714d` (oscuro `#10b981`), offset 3 px. Selección de texto: fondo `#00714d`, texto blanco.
- **Fundamento:** HTML/CSS (`:focus-visible`, `::selection`).
- **Validación:** Cada elemento interactivo tiene hover, foco visible y (si es botón) estado activo.

#### COL-05 `[E]` `REC` — Uso del acento `secondary`
- **Regla:** Solo para iconos de verificación, estrellas, métricas positivas (+18,4 %) y chips de estado. No para fondos grandes ni botones.
- **Validación:** `secondary` no es fondo de ningún contenedor mayor a 48 px.

#### COL-06 `[E]` `OBL` — Escalera de superficies
- **Regla:** Mantener la progresión `surface (#faf8ff)` < `low (#f2f3ff)` < `container (#eaedff)` < `high (#e2e7ff)` < `highest (#dae2fd)`, con `lowest (#fff)` reservado para elementos elevados. Los pasos son sutiles (~2–4 % de luminosidad).
- **Aplicación:** Si el destino tiene fondo blanco puro, usar `lowest` como página y `low` para secciones alternas; si tiene un neutro cálido, derivar la escalera con el mismo matiz (ver `COL-08`).
- **Validación:** Ningún fondo de componente salta más de 2 pasos respecto a su contenedor.

#### COL-07 `[E]` `OBL` — Opacidades de borde normalizadas
- **Regla:** Solo estos valores: `20 %` (divisores internos), `30 %` (divisores de sección, botones de icono), `50 %` (inputs). En oscuro: `white/10` (general), `white/15` (inputs), `white/5` (tarjeta interior).
- **Validación:** No existen otras opacidades de borde.

#### COL-08 `[A]` `OBL` — Adaptar la paleta a la marca del destino
- **Regla:** El destino conserva su color de marca como `primary`. El resto de roles se derivan, no se sustituyen.
- **Aplicación (algoritmo):**
  1. Detectar colores del destino (variables CSS, botones, logotipo, enlaces). Elegir el de mayor presencia como `primary`.
  2. Si `on-primary` blanco sobre `primary` < 4,5:1, oscurecer `primary` en pasos hasta cumplirlo y guardar el original como color de marca (para logotipo/ilustraciones).
  3. `primary-container` = variante 6–10 % más clara/desplazada de `primary` (solo para hover y KPI).
  4. `secondary` = acento ya presente en el destino; si no existe, un análogo más claro y saturado de `primary`. Debe alcanzar ≥ 4,5:1 sobre `surface`.
  5. Superficies: derivar la escalera con el matiz de la marca (saturación ≤ 8 %) o conservar el neutro del destino y aplicar los 5 pasos.
  6. Texto: `on-surface` ≈ 8–10 % de luminosidad con el matiz de la marca; `on-surface-variant` ≈ 25–30 %.
- **Excepciones:** Marcas con color muy claro (amarillo, cian): usar el color como acento/relleno decorativo y un neutro oscuro como `primary` de acciones.
- **Validación:** Informe de contraste (§11, ítem de color) y comparación visual del logotipo sobre `surface` sin alteraciones.

#### COL-09 `[A]` `OBL` — Conservar / ajustar / complementar

| Situación en el destino | Decisión |
|---|---|
| Color de marca, cumple contraste | **Conservar** como `primary` |
| Color de marca, no cumple contraste con blanco | **Ajustar** el tono para texto/botones; conservar el original en logotipo e ilustraciones |
| Varios colores de acento | **Conservar** el de marca; convertir los demás a neutros o a `secondary` único |
| Sin paleta definida (solo negro/gris/blanco) | **Complementar** con un `primary` derivado de su logotipo; si no hay, un neutro azul-petróleo oscuro |
| Colores en imágenes/ilustraciones | **No tocar** |
| Colores semánticos ya establecidos (alertas, estados) | **Conservar** y alinear a ≥ 4,5:1 |

#### COL-10 `[E]` `REC` — Degradados solo en superposiciones
- **Regla:** Degradados únicamente como velo sobre imagen (`from-primary/90 via-primary/30 to-transparent`, dirección hacia arriba) y como brillo del panel del hero (`from-primary/20 via-transparent to-transparent`). Sin degradados en botones, textos ni fondos de sección.
- **Validación:** `linear-gradient` solo dentro de contenedores de imagen o del panel de hero.

#### COL-11 `[B]` `OBL` — Contraste verificable (WCAG 2.2 AA)
- **Regla:** Texto normal ≥ 4,5:1; texto ≥ 18,66 px negrita o ≥ 24 px y componentes de UI/iconos ≥ 3:1. Calcular con valores resueltos (mezclando opacidades).
- **Fundamento:** La referencia cumple en claro (p. ej. `on-surface-variant` sobre `surface` = 8,84:1) pero **falla** en: placeholder claro 2,47:1; botón oscuro blanco/`emerald-600` 3,77:1; hover oscuro blanco/`emerald-500` 2,54:1; copyright oscuro `slate-500` 4,09:1.
- **Aplicación:** En oscuro, botón primario = texto oscuro (`#002117`) sobre `#34d399`/`#10b981`, o fondo `emerald-700` (`#047857`, 5,48:1 con blanco). Placeholder ≥ `outline` al 100 % (4,26:1 sobre `surface`; si se necesita 4,5:1, oscurecer un paso). Copyright en oscuro ≥ `slate-400`.
- **Validación:** Informe automatizado de contraste sin fallos AA.

#### COL-12 `[A]` `OPC` — Modo oscuro
- **Regla:** Implementar modo oscuro **solo si** el destino ya lo tiene o el usuario lo solicita. No añadir interruptor ni persistencia a un sitio que no los tiene.
- **Fundamento:** La referencia define una escalera oscura propia (HEX en HTML) y acento esmeralda claro. Ver `DESIGN_TOKENS.md` §4.
- **Aplicación:** Si se implementa: tokenizar la escalera oscura, respetar `prefers-color-scheme` y `color-scheme: dark`, aplicar `COL-11`.
- **Validación:** Todos los componentes pasan contraste AA en ambos temas; sin parpadeo de tema al cargar (script inline temprano en `<head>`).

### 6.3 Tipografía

#### TIP-01 `[A]` `OBL` — Familia
- **Regla:** Usar una única familia sans-serif para toda la interfaz. Si el destino tiene tipografía de marca, **conservarla** y aplicar la escala de §5.2. Si no tiene, usar Plus Jakarta Sans 400/500/600/700 (o una sans geométrica equivalente).
- **Fundamento:** `TW`: la misma familia para `headline`, `body` y `sans`.
- **Validación:** Máximo 1 familia de texto (más la de iconos).

#### TIP-02 `[E]` `OBL` — Escala y pesos
- **Regla:** Aplicar la escala de §5.2. Pesos: 700 en H1–H3 y KPI; 600 en eyebrows, botones, enlaces destacados y etiquetas; 500 en citas de testimonio; 400 en cuerpo.
- **Validación:** No hay tamaños de titular fuera de la escala sin justificación documentada.

#### TIP-03 `[E]` `OBL` — Tracking
- **Regla:** −0,025 em en H1 y en H2 de 44 px; −0,02 em en `headline-lg`; +0,05 em en eyebrows en mayúsculas; +0,1 em en micro-etiquetas de 11–12 px en mayúsculas. Cuerpo sin tracking.

#### TIP-04 `[E]` `OBL` — Interlineado
- **Regla:** Párrafos de lectura con `line-height: 1.625` (`leading-relaxed`). Titulares con interlineado de la escala. **Excepción de la referencia a corregir:** `lg:text-5xl` en Tailwind aplica `line-height: 1`; en H1 de 2+ líneas usar ≥ 1,1 `[B]`.
- **Validación:** H1 de 3 líneas no presenta solapamiento de ascendentes/descendentes.

#### TIP-05 `[E]` `REC` — Medida (longitud de línea)
- **Regla:** Párrafo del hero ≤ `36rem`; párrafos de tarjeta ≤ `42rem`; cabecera de sección ≤ `48rem`. Objetivo: 45–75 caracteres por línea en texto de lectura.
- **Validación:** Ningún párrafo de lectura supera 80 caracteres por línea en escritorio.

#### TIP-06 `[E]` `REC` — Énfasis en el H1
- **Regla:** Se puede resaltar **un** fragmento del H1 con `primary-container` (oscuro: acento claro). No usar más de un fragmento ni subrayados/cursiva.
- **Fundamento:** HTML:142 (`<span class="text-primary-container …">alto rendimiento</span>`).
- **Aplicación:** Solo si el H1 original tiene una expresión clave natural; no reescribir texto.

#### TIP-07 `[E]` `OBL` — Escalado en pantallas pequeñas
- **Regla:** Los titulares se reducen por escalón (ver tabla §5.2) y **nunca** truncan: se permite el salto de línea (`overflow-wrap: break-word`). `truncate` solo en etiquetas de una línea dentro de filas flex (nombre/cargo del testimonio, subtítulos de la tarjeta del hero) y con `min-w-0`.
- **Validación:** Sin texto cortado con `…` en titulares a 320 px.

#### TIP-08 `[B]` `OBL` — Tamaño mínimo
- **Regla:** Texto informativo ≥ 12 px. 11 px solo para micro-etiquetas decorativas en mayúsculas con contraste ≥ 4,5:1. No usar 11 px en cifras o definiciones.
- **Fundamento:** La referencia usa 11 px en 10 lugares (KPI, subtítulos).

#### TIP-09 `[B]` `REC` — Fallback de fuentes
- **Regla:** `font-family: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`. Cargar solo los pesos usados con `display=swap`.

#### TIP-10 `[B]` `OBL` — No usar `font-*` de Tailwind para tamaño
- **Regla:** En Tailwind, `font-title-md`/`font-label-lg`/`font-body-sm` fijan **solo la familia**. Para aplicar un token tipográfico completo usar `text-title-md`, `text-label-lg`, `text-body-sm`.
- **Validación:** `grep -E 'font-(title|label|body|headline)-(sm|md|lg)'` → 0 resultados (excepto `font-headline`).

#### TIP-11 `[E]` `REC` — Cifras con peso de titular
- **Regla:** Valores numéricos destacados en la familia del titular, 700, en `primary` o `primary-container`; etiquetas en `on-surface-variant` a 12 px (mayúsculas con tracking 0,05 em en «Soluciones»).

### 6.4 Layout, estructura y espaciado

#### LAY-01 `[E]` `OBL` — Contenedores
- **Regla:** Contenido en `max-width: 80rem` centrado, padding horizontal 16/24/48 px. Secciones de lectura o formulario (FAQ, contacto, deck) en `56rem`. El fondo de cada sección ocupa el 100 % del ancho.
- **Validación:** Ningún bloque de contenido supera 1280 px de ancho útil.

#### LAY-02 `[E]` `OBL` — Cuadrícula de 12 columnas a partir de 1024 px
- **Regla:** Divisiones 7/5 (hero, nosotros), 6/6 (ventajas), 3 columnas iguales (pilares, soluciones desde `md`), 6 columnas (logotipos), 2 columnas (testimonios, campos de formulario desde `md`), 4 columnas (footer desde `md`). Debajo de 1024 px (o del breakpoint indicado) todo apila en 1 columna.
- **Fundamento:** HTML: `lg:grid-cols-12`, `lg:col-span-7/5/6`, `md:grid-cols-3`, `lg:grid-cols-6`, `md:grid-cols-4`.
- **Validación:** `RESPONSIVE_RULES.md` §3 (matriz).

#### LAY-03 `[E]` `OBL` — Ritmo vertical
- **Regla:** Sección: 64/96 px de padding vertical. Hero: 48/80/128. Cabecera de sección → contenido: 40/64 px (80 px en cabeceras grandes). Entre elementos de texto de cabecera: 8–16 px. Gap entre columnas: 32–64 px; entre tarjetas: 24–32 px; entre elementos de lista: 12–16 px.
- **Validación:** Los espaciados medidos pertenecen a la escala §5.3.

#### LAY-04 `[E]` `OBL` — Offset del header fijo
- **Regla:** `main { padding-top: 4rem }`; `html { scroll-padding-top: 5rem }`; `section[id] { scroll-margin-top: 4.5rem }` para que los anclajes no queden bajo el header.
- **Validación:** Al activar un enlace de anclaje, el encabezado de la sección queda visible bajo el header.

#### LAY-05 `[E]` `REC` — Divisores como estructura
- **Regla:** En layouts «editoriales» (sin tarjetas): `border-y` + `divide-x` (desde `md`) o `divide-y` (móvil) con `outline-variant` al 30 %; columnas con `px` de 32/48 px salvo la primera (sin `pl`) y la última (sin `pr`). Dentro de cada columna, subdividir con `border-t` al 20 % y `pt` 20–24 px.
- **Fundamento:** HTML:386-468.

#### LAY-06 `[E]` `REC` — Padding interno de tarjetas
- **Regla:** 24 px (móvil) / 32 px (`sm`) / 48 px (`lg`) en tarjetas grandes; 12–16 px en tarjetas de lista; 16/24 px en FAQ; 20/32/64 px en el contenedor del formulario.

### 6.5 Formas, bordes y sombras

#### FRM-01 `[E]` `OBL` — Un radio por tipo de contenedor
- **Regla:** Aplicar la tabla de §5.4 sin inventar radios intermedios. Contenedor y contenido interior respetan: radio interior ≤ radio exterior − relleno (p. ej. imagen en tarjeta de 24 px → 16–20 px).
- **Validación:** El conjunto de `border-radius` computados ⊂ {4, 8, 12, 16, 20, 24, 9999 px}.

#### FRM-02 `[E]` `OBL` — Escala de elevación
- **Regla:** Sin elevación (tarjetas tonales, FAQ, logotipos) → `shadow-sm` (controles) → `shadow-xl` (tarjetas destacadas) → `shadow-2xl` (paneles hero/imagen). Una sola sombra por elemento. En el header, sombra de 1 px teñida con el primario al 4 %.
- **Aplicación:** Teñir las sombras con el color de `primary` a baja opacidad en lugar de negro puro cuando sea posible `[B]`.
- **Validación:** Ningún elemento combina `shadow-xl` con borde ≥ 30 % opaco.

#### FRM-03 `[B]` `REC` — Evitar efectos incoherentes
- **Regla:** No mezclar en una misma vista tarjetas con sombra, tarjetas con borde y tarjetas tonales sin motivo jerárquico. Una sección usa **una** familia: elevada, tonal o editorial.

### 6.6 Animaciones e interacciones

#### MOT-01 `[E]` `OBL` — Microtransiciones
- **Regla:** `transition-colors` 200 ms en enlaces/botones/tarjetas; `transition-all` en botones con sombra; chevron del FAQ `rotate-180` en 300 ms; flechas `translate-x-1` al hover del grupo; logo `scale-105`; pulsación `active:scale-95` (controles pequeños) o `scale-[.99]` (botón de formulario). Sin rebotes ni overshoot.
- **Validación:** Duración máxima de microtransición ≤ 300 ms.

#### MOT-02 `[E]` `OBL` — `prefers-reduced-motion`
- **Regla:** Bajo `prefers-reduced-motion: reduce`: `scroll-behavior:auto`, duraciones 0,01 ms, y cualquier efecto basado en scroll se sustituye por contenido estático en flujo normal.
- **Fundamento:** CSS (bloque final) + JS (`reducedMotion.matches`).
- **Validación:** Con la preferencia activa no se produce ningún desplazamiento animado.

#### MOT-03 `[E]` `OPC` — Deck de servicios por scroll
- **Regla:** Usar solo en escritorio (≥ 1024 px), con 2–5 tarjetas de estructura idéntica, y con alternativa estática (lista vertical, gap 20 px) en tablet/móvil y con reducción de movimiento. Detalle completo en `COMPONENT_RULES.md` (CMP-DECK).
- **Excepciones:** No usar si el destino tiene tarjetas de contenido heterogéneo, más de 5 elementos o contenido extenso; usar rejilla estática.

#### MOT-04 `[B]` `OBL` — Sin animaciones que bloqueen la lectura
- **Regla:** Prohibido autoplay de carruseles, parallax pesado, animaciones de entrada que oculten contenido hasta que se dispare un observador, y bucles infinitos. La referencia no usa `IntersectionObserver` ni animaciones de entrada: no añadirlos.
- **Validación:** Todo el contenido es legible con JS deshabilitado, salvo el deck (que debe degradar a estático).

#### MOT-05 `[E]` `REC` — Rendimiento del scroll
- **Regla:** Listeners de scroll `passive`, actualización con `requestAnimationFrame` y un solo frame pendiente; animar solo `transform` y `opacity`.
- **Fundamento:** JS:609-620.

---

## 7. Reglas para componentes

> Receta mínima por componente. Estados, anatomía completa, valores en CSS plano y adaptación: `COMPONENT_RULES.md`. «TW:» indica la receta en utilidades Tailwind.

| ID | Componente | Propósito | Receta mínima `[E]` |
|---|---|---|---|
| **CMP-HDR** | Header + navegación | Orientación y CTA permanentes | Fijo, `h-64px`, `z-50`, fondo `surface-container-lowest/90` + `backdrop-blur`, borde inferior `outline-variant/20`, sombra 1 px. Logo (tile 40 px `rounded-xl` `primary` + nombre 700) a la izquierda; nav desktop desde 1024 px: enlaces `14px`, `px-12 py-6`, `rounded-lg`, hover `primary`, activo `bg-primary text-on-primary 600`; a la derecha controles de 40 px `rounded-xl` y CTA «Solicitar…» (`px-16 py-8 rounded-lg`, oculto < 640 px). Safe-area superior. |
| **CMP-NAVM** | Navegación móvil | Menú < 1024 px | `<details>` + `<summary>` botón 40–44 px; panel `fixed top-16 inset-x-0`, `p-20`, filas `px-16 py-10 rounded-xl`, backdrop `bg-black/60 blur-sm z-40`; se cierra con enlace, backdrop, clic exterior, `Esc` y al pasar a ≥ 1024 px. Incluye el CTA a ancho completo. |
| **CMP-HERO** | Hero | Propuesta de valor + CTA + prueba | Grid 7/5 desde 1024 px; H1 (§5.2) + párrafo `max-w 36rem` + 2 botones (primario + secundario tonal, apilados en móvil, ancho completo < 640 px) + fila de 3 KPI separada por `border-t`; lado derecho: panel visual (`rounded-2xl`, `shadow-2xl`, relleno 16/24 px) con la imagen o vista previa del producto. Blobs decorativos (IDV-08). |
| **CMP-BTN** | Botones / CTA | Acción | **Primario:** `px-24 py-12 rounded-lg bg-primary text-on-primary` `16px/600` familia titular, hover `primary-container`, `shadow-md shadow-primary/20` solo en hero. **Secundario:** igual medida, `bg-surface-container-high text-on-surface`, hover `-highest`. **Compacto (tarjetas):** `px-20 py-10`, 14px/600. **Formulario:** ancho completo, `py-14/16`, `rounded-xl`, 700. Alto táctil mínimo 44 px. |
| **CMP-CHIP** | Chips y badges | Estado/categoría | Pastilla `rounded-full`, `px-10–12 py-4`, `11–14px/600`. Estado: `secondary-container` + `on-secondary-container`. Neutro: `surface-container-high` + `primary`. Badge circular de check: 32 px `secondary-container`. |
| **CMP-CARD** | Tarjetas | Agrupar contenido | Elevada (`lowest`, `rounded-2xl/3xl`, `shadow-xl`, borde `-highest`); Tonal (`low`, sin sombra, borde transparente); Lista (`lowest`, `rounded-xl`, `p-12/16`, `shadow-sm`). Relleno 24/32/48 px. Pie con `border-t outline-variant/20`. |
| **CMP-EDIT** | Bloque editorial (sin tarjetas) | Comparar 3 ofertas con aire | `border-y` + `divide-x` (desde `md`), cada columna: fila etiqueta+etiqueta, H3, métrica grande + unidad, descripción, lista con check al pie separada por `border-t`. |
| **CMP-DECK** | Recorrido de servicios (opcional) | Presentar 2–5 módulos en secuencia | Sección de altura `(vh−64) + (n−1)·vh`; escenario `sticky top:4rem`; mazo `height: clamp(340px, 50vh, 460px)` con `perspective:1200px`; tarjetas absolutas apiladas. Estático < 1024 px y con reducción de movimiento. |
| **CMP-STAT** | Estadísticas / KPI | Prueba numérica | Número `700` en `primary-container` + etiqueta `on-surface-variant`; en fila de 3 (`gap 12 / 32 px`) o con separadores verticales de 1×32 px. |
| **CMP-LOGO** | Rejilla de logotipos | Confianza | Rejilla 2/3/6 columnas, `gap 12/16/24`; tile `surface-container-low`, `rounded-xl`, alto 64/80/96 px; el logo en `on-surface-variant`, hover `primary`. |
| **CMP-TEST** | Testimonios | Prueba social | Tarjeta tonal, 5 estrellas rellenas (`secondary`, 20 px), cita `16–18px/500 leading-relaxed`, pie con avatar circular 48 px (iniciales o foto) + nombre `600` + cargo `12–14px` (ambos con `truncate`, `min-w-0`). Rejilla 1/2 columnas. |
| **CMP-FEAT** | Lista de ventajas + imagen | Argumentos con apoyo visual | 6/6; izquierda: eyebrow, H2, lead y 3 filas (badge check 32 px + título 600 + texto); derecha: imagen con alto fijo 280/380/500 px, `rounded-2xl/3xl`, `shadow-2xl`, velo degradado con título y texto en la parte inferior. |
| **CMP-FAQ** | Acordeón | Resolver dudas | `<details class="group">`, tarjeta tonal `rounded-xl/2xl`, `p-16/24`; `<summary>` flex con pregunta `16/18px 600` y chevron (`rotate-180` al abrir); respuesta con `border-t` y `mt-16 pt-16`. Contenedor 56rem, `space-y-14/16`. |
| **CMP-FORM** | Formulario | Captación | Contenedor `lowest`, `rounded-2xl/3xl`, `shadow-xl`, relleno 20/32/64; campos en rejilla 1/2 columnas (`md`), `gap 16/24`; etiqueta sobre el input `14px/600`; input `px-16 py-12 rounded-xl`, fondo `low`, borde `outline-variant/50`, foco: borde `primary` + anillo 2 px `primary/20`; casilla de consentimiento; botón ancho completo; región `role=status aria-live=polite`. Estados definidos en `CMP-STATES`. |
| **CMP-FOOT** | Footer | Cierre, legales, contacto | `surface-container-low`, `py-48`; rejilla 1/2/4 columnas; marca + descripción + iconos de 36 px; columnas con título (14px 700 mayúsculas) y enlaces `14px` con `py-4`; subfooter con `border-t` y copyright centrado. |
| **CMP-STATES** | Estados | Feedback | Ver tabla siguiente. |

**CMP-STATES `[E]/[B]` — Estados de interfaz**

| Estado | Regla | Origen |
|---|---|---|
| Hover | Cambio de color/fondo en 200 ms (COL-04) | `[E]` |
| Foco | `:focus-visible` 3 px `#00714d` offset 3 px (oscuro `#10b981`); en inputs borde `primary` + anillo 2 px 20 % **y además** contorno visible `[B]` | `[E]` + `[B]` |
| Activo | `scale-95` / `scale-[.99]` | `[E]` |
| Seleccionado (nav) | Fondo `primary`, texto `on-primary` 600; `aria-current="location"` `[B]` | `[E]` + `[B]` |
| Deshabilitado | Opacidad 50 %, `cursor:not-allowed`, sin hover, `aria-disabled` | `[B]` |
| Error | Borde `error`, texto de ayuda `error` (≥ 4,5:1), icono + texto, `aria-invalid="true"` y `aria-describedby` | `[B]` |
| Éxito | Mensaje en región `role=status`, `secondary-container`/`on-secondary-container`; **sin `alert()`** | `[B]` |
| Carga | Botón con spinner, `aria-busy="true"`, texto «Enviando…» y bloqueo de reenvío | `[B]` |

> Los estados Deshabilitado, Error, Éxito (sin `alert()`) y Carga **no existen** en la referencia. Se definen como recomendación coherente con los tokens.

---

## 8. Reglas de imágenes y recursos originales

#### IMG-01 `[A]` `OBL` — Conservar y reutilizar las imágenes del destino
- **Regla:** Toda imagen, logotipo, icono y recurso gráfico propio del destino se conserva (mismo archivo, misma URL o copia local). No sustituir por imágenes de stock, genéricas ni por las de la referencia.
- **Aplicación:** Ubicar cada imagen existente en el contenedor de imagen adecuado (hero, panel de ventajas, tarjetas) y ajustar **composición**: proporción, recorte, alineación, radio, velo.
- **Excepciones:** Imagen rota, de resolución insuficiente o con derechos no resueltos: señalarlo en el informe; no reemplazar sin autorización.
- **Validación:** Inventario de recursos del destino ⊆ recursos usados o con justificación de omisión.

#### IMG-02 `[E]` `OBL` — Contenedores con proporción controlada
- **Regla:** Imagen principal en contenedor con alto fijo responsivo (280/380/500 px) o con `aspect-ratio`; panel pequeño de hero a 112/128 px de alto. Preferir `aspect-ratio` (16/10, 4/3, 1/1) a alturas en píxeles `[B]` para evitar deformaciones.
- **Fundamento:** HTML:183 (`h-28 sm:h-32`), 641 (`h-[280px] sm:h-[380px] lg:h-[500px]`).

#### IMG-03 `[E]` `OBL` — Recorte con `object-fit: cover`
- **Regla:** `cover` + `object-position` centrado por defecto; si el sujeto está descentrado (rostros, producto), ajustar `object-position`. Nunca estirar. Para logotipos y diagramas usar `contain`.
- **Fundamento:** `bg-cover bg-center` en las 3 imágenes.

#### IMG-04 `[E]` `OBL` — Texto sobre imagen con velo
- **Regla:** Todo texto superpuesto lleva un velo degradado hacia arriba (`primary` 90 % → 30 % → transparente) y se ubica abajo-izquierda con relleno 20/32 px; título blanco 700, texto secundario `primary-fixed-dim`. Contraste ≥ 4,5:1 medido sobre la zona más clara del velo.
- **Fundamento:** HTML:641-649; hero 184-188 (velo plano `primary/20` + `blur 2px` + texto centrado).

#### IMG-05 `[B]` `OBL` — Nombre accesible
- **Regla:** Imagen informativa → `<img alt="descripción">`. Si debe ser fondo CSS, `role="img"` + `aria-label` en el contenedor. Imagen decorativa → `alt=""` / `aria-hidden="true"`. La referencia usa `data-alt`, que **no** es accesible.
- **Validación:** 100 % de las imágenes informativas tienen nombre accesible.

#### IMG-06 `[B]` `REC` — Imágenes como `<img>`, no como fondo
- **Regla:** Para imágenes con contenido preferir `<img>` con `width`/`height`, `loading="lazy"` (excepto la del hero, `fetchpriority="high"`) y `decoding="async"`. Fondos CSS solo para decoración.
- **Fundamento:** La referencia no usa `<img>`; esto evita CLS y habilita lazy-load.

#### IMG-07 `[E]` `REC` — Radio y recorte coherentes
- **Regla:** Contenedor de imagen con `overflow:hidden` y radio de §5.4: 12 px (franjas en paneles), 20/24 px (paneles principales). Borde: `transparent` en claro y `white/10` en oscuro.

#### IMG-08 `[E]` `REC` — Iconos
- **Regla:** Familia única de iconos (la referencia: Material Symbols Outlined, peso 400, `FILL 0`; estrellas con `FILL 1`). Tamaños: 16, 18, 20, 22, 24, 28 px. Tile de icono: 40/48/56 px, `rounded-xl/2xl`, fondo `primary` con icono blanco (servicios) o `surface-container-high` con icono `primary` (acciones).
- **Aplicación:** Si el destino ya tiene un set de iconos, **conservarlo** y aplicar los tiles y tamaños; no mezclar dos sets. Preferir SVG en línea o subset de fuente `[B]` frente a cargar la fuente completa.

#### IMG-09 `[E]` `REC` — Logotipos de clientes
- **Regla:** Tile uniforme (alto 64/80/96 px) con el logotipo centrado, tamaño máx. 70 % del ancho, `object-fit: contain`, monocromo en `on-surface-variant` y color completo (o `primary`) al hover. La referencia usa texto como sustituto; el destino debe usar sus logotipos reales.
- **Excepciones:** Logotipos con restricciones de marca (no recolorear): mostrar en color original.

#### IMG-10 `[B]` `OBL` — Sin hotlinking
- **Regla:** No cargar imágenes del sitio de referencia ni de URLs temporales de terceros. Los recursos del destino se sirven desde su origen o de copia local.

#### IMG-11 `[B]` `REC` — Filtros y efectos
- **Regla:** Solo velo de color/degradado y un `backdrop-blur: 2px` en la franja del hero. Sin filtros de escala de grises, sepia, sombras proyectadas sobre PNG ni marcos adicionales.

---

## 9. Reglas de adaptación responsive

> Matriz por sección y bloque CSS de referencia en `RESPONSIVE_RULES.md`.

#### RSP-01 `[E]` `OBL` — Mobile-first
- **Regla:** Los estilos base son los de móvil; `sm`/`md`/`lg` solo añaden. No usar `max-width` salvo para los dos breakpoints personalizados de la referencia (1023 y 767).

#### RSP-02 `[E]` `OBL` — Breakpoints y función
| Ancho | Qué cambia |
|---|---|
| < 640 | 1 columna; botones del hero a ancho completo; CTA del header oculto (pasa al menú); KPI en 3 columnas compactas (texto 11–12 px) |
| ≥ 640 (`sm`) | Relleno ×1,5; tipografía un escalón; botones en fila; logotipos 3 col; CTA del header visible |
| ≥ 768 (`md`) | Columnas de pilares/soluciones/footer/formulario; divisores pasan de horizontales a verticales |
| ≥ 1024 (`lg`) | Navegación completa; grid 12 col; hero 7/5; deck por scroll; logotipos 6 col; testimonios 2 col |
| ≥ 1280 (`xl`) | Sin cambios sustanciales (contenedor ya limitado a 1280) |
- **Fundamento:** HTML (clases), CSS (`@media 1023/767`), JS (`matchMedia('(max-width: 1023px)')`).
- **Excepción:** Si el destino tiene otros breakpoints propios, **conservarlos** y mapear los comportamientos a ellos `[A]`.

#### RSP-03 `[E]` `OBL` — Navegación
- **Regla:** < 1024 px: menú `<details>` con panel a ancho completo; ≥ 1024 px: barra horizontal. En todos los casos el CTA principal es alcanzable.

#### RSP-04 `[E]` `OBL` — Prevención de desbordamiento
- **Regla:** `img { max-width:100%; height:auto }`; `input, textarea { max-width:100% }`; `overflow-wrap:break-word` en texto; `min-w-0` en hijos flex con `truncate`; contenido ancho (tablas, código) en contenedor con `overflow-x:auto`. Ver `IMP-07` sobre `overflow-x`.
- **Validación:** `document.documentElement.scrollWidth <= innerWidth` a 320, 375, 768, 1024, 1440 px.

#### RSP-05 `[E]` `OBL` — Reorganizar sin eliminar
- **Regla:** En móvil apilar, no ocultar. Único elemento oculto en la referencia: el CTA del header (< 640 px), que se reubica en el menú. Todo contenido eliminado visualmente debe tener equivalente accesible.
- **Validación:** El texto visible a 1440 px existe en el DOM visible a 375 px (salvo el CTA reubicado).

#### RSP-06 `[E]` `REC` — Tarjetas en móvil
- **Regla:** Tarjeta de servicio: en < 1024 px, flujo normal, `padding: clamp(1.25rem, 4vw, 2rem)`, título `clamp(1.25rem, 4vw, 1.75rem)`, pie con `flex-wrap`.

---

## 10. Reglas de accesibilidad y usabilidad

#### A11-01 `[E]` `OBL` — Skip-link
- **Regla:** Primer elemento enfocable: enlace «Saltar al contenido» → `#inicio`/`main`, oculto fuera de pantalla (`translateY(-160%)`) y visible al enfocarse, `z-100`, fondo `primary`, texto blanco.

#### A11-02 `[E]` `OBL` — Foco visible
- **Regla:** `:focus-visible { outline: 3px solid #00714d; outline-offset: 3px }` (oscuro `#10b981`). No eliminar el contorno sin sustituirlo por un indicador equivalente (≥ 3:1 contra el fondo y ≥ 2 px).
- **Validación:** Recorrer la página con `Tab`: cada control muestra foco.

#### A11-03 `[E]` `OBL` — Estructura semántica
- **Regla:** `<header>`, `<nav aria-label>`, `<main>`, `<section>` (con `id` y nombre accesible), `<article>`, `<footer>`; un único `<h1>`; H2 por sección y H3 dentro, sin saltos. Títulos de columna del footer como `<h2>`/`<h3>` visualmente iguales `[B]`.
- **Fundamento:** HTML (excepto footer y «Ventajas»; ver §3.2).
- **Validación:** Árbol de encabezados sin saltos de nivel; todas las secciones identificables.

#### A11-04 `[E]` `OBL` — Objetivos táctiles
- **Regla:** Objetivo ≥ 44×44 px en enlaces/botones dentro de tarjetas y navegación móvil; mínimo absoluto 24×24 px (WCAG 2.2). Los botones de icono de 40 px de la referencia están por encima del mínimo AA pero por debajo de 44: **ampliar a 44 px** `[B]`.

#### A11-05 `[E]` `OBL` — Contenido oculto no enfocable
- **Regla:** Los elementos fuera de pantalla o inactivos (tarjetas inactivas del deck) llevan `aria-hidden="true"` **y** `tabindex="-1"` en sus descendientes interactivos; al reactivarse se restauran.
- **Fundamento:** JS:534-552.

#### A11-06 `[E]` `OBL` — Teclado
- **Regla:** Menú móvil se cierra con `Esc`; `details/summary` operables con Enter/Espacio; ningún elemento interactivo depende solo de hover.
- **Fundamento:** JS:652-658.

#### A11-07 `[B]` `OBL` — Formularios
- **Regla:** Cada campo con `<label for>`; obligatoriedad indicada en texto («*» y `required`); `autocomplete` apropiado (`name`, `email`, `organization`, `tel`); validación nativa **activa** (no usar `novalidate`) o validación propia con mensajes por campo (`aria-invalid`, `aria-describedby`); mensaje de éxito en región `role="status"`; no usar `alert()`.
- **Fundamento:** La referencia incluye `<label for>` y `role="status"` correctamente, pero `novalidate="false"` y `alert()` (HTML:731, JS:683).

#### A11-08 `[B]` `OBL` — Imágenes
- **Regla:** Ver `IMG-05`.

#### A11-09 `[B]` `OBL` — Iconos
- **Regla:** Iconos decorativos con `aria-hidden="true"`; botones de solo icono con `aria-label` (la referencia lo hace en tema, idioma y menú) y `title`.

#### A11-10 `[E]` `OBL` — Preferencias del usuario
- **Regla:** Respetar `prefers-reduced-motion` (MOT-02), y `prefers-color-scheme` si se implementa modo oscuro (COL-12). `color-scheme: dark` en el elemento raíz oscuro para scrollbars y controles nativos.

#### A11-11 `[B]` `REC` — Estado de navegación
- **Regla:** El ítem activo del scrollspy lleva `aria-current="location"`.

#### A11-12 `[E]` `REC` — Idioma
- **Regla:** `<html lang>` siempre refleja el idioma activo. No aplica traducir; solo conservar el `lang` del destino.

---

## 11. Procedimiento para rediseñar un sitio existente

> Versión resumida. Procedimiento operativo detallado con entregables por paso: `REDESIGN_WORKFLOW.md`.

1. **Inventariar el destino.** Contenido (textos, enlaces), recursos (imágenes, logotipos, iconos, fuentes), estructura (secciones, orden), funcionalidad (formularios, scripts, integraciones, analítica), tecnología, colores de marca, breakpoints. Guardar copia/respaldo y captura base a 375, 768 y 1440 px.
2. **Decidir la capa técnica** (RED-03): no migrar de tecnología; introducir tokens en la que exista.
3. **Crear la capa de tokens** (§5, `DESIGN_TOKENS.md`) con los colores derivados (COL-08/09), tipografía, espaciado, radios y sombras.
4. **Mapear secciones del destino a patrones** (§7). Usar solo patrones que tengan contenido real en el destino.
5. **Aplicar estilos globales:** tipografía, color de texto, fondo, foco, selección, skip-link, `scroll-padding`, `prefers-reduced-motion`.
6. **Rediseñar componente a componente** en este orden: header/nav → hero → secciones de contenido → tarjetas/listas → formularios → footer.
7. **Integrar imágenes originales** (§8) ajustando composición.
8. **Responsive:** verificar 320, 375, 768, 1024, 1440 px (§9).
9. **Accesibilidad:** foco, teclado, contraste, semántica (§10).
10. **Regresión funcional:** formularios, enlaces, scripts, analítica, integraciones funcionan igual.
11. **Informe final:** qué se cambió, qué se conservó, qué se dejó pendiente y por qué (plantilla en `REDESIGN_WORKFLOW.md`).

### Reglas de prioridad (de mayor a menor)

#### RED-01 `[A]` `OBL` — Orden de precedencia
1. Funcionalidad del destino → 2. Contenido → 3. Recursos (imágenes, logotipos) → 4. Identidad (marca) → 5. Estructura de secciones → 6. Estética de la referencia.
- **Regla:** Ante conflicto, prevalece el nivel de menor número.

#### RED-02 `[A]` `OBL` — Preservar contenido
- **Regla:** Textos, datos, servicios, productos, precios, enlaces y legales se mantienen **literalmente**. Se permite dividir en párrafos o reordenar visualmente; no resumir ni reescribir. Cualquier texto nuevo (p. ej. `aria-label`) se declara en el informe.
- **Validación:** Comparación automática de texto visible antes/después (excepto cabeceras técnicas): diferencia = 0 o justificada.

#### RED-03 `[A]` `OBL` — Preservar tecnología
- **Regla:** Implementar en la tecnología existente (CSS plano, SCSS, Tailwind, Bootstrap, CSS-in-JS, plantilla de CMS). No migrar. Si el destino no usa Tailwind, **no** añadir Tailwind: traducir las recetas a CSS con variables (`DESIGN_TOKENS.md` §3).
- **Validación:** `package.json`/dependencias/pipeline de build sin cambios no justificados.

#### RED-04 `[A]` `OBL` — Preservar estructura funcional
- **Regla:** Mantener secciones, orden de contenido relevante, formularios (campos, nombres, `action`, `method`, tokens), enlaces (`href`), IDs/clases usados por JavaScript, analítica y integraciones. Si una clase/ID se renombra, actualizar **todas** sus referencias.
- **Validación:** Pruebas de humo de los flujos principales antes y después.

#### RED-05 `[A]` `OBL` — No eliminar por estética
- **Regla:** Ninguna sección o contenido se elimina por razones visuales. Si es imprescindible reducir, ocultar o fusionar, se justifica por escrito en el informe y se pide confirmación.

#### RED-06 `[A]` `OBL` — Adaptar, no copiar
- **Regla:** Trasladar patrones (jerarquía, espaciado, geometría, componentes). No copiar la estructura exclusiva de la referencia (p. ej. añadir deck, KPI, logotipos o testimonios si el destino no los tiene).

#### RED-07 `[A]` `REC` — Mejorar sin sobrecargar
- **Regla:** Eliminar inconsistencias (múltiples radios/sombras/espaciados, estilos duplicados, efectos innecesarios) y no añadir elementos sin valor funcional.

#### RED-08 `[A]` `OBL` — Mapa de secciones destino → patrón

| Si el destino tiene… | Aplicar | Si no tiene… |
|---|---|---|
| Portada con titular y CTA | CMP-HERO | Aplicar solo cabecera + tipografía; no inventar panel |
| Presentación/«Quiénes somos» | Bloque 7/5 + 3 pilares con divisores (LAY-02/05) | — |
| Servicios/productos (2–5 homogéneos) | CMP-CARD o CMP-EDIT (opcional CMP-DECK) | Rejilla de tarjetas |
| Servicios/productos (> 5 o heterogéneos) | Rejilla de tarjetas tonales | — |
| Clientes/logotipos | CMP-LOGO | **No añadir** |
| Testimonios | CMP-TEST | **No añadir** |
| Cifras reales | CMP-STAT | **No añadir** |
| Preguntas frecuentes | CMP-FAQ | — |
| Formulario de contacto | CMP-FORM | — |
| Footer | CMP-FOOT | — |

---

## 12. Restricciones y cambios prohibidos

1. **Prohibido** eliminar, resumir o reescribir contenido, productos, precios, legales o enlaces del destino.
2. **Prohibido** sustituir imágenes, logotipos o iconos del destino por stock, por los de la referencia o por URLs externas.
3. **Prohibido** cambiar lógica de negocio, contratos de API, rutas, nombres de campos de formulario, `action`/`method`, IDs/clases referenciados por JS, analítica o dependencias, salvo necesidad demostrada y documentada.
4. **Prohibido** migrar de framework o tecnología de estilos (RED-03).
5. **Prohibido** copiar marca, textos, cifras, testimonios, logotipos o cargar recursos remotos de la plantilla.
6. **Prohibido** añadir funcionalidades de la referencia que el destino no tiene: selector de idioma, interruptor de modo oscuro, deck por scroll, formulario simulado, `alert()`.
7. **Prohibido** introducir un segundo color de acento, nuevos radios o sombras fuera de la escala.
8. **Prohibido** animaciones que oculten contenido hasta dispararse, autoplay de carruseles y parallax.
9. **Prohibido** reducir la accesibilidad existente del destino (si el destino ya cumple algo mejor, mantenerlo).
10. **Prohibido** replicar los defectos de §3.2.
11. **Prohibido** cargar Tailwind Play CDN u otras librerías en producción por conveniencia.
12. **Prohibido** modificar el ZIP o los archivos de la referencia.

---

## 13. Implementación y calidad

#### IMP-01 `[B]` `OBL` — Separación de responsabilidades
- **Regla:** Estructura y semántica en HTML; presentación en CSS (tokens + componentes); comportamiento en JS. No usar `style=""` para valores de diseño (la referencia lo usa en 3 imágenes y en estrellas: acotarlo a valores dinámicos).

#### IMP-02 `[B]` `OBL` — Tokens definidos = tokens usados
- **Regla:** Crear solo los tokens que se vayan a usar. La referencia define 47 colores y utiliza ~18 en el HTML; no reproducir los 29 restantes. Añadir un token solo cuando un componente lo requiera.

#### IMP-03 `[B]` `REC` — Nomenclatura
- **Regla:** Tokens semánticos en kebab-case (`--color-primary`, `--color-surface-container-low`); componentes `BEM` o la convención del destino (`.card`, `.card--elevated`, `.card__title`). Conservar la convención existente del destino.

#### IMP-04 `[B]` `OBL` — Entrega de CSS
- **Regla:** En producción, compilar el CSS (Tailwind CLI/PostCSS o CSS plano). No usar `cdn.tailwindcss.com` (es una herramienta de desarrollo).

#### IMP-05 `[B]` `REC` — Sin reglas contradictorias
- **Regla:** Una sola fuente para cada propiedad. En la referencia, `.service-card` declara `transition` en CSS y también `transition-all duration-300` en la clase de utilidad: elegir una (la de CSS, 220 ms `ease-out`, para el deck).

#### IMP-06 `[B]` `REC` — Precedencia de capas
- **Regla:** Si se usa `@layer` nativo, declarar el orden (`@layer base, components, utilities;`) y recordar que los estilos sin capa ganan a los de capa. No mezclar CSS plano con `@layer` de Tailwind sin compilar.

#### IMP-07 `[B]` `OBL` — Desbordamiento y `sticky`
- **Regla:** Evitar `overflow-x:hidden` simultáneo en `html` y `body`; usar `overflow-x: clip` en `body` (o en el contenedor de página) para no romper `position: sticky` `[riesgo no verificado en navegador; probar]`. No fijar `max-width:100vw` en `html` (incluye la barra de scroll).

#### IMP-08 `[B]` `REC` — Rendimiento
- **Regla:** Autoalojar fuentes y subconjuntos de iconos; precargar la fuente principal; imágenes con tamaño, `srcset` y formato moderno; JS de scroll con `passive` y `rAF` (como en la referencia); evitar `backdrop-filter` en áreas grandes.

#### IMP-09 `[B]` `REC` — Fuente de iconos
- **Regla:** Si se usa Material Symbols, cargar con `display=block` o autoalojar un subset, para no mostrar los nombres de ligadura («menu», «hub») mientras carga.

#### IMP-10 `[B]` `REC` — Tema sin parpadeo
- **Regla (solo si hay modo oscuro):** Script inline en `<head>` antes de los estilos que fije `class="dark"`/`data-theme` según `localStorage` o `prefers-color-scheme`, dentro de `try/catch`.

---

## 14. Lista de verificación de cumplimiento

Marcar cada ítem. Un ítem `OBL` incumplido bloquea la entrega.

**Preservación**
- [ ] El texto visible coincide con el original (RED-02).
- [ ] Todas las imágenes/logotipos/iconos originales siguen presentes y sin sustituir (IMG-01).
- [ ] Todas las secciones originales existen en el resultado (RED-05).
- [ ] Formularios, enlaces, scripts, analítica e integraciones funcionan igual (RED-04).
- [ ] Tecnología y dependencias sin cambios no justificados (RED-03).

**Identidad**
- [ ] Logotipo, nombre y color de marca del destino intactos (IDV-07, COL-08).
- [ ] Ninguna cadena, cifra, logotipo o imagen de la referencia aparece (restricción 5).
- [ ] ≤ 2 tonos cromáticos (más estados) (IDV-03).

**Sistema visual**
- [ ] Tokens definidos y usados; sin HEX sueltos (COL-01, IMP-02).
- [ ] Escala tipográfica y pesos de §5.2 (TIP-02, TIP-10).
- [ ] Espaciados dentro de la escala (LAY-03); contenedores 80 rem / 56 rem (LAY-01).
- [ ] Radios y sombras pertenecen a las escalas (FRM-01/02).
- [ ] Alternancia de fondos y patrones de sección (IDV-04/05).

**Componentes**
- [ ] Cada componente sigue su receta y tiene hover/foco/activo (CMP-*, CMP-STATES).
- [ ] Formulario con estados de error/éxito accesibles y validación activa (A11-07).

**Responsive**
- [ ] Sin desbordamiento horizontal a 320/375/768/1024/1440 px (RSP-04).
- [ ] Navegación móvil operativa y cerrable con `Esc` (RSP-03, A11-06).
- [ ] Contenido apilado, no oculto (RSP-05).

**Accesibilidad**
- [ ] Contraste AA en ambos temas (si hay dos) (COL-11).
- [ ] Skip-link, foco visible y teclado (A11-01/02/06).
- [ ] Jerarquía de encabezados correcta (A11-03).
- [ ] Imágenes con nombre accesible; iconos decorativos ocultos (IMG-05, A11-09).
- [ ] `prefers-reduced-motion` respetado (MOT-02).

**Calidad**
- [ ] Sin Tailwind CDN en producción (IMP-04); sin estilos duplicados o contradictorios (IMP-05).
- [ ] Defectos de §3.2 no replicados.
- [ ] Informe final entregado (REDESIGN_WORKFLOW.md).

---

## 15. Instrucciones finales para el agente de IA

1. **Lee todo este documento antes de modificar nada.** Si dispones de los archivos complementarios, úsalos para detalle; este archivo prevalece en caso de discrepancia.
2. **Inspecciona el sitio destino primero** (contenido, recursos, tecnología, funcionalidad, colores de marca). No cambies nada hasta completar el inventario.
3. **Respeta la jerarquía RED-01.** Funcionalidad y contenido por encima de estética.
4. **Trabaja con tokens.** Define el sistema de tokens adaptado a la marca del destino (COL-08/09) antes de tocar componentes.
5. **Reutiliza los recursos del destino.** Si una imagen no encaja, ajusta el contenedor, el recorte o la proporción; no la sustituyas.
6. **No inventes.** Si el destino no tiene testimonios, cifras, logotipos o FAQ, no los añadas. Si falta un dato, señálalo.
7. **Distingue lo extraído de lo recomendado.** Las reglas `[E]` son patrones observados; las `[B]` y `[A]` requieren criterio y deben indicarse en el informe cuando las apliques.
8. **No copies los defectos de §3.2.** Corrígelos con la regla indicada.
9. **Verifica antes de entregar:** recorre §14, ejecuta las validaciones de las reglas `OBL`, y pruébalo a 320/375/768/1024/1440 px, con teclado y con movimiento reducido.
10. **Entrega un informe** con: qué se conservó, qué se modificó, qué reglas `[B]/[A]` se aplicaron, qué incumplimientos o dudas quedan y por qué. Si una regla no pudo aplicarse sin romper contenido o funcionalidad, **no la apliques** y explícalo.
11. **Si algo es ambiguo, elige la opción que conserve más del sitio original** y documenta la decisión.
12. **Nunca modifiques el ZIP de referencia.**
