/*
 * Saca la escena de cada recorrido a un SVG suelto, para poder enseñarla fuera
 * de su página.
 *
 *   npm run recorridos:escenas     (con `npm run preview` corriendo)
 *
 * Por qué hace falta un navegador: en el archivo fuente la escena es
 * `<g id="world"></g>`, vacío. La dibuja JavaScript al cargar. Así que la
 * única forma de tenerla como imagen es pedirle a un navegador que la dibuje
 * y copiar el resultado.
 *
 * Y no basta con copiar el marcado. Los colores no están en los elementos:
 * están en reglas CSS de la página —`.box-t{fill:var(--box-t)}` y demás—, así
 * que una copia cruda sale **toda negra**, que es el `fill` por omisión. Por
 * eso aquí se lee el estilo ya calculado de cada elemento y se escribe encima
 * como atributo. Queda un SVG que no depende de nada externo.
 *
 * De paso se tiran los elementos que el primer paso no muestra —los pasos 2 a
 * 6 viven en el mismo dibujo, ocultos—, que es lo que hace que el archivo
 * pese la mitad y que la miniatura sea de verdad el primer paso.
 *
 * El resultado va a `public/recorridos/escena-<slug>.svg` y se versiona: no se
 * regenera en cada build, porque haría falta un navegador para construir. Se
 * vuelve a correr cuando se cambie el dibujo de un recorrido.
 */
import { execFileSync } from 'node:child_process'
import { writeFileSync, unlinkSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { RECORRIDOS } from '../src/data/recorridos.js'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SITIO = process.env.PREVIEW || 'http://localhost:4197'
const EDGE =
  process.env.EDGE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const HARNESS = resolve(raiz, 'dist/_escena.html')

/*
 * El guion que corre dentro del navegador. Recorre la escena, tira lo que no
 * se ve y hornea el estilo calculado en cada elemento que sí.
 */
const DENTRO = `
// Se heredan del padre: sólo se escriben cuando el hijo difiere.
var HEREDA = ['fill','stroke','stroke-width','stroke-linecap','stroke-linejoin',
  'stroke-dasharray','fill-opacity','stroke-opacity','font-size','font-weight',
  'letter-spacing','text-anchor','dominant-baseline','paint-order'];
// Dentro de esto vive lo que recorta o pinta a otros: se deja intacto, aunque
// el navegador lo reporte como oculto.
var TALLER = 'defs,clipPath,mask,pattern,linearGradient,radialGradient,symbol,marker,filter';

function hornear(raiz, w) {
  var todos = [].slice.call(raiz.querySelectorAll('*')).filter(function (el) {
    return !el.closest(TALLER);
  });

  // --- Pasada 1: leer. Nada se modifica todavía, porque las reglas de la
  //     página son de descendencia y tocar a un padre cambia a sus hijos. ---
  var leido = todos.map(function (el) {
    var cs = w.getComputedStyle(el);
    var padre = el.parentElement ? w.getComputedStyle(el.parentElement) : null;
    var props = {};
    for (var p = 0; p < HEREDA.length; p++) {
      var v = cs.getPropertyValue(HEREDA[p]);
      if (!v || v === 'normal' || v === 'auto') continue;
      if (padre && padre.getPropertyValue(HEREDA[p]) === v) continue; // ya lo hereda
      props[HEREDA[p]] = v.trim();
    }
    if (cs.opacity && parseFloat(cs.opacity) !== 1) props.opacity = cs.opacity;
    if (el.tagName.toLowerCase() === 'text') {
      var ff = cs.fontFamily;
      if (ff && (!padre || padre.fontFamily !== ff)) {
        props['font-family'] = ff.replace(/["']/g, ''); // con comillas el XML se rompe
      }
    }
    return {
      el: el,
      props: props,
      // Los pasos 2 a 6 viven en el mismo dibujo, ocultos. Aquí sobran.
      fuera: cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0,
    };
  });

  // La raíz lleva sus valores sí o sí: es la base de toda la herencia.
  var csRaiz = w.getComputedStyle(raiz);
  for (var k = 0; k < HEREDA.length; k++) {
    var vr = csRaiz.getPropertyValue(HEREDA[k]);
    if (vr && vr !== 'normal' && vr !== 'auto') raiz.setAttribute(HEREDA[k], vr.trim());
  }

  // --- Pasada 2: escribir. ---
  leido.forEach(function (r) {
    if (r.fuera) { if (r.el.parentNode) r.el.parentNode.removeChild(r.el); return; }
    for (var n in r.props) r.el.setAttribute(n, r.props[n]);
    r.el.removeAttribute('class');
    r.el.removeAttribute('style');
  });
  raiz.removeAttribute('class');
  raiz.removeAttribute('style');
}
`

writeFileSync(
  HARNESS,
  `<!doctype html><meta charset=utf8><body><pre id=o>…</pre>
<iframe id=f style="border:0;width:1100px;height:800px"></iframe>
<script>${DENTRO}
var q=new URLSearchParams(location.search),f=document.getElementById('f');
f.src='/recorridos/'+q.get('r')+'.html';
f.onload=function(){setTimeout(function(){
 var d=f.contentDocument, w=f.contentWindow;
 var s=d.getElementById('scene');
 hornear(s, w);
 document.getElementById('o').textContent=JSON.stringify({svg:s.outerHTML});
 document.title='listo';
},3500);};
</script>`,
)

let total = 0
for (const r of RECORRIDOS) {
  const salida = execFileSync(
    EDGE,
    [
      '--headless=new', '--disable-gpu', '--no-first-run',
      '--virtual-time-budget=25000', '--window-size=1200,900', '--dump-dom',
      `${SITIO}/_escena.html?r=${r.slug}`,
    ],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] },
  )

  const m = salida.match(/<pre id="o">([\s\S]*?)<\/pre>/)
  if (!m) throw new Error(`escenas: no se pudo leer la escena de "${r.slug}"`)
  const { svg } = JSON.parse(
    m[1].replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'),
  )

  let out = svg
  // Los id llevan apellido: dos escenas en la misma página chocarían.
  out = out.replace(/\bid="([^"]+)"/g, (_, v) => `id="${r.slug}-${v}"`)
  out = out.replace(/url\(#([^)]+)\)/g, (_, v) => `url(#${r.slug}-${v})`)
  // Lo que necesita un archivo suelto para que un <img> lo muestre.
  const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1]
  if (!vb) throw new Error(`escenas: "${r.slug}" no trae viewBox`)
  const [, , ancho, alto] = vb.split(/\s+/).map(Number)
  out = out.replace(
    /^<svg/,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(ancho)}" height="${Math.round(alto)}"`,
  )
  out = out.replace(/\saria-label="[^"]*"/, '') // el alt del <img> hace ese trabajo

  if (!/xmlns=/.test(out) || !out.trim().endsWith('</svg>')) {
    throw new Error(`escenas: el SVG de "${r.slug}" salió mal formado`)
  }

  writeFileSync(resolve(raiz, `public/recorridos/escena-${r.slug}.svg`), out)
  const kb = out.length / 1024
  total += kb
  console.log(`  ✓ escena-${r.slug}.svg  ${kb.toFixed(1)} KB`)
}

unlinkSync(HARNESS)
console.log(`\n  ${RECORRIDOS.length} escenas · ${total.toFixed(1)} KB sin comprimir`)
