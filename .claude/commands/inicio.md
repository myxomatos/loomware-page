---
description: Abre la sesión — trae lo nuevo de main a la rama de trabajo y deja todo listo
---

Prepara la rama de trabajo para empezar a trabajar. Sigue estos pasos en orden y detente en cuanto algo falle, explicando qué pasó:

1. **Confirma la rama.** `git branch --show-current`.
   - Si es `main`, **detente**: `main` es producción y está protegida. Pregunta a qué rama de trabajo cambiar (`alan` o `aldo`) antes de seguir.
   - Si es la rama de otra persona, avisa y confirma antes de continuar.

2. **Revisa si hay trabajo sin guardar.** `git status --short`.
   - Si hay cambios, descríbelos y pregunta si guardarlos en un commit antes de traer lo nuevo. No los descartes nunca.

3. **Trae lo nuevo.** `git fetch origin --prune`, luego `git merge origin/main`.
   - Si hay conflictos, no adivines: lista los archivos en conflicto, explica en qué difieren y pregunta cómo resolverlos.

4. **Actualiza dependencias sólo si hace falta.** Si `git diff HEAD@{1} --name-only` incluye `package.json` o `package-lock.json`, corre `npm install`.

5. **Reporta en 3 o 4 líneas**: qué commits nuevos entraron desde la última vez, si hubo cambios en dependencias, y si la rama quedó al día con `main`.

Recuerda las reglas del proyecto en `CLAUDE.md` (dominio `loomware.com.mx`, textos en español de México, `/prospectar` es privada).
