import { Link } from "react-router-dom";

export default function ContactCTA({
  title = "Need to get in touch?",
  text = "Have a question? Get in touch with Sai Dhanya Bhandar.",
}) {
  return (
    <section className="public-contact-cta public-container">
      <div>
        <p className="public-eyebrow">Contact</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="public-cta-actions">
        <Link className="public-button public-button-primary" to="/sai-dhanya/contact">
          Contact Us
        </Link>
      </div>
    </section>
  );
}
