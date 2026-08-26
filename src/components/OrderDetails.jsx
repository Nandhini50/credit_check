import AIRecommendation from "./AIRecommendation";
import { formatCurrency, getCreditAssessment } from "../utils/creditLogic";
function OrderDetails({ order }) {
 const item = getCreditAssessment(order); const available = Math.max(order.creditLimit - order.outstandingBalance, 0);
 return <aside className="order-details"><div className="section-title"><div><small>ORDER REVIEW</small><h2>{order.id}</h2></div><span className={`badge ${item.tone}`}>{item.level}</span></div><p className="customer">{order.customerName}</p><AIRecommendation order={order}/><dl className="details"><div><dt>Order value</dt><dd>{formatCurrency(order.amount)}</dd></div><div><dt>Credit limit</dt><dd>{formatCurrency(order.creditLimit)}</dd></div><div><dt>Outstanding</dt><dd>{formatCurrency(order.outstandingBalance)}</dd></div><div><dt>Available credit</dt><dd>{formatCurrency(available)}</dd></div></dl><div className="usage-line"><span>Post-order credit usage</span><strong>{item.projectedUtilization}%</strong></div><div className="progress"><span className={item.tone} style={{width: `${Math.min(item.projectedUtilization, 100)}%`}}/></div><p className="footer-info">Payment status: <b>{order.paymentStatus}</b></p></aside>;
}
export default OrderDetails;

