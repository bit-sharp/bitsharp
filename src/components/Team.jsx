export default function Team({ copy }) {
  return (
    <section className="team reveal" id="team" style={{ '--reveal-i': 2 }}>
      <header className="sec-head">
        <div className="sec-tag">03 · Team</div>
        <h2 className="sec-title">{copy.teamTitle}</h2>
        <p className="sec-sub">{copy.teamSub}</p>
      </header>
      <div className="team-grid">
        {copy.team.map((m, i) => (
          <div key={i} className="member">
            <div className="member-avatar">
              <span className="member-initials">{m.initials}</span>
              <span className="member-stripes" aria-hidden="true" />
            </div>
            <div className="member-meta">
              <div className="member-name">{m.name}</div>
              <div className="member-role">{m.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
