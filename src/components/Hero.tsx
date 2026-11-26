import { useEffect, useRef, useState } from 'react'
import appStore from '../assets/hero/app-store.svg'
import googlePlay from '../assets/hero/google-play.svg'
import rewardsScreen from '../assets/hero/rewards-screen.webp'
import tasksScreen from '../assets/hero/tasks-screen.webp'
import rewardOne from '../assets/hero/reward-one.webp'
import rewardTwo from '../assets/hero/reward-two.webp'
import taskCardOne from '../assets/hero/task-card-one.webp'
import taskCardTwo from '../assets/hero/task-card-two.webp'
import taskCardThree from '../assets/hero/task-card-three.webp'
import './Hero.css'

const artwork = [
  { name: 'rewards-screen', src: rewardsScreen, width: 360, height: 552 },
  { name: 'tasks-screen', src: tasksScreen, width: 370, height: 569 },
  { name: 'reward-two', src: rewardTwo, width: 304, height: 140 },
  { name: 'reward-one', src: rewardOne, width: 304, height: 121 },
  { name: 'task-one', src: taskCardOne, width: 288, height: 124 },
  { name: 'task-two', src: taskCardTwo, width: 288, height: 124 },
  { name: 'task-three', src: taskCardThree, width: 316, height: 121 },
]

export default function Hero() {
  const hero = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!hero.current || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting))
    observer.observe(hero.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={hero} className="hero" data-ambient={isVisible} aria-labelledby="hero-title">
      <div className="hero__artwork" aria-hidden="true">
        {artwork.map(({ name, src, width, height }) => (
          <img
            key={name}
            className={`hero__image hero__image--${name}`}
            src={src}
            width={width}
            height={height}
            alt=""
          />
        ))}
        <svg className="hero__filters" width="0" height="0">
          <filter id="hero-card-shadow" x="-20%" y="-40%" width="140%" height="180%" colorInterpolationFilters="sRGB">
            {/* Remove the clipped shadow baked into the asset before adding a new one. */}
            <feComponentTransfer>
              <feFuncA type="linear" slope="1.25" intercept="-0.25" />
            </feComponentTransfer>
            <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="#303241" floodOpacity="0.09" />
          </filter>
        </svg>
      </div>
      <div className="hero__content container">
        <h1 id="hero-title">Their future starts today</h1>
        <p>
          Help your child turn everyday tasks<br className="hero__desktop-break" />{' '}
          into lasting habits.
        </p>
        <div className="hero__badges">
          <img src={appStore} width="150" height="50" alt="Download on the App Store" />
          <a href="https://play.google.com/store/apps/details?id=com.lildrillsapp.app">
            <img src={googlePlay} width="169" height="50" alt="Get it on Google Play" />
          </a>
        </div>
      </div>
    </section>
  )
}
