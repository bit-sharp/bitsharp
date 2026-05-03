import { useEffect, useRef } from 'react'

export default function SharpenGrid({ accent, enabled }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!enabled) return
    const cvs = ref.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')
    let raf, t0 = performance.now()
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cvs.width = cvs.offsetWidth * dpr
      cvs.height = cvs.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    const draw = () => {
      const t = (performance.now() - t0) / 1000
      const w = cvs.offsetWidth, h = cvs.offsetHeight
      ctx.clearRect(0, 0, w, h)
      const cell = 24
      const cols = Math.ceil(w / cell)
      const rows = Math.ceil(h / cell)
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cell, y = j * cell
          const fx = w * (0.5 + 0.25 * Math.sin(t * 0.3))
          const fy = h * (0.5 + 0.25 * Math.cos(t * 0.22))
          const d = Math.hypot(x - fx, y - fy)
          const sharpness = Math.max(0, 1 - d / 360)
          if (sharpness < 0.02) {
            ctx.fillStyle = 'rgba(255,255,255,0.025)'
            ctx.fillRect(x + cell / 2 - 0.5, y + cell / 2 - 0.5, 1, 1)
          } else {
            const alpha = sharpness * 0.9
            const len = sharpness * (cell - 6)
            ctx.strokeStyle = sharpness > 0.7
              ? `${accent}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`
              : `rgba(255,255,255,${alpha * 0.45})`
            ctx.lineWidth = sharpness > 0.85 ? 1.2 : 0.6
            ctx.beginPath()
            ctx.moveTo(x + cell / 2 - len / 2, y + cell / 2)
            ctx.lineTo(x + cell / 2 + len / 2, y + cell / 2)
            ctx.moveTo(x + cell / 2, y + cell / 2 - len / 2)
            ctx.lineTo(x + cell / 2, y + cell / 2 + len / 2)
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [accent, enabled])
  return <canvas ref={ref} className="sharpen-canvas" aria-hidden="true" />
}
