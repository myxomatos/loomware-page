# loomware-page

Sitio público de Loomware: <https://loomware.com.mx>. React + Vite, desplegado en Cloudflare Pages
(proyecto `loomware-page`). Estructura, scripts y variables: `README.md`.

## Ramas y despliegue

- `main` es producción y está protegida: solo recibe código por Pull Request aprobado por Aldo.
  Un push directo a `main` es rechazado por GitHub.
- Cada quien tiene su rama de trabajo permanente: **Alan → `alan`**, **Aldo → `aldo`**.
  Todo commit va a la rama del autor; nunca a la del otro.
- Cloudflare publica cada push a una rama en `https://<rama>.loomware-page.pages.dev`
  (p. ej. `https://alan.loomware-page.pages.dev`). Ese preview es la evidencia que acompaña al PR.
- Para llevar algo a producción: push a tu rama → `gh pr create --base main` → Aldo revisa el
  preview y mezcla. Después del merge, `git merge main` en tu rama para seguir al día.

## Reglas del proyecto

- El dominio es `loomware.com.mx`. `loomware.com` (sin `.mx`) es de un tercero; ninguna URL,
  correo ni metadato debe apuntar ahí.
- `/prospectar` es privada: fuera del menú, `noindex`, con contraseña. La Function
  `functions/api/denue` toma `DENUE_TOKEN` y `PROSPECT_KEY` de las variables de Cloudflare;
  el token del INEGI solo vive en el servidor y en `.env` local (ignorado por git).
- Textos en español de México; nombres de commit en español, imperativo, una línea de resumen.
- Antes de abrir un PR: `npm run build` sin errores y el sitio revisado en `npm run preview`.
