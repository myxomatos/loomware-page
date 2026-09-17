import React, { useId } from 'react'
import './Logo.css'

/*
 * Brand mark: cloud outline with a rising arrow that pierces the top-right,
 * drawn as SVG so it stays crisp at any size. The "halo" stroke under the
 * arrow creates the gap where it crosses the cloud outline.
 */
export default function Logo({ variant = 'dark', size = 32, className = '' }) {
  const gradId = `lw-grad-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const light = variant === 'light'
  const ink = light ? '#ffffff' : '#0b1739'
  const halo = light ? '#0b1739' : '#ffffff'
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
        <defs>
          <linearGradient id={gradId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#6338ff" />
            <stop offset="0.55" stopColor="#b5179e" />
            <stop offset="1" stopColor="#e11d48" />
          </linearGradient>
        </defs>
        <path
          d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
          stroke={ink}
          strokeWidth="1.8"
        />
        <path d={arrow} stroke={halo} strokeWidth="4.6" />
        <path d={head} stroke={halo} strokeWidth="4.6" />
        <path d={arrow} stroke={`url(#${gradId})`} strokeWidth="1.9" />
        <path d={head} stroke={`url(#${gradId})`} strokeWidth="1.9" />
      </svg>
      <span className="brand__name">Loomware</span>
    </span>
  )
}
