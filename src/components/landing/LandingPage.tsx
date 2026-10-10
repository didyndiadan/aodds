import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  Lock, 
  DollarSign, 
  Sliders, 
  Star, 
  Users, 
  Clock, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  Flame,
  Check
} from 'lucide-react';

interface LandingPageProps {
  onLaunchTerminal: () => void;
  onOpenPricing: () => void;
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchTerminal,
  onOpenPricing,
  onOpenAuth,
}) => {
  const [interactiveBankroll, setInteractiveBankroll] = useState<number>(3000);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // ROI math
  // Average daily arbitrage return: ~1.2% on total bankroll per day with 4-5 bets
  const monthlyProfitEst = Math.round(interactiveBankroll * 0.012 * 25);
  const annualProfitEst = monthlyProfitEst * 12;
  const daysToPaySubscription = Math.max(1, Math.round(149 / (interactiveBankroll * 0.012)));

  const toggleFaq = (idx: number) => {
    setFaqOpen(faqOpen === idx ? null : idx);
  };

  return (
    <div className="space-y-20 pb-16 text-white font-sans">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 text-center max-w-4xl mx-auto space-y-6 px-4">
        {/* Top Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold tracking-wide uppercase">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Real-Time WebSocket Odds · 25+ Sportsbooks Scanned</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          Turn Mathematical Discrepancies Into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Guaranteed Cash
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Stop gambling on hunches. ApexOdds scans millions of sportsbook odds every second to find risk-free arbitrage and mathematically positive EV bets. 
          Lock in profit regardless of who wins the game.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onLaunchTerminal}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Launch Live Scanner Demo</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onOpenAuth}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="h-4 w-4 text-emerald-400" />
            <span>Start 7-Day Free Trial</span>
          </button>
        </div>

        {/* Social Proof Counter Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-slate-850 text-left">
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-mono">TOTAL PROFIT LOCKED</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">$14,280,000+</div>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-mono">PRO SUBSCRIBERS</div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">560+ Active</div>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-mono">ODDS REFRESH SPEED</div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono mt-0.5">0.4 Seconds</div>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-mono">ARBITRAGE WIN RATE</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">100% Guaranteed</div>
          </div>
        </div>
      </section>

      {/* Live Interactive ROI Calculator Widget */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
                INTERACTIVE ROI SIMULATOR
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                Calculate Your Monthly Income from Arbitrage
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Based on historical 1.2% daily bankroll churn
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Slider Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Your Starting Sports Bankroll:</span>
                <span className="text-2xl font-black font-mono text-emerald-400">${interactiveBankroll.toLocaleString()}</span>
              </div>

              <input
                type="range"
                min={500}
                max={20000}
                step={250}
                value={interactiveBankroll}
                onChange={(e) => setInteractiveBankroll(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>$500</span>
                <span>$3,000 (Typical)</span>
                <span>$10,000</span>
                <span>$20,000</span>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>
                  Your $149/mo subscription pays for itself in approximately <strong className="text-emerald-400">{daysToPaySubscription} day{daysToPaySubscription > 1 ? 's' : ''}</strong> of trading.
                </span>
              </div>
            </div>

            {/* Results Column (5 cols) */}
            <div className="lg:col-span-5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-5 space-y-4">
              <div>
                <div className="text-[10px] font-mono uppercase text-emerald-300 font-bold">
                  PROJECTED MONTHLY CASH GAIN
                </div>
                <div className="text-3xl font-black font-mono text-emerald-400 mt-1">
                  +${monthlyProfitEst.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ mo</span>
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-800/60 flex justify-between items-center text-xs">
                <span className="text-slate-300">Annual Run-Rate:</span>
                <span className="font-mono font-bold text-white text-base">+${annualProfitEst.toLocaleString()}</span>
              </div>

              <button
                onClick={onLaunchTerminal}
                className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Unlock These Returns Now</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step "How It Works" Section */}
      <section className="max-w-5xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
            THE MATHEMATICAL FLYWHEEL
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            How You Make Money in 3 Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 text-lg">
              1
            </div>
            <h3 className="text-base font-bold text-white">
              We Scan 25+ Sportsbooks Every 0.4s
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bookmakers like DraftKings and FanDuel constantly disagree on point totals and spreads due to independent liability imbalances.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-400 text-lg">
              2
            </div>
            <h3 className="text-base font-bold text-white">
              Algorithm Calculates Negative Hold
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When Bookmaker A offers +120 on Over and Bookmaker B offers -105 on Under, the combined probability drops below 100%, creating an arbitrage margin.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-indigo-400 text-lg">
              3
            </div>
            <h3 className="text-base font-bold text-white">
              Place Both Bets & Lock Profit
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Use our 1-click anti-limiting calculator to place the exact stakes on both sides. No matter who wins the game, you cash out ahead.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
            TRANSPARENT PRICING
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Choose Your Tier & Start Cashing Today
          </h2>
          <p className="text-xs text-slate-400">
            Cancel anytime with 1 click. 7-day risk-free trial on all plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase font-semibold">Starter</div>
              <div className="text-3xl font-black text-white mt-1">
                $79 <span className="text-xs font-normal text-slate-400">/ mo</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                For bankrolls under $1,500 building initial capital.
              </p>
              <div className="space-y-2 mt-5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Up to 4.0% Arbitrage Bets</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>5 Core Sportsbooks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>5-Minute Refresh Feed</span>
                </div>
              </div>
            </div>
            <button
              onClick={onLaunchTerminal}
              className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 font-bold text-xs transition-colors"
            >
              Select Starter
            </button>
          </div>

          {/* Pro (Recommended) */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500 rounded-2xl p-6 space-y-5 flex flex-col justify-between relative shadow-xl ring-1 ring-emerald-500/40">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
              MOST POPULAR · 94% OF SUBSCRIBERS
            </div>
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase font-bold">Pro Arbitrageur</div>
              <div className="text-3xl font-black text-white mt-1">
                $149 <span className="text-xs font-normal text-slate-400">/ mo</span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Uncapped arbitrage & sub-second WebSocket streams.
              </p>
              <div className="space-y-2.5 mt-5 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Uncapped Arbitrage (Up to 15%+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>0.4-Second WebSocket Live Odds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>All 25+ US & Global Sportsbooks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Anti-Limiting $5 Stake Rounder</span>
                </div>
              </div>
            </div>
            <button
              onClick={onOpenAuth}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors shadow-md"
            >
              Start 7-Day Free Trial
            </button>
          </div>

          {/* Syndicate */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase font-semibold">Syndicate VIP</div>
              <div className="text-3xl font-black text-white mt-1">
                $399 <span className="text-xs font-normal text-slate-400">/ mo</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                For high-volume bettors & algorithmic API access.
              </p>
              <div className="space-y-2 mt-5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>REST & WebSocket Feed API</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Custom Discord Webhook Bots</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>1-Click Bet Slip Deep Links</span>
                </div>
              </div>
            </div>
            <button
              onClick={onLaunchTerminal}
              className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 font-bold text-xs transition-colors"
            >
              Contact VIP Support
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white text-center">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3 text-xs">
          {[
            {
              q: 'Is sports arbitrage legal?',
              a: 'Yes, 100% legal. Arbitrage simply takes advantage of different pricing at different licensed sportsbooks. You are legally placing bets on registered sportsbooks; our software simply does the math for you.',
            },
            {
              q: 'How does ApexOdds prevent sportsbooks from limiting my accounts?',
              a: 'Amateur bettors get flagged because they bet strange amounts like $54.27 to get exact math. ApexOdds includes a proprietary Anti-Limiting algorithm that rounds all bets to normal recreational numbers (like $50 or $55) while preserving positive profit margins.',
            },
            {
              q: 'How much starting bankroll do I need?',
              a: 'We recommend starting with at least $1,000 to $2,500 split across 2–3 major books (like DraftKings and FanDuel). At that size, your profits easily cover the $149/mo subscription in the first couple of days.',
            },
            {
              q: 'Can I cancel anytime?',
              a: 'Yes. There are zero long-term contracts. You can cancel your subscription inside your account dashboard with a single click at any time.',
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden cursor-pointer"
              onClick={() => toggleFaq(idx)}
            >
              <div className="p-4 font-bold text-white flex justify-between items-center">
                <span>{faq.q}</span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${faqOpen === idx ? 'rotate-180 text-emerald-400' : ''}`} />
              </div>
              {faqOpen === idx && (
                <div className="px-4 pb-4 text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-8 sm:p-10 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Ready to Start Making Guaranteed Sports Profits?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Join 560+ pro traders exploiting bookmaker mathematical pricing gaps every single day.
          </p>
          <div className="pt-2">
            <button
              onClick={onLaunchTerminal}
              className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Launch ApexOdds Terminal</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
