import { useState, useEffect } from 'react'
import Wordmark from './Wordmark'

export default function Nav({ copy, language, onLanguageToggle, onContact }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo"><Wordmark small /></a>
        <ul className="nav-links">
          {copy.nav.map((n, i) => (
            <li key={i}><a href={`#${['services', 'process', 'team', 'contact'][i]}`}>{n}</a></li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="btn btn-ghost nav-lang" onClick={onLanguageToggle}>
            {language === 'en' ? 'UK' : 'EN'}
          </button>
          <button className="btn btn-primary nav-cta" onClick={onContact}>
            {copy.cta} <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
