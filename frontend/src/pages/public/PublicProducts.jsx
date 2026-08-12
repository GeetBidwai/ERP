import { Link } from "react-router-dom";

import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import "./PublicWebsite.css";

export default function PublicProducts() {
  return (
    <div className="public-site">
      <PublicNavbar />
      <main>
        <section className="public-page-hero public-products-placeholder public-container">
          <p className="public-eyebrow">Products</p>
          <h1>Our Products</h1>
          <p>
            Explore the grains available at Sai Dhanya Bhandar. Our public
            product list will be added in the future.
          </p>
          <div className="public-hero-actions">
            <Link className="public-button public-button-primary" to="/sai-dhanya/contact">
              Contact Us
            </Link>
            <Link className="public-button public-button-secondary" to="/sai-dhanya">
              Back to Home
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
