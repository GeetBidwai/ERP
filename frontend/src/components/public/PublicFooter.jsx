import { Link } from "react-router-dom";

import { businessName, publicContact, publicNavLinks } from "./publicContent";

export default function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer-grid public-container">
        <div>
          <Link className="public-footer-brand" to="/">
            {businessName}
          </Link>
          <p>
            A public website for a family-run grain business. Replace this
            placeholder with your real business introduction when ready.
          </p>
        </div>

        <div>
          <h2>Explore</h2>
          <div className="public-footer-links">
            {publicNavLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2>Contact</h2>
          <p>{publicContact.phone}</p>
          <p>{publicContact.whatsapp}</p>
          <p>{publicContact.address}</p>
        </div>
      </div>

      <div className="public-footer-bottom public-container">
        <span>Copyright {new Date().getFullYear()} {businessName}. All rights reserved.</span>
      </div>
    </footer>
  );
}
