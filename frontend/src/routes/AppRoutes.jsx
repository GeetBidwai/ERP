import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import BusinessSelection from "../pages/BusinessSelection/BusinessSelection";
import PrivateRoute from "./PrivateRoute";

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
      </Routes>
    </BrowserRouter>
  );
}
