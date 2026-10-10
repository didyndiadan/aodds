import React, { useState } from 'react';
import { VentureValidationResult } from '../types';
import { 
  Sparkles, 
  Send, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Compass, 
  RefreshCw,
  Lightbulb
} from 'lucide-react';

export const AiVenturePartner: React.FC = () => {
  const [ideaPrompt, setIdeaPrompt] = useState<string>(
    'An automated video referee & line-calling app for high school and club tennis/pickleball that runs on an iPhone mounted to the fence, charging $19/mo per player or $149/mo per tournament.'
  );
  const [targetAudience, setTargetAudience] = useState<string>('Tennis & Pickleball Tournament Directors and Competitive Players');
  const [monetizationModel, setMonetizationModel] = useState<string>('B2B Tournament License + B2C Player Subscription');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<VentureValidationResult | null>({
    speedScore: 9,
    monthsToFirstMillion: '8 – 14 Months',
    verdict: 'High-urgency pain point with immense viral distribution. Line dispute drama ruins matches; providing objective camera-verified calls on any iPhone eliminates arguments and spreads virally court-to-court.',
    strengths: [
      'High viral K-factor: Every match involves 2–4 players who all download the app to view contested point replays.',
      'Tournament Directors have intense willingness to pay: Removes parent arguments and liability.',
      'Sub-second inference can be run on-device via WebCodecs & WebGL to minimize server compute costs.'
    ],
    fatalRisks: [
      'Camera shake and poor lighting in outdoor public parks can cause false-positive line calls.',
      'Must ensure phone battery does not overheat during 3-hour summer tournaments.'
    ],
    unfairDistributionChannels: [
      'Partner directly with UTR (Universal Tennis Rating) and DUPR tournament organizers as official line-judge partner.',
      'Offer free tournament licenses to high school coaches in exchange for mandatory player app downloads.'
    ],
    suggestedPricing: '$14.99/mo per player or $199 per weekend tournament package.',
    mvpSprintPlan: [
      'Week 1: Build 60fps ball-tracking pipeline on single smartphone camera using MediaPipe & OpenCV WASM.',
      'Week 2: Test line calibration (4-point court corner tap) on 5 local courts.',
      'Week 3: Run private beta tournament trial; record contested calls and parent reactions.',
      'Week 4: Launch self-serve tournament organizer dashboard with Stripe Connect ticketing.'
    ]
  });

  const promptStarters = [
    {
      title: 'AI Line-Calling on iPhone',
      idea: 'An automated video referee and line-calling app for tennis & pickleball running on an iPhone mounted to the court fence, charging $19/mo per player or $149/mo per tournament.',
      audience: 'Pickleball & Tennis tournament directors, junior players',
      model: 'SaaS + Tournament Event Pass'
    },
    {
      title: 'Green-Reading AI Golf Caddie',
      idea: 'A smartphone camera web app that scans golf putting greens, computes contour topography slope angles via photogrammetry, and provides the exact putting break line.',
      audience: 'Casual and amateur golfers with high disposable income',
      model: '$9.99/month B2C Subscription'
    },
    {
      title: 'High School NIL Escrow & Matcher',
      idea: 'A compliance and escrow platform connecting local small businesses (car dealers, gyms, pizza shops) with standout high school athletes for compliant $200-$1000 social sponsorships.',
      audience: 'Local small business owners & high school student-athletes',
      model: '15% Marketplace Take Rate'
    },
    {
      title: 'Youth Travel Team Micro-Sponsor Hub',
      idea: 'A fintech app that lets youth sports teams crowdfund micro-sponsorships from local merchants (logos on jerseys & live stream overlays) with automated receipt tax deductions.',
      audience: 'Youth club directors, parents, local community businesses',
      model: '5% Platform Fee + $49/mo Team Management SaaS'
    }
  ];

  const handleValidate = async () => {
    if (!ideaPrompt.trim()) return;
    setIsLoading(true);

    try {
      const response = await fetch('/api/validate-venture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: ideaPrompt,
          targetAudience,
          monetizationModel,
          budget: 'Low capital / Bootstrapped'
        })
      });

      if (!response.ok) {
        throw new Error('Analysis request failed');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wide">
            <Sparkles className="h-4 w-4" />
            AI Venture Partner & Idea Stress-Tester
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Spar with a Sports Tech Venture Capitalist
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Have a sports app idea? Stress-test it against ruthless venture economics. 
            Powered by Gemini, our venture engine tears down your assumptions, spots fatal legal/churn traps, and reverse-engineers the shortest path to $1,000,000 ARR.
          </p>
        </div>
      </div>

      {/* Main Form & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Idea Input Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            Submit Your Sports App Idea
          </h3>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-500">Quick Idea Presets:</span>
            <div className="grid grid-cols-2 gap-2">
              {promptStarters.map((starter, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIdeaPrompt(starter.idea);
                    setTargetAudience(starter.audience);
                    setMonetizationModel(starter.model);
                  }}
                  className="p-2 text-left rounded-lg border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 transition-colors"
                >
                  {starter.title}
                </button>
              ))}
            </div>
          </div>

          {/* Idea Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-800 block">
              Core Concept & User Value Proposition:
            </label>
            <textarea
              rows={4}
              value={ideaPrompt}
              onChange={(e) => setIdeaPrompt(e.target.value)}
              placeholder="Describe what the sports app does, who uses it, and why they would pay..."
              className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
            />
          </div>

          {/* Target Audience */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-800 block">
              Primary Target Audience:
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Travel baseball parents, golf instructors..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {/* Monetization Model */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-800 block">
              Monetization Strategy:
            </label>
            <input
              type="text"
              value={monetizationModel}
              onChange={(e) => setMonetizationModel(e.target.value)}
              placeholder="e.g. $99/mo SaaS, 15% marketplace rake..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <button
            onClick={handleValidate}
            disabled={isLoading || !ideaPrompt.trim()}
            className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-emerald-400" />
                Venture Partner Analyzing Concept...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-emerald-400" />
                Stress-Test & Analyze Speed to $1M ARR
              </>
            )}
          </button>
        </div>

        {/* Right Column: AI Analysis Result (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {analysis ? (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
              {/* Top Score & Time Horizon */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                    Speed to $1M ARR Score
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-slate-900 font-mono">
                      {analysis.speedScore} <span className="text-base text-slate-400 font-normal">/ 10</span>
                    </span>
                    <span className={`text-xs font-semibold ${analysis.speedScore >= 8 ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {analysis.speedScore >= 8 ? 'Fast Velocity Path' : 'Moderate Velocity'}
                    </span>
                  </div>
                </div>

                <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                    Estimated Time Horizon
                  </div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5 flex items-center sm:justify-end gap-1.5">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    {analysis.monthsToFirstMillion}
                  </div>
                </div>
              </div>

              {/* Executive Verdict */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Executive Verdict
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-emerald-50/40 p-3.5 rounded-lg border border-emerald-100">
                  {analysis.verdict}
                </p>
              </div>

              {/* Strengths vs Fatal Risks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Strengths */}
                <div className="p-3.5 rounded-lg border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Unfair Advantages
                  </span>
                  <ul className="space-y-1.5 text-slate-600">
                    {analysis.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">·</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fatal Risks */}
                <div className="p-3.5 rounded-lg border border-rose-100 bg-rose-50/30 space-y-2">
                  <span className="font-bold text-rose-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                    Fatal Traps to Avoid
                  </span>
                  <ul className="space-y-1.5 text-rose-900">
                    {analysis.fatalRisks.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold">·</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Guerrilla Customer Acquisition */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                  <Compass className="h-3.5 w-3.5 text-indigo-600" />
                  First 100 Customers (Zero Ad Spend)
                </span>
                <div className="space-y-1.5">
                  {analysis.unfairDistributionChannels.map((c, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-700">
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Pricing & 4-Week MVP */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">Recommended Pricing Ladder:</span>
                  <span className="font-mono font-bold text-emerald-700">{analysis.suggestedPricing}</span>
                </div>
                <div className="pt-2 border-t border-slate-200/80">
                  <span className="font-bold text-slate-800 block mb-1">4-Week Rapid Execution Plan:</span>
                  <div className="space-y-1 text-slate-600">
                    {analysis.mvpSprintPlan.map((sprint, idx) => (
                      <div key={idx} className="text-[11px]">
                        <strong>Sprint {idx + 1}:</strong> {sprint.replace(/^Week \d+:\s*/i, '')}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-400 text-xs">
              Submit your idea on the left to receive a comprehensive venture teardown.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
