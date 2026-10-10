import React, { useState } from 'react';
import { SPORTS_MODELS } from '../data/sportsModels';
import { SportsModel } from '../types';
import { 
  FileText, 
  Copy, 
  Download, 
  Check, 
  ShieldAlert, 
  Cpu, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2,
  Share2
} from 'lucide-react';

export const InvestorOnePager: React.FC = () => {
  const [selectedModelId, setSelectedModelId] = useState<string>('positive-ev-arbitrage');
  const [copied, setCopied] = useState<boolean>(false);

  const model = SPORTS_MODELS.find((m) => m.id === selectedModelId) || SPORTS_MODELS[0];

  const memoMarkdown = `# Executive Venture Memorandum: ${model.name}
Target Valuation: $8,000,000 | Speed to $1M ARR: ${model.timeToMillion}

## 1. Executive Summary
${model.summary}

## 2. Why This Generates Millions Faster
${model.whyItScalesFast.map((w) => `- ${w}`).join('\n')}

## 3. Unit Economics & Pricing Model
- Target Paying Customers for $1M ARR: ${model.targetUsersForMillion}
- Median ARPU: $${model.medianArpu} / month
- Gross Margin: ${model.unitEconomics.grossMargin}
- Estimated LTV: ${model.unitEconomics.ltv}
- Estimated CAC: ${model.unitEconomics.cac}
- LTV : CAC Ratio: ${model.unitEconomics.ltvCacRatio}
- CAC Payback Period: ${model.unitEconomics.paybackMonths}

## 4. Monetization Tiers
${model.monetizationTiers.map((t) => `### ${t.name} (${t.price})\nTarget: ${t.target}\nFeatures: ${t.features.join(', ')}`).join('\n\n')}

## 5. Technology Stack & Infrastructure
${model.techStack.map((ts) => `- **${ts.category}**: ${ts.tools.join(', ')}`).join('\n')}

## 6. First 100 Customers Guerrilla Playbook
${model.goToOneHundredPlaybook.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

## 7. Comparable Market Precedents
${model.provenPrecedents.map((p) => `- **${p.name}** (${p.estimatedRevenue}): ${p.keyTakeaway}`).join('\n')}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(memoMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([memoMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${model.id}-investor-memo.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wide">
            <FileText className="h-4 w-4" />
            Executive Venture Memorandum & Tech Blueprint
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Investor-Grade Venture Memo & Architecture Spec
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Ready to build or raise capital? Export a quantitative one-page memo complete with API architecture, legal moats, customer acquisition flywheels, and financial milestones.
          </p>
        </div>
      </div>

      {/* Select Model & Export Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700">Select Model Blueprint:</span>
          <select
            value={selectedModelId}
            onChange={(e) => setSelectedModelId(e.target.value)}
            className="text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            {SPORTS_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.timeToMillion})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied Markdown!' : 'Copy Markdown'}
          </button>
          <button
            onClick={handleDownload}
            className="text-xs font-semibold py-1.5 px-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Download Memo (.md)
          </button>
        </div>
      </div>

      {/* Structured Memo Layout */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 max-w-4xl mx-auto">
        {/* Memo Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              CONFIDENTIAL VENTURE BRIEF · SERIES SEED BLUEPRINT
            </div>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {model.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Engineered for $1,000,000+ ARR velocity within {model.timeToMillion}
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xs text-slate-500">Target Scale</div>
            <div className="text-xl font-mono font-bold text-emerald-700">
              ${(model.targetUsersForMillion * model.medianArpu * 12).toLocaleString()} ARR
            </div>
            <div className="text-[10px] text-slate-400">
              at {model.targetUsersForMillion.toLocaleString()} subscribers
            </div>
          </div>
        </div>

        {/* Section 1: Executive Thesis */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            1. Core Investment Thesis
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {model.summary}
          </p>
        </div>

        {/* Section 2: Why This Model Outpaces Vanity Sports Apps */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            2. The Speed-To-Capital Mechanism
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {model.whyItScalesFast.map((reason, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Unit Economics Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            3. Target SaaS Unit Economics
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-slate-400 text-[10px]">Gross Margin</span>
              <div className="font-bold text-slate-900 text-base mt-0.5">{model.unitEconomics.grossMargin}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-slate-400 text-[10px]">Customer LTV</span>
              <div className="font-bold text-slate-900 text-base mt-0.5">{model.unitEconomics.ltv}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-slate-400 text-[10px]">Target CAC</span>
              <div className="font-bold text-slate-900 text-base mt-0.5">{model.unitEconomics.cac}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-slate-400 text-[10px]">LTV : CAC</span>
              <div className="font-bold text-emerald-700 text-base mt-0.5">{model.unitEconomics.ltvCacRatio}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 col-span-2 sm:col-span-1">
              <span className="text-slate-400 text-[10px]">CAC Payback</span>
              <div className="font-bold text-slate-900 text-base mt-0.5">{model.unitEconomics.paybackMonths}</div>
            </div>
          </div>
        </div>

        {/* Section 4: Technology Architecture */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            4. Recommended Production Tech Stack
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {model.techStack.map((stack, idx) => (
              <div key={idx} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                <span className="font-semibold text-slate-900 text-xs block mb-1">
                  {stack.category}
                </span>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  {stack.tools.map((t, tIdx) => (
                    <li key={tIdx} className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Legal & Regulatory Moat */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            5. Regulatory Defensibility & Compliance
          </h4>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 space-y-2">
            <div className="font-semibold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-emerald-600" />
              Software vs. Gambling / Licensure Separation:
            </div>
            <p className="leading-relaxed text-[11px]">
              This architecture functions purely as <strong className="text-slate-900">B2C analytics & decision intelligence software</strong>. The application NEVER handles or places wagers directly, eliminating all state sportsbook licensing requirements. It operates legally worldwide under standard SaaS digital publishing guidelines.
            </p>
          </div>
        </div>

        {/* Section 6: First 100 Customers Plan */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            6. 0-to-100 Paying Customer Flywheel
          </h4>
          <div className="space-y-2 text-xs">
            {model.goToOneHundredPlaybook.map((step, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-slate-100 bg-white flex items-start gap-2.5">
                <span className="font-bold text-slate-900 font-mono w-4">{idx + 1}.</span>
                <span className="text-slate-700">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
