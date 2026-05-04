import { useState, useEffect } from 'react'

const LINES = [
  { t: "$", c: "bitsharp init client-project --stack=react+next+ts" },
  { t: "›", c: "installing deps…", ok: true },
  { t: "›", c: "figma tokens · 42 components · synced", ok: true },
  { t: "›", c: "lighthouse · performance 98 · a11y 100", ok: true },
  { t: "›", c: "build · 0 errors · 0 warnings", ok: true },
  { t: "✓", c: "deployed → vercel · live in 23s", ok: true },
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
