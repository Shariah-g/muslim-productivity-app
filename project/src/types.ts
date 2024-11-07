export interface Habit {
  id: string;
  name: string;
  category: 'purpose' | 'amanah' | 'rizq';
  type: string;
  time: string;
  duration: number;
  completed: boolean;
  progress: number;
}

export interface Prayer {
  id: string;
  name: string;
  time: string;
  duration: number;
  completed: boolean;
}

export interface PillarStats {
  totalHabits: number;
  completedHabits: number;
  progress: number;
  primaryMetric: number;
  primaryMetricLabel: string;
  secondaryMetric: number;
  secondaryMetricLabel: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  isExpanded?: boolean;
}