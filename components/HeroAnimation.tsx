'use client'
import { useState, useEffect } from 'react'

interface CP { flipped: boolean }

function Complaint({ flipped }: CP) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{
        width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
        background: flipped ? '#22c55e' : '#ef4444',
        boxShadow: flipped ? '0 0 7px #22c55e99' : '0 0 7px #ef444499',
        transition: 'all 0.4s ease',
      }} />
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b', lineHeight: 1.3 }}>
          {flipped ? 'Resolved by Admin' : 'Water leakage reported'}
        </div>
        <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>Block B · Flat 204</div>
      </div>
    </div>
  )
}

function Announcement({ flipped }: CP) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10 }}>
      {flipped && (
        <span style={{
          position: 'absolute', inset: -14, borderRadius: 18,
          border: '1.5px solid rgba(99,102,241,0.5)',
          animation: 'heroRipple 1s ease-out forwards',
          pointerEvents: 'none',
        }} />
      )}
      <span style={{
        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
        background: 'rgba(99,102,241,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </span>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>Water supply off 10am–2pm</div>
        <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>Pushed to all residents</div>
      </div>
    </div>
  )
}

function Visitor({ flipped }: CP) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{
          width: 30, height: 30, borderRadius: 8, flexShrink: 0,
          background: 'rgba(234,179,8,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
        </span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>Rahul Sharma</div>
          <div style={{ fontSize: 10, color: '#94a3b8' }}>Visitor · Main Gate</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <span style={{
          flex: 1, textAlign: 'center', fontSize: 10, fontWeight: 700, padding: '5px 0', borderRadius: 6,
          background: flipped ? '#dcfce7' : 'rgba(34,197,94,0.08)', color: '#16a34a',
          border: `1.5px solid ${flipped ? '#86efac' : 'rgba(34,197,94,0.3)'}`,
          boxShadow: flipped ? '0 0 8px rgba(34,197,94,0.3)' : 'none',
          transition: 'all 0.35s ease',
        }}>Allow</span>
        <span style={{
          flex: 1, textAlign: 'center', fontSize: 10, fontWeight: 700, padding: '5px 0', borderRadius: 6,
          background: 'rgba(239,68,68,0.06)',
          color: flipped ? 'rgba(239,68,68,0.25)' : '#ef4444',
          border: `1.5px solid ${flipped ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.3)'}`,
          transition: 'all 0.35s ease',
        }}>Deny</span>
      </div>
    </div>
  )
}

function Maintenance({ flipped }: CP) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{
        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
        background: flipped ? 'rgba(34,197,94,0.1)' : 'rgba(249,115,22,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.4s ease',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"
          stroke={flipped ? '#22c55e' : '#f97316'} style={{ transition: 'stroke 0.4s ease' }}>
          <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
        </svg>
      </span>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>₹2,400 maintenance due</div>
        <div style={{ marginTop: 5 }}>
          <span style={{
            display: 'inline-block', fontSize: 9, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
            background: flipped ? '#dcfce7' : '#fff7ed',
            color: flipped ? '#16a34a' : '#ea580c',
            border: `1px solid ${flipped ? '#86efac' : '#fed7aa'}`,
            transition: 'all 0.4s ease',
          }}>{flipped ? '✓ Paid' : 'Pending'}</span>
        </div>
      </div>
    </div>
  )
}

function Handover({ flipped }: CP) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {flipped && (
        <span style={{
          position: 'absolute', top: 0, left: 0, height: '100%', width: '50%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
          animation: 'heroShimmer 0.9s ease forwards', pointerEvents: 'none',
        }} />
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{
          width: 30, height: 30, borderRadius: 8, flexShrink: 0,
          background: 'rgba(99,102,241,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </span>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Sunrise Apartments</div>
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {([['48 units', false], ['3 towers', false], ['Ready ✓', true]] as [string, boolean][]).map(([l, hi], i) => (
          <span key={i} style={{
            fontSize: 9, fontWeight: 600, padding: '3px 8px', borderRadius: 20,
            background: hi ? '#dcfce7' : 'rgba(99,102,241,0.08)',
            color: hi ? '#16a34a' : '#6366f1',
            border: `1px solid ${hi ? '#86efac' : 'rgba(99,102,241,0.2)'}`,
          }}>{l}</span>
        ))}
      </div>
    </div>
  )
}

const CARDS = [Complaint, Announcement, Visitor, Maintenance, Handover]
const POSITIONS: React.CSSProperties[] = [
  { top: '44%', left: '50%', transform: 'translate(-50%,-50%)' },
  { top: '22%', left: '50%', transform: 'translateX(-50%)' },
  { top: '44%', left: '50%', transform: 'translate(-50%,-50%)' },
  { top: '46%', left: '50%', transform: 'translate(-50%,-50%)' },
  { top: '50%', left: '50%', transform: 'translate(-50%,-50%)' },
]

interface Slot { idx: number; flipped: boolean; shown: boolean }

export default function HeroAnimation() {
  const [time, setTime] = useState('9:41')
  const [slotA, setSlotA] = useState<Slot>({ idx: 0, flipped: false, shown: false })
  const [slotB, setSlotB] = useState<Slot>({ idx: 0, flipped: false, shown: false })
  const [activeSlot, setActiveSlot] = useState<'a' | 'b'>('a')
  const [progressIdx, setProgressIdx] = useState(0)

  // Real-time clock — initialised client-side to avoid hydration mismatch
  useEffect(() => {
    function tick() {
      const n = new Date()
      setTime(`${n.getHours().toString().padStart(2, '0')}:${n.getMinutes().toString().padStart(2, '0')}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Card cycling
  useEffect(() => {
    let alive = true
    const timers: ReturnType<typeof setTimeout>[] = []
    let current = 0
    let active: 'a' | 'b' = 'a'

    function upA(s: Partial<Slot>) { setSlotA(p => ({ ...p, ...s })) }
    function upB(s: Partial<Slot>) { setSlotB(p => ({ ...p, ...s })) }
    function up(slot: 'a' | 'b', s: Partial<Slot>) { slot === 'a' ? upA(s) : upB(s) }
    function clearAll() { timers.forEach(clearTimeout); timers.length = 0 }

    function run() {
      clearAll()
      if (!alive) return
      const incoming: 'a' | 'b' = active === 'a' ? 'b' : 'a'
      const outgoing: 'a' | 'b' = active
      setProgressIdx(current)
      up(incoming, { idx: current, flipped: false, shown: false })
      timers.push(setTimeout(() => {
        if (!alive) return
        up(incoming, { shown: true })
        up(outgoing, { shown: false })
        setActiveSlot(incoming)
        active = incoming
      }, 16))
      timers.push(setTimeout(() => { if (alive) up(incoming, { flipped: true }) }, 1100))
      timers.push(setTimeout(() => {
        if (!alive) return
        current = (current + 1) % 5
        run()
      }, 2500))
    }

    upA({ idx: 0, flipped: false, shown: false })
    timers.push(setTimeout(() => { if (alive) upA({ shown: true }) }, 16))
    timers.push(setTimeout(() => { if (alive) { current = 1; run() } }, 2500))
    return () => { alive = false; clearAll() }
  }, [])

  function renderSlot(slot: Slot, id: 'a' | 'b') {
    const Card = CARDS[slot.idx]
    const isActive = activeSlot === id
    return (
      <div style={{
        position: 'absolute', ...POSITIONS[slot.idx],
        opacity: slot.shown ? 1 : 0,
        transition: 'opacity 0.35s ease',
        zIndex: slot.shown ? 10 : 9,
        pointerEvents: 'none',
      }}>
        <div className={isActive && slot.shown ? 'hero-card-hold' : ''}>
          <div style={{
            background: 'rgba(255,255,255,0.96)', borderRadius: 14,
            padding: '13px 15px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.28), 0 1px 4px rgba(0,0,0,0.12)',
            minWidth: 188, maxWidth: 215,
          }}>
            <Card flipped={slot.flipped} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: 520,
    }}>

      {/* Soft ambient light behind phone — static, no pulse */}
      <div style={{
        position: 'absolute',
        width: 280, height: 400,
        background: 'radial-gradient(ellipse at 40% 50%, rgba(99,102,241,0.13) 0%, rgba(30,64,175,0.06) 50%, transparent 72%)',
        borderRadius: '50%', pointerEvents: 'none',
        filter: 'blur(20px)',
      }} />

      {/* 3D perspective wrapper */}
      <div style={{ perspective: '1100px', perspectiveOrigin: '48% 42%' }}>
        <div style={{
          transform: 'rotateY(-8deg) rotateX(5deg)',
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}>

          {/* Left volume buttons */}
          {[[22, 36], [31, 52]].map(([topPct, h], i) => (
            <div key={i} style={{
              position: 'absolute', left: -3,
              top: `${topPct}%`, width: 3, height: h,
              background: 'linear-gradient(to left, #1c2035, #252a42)',
              borderRadius: '2px 0 0 2px',
              boxShadow: '-2px 0 6px rgba(0,0,0,0.6)',
            }} />
          ))}

          {/* Right power button */}
          <div style={{
            position: 'absolute', right: -3,
            top: '28%', width: 3, height: 58,
            background: 'linear-gradient(to right, #1c2035, #252a42)',
            borderRadius: '0 2px 2px 0',
            boxShadow: '2px 0 6px rgba(0,0,0,0.6)',
          }} />

          {/* Phone outer body — titanium-style frame */}
          <div style={{
            width: 252, height: 514,
            borderRadius: 46,
            background: 'linear-gradient(145deg, #252a3e 0%, #181c2c 25%, #0e1018 55%, #181c2c 80%, #252a3e 100%)',
            boxShadow: `
              0 0 0 1px rgba(255,255,255,0.09),
              0 0 0 2.5px rgba(0,0,0,0.95),
              -10px 24px 70px rgba(0,0,0,0.75),
              -4px 8px 24px rgba(0,0,0,0.55),
              4px -4px 20px rgba(255,255,255,0.02),
              0 0 0 3.5px rgba(255,255,255,0.04)
            `,
            position: 'relative',
            overflow: 'hidden',
          }}>

            {/* Metallic top-edge highlight */}
            <div style={{
              position: 'absolute', top: 0, left: '18%', right: '18%', height: 1.5,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              zIndex: 60,
            }} />
            {/* Subtle bottom glow accent */}
            <div style={{
              position: 'absolute', bottom: 0, left: '30%', right: '30%', height: 1.5,
              background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)',
              zIndex: 60,
            }} />

            {/* Screen — inset from frame */}
            <div style={{
              position: 'absolute', inset: '7px 6px',
              borderRadius: 40,
              background: 'linear-gradient(160deg, #0d1526 0%, #080c1c 60%, #060810 100%)',
              overflow: 'hidden',
            }}>

              {/* Scan-line texture */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.007) 2px, rgba(255,255,255,0.007) 3px)',
              }} />

              {/* Screen glare — top-left diagonal reflection */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none', borderRadius: 40,
                background: 'linear-gradient(128deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 22%, transparent 45%)',
              }} />

              {/* Dynamic island */}
              <div style={{
                position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
                width: 90, height: 24, background: '#000',
                borderRadius: 12, zIndex: 40,
                boxShadow: '0 0 0 1px rgba(255,255,255,0.07)',
              }} />

              {/* Status bar — real time flanks the dynamic island */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 44,
                padding: '0 16px', display: 'flex',
                alignItems: 'center', justifyContent: 'space-between', zIndex: 35,
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.01em',
                  color: 'rgba(255,255,255,0.88)',
                }}>{time}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  {/* Signal bars */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5 }}>
                    {[3, 5, 7, 9].map((h, i) => (
                      <div key={i} style={{
                        width: 3, height: h, borderRadius: 1,
                        background: i < 3 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)',
                      }} />
                    ))}
                  </div>
                  {/* WiFi */}
                  <svg width="13" height="10" viewBox="0 0 22 16" fill="none">
                    <path d="M11 12l1.4-1.4" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M7 8.5c2.2-2.2 5.8-2.2 8 0" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M3.2 4.8C6.4 1.6 14.6 1.6 17.8 4.8" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="11" cy="14" r="1.5" fill="rgba(255,255,255,0.8)"/>
                  </svg>
                  {/* Battery */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <div style={{
                      width: 22, height: 12,
                      border: '1.5px solid rgba(255,255,255,0.55)',
                      borderRadius: 3.5, padding: '2px 2px',
                    }}>
                      <div style={{ width: '68%', height: '100%', background: 'rgba(255,255,255,0.75)', borderRadius: 1.5 }} />
                    </div>
                    <div style={{ width: 2, height: 6, background: 'rgba(255,255,255,0.4)', borderRadius: '0 1px 1px 0' }} />
                  </div>
                </div>
              </div>

              {/* Cards (two slots for cross-fade) */}
              {renderSlot(slotA, 'a')}
              {renderSlot(slotB, 'b')}

              {/* Home indicator */}
              <div style={{
                position: 'absolute', bottom: 7, left: '50%', transform: 'translateX(-50%)',
                width: 68, height: 4, background: 'rgba(255,255,255,0.28)', borderRadius: 2, zIndex: 30,
              }} />

            </div>
          </div>
        </div>
      </div>

      {/* Grounded shadow ellipse */}
      <div style={{
        width: 160, height: 14,
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 70%)',
        marginTop: 8,
        filter: 'blur(4px)',
      }} />

      {/* Progress segments */}
      <div style={{ display: 'flex', gap: 5, marginTop: 10, width: 240 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{
            flex: 1, height: 2, borderRadius: 2,
            background: 'rgba(255,255,255,0.1)', overflow: 'hidden',
          }}>
            {i < progressIdx && (
              <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
            )}
            {i === progressIdx && (
              <div key={`p${progressIdx}`} className="hero-progress-fill"
                style={{ height: '100%', background: 'rgba(255,255,255,0.4)', borderRadius: 2, width: 0 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
