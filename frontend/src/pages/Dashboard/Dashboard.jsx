import useAuth from "../../hooks/useAuth";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Checking session...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <h3>Current User:</h3>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}