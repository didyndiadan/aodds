import React from 'react';
import { X, Check } from 'lucide-react';
import { ALL_BOOKMAKERS } from '../../data/mockOddsFeed';

interface BookmakerFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeBookmakerIds: string[];
  onToggleBookmaker: (id: string) => void;
  onSelectAll: () => void;
}

export const BookmakerFilterModal: React.FC<BookmakerFilterModalProps> = ({
  isOpen,
  onClose,
  activeBookmakerIds,
  onToggleBookmaker,
  onSelectAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="h-4 w-4" />
        </button>

        <div>
          <h3 className="text-base font-bold text-white">
            Active Sportsbook Accounts
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Toggle on the bookmakers where you currently hold deposited funds. The terminal will only alert you to opportunities between your active books.
          </p>
        </div>

        <div className="space-y-2">
          {ALL_BOOKMAKERS.map((bm) => {
            const isActive = activeBookmakerIds.includes(bm.id);
            return (
              <div
                key={bm.id}
                onClick={() => onToggleBookmaker(bm.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-950/50 border-slate-850 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: bm.color }} 
                  />
                  <span className="font-semibold text-xs">{bm.name}</span>
                </div>

                <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                  isActive
                    ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                    : 'border-slate-800'
                }`}>
                  {isActive && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
          <button
            onClick={onSelectAll}
            className="text-emerald-400 hover:text-emerald-300 font-medium"
          >
            Select All Books
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
