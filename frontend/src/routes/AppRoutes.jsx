import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Business from "../pages/Business/Business";
import api from "../services/api";
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
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/business"
          element={
            <PrivateRoute>
              <Business />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
