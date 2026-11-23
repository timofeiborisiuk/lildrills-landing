import handshake from '../assets/collaborations/handshake.png'
import handshakeGlow from '../assets/collaborations/handshake-glow.svg'
import hearts from '../assets/collaborations/hearts.png'
import heartsGlow from '../assets/collaborations/hearts-glow.svg'
import './CollaborationPage.css'

const collaborationPages = {
  partners: {
    title: 'Partners & Investors',
    intro: 'Explore opportunities to collaborate with LilDrills and help bring our vision to more families.',
    heading: 'Join the LilDrills journey!',
    copy: "Interested in partnering, investing, or becoming a LilDrills ambassador? We'd love to hear from you!",
    note: <>Please include your name, organization (if applicable), and a brief description<br />of your interest in LilDrills.</>,
    button: 'Email us',
    email: 'partnerships@lildrills.com',
    image: handshake,
    glow: handshakeGlow,
  },
  support: {
    title: 'Support LilDrills',
    intro: "We're just getting started, and every bit of support helps.",
    heading: 'Be Part of Our Growth!',
    copy: 'Your contribution helps us improve LilDrills, develop new features, and create inspiring content for families.',
    note: 'Thank you for believing in us!',
    button: 'Support us',
    email: 'support@lildrills.com',
    image: hearts,
    glow: heartsGlow,
  },
}

export type CollaborationPageKind = keyof typeof collaborationPages

export default function CollaborationPage({ kind }: { kind: CollaborationPageKind }) {
  const page = collaborationPages[kind]
  const email = `mailto:${page.email}?subject=${encodeURIComponent(page.title)}`

  return (
    <div className="collaboration-page" data-kind={kind}>
      <div className="collaboration-page__intro" data-header-surface="colored">
        <div className="container">
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
        </div>
      </div>
      <section className="collaboration-page__content container" aria-labelledby="collaboration-title">
        <div className="collaboration-page__illustration" aria-hidden="true">
          <img className="collaboration-page__glow" src={page.glow} alt="" />
          <div className="collaboration-page__art">
            <img src={page.image} alt="" />
          </div>
        </div>
        <div className="collaboration-page__copy">
          <h2 id="collaboration-title">{page.heading}</h2>
          <p className="collaboration-page__description">{page.copy}</p>
          <a className="collaboration-page__email" href={email}>{page.button}</a>
          <p>{page.note}</p>
        </div>
      </section>
    </div>
  )
}
