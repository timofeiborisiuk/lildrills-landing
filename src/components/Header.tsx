import { useEffect, useRef, useState } from 'react'
import logo from '../assets/header/logo.png'
import wordmark from '../assets/header/lildrills-wordmark.svg'
import './Header.css'

const sectionLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '/support/' },
]

export default function Header({ isLanding }: { isLanding: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 0)
  const [overColor, setOverColor] = useState(isLanding)
  const header = useRef<HTMLElement>(null)
  const logoImage = useRef<HTMLImageElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let frame = 0

    function updateHeader() {
      frame = 0
      setIsScrolled(window.scrollY > 0)
      const logoBounds = logoImage.current?.getBoundingClientRect()
      if (!logoBounds) return

      const underneath = document.elementsFromPoint(
        document.documentElement.clientWidth / 2,
        logoBounds.top + logoBounds.height / 2,
      ).find((element) => !header.current?.contains(element))

      setOverColor(Boolean(underneath?.closest('[data-header-surface="colored"]')))
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateHeader)
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    updateHeader()
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [])

  function closeMenu() {
    setIsOpen(false)
    if (menuButton.current?.getClientRects().length) {
      menuButton.current.focus()
    }
  }

  const brand = (
    <span className="site-header__logo">
      <img ref={logoImage} className="site-header__logo-icon" src={logo} alt="" width="38" height="38" />
      <img src={wordmark} alt="LilDrills" />
    </span>
  )

  return (
    <header
      ref={header}
      className="site-header container"
      data-open={isOpen}
      data-scrolled={isScrolled}
      data-over-color={overColor}
      onKeyDown={(event) => {
        if (isOpen && event.key === 'Escape') {
          closeMenu()
        }
      }}
    >
      <div className="site-header__top">
        {isLanding ? brand : <a className="site-header__home-link" href="/" aria-label="LilDrills home">{brand}</a>}
        <button
          ref={menuButton}
          className="site-header__toggle"
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="site-navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="site-header__menu-icon" width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <path d="M3.5 14h21" />
            <path d="M3.5 14h21" />
            <path d="M3.5 14h21" />
          </svg>
        </button>
      </div>

      <nav id="site-navigation" className="site-header__nav" role="navigation" aria-label="Main navigation">
        <div className="site-header__nav-content">
          <ul className="site-header__links">
            {sectionLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={!isLanding && href.startsWith('#') ? `/${href}` : href} onClick={() => setIsOpen(false)}>{label}</a>
              </li>
            ))}
          </ul>
          <a className="site-header__download" href={isLanding ? '#download' : '/#download'} onClick={() => setIsOpen(false)}>
            Download the App
          </a>
        </div>
      </nav>
    </header>
  )
}
