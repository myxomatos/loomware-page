/*
 * Dibuja la tarjeta social (og-image.png, 1200×630) con el sistema actual:
 * papel cálido, etiqueta monoespaciada en cobre, titular en morado sólido y la
 * nave isométrica que también abre el sitio.
 *
 *   npm run og:imagen           (necesita el sitio servido; BASE_URL si no es :4173)
 *
 * Antes era un PNG de 381 KB con el logo en degradado —el degradado ya no
 * existe— y pesaba más que toda la portada. Se renderiza en el navegador y se
 * comprime con sharp.
 */
import sharp from 'sharp'
import { writeFileSync, readFileSync, statSync, unlinkSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const base = process.env.BASE_URL || 'http://localhost:4173'
const edge = process.env.EDGE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'

const dibujo = readFileSync(resolve(raiz, 'public/hero-operacion.svg'), 'utf8')

const html = `<!doctype html><meta charset="utf-8">
<link rel="stylesheet" href="${base}/assets/og-fuentes.css">
<style>
  @font-face{font-family:'Inter';src:url('${base}/fonts/inter-latin.woff2') format('woff2');font-weight:100 900}
  @font-face{font-family:'Azeret Mono';src:url('${base}/fonts/azeret-mono-subset.woff2') format('woff2');font-weight:400 700}
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;overflow:hidden;
    font-family:Inter,system-ui,sans-serif;color:#0b1739;
    background:radial-gradient(120% 90% at 82% 18%,#ebe6fb 0%,#f7f5f1 55%,#ffffff 100%);
    display:grid;grid-template-columns:1fr 480px;align-items:center;gap:40px;padding:64px 72px}
  .marca{display:flex;align-items:center;gap:12px;margin-bottom:34px}
  .marca b{font-size:30px;font-weight:700;letter-spacing:-.02em}
  .lbl{font-family:'Azeret Mono',monospace;font-size:16px;font-weight:500;
    letter-spacing:.1em;text-transform:uppercase;color:#a35c23;margin-bottom:18px}
  h1{font-size:58px;line-height:1.05;letter-spacing:-.015em;font-weight:700;max-width:18ch}
  h1 span{color:#5326d9}
  p{margin-top:22px;font-size:23px;line-height:1.45;color:#465069;max-width:30ch}
  .dib{width:480px;background:#f5f3ef;border-radius:16px;padding:18px}
  .dib svg{width:100%;height:auto;display:block}
</style>
<div>
  <div class="marca">
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" stroke="#0b1739" stroke-width="1.8"/>
      <path d="M6.5 15.5 10.5 11.5l2.5 2.5L19.5 8" stroke="#fff" stroke-width="4.6"/>
      <path d="M15.5 8h4v4" stroke="#fff" stroke-width="4.6"/>
      <path d="M6.5 15.5 10.5 11.5l2.5 2.5L19.5 8" stroke="#5326d9" stroke-width="1.9"/>
      <path d="M15.5 8h4v4" stroke="#5326d9" stroke-width="1.9"/>
    </svg><b>Loomware</b>
  </div>
  <div class="lbl">CRM · ERP · Nómina · Software a medida</div>
  <h1>Tu negocio creció más rápido que <span>tus sistemas</span>.</h1>
  <p>Ponemos orden en la operación de pymes en México.</p>
</div>
<div class="dib">${dibujo}</div>`

const tmpHtml = resolve(raiz, 'dist/_og.html')
const tmpPng = resolve(raiz, 'dist/_og.png')
writeFileSync(tmpHtml, html)

execFileSync(edge, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars',
  '--virtual-time-budget=15000', '--window-size=1200,630',
  `--screenshot=${tmpPng}`, `${base}/_og.html`,
])

const destino = resolve(raiz, 'public/og-image.png')
const antes = (statSync(destino).size / 1024).toFixed(0)
await sharp(tmpPng).png({ quality: 82, compressionLevel: 9, palette: true }).toFile(destino)
unlinkSync(tmpPng); unlinkSync(tmpHtml)
console.log(`  og-image.png: ${antes} KB → ${(statSync(destino).size / 1024).toFixed(0)} KB`)
