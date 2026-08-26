import { formatCurrency, getCreditAssessment } from "../utils/creditLogic";
function OrderTable({ orders, selectedId, onSelect }) {
 if (!orders.length) return <p className="empty">No orders match your search.</p>;
 return <div className="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Order value</th><th>Credit usage</th><th>Decision</th></tr></thead><tbody>{orders.map((order) => { const item = getCreditAssessment(order); return <tr className={selectedId === order.id ? "selected" : ""} onClick={() => onSelect(order.id)} key={order.id}><td><b>{order.id}</b><small>{order.orderDate}</small></td><td>{order.customerName}</td><td>{formatCurrency(order.amount)}</td><td>{item.projectedUtilization}%</td><td><span className={`badge ${item.tone}`}>{item.action}</span></td></tr>; })}</tbody></table></div>;
}
export default OrderTable;

