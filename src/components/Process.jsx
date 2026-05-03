import { PROCESS } from '../data'
import CompileTerminal from './CompileTerminal'

export default function Process({ copy }) {
  return (
    <section className="process" id="process">
      <header className="sec-head">
        <div className="sec-tag">02 · Process</div>
        <h2 className="sec-title">{copy.processTitle}</h2>
        <p className="sec-sub">{copy.processSub}</p>
      </header>
      <ol className="process-list">
        {PROCESS.map((p, i) => (
          <li key={i} className="process-step">
            <div className="step-week">{p.week}</div>
            <div className="step-bar">
              <span className="step-dot" />
              {i < PROCESS.length - 1 && <span className="step-line" />}
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
