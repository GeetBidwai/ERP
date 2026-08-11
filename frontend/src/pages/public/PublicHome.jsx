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
    icon: "QP",
    title: "Quality Products",
    text: "Carefully handled grain and everyday food products, with details ready to be updated by the business.",
  },
  {
    icon: "RS",
    title: "Reliable Service",
    text: "A simple, dependable buying experience for local customers and regular household needs.",
  },
  {
    icon: "HP",
    title: "Honest Pricing",
    text: "Clear placeholder messaging for fair pricing, ready for real business copy later.",
  },
  {
    icon: "LT",
    title: "Local Trust",
    text: "A warm public presence for a local family-run store without exposing private ERP data.",
  },
];

export default function PublicHome() {
  return (
    <div className="public-site">
      <PublicNavbar />
      <main>
        <PublicHero />

        <section className="public-section public-container">
          <p className="public-eyebrow">What we offer</p>
          <h2>Simple staples, served with care.</h2>
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
            <h2>A family-run grain business for the local community.</h2>
          </div>
          <div>
            <p>
              Placeholder: Add your real story here, including the type of store
              you run, the customers you serve, and the values that guide your
              daily work.
            </p>
            <Link className="public-text-link" to="/about">
              Learn More
            </Link>
          </div>
        </section>

        <section className="public-section public-contact-preview public-container">
          <p className="public-eyebrow">Visit or message</p>
          <h2>Contact details to replace when ready.</h2>
          <div className="public-detail-grid">
            <div>
              <span>Phone</span>
              <p>{publicContact.phone}</p>
            </div>
            <div>
              <span>WhatsApp</span>
              <p>{publicContact.whatsapp}</p>
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
        </section>

        <ContactCTA />
      </main>
      <PublicFooter />
    </div>
  );
}
