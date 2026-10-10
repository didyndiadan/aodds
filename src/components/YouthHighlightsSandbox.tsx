import React, { useState } from 'react';
import { SAMPLE_YOUTH_HIGHLIGHTS } from '../data/sportsModels';
import { YouthPlayHighlight } from '../types';
import { 
  Video, 
  Sparkles, 
  Share2, 
  Eye, 
  Award, 
  TrendingUp, 
  Play, 
  Pause, 
  CheckCircle, 
  DollarSign,
  Maximize2,
  Sliders,
  Flame
} from 'lucide-react';

export const YouthHighlightsSandbox: React.FC = () => {
  const [selectedPlay, setSelectedPlay] = useState<YouthPlayHighlight>(SAMPLE_YOUTH_HIGHLIGHTS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showCvOverlays, setShowCvOverlays] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [brandDealTier, setBrandDealTier] = useState<string>('Tier 2 (Regional Sports Store)');

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header & Strategic Context */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wide">
            <Video className="h-4 w-4" />
            Live Product Prototype #2 · The "Hudl meets Overtime" Blueprint
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            AI Youth Sports Auto-Clipper & Recruiter NIL Hub
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Parents spend an average of $3,500/year on club sports and desperately want college scholarship visibility and NIL brand recognition. 
            By using automated computer vision to clip game plays, overlay verified telemetry (exit velocity, vertical jump), and build instant recruiter profiles, you tap into an obsession-driven B2C market with built-in viral distribution.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
              Automated clutch play detection
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Recruiter-verified telemetry overlays
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Parent-to-Parent viral referral loop (K-factor &gt; 1.8)
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Simulated Video Player & CV Tracking Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Automated CV Tracking Stream
              </h3>
              <p className="text-xs text-slate-500">
                Computer-vision model detects player #{selectedPlay.jerseyNumber} and overlays biometric telemetry
              </p>
            </div>

            {/* Toggle Overlay Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCvOverlays(!showCvOverlays)}
                className={`text-xs font-medium py-1.5 px-3 rounded-lg border transition-colors ${
                  showCvOverlays 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                {showCvOverlays ? 'Hide CV Tracking' : 'Show CV Tracking'}
              </button>
            </div>
          </div>

          {/* Interactive Simulated Video Screen */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video flex flex-col justify-between p-5 border border-slate-800 shadow-md">
            {/* Sport Court Background Graphic Mock */}
            <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
              <div className="w-3/4 h-3/4 border-2 border-white/40 rounded-full flex items-center justify-center">
                <div className="w-1/2 h-1/2 border border-white/20 rounded-lg" />
              </div>
            </div>

            {/* Top Bar on Video */}
            <div className="relative z-10 flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-rose-600 text-white font-bold text-[10px] px-2 py-0.5 rounded tracking-wide">
                  AI CLIPPED
                </span>
                <span className="text-slate-300 font-medium">
                  {selectedPlay.sport} · {selectedPlay.gameContext}
                </span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">
                {selectedPlay.videoDuration}
              </span>
            </div>

            {/* Simulated Computer Vision Detection Box */}
            {showCvOverlays && (
              <div className="relative z-10 my-auto self-center w-64 h-36 border-2 border-emerald-400 rounded-lg p-2.5 bg-emerald-500/10 backdrop-blur-[1px] flex flex-col justify-between shadow-lg animate-pulse">
                <div className="flex justify-between items-start">
                  <div className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Flame className="h-3 w-3 text-amber-300" />
                    TARGET: #{selectedPlay.jerseyNumber} {selectedPlay.athlete.split(' ')[0]}
                  </div>
                  <div className="bg-slate-900/90 text-emerald-400 font-mono text-[10px] px-1.5 py-0.5 rounded">
                    Confidence: 99.4%
                  </div>
                </div>

                {/* Trajectory vector arc simulated */}
                <div className="self-center text-center">
                  <div className="text-[10px] text-white/90 font-medium tracking-wide drop-shadow">
                    {selectedPlay.headline}
                  </div>
                </div>

                {/* Bottom Real-time Telemetry metrics */}
                <div className="flex justify-between items-center bg-slate-900/80 px-2 py-1 rounded text-[10px] font-mono text-white">
                  <span>Speed: {selectedPlay.cvTelemetry.topSpeedMph} mph</span>
                  {selectedPlay.cvTelemetry.verticalInches && (
                    <span className="text-amber-300">Vert: {selectedPlay.cvTelemetry.verticalInches}"</span>
                  )}
                  {selectedPlay.cvTelemetry.launchAngleDeg && (
                    <span className="text-cyan-300">Angle: {selectedPlay.cvTelemetry.launchAngleDeg}°</span>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Controls Bar on Video */}
            <div className="relative z-10 flex justify-between items-center text-xs pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-full bg-white text-slate-900 hover:bg-slate-200 transition-colors"
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
                </button>
                <span className="text-white font-medium text-xs">
                  {selectedPlay.athlete} ({selectedPlay.position})
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <Eye className="h-3.5 w-3.5 text-indigo-400" />
                <span>{selectedPlay.recruiterViews.toLocaleString()} Scout Views</span>
              </div>
            </div>
          </div>

          {/* Play Selection Carousel */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-700">Select Game Highlight:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SAMPLE_YOUTH_HIGHLIGHTS.map((play) => (
                <button
                  key={play.id}
                  onClick={() => setSelectedPlay(play)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPlay.id === play.id
                      ? 'border-indigo-500 bg-indigo-50/30 ring-1 ring-indigo-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="text-[11px] font-semibold text-slate-500">{play.sport}</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{play.athlete}</div>
                  <div className="text-[11px] text-slate-600 line-clamp-1 mt-1">{play.headline}</div>
                  <div className="mt-2 text-[10px] font-mono text-indigo-700 font-bold">
                    {play.statLabel}: {play.keyStat}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recruiter NIL Showcase Profile Card (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Award className="h-4 w-4 text-amber-500" />
                Generated Recruiter NIL Card
              </h3>
              <p className="text-xs text-slate-500">
                Shareable link sent to college coaches & local brand sponsors
              </p>
            </div>
            <button
              onClick={handleCopyLink}
              className="text-xs font-medium py-1.5 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1"
            >
              <Share2 className="h-3.5 w-3.5" />
              {copiedLink ? 'Copied!' : 'Share Profile'}
            </button>
          </div>

          {/* Athlete Digital Card */}
          <div className="p-4 rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-slate-50 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-xs">
                #{selectedPlay.jerseyNumber}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">{selectedPlay.athlete}</h4>
                <div className="text-xs text-slate-500">
                  {selectedPlay.position} · {selectedPlay.ageGroup}
                </div>
              </div>
            </div>

            {/* Key Verified Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Verified Metric</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{selectedPlay.keyStat}</div>
                <div className="text-[10px] text-slate-500">{selectedPlay.statLabel}</div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Est. NIL Valuation</span>
                <div className="font-bold text-emerald-700 text-sm mt-0.5">{selectedPlay.nilValuationEst}</div>
                <div className="text-[10px] text-slate-500">Local sponsor interest</div>
              </div>
            </div>

            {/* Local Brand Deal Simulator */}
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-2">
              <span className="font-semibold text-slate-800 text-[11px] block">
                Instant Brand Matchmaking Escrow:
              </span>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-600">Sample Campaign:</span>
                <span className="font-medium text-slate-900">Regional Sports Apparel Reel</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-600">Payout to Athlete:</span>
                <span className="font-bold text-slate-900">$350.00</span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-emerald-700 pt-1 border-t border-slate-100">
                <span className="font-semibold">Your Platform Rake (15%):</span>
                <span className="font-bold font-mono">+$52.50 per deal</span>
              </div>
            </div>
          </div>

          {/* Why This Makes You Millions Faster */}
          <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50 text-xs space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              The Viral Parental Growth Engine:
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Every time a parent posts this video with the recruiter watermark to Instagram Stories or TikTok, <strong className="text-slate-900">12–20 other parents on the travel team ask: "Where did you get that verified highlight reel?"</strong>. 
              You acquire customers at zero ad spend ($0 CAC) and charge $19–$29/mo or $149/season. With 50M youth athletes in North America alone, hitting $1M ARR requires capturing just 0.007% of the market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
