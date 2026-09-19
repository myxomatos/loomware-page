# Loomware — sitio web

Landing page de Loomware (CRM, ERP, automatización, software a medida, cloud y apps móviles para empresas mexicanas). Construida con **React + Vite** y desplegada en **Cloudflare Pages**.

## Requisitos

- Node.js 18 o superior
- npm (viene con Node)

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

## Variables de entorno (opcionales)

Copia `.env.example` a `.env`:

| Variable             | Para qué sirve                                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY` | **Sólo en Cloudflare.** Llave de [Resend](https://resend.com) con la que se envía el correo del formulario. Guardar como *Secret*. |
| `LEAD_TO` | **Sólo en Cloudflare.** Bandeja que recibe los leads (varias separadas por coma). Por omisión, el correo de contacto del sitio. |
| `LEAD_FROM` | **Sólo en Cloudflare.** Remitente, en un dominio verificado en Resend. Por omisión `Loomware <web@loomware.com.mx>`. |
| `VITE_SCHEDULE_URL`  | Enlace de agenda (Calendly, Cal.com) para "Agendar ahora". Vacío = lleva al formulario.                           |

En Cloudflare Pages estas variables se configuran en **Settings → Environment variables**.

## Despliegue en Cloudflare Pages

1. Sube el repositorio a GitHub.
2. En Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** y elige el repo.
3. Configuración:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Agrega las variables de entorno si las usas y haz **Save and Deploy**.

Cada `git push` a la rama principal vuelve a desplegar el sitio.

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
index.html                 # HTML base, metadatos y fuente Inter
public/                    # estáticos: hero (PNG), favicon.svg, 404.html, _headers, robots, sitemap
src/
  main.jsx                 # punto de entrada
  App.jsx                  # orden de las secciones
  styles/tokens.css        # colores, tipografía, espaciado, radios, sombras
  styles/base.css          # reset, escala H1–H4, .btn, .chip, .card, .field
  components/
    Icon.jsx               # set de íconos SVG (inline, currentColor)
    Logo.jsx               # logotipo SVG
    Navbar.jsx             # navegación + menú móvil
    Hero.jsx               # portada
    Challenge.jsx          # "El desafío": entradas → Loomware → resultados
    Solutions.jsx          # "Nuestras soluciones"
    Needs.jsx              # "¿Qué necesita tu empresa?" + impacto
    ContactForm.jsx        # formulario de diagnóstico
    Process.jsx            # "Un proceso claro" + agenda
    CtaBand.jsx            # banda morada
    Footer.jsx
```

## Editar contenido

- Textos, listas e íconos de cada sección están en arreglos al inicio de cada componente (`SOLUTIONS`, `STEPS`, `COLUMNS`, etc.).
- Colores y tamaños de letra: `src/styles/tokens.css`.
- Íconos nuevos: agrega la entrada en `PATHS` dentro de `src/components/Icon.jsx`.
- Redes sociales: llena las URLs en `SOCIAL` dentro de `Footer.jsx`.

## Herramienta de prospección (`/prospectar`)

Página privada que consulta el **DENUE del INEGI** (directorio de +5 millones de negocios) para encontrar empresas por giro, zona y tamaño, filtrarlas y exportarlas a Excel. No aparece en el menú, no la indexa Google (`robots.txt` + `noindex`) y pide contraseña.

### 1. Obtener el token del INEGI (gratis, 2 minutos)

1. Entra a <https://www.inegi.org.mx/servicios/api_denue.html>.
2. Clic en **"Obtener token"** (o "Regístrate"), escribe tu correo y acepta los términos.
3. Revisa tu correo: llega un token (cadena larga de letras y números).

### 2. Configurarlo

- **En local**: en `.env` pon `DENUE_TOKEN=<tu token>`. En local no se pide contraseña.
- **En Cloudflare Pages**: Settings → Environment variables → agrega `DENUE_TOKEN` y `PROSPECT_KEY` (la contraseña que quieras para entrar). Vuelve a desplegar.

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

Al enviar, el formulario hace `POST /api/contacto`. Esa ruta es la Function
`functions/api/contacto.js`, que valida los datos y manda un correo con [Resend](https://resend.com).
El correo llega a `LEAD_TO` con el asunto `Diagnóstico — <Empresa> (<Nombre>)` y trae nombre,
empresa, correo, teléfono, interés seleccionado y la necesidad descrita. El `reply_to` es el correo
del interesado: basta con **responder** ese mensaje para contestarle directamente.

### Puesta en marcha

1. Crear cuenta en <https://resend.com> (plan gratuito: 3 000 correos al mes).
2. **API Keys → Create API Key**; copiar la llave (empieza con `re_`).
3. En Cloudflare → Settings → Environment variables, agregar `RESEND_API_KEY`
   como *Secret*, **en Production y en Preview**, y volver a desplegar.
4. Para que el remitente sea `@loomware.com.mx`: en Resend, **Domains → Add Domain**,
   agregar `loomware.com.mx` y capturar en Cloudflare los registros DNS que indique.
   Mientras no esté verificado, se puede probar poniendo
   `LEAD_FROM = Loomware <onboarding@resend.dev>`, que sólo entrega al correo
   dueño de la cuenta de Resend.

> La Function no existe en `npm run dev`: en local el envío falla a propósito y muestra un
> aviso. El formulario se prueba en el preview de la rama o en producción.
