import { useEffect, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const PROJECTS = [
  {
    title: 'Whack A Mole',
    desc: 'A magical forecast experience with animated skies, glass panels, and live OpenWeather API integration.',
    tags: ['Html', 'CSS', 'JavaScript'],
    live: 'https://rainbow-gecko-cd9cf4.netlify.app/',
    github: 'https://github.com/snehapats4566-stack/Whack-A-Mole.git',
  },
  {
    title: 'Regex Validator',
    desc: 'Organize your kingdom\'s to-dos with drag-and-drop cards, midnight themes, and a Node.js backend.',
    tags: ['Html', 'CSS', 'JavaScript'],
    live: 'https://aesthetic-sfogliatella-a1e65b.netlify.app/',
    github: 'https://github.com/snehapats4566-stack/RegexProject.git',
  },
  {
    title: 'Tic Tac Toe',
    desc: 'A responsive image gallery with CSS Grid masonry, lightbox modals, and buttery smooth transitions.',
    tags: ['Html', 'CSS', 'JavaScript'],
    live: 'https://dainty-conkies-3dbf8c.netlify.app/',
    github: 'https://github.com/snehapats4566-stack/Tic-Tac-Toe.git',
  }
]

function BallroomScene() {
  return (
    <svg className="projects__ballroom" viewBox="0 0 1200 100" aria-hidden="true">
      <path fill="#0a0a22" d="M0 100 L0 60 Q200 20 400 50 Q600 80 800 40 Q1000 10 1200 50 L1200 100 Z" />
      <path fill="none" stroke="#1a1a44" strokeWidth="1" d="M150 55 Q150 25 180 25 Q210 25 210 55" />
      <path fill="none" stroke="#1a1a44" strokeWidth="1" d="M350 50 Q350 20 380 20 Q410 20 410 50" />
      <path fill="none" stroke="#1a1a44" strokeWidth="1" d="M550 45 Q550 15 580 15 Q610 15 610 45" />
      <path fill="none" stroke="#1a1a44" strokeWidth="1" d="M750 48 Q750 18 780 18 Q810 18 810 48" />
      <path fill="none" stroke="#1a1a44" strokeWidth="1" d="M950 52 Q950 22 980 22 Q1010 22 1010 52" />
      <g className="projects__chandelier">
        <line x1="600" y1="0" x2="600" y2="25" stroke="#c9a227" strokeWidth="1" opacity="0.4" />
        <ellipse cx="600" cy="35" rx="40" ry="12" fill="none" stroke="#c9a227" strokeWidth="1" opacity="0.35" />
        <path d="M560 35 L580 55 L600 40 L620 55 L640 35" fill="none" stroke="#c9a227" strokeWidth="0.8" opacity="0.3" />
        {[570, 590, 610, 630].map((x) => (
          <circle key={x} cx={x} cy="58" r="2" fill="#f5c842" opacity="0.3" />
        ))}
      </g>
    </svg>
  )
}

function ProjectCard({ project, index, visible }) {
  const [inView, setInView] = useState(false)
  const [shimmer, setShimmer] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => {
      setInView(true)
      setShimmer(true)
      setTimeout(() => setShimmer(false), 600)
    }, index * 200)
    return () => clearTimeout(t)
  }, [visible, index])

  const fromLeft = index % 2 === 0

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className={`project-card-wrapper ${inView ? 'project-card-wrapper--visible' : ''}`}>
      <article
        className={`project-card ${fromLeft ? 'project-card--from-left' : 'project-card--from-right'} ${isFlipped ? 'project-card--flipped' : ''}`}
        onClick={handleFlip}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleFlip()
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View ${project.title} project details`}
      >
        {/* Front of card */}
        <div className="project-card__front">
          {shimmer && <div className="project-card__shimmer project-card__shimmer--play" aria-hidden="true" />}
          <div className="project-card__image" aria-hidden="true" />
          <div className="project-card__overlay" aria-hidden="true">
            <p className="project-card__flip-hint">Click to flip</p>
          </div>
        </div>

        {/* Back of card */}
        <div className="project-card__back">
          <div className="project-card__body">
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__desc">{project.desc}</p>
            <div className="project-card__tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-card__tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-card__actions">
              <a 
                href={project.live} 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-outline btn-small"
                onClick={(e) => e.stopPropagation()}
              >
                View Live
              </a>
              <a 
                href={project.github} 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-outline btn-small"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default function Projects() {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <section id="projects" className="section projects" ref={ref} aria-labelledby="projects-heading">
      <BallroomScene />
      <div className={`section__inner reveal ${isVisible ? 'reveal--visible' : ''}`}>
        <p className="section-label" style={{ textAlign: 'center' }}>
          Chapter III — The Royal Ball
        </p>
        <h2 id="projects-heading" className="section-heading" style={{ textAlign: 'center' }}>
          My Projects
        </h2>
        <div className="projects__grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} visible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
