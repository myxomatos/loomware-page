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

### Mejoras técnicas, no requieren decisión

- [ ] `index.html` no tiene `canonical` ni `og:url`. Hacen falta para que Google no trate los
      previews `.pages.dev` como contenido duplicado del sitio.
- [ ] La imagen de `og:image` es 1400×1050 (4:3) pero la etiqueta es `summary_large_image`, que
      espera ~1200×630: al compartir el enlace sale recortada.
- [ ] Falta `apple-touch-icon`; al guardar el sitio en la pantalla de inicio de un iPhone aparece
      un ícono genérico.
- [ ] Falta el enlace "saltar al contenido" para navegación por teclado.
- [ ] `README.md` quedó desfasado: menciona `SOCIAL` en el footer (ya no existe), llama
      "Environment variables" al menú que Cloudflare renombró a "Variables and Secrets", y su
      bloque de estructura omite `gracias.html`, `prospectar.html`, `functions/` y
      `.claude/commands/`.

### Hecho

- [x] Sitio reconstruido en Vite + React, responsivo verificado de 320 a 1440 px (2026-09-19).
- [x] `/prospectar` sobre la API DENUE del INEGI, con el token del lado del servidor (2026-09-17).
- [x] Formulario enviando por `POST /api/contacto` con Resend, y página `/gracias` (2026-09-19).
- [x] Comandos `/inicio` y `/cierre` versionados en `.claude/commands/` (2026-09-19).
