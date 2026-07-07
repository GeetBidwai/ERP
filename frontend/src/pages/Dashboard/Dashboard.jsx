import LogoutButton from "../../components/LogoutButton";
import useAuth from "../../hooks/useAuth";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Checking session...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Dashboard</h1>
        <LogoutButton />
      </div>

      <h3>Current User:</h3>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
