import { memo, useEffect, useState, useRef } from 'react'

function MagicCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [sparkles, setSparkles] = useState([])
  const [disabled, setDisabled] = useState(false)
  const idRef = useRef(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisabled(true)
      return
    }

    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })

      const angle = Math.random() * Math.PI * 2
      const dist = 20 + Math.random() * 30
      const id = idRef.current++
      const sx = Math.cos(angle) * dist
      const sy = Math.sin(angle) * dist

      setSparkles((prev) => [
        ...prev.slice(-40),
        { id, x: e.clientX, y: e.clientY, sx, sy },
      ])

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id))
      }, 600)
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  if (disabled) return null

  return (
    <>
      <svg
        className="magic-cursor__star"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="#f5c842"
          d="M12 0l2.9 9.1H24l-7.6 5.5 2.9 9.1L12 18.2l-7.3 5.5 2.9-9.1L0 9.1h9.1z"
        />
      </svg>
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="magic-cursor__sparkle"
          style={{
            left: s.x,
            top: s.y,
            '--sx': `${s.sx}px`,
            '--sy': `${s.sy}px`,
          }}
        />
      ))}
    </>
  )
}

export default memo(MagicCursor)
