import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  Link as LinkIcon, 
  Copy, 
  Check, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Wallet,
  Building,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AffiliatePortal: React.FC = () => {
  const { user } = useAuth();
  const [partnerName, setPartnerName] = useState(user?.name || '');
  const [partnerEmail, setPartnerEmail] = useState(user?.email || '');
  const [customCode, setCustomCode] = useState('discord_vip');
  const [payoutMethod, setPayoutMethod] = useState<'Crypto USDT (TRC-20)' | 'Direct Bank Wire (Wise)'>('Crypto USDT (TRC-20)');
  const [payoutAddress, setPayoutAddress] = useState('TYx82kJ90Qx3948LmN7vP1qZ...');
  const [isRegistering, setIsRegistering] = useState(false);
  const [myAffiliate, setMyAffiliate] = useState<any>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [payoutRequested, setPayoutRequested] = useState<string | null>(null);

  // Load existing affiliate if any
  useEffect(() => {
    fetch('/api/affiliates/all')
      .then((res) => res.json())
      .then((data) => {
        if (data.affiliates?.length > 0) {
          // Default to first active affiliate for demonstration
          setMyAffiliate(data.affiliates[0]);
        }
      })
      .catch(console.error);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      const res = await fetch('/api/affiliates/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: partnerName,
          email: partnerEmail,
          preferredCode: customCode,
          payoutMethod,
          payoutAddress,
        }),
      });
      const data = await res.json();
      if (data.affiliate) {
        setMyAffiliate(data.affiliate);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCopyLink = () => {
    if (!myAffiliate) return;
    const url = `${window.location.origin}?ref=${myAffiliate.code}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleRequestPayout = async () => {
    if (!myAffiliate) return;
    try {
      const res = await fetch('/api/affiliates/request-payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ affiliateId: myAffiliate.id }),
      });
      const data = await res.json();
      if (data.success) {
        setPayoutRequested(data.message);
        setMyAffiliate({ ...myAffiliate, unpaidBalance: 0 });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 text-white font-sans max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 space-y-3 shadow-lg">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Moderator & Community Partner Rev-Share Program</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Earn <span className="text-emerald-400">30% Lifetime Recurring</span> Commission
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Are you a Discord server owner, sports betting moderator, or sports influencer? 
          Share your custom referral link. For every subscriber who signs up at $149/mo, you get <strong className="text-emerald-400">$44.70 every single month</strong> paid in Crypto USDT or Direct Bank Wire.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-xs">
          <div>
            <div className="text-slate-400 font-mono">Commission Rate</div>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">30% Monthly</div>
          </div>
          <div>
            <div className="text-slate-400 font-mono">Per Active User</div>
            <div className="text-xl font-bold text-white font-mono mt-0.5">$44.70 / mo</div>
          </div>
          <div>
            <div className="text-slate-400 font-mono">Payout Methods</div>
            <div className="text-xl font-bold text-cyan-300 font-mono mt-0.5">Crypto & Bank</div>
          </div>
          <div>
            <div className="text-slate-400 font-mono">Payout Frequency</div>
            <div className="text-xl font-bold text-amber-300 font-mono mt-0.5">Instant / On-Demand</div>
          </div>
        </div>
      </div>

      {/* Payout Alert */}
      {payoutRequested && (
        <div className="p-4 bg-emerald-950 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <span>{payoutRequested}</span>
          </div>
          <button onClick={() => setPayoutRequested(null)} className="text-emerald-400 font-mono text-[10px]">
            DISMISS
          </button>
        </div>
      )}

      {/* If Registered: Live Partner Dashboard */}
      {myAffiliate ? (
        <div className="space-y-6">
          {/* Link Copy Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-white text-sm">Your Unique Moderator Referral Link</h3>
                <p className="text-xs text-slate-400">Share this in your Discord channels, Telegram, and Twitter bio</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                30% Lifetime Cut Active
              </span>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-2 rounded-xl">
              <input
                type="text"
                readOnly
                value={`${typeof window !== 'undefined' ? window.location.origin : 'https://apexodds.io'}?ref=${myAffiliate.code}`}
                className="bg-transparent text-xs text-emerald-300 font-mono flex-1 outline-none px-2 select-all"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedLink ? 'Copied to Clipboard!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Partner Metrics Scoreboard */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-xs font-mono text-slate-400">TOTAL EARNED TO DATE</div>
              <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
                ${myAffiliate.totalEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">30% recurring share</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-xs font-mono text-slate-400">UNPAID BALANCE READY</div>
              <div className="text-2xl font-black font-mono text-cyan-300 mt-1">
                ${myAffiliate.unpaidBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <button
                onClick={handleRequestPayout}
                disabled={myAffiliate.unpaidBalance <= 0}
                className="mt-2 w-full py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer disabled:opacity-40"
              >
                Request Payout Now
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-xs font-mono text-slate-400">ACTIVE PAID SUBSCRIBERS</div>
              <div className="text-2xl font-black font-mono text-white mt-1">
                {myAffiliate.activePaidSubscribers} <span className="text-xs font-normal text-slate-400">members</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                Generating +${(myAffiliate.activePaidSubscribers * 44.70).toFixed(2)}/mo
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-xs font-mono text-slate-400">LINK CLICKS & SIGNUPS</div>
              <div className="text-2xl font-black font-mono text-white mt-1">
                {myAffiliate.clicks} <span className="text-xs font-normal text-slate-400">clicks</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                {myAffiliate.signups} registered trials
              </div>
            </div>
          </div>

          {/* Payout Destination Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div>
              <div className="font-semibold text-white">Your Payout Destination</div>
              <div className="text-slate-400 font-mono mt-0.5">
                Method: <strong className="text-white">{myAffiliate.payoutMethod}</strong> · Address: {myAffiliate.payoutAddress}
              </div>
            </div>
            <button
              onClick={() => alert('To change payout address, contact founder in Live Support!')}
              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            >
              Update Payout Address
            </button>
          </div>
        </div>
      ) : (
        /* Registration Form */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 max-w-xl mx-auto">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white">Register as an Affiliate Partner</h3>
            <p className="text-xs text-slate-400">Takes 30 seconds. Start earning 30% on your community traffic today.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Community / Channel Name</label>
              <input
                type="text"
                required
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="e.g. Sharp Bets Discord / Alex Betting Tips"
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Your Contact Email</label>
              <input
                type="email"
                required
                value={partnerEmail}
                onChange={(e) => setPartnerEmail(e.target.value)}
                placeholder="mod@bettingdiscord.gg"
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Custom Referral Slug / Code</label>
              <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1 text-slate-400 font-mono">
                <span>apexodds.io?ref=</span>
                <input
                  type="text"
                  required
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  className="bg-transparent text-emerald-400 font-bold outline-none flex-1 py-1.5"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Preferred Payout Method</label>
              <select
                value={payoutMethod}
                onChange={(e) => setPayoutMethod(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Crypto USDT (TRC-20)">Crypto USDT (TRC-20 Network) - Zero fees, works globally</option>
                <option value="Direct Bank Wire (Wise)">Direct Bank Wire (Wise / SWIFT / IBAN)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Your Wallet Address or Bank IBAN</label>
              <input
                type="text"
                required
                value={payoutAddress}
                onChange={(e) => setPayoutAddress(e.target.value)}
                placeholder="Enter your USDT TRC-20 address or Wise IBAN..."
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isRegistering}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 mt-2"
            >
              <span>{isRegistering ? 'Generating Partner Link...' : 'Create Affiliate Account (Get 30% Link)'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
