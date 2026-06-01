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

// ── Announcement category colours ─────────────────────────────────────────────
const ANN: Record<string, { bg: string; text: string; icon: string }> = {
  GENERAL:     { bg: '#f3f4f6', text: '#6b7280', icon: '📢' },
  MAINTENANCE: { bg: '#fff7ed', text: '#ea580c', icon: '🔧' },
  MEETING:     { bg: '#eff6ff', text: '#2563eb', icon: '👥' },
  EMERGENCY:   { bg: '#fef2f2', text: '#dc2626', icon: '⚠️' },
  CELEBRATION: { bg: '#faf5ff', text: '#9333ea', icon: '🎉' },
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

// ── Row helpers ───────────────────────────────────────────────────────────────

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

function VisitorRow({ initial, name, flat, type, status, statusBg, statusColor }: {
  initial: string; name: string; flat: string; type: string
  status: string; statusBg: string; statusColor: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px',
      background: A.surface, borderBottom: `1px solid ${A.border}` }}>
      <div style={{ width: 24, height: 24, borderRadius: 12, background: '#e2e8f0', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 9, fontWeight: 700, color: A.subtle }}>
        {initial}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 8.5, fontWeight: 600, color: A.text,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        <div style={{ fontSize: 7, color: A.subtle, marginTop: 1 }}>{flat} · {type}</div>
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
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, padding: '6px 8px',
      background: A.surface, borderBottom: `1px solid ${A.border}` }}>
      <div style={{ width: 26, height: 26, borderRadius: 7, background: c.bg, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
        {c.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 1 }}>
          <div style={{ fontSize: 8.5, fontWeight: 700, color: A.text, flex: 1,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
          {pinned && <span style={{ fontSize: 8 }}>📌</span>}
        </div>
        <div style={{ fontSize: 7, color: A.subtle, lineHeight: 1.45, marginBottom: 3,
          overflow: 'hidden', maxHeight: 20 }}>{body}</div>
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
        <ComplaintRow icon="⚡" title="Lift not working"   meta="Lift · 2d ago"    status="Open"     statusBg={A.openBg}     statusColor={A.openText}/>
        <ComplaintRow icon="💧" title="No water supply"    meta="Water · 5d ago"   status="Resolved" statusBg={A.resolvedBg} statusColor={A.resolvedText}/>
        <div style={{ padding: '5px 8px 3px', fontSize: 7, fontWeight: 700, color: A.subtle,
          letterSpacing: '0.5px', textTransform: 'uppercase' as const }}>Public Complaints</div>
        <ComplaintRow icon="🔊" title="Noise at night"     meta="Noise · 1d ago"   status="Open"     statusBg={A.openBg}     statusColor={A.openText}/>
        <ComplaintRow icon="🚗" title="Parking blocked"    meta="Parking · 3d ago" status="Open"     statusBg={A.openBg}     statusColor={A.openText}/>
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

// ── Visitor screens ───────────────────────────────────────────────────────────

function GatekeeperScreen() {
  return (
    <div style={{ background: A.bg, height: '100%', display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative' }}>
      <AppHeader title="Visitor Log"/>
      {/* Date + summary bar */}
      <div style={{ padding: '4px 8px', background: A.surface, borderBottom: `1px solid ${A.border}`,
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
        <VisitorRow initial="R" name="Ram Sharma"         flat="B-401" type="Guest"    status="PENDING" statusBg={A.openBg}     statusColor={A.openText}/>
        <VisitorRow initial="D" name="Delivery · Amazon"  flat="A-203" type="Delivery" status="ALLOWED" statusBg={A.resolvedBg} statusColor={A.resolvedText}/>
        <VisitorRow initial="K" name="Kavita Patel"       flat="C-105" type="Guest"    status="PENDING" statusBg={A.openBg}     statusColor={A.openText}/>
        <VisitorRow initial="E" name="Electrician"        flat="A-304" type="Service"  status="ALLOWED" statusBg={A.resolvedBg} statusColor={A.resolvedText}/>
        <VisitorRow initial="?" name="Unknown Person"     flat="B-201" type="—"        status="DENIED"  statusBg={A.rejectedBg} statusColor={A.rejectedText}/>
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
            <div style={{ fontSize: 11, fontWeight: 700, color: A.text }}>Ram Sharma</div>
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
            { label: 'Logged by',  value: 'Suresh (Guard)' },
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
      <AppHeader title="Announcements"/>
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
          title="Water supply off — Sat 8–12 AM"
          body="Society-wide shutdown for tank cleaning. Please store water in advance."
          author="Admin" time="2h ago" pinned
        />
        <AnnouncementRow
          cat="MEETING"
          title="AGM — 15 June, Block A Hall"
          body="Annual General Meeting to discuss society budget and maintenance."
          author="Sec." time="1d ago"
        />
        <AnnouncementRow
          cat="MAINTENANCE"
          title="Lift maintenance — Tower B"
          body="Lift B2 under maintenance on Friday. Please use B1 or the stairs."
          author="Admin" time="2d ago"
        />
        <AnnouncementRow
          cat="GENERAL"
          title="Welcome, new residents!"
          body="Collect your welcome kit from the society office before 31 Jun."
          author="Admin" time="5d ago"
        />
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

function ResidentAnnouncementsScreen() {
  return (
    <div style={{ background: A.bg, height: '100%', display: 'flex', flexDirection: 'column',
      overflow: 'hidden' }}>
      <AppHeader title="Announcements" back/>
      {/* Pinned emergency banner */}
      <div style={{ margin: '6px 8px', borderRadius: 8, background: ANN.EMERGENCY.bg,
        border: `1px solid #fecaca`, padding: '6px 8px', display: 'flex', gap: 6,
        alignItems: 'flex-start', flexShrink: 0 }}>
        <span style={{ fontSize: 12 }}>⚠️</span>
        <div>
          <div style={{ fontSize: 8, fontWeight: 700, color: ANN.EMERGENCY.text }}>Water off — Sat 8–12 AM</div>
          <div style={{ fontSize: 7, color: '#ef4444', marginTop: 1 }}>Emergency · Pinned by Admin</div>
        </div>
      </div>
      {/* List */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <AnnouncementRow
          cat="MEETING"
          title="AGM — 15 June, Block A Hall"
          body="Annual General Meeting to discuss society budget and maintenance plans."
          author="Sec." time="1d ago"
        />
        <AnnouncementRow
          cat="MAINTENANCE"
          title="Lift maintenance — Tower B"
          body="Lift B2 under maintenance on Friday. Please use B1 or stairs."
          author="Admin" time="2d ago"
        />
        <AnnouncementRow
          cat="CELEBRATION"
          title="Diwali celebration — Oct 20"
          body="Society Diwali event at the club house. All residents welcome!"
          author="RWA" time="4d ago"
        />
        <AnnouncementRow
          cat="GENERAL"
          title="Welcome, new residents!"
          body="Collect your welcome kit from the office before 31 Jun."
          author="Admin" time="5d ago"
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
            <div key={u.num} style={{ width: 37, borderRadius: 7, padding: '5px 4px',
              textAlign: 'center' as const,
              background: selected ? A.primary : s.bg,
              border: `1.5px solid ${selected ? A.primary : A.border}`,
              boxShadow: selected ? '0 2px 8px rgba(47,62,78,0.25)' : 'none' }}>
              <div style={{ fontSize: 8.5, fontWeight: 700, color: selected ? '#fff' : A.text }}>{u.num}</div>
              <div style={{ fontSize: 6, marginTop: 1, fontWeight: 600,
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
            a={{ screen: <GatekeeperScreen/>,      label: 'Gatekeeper' }}
            b={{ screen: <ResidentApprovalScreen/>, label: 'Resident' }}
          />
        </div>
      </div>

      {/* 3 — Announcements */}
      <div className="feat-row">
        <div className="feat-row-img">
          <DualPhone
            a={{ screen: <AdminAnnouncementsScreen/>,    label: 'Admin' }}
            b={{ screen: <ResidentAnnouncementsScreen/>, label: 'Resident' }}
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
            a={{ screen: <BuilderAssignScreen/>, label: 'Builder' }}
            b={{ screen: <ResidentUnitScreen/>,  label: 'Resident' }}
          />
        </div>
      </div>

    </section>
  )
}
