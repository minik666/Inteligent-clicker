import React, { useState, useCallback } from 'react';
import type { FloatingNumber, ActiveEffect } from '../types';
import { playSound } from '../utils/audio';
import { SOUNDS } from '../sounds';
import ActiveEffectsDisplay from './ActiveEffectsDisplay';

interface InferenceDisplayProps {
  inferences: number;
  totalPassiveInferences: number;
  computeOnlyPower: number;
  autoClicksPerSecond: number;
  onInferenceClick: () => void;
  formatNumber: (num: number) => string;
  isMuted: boolean;
  activeEffects: ActiveEffect[];
  prestigeBoost: number;
}

const InferenceDisplay: React.FC<InferenceDisplayProps> = ({ 
  inferences, 
  totalPassiveInferences, 
  computeOnlyPower,
  autoClicksPerSecond,
  onInferenceClick, 
  formatNumber, 
  isMuted, 
  activeEffects,
  prestigeBoost
}) => {
  const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([]);

  const handleInferenceClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onInferenceClick();
    playSound(SOUNDS.click, isMuted, 0.6);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + (Math.random() * 40 - 20);
    const y = e.clientY - rect.top - 20;

    const newNumber: FloatingNumber = {
      id: Date.now() + Math.random(),
      value: `+${formatNumber(1 * prestigeBoost)}`,
      x,
      y,
    };

    setFloatingNumbers(prev => [...prev, newNumber]);

    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(n => n.id !== newNumber.id));
    }, 1500);
  }, [onInferenceClick, isMuted, prestigeBoost, formatNumber]);
  
  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-2xl h-full flex flex-col justify-start items-center sticky top-4">
      <div className="text-center mb-6 w-full">
        <h2 className="text-6xl font-black text-cyan-200" style={{ textShadow: '0 0 15px rgba(103, 232, 249, 0.5)' }}>
          {formatNumber(Math.floor(inferences))}
        </h2>
        <p className="text-cyan-400/80 font-medium">inferences</p>
        <div className="text-sm text-gray-400 mt-1">
          <p>inferences/sec: {formatNumber(totalPassiveInferences)}</p>
          {(computeOnlyPower > 0 || autoClicksPerSecond > 0) && (
             <p className="text-xs text-gray-500">
                ({formatNumber(computeOnlyPower)} compute + {formatNumber(autoClicksPerSecond)} clicks)
             </p>
          )}
        </div>
        {prestigeBoost > 1 && (
            <div className="mt-2 text-center p-2 rounded-lg bg-purple-900/40 border border-purple-600">
                <p className="font-bold text-sm text-purple-300">
                    Prestige Boost: +{((prestigeBoost - 1) * 100).toFixed(0)}%
                </p>
            </div>
        )}
        <ActiveEffectsDisplay effects={activeEffects} />
      </div>
      <div className="relative w-64 h-64 md:w-80 md:h-80 mt-auto">
        <button
          onClick={handleInferenceClick}
          className="w-full h-full rounded-full transition-transform duration-100 ease-in-out transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-cyan-400 focus:ring-opacity-50 clickable-shadow flex items-center justify-center text-8xl"
          style={{
            backgroundImage: 'radial-gradient(circle, #1e3a8a, #172554)',
          }}
        >
            <span className="sr-only">Click to run inference</span>
            <span style={{ filter: 'drop-shadow(0 0 10px rgba(103, 232, 249, 0.7))'}}>🧠</span>
        </button>
        {floatingNumbers.map(num => (
          <span
            key={num.id}
            className="absolute text-2xl font-bold text-white pointer-events-none animate-float-up"
            style={{
              left: `${num.x}px`,
              top: `${num.y}px`,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {num.value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InferenceDisplay;