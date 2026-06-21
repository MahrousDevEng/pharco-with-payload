import Link from "next/link";
import { FOOTER_GROUPS } from "@/data/nav";
import { Icon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="grid">
          {FOOTER_GROUPS.map((g) => (
            <div key={g.title}>
              <h4>{g.title}</h4>
              <ul>
                {g.links.map((l) => (
                  <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="newsletter-row">
          <div style={{ flex: 1, minWidth: 300 }}>
            <h4>Subscribe to our newsletter</h4>
            <NewsletterForm />
          </div>
          <div>
            <h4>Follow us for the latest updates</h4>
            <div className="socials">
              <a href="#" aria-label="Facebook">{Icon.fb}</a>
              <a href="#" aria-label="Instagram">{Icon.ig}</a>
              <a href="#" aria-label="YouTube">{Icon.yt}</a>
              <a href="#" aria-label="LinkedIn">{Icon.ln}</a>
            </div>
          </div>
        </div>
        <hr />
        <div className="bottom-row">
          <p>© {new Date().getFullYear()} Pharco Corporation. All rights reserved.</p>
          <div className="bottom-links">
            <a href="#">Privacy Policy</a><span>•</span>
            <a href="#">Terms &amp; Conditions</a><span>•</span>
            <a href="#">Cookie Preferences</a><span>•</span>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function NewsletterForm() {
  // Server component → simple non-JS form; client interactivity not needed here
  return (
    <form action="#" method="post">
      <input type="email" placeholder="Your email address" required />
      <button type="submit">Subscribe</button>
    </form>
  );
}
