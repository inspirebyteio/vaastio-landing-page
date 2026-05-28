import HeroAnimation from '@/components/HeroAnimation'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-inner">
          <div className="hero-tag">Built for Builders</div>
          <h1 className="hero-h1">
            Your society.<br />
            Managed the<br />
            right way.
          </h1>
          <p className="hero-desc">
            Vaastio gives builders and RWAs a single, powerful platform to set up, manage, and run
            their society — from structure to residents, complaints to visitors.
          </p>
          <div className="hero-actions">
            <a href="#waitlist" className="btn-gold">
              Request Early Access{' '}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#how" className="btn-ghost">See how it works</a>
          </div>
        </div>
        <div className="hero-roles">
          <div className="hero-role"><strong>Builder</strong>Sets it up</div>
          <div className="hero-role"><strong>Admin</strong>Runs it daily</div>
          <div className="hero-role"><strong>Resident</strong>Lives in it</div>
          <div className="hero-role"><strong>Gatekeeper</strong>Protects it</div>
        </div>
      </div>
      <div className="hero-right">
        <HeroAnimation />
      </div>
    </section>
  )
}
