import React, { useState } from 'react';
import type { Upgrade, Research, Achievement, PlayerStats } from '../types';
import UpgradeItem from './UpgradeItem';
import ResearchLab from './ResearchLab';
import AchievementsDisplay from './AchievementsDisplay';
import RebootDisplay from './RebootDisplay';

interface StoreProps {
  upgrades: Upgrade[];
  research: Research[];
  achievements: Achievement[];
  playerStats: PlayerStats;
  onBuyUpgrade: (id: number) => void;
  onBuyResearch: (id: number) => void;
  onReboot: () => void;
  currentInferences: number;
  formatNumber: (num: number) => string;
}

type Tab = 'compute' | 'automation' | 'research' | 'achievements' | 'reboot';

const Store: React.FC<StoreProps> = ({ upgrades, research, achievements, playerStats, onBuyUpgrade, onBuyResearch, onReboot, currentInferences, formatNumber }) => {
  const [activeTab, setActiveTab] = useState<Tab>('compute');

  const getTabClass = (tabName: Tab) => 
    `w-1/5 py-3 text-center font-bold text-lg cursor-pointer transition-colors duration-200 rounded-t-lg ${
      activeTab === tabName 
      ? 'bg-slate-700/80 text-cyan-300' 
      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
    }`;
  
  const computeUpgrades = upgrades.filter(u => u.category === 'compute');
  const automationUpgrades = upgrades.filter(u => u.category === 'automation');

  return (
    <div className="bg-slate-800/50 rounded-2xl shadow-2xl h-full flex flex-col">
      <div className="flex border-b-2 border-slate-700">
        <button onClick={() => setActiveTab('compute')} className={getTabClass('compute')}>
          Compute
        </button>
        <button onClick={() => setActiveTab('automation')} className={getTabClass('automation')}>
          Automation
        </button>
        <button onClick={() => setActiveTab('research')} className={getTabClass('research')}>
          Research
        </button>
        <button onClick={() => setActiveTab('achievements')} className={getTabClass('achievements')}>
          Achievements
        </button>
        <button onClick={() => setActiveTab('reboot')} className={getTabClass('reboot')}>
          Reboot
        </button>
      </div>
      <div className="p-4 flex-grow overflow-hidden">
        {activeTab === 'compute' && (
          <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-2">
            {computeUpgrades.map(upgrade => (
              <UpgradeItem
                key={upgrade.id}
                upgrade={upgrade}
                onBuy={onBuyUpgrade}
                currentInferences={currentInferences}
                formatNumber={formatNumber}
              />
            ))}
          </div>
        )}
        {activeTab === 'automation' && (
           <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-2">
            {automationUpgrades.map(upgrade => (
              <UpgradeItem
                key={upgrade.id}
                upgrade={upgrade}
                onBuy={onBuyUpgrade}
                currentInferences={currentInferences}
                formatNumber={formatNumber}
              />
            ))}
          </div>
        )}
        {activeTab === 'research' && (
          <ResearchLab
            researchList={research}
            onBuyResearch={onBuyResearch}
            currentInferences={currentInferences}
            formatNumber={formatNumber}
          />
        )}
        {activeTab === 'achievements' && (
          <AchievementsDisplay achievements={achievements} />
        )}
        {activeTab === 'reboot' && (
          <RebootDisplay 
            currentInferences={currentInferences}
            playerStats={playerStats}
            onReboot={onReboot}
            formatNumber={formatNumber}
          />
        )}
      </div>
    </div>
  );
};

export default Store;