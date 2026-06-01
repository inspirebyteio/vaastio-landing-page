'use client'
import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    function handleAnchorClick(e: MouseEvent) {
      const a = (e.target as Element).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })
    }
    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return null
}
