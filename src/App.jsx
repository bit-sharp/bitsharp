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

export default function App() {
  const [language, setLanguage] = useState('en')
  const copy = COPY[language]

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', ACCENT)
  }, [])

  const onContact = () => {
    const el = document.getElementById('contact')
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' })
  }

  const onLanguageToggle = () => setLanguage(l => l === 'en' ? 'uk' : 'en')

  return (
    <div className="app">
      <Nav copy={copy} language={language} onLanguageToggle={onLanguageToggle} onContact={onContact} />
      <Hero copy={copy} accent={ACCENT} showGrid={true} />

      <Work copy={copy} />
      <Services copy={copy} />
      <Process copy={copy} />
      <Team copy={copy} />
      <Contact copy={copy} />
      <Footer copy={copy} />
    </div>
  )
}
