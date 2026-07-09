import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import BusinessSelection from "../pages/BusinessSelection/BusinessSelection";
import PrivateRoute from "./PrivateRoute";
import GrainLayout from "../components/GrainLayout";
import GrainDashboard from "../pages/Grain/Dashboard";
import GrainInventory from "../pages/Grain/Inventory";
import GrainSales from "../pages/Grain/Sales";
import GrainCustomers from "../pages/Grain/Customers";
import GrainSuppliers from "../pages/Grain/Suppliers";
import GrainFinance from "../pages/Grain/Finance";
import GrainReports from "../pages/Grain/Reports";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <BusinessSelection />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/select-business"
          element={
            <PrivateRoute>
              <BusinessSelection />
            </PrivateRoute>
          }
        />

        <Route
          path="/grain/dashboard"
          element={
            <PrivateRoute>
              <GrainLayout>
                <GrainDashboard />
              </GrainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/grain/inventory"
          element={
            <PrivateRoute>
              <GrainLayout>
                <GrainInventory />
              </GrainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/grain/sales"
          element={
            <PrivateRoute>
              <GrainLayout>
                <GrainSales />
              </GrainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/grain/customers"
          element={
            <PrivateRoute>
              <GrainLayout>
                <GrainCustomers />
              </GrainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/grain/suppliers"
          element={
            <PrivateRoute>
              <GrainLayout>
                <GrainSuppliers />
              </GrainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/grain/finance"
          element={
            <PrivateRoute>
              <GrainLayout>
                <GrainFinance />
              </GrainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/grain/reports"
          element={
            <PrivateRoute>
              <GrainLayout>
                <GrainReports />
              </GrainLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
