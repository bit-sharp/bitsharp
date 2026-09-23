import { useState } from 'react'
import { SiTelegram } from 'react-icons/si'

const TG_HANDLE = '@bitsharp_software'
const TG_URL    = 'https://t.me/bitsharp_software'
const MAIL_USER = 'bitsharpsoftware'
const MAIL_HOST = 'gmail.com'
const MAIL      = `${MAIL_USER}@${MAIL_HOST}`
// Google's account picker first, so the visitor chooses which Gmail to send from,
// then it continues to a compose window with our address prefilled.
const GMAIL_COMPOSE =
  'https://accounts.google.com/AccountChooser?service=mail&continue=' +
  encodeURIComponent(`https://mail.google.com/mail/?view=cm&to=${MAIL}`)

// On phones mailto: opens the mail app; on desktop it usually opens Outlook,
// so there we open Gmail's composer in a small popup in the bottom-right corner.
const isTouch = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

function openComposePopup(e) {
  if (isTouch() || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return
  const w = 560, h = 640, margin = 24
  const s = window.screen
  const left = (s.availLeft ?? 0) + s.availWidth - w - margin
  const top  = (s.availTop ?? 0) + s.availHeight - h - margin
  const popup = window.open(
    GMAIL_COMPOSE,
    'bitsharp-compose',
    `popup=yes,width=${w},height=${h},left=${left},top=${top}`
  )
  if (popup) {
    e.preventDefault()
    popup.focus()
  }
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
}

export default function Contact({ copy }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    if (await copyText(MAIL)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  return (
    <section className="contact reveal" id="contact" style={{ '--reveal-i': 3 }}>
      <div className="contact-inner">
        <header className="sec-head contact-head">
          <div className="sec-tag">{copy.contactTag}</div>
          <h2 className="sec-title">
            {copy.contactTitle}<span className="contact-period">.</span>
          </h2>
          <p className="sec-sub">{copy.contactSub}</p>

          <ul className="contact-meta">
            <li>
              <span className="dot dot-live" />
              {copy.contactStatusValue}
            </li>
            <li>{copy.contactHoursValue}</li>
          </ul>
        </header>

        <div className="contact-cards">
          <div className="contact-card cc-tg">
            <div className="cc-row">
              <SiTelegram className="cc-icon" aria-hidden="true" />
              <div className="cc-text">
                <h3 className="cc-title">Telegram</h3>
                <p className="cc-value">{TG_HANDLE}</p>
              </div>
            </div>
            <p className="cc-note">{copy.contactTgNote}</p>
            <div className="cc-actions">
              <a
                href={TG_URL}
                className="btn btn-primary btn-lg cc-btn"
                target="_blank"
                rel="noreferrer"
              >
                {copy.contactTgCta} <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>

          <div className="contact-card cc-mail">
            <div className="cc-row">
              <div className="cc-mail-icon" aria-hidden="true">@</div>
              <div className="cc-text">
                <h3 className="cc-title">Email</h3>
                <p className="cc-value">{MAIL_USER}<wbr />@{MAIL_HOST}</p>
              </div>
            </div>
            <p className="cc-note">{copy.contactMailNote}</p>
            <div className="cc-actions">
              <a
                href={isTouch() ? `mailto:${MAIL}` : GMAIL_COMPOSE}
                onClick={openComposePopup}
                className="btn btn-ghost btn-lg cc-btn"
                target="_blank"
                rel="noreferrer"
              >
                {copy.contactMailWrite} <span className="btn-arrow">→</span>
              </a>
              <button
                type="button"
                onClick={onCopy}
                className={`btn btn-ghost btn-lg cc-btn cc-copy ${copied ? 'is-copied' : ''}`}
                aria-live="polite"
              >
                <span aria-hidden="true">{copied ? '✓' : '⧉'}</span>
                {copied ? copy.contactMailCopied : copy.contactMailCopy}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
