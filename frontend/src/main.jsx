import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider";
import BusinessProvider from "./context/BusinessProvider";
import { initializeCSRF } from "./services/api";

initializeCSRF().catch(console.error);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BusinessProvider>
        <App />
      </BusinessProvider>
    </AuthProvider>
  </StrictMode>
);