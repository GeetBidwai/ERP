import { useEffect, useState } from "react";

import BusinessCard from "../../components/BusinessCard";
import api from "../../services/api";

export default function Dashboard() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    api
      .get("businesses/")
      .then((response) => {
        setBusinesses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Bidwai Business Manager</h1>
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
}
