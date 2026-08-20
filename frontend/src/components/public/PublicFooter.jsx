import { Link } from "react-router-dom";

import { businessName, publicContact, publicNavLinks } from "./publicContent";

export default function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer-grid public-container">
        <div>
          <Link className="public-footer-brand" to="/sai-dhanya">
            {businessName}
          </Link>
          <p>Quality grains for everyday needs.</p>
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
          <p>Phone: {publicContact.phone}</p>
          <p>WhatsApp: {publicContact.whatsapp}</p>
          <p>{publicContact.address}</p>
        </div>
      </div>

      <div className="public-footer-bottom public-container">
        <span>© {new Date().getFullYear()} {businessName}</span>
      </div>
    </footer>
  );
}
