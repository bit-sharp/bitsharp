import { TEAM } from '../data'

export default function Team({ copy }) {
  return (
    <section className="team" id="team">
      <header className="sec-head">
        <div className="sec-tag">03 · Team</div>
        <h2 className="sec-title">{copy.teamTitle}</h2>
        <p className="sec-sub">{copy.teamSub}</p>
      </header>
      <div className="team-grid">
        {TEAM.map((m, i) => (
          <div key={i} className="member">
            <div className="member-avatar">
              <span className="member-initials">{m.initials}</span>
              <span className="member-stripes" aria-hidden="true" />
            </div>
            <div className="member-meta">
              <div className="member-name">{m.name}</div>
              <div className="member-role">{m.role}</div>
              <div className="member-focus"><span>{m.focus}</span><span className="member-yrs">{m.yrs}y</span></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
