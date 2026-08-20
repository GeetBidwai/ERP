function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function SupplierDetailsModal({
  supplier,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!supplier) {
    return null;
  }

  function handleDelete() {
    onDelete(supplier.id);
    onClose();
  }

  return (
    <div className="supplier-details-backdrop" role="presentation">
      <section
        className="supplier-details-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="supplier-details-title"
      >
        <header className="supplier-details-header">
          <div>
            <p className="supplier-details-eyebrow">Supplier details</p>
            <h2 id="supplier-details-title">
              {supplier.supplier_name}
            </h2>
          </div>

          <button
            type="button"
            className="supplier-details-close"
            onClick={onClose}
            aria-label="Close supplier details"
          >
            ×
          </button>
        </header>

        <div className="supplier-details-body">
          <div className="supplier-details-summary">
            <div>
              <span>Phone</span>
              <strong>{supplier.phone || "—"}</strong>
            </div>

            <div>
              <span>Contact Person</span>
              <strong>{supplier.contact_person || "—"}</strong>
            </div>

            <div>
              <span>Opening Balance</span>
              <strong>
                {formatCurrency(supplier.opening_balance)}
              </strong>
            </div>
          </div>

          <div className="supplier-details-list">
            <div>
              <span>Email</span>
              <p>{supplier.email || "—"}</p>
            </div>

            <div>
              <span>GST Number</span>
              <p>{supplier.gst_number || "—"}</p>
            </div>

            <div>
              <span>Address</span>
              <p>{supplier.address || "—"}</p>
            </div>

            <div>
              <span>City</span>
              <p>{supplier.city || "—"}</p>
            </div>

            <div>
              <span>State</span>
              <p>{supplier.state || "—"}</p>
            </div>

            <div>
              <span>Payment Terms</span>
              <p>{supplier.payment_terms || "—"}</p>
            </div>

            <div>
              <span>Status</span>
              <p>{supplier.status || "—"}</p>
            </div>

            <div>
              <span>Notes</span>
              <p>{supplier.notes || "—"}</p>
            </div>
          </div>
        </div>

        <footer className="supplier-details-footer">
          <button
            type="button"
            className="supplier-details-delete"
            onClick={handleDelete}
          >
            Delete
          </button>

          <div>
            <button
              type="button"
              className="supplier-details-cancel"
              onClick={onClose}
            >
              Close
            </button>

            <button
              type="button"
              className="supplier-details-edit"
              onClick={() => {
                onClose();
                onEdit(supplier);
              }}
            >
              Edit Supplier
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}