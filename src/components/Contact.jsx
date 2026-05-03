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
            <label>Your name</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Olena Hrytsenko" />
          </div>
          <div className="field">
            <label>Work email</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="olena@company.io" />
          </div>
          <div className="field">
            <label>Budget range</label>
            <div className="chips">
              {['< 50k', '50–150k', '150–500k', '500k +'].map(b => (
                <button type="button" key={b} className={`chip ${form.budget === b ? 'is-on' : ''}`} onClick={() => setForm({...form, budget: b})}>{b}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>What are you building?</label>
            <textarea rows={4} value={form.brief} onChange={e => setForm({...form, brief: e.target.value})} placeholder="A short paragraph beats a 40-page RFP. Tell us the problem, not the spec." />
          </div>
          <button className="btn btn-primary btn-lg" type="submit">
            {sent ? 'Sent. We\'ll reply within 24h ✓' : 'Send brief →'}
          </button>
        </form>
        <aside className="contact-aside">
          <div className="ca-block">
            <div className="ca-k">Direct</div>
            <a className="ca-v" href="mailto:hello@bitsharp.dev">hello@bitsharp.dev</a>
          </div>
          <div className="ca-block">
            <div className="ca-k">Studio</div>
            <div className="ca-v">7 Rynok Sq · Lviv 79008<br/>Ukraine</div>
          </div>
          <div className="ca-block">
            <div className="ca-k">Hours</div>
            <div className="ca-v">Mon – Fri · 09:00 – 19:00 EET<br/>Async always</div>
          </div>
          <div className="ca-block">
            <div className="ca-k">Open roles</div>
            <div className="ca-v">Senior platform eng · Sr applied AI</div>
          </div>
          <div className="ca-block ca-block-quiet">
            <div className="ca-k">{'/* note */'}</div>
            <div className="ca-v ca-quiet">We don't take more than three new engagements per quarter. If we say yes, you have the team.</div>
          </div>
        </aside>
      </div>
    </section>
  )
}
