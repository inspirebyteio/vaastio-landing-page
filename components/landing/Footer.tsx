export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-logo">Vaastio</div>
          <div className="footer-tag">Society management. Built for India.</div>
        </div>
        <div className="footer-links">
          <a href="https://www.instagram.com/vaastio/" target="_blank" rel="noopener noreferrer" className="footer-link">
            Instagram
          </a>
          <div className="fsep"></div>
          <a href="https://linkedin.com/company/vaastio" target="_blank" rel="noopener noreferrer" className="footer-link">
            LinkedIn
          </a>
          <div className="fsep"></div>
          <a href="https://twitter.com/vaastio" target="_blank" rel="noopener noreferrer" className="footer-link">
            Twitter
          </a>
          <div className="fsep"></div>
          <a href="mailto:info@vaastio.com" className="footer-link">
            info@vaastio.com
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Vaastio. All rights reserved.</span>
        <a href="https://vaastio.com" target="_blank" rel="noopener noreferrer" className="footer-link">
          vaastio.com &nbsp;·&nbsp; vaastio.in
        </a>
      </div>
    </footer>
  )
}
