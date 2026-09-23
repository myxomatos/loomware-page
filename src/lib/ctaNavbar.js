import { useEffect, useState } from 'react'

import './ctaNavbar.css'

/*
 * El botón de diagnóstico de la barra superior, cuando el hero ya trae el suyo.
 *
 * Contados en la página armada, había seis botones de diagnóstico en el inicio
 * y cuatro en cada página de servicio. Dos de ellos se veían **al mismo tiempo
 * y a ciento cincuenta píxeles de distancia**: el de la barra y el del hero,
 * con el mismo destino. Eso no es insistir, es repetirse.
 *
 * Aquí se vigila el botón del hero —no el hero entero, porque lo que estorba es
 * ver dos veces la misma acción—. Mientras esté a la vista, el de la barra se
 * retira; en cuanto sale, toma el relevo. Nunca hay dos y nunca falta uno.
 *
 * En una página sin hero —el aviso de privacidad, `/gracias`— no hay nada que
 * vigilar y el botón se queda desde el principio, que es lo correcto.
 *
 * **Por qué con scroll y no con IntersectionObserver.** El observador es la
 * herramienta natural para esto y fue la primera versión. Se cambió porque no
 * se pudo comprobar: en el entorno de medición no se dispara, y un botón que
 * quizá nunca reaparece es peor falla que un botón repetido. Esto se mide con
 * una lectura de posición, que se puede probar y se probó. El costo es un
 * escucha de scroll que ya existía en la barra, con la lectura dentro de un
 * cuadro de animación para no obligar al navegador a recalcular de más.
 *
 * Lo usan la barra del inicio y las de servicio e industria, que son
 * componentes distintos con el mismo botón.
 */
const BOTON_DEL_HERO = '.hero .btn--primary, .servicio__hero .btn--primary'
const ALTO_DE_LA_BARRA = 72

export function useCtaOculta() {
  const [oculta, setOculta] = useState(true)

  useEffect(() => {
    const boton = document.querySelector(BOTON_DEL_HERO)
    if (!boton) {
      setOculta(false) // una página sin hero: el botón de la barra es el único
      return undefined
    }

    const mirar = () => {
      const c = boton.getBoundingClientRect()
      // A la vista = asoma por debajo de la barra y aún no sale por abajo.
      setOculta(c.bottom > ALTO_DE_LA_BARRA && c.top < window.innerHeight)
    }

    // Se lee en el propio escucha, sin diferir a un cuadro de animación: es una
    // sola medida de un elemento, del mismo orden que el window.scrollY que la
    // barra ya consulta en cada scroll, y así no depende de nada más para
    // reaccionar. React ignora el cambio si el valor no se movió.
    mirar()
    window.addEventListener('scroll', mirar, { passive: true })
    window.addEventListener('resize', mirar, { passive: true })
    window.addEventListener('load', mirar)
    return () => {
      window.removeEventListener('scroll', mirar)
      window.removeEventListener('resize', mirar)
      window.removeEventListener('load', mirar)
    }
  }, [])

  return oculta
}

/* Las tres barras usan las mismas clases y los mismos atributos. */
export function propsCta(oculta, clases = 'btn btn--outline btn--pill btn--sm') {
  return {
    className: `${clases} nav__cta${oculta ? ' nav__cta--oculto' : ''}`,
    'aria-hidden': oculta,
    tabIndex: oculta ? -1 : undefined,
  }
}
