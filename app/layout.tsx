import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://vaastio.com'),
  title: 'Vaastio - Society Management Platform',
  description: 'Launch Your Society in 30 Minutes. A multi-tenant SaaS platform for residential society management.',
  icons: {
    icon: { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Vaastio',
    title: 'Vaastio - Society Management Platform',
    description: 'Launch Your Society in 30 Minutes. A multi-tenant SaaS platform for residential society management.',
    url: 'https://vaastio.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaastio - Society Management Platform',
    description: 'Launch Your Society in 30 Minutes. A multi-tenant SaaS platform for residential society management.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/landing.css?v=2" />
      </head>
      <body className={`${montserrat.className} antialiased`} suppressHydrationWarning>
        {children}
        <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
