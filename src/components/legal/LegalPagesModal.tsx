import React, { useState } from 'react';
import { X, ShieldCheck, FileText, RefreshCw, Lock, CheckCircle2 } from 'lucide-react';

export type LegalDocType = 'terms' | 'privacy' | 'refund';

interface LegalPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc?: LegalDocType;
}

export const LegalPagesModal: React.FC<LegalPagesModalProps> = ({
  isOpen,
  onClose,
  initialDoc = 'terms',
}) => {
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(initialDoc);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-50 font-sans">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">ApexOdds Legal & Compliance Center</h3>
              <p className="text-xs text-slate-400">Official policies, data protection & consumer guarantees</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveDoc('terms')}
            className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeDoc === 'terms'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Terms & Conditions</span>
          </button>

          <button
            onClick={() => setActiveDoc('privacy')}
            className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeDoc === 'privacy'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="h-3.5 w-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveDoc('refund')}
            className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeDoc === 'refund'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refund Policy (7 Days)</span>
          </button>
        </div>

        {/* Document Body (Scrollable) */}
        <div className="overflow-y-auto space-y-6 text-xs text-slate-300 pr-2 leading-relaxed flex-1">
          {/* ========================================= */}
          {/* TERMS & CONDITIONS */}
          {/* ========================================= */}
          {activeDoc === 'terms' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-[11px]">
                Last updated: October 2026 · ApexOdds Technologies International
              </div>

              <section className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">1. Nature of the Service (Non-Gambling Disclaimer)</h4>
                <p>
                  ApexOdds is exclusively a <strong>computational data analytics and mathematical software terminal</strong>. 
                  ApexOdds is <strong>NOT a sportsbook, gambling operator, broker, or bookmaker</strong>. 
                  The platform does not accept, place, facilitate, handle, or escrow any bets or wagers. 
                  All calculations (including arbitrage margins, positive expected value, and Kelly Criterion sizing) 
                  are algorithmic representations of publicly available data intended solely for informational, research, and mathematical utility.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">2. Age and Legal Compliance</h4>
                <p>
                  You must be of legal age (18 or 21 depending on your jurisdiction) to use sports analytics software. 
                  It is the user's sole responsibility to ensure that their personal sports wagering activities at licensed, 
                  third-party bookmakers comply with the local, provincial, state, and federal laws of their country or territory.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">3. Subscriptions & Billing Terms</h4>
                <p>
                  Subscriptions are billed on a recurring monthly or annual basis depending on your selected tier (Starter, Pro Arbitrageur, or Syndicate VIP). 
                  Payments made via Cryptocurrency (USDT, USDC, BTC) or Direct Bank Wire / Wise provide uninterrupted access for the duration of the paid billing cycle. 
                  Users may cancel automatic renewal at any time with zero penalty.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">4. Limitation of Liability</h4>
                <p>
                  While our WebSocket feed updates in sub-second latency, sportsbook odds change rapidly. 
                  ApexOdds makes no warranty that external bookmakers will accept your wagers or honor specific lines. 
                  ApexOdds is not liable for any financial losses incurred through user betting decisions at external sportsbooks.
                </p>
              </section>
            </div>
          )}

          {/* ========================================= */}
          {/* PRIVACY POLICY */}
          {/* ========================================= */}
          {activeDoc === 'privacy' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-[11px]">
                Strict Zero-Sale Privacy Guarantee · GDPR & CCPA Compliant
              </div>

              <section className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">1. Information We Collect</h4>
                <p>
                  We believe in minimal data collection. We only collect information strictly necessary to provide the service:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li>Account credentials (email address, full name, encrypted password hashes).</li>
                  <li>Payment transaction receipts and references (Invoice ID, USDT TXID, or Wire Reference). We NEVER store full raw credit card numbers on our servers.</li>
                  <li>Terminal user preferences (active sportsbooks, bankroll slider settings, sound alerts).</li>
                </ul>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">2. We NEVER Sell Your Personal Data</h4>
                <p>
                  We do not sell, rent, monetize, or trade your personal information, email address, or betting portfolio data to third-party marketing companies, data brokers, or gambling operators.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">3. Data Security & Encryption</h4>
                <p>
                  All network traffic is encrypted via TLS 1.3 with 256-bit encryption. 
                  Support messages and live tickets are stored securely and accessible only by authorized platform operations staff.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">4. Your Right to Delete</h4>
                <p>
                  You have the right to request full erasure of your account, email, and historical portfolio records at any time by contacting our Live Support Desk.
                </p>
              </section>
            </div>
          )}

          {/* ========================================= */}
          {/* REFUND POLICY */}
          {/* ========================================= */}
          {activeDoc === 'refund' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-[11px]">
                7-Day Money-Back Guarantee · No Hassle Consumer Protection
              </div>

              <section className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">1. 7-Day Money-Back Guarantee</h4>
                <p>
                  We stand by the mathematical accuracy of our software. If you subscribe to any plan (Starter or Pro Arbitrageur) 
                  and find that the terminal does not meet your expectations, you are eligible for a <strong>100% full refund within 7 days of purchase</strong>.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">2. How to Request a Refund</h4>
                <p>
                  Simply open the <strong>Live Founder Support widget</strong> in the bottom-right corner of the website 
                  or email <strong>billing@apexodds.io</strong> with your Invoice Number. 
                  Our team processes refund requests within 24 hours.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">3. Cryptocurrency & Bank Wire Refunds</h4>
                <p>
                  For payments made via Crypto (USDT, USDC, BTC), refunds will be remitted in the exact USD value in USDT to your return wallet address. 
                  For payments made via Wise or Direct Bank Wire, refunds are issued back to the originating bank account or Wise balance.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">4. 1-Click Cancellation Anytime</h4>
                <p>
                  You can cancel your subscription at any time to avoid future renewals. Upon cancellation, 
                  you will retain full access until the end of your paid billing period with zero cancellation fees.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-xs shrink-0">
          <span className="text-slate-400 font-mono text-[11px]">
            © 2026 ApexOdds Technologies. All Rights Reserved.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors cursor-pointer"
          >
            Understood & Close
          </button>
        </div>
      </div>
    </div>
  );
};
