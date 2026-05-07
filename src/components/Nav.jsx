import { useState, useEffect, useRef } from 'react'
import Wordmark from './Wordmark'

export default function Nav({ copy, language, onLanguageToggle, onContact }) {
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langWrapRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!langOpen) return
    const onClick = (e) => {
      if (langWrapRef.current && !langWrapRef.current.contains(e.target)) setLangOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setLangOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [langOpen])

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
          <div className="nav-lang-wrapper" ref={langWrapRef}>
            <button
              className="btn btn-ghost nav-lang"
              onClick={() => setLangOpen(o => !o)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              {language === 'en' ? 'EN' : 'UK'}
              <span className={`lang-chevron ${langOpen ? 'open' : ''}`} aria-hidden="true">▾</span>
            </button>
            <div className={`lang-dropdown ${langOpen ? 'is-open' : ''}`} role="listbox">
              <button
                className={`lang-option ${language === 'en' ? 'active' : ''}`}
                onClick={() => { if (language !== 'en') onLanguageToggle(); setLangOpen(false); }}
                role="option"
                aria-selected={language === 'en'}
              >
                <span className="lang-code">EN</span>
                <span className="lang-name">English</span>
                {language === 'en' && <span className="lang-check">●</span>}
              </button>
              <button
                className={`lang-option ${language === 'uk' ? 'active' : ''}`}
                onClick={() => { if (language !== 'uk') onLanguageToggle(); setLangOpen(false); }}
                role="option"
                aria-selected={language === 'uk'}
              >
                <span className="lang-code">UK</span>
                <span className="lang-name">Українська</span>
                {language === 'uk' && <span className="lang-check">●</span>}
              </button>
            </div>
          </div>
          <button className="btn btn-primary nav-cta" onClick={onContact}>
            {copy.cta} <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
