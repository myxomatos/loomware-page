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

- [ ] **Cargar las variables en Cloudflare.** Workers & Pages → `loomware-page` → Settings →
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
      | `VITE_GA_ID` | No | ID de medición de Google Analytics 4 (`G-…`). Sin él no se carga nada. Ver "Analítica" abajo. |
      | `VITE_GSC_VERIFICATION` | No | Código de Search Console (método "etiqueta HTML"), si se verifica por ese método. |

      Sin las dos primeras, `/prospectar` responde 500. Sin la tercera, el formulario no envía.
      Las de analítica son las únicas que aplican al **build**: tras cargarlas hay que redesplegar.

- [ ] **Verificar `loomware.com.mx` en Resend.** Domains → Add Domain, y capturar en Cloudflare DNS
      los tres registros que indique (MX `send`, TXT `send` con el SPF, TXT `resend._domainkey`).
      Los tres van con **Proxy status: DNS only** (nube gris) o la verificación falla. Sin esto no
      se puede enviar desde `@loomware.com.mx`.

- [ ] **Invitar a Alan a la cuenta de Cloudflare.** Manage Account → Members → Invite, rol
      Administrator. Es un minuto y evita que cada variable o registro DNS tenga que pasar por Aldo.

### Datos que faltan para completar lo construido — Aldo

Todo esto ya tiene su lugar en el código; sólo hay que capturar el dato.

- [ ] **Prueba social.** `src/data/casos.js` está vacío y la sección "Resultados con clientes" no
      aparece hasta que tenga un caso. Formato en el mismo archivo. Regla: nada inventado ni
      redondeado; si el cliente no autoriza su nombre, se describe por giro, tamaño y ciudad.
      Con un solo caso real ya se muestra.
- [ ] **Equipo.** `src/data/equipo.js`: cargo, dos líneas de bio, foto cuadrada (600×600, en
      `public/equipo/`) y LinkedIn de Aldo y de Alan. Las tarjetas aparecen solas cuando una
      persona tiene cargo y foto. Falta también el apellido de Alan.
- [ ] **Datos legales del aviso de privacidad.** `src/data/contacto.js`: `RAZON_SOCIAL` y
      `DOMICILIO`. Mientras estén vacíos el aviso dice "Loomware" y "Ciudad de México". Y que
      alguien con criterio legal lea `/aviso-de-privacidad` antes de producción.
- [ ] **Validar las respuestas de precio, plazos, migración y SAT** en `src/data/faq.js` y en
      cada `faq` de `src/data/servicios.js`. Describen la política de la empresa tal como la
      entendí; si algo no es así, se cambia el texto, no se deja.
- [ ] **Confirmar que +52 55 8096 8928 es el WhatsApp** que van a atender. Está en
      `src/data/contacto.js` y de ahí sale para todo el sitio.
- [ ] **Analítica.** Crear la propiedad de Google Analytics 4 y dar de alta
      `loomware.com.mx` en Search Console (por DNS o con `VITE_GSC_VERIFICATION`). Enviar el
      sitemap: `https://loomware.com.mx/sitemap.xml`. El código ya reporta `generate_lead` al
      llegar a `/gracias` y `click_whatsapp` con el origen; en GA4 hay que marcarlos como
      conversiones.

### Decisiones de contenido — Aldo y Alan

- [ ] **Nómina y comercio en línea ya están en el sitio** (tarjeta y página cada uno). Confirmar
      que sí se ofrecen; si no, quitarlos de `src/data/servicios.js` y se van solos de todos lados.
- [ ] **Hero.** La ilustración es un render 3D genérico. Cuando haya foto real del equipo o de
      un proyecto, conviene reemplazarla: `public/hero_*.png` y `npm run optimizar:imagenes`.

### Resueltas el 2026-09-20 en la rama `alan`, pendientes de que Aldo las verifique

Se revisan en <https://alan.loomware-page.pages.dev> antes de mezclar.

- [x] **WhatsApp**: botón flotante, en el hero, junto al formulario, en el footer, en cada
      página de servicio y en `/gracias`. Mensaje prellenado con el origen.
- [x] **Aviso de privacidad**: página `/aviso-de-privacidad`, casilla obligatoria en el
      formulario, validación del consentimiento en el servidor, enlace en el footer.
- [x] **Quiénes somos**: sección `#nosotros` con texto de empresa y principios; tarjetas de
      equipo listas para datos.
- [x] **Prueba social**: sección `#casos` y enlace del footer, ambos condicionados a datos.
- [x] **Páginas por servicio**: ocho en `/servicios/<slug>`, generadas desde
      `src/data/servicios.js` con título, descripción, canonical y datos estructurados en el
      HTML estático. Sitemap generado con todo lo indexable.
- [x] **Industrias**: sección `#industrias` con seis giros y enlace a los servicios que aplican.
- [x] **Preguntas frecuentes**: `#faq` con nueve preguntas y datos estructurados FAQPage.
- [x] **Analítica**: GA4 y Search Console inyectables por variable; eventos de conversión listos.
- [x] **Rendimiento**: hero en WebP (575 → 29 KB en móvil) con precarga, Inter servida desde el
      sitio. Lighthouse móvil: rendimiento 67 → 99, accesibilidad 98 → 100, LCP 7.2 s → 1.8 s.
- [x] Navbar y footer sólo enlazan a lo que existe y es lo que dice. Tarjetas de soluciones
      enlazan a su página.
- [x] `canonical`, `og:url`, `og-image.png` 1200×630, `apple-touch-icon`, enlace "saltar al
      contenido", README al día.

### Hecho antes

- [x] Sitio reconstruido en Vite + React, responsivo verificado de 320 a 1440 px (2026-09-19).
- [x] `/prospectar` sobre la API DENUE del INEGI, con el token del lado del servidor (2026-09-17).
- [x] Formulario enviando por `POST /api/contacto` con Resend, y página `/gracias` (2026-09-19).
- [x] Comandos `/inicio` y `/cierre` como skills en `.claude/skills/` (2026-09-19).
