import { useEffect, useRef } from 'react'
import './CookieBanner.css'

type CookieBannerProps = {
  open: boolean
  focusOnOpen: boolean
  onChoose: (preference: 'accepted' | 'rejected') => void
}

export default function CookieBanner({ open, focusOnOpen, onChoose }: CookieBannerProps) {
  const banner = useRef<HTMLElement>(null)

  useEffect(() => {
    if (open && focusOnOpen) banner.current?.focus({ preventScroll: true })
  }, [open, focusOnOpen])

  return (
    <aside ref={banner} id="cookie-banner" className="cookie-banner" aria-label="Cookie choices" tabIndex={-1} hidden={!open} inert={!open}>
      <p>
        We use cookies to give you the best possible online experience. You can accept or reject
        optional cookies using the buttons below. Learn more in our{' '}
        <a href="/cookie-policy/">Cookie Policy</a>.
      </p>
      <div className="cookie-banner__actions">
        <button type="button" onClick={() => onChoose('rejected')}>Reject</button>
        <button type="button" onClick={() => onChoose('accepted')}>Accept</button>
      </div>
    </aside>
  )
}
