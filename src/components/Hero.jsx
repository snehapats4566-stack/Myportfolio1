import { useMemo } from 'react'

const SPARKLE_COUNT = 25

function CastleSilhouette() {
  return (
    <svg
      className="hero__castle"
      viewBox="0 0 1200 120"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <path
        fill="#1a1a3e"
        d="M0 120V80h80V50h40v30h60V30h50v20h40V10h30v70h50V40h40v30h60V20h45v40h55V60h35v60H0z"
      />
      <rect x="95" y="55" width="8" height="12" fill="#252550" />
      <rect x="320" y="45" width="10" height="15" fill="#252550" />
      <rect x="580" y="35" width="12" height="18" fill="#252550" />
      <rect x="890" y="50" width="8" height="12" fill="#252550" />
    </svg>
  )
}

function CarriageSilhouette() {
  return (
    <svg
      className="hero__carriage"
      viewBox="0 0 120 60"
      aria-hidden="true"
    >
      <ellipse cx="60" cy="45" rx="50" ry="12" fill="none" stroke="#c9a227" strokeWidth="1.5" />
      <path
        d="M15 45 Q15 25 60 22 Q105 25 105 45"
        fill="none"
        stroke="#c9a227"
        strokeWidth="1.5"
      />
      <circle cx="30" cy="48" r="8" fill="none" stroke="#c9a227" strokeWidth="1.5" />
      <circle cx="90" cy="48" r="8" fill="none" stroke="#c9a227" strokeWidth="1.5" />
      <line x1="60" y1="22" x2="60" y2="8" stroke="#c9a227" strokeWidth="1" />
      <path d="M45 8 L60 2 L75 8" fill="none" stroke="#c9a227" strokeWidth="1" />
    </svg>
  )
}

function ClockSVG() {
  return (
    <svg className="hero__clock" viewBox="0 0 80 80" aria-label="Clock showing eleven fifty-eight">
      <circle cx="40" cy="40" r="36" fill="none" stroke="#f5c842" strokeWidth="1.5" opacity="0.6" />
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180)
        const x1 = 40 + Math.cos(angle) * 30
        const y1 = 40 + Math.sin(angle) * 30
        const x2 = 40 + Math.cos(angle) * 34
        const y2 = 40 + Math.sin(angle) * 34
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f5c842" strokeWidth="1" opacity="0.5" />
        )
      })}
      <line x1="40" y1="40" x2="40" y2="22" stroke="#f5c842" strokeWidth="2" strokeLinecap="round" />
      <g className="hero__clock-hand">
        <line x1="40" y1="40" x2="52" y2="28" stroke="#e8a0bf" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <circle cx="40" cy="40" r="3" fill="#f5c842" />
    </svg>
  )
}

function QuillScrollHint() {
  return (
    <svg className="hero__scroll-hint" width="28" height="40" viewBox="0 0 28 40" aria-hidden="true">
      <path
        d="M14 2 C8 8 4 18 4 28 C4 34 8 38 14 38 C20 38 24 34 24 28 C24 18 20 8 14 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <line x1="14" y1="38" x2="14" y2="8" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <path d="M10 6 L14 2 L18 6" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export default function Hero() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
        id: i,
        top: `${5 + Math.random() * 85}%`,
        left: `${2 + Math.random() * 96}%`,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 3,
        char: ['✦', '✧', '⋆', '★'][i % 4],
      })),
    []
  )

  return (
    <section
      id="home"
      className="hero hero--visible"
      aria-labelledby="hero-title"
    >
      <CastleSilhouette />
      <CarriageSilhouette />
      <ClockSVG />

      {sparkles.map((s) => (
        <span
          key={s.id}
          className="hero__sparkle"
          style={{
            top: s.top,
            left: s.left,
            animation: `float ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
          aria-hidden="true"
        >
          {s.char}
        </span>
      ))}

      <div className="hero__content">
        <p className="hero__label">Once Upon a Time</p>
        <h1 id="hero-title" className="hero__title">
          Hi, I am
          <span>Sneha Patil</span>
        </h1>
        <p className="hero__tagline">
          Engineering student weaving enchanted frontend experiences at the stroke of midnight code.
        </p>
        <div className="hero__cta">
          <a href="#about" className="btn-gold-outline">
            Enter the Ball
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <QuillScrollHint />
    </section>
  )
}
