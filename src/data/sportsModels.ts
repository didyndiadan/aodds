import { SportsModel, ArbitrageBet, YouthPlayHighlight } from '../types';

export const SPORTS_MODELS: SportsModel[] = [
  {
    id: 'positive-ev-arbitrage',
    name: 'Positive-EV & Odds Arbitrage Intelligence SaaS',
    badge: '#1 Fastest to $1M ARR',
    speedRank: 1,
    timeToMillion: '6 – 10 Months',
    medianArpu: 149,
    targetUsersForMillion: 560,
    churnRatePercent: 4.5,
    cacEstimate: 95,
    moatRating: 'High',
    regulatoryComplexity: 'Low',
    summary:
      'A real-time data scraper & mathematical scanner that identifies line discrepancies across major sportsbooks (DraftKings, FanDuel, Pinnacle) and alerts subscribers to risk-free arbitrage and mathematically profitable +EV bets.',
    whyItScalesFast: [
      'Immediate Mathematical ROI: A bettor with a $3,000 bankroll makes $400-$1,200/mo following the tool, making a $149/mo subscription a "no-brainer".',
      'Extreme B2C Retention: Users do not cancel because canceling directly reduces their monthly income.',
      'Software-only gross margins (>90%) with low infrastructure overhead using WebSocket odds pipes.'
    ],
    monetizationTiers: [
      {
        name: 'Starter (+EV Finder)',
        price: '$79/mo',
        target: 'Casual recreational sports bettors',
        features: ['Up to 5% Edge Bets', '5 Core Bookmakers', '10-minute Refresh Alerts', 'Web App Dashboard']
      },
      {
        name: 'Pro Arbitrageur',
        price: '$179/mo',
        target: 'Semi-pro bettors & syndicates',
        features: ['Real-time 1-sec WebSocket odds', 'Full Arbitrage Calculator & Kelly Bet Sizer', '25+ Bookmakers & Exchanges', 'Push & Telegram Alerts']
      },
      {
        name: 'Syndicate Terminal',
        price: '$499/mo',
        target: 'High-roller groups & hedge-fund algos',
        features: ['Automated 1-click bet slip deep-links', 'Middles & Low-Hold tools', 'API Access', 'Custom Discord Webhooks']
      }
    ],
    unitEconomics: {
      grossMargin: '91%',
      ltv: '$2,480',
      cac: '$95',
      ltvCacRatio: '26.1x',
      paybackMonths: '0.7 months'
    },
    provenPrecedents: [
      {
        name: 'OddsJam',
        estimatedRevenue: '$20M+ ARR',
        keyTakeaway: 'Scaled rapidly via educational YouTube videos showing live profit calculations and live bet slips.'
      },
      {
        name: 'Outlier.bet',
        estimatedRevenue: '$8M+ ARR',
        keyTakeaway: 'Built a sleek consumer-first mobile interface focusing on player prop trends and correlation charts.'
      },
      {
        name: 'RebelBetting',
        estimatedRevenue: '€12M+ ARR',
        keyTakeaway: 'Pioneered subscription-based sure-betting in European and international soccer markets.'
      }
    ],
    techStack: [
      {
        category: 'Data Feeds',
        tools: ['The Odds API', 'OpticOdds Enterprise', 'PropData APIs']
      },
      {
        category: 'Backend / Compute',
        tools: ['Node.js Worker Pools', 'Redis In-Memory Cache (sub-10ms)', 'WebSockets']
      },
      {
        category: 'Client & Mobile',
        tools: ['React / Vite SPA', 'Tailwind CSS', 'Progressive Web App (PWA)']
      }
    ],
    goToOneHundredPlaybook: [
      'Record 15-second daily screen recordings showing $50 guaranteed arbitrage profit made in 60 seconds.',
      'Post transparent "Day 1 to $10,000 using our math engine" on TikTok, X, and YouTube Shorts.',
      'Create a free Discord community providing 1 free +EV pick per day, locking the remaining 30 daily picks behind the $99/mo gate.',
      'Affiliate revenue share with sports betting content creators (offering 30% lifetime recurring commission).'
    ]
  },
  {
    id: 'ai-youth-highlights',
    name: 'AI Youth Sports Clip & Recruiter NIL Showcase',
    badge: 'Massive B2C Parental TAM',
    speedRank: 2,
    timeToMillion: '9 – 14 Months',
    medianArpu: 29,
    targetUsersForMillion: 2880,
    churnRatePercent: 3.2,
    cacEstimate: 42,
    moatRating: 'Very High',
    regulatoryComplexity: 'Low',
    summary:
      'Computer vision engine that analyzes recorded youth and high school games (basketball, soccer, football, baseball), automatically slices clutch plays, overlays player tracking and exit velocity, and generates recruiter-ready NIL reels.',
    whyItScalesFast: [
      'Parental FOMO: US parents spend $30B+ annually on club athletics; every parent dreams of college athletic scholarships and NIL visibility.',
      'Hyper-Viral Distribution: When a proud parent posts their kid’s branded highlight reel on Instagram or TikTok, the entire team and opposing coaches ask what software made it.',
      'B2B Club Bundles: Club directors can charge every player an extra $30 tech fee and white-label your software.'
    ],
    monetizationTiers: [
      {
        name: 'Athlete Pass',
        price: '$19/mo or $149/yr',
        target: 'High school & youth athlete parents',
        features: ['Automated Clutch Play Clipping', 'Player Spot Shadow & Arrow Tracking', 'Verified Metric Overlays', 'Recruiter Sharable Web Profile']
      },
      {
        name: 'Team / Club License',
        price: '$180/mo per team',
        target: 'Travel coaches & club directors',
        features: ['Full Roster Video Tagging', 'Automatic Game Recap Reels', 'Coach Tactical Telemetry', 'Private Scout Portal']
      },
      {
        name: 'College Scout Directory',
        price: '$450/mo',
        target: 'NCAA Division I/II/III recruiters',
        features: ['Search by Verified Exit Velo / 40-yd dash', 'Direct Athlete Contact Link', 'Uncut Game Footage Access']
      }
    ],
    unitEconomics: {
      grossMargin: '84%',
      ltv: '$680',
      cac: '$42',
      ltvCacRatio: '16.2x',
      paybackMonths: '1.4 months'
    },
    provenPrecedents: [
      {
        name: 'Hudl / Assist',
        estimatedRevenue: '$150M+ ARR',
        keyTakeaway: 'Dominated high schools through team film breakdown, now moving into youth club sports.'
      },
      {
        name: 'GameChanger (by Dick’s)',
        estimatedRevenue: '$50M+ ARR',
        keyTakeaway: 'Free scorekeeping hooked coaches; streaming video and highlight subscriptions monetized parents.'
      },
      {
        name: 'Trace Up',
        estimatedRevenue: '$25M+ ARR',
        keyTakeaway: 'Sold GPS sensors + video cameras directly to soccer clubs for automated athlete-focused playlists.'
      }
    ],
    techStack: [
      {
        category: 'Computer Vision',
        tools: ['YOLOv8 Object Detection', 'OpenCV / MediaPipe Pose', 'FFmpeg WASM']
      },
      {
        category: 'Media Infrastructure',
        tools: ['Cloudflare Stream / AWS MediaConvert', 'S3 Glacier Storage', 'HLS Streaming']
      },
      {
        category: 'Client Interface',
        tools: ['HTML5 Video Canvas API', 'WebCodecs', 'Mobile-First Responsive UI']
      }
    ],
    goToOneHundredPlaybook: [
      'Offer to record and generate free pro highlight reels for the top 5 high school teams in a major metro area.',
      'Have athletes post their clips tagging your brand on Instagram / TikTok with the hashtag #ScoutCertified.',
      'Show up at Saturday youth tournament complexes with a booth generating instant 30-second reel cards for parents on their phone in 2 minutes.',
      'Partner with travel tournament directors to include video highlight passes in the team registration checkout.'
    ]
  },
  {
    id: 'pickleball-padel-os',
    name: 'Padel & Pickleball Dynamic Yield & Matchmaker OS',
    badge: 'Fastest Growing Sport Globally',
    speedRank: 3,
    timeToMillion: '12 – 16 Months',
    medianArpu: 189,
    targetUsersForMillion: 440,
    churnRatePercent: 1.8,
    cacEstimate: 310,
    moatRating: 'Very High',
    regulatoryComplexity: 'Low',
    summary:
      'All-in-one venue operating system for pickleball & padel clubs that automates court reservations with airline-style dynamic surge pricing, split payments among 4 players, and open drop-in match matchmaking based on DUPR ratings.',
    whyItScalesFast: [
      'Severe Court Shortage: Pickleball grew 300%+ and padel is exploding across US, UK, and Europe. Courts sit empty at 11 AM and have waiting lists at 6 PM.',
      'Dynamic Pricing Yield: By adjusting rates automatically like Uber, clubs increase top-line court revenue by 32% to 45%.',
      'Dual Revenue Stream: $149/mo B2B SaaS fee from venues PLUS 2.5% to 4% payment processing rake on every court booking processed.'
    ],
    monetizationTiers: [
      {
        name: 'Club Core',
        price: '$129/mo + 2.9% fee',
        target: '4-8 court boutique clubs',
        features: ['Automated Court Booking & Gate Pin', 'Split Bill 4-Way Checkout', 'Dynamic Hourly Surge Engine', 'DUPR Rating Sync']
      },
      {
        name: 'Enterprise Facility',
        price: '$299/mo + 2.2% fee',
        target: 'Mega-venues (10+ courts) & franchises',
        features: ['League & Tournament Engine', 'Pro Shop & Beverage POS Integration', 'Membership Pass Subscriptions', 'Multi-Location Dashboard']
      },
      {
        name: 'Player Premium Club',
        price: '$9.99/mo per player',
        target: 'Active competitive players',
        features: ['Priority 48-Hour Early Booking Window', 'Skill-Matched Drop-In Invites', 'Personal Match Analytics']
      }
    ],
    unitEconomics: {
      grossMargin: '88%',
      ltv: '$8,400',
      cac: '$310',
      ltvCacRatio: '27.1x',
      paybackMonths: '2.1 months'
    },
    provenPrecedents: [
      {
        name: 'Playtomic',
        estimatedRevenue: '€40M+ Gross Volume',
        keyTakeaway: 'Captured the European padel market by turning courts into social matchmaking networks.'
      },
      {
        name: 'CourtReserve',
        estimatedRevenue: '$15M+ ARR',
        keyTakeaway: 'Replaced legacy pen-and-paper club management across American tennis and pickleball facilities.'
      }
    ],
    techStack: [
      {
        category: 'Payments & Escrow',
        tools: ['Stripe Connect Custom', 'Split-Tender Webhooks', 'Automated Refunds']
      },
      {
        category: 'Hardware / IoT',
        tools: ['Remote Court Light Relays (Shelly/Tuya)', 'PIN Gate Locks (RemoteLock API)']
      },
      {
        category: 'Frontend & App',
        tools: ['React Interactive Calendar', 'Geolocation Court Radar', 'Tailwind CSS']
      }
    ],
    goToOneHundredPlaybook: [
      'Walk into 15 local pickleball and tennis clubs in your region and offer to audit their court utilization for free.',
      'Prove that dynamic pricing during dead morning/afternoon hours will generate an extra $3,000/month in pure profit.',
      'Offer zero-risk onboarding: waive the SaaS fee for 60 days and only take a 3% performance rake on incremental revenue.'
    ]
  },
  {
    id: 'local-nil-marketplace',
    name: 'Local Business & High School NIL Matchmaker',
    badge: 'Uncapped Transaction Rake',
    speedRank: 4,
    timeToMillion: '12 – 18 Months',
    medianArpu: 350,
    targetUsersForMillion: 240,
    churnRatePercent: 4.8,
    cacEstimate: 220,
    moatRating: 'Medium',
    regulatoryComplexity: 'Medium',
    summary:
      'A streamlined marketplace connecting local businesses (car dealerships, pizza shops, fitness gyms, orthodontists) with high school and college athletes for localized social media promos, clinic appearances, and autograph drops.',
    whyItScalesFast: [
      'High Average Order Value: Local NIL deals range from $250 to $2,500 each. A 15% marketplace take-rate yields $37 to $375 per single transaction.',
      'Zero Inventory Liability: You hold zero inventory; you provide standardized legal contracts, escrow payments, and proof-of-post verification.',
      'High School NIL Opening: High school athletic associations across 40+ states now allow athletes to monetize their name, image, and likeness.'
    ],
    monetizationTiers: [
      {
        name: 'Marketplace Take Rate',
        price: '15% per deal',
        target: 'Transactional volume',
        features: ['Automated NIL Contract Generation', 'Escrow Fund Protection', 'Proof-of-Deliverable Verification']
      },
      {
        name: 'Brand Pro Subscription',
        price: '$99/mo',
        target: 'Local brands & marketing agencies',
        features: ['Unlimited Athlete Outreach', 'Roster Campaign Builder', 'Tax 1099 Compliance Automation']
      }
    ],
    unitEconomics: {
      grossMargin: '82%',
      ltv: '$3,100',
      cac: '$220',
      ltvCacRatio: '14.1x',
      paybackMonths: '1.8 months'
    },
    provenPrecedents: [
      {
        name: 'Opendorse',
        estimatedRevenue: '$25M+ Revenue',
        keyTakeaway: 'Built compliance tools for universities, then opened self-service deals for local businesses.'
      },
      {
        name: 'Postgame',
        estimatedRevenue: '$10M+ Volume',
        keyTakeaway: 'Aggregated micro-influencer college athletes for regional restaurant and apparel campaigns.'
      }
    ],
    techStack: [
      {
        category: 'Legal & Contracts',
        tools: ['DocuSign API / HelloSign', 'State NIL Rule Compliance Engine']
      },
      {
        category: 'Escrow & Payouts',
        tools: ['Stripe Treasury / Stripe Connect', 'Plaid Identity Verification']
      },
      {
        category: 'Social Verification',
        tools: ['Instagram Graph API', 'TikTok Content Verification API']
      }
    ],
    goToOneHundredPlaybook: [
      'Sign up 50 standout local high school athletes with great social engagement by giving them professional athlete media kits for free.',
      'Pitch 20 local businesses (orthodontists, sports stores, burger joints) on getting 10x cheaper influencer reach than Instagram ads.',
      'Execute 5 pilot campaigns and publish the case study: "$400 spent on star quarterback post generated $2,800 in shoe sales".'
    ]
  },
  {
    id: 'amateur-tournament-ppv',
    name: 'Amateur Tournament Live Pay-Per-View & Bracket Escrow',
    badge: 'High Event Burst Cashflow',
    speedRank: 5,
    timeToMillion: '14 – 20 Months',
    medianArpu: 420,
    targetUsersForMillion: 200,
    churnRatePercent: 6.0,
    cacEstimate: 450,
    moatRating: 'Medium',
    regulatoryComplexity: 'Low',
    summary:
      'Turnkey mobile streaming and pay-per-view platform for amateur, youth travel, and recreational weekend tournaments. Monetizes out-of-town parents, grandparents, and recruiters with $15 weekend tournament streaming passes.',
    whyItScalesFast: [
      'Captive Audience: Grandparents, traveling working parents, and relatives cannot attend out-of-town weekend tournaments and eagerly pay $15-$25 for live coverage.',
      'Tournament Director Incentive: Share 40% of streaming revenue with tournament hosts; directors bring their entire 60-team tournament onto your platform with zero customer acquisition friction.',
      'Massive Weekend Volume: 1 tournament with 60 teams generates 600 potential family viewers = $9,000 gross per event.'
    ],
    monetizationTiers: [
      {
        name: 'Family Tournament Pass',
        price: '$14.99 / weekend',
        target: 'Parents & grandparents',
        features: ['Full HD Multi-Court Live Streams', 'DVR Pause & Instant Replay', 'Downloadable Match Archive']
      },
      {
        name: 'Tournament Director License',
        price: '$199 setup + 50/50 rev-share',
        target: 'Event organizers',
        features: ['Zero Hardware Hassle (stream from iOS/Android)', 'Live Dynamic Brackets & Scores', 'Instant Sponsor Logo Overlays']
      }
    ],
    unitEconomics: {
      grossMargin: '76%',
      ltv: '$1,950',
      cac: '$180',
      ltvCacRatio: '10.8x',
      paybackMonths: '2.5 months'
    },
    provenPrecedents: [
      {
        name: 'LiveBarn',
        estimatedRevenue: '$35M+ ARR',
        keyTakeaway: 'Installed stationary cameras in ice hockey rinks and charges parents $19.95/month to watch games.'
      },
      {
        name: 'FloSports',
        estimatedRevenue: '$100M+ ARR',
        keyTakeaway: 'Bought rights to niche sports (wrestling, cheer, track) and charges $30/mo or $150/yr.'
      }
    ],
    techStack: [
      {
        category: 'Streaming Video',
        tools: ['WebRTC / WHIP Protocol', 'Amazon IVS / Cloudflare Calls', 'HLS Sub-Second Latency']
      },
      {
        category: 'Brackets & Scores',
        tools: ['Real-time Firebase / Supabase syncing', 'Automated Scoreboard Graphic Generator']
      }
    ],
    goToOneHundredPlaybook: [
      'Target 10 independent youth soccer/basketball tournament organizers in your state.',
      'Tell them: "We will stream your courts using mobile tripods and hand you a check for 50% of the PPV revenue with zero upfront cost".',
      'Collect emails of all parents during tournament registration to market early-bird stream passes.'
    ]
  },
  {
    id: 'cv-biomechanics-coach',
    name: 'Smartphone Computer Vision Pitch & Swing Coach',
    badge: 'Deep Tech Defensibility',
    speedRank: 6,
    timeToMillion: '16 – 22 Months',
    medianArpu: 49,
    targetUsersForMillion: 1700,
    churnRatePercent: 4.1,
    cacEstimate: 85,
    moatRating: 'Very High',
    regulatoryComplexity: 'Low',
    summary:
      'Computer vision web app that analyzes slow-motion smartphone video of a golf swing, baseball pitch, basketball jump shot, or tennis serve, outputting joint kinematic angles, exit speed, and actionable drill corrections.',
    whyItScalesFast: [
      'High Replacement Value: Private coaching sessions cost $100-$200/hour; an automated AI coach for $39-$49/month feels like an incredible bargain.',
      'High Switching Costs: Athletes track their progress over time and develop loyalty to their historical kinetic data graphs.',
      'B2B Academy Licences: Private training facilities and youth coaches adopt it to prescribe remote homework to their students.'
    ],
    monetizationTiers: [
      {
        name: 'Athlete Pro',
        price: '$39/mo',
        target: 'Competitive amateur athletes',
        features: ['Unlimited Video Analysis', 'Kinematic Joint Sequence Graphs', 'AI Drill Prescription', 'Historical Form Comparison']
      },
      {
        name: 'Coach & Academy Suite',
        price: '$249/mo',
        target: 'Private trainers & training facilities',
        features: ['50 Athlete Roster Management', 'Voiceover Video Feedback', 'Custom Academy Branding', 'Exportable Biomechanical Reports']
      }
    ],
    unitEconomics: {
      grossMargin: '86%',
      ltv: '$950',
      cac: '$85',
      ltvCacRatio: '11.1x',
      paybackMonths: '2.2 months'
    },
    provenPrecedents: [
      {
        name: 'SwingVision',
        estimatedRevenue: '$10M+ ARR',
        keyTakeaway: 'Used single iPhone camera on tennis court fence for automated line calling and shot stats.'
      },
      {
        name: 'GolfFix',
        estimatedRevenue: '$7M+ ARR',
        keyTakeaway: 'Korean startup utilizing mobile AI pose estimation to provide immediate swing diagnostic scores.'
      }
    ],
    techStack: [
      {
        category: 'Vision Processing',
        tools: ['MediaPipe 33-Keypoint Pose Estimation', 'WebGL Hardware Acceleration', 'TensorFlow.js']
      },
      {
        category: 'Kinematics Engine',
        tools: ['Custom Joint Angle Vectors', 'Angular Velocity Derivatives', 'Phase Segmentation Algorithms']
      }
    ],
    goToOneHundredPlaybook: [
      'Build a free instant swing diagnostic tool where anyone can upload a 5-second video and receive their kinetic score in 10 seconds.',
      'Share side-by-side slow-motion comparisons of famous pro athletes (Shohei Ohtani, Rory McIlroy, Steph Curry) with kinematic overlay lines on Twitter and TikTok.',
      'Partner with 20 respected private coaches on Instagram, giving them free academy accounts in exchange for demonstrating the app with their students.'
    ]
  }
];

export const SAMPLE_ARBITRAGE_BETS: ArbitrageBet[] = [
  {
    id: 'arb-1',
    sport: 'Basketball',
    league: 'NBA',
    match: 'Boston Celtics @ Denver Nuggets',
    startTime: 'Tonight, 8:30 PM ET',
    market: 'Total Points Over/Under 224.5',
    type: 'arbitrage',
    edgePercent: 3.82,
    legA: {
      bookmaker: 'DraftKings',
      selection: 'Over 224.5',
      oddsAmerican: 110,
      oddsDecimal: 2.10
    },
    legB: {
      bookmaker: 'FanDuel',
      selection: 'Under 224.5',
      oddsAmerican: 105,
      oddsDecimal: 2.05
    },
    fairOddsDecimal: 2.00,
    expectedValuePercent: 5.0,
    status: 'live'
  },
  {
    id: 'arb-2',
    sport: 'Soccer',
    league: 'Premier League',
    match: 'Arsenal vs Manchester City',
    startTime: 'Saturday, 12:30 PM GMT',
    market: 'Both Teams To Score (BTTS)',
    type: 'positive_ev',
    edgePercent: 7.45,
    legA: {
      bookmaker: 'BetMGM',
      selection: 'Yes (BTTS)',
      oddsAmerican: 120,
      oddsDecimal: 2.20
    },
    legB: {
      bookmaker: 'Pinnacle (Sharp Benchmark)',
      selection: 'No (BTTS)',
      oddsAmerican: -115,
      oddsDecimal: 1.87
    },
    fairOddsDecimal: 2.05,
    expectedValuePercent: 7.45,
    status: 'live'
  },
  {
    id: 'arb-3',
    sport: 'Baseball',
    league: 'MLB',
    match: 'Los Angeles Dodgers @ New York Yankees',
    startTime: 'Tomorrow, 7:05 PM ET',
    market: 'Moneyline Winner',
    type: 'arbitrage',
    edgePercent: 4.15,
    legA: {
      bookmaker: 'Caesars',
      selection: 'LA Dodgers Moneyline',
      oddsAmerican: 118,
      oddsDecimal: 2.18
    },
    legB: {
      bookmaker: 'DraftKings',
      selection: 'NY Yankees Moneyline',
      oddsAmerican: -102,
      oddsDecimal: 1.98
    },
    fairOddsDecimal: 2.02,
    expectedValuePercent: 4.15,
    status: 'upcoming'
  },
  {
    id: 'arb-4',
    sport: 'Football',
    league: 'NFL',
    match: 'Kansas City Chiefs @ San Francisco 49ers',
    startTime: 'Sunday, 4:25 PM ET',
    market: 'Patrick Mahomes Over 2.5 Passing TDs',
    type: 'positive_ev',
    edgePercent: 8.60,
    legA: {
      bookmaker: 'BetRivers',
      selection: 'Over 2.5 Passing TDs',
      oddsAmerican: 165,
      oddsDecimal: 2.65
    },
    legB: {
      bookmaker: 'Pinnacle Sharp Line',
      selection: 'Under 2.5 Passing TDs',
      oddsAmerican: -155,
      oddsDecimal: 1.64
    },
    fairOddsDecimal: 2.44,
    expectedValuePercent: 8.60,
    status: 'live'
  }
];

export const SAMPLE_YOUTH_HIGHLIGHTS: YouthPlayHighlight[] = [
  {
    id: 'play-1',
    athlete: 'Jordan Vance',
    ageGroup: 'Class of 2027 (Junior)',
    sport: 'Basketball',
    position: 'Point Guard',
    jerseyNumber: 3,
    headline: 'Game-Winning Step-Back 3-Pointer with 1.2s on Clock',
    gameContext: 'State Semifinals vs Oak Ridge Academy',
    videoDuration: '0:14',
    thumbnailColor: 'bg-indigo-950',
    keyStat: '41.2 in',
    statLabel: 'Peak Vertical',
    nilValuationEst: '$18,500/yr',
    recruiterViews: 1420,
    cvTelemetry: {
      topSpeedMph: 16.4,
      verticalInches: 41.2,
      accuracyPercent: 96
    }
  },
  {
    id: 'play-2',
    athlete: 'Mateo Morales',
    ageGroup: 'Class of 2026 (Senior)',
    sport: 'Soccer',
    position: 'Striker / Winger',
    jerseyNumber: 9,
    headline: 'Upper 90 Curving Free Kick from 28 Yards Out',
    gameContext: 'Regional ECNL Championship Final',
    videoDuration: '0:11',
    thumbnailColor: 'bg-emerald-950',
    keyStat: '74 mph',
    statLabel: 'Shot Velocity',
    nilValuationEst: '$24,000/yr',
    recruiterViews: 2190,
    cvTelemetry: {
      topSpeedMph: 20.8,
      accuracyPercent: 99
    }
  },
  {
    id: 'play-3',
    athlete: 'Trey Hawkins',
    ageGroup: 'Class of 2028 (Sophomore)',
    sport: 'Football',
    position: 'Quarterback',
    jerseyNumber: 12,
    headline: '48-Yard Touchdown Bomb Dropped into Tight Window',
    gameContext: 'District Opener vs Westlake High',
    videoDuration: '0:16',
    thumbnailColor: 'bg-amber-950',
    keyStat: '56.4 mph',
    statLabel: 'Throw Release Speed',
    nilValuationEst: '$32,000/yr',
    recruiterViews: 3840,
    cvTelemetry: {
      topSpeedMph: 17.2,
      launchAngleDeg: 34,
      accuracyPercent: 94
    }
  }
];
