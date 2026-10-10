import React, { useState } from 'react';
import { 
  Grid, 
  TrendingUp, 
  Zap, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle, 
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';

interface CourtSlot {
  id: string;
  hour: string;
  isPeak: boolean;
  basePrice: number;
  surgePrice: number;
  occupancyFlat: boolean;
  occupancyDynamic: boolean;
}

export const CourtYieldSandbox: React.FC = () => {
  const [pricingMode, setPricingMode] = useState<'flat' | 'dynamic'>('dynamic');
  const [clubCount, setClubCount] = useState<number>(45);

  const courts = ['Court 1 (Indoor)', 'Court 2 (Indoor)', 'Court 3 (Outdoor)', 'Court 4 (Outdoor)'];

  const slots: CourtSlot[] = [
    { id: '8am', hour: '8:00 AM', isPeak: false, basePrice: 40, surgePrice: 25, occupancyFlat: false, occupancyDynamic: true },
    { id: '10am', hour: '10:00 AM', isPeak: false, basePrice: 40, surgePrice: 30, occupancyFlat: false, occupancyDynamic: true },
    { id: '12pm', hour: '12:00 PM', isPeak: false, basePrice: 40, surgePrice: 35, occupancyFlat: true, occupancyDynamic: true },
    { id: '2pm', hour: '2:00 PM', isPeak: false, basePrice: 40, surgePrice: 28, occupancyFlat: false, occupancyDynamic: true },
    { id: '4pm', hour: '4:00 PM', isPeak: false, basePrice: 40, surgePrice: 45, occupancyFlat: true, occupancyDynamic: true },
    { id: '6pm', hour: '6:00 PM', isPeak: true, basePrice: 40, surgePrice: 75, occupancyFlat: true, occupancyDynamic: true },
    { id: '7pm', hour: '7:00 PM', isPeak: true, basePrice: 40, surgePrice: 85, occupancyFlat: true, occupancyDynamic: true },
    { id: '8pm', hour: '8:00 PM', isPeak: true, basePrice: 40, surgePrice: 75, occupancyFlat: true, occupancyDynamic: true },
    { id: '9pm', hour: '9:00 PM', isPeak: false, basePrice: 40, surgePrice: 40, occupancyFlat: true, occupancyDynamic: true },
  ];

  // Calculate daily revenue across 4 courts
  let dailyRevenueFlat = 0;
  let dailyRevenueDynamic = 0;

  slots.forEach((s) => {
    if (s.occupancyFlat) dailyRevenueFlat += s.basePrice * courts.length;
    if (s.occupancyDynamic) dailyRevenueDynamic += s.surgePrice * courts.length;
  });

  const activeDailyRev = pricingMode === 'flat' ? dailyRevenueFlat : dailyRevenueDynamic;
  const revenueLiftPercent = ((dailyRevenueDynamic - dailyRevenueFlat) / dailyRevenueFlat) * 100;
  const monthlyExtraProfit = (dailyRevenueDynamic - dailyRevenueFlat) * 30;

  // Founder Software Economics
  const saasFeePerClub = 149; // $149/mo
  const monthlyProcessedPerClub = dailyRevenueDynamic * 30;
  const processingTakeRate = 0.029; // 2.9% Stripe connect fee cut
  const totalFounderMonthlyPerClub = saasFeePerClub + (monthlyProcessedPerClub * processingTakeRate);
  const totalFounderArr = totalFounderMonthlyPerClub * clubCount * 12;

  return (
    <div className="space-y-8">
      {/* Header & Strategic Context */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wide">
            <Grid className="h-4 w-4" />
            Live Product Prototype #3 · Padel & Pickleball Dynamic Yield OS
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Padel & Pickleball Dynamic Yield & Split-Payment OS
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Pickleball is the fastest growing sport in North America (+300% YoY) and Padel is exploding worldwide. 
            Courts sit empty in the mornings at flat rates ($40/hr) and have multi-week waitlists at 7 PM. 
            By providing an airline-style dynamic surge pricing engine + 4-way split payment mobile escrow, you unlock massive venue profits and capture a high-margin B2B SaaS + GMV rake.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Dynamic airline-style yield optimization
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Dual revenue: $149/mo SaaS + 2.9% transaction rake
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
              Only 45 venue clubs needed to surpass $1M ARR
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Yield Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Court Booking Matrix (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                Venue Court Utilization Matrix
              </h3>
              <p className="text-xs text-slate-500">
                Hourly slots across 4 courts at "Metro Padel & Pickleball Club"
              </p>
            </div>

            {/* Toggle Mode Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                onClick={() => setPricingMode('flat')}
                className={`px-3 py-1.5 rounded-md transition-colors ${pricingMode === 'flat' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'}`}
              >
                Flat Pricing ($40/hr)
              </button>
              <button
                onClick={() => setPricingMode('dynamic')}
                className={`px-3 py-1.5 rounded-md transition-colors ${pricingMode === 'dynamic' ? 'bg-emerald-600 text-white shadow-xs font-bold' : 'text-slate-600'}`}
              >
                Dynamic Yield ($25–$85/hr)
              </button>
            </div>
          </div>

          {/* Time Slots Table */}
          <div className="space-y-2">
            {slots.map((slot) => {
              const price = pricingMode === 'flat' ? slot.basePrice : slot.surgePrice;
              const isOccupied = pricingMode === 'flat' ? slot.occupancyFlat : slot.occupancyDynamic;

              return (
                <div
                  key={slot.id}
                  className={`p-3 rounded-lg border flex items-center justify-between transition-colors ${
                    !isOccupied
                      ? 'bg-slate-50/60 border-slate-200 text-slate-400'
                      : slot.isPeak && pricingMode === 'dynamic'
                      ? 'bg-amber-50/40 border-amber-200 text-slate-900'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold w-18">{slot.hour}</span>
                    <div>
                      <div className="text-xs font-semibold">
                        {slot.isPeak ? 'Peak Evening Window' : 'Standard / Daytime Window'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {isOccupied ? '4 Courts Booked (16 Players)' : 'Courts Unoccupied (Dead Inventory)'}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-sm text-slate-900">
                      ${price}/hr <span className="text-[11px] text-slate-500 font-normal">per court</span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      ${price / 4}/player (4-way split)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Founder Economics & Venue Pitch (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Venue ROI Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-emerald-600" />
                The Venue Owner's ROI Pitch
              </h3>
              <p className="text-xs text-slate-500">
                Why clubs eagerly sign your contract in the first meeting
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500">Flat Model Daily:</span>
                <div className="font-mono font-bold text-slate-900 text-base mt-0.5">
                  ${dailyRevenueFlat.toLocaleString()}
                </div>
                <div className="text-[10px] text-rose-600">30% empty morning slots</div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="text-emerald-800 font-medium">Dynamic Yield Daily:</span>
                <div className="font-mono font-bold text-emerald-950 text-base mt-0.5">
                  ${dailyRevenueDynamic.toLocaleString()}
                </div>
                <div className="text-[10px] text-emerald-700 font-bold">+{revenueLiftPercent.toFixed(1)}% Revenue Jump</div>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-950 text-white rounded-lg text-xs space-y-1">
              <div className="text-emerald-300">Club Extra Annual Profit Generated:</div>
              <div className="text-xl font-bold font-mono text-emerald-400">
                +${(monthlyExtraProfit * 12).toLocaleString()} / year
              </div>
              <div className="text-[11px] text-slate-300">
                Paying your $149/mo SaaS fee is an imperceptible 0.8% of their new profit.
              </div>
            </div>
          </div>

          {/* Founder Scale Slider */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 text-emerald-600" />
                Your Path to $1M ARR as the Founder
              </h3>
              <p className="text-xs text-slate-500">
                Dual monetization: $149 SaaS + 2.9% transaction fee rake
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Clubs Onboarded</span>
                <span className="font-mono font-bold text-slate-900 text-base">{clubCount} clubs</span>
              </div>
              <input
                type="range"
                min={5}
                max={150}
                step={5}
                value={clubCount}
                onChange={(e) => setClubCount(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>5 clubs</span>
                <span>45 clubs ($1M ARR threshold)</span>
                <span>150 clubs</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Revenue Per Club (SaaS + Rake):</span>
                <span className="font-mono text-white font-bold">${Math.round(totalFounderMonthlyPerClub).toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Monthly Recurring Revenue (MRR):</span>
                <span className="font-mono text-emerald-400 font-bold">${Math.round(totalFounderMonthlyPerClub * clubCount).toLocaleString()}/mo</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-200">Your Annualized ARR:</span>
                <span className="text-xl font-mono font-black text-emerald-400">
                  ${Math.round(totalFounderArr).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
