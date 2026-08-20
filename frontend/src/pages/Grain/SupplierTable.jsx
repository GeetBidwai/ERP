function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function SupplierTable({ suppliers, onSelect }) {
  return (
    <div className="supplier-card-grid">
      {suppliers.map((supplier) => (
        <button
          key={supplier.id}
          type="button"
          className="supplier-card"
          onClick={() => onSelect(supplier)}
        >
          <div className="supplier-card__top">
            <div>
              <strong>{supplier.supplier_name}</strong>
              {supplier.email && <span>{supplier.email}</span>}
            </div>

            <span className="supplier-card__arrow" aria-hidden="true">
              →
            </span>
          </div>

          <div className="supplier-card__details">
            <div>
              <span>Phone</span>
              <strong>{supplier.phone || "—"}</strong>
            </div>

            <div>
              <span>Contact</span>
              <strong>{supplier.contact_person || "—"}</strong>
            </div>

            <div>
              <span>Opening Balance</span>
              <strong>{formatCurrency(supplier.opening_balance)}</strong>
            </div>
          </div>

          <div className="supplier-card__footer">
            <span>{supplier.city || "Location not provided"}</span>

            <span
              className={`grain-inventory__status grain-inventory__status--${supplier.status.toLowerCase()}`}
            >
              {supplier.status}
            </span>
          </div>
        </button>
      ))}

      {suppliers.length === 0 && (
        <div className="grain-inventory__card supplier-empty">
          <p>No suppliers found.</p>
        </div>
      )}
    </div>
  );
}