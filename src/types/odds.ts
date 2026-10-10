export type MarketType = 'moneyline' | 'spread' | 'total' | 'player_prop';
export type OpportunityType = 'arbitrage' | 'positive_ev' | 'middle';

export interface BookmakerPrice {
  bookmaker: string;
  bookmakerId: string;
  selection: string;
  oddsAmerican: number;
  oddsDecimal: number;
  deeplinkUrl?: string;
}

export interface OddsOpportunity {
  id: string;
  sport: 'NBA' | 'NFL' | 'EPL' | 'MLB' | 'UFC' | 'NHL' | 'NCAAF';
  league: string;
  match: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  status: 'LIVE' | 'TODAY' | 'UPCOMING';
  marketName: string;
  marketType: MarketType;
  type: OpportunityType;
  edgePercent: number; // e.g. 4.25% arbitrage or 8.40% +EV
  
  // Leg 1 (Best side)
  legA: BookmakerPrice;
  // Leg 2 (Opposite side)
  legB: BookmakerPrice;

  // Sharp benchmark details (for +EV)
  sharpBenchmark?: {
    bookmaker: string;
    noVigOddsDecimal: number;
    noVigOddsAmerican: number;
    fairWinProbability: number;
  };

  // Middle bet gap (if applicable)
  middleSpreadGap?: string; // e.g. "Over 221.5 / Under 224.5 (3pt Middle Win Window)"

  liquidityLimitEstimate?: number;
  lastUpdatedSecondsAgo: number;
}

export interface LoggedBet {
  id: string;
  opportunityId: string;
  match: string;
  market: string;
  type: OpportunityType;
  placedAt: string;
  totalStake: number;
  stakeA: number;
  stakeB: number;
  bookmakerA: string;
  bookmakerB: string;
  oddsA: number;
  oddsB: number;
  guaranteedProfit?: number;
  expectedValueProfit?: number;
  roiPercent: number;
  status: 'PENDING' | 'SETTLED_WIN' | 'SETTLED_LOSS';
}

export interface UserPreferences {
  bankroll: number;
  kellyFraction: number; // 0.25, 0.5, 1.0
  roundStakesToFive: boolean; // anti-bookmaker ban rounding (e.g. $47.32 -> $45.00 or $50.00)
  soundAlertsEnabled: boolean;
  minEdgeFilter: number;
  selectedSports: string[];
  activeBookmakers: string[];
}
