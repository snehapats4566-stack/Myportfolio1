import { useEffect, useState, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  HTMLCSSLogo,
  JavaScriptLogo,
  ReactLogo,
  UIUXLogo,
  FigmaLogo,
  GitLogo,
} from './SkillLogos'

const SKILLS = [
  { name: 'HTML & CSS', icon: HTMLCSSLogo, level: 95 },
  { name: 'JavaScript', icon: JavaScriptLogo, level: 90 },
  { name: 'React JS', icon: ReactLogo, level: 88 },
  { name: 'UI/UX Design', icon: UIUXLogo, level: 85 },
  { name: 'Figma', icon: FigmaLogo, level: 82 },
  { name: 'Git & GitHub', icon: GitLogo, level: 88 },
]

function MagicWand({ drawn }) {
  return (
    <svg className="skills__wand" viewBox="0 0 80 120" aria-hidden="true">
      <path
        className={`skills__wand-path ${drawn ? 'skills__wand-path--drawn' : ''}`}
        d="M40 110 L40 30 M40 30 L28 18 M40 30 L52 18 M40 30 L40 8 M35 12 L40 4 L45 12 M32 20 L28 14 M48 20 L52 14"
      />
    </svg>
  )
}

function PoofDots({ show }) {
  if (!show) return null
  const angles = [0, 60, 120, 180, 240, 300]
  return angles.map((deg) => (
    <span
      key={deg}
      className="skill-card__poof-dot"
      style={{
        transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-24px)`,
        animation: 'sparkle-out 400ms ease forwards',
        '--sx': '0px',
        '--sy': '-24px',
      }}
      aria-hidden="true"
    />
  ))
}

function SkillCard({ skill, index, show }) {
  const [poof, setPoof] = useState(false)
  const [fillWidth, setFillWidth] = useState(false)
  const [hoverBurst, setHoverBurst] = useState(false)

  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => setPoof(true), index * 120)
    const t2 = setTimeout(() => setFillWidth(true), index * 120 + 200)
    return () => {
      clearTimeout(t)
      clearTimeout(t2)
    }
  }, [show, index])

  return (
    <article
      className={`skill-card ${poof ? 'skill-card--poof' : ''}`}
      onMouseEnter={() => setHoverBurst(true)}
      onMouseLeave={() => setHoverBurst(false)}
    >
      <PoofDots show={poof} />
      {hoverBurst &&
        [0, 90, 180, 270].map((deg) => (
          <span
            key={deg}
            className="skill-card__poof-dot"
            style={{
              transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-16px)`,
              animation: 'sparkle-out 400ms ease forwards',
            }}
            aria-hidden="true"
          />
        ))}
      <div className="skill-card__icon" aria-hidden="true">
        <skill.icon />
      </div>
      <h3 className="skill-card__name">{skill.name}</h3>
    </article>
  )
}

export default function Skills() {
  const { ref, isVisible } = useScrollReveal(0.15)
  const [wandDrawn, setWandDrawn] = useState(false)
  const [cardsShow, setCardsShow] = useState(false)

  useEffect(() => {
    if (!isVisible) return
    const t = setTimeout(() => setWandDrawn(true), 100)
    const t2 = setTimeout(() => setCardsShow(true), 900)
    return () => {
      clearTimeout(t)
      clearTimeout(t2)
    }
  }, [isVisible])

  return (
    <section id="skills" className="section skills" ref={ref} aria-labelledby="skills-heading">
      <div className={`section__inner reveal ${isVisible ? 'reveal--visible' : ''}`}>
        <p className="section-label" style={{ textAlign: 'center' }}>
          Chapter II — Fairy Godmother&apos;s Gifts
        </p>
        <h2 id="skills-heading" className="section-heading" style={{ textAlign: 'center' }}>
          My Skills
        </h2>

        <MagicWand drawn={wandDrawn} />

        <div className="skills__grid">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} show={cardsShow} />
          ))}
        </div>
      </div>
    </section>
  )
}
