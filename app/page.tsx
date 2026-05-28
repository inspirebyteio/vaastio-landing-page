import Cursor from '@/components/landing/Cursor'
import ScrollReveal from '@/components/landing/ScrollReveal'
import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import Marquee from '@/components/landing/Marquee'
import HowItWorks from '@/components/landing/HowItWorks'
import Features from '@/components/landing/Features'
import CsStrip from '@/components/landing/CsStrip'
import DemoSection from '@/components/landing/DemoSection'
import Showcase from '@/components/landing/Showcase'
import BuilderStrip from '@/components/landing/BuilderStrip'
import Waitlist from '@/components/landing/Waitlist'
import Footer from '@/components/landing/Footer'

const csStrip1 = ['Visitor Management', 'Announcements', 'Gate Entry', 'Web Dashboard']
const csStrip2 = ['Push Notifications', 'Polls & Voting', 'Asset Booking', 'Emergency Alerts']

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollReveal />
      <Navbar />
      <Hero />
      <Marquee />
      <HowItWorks />
      <Features />
      <CsStrip items={csStrip1} />
      <DemoSection />
      <Showcase />
      <CsStrip items={csStrip2} />
      <BuilderStrip />
      <Waitlist />
      <Footer />
    </>
  )
}
