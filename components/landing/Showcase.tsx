export default function Showcase() {
  return (
    <section className="showcase" id="preview">
      <div className="showcase-header">
        <div className="sh-label">In the Wild</div>
        <h2 className="sh-title">Every screen.<br />Crafted with intent.</h2>
        <p className="sh-sub">Mobile for residents and builders. Web for admins. One ecosystem. Arriving soon.</p>
      </div>
      <div className="showcase-triple reveal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/showcase-screens.jpg" alt="Vaastio app screens" />
        <div className="triple-overlay"></div>
        <div className="triple-side"></div>
      </div>
      <div className="cs-center">
        <div className="cs-pill"><div className="cs-dot"></div>Mobile &amp; Web — Coming Soon</div>
      </div>
      <div className="showcase-hand">
        <div className="hand-img-wrap reveal-l">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/showcase-hand.jpg" alt="Vaastio mobile app in hand" />
        </div>
        <div className="hand-text reveal-r">
          <div className="hand-eyebrow">Resident Experience</div>
          <h3 className="hand-title">Raise a complaint.<br />Know it&apos;s heard.</h3>
          <p className="hand-desc">
            Residents raise complaints in seconds — with photos, category, and visibility control.
            Admins are notified instantly. Nothing gets lost. Nothing gets forgotten.
          </p>
          <div className="hand-pills">
            <div className="hand-pill">Instant notifications</div>
            <div className="hand-pill">Photo evidence</div>
            <div className="hand-pill">Public or private</div>
            <div className="hand-pill">Real-time status</div>
          </div>
        </div>
      </div>
      <div className="showcase-dashboard">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/showcase-dashboard.jpg" alt="Vaastio web dashboard" />
        <div className="dashboard-overlay">
          <div className="dashboard-text reveal-l">
            <div className="db-eyebrow">Web Dashboard</div>
            <h3 className="db-title">Every society.<br />One view.</h3>
            <p className="db-desc">
              Builders and admins get a full web dashboard — complaints, members, structure,
              invitations. Everything visible at once. Full control, anywhere.
            </p>
            <div className="db-cs"><div className="cs-dot"></div>Coming Soon</div>
          </div>
        </div>
      </div>
    </section>
  )
}
