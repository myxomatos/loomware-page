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

## Pendientes

Estado al 20 de septiembre de 2026. Quien resuelva un punto, lo tacha y anota la fecha.

### Bloquean funcionalidad ya construida — Aldo

- [ ] **Cargar cinco variables en Cloudflare.** Workers & Pages → `loomware-page` → Settings →
      **Variables and Secrets** → Add. Cada una hay que capturarla **dos veces**: una en
      *Production* y otra en *Preview*; el preview de cada rama es un entorno distinto. Al
      terminar, Deployments → último → ⋯ → **Retry deployment**, porque las variables no se
      aplican a un despliegue ya publicado.

      | Variable | Encrypt | De dónde sale |
      | --- | --- | --- |
      | `DENUE_TOKEN` | Sí | Alan lo tiene. **No está en el repositorio ni debe estarlo.** Pedírselo por un canal privado. |
      | `PROSPECT_KEY` | Sí | Contraseña de `/prospectar`; la eligen entre los dos. |
      | `RESEND_API_KEY` | Sí | Crear cuenta en <https://resend.com> → API Keys → Create (empieza con `re_`). |
      | `LEAD_TO` | No | Sólo para probar antes de verificar el dominio: el correo dueño de la cuenta de Resend. |
      | `LEAD_FROM` | No | Sólo para probar: `Loomware <onboarding@resend.dev>`. Se borran las dos al verificar el dominio. |

      Sin las dos primeras, `/prospectar` responde 500. Sin la tercera, el formulario no envía nada.

- [ ] **Verificar `loomware.com.mx` en Resend.** Domains → Add Domain, y capturar en Cloudflare DNS
      los tres registros que indique (MX `send`, TXT `send` con el SPF, TXT `resend._domainkey`).
      Los tres van con **Proxy status: DNS only** (nube gris) o la verificación falla. Sin esto no
      se puede enviar desde `@loomware.com.mx`.

- [ ] **Invitar a Alan a la cuenta de Cloudflare.** Manage Account → Members → Invite, rol
      Administrator. Es un minuto y evita que cada variable o registro DNS tenga que pasar por Aldo.

### Decisiones de contenido — Aldo y Alan

- [ ] **Aviso de privacidad.** El footer enlaza "Privacidad" a `#contacto`, que no lleva a nada, y
      el formulario capta nombre, empresa, correo y teléfono sin aviso ni casilla de consentimiento.
      La LFPDPPP lo exige. Es el único pendiente con implicación legal. Falta decidir quién redacta
      el texto; el desarrollo de la página y el enlace es rápido.

- [ ] **Analítica.** No hay ninguna. `/gracias` se creó para poder medir la conversión del
      formulario y hoy nada la mide. Falta decidir herramienta (GA4 u otra), dar de alta el dominio
      en Search Console y enviar el sitemap.

- [ ] **Cinco enlaces que prometen páginas que no existen:** Servicios → `#proceso`,
      Casos → `#impacto`, Recursos → `#desafio`, Acerca de nosotros → `#inicio`,
      Casos de éxito → `#impacto`. Decidir si se crean esas páginas o se quitan del menú.

- [ ] **Dos teléfonos adicionales** para el footer. El código ya los acepta: se agregan a la lista
      `PHONES` en `src/components/Footer.jsx`.

### Mejoras técnicas — resueltas el 2026-09-20, pendientes de que Aldo las verifique

Todas van en la rama `alan`; se revisan en <https://alan.loomware-page.pages.dev> antes de mezclar.

- [x] `canonical` y `og:url` agregados a `index.html`, apuntando a `https://loomware.com.mx/`,
      para que los previews `.pages.dev` no compitan como contenido duplicado.
      *Cómo verificar:* ver el código fuente de la página y buscar `rel="canonical"`.
- [x] Nueva `public/og-image.png` de 1200×630 (logo, titular y el hero), con
      `og:image:width/height/alt`. Sustituye al hero 4:3 que salía recortado al compartir.
      *Cómo verificar:* pegar la URL del preview en <https://www.opengraph.xyz> o en un chat.
- [x] `public/apple-touch-icon.png` de 180×180, a sangre completa sobre el azul de marca.
      *Cómo verificar:* en iPhone, Compartir → Agregar a inicio.
- [x] Enlace "Saltar al contenido" como primer elemento enfocable, oculto hasta que se tabula.
      *Cómo verificar:* abrir el sitio y presionar Tab una vez.
- [x] `README.md` actualizado: se corrigió el menú de Cloudflare ("Variables and Secrets"), se
      quitó la instrucción muerta sobre `SOCIAL`, se documentaron `/gracias`, `npm run share`,
      `DENUE_TOKEN` y `PROSPECT_KEY`, y el bloque de estructura ahora refleja el repositorio real.

### Mejoras técnicas, no requieren decisión

- [ ] Nada pendiente en este bloque.

### Hecho

- [x] Sitio reconstruido en Vite + React, responsivo verificado de 320 a 1440 px (2026-09-19).
- [x] `/prospectar` sobre la API DENUE del INEGI, con el token del lado del servidor (2026-09-17).
- [x] Formulario enviando por `POST /api/contacto` con Resend, y página `/gracias` (2026-09-19).
- [x] Comandos `/inicio` y `/cierre` versionados en `.claude/commands/` (2026-09-19).
