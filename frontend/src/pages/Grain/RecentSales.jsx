function formatCurrency(value) { return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value); }

export default function RecentSales({ sales }) {
  return <section className="dashboard-panel"><h2>Recent Sales</h2>{sales.length === 0 ? <p className="dashboard-empty">No sales recorded yet.</p> : <div className="dashboard-list">{sales.map((sale) => <article key={sale.id}><div><strong>{sale.invoice_number}</strong><span>{sale.customer_name} · {sale.payment_mode}</span></div><strong>{formatCurrency(sale.total_amount)}</strong></article>)}</div>}</section>;
}
