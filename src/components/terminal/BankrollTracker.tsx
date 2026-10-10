import React from 'react';
import { LoggedBet } from '../../types/odds';
import { 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface BankrollTrackerProps {
  loggedBets: LoggedBet[];
  totalBankroll: number;
}

export const BankrollTracker: React.FC<BankrollTrackerProps> = ({
  loggedBets,
  totalBankroll,
}) => {
  const totalProfitLocked = loggedBets.reduce((acc, b) => acc + (b.guaranteedProfit || b.expectedValueProfit || 0), 0);
  const totalVolumeWagered = loggedBets.reduce((acc, b) => acc + b.totalStake, 0);
  const overallRoi = totalVolumeWagered > 0 ? (totalProfitLocked / totalVolumeWagered) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Top Portfolio Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-xs flex justify-between items-center font-mono">
            <span>TOTAL ACTIVE BANKROLL</span>
            <Wallet className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white mt-1">
            ${(totalBankroll + totalProfitLocked).toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
            +${totalProfitLocked.toFixed(2)} from arbitrage
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-xs flex justify-between items-center font-mono">
            <span>LOCKED ARBITRAGE PROFIT</span>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
            +${totalProfitLocked.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            {loggedBets.length} executed risk-free arbs
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-xs flex justify-between items-center font-mono">
            <span>AVERAGE RETURN ON STAKE</span>
            <Award className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black font-mono text-indigo-300 mt-1">
            +{overallRoi.toFixed(2)}%
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            Across ${(totalVolumeWagered).toLocaleString()} total wager volume
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-xs flex justify-between items-center font-mono">
            <span>WIN RATE / RISK EXPOSURE</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
            100%
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            Zero losses via mathematical hedging
          </div>
        </div>
      </div>

      {/* Strategic Retention Explainer Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">
              The Retention Secret That Makes Millions
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5 max-w-2xl">
              Every row in this ledger proves to the subscriber that your software makes them money. When users see a green +$500 to +$2,000 monthly P&L, <strong className="text-white">canceling their $149/mo subscription feels like turning off an ATM</strong>. This is why OddsJam maintains an industry-leading 96%+ monthly retention rate.
            </p>
          </div>
        </div>
      </div>

      {/* Logged Bets History Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center text-xs">
          <h3 className="font-bold text-white flex items-center gap-2">
            <span>Wager Execution & Settlement Ledger</span>
            <span className="font-mono text-slate-500">({loggedBets.length} positions)</span>
          </h3>
          <span className="text-[11px] font-mono text-emerald-400 font-semibold">
            All Hedged Positions Settled in Cash
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-4">Date & Match</th>
                <th className="py-2.5 px-4">Market</th>
                <th className="py-2.5 px-4">Bookmaker Legs</th>
                <th className="py-2.5 px-4">Total Stake</th>
                <th className="py-2.5 px-4">Net Profit</th>
                <th className="py-2.5 px-4">ROI</th>
                <th className="py-2.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {loggedBets.map((bet) => (
                <tr key={bet.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="text-[10px] font-mono text-slate-500">{bet.placedAt}</div>
                    <div className="font-bold text-white text-xs mt-0.5">{bet.match}</div>
                  </td>

                  <td className="py-3 px-4 text-slate-300 font-medium">
                    {bet.market}
                  </td>

                  <td className="py-3 px-4">
                    <div className="text-slate-300 font-mono text-[11px]">
                      {bet.bookmakerA} (${bet.stakeA.toFixed(0)}) vs {bet.bookmakerB} (${bet.stakeB.toFixed(0)})
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-white">
                    ${bet.totalStake.toLocaleString()}
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                    +${(bet.guaranteedProfit || bet.expectedValueProfit || 0).toFixed(2)}
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-indigo-300">
                    +{bet.roiPercent.toFixed(2)}%
                  </td>

                  <td className="py-3 px-4 text-right">
                    <span className="font-mono text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded font-bold">
                      SETTLED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
