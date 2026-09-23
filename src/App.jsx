import { useState, useEffect } from 'react'
import { COPY } from './data'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Services from './components/Services'
import Process from './components/Process'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'

const ACCENT = '#AF64B2'
const LANG_KEY = 'bitsharp-lang'

function detectLanguage() {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (saved === 'en' || saved === 'uk') return saved
  } catch {}
  const primary = (navigator.languages?.[0] || navigator.language || '').toLowerCase()
  return primary.startsWith('uk') ? 'uk' : 'en'
}

export default function App() {
  const [language, setLanguage] = useState(detectLanguage)
  const copy = COPY[language]

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', ACCENT)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' })

    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const onContact = () => {
    const el = document.getElementById('contact')
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' })
  }

  const onLanguageToggle = () => {
    const next = language === 'en' ? 'uk' : 'en'
    setLanguage(next)
    try { localStorage.setItem(LANG_KEY, next) } catch {}
  }

  return (
    <div className="app">
      <Nav copy={copy} language={language} onLanguageToggle={onLanguageToggle} onContact={onContact} />
      <Hero copy={copy} accent={ACCENT} showGrid={true} />

      {/* <Work copy={copy} /> */}
      <Services copy={copy} language={language} />
      <Process copy={copy} language={language} />
      <Team copy={copy} />
      <Contact copy={copy} />
      <Footer copy={copy} />
    </div>
  )
}
