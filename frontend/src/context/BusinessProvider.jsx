import { useState } from "react";
import BusinessContext from "./BusinessContext";

export default function BusinessProvider({ children }) {
  const [currentBusiness, setCurrentBusiness] = useState(null);

  const value = {
    currentBusiness,
    setCurrentBusiness,
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
}