/*
 * Exporta la escena isométrica del recorrido del ERP a public/hero-operacion.svg,
 * el dibujo del hero.
 *
 *   npm run hero:dibujo          (necesita el sitio servido en :4173)
 *
 * Por qué así: la nave del recorrido se dibuja por código en el navegador, con
 * su paleta en variables CSS. Aquí se abre la página, se avanza al último paso
 * —cuando la escena está completa— y se copia cada propiedad pintada como
 * atributo, para que el SVG viva solo, sin CSS ni fuentes. El resultado pesa
 * ~27 KB (4 KB comprimido) contra los 40 KB del WebP que sustituyó, y es
 * nuestro: el render 3D anterior era de catálogo.
 *
 * Volver a correrlo si cambia la escena del ERP en recorridos-fuente/erp.html.
 */
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const base = process.env.BASE_URL || 'http://localhost:4173'
const edge = process.env.EDGE ||
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'

const pagina = `
<!doctype html><meta charset=utf8><iframe id="f" src="${base}/recorridos/erp" style="width:1200px;height:800px;border:0"></iframe><pre id="out"></pre>
<script>
document.getElementById('f').onload=function(){setTimeout(function(){
  var d=document.getElementById('f').contentDocument,w=document.getElementById('f').contentWindow;
  var pasos=d.querySelectorAll('.step'); pasos[pasos.length-1].click();
  setTimeout(function(){
    var vivo=d.getElementById('scene'), svg=vivo.cloneNode(true);
    var props=['fill','stroke','stroke-width','stroke-dasharray','opacity'];
    var orig=vivo.querySelectorAll('*'), copia=svg.querySelectorAll('*'), fuera=[];
    for(var i=0;i<orig.length;i++){
      var cs=w.getComputedStyle(orig[i]), el=copia[i];
      if(cs.opacity==='0'){ fuera.push(el); continue; }
      for(var k=0;k<props.length;k++){
        var v=cs.getPropertyValue(props[k]);
        var noneVale=(props[k]==='fill'||props[k]==='stroke');
        if(v && (noneVale || v!=='none') && !(props[k]==='opacity'&&v==='1')) el.setAttribute(props[k],v);
      }
      el.removeAttribute('class'); el.removeAttribute('data-d'); el.removeAttribute('data-h');
    }
    fuera.forEach(function(e){ e.parentNode && e.parentNode.removeChild(e) });
    svg.removeAttribute('id'); svg.removeAttribute('class');
    document.getElementById('out').textContent=svg.outerHTML;
  },1500);
},1200);
</script>`

const tmp = resolve(raiz, 'dist/_hero-export.html')
writeFileSync(tmp, pagina)

const dom = execFileSync(edge, [
  '--headless=new', '--disable-gpu', '--no-first-run',
  '--virtual-time-budget=30000', '--window-size=1300,900', '--dump-dom',
  `${base}/_hero-export.html`,
], { maxBuffer: 1 << 26 }).toString()

const bruto = dom.replace(/\n/g, '\r').match(/<pre id="out">([\s\S]*?)<\/pre>/)
if (!bruto) throw new Error('la escena no se pudo leer; ¿está servido el sitio en ' + base + '?')

let svg = bruto[1].replace(/\r/g, '\n')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&')
  .trim()

const vb = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number)
svg = svg
  .replace('<svg ', `<svg xmlns="http://www.w3.org/2000/svg" width="${vb[2]}" height="${vb[3]}" `)
  // La fuente heredada traía comillas dobles adentro y rompía el XML.
  .replace(/ font-family="[^>]*?sans-serif"/g, '')
  .replace(/\s+UI", sans-serif"/g, '')
  .replace(/ font-(size|weight)="[^"]*"/g, '')
  .replace(/ text-anchor="[^"]*"/g, '')
  .replace(/ stroke-width="([\d.]+)px"/g, ' stroke-width="$1"')
  .replace(/(-?\d+\.\d{2,})/g, (m) => String(Math.round(parseFloat(m) * 10) / 10))
  .replace(/\s+/g, ' ').replace(/> </g, '><')

const destino = resolve(raiz, 'public/hero-operacion.svg')
writeFileSync(destino, svg)
console.log(`  hero-operacion.svg: ${(svg.length / 1024).toFixed(1)} KB · ${vb[2]}×${vb[3]}`)
