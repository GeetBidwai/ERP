import { useEffect, useMemo, useState } from "react";
import BusinessContext from "./BusinessContext";

export default function BusinessProvider({ children }) {
  const [currentBusiness, setCurrentBusiness] = useState(() => {
    const saved = localStorage.getItem("currentBusiness");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentBusiness) {
      localStorage.setItem(
        "currentBusiness",
        JSON.stringify(currentBusiness)
      );
    } else {
      localStorage.removeItem("currentBusiness");
    }
  }, [currentBusiness]);

  const value = useMemo(
    () => ({
      currentBusiness,
      setCurrentBusiness,
    }),
    [currentBusiness]
  );

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
}