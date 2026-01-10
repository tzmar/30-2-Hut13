
export enum ApplicationStatus {
  PENDING = 'Pending',
  REJECTED = 'Rejected',
  HIRED = 'Hired'
}

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

// Fixed missing WeeklyTasks export
export type WeeklyTasks = Record<number, string[]>;

export interface Earning {
  id: string;
  date: string;
  source: string;
  amount: number;
  notes: string;
}

export interface Application {
  id: string;
  platform: string;
  jobTitle: string;
  date: string;
  status: ApplicationStatus;
}

export interface Skill {
  id: string;
  name: string;
  goalHours: number;
  resources: string;
  level: SkillLevel;
  status: 'active' | 'archived';
  isDefault: boolean;
}

export interface SkillLog {
  id: string;
  skillId: string;
  date: string;
  durationMinutes: number;
  tutorialName: string;
  notes: string;
}

export interface CustomBadge {
  id: string;
  name: string;
  icon: string;
  date: string;
}

export interface AppState {
  startDate: string;
  earnings: Earning[];
  applications: Application[];
  skills: Skill[];
  skillLogs: SkillLog[];
  completedTasks: Record<string, string[]>; // dateKey: [taskId]
  removedPreloadedTasks: Record<string, string[]>; // dateKey: [taskId]
  customTasks: Record<string, string[]>; // dateKey: [taskText]
  completedCustomTasks: Record<string, string[]>; // dateKey: [taskText]
  streak: number;
  onboardingComplete: boolean;
  theme: 'light' | 'dark';
  weeklyGoals: Record<number, string[]>;
  monthlyGoalMin: number;
  savingsRate: number; // 0 to 100
  customBadges: CustomBadge[];
}
