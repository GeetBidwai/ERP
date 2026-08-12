import { Link } from "react-router-dom";

export default function PublicHero() {
  return (
    <section className="public-hero">
      <div className="public-hero-image" aria-hidden="true" />

      <div className="public-hero-content public-container">
        <p className="public-eyebrow">Sai Dhanya Bhandar</p>
        <h1>Quality grains. Trusted locally.</h1>
        <p className="public-hero-copy">
          Serving the local community with grains from our shop in Bhingar,
          Ahilyanagar.
        </p>
        <div className="public-hero-actions">
          <Link className="public-button public-button-primary" to="/sai-dhanya/products">
            Explore Products
          </Link>
          <Link className="public-button public-button-secondary" to="/sai-dhanya/contact">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
