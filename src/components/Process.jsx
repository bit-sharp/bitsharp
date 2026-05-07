import { useState, useEffect, useRef } from 'react'
import { PROCESS } from '../data'
import CompileTerminal from './CompileTerminal'

export default function Process({ copy, language }) {
  const process = PROCESS[language] ?? PROCESS.en
  const [activeStep, setActiveStep] = useState(0)
  const listRef = useRef(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const steps = Array.from(list.querySelectorAll('.process-step'))

    const update = () => {
      const vh = window.innerHeight
      // Activation line sits 30% above the viewport bottom — last step lights up
      // once the section is essentially fully on screen.
      const triggerY = vh * 0.7
      let active = -1
      steps.forEach((step, i) => {
        const r = step.getBoundingClientRect()
        if (r.top <= triggerY) active = i
      })
      setActiveStep(active)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [process.length])

  return (
    <section className="process reveal" id="process" style={{ '--reveal-i': 1 }}>
      <header className="sec-head">
        <div className="sec-tag">02 · Process</div>
        <h2 className="sec-title">{copy.processTitle}</h2>
        <p className="sec-sub">{copy.processSub}</p>
      </header>
      <ol className="process-list" ref={listRef}>
        {process.map((p, i) => (
          <li
            key={i}
            className={`process-step ${activeStep >= i ? 'is-active' : ''}`}
            data-step={i}
          >
            <div className="step-week">{p.week}</div>
            <div className="step-bar">
              <span className="step-dot">
                <span className="step-dot-pulse" aria-hidden="true" />
                <span className="step-dot-core" aria-hidden="true" />
              </span>
              {i < process.length - 1 && <span className="step-line" />}
            </div>
            <div className="step-body">
              <h3 className="step-title">{p.title}</h3>
              <p className="step-text">{p.body}</p>
            </div>
            <div className="step-num">0{i + 1}</div>
          </li>
        ))}
      </ol>
      <CompileTerminal />
    </section>
  )
}
