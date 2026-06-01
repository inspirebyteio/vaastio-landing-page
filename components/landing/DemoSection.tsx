'use client'
import { useState } from 'react'

// ── Phone frame dimensions ────────────────────────────────────────────────────
const AW = 185
const AH = Math.round(AW * 844 / 390)  // 400
const IW = 136
const IH = Math.round(IW * 844 / 390)  // 294
const CW = 340
const CH = 465

// ── App design tokens (from source) ──────────────────────────────────────────
const A = {
  bg:          '#f8fafc',
  surface:     '#ffffff',
  header:      '#2f3e4e',
  text:        '#0f172a',
  subtle:      '#64748b',
  border:      '#e2e8f0',
  primary:     '#2f3e4e',
  indigoBg:    '#ede9fe',
  openBg:      '#fef3c7', openText:     '#92400e',
  resolvedBg:  '#dcfce7', resolvedText: '#166534',
  rejectedBg:  '#fee2e2', rejectedText: '#991b1b',
}

// ── Tiny shared UI pieces ─────────────────────────────────────────────────────
function Pill({ text, bg, color }: { text: string; bg: string; color: string }) {
  return (
    <span style={{ fontSize: 7, fontWeight: 700, padding: '2px 5px', borderRadius: 4,
      background: bg, color, whiteSpace: 'nowrap', letterSpacing: '0.02em' }}>
      {text}
    </span>
  )
}

function AppHeader({ title, back }: { title: string; back?: boolean }) {
  return (
    <div style={{ background: A.header, padding: '7px 8px', display: 'flex',
      alignItems: 'center', gap: 5, flexShrink: 0 }}>
      {back && <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, lineHeight: 1 }}>←</span>}
      <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, flex: 1 }}>{title}</span>
      {!back && (
        <div style={{ width: 18, height: 18, borderRadius: 5, background: 'rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, lineHeight: 1 }}>+</span>
        </div>
      )}
    </div>
  )
}

function ComplaintRow({ icon, title, meta, status, statusBg, statusColor }:
  { icon: string; title: string; meta: string; status: string; statusBg: string; statusColor: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px',
      background: A.surface, borderBottom: `1px solid ${A.border}` }}>
      <div style={{ width: 24, height: 24, borderRadius: 6, background: A.indigoBg, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 8.5, fontWeight: 600, color: A.text,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
        <div style={{ fontSize: 7, color: A.subtle, marginTop: 1 }}>{meta}</div>
      </div>
      <Pill text={status} bg={statusBg} color={statusColor}/>
    </div>
  )
}

// ── Coded screens ─────────────────────────────────────────────────────────────

function ComplaintsListScreen() {
  return (
    <div style={{ background: A.bg, height: '100%', display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative' }}>
      <AppHeader title="Complaints"/>
      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 4, padding: '5px 8px', background: A.surface,
        borderBottom: `1px solid ${A.border}`, flexShrink: 0 }}>
        {['All','Open','Resolved','Rejected'].map((chip, i) => (
          <span key={chip} style={{ fontSize: 7, fontWeight: 600, padding: '3px 7px', borderRadius: 10,
            background: i === 0 ? A.primary : A.bg,
            color: i === 0 ? '#fff' : A.subtle,
            border: `1px solid ${i === 0 ? A.primary : A.border}`,
            whiteSpace: 'nowrap' }}>
            {chip}
          </span>
        ))}
      </div>
      {/* List */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ padding: '5px 8px 3px', fontSize: 7, fontWeight: 700, color: A.subtle,
          letterSpacing: '0.5px', textTransform: 'uppercase' as const }}>My Complaints</div>
        <ComplaintRow icon="⚡" title="Lift not working"   meta="Lift · 2d ago"   status="Open"     statusBg={A.openBg}     statusColor={A.openText}/>
        <ComplaintRow icon="💧" title="No water supply"    meta="Water · 5d ago"  status="Resolved" statusBg={A.resolvedBg} statusColor={A.resolvedText}/>
        <div style={{ padding: '5px 8px 3px', fontSize: 7, fontWeight: 700, color: A.subtle,
          letterSpacing: '0.5px', textTransform: 'uppercase' as const }}>Public Complaints</div>
        <ComplaintRow icon="🔊" title="Noise at night"     meta="Noise · 1d ago"  status="Open"     statusBg={A.openBg}     statusColor={A.openText}/>
        <ComplaintRow icon="🚗" title="Parking blocked"    meta="Parking · 3d ago" status="Open"    statusBg={A.openBg}     statusColor={A.openText}/>
      </div>
      {/* FAB */}
      <div style={{ position: 'absolute', bottom: 10, right: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 14, background: A.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 3px 8px rgba(0,0,0,0.22)', fontSize: 16, color: '#fff', lineHeight: 1 }}>+</div>
      </div>
    </div>
  )
}

function ComplaintDetailScreen() {
  return (
    <div style={{ background: A.bg, height: '100%', display: 'flex', flexDirection: 'column',
      overflow: 'hidden' }}>
      <AppHeader title="Water Leakage" back/>
      <div style={{ flex: 1, padding: '8px', overflow: 'hidden', display: 'flex',
        flexDirection: 'column', gap: 6 }}>
        {/* Status + tags */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' as const, alignItems: 'center' }}>
          <Pill text="OPEN"     bg={A.openBg}   color={A.openText}/>
          <Pill text="Plumbing" bg={A.indigoBg} color={A.primary}/>
          <Pill text="Public"   bg="#f0f9ff"    color="#0369a1"/>
        </div>
        {/* Title */}
        <div style={{ fontSize: 11, fontWeight: 700, color: A.text, lineHeight: 1.3 }}>
          Water leakage in corridor, Block B
        </div>
        {/* Description */}
        <div style={{ fontSize: 7.5, color: A.subtle, lineHeight: 1.5 }}>
          Water is dripping from the ceiling near the 2nd floor corridor. Started 2 days ago and is getting worse.
        </div>
        {/* Photo thumbnails */}
        <div style={{ display: 'flex', gap: 4 }}>
          {[0, 1].map(i => (
            <div key={i} style={{ width: 38, height: 38, borderRadius: 6,
              background: A.indigoBg, border: `1px solid ${A.border}` }}/>
          ))}
        </div>
        {/* Meta card */}
        <div style={{ background: A.surface, borderRadius: 8, padding: '6px 8px',
          border: `1px solid ${A.border}`, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { label: 'Reported by', value: 'Flat 204 · A.K.' },
            { label: 'Category',    value: 'Plumbing' },
            { label: 'Date',        value: '12 Jun 2026' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 7, color: A.subtle }}>{label}</span>
              <span style={{ fontSize: 7.5, fontWeight: 600, color: A.text }}>{value}</span>
            </div>
          ))}
        </div>
        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 5, marginTop: 'auto' }}>
          <div style={{ flex: 1, background: A.resolvedBg, border: `1px solid #bbf7d0`,
            borderRadius: 7, padding: '6px 4px', textAlign: 'center' as const }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: A.resolvedText }}>✓ Resolve</span>
          </div>
          <div style={{ flex: 1, background: A.rejectedBg, border: `1px solid #fecaca`,
            borderRadius: 7, padding: '6px 4px', textAlign: 'center' as const }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: A.rejectedText }}>✕ Reject</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Placeholder image wrapper (for features not yet screenshotted) ─────────────
function PhoneImg({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}/>
  )
}

// ── Dual phone component ──────────────────────────────────────────────────────
function DualPhone({ a, b }: {
  a: { screen: React.ReactNode; label: string }
  b: { screen: React.ReactNode; label: string }
}) {
  const [active, setActive] = useState(0)
  const isA = active === 0

  const aLeft = isA ? 8 : CW - IW - 8
  const aTop  = isA ? 18 : 108
  const aW    = isA ? AW : IW
  const aH    = isA ? AH : IH

  const bLeft = !isA ? 8 : CW - IW - 8
  const bTop  = !isA ? 18 : 108
  const bW    = !isA ? AW : IW
  const bH    = !isA ? AH : IH

  const phone = (
    screen: React.ReactNode, label: string,
    left: number, top: number, w: number, h: number,
    isActive: boolean, onClick: () => void,
  ) => (
    <div
      onClick={onClick}
      style={{
        position: 'absolute', left, top, width: w,
        zIndex: isActive ? 2 : 1,
        opacity: isActive ? 1 : 0.55,
        cursor: isActive ? 'default' : 'pointer',
        transition: 'left 0.45s cubic-bezier(0.4,0,0.2,1), top 0.45s cubic-bezier(0.4,0,0.2,1), width 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease',
      }}
    >
      <div style={{
        width: '100%', height: h,
        borderRadius: isActive ? 30 : 22,
        border: `1.5px solid rgba(255,255,255,${isActive ? 0.11 : 0.06})`,
        boxShadow: isActive
          ? '0 20px 56px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.4)'
          : '0 6px 20px rgba(0,0,0,0.4)',
        background: '#08101a',
        overflow: 'hidden',
        position: 'relative',
        transition: 'height 0.45s cubic-bezier(0.4,0,0.2,1), border-radius 0.45s ease, box-shadow 0.45s ease',
      }}>
        {/* Screen content — sits between dynamic island and home bar */}
        <div style={{ position: 'absolute', top: 30, bottom: 18, left: 0, right: 0, overflow: 'hidden' }}>
          {screen}
        </div>
        {/* Dynamic island */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 30,
          background: '#08101a', display: 'flex', alignItems: 'flex-end',
          justifyContent: 'center', paddingBottom: 4, zIndex: 10 }}>
          <div style={{ width: 64, height: 19, background: '#000', borderRadius: 10 }}/>
        </div>
        {/* Home bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 18,
          background: '#08101a', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 10 }}>
          <div style={{ width: 46, height: 3, background: 'rgba(255,255,255,0.18)', borderRadius: 2 }}/>
        </div>
      </div>
      <div style={{
        marginTop: 9, textAlign: 'center',
        fontSize: 9, fontWeight: 500, letterSpacing: '0.16em',
        textTransform: 'uppercase' as const,
        color: `rgba(217,224,232,${isActive ? 0.42 : 0.2})`,
        transition: 'color 0.45s ease',
      }}>{label}</div>
    </div>
  )

  return (
    <div style={{ position: 'relative', width: CW, height: CH, flexShrink: 0 }}>
      {phone(a.screen, a.label, aLeft, aTop, aW, aH, isA,  () => setActive(0))}
      {phone(b.screen, b.label, bLeft, bTop, bW, bH, !isA, () => setActive(1))}
    </div>
  )
}

// ── Feature text block ────────────────────────────────────────────────────────
function FeatText({ eyebrow, title, em, body, pills }: {
  eyebrow: string; title: string; em: string; body: string; pills: string[]
}) {
  return (
    <div className="feat-row-text">
      <div className="feat-row-eyebrow">{eyebrow}</div>
      <h3 className="feat-row-h">{title}<br /><em>{em}</em></h3>
      <p className="feat-row-body">{body}</p>
      <div className="feat-row-pills">
        {pills.map(p => <div key={p} className="feat-row-pill">{p}</div>)}
      </div>
    </div>
  )
}

const PH = (label: string) => `https://placehold.co/390x844/0f1923/c4ccd5?text=${encodeURIComponent(label)}`

// ── Section ───────────────────────────────────────────────────────────────────
export default function DemoSection() {
  return (
    <section className="feat-alt" id="demo">

      <div className="feat-alt-header">
        <div className="feat-alt-label">See it in action</div>
        <h2 className="feat-alt-h">The product, up close.</h2>
        <p className="feat-alt-sub">Tap the smaller screen to switch perspectives.</p>
      </div>

      {/* 1 — Complaints */}
      <div className="feat-row">
        <div className="feat-row-img">
          <DualPhone
            a={{ screen: <ComplaintsListScreen/>, label: 'Resident' }}
            b={{ screen: <ComplaintDetailScreen/>, label: 'Admin' }}
          />
        </div>
        <FeatText
          eyebrow="Complaints"
          title="Raise a complaint."
          em="Know it's heard."
          body="Residents raise complaints with photos and a category. Admins are notified instantly. Status updates keep everyone in the loop. Nothing gets lost in a WhatsApp group."
          pills={['19 categories', 'Photo evidence', 'Public or private', 'Real-time status']}
        />
      </div>

      {/* 2 — Visitors */}
      <div className="feat-row">
        <FeatText
          eyebrow="Visitor Management"
          title="Every visitor."
          em="Logged and approved."
          body="Gate staff log every visitor as they arrive. Residents get a notification and decide — allow or deny. Every entry tracked, every exit recorded. No register. No guesswork."
          pills={['Instant notifications', 'Allow or deny', 'Entry logged', 'Gate staff app']}
        />
        <div className="feat-row-img">
          <DualPhone
            a={{ screen: <PhoneImg src={PH('Gatekeeper')}/>, label: 'Gatekeeper' }}
            b={{ screen: <PhoneImg src={PH('Resident')}/>,   label: 'Resident' }}
          />
        </div>
      </div>

      {/* 3 — Announcements */}
      <div className="feat-row">
        <div className="feat-row-img">
          <DualPhone
            a={{ screen: <PhoneImg src={PH('Admin')}/>,    label: 'Admin' }}
            b={{ screen: <PhoneImg src={PH('Resident')}/>, label: 'Resident' }}
          />
        </div>
        <FeatText
          eyebrow="Announcements"
          title="Say it once."
          em="Everyone hears it."
          body="Post an announcement and every resident gets notified instantly — society-wide or targeted to a specific tower or wing. No chaos. No missed updates."
          pills={['Society-wide or targeted', 'Push notifications', 'Scheduled posts', 'Read receipts']}
        />
      </div>

      {/* 4 — Unit Assignment */}
      <div className="feat-row">
        <FeatText
          eyebrow="Unit Assignment"
          title="Assign a unit."
          em="Resident is home."
          body="Builder adds a phone number to a unit — optionally pre-fills the resident's details. The resident gets an invite, logs in, sees their unit already set up, and they're in."
          pills={['Phone number invite', 'Builder pre-fills details', 'Resident confirms on login', 'Instant access granted']}
        />
        <div className="feat-row-img">
          <DualPhone
            a={{ screen: <PhoneImg src={PH('Builder')}/>,  label: 'Builder' }}
            b={{ screen: <PhoneImg src={PH('Resident')}/>, label: 'Resident' }}
          />
        </div>
      </div>

    </section>
  )
}
