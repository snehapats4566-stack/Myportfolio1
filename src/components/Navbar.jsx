import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

function CrownIcon() {
  return (
    <svg width="28" height="22" viewBox="0 0 28 22" aria-hidden="true">
      <path
        fill="#f5c842"
        d="M2 18h24l-2-14-6 8-4-10-4 10-6-8L2 18zm0 2v2h24v-2H2z"
      />
      <circle cx="5" cy="6" r="1.5" fill="#f5c842" />
      <circle cx="14" cy="3" r="1.5" fill="#f5c842" />
      <circle cx="23" cy="6" r="1.5" fill="#f5c842" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      aria-label="Main navigation"
    >
      <a href="#home" className="navbar__brand">
        <CrownIcon />
        <span>Sneha Patil</span>
      </a>

      <ul className="navbar__links">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="navbar__link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="navbar__menu-btn"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <CrownIcon />
      </button>

      <ul
        className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}
        role="list"
      >
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="navbar__link" onClick={closeMenu}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
