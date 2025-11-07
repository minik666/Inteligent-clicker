import React, { useState, useCallback } from 'react';
import type { FloatingNumber } from '../types';
import { playSound } from '../utils/audio';
import { SOUNDS } from '../sounds';


interface CookieDisplayProps {
  cookies: number;
  cps: number;
  onCookieClick: () => void;
  formatNumber: (num: number) => string;
  isMuted: boolean;
}

const CookieDisplay: React.FC<CookieDisplayProps> = ({ cookies, cps, onCookieClick, formatNumber, isMuted }) => {
  const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([]);

  const handleCookieClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onCookieClick();
    playSound(SOUNDS.click, isMuted, 0.6);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + (Math.random() * 40 - 20);
    const y = e.clientY - rect.top - 20;

    const newNumber: FloatingNumber = {
      id: Date.now() + Math.random(),
      value: '+1',
      x,
      y,
    };

    setFloatingNumbers(prev => [...prev, newNumber]);

    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(n => n.id !== newNumber.id));
    }, 1500);
  }, [onCookieClick, isMuted]);
  
  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl shadow-2xl h-full flex flex-col justify-center items-center sticky top-4">
      <div className="text-center mb-6">
        <h2 className="text-6xl font-black text-amber-200" style={{ textShadow: '0 0 15px rgba(253, 230, 138, 0.5)' }}>
          {formatNumber(Math.floor(cookies))}
        </h2>
        <p className="text-amber-400/80 font-medium">cookies</p>
        <p className="text-sm text-gray-400 mt-1">per second: {formatNumber(cps)}</p>
      </div>
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <button
          onClick={handleCookieClick}
          className="w-full h-full bg-amber-700 rounded-full transition-transform duration-100 ease-in-out transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 cookie-shadow"
          style={{
            backgroundImage: 'radial-gradient(circle, #854d0e, #713f12)',
            backgroundSize: '100%',
          }}
        >
            <span className="sr-only">Click to get a cookie</span>
            {/* Chocolate chips */}
            <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-stone-900 rounded-full opacity-80"></div>
            <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-stone-900 rounded-full opacity-80"></div>
            <div className="absolute top-1/3 left-2/3 w-5 h-5 bg-stone-900 rounded-full opacity-80"></div>
            <div className="absolute top-2/3 left-1/2 w-7 h-7 bg-stone-900 rounded-full opacity-80"></div>
            <div className="absolute top-3/4 left-1/4 w-4 h-4 bg-stone-900 rounded-full opacity-80"></div>
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

export default CookieDisplay;