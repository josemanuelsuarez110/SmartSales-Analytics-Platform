"use client"
import { BookOpen, Target, Lightbulb, TrendingUp } from 'lucide-react';

const Insights = [
  {
    title: "Market Correlation Spike",
    description: "Sales show a 0.85 correlation with the Tech Market Index this quarter.",
    impact: "High",
    recommendation: "Increase B2B marketing spend in high-growth tech sectors.",
    icon: <TrendingUp className="text-emerald-400" />
  },
  {
    title: "Retention vs Training",
    description: "Employees with >15h training show 22% higher performance scores.",
    impact: "Medium",
    recommendation: "Mandate continuous learning paths for lower-performing teams.",
    icon: <Target className="text-blue-400" />
  },
  {
    title: "Inventory Anomaly",
    description: "Hardware SKU-03 is stock-out 15% of the time despite high demand.",
    impact: "Urgent",
    recommendation: "Optimize supply chain buffers for HQ-NY branch immediately.",
    icon: <Lightbulb className="text-orange-400" />
  }
];

export default function ReportsPage() {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-1000">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Executive Insights & Storytelling</h2>
        <p className="text-muted-foreground text-gray-500">Connecting the dots between raw data and business impact.</p>
      </header>

      <div className="space-y-6">
        {Insights.map((insight, index) => (
          <div key={index} className="glass-card flex gap-6 items-start">
            <div className="p-3 bg-white/5 rounded-xl">
              {insight.icon}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold">{insight.title}</h3>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase border ${
                  insight.impact === 'High' ? 'border-emerald-500 text-emerald-500' : 
                  insight.impact === 'Urgent' ? 'border-red-500 text-red-500' : 'border-blue-500 text-blue-500'
                }`}>
                  {insight.impact} IMPACT
                </span>
              </div>
              <p className="text-gray-400 text-sm">{insight.description}</p>
              <div className="mt-4 p-3 bg-emerald-500/10 border-l-2 border-emerald-500 rounded-r-lg">
                <span className="text-[10px] font-bold uppercase block text-emerald-500 mb-1">Recommendation</span>
                <p className="text-gray-200 text-sm">{insight.recommendation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card bg-emerald-600/5 border-emerald-500/20">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
          <BookOpen className="text-emerald-400" /> The "Revenue Story" of Q1
        </h3>
        <p className="text-gray-400 leading-relaxed text-sm">
          While raw revenue increased by 12.5%, our net profit margins were compressed due to rising customer acquisition costs (CAC) in the EMEA region. 
          The data suggests that shifting our focus to high-LTV enterprise clients in North America could offset these costs. 
          Performance metrics show that the Sales Engineering team is the primary driver of deal closure speed, confirming that technical demos are currently more effective than pure account management outreach.
        </p>
      </div>
    </div>
  );
}
