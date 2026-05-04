import { SiTelegram } from 'react-icons/si'

// ⚠️  Replace TG_HANDLE and MAIL with your real contacts
const TG_HANDLE = '@bitsharp'
const TG_URL    = 'https://t.me/bitsharp'
const MAIL      = 'hello@bitsharp.dev'

export default function Contact({ copy }) {
  return (
    <section className="contact" id="contact">
      <header className="sec-head">
        <div className="sec-tag">04 · Contact</div>
        <h2 className="sec-title">{copy.contactTitle}</h2>
        <p className="sec-sub">{copy.contactSub}</p>
      </header>
      <div className="contact-links">
        <a href={TG_URL} className="contact-tg" target="_blank" rel="noreferrer">
          <SiTelegram className="contact-tg-icon" />
          <span>{TG_HANDLE}</span>
        </a>
        <a href={`mailto:${MAIL}`} className="contact-mail">{MAIL}</a>
      </div>
    </section>
  )
}
