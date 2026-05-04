import { useState } from 'react'

export default function Contact({ copy }) {
  const [form, setForm] = useState({ name: '', email: '', brief: '', budget: '50–150k' })
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.brief) return
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }
  return (
    <section className="contact" id="contact">
      <header className="sec-head">
        <div className="sec-tag">04 · Contact</div>
        <h2 className="sec-title">{copy.contactTitle}</h2>
        <p className="sec-sub">{copy.contactSub}</p>
      </header>
      <div className="contact-grid">
        <form className="contact-form" onSubmit={submit}>
          <div className="field">
            <label>{copy.contactName}</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder={copy.contactNamePh} />
          </div>
          <div className="field">
            <label>{copy.contactEmail}</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="olena@company.io" />
          </div>
          <div className="field">
            <label>{copy.contactBudget}</label>
            <div className="chips">
              {['< 50k', '50–150k', '150–500k', '500k +'].map(b => (
                <button type="button" key={b} className={`chip ${form.budget === b ? 'is-on' : ''}`} onClick={() => setForm({...form, budget: b})}>{b}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>{copy.contactBrief}</label>
            <textarea rows={4} value={form.brief} onChange={e => setForm({...form, brief: e.target.value})} placeholder={copy.contactBriefPh} />
          </div>
          <button className="btn btn-primary btn-lg" type="submit">
            {sent ? copy.contactSent : copy.contactSend}
          </button>
        </form>
        <aside className="contact-aside">
          <div className="ca-block">
            <div className="ca-k">{copy.contactDirect}</div>
            <a className="ca-v" href="mailto:hello@bitsharp.dev">hello@bitsharp.dev</a>
          </div>
          <div className="ca-block">
            <div className="ca-k">{copy.contactStudio}</div>
            <div className="ca-v">7 Rynok Sq · Lviv 79008<br/>Ukraine</div>
          </div>
          <div className="ca-block">
            <div className="ca-k">{copy.contactHours}</div>
            <div className="ca-v">{copy.contactHoursVal}<br/>Async always</div>
          </div>
          <div className="ca-block">
            <div className="ca-k">{copy.contactRoles}</div>
            <div className="ca-v">{copy.contactRolesVal}</div>
          </div>
          <div className="ca-block ca-block-quiet">
            <div className="ca-k">{'/* note */'}</div>
            <div className="ca-v ca-quiet">{copy.contactNote}</div>
          </div>
        </aside>
      </div>
    </section>
  )
}
