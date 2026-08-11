import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import ContactCTA from "../../components/public/ContactCTA";
import "./PublicWebsite.css";

const values = ["Quality", "Reliability", "Honesty", "Local relationships"];

export default function PublicAbout() {
  return (
    <div className="public-site">
      <PublicNavbar />
      <main>
        <section className="public-page-hero public-container">
          <p className="public-eyebrow">About us</p>
          <h1>A local grain business with a family-first way of working.</h1>
          <p>
            Placeholder: Replace this introduction with your actual business
            story, location details, and customer promise.
          </p>
        </section>

        <section className="public-split-section public-container">
          <div>
            <p className="public-eyebrow">Our story</p>
            <h2>Built around everyday trust.</h2>
          </div>
          <p>
            Placeholder: Share how the business began, who it serves, and what
            makes the shop meaningful to local customers. No private ERP data is
            used on this page.
          </p>
        </section>

        <section className="public-section public-container">
          <p className="public-eyebrow">What we do</p>
          <h2>Grains and everyday food essentials.</h2>
          <p className="public-section-copy">
            Placeholder: Describe product categories in broad terms when ready.
            Keep exact product catalogue details separate until the public
            catalogue is intentionally built.
          </p>
        </section>

        <section className="public-section public-container">
          <p className="public-eyebrow">Our values</p>
          <h2>Clear, steady, and community-minded.</h2>
          <div className="public-value-grid">
            {values.map((value) => (
              <div key={value} className="public-value-pill">
                {value}
              </div>
            ))}
          </div>
        </section>

        <section className="public-split-section public-container">
          <div>
            <p className="public-eyebrow">Why customers choose us</p>
            <h2>A practical shop experience, not a big claim.</h2>
          </div>
          <p>
            Placeholder: Add real reasons customers prefer the business, such as
            service style, product care, or convenience, once confirmed by the
            family.
          </p>
        </section>

        <ContactCTA
          title="Talk to us about your grain and food needs."
          text="Use the contact page placeholders now, then replace them with real details before publishing."
        />
      </main>
      <PublicFooter />
    </div>
  );
}
