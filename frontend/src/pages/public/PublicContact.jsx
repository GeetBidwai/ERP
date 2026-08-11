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
          <h1>Reach the store directly.</h1>
          <p>
            These are placeholder contact details. Replace them in one place
            when the final phone, WhatsApp, address, and hours are confirmed.
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

          <div className="public-map-placeholder">
            <span>Google Maps Placeholder</span>
            <p>Add an embedded map here once the public address is finalized.</p>
          </div>
        </section>

        <section className="public-contact-cta public-container">
          <div>
            <p className="public-eyebrow">Quick note</p>
            <h2>Call or message before visiting.</h2>
            <p>
              Placeholder: Add any customer-facing note about availability,
              ordering, or shop visit timing.
            </p>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
