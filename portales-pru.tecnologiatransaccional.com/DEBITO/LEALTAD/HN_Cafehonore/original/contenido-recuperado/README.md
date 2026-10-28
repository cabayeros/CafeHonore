# Fuente de contenido del portal PHP

Respuestas públicas recuperadas del servidor original el 28 de octubre de 2026. Se conservan aquí sin editar para comparar la migración. No contienen código PHP de servidor, contraseñas ni sesiones privadas.

Base: `https://portales-pru.tecnologiatransaccional.com/DEBITO/LEALTAD/HN_Cafehonore/`

| Archivo | Petición original |
| --- | --- |
| acerca.html | POST acerca.php, page=# |
| politicas.html | POST politicas.php, page=# |
| condiciones.html | POST condiciones.php, page=# |
| establecimientos.html | POST establecimientos.php, page=# |
| contacto.html | POST contacto.php, page=# |
| cuenta.html | POST cuenta.php, page=# |
| politicas-gift.html | POST display/tabs.php, t1=0 |
| politicas-plus.html | POST display/tabs.php, t2=0 |
| politicas-corporativa.html | POST display/tabs.php, t3=0 |

`manifest.json` identifica cada respuesta con SHA-256. `assets.json` enumera sus imágenes. Los recursos que faltaban se recuperaron en `../../angular-portal/public/assets/img/` con sus nombres originales.

`../herramientas/exportar-contenido.mjs` prepara el contenido informativo para Angular: conserva textos, encabezados, listas, imágenes y enlaces; retira scripts PHP/AJAX del cliente, estilos inline y eventos inline. También genera la referencia de integridad independiente de la aplicación. Las pestañas se implementan con Angular. Las rutas de imágenes se ajustan al directorio público. El enlace relativo `www.cafehonore.hn` de Condiciones se convierte a `http://www.cafehonore.hn` para conservar su destino al navegar.

Los formularios se implementan como formularios reactivos, conservando nombres de campos, etiquetas, placeholders y límites. El código original no implementaba persistencia para “Recordar contraseña”; no se almacenan contraseñas en el navegador. Se conserva la opción visual. El envío y la autenticación requieren una integración real de servidor y no se simulan.

La versión 3.1.53 del encabezado, las fechas, los 23 años de experiencia, los importes y las restricciones son datos del portal recuperado. No se actualizan ni se corrigen editorialmente durante un cambio de diseño.

Desde la carpeta Angular, `npm.cmd run verify:content` compara la representación migrada con su referencia de integridad y comprueba los archivos de imagen. Se ejecuta antes de las compilaciones npm sin leer este archivo histórico. Si se cambia contenido por autorización del propietario, se debe conservar una nueva fuente y volver a revisar la comparación; no resumir ni sustituir información para resolver un fallo de verificación.
