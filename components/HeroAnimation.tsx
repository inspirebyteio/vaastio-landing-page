'use client'
import { useState, useEffect } from 'react'

const MOMENTS = [
  { label: 'Complaints raised.', sublabel: 'Resolved by admin.', accent: '#94a3b8' },
  { label: 'One tap.', sublabel: 'Everyone notified.', accent: '#818cf8' },
  { label: 'Visitor at gate.', sublabel: 'Resident decides.', accent: '#94a3b8' },
  { label: 'Dues tracked.', sublabel: 'Payments confirmed.', accent: '#94a3b8' },
  { label: 'Society set up.', sublabel: 'Handed over with confidence.', accent: '#6ee7b7' },
]

const DURATION = 3200
const FLIP_AT = 1300
const FADE_MS = 350

interface CP { flipped: boolean }

/* ── Shared card wrapper ── */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 16,
      padding: '14px 16px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.18), 0 8px 40px rgba(0,0,0,0.22)',
      border: '1px solid rgba(0,0,0,0.06)',
      minWidth: 200, maxWidth: 220,
    }}>
      {children}
    </div>
  )
}

/* ── Small status pill ── */
function Pill({ color, children }: { color: 'red' | 'green' | 'amber' | 'slate', children: React.ReactNode }) {
  const map = {
    red:   { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
    green: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
    amber: { bg: '#fffbeb', color: '#b45309', border: '#fde68a' },
    slate: { bg: '#f8fafc', color: '#475569', border: '#e2e8f0' },
  }
  const s = map[color]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      letterSpacing: '0.01em',
    }}>{children}</span>
  )
}

/* ── Row layout used in most cards ── */
function Row({ icon, title, sub, right }: { icon: React.ReactNode, title: string, sub: string, right?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
        background: '#f8fafc', border: '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0f172a', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
        <div style={{ fontSize: 10.5, color: '#94a3b8', marginTop: 2 }}>{sub}</div>
      </div>
      {right && <div style={{ flexShrink: 0 }}>{right}</div>}
    </div>
  )
}

function Complaint({ flipped }: CP) {
  return (
    <Card>
      <Row
        icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={flipped ? '#16a34a' : '#dc2626'} strokeWidth="1.8" strokeLinecap="round" style={{ transition: 'stroke 0.5s' }}>
            {flipped
              ? <><path d="M20 6L9 17l-5-5"/></>
              : <><circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/></>
            }
          </svg>
        }
        title={flipped ? 'Issue resolved' : 'Water leakage'}
        sub="Block B · Flat 204 · 2m ago"
        right={<Pill color={flipped ? 'green' : 'red'}>{flipped ? 'Resolved' : 'Open'}</Pill>}
      />
      {flipped && (
        <div style={{
          marginTop: 10, paddingTop: 10,
          borderTop: '1px solid #f1f5f9',
          fontSize: 10.5, color: '#64748b',
          animation: 'heroFadeIn 0.4s ease forwards',
        }}>
          Closed by Admin · Maintenance scheduled
        </div>
      )}
    </Card>
  )
}

function Announcement({ flipped }: CP) {
  return (
    <Card>
      {flipped && (
        <>
          <span style={{ position: 'absolute', inset: -14, borderRadius: 18, border: '1px solid rgba(99,102,241,0.25)', animation: 'heroRipple 0.95s ease-out forwards', pointerEvents: 'none' }} />
          <span style={{ position: 'absolute', inset: -26, borderRadius: 22, border: '1px solid rgba(99,102,241,0.12)', animation: 'heroRipple 0.95s 0.2s ease-out forwards', pointerEvents: 'none' }} />
        </>
      )}
      <Row
        icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        }
        title="Water supply off"
        sub="10:00 am – 2:00 pm today"
        right={<Pill color={flipped ? 'green' : 'slate'}>{flipped ? 'Sent' : 'Draft'}</Pill>}
      />
      <div style={{
        marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 10, borderTop: '1px solid #f1f5f9',
      }}>
        <span style={{ fontSize: 10.5, color: '#94a3b8' }}>
          {flipped ? 'Delivered to 84 residents' : 'All residents · Society-wide'}
        </span>
        <div style={{ display: 'flex', gap: -4 }}>
          {['#6366f1','#818cf8','#a5b4fc'].map((c, i) => (
            <div key={i} style={{
              width: 16, height: 16, borderRadius: '50%',
              background: c, border: '1.5px solid #fff',
              marginLeft: i > 0 ? -5 : 0,
              opacity: flipped ? 1 : 0.4,
              transition: 'opacity 0.5s',
            }} />
          ))}
        </div>
      </div>
    </Card>
  )
}

function Visitor({ flipped }: CP) {
  return (
    <Card>
      <Row
        icon={
          <div style={{
            width: 34, height: 34, borderRadius: 9, flexShrink: 0,
            background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: '#4338ca', letterSpacing: '0.02em',
          }}>RS</div>
        }
        title="Rahul Sharma"
        sub="Main Gate · just now"
        right={flipped ? <Pill color="green">Allowed</Pill> : undefined}
      />
      {!flipped && (
        <div style={{ display: 'flex', gap: 7, marginTop: 11 }}>
          <button style={{
            flex: 1, fontSize: 11, fontWeight: 600, padding: '7px 0', borderRadius: 8,
            background: '#f0fdf4', color: '#16a34a',
            border: '1px solid #bbf7d0', cursor: 'default',
          }}>Allow</button>
          <button style={{
            flex: 1, fontSize: 11, fontWeight: 600, padding: '7px 0', borderRadius: 8,
            background: '#fef2f2', color: '#dc2626',
            border: '1px solid #fecaca', cursor: 'default',
          }}>Deny</button>
        </div>
      )}
      {flipped && (
        <div style={{
          marginTop: 10, paddingTop: 10, borderTop: '1px solid #f1f5f9',
          fontSize: 10.5, color: '#64748b',
          animation: 'heroFadeIn 0.4s ease forwards',
        }}>
          Gate entry logged · Flat 204 notified
        </div>
      )}
    </Card>
  )
}

function Maintenance({ flipped }: CP) {
  return (
    <Card>
      <Row
        icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round">
            <rect x="2" y="5" width="20" height="14" rx="2"/>
            <path d="M2 10h20"/>
          </svg>
        }
        title="₹2,400 due"
        sub="May maintenance · Flat 204"
        right={<Pill color={flipped ? 'green' : 'amber'}>{flipped ? 'Paid' : 'Pending'}</Pill>}
      />
      <div style={{
        marginTop: 10, paddingTop: 10, borderTop: '1px solid #f1f5f9',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 10.5, color: '#94a3b8' }}>Due 1st of every month</span>
        <div style={{
          width: 60, height: 3, borderRadius: 2,
          background: '#f1f5f9', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: flipped ? '#16a34a' : '#f59e0b',
            width: flipped ? '100%' : '30%',
            transition: 'width 0.7s ease, background 0.5s ease',
          }} />
        </div>
      </div>
    </Card>
  )
}

function Handover({ flipped }: CP) {
  return (
    <Card>
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 8 }}>
        {flipped && (
          <span style={{
            position: 'absolute', top: 0, left: '-80%', height: '100%', width: '60%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)',
            animation: 'heroShimmer 0.85s ease forwards', pointerEvents: 'none',
          }} />
        )}
        <Row
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          }
          title="Sunrise Apartments"
          sub="Handover complete"
          right={<Pill color="green">Live</Pill>}
        />
      </div>
      <div style={{
        display: 'flex', gap: 6, marginTop: 11, paddingTop: 10,
        borderTop: '1px solid #f1f5f9',
      }}>
        {[['48', 'Units'], ['3', 'Towers'], ['32', 'Residents']].map(([n, l]) => (
          <div key={l} style={{
            flex: 1, textAlign: 'center', padding: '6px 4px', borderRadius: 8,
            background: '#f8fafc', border: '1px solid #e2e8f0',
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{n}</div>
            <div style={{ fontSize: 9.5, color: '#94a3b8', marginTop: 1 }}>{l}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

const CARDS = [Complaint, Announcement, Visitor, Maintenance, Handover]

/* ── App chrome background inside the phone screen ── */
function AppChrome({ momentIdx }: { momentIdx: number }) {
  const headers = ['Complaints', 'Announcements', 'Visitors', 'Maintenance', 'Overview']
  const header = headers[momentIdx]

  const listItems = [
    [
      { dot: '#dc2626', title: 'Water leakage', sub: 'Flat 204 · Open', pill: 'Open', pillColor: '#fef2f2', pillText: '#dc2626' },
      { dot: '#16a34a', title: 'Lift not working', sub: 'Common · Resolved', pill: 'Done', pillColor: '#f0fdf4', pillText: '#16a34a' },
      { dot: '#f59e0b', title: 'Parking issue', sub: 'B-12 · In progress', pill: 'WIP', pillColor: '#fffbeb', pillText: '#b45309' },
      { dot: '#94a3b8', title: 'Street light out', sub: 'Gate 2 · Pending', pill: 'New', pillColor: '#f8fafc', pillText: '#475569' },
    ],
    [
      { dot: '#6366f1', title: 'Water supply off', sub: 'Today 10am–2pm', pill: 'All', pillColor: '#eef2ff', pillText: '#4338ca' },
      { dot: '#6366f1', title: 'Maintenance work', sub: 'Sat 9am · Lobby', pill: 'All', pillColor: '#eef2ff', pillText: '#4338ca' },
      { dot: '#94a3b8', title: 'AGM Meeting', sub: 'Sunday 11am', pill: 'All', pillColor: '#f8fafc', pillText: '#475569' },
      { dot: '#94a3b8', title: 'New parking rules', sub: 'Effective Monday', pill: 'Info', pillColor: '#f8fafc', pillText: '#475569' },
    ],
    [
      { dot: '#f59e0b', title: 'Rahul Sharma', sub: 'Main Gate · now', pill: 'Pending', pillColor: '#fffbeb', pillText: '#b45309' },
      { dot: '#16a34a', title: 'Priya Mehta', sub: 'B Gate · 10m ago', pill: 'In', pillColor: '#f0fdf4', pillText: '#16a34a' },
      { dot: '#16a34a', title: 'Delivery – Swiggy', sub: 'Main Gate · 22m', pill: 'In', pillColor: '#f0fdf4', pillText: '#16a34a' },
      { dot: '#94a3b8', title: 'Arjun Kapoor', sub: 'Main Gate · 1h ago', pill: 'Out', pillColor: '#f8fafc', pillText: '#475569' },
    ],
    [
      { dot: '#f59e0b', title: 'Flat 101', sub: '₹2,400 · May', pill: 'Pending', pillColor: '#fffbeb', pillText: '#b45309' },
      { dot: '#16a34a', title: 'Flat 102', sub: '₹2,400 · May', pill: 'Paid', pillColor: '#f0fdf4', pillText: '#16a34a' },
      { dot: '#dc2626', title: 'Flat 103', sub: '₹4,800 · 2 months', pill: 'Overdue', pillColor: '#fef2f2', pillText: '#dc2626' },
      { dot: '#16a34a', title: 'Flat 104', sub: '₹2,400 · May', pill: 'Paid', pillColor: '#f0fdf4', pillText: '#16a34a' },
    ],
    [
      { dot: '#6366f1', title: 'Sunrise Apts', sub: '48 units · 3 towers', pill: 'Live', pillColor: '#f0fdf4', pillText: '#16a34a' },
      { dot: '#94a3b8', title: 'Green Valley', sub: '60 units · setup', pill: 'Setup', pillColor: '#eef2ff', pillText: '#4338ca' },
      { dot: '#94a3b8', title: 'Palm Heights', sub: '32 units · pending', pill: 'Soon', pillColor: '#f8fafc', pillText: '#475569' },
      { dot: '#f59e0b', title: 'Blue Ridge', sub: '24 units · review', pill: 'Review', pillColor: '#fffbeb', pillText: '#b45309' },
    ],
  ]

  const items = listItems[momentIdx] || listItems[0]

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {/* App header */}
      <div style={{
        position: 'absolute', top: 44, left: 0, right: 0,
        height: 44, background: 'rgba(15,21,38,0.95)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center',
        padding: '0 14px', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.01em' }}>{header}</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, border: '1.5px solid rgba(255,255,255,0.35)' }} />
          </div>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #818cf8)' }} />
        </div>
      </div>

      {/* List items */}
      {items.map((item, i) => (
        <div key={`${momentIdx}-${i}`} style={{
          position: 'absolute',
          top: 96 + i * 50,
          left: 10, right: 10,
          height: 42,
          borderRadius: 10,
          background: i === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${i === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
          display: 'flex', alignItems: 'center', padding: '0 10px', gap: 9,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: item.dot, flexShrink: 0, opacity: 0.9 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.8)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{item.sub}</div>
          </div>
          <span style={{
            fontSize: 8.5, fontWeight: 600, padding: '2px 6px', borderRadius: 20,
            background: item.pillColor, color: item.pillText,
            opacity: 0.9, flexShrink: 0,
          }}>{item.pill}</span>
        </div>
      ))}

      {/* Bottom tab bar */}
      <div style={{
        position: 'absolute', bottom: 14, left: 8, right: 8,
        height: 42, borderRadius: 14,
        background: 'rgba(20,26,46,0.97)',
        border: '1px solid rgba(255,255,255,0.09)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        padding: '0 8px',
      }}>
        {[
          { label: 'Home', active: momentIdx === 4 },
          { label: 'Issues', active: momentIdx === 0 },
          { label: 'Visitors', active: momentIdx === 2 },
          { label: 'More', active: false },
        ].map(({ label, active }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '4px 8px' }}>
            <div style={{ width: 16, height: 3, borderRadius: 2, background: active ? '#6366f1' : 'transparent' }} />
            <div style={{ width: 22, height: 22, borderRadius: 6, background: active ? 'rgba(99,102,241,0.15)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: active ? '#6366f1' : 'rgba(255,255,255,0.2)' }} />
            </div>
            <div style={{ fontSize: 8, color: active ? '#818cf8' : 'rgba(255,255,255,0.25)', fontWeight: active ? 600 : 400 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface Slot { idx: number; flipped: boolean; visible: boolean }

export default function HeroAnimation() {
  const [time, setTime] = useState('9:41')
  const [slotA, setSlotA] = useState<Slot>({ idx: 0, flipped: false, visible: false })
  const [slotB, setSlotB] = useState<Slot>({ idx: 0, flipped: false, visible: false })
  const [activeSlot, setActiveSlot] = useState<'a' | 'b'>('a')
  const [momentIdx, setMomentIdx] = useState(0)
  const [labelVisible, setLabelVisible] = useState(true)

  useEffect(() => {
    const tick = () => {
      const n = new Date()
      setTime(`${n.getHours().toString().padStart(2, '0')}:${n.getMinutes().toString().padStart(2, '0')}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    let alive = true
    const timers: ReturnType<typeof setTimeout>[] = []
    let current = 0
    let active: 'a' | 'b' = 'a'

    const upA = (s: Partial<Slot>) => setSlotA(p => ({ ...p, ...s }))
    const upB = (s: Partial<Slot>) => setSlotB(p => ({ ...p, ...s }))
    const up = (slot: 'a' | 'b', s: Partial<Slot>) => slot === 'a' ? upA(s) : upB(s)

    function run() {
      if (!alive) return
      const incoming: 'a' | 'b' = active === 'a' ? 'b' : 'a'
      const outgoing = active
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
    timers.push(setTimeout(() => { if (alive) { upA({ visible: true }); setLabelVisible(true) } }, 100))
    timers.push(setTimeout(() => { if (alive) upA({ flipped: true }) }, FLIP_AT))
    timers.push(setTimeout(() => { if (alive) { current = 1; run() } }, DURATION))

    return () => { alive = false; timers.forEach(clearTimeout) }
  }, [])

  const renderSlot = (slot: Slot, id: 'a' | 'b') => {
    const CardComp = CARDS[slot.idx]
    const isActive = activeSlot === id
    return (
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: slot.visible ? 1 : 0,
        transition: `opacity ${FADE_MS}ms ease`,
        zIndex: slot.visible ? 10 : 9,
        pointerEvents: 'none',
        width: 'calc(100% - 28px)',
      }}>
        <div style={{ position: 'relative', animation: isActive && slot.visible ? 'heroFloat 4.5s ease-in-out infinite' : 'none' }}>
          <CardComp flipped={slot.flipped} />
        </div>
      </div>
    )
  }

  const moment = MOMENTS[momentIdx]

  return (
    <>
      <style>{`
        @keyframes heroRipple { 0%{transform:scale(0.85);opacity:1} 100%{transform:scale(1.6);opacity:0} }
        @keyframes heroShimmer { 0%{left:-80%} 100%{left:130%} }
        @keyframes heroFadeIn { from{opacity:0;transform:translateY(3px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroFloat { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-6px)} }
        @keyframes heroProgressFill { from{width:0%} to{width:100%} }
        @keyframes heroLabelIn { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{
        position: 'relative', width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: 560,
      }}>

        {/* Label */}
        <div style={{
          marginBottom: 26, textAlign: 'center',
          opacity: labelVisible ? 1 : 0,
          animation: labelVisible ? 'heroLabelIn 0.38s ease forwards' : 'none',
          minHeight: 50,
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.9)', lineHeight: 1.2 }}>{moment.label}</div>
          <div style={{ fontSize: 12.5, fontWeight: 400, marginTop: 5, color: 'rgba(255,255,255,0.4)' }}>{moment.sublabel}</div>
        </div>

        {/* Ambient glow */}
        <div style={{
          position: 'absolute', width: 280, height: 380,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.09) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none', filter: 'blur(20px)',
          top: '50%', left: '50%', transform: 'translate(-50%, -42%)', zIndex: 0,
        }} />

        {/* Phone */}
        <div style={{ perspective: '1100px', perspectiveOrigin: '48% 42%', position: 'relative', zIndex: 1 }}>
          <div style={{ transform: 'rotateY(-8deg) rotateX(5deg)', transformStyle: 'preserve-3d', position: 'relative' }}>

            {[[22, 36], [31, 52]].map(([t, h], i) => (
              <div key={i} style={{ position: 'absolute', left: -3, top: `${t}%`, width: 3, height: h, background: 'linear-gradient(to left,#1c2035,#252a42)', borderRadius: '2px 0 0 2px', boxShadow: '-2px 0 6px rgba(0,0,0,0.6)' }} />
            ))}
            <div style={{ position: 'absolute', right: -3, top: '28%', width: 3, height: 58, background: 'linear-gradient(to right,#1c2035,#252a42)', borderRadius: '0 2px 2px 0', boxShadow: '2px 0 6px rgba(0,0,0,0.6)' }} />

            <div style={{
              width: 252, height: 514, borderRadius: 46,
              background: 'linear-gradient(145deg,#252a3e 0%,#181c2c 25%,#0e1018 55%,#181c2c 80%,#252a3e 100%)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.09),0 0 0 2.5px rgba(0,0,0,0.95),-10px 24px 70px rgba(0,0,0,0.75),-4px 8px 24px rgba(0,0,0,0.55)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: '18%', right: '18%', height: 1.5, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)', zIndex: 60 }} />

              {/* Screen */}
              <div style={{ position: 'absolute', inset: '7px 6px', borderRadius: 40, background: '#080c1c', overflow: 'hidden' }}>

                {/* App chrome — visible background */}
                <AppChrome momentIdx={momentIdx} />

                {/* Scan lines */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.005) 2px,rgba(255,255,255,0.005) 3px)' }} />

                {/* Glare */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none', borderRadius: 40, background: 'linear-gradient(128deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.02) 22%,transparent 45%)' }} />

                {/* Dynamic island */}
                <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 90, height: 24, background: '#000', borderRadius: 12, zIndex: 40, boxShadow: '0 0 0 1px rgba(255,255,255,0.07)' }} />

                {/* Status bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 35 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.88)' }}>{time}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5 }}>
                      {[3,5,7,9].map((h,i) => <div key={i} style={{ width:3, height:h, borderRadius:1, background: i<3?'rgba(255,255,255,0.8)':'rgba(255,255,255,0.2)' }} />)}
                    </div>
                    <svg width="13" height="10" viewBox="0 0 22 16" fill="none">
                      <path d="M11 12l1.4-1.4" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M7 8.5c2.2-2.2 5.8-2.2 8 0" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M3.2 4.8C6.4 1.6 14.6 1.6 17.8 4.8" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="11" cy="14" r="1.5" fill="rgba(255,255,255,0.8)"/>
                    </svg>
                    <div style={{ display:'flex', alignItems:'center', gap:1 }}>
                      <div style={{ width:22, height:12, border:'1.5px solid rgba(255,255,255,0.55)', borderRadius:3.5, padding:'2px 2px' }}>
                        <div style={{ width:'68%', height:'100%', background:'rgba(255,255,255,0.75)', borderRadius:1.5 }} />
                      </div>
                      <div style={{ width:2, height:6, background:'rgba(255,255,255,0.4)', borderRadius:'0 1px 1px 0' }} />
                    </div>
                  </div>
                </div>

                {renderSlot(slotA, 'a')}
                {renderSlot(slotB, 'b')}

                <div style={{ position:'absolute', bottom:7, left:'50%', transform:'translateX(-50%)', width:68, height:4, background:'rgba(255,255,255,0.28)', borderRadius:2, zIndex:30 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Ground shadow */}
        <div style={{ width:160, height:14, background:'radial-gradient(ellipse,rgba(0,0,0,0.5) 0%,transparent 70%)', marginTop:8, filter:'blur(4px)' }} />

        {/* Progress bar */}
        <div style={{ display:'flex', gap:5, marginTop:14, width:200 }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ flex:1, height:2, borderRadius:2, background:'rgba(255,255,255,0.1)', overflow:'hidden' }}>
              {i < momentIdx && <div style={{ width:'100%', height:'100%', background:'rgba(255,255,255,0.45)', borderRadius:2 }} />}
              {i === momentIdx && <div key={`p${momentIdx}`} style={{ height:'100%', background:'rgba(255,255,255,0.45)', borderRadius:2, animation:`heroProgressFill ${DURATION}ms linear forwards` }} />}
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
