import ScrollReveal from '@/components/landing/ScrollReveal'
import AnnouncementBar from '@/components/landing/AnnouncementBar'
import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import Marquee from '@/components/landing/Marquee'
import HowItWorks from '@/components/landing/HowItWorks'
import DemoSection from '@/components/landing/DemoSection'
import Waitlist from '@/components/landing/Waitlist'
import Footer from '@/components/landing/Footer'


export default function Home() {
  return (
    <>
      <ScrollReveal />
      {/* <AnnouncementBar /> */}
      <Navbar />
      <Hero />
      <Marquee />
      <HowItWorks />
      <DemoSection />
      <Waitlist />
      <Footer />
    </>
  )
}
