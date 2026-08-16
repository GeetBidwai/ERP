export const productTypes = ["Gehu", "Bajra", "Jowar", "Rice", "Raire"];
export const bagSizeOptions = ["5", "10", "20", "25", "30", "40", "50", "Custom"];
export const statusOptions = ["Active", "Inactive"];

export const initialForm = {
  productName: "",
  category: "Gehu",
  bagSize: "30",
  customBagSize: "",
  purchasePrice: "",
  sellingPrice: "",
  openingStock: "",
  looseStockKg: "0",
  description: "",
  status: "Active",
};

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function getBagSizeFormValue(bagSize) {
  const nextBagSize = String(bagSize);
  return bagSizeOptions.includes(nextBagSize) ? nextBagSize : "Custom";
}

export function createFormDataFromProduct(product) {
  const bagSize = getBagSizeFormValue(product.bagSize);

  return {
    productName: product.productName,
    category: product.category,
    bagSize,
    customBagSize: bagSize === "Custom" ? String(product.bagSize) : "",
    purchasePrice: String(product.purchasePrice),
    sellingPrice: String(product.sellingPrice),
    openingStock: String(product.openingStock),
    looseStockKg: String(product.looseStockKg ?? 0),
    description: product.description,
    status: product.status,
  };
}

export function normalizeProduct(product) {
  return {
    ...product,
    productName: product.product_name ?? product.productName,
    category: product.product_type ?? product.category,
    bagSize: product.bag_size ?? product.bagSize,
    purchasePrice: product.purchase_price ?? product.purchasePrice,
    sellingPrice: product.selling_price ?? product.sellingPrice,
    openingStock: product.opening_stock ?? product.openingStock,
    remainingBags: product.remaining_bags ?? product.remainingBags,
    looseStockKg: product.loose_stock_kg ?? product.looseStockKg ?? 0,
    totalWeight: product.total_weight ?? product.totalWeight,
    description: product.description ?? "",
    status: product.status,
  };
}

export function getPricePerBag(pricePerKg, bagSize) {
  return (Number(pricePerKg) || 0) * (Number(bagSize) || 0);
}

export function getErrorMessage(error, fallbackMessage) {
  const responseData = error.response?.data;

  if (typeof responseData?.detail === "string") {
    return responseData.detail;
  }

  if (responseData && typeof responseData === "object") {
    const messages = Object.entries(responseData)
      .flatMap(([field, errors]) => {
        const fieldName = field.replaceAll("_", " ");
        const errorList = Array.isArray(errors) ? errors : [errors];
        return errorList.map((message) => `${fieldName}: ${message}`);
      })
      .filter(Boolean);

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  return error.message || fallbackMessage;
}
