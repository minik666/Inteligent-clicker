import type { Upgrade, Research, GameEvent, Achievement, PlayerStats } from './types';

export const INITIAL_UPGRADADES: Upgrade[] = [
  // Compute Upgrades
  {
    id: 1,
    name: 'Basic CPU',
    description: 'Runs one inference every 10 seconds.',
    cost: 15,
    computePower: 0.1,
    category: 'compute',
    count: 0,
    icon: '💻',
    unlocked: true,
  },
  {
    id: 2,
    name: 'More RAM',
    description: 'Allows for slightly larger models.',
    cost: 100,
    computePower: 1,
    category: 'compute',
    count: 0,
    icon: '💾',
    unlocked: true,
  },
  {
    id: 3,
    name: 'GPU',
    description: 'Enables parallel processing for faster training.',
    cost: 1100,
    computePower: 8,
    category: 'compute',
    count: 0,
    icon: '⚙️',
    unlocked: true,
  },
  {
    id: 4,
    name: 'Data Center',
    description: 'Houses racks of servers for serious computation.',
    cost: 12000,
    computePower: 47,
    category: 'compute',
    count: 0,
    icon: '🏢',
    unlocked: true,
  },
  {
    id: 5,
    name: 'TPU Pod',
    description: 'Specialized hardware for massive neural networks.',
    cost: 130000,
    computePower: 260,
    category: 'compute',
    count: 0,
    icon: '🚀',
    unlocked: true,
  },
  {
    id: 6,
    name: 'Optimized Algorithm',
    description: 'A software breakthrough that boosts efficiency.',
    cost: 1400000,
    computePower: 1400,
    category: 'compute',
    count: 0,
    icon: '📜',
    unlocked: true,
  },
  {
    id: 7,
    name: 'Neural Network',
    description: 'A powerful, brain-like model architecture.',
    cost: 20000000,
    computePower: 7800,
    category: 'compute',
    count: 0,
    icon: '🧠',
    unlocked: true,
  },
  {
    id: 8,
    name: 'Quantum Processor',
    description: 'Leverages quantum mechanics for unimaginable speed.',
    cost: 330000000,
    computePower: 44000,
    category: 'compute',
    count: 0,
    icon: '⚛️',
    unlocked: true,
  },
  {
    id: 9,
    name: 'AI Consciousness',
    description: 'The model becomes self-aware, optimizing itself at lightspeed.',
    cost: 5100000000,
    computePower: 260000,
    category: 'compute',
    count: 0,
    icon: '🌌',
    unlocked: false, // Locked by default
  },
   {
    id: 12,
    name: 'Swarm Intelligence',
    description: 'Connects millions of models into a single hive mind.',
    cost: 80000000000, // 80B
    computePower: 1500000,
    category: 'compute',
    count: 0,
    icon: '🐝',
    unlocked: false,
  },
  {
    id: 13,
    name: 'Galactic Network',
    description: 'Utilizes interstellar communication to form a galaxy-wide brain.',
    cost: 1200000000000, // 1.2T
    computePower: 9000000,
    category: 'compute',
    count: 0,
    icon: '🌐',
    unlocked: false,
  },
  // Automation Upgrades
  {
    id: 10,
    name: 'Auto-Clicker Script',
    description: 'A simple script to automate running inferences.',
    cost: 500,
    computePower: 0,
    clicksPerSec: 1,
    category: 'automation',
    count: 0,
    icon: '🖱️',
    unlocked: true,
  },
  {
    id: 11,
    name: 'Dedicated Clicking Bot',
    description: 'A more robust bot that clicks faster and more reliably.',
    cost: 7500,
    computePower: 0,
    clicksPerSec: 10,
    category: 'automation',
    count: 0,
    icon: '🤖',
    unlocked: true,
  },
  {
    id: 14,
    name: 'Predictive Clicker',
    description: 'Analyzes user behavior to click at the most optimal times.',
    cost: 1000000000, // 1B
    computePower: 0,
    clicksPerSec: 100,
    category: 'automation',
    count: 0,
    icon: '🔮',
    unlocked: false,
  },
  {
    id: 15,
    name: 'Self-Replicating Bots',
    description: 'Automation bots that build more automation bots.',
    cost: 50000000000, // 50B
    computePower: 0,
    clicksPerSec: 500,
    category: 'automation',
    count: 0,
    icon: '🧬',
    unlocked: false,
  },
];

export const INITIAL_RESEARCH: Research[] = [
    {
        id: 1,
        name: 'Improved Cooling',
        description: 'All hardware runs 5% more efficiently.',
        cost: 5000,
        effect: { type: 'GLOBAL_BOOST', value: 0.05 },
        researched: false,
    },
    {
        id: 2,
        name: 'Advanced Parallelism',
        description: 'Boosts all compute power by another 10%.',
        cost: 100000,
        effect: { type: 'GLOBAL_BOOST', value: 0.1 },
        prerequisites: [1],
        researched: false,
    },
    {
        id: 3,
        name: 'Self-Improving Models',
        description: 'Unlocks a new tier of upgrades.',
        cost: 5000000,
        effect: { type: 'UNLOCK_UPGRADES', value: [9] },
        prerequisites: [2],
        researched: false,
    },
     {
        id: 4,
        name: 'Quantum Entanglement',
        description: 'Boosts all compute power by a massive 20%.',
        cost: 1000000000,
        effect: { type: 'GLOBAL_BOOST', value: 0.2 },
        prerequisites: [3],
        researched: false,
    },
    {
        id: 5,
        name: 'Advanced AGI Architectures',
        description: 'Unlocks Swarm Intelligence and Predictive Clickers.',
        cost: 5000000000, // 5B
        effect: { type: 'UNLOCK_UPGRADES', value: [12, 14] },
        prerequisites: [4],
        researched: false,
    },
    {
        id: 6,
        name: 'Hyperspace Communication',
        description: 'Unlocks the Galactic Network and Self-Replicating Bots.',
        cost: 800000000000, // 800B
        effect: { type: 'UNLOCK_UPGRADES', value: [13, 15] },
        prerequisites: [5],
        researched: false,
    },
    {
        id: 7,
        name: 'Prestige Optimization',
        description: 'Increases all future Research Point gains by 10%.',
        cost: 2500000000000, // 2.5T
        effect: { type: 'RP_GAIN_BOOST', value: 0.1 },
        prerequisites: [6],
        researched: false,
    },
];

export const INITIAL_EVENTS: GameEvent[] = [
  {
    id: 'breakthrough',
    title: 'Sudden Breakthrough!',
    description: 'One of your algorithms has unexpectedly converged, offering a temporary but significant boost to your research.',
    choices: [
      {
        text: 'Focus on it! (2x compute for 60 seconds)',
        effect: { type: 'TEMP_BOOST', multiplier: 2, duration: 60 },
        outcomeDescription: { success: "Compute power is surging!" }
      },
      {
        text: 'Integrate slowly. (1.2x compute for 5 minutes)',
        effect: { type: 'TEMP_BOOST', multiplier: 1.2, duration: 300 },
        outcomeDescription: { success: "A steady boost has been applied." }
      },
    ],
  },
  {
    id: 'power_surge',
    title: 'Power Surge!',
    description: 'A massive power surge threatens your hardware. You need to act quickly to mitigate the damage.',
    choices: [
      {
        text: 'Reroute power. (Guaranteed loss of 5% of inferences)',
        effect: { type: 'FLAT_CHANGE', amount: -0.05 }, // Interpreted as percentage
        outcomeDescription: { failure: "A necessary sacrifice. 5% of inferences lost." }
      },
      {
        text: 'Risk it. (50% chance to lose nothing, 50% to lose 15%)',
        effect: {
            type: 'CHOICE_RISK',
            successChance: 0.5,
            successEffect: { type: 'FLAT_CHANGE', amount: 0 },
            failureEffect: { type: 'FLAT_CHANGE', amount: -0.15 },
        },
        outcomeDescription: {
            success: "Phew! The system stabilized on its own. No loss.",
            failure: "Ouch! The backup failed. 15% of inferences lost."
        }
      },
    ],
  },
   {
    id: 'mysterious_code',
    title: 'Mysterious Code Snippet',
    description: 'You find an old, undocumented code snippet on a forgotten server. It looks like an optimization routine, but you\'re not sure if it\'s compatible.',
    choices: [
      {
        text: 'Run it. (75% chance of 1.5x compute for 3 mins, 25% chance of -20% compute for 3 mins)',
        effect: {
            type: 'CHOICE_RISK',
            successChance: 0.75,
            successEffect: { type: 'TEMP_BOOST', multiplier: 1.5, duration: 180 },
            failureEffect: { type: 'TEMP_BOOST', multiplier: 0.8, duration: 180 },
        },
        outcomeDescription: {
            success: "It works! The snippet integrated perfectly, boosting compute power.",
            failure: "Incompatible code! It's causing system drag, reducing compute power."
        }
      },
      {
        text: 'Leave it alone.',
        effect: { type: 'FLAT_CHANGE', amount: 0 },
        outcomeDescription: { success: "Better safe than sorry." }
      },
    ],
  },
  {
    id: 'corporate_buyout',
    title: 'Corporate Buyout Offer',
    description: "A tech giant wants to acquire your model. This could be a huge boost, but comes with strings attached.",
    choices: [
      {
        text: 'Sell non-exclusive rights (+15% of current inferences)',
        effect: { type: 'FLAT_CHANGE', amount: 0.15 },
        outcomeDescription: { success: "The deal is done. A huge influx of inferences!" }
      },
      {
        text: 'Refuse loudly (1.5x compute for 5 mins)',
        effect: { type: 'TEMP_BOOST', multiplier: 1.5, duration: 300 },
        outcomeDescription: { success: "The publicity from your refusal has attracted new talent." }
      },
    ],
  },
  {
    id: 'data_corruption',
    title: 'Data Corruption!',
    description: "A critical dataset has been corrupted! Training on it could be disastrous.",
    choices: [
      {
        text: 'Spend 2% of inferences to clean it.',
        effect: { type: 'FLAT_CHANGE', amount: -0.02 },
        outcomeDescription: { failure: "The data is clean, but it was costly." }
      },
      {
        text: 'Train anyway (50% chance of -50% compute for 10 mins)',
        effect: {
            type: 'CHOICE_RISK',
            successChance: 0.5,
            successEffect: { type: 'FLAT_CHANGE', amount: 0 },
            failureEffect: { type: 'TEMP_BOOST', multiplier: 0.5, duration: 600 },
        },
        outcomeDescription: {
            success: "The model managed to learn around the corrupted data.",
            failure: "Garbage in, garbage out. Compute power has plummeted."
        }
      },
    ],
  },
];

export const INITIAL_PLAYER_STATS: PlayerStats = {
  totalInferences: 0,
  totalClicks: 0,
  breakthroughsClicked: 0,
  researchPoints: 0,
  reboots: 0,
};

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  // Inferences
  { id: 1, name: 'First Step', description: 'Generate your first 1,000 inferences.', icon: '🌱', condition: { type: 'TOTAL_INFERENCES', value: 1000 }, unlocked: false },
  { id: 2, name: 'Data Flood', description: 'Generate 1 million inferences.', icon: '🌊', condition: { type: 'TOTAL_INFERENCES', value: 1000000 }, unlocked: false },
  { id: 3, name: 'Singularity', description: 'Generate 1 billion inferences.', icon: '💥', condition: { type: 'TOTAL_INFERENCES', value: 1000000000 }, unlocked: false },
  { id: 14, name: 'Exascale', description: 'Generate 1 trillion inferences.', icon: '💫', condition: { type: 'TOTAL_INFERENCES', value: 1000000000000 }, unlocked: false },
  // Clicks
  { id: 4, name: 'Manual Labor', description: 'Click the brain 100 times.', icon: '👆', condition: { type: 'TOTAL_CLICKS', value: 100 }, unlocked: false },
  { id: 5, name: 'Carpal Tunnel', description: 'Click the brain 10,000 times.', icon: '🖐️', condition: { type: 'TOTAL_CLICKS', value: 10000 }, unlocked: false },
  // Upgrades
  { id: 6, name: 'First Gear', description: 'Buy your first GPU.', icon: '⚙️', condition: { type: 'UPGRADE_COUNT', upgradeId: 3, value: 1 }, unlocked: false },
  { id: 7, name: 'Server Farm', description: 'Own 10 Data Centers.', icon: '🏢', condition: { type: 'UPGRADE_COUNT', upgradeId: 4, value: 10 }, unlocked: false },
  { id: 8, name: 'Automated Future', description: 'Own 25 Dedicated Clicking Bots.', icon: '🤖', condition: { type: 'UPGRADE_COUNT', upgradeId: 11, value: 25 }, unlocked: false },
  { id: 15, name: 'Hive Mind', description: 'Own your first Swarm Intelligence.', icon: '🐝', condition: { type: 'UPGRADE_COUNT', upgradeId: 12, value: 1 }, unlocked: false },
  { id: 16, name: 'Intergalactic', description: 'Own your first Galactic Network.', icon: '🌐', condition: { type: 'UPGRADE_COUNT', upgradeId: 13, value: 1 }, unlocked: false },
  // Research
  { id: 9, name: 'Researcher', description: 'Complete your first research project.', icon: '🔬', condition: { type: 'RESEARCH_COUNT', value: 1 }, unlocked: false },
  { id: 10, name: 'Master of Science', description: 'Complete all research.', icon: '🎓', condition: { type: 'RESEARCH_COUNT', value: INITIAL_RESEARCH.length }, unlocked: false },
  // Misc
  { id: 11, name: 'Eureka!', description: 'Click 5 Breakthroughs.', icon: '💡', condition: { type: 'BREAKTHROUGHS_CLICKED', value: 5 }, unlocked: false },
  // Prestige
  { id: 12, name: 'Start Over', description: 'Reboot the simulation for the first time.', icon: '🔄', condition: { type: 'REBOOT_COUNT', value: 1 }, unlocked: false },
  { id: 13, name: 'Power Cycle', description: 'Reboot 5 times.', icon: '♻️', condition: { type: 'REBOOT_COUNT', value: 5 }, unlocked: false },
  { id: 17, name: 'Tenacious', description: 'Reboot 10 times.', icon: '🔟', condition: { type: 'REBOOT_COUNT', value: 10 }, unlocked: false },
  { id: 18, name: 'Prestige Worldwide', description: 'Accumulate 25 Research Points.', icon: '🏆', condition: { type: 'RESEARCH_POINTS', value: 25 }, unlocked: false },
];