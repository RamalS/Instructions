export function Logo({ size = 14 }: { size?: number }) {
  const gap = Math.round(size / 5)
  const colors = ['var(--ma)', 'var(--fi)', 'var(--in)', 'var(--bi)']
  return (
    <span
      aria-hidden="true"
      style={{ display: 'grid', gridTemplateColumns: `repeat(2, ${size}px)`, gap }}
    >
      {colors.map((c) => (
        <span key={c} style={{ width: size, height: size, background: c }} />
      ))}
    </span>
  )
}
