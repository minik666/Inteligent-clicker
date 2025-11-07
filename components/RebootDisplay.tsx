import React from 'react';
import type { PlayerStats } from '../types';

interface RebootDisplayProps {
  currentInferences: number;
  playerStats: PlayerStats;
  onReboot: () => void;
  formatNumber: (num: number) => string;
}

const REBOOT_INFERENCE_REQUIREMENT = 1_000_000_000; // 1 Billion

const RebootDisplay: React.FC<RebootDisplayProps> = ({ currentInferences, playerStats, onReboot, formatNumber }) => {
    const rpToGain = Math.floor(Math.sqrt(currentInferences / REBOOT_INFERENCE_REQUIREMENT));
    const canReboot = rpToGain > 0;
    const prestigeBoost = playerStats.researchPoints * 10;

    return (
        <div className="max-h-[75vh] overflow-y-auto pr-2 text-center flex flex-col items-center justify-center h-full">
            <div className="bg-slate-900/50 p-6 rounded-2xl shadow-xl border-2 border-purple-600 max-w-2xl">
                <h2 className="text-3xl font-black text-purple-300 mb-4">Reboot Simulation</h2>
                <p className="text-slate-300 mb-4">
                    Reset your progress (inferences, upgrades, research) to earn Research Points (RP).
                    Each Research Point provides a permanent <strong className="text-white">+10%</strong> boost to all inference generation.
                </p>
                <div className="space-y-4 my-6">
                    <div className="p-4 rounded-lg bg-slate-800">
                        <p className="text-sm text-slate-400">Current Research Points</p>
                        <p className="text-3xl font-bold text-purple-300">{playerStats.researchPoints}</p>
                    </div>
                     <div className="p-4 rounded-lg bg-slate-800">
                        <p className="text-sm text-slate-400">Current Global Boost</p>
                        <p className="text-3xl font-bold text-purple-300">+{prestigeBoost}%</p>
                    </div>
                     <div className="p-4 rounded-lg bg-slate-800">
                        <p className="text-sm text-slate-400">RP on next reboot</p>
                        <p className={`text-3xl font-bold ${canReboot ? 'text-green-400' : 'text-slate-500'}`}>{rpToGain}</p>
                    </div>
                </div>

                <button 
                    onClick={onReboot}
                    disabled={!canReboot}
                    className={`w-full py-4 text-xl font-bold rounded-lg transition-all duration-200 shadow-lg ${
                        canReboot
                         ? 'bg-purple-700 hover:bg-purple-600 text-white cursor-pointer transform hover:scale-105'
                         : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    }`}
                >
                    {canReboot ? 'Reboot Now' : `Need ${formatNumber(REBOOT_INFERENCE_REQUIREMENT)} inferences`}
                </button>
                <p className="text-xs text-slate-500 mt-3">Achievements and total stats will not be reset.</p>
            </div>
        </div>
    );
};

export default RebootDisplay;
