---
name: cierre
description: Cierra la sesión de trabajo en loomware-page. Usar al terminar de trabajar, antes de cerrar la terminal.
---

# Cierre de sesión

Deja todo el trabajo de la sesión commiteado, empujado y, si está listo, en un PR hacia `main`.

1. **Commit.** `git status` limpio: todo cambio de la sesión commiteado en la rama personal, con
   mensaje en español, imperativo, una línea de resumen. Agrupa por intención, no un solo commit
   con todo.
2. **Pruebas y build.** `npm test` y `npm run build` sin errores. Si algo falla, arregla o
   revierte antes de empujar.
3. **Push.** `git push origin <rama>`. Cloudflare publicará el preview en
   `https://<rama>.loomware-page.pages.dev`.
4. **PR.** Pregunta si lo empujado está listo para producción.
   - Sí y no hay PR abierto de la rama → `gh pr create --base main` con título en español y
     cuerpo que diga qué cambia y cómo revisarlo en el preview.
   - Sí y ya hay PR → no crees otro; el push ya lo actualizó.
   - No → nada más el push.
5. **Reporte.** Termina cuando el push quedó en `origin` y el usuario tiene: la URL del preview,
   el enlace del PR (si hay) y una lista de lo que quedó pendiente. Esa lista pégala como
   comentario en el PR (`gh pr comment`) para que `/inicio` la encuentre en la siguiente sesión.
