import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import useBusiness from "../../hooks/useBusiness";

import BusinessCard from "../../components/BusinessCard";
import api from "../../api/api";
import "./BusinessSelection.css";

export default function BusinessSelection() {
  const navigate = useNavigate();
  const { setCurrentBusiness } = useBusiness();

  const businessRoutes = {
    grain: "/grain/dashboard",
    scrap: "/scrap/dashboard",
    centering: "/centering/dashboard",
  };

  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchBusinesses() {
      try {
        setIsLoading(true);
        setError("");

        const response = await api.get("businesses/");
        const nextBusinesses = Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];

        if (isMounted) {
          setBusinesses(nextBusinesses);
        }
      } catch {
        if (isMounted) {
          setError("Unable to load businesses. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchBusinesses();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleBusinessClick(business) {
    setCurrentBusiness(business);

    const businessType = business.business_type?.toLowerCase();
    const nextRoute = businessRoutes[businessType] || "/dashboard";

    navigate(nextRoute);
  }

  return (
    <main className="business-selection">
      <section className="business-selection__content">
        <header className="business-selection__header">
          <p className="business-selection__eyebrow">Choose workspace</p>
          <h1>Select a business</h1>
        </header>

        {isLoading && (
          <p className="business-selection__status">Loading businesses...</p>
        )}

        {!isLoading && error && (
          <p className="business-selection__error">{error}</p>
        )}

        {!isLoading && !error && businesses.length === 0 && (
          <p className="business-selection__status">No businesses found.</p>
        )}

        {!isLoading && !error && businesses.length > 0 && (
          <div className="business-selection__grid">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} onClick={() => handleBusinessClick(business)} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
