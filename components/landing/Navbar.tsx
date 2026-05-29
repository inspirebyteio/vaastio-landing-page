'use client'
import Image from "next/image"
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={scrolled ? 'nav-scrolled' : ''}>
      <a href="#" className="nav-logo" style={{ display: "flex", alignItems: "center", gap: 0 }}>
        <Image src="/logo-white.png" alt="Vaastio" width={100} height={100} priority style={{ objectFit: "contain", margin: "-18px" }} />
        Vaastio
      </a>
      <div className="nav-right">
        <a href="#how" className="nav-link">How it works</a>
        <a href="#demo" className="nav-link">Features</a>
        <a href="#preview" className="nav-link">Preview</a>
        <a href="#waitlist" className="nav-cta">Join Waitlist</a>
      </div>
    </nav>
  )
}
