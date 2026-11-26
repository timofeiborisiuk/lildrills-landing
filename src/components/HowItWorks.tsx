import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'
import family from '../assets/landing/family.webp'
import routines from '../assets/landing/routines.webp'
import rate from '../assets/landing/rate.webp'
import rewards from '../assets/landing/rewards.webp'
import progress from '../assets/landing/progress.webp'
import mobileFamily from '../assets/landing/how-mobile/family.webp'
import mobileRoutines from '../assets/landing/how-mobile/routines.webp'
import mobileRate from '../assets/landing/how-mobile/rate.webp'
import mobileRewards from '../assets/landing/how-mobile/rewards.webp'
import mobileProgress from '../assets/landing/how-mobile/progress.webp'
import './HowItWorks.css'

const cards = [
  { title: 'Set Up Your Family', lead: 'Create your Family and make it yours.', description: 'Add your child, choose their favorite avatar, and invite other adults to join.', tone: 'lime', art: family, bounds: [182, -103, 726] },
  { title: 'Set Tasks & Build Routines', lead: 'Make everyday routines easier to follow.', description: 'Create one-time, daily, or weekly tasks for chores, learning, and more.', tone: 'purple', art: routines, bounds: [121, 42, 715] },
  { title: 'Review & Rate Tasks', description: 'Make every task count. Review completed tasks, choose a rating, and let your child earn coins for a job well done.', tone: 'mint', art: rate, bounds: [232, -16, 588] },
  { title: 'Real Rewards', description: 'Create rewards your child can claim with coins, explore their wishlist for new ideas, and send bonus coins for an extra boost when a reward is within reach.', tone: 'lime', art: rewards, bounds: [153, -44, 697] },
  { title: 'Follow Their Progress', description: 'Watch small steps add up to real progress as your child unlocks achievements and reaches new levels.', tone: 'purple', art: progress, bounds: [211, 35, 633] },
]

const mobileArtwork = [
  { src: mobileFamily, height: 294, left: 49, top: 1, width: 423 },
  { src: mobileRoutines, height: 276, left: 26, top: 0.5, width: 337 },
  { src: mobileRate, height: 294, left: 23, top: 0.5, width: 348 },
  { src: mobileRewards, height: 274, left: 27.5, top: 0.5, width: 334 },
  { src: mobileProgress, height: 255, left: 76.5, top: 0.5, width: 311 },
]

function artworkStyle([x, y, width]: number[]): CSSProperties {
  return { left: `${x / 8.48}%`, top: `${y / 4.2}%`, width: `${width / 8.48}%` }
}

function keepEndingTogether(text: string) {
  const lastSpace = text.lastIndexOf(' ')
  const split = text.lastIndexOf(' ', lastSpace - 1)
  if (lastSpace < 0 || split < 0) return text

  return <>{text.slice(0, split + 1)}<span className="how-it-works__text-ending">{text.slice(split + 1)}</span></>
}

export default function HowItWorks() {
  const stack = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const stackElement = stack.current
    if (!stackElement) return

    const cardElements = Array.from(stackElement.querySelectorAll<HTMLElement>('.how-it-works__card'))

    const motion = window.matchMedia('(min-height: 620px) and (prefers-reduced-motion: no-preference)')
    let frame = 0

    const schedule = () => {
      if (!motion.matches || frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const tops = cardElements.map(card => card.getBoundingClientRect().top)
        cardElements.slice(0, -1).forEach((card, index) => {
          const gap = tops[index + 1] - tops[index]
          const progress = Math.min(1, Math.max(0, (194 - gap) / 180))
          card.style.setProperty('--card-scale', String(1 - progress * 0.05))
        })
      })
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    motion.addEventListener('change', schedule)
    schedule()
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      motion.removeEventListener('change', schedule)
    }
  }, [])

  return (
    <section id="how-it-works" className="how-it-works container" aria-labelledby="how-title">
      <div className="how-it-works__heading section-heading" data-reveal>
        <span className="section-badge">Simple steps</span>
        <h2 id="how-title">How It Works</h2>
        <p>See how LilDrills makes everyday routines easier, keeps your child motivated, and brings your family closer to every little achievement.</p>
      </div>
      <ol className="how-it-works__cards" ref={stack}>
        {cards.map(({ title, lead, description, tone, art, bounds }, index) => (
          <li
            className={`how-it-works__card how-it-works__card--${tone}`}
            key={title}
            style={{ '--card-index': index } as CSSProperties}
          >
            <div className="how-it-works__copy">
              <h3>{keepEndingTogether(title)}</h3>
              <p>{lead && <>{lead}<br className="how-it-works__copy-break" />{' '}</>}{description}</p>
            </div>
            <span className="how-it-works__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div className="how-it-works__artwork" aria-hidden="true">
              <img src={art} style={artworkStyle(bounds)} alt="" loading="lazy" />
            </div>
            <div className="how-it-works__mobile-visual" aria-hidden="true">
              <div className="how-it-works__mobile-artwork" style={{ aspectRatio: `335 / ${mobileArtwork[index].height}` }}>
                <img
                  src={mobileArtwork[index].src}
                  alt=""
                  loading="lazy"
                  style={{
                    left: `${mobileArtwork[index].left / 3.35}%`,
                    top: `${mobileArtwork[index].top / mobileArtwork[index].height * 100}%`,
                    width: `${mobileArtwork[index].width / 3.35}%`,
                  }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
