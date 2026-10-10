import React from 'react';
import { 
  Crosshair, 
  Volume2, 
  VolumeX, 
  SlidersHorizontal, 
  Wallet, 
  Flame, 
  Zap, 
  TrendingUp, 
  Crown,
  Search,
  RefreshCw,
  Layers,
  ChevronDown
} from 'lucide-react';

interface HeaderTerminalProps {
  activeView: 'scanner' | 'bankroll' | 'blueprint';
  setActiveView: (view: 'scanner' | 'bankroll' | 'blueprint') => void;
  opportunitiesCount: number;
  highestEdge: number;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onOpenBookmakerFilter: () => void;
  onOpenPricing: () => void;
  activeBooksCount: number;
  totalBooksCount: number;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  isLiveTicking: boolean;
  totalBankroll: number;
  isRealCommercialFeed?: boolean;
  feedProvider?: string;
  isSyncingFeed?: boolean;
  onSyncFeed?: () => void;
}

export const HeaderTerminal: React.FC<HeaderTerminalProps> = ({
  activeView,
  setActiveView,
  opportunitiesCount,
  highestEdge,
  soundEnabled,
  setSoundEnabled,
  onOpenBookmakerFilter,
  onOpenPricing,
  activeBooksCount,
  totalBooksCount,
  searchQuery,
  setSearchQuery,
  isLiveTicking,
  totalBankroll,
  isRealCommercialFeed = false,
  feedProvider,
  isSyncingFeed = false,
  onSyncFeed,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950 text-white sticky top-0 z-40 select-none">
      {/* Top Ticker Status Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-1 text-[11px] font-mono flex items-center justify-between overflow-x-auto no-scrollbar gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRealCommercialFeed ? 'bg-emerald-400' : 'bg-cyan-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isRealCommercialFeed ? 'bg-emerald-500' : 'bg-cyan-500'}`}></span>
            </span>
            <span className={`font-bold uppercase tracking-wider ${isRealCommercialFeed ? 'text-emerald-400' : 'text-cyan-300'}`}>
              {isRealCommercialFeed ? 'THE ODDS API (LIVE 25+ BOOKS)' : 'BUILT-IN OPERATIONAL ENGINE'}
            </span>
          </div>
          {onSyncFeed && (
            <button
              onClick={onSyncFeed}
              disabled={isSyncingFeed}
              className="flex items-center gap-1 text-[10px] text-slate-300 hover:text-white px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              title="Sync live odds feed"
            >
              <RefreshCw className={`h-2.5 w-2.5 ${isSyncingFeed ? 'animate-spin text-emerald-400' : ''}`} />
              <span>{isSyncingFeed ? 'Syncing...' : 'Sync Live'}</span>
            </button>
          )}
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">
            SCANNED BOOKS: <strong className="text-white">{activeBooksCount}/{totalBooksCount}</strong>
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">
            ACTIVE EDGES: <strong className="text-emerald-400 font-bold">{opportunitiesCount}</strong>
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">
            MAX SINGLE EDGE: <strong className="text-emerald-400 font-bold">+{highestEdge.toFixed(2)}%</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-400 shrink-0">
          <span>PORTFOLIO BANKROLL: <strong className="text-white">${totalBankroll.toLocaleString()}</strong></span>
          <span className="text-slate-700">|</span>
          <button 
            onClick={onOpenPricing}
            className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans text-[11px] font-semibold"
          >
            <Crown className="h-3 w-3" />
            <span>PRO LICENSE · UNLIMITED</span>
          </button>
        </div>
      </div>

      {/* Main Terminal Bar */}
      <div className="px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & Mode Navigation */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xs">
              <Crosshair className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black tracking-wider text-white">APEXODDS</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-bold">TERMINAL</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                SUB-SECOND ARBITRAGE & +EV ENGINE
              </div>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          {/* Nav Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveView('scanner')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeView === 'scanner'
                  ? 'bg-slate-800 text-emerald-400 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="h-3.5 w-3.5 text-emerald-400" />
              <span>Live Terminal</span>
            </button>

            <button
              onClick={() => setActiveView('bankroll')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeView === 'bankroll'
                  ? 'bg-slate-800 text-emerald-400 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Wallet className="h-3.5 w-3.5" />
              <span>Bankroll & P&L Log</span>
            </button>

            <button
              onClick={() => setActiveView('blueprint')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeView === 'blueprint'
                  ? 'bg-slate-800 text-emerald-400 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>SaaS $1M Blueprint</span>
            </button>
          </div>
        </div>

        {/* Search & Tool Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Filter Search */}
          <div className="relative">
            <Search className="h-3.5 w-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search team, player, market..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-200 pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-emerald-500/60 w-44 sm:w-56 placeholder:text-slate-500"
            />
          </div>

          {/* Bookmakers Filter Button */}
          <button
            onClick={onOpenBookmakerFilter}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 font-medium transition-colors"
            title="Configure active sportsbooks"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Books:</span>
            <span className="font-mono text-emerald-400">{activeBooksCount}/{totalBooksCount}</span>
          </button>

          {/* Sound Alert Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-lg border transition-colors ${
              soundEnabled
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={soundEnabled ? 'Audio alerts active for new arbs' : 'Audio alerts muted'}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
