import { ImageResponse } from 'next/og'

export const alt = 'Vaastio — Society Management Platform'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background: 'linear-gradient(135deg, #2F3E4E 0%, #243140 100%)',
          color: '#d9e0e8',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 14, textTransform: 'uppercase', opacity: 0.55 }}>
          Vaastio
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 28, letterSpacing: -2 }}>
          <div>Your society, managed</div>
          <div>the right way.</div>
        </div>
        <div style={{ fontSize: 30, opacity: 0.55, marginTop: 30 }}>
          Launch your society in 30 minutes.
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 70,
            right: 90,
            fontSize: 24,
            letterSpacing: 4,
            opacity: 0.4,
            textTransform: 'uppercase',
          }}
        >
          vaastio.com
        </div>
      </div>
    ),
    size,
  )
}
