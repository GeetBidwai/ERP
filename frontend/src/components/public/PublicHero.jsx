import { Link } from "react-router-dom";

export default function PublicHero() {
  return (
    <section className="public-hero">
      <div className="public-hero-image" aria-hidden="true" />

      <div className="public-hero-content public-container">
        <p className="public-eyebrow">Family-run grain business</p>
        <h1>Quality Grains. Trusted Locally.</h1>
        <p className="public-hero-copy">
          Providing quality grains and everyday food products with reliable
          service and honest pricing.
        </p>
        <div className="public-hero-actions">
          <Link className="public-button public-button-primary" to="/products">
            Explore Our Products
          </Link>
          <Link className="public-button public-button-secondary" to="/contact">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
