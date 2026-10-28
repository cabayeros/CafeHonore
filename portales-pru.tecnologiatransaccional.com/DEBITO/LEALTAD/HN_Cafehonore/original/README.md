# Portal histórico de Café Honoré

`sitio/` conserva los HTML, CSS, JavaScript, fuentes e imágenes descargados del portal PHP. El inicio original se encuentra en `sitio/index.html`. Los recursos compartidos se conservan en `img/` para mantener sus rutas relativas.

`contenido-recuperado/` contiene las respuestas públicas originales del servidor PHP y su manifiesto de hashes. No contiene el código de servidor, base de datos ni sesiones privadas. Algunos archivos de la descarga histórica son respuestas 404; se conservan sin sustituirlos.

`herramientas/exportar-contenido.mjs` prepara el contenido recuperado para Angular y genera la referencia de integridad. Es una herramienta de mantenimiento; no forma parte del arranque ni de la compilación habitual. Para ejecutarla, instalar primero las dependencias de `../angular-portal` y, desde esa carpeta, usar:

```powershell
node ../original/herramientas/exportar-contenido.mjs
npm.cmd run verify:content
```

El exportador conserva los textos y datos: solo adapta las rutas de imágenes, elimina scripts y eventos inline y prepara la estructura para Angular. No debe usarse para introducir resúmenes ni cambios editoriales.
