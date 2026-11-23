import { useEffect, useRef } from 'react'
import target from '../assets/landing/feature-target.png'
import shield from '../assets/landing/feature-shield.png'
import habits from '../assets/landing/feature-habits.png'
import hearts from '../assets/landing/feature-hearts.png'
import clock from '../assets/landing/feature-clock.png'
import './Features.css'

const features = [
  { title: 'More Ways to Motivate', icon: target, text: 'Make everyday efforts more rewarding with ratings, coins, rewards, achievements, and optional bonuses. Give your child new reasons to stay engaged and keep trying.' },
  { title: 'Child-Friendly by Design', icon: shield, text: 'Give your child a colorful, easy-to-use space with playful avatars. Keep their experience within your Family, where only invited members can join.', tone: 'mint' },
  { title: 'Habits & Life Skills', icon: habits, text: 'Help your child practice responsibility, consistency, and independence through everyday activities, from tidying up to reading regularly.' },
  { title: 'Better Together', icon: hearts, text: 'Stay involved in your child\'s journey, recognize their efforts, and celebrate every achievement together. Build a stronger connection through encouragement and shared progress.', tone: 'light-mint' },
  { title: 'Flexible for Your Family', icon: clock, text: "Adjust task schedules, deadlines, and priorities to fit your family's changing needs. Set the coin cost for each reward based on what motivates your child." },
]

export default function Features() {
  const grid = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const element = grid.current
    if (!element) return

    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)')
    let frame = 0

    const schedule = () => {
      if (!motion.matches || frame) return

      frame = window.requestAnimationFrame(() => {
        frame = 0
        const { top, height } = element.getBoundingClientRect()
        const viewport = window.innerHeight
        const distance = Math.max(viewport * 0.75, height * 0.65)
        const spread = Math.max(0, Math.min(1, 1 - (viewport - top) / distance))
        element.style.setProperty('--features-spread', spread.toFixed(3))
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
    <section id="features" className="features" data-header-surface="colored" aria-labelledby="features-title">
      <div className="container">
        <div className="features__heading section-heading" data-reveal>
          <span className="section-badge">Features</span>
          <h2 id="features-title">Built for Real Family&nbsp;Life</h2>
          <p>More ways to encourage your child, stay involved, and create routines that work for your family.</p>
        </div>
        <ul ref={grid} className="features__cards">
          {features.map(({ title, icon, text, tone }) => (
            <li className="features__card" data-tone={tone} data-reveal key={title}>
              <h3><img src={icon} alt="" width="40" height="40" loading="lazy" />{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
