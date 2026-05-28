const items = [
  'Towers', 'Villas', 'Plotted Developments', 'Complaints',
  'Visitor Management', 'Announcements', 'Member Roles', 'Independent Floors',
]

export default function Marquee() {
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            {item} <span className="msep"></span>
          </span>
        ))}
      </div>
    </div>
  )
}
