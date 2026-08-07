import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider";
import BusinessProvider from "./context/BusinessProvider";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BusinessProvider>
        <App />
      </BusinessProvider>
    </AuthProvider>
  </StrictMode>
);