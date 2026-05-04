import { useState } from 'react'
import { SERVICES } from '../data'

export default function Services({ copy, language }) {
  const [active, setActive] = useState(0)
  const services = SERVICES[language] ?? SERVICES.en
  return (
    <section className="services" id="services">
      <header className="sec-head">
        <div className="sec-tag">01 · Services</div>
        <h2 className="sec-title">{copy.servicesTitle}</h2>
        <p className="sec-sub">{copy.servicesSub}</p>
      </header>
      <div className="services-grid">
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
