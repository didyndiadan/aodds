/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/navigation/Navbar';
import { SidebarVertical } from './components/navigation/SidebarVertical';
import { LandingPage } from './components/landing/LandingPage';
import { ScannerTerminal } from './components/terminal/ScannerTerminal';
import { BetExecutionDrawer } from './components/terminal/BetExecutionDrawer';
import { BankrollTracker } from './components/terminal/BankrollTracker';
import { AdminControlPanel } from './components/admin/AdminControlPanel';
import { PricingModal } from './components/terminal/PricingModal';
import { BookmakerFilterModal } from './components/terminal/BookmakerFilterModal';
import { AuthModal } from './components/auth/AuthModal';
import { LiveSupportWidget } from './components/support/LiveSupportWidget';
import { AffiliatePortal } from './components/affiliate/AffiliatePortal';
import { LegalPagesModal, LegalDocType } from './components/legal/LegalPagesModal';
import { ArrSimulator } from './components/ArrSimulator';
import { InvestorOnePager } from './components/InvestorOnePager';

import { INITIAL_OPPORTUNITIES, INITIAL_LOGGED_BETS, ALL_BOOKMAKERS } from './data/mockOddsFeed';
import { OddsOpportunity, LoggedBet, OpportunityType } from './types/odds';

function AppContent() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<'landing' | 'scanner' | 'bankroll' | 'blueprint' | 'admin' | 'affiliates'>('landing');

  // Capture referral code if user arrived via affiliate link (e.g. ?ref=discord_vip)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      localStorage.setItem('apex_ref_code', ref);
    }
  }, []);
  
  // Navigation & Modals
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isPricingOpen, setIsPricingOpen] = useState<boolean>(false);
  const [isBookmakerFilterOpen, setIsBookmakerFilterOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isLegalOpen, setIsLegalOpen] = useState<boolean>(false);
  const [legalDocType, setLegalDocType] = useState<LegalDocType>('terms');

  const handleOpenLegal = (doc: LegalDocType) => {
    setLegalDocType(doc);
    setIsLegalOpen(true);
  };

  // Terminal State
  const [opportunities, setOpportunities] = useState<OddsOpportunity[]>(INITIAL_OPPORTUNITIES);
  const [selectedOpportunity, setSelectedOpportunity] = useState<OddsOpportunity | null>(null);
  const [loggedBets, setLoggedBets] = useState<LoggedBet[]>(INITIAL_LOGGED_BETS);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Live Odds Feed & Provider State
  const [isRealCommercialFeed, setIsRealCommercialFeed] = useState<boolean>(false);
  const [isSyncingFeed, setIsSyncingFeed] = useState<boolean>(false);
  const [feedProvider, setFeedProvider] = useState<string>('Built-in Operational Engine');

  const fetchLiveOpportunities = async () => {
    setIsSyncingFeed(true);
    try {
      const roleParam = user?.role ? `?role=${user.role}` : '?role=free_user';
      const res = await fetch(`/api/odds/live-opportunities${roleParam}`);
      if (res.ok) {
        const data = await res.json();
        if (data.opportunities && Array.isArray(data.opportunities) && data.opportunities.length > 0) {
          setOpportunities(data.opportunities);
        }
        setIsRealCommercialFeed(Boolean(data.isRealCommercialFeed));
        setFeedProvider(data.provider || 'Built-in Engine');
      }
    } catch (err) {
      console.error('Failed to sync live odds:', err);
    } finally {
      setIsSyncingFeed(false);
    }
  };

  useEffect(() => {
    fetchLiveOpportunities();
  }, [user?.role]);

  // Filter criteria
  const [filterType, setFilterType] = useState<OpportunityType | 'all'>('all');
  const [selectedSport, setSelectedSport] = useState<string>('All Sports');
  const [minEdge, setMinEdge] = useState<number>(2.0);
  const [activeBookmakerIds, setActiveBookmakerIds] = useState<string[]>(
    ALL_BOOKMAKERS.map((b) => b.id)
  );

  // Real-time tick simulation (updates ticker and relative timestamps)
  useEffect(() => {
    const interval = setInterval(() => {
      setOpportunities((prev) =>
        prev.map((opp) => {
          const newSeconds = opp.lastUpdatedSecondsAgo >= 15 ? 1 : opp.lastUpdatedSecondsAgo + 1;
          return {
            ...opp,
            lastUpdatedSecondsAgo: newSeconds,
          };
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Filtered opportunities
  const filteredOpportunities = opportunities.filter((opp) => {
    if (filterType !== 'all' && opp.type !== filterType) return false;
    if (selectedSport !== 'All Sports' && opp.sport !== selectedSport) return false;
    if (opp.edgePercent < minEdge) return false;
    if (
      !activeBookmakerIds.includes(opp.legA.bookmakerId) ||
      !activeBookmakerIds.includes(opp.legB.bookmakerId)
    ) {
      return false;
    }
    return true;
  });

  const handleToggleBookmaker = (id: string) => {
    if (activeBookmakerIds.includes(id)) {
      if (activeBookmakerIds.length > 2) {
        setActiveBookmakerIds(activeBookmakerIds.filter((bId) => bId !== id));
      }
    } else {
      setActiveBookmakerIds([...activeBookmakerIds, id]);
    }
  };

  const handleSelectAllBooks = () => {
    setActiveBookmakerIds(ALL_BOOKMAKERS.map((b) => b.id));
  };

  const handleLogBet = (newBet: LoggedBet) => {
    setLoggedBets([newBet, ...loggedBets]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenBookmakers={() => setIsBookmakerFilterOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        activeBooksCount={activeBookmakerIds.length}
        totalBooksCount={ALL_BOOKMAKERS.length}
        isRealCommercialFeed={isRealCommercialFeed}
        isSyncingFeed={isSyncingFeed}
        onSyncFeed={fetchLiveOpportunities}
      />

      {/* Main Layout Area: Vertical Sidebar + Content Viewport */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Vertical Navigation Menu / Drawer */}
        <SidebarVertical
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeView={activeView}
          setActiveView={setActiveView}
          filterType={filterType}
          setFilterType={setFilterType}
          onOpenPricing={() => setIsPricingOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenLegal={handleOpenLegal}
          opportunitiesCount={filteredOpportunities.length}
        />

        {/* Viewport Content */}
        <main className="flex-1 w-full min-w-0 px-4 sm:px-6 lg:px-8 py-6">
          {activeView === 'landing' && (
            <LandingPage
              onLaunchTerminal={() => setActiveView('scanner')}
              onOpenPricing={() => setIsPricingOpen(true)}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}

          {activeView === 'scanner' && (
            <ScannerTerminal
              opportunities={filteredOpportunities}
              selectedOpportunity={selectedOpportunity}
              onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
              filterType={filterType}
              setFilterType={setFilterType}
              selectedSport={selectedSport}
              setSelectedSport={setSelectedSport}
              minEdge={minEdge}
              setMinEdge={setMinEdge}
              isRealCommercialFeed={isRealCommercialFeed}
              onOpenPricing={() => setIsPricingOpen(true)}
            />
          )}

          {activeView === 'bankroll' && (
            <BankrollTracker
              loggedBets={loggedBets}
              totalBankroll={user?.bankroll || 3500}
            />
          )}

          {activeView === 'admin' && (
            <AdminControlPanel />
          )}

          {activeView === 'affiliates' && (
            <AffiliatePortal />
          )}

          {activeView === 'blueprint' && (
            <div className="space-y-10">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-xs text-slate-300">
                <h2 className="text-base font-bold text-white mb-1">
                  The Financial Engine: How This SaaS Reaches $1,000,000 ARR Fast
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  Interactive venture simulator showing 24-month ARR compounding, unit economics (LTV, CAC, Payback), and exportable investor pitch memo.
                </p>
              </div>
              <ArrSimulator initialModelId="positive-ev-arbitrage" />
              <InvestorOnePager />
            </div>
          )}
        </main>
      </div>

      {/* Interactive Bet Execution Side Drawer */}
      <BetExecutionDrawer
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        onLogBet={handleLogBet}
        bankroll={user?.bankroll || 3500}
      />

      {/* Subscription Pricing Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />

      {/* Bookmaker Filter Modal */}
      <BookmakerFilterModal
        isOpen={isBookmakerFilterOpen}
        onClose={() => setIsBookmakerFilterOpen(false)}
        activeBookmakerIds={activeBookmakerIds}
        onToggleBookmaker={handleToggleBookmaker}
        onSelectAll={handleSelectAllBooks}
      />

      {/* Clean Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Real Live Customer Support Desk Floating Widget */}
      <LiveSupportWidget />

      {/* Official Legal & Compliance Pages Modal */}
      <LegalPagesModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        initialDoc={legalDocType}
      />

      {/* Terminal Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-5 text-[11px] font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">APEXODDS TERMINAL</span>
              <span>·</span>
              <span>MATHEMATICAL ARBITRAGE & +EV INTELLIGENCE</span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold">100% LEGAL ANALYTICS</span>
            </div>
            <div className="text-slate-500 flex items-center gap-3">
              <button
                onClick={() => handleOpenLegal('terms')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Terms & Conditions
              </button>
              <span>·</span>
              <button
                onClick={() => handleOpenLegal('privacy')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>·</span>
              <button
                onClick={() => handleOpenLegal('refund')}
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer"
              >
                Refund Policy (7-Day Guarantee)
              </button>
            </div>
          </div>
          <div className="text-slate-600 text-[10px] text-center sm:text-left leading-relaxed">
            ApexOdds is an informational mathematical analytics tool. We are not a sportsbook and do not accept bets. All sports data is computed in sub-second latency for research and probability calculations.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
