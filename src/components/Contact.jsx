import { useState } from 'react'
import { SiTelegram } from 'react-icons/si'

const TG_HANDLE = '@bitsharp_software'
const TG_URL    = 'https://t.me/bitsharp_software'
const MAIL      = 'bitsharpsoftware@gmail.com'

export default function Contact({ copy }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async (e) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(MAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${MAIL}`
    }
  }

  return (
    <section className="contact reveal" id="contact" style={{ '--reveal-i': 3 }}>
      <div className="contact-inner">
        <header className="sec-head">
          <div className="sec-tag">04 · Contacts</div>
          <h2 className="sec-title">
            {copy.contactTitle}<span className="contact-period"> ?</span>
          </h2>
          <p className="sec-sub">{copy.contactSub}</p>
        </header>

        <div className="contact-grid">
          <a
            href={TG_URL}
            className="contact-card cc-tg"
            target="_blank"
            rel="noreferrer"
          >
            <div className="cc-glow" aria-hidden="true" />
            <div className="cc-head">
              <SiTelegram className="cc-icon" />
              <span className="cc-tag">
                <span className="cc-pulse" /> Fastest response
              </span>
            </div>
            <div className="cc-body">
              <h3 className="cc-title">Telegram</h3>
              <p className="cc-value">{TG_HANDLE}</p>
            </div>
            <div className="cc-foot">
              <span>Send a message</span>
              <span className="btn-arrow">→</span>
            </div>
          </a>

          <a
            href={`mailto:${MAIL}`}
            onClick={onCopy}
            className={`contact-card cc-mail ${copied ? 'is-copied' : ''}`}
          >
            <div className="cc-head">
              <div className="cc-mail-icon" aria-hidden="true">@</div>
              <span className="cc-tag">Email</span>
            </div>
            <div className="cc-body">
              <h3 className="cc-title">Drop us a line</h3>
              <p className="cc-value">{MAIL}</p>
              <p className="cc-note">Best for proposals, briefs, and long-form details.</p>
            </div>
            <div className="cc-foot">
              <span>{copied ? 'Copied to clipboard' : 'Click to copy address'}</span>
              <span className="btn-arrow">{copied ? '✓' : '⧉'}</span>
            </div>
          </a>

          <div className="contact-info">
            <div className="info-row">
              <span className="info-label">Status</span>
              <span className="info-value">
                <span className="dot dot-live" />
                Accepting new projects
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Timezone</span>
              <span className="info-value">Kharkiv · UTC+2</span>
            </div>
            <div className="info-row">
              <span className="info-label">Hours</span>
              <span className="info-value">10:00 – 19:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
