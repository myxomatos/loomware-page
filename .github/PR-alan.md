## Qué resuelve

Producción está en vivo desde el PR #7, pero sirve **17 de sus 25 URLs sin una sola palabra**:
todo el texto lo dibuja JavaScript. Los ocho recorridos sí salen completos porque son HTML
escrito a mano; el resto llega a Google como `<body><div id="root"></div></body>`.

| | producción hoy | con este PR |
| --- | --- | --- |
| `/` | 181 palabras | **2 153** |
| `/servicios/erp` | **7 palabras** | 792 |
| `/industrias/manufactura` | **9 palabras** | 554 |
| Total indexable | ~12 500 en 11 páginas | **25 422 en 28** |

## Lo que trae, en orden de peso

**Prerenderizado.** El build construye dos veces —navegador y Node— y escribe el HTML de cada
página en su hueco; el navegador lo hidrata en vez de volver a dibujarlo. Comprobado en nueve
páginas: **cero quejas de hidratación**. Cuesta 12 KB comprimidos en la portada (97 → 109 KB),
y seguimos por debajo de cualquiera del grupo medido.

**Accesibilidad.** 79 pares de color estaban por debajo de WCAG AA y 31 blancos táctiles por
debajo de los 24×24 px que pide el criterio 2.5.8 —entre ellos los 21 enlaces del pie, en las 25
páginas—. **Ahora: cero y cero, medido en claro y en oscuro.** Incluye una corrección de un
arreglo anterior mío que quedó en 4.19:1 cuando lo reporté como 4.97.

**Una sola secuencia comercial.** El botón de todo el sitio dice «Solicitar diagnóstico» y el FAQ
decía que el diagnóstico se cotiza: el visitante creía pedir lo gratis. Se corrigió respetando la
decisión del 27 —llamada sin costo → diagnóstico con su precio → propuesta con precio cerrado— y
ahora se cuenta igual en los cuatro lugares donde el sitio la narra.

**Posicionamiento.** Tres páginas peleaban la misma consulta (`/servicios/erp` se titulaba como
las dos de giro). Los ocho recorridos pasaron de 2 enlaces internos a entre 3 y 10, ganaron
`HowTo` + `FAQPage` + `BreadcrumbList`, y sus títulos ahora contienen la pregunta que contestan.
Migas también en las ocho de servicio y las seis de giro.

**Los siete recorridos alcanzan al ERP.** El bloque de giros pasa a ir antes de los seis pasos
—si eras una clínica, antes tenías que leer seis pasos de una tarjeta de checado para enterarte
de que también era para ti—, cinco de los ocho no decían qué es la cosa y ahora los ocho lo
dicen en la primera línea, y los siete ganaron la puerta de media página que sólo tenía el ERP.

**Y lo demás:** tamaños de empresa fuera (uno iba en la meta description de nómina), la jerga que
quedaba en las páginas que reciben tráfico frío, quince tarjetas sociales propias —y la carrera
que las duplicaba—, la sede unificada en Estado de México para que el alta en Google Business no
se caiga, y la página de gracias, que decía el mismo compromiso de tiempo de tres formas
distintas en la misma pantalla.

## Comprobado antes de abrir

- `npm run build` y `npm test` — **23/23**
- **216 combinaciones** (28 páginas × 6 tamaños × claro y oscuro en los recorridos): cero
  desbordamiento horizontal, cero contraste bajo AA, cero blancos bajo 24 px, un `h1` por página
  sin saltos de nivel, cero imágenes sin `alt` o rotas
- En el preview: las 25 URLs responden 200, cada una con su tarjeta social, canonical al dominio,
  CSP y HSTS
- `alan` va **20 commits adelante de `main`, cero atrás y cero conflictos**

## Lo que NO trae, y sigue pendiente

La pantalla del sistema de los siete recorridos, los rótulos de escena a 7.5 px, las páginas por
zona y el contenido que contesta preguntas de búsqueda. Y lo que no está en el código: Search
Console, Analytics, Google Business y el rango de precio.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
