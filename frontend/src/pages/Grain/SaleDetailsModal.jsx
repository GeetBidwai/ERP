function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDateTime(sale) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(`${sale.sale_date}T${sale.sale_time}`));
}

export default function SaleDetailsModal({ isLoading, onClose, sale }) {
  return (
    <div className="grain-sales__backdrop" role="presentation">
      <section className="grain-sales__modal" role="dialog" aria-modal="true" aria-labelledby="sale-details-title">
        <header className="grain-sales__modal-header">
          <div><p className="grain-sales__eyebrow">Invoice details</p><h2 id="sale-details-title">{sale?.invoice_number ?? "Sale details"}</h2></div>
          <button className="grain-sales__close-button" type="button" onClick={onClose} aria-label="Close sale details">×</button>
        </header>
        {isLoading ? <p className="grain-sales__details-loading">Loading sale details...</p> : sale && <div className="grain-sales__modal-body">
          <dl className="grain-sales__details-summary"><div><dt>Date & Time</dt><dd>{formatDateTime(sale)}</dd></div><div><dt>Customer</dt><dd>{sale.customer_name}</dd></div><div><dt>Payment Mode</dt><dd>{sale.payment_mode}</dd></div></dl>
          <section className="grain-sales__details-items" aria-labelledby="sold-products-title"><h3 id="sold-products-title">Sold products</h3>{sale.sale_items.map((item) => <article className="grain-sales__item" key={item.id}><div className="grain-sales__item-name"><strong>{item.product_name}</strong><span>{item.quantity} × {formatCurrency(item.selling_price)}</span></div><div className="grain-sales__item-total"><strong>{formatCurrency(item.subtotal)}</strong><span>Line total</span></div></article>)}</section>
          <div className="grain-sales__grand-total"><span>Grand Total</span><strong>{formatCurrency(sale.total_amount)}</strong></div>
        </div>}
      </section>
    </div>
  );
}
