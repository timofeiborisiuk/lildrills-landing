import { useEffect, useRef, useState } from 'react'
import wordmark from '../assets/landing/footer-wordmark.svg'
import heart from '../assets/landing/footer-heart.svg'
import './Footer.css'

const socialLinks = [
  { name: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/lildrillsapp' },
  { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/lildrills_app?igshid=650qawrz03bh' },
  { name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/kidberryinc' },
]

type FooterProps = {
  reveal: boolean
  onCookiePreferences: (trigger: HTMLButtonElement) => void
}

export default function Footer({ reveal, onCookiePreferences }: FooterProps) {
  const footer = useRef<HTMLElement>(null)
  const [canReveal, setCanReveal] = useState(false)
  const [heartPlaying, setHeartPlaying] = useState(false)

  useEffect(() => {
    const element = footer.current
    if (!reveal || !element) return

    const updateReveal = () => {
      setCanReveal(element.offsetHeight <= window.innerHeight)
    }

    const observer = new ResizeObserver(updateReveal)
    observer.observe(element)
    window.addEventListener('resize', updateReveal)
    updateReveal()
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateReveal)
    }
  }, [reveal])

  return (
    <>
      <div id="contact" className="footer-anchor" aria-hidden="true" />
      <footer ref={footer} className="footer" data-header-surface="colored" data-reveal={canReveal}>
        <div className="footer__inner container">
          <div className="footer__details">
            <div className="footer__about">
              <h2>About us</h2>
              <p>LilDrills helps families build healthy habits and life skills through everyday tasks, positive motivation, and shared progress.</p>
            </div>
            <div className="footer__collaborations">
              <h2>Collaborations</h2>
              <ul>
                <li><a href="/partners-investors/">Partners &amp; Investors</a></li>
                <li><a href="/support/">Support LilDrills</a></li>
              </ul>
            </div>
            <div className="footer__social">
              <h2>Follow us</h2>
              <ul>
                {socialLinks.map(({ name, icon, href }) => (
                  <li key={name}>
                    <a className="footer__social-link" href={href} aria-label={name}>
                      <span className={`footer__social-icon footer__social-icon--${icon}`} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="footer__copyright">© 2026 Kidberry, Inc. All rights reserved.</p>
            <ul className="footer__policies">
              <li><a href="/terms/">Terms of Use</a></li>
              <li><a href="/privacy-policy/">Privacy Policy</a></li>
              <li><a href="/cookie-policy/">Cookie Policy</a></li>
              <li>
                <button type="button" onClick={(event) => onCookiePreferences(event.currentTarget)}>
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>
          <p className="footer__signature">
            Made with <span
              className="footer__heart"
              data-playing={heartPlaying}
              onMouseEnter={() => setHeartPlaying(window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches)}
              onAnimationEnd={(event) => {
                if (event.animationName === 'footer-heart-wave' && event.nativeEvent.pseudoElement === '::after') {
                  setHeartPlaying(false)
                }
              }}
            >
              <img src={heart} alt="love" width="24" height="24" loading="lazy" />
            </span> on planet Earth
          </p>
          <img className="footer__wordmark" src={wordmark} alt="LilDrills" width="1280" height="276" loading="lazy" />
        </div>
      </footer>
    </>
  )
}
