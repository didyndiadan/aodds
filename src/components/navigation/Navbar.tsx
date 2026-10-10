import React from 'react';
import { 
  Menu, 
  Crosshair, 
  User, 
  Shield, 
  Crown, 
  Volume2, 
  VolumeX, 
  SlidersHorizontal,
  Home,
  Zap,
  Wallet,
  Settings,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onToggleSidebar: () => void;
  activeView: 'landing' | 'scanner' | 'bankroll' | 'blueprint' | 'admin' | 'affiliates';
  setActiveView: (view: 'landing' | 'scanner' | 'bankroll' | 'blueprint' | 'admin' | 'affiliates') => void;
  onOpenAuth: () => void;
  onOpenPricing: () => void;
  onOpenBookmakers: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  activeBooksCount: number;
  totalBooksCount: number;
  isRealCommercialFeed?: boolean;
  isSyncingFeed?: boolean;
  onSyncFeed?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  activeView,
  setActiveView,
  onOpenAuth,
  onOpenPricing,
  onOpenBookmakers,
  soundEnabled,
  setSoundEnabled,
  activeBooksCount,
  totalBooksCount,
  isRealCommercialFeed = false,
  isSyncingFeed = false,
  onSyncFeed,
}) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <nav className="bg-slate-950 border-b border-slate-850 text-white sticky top-0 z-40">
      {/* Real-time Ticker Sub-bar */}
      <div className="bg-slate-900/90 border-b border-slate-850 px-4 py-1 text-[11px] font-mono flex items-center justify-between overflow-x-auto no-scrollbar gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRealCommercialFeed ? 'bg-emerald-400' : 'bg-cyan-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isRealCommercialFeed ? 'bg-emerald-500' : 'bg-cyan-500'}`}></span>
            </span>
            <span className={`font-bold uppercase tracking-wider ${isRealCommercialFeed ? 'text-emerald-400' : 'text-cyan-300'}`}>
              {isRealCommercialFeed ? 'THE ODDS API (25+ LIVE BOOKS)' : 'BUILT-IN OPERATIONAL ENGINE'}
            </span>
          </div>
          {onSyncFeed && (
            <button
              onClick={onSyncFeed}
              disabled={isSyncingFeed}
              className="flex items-center gap-1 text-[10px] text-slate-300 hover:text-white px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              title="Sync odds from server"
            >
              <RefreshCw className={`h-2.5 w-2.5 ${isSyncingFeed ? 'animate-spin text-emerald-400' : ''}`} />
              <span>{isSyncingFeed ? 'Syncing...' : 'Sync'}</span>
            </button>
          )}
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">
            ACTIVE BOOKS: <strong className="text-white">{activeBooksCount}/{totalBooksCount}</strong>
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">
            AVG MONTHLY RETURN: <strong className="text-emerald-400 font-bold">+31.4%</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-400 shrink-0">
          {isAuthenticated ? (
            <span className="text-emerald-400 font-mono">
              BANKROLL: <strong>${user?.bankroll.toLocaleString()}</strong>
            </span>
          ) : (
            <span>7-DAY FREE TRIAL ACTIVE</span>
          )}
          <span className="text-slate-700">|</span>
          <button
            onClick={onOpenPricing}
            className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans text-[11px] font-semibold cursor-pointer"
          >
            <Crown className="h-3 w-3" />
            <span>PRICING & UPGRADE</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Mobile Hamburger + Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Open vertical menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <button
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-2.5 text-left cursor-pointer"
          >
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
              <Crosshair className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-white tracking-wider">APEXODDS</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-bold">PRO</span>
              </div>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Shortcuts */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveView('landing')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === 'landing'
                ? 'bg-slate-800 text-emerald-400 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home className="h-3.5 w-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveView('scanner')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === 'scanner'
                ? 'bg-slate-800 text-emerald-400 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="h-3.5 w-3.5 text-emerald-400" />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => setActiveView('bankroll')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === 'bankroll'
                ? 'bg-slate-800 text-emerald-400 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wallet className="h-3.5 w-3.5" />
            <span>Bankroll P&L</span>
          </button>

          <button
            onClick={() => setActiveView('admin')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === 'admin'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                : 'text-amber-200/80 hover:text-amber-200'
            }`}
          >
            <Settings className="h-3.5 w-3.5 text-amber-400" />
            <span>Owner Console</span>
          </button>
        </div>

        {/* Right: Bookmaker filters, Sound, Auth */}
        <div className="flex items-center gap-2">
          {/* Quick Bookmaker Selector */}
          <button
            onClick={onOpenBookmakers}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 font-medium transition-colors"
            title="Configure active sportsbooks"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
            <span>Books: <strong className="font-mono text-emerald-400">{activeBooksCount}/{totalBooksCount}</strong></span>
          </button>

          {/* Sound Alert Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-colors ${
              soundEnabled
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={soundEnabled ? 'Sound alert enabled on new arbs' : 'Sound alert muted'}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Auth Button / Profile Badge */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1 pl-2 text-xs">
              <div className="hidden sm:block text-left pr-1">
                <div className="font-semibold text-white leading-none">{user?.name}</div>
                <div className={`text-[10px] font-mono leading-tight mt-0.5 font-bold ${
                  user?.role === 'owner_admin'
                    ? 'text-amber-400'
                    : user?.role === 'pro_subscriber'
                    ? 'text-emerald-400'
                    : 'text-cyan-400'
                }`}>
                  {user?.role === 'owner_admin' ? 'OWNER ADMIN' : user?.role === 'pro_subscriber' ? 'PRO SUBSCRIBER' : 'FREE TIER'}
                </div>
              </div>
              {user?.role === 'free_user' && (
                <button
                  onClick={onOpenPricing}
                  className="py-1 px-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] transition-colors cursor-pointer"
                >
                  Upgrade
                </button>
              )}
              <button
                onClick={logout}
                className="py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <User className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
