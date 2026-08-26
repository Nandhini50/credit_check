import { getCreditAssessment } from "../utils/creditLogic";
function AIRecommendation({ order }) { const item = getCreditAssessment(order); return <section className={`recommendation ${item.tone}`}><b>âœ¦ {item.action}</b><p>{item.reason}</p></section>; }
export default AIRecommendation;

