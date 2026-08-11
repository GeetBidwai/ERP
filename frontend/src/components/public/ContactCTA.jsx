import { Link } from "react-router-dom";

export default function ContactCTA({
  title = "Ready to get in touch?",
  text = "Call, message, or visit using the placeholder details below.",
}) {
  return (
    <section className="public-contact-cta public-container">
      <div>
        <p className="public-eyebrow">Contact</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Link className="public-button public-button-primary" to="/contact">
        Contact Us
      </Link>
    </section>
  );
}
