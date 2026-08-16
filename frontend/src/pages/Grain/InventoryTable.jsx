import { formatCurrency, formatNumber, getPricePerBag } from "./inventoryUtils";

export default function InventoryTable({ products, onDelete, onEdit }) {
  return (
    <div className="grain-inventory__card">
      <div className="grain-inventory__table-wrap">
        <table className="grain-inventory__table">
          <thead><tr><th>Product Name</th><th>Product Type</th><th>Bag Size (kg)</th><th>Purchase (/kg)</th><th>Selling (/kg)</th><th>Purchase / Bag</th><th>Selling / Bag</th><th>Profit / Bag</th><th>Opening Stock (Bags)</th><th>Unopened Bags</th><th>Loose Stock (kg)</th><th>Total Stock (kg)</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map((product) => {
              const purchasePricePerBag = getPricePerBag(product.purchasePrice, product.bagSize);
              const sellingPricePerBag = getPricePerBag(product.sellingPrice, product.bagSize);

              return (
                <tr key={product.id}>
                  <td><strong>{product.productName}</strong>{product.description && <span>{product.description}</span>}</td>
                  <td>{product.category}</td>
                  <td className="grain-inventory__number">{formatNumber(product.bagSize)} kg</td>
                  <td className="grain-inventory__number">{formatCurrency(product.purchasePrice)}</td>
                  <td className="grain-inventory__number">{formatCurrency(product.sellingPrice)}</td>
                  <td className="grain-inventory__number">{formatCurrency(purchasePricePerBag)}</td>
                  <td className="grain-inventory__number">{formatCurrency(sellingPricePerBag)}</td>
                  <td className="grain-inventory__number">{formatCurrency(sellingPricePerBag - purchasePricePerBag)}</td>
                  <td className="grain-inventory__number">{formatNumber(product.openingStock)}</td>
                  <td className="grain-inventory__number">{formatNumber(product.remainingBags)}</td>
                  <td className="grain-inventory__number">{formatNumber(product.looseStockKg)} kg</td>
                  <td className="grain-inventory__number">{formatNumber(product.totalWeight)} kg</td>
                  <td><span className={`grain-inventory__status grain-inventory__status--${product.status.toLowerCase()}`}>{product.status}</span></td>
                  <td><div className="grain-inventory__actions"><button type="button" onClick={() => onEdit(product)}>Edit</button><button type="button" onClick={() => onDelete(product.id)}>Delete</button></div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
