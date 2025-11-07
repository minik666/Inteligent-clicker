import React from 'react';
import type { Achievement } from '../types';
import AchievementItem from './AchievementItem';

interface AchievementsDisplayProps {
  achievements: Achievement[];
}

const AchievementsDisplay: React.FC<AchievementsDisplayProps> = ({ achievements }) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="max-h-[75vh] overflow-y-auto pr-2">
      <div className="text-center mb-4 p-2 rounded-lg bg-slate-900/50">
        <h2 className="text-xl font-bold text-cyan-300">
          Achievements Unlocked: {unlockedCount} / {totalCount}
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {achievements.map(achievement => (
          <AchievementItem key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};

export default AchievementsDisplay;
