function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);
}

export default function SupplierTable({ suppliers, onDelete, onEdit }) {
  return <div className="grain-inventory__card"><div className="grain-inventory__table-wrap"><table className="grain-inventory__table supplier-table"><thead><tr><th>Supplier</th><th>Contact Person</th><th>Phone</th><th>GST Number</th><th>City</th><th>Opening Balance</th><th>Payment Terms</th><th>Status</th><th>Actions</th></tr></thead><tbody>{suppliers.map((supplier) => <tr key={supplier.id}><td><strong>{supplier.supplier_name}</strong>{supplier.email && <span>{supplier.email}</span>}</td><td>{supplier.contact_person || "—"}</td><td>{supplier.phone}</td><td>{supplier.gst_number || "—"}</td><td>{supplier.city || "—"}</td><td className="grain-inventory__number">{formatCurrency(supplier.opening_balance)}</td><td>{supplier.payment_terms || "—"}</td><td><span className={`grain-inventory__status grain-inventory__status--${supplier.status.toLowerCase()}`}>{supplier.status}</span></td><td><div className="grain-inventory__actions"><button type="button" onClick={() => onEdit(supplier)}>Edit</button><button type="button" onClick={() => onDelete(supplier.id)}>Delete</button></div></td></tr>)}</tbody></table></div></div>;
}
