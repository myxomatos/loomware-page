---
name: inicio
description: Arranca la sesión de trabajo en loomware-page. Usar al abrir el repo, antes de tocar código.
---

# Inicio de sesión

Deja la rama personal al día con producción y el entorno listo para `npm run dev`.

1. **Rama.** `git branch --show-current` debe ser la rama personal (`alan` o `aldo`). Si estás en
   `main` u otra, pregunta cuál es la rama personal y cámbiate a ella. Si hay cambios sin commit,
   guárdalos antes con `git stash` y restáuralos al final.
2. **Jalar.** `git fetch origin && git pull` (la rama personal) y después `git merge origin/main`
   para traer lo que ya entró a producción. Si el merge da conflicto, resuélvelo con el usuario
   antes de seguir; no dejes la rama a medio merge.
3. **Dependencias.** Si `package-lock.json` cambió con lo que llegó, corre `npm install`.
4. **Reporte.** Termina cuando la rama está al día con `origin/main` y `npm run build` pasa.
   Resume en cuatro líneas: commits que llegaron de `main`, PRs abiertos de la rama
   (`gh pr list --head <rama>`), si hubo `npm install`, y qué quedó pendiente en el último
   `/cierre` (busca el comentario más reciente del usuario en el PR, si existe).
