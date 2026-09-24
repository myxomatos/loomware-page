# Pendientes de loomware-page

Estado al 23 de septiembre de 2026. Quien resuelva un punto, lo tacha y anota la fecha.

> **Revisión de Aldo en curso desde el 22 de septiembre de 2026.** La rama `aldo` trae los 68
> commits de `alan` más los ajustes de la revisión (ver «Resueltas el 2026-09-22/23»), así que
> **el PR a `main` sale de `aldo`**. Preview: <https://aldo.loomware-page.pages.dev>.
> Después del merge, Alan hace `git merge main` en `alan` para seguir al día.

## Ruta a producción — Aldo, en este orden

Los pasos 2 y 3 desbloquean todo lo demás: sin ellos el formulario no envía y `/prospectar`
responde 500.

| # | Qué hacer | Dónde | Estado |
| --- | --- | --- | --- |
| 1 | Revisar el preview en escritorio y en celular | <https://aldo.loomware-page.pages.dev> | ✅ 2026-09-23 |
| 2 | Verificar `loomware.com.mx` en Resend | Resend y Cloudflare DNS | ✅ 2026-09-23 |
| 3 | Cargar las variables, cada una en *Production* y en *Preview* | Cloudflare → `loomware-page` → Settings → Variables and Secrets | `RESEND_API_KEY` ✅ 2026-09-24; faltan `DENUE_TOKEN`, `PROSPECT_KEY` y `VITE_GA_ID` |
| 4 | **Retry deployment** (las variables no aplican a un despliegue ya publicado) | Cloudflare → Deployments → el último de la rama → ⋯ | Repetir tras cada variable nueva |
| 5 | Probar en el preview: enviar el formulario (debe llegar el correo y aterrizar en `/gracias`) y buscar en `/prospectar` | Preview | Formulario ✅ 2026-09-24: llega de `web@` a `aldo_sanchez@` y «Responder» va al prospecto |
| 6 | Abrir el PR de `aldo` a `main`, revisarlo con `mattpocock-skills:code-review` y mezclarlo | GitHub | |
| 7 | Probar en producción, y confirmar que aparece la banda de cookies si ya está `VITE_GA_ID` | <https://loomware.com.mx> | |
| 8 | Search Console: confirmar la propiedad y enviar el sitemap (25 URLs) | <https://search.google.com/search-console> | |
| 9 | Invitar a Alan a Cloudflare como Administrator | Manage Account → Members → Invite | |

### Variables de Cloudflare

| Variable | Tipo | Para qué | De dónde sale |
| --- | --- | --- | --- |
| `DENUE_TOKEN` | Secret | Llave de la API del DENUE; la Function `functions/api/denue` la agrega del lado del servidor | Alan, por canal privado. **Nunca en el repositorio.** |
| `PROSPECT_KEY` | Secret | Contraseña de `/prospectar` | La eligen Aldo y Alan |
| `RESEND_API_KEY` | Secret | Envío del formulario desde `functions/api/contacto.js` | Resend → API Keys (empieza con `re_`) |
| `VITE_GA_ID` | Texto | Google Analytics 4 (`G-…`). Con él aparece la banda de cookies y se miden las conversiones | Propiedad nueva de GA4 |
| `VITE_GSC_VERIFICATION` | Texto, opcional | Verificación de Search Console por etiqueta HTML | Probablemente sobra: el DNS ya tiene un TXT `google-site-verification` |
| `VITE_SCHEDULE_URL` | Texto, opcional | Liga de agenda (Calendly o similar) para «Agendar ahora»; sin ella el botón baja al formulario | La agenda de Aldo |

`LEAD_TO` y `LEAD_FROM` ya no hacen falta: con el dominio verificado, el correo sale de
`web@loomware.com.mx` y llega a `aldo_sanchez@loomware.com.mx` (valores por defecto de
`functions/api/contacto.js`). Sólo se cargan para cambiar esos destinos.

Las variables `VITE_` se hornean en el build: al cargarlas o cambiarlas hay que redesplegar.

## Aldo

- [ ] **Avisarle a Alan de sus artifacts de WhatsApp.** Las copias de los recorridos que manda
      como artifacts de claude.ai siguen diciendo «diagnóstico sin costo» y enlazan a
      `alan.loomware-page.pages.dev`. Las del repositorio ya se corrigieron.
- [ ] **Dar de alta el perfil de Google Business.** <https://business.google.com>, media hora y
      gratis. Mete a Loomware en el mapa para «software empresarial cerca de mí» o «ERP CDMX» en
      días; el SEO de un dominio nuevo tarda de tres a seis meses.
- [ ] **Validar los dos supuestos de la calculadora**: **1.35 de prestaciones** sobre el sueldo
      bruto y **176 horas al mes**, en `src/data/calculadora.js`. Es el único lugar del sitio con
      una cifra que no sale del cliente.
- [ ] **Equipo.** `src/data/equipo.js`: cargo, dos líneas de bio, foto cuadrada (600×600, en
      `public/equipo/`) y LinkedIn de Aldo y de Alan. Las tarjetas aparecen solas cuando una
      persona tiene cargo y foto. Falta también el apellido de Alan.
- [ ] **Lectura legal de `/aviso-de-privacidad`** antes de producción. Los datos del responsable
      están en `src/data/contacto.js`; si se constituye una sociedad, se cambian ahí.
- [ ] **Que el contrato respalde lo que dice el sitio** — *[material de venta]*: «el contrato te
      entrega el código, la base de datos y la documentación» y «precio cerrado por ese alcance;
      si lo amplías, se cotiza aparte y lo apruebas tú». También va en el recorrido del ERP.
- [ ] **Validar precio, plazos, migración y SAT** en `src/data/faq.js` y en cada `faq` de
      `src/data/servicios.js`.
- [ ] **Validar las seis páginas de industria** (`src/data/industrias.js`) — *[material de
      venta]*: síntomas y solución por giro, junto con el «Hoy» por giro del recorrido del ERP.
- [ ] **Confirmar que nómina y comercio en línea se ofrecen.** Si no, se quitan de
      `src/data/servicios.js` y se van solos de todo el sitio.
- [ ] **GT-SHOP, extras.** Eduardo ya aprobó la cita y el uso de la marca (2026-09-22). Si los
      tiene: el archivo original del logotipo (el de hoy salió de una captura) y una medición real
      —pedidos, tiempo de entrega, devoluciones— que reemplace el `resultado` en `src/data/casos.js`.
- [ ] **Video de «Ver cómo funciona».** Subirlo a YouTube como *No listado* y poner la URL en
      `src/data/video.js`; también acepta un MP4 de menos de ~15 MB en `public/video/`.
- [ ] **Analítica.** Crear la propiedad de GA4 y marcar como conversiones los eventos que el
      código ya reporta: `generate_lead` (con `metodo` = formulario o calculadora),
      `click_whatsapp` con el origen, y `calculadora_inicio`.
- [ ] **Logo en otros lados.** El logo del sitio es ahora la nube de cuatro lóbulos, sin
      degradado (2026-09-22). Actualizarlo en WhatsApp Business, firma de correo, tarjetas y
      plantillas de cotización. Vive en `src/components/Logo.jsx` y `public/favicon.svg`.

## Decisiones abiertas

- [ ] **Precio — movimiento 05 del estudio comparativo.** Los 22 sitios medidos publican precio.
      Basta un rango, un «desde» o una franja por tipo de proyecto. Es el pendiente de mayor
      impacto en conversión y lo decide Aldo; `mattpocock-skills:grilling` ayuda a cerrarlo.
- [ ] **Más casos de éxito.** GT-SHOP es el primero. Los siguientes se preparan con
      `npm run logo:cliente <origen> <destino>` y se escriben en `src/data/casos.js`.
- [ ] **Conversión de bajo compromiso.** Una guía descargable («Checklist: ¿tu empresa necesita
      un ERP?») para quien aún no quiere llamada.
- [ ] **Remarketing.** Píxel y audiencias cuando arranquen con Ads.
- [ ] **Autoridad para SEO.** LinkedIn de empresa, directorios de industria, cámaras (Canacintra,
      Canaco) y menciones de clientes.
- [ ] **Hero con foto real** del equipo o de un proyecto, cuando exista: se cambia el `<img>` de
      `src/components/Hero.jsx` y se optimiza con `npm run optimizar:imagenes`.

## Resueltas el 2026-09-22/23 (revisión de Aldo)

- [x] **Rama `alan` integrada a `aldo`** por fast-forward, sin conflictos.
- [x] **Diagnóstico con costo**: la primera llamada es sin costo y el diagnóstico se cobra a
      precio competitivo. Cambiado en hero («Precios competitivos»), FAQ, formularios,
      `/gracias`, Nosotros, footer, descripciones de búsqueda y los ocho recorridos.
- [x] **Logo de cuatro lóbulos** en sitio, favicon, recorridos, tarjeta social (que seguía con la
      nave del ERP) y `apple-touch-icon` (que seguía con el degradado viejo).
- [x] **Recorridos**: sus ligas apuntaban al preview de `alan` y abrían otra pestaña. Ahora son
      relativas: la marca regresa al inicio, a la tarjeta del recorrido resaltada en cobre, y el
      «formulario del sitio» lleva al `#contacto` de su servicio.
- [x] **Botón «Cookies»** del pie: sólo aparece si Analytics está cargado.
- [x] **Barra de servicios e industrias**: en celular muestra sólo la nube, centra la opción
      actual y desvanece las orillas si no cabe; en escritorio los ocho servicios caben desde
      1280 px.
- [x] **Validado por Aldo**: las tres afirmaciones del inicio (posicionamiento, llamada de 30
      minutos, quién atiende), el WhatsApp +52 55 8096 8928, y las tres soluciones de entrada
      (CRM, ERP y Nómina) tal como están.
- [x] **Pruebas**: `npm test` (Vitest) cubre la calculadora, la validación del formulario y
      `centrarActual`.

## Resueltas el 2026-09-21 (tercera auditoría: abogado, Google y Google Ads)

- [x] **Estudio comparativo contra 24 referentes, y los cinco movimientos que salieron
      (2026-09-22, sexta auditoría).** Se midieron 25 sitios de cinco continentes con el mismo
      procedimiento —Stripe, Linear, Vercel, Notion, HubSpot, Qonto, Personio, Typeform, Pipedrive,
      Holded, Nubank, Alegra, Bind ERP, Clip, Siigo, Zoho, Razorpay, Flutterwave, Yoco, Xero,
      Canva, Atlassian y nosotros—. El estudio completo está en
      <https://claude.ai/artifact/MoSn3kdnN4acpzk3bbs5t8>.

      **Dónde quedamos:** **primer lugar de los 22 medibles en velocidad** (298 ms al primer byte,
      **1 script** contra los 79 de Stripe y los 98 de Pipedrive, 926 nodos contra 2 890 de Stripe),
      arriba en estructura y accesibilidad, y con las URLs más limpias del grupo. A la par en
      titular —9 palabras, la mediana es 8— y en color: se confirmó con píxeles que **los cinco
      competidores de software para pymes son azul, turquesa o cian** (Bind `#0078C0`, Holded
      `#1860F0`, Xero `#000060`, Alegra `#30ABA9`, Yoco `#00A9E0`), así que el morado es el
      único de la categoría.

      **Lo que se cambió a raíz del estudio:**
      1. **La calculadora subió a la primera pantalla** como segunda acción. Ninguno de los 22 pide
         una llamada como acción principal: todos tienen una puerta de compromiso cero, y la
         nuestra vivía después del formulario.
      2. **El formulario bajó de cinco campos a tres** —nombre, un WhatsApp o correo, y qué quiere
         resolver—. La Function acepta ahora un solo campo de contacto y distingue por la arroba
         si es correo o teléfono; sigue aceptando la forma larga que manda la calculadora, que a su
         vez bajó de tres campos a dos. Validación probada con seis casos.
      3. **La descripción de búsqueda pasó de 178 a 155 caracteres** —Google corta en ~155— y
         ninguna de las 14 páginas generadas pasa del límite.
      4. **Los ocho recorridos tienen su propia sección**, justo debajo del hero
         (`src/components/Recorridos.jsx`, se alimenta sola de `src/data/recorridos.js`). Primero
         fueron ocho enlaces subrayados al pie del hero, y ahí se perdían dos cosas: no se
         entendía qué era un recorrido, y se tiraba lo mejor que tienen, que son **sus títulos**
         —«Del andén al cobro» dice más que «ERP», porque «ERP» ya está en toda la página—. Ahora
         son ocho tarjetas con la solución como etiqueta de dato y el título de protagonista.
         Como quedaron arriba, **el «paso a paso» salió de las tarjetas de soluciones**: tenerlo
         en dos lugares de la misma página partía la atención.
      5. **Tipografía de titular propia: Archivo**, de Omnibus-Type (Buenos Aires), la misma del
         texto de los recorridos. Recortada y con el eje variable fijo en 700 pesa **7.7 KB**
         (`npm run fuente:titulares`). Inter se queda en el cuerpo y Azeret Mono en etiquetas y
         cifras: tres tipografías, tres oficios. Es la capa que tienen Xero (National 2), Yoco
         (Sharp Grotesk) y Vercel (Geist), y que nos faltaba.

      Medido después de los cinco: la portada pesa **106 KB** —seguimos por debajo de cualquiera
      del grupo— y no hay desbordamiento en tres páginas por tres medidas. Los movimientos 05
      (precio) y 06 (un caso real) son decisiones de Aldo y están arriba en su lista.
- [x] **Sistema visual rehecho (2026-09-22, quinta auditoría: color, tipografía y jerarquía).**
      La página se veía bien pero se veía **de 2020**, y no se parecía en nada a los recorridos,
      que son lo mejor diseñado que tiene Loomware. Se corrigió de raíz, con medición:

      **Color.** Había cinco acentos peleando. Ahora hay una ley de una línea, escrita en
      `src/styles/tokens.css`: **morado = marca y acción · cobre = dato · rojo = error ·
      verde = sólo WhatsApp**. El botón principal era rojo —que en software significa peligro,
      y dejaba al formulario sin color para fallar— y ahora es morado `#5326D9`, dos puntos
      menos de saturación que el anterior y **7.93:1** de contraste contra 5.93:1. El cobre
      `#A35C23` de los recorridos entra como color del dato: etiquetas de sección y números
      de paso. Se retiró el degradado morado→rosa→rojo del titular **y del logo**: era la firma
      de la ola de 2019.

      **Contraste.** Los tres fallos medidos quedaron cerrados: el borde de los campos del
      formulario pasó de **1.22:1 a 3.17:1** (WCAG 1.4.11 —antes el campo se leía como texto
      flotando—), el texto apagado de 4.42:1 a **5.29:1** sobre fondo suave, y las cifras sobre
      placa de cobre a 5.66:1. **18 pares de color medidos, cero fallos.**

      **Tipografía.** Titulares de peso 800 a **700** (800 era gritar) y el interlineado
      cerrado sólo arriba de 768 px, porque en celular los acentos tocaban la línea de arriba.
      La escala tenía cinco tamaños en cinco píxeles (20·18·17·16·15) y nada se veía más
      importante que lo demás: quedan **20 · 16 · 15**. Entra **Azeret Mono** —la de los
      recorridos— recortada a 11.9 KB (`npm run fuente:mono`), sólo para etiquetas y cifras.

      **Jerarquía.** Un solo estilo de etiqueta de sección (había dos), radios de siete a
      **cuatro**, sombras de cinco a **tres y ninguna de color**, y una sola esquina para todos
      los controles. Botones y campos a 48 px, chips a 44.

      **La regla de medida (corregida el mismo día).** Primero se llevó todo a la izquierda, y
      eso funciona sólo cuando el contenido de abajo llena el ancho: con una rejilla de dos
      tarjetas o un diagrama angosto, el titular quedaba solo con medio metro de aire al lado.
      **La regla que vale para toda la página es: un bloque nunca mide más de lo que su
      contenido necesita, y si mide menos que la página, se centra; el encabezado acompaña a su
      contenido.** Los bloques de dos columnas que sí llenan —hero, «Quiénes somos», el proceso,
      las preguntas del inicio— se quedan a la izquierda. Lo demás va centrado y con tope: la
      lista de soluciones a 920 px, el diagrama de servicio a 900, las preguntas del servicio a
      820, las soluciones por giro a 960 con tarjetas de 420 como máximo, el aviso a 760, y las
      rejillas de tarjetas con tope **por tarjeta** para que no se estiren cuando son pocas.

      **Imágenes.** El render 3D del hero —que se compra hecho y no decía nada cierto— lo
      sustituye **un dibujo propio que repite el titular**: la maraña de hoy —Excel, WhatsApp,
      correo, papel, un sistema viejo, todos unidos por líneas cruzadas— contra un solo sistema
      donde las cinco áreas escriben lo mismo. Se genera con `npm run hero:dibujo` desde la
      paleta del sitio, pesa **5 KB contra 40** y es nítido a cualquier tamaño. Se borraron
      1.76 MB de PNG y WebP que ya no se usan. La tarjeta social se redibujó con el sistema
      nuevo (`npm run og:imagen`): **381 KB → 54 KB**.

      **Segunda pasada (mismo día).** Tres cosas que sólo se ven con la página armada: el
      morado estaba **en todas partes** —placas de ícono, palomitas, flechas, nodos— y la regla
      que siguen Vercel, Linear y Stripe es que el color de marca vive en lo que se pica y en
      un acento por pantalla, no de fondo en cada tarjeta: las placas decorativas pasaron a un
      **neutro cálido** `#EEEBE4` (nunca un gris puro) y las palomitas al cobre. Los
      encabezados a la izquierda dejaban **medio metro de aire** cuando el contenido de abajo
      era angosto: en las páginas de servicio, las preguntas pasaron a **dos columnas** —título
      a la izquierda, lista a la derecha— y el diagrama abarca el ancho, en vez de volver a
      centrar. Y el dibujo del hero se rehízo **al tamaño en que se muestra**: a 760 px de
      lienzo las etiquetas llegaban a 7 px en pantalla.

      **Resultado medido:** la portada baja **100.7 KB** contra los 117 KB de antes, aun
      sumando la fuente nueva. Sin desbordamiento horizontal en cinco páginas por cuatro
      medidas —390, 768, 1024 y 1440— y los ocho recorridos intactos.
- [x] **Inicio más corto y con jerarquía (2026-09-21, cuarta auditoría).** En celular la
      portada medía 18.6 pantallas; ahora **14.7**. Las ocho soluciones van en dos niveles
      —tres tarjetas de entrada con «Ver paso a paso» al recorrido, cinco en lista compacta—;
      industrias en celular es un renglón por giro con todo el renglón tocable; el pie va en
      dos columnas. «El desafío» bajó de 22 viñetas a 14 quitando las repetidas. La banda de
      la calculadora pasó **después** del formulario: al que sí quiere llamar ya no se le
      atraviesa. El botón del hero dice «Cómo trabajamos» mientras no haya video, y volverá a
      decir «Ver cómo funciona» con el símbolo de reproducir en cuanto `src/data/video.js`
      tenga URL. Dos íconos que quedaron sin uso salieron del catálogo.
- [x] **Calculadora «¿Cuánto te cuesta tu Excel?» (2026-09-21).** `/calculadora`: seis
      preguntas de un toque y el número se mueve solo conforme se contesta. Entrega dos cifras
      separadas —lo que se va al mes en capturar el mismo dato más de una vez, y cuánto dinero
      trae detenido facturar tarde— **y enseña la cuenta completa**, para que cualquiera la
      pueda revisar. Si alguien captura una sola vez, le dice que no tiene ese problema.
      El resultado se ve sin pedir nada; el correo se pide después, y el aviso que le llega a
      Loomware trae las respuestas y la cuenta ya hecha. Enlazada desde el pie y desde una banda
      en el inicio, justo antes del formulario. En el sitemap (19 URLs).
- [x] **Los recorridos, como contenido del sitio (2026-09-21).** **Las ocho soluciones tienen su
      página**, que explica cada una paso a paso, con un dibujo que cambia
      mientras se baja. Cada uno es **un objeto que el cliente reconoce, no una gráfica**: la
      bodega con su camión (ERP), un tablero de corcho con hilos a fechas (CRM), la tarjeta de
      checado que se vuelve recibo (nómina), un anaquel entre dos celulares (tienda) y una
      oficina con tubo neumático, como el del banco (automatización) y dos maniquíes de sastre,
      el traje de talla única contra el traje a medida (software a medida) y el cuartito del
      servidor de la oficina contra la operación en otro lado (cloud) y el mapa de la ruta de
      un técnico con su zona sin señal (apps móviles). Se
      escriben en `recorridos-fuente/<slug>.html`; `scripts/recorridos.js` las empaqueta en
      `public/recorridos/` antes de cada build y `src/data/recorridos.js` dice cuáles hay.
      **Indexables y en el sitemap** —hoy 25 URLs—, y cada página de servicio enlaza la
      suya con una banda «Ver el recorrido completo», que aparece sola en cuanto un servicio
      tenga el suyo escrito. Se abren sin cuenta desde cualquier celular:
      <https://alan.loomware-page.pages.dev/recorridos/erp>, `/recorridos/crm`,
      `/recorridos/nomina`, `/recorridos/tienda-en-linea`, `/recorridos/automatizacion`, `/recorridos/software-a-medida`,
      `/recorridos/infraestructura-cloud` y `/recorridos/apps-moviles`.
      En el inicio viven en su propia sección bajo el hero desde el 2026-09-22 (ver el estudio
      comparativo); el «Paso a paso» de las tarjetas se retiró. Verificados con medición: sin
      desborde de 390 a 1440 px, texto y escena sin desfase en escritorio y celular, modo
      claro y oscuro.
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

## Resueltas el 2026-09-20 en la rama `alan`, pendientes de que Aldo las verifique

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

## Hecho antes

- [x] Sitio reconstruido en Vite + React, responsivo verificado de 320 a 1440 px (2026-09-19).
- [x] `/prospectar` sobre la API DENUE del INEGI, con el token del lado del servidor (2026-09-17).
- [x] Formulario enviando por `POST /api/contacto` con Resend, y página `/gracias` (2026-09-19).
- [x] Comandos `/inicio` y `/cierre` como skills en `.claude/skills/` (2026-09-19).
