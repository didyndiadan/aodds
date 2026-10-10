import React from 'react';
import { 
  TrendingUp, 
  Layers, 
  Calculator, 
  Crosshair, 
  Video, 
  Sparkles, 
  FileText,
  DollarSign,
  Grid
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'models', label: 'Venture Matrix', icon: Layers },
    { id: 'simulator', label: 'ARR & Speed Simulator', icon: Calculator },
    { id: 'scanner-sandbox', label: 'Live +EV Odds Scanner', icon: Crosshair },
    { id: 'clips-sandbox', label: 'AI Video & NIL Hub', icon: Video },
    { id: 'court-sandbox', label: 'Padel/Pickleball Yield', icon: Grid },
    { id: 'ai-advisor', label: 'AI Venture Sparring', icon: Sparkles },
    { id: 'pitch-exporter', label: 'Investor One-Pager', icon: FileText },
  ];

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3">
          {/* Logo & Headline */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold tracking-tight shadow-sm">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  Playbook $1M+
                </h1>
                <span className="text-xs text-slate-500 font-medium">
                  · Sports Tech Venture OS
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Data-backed blueprints, unit economics engines, and live prototypes for high-margin sports apps
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hidden lg:flex items-center gap-4 text-xs text-slate-600 bg-slate-50 px-3.5 py-1.5 rounded-lg border border-slate-200/80">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-900">Fastest Path:</span>
              <span>6–10 Mos ($149 ARPU)</span>
            </div>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-900">Top Margins:</span>
              <span className="text-emerald-700 font-medium">91% SaaS</span>
            </div>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-900">Sweet Spot:</span>
              <span>560 paying subscribers to $1M ARR</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 pt-1 no-scrollbar border-t border-slate-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
