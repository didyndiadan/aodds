import React, { useState, useMemo } from 'react';
import { SPORTS_MODELS } from '../data/sportsModels';
import { MonthlyProjection, SimulationParameters } from '../types';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  AlertCircle, 
  Award, 
  Clock, 
  Download, 
  RefreshCw,
  Sliders,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface ArrSimulatorProps {
  initialModelId?: string;
}

export const ArrSimulator: React.FC<ArrSimulatorProps> = ({ initialModelId = 'positive-ev-arbitrage' }) => {
  const selectedModelPreset = useMemo(() => {
    return SPORTS_MODELS.find((m) => m.id === initialModelId) || SPORTS_MODELS[0];
  }, [initialModelId]);

  // Simulation inputs
  const [arpu, setArpu] = useState<number>(selectedModelPreset.medianArpu);
  const [initialUsers, setInitialUsers] = useState<number>(20);
  const [monthlyNewUsers, setMonthlyNewUsers] = useState<number>(45);
  const [monthlyGrowthRate, setMonthlyGrowthRate] = useState<number>(8); // 8% monthly compounding growth in acquisitions
  const [churnRate, setChurnRate] = useState<number>(selectedModelPreset.churnRatePercent);
  const [cac, setCac] = useState<number>(selectedModelPreset.cacEstimate);
  const [grossMargin, setGrossMargin] = useState<number>(parseInt(selectedModelPreset.unitEconomics.grossMargin) || 88);
  const [valuationMultiple, setValuationMultiple] = useState<number>(8); // 8x ARR multiple

  // When switching presets
  const applyPreset = (modelId: string) => {
    const found = SPORTS_MODELS.find((m) => m.id === modelId);
    if (found) {
      setArpu(found.medianArpu);
      setChurnRate(found.churnRatePercent);
      setCac(found.cacEstimate);
      setGrossMargin(parseInt(found.unitEconomics.grossMargin) || 88);
      if (found.medianArpu > 100) {
        setMonthlyNewUsers(40);
      } else if (found.medianArpu < 50) {
        setMonthlyNewUsers(150);
      } else {
        setMonthlyNewUsers(60);
      }
    }
  };

  // 24-month calculation
  const projections: MonthlyProjection[] = useMemo(() => {
    const results: MonthlyProjection[] = [];
    let currentActive = initialUsers;
    let currentNewRate = monthlyNewUsers;
    let cumulativeProfit = 0;

    for (let month = 1; month <= 24; month++) {
      // New users joining this month
      const added = Math.round(currentNewRate);
      // Churned users
      const churned = Math.round(currentActive * (churnRate / 100));
      currentActive = Math.max(0, currentActive + added - churned);

      const mrr = currentActive * arpu;
      const arr = mrr * 12;
      const acquisitionSpend = added * cac;
      const monthlyGrossProfit = (mrr * (grossMargin / 100)) - acquisitionSpend;
      cumulativeProfit += monthlyGrossProfit;

      results.push({
        month,
        activeUsers: currentActive,
        mrr,
        arr,
        monthlyRevenue: mrr,
        customerAcquisitionSpend: acquisitionSpend,
        grossProfit: monthlyGrossProfit,
        cumulativeProfit,
      });

      // Compound customer acquisition growth
      currentNewRate = currentNewRate * (1 + monthlyGrowthRate / 100);
    }

    return results;
  }, [initialUsers, monthlyNewUsers, monthlyGrowthRate, churnRate, arpu, cac, grossMargin]);

  // Derived milestones
  const monthTo100kArr = projections.find((p) => p.arr >= 100000)?.month ?? null;
  const monthTo500kArr = projections.find((p) => p.arr >= 500000)?.month ?? null;
  const monthTo1MArr = projections.find((p) => p.arr >= 1000000)?.month ?? null;
  const monthTo10MArr = projections.find((p) => p.arr >= 10000000)?.month ?? null;

  const month24Arr = projections[23]?.arr || 0;
  const month24Mrr = projections[23]?.mrr || 0;
  const month24Users = projections[23]?.activeUsers || 0;
  const projectedValuation = month24Arr * valuationMultiple;

  // LTV & Payback calculation
  const ltv = churnRate > 0 ? (arpu / (churnRate / 100)) * (grossMargin / 100) : arpu * 24;
  const ltvCacRatio = cac > 0 ? ltv / cac : 0;
  const paybackMonths = arpu > 0 ? cac / (arpu * (grossMargin / 100)) : 0;

  // SVG Chart Dimensions
  const maxArr = Math.max(...projections.map((p) => p.arr), 1200000);
  const chartHeight = 220;
  const chartWidth = 700;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Calculator className="h-5 w-5 text-emerald-600" />
            Path to $1,000,000 ARR · Financial Velocity Simulator
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Test unit economics, pricing ladders, churn resistance, and acquisition velocity to calculate exact time to seven figures.
          </p>
        </div>

        {/* Model Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500 font-medium">Model Presets:</span>
          {SPORTS_MODELS.slice(0, 3).map((m) => (
            <button
              key={m.id}
              onClick={() => applyPreset(m.id)}
              className="text-xs py-1 px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors"
            >
              {m.name.split(' ')[0]} ({m.name.includes('+EV') ? '+EV Odds' : m.name.includes('Youth') ? 'Youth Video' : 'Pickleball'})
            </button>
          ))}
        </div>
      </div>

      {/* Top Velocity Scoreboard Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>Time to $1M ARR ($83.3k MRR)</span>
            <Clock className="h-3.5 w-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {monthTo1MArr ? `Month ${monthTo1MArr}` : '> 24 Months'}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {monthTo1MArr ? `${Math.round(83333 / arpu)} paying subscribers needed` : 'Increase price or accelerate acquisitions'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>Month 24 ARR Run-Rate</span>
            <DollarSign className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-950 mt-1">
            ${(month24Arr / 1000).toFixed(0)}k <span className="text-xs font-normal text-slate-500">ARR</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            ${(month24Mrr / 1000).toFixed(1)}k MRR · {month24Users.toLocaleString()} active users
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>LTV : CAC Health</span>
            <Award className="h-3.5 w-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1 flex items-baseline gap-1.5">
            <span>{ltvCacRatio.toFixed(1)}x</span>
            <span className={`text-xs font-semibold ${ltvCacRatio >= 4 ? 'text-emerald-700' : ltvCacRatio >= 3 ? 'text-amber-700' : 'text-rose-700'}`}>
              {ltvCacRatio >= 4 ? 'Elite (>4x)' : ltvCacRatio >= 3 ? 'Healthy' : 'Danger (<3x)'}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            LTV: ${Math.round(ltv)} · Payback: {paybackMonths.toFixed(1)} mos
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>Enterprise Valuation (at {valuationMultiple}x ARR)</span>
            <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-900 mt-1">
            ${(projectedValuation / 1000000).toFixed(2)}M
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Sports SaaS acquisition benchmark multiple
          </div>
        </div>
      </div>

      {/* Main Interactive Workspace: Sliders on Left, Chart on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sliders className="h-4 w-4 text-slate-700" />
              Economic Levers
            </h3>
            <button
              onClick={() => applyPreset(selectedModelPreset.id)}
              className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Reset
            </button>
          </div>

          {/* ARPU */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800">Monthly ARPU ($ / user)</span>
              <span className="font-bold text-emerald-700 font-mono">${arpu}/mo</span>
            </div>
            <input
              type="range"
              min={9}
              max={499}
              step={5}
              value={arpu}
              onChange={(e) => setArpu(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$9 (Consumer)</span>
              <span>$149 (+EV SaaS)</span>
              <span>$499 (Syndicate)</span>
            </div>
          </div>

          {/* Monthly New Customers */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800">New Acquisitions / Month</span>
              <span className="font-bold text-slate-900 font-mono">+{monthlyNewUsers} users</span>
            </div>
            <input
              type="range"
              min={5}
              max={300}
              step={5}
              value={monthlyNewUsers}
              onChange={(e) => setMonthlyNewUsers(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>5 (Slow B2B)</span>
              <span>45 (Standard)</span>
              <span>300 (Viral B2C)</span>
            </div>
          </div>

          {/* Monthly Growth Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800">Acquisition Compounding Growth</span>
              <span className="font-bold text-slate-900 font-mono">+{monthlyGrowthRate}% / mo</span>
            </div>
            <input
              type="range"
              min={0}
              max={25}
              step={1}
              value={monthlyGrowthRate}
              onChange={(e) => setMonthlyGrowthRate(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">
              MoM increase in organic referrals and search volume
            </div>
          </div>

          {/* Churn Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800">Monthly Churn Rate (%)</span>
              <span className={`font-bold font-mono ${churnRate <= 4 ? 'text-emerald-700' : churnRate <= 7 ? 'text-amber-700' : 'text-rose-700'}`}>
                {churnRate.toFixed(1)}% / mo
              </span>
            </div>
            <input
              type="range"
              min={1.0}
              max={15.0}
              step={0.5}
              value={churnRate}
              onChange={(e) => setChurnRate(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1.5% (Sticky Club SaaS)</span>
              <span>4.5% (Betting SaaS)</span>
              <span>12% (High Burn)</span>
            </div>
          </div>

          {/* CAC */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800">Customer Acquisition Cost (CAC)</span>
              <span className="font-bold text-slate-900 font-mono">${cac}</span>
            </div>
            <input
              type="range"
              min={10}
              max={400}
              step={5}
              value={cac}
              onChange={(e) => setCac(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$20 (Viral Reels)</span>
              <span>$95 (+EV Discord Ads)</span>
              <span>$350 (B2B Club Visits)</span>
            </div>
          </div>

          {/* Multiple */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800">Exit ARR Multiple</span>
              <span className="font-bold text-slate-900 font-mono">{valuationMultiple}x ARR</span>
            </div>
            <input
              type="range"
              min={4}
              max={15}
              step={1}
              value={valuationMultiple}
              onChange={(e) => setValuationMultiple(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
          </div>
        </div>

        {/* Projection Chart & Trajectory (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  24-Month Projected ARR Trajectory
                </h3>
                <p className="text-xs text-slate-500">
                  Compounding revenue growth with real-time churn offset
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  ARR Line
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="h-0.5 w-3 bg-indigo-400 border-dashed" />
                  $1M Mark ($83.3k/mo)
                </span>
              </div>
            </div>

            {/* SVG Interactive Visual Line */}
            <div className="w-full overflow-hidden bg-slate-50 rounded-lg p-3 border border-slate-100">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-48">
                {/* Background grid lines */}
                {[0.25, 0.5, 0.75, 1.0].map((ratio, idx) => {
                  const y = chartHeight - ratio * (chartHeight - 30);
                  const val = Math.round((maxArr * ratio) / 1000);
                  return (
                    <g key={idx}>
                      <line x1="40" y1={y} x2={chartWidth - 20} y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                      <text x="35" y={y + 3} textAnchor="end" fontSize="9" fill="#94a3b8">
                        ${val}k
                      </text>
                    </g>
                  );
                })}

                {/* $1M ARR Threshold Line */}
                {(() => {
                  const y1M = chartHeight - (1000000 / maxArr) * (chartHeight - 30);
                  if (y1M >= 10 && y1M <= chartHeight) {
                    return (
                      <g>
                        <line x1="40" y1={y1M} x2={chartWidth - 20} y2={y1M} stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 4" />
                        <text x={chartWidth - 25} y={y1M - 4} textAnchor="end" fontSize="9" fontWeight="bold" fill="#4f46e5">
                          $1,000,000 ARR Target
                        </text>
                      </g>
                    );
                  }
                  return null;
                })()}

                {/* Area Gradient Fill */}
                <defs>
                  <linearGradient id="arrGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Draw Area */}
                {(() => {
                  const points = projections.map((p, i) => {
                    const x = 50 + (i / (projections.length - 1)) * (chartWidth - 80);
                    const y = chartHeight - (p.arr / maxArr) * (chartHeight - 30);
                    return `${x},${y}`;
                  });
                  const areaPath = `M 50,${chartHeight} L ${points.join(' L ')} L ${chartWidth - 30},${chartHeight} Z`;
                  const linePath = `M ${points.join(' L ')}`;

                  return (
                    <>
                      <path d={areaPath} fill="url(#arrGradient)" />
                      <path d={linePath} fill="none" stroke="#059669" strokeWidth="2.5" />
                    </>
                  );
                })()}

                {/* Milestone Dot on $1M ARR */}
                {monthTo1MArr && (
                  (() => {
                    const idx = monthTo1MArr - 1;
                    const x = 50 + (idx / (projections.length - 1)) * (chartWidth - 80);
                    const y = chartHeight - (projections[idx].arr / maxArr) * (chartHeight - 30);
                    return (
                      <g>
                        <circle cx={x} cy={y} r="5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
                        <text x={x} y={y - 10} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#312e81">
                          Mo {monthTo1MArr}: $1M ARR Hit!
                        </text>
                      </g>
                    );
                  })()
                )}

                {/* X-axis months */}
                {[1, 6, 12, 18, 24].map((m) => {
                  const x = 50 + ((m - 1) / 23) * (chartWidth - 80);
                  return (
                    <text key={m} x={x} y={chartHeight - 2} textAnchor="middle" fontSize="9" fill="#64748b">
                      Mo {m}
                    </text>
                  );
                })}
              </svg>
            </div>

            {/* Key Milestone Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                  $10k MRR Checkpoint
                </div>
                <div className="text-slate-600 mt-1">
                  {monthTo100kArr ? `Achieved in Month ${monthTo100kArr}` : 'Not reached within 24 mos'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Full-time founder salary unlocked
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                  $1M ARR Milestone
                </div>
                <div className="text-slate-600 mt-1">
                  {monthTo1MArr ? `Achieved in Month ${monthTo1MArr}` : 'Requires higher ARPU'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  $83,333 MRR inflection point
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-indigo-600" />
                  $10M ARR Scale
                </div>
                <div className="text-slate-600 mt-1">
                  {monthTo10MArr ? `Month ${monthTo10MArr}` : 'Year 3-4 horizon'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Venture scale / Private Equity buyout
                </div>
              </div>
            </div>
          </div>

          {/* Tabular Snapshot */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
            <div className="p-3.5 bg-slate-50 border-b border-slate-200 font-semibold text-slate-800 flex justify-between items-center">
              <span>Quarterly Financial Snapshot</span>
              <span className="text-[11px] text-slate-500 font-normal">Active Subscribers & Revenue</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-500 text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Timeline</th>
                    <th className="py-2 px-3">Subscribers</th>
                    <th className="py-2 px-3">MRR</th>
                    <th className="py-2 px-3">ARR Run-Rate</th>
                    <th className="py-2 px-3">Est. Valuation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {[3, 6, 12, 18, 24].map((m) => {
                    const row = projections[m - 1];
                    if (!row) return null;
                    return (
                      <tr key={m} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">Month {m}</td>
                        <td className="py-2.5 px-3 font-mono">{row.activeUsers.toLocaleString()}</td>
                        <td className="py-2.5 px-3 font-mono font-medium">${Math.round(row.mrr).toLocaleString()}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-900">${Math.round(row.arr).toLocaleString()}</td>
                        <td className="py-2.5 px-3 font-mono text-emerald-700">${Math.round(row.arr * valuationMultiple).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
