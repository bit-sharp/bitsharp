import { useState, useEffect } from 'react'
import SharpenGrid from './SharpenGrid'
import StackMarquee from './StackMarquee'

export default function Hero({ copy, accent, showGrid }) {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const hh = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  return (
    <section className="hero" id="top">
      <div className="hero-frame">
        <h1 className="hero-title" translate="no">
          <SharpenGrid accent={accent} enabled={showGrid} />
          <span className="ht-line">{copy.heroLine1}</span>
          <span className="ht-line ht-display">{copy.heroLine2}<span className="ht-period">.</span></span>
          <span className="ht-line">{copy.heroLine3}</span>
        </h1>
        <div className="hero-eyebrow">
          <span className="dot dot-live" /> {copy.eyebrow}
          <span className="hero-clock">KHARKIV · {hh}</span>
        </div>
        <div className="hero-grid">
          <p className="hero-sub">{copy.heroSub}</p>
          <div className="hero-meta">
            <div className="meta-row"><span className="meta-k">index</span><span className="meta-v">001 / 042</span></div>
            <div className="meta-row"><span className="meta-k">latency</span><span className="meta-v">p99 · 12ms</span></div>
            <div className="meta-row"><span className="meta-k">availability</span><span className="meta-v">99.98 %</span></div>
          </div>
        </div>
        <div className="hero-foot">
          <a href="#services" className="btn btn-primary">{copy.heroCta1} <span className="btn-arrow">↓</span></a>
          <span className="hero-tag">{copy.heroTag}</span>
        </div>
      </div>
      <StackMarquee />
    </section>
  )
}
