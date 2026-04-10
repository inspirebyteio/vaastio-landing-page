'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronRight, Building2, Users, Shield, AlertCircle, MessageSquare, Clock, Hammer, Home as HomeIcon, UserCheck, CheckCircle2, Zap, Sparkles } from 'lucide-react'

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
      background-position: 1px 1px;
    }
    100% {
      background-position: 40px 40px;
    }
  }

   @keyframes beam {
    0% {
      transform: translateX(-100%) skewX(-15deg);
    }
    100% {
      transform: translateX(200%) skewX(-15deg);
    }
  }

  @keyframes pulse-soft {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(47, 62, 78, 0.1); }
    50% { box-shadow: 0 0 35px rgba(47, 62, 78, 0.2); }
  }

  .bg-grid-premium {
    background-size: 30px 30px;
    background-image: radial-gradient(circle, #2f3e4e12 1px, transparent 1px);
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.04);
  }

  .animate-beam {
    position: relative;
    overflow: hidden;
  }

  .animate-beam::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: beam 3s infinite;
  }

  @keyframes moveDots {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50px, -50px, 0);
    }
  }

  .bg-moving-dots {
    background-image: radial-gradient(#2f3e4e40 2.5px, transparent 2.5px);
    background-size: 50px 50px;
    background-repeat: repeat;
    width: calc(100% + 100px);
    height: calc(100% + 100px);
    position: absolute;
    top: -50px;
    left: -50px;
    will-change: transform;
    backface-visibility: hidden;
    animation: moveDots 4s linear infinite;
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
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-48">
        {/* Ambient Beams & Moving Dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px] mix-blend-multiply animate-pulse-soft" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-100/50 rounded-full blur-[150px] mix-blend-multiply" />
          <div className="absolute inset-0 opacity-80">
            <div className="bg-moving-dots" />
          </div>
          <div className="absolute inset-0 bg-grid-premium opacity-30" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            variants={{
              hidden: { y: -20, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-slate-400" />
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500">Society, simplified.</p>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
            }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[1.1] mb-10 tracking-tight"
            style={{ color: '#0f172a' }}
          >
            Where societies start <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, #2F3E4E, #64748b, #2F3E4E)`, backgroundSize: '200% auto' }}>
              organized, and simplified.
            </span>
          </motion.h1>

          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="max-w-5xl mx-auto mb-16 px-4">
            <p className="text-xl sm:text-2xl text-slate-500 mb-12 leading-relaxed font-normal tracking-tight">
              Built for every person in a society — from setup to security.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { icon: Hammer, label: 'The Builder', sub: 'Sets it up', delay: 0 },
                { icon: Users, label: 'The Admin', sub: 'Runs it', delay: 0.1 },
                { icon: HomeIcon, label: 'The Resident', sub: 'Lives in it', delay: 0.2 },
                { icon: UserCheck, label: 'The Gatekeeper', sub: 'Protects it', delay: 0.3 },
              ].map((role, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { scale: 0.9, opacity: 0 },
                    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
                  }}
                  whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                  className="glass-card flex flex-col items-center p-8 rounded-[2.5rem] border border-slate-200/50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] cursor-default group"
                >
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-slate-900 rounded-2xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity" />
                    <div className="h-16 w-16 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg relative z-10">
                      <role.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{role.label}</h4>
                  <p className="text-sm text-slate-500 font-medium">{role.sub}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="flex flex-wrap items-center justify-center gap-6 mb-16"
            >
              <div className="px-6 py-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] text-white font-bold"><Building2 size={12} /></div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-400 flex items-center justify-center text-[10px] text-white font-bold"><HomeIcon size={12} /></div>
                </div>
                <span className="text-sm font-bold text-slate-600">Towers or Villas</span>
              </div>
              <div className="px-6 py-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] text-white font-bold"><AlertCircle size={12} /></div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-400 flex items-center justify-center text-[10px] text-white font-bold"><Users size={12} /></div>
                </div>
                <span className="text-sm font-bold text-slate-600">Complaints or Visitors</span>
              </div>
            </motion.div>

            <motion.div
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="relative inline-block"
            >
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] blur-2xl opacity-50" />
              <div className="relative px-10 py-6 rounded-[2.5rem] border border-slate-200 bg-white shadow-xl">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-full bg-slate-900 flex items-center justify-center shadow-lg animate-float">
                    <Clock className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Elite Deployment</p>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
                      Operational in <span className="text-slate-500">30 minutes.</span>
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={{ hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-24"
          >
            <Button
              size="lg"
              className="h-20 px-12 text-lg font-black rounded-3xl bg-slate-900 text-white shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(15,23,42,0.4)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 animate-beam shrink-0"
              onClick={scrollToWaitlist}
            >
              Get Started Free
              <ChevronRight className="ml-3 h-6 w-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-20 px-12 text-lg font-black rounded-3xl border-2 border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shrink-0"
            >
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            variants={{ hidden: { scale: 0.95, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { delay: 0.5 } } }}
            className="relative mx-auto max-w-6xl"
          >
            <div className="absolute -inset-10 bg-slate-200/20 blur-[100px] rounded-full" />
            <div
            // className="relative rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden glass-card"
            // style={{ boxShadow: '0 40px 100px -20px rgba(53, 47, 47, 0.76)' }}
            >
              <div className="relative w-full aspect-[16/10]">
                <Image
                  src="/coming-soon.png"
                  alt="Vaastio Dashboard"
                  fill
                  className="object-contain p-4 bg-slate-50"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section - Core Philosophy */}
      <section id="features" className="py-24 sm:py-32 lg:py-40 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest"
            >
              The Vaastio Philosophy
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 tracking-tight" style={{ color: '#0f172a' }}>
              Built around how societies <br className="hidden lg:block" /> actually work.
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We&apos;ve obsessed over the details so you don&apos;t have to. Vaastio maps to your reality — not the other way around.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Philosophy 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-card p-10 rounded-[3rem] border border-slate-200 flex flex-col"
            >
              <div className="h-14 w-14 rounded-2xl bg-slate-900 flex items-center justify-center mb-8 shadow-lg">
                <Building2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Any layout, any size</h3>
              <p className="text-slate-500 leading-relaxed mb-8">
                Towers, wings, villas, independent floors, or plotted developments. Vaastio maps your reality perfectly.
              </p>
              <div className="mt-auto pt-8 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Flexibility</p>
              </div>
            </motion.div>

            {/* Philosophy 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-card p-10 rounded-[3rem] border border-slate-200 flex flex-col bg-slate-900 !text-white"
            >
              <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-lg">
                <Users className="h-7 w-7 text-slate-900" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Members that reflect real life</h3>
              <p className="text-slate-500 leading-relaxed mb-8">
                Owners, tenants, co-residents, or staff. People move in. People move out. Your records stay accurate automatically.
              </p>
              <div className="mt-auto pt-8 border-t border-white/10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dynamic Records</p>
              </div>
            </motion.div>

            {/* Philosophy 3 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-card p-10 rounded-[3rem] border border-slate-200 flex flex-col"
            >
              <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-8">
                <Shield className="h-7 w-7 text-slate-900" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Roles that make sense</h3>
              <p className="text-slate-500 leading-relaxed mb-8">
                Builder, RWAs, Admin, Resident, Gatekeeper. Or create your own. Everyone sees exactly what they should.
              </p>
              <div className="mt-auto pt-8 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Secure Access</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Section - How It Works */}
      <section className="py-24 sm:py-32 lg:py-48 bg-slate-50 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl sm:text-6xl font-black mb-6 tracking-tight text-slate-900">
              Three steps. That&apos;s it.
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              From builder setup to daily functions, here is how societies get organized.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="text-[10rem] font-black text-slate-200/50 absolute -top-24 -left-4 leading-none select-none">1</div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-slate-900 mb-6">Set up your society</h3>
                <p className="text-lg text-slate-500 leading-relaxed mb-8">
                  Add your property — towers, wings, and units... any structure you can think of.
                </p>
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Building2 size={18} />
                  <span>Property Mapping</span>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="text-[10rem] font-black text-slate-200/50 absolute -top-24 -left-4 leading-none select-none">2</div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-slate-900 mb-6">Invite your people</h3>
                <p className="text-lg text-slate-500 leading-relaxed mb-8">
                  Builders, admins, residents, gatekeepers. Everyone gets exactly the access they need. Nothing more. Nothing less.
                </p>
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Users size={18} />
                  <span>Role-Based Access</span>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="text-[10rem] font-black text-slate-200/50 absolute -top-24 -left-4 leading-none select-none">3</div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-slate-900 mb-6">Run your society</h3>
                <p className="text-lg text-slate-500 leading-relaxed mb-8">
                  Complaints, visitors, announcements, members. Everything in one place. Always.
                </p>
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Zap size={18} />
                  <span>Operational Control</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 sm:py-32 lg:py-48 relative overflow-hidden bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 sm:p-20 rounded-[4rem] border border-slate-200 bg-slate-50/50 relative z-10"
          >
            <h2 className="text-5xl sm:text-6xl font-black mb-8 tracking-tight text-slate-900">
              Ready to Transform?
            </h2>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              Built for builders. Trusted by residents. Get early access to the future of society management.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-16 px-8 text-lg rounded-2xl border-slate-200 font-bold focus:ring-slate-900"
                required
              />
              <Button
                type="submit"
                className="h-16 px-10 text-lg font-black rounded-2xl bg-slate-900 text-white shadow-xl hover:translate-y-[-2px] transition-all"
              >
                {subscribed ? '✓ Subscribed!' : 'Join Waitlist'}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-24 bg-white" style={{ borderColor: '#e2e8f0' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
            <div className="flex items-center gap-3">
              <Image
                src="/vaastio-logo.png"
                alt="Vaastio Logo"
                width={64}
                height={64}
                className="object-contain"
                style={{ width: '64px', height: '64px' }}
                priority
              />
              <span className="text-3xl font-black tracking-tighter text-slate-900">Vaastio</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">
                Built for builders. Trusted by residents.
              </p>
            </div>
          </div>
          <div className="border-t pt-12 text-center text-sm text-slate-400" style={{ borderColor: '#f1f5f9' }}>
            <p className="font-medium tracking-tight">© 2026 Vaastio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
