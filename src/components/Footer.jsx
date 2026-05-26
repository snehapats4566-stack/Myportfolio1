import { useEffect, useState, useRef } from 'react'

function CastleRow() {
  return (
    <svg className="footer__castles" viewBox="0 0 1200 60" aria-hidden="true">
      <path
        fill="#0c0c1a"
        d="M0 60V40h50V25h25v15h40V15h30v10h35V5h20v35h45V20h30v20h40V10h25v30h50V30h20v30H0z"
      />
    </svg>
  )
}

function CarriageFooter() {
  return (
    <svg className="footer__carriage" viewBox="0 0 80 40" aria-hidden="true">
      <ellipse cx="40" cy="30" rx="35" ry="8" fill="none" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
      <path d="M10 30 Q10 18 40 15 Q70 18 70 30" fill="none" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
      <circle cx="22" cy="32" r="5" fill="none" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
      <circle cx="58" cy="32" r="5" fill="none" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

function Firework({ x, color }) {
  const particles = 8
  return (
    <div
      className="footer__firework"
      style={{ left: x, bottom: '55%', color }}
      aria-hidden="true"
    >
      {[...Array(particles)].map((_, i) => {
        const angle = (i / particles) * Math.PI * 2
        const dist = 24
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: color,
              animation: 'firework-burst 1s ease forwards',
              transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`,
            }}
          />
        )
      })}
    </div>
  )
}

function SocialIcon({ href, label, children }) {
  return (
    <a href={href} className="footer__social" aria-label={label} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default function Footer() {
  const [fireworks, setFireworks] = useState([])
  const [shooting, setShooting] = useState(false)
  const fwId = useRef(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const launch = () => {
      const id = fwId.current++
      const x = `${15 + Math.random() * 70}%`
      const colors = ['#f5c842', '#e8a0bf', '#d0ddf0', '#c9a227']
      const color = colors[Math.floor(Math.random() * colors.length)]
      setFireworks((prev) => [...prev.slice(-4), { id, x, color }])
      setTimeout(() => {
        setFireworks((prev) => prev.filter((f) => f.id !== id))
      }, 1000)
    }

    launch()
    const interval = setInterval(() => {
      launch()
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(interval)
  }, [])

  const scrollTop = () => {
    setShooting(true)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setShooting(false)
    }, 400)
  }

  return (
    <footer className="footer">
      <CastleRow />
      <CarriageFooter />

      {fireworks.map((fw) => (
        <Firework key={fw.id} x={fw.x} color={fw.color} />
      ))}

      <div className="footer__content">
        <p className="footer__the-end">The End</p>

        <div className="footer__socials">
          <SocialIcon href="https://github.com/snehapats4566-stack" label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </SocialIcon>
          <SocialIcon href="https://www.linkedin.com/in/sneha-nandkishor-patil-80126a37a" label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </SocialIcon>
        </div>

        <p className="footer__copy">
          © {new Date().getFullYear()} Sneha Patil Portfolio
        </p>
      </div>

      <button
        type="button"
        className={`footer__back-top ${shooting ? 'footer__back-top--shoot' : ''}`}
        onClick={scrollTop}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
          <path fill="currentColor" d="M12 2l2.5 8H22l-7 6 2.5 8L12 17l-5.5 7L9 16 2 10h7.5z" />
        </svg>
      </button>
    </footer>
  )
}
