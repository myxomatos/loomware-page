/*
 * Entrada de prerenderizado. No se manda al navegador: la usa
 * `scripts/prerender.js` en Node, después del build, para escribir el HTML de
 * cada página dentro de su <div id="root">.
 *
 * Por qué existe. Medido el 2026-09-27: **17 de las 25 URLs del sitemap llegaban
 * a Google con el cuerpo vacío** —`<body><div id="root"></div></body>`, cero
 * palabras—. Todo el texto lo dibujaba JavaScript: 78 KB comprimidos de guiones
 * para pintar unas 2 000 palabras que no cambian nunca. Google renderiza, pero
 * en una segunda pasada, y para un dominio nuevo sin autoridad ésa es
 * justamente la demora que no conviene.
 *
 * De paso deja comparable una cifra que no lo era: la portada presumía 1 995
 * palabras contra las 1 964 de Bind, pero Bind las manda en el HTML y nosotros
 * las mandábamos en un guion.
 *
 * Los ocho recorridos no pasan por aquí: son HTML escrito a mano y siempre
 * trajeron su texto completo.
 *
 * Reglas para que esto siga funcionando:
 *
 *   · Nada de `window`, `document`, `localStorage` ni `matchMedia` **en el
 *     cuerpo de un componente**. Dentro de `useEffect` está bien: en el
 *     servidor no corre. Si alguien lo mete en el dibujado, este archivo falla
 *     al construir y el build se detiene, que es lo que se busca.
 *   · El primer dibujado del cliente tiene que dar **lo mismo** que el del
 *     servidor, porque el cliente hidrata: `useState` arranca en el mismo valor
 *     en los dos lados. Por eso `useCtaOculta` empieza en `true` y
 *     `useEscritorio` en `false`.
 *   · `Cookies` se dibuja también aquí para que el árbol tenga la misma forma en
 *     los dos lados. No pinta nada hasta que existe Analytics, así que su HTML
 *     es vacío en ambos.
 */
import { renderToString } from 'react-dom/server'
import App from './App'
import Cookies from './components/Cookies'
import Servicio from './servicio/Servicio'
import Industria from './industria/Industria'
import Calculadora from './calculadora/Calculadora'
import Aviso from './aviso/Aviso'
import Gracias from './gracias/Gracias'

const PAGINAS = {
  inicio: () => <App />,
  servicio: (slug) => <Servicio slug={slug} />,
  industria: (id) => <Industria id={id} />,
  calculadora: () => <Calculadora />,
  aviso: () => <Aviso />,
  gracias: () => <Gracias />,
}

export function render(tipo, clave = '') {
  const arma = PAGINAS[tipo]
  if (!arma) throw new Error(`prerender: no sé dibujar «${tipo}»`)
  return renderToString(
    <>
      {arma(clave)}
      <Cookies />
    </>,
  )
}

export const TIPOS = Object.keys(PAGINAS)
