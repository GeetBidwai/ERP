import { Link } from "react-router-dom";

import "./ComingSoon.css";

export default function ComingSoon({ title, description, estimatedModule }) {
  return (
    <section className="coming-soon" aria-labelledby="coming-soon-title">
      <div className="coming-soon__card">
        <span className="coming-soon__icon" role="img" aria-label="Under construction">
          🚧
        </span>
        <p className="coming-soon__eyebrow">Coming soon</p>
        <h1 id="coming-soon-title" className="coming-soon__title">{title}</h1>
        <p className="coming-soon__status">This module is currently under development.</p>
        <p className="coming-soon__description">{description}</p>
        <p className="coming-soon__message">We're working hard to bring this feature to you soon.</p>
        <p className="coming-soon__message">Thank you for your patience.</p>
        <p className="coming-soon__estimate">Expected in {estimatedModule}.</p>
        <Link className="coming-soon__back" to="/grain/dashboard">
          <span aria-hidden="true">←</span> Back to Dashboard
        </Link>
      </div>
    </section>
  );
}
