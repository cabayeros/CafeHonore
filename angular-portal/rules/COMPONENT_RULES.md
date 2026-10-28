# COMPONENT_RULES.md — Especificación de componentes

> Complemento de `DESIGN_RULES.md` §7. Amplía anatomía, medidas, estados, accesibilidad y adaptación. No repite las recetas mínimas de ese apartado ni las contradice; si hay discrepancia, prevalece `DESIGN_RULES.md`.
> Etiquetas: `[E]` extraído · `[B]` recomendación · `[A]` adaptable. Valores en px; la equivalencia Tailwind aparece entre paréntesis cuando ayuda.
> Referencias: `HTML:NNN` (`index.html`), `JS:NNN` (`app.js`), `CSS` (`styles.css`).
> **Aplicar solo los componentes para los que el destino tiene contenido real.**

---

## CMP-HDR — Header y navegación de escritorio

**Propósito.** Orientación y acceso permanente al CTA. `HTML:42-130`.

**Anatomía `[E]`.** Barra fija → contenedor (80 rem, `px 16/24/48`, alto 64) → [logo] [nav] [acciones].

| Parte | Medidas y estilo |
|---|---|
| Barra | `position:fixed; top:0; width:100%; z-index:50`; fondo `surface-container-lowest` al 90 % + `backdrop-filter: blur(12px)` (`backdrop-blur-md`); borde inferior `outline-variant` 20 %; sombra `0 1px 8px rgba(6,78,59,.04)`; `padding-top: env(safe-area-inset-top)` |
| Logo | Tile 40×40, `rounded-xl` (16), fondo `primary`, icono 20 px blanco; nombre 16 px (`sm`: 18/24) 700, `tracking-tight`, no se parte (`nowrap`); gap 10 (`sm`: 8); al hover del grupo el tile `scale(1.05)` |
| Nav desktop | Visible ≥ 1024. Enlaces 14/20, color `on-surface-variant`, `px 12, py 6`, `rounded-lg` (12), gap 4 (`xl`: 8) |
| Enlace activo (scrollspy) | Fondo `primary`, texto `on-primary`, peso 600 |
| Controles | Botón de 40×40 (idioma: altura 40, `px 10–12`), `rounded-xl`, fondo `surface-container-high`, borde `outline-variant` 30 %, `shadow-sm`, `active: scale(.95)`; hover `surface-container-highest` |
| CTA | `px 16, py 8`, `rounded-lg`, `primary`, 14/20 (`sm`: label-lg) 600; hover `primary-container`; oculto < 640 |

**Estados `[E]`.** Hover: texto → `primary`, 200 ms. Foco: contorno global. Activo: `scale(.95)`. Seleccionado: fondo `primary`.
**Adaptación `[A]`.** Conservar los enlaces, orden y destinos del menú original. Si el destino tiene submenús, usar el panel de la guía `CMP-DROP` (más abajo). No añadir idioma/tema salvo que existan.
**Accesibilidad `[B]`.** `<nav aria-label>`, `aria-current="location"` en el activo, controles de ≥ 44 px, `title` y `aria-label` actualizados al conmutar.
**Antipatrones.** Header transparente sin fondo (pierde contraste); más de 7 enlaces visibles en escritorio (usar «Más»).

---

## CMP-NAVM — Navegación móvil

`HTML:85-129`, `CSS` (`.mobile-navigation`, `.mobile-nav-panel`), `JS:625-667`. **`[E]`**

- Mecanismo: `<details class="mobile-navigation lg:hidden">` + `<summary>` con iconos «menu»/«close» (intercambio por `[open]`).
- Botón: 40×40 (`sm`: 44×44), `rounded-lg`, fondo `surface-container-high`, borde 30 %, icono `primary`.
- Panel: `position: fixed` a `top:64`, ancho completo (`sm`: `absolute`), fondo `#fff`, `padding 20`, columna con `gap 8`, `max-height: calc(100vh − 4.5rem − safe-area)`, `overflow-y: auto`, `box-shadow: 0 20px 25px -5px rgba(0,0,0,.15)`.
- Filas: 16/24 (`text-base`), `px 16, py 10`, `rounded-xl` (16), peso 500, hover fondo `surface-container-low`; activo: fondo `primary/10`, texto `primary`, peso 700.
- Separadores entre bloques: `border-top` `outline-variant` 20 %.
- Backdrop: `position: fixed; inset: 64px 0 0 0; background: rgba(0,0,0,.6) + blur(4px); z-index: 40`.
- CTA final a ancho completo (solo < 640): `py 12`, `rounded-xl`, `primary`, 16/24 600.
- Cierre: clic en enlace, en backdrop, fuera del menú, tecla `Esc`, y cambio a ≥ 1024.

**Estados `[E]`.** Abierto/cerrado por el atributo nativo `open`. **`[B]`** Devolver el foco al `summary` al cerrar con `Esc`; `aria-expanded` lo gestiona `<details>` en la mayoría de lectores, verificar.
**Adaptación `[A]`.** Si el destino ya tiene menú móvil funcional (hamburguesa, off-canvas), **conservar su mecanismo** y aplicar solo el estilo (medidas, colores, radios).

---

## CMP-HERO — Hero

`HTML:137-216`. **`[E]`**

| Aspecto | Valor |
|---|---|
| Sección | `position: relative; overflow: hidden`, fondo `surface`, padding vertical 48 / 80 / 128 |
| Decoración | 2 círculos difuminados absolutos: 384×384 (`-top-40 -right-40`, `primary` 10 %) y 320×320 (`top-1/2 -left-20`, `secondary` 10 %); `blur-3xl`; `pointer-events: none` |
| Grid | 1 col; desde 1024: 12 col, `gap 40 / 48`, `align-items:center`; texto 7 col, visual 5 col; contenido sobre blobs con `z-index:10` |
| Columna de texto | Columna `align-items:flex-start`, `gap 16 / 24`; H1 → párrafo (`max-w 36rem`, 16/18 px, `leading-relaxed`) → botones → KPI |
| Botones | Contenedor `flex-col sm:flex-row`, `gap 12 / 16`; en < 640 cada botón a ancho completo y centrado |
| KPI | Rejilla de 3, `gap 12 / 32`, `padding-top 24`, `border-top` 30 %; número 20/24/30 700 `primary-container`; etiqueta 11/12 `on-surface-variant` |
| Panel visual | `rounded-2xl`, `overflow: hidden`, `shadow-2xl`, fondo `surface-container`, `padding 16/24`, borde `surface-container-highest`; velo `linear-gradient(to top right, primary 20%, transparent, transparent)` |
| Cabecera del panel | 3 puntos de 12 px (`error`, `secondary`, `primary`) + etiqueta 11–12 px en mayúsculas, `tracking-wider`, `truncate` |
| Filas del panel | Tarjetas `surface-container-lowest`, `rounded-xl`, `padding 12/16`, `shadow-sm`; icono en tile 36/40 `rounded-lg` (`primary-container` 10 %) + 2 líneas (título 14/16 600; subtítulo 11/12) + chip o valor a la derecha; `gap 12`, `min-w-0` + `truncate` |
| Franja de imagen | Alto 112 (`sm`: 128), `rounded-xl`, `shadow-inner`, `bg-cover bg-center`; velo `primary/20` + `blur(2px)` con texto centrado 14 (`sm`: 20) 700 blanco |

**Adaptación `[A]`.**
- El **H1, el párrafo y los CTA son del destino**; solo cambian estilo y disposición.
- El panel visual es una **ranura para el recurso gráfico principal del destino** (foto, captura de producto, ilustración). No reproducir el «dashboard» ficticio ni sus textos. Si el destino no tiene imagen, usar hero de una columna (texto) sin panel.
- Si el destino tiene un slider/vídeo de fondo, conservarlo y aplicar tipografía/CTA.
- KPI solo si existen cifras reales.
**Accesibilidad `[B]`.** Un único `<h1>`; el panel decorativo `aria-hidden` si su contenido es ilustrativo.
**Antipatrones.** H1 con más de un fragmento resaltado; texto sobre imagen sin velo; blobs en otras secciones.

---

## CMP-BTN — Botones

`[E]` salvo indicación.

| Variante | Medidas | Colores | Tipografía | Otros |
|---|---|---|---|---|
| Primario grande (hero) | `px 24` (`sm`: 40), `py 12`, `rounded-lg` | `primary` / `on-primary`; hover `primary-container` | familia titular 16/24 600 | `shadow-md` tintada `primary` 20 %; `transition-all`; centrado de texto |
| Secundario grande | igual | `surface-container-high` / `on-surface`; hover `-highest`; borde transparente | ídem | sin sombra |
| Primario compacto | `px 20, py 10`, `rounded-lg`, `inline-flex` centrado, `min-height 44` | `primary`; hover `primary-container` | label-lg 14/20 600 | `transition-colors` |
| CTA header | `px 16, py 8` | `primary` | 14/20 600 | `shadow-sm`; oculto < 640 |
| CTA de franja | `px 24, py 12` | `primary` | titular 16/24 600 | ancho completo en móvil, `nowrap`, `flex-shrink:0` |
| Envío de formulario | ancho completo, `py 14` (`sm`: 16), `rounded-xl` | `primary` | 16/24 700 | `shadow-md`; `active: scale(.99)` |
| Botón de icono | 40×40 `rounded-xl` | `surface-container-high`; borde 30 %; `shadow-sm` | — | `active: scale(.95)` |
| Enlace con flecha | texto 16/24 600 `primary`; icono 18 px a la derecha | hover → `secondary` | — | flecha `translateX(4px)` al hover del grupo |

**Estados.** Hover: ver tabla. Foco: contorno global 3 px. Activo: escala. **`[B]`** Deshabilitado: opacidad .5, `cursor:not-allowed`, sin hover/escala, `disabled`/`aria-disabled`. Carga: spinner + `aria-busy`, texto «Enviando…», bloqueo de segundo envío.
**Reglas `[E]`.** Por vista, un solo botón primario sólido dominante por bloque; el secundario es tonal, no un contorno. Texto de botón: verbo de acción, sin mayúsculas forzadas.
**Adaptación `[A]`.** Conservar el texto, destino (`href`) y atributos (`type`, `name`, `data-*`) del botón original.

---

## CMP-CHIP — Chips, badges y etiquetas

| Variante | Estilo `[E]` |
|---|---|
| Chip de estado («Seguro») | `rounded-full`, `px 10, py 4`, 11 px 600; `secondary-container` / `on-secondary-container` |
| Chip de módulo («Módulo 01») | `rounded-full`, `px 12, py 4`, 12 (`sm`: 14) 600; `surface-container-high` / `primary` |
| Badge de check | 32×32 círculo, `secondary-container`, icono «check» 18 px |
| Etiqueta de pilar | 11/14 600 MAYÚSCULAS `tracking-widest`, `primary` al 70 %, a la derecha de un número de 24 px 700 `primary` |
| Etiqueta de suite | 12 px 700 MAYÚSCULAS `tracking-wider`, `secondary` |

**`[B]`** Contraste: el chip de estado (4,55:1) está en el límite; no reducir su tamaño de texto por debajo de 11 px ni aclarar su fondo.

---

## CMP-CARD — Tarjetas

`[E]`

| Variante | Fondo / borde | Radio / sombra | Relleno | Uso |
|---|---|---|---|---|
| Elevada | `surface-container-lowest`; borde `surface-container-highest` | 20 → 24 / `shadow-xl` | 24 / 32 / 48 | Servicios, formulario |
| Tonal | `surface-container-low`; borde transparente | 20 → 24 / ninguna | 24 / 32 / 48 | Testimonios |
| Compacta de lista | `surface-container-lowest`; borde transparente | 16 / `shadow-sm` | 14 / 16 | Ventajas |
| Acordeón | `surface-container-low`; borde transparente | 16 → 20 / ninguna | 16 / 24 | FAQ |
| Tile de logotipo | `surface-container-low`; borde transparente | 16 / ninguna | 12–20 | Clientes |

**Estructura interna típica.** [cabecera: tile de icono + chip] → [título] → [texto] → [pie con `border-top` 20 %, `padding-top 20/24`, `margin-top 24`]. Pie: dato clave (14, 600, `primary`) a la izquierda y CTA a la derecha (columna en móvil).
**Reglas.** No anidar tarjetas con sombra dentro de tarjetas con sombra (excepción: panel del hero). Tarjetas hermanas = misma altura (`flex-col justify-between`). Texto largo: `max-width 42rem`.
**Adaptación `[A]`.** El contenido de cada tarjeta es del destino; si no tiene icono, omitir el tile (no usar iconos genéricos); si no tiene chip/etiqueta, omitirlo.

---

## CMP-EDIT — Bloque editorial sin tarjetas

`HTML:386-468`. **`[E]`**

- Contenedor: grid 1 col → 3 col desde 768; `border-top` y `border-bottom` `outline-variant` 30 %; móvil: `divide-y`; ≥ 768: `divide-x`.
- Columna: `padding-y 32 / 40 / 48`; internas con `padding-right` en la 1.ª (32/48), `padding-x` en la 2.ª, `padding-left` en la 3.ª.
- Contenido por columna: fila [etiqueta 15–16 px 700 MAYÚSCULAS `tracking-widest` `primary`] + [subetiqueta 12 px 700 `secondary`]; H3 18/24 700; métrica (número 24–32 px 700 `primary` + unidad 12 px mayúsculas `on-surface-variant`, `baseline`); párrafo 14/20; lista de 2 ítems con icono «check_circle» 18 px `secondary`, 14/12 px, separada por `border-top` 20 %.
- Franja CTA inferior: `margin-top 40/56`, `padding-top 32`, `border-top` 20 %; [tile 40 `rounded-xl` + título 16/24 600 + texto 12/14] a la izquierda; botón a la derecha.

**Cuándo usar `[B]`.** 3 ofertas comparables con atributos paralelos y pocos elementos. Para más de 3 usar tarjetas tonales.
**Adaptación `[A]`.** Métricas solo con datos reales del destino.

---

## CMP-DECK — Recorrido de servicios por scroll (opcional)

`HTML:303-372`, `CSS` (`.services-*`, `.service-card`), `JS:525-622`. **`[E]`**

**Cuándo usar `[B]`.** 2–5 módulos homogéneos, contenido breve por tarjeta (≤ ~60 palabras), página de escritorio. Si no cumple, usar rejilla estática.

**Estructura.**
```
<section class="services-scroll-section">          ← altura calculada por JS
  <div class="max-w-7xl … services-sticky-stage">  ← sticky, top 4rem
    <cabecera de sección>
    <div class="services-deck max-w-4xl" id="services-deck">
      <article class="service-card absolute inset-0 …"> … </article> × n
```

**Parámetros (escritorio ≥ 1024) `[E]`.**
- Altura de la sección: `(100vh − 64px) + (n − 1) × 100vh`.
- Escenario: `position: sticky; top: 4rem; min-height: calc(100vh − 4rem)`; centrado vertical; padding vertical `clamp(24px, 4vh, 56px)`.
- Mazo: `height: clamp(340px, 50vh, 460px)`; `perspective: 1200px`.
- Progreso: `progress = clamp(−rect.top / (section.offsetHeight − stage.offsetHeight) × (n − 1), 0, n − 1)`; tarjeta activa = `floor(progress + 0.001)`.
- Tarjetas pasadas (`relative < −0.02`), con `d = min(1, |relative|)`: `translate3d(−112% × d, 0, 0) scale(1 − 0.05·d)`, `opacity = max(0, 1 − 2d)`, `z-index = n − i`, `pointer-events: none`.
- Tarjetas actual/siguientes, con `depth = max(0, relative)`: `translate3d(0, min(40px, depth·16px), 0) scale(max(.88, 1 − .035·depth))`, `opacity = max(.38, 1 − .16·depth)`, `z-index = n − round(depth)`; `pointer-events: auto` solo en la activa.
- Transición CSS de tarjeta: `transform, opacity 220 ms ease-out` (resolver el conflicto con `duration-300`: IMP-05).
- Rendimiento: `will-change: transform, opacity`; escucha de `scroll` con `passive`; una actualización por frame (`rAF`).

**Alternativa estática `[E]` (< 1024 px o `prefers-reduced-motion: reduce`).**
`section` con altura automática y padding 64 (móvil 48); escenario no fijo; mazo `display:flex; flex-direction:column; gap: 20px`; tarjetas `position: relative`, sin `transform`/`opacity` forzados, `padding: clamp(20px, 4vw, 32px)`, título `clamp(1.25rem, 4vw, 1.75rem)`; pie con `flex-wrap`.

**Accesibilidad `[E]`.** Las tarjetas inactivas llevan `aria-hidden="true"` y sus controles `tabindex="-1"` (se restauran desde `data-original-tabindex`). Enlaces de tarjeta con `min-height: 44px`.
**Riesgos `[B]`.** (1) Añade ~(n−1)×100vh de scroll: avisar al propietario. (2) `overflow-x:hidden` en `html` y `body` puede anular `sticky` (IMP-07): probar. (3) Contenido que desborde la tarjeta usa `overflow:auto` interno, que dificulta la lectura: mantener texto corto. (4) El scrollspy y los anclajes deben seguir apuntando al inicio de la sección.
**Prohibido.** Aplicarlo a contenido largo, con formularios, tablas o a más de 5 elementos.

---

## CMP-STAT — Estadísticas y KPI

`[E]`

- **Fila de 3 en hero:** `grid-cols-3`, `gap 12 / 32`; separada por `border-top` 30 %; número `text-xl sm:2xl lg:3xl` 700 `primary-container`; etiqueta 11/12 `on-surface-variant`, `margin-top 2`.
- **Fila con separadores (Nosotros):** `flex`, `justify-between` en móvil (`gap 16/24` en `sm`); separadores `1×32px` `outline-variant` 30 %; número 20/24/28 700; el último puede usar `secondary`.
- **Métrica de solución:** número 24 (`sm`: 32) 700 `primary` + unidad `baseline` 12 px mayúsculas `tracking-wider`.
**`[B]`** Texto de etiqueta ≥ 12 px; no animar cuenta de números.
**`[A]`** Solo cifras reales y verificables del destino; mantener unidades y símbolos originales.

---

## CMP-LOGO — Logotipos de clientes

`HTML:498-517`. **`[E]`**

- Rejilla: 2 col (< 640) → 3 col (`sm`) → 6 col (`lg`), `gap 12 / 16 / 24`, `margin-bottom 48 / 80`.
- Tile: fondo `surface-container-low`, `rounded-xl`, alto 64 / 80 / 96, centrado, color `on-surface-variant`, hover `primary` 200 ms.
**`[A]`** El destino aporta sus logotipos. Normalización `[B]`: misma altura visual (≈ 28–36 px), `object-fit: contain`, monocromo vía `filter: grayscale(1) opacity(.7)` **solo** si la marca de terceros lo permite; color pleno al hover.
**Excepción.** Menos de 4 logotipos: fila centrada `flex` sin tiles fijos.

---

## CMP-TEST — Testimonios

`HTML:519-615`. **`[E]`**

- Rejilla 1 col → 2 col (`lg`), `gap 24 / 32`.
- Tarjeta tonal (CMP-CARD), `flex-col justify-between`.
- Valoración: 5 estrellas «star» 20 px, `FILL 1`, `secondary`, `gap 4`, `margin-bottom 16/24`.
- Cita: 16 (`sm`: 18) 500 `on-surface`, `leading-relaxed`, `margin-bottom 24`.
- Pie: `border-top` 30 %, `padding-top 24`, avatar 48 px círculo `primary` con iniciales (titular 16 700), nombre 600, cargo 12–14 px `on-surface-variant`; ambos `truncate` con `min-w-0`.
**`[A]`** Solo testimonios reales; si el destino tiene foto, usarla en el avatar (`object-fit: cover`); si no tiene valoración en estrellas, **omitir** la fila de estrellas. **`[B]`** Marcar con `<blockquote>` y `<cite>`/`<figcaption>`; las estrellas decorativas con `aria-hidden` y un texto «5 de 5» oculto visualmente.

---

## CMP-FEAT — Lista de ventajas + imagen

`HTML:618-667`. **`[E]`**

- Grid 12 col, 6/6 desde 1024, `gap 40 / 48`, `align-items:center`; en móvil la imagen queda debajo del texto.
- Lista: `space-y 14/16`; fila = tarjeta compacta (`flex`, `gap 14/16`, `padding 14/16`, `rounded-xl`, `shadow-sm`) con badge de check 32 px (alineado con `mt 2`) + título (14, `sm`: 16) 600 + texto (12, `sm`: 14) `on-surface-variant`.
- Imagen: alto 280 / 380 / 500, `rounded-2xl`→`3xl`, `shadow-2xl`, borde transparente; velo `to top` `primary` 90 % → 30 % → transparente; pie con `padding 20/32`, título 18/20 700 blanco y texto 12/14 `primary-fixed-dim`.
**`[B]`** Contraste del texto 12 px sobre el velo: verificar sobre la zona más clara; si falla, subir opacidad del velo a 95 %.
**`[A]`** Imagen y textos del destino; si la imagen no tiene proporción horizontal, recortar con `object-position` o usar `aspect-ratio`.

---

## CMP-FAQ — Acordeón

`HTML:670-718`. **`[E]`**

- Contenedor 56 rem, cabecera centrada (eyebrow + H2 + lead 16/18 `max-w 42rem`), lista `space-y 14/16`.
- `<details class="group">` como tarjeta tonal. `<summary>`: `display:flex; justify-content:space-between; gap:16; list-style:none; cursor:pointer; user-select:none`, pregunta 16 (`sm`: 18/24) 600 titular; chevron «expand_more» `primary`, `transition: transform 300ms`, `group-open: rotate(180deg)`.
- Respuesta: `margin-top 16`, `padding-top 16`, `border-top` 20 %, 14/20 `on-surface-variant`, `leading-relaxed`.
**Estados `[E]/[B]`.** Cerrado/abierto nativo; foco global; **`[B]`** hover del `summary`: fondo ligeramente más oscuro (`surface-container`); al abrir uno no cerrar otros (la referencia no lo hace).
**`[A]`** Conservar las preguntas/respuestas y su orden; si el destino usa JS propio para el acordeón, mantenerlo y aplicar los estilos.

---

## CMP-FORM — Formulario

`HTML:731-770`, `JS:670-686`. **`[E]` salvo indicación.**

**Contenedor.** Tarjeta elevada (CMP-CARD) dentro de 56 rem; relleno 20 / 32 / 64; cabecera centrada (eyebrow + H2 + lead).
**Layout.** `space-y 16/24`; pares en `grid md:grid-cols-2 gap 16/24`; textarea y consentimiento a ancho completo.
**Etiqueta.** `display:block`, 14 px 600, `on-surface` (oscuro `slate-200`), `margin-bottom 8`, asociada con `for`. Obligatorio: «*» al final del texto.
**Input / textarea.** `width:100%`, `px 16, py 12`, `rounded-xl`, fondo `surface-container-low`, borde 1 px `outline-variant` 50 %, texto 14 (`sm`: 14/20) `on-surface`, placeholder `outline` 70 %. Textarea `rows=4`.
**Foco `[E]`.** `outline:none; border-color: primary; box-shadow: 0 0 0 2px primary/20` (oscuro: `emerald-400`). **`[B]`** Añadir además `outline: 2px solid` con ≥ 3:1 (el anillo al 20 % es insuficiente por sí solo).
**Consentimiento.** Casilla 16×16 `rounded` (4), `margin-top 4`; etiqueta 12 px `on-surface-variant`, `leading-relaxed`, con enlace subrayado `primary` 500.
**Botón.** Ver CMP-BTN (envío).
**Región de estado.** `<p class="sr-only" role="status" aria-live="polite">`.

**Estados `[B]` (no existen en la referencia).**

| Estado | Especificación |
|---|---|
| Error por campo | Borde `error`; texto de ayuda 12–14 px `error` bajo el campo con icono; `aria-invalid="true"`; `aria-describedby` al mensaje; resumen opcional arriba con foco |
| Éxito | Mensaje en `role="status"` con fondo `secondary-container`/texto `on-secondary-container`, `rounded-xl`, `padding 16`; conservar los datos si el envío falló |
| Carga | Botón con spinner y «Enviando…», `aria-busy="true"`, campos bloqueados |
| Deshabilitado | Opacidad .5, `cursor:not-allowed` |
| Placeholder | Contraste ≥ 4,5:1 (no `outline/70`) |

**Defectos de la referencia a evitar.** `novalidate="false"` (desactiva la validación nativa), `alert()` como confirmación, `contactForm.reset()` sin comprobar la respuesta del servidor.
**`[A]`** Conservar **todos** los campos, `name`, `id`, `action`, `method`, tokens CSRF, atributos `data-*`, scripts de envío y validadores del destino. No añadir ni quitar campos. Si el destino tiene reCAPTCHA u otro widget, ubicarlo antes del botón sin cambiar su comportamiento.

---

## CMP-FOOT — Footer

`HTML:775-822`. **`[E]`**

- Fondo `surface-container-low` (oscuro `#080d14`), borde superior transparente (oscuro `white/10`), `padding-y 48` (`sm`: 40).
- Rejilla: 1 col → 2 col (`sm`) → 4 col (`md`), `gap 32` (`lg`: 40), `margin-bottom 32/40`; la columna de marca ocupa 2 col en `sm`.
- Marca: tile 32 `rounded-xl` + nombre 16/24 700; descripción 14/20 `on-surface-variant` `leading-relaxed`; iconos sociales 36×36 `rounded-lg`, 20 px, hover fondo `surface-container-high` + color `primary`.
- Columnas de enlaces: título 12 px 700 MAYÚSCULAS `tracking-wider`; enlaces 14/20 `on-surface-variant`, `padding-y 4`, hover `primary`.
- Subfooter: `border-top` 30 %, `padding-top 24`, texto centrado 12 px.
**`[B]`** Títulos como `<h2>`/`<h3>` con estilo visual idéntico; enlaces sociales con nombre accesible real (no «Compartir»); `href="#"` placeholders **no** deben conservarse: usar los enlaces reales del destino; año del copyright: el del destino (la referencia muestra «2024»).
**`[A]`** Conservar columnas, enlaces legales, datos de contacto y redes del destino; si tiene menos de 4 columnas, centrar o reducir la rejilla.

---

## CMP-SEC — Cabecera de sección

`[E]`

| Variante | Estructura | Medidas |
|---|---|---|
| Centrada | eyebrow + H2 + lead, `text-align:center`, `max-width 48rem` centrado | `margin-bottom 40 / 64` |
| Izquierda con acciones | `flex md:flex-row md:items-end justify-between`; izquierda eyebrow + H2; derecha ranura de acciones (vacía en la referencia: conservaba las flechas del carrusel anterior) | `margin-bottom 40 / 64`, `gap 16/24` |
| Dividida 7/5 | H2 grande (44/52) a la izquierda; lead + KPI a la derecha | `gap 32 / 64`, `margin-bottom 48 / 80` |
| Encabezado de bloque | H2 + lead en `max-w 48rem` | `margin-bottom 48 / 64` |

**Eyebrow:** 14/20, 600, MAYÚSCULAS, `tracking-wider`, `primary`, `display:block`, `margin-bottom 8`.

---

## CMP-DROP — Menú desplegable / submenús `[B]` (no existe en la referencia)

**Solo si el destino tiene submenús.** Panel `surface-container-lowest`, `rounded-xl`, `shadow-xl`, borde `outline-variant` 20 %, `padding 8`; ítems 14/20, `px 12, py 8`, `rounded-lg`, hover `surface-container-low`; apertura por clic/Enter/Espacio (no solo hover), `aria-expanded`, `Esc` cierra y devuelve foco; en móvil: acordeón dentro del panel de CMP-NAVM.

---

## CMP-STATES — Estados globales (resumen operativo)

| Estado | Visual | ARIA / comportamiento |
|---|---|---|
| Hover | Color/fondo 200 ms; sin cambios de layout | — |
| Foco visible | Contorno 3 px `#00714d` (oscuro `#10b981`), offset 3 | Nunca `outline:none` sin sustituto |
| Activo | `scale(.95)`/`scale(.99)` | — |
| Seleccionado/actual | Fondo `primary` + texto `on-primary` (nav) | `aria-current` |
| Deshabilitado `[B]` | Opacidad .5, sin eventos | `disabled`/`aria-disabled` |
| Error `[B]` | Borde y texto `error` + icono | `aria-invalid`, `aria-describedby` |
| Éxito `[B]` | `secondary-container` | `role="status"` |
| Carga `[B]` | Spinner, texto «…ando» | `aria-busy` |
| Selección de texto | Fondo `#00714d` / texto blanco | — |
| Barra de scroll `[E]` | Ancho 8 px, thumb `#bfc9c3` redondeado, track `surface` | — |

---

## Lista de verificación por componente

- [ ] Usa roles de color, no HEX (COL-01).
- [ ] Medidas, radios y sombras pertenecen a las escalas.
- [ ] Hover, foco y activo definidos; estados `[B]` aplicables presentes.
- [ ] Se comporta a 320–1440 px sin desbordar.
- [ ] Contenido, enlaces y atributos del destino intactos.
- [ ] Nombre accesible en iconos e imágenes.
