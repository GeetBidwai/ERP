import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import { publicContact } from "../../components/public/publicContent";
import "./PublicWebsite.css";

const contactRows = [
  ["Phone", publicContact.phone],
  ["WhatsApp", publicContact.whatsapp],
  ["Address", publicContact.address],
  ["Business Hours", publicContact.hours],
];

export default function PublicContact() {
  return (
    <div className="public-site">
      <PublicNavbar />
      <main>
        <section className="public-page-hero public-container">
          <p className="public-eyebrow">Contact us</p>
          <h1>Sai Dhanya Bhandar</h1>
          <p>
            Get in touch or visit us at our local grain shop in Bhingar,
            Ahilyanagar.
          </p>
        </section>

        <section className="public-contact-layout public-container">
          <div className="public-contact-panel">
            {contactRows.map(([label, value]) => (
              <div key={label} className="public-contact-row">
                <span>{label}</span>
                <p>{value}</p>
              </div>
            ))}
          </div>

          <div className="public-contact-actions">
            <a className="public-button public-button-primary" href={publicContact.phoneHref}>
              Call Us
            </a>
            <a className="public-button public-button-light" href={publicContact.whatsappHref}>
              WhatsApp Us
            </a>
          </div>
        </section>

      </main>
      <PublicFooter />
    </div>
  );
}
