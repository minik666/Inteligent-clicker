import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { INITIAL_UPGRADADES, INITIAL_RESEARCH, INITIAL_EVENTS, INITIAL_ACHIEVEMENTS, INITIAL_PLAYER_STATS } from './constants';
import type { Upgrade, Breakthrough, Research, GameEvent, GameEventChoice, GameEventEffect, ActiveEffect, PlayerStats, Achievement, Notification } from './types';
import InferenceDisplay from './components/InferenceDisplay';
import Store from './components/Store';
import DevConsole from './components/DevConsole';
import EventModal from './components/EventModal';
import { playSound } from './utils/audio';
import { SOUNDS } from './sounds';

const REBOOT_INFERENCE_REQUIREMENT = 1_000_000_000; // 1 Billion

const App: React.FC = () => {
  const [inferences, setInferences] = useState<number>(() => {
    try {
      const savedInferences = localStorage.getItem('aiTrainer_inferences');
      return savedInferences !== null ? JSON.parse(savedInferences) : 0;
    } catch (error) {
      console.error("Error loading inferences from localStorage", error);
      return 0;
    }
  });
  
  const [upgrades, setUpgrades] = useState<Upgrade[]>(() => {
    try {
      const savedUpgrades = localStorage.getItem('aiTrainer_upgrades');
      if (savedUpgrades) {
        const parsed = JSON.parse(savedUpgrades) as Upgrade[];
        return parsed.map(u => ({...u, category: u.category || 'compute'}));
      }
      return INITIAL_UPGRADADES;
    } catch (error) {
      console.error("Error loading upgrades from localStorage", error);
      return INITIAL_UPGRADADES;
    }
  });

  const [research, setResearch] = useState<Research[]>(() => {
    try {
      const savedResearch = localStorage.getItem('aiTrainer_research');
      return savedResearch !== null ? JSON.parse(savedResearch) : INITIAL_RESEARCH;
    } catch (error) {
      console.error("Error loading research from localStorage", error);
      return INITIAL_RESEARCH;
    }
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
        const saved = localStorage.getItem('aiTrainer_achievements');
        return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
    } catch (e) {
        return INITIAL_ACHIEVEMENTS;
    }
  });

  const [playerStats, setPlayerStats] = useState<PlayerStats>(() => {
    try {
        const saved = localStorage.getItem('aiTrainer_playerStats');
        const defaultStats = INITIAL_PLAYER_STATS;
        if (saved) {
            const parsed = JSON.parse(saved);
            // Add new fields if they don't exist in the saved data
            return { ...defaultStats, ...parsed };
        }
        return defaultStats;
    } catch (e) {
        return INITIAL_PLAYER_STATS;
    }
  });

  const [activeEffects, setActiveEffects] = useState<ActiveEffect[]>(() => {
    try {
      const savedEffects = localStorage.getItem('aiTrainer_activeEffects');
      if (savedEffects) {
        return JSON.parse(savedEffects).filter((e: ActiveEffect) => e.expiryTimestamp > Date.now());
      }
      return [];
    } catch (error) {
      console.error("Error loading active effects from localStorage", error);
      return [];
    }
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [breakthrough, setBreakthrough] = useState<Breakthrough | null>(null);
  const [isDevConsoleVisible, setIsDevConsoleVisible] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);

  const prestigeBoost = useMemo(() => 1 + playerStats.researchPoints * 0.1, [playerStats.researchPoints]);

  const globalBoost = useMemo(() => {
    return research
      .filter(r => r.researched && r.effect.type === 'GLOBAL_BOOST')
      .reduce((total, r) => total + (r.effect.type === 'GLOBAL_BOOST' ? r.effect.value : 0), 1);
  }, [research]);
  
  const eventBoost = useMemo(() => {
    return activeEffects.reduce((total, effect) => total * effect.multiplier, 1);
  }, [activeEffects]);
  
  const rpGainMultiplier = useMemo(() => {
    return research
      .filter(r => r.researched && r.effect.type === 'RP_GAIN_BOOST')
      .reduce((total, r) => total + (r.effect.type === 'RP_GAIN_BOOST' ? r.effect.value : 0), 1);
  }, [research]);

  const computeOnlyPower = useMemo(() => {
    const baseCompute = upgrades
      .filter(u => u.category === 'compute')
      .reduce((total, upgrade) => total + upgrade.count * upgrade.computePower, 0);
    return baseCompute * globalBoost * eventBoost * prestigeBoost;
  }, [upgrades, globalBoost, eventBoost, prestigeBoost]);

  const autoClicksPerSecond = useMemo(() => {
    const baseClicks = upgrades
      .filter(u => u.category === 'automation')
      .reduce((total, upgrade) => total + upgrade.count * (upgrade.clicksPerSec || 0), 0);
    return baseClicks * prestigeBoost;
  }, [upgrades, prestigeBoost]);
  
  const totalPassiveInferencesPerSecond = useMemo(() => {
    return computeOnlyPower + autoClicksPerSecond;
  }, [computeOnlyPower, autoClicksPerSecond]);
  
  // Autosave progress
  useEffect(() => {
    try {
      localStorage.setItem('aiTrainer_inferences', JSON.stringify(inferences));
      localStorage.setItem('aiTrainer_upgrades', JSON.stringify(upgrades));
      localStorage.setItem('aiTrainer_research', JSON.stringify(research));
      localStorage.setItem('aiTrainer_activeEffects', JSON.stringify(activeEffects));
      localStorage.setItem('aiTrainer_achievements', JSON.stringify(achievements));
      localStorage.setItem('aiTrainer_playerStats', JSON.stringify(playerStats));
    } catch (error) {
      console.error("Error saving progress to localStorage", error);
    }
  }, [inferences, upgrades, research, activeEffects, achievements, playerStats]);

  // Game loop
  useEffect(() => {
    const gameLoop = setInterval(() => {
      const passiveGain = totalPassiveInferencesPerSecond / 10;
      setInferences(prev => prev + passiveGain);
      setPlayerStats(prev => ({...prev, totalInferences: prev.totalInferences + passiveGain}));
      setActiveEffects(prev => prev.filter(effect => effect.expiryTimestamp > Date.now()));
    }, 100);

    return () => clearInterval(gameLoop);
  }, [totalPassiveInferencesPerSecond]);
  
  // Achievement checker
  useEffect(() => {
    const checkAchievements = () => {
        achievements.forEach(achievement => {
            if (achievement.unlocked) return;

            let conditionMet = false;
            const { condition } = achievement;
            switch (condition.type) {
                case 'TOTAL_INFERENCES':
                    if (playerStats.totalInferences >= condition.value) conditionMet = true;
                    break;
                case 'TOTAL_CLICKS':
                    if (playerStats.totalClicks >= condition.value) conditionMet = true;
                    break;
                case 'UPGRADE_COUNT':
                    const upgrade = upgrades.find(u => u.id === condition.upgradeId);
                    if (upgrade && upgrade.count >= condition.value) conditionMet = true;
                    break;
                case 'RESEARCH_COUNT':
                    const researchedCount = research.filter(r => r.researched).length;
                    if (researchedCount >= condition.value) conditionMet = true;
                    break;
                case 'BREAKTHROUGHS_CLICKED':
                     if (playerStats.breakthroughsClicked >= condition.value) conditionMet = true;
                    break;
                case 'REBOOT_COUNT':
                     if (playerStats.reboots >= condition.value) conditionMet = true;
                     break;
                case 'RESEARCH_POINTS':
                     if (playerStats.researchPoints >= condition.value) conditionMet = true;
                     break;
            }
            
            if (conditionMet) {
                setAchievements(prev => prev.map(ach => 
                    ach.id === achievement.id ? { ...ach, unlocked: true } : ach
                ));
                playSound(SOUNDS.achievementUnlock, isMuted, 0.7);
                const newNote: Notification = { id: Date.now(), icon: achievement.icon, message: achievement.name };
                setNotifications(n => [...n, newNote]);
                setTimeout(() => {
                    setNotifications(n => n.filter(note => note.id !== newNote.id));
                }, 5000);
            }
        });
    };
    const interval = setInterval(checkAchievements, 2000);
    return () => clearInterval(interval);
  }, [achievements, playerStats, upgrades, research, isMuted]);

  // Dev Console toggle listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsDevConsoleVisible(v => !v);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Breakthrough spawner
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (document.hidden || breakthrough) return;

      if (Math.random() < 0.05) { // ~5% chance every 30 seconds
        playSound(SOUNDS.breakthroughSpawn, isMuted);
        const newBreakthrough: Breakthrough = {
          id: Date.now(),
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 80,
        };
        setBreakthrough(newBreakthrough);

        setTimeout(() => {
          setBreakthrough(current => (current?.id === newBreakthrough.id ? null : current));
        }, 13000);
      }
    }, 30000);

    return () => clearInterval(spawnInterval);
  }, [breakthrough, isMuted]);

  // Event spawner
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (document.hidden || currentEvent || breakthrough) return;

      if (Math.random() < 0.1) { // 10% chance every 60 seconds
          const event = INITIAL_EVENTS[Math.floor(Math.random() * INITIAL_EVENTS.length)];
          setCurrentEvent(event);
          playSound(SOUNDS.eventSpawn, isMuted);
      }
    }, 60000);

    return () => clearInterval(spawnInterval);
  }, [currentEvent, breakthrough, isMuted]);

  const handleInferenceClick = useCallback(() => {
    const clickValue = 1 * prestigeBoost;
    setInferences(prev => prev + clickValue);
    setPlayerStats(prev => ({
        ...prev,
        totalInferences: prev.totalInferences + clickValue,
        totalClicks: prev.totalClicks + 1
    }));
  }, [prestigeBoost]);

  const handleBuyUpgrade = useCallback((upgradeId: number) => {
    setUpgrades(prevUpgrades => {
      const upgradeToBuy = prevUpgrades.find(u => u.id === upgradeId);
      
      if (upgradeToBuy && inferences >= upgradeToBuy.cost) {
        setInferences(prev => prev - upgradeToBuy.cost);
        playSound(SOUNDS.buy, isMuted);
        
        return prevUpgrades.map(upgrade => 
          upgrade.id === upgradeId 
            ? {
                ...upgrade,
                count: upgrade.count + 1,
                cost: Math.ceil(upgrade.cost * 1.15),
              }
            : upgrade
        );
      }
      
      return prevUpgrades;
    });
  }, [inferences, isMuted]);
  
  const handleBuyResearch = useCallback((researchId: number) => {
    const researchToBuy = research.find(r => r.id === researchId);
    if (!researchToBuy || inferences < researchToBuy.cost || researchToBuy.researched) return;

    const prereqsMet = researchToBuy.prerequisites?.every(prereqId => 
        research.find(r => r.id === prereqId)?.researched
    ) ?? true;

    if (prereqsMet) {
        setInferences(prev => prev - researchToBuy.cost);
        playSound(SOUNDS.researchComplete, isMuted, 0.7);

        setResearch(prevResearch => prevResearch.map(r => 
            r.id === researchId ? { ...r, researched: true } : r
        ));

        // Fix: Added Array.isArray check to satisfy TypeScript's type narrowing for the discriminated union.
        if (researchToBuy.effect.type === 'UNLOCK_UPGRADES' && Array.isArray(researchToBuy.effect.value)) {
            setUpgrades(prevUpgrades => prevUpgrades.map(u => 
                researchToBuy.effect.value.includes(u.id) ? { ...u, unlocked: true } : u
            ));
        }
    }
  }, [inferences, research, isMuted]);

  const handleReboot = useCallback(() => {
    const rpToGain = Math.floor(Math.sqrt(inferences / REBOOT_INFERENCE_REQUIREMENT) * rpGainMultiplier);
    if (rpToGain <= 0) return;

    if (window.confirm(`Are you sure you want to reboot? You will gain ${rpToGain} Research Point(s), but your inferences, upgrades, and research will be reset.`)) {
        setPlayerStats(prev => ({
            ...prev,
            researchPoints: prev.researchPoints + rpToGain,
            reboots: prev.reboots + 1,
        }));
        setInferences(0);
        setUpgrades(INITIAL_UPGRADADES);
        setResearch(INITIAL_RESEARCH);
        setActiveEffects([]);
        setCurrentEvent(null);
        setBreakthrough(null);
    }
  }, [inferences, rpGainMultiplier]);

  const handleResetGame = useCallback(() => {
    if (window.confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) {
        localStorage.clear();
        setInferences(0);
        setUpgrades(INITIAL_UPGRADADES);
        setResearch(INITIAL_RESEARCH);
        setActiveEffects([]);
        setCurrentEvent(null);
        setBreakthrough(null);
        setAchievements(INITIAL_ACHIEVEMENTS);
        setPlayerStats(INITIAL_PLAYER_STATS);
    }
  }, []);

  const handleBreakthroughClick = useCallback(() => {
    if (!breakthrough) return;
    playSound(SOUNDS.breakthroughClick, isMuted, 0.8);
    
    const passiveBonus = (totalPassiveInferencesPerSecond > 0 ? totalPassiveInferencesPerSecond : 1) * 900 + 13;
    const reward = passiveBonus * prestigeBoost;
    
    setInferences(c => c + reward);
    setPlayerStats(prev => ({
        ...prev,
        totalInferences: prev.totalInferences + reward,
        breakthroughsClicked: prev.breakthroughsClicked + 1,
    }));
    setBreakthrough(null);
  }, [breakthrough, totalPassiveInferencesPerSecond, isMuted, prestigeBoost]);

  const applyEffect = useCallback((effect: GameEventEffect, choice: GameEventChoice) => {
    switch (effect.type) {
        case 'TEMP_BOOST': {
            const description = `${(effect.multiplier * 100 - 100).toFixed(0)}% compute for ${effect.duration}s`;
            setActiveEffects(prev => [...prev, {
                id: `eff_${Date.now()}`,
                description: choice.outcomeDescription?.success || description,
                expiryTimestamp: Date.now() + effect.duration * 1000,
                multiplier: effect.multiplier
            }]);
            playSound(effect.multiplier > 1 ? SOUNDS.eventSuccess : SOUNDS.eventFail, isMuted);
            break;
        }
        case 'FLAT_CHANGE': {
            const amount = (effect.amount > -1 && effect.amount < 1 && effect.amount !== 0)
                ? inferences * effect.amount
                : effect.amount;
            setInferences(i => Math.max(0, i + amount));
            playSound(amount >= 0 ? SOUNDS.eventSuccess : SOUNDS.eventFail, isMuted);
            break;
        }
        case 'CHOICE_RISK': {
            const didSucceed = Math.random() < effect.successChance;
            applyEffect(didSucceed ? effect.successEffect : effect.failureEffect, choice);
            break;
        }
    }
  }, [inferences, isMuted]);

  const handleEventChoice = useCallback((choice: GameEventChoice) => {
    applyEffect(choice.effect, choice);
    setCurrentEvent(null);
  }, [applyEffect]);

  const handleDevCommand = useCallback((command: string) => {
    const [action, ...args] = command.split(' ');
    
    switch (action.toLowerCase()) {
      case 'addinferences': {
        const amount = parseInt(args[0], 10);
        if (!isNaN(amount)) {
          setInferences(i => i + amount);
          setPlayerStats(p => ({...p, totalInferences: p.totalInferences + amount}));
        }
        break;
      }
      case 'setinferences': {
        const amount = parseInt(args[0], 10);
        if (!isNaN(amount)) {
          setInferences(amount >= 0 ? amount : 0);
        }
        break;
      }
      case 'setupgrade': {
        const id = parseInt(args[0], 10);
        const count = parseInt(args[1], 10);
        if (!isNaN(id) && !isNaN(count) && count >= 0) {
            setUpgrades(prev => prev.map(u => u.id === id ? {...u, count: count} : u));
        }
        break;
      }
      case 'completeresearch': {
          const id = parseInt(args[0], 10);
          if (isNaN(id)) break;
          
          const researchToComplete = research.find(r => r.id === id);
          if (researchToComplete && !researchToComplete.researched) {
              setResearch(prev => prev.map(r => r.id === id ? {...r, researched: true} : r));

              // Fix: Added Array.isArray check to satisfy TypeScript's type narrowing for the discriminated union.
              if (researchToComplete.effect.type === 'UNLOCK_UPGRADES' && Array.isArray(researchToComplete.effect.value)) {
                  setUpgrades(prev => prev.map(u => researchToComplete.effect.value.includes(u.id) ? {...u, unlocked: true} : u));
              }
          }
          break;
      }
      case 'unlockall': {
        setUpgrades(u => u.map(up => ({...up, unlocked: true})));
        setResearch(r => r.map(res => ({...res, researched: true})));
        break;
      }
      case 'unlockachievements': {
        setAchievements(a => a.map(ach => ({...ach, unlocked: true})));
        break;
      }
      case 'addresearchpoints': {
        const amount = parseInt(args[0], 10);
        if (!isNaN(amount)) {
          setPlayerStats(p => ({...p, researchPoints: p.researchPoints + amount }));
        }
        break;
      }
      case 'triggerevent': {
        const eventId = args[0];
        let eventToTrigger = INITIAL_EVENTS.find(e => e.id === eventId);
        if (!eventToTrigger) {
            eventToTrigger = INITIAL_EVENTS[Math.floor(Math.random() * INITIAL_EVENTS.length)];
        }
        setCurrentEvent(eventToTrigger);
        break;
      }
      default:
        console.warn(`Unknown command: ${action}`);
    }
  }, [research]);
  
  const formatNumber = (num: number): string => {
    if (num < 10000) return num.toLocaleString(undefined, { maximumFractionDigits: 1 });
    if (num < 1_000_000) return `${(num / 1000).toFixed(2)}k`;
    if (num < 1_000_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
    if (num < 1_000_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
    return `${(num / 1_000_000_000_000).toFixed(2)}T`;
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center p-4 selection:bg-cyan-500 selection:text-white relative overflow-hidden">
        <div className="fixed top-4 right-4 z-[200] space-y-2">
            {notifications.map(note => (
                <div key={note.id} className="w-64 bg-slate-700/90 backdrop-blur-sm border-2 border-cyan-400 rounded-lg shadow-lg p-3 flex items-center animate-slide-in-out">
                <span className="text-2xl mr-3">{note.icon}</span>
                <div>
                    <p className="font-bold text-cyan-300">Achievement Unlocked!</p>
                    <p className="text-sm text-slate-200">{note.message}</p>
                </div>
                </div>
            ))}
        </div>

      <header className="w-full max-w-7xl text-center mb-4 z-10">
        <h1 className="text-5xl font-black text-cyan-300" style={{ textShadow: '0 0 10px rgba(103, 232, 249, 0.5)' }}>AI Model Trainer</h1>
        <p className="text-xs text-slate-400 mt-1">Press Ctrl+Shift+D for dev console</p>
        <div className="mt-4 flex justify-center items-center gap-4">
          <button 
            onClick={handleResetGame}
            className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            aria-label="Reset all game progress"
          >
            Reset Game
          </button>
          <button
            onClick={() => setIsMuted(m => !m)}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
           >
             {isMuted ? 'Unmute 🔊' : 'Mute 🔇'}
          </button>
        </div>
      </header>
      <main className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
        <div className="md:col-span-1">
          <InferenceDisplay
            inferences={inferences}
            totalPassiveInferences={totalPassiveInferencesPerSecond}
            computeOnlyPower={computeOnlyPower}
            autoClicksPerSecond={autoClicksPerSecond}
            onInferenceClick={handleInferenceClick}
            formatNumber={formatNumber}
            isMuted={isMuted}
            activeEffects={activeEffects}
            prestigeBoost={prestigeBoost}
          />
        </div>
        <div className="md:col-span-2">
          <Store
            upgrades={upgrades}
            research={research}
            achievements={achievements}
            onBuyUpgrade={handleBuyUpgrade}
            onBuyResearch={handleBuyResearch}
            onReboot={handleReboot}
            currentInferences={inferences}
            playerStats={playerStats}
            formatNumber={formatNumber}
          />
        </div>
      </main>
      {breakthrough && (
        <button
            onClick={handleBreakthroughClick}
            className="absolute w-16 h-16 bg-yellow-300/80 rounded-full z-50 animate-pulse-cyan text-4xl flex items-center justify-center transition-transform hover:scale-110"
            style={{ 
                left: `${breakthrough.x}vw`, 
                top: `${breakthrough.y}vh`,
            }}
            aria-label="Click the breakthrough idea for a bonus"
        >
            💡
        </button>
      )}
      {currentEvent && <EventModal event={currentEvent} onChoice={handleEventChoice} />}
      {isDevConsoleVisible && <DevConsole onCommand={handleDevCommand} />}
    </div>
  );
};

export default App;
