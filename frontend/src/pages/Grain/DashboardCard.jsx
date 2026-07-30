export default function DashboardCard({ label, value }) {
  return <article className="dashboard-card"><span>{label}</span><strong>{value}</strong></article>;
}
