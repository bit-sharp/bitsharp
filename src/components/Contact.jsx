import { SiTelegram } from 'react-icons/si'

const TG_HANDLE = '@bitsharp_software'
const TG_URL    = 'https://t.me/bitsharpx'
const MAIL      = 'bitsharpsoftware@gmail.com'

export default function Contact({ copy }) {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <div className="contact-top">
          <span className="sec-tag">04 · Contact</span>
          <h2 className="contact-title">
            {copy.contactTitle}<span className="contact-period">.</span>
          </h2>
        </div>
        <div className="contact-bottom">
          <a href={TG_URL} className="contact-tg" target="_blank" rel="noreferrer">
            <SiTelegram className="contact-tg-icon" />
            <span>{TG_HANDLE}</span>
          </a>
          <div className="contact-side">
            <a href={`mailto:${MAIL}`} className="contact-mail">{MAIL}</a>
            <p className="contact-note">{copy.contactSub}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
