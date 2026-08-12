import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import "./PublicWebsite.css";

export default function PublicAbout() {
  return (
    <div className="public-site">
      <PublicNavbar />
      <main>
        <section className="public-page-hero public-container">
          <p className="public-eyebrow">About us</p>
          <h1>Sai Dhanya Bhandar</h1>
          <p>
            A local grain shop on Alamgir Road, Bhingar, Ahilyanagar.
          </p>
        </section>

        <section className="public-split-section public-container">
          <div>
            <p className="public-eyebrow">Our story</p>
            <h2>Serving the local community.</h2>
          </div>
          <p>
            For more than four years, Sai Dhanya Bhandar has been serving
            customers in Bhingar, Ahilyanagar with grains for everyday needs.
          </p>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
