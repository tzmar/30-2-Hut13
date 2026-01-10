
import { WeeklyTasks, SkillLevel } from './types';

export const WEEKLY_TASKS: WeeklyTasks = {
  1: [
    "Create accounts on Fiverr & Upwork",
    "Watch introduction to Freelancing video",
    "Draft a professional bio/description",
    "Identify 3 skills you can offer",
    "Apply for your first 2 low-stakes jobs",
    "Check email for account verification",
    "Join a local online hustle Facebook group"
  ],
  2: [
    "Complete one 2-hour skill tutorial",
    "Customize 3 job proposals",
    "Update portfolio with 1 sample project",
    "Apply for 5 jobs today",
    "Follow up on pending applications",
    "Practice typing or a technical skill for 30 mins",
    "Track all expenses so far"
  ],
  3: [
    "Refine profile based on views/clicks",
    "Send 10 high-quality proposals this week",
    "Study successful freelancers in your niche",
    "Master one advanced tool (e.g., Canva/Trello)",
    "Request feedback from any completed interactions",
    "Record 1 short video intro for your profile",
    "Review your application-to-hire ratio"
  ],
  4: [
    "Identify a recurring client opportunity",
    "Apply for 3 long-term contracts",
    "Audit your current hourly rate",
    "Set goals for Month 2",
    "Network with 2 people in your industry",
    "Clean up digital workspace and files",
    "Celebrate your wins - no matter how small!"
  ]
};

export const DEFAULT_SKILLS = [
  { name: 'Graphic Design (Canva)', goalHours: 20 },
  { name: 'Data Entry', goalHours: 10 },
  { name: 'Transcription', goalHours: 15 },
  { name: 'Video Editing', goalHours: 30 },
  { name: 'Mechanic Basics', goalHours: 40 }
];

export const MOTIVATIONAL_QUOTES = [
  "The secret to getting ahead is getting started.",
  "Your Pula is waiting for you to claim it through hard work.",
  "Small daily improvements lead to massive results.",
  "Don't stop until you're proud.",
  "Consistency is the bridge between goals and accomplishment.",
  "Every expert was once a beginner.",
  "Your dream doesn't work unless you do.",
  "Patience and persistence are key to online success.",
  "Focus on progress, not perfection.",
  "Believe in yourself and the P800+ target is yours!"
];

export const BADGE_DEFINITIONS = [
  { id: 'first_pula', name: 'First Pula Earned', icon: '💰', criteria: (state: any) => state.earnings.length > 0 },
  { id: 'app_50', name: '50 Apps Sent', icon: '📄', criteria: (state: any) => state.applications.length >= 50 },
  { id: 'hired', name: 'First Client', icon: '🤝', criteria: (state: any) => state.applications.some((a: any) => a.status === 'Hired') },
  { id: 'streak_7', name: 'Week Warrior', icon: '🔥', criteria: (state: any) => calculateStreakCount(state.completedTasks) >= 7 },
  { id: 'skill_10', name: 'Learner Spirit', icon: '📚', criteria: (state: any) => state.skillLogs.reduce((acc: number, log: any) => acc + log.durationMinutes, 0) >= 600 }
];

// Helper for badge criteria since utils might not be in scope for criteria function
const calculateStreakCount = (completedTasks: any) => {
  // simplified for criteria
  return Object.keys(completedTasks).length;
};

export const TARGET_MIN = 800;
export const TARGET_MAX = 1500;
