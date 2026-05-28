'use client'
import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cur')
    const curR = document.getElementById('cur-r')
    if (!cur || !curR) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      cur.style.left = mx + 'px'
      cur.style.top = my + 'px'
    }

    document.addEventListener('mousemove', onMove)

    const loop = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      curR.style.left = rx + 'px'
      curR.style.top = ry + 'px'
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    const interactives = document.querySelectorAll('a, button, input')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cur.style.transform = 'translate(-50%,-50%) scale(2.5)'
        curR.style.transform = 'translate(-50%,-50%) scale(1.6)'
        curR.style.opacity = '0.25'
      })
      el.addEventListener('mouseleave', () => {
        cur.style.transform = 'translate(-50%,-50%) scale(1)'
        curR.style.transform = 'translate(-50%,-50%) scale(1)'
        curR.style.opacity = '1'
      })
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cur"></div>
      <div id="cur-r"></div>
    </>
  )
}
