import { useEffect, useState, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import snehaPhoto from '../assets/sneha_photo.jpg'
import princessBorder from '../assets/princess_border.png'
import crownImg from '../assets/crown.png'

const BIO_PARAS = [
  'Sneha Patil is an engineering student at ITM Skills University, Kharghar — a dreamer who believes every line of code can sparkle like stardust on a ballroom floor.',
  'Passionate about frontend development and creative design, she crafts digital experiences that feel as magical as a fairy godmother\'s touch — elegant, intentional, and unforgettable.',
  'When not studying React or solving DSA puzzles, you\'ll find her sketching UI ideas and turning midnight inspiration into golden morning projects.',
]


function useTypewriter(text, active, speed = 28) {
  const [display, setDisplay] = useState('')
  useEffect(() => {
    if (!active) {
      setDisplay('')
      return
    }
    let i = 0
    setDisplay('')
    const interval = setInterval(() => {
      i += 1
      setDisplay(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [text, active, speed])
  return display
}


export default function About() {
  const { ref, isVisible } = useScrollReveal(0.15)
  const [paraIndex, setParaIndex] = useState(0)
  const typed0 = useTypewriter(BIO_PARAS[0], isVisible && paraIndex >= 0)
  const typed1 = useTypewriter(BIO_PARAS[1], isVisible && paraIndex >= 1)
  const typed2 = useTypewriter(BIO_PARAS[2], isVisible && paraIndex >= 2)

  useEffect(() => {
    if (!isVisible) return
    const t1 = setTimeout(() => setParaIndex(1), BIO_PARAS[0].length * 28 + 400)
    const t2 = setTimeout(() => setParaIndex(2), (BIO_PARAS[0].length + BIO_PARAS[1].length) * 28 + 800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [isVisible])

  const petals = useRef(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${10 + i * 11}%`,
      delay: i * 1.2,
      duration: 6 + (i % 4) * 1.5,
    }))
  ).current

  return (
    <section id="about" className="section about" ref={ref} aria-labelledby="about-heading">
      {petals.map((p) => (
        <div
          key={p.id}
          className="about__petal"
          style={{
            left: p.left,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
          aria-hidden="true"
        />
      ))}

      <div className={`section__inner reveal ${isVisible ? 'reveal--visible' : ''}`}>
        <div className="about__grid">
          {/* Princess Photo with Floral Border */}
          <div className={`about__photo-wrap ${isVisible ? 'about__photo-wrap--in' : ''}`}>
            <div className="about__photo-frame">
              {/* Glowing ring behind */}
              <div className="about__photo-glow-ring" aria-hidden="true" />
              {/* Stars orbiting */}
              {['✦', '✧', '★', '✦', '✧'].map((star, i) => (
                <span
                  key={i}
                  className="about__orbit-star"
                  style={{ '--orbit-angle': `${i * 72}deg` }}
                  aria-hidden="true"
                >
                  {star}
                </span>
              ))}
              {/* Actual photo clipped to circle */}
              <div className="about__photo-circle">
                <img
                  src={snehaPhoto}
                  alt="Sneha Patil"
                  className="about__photo-img"
                />
              </div>
              {/* Princess border overlay */}
              <img
                src={princessBorder}
                alt=""
                className="about__photo-border"
                aria-hidden="true"
              />
            </div>
            {/* Crown image below photo */}
            <img
              src={crownImg}
              alt="Crown"
              className="about__crown-img"
              aria-hidden="true"
            />
          </div>

          <div className="about__content">
            <p className="section-label">Chapter I — My Story</p>
            <h2 id="about-heading" className="section-heading">
              About Me
            </h2>

            <div className="about__bio">
              <p>{typed0}</p>
              <p>{typed1}</p>
              <p>{typed2}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
