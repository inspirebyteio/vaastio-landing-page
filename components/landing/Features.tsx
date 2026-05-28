export default function Features() {
  return (
    <section className="features" id="features">
      <div className="feat-label">Built different</div>
      <h2 className="feat-title">Built around how societies actually work.</h2>
      <div className="feat-grid">
        <div className="feat-card reveal">
          <svg className="feat-icon" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="4" y="4" width="11" height="28" rx="1" />
            <rect x="20" y="12" width="12" height="20" rx="1" />
            <path d="M7 10h5M7 16h5M7 22h5M23 18h6M23 24h6" />
          </svg>
          <div className="feat-name">Any layout, any size</div>
          <p className="feat-body">
            Towers, wings, villas, independent floors, plotted developments. Vaastio maps your
            reality — not the other way around.
          </p>
        </div>
        <div className="feat-card reveal">
          <svg className="feat-icon" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="18" cy="12" r="5.5" />
            <path d="M6 32c0-6.627 5.373-12 12-12s12 5.373 12 12" />
            <circle cx="29" cy="10" r="3.5" />
            <path d="M32.5 25c0-3.038-1.567-5.5-3.5-5.5" />
          </svg>
          <div className="feat-name">Members that reflect real life</div>
          <p className="feat-body">
            Owners, tenants, co-residents, staff. People move in. People move out. Your records stay
            accurate automatically.
          </p>
        </div>
        <div className="feat-card reveal">
          <svg className="feat-icon" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M18 4l2.8 8.6L30 13.6l-7 6.3 2.2 8.9L18 24.6l-7.2 4.2 2.2-8.9-7-6.3 9.2-1z" />
          </svg>
          <div className="feat-name">Roles that make sense</div>
          <p className="feat-body">
            Builder, RWA, Admin, Resident, Gatekeeper — or create your own. Everyone sees exactly
            what they should. Nothing more.
          </p>
        </div>
      </div>
    </section>
  )
}
