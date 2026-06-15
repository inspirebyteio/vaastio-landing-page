import type { Metadata } from 'next'
import { FileSpreadsheet, NotebookPen, MessagesSquare, Building2 } from 'lucide-react'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import './builders.css'

export const metadata: Metadata = {
  title: 'For Builders — Vaastio',
  description:
    'Set up a project, onboard buyers as you sell, and hand a fully-running society to the RWA — with nothing lost in the transition. Vaastio for builders and developers.',
  alternates: { canonical: '/builders' },
  openGraph: {
    type: 'website',
    siteName: 'Vaastio',
    title: 'For Builders — Vaastio',
    description:
      'Set up a project, onboard buyers as you sell, and hand a fully-running society to the RWA — with nothing lost in the transition.',
    url: 'https://vaastio.com/builders',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Builders — Vaastio',
    description:
      'Set up a project, onboard buyers as you sell, and hand a fully-running society to the RWA — with nothing lost in the transition.',
  },
}

// ── Dashboard window mockup (hero art) ─────────────────────────────────────────
function DashboardMock() {
  const projects = [
    { name: 'Greenwood Heights', meta: '320 units · 84% onboarded', pct: 84, tag: 'Active', tagBg: 'var(--b-green-bg)', tagTx: 'var(--b-green-tx)' },
    { name: 'Riverside Towers', meta: '180 units · 61% onboarded', pct: 61, tag: 'Onboarding', tagBg: 'var(--b-blue-bg)', tagTx: 'var(--b-blue-tx)' },
    { name: 'Palm Greens', meta: '112 units · fully onboarded', pct: 100, tag: 'Handover ready', tagBg: 'var(--b-amber-bg)', tagTx: 'var(--b-amber-tx)' },
  ]
  return (
    <div className="bld-window" aria-hidden="true">
      <div className="bld-window-bar">
        <span className="bld-dot" style={{ background: '#ff5f57' }} />
        <span className="bld-dot" style={{ background: '#febc2e' }} />
        <span className="bld-dot" style={{ background: '#28c840' }} />
        <span className="bld-window-title">Vaastio · Builder Dashboard</span>
      </div>
      <div className="bld-window-body">
        <div className="bld-window-h">All projects</div>
        <div className="bld-stats">
          {[
            { n: '4', l: 'Projects' },
            { n: '612', l: 'Units' },
            { n: '78%', l: 'Onboarded' },
            { n: '23', l: 'Open issues' },
          ].map(s => (
            <div key={s.l} className="bld-stat">
              <div className="bld-stat-n">{s.n}</div>
              <div className="bld-stat-l">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="bld-projects">
          {projects.map(p => (
            <div key={p.name} className="bld-proj">
              <div>
                <div className="bld-proj-name">{p.name}</div>
                <div className="bld-proj-meta">{p.meta}</div>
              </div>
              <div className="bld-bar"><span style={{ width: `${p.pct}%` }} /></div>
              <span className="bld-tag" style={{ background: p.tagBg, color: p.tagTx }}>{p.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Structure tree mockup (lifecycle art) ──────────────────────────────────────
function StructureTree() {
  const units = [
    { n: '201', cls: 'bld-unit--owner' },
    { n: '202', cls: 'bld-unit--tenant' },
    { n: '203', cls: 'bld-unit--owner' },
    { n: '204', cls: '' },
  ]
  return (
    <div className="bld-tree" aria-hidden="true">
      <div className="bld-tree-row">
        <span className="bld-tree-node bld-tree-node--root"><Building2 size={14} /> Skyline Estate</span>
        <span className="bld-tree-tier">Project</span>
      </div>
      <div className="bld-tree-indent">
        <div className="bld-tree-row">
          <span className="bld-tree-node">Tower A</span>
          <span className="bld-tree-tier">Tower</span>
        </div>
        <div className="bld-tree-indent">
          <div className="bld-tree-row">
            <span className="bld-tree-node">Floor 2</span>
            <span className="bld-tree-tier">Floor</span>
          </div>
          <div className="bld-units">
            {units.map(u => (
              <div key={u.n} className={`bld-unit ${u.cls}`}>{u.n}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Handover transfer diagram ──────────────────────────────────────────────────
function HandoverDiagram() {
  const items = ['Units & residents', 'Complaint history', 'Visitor logs', 'Announcements', 'Admin roles & permissions']
  return (
    <div className="bld-transfer" aria-hidden="true">
      <div className="bld-transfer-top">
        <div className="bld-party">
          <div className="bld-party-role">From</div>
          <div className="bld-party-name">Builder</div>
        </div>
        <div className="bld-arrow">→</div>
        <div className="bld-party bld-party--to">
          <div className="bld-party-role">To</div>
          <div className="bld-party-name">RWA</div>
        </div>
      </div>
      <div className="bld-transfer-list">
        {items.map(it => (
          <div key={it} className="bld-transfer-item">
            <span className="bld-check">✓</span>{it}
          </div>
        ))}
      </div>
      <div className="bld-transfer-foot">Zero data loss · Instant transfer of control</div>
    </div>
  )
}

const STEPS = [
  { t: 'Create the project', b: 'Map towers, wings, floors and units — before possession. Your building, exactly as it is.' },
  { t: 'Assign units as you sell', b: 'Attach a buyer to a unit with just a phone number. Pre-fill their details if you already have them.' },
  { t: 'Onboard at possession', b: 'Residents get an invite, confirm on login, and they’re in. No manual data entry on your side.' },
  { t: 'Appoint admins & committee', b: 'Hand daily operations to society admins — complaints, visitors and announcements.' },
  { t: 'Hand over to the RWA', b: 'When the society is formed, transfer control in one step. Everything you set up goes with it.' },
]

const PROBLEMS = [
  { Icon: FileSpreadsheet, h: 'Excel buyer lists', p: 'Hundreds of units tracked in spreadsheets that go stale the moment a unit changes hands.' },
  { Icon: NotebookPen, h: 'Paper gate registers', p: 'Visitor records in a notebook at the gate — impossible to search, easy to lose.' },
  { Icon: MessagesSquare, h: 'Scattered WhatsApp groups', p: 'Announcements and complaints buried in chats nobody can keep up with.' },
]

const VALUES = [
  { h: 'Faster possession', p: 'Onboard an entire tower in a day, not weeks of paperwork.' },
  { h: 'Fewer support calls', p: 'Residents self-serve from day one. Your sales office stops being a help desk.' },
  { h: 'A selling point for buyers', p: 'A move-in-ready digital society is something buyers remember.' },
  { h: 'A professional image', p: 'Branded, organised onboarding that reflects the quality you built.' },
  { h: 'One view, every project', p: 'Track occupancy, onboarding and open issues across all your societies.' },
  { h: 'Free for 30 days', p: 'Set up your first project at no cost. No setup fee, no commitment.' },
]

export default function BuildersPage() {
  return (
    <>
      <Navbar />
      <main className="bld-main">

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="bld-hero">
          <div className="container">
            <div className="bld-hero-grid">
              <div>
                <div className="bld-eyebrow">For Builders</div>
                <h1>Hand over a society.<em>Not a spreadsheet.</em></h1>
                <p className="bld-hero-sub">
                  Vaastio gives builders one place to set up a project, onboard buyers as you sell,
                  and hand a fully-running society to the RWA — with nothing lost in the transition.
                </p>
                <div className="bld-hero-actions">
                  <button data-tally-open="vGxeJQ" className="bld-cta">
                    Get Early Access
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button data-tally-open="vGxeJQ" className="bld-cta-ghost">Book a demo →</button>
                </div>
                <p className="bld-hero-note">Free for 30 days · No setup fee.</p>
              </div>
              <div className="bld-hero-art">
                <DashboardMock />
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem strip ──────────────────────────────────────────────── */}
        <section className="bld-section bld-section--alt">
          <div className="container">
            <div className="bld-eyebrow">The old way</div>
            <h2 className="bld-h2">Setup today is held together<br /><em>by spreadsheets and goodwill.</em></h2>
            <div className="bld-problem-grid">
              {PROBLEMS.map(({ Icon, h, p }) => (
                <div key={h} className="bld-problem-card">
                  <Icon size={22} color="#d9e0e8" strokeWidth={1.6} style={{ marginBottom: 16, opacity: 0.7 }} />
                  <h4>{h}</h4>
                  <p>{p}</p>
                </div>
              ))}
            </div>
            <p className="bld-problem-foot">
              And the day the RWA takes over? <em>None of it transfers. They start from zero.</em>
            </p>
          </div>
        </section>

        {/* ── Lifecycle ──────────────────────────────────────────────────── */}
        <section className="bld-section">
          <div className="container">
            <div className="bld-eyebrow">How it works for builders</div>
            <h2 className="bld-h2" style={{ marginBottom: 56 }}>From foundation to handover,<br /><em>one continuous workflow.</em></h2>
            <div className="bld-life-grid">
              <div className="bld-steps">
                {STEPS.map((s, i) => (
                  <div key={s.t} className="bld-step">
                    <div className="bld-step-n">{String(i + 1).padStart(2, '0')}</div>
                    <div>
                      <div className="bld-step-t">{s.t}</div>
                      <div className="bld-step-b">{s.b}</div>
                    </div>
                  </div>
                ))}
              </div>
              <StructureTree />
            </div>
          </div>
        </section>

        {/* ── Handover spotlight ─────────────────────────────────────────── */}
        <section className="bld-section bld-section--alt">
          <div className="container">
            <div className="bld-handover">
              <HandoverDiagram />
              <div>
                <div className="bld-eyebrow">The handover</div>
                <h2 className="bld-h2">When the RWA takes over,<br /><em>everything goes with it.</em></h2>
                <p className="bld-lead">
                  No data dump, no re-entry, no starting over. Units, residents, complaint history,
                  visitor logs and announcements transfer to the new committee in a single step —
                  so the society keeps running without missing a day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Value grid ─────────────────────────────────────────────────── */}
        <section className="bld-section">
          <div className="container">
            <div className="bld-eyebrow bld-eyebrow--center" style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 20px' }}>Why builders choose Vaastio</div>
            <h2 className="bld-h2" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 8px' }}>Less paperwork. A better handover.<br /><em>A society that runs itself.</em></h2>
            <div className="bld-value-grid">
              {VALUES.map((v, i) => (
                <div key={v.h} className={`bld-value ${i % 2 ? 'bld-value--alt' : ''}`}>
                  <h4>{v.h}</h4>
                  <p>{v.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <section className="bld-cta-section">
          <div className="container">
            <div className="bld-eyebrow bld-eyebrow--center" style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 20px' }}>Early Access</div>
            <h2>Get your project handover-ready.</h2>
            <p>Be among the first builders to set up their society on Vaastio. Up and running in 30 minutes.</p>
            <button data-tally-open="vGxeJQ" className="bld-cta">Get Early Access</button>
            <p className="bld-hero-note">Free for 30 days · No setup fee.</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
