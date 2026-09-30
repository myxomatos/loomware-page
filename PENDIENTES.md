# Pendientes de loomware-page

Estado al 27 de septiembre de 2026. Quien resuelva un punto, lo tacha y anota la fecha.

> **Revisión de Aldo en curso desde el 22 de septiembre de 2026.** La rama `aldo` trae los 68
> commits de `alan` más los ajustes de la revisión (ver «Resueltas el 2026-09-22/23»), así que
> **el PR a `main` sale de `aldo`**. Preview: <https://aldo.loomware-page.pages.dev>.
> El 2026-09-26 entraron a `aldo` los 49 commits que Alan hizo del 23 al 25 (segunda pasada del
> estudio y pasadas del ERP); sus pendientes, que él seguía escribiendo en `CLAUDE.md`, viven ya
> aquí, repartidos entre «Aldo» y «Alan».
> Después del merge, Alan hace `git merge main` en `alan` para seguir al día.

## Ruta a producción — Aldo, en este orden

Los pasos 2 y 3 desbloquean todo lo demás: sin ellos el formulario no envía y `/prospectar`
responde 500.

| # | Qué hacer | Dónde | Estado |
| --- | --- | --- | --- |
| 1 | Revisar el preview en escritorio y en celular | <https://aldo.loomware-page.pages.dev> | ✅ 2026-09-23 |
| 2 | Verificar `loomware.com.mx` en Resend | Resend y Cloudflare DNS | ✅ 2026-09-23 |
| 3 | Cargar las variables, cada una en *Production* y en *Preview* | Cloudflare → `loomware-page` → Settings → Variables and Secrets | `RESEND_API_KEY` ✅ 2026-09-24; `DENUE_TOKEN` y `PROSPECT_KEY` ✅ 2026-09-29 (producción); falta `VITE_GA_ID` |
| 4 | **Retry deployment** (las variables no aplican a un despliegue ya publicado) | Cloudflare → Deployments → el último de la rama → ⋯ | Repetir tras cada variable nueva |
| 5 | Probar en el preview: enviar el formulario (debe llegar el correo y aterrizar en `/gracias`) y buscar en `/prospectar` | Preview | Formulario ✅ 2026-09-24: llega de `web@` a `aldo_sanchez@` y «Responder» va al prospecto |
| 6 | Abrir el PR de `aldo` a `main`, revisarlo con `mattpocock-skills:code-review` y mezclarlo | GitHub | ✅ 2026-09-27 (PR #4). Se mezcló sin cerrar las validaciones de contenido de «Aldo»; lo que no cuadre entra en otro PR |
| 7 | Probar en producción, y confirmar que aparece la banda de cookies si ya está `VITE_GA_ID` | <https://loomware.com.mx> | 2026-09-27: las 25 URLs del sitemap dan 200, `/api/contacto` contesta y la CSP está puesta. Formulario probado en producción: el correo llega y «Responder» va al prospecto. Falta la banda de cookies (sin `VITE_GA_ID`) |
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

Para saber si `DENUE_TOKEN` y `PROSPECT_KEY` quedaron, sin entrar a nada:
`curl https://aldo.loomware-page.pages.dev/api/denue/BuscarEntidad/todos/09/1/1`. Mientras falten
responde 500 *«Falta configurar: DENUE_TOKEN, PROSPECT_KEY»* (lista todas las que faltan desde el
2026-09-24); cuando las dos estén, **401 «Contraseña incorrecta»**, que es la señal de que quedó.

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
- [ ] **Cita de Simagas.** Su caso ya está en `#casos` con logotipo (autorizado). Falta quién
      firma la cita: Aldo lo confirma con ellos. Cuando haya resultados medidos, reemplazan el
      «En implementación» de `src/data/casos.js`.
- [ ] **Contrato de encargado para los proyectos con datos de salud.** Con el ISSSTE aplica la
      LGPDPPSO (art. 53: contrato con cláusulas mínimas) y con clínicas privadas la LFPDPPP
      (Loomware es «encargado»). La NOM-024 alcanza también a quien desarrolla o comercializa
      el sistema (numeral 1.2). Las apps de salud, publicadas con la cuenta del cliente.
      Revisión del 2026-09-29, no es asesoría legal: que lo vea un abogado.
- [ ] **Que el contrato respalde lo que dice el sitio** — *[material de venta]*: «el contrato te
      entrega el código, la base de datos y la documentación» y «precio cerrado por ese alcance;
      si lo amplías, se cotiza aparte y lo apruebas tú». También va en el recorrido del ERP.
- [x] ~~**Validar precio, plazos, migración y SAT**~~ — 2026-09-27, con Aldo. Plazos y SAT se
      quedan como estaban. La migración se define en el diagnóstico y va en la propuesta (ya no
      «parte del proyecto, no un extra»; el conteo físico del ERP pasó a «te ayudamos a
      organizarlo»). Hay dos formas de tener un sistema: **los de Loomware, con cuota mensual
      que se define en cada contrato**, o **uno a la medida que es del cliente**; la FAQ lo dice
      como elección y «¿Cuánto cuesta?» menciona la cuota. Software a medida dejó de pintar la
      renta por usuario como lo malo: el contraste es el sistema de catálogo que no se ajusta.
      Fuera «muchos clientes» de nómina y tienda en línea.
- [x] ~~**Validar las seis páginas de industria**~~ — 2026-09-29, con Aldo. El cliente objetivo es
      la **pequeña y mediana empresa, con mucha experiencia en la mediana**; lo grande (Simagas, la
      red de 18 hospitales) es credencial, no mercado. Las industrias suben el tono a empresa
      mediana —almacenes, sucursales, turnos, varias obras— y todo lo que prometen se presenta
      como a la medida. «Clínicas y servicios profesionales» pasó a **Salud**
      (`/industrias/salud`; la URL vieja redirige), con «historial del paciente» en vez de
      «expediente clínico». Fuera «meses sin intereses» de comercio.
- [x] ~~**Confirmar que nómina y comercio en línea se ofrecen.**~~ — 2026-09-29: sí. Nómina como
      servicio (se cobra por empleado calculado y timbrado) o como herramienta a la medida;
      comercio en línea siempre a la medida y lo administra el cliente.
- [ ] **GT-SHOP, extras.** Eduardo ya aprobó la cita y el uso de la marca (2026-09-22). Si los
      tiene: el archivo original del logotipo (el de hoy salió de una captura) y una medición real
      —pedidos, tiempo de entrega, devoluciones— que reemplace el `resultado` en `src/data/casos.js`.
- [ ] **Video de «Ver cómo funciona».** Subirlo a YouTube como *No listado* y poner la URL en
      `src/data/video.js`; también acepta un MP4 de menos de ~15 MB en `public/video/`.
- [ ] **Analítica.** Crear la propiedad de GA4 y marcar como conversiones los eventos que el
      código ya reporta: `generate_lead` (con `metodo` = formulario o calculadora),
      `click_whatsapp` con el origen, y `calculadora_inicio`. Desde el 2026-09-27
      `generate_lead` se cuenta una vez por envío: antes la calculadora contaba doble y abrir o
      recargar `/gracias` contaba uno falso.
- [ ] **Logo en otros lados.** El logo del sitio es ahora la nube de cuatro lóbulos, sin
      degradado (2026-09-22). Actualizarlo en WhatsApp Business, firma de correo, tarjetas y
      plantillas de cotización. Vive en `src/components/Logo.jsx` y `public/favicon.svg`.

- [ ] **Límite de intentos para `/prospectar`.** La Function compara la contraseña sin tope de
      intentos y el repositorio es público, así que cualquiera sabe dónde probar. Se cierra sin
      código: Cloudflare → Security → WAF → *Rate limiting rules*, una regla para la ruta
      `/api/denue/` (por ejemplo, 10 peticiones por minuto por IP y bloqueo de 10 minutos).
      Salió de la revisión del PR #4 (2026-09-26).

- [ ] **Revisar lo que Alan cambió del 23 al 25 de septiembre**, antes de mezclar:
      1. **La sección de casos de éxito quedó rehecha** (`#casos`). El caso de Eduardo es el
         mismo, palabra por palabra; ahora va en tres bandas numeradas —quién es · 01 qué
         necesitaba · 02 qué se construyó · 03 qué cambió— y cierra con su cita.
      2. **El recorrido del ERP enseña la pantalla del sistema** al terminar los seis pasos. Son
         cifras de ejemplo y lo dice tres veces; aun así, échales un ojo.
      3. **Cada recorrido trae su propia imagen de vista previa** para WhatsApp. Se ve pegando el
         enlace en una conversación contigo mismo.

- [x] ~~**Alan: pasarle a Aldo el token del INEGI, y Aldo cargarlo.**~~ Cargados `DENUE_TOKEN` y `PROSPECT_KEY` en producción con `wrangler pages secret put` el 2026-09-29 (la versión 4 de wrangler ya no acepta `--env preview`: el preview, si hace falta, en el panel). `/prospectar` busca en producción. Desbloquea `/prospectar`
      (paso 3 de la ruta): `DENUE_TOKEN` es de Alan y Aldo no puede capturarlo hasta que se lo manden por
      un canal privado. **Probado contra el INEGI el 2026-09-24: el token sirve.** El mensaje,
      listo para copiar —el token va en **otro mensaje**, nunca junto con estas instrucciones—:

      > Aldo, esto desbloquea `/prospectar`. Son 10 minutos en Cloudflare.
      >
      > En el siguiente mensaje te mando el token del INEGI. Va en **Workers & Pages →
      > `loomware-page` → Settings → Variables and Secrets**, y hay que capturarlo **dos
      > veces**: una en *Production* y otra en *Preview*, las dos con **Encrypt** activado.
      >
      > • `DENUE_TOKEN` → el del mensaje de abajo
      > • `PROSPECT_KEY` → la contraseña para entrar a `/prospectar`. La escogemos entre los
      > dos. También va con Encrypt, y también dos veces.
      >
      > Al terminar: **Deployments → el último → ⋯ → Retry deployment**. Las variables no se
      > aplican solas a un despliegue ya publicado.
      >
      > Para saber si quedó, sin entrar a nada:
      >
      > `curl https://alan.loomware-page.pages.dev/api/denue/BuscarEntidad/todos/09/1/1`
      >
      > Hoy responde *«Falta configurar…»* con 500. Cuando quede bien va a responder **401
      > «Contraseña incorrecta»** — ese error es la señal de que está listo.
      >
      > Cuando lo tengas cargado, borra el mensaje del token de la conversación.

      **La contraseña no se escribe aquí.** El borrador que se le mandó a Alan traía una
      propuesta concreta; se quitó de este archivo porque **el repositorio es público**
      —comprobado el 2026-09-24 con la API de GitHub: `private: false`—, y una contraseña
      escrita en un archivo público deja de ser contraseña. Se acuerda por el mismo canal
      privado que el token, y vive nada más en Cloudflare.

- [x] ~~**Las cuatro afirmaciones de seguridad**~~ — 2026-09-27, decidido con Aldo. Todo lo
      que promete Infraestructura Cloud se hace, pero **se vende a la medida**: qué incluye, con
      qué frecuencia y quién lo opera se define en el diagnóstico y queda en el contrato; Loomware
      hospeda en su infraestructura o en la del cliente, y lo opera Loomware o el equipo del
      cliente. La página de servicio, su FAQ y el recorrido lo dicen así; salieron «vigilancia
      permanente», «nos enteramos antes que tus usuarios», «24 horas» y las cifras de respaldo
      (2:00 am, 30 días, cada mes). **Sigue en pie que el contrato lo refleje**, dentro del punto
      del contrato de arriba.

- [x] ~~**La página del ERP promete que la fecha de entrega va en el contrato.**~~ Confirmado por Aldo el 2026-09-27: se queda. El recorrido
      decía antes «el primer módulo operando en semanas», que era un plazo al aire. Se cambió
      por algo más honesto y **más obligante**: *«La fecha te la damos en el diagnóstico, y esa
      fecha va en el contrato»*. Para sostenerlo hacen falta dos cosas: que **cada diagnóstico
      termine con una fecha**, y que el **contrato tenga dónde escribirla**. Si el contrato no
      la tiene, la página está prometiendo algo que no se cumple. Si Aldo prefiere no
      comprometer fecha, se quita esa línea de `recorridos-fuente/erp.html`; y si tiene un
      rango real —«el primero entre 4 y 8 semanas»—, se pone y queda mejor que las dos.

- [x] ~~**Decidir si el «99.9% de disponibilidad» se queda en el dibujo del hero.**~~ —
      2026-09-27: se cambió por «al día · respaldos» en `scripts/hero-sistema.js`.

## Alan

Salió de la segunda pasada del estudio (2026-09-22): al volver a medir la página contra los
veintidós sitios aparecieron cosas que son nuestras. Ninguna bloquea a las de Aldo. El PR que
Alan iba a abrir ya no hace falta: el #4 sale de `aldo` y trae su rama completa.

- [ ] **La página del ERP no dice cuánto tiempo le quita al prospecto.** El cierre ofrece el
      diagnóstico pero no dice si son treinta minutos o tres días, y ésa es la objeción que
      queda. Aldo validó el 2026-09-23 *«una llamada de 30 minutos, sin costo»*, así que ya se
      puede traer al recorrido: es una línea de `recorridos-fuente/erp.html`.

- [ ] **Cuando el PR se mezcle, los artifacts de WhatsApp van al dominio.** Desde la revisión
      de Aldo (2026-09-23), los dos enlaces de cada archivo de `recorridos-fuente/` —la marca y
      «formulario del sitio»— son relativos: sirven en la página del sitio, pero en un artifact
      suelto de claude.ai no llevan a ningún lado. Al mezclar, o se publican los artifacts con
      esos dos enlaces en absoluto a `https://loomware.com.mx`, o se deja de mandar el artifact y
      se manda sólo el enlace del sitio, que ya es lo que recomienda este archivo.

- [ ] **Revisión minuciosa de las ocho tarjetas del «Paso a paso», una por una.** Es la tarea
      grande de Alan. El ERP lleva cinco pasadas y **todavía no se cierra**; las otras siete no
      han tenido ninguna. La receta que salió de destruir el ERP, en este orden:

      1. **Qué es, explicado a un niño de 10 años.** La definición primero, antes de tocar
         nada. Si no se puede decir en una línea sin una palabra de oficina, el recorrido no
         está listo.
      2. **La prueba de los ocho giros.** Que el camino sirva igual para una clínica, una obra
         y un despacho, no sólo para el giro del dibujo.
      3. **Cacería de palabras de oficina.** En el ERP sobrevivieron tres rondas: «timbrada»,
         «padrón», «en paralelo». Hay que buscarlas también **en el guion**, no sólo en el
         texto: la del paso 04 vivía en la tabla de estados.
      4. **Medir con la CSP puesta, no en local a secas.** `http-server` no manda
         encabezados, así que en local carga cosas que el sitio publicado bloquea. Los ocho
         recorridos se vieron tres días con la tipografía equivocada por eso. Se inyecta la CSP
         como `meta` en una copia, o se mide contra el preview.
      5. **Medir el teléfono, no verlo.** Cuánto ocupa lo que se queda pegado y si el paso cabe
         en lo que sobra. El ERP dejaba 254 px para pasos de hasta 386 y **ninguno cabía**.

         **Medido el 2026-09-24 en los siete que faltan, a 360×740 —un teléfono chico—: los
         siete tienen el mismo problema.** Lo pegado mide de 465 a 524 px de los 740 y deja
         de 216 a 275 para leer, cuando sus pasos miden de 269 a 341. A 390×844 sí caben, así
         que sólo se ve en pantalla chica. La salida ya está probada en el ERP: sacar de lo
         pegado todo lo que no sea el dibujo con su rótulo y su pie, y `display:contents` en
         el contenedor para que lo pegado cuelgue de la columna y no se despegue a medio
         camino.
      6. **Contar los botones** y que cada uno diga qué hace.
      7. **La pantalla del sistema.** El ERP ya la tiene; las otras siete enseñan sólo su
         objeto —el tablero de corcho, la tarjeta de checado, los dos maniquíes—, que es el
         mundo y no el sistema. La pieza es reusable —HTML con las variables de la propia
         página, hereda el modo oscuro y reflúye—, pero **los números son el trabajo de
         verdad**: los del ERP cuadran con los de su recorrido a propósito, y eso no se copia
         y se pega.

      8. **La tarjeta del enlace.** Los ocho ya la tienen, una por recorrido
         (`npm run og:recorridos`). Cuando cambie el título o el resumen de uno en
         `src/data/recorridos.js`, **hay que volver a correrlo**: la tarjeta trae ese texto
         horneado y el build no la regenera, porque necesita el sitio servido.

      **Lo que la comparación del 2026-09-25 dejó abierto en el ERP, y vale para los ocho:**

      - **La primera pantalla no vende.** Bind mete en esos mismos 844 px: «HECHO EN MÉXICO ·
        CERTIFICACIÓN OFICIAL», «El ERP mexicano en la nube para PyMES», para quién es, un
        botón grande, un segundo botón asomando y un rostro. Nosotros: etiqueta, titular, ocho
        renglones de párrafo y un diagrama. **Cero botones, cero prueba, y no decimos para
        quién es.** Nuestra primera puerta está a **5.3 pantallas**; la de Bind a **0.7**.
      - **El título de búsqueda no compite.** El nuestro es «Del trabajo hecho al dinero
        cobrado · ERP | Loomware»: la palabra que la gente teclea va en sexta posición. Bind
        abre con «ERP mexicano en la nube para PyMEs», Alegra con «Sistema de Facturación
        Electrónica #1 en México», Xero con «Accounting Software for Your Small Business».
        **Y estas páginas están en el sitemap**, o sea que sí reciben tráfico frío.
      - **Seis imágenes, y las seis son dibujos nuestros.** Cero fotos, cero capturas de
        software funcionando, cero rostros. Misma conclusión que el estudio de los 22.
      - **El titular no dice qué vendemos.** Funciona para quien ya sabe qué es esto; para
        quien llega de Google no dice ni producto ni destinatario.

      *La lectura:* la página es técnicamente la mejor del grupo y por mucho. Pierde en lo que
      decide una venta fría, y no por mala ejecución sino porque hoy hace dos trabajos: es un
      **explicador** para quien ya te conoce —y ahí es excelente— y una **página de aterrizaje**
      para quien te busca —y ahí está desnuda—. Se arregla sin tocar lo que funciona: una franja
      de acción arriba y un título que empiece por la palabra buscada.

      **Y tres de texto, pendientes de decidir con Aldo:** la entrada de 61 palabras y ocho
      renglones; el título «Todo negocio sigue algo», que no significa nada hasta que ya leíste
      las seis tarjetas de abajo; y el «Hoy:» de esas tarjetas en el color más apagado de la
      tarjeta, cuando es la parte que engancha.

      **Estado: ERP en curso (nueve pasadas). CRM, nómina, tienda en línea, automatización,
      software a medida, infraestructura cloud y apps móviles: sin empezar.**

      **Lo que falta del ERP y no es mío:** los blancos táctiles —el logotipo mide 26 px de
      alto, el botón del recorrido 29 y los dos de contacto 42, cuando el sistema del sitio dice
      48 y la recomendación de accesibilidad es 44—, y la pantalla del sistema para los otros
      siete.

- [ ] **Faltan los rostros, y ésos sí dependen de Aldo.** Xero abre con la foto de una panadera
      real en su obrador. Nosotros seguimos en **cero rostros**, porque `src/data/equipo.js`
      está en blanco: las dos personas existen pero sin cargo ni foto, y la tarjeta sólo aparece
      cuando tiene las dos cosas. Está en la lista de Aldo, en «Equipo».

- [ ] **Falta material que responda preguntas de búsqueda.** La portada ya está a la par
      —1 995 palabras contra 1 964 de Bind, ver arriba—, pero eso no es lo que decide el
      posicionamiento de un dominio nuevo: lo decide tener páginas que contesten lo que la
      gente escribe en Google. Hoy el sitio tiene 25 URLs y **ninguna es de ese tipo**: son
      servicios, industrias, recorridos y herramientas, todas escritas para quien ya llegó.
      Falta lo que se busca antes de llegar —«cuánto cuesta implementar un ERP en México»,
      «cómo migrar de Excel a un sistema», «qué pide el SAT para facturar»—. Ojo: varias de
      esas respuestas son política de la empresa y **necesitan el visto bueno de Aldo antes de
      publicarse**, igual que las de `src/data/faq.js`. Alegra tiene 3 378 palabras en su
      portada y un blog detrás; la portada no es donde se gana esto.

## Decisiones abiertas

- [x] ~~**Precio — movimiento 05 del estudio comparativo.**~~ — 2026-09-27, decidido por Aldo:
      **no se publica ninguna cifra**, ni del proyecto ni del diagnóstico (el diagnóstico no tiene
      precio fijo: depende del tipo y del tamaño de la empresa). En su lugar, se presume con
      hechos y el precio se dice proporcional: «No competimos por ser los más baratos, sino por
      que funcione», «trabajamos igual con una sucursal que con una operación de varias sedes y
      miles de usuarios» —sin un número de usuarios, que se volvería techo—, y el camino
      completo: llamada de 30 minutos sin costo → diagnóstico con su precio → propuesta con
      precio cerrado → soporte en contrato aparte. En la FAQ, con un botón «¿Cuánto costaría en
      tu empresa?», y en el recorrido del ERP. La insignia «Precios competitivos» del hero pasó a
      «Quien diagnostica, diseña».
- [ ] **Más casos de éxito.** Hay tres: Simagas, la red de 18 hospitales (anónimo) y GT-SHOP
      (2026-09-29). Los siguientes se preparan con `npm run logo:cliente <origen> <destino>`
      —con el SVG o PNG original del cliente usa su transparencia— y se escriben en
      `src/data/casos.js`.
- [ ] **Conversión de bajo compromiso.** Una guía descargable («Checklist: ¿tu empresa necesita
      un ERP?») para quien aún no quiere llamada.
- [ ] **Remarketing.** Píxel y audiencias cuando arranquen con Ads.
- [ ] **Autoridad para SEO.** LinkedIn de empresa, directorios de industria, cámaras (Canacintra,
      Canaco) y menciones de clientes.
- [ ] **Hero.** Ya no es una ilustración: es la pantalla de ejemplo del sistema, con los ocho
      módulos (`npm run hero:sistema`). Sigue en pie lo de siempre: si algún día hay **una
      captura real** —con autorización del cliente y los datos cubiertos— vale más que cualquier
      dibujo, porque es lo único que nos pondría a la par de Bind y Xero en esa ficha del estudio.
      Se cambia el `<picture>` de `src/components/Hero.jsx`.

## Resueltas el 2026-09-25 (séptima y octava pasada del ERP, y la medición contra el grupo)

- [x] **Dónde queda el recorrido del ERP contra siete páginas comparables.** No es el estudio
      de la portada: se midieron páginas que hacen **el mismo trabajo** —explicarle un módulo a
      un prospecto—, el 2026-09-25.

      | | TTFB | HTML | nodos | scripts | terceros | palabras | imágenes |
      | --- | --- | --- | --- | --- | --- | --- | --- |
      | **Loomware · ERP** | **233 ms** | **70 KB** | **655** | **1** | **0** | 1 693 | **6** |
      | Bind · ERP | 399 ms | 155 KB | 998 | 50 | 31 | 1 663 | 28 |
      | Alegra · Facturación | 553 ms | 289 KB | 1 570 | 24 | 29 | 3 733 | 140 |
      | Siigo · Contable | 478 ms | 1 106 KB | 1 565 | 28 | 43 | 2 636 | 39 |
      | Xero · Accounting | 612 ms | 480 KB | 2 691 | 39 | 18 | 2 688 | 139 |
      | Holded | 684 ms | 906 KB | 2 979 | 9 | 25 | 3 126 | 301 |
      | Zoho · Books | 512 ms | 210 KB | 2 899 | 34 | 17 | 4 096 | 192 |
      | Stripe · Payments | 438 ms | 1 186 KB | 5 841 | 2 | 10 | 5 195 | 557 |

      **Primeros de ocho en las cinco medidas técnicas, y con margen**: la segunda página más
      ligera pesa el doble, el segundo sitio más rápido tarda 70 % más, y **somos los únicos
      que no le piden nada a ningún tercero** —los demás van de 10 a 43 dominios—. Un script
      contra los 50 de Bind.

      **Penúltimos en palabras y últimos en imágenes.** Las cifras de Stripe conviene tomarlas
      con reserva: su conteo de encabezados salió absurdo (68 `h1`), señal de que el método
      de conteo no distingue bien en páginas armadas por componentes.

### Octava pasada: la página publicada, tramo por tramo

- [x] **Diecinueve hallazgos, nueve de ellos metidos por Claude en las siete pasadas
      anteriores.** Los que se cerraron: los **$41,760 valían tres cosas a la vez** —un pedido
      en el paso 04, «facturado hoy» en la pantalla y la ganancia de cuatro clientes «este mes»
      en la tabla—, y la pantalla pasa a ser del mes de punta a punta; **«cinco pasos» contra
      «Seis pasos»** a doscientos píxeles de distancia; **«pérdidas»**, que salía una sola vez
      en toda la página sin que ningún paso hablara de ellas; **un rótulo que nunca se veía**
      porque el guion lo pisaba al cargar; **«En otro negocio» faltaba en los pasos 05 y 06**,
      justo los del dinero; **la calculadora no se enlazaba** aunque contesta exactamente las
      cinco preguntas del cierre; y **tres frases del FAQ salían en monoespaciada cobre** dentro
      de párrafos normales —las tres más comprometidas de la página— por un selector demasiado
      ancho.

      **Una corrección:** dije que «un ERP es la libreta única» choca con su dibujo. No choca
      —el dibujo dice cinco arriba y una sola abajo, que es lo que la frase promete—. Lo que no
      encajaba era que los recuadros están rotulados como áreas y el pie los llamaba libretas.

### Séptima pasada: lo que nunca se había medido

- [x] **Los ocho recorridos se veían con la tipografía del teléfono, no con la nuestra.**
      Pedían Azeret Mono y Archivo a Google Fonts, y **nuestra propia CSP las bloquea**:
      `style-src 'self'` y `font-src 'self'`, comprobado en el encabezado que manda el
      preview. Medido con esa CSP inyectada: **cero tipografías en el documento** y el titular
      a 280.4 px en vez de 331.5. **Desde que la CSP entró, el 22 de septiembre**, los ocho se
      veían con la monoespaciada que trajera el aparato —Consolas, Menlo, lo que hubiera— y
      distinta en cada teléfono. Es la pieza que este archivo llama lo mejor diseñado que tiene
      Loomware, y la que se manda por WhatsApp.

      **Por qué se tardó tres días en verse:** en local se sirve con `http-server`, que no manda
      encabezados, así que las fuentes cargaban desde Google y todo se veía bien. **Una medición
      local no dice nada sobre lo que la CSP deja pasar**; hay que inyectarla como `meta` o
      mirar el sitio publicado.

      Ahora se sirven desde el dominio. Los subconjuntos que ya existían no servían —el de
      Azeret Mono es sólo mayúsculas y el de Archivo tiene el eje fijo en 700—, así que
      `npm run fuente:recorridos` saca los suyos con el eje de peso abierto, y **los caracteres
      salen de los propios ocho archivos**: 127 glifos, 12.1 KB y 14.3 KB. La fuente en
      `recorridos-fuente/` se queda con Google Fonts porque el artifact suelto de WhatsApp no
      tiene `/fonts/`; y si algún día una se cuela, **el empaquetador falla en vez de
      publicarlo**.

      Comprobado después, con la CSP puesta: los ocho cargan las dos familias, **cero caracteres
      sin glifo**, y el titular vuelve a 331.5 px —idéntico a la versión con Google Fonts, o sea
      que el recorte es la misma tipografía—. El visitante baja **43.4 KB en tres peticiones**,
      todas al mismo dominio.

- [x] **El paso que se está leyendo se anuncia a quien no ve la pantalla.** El teclado ya
      funcionaba —doce elementos en orden, los seis pasos reciben el foco y responden a Enter,
      los tres controles con contorno visible—, pero el paso actual sólo se marcaba con color
      y con la raya: un lector de pantalla anunciaba seis secciones iguales. Ahora lleva
      `aria-current="step"`, puesto donde ya se pone la clase.

      **Lo que no se hizo, y por poco:** `role="button"` en la sección. Convierte al elemento
      en una hoja del árbol de accesibilidad, así que se anunciaría todo el texto del paso como
      el nombre de un botón y se perderían su título y sus tres renglones. El paso es contenido
      que además se puede picar.

## Resueltas el 2026-09-24 (sexta pasada del ERP, y lo que salió midiéndola)

- [x] **El recorrido no tenía nombre.** El índice del documento iba de «Todo negocio sigue algo»
      directo a «Llega la mercancía»: seis encabezados hermanos, del mismo nivel que «Antes de
      que preguntes», sin nada que los presentara ni que dijera cuántos son. Lo único que había
      era «Baja para recorrerlo», que es una instrucción, no un nombre. Para quien lee con los
      ojos se entiende por el dibujo; para quien lee el índice —un buscador, un lector de
      pantalla, quien salta de encabezado en encabezado— **el recorrido no existía como pieza**.
      Ahora se llama «Seis pasos, un solo pedido» y los seis pasan de `h2` a `h3`.
      **Índice medido: cero saltos de nivel.**

- [x] **La primera puerta se había ido a 6.1 pantallas, y fue culpa mía.** Ese botón existe
      porque el único que había estaba a 6.6 del inicio; se puso justo al terminar los seis
      pasos, en 4.9. El 23 metí la pantalla del sistema **entre los dos** y lo empujó de vuelta.
      Además el botón dice *«¿Te viste en alguno de los seis pasos?»*: habla de los pasos, así
      que va pegado a ellos. Queda en **5.3 pantallas de 8.7** —el 61 % del recorrido, contra el
      71 %—.

- [x] **En el teléfono la leyenda del dibujo no se veía.** Estaba en `display:none` abajo de
      880 px, así que quien lee en celular —la mayoría, y esta pieza se manda por WhatsApp— veía
      una línea punteada saliendo de cada parada sin nada que dijera que eso es **lo que se
      anota y viaja al sistema**, que es la idea entera del recorrido. Sale del bloque pegado
      —ahí serían píxeles que le quito a la lectura del paso— y se lee una vez, junto a la
      ficha. Cuesta 0.1 pantallas.

- [x] **Cada recorrido lleva ya su propia tarjeta social** (`npm run og:recorridos`, 8
      tarjetas, 180 KB). Los ocho compartían `og-image.png`, la genérica del sitio, y **estas
      páginas existen para mandarse por WhatsApp**: lo primero que ve el prospecto no es la
      página, es la tarjeta del enlace. Ocho enlaces distintos que se previsualizaban idénticos
      parecen el mismo enlace mandado ocho veces. Cada una lleva la escena de su propio
      recorrido, con la paleta del recorrido y no con el morado del sitio, porque la tarjeta
      debe parecerse a lo que abre.

- [x] **Y la tarjeta apuntaba a un 404. Eso estaba vivo.** Comprobado con `curl`:
      `loomware.com.mx/og-image.png` **responde 404**, porque producción sigue sirviendo el
      sitio viejo y su tarjeta es otro archivo (`hero_desktop-1400w.png`, de los PNG que esta
      rama borró). Como el enlace que se comparte es el preview de la rama, WhatsApp pedía la
      imagen al dominio, no la encontraba y **no mostraba ninguna**: la pieza que existe para
      mandarse por WhatsApp se previsualizaba en blanco.

      `og:image` es la única URL absoluta de la página que **tiene que resolver ahora mismo**
      —el canonical puede y debe seguir apuntando al dominio, así el preview no compite en el
      buscador—. `scripts/base-publica.js` la cuelga del preview de la rama cuando el build no
      es de `main`, usando `CF_PAGES_BRANCH`, que Cloudflare pone en cada build. Aplica a los
      recorridos, a servicios e industrias y a las páginas que arma Vite. Probado en los tres
      modos, y las **47 tarjetas del sitio construido apuntan a un archivo que sí se publica**.

- [x] **Los casos de éxito se leen en un solo orden.** La tarjeta era una reja de dos por dos
      y eso dejaba **la cita y el resultado lado a lado** en el renglón de abajo: dos cosas sin
      relación que se leen como pareja, y ninguna pista de por dónde empezar. Ahora son tres
      bandas —quién es · qué pasó (01·02·03) · lo que dice el dueño—. Y cuatro cosas que
      confundían: el subtítulo prometía tres cosas y la tarjeta titulaba otras tres; «GT-SHOP»
      aparecía tres veces; el distintivo del servicio flotaba sin decir qué era; y «Resultado»
      iba sobre placa morada, cuando el morado es la marca y lo que se pica. **El texto del caso
      no cambió ni una palabra.** Medido con uno y con tres casos, en cinco medidas.

- [x] **Salieron dos cosas de la pantalla del ERP que Claude había escrito sin base.** La
      primera, *«el que más te compra es el que menos te deja»*, no era una suposición sino algo
      peor: **los cuatro renglones estaban inventados para que ese patrón saliera**, y después
      la conclusión se escribió como si la tabla la revelara. La segunda, *«no se enseña la
      pantalla de un cliente y los nombres no se inventan»*, es una regla nuestra que al
      prospecto no le toca leer. Las dos fuera; la tabla gana encabezados —Cliente · Facturado ·
      Ganancia— y con eso el renglón cubierto se explica solo. Las cifras siguen cuadrando:
      suman los $41,760 del paso 04 y su ganancia da el 22.4 % del paso 06.

      **Las dos quedaron como regla del proyecto**, arriba en «Reglas del proyecto», con su
      fecha y su porqué.

- [x] **Corrección de un arreglo del mismo día.** Subir el botón del recorrido a 44 px de alto
      le sumó 15 px al bloque que se queda pegado arriba, y a **360×740** eso dejó fuera cuatro
      de los seis pasos por entre 2 y 11 px. A 390 no se notaba. El blanco táctil no necesita
      que la caja crezca: un área transparente lo lleva a 45 px sin ocupar pantalla. Medido
      otra vez: 6 de 6 en 360, 390, 430 y 768.

- [x] **La tarjeta del enlace, comprobada en vivo.** No sólo en el build:
      `alan.loomware-page.pages.dev/recorridos/erp` sirve hoy su `og:image` apuntando al
      preview de la rama, y esa imagen **responde 200**. O sea que `CF_PAGES_BRANCH` hace lo
      que se esperaba y el enlace que se manda por WhatsApp ya enseña algo.

## Resueltas el 2026-09-23 (quinta destrucción del recorrido del ERP)

Las cuatro pasadas anteriores destriparon palabras. Ésta midió **el aparato**, que nunca se
había comprobado, y de ahí salió lo más grave.

- [x] **En el teléfono nunca se veía un paso completo junto a su dibujo**, que es la única
      promesa del formato. Medido a 390×844: lo que se quedaba pegado arriba medía **590 px de
      los 844** y dejaba 254 para leer, cuando los pasos miden de 269 a 386. **Ninguno de los
      seis cabía**: el mejor se veía al 69 %, el peor al 53 %.

      Y de esos 590 px el dibujo eran **215**. Los otros 375 eran el rótulo, el pie y la ficha
      de los cinco papeles, que sola pesaba 214 —lo mismo que el dibujo— y repetía el código
      que el rótulo ya dice arriba: «PED-3471» salía dos veces en la misma pantalla. Ahora en
      celular sólo se queda pegado el dibujo; la ficha se lee una vez, antes de los pasos.

      Hizo falta además sacar la caja que cortaba el pegado: **un elemento pegado sólo se queda
      dentro de la caja de su padre**, y la de `.figure` terminaba donde empiezan los pasos,
      así que el dibujo se despegaba en el paso 03. Con `display:contents` cuelga de
      `.cols`, que abarca los seis. Medido después: **6 de 6 pasos legibles completos con el
      dibujo en pantalla, en 360, 390, 430 y 768 px.**

      **Sólo el ERP fallaba.** Se midieron los ocho: los otros siete pegan de 466 a 498 px
      (55–59 % del teléfono) y sus pasos sí caben. El ERP era el peor porque era el único con
      la ficha adentro.

- [x] **La página decía «en la pantalla» y nunca enseñaba una.** Cero imágenes en 1 516
      palabras: el dibujo es una bodega vista desde arriba —enseña **el mundo**, nunca **el
      programa**—, así que quien leía los seis pasos seguía sin saber qué vería todos los días.
      Ahora, al terminar los seis pasos, está el tablero: las cinco áreas, tres cifras y la
      ganancia por cliente.

      Va en **HTML y no en SVG**, por tres razones medidas en esta misma página: un lienzo fijo
      encoge su texto en el teléfono —el diagrama de arriba acababa en 5.2 px y hubo que
      dibujarlo dos veces—; el recorrido tiene **modo oscuro** y su acento es **cobre**, no el
      morado del sitio, así que un archivo con los colores horneados se vería mal en los dos
      casos; y es texto, o sea que lo lee un buscador y lo lee quien no ve la pantalla.

      **Los números son los del propio recorrido y cuadran:** los cuatro renglones suman
      exactamente los $41,760 de la factura del paso 04 y su ganancia ponderada da el 22.4 %
      del paso 06. Y dicen algo: **el que más compra deja el margen más bajo** —16.8 % contra
      31.4 %—, que es lo que el paso 06 promete y lo que no se ve cuando la cuenta se hace a
      fin de mes. **Aldo: si esa lectura no te parece, se cambia la tabla; son cifras de
      ejemplo y lo dice al pie.** Cuesta 0.9 pantallas de celular —de 7.7 a 8.6—.

      Las dos reglas del hero se aplican igual: no se enseña la pantalla de un cliente —lo dice
      adentro, en su esquina— y donde iría una razón social va un renglón gris.

- [x] **Palabras de oficina que habían sobrevivido tres rondas.** «Timbrada» seguía viva en el
      rótulo del paso 04 y «se timbra» en la pregunta 03, dos rondas después de haberlas
      quitado del resto; «padrón» y «en paralelo», fuera; **«gratis» convivía con «sin costo»**
      a tres pantallas, después de haberlo quitado de todos los botones del sitio. Y el paso 02
      **prendía ENT-2207** mientras el rótulo hablaba de «312 piezas»: quien sigue el papel veía
      encenderse un número que no aparecía en ninguna otra parte del paso.

- [x] **Dos fallas del aparato.** El botón «Que avance solo» **volvía a decir «Reproducir»** al
      terminar de correr —el guion le reescribía el nombre viejo—, y el dibujo apilado del
      teléfono **se le anunciaba a un lector de pantalla** igual que el ancho: la misma escena,
      descrita dos veces seguidas.

- [x] **Sin JavaScript, los ocho recorridos se leían rotos.** La escena se dibuja desde el guion
      dentro de un `<g id="world">` que llega vacío: quedaba un recuadro con borde y nada
      adentro, un botón que no avanza y un rótulo que anuncia «01 / 06» de un dibujo que no
      existe. Y lo peor no era el dibujo: los pasos empiezan en opacidad .34 y sólo el primero
      trae la clase que los enciende, así que **cinco de los seis se leían al 34 %**. Cinco
      reglas dentro de `<noscript>` los caen a un artículo que se lee entero.

      No cubre el caso de que el guion exista y falle: ahí JavaScript está encendido y
      `<noscript>` no aplica. Las reglas se revisaron leyendo la cascada, no renderizando con
      guiones apagados: `--disable-javascript` no surte efecto en Edge headless nuevo.

- [x] **El 404 era la única página que seguía en el sistema visual viejo.** `public/404.html`
      es un archivo suelto que Cloudflare sirve sin pasar por la aplicación, así que se quedó
      fuera de la revisión del 22 de septiembre y conservaba entero lo que ese día se retiró: el
      **degradado morado→rosa→rojo**, el botón en **#e11d48** —el rojo reservado para el error—,
      titulares en peso 800, radio de 12 px y un fondo que no está en la paleta. Tampoco
      declaraba `color-scheme`, y no lo hereda porque no carga `tokens.css`. Ahora usa el
      morado #5326d9, el papel cálido y Archivo; los valores van escritos en el archivo porque
      `tokens.css` cambia de nombre en cada build. Y dejaba al visitante en un callejón con un
      solo botón: ahora el logotipo lleva al inicio y hay tres destinos reales.

      **Barrido después:** cero apariciones del degradado y del rojo-botón en todo el código.
      Dos falsas alarmas comprobadas antes de tocarlas: `public/hero-operacion.svg` parece
      muerto pero es la fuente de la tarjeta social (`scripts/og-imagen.js`), y el favicon usa
      **#8168f0 y no #5326d9 a propósito** —va sobre la placa azul marino, donde el morado de
      marca no se leería; es la misma regla que sigue la variante clara del logotipo—. **No
      cambiarlos.**

- [x] **Corrección de método.** Las 3 399 palabras que conté primero incluían el código del
      guion: `body.textContent` se lleva el contenido de `<script>`. Son **1 516** (1 683 con
      la pantalla nueva). Y el recorte que se ve en las capturas a 390 px es de Edge, no del
      sitio: medido con `scrollWidth`, **no hay desbordamiento** en ninguno de los seis anchos.

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

## Resueltas el 2026-09-22 (recorrido de la página, URL por URL)

- [x] **Los dos encabezados de seguridad que faltaban.** El sitio mandaba cuatro de los seis
      que importan; faltaban **HSTS** y **Content-Security-Policy**, los dos más pesados. De
      los sitios del estudio, Stripe y Bind mandan los seis; Xero y Alegra, menos que nosotros.
      La CSP no se puede escribir a mano porque el sitio tiene scripts en línea —el de
      consentimiento y el de cada recorrido— y autorizarlos con `'unsafe-inline'` sería dejar
      pasar cualquier script inyectado, que es justo lo que la política existe para impedir.
      `scripts/encabezados.js` corre después del build, saca el hash de cada script en línea y
      escribe `dist/_headers`; cuando un script cambia, su hash cambia solo. Probada
      inyectándola como `meta` en seis páginas: cero violaciones, y repetido con `VITE_GA_ID`
      cargado para confirmar que Analytics tampoco se rompe.

- [x] **El botón «Diagnóstico» volvía al inicio en vez de ir al formulario.** Un enlace
      `/#contacto` carga el inicio y el navegador busca la sección antes de que React la
      dibuje. `src/lib/ancla.js` espera a que exista. Era el único camino al formulario desde
      cualquier página que no fuera el inicio.

- [x] **Un solo botón de diagnóstico a la vista.** Contados en la página armada: seis en el
      inicio y cuatro en cada servicio, y dos se veían al mismo tiempo a ciento cincuenta
      píxeles —el de la barra y el del hero—. Ahora el de la barra cede la primera pantalla y
      toma el relevo cuando el del hero sale (`src/lib/ctaNavbar.js`, usado por las tres
      barras). Salieron además la banda morada «Hagamos crecer tu negocio juntos» y la banda de
      la calculadora del final: la calculadora vive en el hero desde el movimiento 01 y
      repetirla catorce pantallas abajo ya no agregaba nada. Quedan dos caminos a ella, el hero
      y el pie.

- [x] **El recorrido se siente parte del sitio.** El mismo archivo sirve para la página y para
      el artifact de WhatsApp, y traía lo que necesita un artifact suelto. En la versión del
      sitio, el empaquetador ahora enlaza el logotipo al inicio —antes no llevaba a ningún
      lado—, quita la etiqueta «loomware.com.mx» del dominio en el que ya estás, y manda
      «formulario del sitio» a `/#contacto` en la misma pestaña, en vez de abrir otra pestaña
      en la página del servicio. La fuente se queda intacta.

- [x] **El inicio, de 18.6 a 14.0 pantallas en celular**, y con más texto que antes: salió «El
      desafío» —contaba con un diagrama lo mismo que ya dibuja el hero— y sus cuatro frases
      concretas reemplazaron a las genéricas del bloque «Impacto». Los recorridos enseñan su
      resumen, que ya estaba escrito y el inicio no usaba: **1 995 palabras en el DOM**, arriba
      de las 1 964 de Bind.

- [x] **Detalles del recorrido por URL:** fuera «gratuito» del botón de enviar; el titular de
      industrias pasó de dos oraciones en tres renglones a una en dos; y el logotipo de la
      pantalla de contraseña de `/prospectar`, que era el único del sitio que no llevaba a
      ningún lado, ya va al inicio.

- [x] **GT-SHOP, el primer caso real**, firmado por Eduardo Díaz. Eduardo aprobó la cita y la marca
      el mismo 22.

- [x] **El estudio comparativo, con las cifras de hoy.** El artifact
      (<https://claude.ai/artifact/MoSn3kdnN4acpzk3bbs5t8>) se quedó con la foto de la mañana:
      decía que éramos 298 ms, que no teníamos prueba social, que la calculadora estaba escondida
      y que la portada cargaba una imagen. Cinco de sus ocho fichas ya no eran ciertas. La
      segunda medición reemplaza a la primera en la misma URL, y deja ver de dónde venía cada
      cifra. **Seis de los siete movimientos quedaron cerrados**; el que falta es el 05, publicar
      precio, que es de Aldo.

- [x] **Barrido de deuda técnica.** Cero referencias a los tres componentes que se borraron, 30
      enlaces internos sin uno roto, las 25 URLs del sitemap con su página construida, ninguna
      marca de pendiente en el código, y el catálogo de íconos en 50 sin ninguno sin uso.

## Resueltas el 2026-09-22 en `alan` (segunda pasada del estudio)

- [x] **El inicio vuelve a 14.8 pantallas en celular (2026-09-22).** Había subido a 16.3 al
      entrar los recorridos y los casos. Se quitó **«El desafío»**: contaba con un diagrama lo
      mismo que ya dibuja el hero —las herramientas sueltas y el «un solo sistema»—, costaba
      1 303 px con unas sesenta palabras, y sus cuatro resultados eran los mismos cuatro del
      bloque «Impacto». Sus frases, que eran las concretas, se quedaron ahí y reemplazaron a
      las genéricas.

- [x] **El texto indexable sube a 1 995 palabras (2026-09-22)**, arriba de las 1 964 de Bind.
      Cada recorrido tenía un resumen escrito en `src/data/recorridos.js` que el inicio no
      usaba; ahora se lee en su tarjeta, y se retira en celular para no volver a alargar la
      portada —sigue en el documento, que es lo que lee un buscador—.

      **Corrección de método:** la cifra de 1 432 palabras que reporté contra las 1 964 de Bind
      no era comparable. `innerText` deja fuera las respuestas plegadas de las preguntas
      frecuentes —405 palabras— y un buscador sí las lee. Para comparar hay que medir con
      `textContent`. La portada nunca estuvo tan abajo como dije.

- [x] **El botón «Diagnóstico» vuelve a llevar al formulario (2026-09-22).** Desde la
      calculadora, el aviso, `/gracias` o el pie, un enlace `/#contacto` dejaba al visitante
      hasta arriba del inicio: el navegador buscaba la sección antes de que React la dibujara.
      `src/lib/ancla.js` espera a que exista y entonces va. Era el único camino al formulario
      desde cualquier página que no fuera el inicio.

- [x] **La portada ya enseña lo que construimos (2026-09-22).** La sección 06 del estudio
      decía que cargábamos **una imagen contra las 44 de Bind**. Las ocho escenas de los
      recorridos —la bodega con su camión, el tablero de corcho, la tarjeta de checado, los dos
      maniquíes de sastre— ya existían y sólo vivían dentro de su propia página; ahora el primer
      paso de cada una se ve en su tarjeta del inicio. Se sacan con
      `npm run recorridos:escenas`, que le pide a un navegador que dibuje la escena y hornea en
      cada elemento el estilo calculado, porque los colores viven en reglas CSS de la página y
      una copia cruda sale negra. **En escritorio: 10 imágenes y 132.7 KB.** En celular no se
      dibujan —serían diecisiete kilobytes tirados donde más pesan— y la portada se queda igual,
      en 114.2 KB y 14.0 pantallas.

- [x] **Y el hero es ahora la pantalla del sistema (2026-09-22).** Era un diagrama —la maraña de
      hoy contra un solo sistema—; ahora es **la pantalla de inicio con los ocho módulos**, cada
      uno poniendo su propio recuadro: el embudo del CRM, el dinero por cobrar del ERP, la
      dispersión de la nómina, los pedidos de la tienda, los flujos que corren solos, el módulo a
      medida en producción, la disponibilidad y los técnicos en ruta. Se genera con
      `npm run hero:sistema` y pesa **2.5 KB**; en celular hay una versión de lista, y el
      `<picture>` hace que el navegador baje sólo una.

      Dos reglas quedan escritas en el guion que lo dibuja: **no se enseña la pantalla de un
      cliente** —es una pantalla de ejemplo y lo dice adentro, en su esquina— y **los nombres de
      cliente no se inventan**: donde iría una razón social van renglones grises, que además es
      como se ve de verdad una demostración pública de un sistema con datos de terceros.

      Lo que **no** queda cerrado, y conviene no confundirlo: las 44 imágenes de Bind incluyen
      capturas de su software funcionando. Las nuestras son dibujos nuestros. La salida honesta
      para eso sería la autorización de un cliente para enseñar su sistema con los datos
      cubiertos.

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
