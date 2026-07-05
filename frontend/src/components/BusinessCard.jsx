export default function BusinessCard({ business }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "6px",
        padding: "12px",
        marginBottom: "12px",
      }}
    >
      <h2 style={{ margin: "0 0 8px" }}>{business.name}</h2>
      <p style={{ margin: "0 0 8px" }}>{business.business_type}</p>
      <p style={{ margin: 0 }}>{business.description}</p>
    </div>
  );
}
