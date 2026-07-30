export default function LowStock({ products }) {
  return <section className="dashboard-panel"><h2>Low Stock</h2>{products.length === 0 ? <p className="dashboard-empty">All products have sufficient stock.</p> : <div className="dashboard-list">{products.map((product) => <article key={product.id}><strong>{product.product_name}</strong><span>{product.remaining_bags} bags remaining</span></article>)}</div>}</section>;
}
