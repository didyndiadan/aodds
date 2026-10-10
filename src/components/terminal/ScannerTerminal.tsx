import React, { useState } from 'react';
import { OddsOpportunity, OpportunityType } from '../../types/odds';
import { 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Clock, 
  Lock, 
  CheckCircle, 
  Sparkles,
  Flame,
  Filter,
  Maximize2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ScannerTerminalProps {
  opportunities: OddsOpportunity[];
  selectedOpportunity: OddsOpportunity | null;
  onSelectOpportunity: (opp: OddsOpportunity) => void;
  filterType: OpportunityType | 'all';
  setFilterType: (type: OpportunityType | 'all') => void;
  selectedSport: string;
  setSelectedSport: (sport: string) => void;
  minEdge: number;
  setMinEdge: (edge: number) => void;
  isRealCommercialFeed?: boolean;
  onOpenPricing?: () => void;
}

export const ScannerTerminal: React.FC<ScannerTerminalProps> = ({
  opportunities,
  selectedOpportunity,
  onSelectOpportunity,
  filterType,
  setFilterType,
  selectedSport,
  setSelectedSport,
  minEdge,
  setMinEdge,
  isRealCommercialFeed = false,
  onOpenPricing,
}) => {
  const { user, isPaidSubscriber, switchRole } = useAuth();
  const sports = ['All Sports', 'NBA', 'NFL', 'EPL', 'MLB', 'UFC', 'NHL'];

  const typeLabels = [
    { id: 'all', label: 'All Opportunities', count: opportunities.length },
    { id: 'arbitrage', label: 'Arbitrage (Risk-Free)', count: opportunities.filter((o) => o.type === 'arbitrage').length },
    { id: 'positive_ev', label: '+EV Value Bets', count: opportunities.filter((o) => o.type === 'positive_ev').length },
    { id: 'middle', label: 'Middles (Win Both)', count: opportunities.filter((o) => o.type === 'middle').length },
  ];

  return (
    <div className="space-y-4">
      {/* Control Bar: Type Selector, Sports, Min Edge */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {typeLabels.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilterType(t.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
                filterType === t.id
                  ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{t.label}</span>
              <span className="font-mono text-[10px] text-slate-500">({t.count})</span>
            </button>
          ))}
        </div>

        {/* Sports & Edge Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Sports Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Sport:</span>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-emerald-500/60 font-mono"
            >
              {sports.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Min Edge Slider */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1 rounded-lg">
            <span className="text-slate-400">Min Edge:</span>
            <input
              type="range"
              min={1.0}
              max={8.0}
              step={0.5}
              value={minEdge}
              onChange={(e) => setMinEdge(Number(e.target.value))}
              className="w-16 accent-emerald-500 cursor-pointer"
            />
            <span className="font-mono font-bold text-emerald-400 text-xs w-9">
              {minEdge.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Live Computation & Mathematical Verification Bar */}
      <div className="bg-slate-900/60 border border-slate-800/80 px-4 py-2 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="text-slate-300">
            <strong className="text-white">Active Math Engine:</strong> Implied probability inversion Sum(1 / Odds) &lt; 1.00 locks in guaranteed profit on both legs.
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono shrink-0">
          <span className="text-slate-400">Data Source:</span>
          <span className={`px-2 py-0.5 rounded font-bold ${isRealCommercialFeed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-cyan-300 border border-slate-700'}`}>
            {isRealCommercialFeed ? 'The Odds API (Live 25+ Bookmakers)' : 'Built-in Operational Engine'}
          </span>
        </div>
      </div>

      {/* Onboarding vs Paid Tier Differentiation Banner */}
      {!isPaidSubscriber ? (
        <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/40 border border-blue-500/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">Onboarding & Free Tier: Built-in Operational Engine</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded font-mono font-bold">
                  FREE PREVIEW
                </span>
              </div>
              <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                You are experiencing the <strong>verified mathematical structure of arbitrage</strong> (implied probabilities, Kelly stake weighting, and guaranteed profit calculation).
                The <strong>Live Commercial Feed from 25+ Sportsbooks via The Odds API</strong> is exclusively active for Pro Subscribers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onOpenPricing && (
              <button
                onClick={onOpenPricing}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Zap className="h-3.5 w-3.5 fill-current" />
                <span>Upgrade to Pro for Live API</span>
              </button>
            )}
            <button
              onClick={() => switchRole('pro_subscriber')}
              className="px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono transition-colors cursor-pointer"
              title="Test view as Pro Subscriber"
            >
              Test Pro View
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-emerald-300 font-bold">Pro Subscriber Account Active:</span>
            <span className="text-slate-300 text-[11px]">
              {isRealCommercialFeed
                ? 'Streaming real-time odds from The Odds API (Rotated Key Pool · Sub-Minute Latency across 25+ sportsbooks).'
                : 'Pro subscription verified. Streaming high-speed sports odds engine.'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
              PRO SUBSCRIBER STREAM
            </span>
            <button
              onClick={() => switchRole('free_user')}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-[10px] font-mono transition-colors cursor-pointer"
              title="Test onboarding view as Free User"
            >
              Test Free User View
            </button>
          </div>
        </div>
      )}

      {/* High-Density Terminal Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-4">Edge & Type</th>
                <th className="py-2.5 px-4">Match & League</th>
                <th className="py-2.5 px-4">Market</th>
                <th className="py-2.5 px-4">Leg 1 (Best Line)</th>
                <th className="py-2.5 px-4">Leg 2 (Counter / Sharp)</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {opportunities.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 text-xs">
                    No active betting opportunities meet your filters. Try lowering the minimum edge threshold.
                  </td>
                </tr>
              ) : (
                opportunities.map((opp) => {
                  const isSelected = selectedOpportunity?.id === opp.id;
                  return (
                    <tr
                      key={opp.id}
                      onClick={() => onSelectOpportunity(opp)}
                      className={`cursor-pointer transition-colors group ${
                        isSelected
                          ? 'bg-emerald-950/25 border-l-2 border-emerald-400'
                          : 'hover:bg-slate-900/50'
                      }`}
                    >
                      {/* Edge Column */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="inline-flex items-center gap-1 font-mono font-bold text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                            <TrendingUp className="h-3 w-3" />
                            +{opp.edgePercent.toFixed(2)}%
                          </div>
                          <span className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded font-semibold ${
                            opp.type === 'arbitrage'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : opp.type === 'positive_ev'
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}>
                            {opp.type === 'arbitrage' ? 'ARB' : opp.type === 'positive_ev' ? '+EV' : 'MIDDLE'}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 mt-1 flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Updated {opp.lastUpdatedSecondsAgo}s ago</span>
                        </div>
                      </td>

                      {/* Match & Sport */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                          <span className="text-white font-semibold">{opp.sport}</span>
                          <span>·</span>
                          <span>{opp.startTime}</span>
                        </div>
                        <div className="font-bold text-white text-xs mt-0.5 group-hover:text-emerald-400 transition-colors">
                          {opp.match}
                        </div>
                      </td>

                      {/* Market Name */}
                      <td className="py-3 px-4">
                        <div className="text-slate-300 font-medium text-xs">
                          {opp.marketName}
                        </div>
                        {opp.middleSpreadGap && (
                          <div className="text-[10px] font-mono text-amber-400 mt-0.5 font-semibold">
                            {opp.middleSpreadGap}
                          </div>
                        )}
                      </td>

                      {/* Leg 1 */}
                      <td className="py-3 px-4">
                        <div className="bg-slate-900 border border-slate-800/80 p-2 rounded-lg text-xs">
                          <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
                            <span className="font-bold text-slate-300">{opp.legA.bookmaker}</span>
                            <span className="text-emerald-400 font-mono">BEST</span>
                          </div>
                          <div className="font-semibold text-white mt-0.5 truncate max-w-40">
                            {opp.legA.selection}
                          </div>
                          <div className="font-mono text-emerald-400 font-bold mt-0.5">
                            {opp.legA.oddsAmerican > 0 ? `+${opp.legA.oddsAmerican}` : opp.legA.oddsAmerican}{' '}
                            <span className="text-slate-500 text-[10px]">({opp.legA.oddsDecimal}x)</span>
                          </div>
                        </div>
                      </td>

                      {/* Leg 2 */}
                      <td className="py-3 px-4">
                        <div className="bg-slate-900 border border-slate-800/80 p-2 rounded-lg text-xs">
                          <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
                            <span className="font-bold text-slate-300">{opp.legB.bookmaker}</span>
                            {opp.sharpBenchmark && (
                              <span className="text-cyan-400 font-mono">BENCHMARK</span>
                            )}
                          </div>
                          <div className="font-semibold text-white mt-0.5 truncate max-w-40">
                            {opp.legB.selection}
                          </div>
                          <div className="font-mono text-indigo-300 font-bold mt-0.5">
                            {opp.legB.oddsAmerican > 0 ? `+${opp.legB.oddsAmerican}` : opp.legB.oddsAmerican}{' '}
                            <span className="text-slate-500 text-[10px]">({opp.legB.oddsDecimal}x)</span>
                          </div>
                        </div>
                      </td>

                      {/* Action Button */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectOpportunity(opp);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors inline-flex items-center gap-1 shadow-xs"
                        >
                          <Lock className="h-3 w-3" />
                          <span>Size Bet</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
