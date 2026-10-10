export interface SportsModel {
  id: string;
  name: string;
  badge: string;
  speedRank: number; // 1 = fastest
  timeToMillion: string;
  medianArpu: number; // $/month
  targetUsersForMillion: number;
  churnRatePercent: number;
  cacEstimate: number;
  moatRating: 'High' | 'Very High' | 'Medium';
  regulatoryComplexity: 'Low' | 'Medium' | 'High (Licensing)';
  summary: string;
  whyItScalesFast: string[];
  monetizationTiers: {
    name: string;
    price: string;
    target: string;
    features: string[];
  }[];
  unitEconomics: {
    grossMargin: string;
    ltv: string;
    cac: string;
    ltvCacRatio: string;
    paybackMonths: string;
  };
  provenPrecedents: {
    name: string;
    estimatedRevenue: string;
    keyTakeaway: string;
  }[];
  techStack: {
    category: string;
    tools: string[];
  }[];
  goToOneHundredPlaybook: string[];
}

export interface ArbitrageBet {
  id: string;
  sport: string;
  league: string;
  match: string;
  startTime: string;
  market: string;
  type: 'arbitrage' | 'positive_ev';
  edgePercent: number; // e.g. 3.8% arb or 7.2% +EV
  legA: {
    bookmaker: string;
    selection: string;
    oddsAmerican: number;
    oddsDecimal: number;
  };
  legB: {
    bookmaker: string;
    selection: string;
    oddsAmerican: number;
    oddsDecimal: number;
  };
  fairOddsDecimal: number;
  expectedValuePercent: number;
  status: 'live' | 'upcoming';
}

export interface YouthPlayHighlight {
  id: string;
  athlete: string;
  ageGroup: string;
  sport: string;
  position: string;
  jerseyNumber: number;
  headline: string;
  gameContext: string;
  videoDuration: string;
  thumbnailColor: string;
  keyStat: string;
  statLabel: string;
  nilValuationEst: string;
  recruiterViews: number;
  cvTelemetry: {
    topSpeedMph: number;
    launchAngleDeg?: number;
    verticalInches?: number;
    accuracyPercent?: number;
  };
}

export interface SimulationParameters {
  modelId: string;
  arpu: number;
  initialUsers: number;
  monthlyNewUsers: number;
  monthlyGrowthRatePercent: number;
  churnRatePercent: number;
  cac: number;
  grossMarginPercent: number;
  timeframeMonths: number;
}

export interface MonthlyProjection {
  month: number;
  activeUsers: number;
  mrr: number;
  arr: number;
  monthlyRevenue: number;
  customerAcquisitionSpend: number;
  grossProfit: number;
  cumulativeProfit: number;
}

export interface VentureValidationResult {
  speedScore: number;
  monthsToFirstMillion: string;
  verdict: string;
  strengths: string[];
  fatalRisks: string[];
  unfairDistributionChannels: string[];
  suggestedPricing: string;
  mvpSprintPlan: string[];
}
