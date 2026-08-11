export default function FeatureCard({ icon, title, children }) {
  return (
    <article className="public-feature-card">
      <span className="public-feature-icon" aria-hidden="true">
        {icon}
      </span>
      <h2>{title}</h2>
      <p>{children}</p>
    </article>
  );
}
