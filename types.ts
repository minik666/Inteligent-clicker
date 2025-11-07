export interface Upgrade {
  id: number;
  name: string;
  description: string;
  cost: number;
  computePower: number; // compute power per second
  clicksPerSec?: number; // for automation upgrades
  category: 'compute' | 'automation';
  count: number;
  icon: string;
  unlocked: boolean;
}

export interface FloatingNumber {
  id: number;
  value: string;
  x: number;
  y: number;
}

export interface Breakthrough {
  id: number;
  x: number;
  y: number;
}

export type ResearchEffect =
  | { type: 'GLOBAL_BOOST'; value: number } // value is a percentage, e.g., 0.1 for 10%
  | { type: 'UNLOCK_UPGRADES'; value: number[] } // value is an array of upgrade ids
  | { type: 'RP_GAIN_BOOST'; value: number }; // value is a percentage, e.g., 0.1 for 10%

export interface Research {
  id: number;
  name: string;
  description: string;
  cost: number;
  effect: ResearchEffect;
  prerequisites?: number[];
  researched: boolean;
}

// --- New types for Random Events ---

export type GameEventEffect =
  | { type: 'TEMP_BOOST'; multiplier: number; duration: number } // duration in seconds
  | { type: 'FLAT_CHANGE'; amount: number } // Can be a flat number or a percentage (e.g., 0.1 for +10%, -0.05 for -5%)
  | { type: 'CHOICE_RISK'; successChance: number; successEffect: GameEventEffect; failureEffect: GameEventEffect };

export interface GameEventChoice {
  text: string;
  effect: GameEventEffect;
  outcomeDescription?: { success?: string; failure?: string };
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  choices: GameEventChoice[];
}

export interface ActiveEffect {
  id: string;
  description: string;
  expiryTimestamp: number;
  multiplier: number;
}

// --- New types for Achievements ---

export interface PlayerStats {
  totalInferences: number;
  totalClicks: number;
  breakthroughsClicked: number;
  researchPoints: number;
  reboots: number;
}

export type AchievementCondition =
  | { type: 'TOTAL_INFERENCES'; value: number }
  | { type: 'TOTAL_CLICKS'; value: number }
  | { type: 'UPGRADE_COUNT'; upgradeId: number; value: number }
  | { type: 'RESEARCH_COUNT'; value: number }
  | { type: 'BREAKTHROUGHS_CLICKED'; value: number }
  | { type: 'REBOOT_COUNT'; value: number }
  | { type: 'RESEARCH_POINTS'; value: number };

export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  condition: AchievementCondition;
  unlocked: boolean;
}

export interface Notification {
  id: number;
  icon: string;
  message: string;
}