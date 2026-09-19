---
description: Cierra la sesión — build, commit, push y, si está listo, abre el Pull Request a main
---

Cierra el trabajo de la sesión dejándolo publicado en el preview y, si procede, propuesto a producción. Sigue el orden y detente en cuanto algo falle, explicando qué pasó:

1. **Confirma la rama.** `git branch --show-current`.
   - Si es `main`, **detente**: está protegida y el push será rechazado. Pregunta a qué rama mover el trabajo.

2. **Revisa qué cambió.** `git status --short` y `git diff`.
   - Si no hay nada que guardar, dilo y salta al paso 6 para reportar el estado.
   - Verifica que no se cuele nada que no deba versionarse: `.env`, tokens, contraseñas, `dist/`, `node_modules/`.

3. **Verifica que compila.** `npm run build`.
   - Si falla, **no hagas commit**: muestra el error y arréglalo o pregunta.

4. **Haz el commit.** Mensaje en español, en imperativo, una línea de resumen (más cuerpo si hace falta), siguiendo el estilo del historial: `git log --oneline -5`.
   - Agrega la línea de atribución que indique el sistema, si hay una.

5. **Sube a la rama.** `git push`. Menciona que el preview tarda un par de minutos:
   `https://<rama>.loomware-page.pages.dev`

6. **Ofrece el Pull Request.** Pregunta si el trabajo ya está listo para producción.
   - Si la respuesta es sí: `gh pr create --base main --title "<resumen>" --body "<qué cambió, por qué, y el enlace al preview>"`.
     Si `gh` no está disponible o no hay sesión iniciada, da la URL para abrirlo a mano:
     `https://github.com/myxomatos/loomware-page/compare/main...<rama>?expand=1`
   - Si la respuesta es no, no abras nada: el push a la rama ya deja el preview para revisar.
   - Recuerda que quien aprueba y mezcla es Aldo.

7. **Cierra con un resumen corto**: qué se hizo, dónde verlo (preview) y qué quedó pendiente.
