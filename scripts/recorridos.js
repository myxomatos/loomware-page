/*
 * Empaqueta los recorridos de `recorridos-fuente/` en páginas completas dentro
 * de `public/recorridos/`.
 *
 *   npm run generar:recorridos   (corre solo antes de cada build)
 *
 * El archivo fuente es un fragmento —comentario, <title>, <link>, <style> y
 * después el contenido—, porque así se publica también como artifact. Aquí se
 * parte en cabeza y cuerpo y se le arma el <head> que necesita una página del
 * sitio: canonical, Open Graph, favicon y el ajuste de las áreas seguras del
 * teléfono. Sin `noindex`: son contenido, y contestan lo que la gente busca.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { RECORRIDOS, recorridoDeServicio } from '../src/data/recorridos.js'
import { servicioPorSlug } from '../src/data/servicios.js'
import { DOMINIO, EMPRESA } from '../src/data/contacto.js'
import { basePublica } from './base-publica.js'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/* Las dos tipografías de los recorridos, servidas desde el sitio. Son
   variables y llevan el eje de peso abierto, así que un archivo por familia
   cubre los cuatro pesos que usa el recorrido: 26.4 KB las dos, contra las dos
   conexiones a un tercero que además la CSP no deja pasar. `swap` para que el
   texto se lea desde el primer momento con la del aparato y cambie al llegar
   la nuestra. */
const FUENTES_LOCALES = `    <link rel="preload" href="/fonts/azeret-mono-recorridos.woff2" as="font" type="font/woff2" crossorigin>
    <style>
      @font-face{font-family:'Azeret Mono';src:url('/fonts/azeret-mono-recorridos.woff2') format('woff2');
        font-weight:400 700;font-style:normal;font-display:swap}
      @font-face{font-family:'Archivo';src:url('/fonts/archivo-recorridos.woff2') format('woff2');
        font-weight:400 600;font-style:normal;font-display:swap}
    </style>`
/* Lectura cómoda (2026-09-30, pedido de Aldo: «hay letras muy pequeñas, no se
   ve bien»). Medido antes en el ERP: el 81 % de las palabras iba en 13 px o
   menos y ninguna etiqueta pasaba de 11. Aquí el texto de lectura sube a 16-17
   px, ninguna etiqueta baja de 12, el dibujo toma más ancho en escritorio y el
   botón de avance automático se vuelve el control principal. Va como una hoja
   aparte, después de la del recorrido, para no reescribir las ocho fuentes: las
   ocho comparten clases desde que alcanzaron la forma del ERP. Se prende por
   recorrido en LEGIBLE; desde el 2026-09-30 van los ocho. */
const LEGIBLE = new Set(RECORRIDOS.map((r) => r.slug))
const ESTILO_LEGIBLE = `    <style>
      /* lectura cómoda: ver scripts/recorridos.js */
      body{font-size:16px;}
      .lbl{font-size:12px;}
      .paraquien{font-size:13.5px;}
      .deck{font-size:17px;line-height:1.6;}
      .specline,.antes figcaption,.cap,.legend,.pista{font-size:13px;}
      .readout{padding:11px 15px;}
      .readout__k,.readout__v{font-size:14px;}
      .play{font-size:15px;font-weight:700;letter-spacing:.02em;padding:10px 20px;
        border-radius:999px;color:var(--surface);background:var(--signal);border-color:var(--signal);}
      .play:hover,.play[aria-pressed="true"]{background:var(--ink);border-color:var(--ink);color:var(--surface);}
      .exp__nota{font-size:14px;}
      .chip b{font-size:13px;} .chip span{font-size:12px;}
      .steps__t{font-size:clamp(18px,2vw,22px);}
      .paso{font-size:14px;} .gauge{font-size:12px;}
      .step h3{font-size:clamp(18px,1.8vw,21px);}
      .vs__row{grid-template-columns:minmax(0,1fr);gap:3px;padding:10px 14px;}
      .vs__lbl{line-height:1.4;}
      .vs__row p{font-size:16.5px;line-height:1.5;}
      .enotro{font-size:15px;}
      .giros p,.faq p,.costo p,.pant p,.atajo p,.cierre p,.giros__cierre{font-size:16px;}
      .rejilla b,.costo .rejilla b{font-size:13px;}
      .rejilla span{font-size:15px;} .rejilla .hoy{font-size:14px;}
      .faq .rejilla > li > b{font-size:15px;}
      .pant .kpi b{font-size:18px;} .pant .kpi span,.pant .fila--enc span,.pant .fila--suma .lbl{font-size:12px;}
      .pant .tabla__t,.pant .pant__pie,.pant .app__barra{font-size:12px;}
      .pant .mon,.pant .mar,.pant .app__lado{font-size:13px;}
      .pant .pant__lee{font-size:16px;}
      .btn{font-size:15px;} .cierre .otras{font-size:14px;} .colofon{font-size:14px;line-height:1.6;}
      a.brand__cta{font-size:13px;}
      nav.sigue b{font-size:12px;} nav.sigue .sigue__t{font-size:13px;}
      @media (min-width:881px){
        .cols{grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);gap:36px;}
        .step{opacity:.4;}
      }
      /* En el teléfono el dibujo se queda pegado arriba y el paso tiene que caber
         debajo: la letra baja un punto, el relleno se aprieta y la ficha deja sólo
         su renglón principal. Medido a 390×844 y 360×740 con cabe.mjs. */
      @media (max-width:880px) and (min-height:560px){
        .legend{font-size:12.5px;}
        .readout__v{display:none;}
        .readout{padding:8px 12px;}
        .stage svg{max-height:30vh;}
        .step{padding-block:8px;}
        .step-head{margin-bottom:6px;}
        .step h3{font-size:18px;}
        .vs__row{padding:7px 11px;gap:2px;}
        .vs__row p{font-size:15.5px;line-height:1.42;}
        .enotro{font-size:14px;margin-top:8px;}
      }
      /* Teléfono chico (360×740): el dibujo cede un poco más de alto. */
      @media (max-width:880px) and (min-height:560px) and (max-height:780px){
        .stage svg{max-height:24vh;}
        .vs__row p{font-size:15px;}
        .enotro{font-size:13.5px;}
      }
    </style>
`

const destino = resolve(raiz, 'public/recorridos')
mkdirSync(destino, { recursive: true })

/* Reemplaza una vez y se queja si no encontró nada: si un recorrido cambia de
   forma, más vale que el build lo diga a que publique una página a medias. */
function reemplazarUna(texto, de, a, slug, que) {
  if (!texto.includes(de)) {
    throw new Error(`recorridos: en "${slug}" no se pudo ${que}. ¿Cambió recorridos-fuente/${slug}.html?`)
  }
  return texto.replace(de, a)
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/* Texto plano de un fragmento de HTML, para los datos estructurados. */
const plano = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()

/*
 * Los seis pasos, leídos del propio recorrido: el <h3> es el nombre y el
 * renglón «Con el sistema» es lo que pasa en ese paso, que es la mitad que
 * describe el método. Si el recorrido no tiene pasos, devuelve vacío y el
 * bloque no se emite.
 */
function pasosDe(cuerpo) {
  const pasos = []
  for (const m of cuerpo.matchAll(/<section class="step[^"]*"[^>]*>([\s\S]*?)<\/section>/g)) {
    const nombre = plano((m[1].match(/<h3[^>]*>([\s\S]*?)<\/h3>/) || [])[1] || '')
    const con = (m[1].match(/vs__row--con"[\s\S]*?<p>([\s\S]*?)<\/p>/) || [])[1] || ''
    if (nombre && con) pasos.push({ nombre, texto: plano(con) })
  }
  return pasos
}

/* Las preguntas de «Antes de que preguntes». La tarjeta que invita a escribir
   no es una pregunta con respuesta, así que se salta. */
function preguntasDe(cuerpo) {
  const faq = (cuerpo.match(/<section class="faq"[^>]*>([\s\S]*?)<\/section>/) || [])[1] || ''
  const out = []
  for (const m of faq.matchAll(/<li(?! class="mas")[^>]*>\s*<b>([\s\S]*?)<\/b>\s*<span>([\s\S]*?)<\/span>/g)) {
    const p = plano(m[1])
    const r = plano(m[2])
    if (p && r) out.push({ p, r })
  }
  return out
}

for (const r of RECORRIDOS) {
  const fuente = readFileSync(resolve(raiz, `recorridos-fuente/${r.slug}.html`), 'utf8')

  const corte = fuente.indexOf('</style>')
  if (corte < 0) throw new Error(`recorridos-fuente/${r.slug}.html no tiene <style>`)
  let cabeza = fuente.slice(0, corte + '</style>'.length).replace(/<title>[\s\S]*?<\/title>\s*/, '')
  let cuerpo = fuente.slice(corte + '</style>'.length).trim()

  /* --- Ajustes de la versión que vive dentro del sitio ---
   *
   * La fuente se queda como está, porque también se publica como artifact
   * suelto para mandar por WhatsApp, y ahí sí hace falta decir de dónde viene
   * y enlazar en absoluto. Aquí, dentro del sitio, sobra.
   */

  // 1. El logotipo regresa al inicio, a la tarjeta de este recorrido, que
  //    Recorridos.jsx resalta. Suelto no llevaba a ningún lado, y quien
  //    terminaba el recorrido tenía que usar el botón de atrás del navegador.
  cuerpo = reemplazarUna(cuerpo, '<span class="brand__id">', `<a class="brand__id" href="/#recorrido-${r.slug}" aria-label="Ir al inicio de Loomware">`, r.slug, 'abrir el logotipo')
  cuerpo = reemplazarUna(
    cuerpo,
    '<span class="brand__name">Loomware</span>\n    </span>',
    '<span class="brand__name">Loomware</span>\n    </a>',
    r.slug, 'cerrar el logotipo'
  )

  // 2. La etiqueta del dominio se va —ya estás en él— y su lugar lo toma la
  //    única acción de la primera pantalla. Medido contra siete comparables: la
  //    nuestra no tenía ninguna y la primera puerta estaba a 5.3 pantallas. Aquí
  //    cuesta **cero píxeles de alto**, porque esa mitad de la barra ya estaba
  //    vacía. Apunta al formulario de su servicio, no a WhatsApp: un botón fijo
  //    que abre WhatsApp al primer toque es más agresivo de lo que esta pieza es.
  cuerpo = cuerpo.replace(
    /\s*<a class="brand__site"[\s\S]*?<\/a>/,
    `\n      <a class="brand__cta" href="/servicios/${r.servicio}#contacto">Diagnóstico</a>`
  )
  if (!cuerpo.includes('brand__cta')) {
    throw new Error(`recorridos: ${r.slug} se quedó sin la acción de la barra`)
  }

  // 3. «Formulario del sitio» va al formulario, en esta misma pestaña. Antes
  //    apuntaba a la página del servicio y abría una pestaña nueva, así que
  //    aterrizabas arriba de otra página en vez de en el formulario.
  cuerpo = cuerpo.replace(
    /<a href="https:\/\/[^"]*?\/servicios\/[^"]*"[^>]*>formulario del sitio<\/a>/,
    '<a href="/#contacto">formulario del sitio</a>'
  )

  // 4. Las tipografías, desde el propio dominio. La fuente las pide a Google
  //    Fonts porque el artifact suelto no tiene dónde más sacarlas; aquí eso no
  //    sirve, porque la CSP del sitio dice `style-src 'self'` y `font-src
  //    'self'` y bloquea las dos peticiones. Resultado medido antes de esto:
  //    cero tipografías cargadas y el recorrido en la monoespaciada del
  //    aparato. Las recortadas se generan con `npm run fuente:recorridos`.
  cabeza = cabeza
    .replace(/\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com"[^>]*>/, '')
    .replace(
      /\s*<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/,
      '\n' + FUENTES_LOCALES,
    )
  if (cabeza.includes('fonts.googleapis.com')) {
    throw new Error(`recorridos: ${r.slug} sigue pidiendo tipografías a Google Fonts`)
  }

  // 5. Lectura cómoda, en los recorridos que ya la tienen prendida.
  if (LEGIBLE.has(r.slug)) {
    cabeza += '\n' + ESTILO_LEGIBLE
    cuerpo = cuerpo.replaceAll('▶ Que avance solo', '▶ Reproducir')
  }

  /* Los dos recorridos que se le parecen, sacados de `relacionados` en
     servicios.js —la misma lista del bloque «Suele combinarse con» de la página
     de servicio—, para no inventar aquí una relación distinta de la del sitio. */
  const vecinos = (servicioPorSlug(r.servicio)?.relacionados || [])
    .map(recorridoDeServicio)
    .filter((v) => v && v.slug !== r.slug)
    .slice(0, 3)
  const sigue = vecinos.length
    ? `\n    <nav class="sigue" aria-label="Otros recorridos">
      <p class="sigue__t">Sigue con</p>
      <ul>${vecinos
        .map(
          (v) =>
            `<li><a href="/recorridos/${v.slug}"><b>${esc(
              servicioPorSlug(v.servicio)?.nombre || v.servicio,
            )}</b><span>${esc(v.titulo)}</span></a></li>`,
        )
        .join('')}</ul>
    </nav>`
    : ''

  const url = `${DOMINIO}/recorridos/${r.slug}`

  // El nombre del servicio tal como lo dice el sitio: "Nómina", no "NOMINA".
  const servicio = servicioPorSlug(r.servicio)
  if (!servicio) throw new Error(`recorridos: el servicio "${r.servicio}" no existe en servicios.js`)

  /* Los datos estructurados, armados del propio HTML: si el texto cambia, el
     dato cambia con él y nunca se desfasan. */
  const pasos = pasosDe(cuerpo)
  const preguntas = preguntasDe(cuerpo)
  const datos = []
  if (pasos.length) {
    datos.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: r.seoTitulo || r.titulo,
      description: r.descripcion,
      totalTime: `PT${Math.max(3, Math.round(pasos.length * 0.8))}M`,
      step: pasos.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.nombre,
        text: s.texto,
        url: `${url}#paso-${i + 1}`,
      })),
    })
  }
  if (preguntas.length) {
    datos.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: preguntas.map((q) => ({
        '@type': 'Question',
        name: q.p,
        acceptedAnswer: { '@type': 'Answer', text: q.r },
      })),
    })
  }
  datos.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: DOMINIO },
      {
        '@type': 'ListItem',
        position: 2,
        name: servicio.nombre,
        item: `${DOMINIO}/servicios/${r.servicio}`,
      },
      { '@type': 'ListItem', position: 3, name: r.titulo, item: url },
    ],
  })
  const jsonLd = datos
    .map((d) => `    <script type="application/ld+json">${JSON.stringify(d)}</script>`)
    .join('\n')
  /* Estas páginas son explicaciones paso a paso de 1 400 a 1 800 palabras, o
     sea el formato que gana las consultas de «qué es» y «cómo funciona». Si el
     recorrido trae `seoTitulo`, ése es el título de búsqueda **y va solo**:
     anteponerle el nombre de la solución lo dejaba redundante («ERP · Qué es un
     ERP…»). Sin `seoTitulo`, se arma con la solución delante, que es la palabra
     que la gente teclea. El titular que se lee dentro de la página es siempre
     `titulo` y no cambia nunca. */
  const titulo = r.seoTitulo
    ? `${r.seoTitulo} | ${EMPRESA}`
    : `${servicio.nombre} · ${r.titulo} | ${EMPRESA}`

  /* Cada recorrido lleva su propia tarjeta social: estas páginas existen para
     mandarse por WhatsApp y lo primero que ve el prospecto es la tarjeta del
     enlace, no la página. Con la genérica, ocho enlaces distintos se
     previsualizaban idénticos. Se dibujan con `npm run og:recorridos`, que
     necesita el sitio servido; si una falta, esa se queda con la del sitio y
     nunca se publica una tarjeta rota. */
  const BASE = basePublica()
  const tarjeta = existsSync(resolve(raiz, `public/recorridos/og-${r.slug}.png`))
    ? `${BASE}/recorridos/og-${r.slug}.png`
    : `${BASE}/og-image.png`

  const pagina = `<!DOCTYPE html>
<html lang="es-MX">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${esc(titulo)}</title>
    <meta name="description" content="${esc(r.descripcion)}" />
    <link rel="canonical" href="${url}" />
    <meta name="theme-color" content="#A35C23" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${EMPRESA}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(titulo)}" />
    <meta property="og:description" content="${esc(r.descripcion)}" />
    <meta property="og:image" content="${tarjeta}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="es_MX" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(titulo)}" />
    <meta name="twitter:description" content="${esc(r.descripcion)}" />
    <meta name="twitter:image" content="${tarjeta}" />

${jsonLd}

    <style>
      :root {
        color-scheme: light;
        padding-top: env(safe-area-inset-top, 0px);
        padding-bottom: env(safe-area-inset-bottom, 0px);
      }
      html { scroll-padding-top: env(safe-area-inset-top, 0px); }
      body { margin: 0; padding: 0; }
      img { max-width: 100%; }
      [hidden] { display: none !important; }
    </style>
${cabeza.split('\n').map((l) => (l.trim() ? '    ' + l : l)).join('\n')}

    <style>
      /* El logotipo es un enlace al inicio sólo en la versión del sitio, así que
         su estilo vive aquí y no en la fuente: sin subrayado ni azul de enlace,
         y con una señal al pasar encima para que se note que lleva a algún lado. */
      .brand__id { color: inherit; text-decoration: none; border-radius: 6px; }
      /* La acción de la primera pantalla. Discreta —es una pieza para leer, no
         una página de aterrizaje— pero presente desde el primer píxel. */
      .brand__cta { font-family: var(--mono); font-size: 11px; font-weight: 500;
        letter-spacing: .04em; text-decoration: none; white-space: nowrap;
        color: var(--signal); border: 1px solid currentColor; border-radius: 2px;
        padding: 7px 13px; display: inline-flex; align-items: center; position: relative; }
      /* 44 px de blanco táctil sin crecer la caja, igual que el botón del recorrido. */
      .brand__cta::after { content: ""; position: absolute; inset: -6px -4px; }
      .brand__cta:hover { background: var(--signal); color: var(--surface); }
      .brand__cta:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
      .brand__id:hover .brand__name { color: var(--signal); }
      .brand__id:focus-visible { outline: 2px solid var(--signal); outline-offset: 4px; }
      /* «Sigue con»: los dos recorridos vecinos. Existe porque cada recorrido
         era un callejón —recibía dos enlaces de todo el sitio y no daba
         ninguno—, y son las páginas más largas que tenemos. */
      .sigue { max-width: 720px; margin: 0 auto; padding: 0 20px 64px; }
      .sigue__t { font-family: var(--mono); font-size: 11px; font-weight: 500;
        letter-spacing: .12em; text-transform: uppercase; color: var(--ink-3);
        margin: 0 0 12px; }
      .sigue ul { list-style: none; margin: 0; padding: 0; display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px; }
      .sigue a { display: flex; flex-direction: column; gap: 3px; min-height: 44px;
        padding: 12px 14px; border: 1px solid var(--rule-soft); border-radius: 3px;
        background: var(--surface); text-decoration: none;
        transition: border-color .2s ease; }
      .sigue a:hover { border-color: var(--signal); }
      .sigue a:focus-visible { outline: 2px solid var(--signal); outline-offset: 3px; }
      .sigue b { font-family: var(--mono); font-size: 10px; font-weight: 500;
        letter-spacing: .1em; text-transform: uppercase; color: var(--signal); }
      .sigue span { font-family: var(--sans); font-size: 15px; font-weight: 600;
        color: var(--ink); line-height: 1.25; }
    </style>
  </head>
  <body>
${cuerpo}${sigue}
  </body>
</html>
`
  writeFileSync(resolve(destino, `${r.slug}.html`), pagina)
  console.log('  ✓ public/recorridos/' + r.slug + '.html')
}
console.log(`${RECORRIDOS.length} recorridos empaquetados`)
