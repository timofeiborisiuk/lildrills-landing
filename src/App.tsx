import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Problem from './components/Problem'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Reviews from './components/Reviews'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import CollaborationPage, { type CollaborationPageKind } from './components/CollaborationPage'
import NotFound from './components/NotFound'
import CookieBanner from './components/CookieBanner'
import LegalPage, { type LegalPageKind } from './components/LegalPage'

export type PageKind = CollaborationPageKind | LegalPageKind | 'not-found'

const cookiePreferenceKey = 'lildrills-cookie-preference'

function shouldShowCookieBanner() {
  try {
    const preference = localStorage.getItem(cookiePreferenceKey)
    return preference !== 'accepted' && preference !== 'rejected'
  } catch {
    return true
  }
}

function App({ page }: { page?: PageKind }) {
  const [cookieBannerOpen, setCookieBannerOpen] = useState(shouldShowCookieBanner)
  const cookieTrigger = useRef<HTMLButtonElement>(null)
  const [focusCookieBanner, setFocusCookieBanner] = useState(false)

  function openCookiePreferences(trigger: HTMLButtonElement) {
    cookieTrigger.current = trigger
    setFocusCookieBanner(true)
    setCookieBannerOpen(true)
    document.getElementById('cookie-banner')?.focus()
  }

  function saveCookiePreference(preference: 'accepted' | 'rejected') {
    try {
      localStorage.setItem(cookiePreferenceKey, preference)
    } catch {
      // Dismiss the banner even when browser storage is unavailable.
    }
    setCookieBannerOpen(false)
    setFocusCookieBanner(false)
    cookieTrigger.current?.focus()
    cookieTrigger.current = null
  }

  const content = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (page || !window.location.hash) return

    // On a direct visit the browser may resolve the fragment before React mounts.
    const target = document.getElementById(window.location.hash.slice(1))
    target?.scrollIntoView({ behavior: 'instant' })
  }, [page])

  useEffect(() => {
    const elements = content.current?.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!elements?.length || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-revealed', '')
        observer.unobserve(entry.target)
      }
    }, { rootMargin: '0px 0px -24px 0px' })

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header isLanding={!page} />
      <main className="landing-content" ref={content}>
        {page === 'not-found' ? <NotFound /> : page === 'partners' || page === 'support'
          ? <CollaborationPage kind={page} /> : page ? <LegalPage kind={page} /> : (
          <>
            <div className="hero-sequence" data-header-surface="colored">
              <Hero />
              <Problem />
            </div>
            <HowItWorks />
            <Features />
            <div className="reviews-and-download">
              <Reviews />
              <CallToAction />
            </div>
          </>
        )}
      </main>
      <Footer
        reveal={!page || page === 'terms' || page === 'privacy-policy' || page === 'cookie-policy'}
        onCookiePreferences={openCookiePreferences}
      />
      <CookieBanner open={cookieBannerOpen} focusOnOpen={focusCookieBanner} onChoose={saveCookiePreference} />
    </>
  )
}

export default App
