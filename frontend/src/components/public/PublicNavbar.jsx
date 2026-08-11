import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { businessName, publicNavLinks } from "./publicContent";

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="public-navbar">
      <Link className="public-brand" to="/" onClick={() => setIsOpen(false)}>
        <span className="public-brand-mark" aria-hidden="true">
          FG
        </span>
        <span>{businessName}</span>
      </Link>

      <button
        className="public-menu-button"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={isOpen ? "public-nav public-nav-open" : "public-nav"}>
        {publicNavLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "public-nav-link public-nav-link-active" : "public-nav-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
