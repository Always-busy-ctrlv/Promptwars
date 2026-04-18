/**
 * Stadium Go — Venue & Engagement Types
 */

export interface Venue {
  id: string;
  name: string;
  city: string;
  capacity: number;
  gates: number;
  imageUrl?: string;
  status: 'live' | 'upcoming' | 'closed';
  currentEvent?: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  expiresAt: string;
  active: boolean;
}

export interface PollOption {
  id: string;
  label: string;
  emoji: string;
  votes: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface FanEnergy {
  level: number;        // 0-100
  milestone: string;
  nextMilestone: string;
  pointsToNext: number;
}
