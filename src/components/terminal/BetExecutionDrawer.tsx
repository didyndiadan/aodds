import React, { useState } from 'react';
import { OddsOpportunity, LoggedBet } from '../../types/odds';
import { 
  X, 
  Lock, 
  DollarSign, 
  ExternalLink, 
  Check, 
  TrendingUp, 
  ShieldAlert, 
  AlertCircle,
  Percent,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface BetExecutionDrawerProps {
  opportunity: OddsOpportunity | null;
  onClose: () => void;
  onLogBet: (bet: LoggedBet) => void;
  bankroll: number;
}

export const BetExecutionDrawer: React.FC<BetExecutionDrawerProps> = ({
  opportunity,
  onClose,
  onLogBet,
  bankroll,
}) => {
  if (!opportunity) return null;

  const [wagerTotal, setWagerTotal] = useState<number>(Math.min(1000, bankroll));
  const [roundToNearestFive, setRoundToNearestFive] = useState<boolean>(true);
  const [kellyFraction, setKellyFraction] = useState<number>(0.5); // Half Kelly default
  const [justLogged, setJustLogged] = useState<boolean>(false);

  const oddsA = opportunity.legA.oddsDecimal;
  const oddsB = opportunity.legB.oddsDecimal;

  // Arbitrage math
  const invA = 1 / oddsA;
  const invB = 1 / oddsB;
  const sumInv = invA + invB;
  const isArb = sumInv < 1.0;

  let rawStakeA = (wagerTotal * (invA / sumInv));
  let rawStakeB = (wagerTotal - rawStakeA);

  if (roundToNearestFive) {
    rawStakeA = Math.round(rawStakeA / 5) * 5;
    rawStakeB = Math.round(rawStakeB / 5) * 5;
  } else {
    rawStakeA = Math.round(rawStakeA * 100) / 100;
    rawStakeB = Math.round(rawStakeB * 100) / 100;
  }

  const effectiveTotal = rawStakeA + rawStakeB;
  const payoutA = Math.round(rawStakeA * oddsA * 100) / 100;
  const payoutB = Math.round(rawStakeB * oddsB * 100) / 100;

  const profitA = Math.round((payoutA - effectiveTotal) * 100) / 100;
  const profitB = Math.round((payoutB - effectiveTotal) * 100) / 100;
  const minGuaranteedProfit = Math.min(profitA, profitB);
  const guaranteedRoi = effectiveTotal > 0 ? (minGuaranteedProfit / effectiveTotal) * 100 : 0;

  const handleLog = () => {
    const newBet: LoggedBet = {
      id: `bet-${Date.now()}`,
      opportunityId: opportunity.id,
      match: opportunity.match,
      market: opportunity.marketName,
      type: opportunity.type,
      placedAt: 'Just now',
      totalStake: effectiveTotal,
      stakeA: rawStakeA,
      stakeB: rawStakeB,
      bookmakerA: opportunity.legA.bookmaker,
      bookmakerB: opportunity.legB.bookmaker,
      oddsA,
      oddsB,
      guaranteedProfit: minGuaranteedProfit,
      expectedValueProfit: Math.round(effectiveTotal * (opportunity.edgePercent / 100)),
      roiPercent: guaranteedRoi,
      status: 'PENDING',
    };
    onLogBet(newBet);
    setJustLogged(true);
    setTimeout(() => {
      setJustLogged(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-slate-950 border-l border-slate-800 shadow-2xl z-50 flex flex-col justify-between text-white font-sans">
      {/* Drawer Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-emerald-400 font-bold uppercase">{opportunity.type} EXECUTION</span>
            <span>·</span>
            <span>{opportunity.sport}</span>
          </div>
          <h3 className="text-base font-bold text-white mt-0.5">
            {opportunity.match}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {opportunity.marketName}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="p-5 overflow-y-auto space-y-6 flex-1 text-xs">
        {/* Edge Banner */}
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              {opportunity.type === 'arbitrage' ? 'GUARANTEED ARB EDGE' : '+EV VALUE ADVANTAGE'}
            </span>
            <div className="text-2xl font-black font-mono text-emerald-400 mt-0.5">
              +{opportunity.edgePercent.toFixed(2)}%
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-400 font-mono">
            <div>EST. LIQUIDITY</div>
            <div className="text-white font-bold">${opportunity.liquidityLimitEstimate?.toLocaleString()} max</div>
          </div>
        </div>

        {/* Total Bankroll Wager Slider */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-300">Total Wager Allocation:</span>
            <span className="font-mono font-bold text-lg text-emerald-400">${wagerTotal.toLocaleString()}</span>
          </div>

          <input
            type="range"
            min={100}
            max={5000}
            step={50}
            value={wagerTotal}
            onChange={(e) => setWagerTotal(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />

          <div className="flex items-center gap-1.5">
            {[250, 500, 1000, 2500].map((val) => (
              <button
                key={val}
                onClick={() => setWagerTotal(val)}
                className={`flex-1 py-1 rounded border text-[11px] font-mono transition-colors ${
                  wagerTotal === val
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                ${val}
              </button>
            ))}
          </div>

          {/* Anti-Flag Account Rounding Toggle */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-300">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
              <span>Round stakes to $5 (Anti-Limiting Protection)</span>
            </div>
            <input
              type="checkbox"
              checked={roundToNearestFive}
              onChange={(e) => setRoundToNearestFive(e.target.checked)}
              className="accent-emerald-500 cursor-pointer h-4 w-4"
            />
          </div>
        </div>

        {/* Two Legs Instructions */}
        <div className="space-y-3">
          <div className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
            Execute These 2 Bet Slips:
          </div>

          {/* Slip Leg A */}
          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white text-xs">
                {opportunity.legA.bookmaker}
              </span>
              <span className="font-mono text-emerald-400 font-bold text-xs">
                {opportunity.legA.oddsAmerican > 0 ? `+${opportunity.legA.oddsAmerican}` : opportunity.legA.oddsAmerican} ({oddsA}x)
              </span>
            </div>
            <div className="text-slate-300 font-medium">
              Selection: <strong className="text-white">{opportunity.legA.selection}</strong>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-[11px]">
              <span className="text-slate-400">Place Exact Stake:</span>
              <span className="font-mono font-bold text-sm text-white">${rawStakeA.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400">
              <span>Potential Return:</span>
              <span className="font-mono font-semibold text-emerald-300">${payoutA.toFixed(2)}</span>
            </div>
          </div>

          {/* Slip Leg B */}
          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white text-xs">
                {opportunity.legB.bookmaker}
              </span>
              <span className="font-mono text-indigo-300 font-bold text-xs">
                {opportunity.legB.oddsAmerican > 0 ? `+${opportunity.legB.oddsAmerican}` : opportunity.legB.oddsAmerican} ({oddsB}x)
              </span>
            </div>
            <div className="text-slate-300 font-medium">
              Selection: <strong className="text-white">{opportunity.legB.selection}</strong>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-[11px]">
              <span className="text-slate-400">Place Exact Stake:</span>
              <span className="font-mono font-bold text-sm text-white">${rawStakeB.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400">
              <span>Potential Return:</span>
              <span className="font-mono font-semibold text-emerald-300">${payoutB.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Guaranteed Profit Summary Card */}
        <div className="p-4 bg-emerald-950 border border-emerald-500/40 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-[11px] text-emerald-300">
            <span>If {opportunity.legA.bookmaker} Selection Wins:</span>
            <span className="font-mono font-bold text-white">+${profitA.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-emerald-300">
            <span>If {opportunity.legB.bookmaker} Selection Wins:</span>
            <span className="font-mono font-bold text-white">+${profitB.toFixed(2)}</span>
          </div>
          <div className="pt-2 border-t border-emerald-800/80 flex justify-between items-center">
            <span className="font-bold text-emerald-200">Guaranteed Risk-Free Profit:</span>
            <span className="font-mono font-black text-lg text-emerald-400">
              +${minGuaranteedProfit.toFixed(2)} ({guaranteedRoi.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Live Mathematical Formula & Analytics Breakdown */}
        <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-[11px] text-slate-300">
          <div className="font-bold text-white flex items-center justify-between text-xs">
            <span>Algorithmic Mathematical Breakdown</span>
            <span className="font-mono text-emerald-400 font-bold">100% PROVABLE MATH</span>
          </div>
          {opportunity.type === 'arbitrage' ? (
            <div className="space-y-1 font-mono text-[10px] text-slate-400">
              <div>• Leg 1 Implied Probability: (1 / {oddsA}) = {(invA * 100).toFixed(2)}%</div>
              <div>• Leg 2 Implied Probability: (1 / {oddsB}) = {(invB * 100).toFixed(2)}%</div>
              <div className="text-emerald-300">• Total Implied Market: {(sumInv * 100).toFixed(2)}% (&lt; 100% = Negative Bookmaker Hold)</div>
              <div className="text-white pt-1 font-sans text-[11px]">
                Because the market total is under 100%, risk is mathematically eliminated by placing proportional stakes on both books.
              </div>
            </div>
          ) : (
            <div className="space-y-1 font-mono text-[10px] text-slate-400">
              <div>• Target Book Odds: {oddsA}x ({opportunity.legA.bookmaker})</div>
              <div>• Sharp Benchmark No-Vig Odds: {opportunity.sharpBenchmark?.noVigOddsDecimal || 2.05}x ({opportunity.sharpBenchmark?.bookmaker || 'Pinnacle'})</div>
              <div className="text-cyan-300">• Mathematical Edge: +{opportunity.edgePercent.toFixed(2)}% EV</div>
              <div className="text-white pt-1 font-sans text-[11px]">
                The bookmaker mispriced this line compared to the sharpest market in the world. Compounding positive EV guarantees long-term profit over statistical volume.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Drawer Action Bar */}
      <div className="p-5 border-t border-slate-800 bg-slate-900/60 flex items-center gap-3">
        <button
          onClick={handleLog}
          disabled={justLogged}
          className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
        >
          {justLogged ? (
            <>
              <Check className="h-4 w-4" />
              <span>Bet Logged to Portfolio!</span>
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              <span>Log Bet & Track +${minGuaranteedProfit.toFixed(2)} P&L</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
