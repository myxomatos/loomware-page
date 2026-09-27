/*
 * De dónde cuelgan las imágenes que otros servicios tienen que poder bajar.
 *
 * El problema medido el 2026-09-24: la tarjeta social de los recorridos
 * apuntaba a `https://loomware.com.mx/og-image.png`, que **hoy responde 404**
 * —producción sigue sirviendo el sitio viejo, cuya tarjeta es otro archivo—.
 * Como el enlace que se comparte es el del preview de la rama, WhatsApp pedía
 * la imagen al dominio, no la encontraba y **no mostraba ninguna**. La pieza
 * que existe para mandarse por WhatsApp se previsualizaba en blanco.
 *
 * `og:image` es la única URL absoluta de la página que **tiene que resolver
 * ahora mismo**: el canonical puede y debe apuntar al dominio —así el preview
 * no compite en el buscador—, pero la imagen la baja un tercero en el momento
 * en que alguien pega el enlace.
 *
 * Cloudflare Pages pone `CF_PAGES_BRANCH` en cada build. Si es una rama que no
 * es `main`, la imagen cuelga del preview de esa rama, que es donde de verdad
 * está. En producción —y en cualquier build local— se queda el dominio.
 *
 * El nombre del proyecto es el que documenta CLAUDE.md: los preview de rama
 * viven en `https://<rama>.loomware-page.pages.dev`.
 */
import { DOMINIO } from '../src/data/contacto.js'

const PROYECTO = 'loomware-page'

export function basePublica() {
  const rama = process.env.CF_PAGES_BRANCH
  if (!rama || rama === 'main') return DOMINIO
  // Cloudflare admite letras, números y guiones en el subdominio de rama.
  const limpia = rama.toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 28).replace(/^-+|-+$/g, '')
  return limpia ? `https://${limpia}.${PROYECTO}.pages.dev` : DOMINIO
}
