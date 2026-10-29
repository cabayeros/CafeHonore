# RESPONSIVE_RULES.md — Reglas de adaptación por dispositivo

> Complemento de `DESIGN_RULES.md` §9. Amplía la matriz por sección y los criterios de prueba. No contradice al principal.
> Etiquetas: `[E]` extraído · `[B]` recomendación/propuesta · `[A]` adaptable.

---

## 1. Estrategia `[E]`

- **Mobile-first.** Las utilidades base describen móvil; `sm:`, `md:`, `lg:` añaden. Uso medido en `index.html`: `sm:` 317, `lg:` 85, `md:` 28, `xl:` 1, `2xl:` 0.
- **Breakpoints extraídos del código:**

| Valor | Origen | Función |
|---|---|---|
| 640 px (`sm`) | Tailwind por defecto | Relleno y tipografía suben un escalón; CTA del header visible; botones en fila |
| 768 px (`md`) | Tailwind | Columnas de 3–4 (pilares, soluciones, footer), formulario en 2 col; divisores pasan a verticales |
| 1024 px (`lg`) | Tailwind + `@media (max-width:1023px)` + `matchMedia('(max-width: 1023px)')` | Navegación completa, grid 12 col, deck por scroll |
| 1280 px (`xl`) | Tailwind | Un único uso (`xl:gap-2` en el nav) |
| 767 px | `CSS` `@media (max-width:767px)` | Relleno del header a 16 px; padding de servicios a 48 px |

- **Contenedor máximo:** 1280 px; a partir de ahí solo crecen los márgenes laterales.
- **Sin breakpoints de tipografía fluida con `clamp` salvo** en el deck estático (título y relleno) y en el escenario sticky (`clamp(…vh…)`).
- **Propuestas `[B]`** (no extraídas): probar además 320 px (mínimo), 1440 px y 1920 px; si el destino tiene sus propios breakpoints, **conservarlos** y mapear (§5).

---

## 2. Reglas transversales

| ID | Regla | Origen |
|---|---|---|
| RSP-T01 | `<meta name="viewport" content="width=device-width, initial-scale=1">`; no bloquear el zoom (`user-scalable=no` prohibido) | `[E]` + `[B]` |
| RSP-T02 | Gutter horizontal: 16 px (< 640), 24 px (640–1023), 48 px (≥ 1024) | `[E]` |
| RSP-T03 | Ningún contenido por debajo de 12 px de tamaño real; 11 px solo en micro-etiquetas en mayúsculas | `[B]` |
| RSP-T04 | Objetivos táctiles ≥ 44×44 px en móvil (WCAG 2.2: mínimo 24×24) | `[E]/[B]` |
| RSP-T05 | Apilar en móvil; no ocultar contenido | `[E]` |
| RSP-T06 | Imágenes con `max-width:100%; height:auto`; contenedores con alto responsivo o `aspect-ratio` | `[E]` |
| RSP-T07 | Texto largo: `overflow-wrap: break-word`; en filas flex con `truncate`, `min-w-0` en el hijo | `[E]` |
| RSP-T08 | Safe-area: `padding-top: env(safe-area-inset-top, 0px)` en el header fijo; `viewport-fit=cover` si se usan insets laterales/inferiores | `[E]` (+ `[B]` meta) |
| RSP-T09 | Anclajes: `scroll-padding-top` 4,5–5 rem y `scroll-margin-top` en secciones para que el header fijo no las tape | `[E]` |
| RSP-T10 | Menús y paneles superpuestos: `max-height: calc(100vh − header)` con `overflow-y:auto` y `-webkit-overflow-scrolling: touch` | `[E]` |
| RSP-T11 | `html, body` sin scroll horizontal (ver IMP-07 sobre `overflow-x`) | `[E]/[B]` |
| RSP-T12 | Con teclado virtual abierto, el formulario sigue siendo utilizable (sin alturas `100vh` fijas dentro del formulario) | `[B]` |

---

## 3. Matriz por sección `[E]`

Legenda: «→» indica el cambio al subir de breakpoint. Los números son px.

| Sección | < 640 | 640–767 | 768–1023 | ≥ 1024 |
|---|---|---|---|---|
| **Header** | Logo + [idioma] [tema] [menú]; CTA oculto (está en el menú); relleno 16 | CTA visible; relleno 24 | Igual | Nav horizontal; menú móvil oculto; relleno 48 |
| **Menú móvil** | Panel `fixed`, ancho completo; CTA ancho completo dentro | Panel `absolute` (bajo el botón), sin CTA interno | Igual | Oculto (se cierra si estaba abierto) |
| **Hero** | 1 col; H1 30/36; botones apilados a ancho completo; KPI 3 col con texto 11; panel debajo del texto; padding 48 | H1 36/40; botones en fila; KPI `gap 32`; padding 80 | Igual | 12 col: 7/5; H1 48; padding 128; alineación vertical centrada |
| **Nosotros** | 1 col; H2 24; KPI en fila con `justify-between`; 3 pilares apilados con `border-top` | H2 30 | Pilares 3 col con `border-left` y relleno 32 | 7/5 con `gap 64`; H2 44/52; pilares con relleno 48 |
| **Servicios** | Tarjetas apiladas (`gap 20`), `padding clamp(20px,4vw,32px)`; sin sticky | Igual | Igual (estático) | Deck sticky con scroll |
| **Soluciones** | 3 columnas apiladas separadas por `divide-y`; padding 32 | Padding 40 | 3 col con `divide-x`, `px 32` | Relleno 48; H2 44/52 |
| **Clientes** | Logos 2 col (alto 64); testimonios 1 col; relleno 24 | Logos 3 col (alto 80); relleno 32 | Igual | Logos 6 col (alto 96); testimonios 2 col; relleno 48 |
| **Ventajas** | 1 col; imagen debajo (alto 280) | Imagen 380 | Igual | 6/6; imagen 500 |
| **FAQ** | Tarjetas `padding 16`, pregunta 16; `space-y 14` | `padding 24`, pregunta 18, `space-y 16` | Igual | Igual (contenedor 896) |
| **Contacto** | Contenedor `padding 20`; campos 1 col; botón `py 14` | `padding 32` | Campos 2 col | `padding 64` |
| **Footer** | 1 col | 2 col (marca ocupa 2) | 4 col | 4 col con `gap 40` |

---

## 4. Comportamientos específicos

### 4.1 Navegación
- **Cambio de modo a 1024 px** `[E]`: `lg:flex` / `lg:hidden`. El JS cierra el `<details>` si la ventana pasa a ≥ 1024 (`JS:661-667`).
- Escritorio con 1024–1279 px: gap del nav de 4 px (en `xl`: 8 px). **`[B]`** Si el destino tiene más de 7 enlaces, el cambio a menú móvil debe hacerse antes (p. ej. 1180 px) o agrupar enlaces en «Más».

### 4.2 Deck de servicios
- ≥ 1024 px y sin reducción de movimiento: deck interactivo. Al **cambiar de tamaño o preferencia en caliente**, se recalcula con `matchMedia` (`change`) y `resize` `[E]`.
- < 1024 px: lista vertical. Los textos de pie se envuelven (`flex-wrap`, `gap 16`).

### 4.3 Tipografía
- Titulares: ver escala (3 escalones). **No usar `vw`** para el tamaño base de titulares (la referencia solo usa `clamp` con `vw` en el título del deck estático).
- Cuerpo: 14–16 px en móvil, 16–18 px en lead desde `sm`.

### 4.4 Imágenes
- Alto del panel de imagen: 280 → 380 → 500 px. **`[B]`** Preferir `aspect-ratio` (p. ej. `4/3` en móvil, `4/5` o `1/1` en escritorio) para conservar el recorte del sujeto.
- Imagen del hero: se mantiene dentro del panel; en móvil queda debajo del texto, nunca superpuesta.

### 4.5 Formularios
- Campos a 1 col hasta 768; botón de envío a ancho completo en todos los tamaños; los campos tienen `font-size` ≥ 16 px en móvil `[B]` para evitar el zoom automático de iOS (la referencia usa 14 px: **subir a 16 px** en `< 640`).

### 4.6 Tablas y contenido ancho `[B]`
- Envolver en contenedor `overflow-x:auto` con `tabindex="0"` y `role="region"` + `aria-label`; cabecera de tabla fija solo si no interfiere con el header fijo del sitio.

---

## 5. Cómo adaptar a un sitio con otros breakpoints `[A]`

| Situación del destino | Acción |
|---|---|
| Usa los de Bootstrap (576/768/992/1200) | Mapear `sm→576`, `md→768`, `lg→992`; el cambio de navegación a 992 en lugar de 1024; mantener los comportamientos |
| Usa uno solo (p. ej. 768) | Aplicar «móvil» (< 768) y «escritorio» (≥ 768); el deck por scroll y la rejilla de 6 logotipos pasan a ≥ 1024 solo si hay ese ancho; si no, omitir deck |
| Sin media queries (maquetación fluida) | Introducir los tres breakpoints mínimos (640/768/1024) solo en los componentes rediseñados |
| Diseño adaptable por dispositivo (m. sitio separado) | No fusionar; aplicar el sistema a cada versión conservando su arquitectura |

**Regla `[A]`:** el cambio de breakpoint **nunca** debe eliminar contenido, solo reorganizarlo.

---

## 6. Prevención de problemas comunes `[B]`

| Problema | Prevención |
|---|---|
| Desbordamiento horizontal | `min-w-0` en hijos flex/grid; imágenes `max-width:100%`; `overflow-x:auto` en contenido ancho; evitar anchos fijos en `px` mayores que 320 − 2·16 = 288 px |
| Solapamiento de header fijo | `main { padding-top: 4rem }`; `scroll-margin-top` en anclajes |
| Texto ilegible sobre imagen | Velo degradado + comprobación de contraste en la zona más clara |
| CTA inalcanzable en móvil | CTA primario dentro del menú y al final del hero |
| Saltos de línea feos en titulares | `text-wrap: balance` en H1/H2 (mejora progresiva) |
| Doble scroll en paneles | `max-height` con `overflow-y:auto` solo en el panel superpuesto |
| `100vh` con barras dinámicas | Preferir `100dvh`/`svh` en alturas de pantalla completa; fallback a `vh` |

---

## 7. Protocolo de pruebas responsive `[B]`

Probar en **320, 375, 414, 768, 1024, 1280, 1440** px, vertical y horizontal en móvil.

1. Sin scroll horizontal: `document.documentElement.scrollWidth <= window.innerWidth`.
2. Ningún texto cortado, solapado ni inferior a 12 px (excepto micro-etiquetas permitidas).
3. Todos los controles ≥ 44 px o con separación suficiente.
4. Navegación: abrir/cerrar menú con toque, `Esc` y clic exterior; el foco se mantiene lógico.
5. Contenido: el texto visible a 1440 px existe a 375 px.
6. Imágenes: sin deformación; recorte conserva el sujeto.
7. Formularios: teclado virtual no tapa el campo activo; tipo de teclado correcto (`type=email`, `tel`).
8. Zoom 200 % y texto ampliado: sin pérdida de contenido (WCAG 1.4.4, 1.4.10 *reflow* a 320 px).
9. `prefers-reduced-motion`: sin efectos de scroll.
10. Orientación: sin dependencia de una sola orientación.

Registrar resultados y capturas en el informe final (`REDESIGN_WORKFLOW.md`).
