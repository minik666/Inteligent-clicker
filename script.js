
import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';

// --- START OF types.ts ---
// (Interfaces are removed in JS, but we'll keep the structure in mind)
// --- END OF types.ts ---

// --- START OF constants.ts ---
const INITIAL_UPGRADADES = [
  // Compute Upgrades
  { id: 1, name: 'Basic CPU', description: 'Runs one inference every 10 seconds.', cost: 15, computePower: 0.1, category: 'compute', count: 0, icon: '💻', unlocked: true, },
  { id: 2, name: 'More RAM', description: 'Allows for slightly larger models.', cost: 100, computePower: 1, category: 'compute', count: 0, icon: '💾', unlocked: true, },
  { id: 3, name: 'GPU', description: 'Enables parallel processing for faster training.', cost: 1100, computePower: 8, category: 'compute', count: 0, icon: '⚙️', unlocked: true, },
  { id: 4, name: 'Data Center', description: 'Houses racks of servers for serious computation.', cost: 12000, computePower: 47, category: 'compute', count: 0, icon: '🏢', unlocked: true, },
  { id: 5, name: 'TPU Pod', description: 'Specialized hardware for massive neural networks.', cost: 130000, computePower: 260, category: 'compute', count: 0, icon: '🚀', unlocked: true, },
  { id: 6, name: 'Optimized Algorithm', description: 'A software breakthrough that boosts efficiency.', cost: 1400000, computePower: 1400, category: 'compute', count: 0, icon: '📜', unlocked: true, },
  { id: 7, name: 'Neural Network', description: 'A powerful, brain-like model architecture.', cost: 20000000, computePower: 7800, category: 'compute', count: 0, icon: '🧠', unlocked: true, },
  { id: 8, name: 'Quantum Processor', description: 'Leverages quantum mechanics for unimaginable speed.', cost: 330000000, computePower: 44000, category: 'compute', count: 0, icon: '⚛️', unlocked: true, },
  { id: 9, name: 'AI Consciousness', description: 'The model becomes self-aware, optimizing itself at lightspeed.', cost: 5100000000, computePower: 260000, category: 'compute', count: 0, icon: '🌌', unlocked: false, },
  { id: 12, name: 'Swarm Intelligence', description: 'Connects millions of models into a single hive mind.', cost: 80000000000, computePower: 1500000, category: 'compute', count: 0, icon: '🐝', unlocked: false, },
  { id: 13, name: 'Galactic Network', description: 'Utilizes interstellar communication to form a galaxy-wide brain.', cost: 1200000000000, computePower: 9000000, category: 'compute', count: 0, icon: '🌐', unlocked: false, },
  // Automation Upgrades
  { id: 10, name: 'Auto-Clicker Script', description: 'A simple script to automate running inferences.', cost: 500, computePower: 0, clicksPerSec: 1, category: 'automation', count: 0, icon: '🖱️', unlocked: true, },
  { id: 11, name: 'Dedicated Clicking Bot', description: 'A more robust bot that clicks faster and more reliably.', cost: 7500, computePower: 0, clicksPerSec: 10, category: 'automation', count: 0, icon: '🤖', unlocked: true, },
  { id: 14, name: 'Predictive Clicker', description: 'Analyzes user behavior to click at the most optimal times.', cost: 1000000000, computePower: 0, clicksPerSec: 100, category: 'automation', count: 0, icon: '🔮', unlocked: false, },
  { id: 15, name: 'Self-Replicating Bots', description: 'Automation bots that build more automation bots.', cost: 50000000000, computePower: 0, clicksPerSec: 500, category: 'automation', count: 0, icon: '🧬', unlocked: false, },
];
const INITIAL_RESEARCH = [
    { id: 1, name: 'Improved Cooling', description: 'All hardware runs 5% more efficiently.', cost: 5000, effect: { type: 'GLOBAL_BOOST', value: 0.05 }, researched: false, },
    { id: 2, name: 'Advanced Parallelism', description: 'Boosts all compute power by another 10%.', cost: 100000, effect: { type: 'GLOBAL_BOOST', value: 0.1 }, prerequisites: [1], researched: false, },
    { id: 3, name: 'Self-Improving Models', description: 'Unlocks a new tier of upgrades.', cost: 5000000, effect: { type: 'UNLOCK_UPGRADES', value: [9] }, prerequisites: [2], researched: false, },
    { id: 4, name: 'Quantum Entanglement', description: 'Boosts all compute power by a massive 20%.', cost: 1000000000, effect: { type: 'GLOBAL_BOOST', value: 0.2 }, prerequisites: [3], researched: false, },
    { id: 5, name: 'Advanced AGI Architectures', description: 'Unlocks Swarm Intelligence and Predictive Clickers.', cost: 5000000000, effect: { type: 'UNLOCK_UPGRADES', value: [12, 14] }, prerequisites: [4], researched: false, },
    { id: 6, name: 'Hyperspace Communication', description: 'Unlocks the Galactic Network and Self-Replicating Bots.', cost: 800000000000, effect: { type: 'UNLOCK_UPGRADES', value: [13, 15] }, prerequisites: [5], researched: false, },
    { id: 7, name: 'Prestige Optimization', description: 'Increases all future Research Point gains by 10%.', cost: 2500000000000, effect: { type: 'RP_GAIN_BOOST', value: 0.1 }, prerequisites: [6], researched: false, },
];
const INITIAL_EVENTS = [
  { id: 'breakthrough', title: 'Sudden Breakthrough!', description: 'One of your algorithms has unexpectedly converged, offering a temporary but significant boost to your research.', choices: [ { text: 'Focus on it! (2x compute for 60 seconds)', effect: { type: 'TEMP_BOOST', multiplier: 2, duration: 60 }, outcomeDescription: { success: "Compute power is surging!" } }, { text: 'Integrate slowly. (1.2x compute for 5 minutes)', effect: { type: 'TEMP_BOOST', multiplier: 1.2, duration: 300 }, outcomeDescription: { success: "A steady boost has been applied." } }, ], },
  { id: 'power_surge', title: 'Power Surge!', description: 'A massive power surge threatens your hardware. You need to act quickly to mitigate the damage.', choices: [ { text: 'Reroute power. (Guaranteed loss of 5% of inferences)', effect: { type: 'FLAT_CHANGE', amount: -0.05 }, outcomeDescription: { failure: "A necessary sacrifice. 5% of inferences lost." } }, { text: 'Risk it. (50% chance to lose nothing, 50% to lose 15%)', effect: { type: 'CHOICE_RISK', successChance: 0.5, successEffect: { type: 'FLAT_CHANGE', amount: 0 }, failureEffect: { type: 'FLAT_CHANGE', amount: -0.15 }, }, outcomeDescription: { success: "Phew! The system stabilized on its own. No loss.", failure: "Ouch! The backup failed. 15% of inferences lost." } }, ], },
  { id: 'mysterious_code', title: 'Mysterious Code Snippet', description: 'You find an old, undocumented code snippet on a forgotten server. It looks like an optimization routine, but you\'re not sure if it\'s compatible.', choices: [ { text: 'Run it. (75% chance of 1.5x compute for 3 mins, 25% chance of -20% compute for 3 mins)', effect: { type: 'CHOICE_RISK', successChance: 0.75, successEffect: { type: 'TEMP_BOOST', multiplier: 1.5, duration: 180 }, failureEffect: { type: 'TEMP_BOOST', multiplier: 0.8, duration: 180 }, }, outcomeDescription: { success: "It works! The snippet integrated perfectly, boosting compute power.", failure: "Incompatible code! It's causing system drag, reducing compute power." } }, { text: 'Leave it alone.', effect: { type: 'FLAT_CHANGE', amount: 0 }, outcomeDescription: { success: "Better safe than sorry." } }, ], },
  { id: 'corporate_buyout', title: 'Corporate Buyout Offer', description: "A tech giant wants to acquire your model. This could be a huge boost, but comes with strings attached.", choices: [ { text: 'Sell non-exclusive rights (+15% of current inferences)', effect: { type: 'FLAT_CHANGE', amount: 0.15 }, outcomeDescription: { success: "The deal is done. A huge influx of inferences!" } }, { text: 'Refuse loudly (1.5x compute for 5 mins)', effect: { type: 'TEMP_BOOST', multiplier: 1.5, duration: 300 }, outcomeDescription: { success: "The publicity from your refusal has attracted new talent." } }, ], },
  { id: 'data_corruption', title: 'Data Corruption!', description: "A critical dataset has been corrupted! Training on it could be disastrous.", choices: [ { text: 'Spend 2% of inferences to clean it.', effect: { type: 'FLAT_CHANGE', amount: -0.02 }, outcomeDescription: { failure: "The data is clean, but it was costly." } }, { text: 'Train anyway (50% chance of -50% compute for 10 mins)', effect: { type: 'CHOICE_RISK', successChance: 0.5, successEffect: { type: 'FLAT_CHANGE', amount: 0 }, failureEffect: { type: 'TEMP_BOOST', multiplier: 0.5, duration: 600 }, }, outcomeDescription: { success: "The model managed to learn around the corrupted data.", failure: "Garbage in, garbage out. Compute power has plummeted." } }, ], },
];
const INITIAL_PLAYER_STATS = { totalInferences: 0, totalClicks: 0, breakthroughsClicked: 0, researchPoints: 0, reboots: 0, };
const INITIAL_ACHIEVEMENTS = [
  { id: 1, name: 'First Step', description: 'Generate your first 1,000 inferences.', icon: '🌱', condition: { type: 'TOTAL_INFERENCES', value: 1000 }, unlocked: false },
  { id: 2, name: 'Data Flood', description: 'Generate 1 million inferences.', icon: '🌊', condition: { type: 'TOTAL_INFERENCES', value: 1000000 }, unlocked: false },
  { id: 3, name: 'Singularity', description: 'Generate 1 billion inferences.', icon: '💥', condition: { type: 'TOTAL_INFERENCES', value: 1000000000 }, unlocked: false },
  { id: 14, name: 'Exascale', description: 'Generate 1 trillion inferences.', icon: '💫', condition: { type: 'TOTAL_INFERENCES', value: 1000000000000 }, unlocked: false },
  { id: 4, name: 'Manual Labor', description: 'Click the brain 100 times.', icon: '👆', condition: { type: 'TOTAL_CLICKS', value: 100 }, unlocked: false },
  { id: 5, name: 'Carpal Tunnel', description: 'Click the brain 10,000 times.', icon: '🖐️', condition: { type: 'TOTAL_CLICKS', value: 10000 }, unlocked: false },
  { id: 6, name: 'First Gear', description: 'Buy your first GPU.', icon: '⚙️', condition: { type: 'UPGRADE_COUNT', upgradeId: 3, value: 1 }, unlocked: false },
  { id: 7, name: 'Server Farm', description: 'Own 10 Data Centers.', icon: '🏢', condition: { type: 'UPGRADE_COUNT', upgradeId: 4, value: 10 }, unlocked: false },
  { id: 8, name: 'Automated Future', description: 'Own 25 Dedicated Clicking Bots.', icon: '🤖', condition: { type: 'UPGRADE_COUNT', upgradeId: 11, value: 25 }, unlocked: false },
  { id: 15, name: 'Hive Mind', description: 'Own your first Swarm Intelligence.', icon: '🐝', condition: { type: 'UPGRADE_COUNT', upgradeId: 12, value: 1 }, unlocked: false },
  { id: 16, name: 'Intergalactic', description: 'Own your first Galactic Network.', icon: '🌐', condition: { type: 'UPGRADE_COUNT', upgradeId: 13, value: 1 }, unlocked: false },
  { id: 9, name: 'Researcher', description: 'Complete your first research project.', icon: '🔬', condition: { type: 'RESEARCH_COUNT', value: 1 }, unlocked: false },
  { id: 10, name: 'Master of Science', description: 'Complete all research.', icon: '🎓', condition: { type: 'RESEARCH_COUNT', value: INITIAL_RESEARCH.length }, unlocked: false },
  { id: 11, name: 'Eureka!', description: 'Click 5 Breakthroughs.', icon: '💡', condition: { type: 'BREAKTHROUGHS_CLICKED', value: 5 }, unlocked: false },
  { id: 12, name: 'Start Over', description: 'Reboot the simulation for the first time.', icon: '🔄', condition: { type: 'REBOOT_COUNT', value: 1 }, unlocked: false },
  { id: 13, name: 'Power Cycle', description: 'Reboot 5 times.', icon: '♻️', condition: { type: 'REBOOT_COUNT', value: 5 }, unlocked: false },
  { id: 17, name: 'Tenacious', description: 'Reboot 10 times.', icon: '🔟', condition: { type: 'REBOOT_COUNT', value: 10 }, unlocked: false },
  { id: 18, name: 'Prestige Worldwide', description: 'Accumulate 25 Research Points.', icon: '🏆', condition: { type: 'RESEARCH_POINTS', value: 25 }, unlocked: false },
];
// --- END OF constants.ts ---

// --- START OF utils/audio.ts ---
const audioCache = {};
const playSound = (src, isMuted, volume = 1.0) => {
  if (isMuted) return;
  try {
    if (!audioCache[src]) {
      audioCache[src] = new Audio(src);
    }
    const audio = audioCache[src];
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch(error => {
        console.warn(`Could not play sound ${src}, possibly due to browser autoplay policy.`, error);
    });
  } catch (error) {
      console.error(`Error playing sound: ${src}`, error);
  }
};
// --- END OF utils/audio.ts ---

// --- START OF sounds.ts ---
const SOUNDS = {
  click: 'https://cdn.pixabay.com/audio/2022/03/10/audio_51261a8661.mp3',
  buy: 'https://cdn.pixabay.com/audio/2022/11/14/audio_34b223b2ff.mp3',
  breakthroughSpawn: 'https://cdn.pixabay.com/audio/2021/08/04/audio_534893a743.mp3',
  breakthroughClick: 'https://cdn.pixabay.com/audio/2022/01/23/audio_73064e7c7e.mp3',
  researchComplete: 'https://cdn.pixabay.com/audio/2022/01/18/audio_8db1627883.mp3',
  eventSpawn: 'https://cdn.pixabay.com/audio/2022/05/23/audio_809b423235.mp3',
  eventSuccess: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c3b092e352.mp3',
  eventFail: 'https://cdn.pixabay.com/audio/2021/08/04/audio_bb63042c16.mp3',
  achievementUnlock: 'https://cdn.pixabay.com/audio/2022/03/15/audio_28b16a5127.mp3'
};
// --- END OF sounds.ts ---


// --- START OF components/ActiveEffectsDisplay.tsx ---
const ActiveEffectsDisplay = ({ effects }) => {
  const [, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    if (effects.length === 0) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [effects.length]);
  if (effects.length === 0) return null;
  const getEffectColor = (description) => {
    if (description.includes('lost') || description.includes('reducing')) {
        return 'text-red-400';
    }
    return 'text-green-400';
  }
  return (
    React.createElement('div', { className: "mt-4 w-full text-left p-3 bg-slate-900/50 rounded-lg" },
      React.createElement('h3', { className: "font-bold text-sm text-slate-300 mb-2" }, "Active Effects:"),
      React.createElement('ul', { className: "space-y-1" },
        effects.map(effect => {
          const remaining = Math.max(0, Math.ceil((effect.expiryTimestamp - Date.now()) / 1000));
          const minutes = Math.floor(remaining / 60);
          const seconds = remaining % 60;
          return (
            React.createElement('li', { key: effect.id, className: `text-xs ${getEffectColor(effect.description)} flex justify-between` },
              React.createElement('span', null, effect.description),
              React.createElement('span', null, `${minutes}:${seconds.toString().padStart(2, '0')}`)
            )
          );
        })
      )
    )
  );
};
// --- END OF components/ActiveEffectsDisplay.tsx ---

// --- START OF components/InferenceDisplay.tsx ---
const InferenceDisplay = ({ inferences, totalPassiveInferences, computeOnlyPower, autoClicksPerSecond, onInferenceClick, formatNumber, isMuted, activeEffects, prestigeBoost }) => {
  const [floatingNumbers, setFloatingNumbers] = React.useState([]);
  const handleInferenceClick = React.useCallback((e) => {
    onInferenceClick();
    playSound(SOUNDS.click, isMuted, 0.6);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + (Math.random() * 40 - 20);
    const y = e.clientY - rect.top - 20;
    const newNumber = {
      id: Date.now() + Math.random(),
      value: `+${formatNumber(1 * prestigeBoost)}`,
      x, y,
    };
    setFloatingNumbers(prev => [...prev, newNumber]);
    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(n => n.id !== newNumber.id));
    }, 1500);
  }, [onInferenceClick, isMuted, prestigeBoost, formatNumber]);

  return (
    React.createElement('div', { className: "bg-slate-800/50 p-6 rounded-2xl shadow-2xl h-full flex flex-col justify-start items-center sticky top-4" },
      React.createElement('div', { className: "text-center mb-6 w-full" },
        React.createElement('h2', { className: "text-6xl font-black text-cyan-200", style: { textShadow: '0 0 15px rgba(103, 232, 249, 0.5)' } }, formatNumber(Math.floor(inferences))),
        React.createElement('p', { className: "text-cyan-400/80 font-medium" }, "inferences"),
        React.createElement('div', { className: "text-sm text-gray-400 mt-1" },
          React.createElement('p', null, `inferences/sec: ${formatNumber(totalPassiveInferences)}`),
          (computeOnlyPower > 0 || autoClicksPerSecond > 0) && React.createElement('p', { className: "text-xs text-gray-500" }, `(${formatNumber(computeOnlyPower)} compute + ${formatNumber(autoClicksPerSecond)} clicks)`)
        ),
        prestigeBoost > 1 && React.createElement('div', { className: "mt-2 text-center p-2 rounded-lg bg-purple-900/40 border border-purple-600" },
          React.createElement('p', { className: "font-bold text-sm text-purple-300" }, `Prestige Boost: +${((prestigeBoost - 1) * 100).toFixed(0)}%`)
        ),
        React.createElement(ActiveEffectsDisplay, { effects: activeEffects })
      ),
      React.createElement('div', { className: "relative w-64 h-64 md:w-80 md:h-80 mt-auto" },
        React.createElement('button', { onClick: handleInferenceClick, className: "w-full h-full rounded-full transition-transform duration-100 ease-in-out transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-cyan-400 focus:ring-opacity-50 clickable-shadow flex items-center justify-center text-8xl", style: { backgroundImage: 'radial-gradient(circle, #1e3a8a, #172554)' } },
          React.createElement('span', { className: "sr-only" }, "Click to run inference"),
          React.createElement('span', { style: { filter: 'drop-shadow(0 0 10px rgba(103, 232, 249, 0.7))' } }, '🧠')
        ),
        floatingNumbers.map(num => (
          React.createElement('span', { key: num.id, className: "absolute text-2xl font-bold text-white pointer-events-none animate-float-up", style: { left: `${num.x}px`, top: `${num.y}px`, textShadow: '0 2px 4px rgba(0,0,0,0.5)' } }, num.value)
        ))
      )
    )
  );
};
// --- END OF components/InferenceDisplay.tsx ---

// --- START OF components/UpgradeItem.tsx ---
const UpgradeItem = ({ upgrade, onBuy, currentInferences, formatNumber }) => {
  if (!upgrade.unlocked) {
    return (
       React.createElement('div', { className: `w-full flex items-center p-3 rounded-lg border-2 bg-slate-800/50 border-slate-700 opacity-50` },
          React.createElement('div', { className: "text-4xl mr-4" }, '❓'),
          React.createElement('div', { className: "flex-grow text-left" },
            React.createElement('h3', { className: "text-lg font-bold text-slate-500" }, "Undiscovered Upgrade"),
            React.createElement('p', { className: "text-sm text-gray-500" }, "Complete more research to unlock this.")
          )
        )
    );
  }
  const isAffordable = currentInferences >= upgrade.cost;
  const benefitText = upgrade.category === 'compute' ? `+ ${formatNumber(upgrade.computePower)} compute` : `+ ${formatNumber(upgrade.clicksPerSec || 0)} clicks/sec`;
  return (
    React.createElement('button', { onClick: () => onBuy(upgrade.id), disabled: !isAffordable, className: `w-full flex items-center p-3 rounded-lg transition-all duration-200 border-2 relative overflow-hidden ${isAffordable ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-600/50 hover:border-cyan-400/50 cursor-pointer' : 'bg-slate-800/50 border-slate-700 opacity-50 cursor-not-allowed'}` },
      React.createElement('div', { className: "text-4xl mr-4 z-10" }, upgrade.icon),
      React.createElement('div', { className: "flex-grow text-left z-10" },
        React.createElement('h3', { className: "text-lg font-bold text-white" }, upgrade.name),
        React.createElement('p', { className: "text-sm text-gray-400" }, upgrade.description),
        React.createElement('div', { className: "flex items-center space-x-4 mt-1" },
           React.createElement('p', { className: "text-sm font-semibold text-cyan-400" }, `Cost: ${formatNumber(upgrade.cost)}`),
           React.createElement('p', { className: "text-xs text-gray-300" }, benefitText)
        )
      ),
      React.createElement('div', { className: "text-right z-10" },
        React.createElement('p', { className: "text-4xl font-black text-slate-600 leading-none" }, upgrade.count),
        React.createElement('p', { className: "text-xs text-slate-500 font-bold" }, "OWNED")
      )
    )
  );
};
// --- END OF components/UpgradeItem.tsx ---

// --- START OF components/ResearchItem.tsx ---
const ResearchItem = ({ research, researchList, onBuy, currentInferences, formatNumber }) => {
  const isAffordable = currentInferences >= research.cost;
  const prereqsMet = research.prerequisites?.every(prereqId => researchList.find(r => r.id === prereqId)?.researched) ?? true;
  const isLocked = !prereqsMet;
  const isResearched = research.researched;
  const canBuy = isAffordable && !isLocked && !isResearched;
  let buttonText = 'Research';
  if (isResearched) buttonText = 'Researched';
  else if (isLocked) buttonText = 'Locked';
  return (
    React.createElement('div', { className: `w-full flex items-center p-3 rounded-lg border-2 transition-all duration-200 ${isResearched ? 'bg-green-900/40 border-green-700' : isLocked ? 'bg-slate-800/50 border-slate-700 opacity-60' : 'bg-slate-700/50 border-slate-600'}` },
      React.createElement('div', { className: "text-4xl mr-4" }, isResearched ? '✅' : isLocked ? '🔒' : '🔬'),
      React.createElement('div', { className: "flex-grow text-left" },
        React.createElement('h3', { className: `text-lg font-bold ${isResearched ? 'text-green-300' : 'text-white'}` }, research.name),
        React.createElement('p', { className: "text-sm text-gray-400" }, research.description),
        !isResearched && React.createElement('p', { className: "text-sm font-semibold text-cyan-400 mt-1" }, `Cost: ${formatNumber(research.cost)}`)
      ),
      React.createElement('button', { onClick: () => onBuy(research.id), disabled: !canBuy, className: `px-4 py-2 text-sm font-bold rounded-lg transition-colors ${canBuy ? 'bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer' : isResearched ? 'bg-green-700 text-white cursor-default' : 'bg-slate-600 text-slate-400 cursor-not-allowed'}`, 'aria-label': `Research ${research.name}` }, buttonText)
    )
  );
};
// --- END OF components/ResearchItem.tsx ---

// --- START OF components/ResearchLab.tsx ---
const ResearchLab = ({ researchList, onBuyResearch, currentInferences, formatNumber }) => {
  return (
    React.createElement('div', { className: "space-y-2 max-h-[75vh] overflow-y-auto pr-2" },
      researchList.map(research => (
        React.createElement(ResearchItem, {
          key: research.id,
          research: research,
          onBuy: onBuyResearch,
          currentInferences: currentInferences,
          formatNumber: formatNumber,
          researchList: researchList,
        })
      ))
    )
  );
};
// --- END OF components/ResearchLab.tsx ---

// --- START OF components/AchievementItem.tsx ---
const AchievementItem = ({ achievement }) => {
  const { unlocked, icon, name, description } = achievement;
  return (
    React.createElement('div', { className: `flex items-center p-3 rounded-lg border-2 transition-all duration-300 ${unlocked ? 'bg-slate-700/70 border-cyan-500/50 shadow-lg' : 'bg-slate-800/50 border-slate-700 opacity-60'}`, title: unlocked ? 'Unlocked!' : 'Locked' },
      React.createElement('div', { className: `text-4xl mr-4 transition-transform duration-300 ${unlocked ? 'grayscale-0 scale-100' : 'grayscale'}` }, icon),
      React.createElement('div', { className: "flex-grow text-left" },
        React.createElement('h3', { className: `text-lg font-bold ${unlocked ? 'text-cyan-300' : 'text-slate-400'}` }, name),
        React.createElement('p', { className: "text-sm text-slate-400" }, description)
      )
    )
  );
};
// --- END OF components/AchievementItem.tsx ---

// --- START OF components/AchievementsDisplay.tsx ---
const AchievementsDisplay = ({ achievements }) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  return (
    React.createElement('div', { className: "max-h-[75vh] overflow-y-auto pr-2" },
      React.createElement('div', { className: "text-center mb-4 p-2 rounded-lg bg-slate-900/50" },
        React.createElement('h2', { className: "text-xl font-bold text-cyan-300" }, `Achievements Unlocked: ${unlockedCount} / ${totalCount}`)
      ),
      React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-2" },
        achievements.map(achievement => (
          React.createElement(AchievementItem, { key: achievement.id, achievement: achievement })
        ))
      )
    )
  );
};
// --- END OF components/AchievementsDisplay.tsx ---

// --- START OF components/RebootDisplay.tsx ---
const RebootDisplay = ({ currentInferences, playerStats, onReboot, formatNumber }) => {
    const REBOOT_INFERENCE_REQUIREMENT = 1_000_000_000;
    const rpToGain = Math.floor(Math.sqrt(currentInferences / REBOOT_INFERENCE_REQUIREMENT));
    const canReboot = rpToGain > 0;
    const prestigeBoost = playerStats.researchPoints * 10;
    return (
        React.createElement('div', { className: "max-h-[75vh] overflow-y-auto pr-2 text-center flex flex-col items-center justify-center h-full" },
            React.createElement('div', { className: "bg-slate-900/50 p-6 rounded-2xl shadow-xl border-2 border-purple-600 max-w-2xl" },
                React.createElement('h2', { className: "text-3xl font-black text-purple-300 mb-4" }, "Reboot Simulation"),
                React.createElement('p', { className: "text-slate-300 mb-4" }, "Reset your progress (inferences, upgrades, research) to earn Research Points (RP). Each Research Point provides a permanent ", React.createElement('strong', {className: "text-white"}, "+10%"), " boost to all inference generation."),
                React.createElement('div', { className: "space-y-4 my-6" },
                    React.createElement('div', { className: "p-4 rounded-lg bg-slate-800" },
                        React.createElement('p', { className: "text-sm text-slate-400" }, "Current Research Points"),
                        React.createElement('p', { className: "text-3xl font-bold text-purple-300" }, playerStats.researchPoints)
                    ),
                    React.createElement('div', { className: "p-4 rounded-lg bg-slate-800" },
                        React.createElement('p', { className: "text-sm text-slate-400" }, "Current Global Boost"),
                        React.createElement('p', { className: "text-3xl font-bold text-purple-300" }, `+${prestigeBoost}%`)
                    ),
                    React.createElement('div', { className: "p-4 rounded-lg bg-slate-800" },
                        React.createElement('p', { className: "text-sm text-slate-400" }, "RP on next reboot"),
                        React.createElement('p', { className: `text-3xl font-bold ${canReboot ? 'text-green-400' : 'text-slate-500'}` }, rpToGain)
                    )
                ),
                React.createElement('button', { onClick: onReboot, disabled: !canReboot, className: `w-full py-4 text-xl font-bold rounded-lg transition-all duration-200 shadow-lg ${canReboot ? 'bg-purple-700 hover:bg-purple-600 text-white cursor-pointer transform hover:scale-105' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}` },
                    canReboot ? 'Reboot Now' : `Need ${formatNumber(REBOOT_INFERENCE_REQUIREMENT)} inferences`
                ),
                React.createElement('p', { className: "text-xs text-slate-500 mt-3" }, "Achievements and total stats will not be reset.")
            )
        )
    );
};
// --- END OF components/RebootDisplay.tsx ---


// --- START OF components/Store.tsx ---
const Store = ({ upgrades, research, achievements, playerStats, onBuyUpgrade, onBuyResearch, onReboot, currentInferences, formatNumber }) => {
  const [activeTab, setActiveTab] = React.useState('compute');
  const getTabClass = (tabName) => `w-1/5 py-3 text-center font-bold text-lg cursor-pointer transition-colors duration-200 rounded-t-lg ${activeTab === tabName ? 'bg-slate-700/80 text-cyan-300' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'}`;
  const computeUpgrades = upgrades.filter(u => u.category === 'compute');
  const automationUpgrades = upgrades.filter(u => u.category === 'automation');
  return (
    React.createElement('div', { className: "bg-slate-800/50 rounded-2xl shadow-2xl h-full flex flex-col" },
      React.createElement('div', { className: "flex border-b-2 border-slate-700" },
        React.createElement('button', { onClick: () => setActiveTab('compute'), className: getTabClass('compute') }, "Compute"),
        React.createElement('button', { onClick: () => setActiveTab('automation'), className: getTabClass('automation') }, "Automation"),
        React.createElement('button', { onClick: () => setActiveTab('research'), className: getTabClass('research') }, "Research"),
        React.createElement('button', { onClick: () => setActiveTab('achievements'), className: getTabClass('achievements') }, "Achievements"),
        React.createElement('button', { onClick: () => setActiveTab('reboot'), className: getTabClass('reboot') }, "Reboot")
      ),
      React.createElement('div', { className: "p-4 flex-grow overflow-hidden" },
        activeTab === 'compute' && React.createElement('div', { className: "space-y-2 max-h-[75vh] overflow-y-auto pr-2" },
          computeUpgrades.map(upgrade => React.createElement(UpgradeItem, { key: upgrade.id, upgrade, onBuy: onBuyUpgrade, currentInferences, formatNumber }))
        ),
        activeTab === 'automation' && React.createElement('div', { className: "space-y-2 max-h-[75vh] overflow-y-auto pr-2" },
          automationUpgrades.map(upgrade => React.createElement(UpgradeItem, { key: upgrade.id, upgrade, onBuy: onBuyUpgrade, currentInferences, formatNumber }))
        ),
        activeTab === 'research' && React.createElement(ResearchLab, { researchList: research, onBuyResearch, currentInferences, formatNumber }),
        activeTab === 'achievements' && React.createElement(AchievementsDisplay, { achievements }),
        activeTab === 'reboot' && React.createElement(RebootDisplay, { currentInferences, playerStats, onReboot, formatNumber })
      )
    )
  );
};
// --- END OF components/Store.tsx ---

// --- START OF components/DevConsole.tsx ---
const DevConsole = ({ onCommand }) => {
  const [input, setInput] = React.useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput('');
    }
  };
  return (
    React.createElement('div', { className: "fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl bg-slate-800/90 backdrop-blur-sm border-2 border-cyan-500 rounded-lg shadow-2xl z-50 p-4" },
      React.createElement('h3', { className: "text-lg font-bold text-cyan-300 mb-2" }, "Developer Console"),
      React.createElement('p', { className: "text-xs text-slate-400 mb-2" }, "Commands: `addInferences [amount]`, `setinferences [amount]`, `setupgrade [id] [count]`, `completeresearch [id]`, `unlockAll`, `triggerEvent [id]`, `unlockachievements`, `addresearchpoints [amount]`"),
      React.createElement('form', { onSubmit: handleSubmit, className: "flex gap-2" },
        React.createElement('input', { type: "text", value: input, onChange: (e) => setInput(e.target.value), className: "flex-grow bg-slate-900 text-white px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500", placeholder: "Enter command...", autoFocus: true }),
        React.createElement('button', { type: "submit", className: "px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-md transition-colors" }, "Execute")
      )
    )
  );
};
// --- END OF components/DevConsole.tsx ---

// --- START OF components/EventModal.tsx ---
const EventModal = ({ event, onChoice }) => {
  return (
    React.createElement('div', { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4" },
      React.createElement('div', { className: "bg-slate-800 border-2 border-cyan-400 rounded-2xl shadow-2xl max-w-lg w-full p-6 text-center animate-fade-in" },
        React.createElement('h2', { className: "text-3xl font-black text-cyan-300 mb-2" }, event.title),
        React.createElement('p', { className: "text-slate-300 mb-6" }, event.description),
        React.createElement('div', { className: "flex flex-col gap-3" },
          event.choices.map((choice, index) => (
            React.createElement('button', { key: index, onClick: () => onChoice(choice), className: "w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50" }, choice.text)
          ))
        )
      ),
      React.createElement('style', null, `@keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }`)
    )
  );
};
// --- END OF components/EventModal.tsx ---

// --- START OF App.tsx ---
const App = () => {
  const [inferences, setInferences] = React.useState(() => { try { const s = localStorage.getItem('aiTrainer_inferences'); return s ? JSON.parse(s) : 0; } catch (e) { return 0; } });
  const [upgrades, setUpgrades] = React.useState(() => { try { const s = localStorage.getItem('aiTrainer_upgrades'); if(s) { const p = JSON.parse(s); return p.map(u=>({...u, category: u.category || 'compute'})); } return INITIAL_UPGRADADES; } catch (e) { return INITIAL_UPGRADADES; } });
  const [research, setResearch] = React.useState(() => { try { const s = localStorage.getItem('aiTrainer_research'); return s ? JSON.parse(s) : INITIAL_RESEARCH; } catch (e) { return INITIAL_RESEARCH; } });
  const [achievements, setAchievements] = React.useState(() => { try { const s = localStorage.getItem('aiTrainer_achievements'); return s ? JSON.parse(s) : INITIAL_ACHIEVEMENTS; } catch (e) { return INITIAL_ACHIEVEMENTS; } });
  const [playerStats, setPlayerStats] = React.useState(() => { try { const s = localStorage.getItem('aiTrainer_playerStats'); const d = INITIAL_PLAYER_STATS; if(s) { const p = JSON.parse(s); return {...d, ...p}; } return d; } catch (e) { return INITIAL_PLAYER_STATS; } });
  const [activeEffects, setActiveEffects] = React.useState(() => { try { const s = localStorage.getItem('aiTrainer_activeEffects'); if(s) { return JSON.parse(s).filter(e => e.expiryTimestamp > Date.now()); } return []; } catch (e) { return []; } });
  const [notifications, setNotifications] = React.useState([]);
  const [isMuted, setIsMuted] = React.useState(true);
  const [breakthrough, setBreakthrough] = React.useState(null);
  const [isDevConsoleVisible, setIsDevConsoleVisible] = React.useState(false);
  const [currentEvent, setCurrentEvent] = React.useState(null);
  
  const prestigeBoost = React.useMemo(() => 1 + playerStats.researchPoints * 0.1, [playerStats.researchPoints]);
  const globalBoost = React.useMemo(() => research.filter(r => r.researched && r.effect.type === 'GLOBAL_BOOST').reduce((t, r) => t + (r.effect.type === 'GLOBAL_BOOST' ? r.effect.value : 0), 1), [research]);
  const eventBoost = React.useMemo(() => activeEffects.reduce((t, e) => t * e.multiplier, 1), [activeEffects]);
  const rpGainMultiplier = React.useMemo(() => research.filter(r => r.researched && r.effect.type === 'RP_GAIN_BOOST').reduce((t, r) => t + (r.effect.type === 'RP_GAIN_BOOST' ? r.effect.value : 0), 1), [research]);

  const computeOnlyPower = React.useMemo(() => {
    const base = upgrades.filter(u => u.category === 'compute').reduce((t, u) => t + u.count * u.computePower, 0);
    return base * globalBoost * eventBoost * prestigeBoost;
  }, [upgrades, globalBoost, eventBoost, prestigeBoost]);
  
  const autoClicksPerSecond = React.useMemo(() => {
    const base = upgrades.filter(u => u.category === 'automation').reduce((t, u) => t + u.count * (u.clicksPerSec || 0), 0);
    return base * prestigeBoost;
  }, [upgrades, prestigeBoost]);

  const totalPassiveInferencesPerSecond = React.useMemo(() => computeOnlyPower + autoClicksPerSecond, [computeOnlyPower, autoClicksPerSecond]);

  React.useEffect(() => { try {
    localStorage.setItem('aiTrainer_inferences', JSON.stringify(inferences));
    localStorage.setItem('aiTrainer_upgrades', JSON.stringify(upgrades));
    localStorage.setItem('aiTrainer_research', JSON.stringify(research));
    localStorage.setItem('aiTrainer_activeEffects', JSON.stringify(activeEffects));
    localStorage.setItem('aiTrainer_achievements', JSON.stringify(achievements));
    localStorage.setItem('aiTrainer_playerStats', JSON.stringify(playerStats));
  } catch (e) { console.error("Save error", e) } }, [inferences, upgrades, research, activeEffects, achievements, playerStats]);

  React.useEffect(() => {
    const loop = setInterval(() => {
      const gain = totalPassiveInferencesPerSecond / 10;
      setInferences(p => p + gain);
      setPlayerStats(p => ({...p, totalInferences: p.totalInferences + gain}));
      setActiveEffects(p => p.filter(e => e.expiryTimestamp > Date.now()));
    }, 100);
    return () => clearInterval(loop);
  }, [totalPassiveInferencesPerSecond]);

  React.useEffect(() => {
    const checkAchievements = () => {
        achievements.forEach(ach => {
            if (ach.unlocked) return;
            let met = false;
            const { condition } = ach;
            switch (condition.type) {
                case 'TOTAL_INFERENCES': if (playerStats.totalInferences >= condition.value) met = true; break;
                case 'TOTAL_CLICKS': if (playerStats.totalClicks >= condition.value) met = true; break;
                case 'UPGRADE_COUNT': const u = upgrades.find(up => up.id === condition.upgradeId); if (u && u.count >= condition.value) met = true; break;
                case 'RESEARCH_COUNT': const rc = research.filter(r => r.researched).length; if (rc >= condition.value) met = true; break;
                case 'BREAKTHROUGHS_CLICKED': if (playerStats.breakthroughsClicked >= condition.value) met = true; break;
                case 'REBOOT_COUNT': if (playerStats.reboots >= condition.value) met = true; break;
                case 'RESEARCH_POINTS': if (playerStats.researchPoints >= condition.value) met = true; break;
            }
            if (met) {
                setAchievements(p => p.map(a => a.id === ach.id ? { ...a, unlocked: true } : a));
                playSound(SOUNDS.achievementUnlock, isMuted, 0.7);
                const note = { id: Date.now(), icon: ach.icon, message: ach.name };
                setNotifications(n => [...n, note]);
                setTimeout(() => setNotifications(n => n.filter(no => no.id !== note.id)), 5000);
            }
        });
    };
    const interval = setInterval(checkAchievements, 2000);
    return () => clearInterval(interval);
  }, [achievements, playerStats, upgrades, research, isMuted]);

  React.useEffect(() => {
    const handleKey = (e) => { if (e.ctrlKey && e.shiftKey && e.key === 'D') { e.preventDefault(); setIsDevConsoleVisible(v => !v); } };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (document.hidden || breakthrough) return;
      if (Math.random() < 0.05) {
        playSound(SOUNDS.breakthroughSpawn, isMuted);
        const b = { id: Date.now(), x: 10 + Math.random() * 80, y: 10 + Math.random() * 80 };
        setBreakthrough(b);
        setTimeout(() => setBreakthrough(c => (c?.id === b.id ? null : c)), 13000);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [breakthrough, isMuted]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (document.hidden || currentEvent || breakthrough) return;
      if (Math.random() < 0.1) {
          const event = INITIAL_EVENTS[Math.floor(Math.random() * INITIAL_EVENTS.length)];
          setCurrentEvent(event);
          playSound(SOUNDS.eventSpawn, isMuted);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [currentEvent, breakthrough, isMuted]);

  const handleInferenceClick = React.useCallback(() => {
    const val = 1 * prestigeBoost;
    setInferences(p => p + val);
    setPlayerStats(p => ({...p, totalInferences: p.totalInferences + val, totalClicks: p.totalClicks + 1}));
  }, [prestigeBoost]);

  const handleBuyUpgrade = React.useCallback((id) => {
    setUpgrades(p => {
      const u = p.find(up => up.id === id);
      if (u && inferences >= u.cost) {
        setInferences(inf => inf - u.cost);
        playSound(SOUNDS.buy, isMuted);
        return p.map(up => up.id === id ? { ...up, count: up.count + 1, cost: Math.ceil(up.cost * 1.15) } : up);
      }
      return p;
    });
  }, [inferences, isMuted]);

  const handleBuyResearch = React.useCallback((id) => {
    const r = research.find(res => res.id === id);
    if (!r || inferences < r.cost || r.researched) return;
    const prereqs = r.prerequisites?.every(pId => research.find(res => res.id === pId)?.researched) ?? true;
    if (prereqs) {
        setInferences(p => p - r.cost);
        playSound(SOUNDS.researchComplete, isMuted, 0.7);
        setResearch(p => p.map(res => res.id === id ? { ...res, researched: true } : res));
        if (r.effect.type === 'UNLOCK_UPGRADES') {
            setUpgrades(p => p.map(u => r.effect.value.includes(u.id) ? { ...u, unlocked: true } : u));
        }
    }
  }, [inferences, research, isMuted]);

  const handleReboot = React.useCallback(() => {
    const REBOOT_INFERENCE_REQUIREMENT = 1_000_000_000;
    const rpToGain = Math.floor(Math.sqrt(inferences / REBOOT_INFERENCE_REQUIREMENT) * rpGainMultiplier);
    if (rpToGain <= 0) return;
    if (window.confirm(`Are you sure you want to reboot? You will gain ${rpToGain} Research Point(s), but your inferences, upgrades, and research will be reset.`)) {
        setPlayerStats(p => ({...p, researchPoints: p.researchPoints + rpToGain, reboots: p.reboots + 1}));
        setInferences(0);
        setUpgrades(INITIAL_UPGRADADES);
        setResearch(INITIAL_RESEARCH);
        setActiveEffects([]);
        setCurrentEvent(null);
        setBreakthrough(null);
    }
  }, [inferences, rpGainMultiplier]);

  const handleResetGame = React.useCallback(() => {
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

  const handleBreakthroughClick = React.useCallback(() => {
    if (!breakthrough) return;
    playSound(SOUNDS.breakthroughClick, isMuted, 0.8);
    const bonus = (totalPassiveInferencesPerSecond > 0 ? totalPassiveInferencesPerSecond : 1) * 900 + 13;
    const reward = bonus * prestigeBoost;
    setInferences(c => c + reward);
    setPlayerStats(p => ({...p, totalInferences: p.totalInferences + reward, breakthroughsClicked: p.breakthroughsClicked + 1}));
    setBreakthrough(null);
  }, [breakthrough, totalPassiveInferencesPerSecond, isMuted, prestigeBoost]);

  const applyEffect = React.useCallback((effect, choice) => {
    switch (effect.type) {
        case 'TEMP_BOOST': {
            const desc = `${(effect.multiplier * 100 - 100).toFixed(0)}% compute for ${effect.duration}s`;
            setActiveEffects(p => [...p, { id: `eff_${Date.now()}`, description: choice.outcomeDescription?.success || desc, expiryTimestamp: Date.now() + effect.duration * 1000, multiplier: effect.multiplier }]);
            playSound(effect.multiplier > 1 ? SOUNDS.eventSuccess : SOUNDS.eventFail, isMuted);
            break;
        }
        case 'FLAT_CHANGE': {
            const amount = (effect.amount > -1 && effect.amount < 1 && effect.amount !== 0) ? inferences * effect.amount : effect.amount;
            setInferences(i => Math.max(0, i + amount));
            playSound(amount >= 0 ? SOUNDS.eventSuccess : SOUNDS.eventFail, isMuted);
            break;
        }
        case 'CHOICE_RISK': {
            const success = Math.random() < effect.successChance;
            applyEffect(success ? effect.successEffect : effect.failureEffect, choice);
            break;
        }
    }
  }, [inferences, isMuted]);

  const handleEventChoice = React.useCallback((choice) => { applyEffect(choice.effect, choice); setCurrentEvent(null); }, [applyEffect]);
  const handleDevCommand = React.useCallback((command) => {
    const [action, ...args] = command.split(' ');
    switch (action.toLowerCase()) {
      case 'addinferences': { const a = parseInt(args[0], 10); if (!isNaN(a)) { setInferences(i => i + a); setPlayerStats(p => ({...p, totalInferences: p.totalInferences + a})); } break; }
      case 'setinferences': { const a = parseInt(args[0], 10); if (!isNaN(a)) { setInferences(a >= 0 ? a : 0); } break; }
      case 'setupgrade': { const id = parseInt(args[0], 10); const c = parseInt(args[1], 10); if (!isNaN(id) && !isNaN(c) && c >= 0) { setUpgrades(p => p.map(u => u.id === id ? {...u, count: c} : u)); } break; }
      case 'completeresearch': { const id = parseInt(args[0], 10); if (isNaN(id)) break; const r = research.find(res => res.id === id); if (r && !r.researched) { setResearch(p => p.map(res => res.id === id ? {...res, researched: true} : res)); if (r.effect.type === 'UNLOCK_UPGRADES') { setUpgrades(p => p.map(u => r.effect.value.includes(u.id) ? {...u, unlocked: true} : u)); } } break; }
      case 'unlockall': { setUpgrades(u => u.map(up => ({...up, unlocked: true}))); setResearch(r => r.map(res => ({...res, researched: true}))); break; }
      case 'unlockachievements': { setAchievements(a => a.map(ach => ({...ach, unlocked: true}))); break; }
      case 'addresearchpoints': { const a = parseInt(args[0], 10); if (!isNaN(a)) { setPlayerStats(p => ({...p, researchPoints: p.researchPoints + a })); } break; }
      case 'triggerevent': { const id = args[0]; let event = INITIAL_EVENTS.find(e => e.id === id); if (!event) { event = INITIAL_EVENTS[Math.floor(Math.random() * INITIAL_EVENTS.length)]; } setCurrentEvent(event); break; }
      default: console.warn(`Unknown command: ${action}`);
    }
  }, [research]);

  const formatNumber = (num) => {
    if (num < 10000) return num.toLocaleString(undefined, { maximumFractionDigits: 1 });
    if (num < 1e6) return `${(num / 1e3).toFixed(2)}k`;
    if (num < 1e9) return `${(num / 1e6).toFixed(2)}M`;
    if (num < 1e12) return `${(num / 1e9).toFixed(2)}B`;
    return `${(num / 1e12).toFixed(2)}T`;
  };

  return (
    React.createElement('div', { className: "bg-slate-900 text-white min-h-screen flex flex-col items-center p-4 selection:bg-cyan-500 selection:text-white relative overflow-hidden" },
      React.createElement('div', { className: "fixed top-4 right-4 z-[200] space-y-2" }, notifications.map(note => (
        React.createElement('div', { key: note.id, className: "w-64 bg-slate-700/90 backdrop-blur-sm border-2 border-cyan-400 rounded-lg shadow-lg p-3 flex items-center animate-slide-in-out" },
          React.createElement('span', { className: "text-2xl mr-3" }, note.icon),
          React.createElement('div', null,
            React.createElement('p', { className: "font-bold text-cyan-300" }, "Achievement Unlocked!"),
            React.createElement('p', { className: "text-sm text-slate-200" }, note.message)
          )
        )
      ))),
      React.createElement('header', { className: "w-full max-w-7xl text-center mb-4 z-10" },
        React.createElement('h1', { className: "text-5xl font-black text-cyan-300", style: { textShadow: '0 0 10px rgba(103, 232, 249, 0.5)' } }, "AI Model Trainer"),
        React.createElement('p', { className: "text-xs text-slate-400 mt-1" }, "Press Ctrl+Shift+D for dev console"),
        React.createElement('div', { className: "mt-4 flex justify-center items-center gap-4" },
          React.createElement('button', { onClick: handleResetGame, className: "px-4 py-2 bg-red-800 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50", 'aria-label': "Reset all game progress" }, "Reset Game"),
          React.createElement('button', { onClick: () => setIsMuted(m => !m), className: "px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50", 'aria-label': isMuted ? "Unmute audio" : "Mute audio" }, isMuted ? 'Unmute 🔊' : 'Mute 🔇')
        )
      ),
      React.createElement('main', { className: "w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 z-10" },
        React.createElement('div', { className: "md:col-span-1" },
          React.createElement(InferenceDisplay, { inferences, totalPassiveInferences: totalPassiveInferencesPerSecond, computeOnlyPower, autoClicksPerSecond, onInferenceClick: handleInferenceClick, formatNumber, isMuted, activeEffects, prestigeBoost })
        ),
        React.createElement('div', { className: "md:col-span-2" },
          React.createElement(Store, { upgrades, research, achievements, onBuyUpgrade: handleBuyUpgrade, onBuyResearch: handleBuyResearch, onReboot: handleReboot, currentInferences: inferences, playerStats, formatNumber })
        )
      ),
      breakthrough && React.createElement('button', { onClick: handleBreakthroughClick, className: "absolute w-16 h-16 bg-yellow-300/80 rounded-full z-50 animate-pulse-cyan text-4xl flex items-center justify-center transition-transform hover:scale-110", style: { left: `${breakthrough.x}vw`, top: `${breakthrough.y}vh` }, 'aria-label': "Click the breakthrough idea for a bonus" }, '💡'),
      currentEvent && React.createElement(EventModal, { event: currentEvent, onChoice: handleEventChoice }),
      isDevConsoleVisible && React.createElement(DevConsole, { onCommand: handleDevCommand })
    )
  );
};
// --- END OF App.tsx ---

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(React.StrictMode, null, React.createElement(App, null)));
