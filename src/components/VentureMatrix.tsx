import React, { useState } from 'react';
import { SPORTS_MODELS } from '../data/sportsModels';
import { SportsModel } from '../types';
import { 
  ArrowRight, 
  Clock, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Sliders, 
  ExternalLink,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';

interface VentureMatrixProps {
  onSelectForSimulation: (modelId: string) => void;
  onOpenSandbox: (sandboxId: string) => void;
}

export const VentureMatrix: React.FC<VentureMatrixProps> = ({ 
  onSelectForSimulation, 
  onOpenSandbox 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedModelId, setExpandedModelId] = useState<string>('positive-ev-arbitrage');

  const filteredModels = SPORTS_MODELS.filter((model) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'fastest') return model.speedRank <= 2;
    if (selectedCategory === 'b2c') return model.id.includes('arbitrage') || model.id.includes('highlights');
    if (selectedCategory === 'b2b') return model.id.includes('pickleball') || model.id.includes('biomechanics');
    if (selectedCategory === 'marketplace') return model.id.includes('nil') || model.id.includes('tournament');
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Hero Executive Summary Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-slate-800 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wide uppercase">
            <Zap className="h-4 w-4" />
            Executive Venture Brief · Fastest Paths to $1M+ ARR in Sports Tech
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            How to Build a Sports Web App That Reaches $1,000,000+ ARR Fast
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            The sports tech market is bifurcated. Vanity apps (e.g. social fan chat, generic score trackers) make $0 because fans already have Twitter and ESPN. 
            The apps that make millions fastest solve <strong className="text-white">direct financial ROI</strong> (sports betting intelligence), <strong className="text-white">parental status & scholarship FOMO</strong> (youth highlight reels & NIL), or <strong className="text-white">physical asset yield</strong> (pickleball/padel court booking).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="border-l-2 border-emerald-500 pl-3">
              <div className="text-xs text-slate-400">Fastest to $1M ARR</div>
              <div className="text-lg font-bold text-white">6 – 10 Months</div>
              <div className="text-xs text-emerald-400 font-medium">+EV Odds Intelligence</div>
            </div>
            <div className="border-l-2 border-indigo-500 pl-3">
              <div className="text-xs text-slate-400">Largest B2C TAM</div>
              <div className="text-lg font-bold text-white">50M+ Parents</div>
              <div className="text-xs text-indigo-400 font-medium">Youth AI Video Reels</div>
            </div>
            <div className="border-l-2 border-amber-500 pl-3">
              <div className="text-xs text-slate-400">Fastest Growing Niche</div>
              <div className="text-lg font-bold text-white">+300% YoY</div>
              <div className="text-xs text-amber-400 font-medium">Padel & Pickleball OS</div>
            </div>
            <div className="border-l-2 border-cyan-500 pl-3">
              <div className="text-xs text-slate-400">Typical Gross Margin</div>
              <div className="text-lg font-bold text-white">82% – 92%</div>
              <div className="text-xs text-cyan-400 font-medium">Software / No Physical Inventory</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Segmented Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Validated Sports Business Blueprints
          </h3>
          <p className="text-xs text-slate-500">
            Ranked by speed-to-revenue, unit economics defensibility, and barrier to competition
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium self-start sm:self-auto overflow-x-auto">
          {[
            { id: 'all', label: 'All 6 Models' },
            { id: 'fastest', label: 'Fastest (<12 Mo)' },
            { id: 'b2c', label: 'B2C Subscriptions' },
            { id: 'b2b', label: 'B2B Venue SaaS' },
            { id: 'marketplace', label: 'Marketplaces' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => {
          const isExpanded = expandedModelId === model.id;
          return (
            <div
              key={model.id}
              className={`bg-white rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                model.speedRank === 1
                  ? 'border-emerald-300 shadow-sm ring-1 ring-emerald-400/20'
                  : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="p-5 space-y-4">
                {/* Header Kicker */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Rank #{model.speedRank} Speed
                  </span>
                  <span className="text-slate-500 font-medium">
                    {model.badge}
                  </span>
                </div>

                {/* Title & Summary */}
                <div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {model.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {model.summary}
                  </p>
                </div>

                {/* Quantitative Metric Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Time to $1M ARR
                    </div>
                    <div className="font-bold text-slate-900 mt-0.5">{model.timeToMillion}</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-slate-400 flex items-center gap-1">
                      <DollarSign className="h-3 w-3" /> Median ARPU
                    </div>
                    <div className="font-bold text-slate-900 mt-0.5">${model.medianArpu}/month</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-slate-400 flex items-center gap-1">
                      <Users className="h-3 w-3" /> Paying Users Needed
                    </div>
                    <div className="font-bold text-slate-900 mt-0.5">{model.targetUsersForMillion.toLocaleString()} customers</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-slate-400 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> Gross Margin
                    </div>
                    <div className="font-bold text-emerald-700 mt-0.5">{model.unitEconomics.grossMargin}</div>
                  </div>
                </div>

                {/* Key Driver Quote */}
                <div className="bg-slate-50/80 rounded-lg p-3 border border-slate-100 text-xs text-slate-700 space-y-1">
                  <div className="font-semibold text-slate-900 flex items-center gap-1 text-[11px] uppercase tracking-wide">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                    Why it prints cash:
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {model.whyItScalesFast[0]}
                  </p>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-5 pt-0 border-t border-slate-100 space-y-2 mt-auto">
                <div className="flex items-center gap-2 pt-3">
                  <button
                    onClick={() => {
                      setExpandedModelId(isExpanded ? '' : model.id);
                    }}
                    className="flex-1 text-xs font-semibold py-2 px-3 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    {isExpanded ? 'Hide Deep Blueprint' : 'Full Blueprint & 0-to-100'}
                  </button>

                  <button
                    onClick={() => onSelectForSimulation(model.id)}
                    className="text-xs font-semibold py-2 px-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
                    title="Simulate financial trajectory"
                  >
                    <Sliders className="h-3.5 w-3.5" />
                    Simulate
                  </button>
                </div>

                {/* Direct Sandbox Buttons if available */}
                {model.id === 'positive-ev-arbitrage' && (
                  <button
                    onClick={() => onOpenSandbox('scanner-sandbox')}
                    className="w-full text-xs font-medium py-1.5 px-3 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Zap className="h-3.5 w-3.5 text-emerald-600" />
                    Launch Live Odds Scanner Sandbox
                  </button>
                )}
                {model.id === 'ai-youth-highlights' && (
                  <button
                    onClick={() => onOpenSandbox('clips-sandbox')}
                    className="w-full text-xs font-medium py-1.5 px-3 rounded-lg bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200/60 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Zap className="h-3.5 w-3.5 text-indigo-600" />
                    Launch AI Highlight & NIL Sandbox
                  </button>
                )}
                {model.id === 'pickleball-padel-os' && (
                  <button
                    onClick={() => onOpenSandbox('court-sandbox')}
                    className="w-full text-xs font-medium py-1.5 px-3 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Zap className="h-3.5 w-3.5 text-amber-600" />
                    Launch Dynamic Court Pricing Sandbox
                  </button>
                )}
              </div>

              {/* Detailed Blueprint Accordion */}
              {isExpanded && (
                <div className="border-t border-slate-200 p-5 bg-slate-50/60 space-y-4 text-xs">
                  <div>
                    <h5 className="font-bold text-slate-900 mb-2">Monetization Tiers</h5>
                    <div className="space-y-2">
                      {model.monetizationTiers.map((tier, idx) => (
                        <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <div className="flex justify-between items-center font-semibold text-slate-900">
                            <span>{tier.name}</span>
                            <span className="text-emerald-700">{tier.price}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{tier.target}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 mb-2">First 100 Customers Guerrilla Playbook</h5>
                    <ul className="space-y-1.5 text-slate-600">
                      {model.goToOneHundredPlaybook.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 mb-2">Proven Precedents</h5>
                    <div className="space-y-1.5">
                      {model.provenPrecedents.map((prec, idx) => (
                        <div key={idx} className="text-slate-700">
                          <strong className="text-slate-900">{prec.name}</strong> ({prec.estimatedRevenue}): {prec.keyTakeaway}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
