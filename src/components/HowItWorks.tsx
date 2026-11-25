import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'
import family from '../assets/landing/family.png'
import routines from '../assets/landing/routines.png'
import rate from '../assets/landing/rate.png'
import rewards from '../assets/landing/rewards.png'
import progress from '../assets/landing/progress.png'
import avatarTwo from '../assets/landing/avatar2.png'
import avatarFour from '../assets/landing/avatar4.png'
import mobileFamilyAdults from '../assets/landing/how-mobile/family-adults.png'
import mobileFamilyChildren from '../assets/landing/how-mobile/family-children.png'
import mobileRoutines from '../assets/landing/how-mobile/routines.png'
import mobileRate from '../assets/landing/how-mobile/rate.png'
import mobileRewards from '../assets/landing/how-mobile/rewards.png'
import mobileProgress from '../assets/landing/how-mobile/progress.png'
import './HowItWorks.css'

const cards = [
  { title: 'Set Up Your Family', lead: 'Create your Family and make it yours.', description: 'Add your child, choose their favorite avatar, and invite other adults to join.', tone: 'lime', art: family, bounds: [179, 0, 669, 420] },
  { title: 'Set Tasks & Build Routines', lead: 'Make everyday routines easier to follow.', description: 'Create one-time, daily, or weekly tasks for chores, learning, and more.', tone: 'purple', art: routines, bounds: [119, 42, 717, 378] },
  { title: 'Review & Rate Tasks', description: 'Make every task count. Review completed tasks, choose a rating, and let your child earn coins for a job well done.', tone: 'mint', art: rate, bounds: [232, 0, 588, 420] },
  { title: 'Real Rewards', description: 'Create rewards your child can claim with coins, explore their wishlist for new ideas, and send bonus coins for an extra boost when a reward is within reach.', tone: 'lime', art: rewards, bounds: [151, 0, 697, 420] },
  { title: 'Follow Their Progress', description: 'Watch small steps add up to real progress as your child unlocks achievements and reaches new levels.', tone: 'purple', art: progress, bounds: [211, 35, 633, 385] },
]

const familyAvatars = [
  { src: avatarTwo, bounds: [349, 163, 79, 79] },
  { src: avatarFour, bounds: [580, 94, 95, 95] },
]

const mobileArtwork = [
  {
    height: 294,
    layers: [
      { src: mobileFamilyAdults, left: 49, top: 12, width: 479, height: 564 },
      { src: mobileFamilyChildren, left: 229.5, top: 0.5, width: 211, height: 587 },
    ],
  },
  { height: 276, layers: [{ src: mobileRoutines, left: 24.5, top: 0.5, width: 621, height: 551 }] },
  { height: 294, layers: [{ src: mobileRate, left: 23, top: 0.5, width: 624, height: 587 }] },
  { height: 274, layers: [{ src: mobileRewards, left: 27.5, top: 0.5, width: 615, height: 547 }] },
  { height: 255, layers: [{ src: mobileProgress, left: 76.5, top: 0.5, width: 517, height: 509 }] },
]

function artworkStyle([x, y, width, height]: number[]): CSSProperties {
  return { left: `${x / 8.48}%`, top: `${y / 4.2}%`, width: `${width / 8.48}%`, height: `${height / 4.2}%` }
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
              {index === 0 && familyAvatars.map(({ src, bounds: avatarBounds }) => (
                <img key={src} src={src} style={artworkStyle(avatarBounds)} alt="" loading="lazy" />
              ))}
            </div>
            <div className="how-it-works__mobile-visual" aria-hidden="true">
              <div className="how-it-works__mobile-artwork" style={{ aspectRatio: `335 / ${mobileArtwork[index].height}` }}>
                {mobileArtwork[index].layers.map(({ src, left, top, width, height }) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    width={width}
                    height={height}
                    loading="lazy"
                    style={{ left: `${left / 3.35}%`, top: `${top / mobileArtwork[index].height * 100}%`, width: `${width / 6.7}%` }}
                  />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
