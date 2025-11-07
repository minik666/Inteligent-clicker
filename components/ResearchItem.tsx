import React from 'react';
import type { Research } from '../types';

interface ResearchItemProps {
  research: Research;
  researchList: Research[];
  onBuy: (id: number) => void;
  currentInferences: number;
  formatNumber: (num: number) => string;
}

const ResearchItem: React.FC<ResearchItemProps> = ({ research, researchList, onBuy, currentInferences, formatNumber }) => {
  const isAffordable = currentInferences >= research.cost;
  
  const prereqsMet = research.prerequisites?.every(prereqId =>
    researchList.find(r => r.id === prereqId)?.researched
  ) ?? true;

  const isLocked = !prereqsMet;
  const isResearched = research.researched;
  const canBuy = isAffordable && !isLocked && !isResearched;

  let buttonText = 'Research';
  if (isResearched) buttonText = 'Researched';
  else if (isLocked) buttonText = 'Locked';

  return (
    <div
      className={`w-full flex items-center p-3 rounded-lg border-2 transition-all duration-200 ${
        isResearched
          ? 'bg-green-900/40 border-green-700'
          : isLocked 
          ? 'bg-slate-800/50 border-slate-700 opacity-60'
          : 'bg-slate-700/50 border-slate-600'
      }`}
    >
      <div className="text-4xl mr-4">{isResearched ? '✅' : isLocked ? '🔒' : '🔬'}</div>
      <div className="flex-grow text-left">
        <h3 className={`text-lg font-bold ${isResearched ? 'text-green-300' : 'text-white'}`}>{research.name}</h3>
        <p className="text-sm text-gray-400">{research.description}</p>
        {!isResearched && (
           <p className="text-sm font-semibold text-cyan-400 mt-1">
             Cost: {formatNumber(research.cost)}
           </p>
        )}
      </div>
      <button
        onClick={() => onBuy(research.id)}
        disabled={!canBuy}
        className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
          canBuy
            ? 'bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer'
            : isResearched
            ? 'bg-green-700 text-white cursor-default'
            : 'bg-slate-600 text-slate-400 cursor-not-allowed'
        }`}
        aria-label={`Research ${research.name}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ResearchItem;
