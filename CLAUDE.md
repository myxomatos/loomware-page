# loomware-page

Sitio público de Loomware: <https://loomware.com.mx>. React + Vite, desplegado en Cloudflare Pages
(proyecto `loomware-page`). Estructura, scripts y variables: `README.md`.

## Ramas y despliegue

- Sesión de trabajo: empieza con `/inicio` (jala `main` a tu rama) y termina con `/cierre`
  (commit, build, push y PR). Los dos skills viven en `.claude/skills/`.

- `main` es producción y está protegida: solo recibe código por Pull Request aprobado por Aldo.
  Un push directo a `main` es rechazado por GitHub.
- Cada quien tiene su rama de trabajo permanente: **Alan → `alan`**, **Aldo → `aldo`**.
  Todo commit va a la rama del autor; nunca a la del otro.
- Cloudflare publica cada push a una rama en `https://<rama>.loomware-page.pages.dev`
  (p. ej. `https://alan.loomware-page.pages.dev`). Ese preview es la evidencia que acompaña al PR.

### El enlace que se comparte

**<https://alan.loomware-page.pages.dev>** — ése, tal cual, sin nada después.

Siempre sirve el último push a la rama: el HTML va con `Cache-Control: max-age=0,
must-revalidate` y su ETag, así que el navegador está obligado a preguntarle al servidor en
cada carga. No hay una URL «nueva» y otra «vieja».

Si alguien jura estar viendo algo que ya se cambió, **no es el sitio: es su pestaña**, que
lleva rato abierta sin recargar. Se resuelve con **Ctrl + F5** (Cmd + Shift + R en Mac), o
abriendo el enlace en una ventana de incógnito. En celular, desde una pestaña nueva de
incógnito.

Durante la sesión del 22 de septiembre circularon enlaces con `?v=2`, `?v=3` y `?v=4`.
Sirven exactamente la misma página —se comprobó comparando el HTML byte por byte— y eran sólo
una forma de saltarse la caché. **No usarlos**: parecen versiones distintas del sitio y no lo
son. Lo mismo vale para los recorridos que se mandan por WhatsApp:
`https://alan.loomware-page.pages.dev/recorridos/<slug>`, sin parámetros.

Cuando el PR se mezcle, el enlace del equipo pasa a ser <https://loomware.com.mx>.
- Para llevar algo a producción: push a tu rama → `gh pr create --base main` → Aldo revisa el
  preview y mezcla. Después del merge, `git merge main` en tu rama para seguir al día.

## Reglas del proyecto

- El dominio es `loomware.com.mx`. `loomware.com` (sin `.mx`) es de un tercero; ninguna URL,
  correo ni metadato debe apuntar ahí.
- `/prospectar` es privada: fuera del menú, `noindex`, con contraseña. La Function
  `functions/api/denue` toma `DENUE_TOKEN` y `PROSPECT_KEY` de las variables de Cloudflare;
  el token del INEGI solo vive en el servidor y en `.env` local (ignorado por git).
  **Y la contraseña tampoco se escribe en ningún archivo del repositorio, ni siquiera como
  propuesta**: `myxomatos/loomware-page` es **público** —comprobado el 2026-09-24—, así que
  cualquier cosa escrita aquí queda publicada. Las dos se acuerdan por canal privado y viven
  nada más en Cloudflare.
- **Los casos de éxito viven en `#casos` de la portada y en ningún otro lado.** Se escriben
  en `src/data/casos.js` y los dibuja `src/components/Casos.jsx`; el pie enlaza a esa
  sección y nada más. **Ningún caso se cita, se resume, se enseña ni se insinúa en otra
  página** —ni en un recorrido, ni en una de servicio, ni en una de industria—, porque un
  cliente autoriza su nombre para lo que contrató, no para ilustrar otra cosa. Cuando entren
  más casos, entran ahí. Si una página necesita prueba y no la tiene, **eso se dice**; no se
  pide prestada.

  *Por qué está escrito:* el 2026-09-23 Claude anotó en los pendientes de Aldo que había que
  preguntarle a Eduardo Díaz si su caso también cubría el ERP, para poder usar GT-SHOP en
  `/recorridos/erp`. Nadie lo había planteado; salió de una auditoría que decía «a esta
  página le falta prueba». Se retiró el 2026-09-24.

- **No se afirma nada sobre el negocio del lector que no sepamos**, y una cifra de ejemplo
  nunca se acomoda para que «revele» una conclusión. Las cifras de ejemplo están para enseñar
  el mecanismo —cómo se mueve un dato, qué sale en la pantalla—, no para demostrar una tesis.
  Si un número se eligió para que la frase de abajo cuadrara, sobra la frase, y casi siempre
  también el número.

  *Por qué está escrito:* en la pantalla del recorrido del ERP, Claude escribió *«el que más te
  compra es el que menos te deja»* como si la tabla lo revelara, **después de haber inventado
  los cuatro renglones para que ese patrón saliera**. Se retiró el 2026-09-24, junto con los
  márgenes que lo fabricaban.

- **Las reglas internas no se le explican al lector.** Cómo trabajamos —que no enseñamos la
  pantalla de un cliente, que no inventamos nombres, que cubrimos los datos de terceros— se
  escribe en este archivo y en los comentarios del código, que es donde sirve. En la página se
  **hace**, no se narra: un renglón cubierto con su encabezado se entiende solo, y un párrafo
  que lo explica le señala al visitante algo que no estaba mirando y le da una política que no
  pidió. La única excepción es lo que la ley obliga a decir, que vive en `/aviso-de-privacidad`,
  y las etiquetas cortas que evitan una confusión real —«pantalla de ejemplo», «cifras de
  ejemplo»—.

- Textos en español de México; nombres de commit en español, imperativo, una línea de resumen.
- Antes de abrir un PR: `npm test` y `npm run build` sin errores, y el sitio revisado en
  `npm run preview`.

## Pendientes

`PENDIENTES.md` es la lista viva: la ruta a producción, las variables de Cloudflare, lo que falta
de cada quien y el historial de lo resuelto. Léela al empezar trabajo nuevo; al resolver un punto,
táchalo ahí con la fecha.

## Skills

Además de `/inicio` y `/cierre`, el proyecto usa el plugin `mattpocock-skills`. El hook de
`.claude/settings.json` recuerda en cada mensaje cuál toca según la situación; la lista vive en
`.claude/hooks/skills.txt`. Para revisar un PR, `mattpocock-skills:code-review` (revisa contra
estas reglas), no el `code-review` integrado.
