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
          <p>Alamgir Road, Bhingar, Ahilyanagar</p>
          <p>{publicContact.hours}</p>
          <p>Phone: {publicContact.phone}</p>
        </div>

        <div>
          <h2>Explore</h2>
          <div className="public-footer-links">
            {publicNavLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
            <Link className="public-staff-login" to="/login">
              Staff Login
            </Link>
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
        <span>Copyright {new Date().getFullYear()} {businessName}. All rights reserved.</span>
      </div>
    </footer>
  );
}
