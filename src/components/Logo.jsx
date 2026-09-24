import './Logo.css'

/*
 * Brand mark: cloud outline with a rising arrow that pierces the top-right,
 * drawn as SVG so it stays crisp at any size. The "halo" stroke under the
 * arrow creates the gap where it crosses the cloud outline.
 */
export default function Logo({ variant = 'dark', size = 32, className = '' }) {
  const light = variant === 'light'
  const ink = light ? '#ffffff' : '#0b1739'
  const halo = light ? '#0b1739' : '#ffffff'
  // La flecha va en el acento sólido. El degradado morado→rosa→rojo se retiró:
  // era la firma de 2019 y repetía en el logo lo que ya se quitó del titular.
  const acento = light ? '#a78bfa' : '#5326d9'
  const arrow = 'M6.5 15.5 10.5 11.5l2.5 2.5L19.5 8'
  const head = 'M15.5 8h4v4'

  return (
    <span className={`brand brand--${variant} ${className}`.trim()}>
      <svg
        className="brand__mark"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M19 19H4.8a2.8 2.8 0 1 1 .05-5.6 4 4 0 0 1 4.58-5.31A5 5 0 0 1 19 11a4 4 0 0 1 0 8Z"
          stroke={ink}
          strokeWidth="1.8"
        />
        <path d={arrow} stroke={halo} strokeWidth="4.6" />
        <path d={head} stroke={halo} strokeWidth="4.6" />
        <path d={arrow} stroke={acento} strokeWidth="1.9" />
        <path d={head} stroke={acento} strokeWidth="1.9" />
      </svg>
      <span className="brand__name">Loomware</span>
    </span>
  )
}
