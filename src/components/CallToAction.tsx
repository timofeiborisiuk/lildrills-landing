import { useEffect, useRef, useState } from 'react'
import illustration from '../assets/landing/cta.png'
import appStore from '../assets/hero/app-store.svg'
import googlePlay from '../assets/hero/google-play.svg'
import './CallToAction.css'

export default function CallToAction() {
  const section = useRef<HTMLElement>(null)
  const [isHighlighted, setIsHighlighted] = useState(false)

  useEffect(() => {
    const target = section.current
    if (!target) return

    let highlightTimeout: number | undefined
    const observer = new IntersectionObserver(([entry]) => {
      window.clearTimeout(highlightTimeout)

      if (entry.intersectionRatio === 1) {
        highlightTimeout = window.setTimeout(() => setIsHighlighted(true), 180)
      } else {
        setIsHighlighted(false)
      }
    }, { threshold: 1 })

    observer.observe(target)
    return () => {
      observer.disconnect()
      window.clearTimeout(highlightTimeout)
    }
  }, [])

  return (
    <section ref={section} id="download" className="call-to-action container" data-header-surface="colored" data-highlighted={isHighlighted} aria-labelledby="download-title">
      <div className="call-to-action__copy">
        <h2 id="download-title">Let the Little Wins Begin!</h2>
        <p>Big changes start with small steps. <br className="call-to-action__break" />Take the first one with LilDrills.</p>
        <div className="hero__badges">
          <img src={appStore} width="150" height="50" alt="Download on the App Store" loading="lazy" />
          <img src={googlePlay} width="169" height="50" alt="Get it on Google Play" loading="lazy" />
        </div>
      </div>
      <img className="call-to-action__art" src={illustration} alt="" width="472" height="289" loading="lazy" />
    </section>
  )
}
