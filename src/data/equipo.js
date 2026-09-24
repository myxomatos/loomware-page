/*
 * Equipo de Loomware, para la sección "Quiénes somos".
 *
 * Una persona aparece en la página sólo cuando tiene `cargo` y `foto`. Hasta
 * entonces se muestra únicamente el texto de la empresa. Así el preview nunca
 * enseña tarjetas a medias.
 *
 * foto: ruta dentro de public/, p. ej. '/equipo/aldo.jpg' (cuadrada, 600×600).
 * linkedin: URL completa del perfil, o '' para no mostrar el enlace.
 */
export const EQUIPO = [
  {
    nombre: 'Aldo Sánchez',
    cargo: '',
    bio: '',
    foto: '',
    linkedin: '',
  },
  {
    nombre: 'Alan',
    cargo: '',
    bio: '',
    foto: '',
    linkedin: '',
  },
]

export const equipoVisible = () => EQUIPO.filter((p) => p.cargo && p.foto)
