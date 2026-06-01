import HeroAnimation from '@/components/HeroAnimation'

function AppStoreBadge() {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      border: '1px solid rgba(217,224,232,0.45)', borderRadius: 8,
      padding: '7px 13px',
    }}>
      <svg viewBox="0 0 24 24" width={16} height={16} fill="rgba(217,224,232,0.9)">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
      <div>
        <div style={{ fontSize: 8, color: 'rgba(217,224,232,0.6)', letterSpacing: '.06em', textTransform: 'uppercase', lineHeight: 1 }}>Download on the</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(217,224,232,0.9)', letterSpacing: '.01em', lineHeight: 1.4 }}>App Store</div>
      </div>
    </div>
  )
}

function PlayStoreBadge() {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      border: '1px solid rgba(217,224,232,0.45)', borderRadius: 8,
      padding: '7px 13px',
    }}>
      <svg viewBox="0 0 24 24" width={16} height={16} fill="none">
        <path d="M4 2.5L20 12 4 21.5V2.5Z" fill="rgba(217,224,232,0.9)"/>
      </svg>
      <div>
        <div style={{ fontSize: 8, color: 'rgba(217,224,232,0.6)', letterSpacing: '.06em', textTransform: 'uppercase', lineHeight: 1 }}>Get it on</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(217,224,232,0.9)', letterSpacing: '.01em', lineHeight: 1.4 }}>Google Play</div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-inner">
          <h1 className="hero-h1">
            Your society.<br />
            Managed the<br />
            right way.
          </h1>
          <p className="hero-desc">
            Vaastio gives builders and RWAs a platform to set up, manage, and run
            their society — <br />structure to residents, complaints to visitors.
          </p>
          <div className="hero-actions">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'hsla(220,18%,97%,.28)' }}>
                Coming soon
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                <div style={{ display: 'flex', gap: 10, opacity: 0.45 }}>
                  <AppStoreBadge />
                  <PlayStoreBadge />
                </div>
                <button data-tally-open="vGxeJQ" className="btn-gold" style={{ background: '#ffffff', color: '#2F3E4E', fontSize: 10, padding: '8px 18px', letterSpacing: '.12em', gap: 6 }}>
                  Get Early Access
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
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
