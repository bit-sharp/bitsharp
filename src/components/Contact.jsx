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
          <div className="sec-tag">{copy.contactTag}</div>
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
                <span className="cc-pulse" /> {copy.contactTgTag}
              </span>
            </div>
            <div className="cc-body">
              <h3 className="cc-title">Telegram</h3>
              <p className="cc-value">{TG_HANDLE}</p>
              <p className="cc-note">{copy.contactTgNote}</p>
            </div>
            <div className="cc-foot">
              <span>{copy.contactTgFoot}</span>
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
              <span className="cc-tag">{copy.contactMailTag}</span>
            </div>
            <div className="cc-body">
              <h3 className="cc-title">{copy.contactMailTitle}</h3>
              <p className="cc-value">{MAIL}</p>
              <p className="cc-note">{copy.contactMailNote}</p>
            </div>
            <div className="cc-foot">
              <span>{copied ? copy.contactMailCopied : copy.contactMailFoot}</span>
              <span className="btn-arrow">{copied ? '✓' : '⧉'}</span>
            </div>
          </a>

          <div className="contact-info">
            <div className="info-row">
              <span className="info-label">{copy.contactStatusLabel}</span>
              <span className="info-value">
                <span className="dot dot-live" />
                {copy.contactStatusValue}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">{copy.contactTimezoneLabel}</span>
              <span className="info-value">{copy.contactTimezoneValue}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{copy.contactHoursLabel}</span>
              <span className="info-value">{copy.contactHoursValue}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
