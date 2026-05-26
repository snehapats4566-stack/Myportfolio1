import { memo, useEffect, useRef } from 'react'

function Starfield() {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const frameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initStars = () => {
      starsRef.current = Array.from({ length: 150 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.002 + 0.001,
        offset: Math.random() * Math.PI * 2,
        drift: Math.random() * 0.15 + 0.02,
      }))
    }

    resize()
    initStars()

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      starsRef.current.forEach((star) => {
        if (!prefersReduced) {
          star.y -= star.drift
          if (star.y < 0) {
            star.y = canvas.height
            star.x = Math.random() * canvas.width
          }
        }

        const opacity = prefersReduced
          ? 0.85
          : 0.4 + 0.6 * ((Math.sin(time * star.speed + star.offset) + 1) / 2)

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()
      })

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)

    const onResize = () => {
      resize()
      initStars()
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="starfield-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

export default memo(Starfield)
