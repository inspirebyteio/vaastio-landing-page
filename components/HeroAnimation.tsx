'use client'
import { useState, useEffect } from 'react'

/* ─────────────────────────────────────────────
   MOMENTS  — 5 real Vaastio features only
   1. Complaint → Resolution
   2. Announcement → Broadcasting
   3. Visitor → Allow / Deny
   4. Society Structure creation
   5. Unit Allotment → Resident onboarded
───────────────────────────────────────────── */
const MOMENTS = [
  { label: 'Issue reported.', sublabel: 'Admin resolves it.', headerLabel: 'Complaints' },
  { label: 'Admin sends.', sublabel: 'Everyone receives.', headerLabel: 'Announcements' },
  { label: 'Visitor at gate.', sublabel: 'Resident decides.', headerLabel: 'Visitors' },
  { label: 'Structure defined.', sublabel: 'Society goes live.', headerLabel: 'Society Setup' },
  { label: 'Unit assigned.', sublabel: 'Resident onboarded.', headerLabel: 'Units' },
]

const DURATION = 3400
const FLIP_AT  = 1400
const FADE_MS  = 360

interface CP { flipped: boolean }

/* ── design tokens ── */
const T = {
  white:       '#ffffff',
  surface:     '#f8fafc',
  border:      '#e8edf2',
  borderMid:   '#d1d9e0',
  text:        '#0f172a',
  textMid:     '#475569',
  textMuted:   '#94a3b8',
  indigo:      '#6366f1',
  indigoBg:    '#eef2ff',
  indigoText:  '#4338ca',
  green:       '#16a34a',
  greenBg:     '#f0fdf4',
  greenBorder: '#bbf7d0',
  greenText:   '#15803d',
  red:         '#dc2626',
  redBg:       '#fef2f2',
  redBorder:   '#fecaca',
  redText:     '#b91c1c',
  amber:       '#d97706',
  amberBg:     '#fffbeb',
  amberBorder: '#fde68a',
  amberText:   '#92400e',
  slate:       '#64748b',
  slateBg:     '#f1f5f9',
  slateBorder: '#e2e8f0',
  slateText:   '#475569',
}

/* ── Shared pill ── */
type PillVariant = 'green' | 'red' | 'amber' | 'indigo' | 'slate'
function Pill({ v, children }: { v: PillVariant, children: React.ReactNode }) {
  const map: Record<PillVariant, { bg: string; color: string; border: string }> = {
    green:  { bg: T.greenBg,  color: T.greenText,  border: T.greenBorder },
    red:    { bg: T.redBg,    color: T.redText,    border: T.redBorder   },
    amber:  { bg: T.amberBg,  color: T.amberText,  border: T.amberBorder },
    indigo: { bg: T.indigoBg, color: T.indigoText, border: '#c7d2fe'     },
    slate:  { bg: T.slateBg,  color: T.slateText,  border: T.slateBorder },
  }
  const s = map[v]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      letterSpacing: '0.02em', whiteSpace: 'nowrap',
    }}>{children}</span>
  )
}

/* ── Icon container ── */
function IconBox({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{
      width: 34, height: 34, borderRadius: 9, flexShrink: 0,
      background: T.surface, border: `1px solid ${T.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color,
    }}>{children}</div>
  )
}

/* ── Divider ── */
const Div = () => <div style={{ height: 1, background: T.border, margin: '11px 0' }} />

/* ── Card shell ── */
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: T.white, borderRadius: 16,
      padding: '14px 15px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.18)',
      border: `1px solid ${T.border}`,
      minWidth: 202, maxWidth: 224,
    }}>{children}</div>
  )
}

/* ────────────────────────────────
   CARD 1 — Complaint → Resolution
──────────────────────────────── */
function Complaint({ flipped }: CP) {
  return (
    <Shell>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <IconBox color={flipped ? T.green : T.red}>
          {flipped
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
            : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>
          }
        </IconBox>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>
              {flipped ? 'Resolved' : 'Water leakage'}
            </span>
            <Pill v={flipped ? 'green' : 'red'}>{flipped ? 'Done' : 'Open'}</Pill>
          </div>
          <div style={{ fontSize: 10.5, color: T.textMuted, marginTop: 3 }}>Block B · Flat 204</div>
        </div>
      </div>
      {flipped && (
        <>
          <Div />
          <div style={{ fontSize: 10.5, color: T.textMid, animation: 'heroFadeIn 0.4s ease' }}>
            <span style={{ color: T.green, fontWeight: 600 }}>Admin</span> marked resolved · plumber visit scheduled
          </div>
        </>
      )}
    </Shell>
  )
}

/* ────────────────────────────────────────
   CARD 2 — Announcement → Broadcasting
──────────────────────────────────────── */
function Announcement({ flipped }: CP) {
  return (
    <Shell>
      <div style={{ position: 'relative' }}>
        {flipped && (
          <>
            <span style={{ position:'absolute', inset:-16, borderRadius:18, border:`1px solid rgba(99,102,241,0.2)`, animation:'heroRipple 1s ease-out forwards', pointerEvents:'none' }} />
            <span style={{ position:'absolute', inset:-28, borderRadius:22, border:`1px solid rgba(99,102,241,0.1)`, animation:'heroRipple 1s 0.22s ease-out forwards', pointerEvents:'none' }} />
          </>
        )}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <IconBox color={T.indigo}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </IconBox>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>Water supply off</span>
              <Pill v={flipped ? 'green' : 'slate'}>{flipped ? 'Sent' : 'Draft'}</Pill>
            </div>
            <div style={{ fontSize: 10.5, color: T.textMuted, marginTop: 3 }}>10:00 am – 2:00 pm today</div>
          </div>
        </div>
      </div>
      <Div />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10.5, color: flipped ? T.green : T.textMuted, fontWeight: flipped ? 600 : 400, transition: 'color 0.4s' }}>
          {flipped ? '84 residents notified' : 'All residents · Society-wide'}
        </span>
        <div style={{ display: 'flex' }}>
          {['#c7d2fe','#a5b4fc','#818cf8'].map((c, i) => (
            <div key={i} style={{
              width: 17, height: 17, borderRadius: '50%',
              background: c, border: `2px solid ${T.white}`,
              marginLeft: i > 0 ? -6 : 0,
              opacity: flipped ? 1 : 0.45, transition: 'opacity 0.5s',
            }} />
          ))}
        </div>
      </div>
    </Shell>
  )
}

/* ────────────────────────────────
   CARD 3 — Visitor Allow / Deny
──────────────────────────────── */
function Visitor({ flipped }: CP) {
  return (
    <Shell>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: T.indigoText, letterSpacing: '0.04em',
        }}>RS</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>Rahul Sharma</span>
            {flipped && <Pill v="green">Allowed</Pill>}
          </div>
          <div style={{ fontSize: 10.5, color: T.textMuted, marginTop: 3 }}>Main Gate · just now</div>
        </div>
      </div>
      {!flipped && (
        <>
          <Div />
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              flex: 1, fontSize: 11, fontWeight: 600, padding: '7px 0', borderRadius: 8,
              background: T.greenBg, color: T.greenText,
              border: `1px solid ${T.greenBorder}`, cursor: 'default',
            }}>Allow entry</button>
            <button style={{
              flex: 1, fontSize: 11, fontWeight: 600, padding: '7px 0', borderRadius: 8,
              background: T.redBg, color: T.redText,
              border: `1px solid ${T.redBorder}`, cursor: 'default',
            }}>Deny</button>
          </div>
        </>
      )}
      {flipped && (
        <>
          <Div />
          <div style={{ fontSize: 10.5, color: T.textMid, animation: 'heroFadeIn 0.4s ease' }}>
            Entry logged · <span style={{ color: T.green, fontWeight: 600 }}>Flat 204</span> approved
          </div>
        </>
      )}
    </Shell>
  )
}

/* ────────────────────────────────────────────
   CARD 4 — Society Structure creation
──────────────────────────────────────────── */
function SocietySetup({ flipped }: CP) {
  const nodes = [
    { label: 'Society', depth: 0 },
    { label: 'Tower A', depth: 1 },
    { label: 'Tower B', depth: 1 },
    { label: 'Flat 101 – 410', depth: 2 },
  ]
  return (
    <Shell>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <IconBox color={T.indigo}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </IconBox>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>Sunrise Apts</span>
            <Pill v={flipped ? 'green' : 'indigo'}>{flipped ? 'Live' : 'Setup'}</Pill>
          </div>
          <div style={{ fontSize: 10.5, color: T.textMuted, marginTop: 3 }}>2 towers · 48 units</div>
        </div>
      </div>
      <Div />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {nodes.map((n, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            paddingLeft: n.depth * 14,
            opacity: flipped ? 1 : (i === 0 ? 1 : i < 3 ? 0.55 : 0.2),
            transition: `opacity 0.4s ${i * 0.1}s ease`,
          }}>
            {n.depth > 0 && <div style={{ width: 10, height: 1, background: T.border, flexShrink: 0 }} />}
            <div style={{
              flex: 1, fontSize: 10, fontWeight: 500,
              color: n.depth === 0 ? T.text : T.textMid,
              background: T.surface, border: `1px solid ${T.border}`,
              borderRadius: 6, padding: '3px 8px',
            }}>{n.label}</div>
          </div>
        ))}
      </div>
    </Shell>
  )
}

/* ────────────────────────────────────────
   CARD 5 — Unit Allotment → Onboarded
──────────────────────────────────────── */
function UnitAllotment({ flipped }: CP) {
  return (
    <Shell>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <IconBox color={T.slate}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </IconBox>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>Ananya Sharma</span>
            <Pill v={flipped ? 'green' : 'amber'}>{flipped ? 'Active' : 'Invited'}</Pill>
          </div>
          <div style={{ fontSize: 10.5, color: T.textMuted, marginTop: 3 }}>Owner · Tower A · Flat 204</div>
        </div>
      </div>
      <Div />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { label: 'Unit', value: 'A-204', done: true },
          { label: 'Role', value: 'Owner', done: true },
          { label: 'Access', value: flipped ? 'Granted' : 'Pending', done: flipped },
        ].map(({ label, value, done }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10.5, color: T.textMuted }}>{label}</span>
            <span style={{ fontSize: 10.5, fontWeight: 600, color: done ? T.text : T.amber, transition: 'color 0.4s' }}>{value}</span>
          </div>
        ))}
      </div>
    </Shell>
  )
}

const CARDS = [Complaint, Announcement, Visitor, SocietySetup, UnitAllotment]

/* ──────────────────────────────────────────────────
   APP CHROME — dark app background inside the phone
   List items change per slide to match the feature
────────────────────────────────────────────────── */
const CHROME_ITEMS = [
  /* 0 — Complaints */
  [
    { dot: T.red,    title: 'Water leakage',     sub: 'Flat 204 · 2m ago',   pill: 'Open',    pv: 'red'    },
    { dot: T.green,  title: 'Lift not working',  sub: 'Common · resolved',   pill: 'Done',    pv: 'green'  },
    { dot: T.amber,  title: 'Parking issue',     sub: 'B-12 · in progress',  pill: 'WIP',     pv: 'amber'  },
    { dot: T.slate,  title: 'Street light out',  sub: 'Gate 2 · pending',    pill: 'New',     pv: 'slate'  },
  ],
  /* 1 — Announcements */
  [
    { dot: T.indigo, title: 'Water supply off',  sub: 'Today 10am–2pm',      pill: 'All',     pv: 'indigo' },
    { dot: T.indigo, title: 'Maintenance work',  sub: 'Sat 9am · Lobby',     pill: 'All',     pv: 'indigo' },
    { dot: T.slate,  title: 'AGM Meeting',       sub: 'Sunday 11am',         pill: 'All',     pv: 'slate'  },
    { dot: T.slate,  title: 'New parking rules', sub: 'Effective Monday',    pill: 'Info',    pv: 'slate'  },
  ],
  /* 2 — Visitors */
  [
    { dot: T.amber,  title: 'Rahul Sharma',      sub: 'Main Gate · now',     pill: 'Waiting', pv: 'amber'  },
    { dot: T.green,  title: 'Priya Mehta',       sub: 'B Gate · 12m ago',    pill: 'In',      pv: 'green'  },
    { dot: T.green,  title: 'Swiggy Delivery',   sub: 'Main Gate · 25m',     pill: 'In',      pv: 'green'  },
    { dot: T.slate,  title: 'Arjun Kapoor',      sub: 'Main Gate · 1h ago',  pill: 'Out',     pv: 'slate'  },
  ],
  /* 3 — Society Setup */
  [
    { dot: T.green,  title: 'Sunrise Apts',      sub: '48 units · 2 towers', pill: 'Live',    pv: 'green'  },
    { dot: T.indigo, title: 'Green Valley',      sub: '60 units · setup',    pill: 'Setup',   pv: 'indigo' },
    { dot: T.slate,  title: 'Palm Heights',      sub: '32 units · draft',    pill: 'Draft',   pv: 'slate'  },
    { dot: T.amber,  title: 'Blue Ridge',        sub: '24 units · review',   pill: 'Review',  pv: 'amber'  },
  ],
  /* 4 — Unit Allotment */
  [
    { dot: T.green,  title: 'A-101 · Rohan V',   sub: 'Owner · onboarded',   pill: 'Active',  pv: 'green'  },
    { dot: T.amber,  title: 'A-204 · Ananya S',  sub: 'Owner · invite sent', pill: 'Invited', pv: 'amber'  },
    { dot: T.green,  title: 'B-302 · Meera K',   sub: 'Tenant · onboarded',  pill: 'Active',  pv: 'green'  },
    { dot: T.slate,  title: 'B-401 · vacant',    sub: 'Not allotted yet',    pill: 'Empty',   pv: 'slate'  },
  ],
] as const

type PV = 'green' | 'red' | 'amber' | 'indigo' | 'slate'

function AppChrome({ momentIdx }: { momentIdx: number }) {
  const header = MOMENTS[momentIdx].headerLabel
  const items  = CHROME_ITEMS[momentIdx]

  /* tab bar active states */
  const tabActive = [1, 1, 2, 3, 3]
  const tabs = [
    { label: 'Home',     icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
    { label: 'Issues',   icon: 'M12 8v4M12 16h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z' },
    { label: 'Visitors', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
    { label: 'More',     icon: 'M4 6h16M4 12h16M4 18h16' },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>

      {/* App header */}
      <div style={{
        position: 'absolute', top: 44, left: 0, right: 0, height: 44,
        background: 'rgba(10,14,30,0.98)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center',
        padding: '0 14px', justifyContent: 'space-between',
        zIndex: 2,
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.02em' }}>{header}</span>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          {/* search icon stub */}
          <div style={{ width: 24, height: 24, borderRadius: 7, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
          </div>
          {/* avatar */}
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#818cf8)', border: '1px solid rgba(255,255,255,0.15)' }} />
        </div>
      </div>

      {/* List rows */}
      {items.map((item, i) => (
        <div key={`${momentIdx}-${i}`} style={{
          position: 'absolute',
          top: 97 + i * 50,
          left: 9, right: 9,
          height: 43,
          borderRadius: 11,
          background: i === 0 ? 'rgba(255,255,255,0.065)' : 'rgba(255,255,255,0.028)',
          border: `1px solid ${i === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
          display: 'flex', alignItems: 'center', padding: '0 10px', gap: 9,
          zIndex: 1,
        }}>
          {/* colored dot */}
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: item.dot, flexShrink: 0, opacity: 0.85 }} />
          {/* text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.82)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.32)', marginTop: 2 }}>{item.sub}</div>
          </div>
          {/* pill */}
          {(() => {
            const pv = item.pv as PV
            const pmap: Record<PV,{bg:string;color:string}> = {
              green:  { bg:'rgba(22,163,74,0.18)',   color:'#4ade80' },
              red:    { bg:'rgba(220,38,38,0.18)',   color:'#f87171' },
              amber:  { bg:'rgba(217,119,6,0.18)',   color:'#fbbf24' },
              indigo: { bg:'rgba(99,102,241,0.18)',  color:'#a5b4fc' },
              slate:  { bg:'rgba(100,116,139,0.18)', color:'rgba(255,255,255,0.4)' },
            }
            const ps = pmap[pv]
            return (
              <span style={{
                fontSize: 8.5, fontWeight: 600, padding: '2px 7px', borderRadius: 20,
                background: ps.bg, color: ps.color, flexShrink: 0,
              }}>{item.pill}</span>
            )
          })()}
        </div>
      ))}

      {/* Bottom tab bar */}
      <div style={{
        position: 'absolute', bottom: 12, left: 8, right: 8,
        height: 46, borderRadius: 15,
        background: 'rgba(12,16,32,0.98)',
        border: '1px solid rgba(255,255,255,0.09)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-around', padding: '0 4px',
        zIndex: 2,
      }}>
        {tabs.map(({ label, icon }, i) => {
          const active = tabActive[momentIdx] === i
          return (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '4px 10px' }}>
              <div style={{
                width: 26, height: 26, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: active ? 'rgba(99,102,241,0.18)' : 'transparent',
                transition: 'background 0.3s',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke={active ? '#818cf8' : 'rgba(255,255,255,0.28)'}
                  strokeWidth="2" strokeLinecap="round">
                  <path d={icon}/>
                </svg>
              </div>
              <span style={{ fontSize: 7.5, color: active ? '#818cf8' : 'rgba(255,255,255,0.25)', fontWeight: active ? 600 : 400 }}>{label}</span>
            </div>
          )
        })}
      </div>

    </div>
  )
}

/* ─────────────────────
   SLOT interface
───────────────────── */
interface Slot { idx: number; flipped: boolean; visible: boolean }

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function HeroAnimation() {
  const [time, setTime] = useState('9:41')
  const [slotA, setSlotA] = useState<Slot>({ idx: 0, flipped: false, visible: false })
  const [slotB, setSlotB] = useState<Slot>({ idx: 0, flipped: false, visible: false })
  const [activeSlot, setActiveSlot] = useState<'a' | 'b'>('a')
  const [momentIdx, setMomentIdx] = useState(0)
  const [labelVisible, setLabelVisible] = useState(true)

  /* real clock */
  useEffect(() => {
    const tick = () => {
      const n = new Date()
      setTime(`${n.getHours().toString().padStart(2,'0')}:${n.getMinutes().toString().padStart(2,'0')}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  /* card cycling */
  useEffect(() => {
    let alive = true
    const timers: ReturnType<typeof setTimeout>[] = []
    let current = 0
    let active: 'a' | 'b' = 'a'

    const upA = (s: Partial<Slot>) => setSlotA(p => ({ ...p, ...s }))
    const upB = (s: Partial<Slot>) => setSlotB(p => ({ ...p, ...s }))
    const up  = (slot: 'a' | 'b', s: Partial<Slot>) => slot === 'a' ? upA(s) : upB(s)

    function run() {
      if (!alive) return
      const incoming: 'a'|'b' = active === 'a' ? 'b' : 'a'
      const outgoing            = active
      setMomentIdx(current)
      setLabelVisible(false)
      up(incoming, { idx: current, flipped: false, visible: false })
      timers.push(setTimeout(() => {
        if (!alive) return
        up(outgoing, { visible: false })
        up(incoming, { visible: true })
        setActiveSlot(incoming)
        active = incoming
        setLabelVisible(true)
      }, FADE_MS))
      timers.push(setTimeout(() => { if (alive) up(incoming, { flipped: true }) }, FLIP_AT))
      timers.push(setTimeout(() => {
        if (!alive) return
        current = (current + 1) % 5
        run()
      }, DURATION))
    }

    upA({ idx: 0, flipped: false, visible: false })
    timers.push(setTimeout(() => { if (alive) { upA({ visible: true }); setLabelVisible(true) } }, 120))
    timers.push(setTimeout(() => { if (alive)  upA({ flipped: true }) }, FLIP_AT))
    timers.push(setTimeout(() => { if (alive) { current = 1; run() } }, DURATION))

    return () => { alive = false; timers.forEach(clearTimeout) }
  }, [])

  const renderSlot = (slot: Slot, id: 'a' | 'b') => {
    const CardComp = CARDS[slot.idx]
    const isActive = activeSlot === id
    return (
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: slot.visible ? 1 : 0,
        transition: `opacity ${FADE_MS}ms ease`,
        zIndex: slot.visible ? 10 : 9,
        pointerEvents: 'none',
        width: 'calc(100% - 26px)',
      }}>
        <div style={{ animation: isActive && slot.visible ? 'heroFloat 4.5s ease-in-out infinite' : 'none' }}>
          <CardComp flipped={slot.flipped} />
        </div>
      </div>
    )
  }

  const moment = MOMENTS[momentIdx]

  return (
    <>
      <style>{`
        @keyframes heroRipple    { 0%{transform:scale(0.82);opacity:1} 100%{transform:scale(1.65);opacity:0} }
        @keyframes heroShimmer   { 0%{left:-80%} 100%{left:130%} }
        @keyframes heroFadeIn    { from{opacity:0;transform:translateY(3px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroFloat     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes heroProgressFill { from{width:0%} to{width:100%} }
        @keyframes heroLabelIn   { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{
        position: 'relative', width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: 560,
      }}>

        {/* Slide label */}
        <div style={{
          marginBottom: 24, textAlign: 'center', minHeight: 50,
          opacity: labelVisible ? 1 : 0,
          animation: labelVisible ? 'heroLabelIn 0.38s ease forwards' : 'none',
          transition: 'opacity 0.28s ease',
        }}>
          <div style={{ fontSize: 15.5, fontWeight: 700, letterSpacing: '-0.015em', color: 'rgba(255,255,255,0.88)', lineHeight: 1.25 }}>
            {moment.label}
          </div>
          <div style={{ fontSize: 12, fontWeight: 400, marginTop: 5, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.01em' }}>
            {moment.sublabel}
          </div>
        </div>

        {/* Soft glow */}
        <div style={{
          position: 'absolute', width: 260, height: 360,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(18px)', pointerEvents: 'none',
          top: '50%', left: '50%', transform: 'translate(-50%,-40%)', zIndex: 0,
        }} />

        {/* Phone 3D wrapper */}
        <div style={{ perspective: '1100px', perspectiveOrigin: '48% 42%', position: 'relative', zIndex: 1 }}>
          <div style={{ transform: 'rotateY(-8deg) rotateX(5deg)', transformStyle: 'preserve-3d', position: 'relative' }}>

            {/* Volume buttons */}
            {[[22,36],[31,52]].map(([t,h],i) => (
              <div key={i} style={{ position:'absolute', left:-3, top:`${t}%`, width:3, height:h, background:'linear-gradient(to left,#1c2035,#252a42)', borderRadius:'2px 0 0 2px', boxShadow:'-2px 0 6px rgba(0,0,0,0.6)' }} />
            ))}
            {/* Power */}
            <div style={{ position:'absolute', right:-3, top:'28%', width:3, height:58, background:'linear-gradient(to right,#1c2035,#252a42)', borderRadius:'0 2px 2px 0', boxShadow:'2px 0 6px rgba(0,0,0,0.6)' }} />

            {/* Phone body */}
            <div style={{
              width:252, height:514, borderRadius:46,
              background:'linear-gradient(145deg,#252a3e 0%,#181c2c 25%,#0e1018 55%,#181c2c 80%,#252a3e 100%)',
              boxShadow:'0 0 0 1px rgba(255,255,255,0.09),0 0 0 2.5px rgba(0,0,0,0.95),-10px 24px 70px rgba(0,0,0,0.75),-4px 8px 24px rgba(0,0,0,0.55)',
              position:'relative', overflow:'hidden',
            }}>
              <div style={{ position:'absolute', top:0, left:'18%', right:'18%', height:1.5, background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.26),transparent)', zIndex:60 }} />

              {/* Screen */}
              <div style={{ position:'absolute', inset:'7px 6px', borderRadius:40, background:'#060a18', overflow:'hidden' }}>

                <AppChrome momentIdx={momentIdx} />

                {/* Scan lines */}
                <div style={{ position:'absolute', inset:0, zIndex:3, pointerEvents:'none', backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.004) 2px,rgba(255,255,255,0.004) 3px)' }} />
                {/* Glare */}
                <div style={{ position:'absolute', inset:0, zIndex:50, pointerEvents:'none', borderRadius:40, background:'linear-gradient(128deg,rgba(255,255,255,0.065) 0%,rgba(255,255,255,0.018) 22%,transparent 44%)' }} />

                {/* Dynamic island */}
                <div style={{ position:'absolute', top:10, left:'50%', transform:'translateX(-50%)', width:90, height:24, background:'#000', borderRadius:12, zIndex:40, boxShadow:'0 0 0 1px rgba(255,255,255,0.07)' }} />

                {/* Status bar */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:44, padding:'0 16px', display:'flex', alignItems:'center', justifyContent:'space-between', zIndex:45 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.88)' }}>{time}</span>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <div style={{ display:'flex', alignItems:'flex-end', gap:1.5 }}>
                      {[3,5,7,9].map((h,i)=><div key={i} style={{ width:3, height:h, borderRadius:1, background:i<3?'rgba(255,255,255,0.8)':'rgba(255,255,255,0.2)' }}/>)}
                    </div>
                    <svg width="13" height="10" viewBox="0 0 22 16" fill="none">
                      <path d="M11 12l1.4-1.4" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M7 8.5c2.2-2.2 5.8-2.2 8 0" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M3.2 4.8C6.4 1.6 14.6 1.6 17.8 4.8" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="11" cy="14" r="1.5" fill="rgba(255,255,255,0.8)"/>
                    </svg>
                    <div style={{ display:'flex', alignItems:'center', gap:1 }}>
                      <div style={{ width:22, height:12, border:'1.5px solid rgba(255,255,255,0.55)', borderRadius:3.5, padding:'2px 2px' }}>
                        <div style={{ width:'68%', height:'100%', background:'rgba(255,255,255,0.75)', borderRadius:1.5 }}/>
                      </div>
                      <div style={{ width:2, height:6, background:'rgba(255,255,255,0.4)', borderRadius:'0 1px 1px 0' }}/>
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                {renderSlot(slotA,'a')}
                {renderSlot(slotB,'b')}

                {/* Home indicator */}
                <div style={{ position:'absolute', bottom:7, left:'50%', transform:'translateX(-50%)', width:68, height:4, background:'rgba(255,255,255,0.26)', borderRadius:2, zIndex:60 }}/>
              </div>
            </div>
          </div>
        </div>

        {/* Ground shadow */}
        <div style={{ width:160, height:14, background:'radial-gradient(ellipse,rgba(0,0,0,0.48) 0%,transparent 70%)', marginTop:8, filter:'blur(4px)' }}/>

        {/* Progress bar */}
        <div style={{ display:'flex', gap:5, marginTop:14, width:200 }}>
          {[0,1,2,3,4].map(i=>(
            <div key={i} style={{ flex:1, height:2, borderRadius:2, background:'rgba(255,255,255,0.1)', overflow:'hidden' }}>
              {i < momentIdx && <div style={{ width:'100%', height:'100%', background:'rgba(255,255,255,0.4)', borderRadius:2 }}/>}
              {i === momentIdx && <div key={`p${momentIdx}`} style={{ height:'100%', background:'rgba(255,255,255,0.4)', borderRadius:2, animation:`heroProgressFill ${DURATION}ms linear forwards` }}/>}
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
