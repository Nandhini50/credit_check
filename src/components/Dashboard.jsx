import orders from "../data/orders.json";
import { useMemo, useState } from "react";
import { formatCurrency, getCreditAssessment, getDashboardMetrics } from "../utils/creditLogic";
import KPIcard from "./KPIcard";
import OrderDetails from "./OrderDetails";
import OrderTable from "./OrderTable";

function Dashboard() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(orders[0]?.id);
  const metrics = getDashboardMetrics(orders);
  const visibleOrders = useMemo(() => orders.filter((order) => {
    const searchable = `${order.id} ${order.customerName}`.toLowerCase();
    return searchable.includes(query.toLowerCase()) && (filter === "all" || getCreditAssessment(order).tone === filter);
  }), [query, filter]);
  const selectedOrder = orders.find((item) => item.id === selectedId) || visibleOrders[0];
  return (
    <main className="dashboard">
      <header><div className="brand"><i>CR</i> CreditFlow</div><span>â— Credit analyst workspace</span></header>
      <section className="intro"><small>COLLECTIONS & RISK</small><h1>Credit Release Workbench</h1><p>Review open orders, understand exposure, and make confident release decisions.</p></section>
      <section className="kpi-grid"><KPIcard label="Open orders" value={metrics.totalOrders} detail="Awaiting a decision"/><KPIcard label="Order value" value={formatCurrency(metrics.totalValue)} detail="Current queue total"/><KPIcard label="Ready to release" value={metrics.readyToRelease} detail="Low-risk orders" tone="success"/><KPIcard label="Needs attention" value={metrics.needsAttention} detail="Review or hold" tone="warning"/></section>
      <section className="workspace"><div className="orders-panel"><div className="section-title"><div><small>DECISION QUEUE</small><h2>Open orders</h2></div><span>{visibleOrders.length} shown</span></div><div className="controls"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search order or customer"/><select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">All decisions</option><option value="success">Ready to release</option><option value="warning">Needs review</option><option value="danger">Hold orders</option></select></div><OrderTable orders={visibleOrders} selectedId={selectedOrder?.id} onSelect={setSelectedId}/></div>{selectedOrder && <OrderDetails order={selectedOrder}/>}</section>
    </main>
  );
}

export default Dashboard;

