export default function TopProducts({ products }) {
  return <section className="dashboard-panel"><h2>Top Selling Products</h2>{products.length === 0 ? <p className="dashboard-empty">No product sales yet.</p> : <div className="dashboard-list">{products.map((product) => <article key={product.product_id}><div><strong>{product.product__product_name}</strong><span>{product.quantity} bags sold</span></div><strong>#{products.indexOf(product) + 1}</strong></article>)}</div>}</section>;
}
