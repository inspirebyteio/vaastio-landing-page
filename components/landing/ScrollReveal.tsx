'use client'
import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    function reveal() {
      document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.9) {
          el.classList.add('on')
        }
      })
    }
    reveal()
    window.addEventListener('scroll', reveal, { passive: true })
    return () => window.removeEventListener('scroll', reveal)
  }, [])

  return null
}
