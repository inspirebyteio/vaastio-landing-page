'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronRight, Building2, Users, Shield, AlertCircle, MessageSquare, Clock } from 'lucide-react'

const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes moveDots {
    0% {
      background-position: 0px 0px;
    }
    100% {
      background-position: 40px 40px;
    }
  }

  .bg-moving-dots {
    background-image: radial-gradient(#08080a 2.5px, transparent 3.5px);
    background-size: 40px 40px;
    animation: moveDots 4s linear infinite;
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out;
  }

  .animate-fade-in-down {
    animation: fadeInDown 0.8s ease-out;
  }

  .animate-slide-in-right {
    animation: slideInRight 0.8s ease-out;
  }

  .animate-scale-in {
    animation: scaleIn 0.8s ease-out;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`

export default function Home() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ backgroundColor: '#f8fafc' }} className="min-h-screen">
      <style>{animationStyles}</style>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur-md" style={{ borderColor: '#e2e8f0', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-300">
              <Image
                src="/vaastio-logo.png"
                alt="Vaastio Logo"
                width={64}
                height={64}
                className="object-contain"
                style={{ width: '64px', height: '64px' }}
                priority
              />
              <span className="text-3xl font-bold tracking-tight hidden sm:inline" style={{ color: '#2F3E4E' }}>Vaastio</span>
            </div>

            <div className="hidden md:flex items-center gap-10">
              <button
                onClick={scrollToFeatures}
                className="text-sm font-semibold transition-all duration-300"
                style={{ color: '#64748b' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0f172a')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
              >
                Features
              </button>
              <button
                onClick={scrollToWaitlist}
                className="text-sm font-semibold transition-all duration-300"
                style={{ color: '#64748b' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0f172a')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
              >
                Contact
              </button>
            </div>

            <Button
              size="sm"
              className="text-white hover:opacity-90 transition-all duration-300 font-semibold shadow-md"
              style={{ backgroundColor: '#2F3E4E' }}
              onClick={scrollToWaitlist}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 lg:py-44">
        <div className="absolute inset-0 pointer-events-none bg-moving-dots opacity-30" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(248, 250, 252, 1) 100%)' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20" style={{ backgroundColor: '#2F3E4E' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-10" style={{ backgroundColor: '#2F3E4E' }} />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full border animate-fade-in-down" style={{ borderColor: '#2F3E4E', backgroundColor: 'rgba(47, 62, 78, 0.05)' }}>
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#2F3E4E' }}>Revolutionizing Society Management</p>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8 tracking-tight animate-fade-in-up">
            Launch Your
            
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, #2F3E4E 0%, #4A5F7F 100%)` }}>
              Society in 30
            </span>
          
            Minutes
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up">
            From builder setup to resident onboarding. Everything you need in one elegant, intuitive platform. Built for modern residential societies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up">
            <Button
              size="lg"
              className="text-white hover:opacity-85 transition-all duration-300 font-bold shadow-lg px-8 py-6 text-base"
              style={{ backgroundColor: '#2F3E4E' }}
              onClick={scrollToWaitlist}
            >
              Get Started Free
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 font-bold px-8 py-6 text-base transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: '#2F3E4E', color: '#2F3E4E' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(47, 62, 78, 0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              Watch Demo
            </Button>
          </div>

          <div className="relative mx-auto max-w-7xl">
            <div 
              className="rounded-3xl border shadow-2xl overflow-hidden animate-scale-in"
              style={{ borderColor: 'rgba(47, 62, 78, 0.1)', boxShadow: '0 25px 50px -12px rgba(47, 62, 78, 0.25), 0 0 40px rgba(47, 62, 78, 0.1)' }}
            >
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9]">
                <Image
                  src="/coming-soon.png"
                  alt="Vaastio Coming Soon Dashboard"
                  fill
                  className="object-contain bg-slate-50"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* Features Section - Bento Box Layout */}
      <section id="features" className="py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgba(47, 62, 78, 0.05)', color: '#2F3E4E' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
              </span>
           
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight" style={{ color: '#2F3E4E' }}>
              Everything You Need,<br/>Crafted with Care
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We&apos;ve obsessed over the details so you don&apos;t have to. Here&apos;s how Vaastio empowers your community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* Feature 1 - Large / Main */}
            <div 
              className="md:col-span-4 lg:col-span-4 rounded-3xl p-8 sm:p-12 transition-all duration-500 hover:shadow-xl border border-slate-200 relative overflow-hidden group flex flex-col justify-between"
              style={{ backgroundColor: '#ffffff' }}
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <Users size={200} />
              </div>
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-2xl flex items-center justify-center mb-10 shadow-inner" style={{ backgroundColor: '#f1f5f9' }}>
                  <Users className="h-7 w-7" style={{ color: '#2F3E4E' }} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Smart Member Management</h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Finally, a way to handle residents that actually reflects reality. 
                  Manage everyone from long-term owners to temporary tenants, with or without the app. 
                  Our system adapts to your community, not the other way around.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider" style={{ color: '#2F3E4E' }}>
                <span className="h-px w-8 bg-current opacity-30"></span>
                Intuitive controls
              </div>
            </div>

            {/* Feature 2 - Tall / Secondary */}
            <div 
              className="md:col-span-2 lg:col-span-2 rounded-3xl p-8 transition-all duration-500 hover:shadow-xl border border-slate-200 flex flex-col bg-slate-900 text-white"
            >
              <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-6 bg-white/10">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Flexible Structures</h3>
              <p className="text-slate-300 leading-relaxed text-sm mb-8">
                Wings, blocks, villas, or independent floors. Whatever your architectural layout, Vaastio maps it perfectly. No technical workarounds needed.
              </p>
              <div className="mt-auto pt-8 border-t border-white/10">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                      {i === 4 ? '+50' : ''}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] mt-2 text-slate-400 font-medium">Trusted by diverse societies</p>
              </div>
            </div>

            {/* Feature 3 - Medium / Support */}
            <div 
              className="md:col-span-2 lg:col-span-2 rounded-3xl p-8 transition-all duration-500 hover:shadow-xl border border-slate-200 bg-white"
            >
              <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(47, 62, 78, 0.05)' }}>
                <Shield className="h-6 w-6" style={{ color: '#2F3E4E' }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enterprise Security</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Custom roles and granular permissions. You decide who sees what, with military-grade encryption protecting your society&apos;s data.
              </p>
            </div>

            {/* Feature 4 - Wide / Dynamic */}
            <div 
              className="md:col-span-2 lg:col-span-4 rounded-3xl p-8 transition-all duration-500 hover:shadow-xl border-dashed border-2 flex items-center gap-8 group cursor-pointer"
              style={{ borderColor: 'rgba(47, 62, 78, 0.1)', backgroundColor: 'rgba(47, 62, 78, 0.01)' }}
            >
              <div className="flex-shrink-0 h-16 w-16 rounded-full bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <AlertCircle className="h-8 w-8" style={{ color: '#2F3E4E' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Human-First Complaints</h3>
                <p className="text-gray-600 text-sm">
                  Automated tracking with a human touch. Resolve issues faster with smart routing and real-time status updates for residents.
                </p>
              </div>
            </div>

            {/* Feature 5 - Grid / Small */}
            <div 
              className="md:col-span-2 lg:col-span-3 rounded-3xl p-8 transition-all duration-500 hover:shadow-xl border border-slate-200 bg-slate-50 relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-white shadow-sm">
                  <MessageSquare className="h-5 w-5" style={{ color: '#2F3E4E' }} />
                </div>
                <h3 className="font-bold text-gray-900">Visitor Logs</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Modern digital tracking that replaces messy paper logs. Quick, secure, and respectful of visitor privacy.
              </p>
            </div>

            {/* Feature 6 - Grid / Small */}
            <div 
              className="md:col-span-2 lg:col-span-3 rounded-3xl p-8 transition-all duration-500 hover:shadow-xl border border-slate-200 bg-white"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-slate-900 text-white">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">Instant Updates</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Keep everyone in the loop without the noise. Intelligent notifications that matter, delivered exactly where they should be.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      <section className="py-24 sm:py-32 lg:py-40" style={{ backgroundColor: '#f0f4f8' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight" style={{ color: '#2F3E4E' }}>
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Get started in three simple steps and transform your society management.
            </p>
          </div>

          <div className="space-y-12 lg:space-y-16">
            {/* Step 1 */}
            <div className="flex gap-8 lg:gap-12 items-start">
              <div className="flex-shrink-0">
                <div 
                  className="flex items-center justify-center h-16 w-16 rounded-full text-white font-bold text-2xl shadow-lg"
                  style={{ backgroundColor: '#2F3E4E' }}
                >
                  1
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Setup Your Society Profile</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Create your society profile in minutes. Add your property details, configure zones, and set up your organizational structure with our intuitive setup wizard.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-8 lg:gap-12 items-start">
              <div className="flex-shrink-0">
                <div 
                  className="flex items-center justify-center h-16 w-16 rounded-full text-white font-bold text-2xl shadow-lg"
                  style={{ backgroundColor: '#2F3E4E' }}
                >
                  2
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Invite Your Team & Residents</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Invite committee members, staff, and residents. Assign roles and permissions based on your requirements. Everyone gets access tailored to their needs.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-8 lg:gap-12 items-start">
              <div className="flex-shrink-0">
                <div 
                  className="flex items-center justify-center h-16 w-16 rounded-full text-white font-bold text-2xl shadow-lg"
                  style={{ backgroundColor: '#2F3E4E' }}
                >
                  3
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Start Managing with Ease</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Begin managing announcements, complaints, visitors, and finances. Enjoy real-time insights and automated workflows that save you hours every week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 sm:py-32 lg:py-40" style={{ backgroundColor: '#2F3E4E', color: 'white' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl sm:text-6xl font-bold mb-8 leading-tight">
            Built for Builders,
            <br />
            Loved by Societies
          </h2>
          <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-16 font-light">
            We understand the complexity of managing residential societies. That&apos;s why Vaastio is built with simplicity in mind — scalable technology without unnecessary complexity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div>
              <p className="text-5xl font-bold mb-4">30 Min</p>
              <p className="text-lg text-blue-100">Average setup time</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-4">100%</p>
              <p className="text-lg text-blue-100">Data security & privacy</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-4">∞</p>
              <p className="text-lg text-blue-100">Scalable for any size</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* Join the Community Section - Replaces Pricing */}
      <section id="pricing" className="py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight" style={{ color: '#2F3E4E' }}>
              Built with the<br/>Community, for the Community.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We&apos;re currently in exclusive early access. Join us as a founding society and help shape the future of residential management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Early Adopter Block */}
            <div 
              className="rounded-3xl p-10 transition-all duration-300 border-2 border-slate-100 bg-white shadow-sm hover:shadow-lg relative group"
            >
              <div className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6" style={{ backgroundColor: 'rgba(47, 62, 78, 0.05)', color: '#2F3E4E' }}>
                Founding Member
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Start Your Journey</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Perfect for societies looking for a modern, reliable platform. Get early access and priority support as we roll out to your region.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  "Lifetime access to core features",
                  "Direct line to our product team",
                  "Free setup & orientation",
                  "Zero platform fees for 12 months"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="h-5 w-5 rounded-full flex items-center justify-center bg-slate-900 text-white text-[10px]">✓</div>
                    {item}
                  </div>
                ))}
              </div>

              <Button 
                className="w-full text-white font-bold py-6 text-lg transition-all duration-300 shadow-lg"
                style={{ backgroundColor: '#2F3E4E' }}
                onClick={scrollToWaitlist}
              >
                Join the Waitlist
              </Button>
            </div>

            {/* Strategic Partner Block */}
            <div 
              className="rounded-3xl p-10 transition-all duration-300 bg-slate-900 text-white shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-white/10 text-white">
                Builder / Enterprise
              </div>
              <h3 className="text-3xl font-bold mb-4">Strategic Partnership</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                For developers and large management companies looking for a white-labeled or multi-property solution at scale.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  "Custom property integrations",
                  "Dedicated relationship manager",
                  "SLA-driven priority support",
                  "Tailored deployment & training"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="h-5 w-5 rounded-full flex items-center justify-center bg-white text-slate-900 text-[10px]">✓</div>
                    {item}
                  </div>
                ))}
              </div>

              <Button 
                variant="outline"
                className="w-full bg-white text-slate-900 border-none font-bold py-6 text-lg transition-all duration-300 hover:bg-slate-100"
                onClick={scrollToWaitlist}
              >
                Book a Strategic Call
              </Button>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm">
              Interested in a custom quote for a large township? 
              <button onClick={scrollToWaitlist} className="ml-1 font-bold underline underline-offset-4" style={{ color: '#2F3E4E' }}>Contact sales</button>
            </p>
          </div>
        </div>
      </section>


      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 sm:py-32 lg:py-40" style={{ backgroundColor: '#f0f4f8' }}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight" style={{ color: '#2F3E4E' }}>
            Ready to Transform?
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Join thousands of societies already revolutionizing their management. Get early access to Vaastio.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 text-base rounded-xl border-2 font-medium transition-all duration-300"
              style={{ borderColor: '#2F3E4E' }}
              required
            />
            <Button
              type="submit"
              className="text-white hover:opacity-85 transition-all duration-300 font-bold px-8 py-4 text-base rounded-xl shadow-lg whitespace-nowrap"
              style={{ backgroundColor: '#2F3E4E' }}
            >
              {subscribed ? '✓ Subscribed!' : 'Join Waitlist'}
            </Button>
          </form>

          {subscribed && (
            <p className="text-lg text-green-600 font-semibold mt-6">Thank you! Check your email for next steps.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-16" style={{ borderColor: '#e2e8f0' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <Image
                src="/vaastio-logo.png"
                alt="Vaastio Logo"
                width={56}
                height={56}
                className="object-contain"
                style={{ width: '56px', height: '56px' }}
              />
              <span className="text-3xl font-bold" style={{ color: '#2F3E4E' }}>Vaastio</span>
            </div>
            <div className="flex gap-10 text-sm font-semibold">
            
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-gray-500" style={{ borderColor: '#e2e8f0' }}>
            <p>© 2024 Vaastio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
