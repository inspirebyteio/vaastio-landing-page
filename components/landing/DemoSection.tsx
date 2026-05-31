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

      {/* 1 — Complaints: image left, text right */}
      <div className="feat-row">
        <div className="feat-row-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://placehold.co/390x844/3A4B5C/d9e0e8?text=Complaints" alt="Complaints screen" />
        </div>
        <div className="feat-row-text">
          <div className="feat-row-eyebrow">Complaints</div>
          <h3 className="feat-row-h">Raise a complaint.<br /><em>Know it&apos;s heard.</em></h3>
          <p className="feat-row-body">
            Residents raise complaints with photos and a category. Admins are notified instantly.
            Status updates keep everyone informed. Nothing gets lost in a WhatsApp group.
          </p>
          <div className="feat-row-pills">
            <div className="feat-row-pill">19 categories</div>
            <div className="feat-row-pill">Photo evidence</div>
            <div className="feat-row-pill">Public or private</div>
            <div className="feat-row-pill">Real-time status</div>
          </div>
        </div>
      </div>

      {/* 2 — Visitors: text left, image right */}
      <div className="feat-row">
        <div className="feat-row-text">
          <div className="feat-row-eyebrow">Visitor Management</div>
          <h3 className="feat-row-h">Every visitor.<br /><em>Logged and approved.</em></h3>
          <p className="feat-row-body">
            Gate staff log every visitor as they arrive. Residents get a notification and decide —
            allow or deny. Every entry is tracked, every exit recorded. No register. No guesswork.
          </p>
          <div className="feat-row-pills">
            <div className="feat-row-pill">Instant notifications</div>
            <div className="feat-row-pill">Allow or deny</div>
            <div className="feat-row-pill">Entry logged</div>
            <div className="feat-row-pill">Gate staff app</div>
          </div>
        </div>
        <div className="feat-row-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://placehold.co/390x844/3A4B5C/d9e0e8?text=Visitors" alt="Visitor management screen" />
        </div>
      </div>

      {/* 3 — Announcements: image left, text right */}
      <div className="feat-row">
        <div className="feat-row-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://placehold.co/390x844/3A4B5C/d9e0e8?text=Announcements" alt="Announcements screen" />
        </div>
        <div className="feat-row-text">
          <div className="feat-row-eyebrow">Announcements</div>
          <h3 className="feat-row-h">Say it once.<br /><em>Everyone hears it.</em></h3>
          <p className="feat-row-body">
            Post an announcement and every resident gets notified instantly — society-wide or
            targeted to a specific tower or wing. No chaos. No missed updates.
          </p>
          <div className="feat-row-pills">
            <div className="feat-row-pill">Society-wide or targeted</div>
            <div className="feat-row-pill">Push notifications</div>
            <div className="feat-row-pill">Scheduled posts</div>
            <div className="feat-row-pill">Read receipts</div>
          </div>
        </div>
      </div>

      {/* 4 — Society Structure: text left, image right */}
      <div className="feat-row">
        <div className="feat-row-text">
          <div className="feat-row-eyebrow">Society Setup</div>
          <h3 className="feat-row-h">Build any structure.<br /><em>In minutes.</em></h3>
          <p className="feat-row-body">
            Add towers, wings, floors, and units — or villas, plots, independent floors. Whatever
            your layout, Vaastio maps it exactly. No workarounds. No templates.
          </p>
          <div className="feat-row-pills">
            <div className="feat-row-pill">Towers &amp; wings</div>
            <div className="feat-row-pill">Villa communities</div>
            <div className="feat-row-pill">Mixed layouts</div>
            <div className="feat-row-pill">Bulk add units</div>
          </div>
        </div>
        <div className="feat-row-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://placehold.co/390x844/3A4B5C/d9e0e8?text=Structure" alt="Society structure screen" />
        </div>
      </div>

    </section>
  )
}
