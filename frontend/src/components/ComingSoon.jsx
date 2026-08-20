import { Link } from "react-router-dom";

import "./ComingSoon.css";

export default function ComingSoon({
  title,
  description,
  estimatedModule = "a future update",
  icon = "⚙",
  backTo = "/select-business",
  backLabel = "Back to Businesses",
}) {
  return (
    <main className="coming-soon">
      <section className="coming-soon__card">
        <div className="coming-soon__icon-wrap">
          <span className="coming-soon__icon" role="img" aria-hidden="true">
            {icon}
          </span>
        </div>

        <p className="coming-soon__eyebrow">Launching soon</p>

        <h1 className="coming-soon__title">{title}</h1>

        <p className="coming-soon__status">
          This workspace is currently under development.
        </p>

        <p className="coming-soon__description">{description}</p>

        <div className="coming-soon__loader" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <p className="coming-soon__estimate">
          Expected in {estimatedModule}.
        </p>

        <Link className="coming-soon__back" to={backTo}>
          <span aria-hidden="true">←</span>
          {backLabel}
        </Link>
      </section>
    </main>
  );
}