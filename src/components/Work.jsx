import { useState } from 'react'
import { WORK } from '../data'

export default function Work({ copy }) {
  const [hover, setHover] = useState(null)
  return (
    <section className="work" id="work">
      <header className="sec-head">
        <div className="sec-tag">01 · Work</div>
        <h2 className="sec-title">{copy.workTitle}</h2>
        <p className="sec-sub">{copy.workSub}</p>
      </header>
      <div className="work-table">
        <div className="work-row work-head">
          <span>Client</span>
          <span>Sector</span>
          <span>Year</span>
          <span>Outcome</span>
          <span className="ta-right">Metric</span>
        </div>
        {WORK.map((w, i) => (
          <a
            key={i}
            className={`work-row ${hover === i ? 'is-hover' : ''}`}
            href="#"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onClick={e => e.preventDefault()}
          >
            <span className="wr-client">{w.client}</span>
            <span className="wr-sector">{w.sector}</span>
            <span className="wr-year">{w.year}</span>
            <span className="wr-note">{w.note}</span>
            <span className="wr-metric">{w.metric} <span className="wr-arrow">→</span></span>
          </a>
        ))}
      </div>
    </section>
  )
}
