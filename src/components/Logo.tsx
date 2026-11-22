/** Znak Bistre glavice: olovka iz čijeg vrha izbija rasprsak. */
export function Logo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="6 2 92 92" aria-hidden="true" focusable="false">
      <g
        transform="translate(-8 8) rotate(-45 50 50)"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      >
        <rect x="6" y="42" width="8" height="16" fill="var(--fi)" />
        <rect x="14" y="42" width="6" height="16" fill="var(--ink)" />
        <rect x="20" y="42" width="46" height="16" fill="var(--sun)" />
        <polygon points="66,42 82,50 66,58" fill="var(--paper)" />
        <polygon points="77,47.5 82,50 77,52.5" fill="var(--ink)" />
      </g>
      <g
        transform="translate(56 4) scale(0.4)"
        fill="none"
        stroke="var(--fi)"
        strokeWidth="10"
        strokeLinecap="round"
      >
        <path d="M50 28 L50 4" />
        <path d="M65.6 34.4 L82.5 17.5" />
        <path d="M72 50 L96 50" />
        <path d="M65.6 65.6 L82.5 82.5" />
        <path d="M34.4 34.4 L17.5 17.5" />
      </g>
    </svg>
  )
}
