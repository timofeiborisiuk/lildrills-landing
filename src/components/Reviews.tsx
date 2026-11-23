import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import avatar from '../assets/landing/review-avatar.png'
import previous from '../assets/landing/review-prev.svg'
import next from '../assets/landing/review-next.svg'
import './Reviews.css'

const emily = { name: 'Emily R.', detail: 'mom of two, Boston', avatar }

const reviews: { quote: string; author: { name: string; detail: string; avatar?: string } }[] = [
  { author: emily, quote: "LilDrills made chores more fun for my 10-year-old. Now she reminds me about her tasks because she loves earning coins! It's helping her become more responsible, and I love seeing her progress." },
  {
    quote: 'Mornings used to be a list of reminders from me. Now my son checks what he needs to do and gets himself ready for school. Seeing him take ownership of his routine has been the best part.',
    author: { name: 'Jordan M.', detail: 'Placeholder review' },
  },
  {
    quote: 'My daughter made a wishlist and picked a reward to save for. She checks her progress after feeding the dog, and we get to talk about what it takes to reach a goal.',
    author: { name: 'Priya K.', detail: 'Placeholder review' },
  },
  {
    quote: 'We set up a short after-school routine together. My kids know what comes next, and I can see what they’ve finished when I get home. It helps us start the evening on a calmer note.',
    author: { name: 'Alex T.', detail: 'Placeholder review' },
  },
]

function dragTilt(offset: number) {
  return Math.max(-7, Math.min(7, offset * 0.035))
}

export default function Reviews() {
  const gesture = useRef<{ pointerId: number; startX: number } | null>(null)
  const [active, setActive] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [cardMotion, setCardMotion] = useState<{ index: number; direction: number; start: number } | null>(null)

  useEffect(() => {
    if (!cardMotion) return
    const timeout = window.setTimeout(() => setCardMotion(null), 720)
    return () => window.clearTimeout(timeout)
  }, [cardMotion])

  function step(direction: number, start = 0) {
    if (cardMotion || gesture.current) return
    const nextIndex = (active + direction + reviews.length) % reviews.length

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCardMotion({ index: direction < 0 ? nextIndex : active, direction, start })
    }
    setActive(nextIndex)
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (cardMotion || event.button !== 0 || !event.isPrimary) return
    gesture.current = { pointerId: event.pointerId, startX: event.clientX }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (gesture.current?.pointerId !== event.pointerId) return
    setDragX(event.clientX - gesture.current.startX)
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    if (gesture.current?.pointerId !== event.pointerId) return
    const offset = event.clientX - gesture.current.startX
    gesture.current = null
    setDragX(0)
    if (event.type === 'pointerup' && Math.abs(offset) >= 56) {
      step(1, offset)
    }
  }

  return (
    <section id="reviews" className="reviews" aria-labelledby="reviews-title">
      <div className="reviews__layout container" style={{ '--review-count': reviews.length } as CSSProperties}>
        <div className="reviews__heading section-heading" data-reveal>
          <span className="section-badge">Reviews</span>
          <h2 id="reviews-title">What our<br className="reviews__break" /> users say</h2>
          <p>Sharing little moments and experiences with LilDrills.</p>
        </div>
        <div className="reviews__controls">
          <button type="button" aria-label="Previous review" aria-controls="review-track" onClick={() => step(-1)}>
            <img src={previous} alt="" width="11" height="19" />
          </button>
          <button type="button" aria-label="Next review" aria-controls="review-track" onClick={() => step(1)}>
            <img src={next} alt="" width="11" height="19" />
          </button>
        </div>
        <div
          id="review-track"
          className="reviews__track"
          role="region"
          aria-label="Testimonials"
          aria-live="polite"
          tabIndex={0}
          style={{
            '--review-drag': `${dragX}px`,
            '--review-tilt': `${dragTilt(dragX)}deg`,
          } as CSSProperties}
          data-dragging={dragX !== 0}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onLostPointerCapture={finishDrag}
          onKeyDown={(event) => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
            event.preventDefault()
            step(event.key === 'ArrowRight' ? 1 : -1)
          }}
        >
          {reviews.map(({ quote, author }, index) => {
            const motion = index === cardMotion?.index ? cardMotion : null
            const throwDirection = motion && (Math.sign(motion.start) || motion.direction)
            return (
              <figure
                className="reviews__card"
                key={quote}
                data-front={index === active}
                data-motion={motion ? (motion.direction < 0 ? 'untuck' : 'tuck') : undefined}
                onAnimationEnd={(event) => {
                  if (event.animationName === 'review-tuck' || event.animationName === 'review-untuck') {
                    setCardMotion(null)
                  }
                }}
                aria-hidden={index !== active}
                style={{
                  '--review-depth': (index - active + reviews.length) % reviews.length,
                  ...(motion && throwDirection !== null && {
                    '--review-throw-start': `${motion.start}px`,
                    '--review-throw-tilt': `${dragTilt(motion.start)}deg`,
                    '--review-throw-arc': `${throwDirection * 7}deg`,
                    '--review-throw-end': `${throwDirection * 34}%`,
                  }),
                } as CSSProperties}
              >
                <blockquote><p>{quote}</p></blockquote>
                <figcaption>
                  {author.avatar && <img src={author.avatar} width="60" height="60" alt="" loading="lazy" draggable={false} />}
                  <div><strong>{author.name}</strong><p>{author.detail}</p></div>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
