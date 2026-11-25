import { useLayoutEffect, useRef } from 'react'
import avatar from '../assets/landing/review-avatar.png'
import previous from '../assets/landing/review-prev.svg'
import next from '../assets/landing/review-next.svg'
import './Reviews.css'

const emily = { name: 'Emily R.', detail: 'mom of two, Boston', avatar }

const reviews: { quote: string; author: { name: string; detail: string; avatar?: string } }[] = [
  { author: emily, quote: "LilDrills made chores more fun for my 10-year-old. Now she reminds me about her tasks because she loves earning coins! It's helping her become more responsible, and I love seeing her progress." },
  { author: emily, quote: 'LilDrills made chores fun and motivating for my 10-year-old. Now she reminds me about tasks to earn coins! It teaches responsibility like a game — I recommend it to every parent.' },
  {
    author: { name: 'Jordan M.', detail: 'Placeholder review' },
    quote: 'Our mornings feel calmer now. My son checks his own list before school, and I can spend breakfast talking with him instead of reminding him what to pack.',
  },
  {
    author: { name: 'Priya K.', detail: 'Placeholder review' },
    quote: 'My daughter picked a reward and decided to save up for it. She likes seeing her progress, and we get to celebrate the little things she does along the way.',
  },
]

const reviewCycles = [0, 1, 2]

function getSlideOffset(track: HTMLUListElement, index: number) {
  const slide = track.children[index] as HTMLElement | undefined
  const firstSlide = track.firstElementChild as HTMLElement | null
  return slide && firstSlide ? slide.offsetLeft - firstSlide.offsetLeft : 0
}

export default function Reviews() {
  const track = useRef<HTMLUListElement>(null)

  useLayoutEffect(() => {
    const element = track.current
    if (!element) return

    const slides = Array.from(element.querySelectorAll<HTMLElement>('.reviews__slide'))
    const hasScrollEnd = Reflect.has(element, 'onscrollend')
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)')
    let frame = 0
    let timeout = 0

    const updateCardDepth = () => {
      frame = 0
      if (!motion.matches) return

      const stepWidth = getSlideOffset(element, 1)
      if (!stepWidth) return

      const position = element.scrollLeft / stepWidth
      slides.forEach((slide, index) => {
        const distance = Math.abs(index - position)
        slide.style.setProperty('--review-depth', Math.min(distance, 2.5).toFixed(3))
        slide.style.setProperty('--review-layer', String(Math.round(1000 / (1 + distance))))
      })
    }

    const scheduleCardDepth = () => {
      if (!frame && motion.matches) frame = window.requestAnimationFrame(updateCardDepth)
    }

    const normalizePosition = () => {
      const cycleWidth = getSlideOffset(element, reviews.length)
      if (!cycleWidth) return

      const position = element.scrollLeft
      if (position >= cycleWidth - 1 && position < cycleWidth * 2 - 1) return

      const offset = ((position % cycleWidth) + cycleWidth) % cycleWidth
      const destination = Math.min(offset, cycleWidth - offset) < 1 ? cycleWidth : cycleWidth + offset
      element.scrollTo({ left: destination, behavior: 'instant' })
    }

    element.scrollTo({ left: getSlideOffset(element, reviews.length), behavior: 'instant' })
    updateCardDepth()

    const handleScroll = () => {
      scheduleCardDepth()
      if (!hasScrollEnd) {
        window.clearTimeout(timeout)
        timeout = window.setTimeout(normalizePosition, 160)
      }
    }
    const observer = new ResizeObserver(scheduleCardDepth)
    observer.observe(element)
    element.addEventListener('scroll', handleScroll, { passive: true })
    if (hasScrollEnd) element.addEventListener('scrollend', normalizePosition)
    motion.addEventListener('change', scheduleCardDepth)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
      element.removeEventListener('scroll', handleScroll)
      element.removeEventListener('scrollend', normalizePosition)
      motion.removeEventListener('change', scheduleCardDepth)
    }
  }, [])

  function step(direction: number) {
    const element = track.current
    if (!element) return

    const firstStep = getSlideOffset(element, 1)
    if (!firstStep) return

    const current = Math.round(element.scrollLeft / firstStep)
    const destination = Math.max(0, Math.min(element.children.length - 1, current + direction))
    element.scrollTo({ left: getSlideOffset(element, destination) })
  }

  return (
    <section id="reviews" className="reviews" aria-labelledby="reviews-title">
      <div className="reviews__layout container">
        <div className="reviews__heading section-heading" data-reveal>
          <span className="section-badge">Reviews</span>
          <h2 id="reviews-title">What our<br className="reviews__break" /> users say</h2>
          <p>Sharing little moments and experiences with&nbsp;LilDrills.</p>
        </div>
        <div className="reviews__controls">
          <button type="button" aria-label="Previous review" aria-controls="review-track" onClick={() => step(-1)}>
            <img src={previous} alt="" width="9" height="16" />
          </button>
          <button type="button" aria-label="Next review" aria-controls="review-track" onClick={() => step(1)}>
            <img src={next} alt="" width="9" height="16" />
          </button>
        </div>
        <div className="reviews__viewport">
          <ul
            ref={track}
            id="review-track"
            className="reviews__track"
            aria-label="Testimonials"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
              event.preventDefault()
              step(event.key === 'ArrowRight' ? 1 : -1)
            }}
          >
            {reviewCycles.flatMap((cycle) => reviews.map(({ quote, author }) => (
              <li key={`${cycle}-${quote}`} className="reviews__slide" aria-hidden={cycle !== 1}>
                <figure className="reviews__card">
                  <blockquote><p>{quote}</p></blockquote>
                  <figcaption>
                    {author.avatar && <img src={author.avatar} width="60" height="60" alt="" loading="lazy" draggable={false} />}
                    <div><strong>{author.name}</strong><p>{author.detail}</p></div>
                  </figcaption>
                </figure>
              </li>
            )))}
          </ul>
        </div>
      </div>
    </section>
  )
}
