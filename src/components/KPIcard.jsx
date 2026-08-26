function KPIcard({ label, value, detail, tone = "neutral" }) {
  return <article className={`kpi-card kpi-card--${tone}`}><p>{label}</p><strong>{value}</strong><small>{detail}</small></article>;
}
export default KPIcard;

