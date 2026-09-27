/*
 * Llegar al ancla cuando la página se abre con hash.
 *
 * El problema: un enlace como `/#contacto` desde la calculadora, el pie o una
 * página de servicio carga el inicio y el navegador busca `#contacto` de
 * inmediato. Pero el inicio lo dibuja React, así que en ese instante la
 * sección todavía no existe: el navegador no encuentra nada y deja al
 * visitante hasta arriba. El botón «Diagnóstico» parecía llevar al inicio y no
 * al formulario, que es justo el único camino al formulario desde cualquier
 * página que no sea el inicio.
 *
 * La solución: esperar a que el elemento aparezca y entonces sí ir. Se vuelve
 * a intentar en cada cuadro durante un segundo —React monta mucho antes— y se
 * corrige una vez más al terminar de cargar, porque las fuentes y las imágenes
 * mueven el alto de la página después del primer dibujo.
 *
 * El desplazamiento va sin animación a propósito: venimos de otra página, y
 * verla deslizarse desde arriba se lee como una falla, no como un detalle.
 */
export function irAlAncla() {
  const id = decodeURIComponent(window.location.hash.slice(1))
  if (!id) return

  // Si el visitante se mueve por su cuenta, dejarlo en paz.
  let suyo = false
  const marcar = () => { suyo = true }
  window.addEventListener('wheel', marcar, { passive: true, once: true })
  window.addEventListener('touchmove', marcar, { passive: true, once: true })
  window.addEventListener('keydown', marcar, { once: true })

  const ir = (el) => {
    const raiz = document.documentElement
    const previo = raiz.style.scrollBehavior
    raiz.style.scrollBehavior = 'auto'
    el.scrollIntoView({ block: 'start' }) // respeta el scroll-padding-top del header
    raiz.style.scrollBehavior = previo
  }

  let intentos = 0
  const buscar = () => {
    if (suyo) return
    const el = document.getElementById(id)
    if (el) {
      ir(el)
      // Segunda pasada al terminar de cargar: para entonces las fuentes ya
      // asentaron el alto y el destino puede haberse movido unos píxeles.
      window.addEventListener('load', () => {
        if (suyo) return
        const otra = document.getElementById(id)
        if (otra) ir(otra)
      }, { once: true })
      return
    }
    if (++intentos < 60) requestAnimationFrame(buscar)
  }
  requestAnimationFrame(buscar)
}
