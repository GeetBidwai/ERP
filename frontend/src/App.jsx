import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/businesses/")
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
        <div
          key={business.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <h2>{business.name}</h2>

          <p>
            <strong>Type:</strong> {business.business_type}
          </p>

          <p>
            <strong>Phone:</strong> {business.phone}
          </p>

          <p>{business.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;