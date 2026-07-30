import { useMemo } from "react";

export default function SalesChart({ sales }) {
  const chartData = useMemo(() => {
    const maximum = Math.max(...sales.map((item) => Number(item.total)), 1);
    return sales.map((item) => ({ ...item, height: `${Math.max((Number(item.total) / maximum) * 100, 2)}%` }));
  }, [sales]);

  return <section className="dashboard-panel"><h2>Weekly Sales</h2>{sales.every((item) => Number(item.total) === 0) ? <p className="dashboard-empty">No sales in the last 7 days.</p> : <div className="sales-chart">{chartData.map((item) => <div className="sales-chart__column" key={item.date}><span title={`₹${item.total}`} style={{ height: item.height }} /><small>{new Date(`${item.date}T00:00:00`).toLocaleDateString("en-IN", { weekday: "short" })}</small></div>)}</div>}</section>;
}
