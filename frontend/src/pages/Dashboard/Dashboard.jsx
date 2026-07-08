import LogoutButton from "../../components/LogoutButton";
import useAuth from "../../hooks/useAuth";
import useBusiness from "../../hooks/useBusiness";

import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const { currentBusiness } = useBusiness();

  if (loading) {
    return <h2>Checking session...</h2>;
  }

  if (!currentBusiness) {
    return <Navigate to="/select-business" replace />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Dashboard</h1>
        <LogoutButton />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Current User</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>

      <div>
        <h2>Current Business</h2>

        <p>
          <strong>Name:</strong> {currentBusiness.name}
        </p>

        <p>
          <strong>Type:</strong> {currentBusiness.business_type}
        </p>

        <p>
          <strong>Description:</strong> {currentBusiness.description}
        </p>
      </div>
    </div>
  );
}