import { useState, useEffect, useRef } from 'react'

const CMD = "bitsharp init client-project --stack=react+next+ts"
const LOGS = [
  { t: "›", c: "installing deps…", ok: true },
  { t: "›", c: "figma tokens · 42 components · synced", ok: true },
  { t: "›", c: "lighthouse · performance 98 · a11y 100", ok: true },
  { t: "›", c: "build · 0 errors · 0 warnings", ok: true },
  { t: "✓", c: "deployed → vercel · live in 23s", ok: true },
  { t: "$", c: "_", cursor: true }
]

const TYPE_MS = 45
const LOG_DELAY_MS = 420
const POST_CMD_PAUSE_MS = 500

export default function CompileTerminal() {
  const [typed, setTyped] = useState(0)
  const [logsShown, setLogsShown] = useState(0)
  const ref = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const start = () => {
      if (startedRef.current) return
      startedRef.current = true

      const timers = []
      for (let i = 1; i <= CMD.length; i++) {
        timers.push(setTimeout(() => setTyped(i), i * TYPE_MS))
      }
      const afterType = CMD.length * TYPE_MS + POST_CMD_PAUSE_MS
      for (let i = 1; i <= LOGS.length; i++) {
        timers.push(setTimeout(() => setLogsShown(i), afterType + i * LOG_DELAY_MS))
      }
      cleanup = () => timers.forEach(clearTimeout)
    }

    let cleanup = () => {}
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          start()
          io.disconnect()
        }
      })
    }, { threshold: 0.3 })
    io.observe(el)

    return () => { io.disconnect(); cleanup() }
  }, [])

  const typingDone = typed >= CMD.length

  return (
    <div className="terminal" ref={ref}>
      <div className="terminal-bar">
        <span className="terminal-title">~/bitsharp/ops</span>
        <span className="tdots">
          <span className="tdot" /><span className="tdot" /><span className="tdot" />
        </span>
      </div>
      <div className="terminal-body">
        <div className="tline">
          <span className="tprompt">$</span>
          <span className="tcmd">
            {CMD.slice(0, typed)}
            {!typingDone && <span className="tcursor">█</span>}
          </span>
        </div>
        {LOGS.slice(0, logsShown).map((ln, i) => (
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
