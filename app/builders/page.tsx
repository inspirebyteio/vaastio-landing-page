import Link from 'next/link'

export default function BuildersPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#2F3E4E',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      fontFamily: 'Montserrat, sans-serif',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 520 }}>

        <div style={{
          fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'rgba(217,224,232,0.45)',
          marginBottom: 32, display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 14,
        }}>
          <span style={{ display: 'block', width: 36, height: 1, background: 'rgba(217,224,232,0.25)' }}/>
          For Builders
          <span style={{ display: 'block', width: 36, height: 1, background: 'rgba(217,224,232,0.25)' }}/>
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 700,
          lineHeight: 1.08, letterSpacing: '-0.02em',
          color: '#d9e0e8', marginBottom: 24,
        }}>
          Everything a builder<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(217,224,232,0.5)' }}>needs to know.</em>
        </h1>

        <p style={{
          fontSize: 15, fontWeight: 300, lineHeight: 1.85,
          color: 'rgba(217,224,232,0.42)', marginBottom: 48,
        }}>
          A detailed walkthrough of how Vaastio works for builders — structure setup, role management, resident onboarding, and handover. Coming soon.
        </p>

        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 11, fontWeight: 500, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'rgba(217,224,232,0.5)',
          textDecoration: 'none', borderBottom: '1px solid rgba(217,224,232,0.15)',
          paddingBottom: 2, transition: 'color 0.3s',
        }}>
          ← Back to home
        </Link>

      </div>
    </main>
  )
}
