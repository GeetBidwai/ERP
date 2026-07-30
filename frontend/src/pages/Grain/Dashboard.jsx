import { useCallback, useEffect, useState } from "react";

import useBusiness from "../../hooks/useBusiness";
import { getDashboard } from "../../services/dashboardService";
import DashboardCard from "./DashboardCard";
import "./Dashboard.css";
import LowStock from "./LowStock";
import RecentSales from "./RecentSales";
import SalesChart from "./SalesChart";
import TopProducts from "./TopProducts";

function formatCurrency(value) { return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value); }

export default function GrainDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { currentBusiness } = useBusiness();
  const businessId = currentBusiness?.id;

  const loadDashboard = useCallback(async () => {
    if (!businessId) { setDashboard(null); setIsLoading(false); return; }
    setIsLoading(true); setErrorMessage("");
    try { setDashboard(await getDashboard(businessId)); } catch (error) { setErrorMessage(error.response?.data?.detail || error.message || "Unable to load the dashboard. Please try again."); } finally { setIsLoading(false); }
  }, [businessId]);

  useEffect(() => { Promise.resolve().then(loadDashboard); }, [loadDashboard]);

  return <section className="grain-dashboard"><header className="grain-dashboard__header"><h1>Dashboard</h1><p>Overview of your business performance.</p></header>{errorMessage && <p className="grain-dashboard__message" role="alert">{errorMessage}</p>}{isLoading ? <p className="grain-dashboard__loading">Loading dashboard...</p> : dashboard && <><div className="dashboard-cards"><DashboardCard label="Today's Sales" value={formatCurrency(dashboard.today_sales)} /><DashboardCard label="Today's Invoices" value={dashboard.today_invoice_count} /><DashboardCard label="Total Products" value={dashboard.total_products} /><DashboardCard label="Total Suppliers" value={dashboard.total_suppliers} /></div><div className="dashboard-grid"><SalesChart sales={dashboard.weekly_sales} /><RecentSales sales={dashboard.recent_sales} /><LowStock products={dashboard.low_stock_products} /><TopProducts products={dashboard.top_selling_products} /></div></>}</section>;
}
