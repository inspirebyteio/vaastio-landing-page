'use client'
import { useState, useEffect, useRef } from 'react'

export default function DemoSection() {
  const [activeTab, setActiveTab] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const hasAutoTriggered = useRef(false)

  function animateStructure() {
    const nodes = document.querySelectorAll('#s1-tree .s1-node')
    nodes.forEach(n => n.classList.remove('s1-show'))
    nodes.forEach((n, i) => {
      setTimeout(() => n.classList.add('s1-show'), i * 120)
    })
  }

  function animateComplaints() {
    const items = document.querySelectorAll('#s2-list .s2-item, #s2-list2 .s2-item')
    items.forEach(n => n.classList.remove('s2-show'))
    items.forEach((n, i) => {
      setTimeout(() => n.classList.add('s2-show'), i * 150)
    })
  }

  function animateMembers() {
    const rows = document.querySelectorAll('#s3-rows .s3-row')
    rows.forEach(r => r.classList.remove('s3-show'))
    rows.forEach((r, i) => {
      setTimeout(() => r.classList.add('s3-show'), i * 100)
    })
  }

  useEffect(() => {
    if (activeTab === 0) animateStructure()
    else if (activeTab === 1) animateComplaints()
    else if (activeTab === 2) animateMembers()
  }, [activeTab])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !hasAutoTriggered.current) {
          hasAutoTriggered.current = true
          setTimeout(animateStructure, 300)
          obs.disconnect()
        }
      })
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="demo-section light-section" id="demo" ref={sectionRef}>
      <div className="demo-header reveal">
        <div className="demo-label">See it in action</div>
        <h2 className="demo-title">Three features.<br />Built for real societies.</h2>
        <p className="demo-sub">
          Explore how Vaastio handles the moments that matter — from setup to daily management.
        </p>
      </div>
      <div className="demo-tabs">
        {['Society Structure', 'Complaints', 'Member Management'].map((tab, i) => (
          <button
            key={tab}
            className={`demo-tab${activeTab === i ? ' active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="demo-panels">

        {/* Panel 1 — Structure */}
        <div className={`demo-panel${activeTab === 0 ? ' active' : ''}`} id="panel-0">
          <div className="demo-text">
            <div className="dp-num">01</div>
            <h3 className="dp-title">Build any structure.<br />In minutes.</h3>
            <p className="dp-body">
              Add towers, wings, floors, and units — or villas, plots, independent floors. Whatever
              your layout, Vaastio maps it exactly. No workarounds. No templates.
            </p>
            <div className="dp-list">
              <div className="dp-item">Towers with wings and units</div>
              <div className="dp-item">Villa communities and plotted developments</div>
              <div className="dp-item">Mixed layouts — any combination</div>
              <div className="dp-item">Bulk add hundreds of units in seconds</div>
            </div>
          </div>
          <div className="demo-phone-wrap">
            <div className="demo-phone">
              <div className="dp-notch"><div className="dp-notch-inner"></div></div>
              <div className="dp-screen">
                <div className="s1-topbar">
                  <span className="s1-tb-title">Manage Structure</span>
                  <span style={{ fontSize: '18px', color: 'rgba(255,255,255,.7)' }}>+</span>
                </div>
                <div className="s1-tree" id="s1-tree">
                  <div className="s1-node s1-node-society"><span>🏘</span><span>Green Valley Society</span><span className="s1-tag s1-tag-s">Society</span></div>
                  <div className="s1-node s1-node-tower"><span>🏢</span><span>Tower A</span><span className="s1-tag s1-tag-t">Tower</span></div>
                  <div className="s1-node s1-node-wing"><span>▸</span><span>Wing 1</span><span className="s1-tag s1-tag-w">Wing</span></div>
                  <div className="s1-node s1-node-unit"><span>Flat 101</span><span className="s1-tag s1-tag-u">Unit</span></div>
                  <div className="s1-node s1-node-unit"><span>Flat 102</span><span className="s1-tag s1-tag-u">Unit</span></div>
                  <div className="s1-node s1-node-unit"><span>Flat 103</span><span className="s1-tag s1-tag-u">Unit</span></div>
                  <div className="s1-node s1-node-tower"><span>🏢</span><span>Tower B</span><span className="s1-tag s1-tag-t">Tower</span></div>
                  <div className="s1-node s1-node-wing"><span>▸</span><span>Wing A</span><span className="s1-tag s1-tag-w">Wing</span></div>
                  <div className="s1-node s1-node-unit"><span>Flat 201</span><span className="s1-tag s1-tag-u">Unit</span></div>
                </div>
              </div>
              <div className="dp-home"></div>
            </div>
          </div>
        </div>

        {/* Panel 2 — Complaints */}
        <div className={`demo-panel${activeTab === 1 ? ' active' : ''}`} id="panel-1">
          <div className="demo-text">
            <div className="dp-num">02</div>
            <h3 className="dp-title">Raise a complaint.<br />Know it&apos;s heard.</h3>
            <p className="dp-body">
              Residents raise complaints with photos and categories. Admins notified instantly.
              Status updates keep everyone informed. Nothing gets lost in a WhatsApp group.
            </p>
            <div className="dp-list">
              <div className="dp-item">19 categories — lift, water, parking, noise and more</div>
              <div className="dp-item">Photo evidence attached at creation</div>
              <div className="dp-item">Public or private visibility control</div>
              <div className="dp-item">Both resident and admin can mark resolved</div>
            </div>
          </div>
          <div className="demo-phone-wrap">
            <div className="demo-phone">
              <div className="dp-notch"><div className="dp-notch-inner"></div></div>
              <div className="dp-screen">
                <div className="s2-topbar">
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>Complaints</span>
                  <span style={{ fontSize: '18px', color: 'rgba(255,255,255,.7)' }}>+</span>
                </div>
                <div className="s2-chips">
                  <div className="s2-chip s2-chip-a">All</div>
                  <div className="s2-chip">Open</div>
                  <div className="s2-chip">Resolved</div>
                  <div className="s2-chip">Rejected</div>
                </div>
                <div className="s2-sec">MY COMPLAINTS</div>
                <div className="s2-list" id="s2-list">
                  <div className="s2-item">
                    <div className="s2-item-icon">⚡</div>
                    <div style={{ flex: 1 }}>
                      <div className="s2-item-title">Lift not working</div>
                      <div className="s2-item-meta">Lift/Elevator · 2 days ago</div>
                    </div>
                    <div className="s2-badge s2-open">Open</div>
                  </div>
                  <div className="s2-item">
                    <div className="s2-item-icon">💧</div>
                    <div style={{ flex: 1 }}>
                      <div className="s2-item-title">No water supply</div>
                      <div className="s2-item-meta">Water Supply · 5 days ago</div>
                    </div>
                    <div className="s2-badge s2-res">Resolved</div>
                  </div>
                </div>
                <div className="s2-sec" style={{ marginTop: '6px' }}>PUBLIC COMPLAINTS</div>
                <div className="s2-list" id="s2-list2">
                  <div className="s2-item">
                    <div className="s2-item-icon">🔊</div>
                    <div style={{ flex: 1 }}>
                      <div className="s2-item-title">Noise at night</div>
                      <div className="s2-item-meta">Noise · 1 day ago</div>
                    </div>
                    <div className="s2-badge s2-open">Open</div>
                  </div>
                  <div className="s2-item">
                    <div className="s2-item-icon">🚗</div>
                    <div style={{ flex: 1 }}>
                      <div className="s2-item-title">Parking blocked</div>
                      <div className="s2-item-meta">Parking · 3 days ago</div>
                    </div>
                    <div className="s2-badge s2-open">Open</div>
                  </div>
                </div>
                <div className="s2-fab"><div className="s2-fab-btn">+</div></div>
              </div>
              <div className="dp-home"></div>
            </div>
          </div>
        </div>

        {/* Panel 3 — Members */}
        <div className={`demo-panel${activeTab === 2 ? ' active' : ''}`} id="panel-2">
          <div className="demo-text">
            <div className="dp-num">03</div>
            <h3 className="dp-title">Members that reflect<br />real life.</h3>
            <p className="dp-body">
              Full member profiles linked to units. Deactivate, move out, reactivate. Every action
              tracked. Every change recorded. Always accurate, always up to date.
            </p>
            <div className="dp-list">
              <div className="dp-item">Owners, tenants, co-residents, staff</div>
              <div className="dp-item">Linked to specific units with occupancy type</div>
              <div className="dp-item">Full history — who lived where, when</div>
              <div className="dp-item">Deactivate access without deleting records</div>
            </div>
          </div>
          <div className="demo-phone-wrap">
            <div className="demo-phone">
              <div className="dp-notch"><div className="dp-notch-inner"></div></div>
              <div className="dp-screen">
                <div className="s3-topbar"><div className="s3-tb-title">← Members</div></div>
                <div className="s3-card">
                  <div className="s3-av">AM</div>
                  <div className="s3-name">Arjun Mehta</div>
                  <div className="s3-pill">Resident</div>
                </div>
                <div className="s3-rows" id="s3-rows">
                  <div className="s3-row"><span className="s3-rl">Phone</span><span className="s3-rv">+91 92222 22222</span></div>
                  <div className="s3-row"><span className="s3-rl">Unit</span><span className="s3-rv">Flat 4B · Owner</span></div>
                  <div className="s3-row"><span className="s3-rl">Joined</span><span className="s3-rv">15 Jan 2025</span></div>
                  <div className="s3-row"><span className="s3-rl">Invited by</span><span className="s3-rv">Vikram Builder</span></div>
                </div>
                <div className="s2-sec">OCCUPANCY HISTORY</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', margin: '0 14px', background: 'white', borderRadius: '5px' }}>
                  <div>
                    <div style={{ fontSize: '9px', fontWeight: 600, color: 'var(--ink)' }}>Flat 4B</div>
                    <div style={{ fontSize: '8px', color: 'rgba(47,62,78,.4)' }}>Owner · Resident</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '8px', color: 'rgba(47,62,78,.4)' }}>Jan 2025</div>
                    <div style={{ fontSize: '8px', color: '#059669', fontWeight: 600 }}>Current</div>
                  </div>
                </div>
                <div className="s3-actions">
                  <div className="s3-btn s3-deact">Remove Access</div>
                  <div className="s3-btn s3-move">Mark Moved Out</div>
                </div>
              </div>
              <div className="dp-home"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
