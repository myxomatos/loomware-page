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

Estado al 21 de septiembre de 2026. Quien resuelva un punto, lo tacha y anota la fecha.

> **La página está en pausa desde el 21 de septiembre de 2026.** Alan cerró su parte: la rama
> `alan` construye sin errores, el preview está publicado y el responsivo quedó verificado con
> medición (ver "Resueltas"). De aquí en adelante todo lo que falta depende de Aldo y está en
> esta lista.
>
> Mientras tanto Alan trabaja el **material de venta**: recorridos visuales, uno por solución,
> que viven **fuera del repositorio** como artifacts y no tocan el código. El primero —el del
> ERP— ya está terminado. Tres puntos de esta lista lo bloquean y están marcados
> **[material de venta]**.

### Ruta a producción — Aldo, en este orden

1. **Revisar el preview** <https://alan.loomware-page.pages.dev> en escritorio **y en celular**
   (abrir el menú, llenar el formulario hasta el aviso de privacidad, entrar a dos páginas de
   servicio, abrir `/prospectar`). Son 40 commits en `alan`, cada uno explica qué y por qué.
2. **Cargar las variables de Cloudflare** (bloque siguiente). Sin ellas el formulario y
   `/prospectar` no funcionan aunque el sitio se vea.
3. **Mezclar el PR** de `alan` a `main`. Alan lo abre en cuanto Aldo confirme que revisó el preview.
4. **Probar en producción** <https://loomware.com.mx>: enviar el formulario (debe llegar el correo
   y aterrizar en `/gracias`), entrar a `/prospectar` con la contraseña y hacer una búsqueda.
5. **Search Console**: dar de alta el dominio y enviar `https://loomware.com.mx/sitemap.xml`.
   Antes de esto Google no sabe que el sitio existe.
6. Lo que falte de "Datos que faltan" entra después, cada uno por su propio PR.

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
      | `VITE_GA_ID` | No | ID de medición de Google Analytics 4 (`G-…`). Sin él no se carga nada **y la banda de cookies no aparece**, porque sin Analytics el sitio no pone ninguna cookie. Al cargarlo, la banda sale sola. Ver "Analítica" abajo. |
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
- [ ] **Que alguien con criterio legal lea `/aviso-de-privacidad`** antes de producción. Los
      datos del responsable ya están (Aldo Leonel Sánchez López, Laureles #17, Jardines de
      Atizapán, Estado de México, C.P. 52978, en `src/data/contacto.js`). Si más adelante se
      constituye una sociedad, se cambia ahí y se actualiza en todo el sitio.
- [ ] **Revisar que el contrato respalde lo que dice el sitio** — *[material de venta]*. Dos
      afirmaciones se volvieron obligación contractual: "el contrato te entrega el código, la
      base de datos y la documentación" (software a medida) y **"precio cerrado por ese alcance;
      si lo amplías, se cotiza aparte y lo apruebas tú"**. Si el contrato no lo dice, hay que
      ajustarlo o cambiar el texto. **Urge más que antes**: la segunda frase ahora también va en
      el recorrido del ERP que se le manda a prospectos, en la sección "Antes de que preguntes".
- [ ] **Validar las respuestas de precio, plazos, migración y SAT** en `src/data/faq.js` y en
      cada `faq` de `src/data/servicios.js`. Describen la política de la empresa tal como la
      entendí; si algo no es así, se cambia el texto, no se deja.
- [ ] **Validar el contenido de las seis páginas de industria** (`src/data/industrias.js`) —
      *[material de venta]*. Los síntomas y la forma de resolverlos de distribuidoras,
      manufactura, construcción, despachos, comercio y clínicas. Están escritos desde lo que
      suele verse en cada giro; si en alguno no es así, se corrige. **El recorrido del ERP
      repite un "Hoy" por giro** ("el material se va a la obra sin que nadie lo descuente de
      ella", "la aseguradora rechaza por datos que no cuadran"): se validan junto con estos.
- [ ] **Validar tres afirmaciones nuevas del inicio**, escritas por Alan y Claude sin confirmar
      con Aldo: (a) el hero dice que atienden *distribuidoras, manufactura y empresas de
      servicios* — es el posicionamiento; (b) la tarjeta de agenda promete *una llamada de 30
      minutos, sin costo*; (c) "Quiénes somos" dice que *la persona que hace el diagnóstico es la
      misma que diseña la solución y responde el WhatsApp*. Si alguna no es cierta, se cambia.
- [ ] **Confirmar que +52 55 8096 8928 es el WhatsApp** que van a atender. Está en
      `src/data/contacto.js` y de ahí sale para todo el sitio.
- [ ] **Video de "Ver cómo funciona".** Cuando el clip de Clipchamp esté listo, subirlo a YouTube
      como *No listado* y poner la URL en `src/data/video.js`. Con eso el enlace del hero abre el
      video en una ventana sobre la página; sin URL sigue llevando al proceso. También acepta un
      MP4 en `public/video/` si pesa menos de ~15 MB.
- [ ] **Analítica.** Crear la propiedad de Google Analytics 4 y dar de alta
      `loomware.com.mx` en Search Console (por DNS o con `VITE_GSC_VERIFICATION`). Enviar el
      sitemap: `https://loomware.com.mx/sitemap.xml`. El código ya reporta `generate_lead` al
      llegar a `/gracias` y `click_whatsapp` con el origen; en GA4 hay que marcarlos como
      conversiones.

### De la tercera auditoría, aún abiertos

- [ ] **Logotipos de clientes** — *[material de venta]*. Aldo confirmó que hay clientes
      satisfechos. Cuando autoricen el uso de su marca: logo en `public/clientes/` y el caso en
      `src/data/casos.js`. Es lo único que separa a la página de un 9, y **es también el techo
      del material de venta**: sin un caso —aunque sea sin nombre, descrito por giro, tamaño y
      ciudad— ninguna pieza pasa de 8. Hoy no hay ninguna prueba de que exista un cliente.
- [ ] **Precio.** Queda fuera a propósito: hoy todo es a la medida. Si más adelante hay un plan
      mensual tipo competencia, publicar aunque sea un "desde" sube la conversión y filtra al
      que nunca iba a comprar. Nota para cuando exista.
- [ ] **Conversión de bajo compromiso.** Hoy la única forma de dejar datos es el formulario de
      diagnóstico. Una guía descargable ("Checklist: ¿tu empresa necesita un ERP?") capturaría
      al que aún no está listo. Pendiente de decidir si se hace.
- [ ] **Remarketing.** Sin píxel ni audiencias no se puede volver a impactar al 97 % que no
      convierte en la primera visita. Decidir si entra cuando arranquen con Ads.
- [ ] **Autoridad para SEO.** Ningún sitio enlaza a loomware.com.mx todavía. Un dominio nuevo
      tarda de 3 a 6 meses aunque todo esté bien. Acelera: LinkedIn de empresa, directorios de
      industria, cámaras (Canacintra, Canaco), y que los clientes los mencionen.

### Decisiones de contenido — Aldo y Alan

- [ ] **Nómina y comercio en línea ya están en el sitio** (tarjeta y página cada uno). Confirmar
      que sí se ofrecen; si no, quitarlos de `src/data/servicios.js` y se van solos de todos lados.
- [ ] **Hero.** La ilustración es un render 3D genérico. Cuando haya foto real del equipo o de
      un proyecto, conviene reemplazarla: `public/hero_*.png` y `npm run optimizar:imagenes`.

### Resueltas el 2026-09-21 (tercera auditoría: abogado, Google y Google Ads)

- [x] **Consentimiento de cookies (2026-09-21).** Banda de aviso en las seis páginas, con
      Aceptar y Rechazar. Analytics arranca con el consentimiento **denegado** —Consent Mode en
      `vite.config.js`—, así que **no escribe ninguna cookie hasta que alguien acepta**; no es
      una banda decorativa. La decisión se guarda en el equipo del visitante y se puede cambiar
      desde el enlace "Cookies" del pie. Si no hay `VITE_GA_ID` la banda ni aparece, porque
      entonces el sitio no pone cookies. El aviso de privacidad describe el mecanismo en su
      sección 7. Verificado a 390, 768, 1024 y 1440 px: aparece siempre, no desborda y no le
      tapa el botón de WhatsApp.
- [x] **Responsivo verificado con medición, no a ojo (2026-09-21).** Cinco páginas —inicio,
      servicio, industria, aviso de privacidad y `/prospectar`— por cuatro medidas —celular 390,
      tablet vertical 768, tablet horizontal 1024 y laptop 1440— y en modo claro y oscuro del
      sistema: **20 combinaciones, ninguna con desbordamiento horizontal**, y las medidas salen
      idénticas en oscuro, o sea que el sitio no se deforma.
- [x] **`color-scheme: light` declarado** en `src/styles/tokens.css`. El sitio tiene un solo
      tema; declararlo evita que el navegador pinte de oscuro los campos del formulario, las
      barras de desplazamiento y el fondo por omisión cuando el visitante trae el sistema en
      modo oscuro.
- [x] **Footer limpio**: se quitaron la razón social y el domicilio del pie. Ninguna empresa
      comparable los publica ahí y ensuciaban el renglón; siguen donde la ley los pide, en
      `/aviso-de-privacidad`. También salió el domicilio de la columna de contacto.
- [x] **Responsable legal identificado**: razón social y domicilio en el aviso de privacidad y
      en los datos estructurados `Organization`. Sin esto el aviso era defectuoso ante la
      LFPDPPP. En el footer se quitaron el mismo día: ahí sólo va el nombre comercial.
- [x] **Afirmaciones contractuales ajustadas**: "el código y los datos son tuyos" pasa a "el
      contrato te entrega…"; la respuesta de precio reconoce que son soluciones a la medida y
      explica qué pasa si se amplía el alcance.
- [x] **Contraste corregido**: el verde de WhatsApp daba 1.98:1 con texto blanco (WCAG AA exige
      4.5:1). Verde claro sólo para íconos; superficies con texto usan uno de 5.41:1.
- [x] **Formulario en cada página de servicio e industria**, con el interés precargado y el
      origen registrado en el correo. Antes el botón sacaba al visitante al inicio: era el
      error de embudo más caro del sitio y rompía cualquier campaña de Ads.
- [x] **Fuente recortada**: 83 KB → 1 KB con `npm run fuente:subconjunto`, verificado contra la
      fuente completa. Era el recurso más pesado de la página.
- [x] **Seis páginas por industria** en `/industrias/<id>`, con síntomas, solución, servicios
      que aplican y formulario propio. Sitemap de 10 a 16 URL.
- [x] **Títulos SEO enfocados**, uno por intención de búsqueda, todos bajo 60 caracteres.
- [x] **Lighthouse móvil final**: inicio 100 de rendimiento con LCP de 1.3 s y 117 KB (venía de
      95 / 2.6 s / 198 KB); servicios 97 e industrias 98; accesibilidad 100 en las tres.

### Resueltas el 2026-09-20 en la rama `alan`, pendientes de que Aldo las verifique

Se revisan en <https://alan.loomware-page.pages.dev> antes de mezclar.

- [x] **WhatsApp**: botón flotante, en el hero, en el formulario ("¿Prefieres hablar directo?"),
      en el footer, en cada página de servicio y en `/gracias`. Mensaje prellenado con el origen.
- [x] **Pulido tras revisión de Alan (2026-09-20)**: "Ver cómo funciona" listo para abrir el video;
      chips de industrias en una sola fila; "Impacto" convertido en franja horizontal compacta
      sobre un formulario centrado con WhatsApp y correo como enlaces en su columna izquierda.
- [x] **Segunda auditoría (2026-09-20)**: hero con titular al problema del prospecto y palabras
      clave en `<title>`; **menú móvil corregido** (abría con 0 px de alto por el
      `backdrop-filter` del header — nunca había funcionado en celular); banda morada con botón
      en vez de promesas repetidas; tarjeta de agenda sin urgencia inventada; columna
      "Resultados" con frases comprobables; título de Nosotros sin repetir el hero; chips de
      soluciones en una línea; footer sin solape con el botón flotante; **diagrama "Cómo
      funciona" en las ocho páginas de servicio**, dibujado desde los datos.
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
