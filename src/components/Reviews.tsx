import { useLayoutEffect, useRef } from 'react'
import previous from '../assets/landing/review-prev.svg'
import next from '../assets/landing/review-next.svg'
import './Reviews.css'

const emily = { name: 'Emily R.', detail: 'mom of two, Boston' }

const reviews = [
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
  if (!slide) return 0

  const isCentered = getComputedStyle(slide).scrollSnapAlign === 'center'
  if (isCentered) return slide.offsetLeft + (slide.offsetWidth - track.clientWidth) / 2

  const startPadding = Number.parseFloat(getComputedStyle(track).scrollPaddingInlineStart) || 0
  return slide.offsetLeft - startPadding
}

export default function Reviews() {
  const track = useRef<HTMLUListElement>(null)

  useLayoutEffect(() => {
    const element = track.current
    if (!element) return

    const hasScrollEnd = Reflect.has(element, 'onscrollend')
    let timeout = 0

    const normalizePosition = () => {
      const start = getSlideOffset(element, reviews.length)
      const cycleWidth = start - getSlideOffset(element, 0)
      if (!cycleWidth) return

      const position = element.scrollLeft - start
      if (position >= -1 && position < cycleWidth - 1) return

      const offset = ((position % cycleWidth) + cycleWidth) % cycleWidth
      const destination = Math.min(offset, cycleWidth - offset) < 1 ? start : start + offset
      element.scrollTo({ left: destination, behavior: 'instant' })
    }

    element.scrollTo({ left: getSlideOffset(element, reviews.length), behavior: 'instant' })

    const handleScroll = () => {
      if (!hasScrollEnd) {
        window.clearTimeout(timeout)
        timeout = window.setTimeout(normalizePosition, 160)
      }
    }
    element.addEventListener('scroll', handleScroll, { passive: true })
    if (hasScrollEnd) element.addEventListener('scrollend', normalizePosition)

    return () => {
      window.clearTimeout(timeout)
      element.removeEventListener('scroll', handleScroll)
      element.removeEventListener('scrollend', normalizePosition)
    }
  }, [])

  function step(direction: number) {
    const element = track.current
    if (!element) return

    const firstOffset = getSlideOffset(element, 0)
    const firstStep = getSlideOffset(element, 1) - firstOffset
    if (!firstStep) return

    const current = Math.round((element.scrollLeft - firstOffset) / firstStep)
    const destination = Math.max(0, Math.min(element.children.length - 1, current + direction))
    element.scrollTo({ left: getSlideOffset(element, destination) })
  }

  return (
    <section id="reviews" className="reviews" aria-labelledby="reviews-title">
      <div className="reviews__layout container">
        <div className="reviews__heading section-heading" data-reveal>
          <span className="section-badge">Reviews</span>
          <h2 id="reviews-title">What our<br className="reviews__break" /> users say</h2>
          <p>Sharing little moments and <br className="reviews__description-break" />experiences with&nbsp;LilDrills.</p>
        </div>
        <div className="reviews__controls">
          <button type="button" aria-label="Previous review" aria-controls="review-track" onClick={() => step(-1)}>
            <img src={previous} alt="" width="8" height="14" />
          </button>
          <button type="button" aria-label="Next review" aria-controls="review-track" onClick={() => step(1)}>
            <img src={next} alt="" width="8" height="14" />
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
