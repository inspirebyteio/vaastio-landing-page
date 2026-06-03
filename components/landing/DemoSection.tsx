'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Zap, Droplets, Volume2, Car, Megaphone, Wrench, Users, AlertTriangle, PartyPopper, Pin, ArrowLeft, Plus } from 'lucide-react'

// ── Phone frame dimensions ────────────────────────────────────────────────────
const AW = 185
const AH = Math.round(AW * 844 / 390)  // 400
const IW = 136
const IH = Math.round(IW * 844 / 390)  // 294
const CW = 340
const CH = 465
const TAB_H = 28
const SB_H  = 26   // status-bar height (lives inside display glass)
const HI_H  = 12   // home-indicator height (lives inside display glass)

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

// ── Announcement category colours ─────────────────────────────────────────────
type LucideComp = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>
const ANN: Record<string, { bg: string; text: string; Icon: LucideComp }> = {
  GENERAL:     { bg: '#f3f4f6', text: '#6b7280', Icon: Megaphone },
  MAINTENANCE: { bg: '#fff7ed', text: '#ea580c', Icon: Wrench },
  MEETING:     { bg: '#eff6ff', text: '#2563eb', Icon: Users },
  EMERGENCY:   { bg: '#fef2f2', text: '#dc2626', Icon: AlertTriangle },
  CELEBRATION: { bg: '#faf5ff', text: '#9333ea', Icon: PartyPopper },
}

// ── Status bar hooks + icons ──────────────────────────────────────────────────
function useTime() {
  const [time, setTime] = useState('9:41')
  useEffect(() => {
    const fmt = () => {
      const now = new Date()
      const h = now.getHours() % 12 || 12
      const m = String(now.getMinutes()).padStart(2, '0')
      return `${h}:${m}`
    }
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 30000)
    return () => clearInterval(id)
  }, [])
  return time
}


function WifiIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" style={{ display: 'block' }}>
      <circle cx="5" cy="7.2" r="0.9" fill="#334155"/>
      <path d="M3 5.5 C3.8 4.4 6.2 4.4 7 5.5" stroke="#334155" strokeWidth="0.9" strokeLinecap="round"/>
      <path d="M1.2 3.8 C2.4 1.8 7.6 1.8 8.8 3.8" stroke="#334155" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" style={{ display: 'block' }}>
      <rect x="0.5" y="1"  width="12.5" height="6" rx="1.5" stroke="#334155" strokeWidth="0.8"/>
      <rect x="13.5" y="3" width="1.5"  height="2" rx="0.75" fill="#334155" fillOpacity="0.4"/>
      <rect x="1.5" y="2"  width="8.5"  height="4" rx="0.8"  fill="#334155"/>
    </svg>
  )
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
    <div style={{ background: A.bg, padding: '8px 10px 6px', display: 'flex',
      alignItems: 'center', gap: 6, flexShrink: 0,
      borderBottom: `1px solid ${A.border}` }}>
      {back && <ArrowLeft size={11} color={A.text} strokeWidth={2}/>}
      <span style={{ color: A.text, fontSize: 11, fontWeight: 700 }}>{title}</span>
    </div>
  )
}

// ── Row helpers ───────────────────────────────────────────────────────────────

function ComplaintRow({ Icon, title, meta, status, statusBg, statusColor }:
  { Icon: LucideComp; title: string; meta: string; status: string; statusBg: string; statusColor: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
      background: A.surface, borderBottom: `1px solid ${A.border}` }}>
      <div style={{ width: 26, height: 26, borderRadius: 7, background: A.indigoBg, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={12} color={A.primary} strokeWidth={2}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: A.text,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
        <div style={{ fontSize: 7.5, color: A.subtle, marginTop: 2 }}>{meta}</div>
      </div>
      <Pill text={status} bg={statusBg} color={statusColor}/>
    </div>
  )
}

function VisitorRow({ initial, name, flat, type, status, statusBg, statusColor }: {
  initial: string; name: string; flat: string; type: string
  status: string; statusBg: string; statusColor: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
      background: A.surface, borderBottom: `1px solid ${A.border}` }}>
      <div style={{ width: 26, height: 26, borderRadius: 13, background: '#e2e8f0', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 700, color: A.subtle }}>
        {initial}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: A.text,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        <div style={{ fontSize: 7.5, color: A.subtle, marginTop: 2 }}>{flat} · {type}</div>
      </div>
      <Pill text={status} bg={statusBg} color={statusColor}/>
    </div>
  )
}

function AnnouncementRow({ cat, title, body, author, time, pinned }: {
  cat: string; title: string; body: string; author: string; time: string; pinned?: boolean
}) {
  const c = ANN[cat]
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '9px 10px',
      background: A.surface, borderBottom: `1px solid ${A.border}` }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: c.bg, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <c.Icon size={12} color={c.text} strokeWidth={2}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 2 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: A.text, flex: 1,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
          {pinned && <Pin size={8} color={A.subtle} strokeWidth={2}/>}
        </div>
        <div style={{ fontSize: 7, color: A.subtle, lineHeight: 1.5, marginBottom: 3,
          overflow: 'hidden', maxHeight: 22 }}>{body}</div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <span style={{ fontSize: 6.5, padding: '1px 4px', borderRadius: 3,
            background: c.bg, color: c.text, fontWeight: 700 }}>
            {cat.charAt(0) + cat.slice(1).toLowerCase()}
          </span>
          <span style={{ fontSize: 6.5, color: A.subtle }}>· {author} · {time}</span>
        </div>
      </div>
    </div>
  )
}

// ── Coded screens ─────────────────────────────────────────────────────────────

function ComplaintsListScreen() {
  return (
    <div style={{ background: A.bg, height: '100%', display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative' }}>
      <AppHeader title="Complaints" back/>
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
        <div style={{ padding: '8px 10px 4px', fontSize: 7, fontWeight: 700, color: A.subtle,
          letterSpacing: '0.5px', textTransform: 'uppercase' as const }}>My Complaints</div>
        <ComplaintRow Icon={Zap}      title="Elevator B2 not working"  meta="Lift · 2d ago"      status="Open"     statusBg={A.openBg}     statusColor={A.openText}/>
        <ComplaintRow Icon={Droplets} title="No water since 6 AM"      meta="Plumbing · 5d ago"  status="Resolved" statusBg={A.resolvedBg} statusColor={A.resolvedText}/>
        <div style={{ padding: '8px 10px 4px', fontSize: 7, fontWeight: 700, color: A.subtle,
          letterSpacing: '0.5px', textTransform: 'uppercase' as const }}>Public Complaints</div>
        <ComplaintRow Icon={Volume2}  title="Loud music — flat B-302"  meta="Noise · 1d ago"     status="Open"     statusBg={A.openBg}     statusColor={A.openText}/>
      </div>
      {/* FAB */}
      <div style={{ position: 'absolute', bottom: 10, right: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 14, background: A.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 3px 8px rgba(0,0,0,0.22)' }}><Plus size={14} color="#fff" strokeWidth={2.5}/></div>
      </div>
    </div>
  )
}

function ComplaintDetailScreen() {
  return (
    <div style={{ background: A.bg, height: '100%', display: 'flex', flexDirection: 'column',
      overflow: 'hidden' }}>
      <AppHeader title="Water Seepage" back/>
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
          Seepage in B-wing corridor, 2nd floor
        </div>
        {/* Description */}
        <div style={{ fontSize: 7.5, color: A.subtle, lineHeight: 1.5 }}>
          Water dripping from ceiling near the staircase. Worsening since 2 days — floor gets slippery.
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
            { label: 'Reported by', value: 'Flat 203 · Amit Kumar' },
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

// ── Visitor screens ───────────────────────────────────────────────────────────

function GatekeeperScreen() {
  return (
    <div style={{ background: A.bg, height: '100%', display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative' }}>
      <AppHeader title="Visitor Log" back/>
      {/* Date + summary bar */}
      <div style={{ padding: '6px 10px', background: A.surface, borderBottom: `1px solid ${A.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 7.5, fontWeight: 600, color: A.text }}>Today, 2 Jun</span>
        <span style={{ fontSize: 7, color: A.subtle }}>12 entries · 2 pending</span>
      </div>
      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 4, padding: '5px 8px', background: A.surface,
        borderBottom: `1px solid ${A.border}`, flexShrink: 0 }}>
        {['All', 'Pending', 'Allowed', 'Denied'].map((chip, i) => (
          <span key={chip} style={{ fontSize: 7, fontWeight: 600, padding: '3px 6px', borderRadius: 10,
            background: i === 0 ? A.primary : A.bg,
            color: i === 0 ? '#fff' : A.subtle,
            border: `1px solid ${i === 0 ? A.primary : A.border}`,
            whiteSpace: 'nowrap' }}>
            {chip}
          </span>
        ))}
      </div>
      {/* Visitor list */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <VisitorRow initial="R" name="Rohit Sharma"        flat="B-502" type="Guest"    status="PENDING" statusBg={A.openBg}     statusColor={A.openText}/>
        <VisitorRow initial="S" name="Swiggy Delivery"    flat="A-203" type="Delivery" status="ALLOWED" statusBg={A.resolvedBg} statusColor={A.resolvedText}/>
        <VisitorRow initial="K" name="Kavitha Nair"       flat="C-301" type="Guest"    status="ALLOWED" statusBg={A.resolvedBg} statusColor={A.resolvedText}/>
        <VisitorRow initial="A" name="AC Technician"      flat="A-304" type="Service"  status="PENDING" statusBg={A.openBg}     statusColor={A.openText}/>
      </div>
      {/* FAB */}
      <div style={{ position: 'absolute', bottom: 10, right: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 14, background: A.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 3px 8px rgba(0,0,0,0.22)' }}><Plus size={14} color="#fff" strokeWidth={2.5}/></div>
      </div>
    </div>
  )
}

function ResidentApprovalScreen() {
  return (
    <div style={{ background: A.bg, height: '100%', display: 'flex', flexDirection: 'column',
      overflow: 'hidden' }}>
      <AppHeader title="Gate Request" back/>
      <div style={{ flex: 1, padding: '8px', overflow: 'hidden', display: 'flex',
        flexDirection: 'column', gap: 7 }}>
        {/* Visitor card */}
        <div style={{ background: A.surface, borderRadius: 10, border: `1px solid ${A.border}`,
          padding: '12px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 42, height: 42, borderRadius: 21, background: A.indigoBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: A.primary }}>
            R
          </div>
          <div style={{ textAlign: 'center' as const }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: A.text }}>Rohit Sharma</div>
            <div style={{ fontSize: 7.5, color: A.subtle, marginTop: 2 }}>Wants to visit · Your flat</div>
          </div>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <Pill text="GUEST" bg={A.indigoBg} color={A.primary}/>
            <span style={{ fontSize: 7, color: A.subtle }}>Just now</span>
          </div>
        </div>
        {/* Gate details */}
        <div style={{ background: A.surface, borderRadius: 8, border: `1px solid ${A.border}`,
          padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { label: 'Gate',       value: 'Main Gate' },
            { label: 'Logged by',  value: 'Raju (Guard)' },
            { label: 'Arrived at', value: '6:42 PM' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 7, color: A.subtle }}>{label}</span>
              <span style={{ fontSize: 7.5, fontWeight: 600, color: A.text }}>{value}</span>
            </div>
          ))}
        </div>
        {/* Allow / Deny */}
        <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
          <div style={{ flex: 1, background: A.resolvedBg, border: `1px solid #bbf7d0`,
            borderRadius: 8, padding: '8px 0', textAlign: 'center' as const }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: A.resolvedText }}>✓  Allow</div>
          </div>
          <div style={{ flex: 1, background: A.rejectedBg, border: `1px solid #fecaca`,
            borderRadius: 8, padding: '8px 0', textAlign: 'center' as const }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: A.rejectedText }}>✕  Deny</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Announcement screens ──────────────────────────────────────────────────────

function AdminAnnouncementsScreen() {
  return (
    <div style={{ background: A.bg, height: '100%', display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative' }}>
      <AppHeader title="Announcements" back/>
      {/* Category chips */}
      <div style={{ display: 'flex', gap: 4, padding: '5px 8px', background: A.surface,
        borderBottom: `1px solid ${A.border}`, flexShrink: 0 }}>
        {['All', 'Emergency', 'Meeting', 'Maintenance'].map((chip, i) => (
          <span key={chip} style={{ fontSize: 7, fontWeight: 600, padding: '3px 6px', borderRadius: 10,
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
        <AnnouncementRow
          cat="EMERGENCY"
          title="Borewell maintenance — Sat 8–12 PM"
          body="Water supply suspended Saturday. Store water before 8 AM."
          author="Admin" time="2h ago" pinned
        />
        <AnnouncementRow
          cat="MEETING"
          title="AGM — 15 June, Clubhouse"
          body="Annual general meeting to discuss FY 2026–27 maintenance budget."
          author="Sec." time="1d ago"
        />
        <AnnouncementRow
          cat="MAINTENANCE"
          title="DG set maintenance — 14 June"
          body="Generator maintenance on Sunday. Power backup unavailable 10–11 AM."
          author="Admin" time="2d ago"
        />
      </div>
      {/* FAB */}
      <div style={{ position: 'absolute', bottom: 10, right: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 14, background: A.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 3px 8px rgba(0,0,0,0.22)' }}><Plus size={14} color="#fff" strokeWidth={2.5}/></div>
      </div>
    </div>
  )
}

function ResidentAnnouncementsScreen() {
  return (
    <div style={{ background: A.bg, height: '100%', display: 'flex', flexDirection: 'column',
      overflow: 'hidden' }}>
      <AppHeader title="Announcements" back/>
      {/* Pinned emergency banner */}
      <div style={{ margin: '6px 8px', borderRadius: 8, background: ANN.EMERGENCY.bg,
        border: `1px solid #fecaca`, padding: '6px 8px', display: 'flex', gap: 6,
        alignItems: 'flex-start', flexShrink: 0 }}>
        <AlertTriangle size={12} color={ANN.EMERGENCY.text} strokeWidth={2}/>
        <div>
          <div style={{ fontSize: 8, fontWeight: 700, color: ANN.EMERGENCY.text }}>Borewell maintenance — Sat 8–12 PM</div>
          <div style={{ fontSize: 7, color: '#ef4444', marginTop: 1 }}>Emergency · Pinned by Admin</div>
        </div>
      </div>
      {/* List */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <AnnouncementRow
          cat="MEETING"
          title="AGM — 15 June, Clubhouse"
          body="Annual general meeting to discuss FY 2026–27 maintenance budget."
          author="Sec." time="1d ago"
        />
        <AnnouncementRow
          cat="MAINTENANCE"
          title="DG set maintenance — 14 June"
          body="Generator maintenance on Sunday. Power backup unavailable 10–11 AM."
          author="Admin" time="2d ago"
        />
        <AnnouncementRow
          cat="CELEBRATION"
          title="Ganesh Chaturthi — 27 Aug"
          body="Society celebration at the clubhouse. All residents and families welcome!"
          author="RWA" time="4d ago"
        />
      </div>
    </div>
  )
}

// ── Unit Assignment screens ───────────────────────────────────────────────────

function BuilderAssignScreen() {
  const units = [
    { num: '101', status: 'OWNER',  name: 'M. Verma' },
    { num: '102', status: 'TENANT', name: 'R. Shah' },
    { num: '103', status: 'VACANT', name: '' },
    { num: '104', status: 'OWNER',  name: 'D. Nair' },
    { num: '201', status: 'TENANT', name: 'P. Singh' },
    { num: '202', status: 'VACANT', name: '' },
    { num: '203', status: 'OWNER',  name: 'K. Rao' },
    { num: '204', status: 'VACANT', name: '' },
  ]
  const STATUS: Record<string, { bg: string; text: string; label: string }> = {
    OWNER:  { bg: '#dcfce7', text: '#166534', label: 'Owner' },
    TENANT: { bg: '#eff6ff', text: '#2563eb', label: 'Tenant' },
    VACANT: { bg: '#f1f5f9', text: '#94a3b8', label: 'Vacant' },
  }
  return (
    <div style={{ background: A.bg, height: '100%', display: 'flex', flexDirection: 'column',
      overflow: 'hidden' }}>
      <AppHeader title="Assign Unit" back/>
      {/* Floor tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${A.border}`, background: A.surface,
        flexShrink: 0 }}>
        {['G', '1', '2', '3'].map((floor, i) => (
          <div key={floor} style={{ flex: 1, padding: '6px 0', textAlign: 'center' as const,
            fontSize: 8, fontWeight: 700,
            color: i === 1 ? A.primary : A.subtle,
            borderBottom: `2px solid ${i === 1 ? A.primary : 'transparent'}` }}>
            {floor === 'G' ? 'GF' : `F${floor}`}
          </div>
        ))}
      </div>
      {/* Unit grid */}
      <div style={{ padding: '8px', display: 'flex', flexWrap: 'wrap' as const, gap: 5, flexShrink: 0 }}>
        {units.map(u => {
          const s = STATUS[u.status]
          const selected = u.num === '202'
          return (
            <div key={u.num} style={{ width: 37, borderRadius: 7, padding: '6px 4px',
              textAlign: 'center' as const,
              background: selected ? A.primary : s.bg,
              border: `1.5px solid ${selected ? A.primary : A.border}`,
              boxShadow: selected ? '0 2px 8px rgba(47,62,78,0.25)' : 'none' }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: selected ? '#fff' : A.text }}>{u.num}</div>
              <div style={{ fontSize: 7, marginTop: 1.5, fontWeight: 600,
                color: selected ? 'rgba(255,255,255,0.7)' : s.text }}>
                {selected ? 'Selected' : s.label}
              </div>
            </div>
          )
        })}
      </div>
      {/* Assign panel */}
      <div style={{ margin: '0 8px', background: A.surface, borderRadius: 10,
        border: `1.5px solid ${A.border}`, padding: '8px', display: 'flex',
        flexDirection: 'column', gap: 5 }}>
        <div style={{ fontSize: 8.5, fontWeight: 700, color: A.text }}>Assign 202 · Floor 2</div>
        <div style={{ background: A.bg, borderRadius: 6, border: `1px solid ${A.border}`,
          padding: '5px 7px', display: 'flex', gap: 4 }}>
          <span style={{ fontSize: 7, color: A.subtle }}>+91</span>
          <span style={{ fontSize: 7.5, color: A.text }}>98765 43210</span>
        </div>
        <div style={{ background: A.bg, borderRadius: 6, border: `1px solid ${A.border}`,
          padding: '5px 7px' }}>
          <span style={{ fontSize: 7.5, color: A.text }}>Priya Mehta</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['Owner', 'Tenant', 'Owner (rented)'].map((t, i) => (
            <span key={t} style={{ fontSize: 6.5, padding: '2px 5px', borderRadius: 5,
              background: i === 0 ? A.primary : A.bg,
              color: i === 0 ? '#fff' : A.subtle,
              border: `1px solid ${i === 0 ? A.primary : A.border}`,
              fontWeight: 600, whiteSpace: 'nowrap' }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ background: A.primary, borderRadius: 7, padding: '6px 0',
          textAlign: 'center' as const }}>
          <span style={{ fontSize: 8.5, fontWeight: 700, color: '#fff' }}>Send Invite</span>
        </div>
      </div>
    </div>
  )
}

function ResidentUnitScreen() {
  return (
    <div style={{ background: A.bg, height: '100%', display: 'flex', flexDirection: 'column',
      overflow: 'hidden' }}>
      <AppHeader title="My Home" back/>
      <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: 7,
        overflow: 'hidden' }}>
        {/* Unit hero card */}
        <div style={{ background: A.primary, borderRadius: 12, padding: '12px 12px 10px',
          display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 7, fontWeight: 600, color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase' as const, letterSpacing: '0.6px' }}>Tower A · Floor 2</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', lineHeight: 1 }}>A-202</div>
          <div style={{ display: 'flex', gap: 5, marginTop: 2 }}>
            <span style={{ fontSize: 7, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
              background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}>Owner</span>
            <span style={{ fontSize: 7, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
              background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}>Resident</span>
          </div>
        </div>
        {/* Members in this unit */}
        <div>
          <div style={{ fontSize: 7, fontWeight: 700, color: A.subtle, letterSpacing: '0.5px',
            textTransform: 'uppercase' as const, marginBottom: 5 }}>Members in this unit</div>
          <div style={{ background: A.surface, borderRadius: 9, border: `1px solid ${A.border}`,
            overflow: 'hidden' }}>
            {[
              { name: 'Priya Mehta', role: 'Owner · Primary', initial: 'P' },
              { name: 'Arjun Mehta', role: 'Co-resident',     initial: 'A' },
            ].map(({ name, role, initial }, i, arr) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 7,
                padding: '7px 8px',
                borderBottom: i < arr.length - 1 ? `1px solid ${A.border}` : 'none' }}>
                <div style={{ width: 26, height: 26, borderRadius: 13, background: A.indigoBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: A.primary, flexShrink: 0 }}>
                  {initial}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 8.5, fontWeight: 600, color: A.text }}>{name}</div>
                  <div style={{ fontSize: 7, color: A.subtle, marginTop: 1 }}>{role}</div>
                </div>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: '#22c55e' }}/>
              </div>
            ))}
          </div>
        </div>
        {/* Member since */}
        <div style={{ background: A.surface, borderRadius: 8, border: `1px solid ${A.border}`,
          padding: '6px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 7, color: A.subtle }}>Member since</span>
          <span style={{ fontSize: 7.5, fontWeight: 600, color: A.text }}>2 Jun 2026</span>
        </div>
      </div>
    </div>
  )
}

// ── Tab bar ───────────────────────────────────────────────────────────────────
function IconHome({ active }: { active: boolean }) {
  const c = active ? A.primary : '#94a3b8'
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: 'block' }}>
      <path d="M6 1.2L11 5.8V11H8V7.5H4V11H1V5.8L6 1.2Z"
        stroke={c} strokeWidth="1" strokeLinejoin="round"
        fill={active ? c : 'none'} fillOpacity={active ? 0.14 : 0}/>
    </svg>
  )
}
function IconComplaints({ active }: { active: boolean }) {
  const c = active ? A.primary : '#94a3b8'
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: 'block' }}>
      <path d="M1.5 1.5h9a.75.75 0 01.75.75V7.5a.75.75 0 01-.75.75H4.8L1.5 10.5V2.25a.75.75 0 010-.75z"
        stroke={c} strokeWidth="1" strokeLinejoin="round"/>
      <line x1="6" y1="3.8" x2="6" y2="5.8" stroke={c} strokeWidth="1" strokeLinecap="round"/>
      <circle cx="6" cy="7" r="0.5" fill={c}/>
    </svg>
  )
}
function IconVisitors({ active }: { active: boolean }) {
  const c = active ? A.primary : '#94a3b8'
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: 'block' }}>
      <circle cx="6" cy="4" r="2.2" stroke={c} strokeWidth="1"/>
      <path d="M1.5 11c0-2.49 2.01-4.5 4.5-4.5s4.5 2.01 4.5 4.5"
        stroke={c} strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}
function IconUpdates({ active }: { active: boolean }) {
  const c = active ? A.primary : '#94a3b8'
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: 'block' }}>
      <path d="M6 1.5a3 3 0 013 3V7.5l1 1.5H2L3 7.5V4.5a3 3 0 013-3z"
        stroke={c} strokeWidth="1" strokeLinejoin="round"/>
      <path d="M4.8 10a1.2 1.2 0 002.4 0"
        stroke={c} strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}
function IconProfile({ active }: { active: boolean }) {
  const c = active ? A.primary : '#94a3b8'
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: 'block' }}>
      <circle cx="6" cy="4.5" r="2" stroke={c} strokeWidth="1"/>
      <path d="M2 11c.5-2.2 2.2-3.5 4-3.5s3.5 1.3 4 3.5"
        stroke={c} strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

const TAB_ITEMS = [
  { label: 'Home',       Icon: IconHome },
  { label: 'Complaints', Icon: IconComplaints },
  { label: 'Visitors',   Icon: IconVisitors },
  { label: 'Updates',    Icon: IconUpdates },
  { label: 'Profile',    Icon: IconProfile },
]

function TabBar({ activeIdx }: { activeIdx: number }) {
  return (
    <div style={{
      position: 'absolute', bottom: HI_H, left: 0, right: 0, height: TAB_H,
      background: A.surface, borderTop: `1px solid ${A.border}`,
      display: 'flex', alignItems: 'center', zIndex: 9,
      paddingLeft: 14, paddingRight: 14,
    }}>
      {TAB_ITEMS.map(({ label, Icon }, i) => {
        const active = i === activeIdx
        return (
          <div key={label} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 2,
          }}>
            <Icon active={active}/>
            <span style={{
              fontSize: 5.5, fontWeight: active ? 600 : 400,
              color: active ? A.primary : '#94a3b8', letterSpacing: '0.01em',
            }}>{label}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Dual phone component ──────────────────────────────────────────────────────
function DualPhone({ a, b, staggerDelay = 0 }: {
  a: { screen: React.ReactNode; label: string; activeTab: number }
  b: { screen: React.ReactNode; label: string; activeTab: number }
  staggerDelay?: number
}) {
  const [active, setActive] = useState(0)
  const time = useTime()
  const isA = active === 0

  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null)
  const hoveredRef   = useRef(false)
  const inViewRef    = useRef(false)

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }, [])

  const startTimer = useCallback(() => {
    stopTimer()
    timerRef.current = setInterval(() => {
      if (inViewRef.current && !hoveredRef.current)
        setActive(prev => prev === 0 ? 1 : 0)
    }, 3500)
  }, [stopTimer])

  // Viewport observer — only run when visible, with staggered start
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let staggerT: ReturnType<typeof setTimeout> | null = null
    const obs = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting
      if (entry.isIntersecting) {
        staggerT = setTimeout(startTimer, staggerDelay)
      } else {
        if (staggerT) { clearTimeout(staggerT); staggerT = null }
        stopTimer()
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => { obs.disconnect(); stopTimer(); if (staggerT) clearTimeout(staggerT) }
  }, [staggerDelay, startTimer, stopTimer])

  // Manual switch resets the auto-timer so next auto-switch is 3.5s away
  const handleSwitch = useCallback((idx: number) => {
    setActive(idx)
    if (inViewRef.current && !hoveredRef.current) startTimer()
  }, [startTimer])

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
    isActive: boolean, onClick: () => void, activeTab: number,
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
      {/* Silent toggle, Vol ↑, Vol ↓ — left rail */}
      {([
        [h * 0.20, h * 0.05],
        [h * 0.28, h * 0.12],
        [h * 0.42, h * 0.12],
      ] as [number, number][]).map(([t, ht], i) => (
        <div key={i} style={{
          position: 'absolute', left: -3, top: t, width: 3, height: ht,
          borderRadius: '2px 0 0 2px',
          background: 'linear-gradient(90deg, #1e3045 0%, #0f1e2e 100%)',
          boxShadow: '-1px 0 3px rgba(0,0,0,0.6)',
        }}/>
      ))}
      {/* Power — right rail */}
      <div style={{
        position: 'absolute', right: -3, top: h * 0.30, width: 3, height: h * 0.18,
        borderRadius: '0 2px 2px 0',
        background: 'linear-gradient(270deg, #1e3045 0%, #0f1e2e 100%)',
        boxShadow: '1px 0 3px rgba(0,0,0,0.6)',
      }}/>
      <div style={{
        width: '100%', height: h,
        borderRadius: isActive ? 22 : 16,
        border: `1.5px solid rgba(255,255,255,${isActive ? 0.11 : 0.06})`,
        boxShadow: isActive
          ? '0 20px 56px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.4), inset 0 0 0 1.5px rgba(0,0,0,0.9)'
          : '0 6px 20px rgba(0,0,0,0.4), inset 0 0 0 1.5px rgba(0,0,0,0.9)',
        background: 'linear-gradient(160deg, #141f2e 0%, #08101a 30%, #08101a 70%, #0c1820 100%)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'height 0.45s cubic-bezier(0.4,0,0.2,1), border-radius 0.45s ease, box-shadow 0.45s ease',
      }}>
        {/* Display glass — full panel, all app content lives here */}
        <div style={{
          position: 'absolute', top: 3, bottom: 3, left: 2, right: 2,
          overflow: 'hidden',
          borderRadius: isActive ? 18 : 13,
          transition: 'border-radius 0.45s ease',
        }}>
          {/* Status bar — absolute layout, pill pixel-perfect centered */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: SB_H,
            background: A.bg, zIndex: 10 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 7, fontWeight: 600, color: A.text,
              letterSpacing: '0.01em', lineHeight: 1 }}>
              {time}
            </span>
            <div style={{ position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)' }}>
              <div style={{ width: 58, height: 16, background: '#000', borderRadius: 12,
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}/>
            </div>
            <div style={{ position: 'absolute', right: 8, top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex', alignItems: 'center', gap: 3.5 }}>
              <WifiIcon/>
              <BatteryIcon/>
            </div>
          </div>
          {/* Screen content */}
          <div style={{ position: 'absolute', top: SB_H, bottom: TAB_H + HI_H, left: 0, right: 0, overflow: 'hidden' }}>
            {screen}
          </div>
          {/* Tab bar */}
          <TabBar activeIdx={activeTab}/>
          {/* Home indicator — app surface, iOS-style pill */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: HI_H,
            background: A.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 36, height: 3, background: 'rgba(15,23,42,0.18)', borderRadius: 2 }}/>
          </div>
        </div>
        {/* Glass sheen — chassis layer, pointer-events off */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 20, pointerEvents: 'none',
          background: 'linear-gradient(155deg, rgba(255,255,255,0.05) 0%, transparent 35%)',
        }}/>
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
    <div
      ref={containerRef}
      onMouseEnter={() => { hoveredRef.current = true;  stopTimer() }}
      onMouseLeave={() => { hoveredRef.current = false; if (inViewRef.current) startTimer() }}
      style={{ position: 'relative', width: CW, height: CH, flexShrink: 0 }}
    >
      {phone(a.screen, a.label, aLeft, aTop, aW, aH, isA,  () => handleSwitch(0), a.activeTab)}
      {phone(b.screen, b.label, bLeft, bTop, bW, bH, !isA, () => handleSwitch(1), b.activeTab)}
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
      <div className="feat-row-wrap"><div className="feat-row">
        <div className="feat-row-img">
          <DualPhone
            a={{ screen: <ComplaintsListScreen/>, label: 'Resident', activeTab: 1 }}
            b={{ screen: <ComplaintDetailScreen/>, label: 'Admin',    activeTab: 1 }}
            staggerDelay={0}
          />
        </div>
        <FeatText
          eyebrow="Complaints"
          title="Raise a complaint."
          em="Know it's heard."
          body="Residents raise complaints with photos and a category. Admins are notified instantly. Status updates keep everyone in the loop. Nothing gets lost in a WhatsApp group."
          pills={['19 categories', 'Photo evidence', 'Public or private', 'Real-time status']}
        />
      </div></div>

      {/* 2 — Visitors */}
      <div className="feat-row-wrap"><div className="feat-row">
        <FeatText
          eyebrow="Visitor Management"
          title="Every visitor."
          em="Logged and approved."
          body="Gate staff log every visitor as they arrive. Residents get a notification and decide — allow or deny. Every entry tracked, every exit recorded. No register. No guesswork."
          pills={['Instant notifications', 'Allow or deny', 'Entry logged', 'Gate staff app']}
        />
        <div className="feat-row-img">
          <DualPhone
            a={{ screen: <GatekeeperScreen/>,       label: 'Gatekeeper', activeTab: 2 }}
            b={{ screen: <ResidentApprovalScreen/>, label: 'Resident',   activeTab: 2 }}
            staggerDelay={800}
          />
        </div>
      </div></div>

      {/* 3 — Announcements */}
      <div className="feat-row-wrap"><div className="feat-row">
        <div className="feat-row-img">
          <DualPhone
            a={{ screen: <AdminAnnouncementsScreen/>,    label: 'Admin',    activeTab: 3 }}
            b={{ screen: <ResidentAnnouncementsScreen/>, label: 'Resident', activeTab: 3 }}
            staggerDelay={1600}
          />
        </div>
        <FeatText
          eyebrow="Announcements"
          title="Say it once."
          em="Everyone hears it."
          body="Post an announcement and every resident gets notified instantly — society-wide or targeted to a specific tower or wing. No chaos. No missed updates."
          pills={['Society-wide or targeted', 'Push notifications', 'Scheduled posts', 'Read receipts']}
        />
      </div></div>

      {/* 4 — Unit Assignment */}
      <div className="feat-row-wrap"><div className="feat-row">
        <FeatText
          eyebrow="Unit Assignment"
          title="Assign a unit."
          em="Resident is home."
          body="Builder adds a phone number to a unit — optionally pre-fills the resident's details. The resident gets an invite, logs in, sees their unit already set up, and they're in."
          pills={['Phone number invite', 'Builder pre-fills details', 'Resident confirms on login', 'Instant access granted']}
        />
        <div className="feat-row-img">
          <DualPhone
            a={{ screen: <BuilderAssignScreen/>, label: 'Builder',  activeTab: 0 }}
            b={{ screen: <ResidentUnitScreen/>,  label: 'Resident', activeTab: 0 }}
            staggerDelay={2400}
          />
        </div>
      </div></div>

    </section>
  )
}
