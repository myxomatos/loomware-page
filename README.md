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
| `VITE_FORM_ENDPOINT` | URL que recibe el formulario de diagnóstico como JSON (Formspree, Web3Forms, API propia). Vacío = abre el correo. |
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
