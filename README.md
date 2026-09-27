# Loomware — sitio web

Landing page de Loomware (CRM, ERP, automatización, software a medida, cloud y apps móviles para empresas mexicanas). Construida con **React + Vite** y desplegada en **Cloudflare Pages**.

## Requisitos

- Node.js 18 o superior
- npm (viene con Node)
- [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/)
  sólo si vas a usar `npm run share` (ver abajo)

## Desarrollo

```bash
npm install        # una sola vez
npm run dev        # abre http://localhost:5173
```

## Build

```bash
npm run build      # genera la carpeta dist/
npm run preview    # sirve dist/ localmente para revisarlo
```

## Enseñar el avance a alguien fuera de tu red

```bash
npm run dev        # en una terminal
npm run share      # en otra: abre un túnel y da una URL pública temporal
```

La URL vive mientras las dos terminales estén abiertas y cambia en cada ejecución. Para un
enlace estable se usa el preview de la rama (ver *Flujo de trabajo*).

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera las páginas de servicio y el sitemap, y compila a `dist/` |
| `npm run preview` | Sirve `dist/` para revisarlo |
| `npm test` | Pruebas con Vitest: calculadora, formulario y barra de servicios |
| `npm run generar:servicios` | Regenera `servicios/*.html` y `public/sitemap.xml` desde `src/data/servicios.js` (el build ya lo hace) |
| `npm run optimizar:imagenes` | Convierte los PNG del hero a WebP; correrlo sólo si cambian los originales |
| `npm run share` | Túnel público temporal para enseñar el avance |

## Variables de entorno (opcionales)

Copia `.env.example` a `.env`:

| Variable             | Para qué sirve                                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY` | **Sólo en Cloudflare.** Llave de [Resend](https://resend.com) con la que se envía el correo del formulario. Guardar como *Secret*. |
| `LEAD_TO` | **Sólo en Cloudflare.** Bandeja que recibe los leads (varias separadas por coma). Por omisión, el correo de contacto del sitio. |
| `LEAD_FROM` | **Sólo en Cloudflare.** Remitente, en un dominio verificado en Resend. Por omisión `Loomware <web@loomware.com.mx>`. |
| `VITE_SCHEDULE_URL`  | Enlace de agenda (Calendly, Cal.com) para "Agendar ahora". Vacío = lleva al formulario. Va en `.env`. |
| `DENUE_TOKEN` | Token de la API DENUE del INEGI para `/prospectar`. Va en `.env` **y** en Cloudflare como *Secret*. |
| `PROSPECT_KEY` | **Sólo en Cloudflare.** Contraseña de `/prospectar`; en local no se pide. |
| `VITE_GA_ID` | ID de Google Analytics 4 (`G-…`). Se inyecta al compilar en todas las páginas; sin él no se carga nada. |
| `VITE_GSC_VERIFICATION` | Código de verificación de Search Console (método "etiqueta HTML"). |

En Cloudflare Pages estas variables se configuran en **Settings → Variables and Secrets**.

## Despliegue en Cloudflare Pages

Ya está configurado en el proyecto `loomware-page` (preset **Vite**, build `npm run build`,
salida `dist`). No hay que crear nada: Cloudflare publica solo cada push.

- Push a `main` → producción, <https://loomware.com.mx>.
- Push a cualquier otra rama → preview en `https://<rama>.loomware-page.pages.dev`.

Las variables se capturan en **Settings → Variables and Secrets**, y hay que hacerlo **dos veces**:
una para *Production* y otra para *Preview*, que son entornos distintos. Después, **Deployments →
último → ⋯ → Retry deployment**: las variables no se aplican a un despliegue ya publicado.

## Flujo de trabajo (ramas)

- **`main`** es producción: lo que está ahí es lo que se ve en <https://loomware.com.mx>. Está protegida: no acepta push directo ni force-push; solo entra código por Pull Request con al menos una aprobación.
- Cada quien trabaja en su rama: **`alan`** y **`aldo`**. Cloudflare publica un preview de cada rama en `https://<rama>.<proyecto>.pages.dev` para revisarlo antes de mezclar.
- Para pasar algo a producción:
  1. `git push origin <tu-rama>`
  2. Abre un Pull Request hacia `main` (o `gh pr create --base main`).
  3. Se revisa el preview, se aprueba y se hace el merge. Cloudflare despliega `main` solo.
- Después del merge, actualiza tu rama: `git checkout <tu-rama> && git merge main`.

## Estructura

```
CLAUDE.md                  # reglas del proyecto (lo lee Claude Code en cada sesión)
PENDIENTES.md              # ruta a producción, variables, pendientes e historial
vite.config.js             # entradas, proxy de /api/denue en desarrollo, inyección de analítica
index.html                 # página principal
prospectar.html            # herramienta interna (noindex)
gracias.html               # agradecimiento tras enviar el formulario (noindex)
aviso-de-privacidad.html   # aviso de privacidad
servicios/*.html           # una página por servicio; las genera scripts/generar-servicios.js

scripts/
  generar-servicios.js     # escribe servicios/*.html y public/sitemap.xml desde los datos
  optimizar-imagenes.js    # PNG del hero → WebP

functions/api/
  contacto.js              # recibe el formulario y envía el correo con Resend
  denue/[[path]].js        # proxy al DENUE; guarda el token del lado del servidor
                           # (cada archivo de functions/ es una ruta: las pruebas van en tests/)

tests/                     # pruebas de las Functions; las de src/ van junto a su archivo (*.test.js)

public/                    # hero (PNG y WebP), fonts/, og-image.png, favicon.svg,
                           # apple-touch-icon.png, 404.html, _headers, robots.txt, sitemap.xml
src/
  data/                    # TODO EL CONTENIDO EDITABLE vive aquí
    contacto.js            # correo, teléfonos, WhatsApp, datos legales
    servicios.js           # los ocho servicios: tarjetas del inicio y páginas completas
    industrias.js          # giros de la sección "Por giro"
    faq.js                 # preguntas frecuentes del inicio
    casos.js               # casos con clientes (vacío hasta tener uno real)
    equipo.js              # equipo para "Quiénes somos" (aparece cuando hay cargo y foto)
  lib/analytics.js         # eventos de conversión (generate_lead, click_whatsapp)
  styles/tokens.css        # fuente, colores, tipografía, espaciado, radios, sombras
  styles/base.css          # reset, escala H1–H4, .btn, .chip, .card, .field
  components/              # una carpeta plana; cada sección del inicio es un componente
  servicio/                # página de servicio (un componente para las ocho)
  prospectar/              # herramienta de prospección
  gracias/                 # página de agradecimiento
  aviso/                   # aviso de privacidad

.claude/skills/            # /inicio y /cierre, el flujo de sesión del equipo
.claude/settings.json      # activa el plugin mattpocock-skills y el hook que recuerda cuál usar
.claude/hooks/skills.txt   # el texto de ese recordatorio
```

## Editar contenido

Casi todo se edita en `src/data/` sin tocar componentes:

- **Un servicio** (tarjeta del inicio + página completa + sitemap): `src/data/servicios.js`.
  Agregar o quitar una entrada basta; el build regenera lo demás.
- **Teléfono, WhatsApp, correo, razón social**: `src/data/contacto.js`. De ahí sale para todo el sitio.
- **Casos de éxito**: `src/data/casos.js`. La sección aparece con el primer caso.
- **Equipo**: `src/data/equipo.js` y fotos en `public/equipo/`.
- **Giros y preguntas frecuentes**: `src/data/industrias.js` y `src/data/faq.js`.
- **Colores y tamaños de letra**: `src/styles/tokens.css`.
- **Íconos nuevos**: entrada en `PATHS` dentro de `src/components/Icon.jsx`.


## Herramienta de prospección (`/prospectar`)

Página privada que consulta el **DENUE del INEGI** (directorio de +5 millones de negocios) para encontrar empresas por giro, zona y tamaño, filtrarlas y exportarlas a Excel. No aparece en el menú, no la indexa Google (`robots.txt` + `noindex`) y pide contraseña.

### 1. Obtener el token del INEGI (gratis, 2 minutos)

1. Entra a <https://www.inegi.org.mx/servicios/api_denue.html>.
2. Clic en **"Obtener token"** (o "Regístrate"), escribe tu correo y acepta los términos.
3. Revisa tu correo: llega un token (cadena larga de letras y números).

### 2. Configurarlo

- **En local**: en `.env` pon `DENUE_TOKEN=<tu token>`. En local no se pide contraseña.
- **En Cloudflare Pages**: Settings → Variables and Secrets → agrega `DENUE_TOKEN` y `PROSPECT_KEY` (la contraseña que quieras para entrar). Vuelve a desplegar.

El token vive solo en el servidor (`functions/api/denue`); el navegador nunca lo ve.

### 3. Usarla

Abre `http://localhost:5173/prospectar.html` (local) o `https://tu-dominio/prospectar` (publicado).

| Modo | Cuándo usarlo |
| --- | --- |
| **Por giro y estado** | Palabra clave ("software", "clínica", "ferretería") en un estado o todo México. |
| **Por actividad, zona y tamaño** | El más preciso: sector SCIAN + estado/alcaldía + **número de empleados**. |
| **Cerca de un punto** | Todo lo que hay en un radio de hasta 5 km de una coordenada (clic derecho en Google Maps → copiar coordenadas). |

Después de buscar: filtra por tamaño, "con teléfono" o "con correo", marca las que te interesen y **Exportar a Excel (CSV)**.

### Códigos útiles

- **Estados**: 09 CDMX, 15 Edo. de México, 14 Jalisco, 19 Nuevo León, 22 Querétaro, 21 Puebla (lista completa en el selector).
- **SCIAN** (giros): 54 servicios profesionales, 43 comercio mayoreo, 46 comercio menudeo, 31–33 manufactura, 72 restaurantes y hoteles, 62 salud. Códigos de 3–6 dígitos en <https://www.inegi.org.mx/app/scian/>.
- **Municipios** fuera de CDMX: clave de 3 dígitos del INEGI. Catálogo: <https://www.inegi.org.mx/app/ageeml/>.

## Formulario de diagnóstico

Al enviar, el visitante llega a **`/gracias`** (`gracias.html` + `src/gracias/`), una página
propia con el agradecimiento y los siguientes pasos. Tiene URL propia a propósito: es lo que
permite medir la conversión en Google Ads o Analytics, algo imposible con un aviso dentro de la
misma pantalla. Lleva `noindex`.

Por debajo, el formulario hace `POST /api/contacto`. Esa ruta es la Function
`functions/api/contacto.js`, que valida los datos y manda un correo con [Resend](https://resend.com).
El correo llega a `LEAD_TO` con el asunto `Diagnóstico — <Empresa> (<Nombre>)` y trae nombre,
empresa, correo, teléfono, interés seleccionado y la necesidad descrita. El `reply_to` es el correo
del interesado: basta con **responder** ese mensaje para contestarle directamente.

### Puesta en marcha

1. Crear cuenta en <https://resend.com> (plan gratuito: 3 000 correos al mes).
2. **API Keys → Create API Key**; copiar la llave (empieza con `re_`).
3. En Cloudflare → Settings → Variables and Secrets, agregar `RESEND_API_KEY`
   como *Secret*, **en Production y en Preview**, y volver a desplegar.
4. Para que el remitente sea `@loomware.com.mx`: en Resend, **Domains → Add Domain**,
   agregar `loomware.com.mx` y capturar en Cloudflare los registros DNS que indique.
   Mientras no esté verificado, se puede probar poniendo
   `LEAD_FROM = Loomware <onboarding@resend.dev>`, que sólo entrega al correo
   dueño de la cuenta de Resend.

> La Function no existe en `npm run dev`: en local el envío falla a propósito y muestra un
> aviso. El formulario se prueba en el preview de la rama o en producción.
