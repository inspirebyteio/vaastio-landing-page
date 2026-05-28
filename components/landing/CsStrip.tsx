import { Fragment } from 'react'

interface CsStripProps {
  items: string[]
}

export default function CsStrip({ items }: CsStripProps) {
  return (
    <div className="cs-strip">
      {items.map((item, i) => (
        <Fragment key={item}>
          <div className="cs-strip-item">
            <div className="cs-strip-dot"></div>
            {item}
          </div>
          {i < items.length - 1 && <div className="cs-strip-sep"></div>}
        </Fragment>
      ))}
    </div>
  )
}
