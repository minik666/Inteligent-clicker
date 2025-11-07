
import React from 'react';
// Fix: Changed type import from 'Building' to 'Upgrade' to match existing types.
import type { Upgrade } from '../types';

interface BuildingItemProps {
  upgrade: Upgrade;
  onBuy: (id: number) => void;
  currentInferences: number;
  formatNumber: (num: number) => string;
}

const BuildingItem: React.FC<BuildingItemProps> = ({ upgrade, onBuy, currentInferences, formatNumber }) => {
  const isAffordable = currentInferences >= upgrade.cost;

  const benefitText = upgrade.category === 'compute'
    ? `+ ${formatNumber(upgrade.computePower)} compute`
    : `+ ${formatNumber(upgrade.clicksPerSec || 0)} clicks/sec`;

  return (
    <button
      onClick={() => onBuy(upgrade.id)}
      disabled={!isAffordable}
      className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 border-2 ${
        isAffordable
          ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50 hover:border-amber-400/50 cursor-pointer'
          : 'bg-gray-800/50 border-gray-700 opacity-50 cursor-not-allowed'
      }`}
    >
      <div className="text-4xl mr-4">{upgrade.icon}</div>
      <div className="flex-grow text-left">
        <h3 className="text-lg font-bold text-white">{upgrade.name}</h3>
        <p className="text-sm text-gray-400">{upgrade.description}</p>
        <div className="flex items-center space-x-4 mt-1">
           <p className="text-sm font-semibold text-amber-400">
             Cost: {formatNumber(upgrade.cost)}
           </p>
           <p className="text-xs text-gray-300">
             {benefitText}
           </p>
        </div>
      </div>
      <div className="text-4xl font-black text-gray-500">{upgrade.count}</div>
    </button>
  );
};

export default BuildingItem;
