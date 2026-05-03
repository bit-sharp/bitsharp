import { useState, useEffect } from 'react'

const LINES = [
  { t: "$", c: "bitsharp init halberd-portfolio --stack=rust+ts" },
  { t: "›", c: "resolving 184 deps…", ok: true },
  { t: "›", c: "schema · 38 tables · 0 conflicts", ok: true },
  { t: "›", c: "running 2,148 tests · 100% pass", ok: true },
  { t: "›", c: "p99 latency · 12ms · within budget", ok: true },
  { t: "✓", c: "deploy → eu-central-1, us-east-1, ap-south-1", ok: true },
  { t: "$", c: "_", cursor: true }
]

export default function CompileTerminal() {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setShown(s => (s + 1) % (LINES.length + 4)), 700)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="tdot" /><span className="tdot" /><span className="tdot" />
        <span className="terminal-title">~/bitsharp/ops · zsh</span>
      </div>
      <div className="terminal-body">
        {LINES.slice(0, Math.min(shown, LINES.length)).map((ln, i) => (
          <div key={i} className={`tline ${ln.ok ? 'ok' : ''}`}>
            <span className="tprompt">{ln.t}</span>
            <span className="tcmd">{ln.c}</span>
            {ln.cursor && <span className="tcursor">█</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
