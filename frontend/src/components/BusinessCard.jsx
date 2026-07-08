import "./BusinessCard.css";

const businessIcons = {
  grain: "🌾",
  scrap: "♻️",
  centering: "🏗️",
};

export default function BusinessCard({ business, onClick }) {
  const businessType = business.business_type || "";
  const icon = businessIcons[businessType.toLowerCase()] || "🏢";

  function handleKeyDown(event) {
    if (!onClick) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(business);
    }
  }

  return (
    <article
      className="business-card"
      onClick={onClick ? () => onClick(business) : undefined}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="business-card__icon" aria-hidden="true">
        {icon}
      </div>

      <div className="business-card__content">
        <p className="business-card__type">{businessType || "Business"}</p>
        <h2 className="business-card__name">{business.name}</h2>
        <p className="business-card__description">
          {business.description || "No description available."}
        </p>
      </div>
    </article>
  );
}
