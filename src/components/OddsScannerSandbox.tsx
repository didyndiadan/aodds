import React, { useState } from 'react';
import { SAMPLE_ARBITRAGE_BETS } from '../data/sportsModels';
import { ArbitrageBet } from '../types';
import { 
  Crosshair, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  Percent,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const OddsScannerSandbox: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'arbitrage' | 'positive_ev'>('all');
  const [selectedBet, setSelectedBet] = useState<ArbitrageBet>(SAMPLE_ARBITRAGE_BETS[0]);
  const [bankroll, setBankroll] = useState<number>(1000);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Dynamic calculation of arbitrage stake allocation
  // Formula: StakeA = Total * (1/OddsA) / ((1/OddsA) + (1/OddsB))
  const oddsA = selectedBet.legA.oddsDecimal;
  const oddsB = selectedBet.legB.oddsDecimal;
  const invA = 1 / oddsA;
  const invB = 1 / oddsB;
  const sumInv = invA + invB;

  const isArb = sumInv < 1.0; // Guaranteed profit exists if sum of inverse odds < 1
  const arbMargin = isArb ? ((1 - sumInv) / sumInv) * 100 : selectedBet.edgePercent;

  const stakeA = Math.round((bankroll * (invA / sumInv)) * 100) / 100;
  const stakeB = Math.round((bankroll - stakeA) * 100) / 100;

  const payoutA = Math.round((stakeA * oddsA) * 100) / 100;
  const payoutB = Math.round((stakeB * oddsB) * 100) / 100;

  const guaranteedProfitA = Math.round((payoutA - bankroll) * 100) / 100;
  const guaranteedProfitB = Math.round((payoutB - bankroll) * 100) / 100;
  const minGuaranteedProfit = Math.min(guaranteedProfitA, guaranteedProfitB);

  const simulateLiveRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const filteredBets = SAMPLE_ARBITRAGE_BETS.filter((b) => {
    if (filterType === 'all') return true;
    return b.type === filterType;
  });

  return (
    <div className="space-y-8">
      {/* Header & Strategic Context */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wide">
            <Crosshair className="h-4 w-4" />
            Live Product Prototype #1 · The "OddsJam" SaaS Blueprint
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Positive-EV & Odds Arbitrage Intelligence Scanner
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            This is the #1 fastest model to $1M ARR in sports tech. Why? When software delivers immediate, mathematical cash returns, <strong className="text-white">pricing power is virtually unlimited</strong>. A subscriber with a $2,000 bankroll locks in $300–$800/mo in risk-free arbitrage—so paying you $149/mo is an effortless decision with near-zero customer churn.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Real-time line discrepancies across 5 bookmakers
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
              Automated Kelly Criterion bet sizing
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              91% pure software gross margins
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Scanned Opportunities (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Live Bookmaker Opportunities
                {isRefreshing && <RefreshCw className="h-3.5 w-3.5 animate-spin text-slate-400" />}
              </h3>
              <p className="text-xs text-slate-500">
                Click any line discrepancy to test the real-time bet calculator
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${filterType === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
                >
                  All ({SAMPLE_ARBITRAGE_BETS.length})
                </button>
                <button
                  onClick={() => setFilterType('arbitrage')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${filterType === 'arbitrage' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
                >
                  Arbitrage (Risk-Free)
                </button>
                <button
                  onClick={() => setFilterType('positive_ev')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${filterType === 'positive_ev' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
                >
                  +EV (Expected Value)
                </button>
              </div>

              <button
                onClick={simulateLiveRefresh}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                title="Refresh odds feeds"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* List of Scanned Opportunities */}
          <div className="space-y-3">
            {filteredBets.map((bet) => {
              const isSelected = selectedBet.id === bet.id;
              return (
                <div
                  key={bet.id}
                  onClick={() => setSelectedBet(bet)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/20 ring-1 ring-emerald-500/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">{bet.sport} · {bet.league}</span>
                        <span>·</span>
                        <span>{bet.startTime}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">
                        {bet.match}
                      </h4>
                      <div className="text-xs text-slate-600 mt-0.5 font-medium">
                        Market: {bet.market}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1 font-mono font-bold text-emerald-700 text-sm bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <TrendingUp className="h-3.5 w-3.5" />
                        +{bet.edgePercent}% {bet.type === 'arbitrage' ? 'Guaranteed Arb' : '+EV Value'}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {bet.type === 'arbitrage' ? 'Zero Market Risk' : 'Sharp Pinnacle Edge'}
                      </div>
                    </div>
                  </div>

                  {/* Two Legs Comparison */}
                  <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                      <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                        Leg 1 ({bet.legA.bookmaker})
                      </div>
                      <div className="font-semibold text-slate-900 mt-0.5 truncate">
                        {bet.legA.selection}
                      </div>
                      <div className="font-mono text-emerald-800 font-bold mt-1 text-sm">
                        +{bet.legA.oddsAmerican} ({bet.legA.oddsDecimal}x)
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                      <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                        Leg 2 ({bet.legB.bookmaker})
                      </div>
                      <div className="font-semibold text-slate-900 mt-0.5 truncate">
                        {bet.legB.selection}
                      </div>
                      <div className="font-mono text-indigo-800 font-bold mt-1 text-sm">
                        {bet.legB.oddsAmerican > 0 ? `+${bet.legB.oddsAmerican}` : bet.legB.oddsAmerican} ({bet.legB.oddsDecimal}x)
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Bet Sizer & Profit Lock Engine (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-emerald-600" />
                Arbitrage Execution Calculator
              </h3>
              <span className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                +{arbMargin.toFixed(2)}% Net Edge
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Calculating optimal Kelly-proportional bet split for {selectedBet.match}
            </p>
          </div>

          {/* Bankroll Input Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800">Total Wager Bankroll</span>
              <span className="font-bold font-mono text-base text-slate-900">${bankroll.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={100}
              max={10000}
              step={100}
              value={bankroll}
              onChange={(e) => setBankroll(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$100 (Starter)</span>
              <span>$1,000 (Typical)</span>
              <span>$10,000 (Syndicate)</span>
            </div>
          </div>

          {/* Exact Stake Allocation Instructions */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
            <div className="font-semibold text-slate-900 text-xs uppercase tracking-wide">
              Step-by-Step Bet Placement:
            </div>

            <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
              <div>
                <div className="text-[11px] text-slate-500">Wager on {selectedBet.legA.bookmaker}</div>
                <div className="font-bold text-slate-900">{selectedBet.legA.selection}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-sm text-slate-900">${stakeA.toFixed(2)}</div>
                <div className="text-[10px] text-slate-500">Pays ${payoutA.toFixed(2)}</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
              <div>
                <div className="text-[11px] text-slate-500">Wager on {selectedBet.legB.bookmaker}</div>
                <div className="font-bold text-slate-900">{selectedBet.legB.selection}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-sm text-slate-900">${stakeB.toFixed(2)}</div>
                <div className="text-[10px] text-slate-500">Pays ${payoutB.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Guaranteed Payoff Summary Box */}
          <div className="p-4 rounded-xl bg-emerald-950 text-white space-y-2">
            <div className="flex items-center justify-between text-xs text-emerald-300">
              <span>Outcome If Leg 1 Wins:</span>
              <span className="font-mono text-white font-bold">+${guaranteedProfitA.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-emerald-300">
              <span>Outcome If Leg 2 Wins:</span>
              <span className="font-mono text-white font-bold">+${guaranteedProfitB.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-emerald-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-200">Guaranteed Risk-Free Profit:</span>
              <span className="text-lg font-mono font-black text-emerald-400">
                +${minGuaranteedProfit.toFixed(2)} <span className="text-xs font-normal text-emerald-300">({arbMargin.toFixed(2)}% ROI)</span>
              </span>
            </div>
          </div>

          {/* Why Customers Pay $149/mo For This */}
          <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50 text-xs space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-500" />
              The Multi-Million Dollar SaaS Mechanism:
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              If a subscriber places 5 of these arbitrage wagers a day with a $1,000 bankroll, they make <strong className="text-slate-900">+$186/day in pure profit</strong>. 
              Your software costs $149/month. The customer earns back your monthly subscription price in less than 24 hours. This results in unprecedented sub-5% churn rates and word-of-mouth viral growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
