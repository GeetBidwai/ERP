import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useBusiness from "../../hooks/useBusiness";
import { getDashboard } from "../../services/dashboardService";
import DashboardCard from "./DashboardCard";
import "./Dashboard.css";
import LowStock from "./LowStock";
import RecentSales from "./RecentSales";
import SalesChart from "./SalesChart";
import TopProducts from "./TopProducts";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function GrainDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { currentBusiness } = useBusiness();
  const businessId = currentBusiness?.id;

  const loadDashboard = useCallback(async () => {
    if (!businessId) {
      setDashboard(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      setDashboard(await getDashboard(businessId));
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail ||
          error.message ||
          "Unable to load the dashboard. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    Promise.resolve().then(loadDashboard);
  }, [loadDashboard]);

  return (
    <section className="grain-dashboard">
      <header className="grain-dashboard__header">
        <div>

          <h1>Dashboard</h1>

          <p>
            Everything important about your business, at a glance.
          </p>
        </div>

      </header>

      {errorMessage && (
        <p className="grain-dashboard__message" role="alert">
          {errorMessage}
        </p>
      )}

      {isLoading && (
        <div className="dashboard-loading-card">
          <div className="dashboard-loading-dot" />
          <p>Loading your dashboard...</p>
        </div>
      )}

      {!isLoading && dashboard && (
        <>
          {/* KPI CARDS */}
          <section className="dashboard-overview">
            <DashboardCard
              label="Today's Sales"
              value={formatCurrency(dashboard.today_sales)}
            />

            <DashboardCard
              label="Today's Invoices"
              value={dashboard.today_invoice_count}
            />

            <DashboardCard
              label="Total Products"
              value={dashboard.total_products}
            />

            <DashboardCard
              label="Total Suppliers"
              value={dashboard.total_suppliers}
            />
          </section>

          {/* WEEKLY SALES */}
          <div className="dashboard-main-chart">
            <SalesChart sales={dashboard.weekly_sales} />
          </div>

          {/* OTHER DASHBOARD SECTIONS */}
          <section className="dashboard-grid">
            <RecentSales sales={dashboard.recent_sales} />

            <LowStock
              products={dashboard.low_stock_products}
            />

            <TopProducts
              products={dashboard.top_selling_products}
            />
          </section>

          {/* QUICK ACTIONS */}
          <section className="dashboard-quick-actions">
            <div>
              <p className="dashboard-quick-actions__eyebrow">
                Quick actions
              </p>

              <h2>What would you like to do?</h2>
            </div>

            <div className="dashboard-quick-actions__grid">
              <Link to="/grain/sales">
                <span>＋</span>

                <strong>New Sale</strong>

                <small>
                  Create a new invoice
                </small>
              </Link>

              <Link to="/grain/inventory">
                <span>＋</span>

                <strong>Add Product</strong>

                <small>
                  Add stock to inventory
                </small>
              </Link>

              <Link to="/grain/customers">
                <span>＋</span>

                <strong>Add Customer</strong>

                <small>
                  Create a customer record
                </small>
              </Link>

              <Link to="/grain/suppliers">
                <span>＋</span>

                <strong>Add Supplier</strong>

                <small>
                  Register a supplier
                </small>
              </Link>
            </div>
          </section>
        </>
      )}
    </section>
  );
}