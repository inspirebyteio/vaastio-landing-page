import Link from 'next/link'

const sections = [
  {
    title: '1. Who We Are',
    body: `Vaastio is a society management platform built and operated by Inspirebyte, a software company based in Dehradun, Uttarakhand, India. This policy explains how we collect, use, and protect your personal information when you use the Vaastio mobile application or visit this website (vaastio.com).`,
  },
  {
    title: '2. Information We Collect',
    subsections: [
      {
        heading: 'Information you provide:',
        items: [
          'Your mobile phone number (used for login via OTP)',
          'Your full name',
          'Your profile photo (optional)',
          'Society and unit details entered by you or your society admin',
        ],
      },
      {
        heading: 'Information collected automatically:',
        items: [
          'Device token for push notifications',
          'App usage logs for debugging and performance',
          'Timestamps of actions (entries, complaints, announcements)',
        ],
      },
      {
        heading: 'Information collected by your society:',
        items: [
          'Visitor details logged at your gate',
          'Complaints raised by or about your unit',
          'Occupancy and ownership records for your unit',
        ],
      },
      {
        heading: 'Information collected on this website:',
        items: [
          'If you submit an early access request via our form (powered by Tally.so), we collect the information you provide in that form',
          'This website uses Vercel Analytics for anonymous, aggregate traffic insights — no cookies are set, and no personally identifiable data is collected',
        ],
      },
    ],
  },
  {
    title: '3. How We Use Your Information',
    body: `We use your information solely to:`,
    items: [
      'Authenticate you via OTP login',
      'Send you push notifications about visitors, complaints, and announcements relevant to your society',
      'Allow your society admin and gatekeeper to manage society operations',
      'Maintain a complete and accurate record of society activity',
      'Process early access requests submitted on this website',
    ],
    footer: `We do not use your information for advertising. We do not build profiles for marketing. We do not sell your data to any third party.`,
  },
  {
    title: '4. Who Can See Your Information',
    subsections: [
      {
        heading: 'Within your society:',
        items: [
          'Your name and unit are visible to your society\'s Admin and Builder',
          'Your phone number is visible to Admin and Builder for management purposes',
          'Your name is visible to other members in shared contexts (visitor approvals, complaints)',
          'Gatekeepers can see your name when processing visitor entries for your unit',
        ],
      },
      {
        heading: 'Outside your society:',
        items: [
          'Your information is never shared with other societies on Vaastio',
          'Your information is never sold, rented, or shared with advertisers',
          'We may share data with service providers who help us operate (Cloudinary for photo storage, Expo for push notifications) under strict confidentiality agreements',
        ],
      },
    ],
  },
  {
    title: '5. Data Storage and Security',
    items: [
      'Your data is stored in a secure PostgreSQL database hosted on Neon (Singapore region)',
      'All data is transmitted over HTTPS',
      'Passwords are not used — authentication is OTP only',
      'Login sessions use JWT tokens that expire and can be revoked',
      'We follow industry-standard security practices',
    ],
  },
  {
    title: '6. Photos and Media',
    body: `Photos you upload (profile photo, complaint photos, announcement images, visitor photos) are stored on Cloudinary. These photos are accessible only within your society context and are not publicly indexed.`,
  },
  {
    title: '7. Push Notifications',
    body: `We send push notifications to inform you about:`,
    items: [
      'Visitors waiting at your gate requiring approval',
      'Status updates on complaints you raised',
      'Announcements from your society admin',
      'Visitor approvals and denials relevant to you',
    ],
    footer: `You can disable push notifications from your phone settings at any time. Core app functionality will still work without notifications.`,
  },
  {
    title: '8. Data Retention',
    items: [
      'Your account data is retained as long as your account is active',
      'Society records (complaints, visitor logs, announcements) are retained permanently for audit and reference purposes',
      'If your membership in a society is deactivated, your historical records remain as part of the society\'s audit trail',
      'You may request deletion of your personal account by contacting us at info@vaastio.com',
    ],
  },
  {
    title: `9. Children's Privacy`,
    body: `Vaastio is intended for adults managing residential societies. We do not knowingly collect information from anyone under 18 years of age.`,
  },
  {
    title: '10. Changes To This Policy',
    body: `We may update this policy as the app evolves. We will notify active users of material changes via the app. Continued use of Vaastio after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '11. Contact Us',
    body: `For any privacy concerns or data requests:`,
    contact: true,
  },
]

export default function PrivacyPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#2F3E4E',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '80px 24px 120px',
      fontFamily: 'Montserrat, sans-serif',
    }}>
      <div style={{ width: '100%', maxWidth: 720 }}>

        {/* Back link */}
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 11, fontWeight: 500, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'rgba(217,224,232,0.4)',
          textDecoration: 'none', marginBottom: 64,
          borderBottom: '1px solid rgba(217,224,232,0.12)', paddingBottom: 2,
          transition: 'color 0.3s',
        }}>
          ← Back to home
        </Link>

        {/* Header */}
        <div style={{
          fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'rgba(217,224,232,0.35)',
          marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <span style={{ display: 'block', width: 36, height: 1, background: 'rgba(217,224,232,0.2)' }}/>
          Legal
          <span style={{ display: 'block', width: 36, height: 1, background: 'rgba(217,224,232,0.2)' }}/>
        </div>

        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700,
          lineHeight: 1.08, letterSpacing: '-0.02em',
          color: '#d9e0e8', marginBottom: 12,
        }}>
          Privacy Policy
        </h1>

        <p style={{
          fontSize: 13, fontWeight: 400,
          color: 'rgba(217,224,232,0.3)', marginBottom: 64,
          letterSpacing: '0.02em',
        }}>
          Last updated: June 2026
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(217,224,232,0.08)', marginBottom: 64 }} />

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
          {sections.map((section) => (
            <div key={section.title}>
              <h2 style={{
                fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
                color: '#d9e0e8', marginBottom: 16,
              }}>
                {section.title}
              </h2>

              {section.body && (
                <p style={{
                  fontSize: 14, fontWeight: 300, lineHeight: 1.85,
                  color: 'rgba(217,224,232,0.55)', marginBottom: section.items || section.subsections ? 16 : 0,
                }}>
                  {section.body}
                </p>
              )}

              {section.items && (
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {section.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ color: 'rgba(217,224,232,0.25)', fontSize: 14, marginTop: 1, flexShrink: 0 }}>—</span>
                      <span style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: 'rgba(217,224,232,0.55)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.footer && (
                <p style={{
                  fontSize: 14, fontWeight: 300, lineHeight: 1.85,
                  color: 'rgba(217,224,232,0.55)', marginTop: 16,
                }}>
                  {section.footer}
                </p>
              )}

              {section.subsections && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {section.subsections.map((sub) => (
                    <div key={sub.heading}>
                      <p style={{
                        fontSize: 12, fontWeight: 500, letterSpacing: '0.06em',
                        textTransform: 'uppercase', color: 'rgba(217,224,232,0.35)',
                        marginBottom: 12,
                      }}>
                        {sub.heading}
                      </p>
                      <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {sub.items.map((item, i) => (
                          <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            <span style={{ color: 'rgba(217,224,232,0.25)', fontSize: 14, marginTop: 1, flexShrink: 0 }}>—</span>
                            <span style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: 'rgba(217,224,232,0.55)' }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {section.contact && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                  <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: 'rgba(217,224,232,0.55)' }}>
                    Email:{' '}
                    <a href="mailto:info@vaastio.com" style={{ color: '#d9e0e8', textDecoration: 'none', borderBottom: '1px solid rgba(217,224,232,0.2)' }}>
                      info@vaastio.com
                    </a>
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: 'rgba(217,224,232,0.55)' }}>
                    Address: Inspirebyte, Dehradun, Uttarakhand, India
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(217,224,232,0.08)', margin: '72px 0 40px' }} />

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Link href="/" style={{
            fontSize: 11, fontWeight: 500, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'rgba(217,224,232,0.35)',
            textDecoration: 'none', borderBottom: '1px solid rgba(217,224,232,0.12)', paddingBottom: 2,
          }}>
            ← Back to home
          </Link>
          <Link href="/terms" style={{
            fontSize: 11, fontWeight: 500, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'rgba(217,224,232,0.35)',
            textDecoration: 'none', borderBottom: '1px solid rgba(217,224,232,0.12)', paddingBottom: 2,
          }}>
            Terms of Service →
          </Link>
        </div>

      </div>
    </main>
  )
}
