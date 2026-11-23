import illustration from '../assets/not-found/404.svg'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="not-found__stage">
        <img className="not-found__illustration" src={illustration} width="742" height="316" alt="" />
        <div className="not-found__copy">
          <h1 id="not-found-title">Oooooops!</h1>
          <p>Page not found...</p>
        </div>
        <a className="not-found__home" href="/">Back to Home</a>
      </div>
    </section>
  )
}
