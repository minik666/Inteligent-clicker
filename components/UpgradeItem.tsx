import React from 'react';
import type { Upgrade } from '../types';

interface UpgradeItemProps {
  upgrade: Upgrade;
  onBuy: (id: number) => void;
  currentInferences: number;
  formatNumber: (num: number) => string;
}

const UpgradeItem: React.FC<UpgradeItemProps> = ({ upgrade, onBuy, currentInferences, formatNumber }) => {
  if (!upgrade.unlocked) {
    return (
       <div className={`w-full flex items-center p-3 rounded-lg border-2 bg-slate-800/50 border-slate-700 opacity-50`}>
          <div className="text-4xl mr-4">❓</div>
          <div className="flex-grow text-left">
            <h3 className="text-lg font-bold text-slate-500">Undiscovered Upgrade</h3>
            <p className="text-sm text-gray-500">Complete more research to unlock this.</p>
          </div>
        </div>
    );
  }

  const isAffordable = currentInferences >= upgrade.cost;

  const benefitText = upgrade.category === 'compute'
    ? `+ ${formatNumber(upgrade.computePower)} compute`
    : `+ ${formatNumber(upgrade.clicksPerSec || 0)} clicks/sec`;

  return (
    <button
      onClick={() => onBuy(upgrade.id)}
      disabled={!isAffordable}
      className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 border-2 relative overflow-hidden ${
        isAffordable
          ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-600/50 hover:border-cyan-400/50 cursor-pointer'
          : 'bg-slate-800/50 border-slate-700 opacity-50 cursor-not-allowed'
      }`}
    >
      <div className="text-4xl mr-4 z-10">{upgrade.icon}</div>
      <div className="flex-grow text-left z-10">
        <h3 className="text-lg font-bold text-white">{upgrade.name}</h3>
        <p className="text-sm text-gray-400">{upgrade.description}</p>
        <div className="flex items-center space-x-4 mt-1">
           <p className="text-sm font-semibold text-cyan-400">
             Cost: {formatNumber(upgrade.cost)}
           </p>
           <p className="text-xs text-gray-300">
             {benefitText}
           </p>
        </div>
      </div>
      <div className="text-right z-10">
        <p className="text-4xl font-black text-slate-600 leading-none">{upgrade.count}</p>
        <p className="text-xs text-slate-500 font-bold">OWNED</p>
      </div>
    </button>
  );
};

export default UpgradeItem;