import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

/* ── SVG Icon Components ── */
const SchoolIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 21V9l9-6 9 6v12" />
    <path d="M9 21V15h6v6" />
    <rect x="10" y="9" width="4" height="4" />
    <line x1="12" y1="3" x2="12" y2="3" />
  </svg>
)

const BookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="8" y1="7" x2="16" y2="7" />
    <line x1="8" y1="11" x2="13" y2="11" />
  </svg>
)

const CrownIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 19h20M2 19l3-10 5 5 2-7 2 7 5-5 3 10" />
    <circle cx="12" cy="7" r="1" fill="currentColor" />
    <circle cx="5.5" cy="13.5" r="0.8" fill="currentColor" />
    <circle cx="18.5" cy="13.5" r="0.8" fill="currentColor" />
  </svg>
)

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="15" y1="4" x2="9" y2="20" />
  </svg>
)

/* Small sparkle SVG for timeline cards */
const SparkSVG = ({ size = 8 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
  </svg>
)

/* Petal SVG for background decoration */
const PetalSVG = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M12 2 C16 6 18 10 12 14 C6 10 8 6 12 2 Z" fill="currentColor" opacity="0.6" />
    <path d="M12 14 C14 18 13 21 12 22 C11 21 10 18 12 14 Z" fill="currentColor" opacity="0.4" />
  </svg>
)

const MILESTONES = [
  {
    year: '2010 – 2023',
    role: 'School Years',
    company: 'Holy Cross Convent School, Kalyan',
    desc: 'Built a strong academic foundation at Holy Cross Convent School — where curiosity, discipline, and a love for learning were first kindled.',
    Icon: SchoolIcon,
    color: '#d4719f',
  },
  {
    year: '2023 – 2025',
    role: 'Junior College',
    company: 'Narayana Junior College',
    desc: 'Pursued Science stream at Narayana Junior College, diving deep into Mathematics and Physics — sharpening analytical thinking that now fuels every line of code.',
    Icon: BookIcon,
    color: '#f5c842',
  },
  {
    year: '2025 – Present',
    role: 'B.Tech Engineering Student',
    company: 'ITM Skills University, Kharghar',
    desc: 'Currently weaving magic with code at ITM Skills University — studying engineering, mastering React, DSA, and crafting enchanted digital experiences.',
    Icon: CrownIcon,
    color: '#6ba3c5',
  },
  {
    year: '2025 – Present',
    role: 'Creative Developer & Builder',
    company: 'Royal Portfolio Kingdom',
    desc: 'Leading personal projects, building fullstack applications, and crafting aesthetic portfolio experiences that sparkle like midnight stardust.',
    Icon: CodeIcon,
    color: '#e8a0bf',
  },
]

function TimelineCard({ milestone, side, triggered }) {
  return (
    <div className={`timeline__item timeline__item--${side}`}>
      <div className="timeline__node-wrap">
        <div
          className={`timeline__node ${triggered ? 'timeline__node--pulse' : ''}`}
          style={{ '--node-color': milestone.color, color: milestone.color }}
        >
          <milestone.Icon />
        </div>
      </div>
      <div className={`timeline__card ${triggered ? 'timeline__card--in' : ''}`}>
        <div className="timeline__card-glow" style={{ '--card-glow': milestone.color }} />
        <p className="timeline__date">{milestone.year}</p>
        <h3 className="timeline__role">{milestone.role}</h3>
        <p className="timeline__company">
          <span className="timeline__company-icon" style={{ color: milestone.color }}>
            <milestone.Icon />
          </span>
          {milestone.company}
        </p>
        <p className="timeline__desc">{milestone.desc}</p>
        <div className="timeline__card-sparkles" aria-hidden="true">
          {[0.4, 0.8, 1.2].map((delay, i) => (
            <span key={i} className="timeline__spark" style={{ '--spark-delay': `${delay}s` }}>
              <SparkSVG size={i === 1 ? 10 : 7} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function MilestoneObserver({ index, onTrigger, children }) {
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          onTrigger(index)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index, onTrigger])

  return <div ref={ref}>{children(triggered)}</div>
}

export default function Timeline() {
  const { ref, isVisible } = useScrollReveal(0.1)
  const sectionRef = useRef(null)
  const [lineHeight, setLineHeight] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top + window.scrollY
      const sectionHeight = section.offsetHeight
      const viewportMid = window.scrollY + window.innerHeight * 0.5
      const progress = Math.max(0, Math.min(1, (viewportMid - sectionTop) / sectionHeight))
      setLineHeight(progress * 100)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const setRefs = (node) => {
    sectionRef.current = node
    ref.current = node
  }

  return (
    <section id="experience" className="section timeline" ref={setRefs} aria-labelledby="timeline-heading">
      {/* Floating SVG petals background */}
      {[...Array(6)].map((_, i) => (
        <span
          key={i}
          className="timeline__bg-petal"
          style={{
            left: `${10 + i * 15}%`,
            animationDelay: `${i * 1.3}s`,
            animationDuration: `${7 + i * 1.2}s`,
            color: i % 2 === 0 ? '#d4719f' : '#ce93d8',
          }}
          aria-hidden="true"
        >
          <PetalSVG />
        </span>
      ))}

      <div className={`section__inner reveal ${isVisible ? 'reveal--visible' : ''}`}>
        <p className="section-label" style={{ textAlign: 'center' }}>
          Chapter IV — The Royal Journey
        </p>
        <h2 id="timeline-heading" className="section-heading" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          My Journey
          <span style={{ display: 'inline-flex', color: 'var(--gold)', filter: 'drop-shadow(0 0 6px rgba(245,200,66,0.5))' }}>
            <CrownIcon />
          </span>
        </h2>

        <p className="timeline__subtitle">
          From the hallowed halls of Holy Cross to the enchanted courts of ITM — every chapter a new spell, every year a new chapter of the story.
        </p>

        <div className="timeline__line-wrap" aria-hidden="true">
          <div className="timeline__line" style={{ height: `${lineHeight}%` }} />
        </div>

        <div className="timeline__items">
          {MILESTONES.map((m, i) => (
            <MilestoneObserver key={m.year + m.company} index={i} onTrigger={() => {}}>
              {(triggered) => (
                <TimelineCard milestone={m} side={i % 2 === 0 ? 'left' : 'right'} triggered={triggered} />
              )}
            </MilestoneObserver>
          ))}
        </div>
      </div>
    </section>
  )
}
