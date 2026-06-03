import Link from 'next/link'

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By downloading, installing, or using the Vaastio application, or by visiting this website, you agree to these Terms of Service. If you do not agree, do not use the app or this website.`,
    footer: `These terms apply to all users of Vaastio including Builders, Admins (RWA/management), Residents, Co-residents, and Gatekeepers.`,
  },
  {
    title: '2. About Vaastio',
    body: `Vaastio is a society management platform that enables residential societies to manage gate entry, complaints, announcements, and member records digitally. Vaastio is operated by Inspirebyte, Dehradun, Uttarakhand, India.`,
  },
  {
    title: '3. Website Use',
    body: `This website (vaastio.com) is a marketing and information site for the Vaastio application. By visiting this website you agree to these terms. The website may include early access forms — any information submitted through those forms is handled in accordance with our Privacy Policy.`,
  },
  {
    title: '4. User Accounts and Roles',
    subsections: [
      {
        heading: 'Account creation:',
        items: [
          'Accounts are created using your mobile phone number verified via OTP',
          'You must provide accurate information including your real name',
          'One phone number may be associated with one Vaastio account',
          'You are responsible for maintaining the security of your device and login',
        ],
      },
      {
        heading: 'Roles and access:',
        items: [
          'Your access level within a society is determined by the role assigned to you by the society\'s Builder or Admin',
          'Roles include: Builder, Admin, Resident, Co-resident, and Gatekeeper',
          'Each role has specific permissions defined by Vaastio\'s permission system',
        ],
      },
    ],
  },
  {
    title: '5. Acceptable Use',
    body: `You agree to use Vaastio only for its intended purpose of managing your residential society. You agree not to:`,
    items: [
      'Provide false information when registering or using the app',
      'Impersonate another person or resident',
      'Attempt to access another society\'s data',
      'Use the app to harass, threaten, or harm other members',
      'Attempt to reverse engineer, hack, or disrupt the Vaastio platform',
      'Use the app for any purpose that violates Indian law',
    ],
  },
  {
    title: '6. Society Data and Responsibility',
    subsections: [
      {
        heading: 'Society Builders and Admins are responsible for:',
        items: [
          'Ensuring accurate member and unit information',
          'Managing visitor entries responsibly',
          'Ensuring gatekeepers use the app appropriately',
          'Communicating society rules to residents',
        ],
      },
      {
        heading: 'Vaastio is not responsible for:',
        items: [
          'Decisions made by society admins or gatekeepers',
          'Disputes between society members',
          'Physical security outcomes — Vaastio is a digital tool that supports but does not replace physical security measures',
          'Accuracy of information entered by users',
        ],
      },
    ],
  },
  {
    title: '7. Visitor Management',
    body: `The Vaastio gate management feature is a digital tool to assist gatekeepers and residents. It does not replace human judgment. Society admins and gatekeepers remain responsible for all physical access decisions. Vaastio records are for reference and audit — they are not legal evidence unless verified through proper channels.`,
  },
  {
    title: '8. Complaints and Announcements',
    items: [
      'Complaints raised through Vaastio are between residents and their society management',
      'Vaastio does not mediate disputes between members',
      'Announcements made by admins are the responsibility of the society management, not Vaastio',
    ],
  },
  {
    title: '9. Data and Content You Submit',
    items: [
      'You retain ownership of content you submit (photos, complaint descriptions, announcements)',
      'By submitting content, you grant Vaastio a limited license to store and display it within your society context',
      'You are responsible for ensuring photos and content you upload do not violate others\' privacy or rights',
    ],
  },
  {
    title: '10. Service Availability',
    items: [
      'Vaastio is provided on a best-effort basis',
      'We do not guarantee 100% uptime',
      'Planned maintenance will be communicated in advance where possible',
      'We are not liable for losses arising from service interruptions',
    ],
  },
  {
    title: '11. Pricing and Payment',
    items: [
      'During the pilot period, Vaastio is provided free of charge',
      'Future pricing will be communicated with adequate notice before being applied',
      'Continued use after pricing changes constitutes acceptance of the new terms',
    ],
  },
  {
    title: '12. Termination',
    items: [
      'You may stop using Vaastio at any time',
      'Society Builders may leave a society via the handover process within the app',
      'Vaastio reserves the right to deactivate accounts that violate these terms',
      'Upon termination, your society\'s historical data is retained for audit purposes',
    ],
  },
  {
    title: '13. Limitation of Liability',
    body: `To the maximum extent permitted by applicable law, Inspirebyte and Vaastio shall not be liable for any indirect, incidental, or consequential damages arising from your use of the app. Our total liability for any claim shall not exceed the amount you paid for the service in the preceding 12 months.`,
  },
  {
    title: '14. Governing Law',
    body: `These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Dehradun, Uttarakhand.`,
  },
  {
    title: '15. Changes to Terms',
    body: `We may update these terms as the platform evolves. We will notify users of material changes via the app. Continued use after changes constitutes acceptance.`,
  },
  {
    title: '16. Contact',
    body: `For questions about these terms:`,
    contact: true,
  },
]

export default function TermsPage() {
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
          Terms of Service
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
          <Link href="/privacy" style={{
            fontSize: 11, fontWeight: 500, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'rgba(217,224,232,0.35)',
            textDecoration: 'none', borderBottom: '1px solid rgba(217,224,232,0.12)', paddingBottom: 2,
          }}>
            Privacy Policy →
          </Link>
        </div>

      </div>
    </main>
  )
}
