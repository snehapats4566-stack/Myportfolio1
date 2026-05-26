import { useEffect, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

/* ── SVG Icons ── */
const HeartMailIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#c9a227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
    <path d="M12 13 L10 11 C9 9 10 7 12 8 C14 7 15 9 14 11 Z" fill="#c9a227" stroke="none" />
  </svg>
)

const WandIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="15" y1="9" x2="3" y2="21" />
    <path d="M17.5 3a2.121 2.121 0 0 1 3 3L19 7.5l-3-3z" />
    <path d="M8 3l1 2M3 8l2 1M18 13l1 2M13 18l2 1" />
    <circle cx="19" cy="5" r="0.5" fill="currentColor" />
  </svg>
)

const EnvelopeSuccessIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
    <polyline points="8,14 11,17 16,12" stroke="#f5c842" strokeWidth="2" />
  </svg>
)

const PetalSVG = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M12 2 C16 6 17 11 12 14 C7 11 8 6 12 2 Z" opacity="0.7" />
    <path d="M12 14 C14 18 13 21 12 22 C11 21 10 18 12 14 Z" opacity="0.5" />
    <path d="M12 14 C8 18 5 17 4 16 C6 14 9 13 12 14 Z" opacity="0.5" />
    <path d="M12 14 C16 18 19 17 20 16 C18 14 15 13 12 14 Z" opacity="0.5" />
  </svg>
)

const StarSVG = () => (
  <svg viewBox="0 0 24 24" width="9" height="9" fill="currentColor" aria-hidden="true">
    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
  </svg>
)

const CrownSealSVG = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="#f5c842" aria-hidden="true">
    <path d="M2 18h20M2 18l3-9 5 4.5 2-7 2 7 5-4.5 3 9" />
  </svg>
)

/* ── Sparkle positions for burst ── */
const SPARKLE_POS = [
  { x: -60, y: -30 }, { x: 70, y: -40 }, { x: -70, y: 20 },
  { x: 80, y: 30 },   { x: 0,  y: -60 }, { x: -40, y: 50 },
  { x: 50, y: 55 },   { x: -20, y: -50 },
]

/* ── Envelope SVG with animated flap & letter ── */
function MagicEnvelope({ phase }) {
  return (
    <div className="env-scene" aria-hidden="true">
      {/* Glow ring */}
      <div className={`env-glow ${phase >= 1 ? 'env-glow--active' : ''}`} />

      {/* Sparkle burst when letter rises */}
      {phase >= 2 && SPARKLE_POS.map((pos, i) => (
        <span
          key={i}
          className="env-sparkle"
          style={{ '--ex': `${pos.x}px`, '--ey': `${pos.y}px`, animationDelay: `${i * 0.06}s` }}
        >
          <StarSVG />
        </span>
      ))}

      <div className="env-wrap">
        {/* Letter rising from envelope */}
        <div className={`env-letter ${phase >= 2 ? 'env-letter--rise' : ''}`}>
          <div className="env-letter__paper">
            <div className="env-letter__line" />
            <div className="env-letter__line env-letter__line--short" />
            <div className="env-letter__line" />
            <div className="env-letter__line env-letter__line--short" />
            <div className="env-letter__heart">
              <HeartMailIcon />
            </div>
          </div>
        </div>

        {/* Main envelope body */}
        <svg className="env-svg" viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="envBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#1e1535" />
              <stop offset="100%" stopColor="#2a1e42" />
            </linearGradient>
            <linearGradient id="envFlap" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#2e2050" />
              <stop offset="100%" stopColor="#1e1535" />
            </linearGradient>
            <filter id="envGlow">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Envelope body */}
          <rect x="10" y="60" width="220" height="90" rx="6" fill="url(#envBody)" stroke="#c9a227" strokeWidth="1.5"/>

          {/* Fold lines */}
          <line x1="10" y1="150" x2="120" y2="100" stroke="#c9a227" strokeWidth="1" opacity="0.3"/>
          <line x1="230" y1="150" x2="120" y2="100" stroke="#c9a227" strokeWidth="1" opacity="0.3"/>

          {/* Wax seal — SVG crown path instead of ♛ */}
          {phase < 3 && (
            <g className="env-seal">
              <circle cx="120" cy="105" r="16" fill="#7b1a1a" stroke="#c9a227" strokeWidth="1.5"/>
              {/* Crown SVG path centred in the seal */}
              <path d="M112 110 h16 M112 110 l2-6 4 3 2-5 2 5 4-3 2 6"
                fill="none" stroke="#f5c842" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          )}

          {/* Seal cracks */}
          {phase >= 3 && (
            <>
              <circle className="env-seal-left"  cx="108" cy="105" r="14" fill="#7b1a1a" stroke="#c9a227" strokeWidth="1"/>
              <circle className="env-seal-right" cx="132" cy="105" r="14" fill="#7b1a1a" stroke="#c9a227" strokeWidth="1"/>
            </>
          )}

          {/* Animated flap */}
          <g className={`env-flap ${phase >= 1 ? 'env-flap--open' : ''}`} style={{ transformOrigin: '120px 60px' }}>
            <path d="M10 60 L120 10 L230 60 Z" fill="url(#envFlap)" stroke="#c9a227" strokeWidth="1.5" filter="url(#envGlow)"/>
            <line x1="10" y1="60" x2="230" y2="60" stroke="#c9a227" strokeWidth="0.8" opacity="0.5"/>
          </g>

          {/* Decorative V lines */}
          <line x1="10" y1="60" x2="120" y2="105" stroke="#c9a227" strokeWidth="0.8" opacity="0.2"/>
          <line x1="230" y1="60" x2="120" y2="105" stroke="#c9a227" strokeWidth="0.8" opacity="0.2"/>

          {/* Corner star SVG paths (replacing ✦✧ text) */}
          <path d="M18 70 L19 74.5 L23.5 75.5 L19 76.5 L18 81 L17 76.5 L12.5 75.5 L17 74.5 Z"
            fill="#f5c842" opacity="0.6"/>
          <path d="M222 70 L223 74.5 L227.5 75.5 L223 76.5 L222 81 L221 76.5 L216.5 75.5 L221 74.5 Z"
            fill="#f5c842" opacity="0.6"/>
          <path d="M18 143 L18.8 146.5 L22.5 147 L18.8 147.5 L18 151 L17.2 147.5 L13.5 147 L17.2 146.5 Z"
            fill="#f5c842" opacity="0.5"/>
          <path d="M222 143 L222.8 146.5 L226.5 147 L222.8 147.5 L222 151 L221.2 147.5 L217.5 147 L221.2 146.5 Z"
            fill="#f5c842" opacity="0.5"/>
        </svg>
      </div>

      {/* Hint text with SVG star instead of ✨ */}
      <p className={`env-hint ${phase >= 1 ? 'env-hint--fade' : ''}`}>
        <span style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: '4px', color: 'var(--gold)' }}>
          <StarSVG />
        </span>
        A royal invitation arrives…
      </p>
    </div>
  )
}

export default function Contact() {
  const { ref, isVisible } = useScrollReveal(0.15)
  const [phase, setPhase] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [burst, setBurst] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    if (!isVisible) return
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 1200)
    const t3 = setTimeout(() => setPhase(3), 2000)
    const t4 = setTimeout(() => setShowForm(true), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [isVisible])

  const handleSubmit = (e) => {
    e.preventDefault()
    setBurst(true)
    setTimeout(() => { setBurst(false); setSubmitted(true) }, 600)
  }

  return (
    <section id="contact" className="section contact" ref={ref} aria-labelledby="contact-heading">

      {/* Floating SVG petals */}
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="contact__petal"
          style={{
            left: `${10 + i * 18}%`,
            animationDelay: `${i * 1.4}s`,
            animationDuration: `${7 + i}s`,
            color: i % 2 === 0 ? '#d4719f' : '#ce93d8',
          }}
          aria-hidden="true"
        >
          <PetalSVG />
        </span>
      ))}

      <div className={`section__inner reveal ${isVisible ? 'reveal--visible' : ''}`} style={{ maxWidth: 680 }}>
        <p className="section-label" style={{ textAlign: 'center' }}>Chapter V — Send Your Invitation</p>
        <h2 id="contact-heading" className="section-heading" style={{ textAlign: 'center' }}>
          Get In Touch
        </h2>

        {!submitted && <MagicEnvelope phase={phase} />}

        {submitted && (
          <div className="contact__success contact__success--in">
            <span className="contact__success-icon" style={{ color: 'var(--gold)' }}>
              <EnvelopeSuccessIcon />
            </span>
            <p>Your royal invitation has been received!</p>
            <p className="contact__success-sub">I'll reply before the clock strikes midnight</p>
          </div>
        )}

        {!submitted && (
          <div className={`contact__form-wrap ${showForm ? 'contact__form-wrap--in' : ''}`}>
            <form className="contact__parchment" onSubmit={handleSubmit} noValidate>
              <div className="contact__field">
                <input id="contact-name" type="text" required placeholder=" "
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name"/>
                <label htmlFor="contact-name">Your Name</label>
              </div>
              <div className="contact__field">
                <input id="contact-email" type="email" required placeholder=" "
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email"/>
                <label htmlFor="contact-email">Email Address</label>
              </div>
              <div className="contact__field">
                <textarea id="contact-message" required rows={5} placeholder=" "
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}/>
                <label htmlFor="contact-message">Your Message</label>
              </div>
              <button type="submit" className="btn-gold-fill" style={{ width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                {burst && [...Array(8)].map((_, i) => (
                  <span key={i} className="magic-cursor__sparkle"
                    style={{ position: 'absolute', left: '50%', top: '50%',
                      '--sx': `${Math.cos((i * Math.PI) / 4) * 40}px`,
                      '--sy': `${Math.sin((i * Math.PI) / 4) * 40}px` }}
                    aria-hidden="true"/>
                ))}
                Seal &amp; Send
                <WandIcon />
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
