export default function Stats({ copy }) {
  const stats = [
    { n: "07",  l: copy.statLabel1, suf: true },
    { n: "42",  l: copy.statLabel2 },
    { n: "08",  l: copy.statLabel3 },
    { n: "3.4", l: copy.statLabel4, suf: true }
  ]
  return (
    <section className="stats">
      <div className="stats-inner">
        {stats.map((s, i) => (
          <div key={i} className="stat">
            <div className="stat-num">{s.n}{s.suf && <span className="stat-suf">{copy.statSuf}</span>}</div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
