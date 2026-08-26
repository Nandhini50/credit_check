export const formatCurrency = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);

export function getCreditAssessment(order) {
  const utilization = order.creditLimit ? Math.round((order.outstandingBalance / order.creditLimit) * 100) : 0;
  const projectedUtilization = order.creditLimit ? Math.round(((order.outstandingBalance + order.amount) / order.creditLimit) * 100) : 100;
  const overdue = order.paymentStatus?.toLowerCase() === "overdue";
  if (overdue || projectedUtilization > 100 || order.creditStatus === "Hold") return { tone: "danger", level: "High risk", action: "Hold order", utilization, projectedUtilization, reason: overdue ? "Customer has an overdue payment." : "This order would exceed the approved credit limit." };
  if (projectedUtilization > 80 || order.creditStatus === "Review") return { tone: "warning", level: "Needs review", action: "Review order", utilization, projectedUtilization, reason: "Projected credit usage is close to the approved limit." };
  return { tone: "success", level: "Low risk", action: "Release order", utilization, projectedUtilization, reason: "Payment history and available credit support release." };
}

export function getDashboardMetrics(orders) {
  const assessments = orders.map(getCreditAssessment);
  return { totalOrders: orders.length, totalValue: orders.reduce((sum, order) => sum + (order.amount || 0), 0), readyToRelease: assessments.filter((item) => item.tone === "success").length, needsAttention: assessments.filter((item) => item.tone !== "success").length };
}

