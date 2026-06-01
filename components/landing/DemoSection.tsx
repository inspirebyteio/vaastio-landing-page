'use client'
import { useState } from 'react'

const AW = 185
const AH = Math.round(AW * 844 / 390)  // 400
const IW = 136
const IH = Math.round(IW * 844 / 390)  // 294
const CW = 340
const CH = 465

function DualPhone({ a, b }: {
  a: { img: string; label: string }
  b: { img: string; label: string }
}) {
  const [active, setActive] = useState(0)
  const isA = active === 0

  // A: left when active, right when inactive
  const aLeft = isA ? 8 : CW - IW - 8
  const aTop  = isA ? 18 : 108
  const aW    = isA ? AW : IW
  const aH    = isA ? AH : IH

  // B: right when inactive (A active), left when active
  const bLeft = !isA ? 8 : CW - IW - 8
  const bTop  = !isA ? 18 : 108
  const bW    = !isA ? AW : IW
  const bH    = !isA ? AH : IH

  const phone = (
    img: string, label: string,
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
        overflow: 'hidden',
        background: '#08101a',
        position: 'relative',
        transition: 'height 0.45s cubic-bezier(0.4,0,0.2,1), border-radius 0.45s ease, box-shadow 0.45s ease',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
        {/* Dynamic island */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 30, background: '#08101a', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 4 }}>
          <div style={{ width: 64, height: 19, background: '#000', borderRadius: 10 }} />
        </div>
        {/* Home bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 18, background: '#08101a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 46, height: 3, background: 'rgba(255,255,255,0.18)', borderRadius: 2 }} />
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
      {phone(a.img, a.label, aLeft, aTop, aW, aH, isA,  () => setActive(0))}
      {phone(b.img, b.label, bLeft, bTop, bW, bH, !isA, () => setActive(1))}
    </div>
  )
}

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

export default function DemoSection() {
  return (
    <section className="feat-alt" id="demo">

      <div className="feat-alt-header">
        <div className="feat-alt-label">See it in action</div>
        <h2 className="feat-alt-h">Built for every moment<br />that matters.</h2>
        <p className="feat-alt-sub">
          From the first complaint to the last visitor log — Vaastio handles it all, seamlessly.
        </p>
      </div>

      {/* 1 — Complaints */}
      <div className="feat-row">
        <div className="feat-row-img">
          <DualPhone
            a={{ img: PH('Resident'), label: 'Resident' }}
            b={{ img: PH('Admin'),    label: 'Admin' }}
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
            a={{ img: PH('Gatekeeper'), label: 'Gatekeeper' }}
            b={{ img: PH('Resident'),   label: 'Resident' }}
          />
        </div>
      </div>

      {/* 3 — Announcements */}
      <div className="feat-row">
        <div className="feat-row-img">
          <DualPhone
            a={{ img: PH('Admin'),    label: 'Admin' }}
            b={{ img: PH('Resident'), label: 'Resident' }}
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
          body="Builder adds a phone number to a unit — optionally pre-fills the resident's details. The resident gets an invite, logs in, sees their unit already set up, and they're in. That's it."
          pills={['Phone number invite', 'Builder pre-fills details', 'Resident confirms on login', 'Instant access granted']}
        />
        <div className="feat-row-img">
          <DualPhone
            a={{ img: PH('Builder'),  label: 'Builder' }}
            b={{ img: PH('Resident'), label: 'Resident' }}
          />
        </div>
      </div>

    </section>
  )
}
