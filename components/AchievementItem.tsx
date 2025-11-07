import React from 'react';
import type { Achievement } from '../types';

interface AchievementItemProps {
  achievement: Achievement;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ achievement }) => {
  const { unlocked, icon, name, description } = achievement;

  return (
    <div
      className={`flex items-center p-3 rounded-lg border-2 transition-all duration-300 ${
        unlocked
          ? 'bg-slate-700/70 border-cyan-500/50 shadow-lg'
          : 'bg-slate-800/50 border-slate-700 opacity-60'
      }`}
      title={unlocked ? 'Unlocked!' : 'Locked'}
    >
      <div className={`text-4xl mr-4 transition-transform duration-300 ${unlocked ? 'grayscale-0 scale-100' : 'grayscale'}`}>
        {icon}
      </div>
      <div className="flex-grow text-left">
        <h3 className={`text-lg font-bold ${unlocked ? 'text-cyan-300' : 'text-slate-400'}`}>
          {name}
        </h3>
        <p className="text-sm text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AchievementItem;
