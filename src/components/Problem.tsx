import tick from '../assets/landing/step-tick.png'
import coin from '../assets/landing/step-coin.png'
import cup from '../assets/landing/step-cup.png'
import bulb from '../assets/landing/step-bulb.png'
import arrow from '../assets/landing/step-arrow.svg'
import flippedArrow from '../assets/landing/step-arrow-flipped.svg'
import './Problem.css'

const steps = [
  { label: 'Tasks', image: tick, arrow },
  { label: 'Coins', image: coin, arrow: flippedArrow },
  { label: 'Rewards', image: cup, arrow },
  { label: 'Skills', image: bulb },
]

export default function Problem() {
  return (
    <section className="problem" aria-labelledby="problem-title">
      <div className="container" data-reveal>
        <h2 id="problem-title">Less reminding.<br /><strong>More independence.</strong></h2>
        <p className="problem__description">
          Give your child more ownership of daily responsibilities.<br className="problem__break" />{' '}
          Create tasks, review their work, and let them earn coins toward rewards they love while building life skills.
        </p>
      </div>
      <div className="problem__track" role="region" aria-label="Tasks, coins, rewards, and skills" tabIndex={0}>
        <ol className="problem__steps">
          {steps.map(({ label, image, arrow: connector }) => (
            <li key={label}>
              <div className="problem__step">
                <img src={image} width="70" height="70" alt="" loading="lazy" />
                <span>{label}</span>
              </div>
              {connector && <img className="problem__arrow" src={connector} alt="" loading="lazy" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
