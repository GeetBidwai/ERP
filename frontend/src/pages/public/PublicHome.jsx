import { Link } from "react-router-dom";

import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import PublicHero from "../../components/public/PublicHero";
import FeatureCard from "../../components/public/FeatureCard";
import ContactCTA from "../../components/public/ContactCTA";
import { publicContact } from "../../components/public/publicContent";
import "./PublicWebsite.css";

const features = [
  {
    icon: "QG",
    title: "Quality Grains",
    text: "Grains available for everyday needs.",
  },
  {
    icon: "LT",
    title: "Local & Trusted",
    text: "Serving customers from our local community in Bhingar.",
  },
  {
    icon: "4+",
    title: "4+ Years of Experience",
    text: "Serving the local community for more than four years.",
  },
];

export default function PublicHome() {
  return (
    <div className="public-site">
      <PublicNavbar />
      <main>
        <PublicHero />

        <section className="public-section public-container">
          <p className="public-eyebrow">Why choose us</p>
          <h2>For everyday grain needs.</h2>
          <div className="public-feature-grid">
            {features.map((feature) => (
              <FeatureCard key={feature.title} icon={feature.icon} title={feature.title}>
                {feature.text}
              </FeatureCard>
            ))}
          </div>
        </section>

        <section className="public-split-section public-container">
          <div>
            <p className="public-eyebrow">About us</p>
            <h2>About Sai Dhanya Bhandar</h2>
          </div>
          <div>
            <p>
              Sai Dhanya Bhandar is a local grain shop serving customers in
              Bhingar, Ahilyanagar. For more than four years, we have been
              serving the local community with grains for everyday needs.
            </p>
            <Link className="public-text-link" to="/sai-dhanya/about">
              Learn More
            </Link>
          </div>
        </section>

        <section className="public-section public-contact-preview public-container">
          <p className="public-eyebrow">Visit us</p>
          <h2>Visit Our Shop</h2>
          <div className="public-detail-grid">
            <div>
              <span>Phone</span>
              <p>{publicContact.phone}</p>
            </div>
            <div>
              <span>Location</span>
              <p>{publicContact.address}</p>
            </div>
            <div>
              <span>Business Hours</span>
              <p>{publicContact.hours}</p>
            </div>
          </div>
          <div className="public-cta-actions public-visit-actions">
            <a className="public-button public-button-primary" href={publicContact.phoneHref}>
              Call Us
            </a>
            <a className="public-button public-button-light" href={publicContact.whatsappHref}>
              WhatsApp Us
            </a>
          </div>
        </section>

        <ContactCTA />
      </main>
      <PublicFooter />
    </div>
  );
}
