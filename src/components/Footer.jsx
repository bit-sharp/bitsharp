import Wordmark from './Wordmark'

export default function Footer({ copy }) {
  return (
    <footer className="footer">
      <div className="footer-row footer-meta">
        <span>{copy.footerNote}</span>
        <span>© 2025–2026</span>
        <span>v 4.2.1 · build #2026.05.01</span>
      </div>
    </footer>
  )
}
