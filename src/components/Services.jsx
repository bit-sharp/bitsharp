import { useState, useEffect, useRef } from 'react'
import { SERVICES } from '../data'

export default function Services({ copy, language }) {
  const [active, setActive] = useState(0)
  const services = SERVICES[language] ?? SERVICES.en
  const gridRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)')
    let raf = 0

    const onScroll = () => {
      if (!mq.matches || !gridRef.current) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const cards = gridRef.current.querySelectorAll('.service')
        const center = window.innerHeight / 2
        let bestIdx = 0
        let bestDist = Infinity
        cards.forEach((el, i) => {
          const r = el.getBoundingClientRect()
          const dist = Math.abs((r.top + r.bottom) / 2 - center)
          if (dist < bestDist) { bestDist = dist; bestIdx = i }
        })
        setActive(bestIdx)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="services reveal" id="services" style={{ '--reveal-i': 0 }}>
      <header className="sec-head">
        <div className="sec-tag">01 · Services</div>
        <h2 className="sec-title">{copy.servicesTitle}</h2>
        <p className="sec-sub">{copy.servicesSub}</p>
      </header>
      <div className="services-grid" ref={gridRef}>
        {services.map((s, i) => (
          <article
            key={s.id}
            className={`service ${active === i ? 'is-active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            tabIndex={0}
          >
            <header className="service-head">
              <span className="service-id">/{s.id}</span>
              <span className="service-code">{s.code}()</span>
            </header>
            <h3 className="service-title">{s.title}</h3>
            <p className="service-body">{s.body}</p>
            <ul className="service-tags">
              {s.tags.map(t => <li key={t}>{t}</li>)}
            </ul>
            <div className="service-rule" />
          </article>
        ))}
      </div>
    </section>
  )
}
