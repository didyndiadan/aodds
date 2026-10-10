import React from 'react';
import { 
  Zap, 
  Wallet, 
  ShieldCheck, 
  Layers, 
  Crosshair, 
  TrendingUp, 
  Lock, 
  Settings, 
  LogOut, 
  LogIn, 
  User, 
  X, 
  Home, 
  SlidersHorizontal,
  ChevronRight,
  Flame,
  Award,
  Share2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OpportunityType } from '../../types/odds';

interface SidebarVerticalProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: 'landing' | 'scanner' | 'bankroll' | 'blueprint' | 'admin' | 'affiliates';
  setActiveView: (view: 'landing' | 'scanner' | 'bankroll' | 'blueprint' | 'admin' | 'affiliates') => void;
  filterType: OpportunityType | 'all';
  setFilterType: (type: OpportunityType | 'all') => void;
  onOpenPricing: () => void;
  onOpenAuth: () => void;
  onOpenLegal?: (doc: 'terms' | 'privacy' | 'refund') => void;
  opportunitiesCount: number;
}

export const SidebarVertical: React.FC<SidebarVerticalProps> = ({
  isOpen,
  onClose,
  activeView,
  setActiveView,
  filterType,
  setFilterType,
  onOpenPricing,
  onOpenAuth,
  onOpenLegal,
  opportunitiesCount,
}) => {
  const { user, isAuthenticated, isAdmin, logout, switchRole } = useAuth();

  const handleNavClick = (view: 'landing' | 'scanner' | 'bankroll' | 'blueprint' | 'admin' | 'affiliates') => {
    setActiveView(view);
    onClose();
  };

  const handleFilterClick = (type: OpportunityType | 'all') => {
    setActiveView('scanner');
    setFilterType(type);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Vertical Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-850 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand & Mobile Close */}
        <div>
          <div className="p-4 border-b border-slate-850 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
                <Crosshair className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black text-white tracking-wider">APEXODDS</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-bold">TERMINAL</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  $1M+ SPORTS TECH OS
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white md:hidden"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Status Bar */}
          <div className="p-3 bg-slate-900/60 border-b border-slate-850 text-xs flex items-center justify-between">
            {isAuthenticated ? (
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-7 w-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 font-bold text-xs">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-white truncate text-xs">{user?.name}</div>
                  <div className="text-[10px] font-mono text-emerald-400">
                    {user?.role === 'owner_admin' ? 'PLATFORM OWNER' : 'PRO SUBSCRIBER'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-slate-400 text-xs">Guest Visitor</div>
            )}

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="text-slate-500 hover:text-rose-400 p-1.5 transition-colors"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  onClose();
                }}
                className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Navigation Links List */}
          <nav className="p-3 space-y-6 text-xs overflow-y-auto max-h-[calc(100vh-230px)]">
            {/* Core Portals */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
                Portals & Navigation
              </div>

              <button
                onClick={() => handleNavClick('landing')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                  activeView === 'landing'
                    ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Home className="h-4 w-4 text-slate-400" />
                  <span>Public SaaS Landing Page</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              </button>

              <button
                onClick={() => handleNavClick('scanner')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                  activeView === 'scanner'
                    ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Zap className="h-4 w-4 text-emerald-400" />
                  <span>Live Scanner Terminal</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">
                  {opportunitiesCount}
                </span>
              </button>

              <button
                onClick={() => handleNavClick('bankroll')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                  activeView === 'bankroll'
                    ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Wallet className="h-4 w-4 text-indigo-400" />
                  <span>Bankroll P&L Ledger</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">100% Win</span>
              </button>

              <button
                onClick={() => handleNavClick('blueprint')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                  activeView === 'blueprint'
                    ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="h-4 w-4 text-amber-400" />
                  <span>$1M ARR Financial Engine</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              </button>

              <button
                onClick={() => handleNavClick('affiliates')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                  activeView === 'affiliates'
                    ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Share2 className="h-4 w-4 text-emerald-400" />
                  <span>Affiliate Portal (30% Rev-Share)</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">
                  $44.70/mo
                </span>
              </button>
            </div>

            {/* Opportunity Quick-Toggles */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
                Fast Scanner Toggles
              </div>

              <button
                onClick={() => handleFilterClick('arbitrage')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  activeView === 'scanner' && filterType === 'arbitrage'
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Arbitrage (Risk-Free)</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Guaranteed</span>
              </button>

              <button
                onClick={() => handleFilterClick('positive_ev')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  activeView === 'scanner' && filterType === 'positive_ev'
                    ? 'bg-slate-800 text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Positive EV (+EV)</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">Pinnacle Edge</span>
              </button>

              <button
                onClick={() => handleFilterClick('middle')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  activeView === 'scanner' && filterType === 'middle'
                    ? 'bg-slate-800 text-amber-400 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Flame className="h-3.5 w-3.5 text-amber-400" />
                  <span>Middle Point Windows</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400">Win Both</span>
              </button>
            </div>

            {/* Owner Admin Section */}
            <div className="space-y-1 pt-2 border-t border-slate-900">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 px-3 py-1 flex items-center justify-between">
                <span>Owner & Platform Ops</span>
                <span className="bg-amber-400/20 text-amber-300 px-1 rounded text-[9px]">RESTRICTED</span>
              </div>

              <button
                onClick={() => handleNavClick('admin')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                  activeView === 'admin'
                    ? 'bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30'
                    : 'text-amber-200/80 hover:bg-slate-900 hover:text-amber-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="h-4 w-4 text-amber-400" />
                  <span>Admin Control Panel</span>
                </div>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">
                  $1.0M ARR
                </span>
              </button>
            </div>

            {/* Legal & Compliance Section */}
            {onOpenLegal && (
              <div className="space-y-1 pt-2 border-t border-slate-900 text-[11px]">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
                  Legal & Guarantees
                </div>
                <div className="flex flex-col gap-1 px-3 text-slate-400">
                  <button
                    onClick={() => {
                      onOpenLegal('terms');
                      onClose();
                    }}
                    className="text-left hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </button>
                  <button
                    onClick={() => {
                      onOpenLegal('privacy');
                      onClose();
                    }}
                    className="text-left hover:text-white transition-colors"
                  >
                    Privacy Policy (GDPR/CCPA)
                  </button>
                  <button
                    onClick={() => {
                      onOpenLegal('refund');
                      onClose();
                    }}
                    className="text-left hover:text-emerald-400 transition-colors"
                  >
                    Refund Policy (7-Day Guarantee)
                  </button>
                </div>
              </div>
            )}
          </nav>
        </div>

        {/* Bottom CTA / Upgrades Drawer */}
        <div className="p-3 border-t border-slate-850 space-y-2 bg-slate-950">
          <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 rounded-xl p-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">PRO LICENSE</span>
              <span className="font-mono text-emerald-400 font-bold">$149/mo</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 leading-snug">
              0.4s WebSocket odds with anti-limiting stake rounding.
            </p>
            <button
              onClick={() => {
                onOpenPricing();
                onClose();
              }}
              className="w-full mt-2 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors"
            >
              Upgrade & Pricing
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
