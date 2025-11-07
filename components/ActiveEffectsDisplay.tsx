import React, { useState, useEffect } from 'react';
import type { ActiveEffect } from '../types';

interface ActiveEffectsDisplayProps {
  effects: ActiveEffect[];
}

const ActiveEffectsDisplay: React.FC<ActiveEffectsDisplayProps> = ({ effects }) => {
  const [, setNow] = useState(Date.now());

  useEffect(() => {
    if (effects.length === 0) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [effects.length]);

  if (effects.length === 0) return null;

  const getEffectColor = (description: string) => {
    if (description.includes('lost') || description.includes('reducing')) {
        return 'text-red-400';
    }
    return 'text-green-400';
  }

  return (
    <div className="mt-4 w-full text-left p-3 bg-slate-900/50 rounded-lg">
      <h3 className="font-bold text-sm text-slate-300 mb-2">Active Effects:</h3>
      <ul className="space-y-1">
        {effects.map(effect => {
          const remaining = Math.max(0, Math.ceil((effect.expiryTimestamp - Date.now()) / 1000));
          const minutes = Math.floor(remaining / 60);
          const seconds = remaining % 60;
          return (
            <li key={effect.id} className={`text-xs ${getEffectColor(effect.description)} flex justify-between`}>
              <span>{effect.description}</span>
              <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActiveEffectsDisplay;
