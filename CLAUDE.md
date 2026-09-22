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
> Mientras tanto Alan terminó el **material de venta**: los ocho recorridos, uno por solución,
> viven en el repositorio como páginas (`/recorridos/<slug>`) y también como artifacts para
> mandar por WhatsApp. Tres puntos de esta lista los afectan y están marcados
> **[material de venta]**.

### Ruta a producción — Aldo, hoy, en este orden

Son **unas dos horas en una sola sentada**. Los pasos 2 y 3 son los que desbloquean todo lo
demás: sin ellos el sitio se ve bien pero el formulario no envía y `/prospectar` responde 500.
El detalle de cada cosa está en los bloques de abajo.

| # | Qué hacer | Dónde | Tiempo |
| --- | --- | --- | --- |
| 1 | **Revisar el preview** en escritorio **y en celular** | <https://alan.loomware-page.pages.dev> | 20 min |
| 2 | **Cargar las 7 variables**, cada una dos veces: *Production* y *Preview* | Cloudflare → `loomware-page` → Settings → Variables and Secrets | 25 min |
| 3 | **Retry deployment** (las variables no se aplican a un despliegue ya publicado) | Cloudflare → Deployments → el último → ⋯ | 2 min |
| 4 | **Avisarle a Alan** que ya revisaste, para que abra el PR | WhatsApp | 1 min |
| 5 | **Mezclar el PR** de `alan` a `main` | GitHub | 2 min |
| 6 | **Probar en producción** | <https://loomware.com.mx> | 15 min |
| 7 | **Verificar el dominio en Resend** y capturar sus 3 registros DNS | <https://resend.com> y Cloudflare DNS | 20 min |
| 8 | **Alta en Search Console** y enviar el sitemap | <https://search.google.com/search-console> | 10 min |
| 9 | **Invitar a Alan a Cloudflare** como Administrator | Manage Account → Members → Invite | 1 min |

**Qué revisar en el paso 1** (cada commit en `alan` explica qué y por qué): abrir el menú en
celular, llenar el formulario hasta el aviso de privacidad, entrar a dos páginas de servicio y
a una de industria, abrir `/prospectar`, y **recorrer dos de los ocho «Paso a paso» desde el
inicio en celular** (por ejemplo ERP y nómina): son la pieza que se le manda al prospecto.

**Qué probar en el paso 6**: enviar el formulario —debe llegar el correo y aterrizar en
`/gracias`—, entrar a `/prospectar` con la contraseña y hacer una búsqueda, y confirmar que
**aparece la banda de cookies**, que sale sola en cuanto `VITE_GA_ID` esté cargado.

Lo que falte de "Datos que faltan" entra después, cada uno por su propio PR.

### Bloquean funcionalidad ya construida — Aldo

- [ ] **Dar de alta el perfil de Google Business.** <https://business.google.com>, media hora y
      gratis. Es lo único que mete a Loomware en el mapa cuando alguien busca «software
      empresarial cerca de mí» o «ERP CDMX». Un dominio nuevo tarda de tres a seis meses en
      posicionar; el perfil de negocio aparece en días. Sin esto, el SEO sólo puede llegar por
      la vía lenta.

- [ ] **Validar los dos supuestos de la calculadora.** `/calculadora` le enseña a un prospecto
      un número en pesos sacado de sus propias respuestas. Toda la cuenta se hace con lo que él
      contesta salvo dos cosas, y las dos se enseñan en pantalla: **1.35 de prestaciones** sobre
      el sueldo bruto y **176 horas al mes**. Si a tu criterio alguno no aplica, se cambia en
      `src/data/calculadora.js` y se actualiza solo. Es el único lugar del sitio donde
      ponemos una cifra que no es del cliente.


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
      sitemap: `https://loomware.com.mx/sitemap.xml` —ahora con **25 URLs**—. En GA4 hay que
      marcar como conversiones los eventos que el código ya reporta: `generate_lead` al llegar
      a `/gracias` (con `metodo` = formulario o calculadora), `click_whatsapp` con el origen,
      y `calculadora_inicio` cuando alguien empieza a contestar. **Hasta que esto no esté,
      todo lo que agreguemos al sitio es a ciegas: no vamos a saber qué funcionó.**

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

- [ ] **El logo ya no lleva degradado** (2026-09-22). La flecha pasa de morado→rosa→rojo a
      **morado sólido `#5326D9`**, en el sitio, el favicon y la tarjeta social. Si el logo
      está en otros lados —WhatsApp Business, firma de correo, tarjetas, plantillas de
      cotización, redes—, hay que actualizarlo ahí también o la marca se ve en dos versiones.
      El archivo vive en `src/components/Logo.jsx` y `public/favicon.svg`; si Aldo necesita
      PNG o SVG suelto para mandar a alguien, se exporta en un minuto.
- [ ] **Confirmar cuáles son las soluciones "de entrada", o si van las ocho parejas.** El
      inicio muestra tres tarjetas completas bajo "Por donde suelen empezar" —las marcadas con
      `entrada: true` en `src/data/servicios.js`: **CRM, ERP y Nómina**— y las otras cinco en
      lista bajo "Y todo lo que las acompaña", cada renglón con su «Paso a paso». Alan lo dejó
      así porque ocho tarjetas iguales eran ocho pantallas en celular y no decían por dónde
      arrancar; las tres de entrada son las de dolor más amplio. **Ahora las ocho tienen
      recorrido**, así que la duda es de jerarquía, no de contenido: si Aldo prefiere las ocho
      parejas, se marca `entrada: true` en todas y el inicio se reacomoda solo (y crece unas
      cinco pantallas en celular). Si ve otra puerta de entrada, es cambiar una bandera.
- [ ] **Nómina y comercio en línea ya están en el sitio** (tarjeta y página cada uno). Confirmar
      que sí se ofrecen; si no, quitarlos de `src/data/servicios.js` y se van solos de todos lados.
- [ ] **Hero.** La ilustración ya es propia: la nave isométrica del recorrido del ERP,
      exportada a SVG (`npm run hero:dibujo`). Si más adelante hay **foto real** del equipo o
      de un proyecto, sigue siendo mejor que cualquier dibujo: se cambia el `<img>` de
      `src/components/Hero.jsx` y se optimiza con `npm run optimizar:imagenes`.

### Resueltas el 2026-09-21 (tercera auditoría: abogado, Google y Google Ads)

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

      **Jerarquía.** Un solo estilo de etiqueta de sección (había dos), todos los encabezados
      **a la izquierda** —centrado es la firma de plantilla—, tarjetas de solución alineadas
      igual, radios de siete a **cuatro**, sombras de cinco a **tres y ninguna de color**, y
      una sola esquina para todos los controles. Botones y campos a 48 px, chips a 44.

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
      En el inicio, cada solución con recorrido lleva su enlace «Paso a paso», también las de la
      lista compacta. Verificados con medición: sin
      desborde de 390 a 1440 px, texto y escena sin desfase en escritorio y celular, modo
      claro y oscuro.
      **Aldo: entran en el PR.** Si prefieres que no se publiquen todavía, se quitan de
      `src/data/recorridos.js` y desaparecen solas del sitemap y de las páginas de servicio.
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
