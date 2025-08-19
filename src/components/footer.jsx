import { Wine, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import "../styles/footer.css"

export default function Footer() {
  return (
    <footer className="wine-footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section">
            <div className="footer-brand">
              <Wine className="footer-logo-icon" />
              <h3 className="footer-brand-name">Taagubothu Adda</h3>
            </div>
            <p className="footer-description">
              Discover exceptional wines from around the world. Curated collections for every palate and occasion.
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/shankar__0077?igsh=MWphYXBtYTRtZW16MA==" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/shankar__0077?igsh=MWphYXBtYTRtZW16MA==" className="social-link">
                <Instagram size={20} />
              </a>
              <a href="https://www.instagram.com/shankar__0077?igsh=MWphYXBtYTRtZW16MA==" className="social-link">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Shop</h4>
            <ul className="footer-links">
              <li>
                <a href="/home">Red Wines</a>
              </li>
              <li>
                <a href="/home">White Wines</a>
              </li>
              <li>
                <a href="/home">Sparkling</a>
              </li>
              <li>
                <a href="/home">Rosé</a>
              </li>
              <li>
                <a href="/home">Collections</a>
              </li>
              <li>
                <a href="/home">Sale</a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h4 className="footer-title">Customer Service</h4>
            <ul className="footer-links">
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/shipping">Shipping Info</a>
              </li>
              <li>
                <a href="/returns">Returns</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/wine-guide">Wine Guide</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <Phone size={16} />
                <span>8984605392</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>umaniddena@gmail.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>
                  Hyderabad
                  <br />
                  Balnagar Hyderabad, Telangana 
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h4>Join Our Wine Club</h4>
            <p>Get exclusive offers and wine recommendations delivered to your inbox</p>
          </div>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">© 2025 Taagubothu Adda. All rights reserved.</p>
            <div className="footer-legal">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
