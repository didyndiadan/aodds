import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Crown, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  Lock, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Building,
  QrCode
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { logAccountingTransaction } from '../../lib/supabase';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const { user, login, upgradeToPro } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number; period: string } | null>(null);
  const [paymentMethodTab, setPaymentMethodTab] = useState<'crypto' | 'bank' | 'card'>('crypto');

  // Form states
  const [email, setEmail] = useState(user?.email || 'customer@example.com');
  const [selectedCryptoCoin, setSelectedCryptoCoin] = useState('USDT (TRC-20)');
  const [txHash, setTxHash] = useState('');
  const [wireReference, setWireReference] = useState('');
  const [affiliateCode, setAffiliateCode] = useState('');
  
  // Card states
  const [cardName, setCardName] = useState(user?.name || 'Customer');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<any>(null);
  const [copiedWallet, setCopiedWallet] = useState(false);

  // Wallets from config
  const cryptoWallets: Record<string, string> = {
    'USDT (TRC-20)': 'TLyV7mK9p8N2xR3zQw4B5v6C7dE8fG9hJ1',
    'USDT (ERC-20)': '0x71C5D9A3B45F6789123456789ABCDEF012345678',
    'USDC (Solana)': '8Yp9X1Z2w3V4u5T6s7R8q9P0o1N2m3L4k5J6i7H8g9F',
    'Bitcoin (BTC)': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  };

  const activeWallet = cryptoWallets[selectedCryptoCoin] || cryptoWallets['USDT (TRC-20)'];

  if (!isOpen) return null;

  const handleSelectPlan = (name: string, price: number) => {
    setSelectedPlan({ name, price, period: 'month' });
    setPaymentSuccess(null);
  };

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(activeWallet);
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  // Submit Crypto Checkout
  const handleProcessCrypto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    setIsProcessing(true);

    try {
      const res = await fetch('/api/payments/process-crypto-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user?.name || email.split('@')[0],
          email,
          planName: selectedPlan.name,
          amount: selectedPlan.price,
          coin: selectedCryptoCoin,
          txHash: txHash || '0x9482f...a891',
          affiliateCode: affiliateCode.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPaymentSuccess(data);
        if (!user) {
          login(email, 'pro_subscriber');
        } else {
          upgradeToPro('pro');
        }
        // Log transaction to Supabase accounting if configured
        logAccountingTransaction({
          invoice_id: data.transaction?.invoiceId || `INV-${Date.now()}`,
          customer_name: user?.name || email.split('@')[0],
          customer_email: email,
          plan_name: selectedPlan.name,
          amount: selectedPlan.price,
          payment_method: `Crypto (${selectedCryptoCoin})`,
          tx_hash_or_reference: txHash || data.transaction?.cryptoTxHash,
          status: 'SUCCEEDED',
          affiliate_code: affiliateCode.trim() || undefined,
          net_revenue: data.transaction?.netToOwner || selectedPlan.price,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Submit Direct Bank Wire / Wise Transfer
  const handleProcessBank = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    setIsProcessing(true);

    try {
      const res = await fetch('/api/payments/process-bank-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user?.name || email.split('@')[0],
          email,
          planName: selectedPlan.name,
          amount: selectedPlan.price,
          transferReference: wireReference || 'WISE-TRANSFER-CONFIRMED',
          paymentChannel: 'Direct Bank Wire (Wise/IBAN)',
          affiliateCode: affiliateCode.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPaymentSuccess(data);
        if (!user) {
          login(email, 'pro_subscriber');
        } else {
          upgradeToPro('pro');
        }
        // Log transaction to Supabase accounting if configured
        logAccountingTransaction({
          invoice_id: data.transaction?.invoiceId || `INV-${Date.now()}`,
          customer_name: user?.name || email.split('@')[0],
          customer_email: email,
          plan_name: selectedPlan.name,
          amount: selectedPlan.price,
          payment_method: 'Direct Bank Wire (Wise/IBAN)',
          tx_hash_or_reference: wireReference || 'WISE-TRANSFER-CONFIRMED',
          status: 'SUCCEEDED',
          affiliate_code: affiliateCode.trim() || undefined,
          net_revenue: data.transaction?.netToOwner || selectedPlan.price,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-50 font-sans">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-white max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="h-4 w-4" />
        </button>

        {selectedPlan ? (
          <div className="max-w-xl mx-auto space-y-6 py-2">
            <button
              onClick={() => setSelectedPlan(null)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
            >
              ← Back to Plans
            </button>

            {paymentSuccess ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-black text-white">Payment Verified & Active!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your subscription to <strong className="text-emerald-400">{selectedPlan.name}</strong> is unlocked.
                  {paymentSuccess.transaction?.affiliateCode && (
                    <span className="block text-emerald-400 font-mono mt-1 text-[11px]">
                      Referral partner credited: {paymentSuccess.transaction.affiliateCode} (+$44.70/mo rev-share)
                    </span>
                  )}
                </p>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs font-mono text-left space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Invoice Reference:</span>
                    <span className="text-white font-bold">{paymentSuccess.transaction?.invoiceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment Channel:</span>
                    <span className="text-emerald-400 font-bold">{paymentSuccess.transaction?.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Amount Paid:</span>
                    <span className="text-emerald-400 font-bold">${paymentSuccess.transaction?.amount}.00 USD</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors cursor-pointer"
                >
                  Return to Live Scanner Terminal
                </button>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Global Payment Gateway</h3>
                    <p className="text-xs text-slate-400">No Stripe? Pay borderless via Crypto or Direct Bank Wire</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black font-mono text-emerald-400">
                      ${selectedPlan.price}.00
                    </div>
                    <div className="text-[10px] text-slate-400">{selectedPlan.name}</div>
                  </div>
                </div>

                {/* Payment Method Selector Tabs */}
                <div className="grid grid-cols-3 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setPaymentMethodTab('crypto')}
                    className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                      paymentMethodTab === 'crypto'
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🪙 Crypto (USDT)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethodTab('bank')}
                    className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                      paymentMethodTab === 'bank'
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🏛️ Bank Wire / Wise</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethodTab('card')}
                    className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                      paymentMethodTab === 'card'
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>💳 Credit Card</span>
                  </button>
                </div>

                {/* Option 1: Crypto Checkout (USDT / USDC / BTC / Solana) */}
                {paymentMethodTab === 'crypto' && (
                  <form onSubmit={handleProcessCrypto} className="space-y-4 text-xs">
                    <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-[11px] text-emerald-300">
                      Zero KYC. Send exact amount to owner wallet. Activates immediately worldwide.
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold">Select Cryptocurrency Network</label>
                      <select
                        value={selectedCryptoCoin}
                        onChange={(e) => setSelectedCryptoCoin(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
                      >
                        <option value="USDT (TRC-20)">USDT (TRC-20 Tron Network) - Lowest $1 Fee</option>
                        <option value="USDC (Solana)">USDC (Solana SPL) - Instant &lt;1s</option>
                        <option value="USDT (ERC-20)">USDT (ERC-20 Ethereum)</option>
                        <option value="Bitcoin (BTC)">Bitcoin (BTC Network)</option>
                      </select>
                    </div>

                    {/* Deposit Address Box */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-slate-300 font-semibold">
                        <span>Send Exact ${selectedPlan.price}.00 To Owner Address:</span>
                        <span className="text-[10px] text-emerald-400 font-mono">100% Direct Transfer</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-2.5 rounded-xl">
                        <span className="font-mono text-emerald-400 text-xs flex-1 truncate select-all">
                          {activeWallet}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyWallet}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          {copiedWallet ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copiedWallet ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-slate-300 font-semibold">Your Billing Email</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@gmail.com"
                          className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-300 font-semibold">Moderator Referral Code (Optional)</label>
                        <input
                          type="text"
                          value={affiliateCode}
                          onChange={(e) => setAffiliateCode(e.target.value)}
                          placeholder="e.g. discord_vip"
                          className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-emerald-400 font-mono focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold">Transaction Hash / TXID (Optional for Demo)</label>
                      <input
                        type="text"
                        value={txHash}
                        onChange={(e) => setTxHash(e.target.value)}
                        placeholder="Paste TX hash from your wallet, or click activate below"
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono text-[11px] focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                    >
                      <span>{isProcessing ? 'Verifying Crypto Transaction...' : `Confirm $${selectedPlan.price}.00 Crypto Payment & Activate Pro`}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}

                {/* Option 2: Direct Bank Wire / Wise Transfer */}
                {paymentMethodTab === 'bank' && (
                  <form onSubmit={handleProcessBank} className="space-y-4 text-xs">
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 font-mono text-[11px]">
                      <div className="font-bold text-white text-xs font-sans">Owner International Wire Details:</div>
                      <div className="flex justify-between"><span className="text-slate-400">Beneficiary:</span> <span className="text-white">Apex Sports Intelligence Ltd</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Bank / Channel:</span> <span className="text-white">Wise International / Barclays</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">IBAN:</span> <span className="text-emerald-400 font-bold">GB82WISE23049182736451</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">SWIFT / BIC:</span> <span className="text-white">WISEGB2LXXX</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Wise Email:</span> <span className="text-white">founder.finance@apexodds.io</span></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-slate-300 font-semibold">Your Billing Email</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@gmail.com"
                          className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-300 font-semibold">Moderator Referral Code (Optional)</label>
                        <input
                          type="text"
                          value={affiliateCode}
                          onChange={(e) => setAffiliateCode(e.target.value)}
                          placeholder="e.g. discord_vip"
                          className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-emerald-400 font-mono focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold">Wire Transfer Reference #</label>
                      <input
                        type="text"
                        value={wireReference}
                        onChange={(e) => setWireReference(e.target.value)}
                        placeholder="Enter your bank reference or sender name"
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                    >
                      <span>{isProcessing ? 'Logging Wire Transfer...' : `Confirm $${selectedPlan.price}.00 Bank Transfer & Activate`}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}

                {/* Option 3: Credit Card */}
                {paymentMethodTab === 'card' && (
                  <form onSubmit={handleProcessCrypto} className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <span>Pay with Card ($${selectedPlan.price}.00)</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Normal Plan Selection */
          <>
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                Crypto & Bank Transfers Accepted Globally
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Subscription Plans That Pay For Themselves
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Pay with Crypto (USDT, USDC, BTC) or Direct Bank Wire. Works in every country with zero restrictions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {/* Starter */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase font-semibold">Starter Tier</div>
                  <div className="text-2xl font-black text-white mt-1">
                    $79 <span className="text-xs font-normal text-slate-400">/ month</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    For recreational bankrolls under $1,500.
                  </p>
                </div>
                <button
                  onClick={() => handleSelectPlan('Starter', 79)}
                  className="w-full py-2.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Pay $79 (Crypto / Bank)
                </button>
              </div>

              {/* Pro */}
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500 rounded-xl p-5 flex flex-col justify-between space-y-4 relative shadow-lg ring-1 ring-emerald-500/30">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                  FLAGSHIP PLAN · 30% MODERATOR CUT
                </div>
                <div>
                  <div className="text-xs font-mono text-emerald-400 uppercase font-bold">Pro Arbitrageur</div>
                  <div className="text-3xl font-black text-white mt-1">
                    $149 <span className="text-xs font-normal text-slate-400">/ month</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    Sub-second WebSocket odds with uncapped arbitrage margins.
                  </p>
                </div>
                <button
                  onClick={() => handleSelectPlan('Pro Arbitrageur', 149)}
                  className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors shadow-md cursor-pointer"
                >
                  Pay $149 (Crypto / Bank)
                </button>
              </div>

              {/* Syndicate */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase font-semibold">Syndicate VIP</div>
                  <div className="text-2xl font-black text-white mt-1">
                    $399 <span className="text-xs font-normal text-slate-400">/ month</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    High volume bettors, VIP Discord bots, and API feeds.
                  </p>
                </div>
                <button
                  onClick={() => handleSelectPlan('Syndicate VIP', 399)}
                  className="w-full py-2.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Pay $399 (Crypto / Bank)
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
