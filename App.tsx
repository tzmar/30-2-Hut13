
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Wallet, 
  Briefcase, 
  BookOpen, 
  Settings, 
  TrendingUp,
  PlusCircle,
  Clock,
  Trash2,
  Download,
  Award,
  ChevronRight,
  Sun,
  Moon,
  Info,
  ChevronDown,
  ChevronUp,
  Share2,
  Trophy,
  History,
  Plus,
  ArrowRight,
  Target,
  Edit2,
  Archive,
  Star,
  X,
  Timer,
  WifiOff,
  CloudCheck,
  PartyPopper,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

import { AppState, ApplicationStatus, Earning, Application, SkillLog, Skill, SkillLevel, CustomBadge } from './types.ts';
import { WEEKLY_TASKS, DEFAULT_SKILLS, MOTIVATIONAL_QUOTES, BADGE_DEFINITIONS, TARGET_MIN, TARGET_MAX } from './constants.ts';
import { formatPula, getDateKey, getWeekNumber, calculateStreak } from './utils.ts';

// --- Subcomponents ---

const Onboarding: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Welcome Hustler!", desc: "The 30-Day Hustle Tracker is your companion to earning your first P800 - P1,500 online." },
    { title: "Fully Customizable", desc: "Add your own skills, tasks, and goals. Whether it's coding or welding, we've got you covered." },
    { title: "Track Every Pula", desc: "Log earnings from any platform. Set your own savings targets and watch your wealth grow." },
    { title: "Stay Motivated", desc: "Daily quotes, streaks, and custom achievement badges to celebrate YOUR unique wins." }
  ];

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-pula-100 dark:bg-pula-900/30 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-xl">
        <TrendingUp className="w-10 h-10 text-pula-600" />
      </div>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">{steps[step].title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm leading-relaxed">{steps[step].desc}</p>
      <div className="flex gap-2 mb-8">
        {steps.map((_, i) => (
          <div key={i} className={`h-1.5 transition-all rounded-full ${i === step ? 'w-8 bg-pula-600' : 'w-2 bg-gray-200 dark:bg-gray-700'}`} />
        ))}
      </div>
      <button 
        onClick={() => step < steps.length - 1 ? setStep(step + 1) : onComplete()}
        className="w-full max-w-xs bg-pula-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-pula-500/30 flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        {step === steps.length - 1 ? "Start Your Journey" : "Next"} <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const GraduationScreen: React.FC<{ stats: any, onRestart: () => void, onContinue: () => void }> = ({ stats, onRestart, onContinue }) => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto flex flex-col items-center p-6 text-center">
      <div className="mt-12 mb-8 relative">
        <div className="absolute inset-0 animate-ping opacity-20 bg-amber-400 rounded-full" />
        <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl relative z-10">
          <Trophy className="w-12 h-12 text-white" />
        </div>
      </div>
      
      <h1 className="text-3xl font-black mb-2 dark:text-white">Challenge Complete!</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">You've successfully tracked 30 days of hustle.</p>
      
      <div className="w-full max-w-sm bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-700 mb-8">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Final Mission Stats</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-left">
             <p className="text-2xl font-black text-pula-600">{stats.earned}</p>
             <p className="text-[10px] font-bold text-gray-400 uppercase">Total Earned</p>
          </div>
          <div className="text-left">
             <p className="text-2xl font-black text-amber-600">{stats.studied}h</p>
             <p className="text-[10px] font-bold text-gray-400 uppercase">Hours Studied</p>
          </div>
          <div className="text-left">
             <p className="text-2xl font-black text-calm-600">{stats.apps}</p>
             <p className="text-[10px] font-bold text-gray-400 uppercase">Apps Sent</p>
          </div>
          <div className="text-left">
             <p className="text-2xl font-black text-gray-900 dark:text-white">{stats.streak}</p>
             <p className="text-[10px] font-bold text-gray-400 uppercase">Final Streak</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <button 
          onClick={onContinue}
          className="w-full bg-pula-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-pula-500/30 flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <Sparkles size={20} /> Keep Hustling
        </button>
        <button 
          onClick={onRestart}
          className="w-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <RotateCcw size={20} /> Restart Challenge
        </button>
      </div>
      
      <div className="mt-12 flex items-center gap-2 opacity-30">
        <PartyPopper className="text-amber-500" />
        <span className="text-[10px] font-bold uppercase tracking-widest dark:text-white">Graduation Class of {new Date().getFullYear()}</span>
        <PartyPopper className="text-amber-500" />
      </div>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('hustle_state_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.removedPreloadedTasks) parsed.removedPreloadedTasks = {};
        return parsed;
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
    
    return {
      startDate: new Date().toISOString(),
      earnings: [],
      applications: [],
      skills: DEFAULT_SKILLS.map(s => ({
        id: crypto.randomUUID(),
        name: s.name,
        goalHours: s.goalHours,
        resources: '',
        level: SkillLevel.BEGINNER,
        status: 'active',
        isDefault: true
      })),
      skillLogs: [],
      completedTasks: {},
      removedPreloadedTasks: {},
      customTasks: {},
      completedCustomTasks: {},
      streak: 0,
      onboardingComplete: false,
      theme: 'light',
      weeklyGoals: {},
      monthlyGoalMin: TARGET_MIN,
      savingsRate: 50,
      customBadges: []
    };
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogModal, setShowLogModal] = useState<'earning' | 'application' | 'skill' | 'addSkill' | 'weeklyReview' | 'customBadge' | 'weeklyGoal' | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasDismissedGraduation, setHasDismissedGraduation] = useState(false);

  // Gesture Refs
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const TABS = ['dashboard', 'tasks', 'earnings', 'apps', 'learning', 'settings'];

  useEffect(() => {
    localStorage.setItem('hustle_state_v2', JSON.stringify(state));
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [state]);

  const weekNum = useMemo(() => getWeekNumber(state.startDate), [state.startDate]);
  const todayKey = getDateKey();
  
  // Tasks Logic
  const allWeeklyTasks = useMemo(() => WEEKLY_TASKS[weekNum] || [], [weekNum]);
  const removedPreloadedToday = state.removedPreloadedTasks[todayKey] || [];
  const currentTasks = useMemo(() => 
    allWeeklyTasks.map((text, idx) => ({ text, id: `task-${idx}` }))
                 .filter(t => !removedPreloadedToday.includes(t.id)), 
    [allWeeklyTasks, removedPreloadedToday]
  );

  const completedToday = state.completedTasks[todayKey] || [];
  const customTasksToday = state.customTasks[todayKey] || [];
  const completedCustomToday = state.completedCustomTasks[todayKey] || [];
  
  const totalDailyTasks = currentTasks.length + customTasksToday.length;
  const doneDailyTasks = completedToday.filter(id => currentTasks.some(ct => ct.id === id)).length + completedCustomToday.length;
  const dailyProgress = totalDailyTasks > 0 ? (doneDailyTasks / totalDailyTasks) * 100 : 0;
  
  const totalEarnings = state.earnings.reduce((sum, e) => sum + e.amount, 0);
  const todayEarnings = state.earnings.filter(e => e.date === todayKey).reduce((sum, e) => sum + e.amount, 0);
  
  const totalMins = state.skillLogs.reduce((sum, l) => sum + l.durationMinutes, 0);
  const totalHours = Math.round(totalMins / 60 * 10) / 10;
  
  const streakCount = useMemo(() => calculateStreak(state.completedTasks), [state.completedTasks]);

  const dailyQuote = useMemo(() => {
    const startOfYear = new Date(new Date().getFullYear(), 0, 0).getTime();
    const dayOfYear = Math.floor((new Date().getTime() - startOfYear) / 86400000);
    return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];
  }, []);

  const activeSkills = state.skills.filter(s => s.status === 'active');

  const currentDay = Math.floor((new Date().getTime() - new Date(state.startDate).getTime()) / 86400000) + 1;
  const isGraduated = currentDay > 30 && !hasDismissedGraduation;

  // Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Minimum distance for a swipe, and ensure it's mostly horizontal
    const swipeThreshold = 50;
    if (Math.abs(deltaX) > swipeThreshold && Math.abs(deltaX) > Math.abs(deltaY)) {
      const currentIndex = TABS.indexOf(activeTab);
      if (deltaX > 0) {
        // Swipe Right (Move Left)
        if (currentIndex > 0) setActiveTab(TABS[currentIndex - 1]);
      } else {
        // Swipe Left (Move Right)
        if (currentIndex < TABS.length - 1) setActiveTab(TABS[currentIndex + 1]);
      }
    }
  };

  const toggleTask = (taskId: string) => {
    setState(prev => {
      const current = prev.completedTasks[todayKey] || [];
      const updated = current.includes(taskId) ? current.filter(id => id !== taskId) : [...current, taskId];
      return { ...prev, completedTasks: { ...prev.completedTasks, [todayKey]: updated } };
    });
  };

  const removePreloadedTask = (taskId: string) => {
    setState(prev => {
      const currentRemoved = prev.removedPreloadedTasks[todayKey] || [];
      return {
        ...prev,
        removedPreloadedTasks: {
          ...prev.removedPreloadedTasks,
          [todayKey]: [...currentRemoved, taskId]
        }
      };
    });
  };

  const addCustomTask = (text: string) => {
    if (!text.trim()) return;
    setState(prev => ({
      ...prev,
      customTasks: { ...prev.customTasks, [todayKey]: [...(prev.customTasks[todayKey] || []), text] }
    }));
  };

  const toggleCustomTask = (text: string) => {
    setState(prev => {
      const current = prev.completedCustomTasks[todayKey] || [];
      const updated = current.includes(text) ? current.filter(t => t !== text) : [...current, text];
      return { ...prev, completedCustomTasks: { ...prev.completedCustomTasks, [todayKey]: updated } };
    });
  };

  const removeCustomTask = (text: string) => {
    setState(prev => {
      const currentTasksList = prev.customTasks[todayKey] || [];
      const currentCompletedList = prev.completedCustomTasks[todayKey] || [];
      return {
        ...prev,
        customTasks: {
          ...prev.customTasks,
          [todayKey]: currentTasksList.filter(t => t !== text)
        },
        completedCustomTasks: {
          ...prev.completedCustomTasks,
          [todayKey]: currentCompletedList.filter(t => t !== text)
        }
      };
    });
  };

  const addEarning = (e: Omit<Earning, 'id'>) => {
    setState(prev => ({
      ...prev,
      earnings: [...prev.earnings, { ...e, id: crypto.randomUUID() }]
    }));
    setShowLogModal(null);
  };

  const addApplication = (a: Omit<Application, 'id'>) => {
    setState(prev => ({
      ...prev,
      applications: [...prev.applications, { ...a, id: crypto.randomUUID() }]
    }));
    setShowLogModal(null);
  };

  const addSkill = (s: Omit<Skill, 'id' | 'status'>) => {
    setState(prev => ({
      ...prev,
      skills: [...prev.skills, { ...s, id: crypto.randomUUID(), status: 'active' }]
    }));
    setShowLogModal(null);
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    setState(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  };

  const addSkillLog = (l: Omit<SkillLog, 'id'>) => {
    setState(prev => ({
      ...prev,
      skillLogs: [...prev.skillLogs, { ...l, id: crypto.randomUUID() }]
    }));
    setShowLogModal(null);
  };

  const addCustomBadge = (name: string, icon: string) => {
    setState(prev => ({
      ...prev,
      customBadges: [...prev.customBadges, { id: crypto.randomUUID(), name, icon, date: todayKey }]
    }));
    setShowLogModal(null);
  };

  const addWeeklyGoal = (goal: string) => {
    setState(prev => ({
      ...prev,
      weeklyGoals: { ...prev.weeklyGoals, [weekNum]: [...(prev.weeklyGoals[weekNum] || []), goal] }
    }));
    setShowLogModal(null);
  };

  const getSkillProgress = (skillId: string) => {
    const skill = state.skills.find(s => s.id === skillId);
    if (!skill || skill.goalHours === 0) return 0;
    const mins = state.skillLogs
      .filter(l => l.skillId === skillId)
      .reduce((sum, l) => sum + l.durationMinutes, 0);
    return Math.min(100, Math.round((mins / (skill.goalHours * 60)) * 100));
  };

  const getSkillHours = (skillId: string) => {
    const mins = state.skillLogs
      .filter(l => l.skillId === skillId)
      .reduce((sum, l) => sum + l.durationMinutes, 0);
    return Math.round(mins / 60 * 10) / 10;
  };

  const resetApp = () => {
    const isConfirmed = window.confirm("DANGER: This will wipe ALL your hustle progress, custom tasks, and skills permanently. Are you absolutely sure?");
    if (isConfirmed) {
      localStorage.removeItem('hustle_state_v2');
      localStorage.removeItem('hustle_state');
      localStorage.clear();
      window.location.reload();
    }
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hustle_tracker_backup_${getDateKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // UI Helpers
  const TabButton = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex flex-col items-center justify-center w-full py-2 transition-all ${activeTab === id ? 'text-pula-600' : 'text-gray-400'}`}
    >
      <Icon className={`w-6 h-6 mb-1 ${activeTab === id ? 'scale-110' : ''}`} />
      <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );

  if (!state.onboardingComplete) {
    return <Onboarding onComplete={() => setState(p => ({ ...p, onboardingComplete: true }))} />;
  }

  if (isGraduated) {
    return (
      <GraduationScreen 
        stats={{
          earned: formatPula(totalEarnings),
          studied: totalHours,
          apps: state.applications.length,
          streak: streakCount
        }} 
        onContinue={() => setHasDismissedGraduation(true)}
        onRestart={resetApp}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24 dark:bg-gray-900 transition-colors">
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pula-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pula-500/20 active:rotate-12 transition-transform">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight dark:text-white">Hustle Track</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              {currentDay > 28 ? 'FINAL WEEK' : `W${weekNum}`} • {currentDay > 30 ? 'GRADUATE' : `DAY ${currentDay}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isOnline ? (
            <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-200 dark:border-amber-800">
               <WifiOff size={10} /> Offline
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-pula-100 dark:bg-pula-900/30 text-pula-600 dark:text-pula-400 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-pula-200 dark:border-pula-800">
               <CloudCheck size={10} /> Sync
            </div>
          )}
          <button onClick={() => setState(p => ({ ...p, theme: p.theme === 'light' ? 'dark' : 'light' }))} className="p-2.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
            {state.theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </header>

      <main 
        className="max-w-md mx-auto p-4 space-y-6 overflow-x-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {/* --- TAB: Dashboard --- */}
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
            <div className="bg-gradient-to-br from-pula-600 to-pula-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-pula-500/30 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-pula-100 text-sm font-medium italic opacity-90 leading-relaxed mb-6">"{dailyQuote}"</p>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-5xl font-black">{streakCount}</span>
                    <span className="ml-2 text-xs font-bold text-pula-100 uppercase tracking-widest">Day Streak</span>
                  </div>
                  <button onClick={() => setShowLogModal('weeklyReview')} className="bg-white/20 dark:bg-gray-800/40 px-4 py-2.5 rounded-2xl text-xs font-bold backdrop-blur-md border border-white/10 dark:border-gray-700 flex items-center gap-2 hover:bg-white/30 dark:hover:bg-gray-700/60 transition-all">
                    <History size={14} /> Review
                  </button>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                   <Target size={16} className="text-pula-600" />
                   <h3 className="font-bold dark:text-white">Month Goal: {formatPula(state.monthlyGoalMin)}</h3>
                </div>
                <span className="text-xs font-black text-pula-600 bg-pula-50 dark:bg-pula-900/30 px-3 py-1.5 rounded-xl">
                  {Math.round((totalEarnings / state.monthlyGoalMin) * 100)}%
                </span>
              </div>
              <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden border border-gray-50 dark:border-gray-900">
                <div className="h-full bg-pula-500 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (totalEarnings / state.monthlyGoalMin) * 100)}%` }} />
              </div>
              <div className="mt-5 flex justify-between items-center text-sm">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Earned</p>
                  <p className="font-black text-gray-900 dark:text-white">{formatPula(totalEarnings)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Saving ({state.savingsRate}%)</p>
                  <p className="font-black text-calm-600">{formatPula(totalEarnings * (state.savingsRate / 100))}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                 <div className="w-8 h-8 bg-calm-100 dark:bg-calm-900/30 rounded-xl flex items-center justify-center text-calm-600 mb-3">
                   <Briefcase size={16} />
                 </div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Applications</p>
                 <p className="text-2xl font-black dark:text-white">{state.applications.length}</p>
               </div>
               <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                 <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-amber-600 mb-3">
                   <BookOpen size={16} />
                 </div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Study Hours</p>
                 <p className="text-2xl font-black dark:text-white">{totalHours}h</p>
               </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2 dark:text-white">
                <Award className="w-5 h-5 text-amber-500" /> Your Milestones
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {/* 30-Day Survivor Badge (Dynamic) */}
                {currentDay >= 30 && (
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl bg-amber-100 dark:bg-amber-900/40 border-2 border-amber-400 shadow-lg shadow-amber-500/20">
                      🎓
                    </div>
                    <span className="text-[9px] font-black text-center w-16 leading-tight uppercase text-amber-600 dark:text-amber-400">Graduate</span>
                  </div>
                )}
                {/* Built-in Badges */}
                {BADGE_DEFINITIONS.map(badge => (
                  <div key={badge.id} className={`flex-shrink-0 flex flex-col items-center gap-2 transition-all ${badge.criteria(state) ? 'opacity-100 scale-100' : 'opacity-20 grayscale'}`}>
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm ${badge.criteria(state) ? 'bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-200 dark:border-amber-700' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {badge.icon}
                    </div>
                    <span className="text-[9px] font-bold text-center w-16 leading-tight uppercase text-gray-500 dark:text-gray-400">{badge.name}</span>
                  </div>
                ))}
                {/* Custom Badges */}
                {state.customBadges.map(badge => (
                  <div key={badge.id} className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl bg-pula-50 dark:bg-pula-900/30 border-2 border-pula-200 dark:border-pula-700 shadow-sm">
                      {badge.icon}
                    </div>
                    <span className="text-[9px] font-bold text-center w-16 leading-tight uppercase text-pula-600 dark:text-pula-400">{badge.name}</span>
                  </div>
                ))}
                <button onClick={() => setShowLogModal('customBadge')} className="flex-shrink-0 flex flex-col items-center gap-2 group">
                   <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 group-hover:border-pula-400 group-hover:text-pula-400 transition-colors">
                     <Plus size={24} />
                   </div>
                   <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Add Goal</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: Habits --- */}
        {activeTab === 'tasks' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-black dark:text-white">Daily Habits</h2>
                  <p className="text-sm text-gray-500">Hustle smarter, not harder.</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-pula-600">{Math.round(dailyProgress)}%</span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Progress</p>
                </div>
              </div>

              <div className="space-y-3">
                {currentTasks.map((task) => {
                  const isDone = completedToday.includes(task.id);
                  return (
                    <div key={task.id} className="flex items-center gap-2 group">
                      <button 
                        onClick={() => toggleTask(task.id)} 
                        className={`flex-1 flex items-center gap-4 p-4 rounded-2xl border transition-all ${isDone ? 'bg-pula-50/50 border-pula-100 dark:bg-pula-900/20 dark:border-pula-800 opacity-60' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm active:scale-[0.98]'}`}
                      >
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 ${isDone ? 'bg-pula-600 border-pula-600' : 'border-gray-200 dark:border-gray-600'}`}>
                          {isDone && <CheckSquare className="w-4 h-4 text-white" />}
                        </div>
                        <span className={`text-sm font-medium text-left flex-1 ${isDone ? 'line-through text-gray-400' : 'dark:text-gray-100'}`}>{task.text}</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removePreloadedTask(task.id); }}
                        className="p-3 text-gray-300 hover:text-red-500 transition-colors bg-gray-50 dark:bg-gray-800 rounded-xl"
                        title="Remove habit"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
                
                {customTasksToday.map((task, idx) => {
                  const isDone = completedCustomToday.includes(task);
                  return (
                    <div key={`custom-${idx}`} className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleCustomTask(task)} 
                        className={`flex-1 flex items-center gap-4 p-4 rounded-2xl border transition-all ${isDone ? 'bg-pula-50/50 border-pula-100 dark:bg-pula-900/20 dark:border-pula-800 opacity-60' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm active:scale-[0.98]'}`}
                      >
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 ${isDone ? 'bg-pula-600 border-pula-600' : 'border-gray-200 dark:border-gray-600'}`}>
                          {isDone && <CheckSquare className="w-4 h-4 text-white" />}
                        </div>
                        <div className="flex-1 flex justify-between items-center mr-2">
                          <span className={`text-sm font-medium text-left ${isDone ? 'line-through text-gray-400' : 'dark:text-gray-100'}`}>{task}</span>
                          <span className="text-[10px] font-bold text-pula-600 bg-pula-50 dark:bg-pula-900/40 px-2 py-0.5 rounded-lg uppercase ml-2 border dark:border-pula-800">User</span>
                        </div>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeCustomTask(task); }}
                        className="p-3 text-gray-300 hover:text-red-500 transition-colors bg-gray-50 dark:bg-gray-800 rounded-xl"
                        title="Delete task"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.task as HTMLInputElement;
                  addCustomTask(input.value);
                  input.value = '';
                }} className="relative">
                  <input name="task" placeholder="Add custom task..." className="w-full pl-4 pr-12 py-4 rounded-2xl bg-gray-100 dark:bg-gray-700 border-none outline-none focus:ring-2 ring-pula-500 font-medium text-sm dark:text-white" />
                  <button type="submit" className="absolute right-2 top-2 w-10 h-10 bg-pula-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-pula-500/20 active:scale-90">
                    <Plus size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: Money --- */}
        {activeTab === 'earnings' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
            <button onClick={() => setShowLogModal('earning')} className="w-full bg-pula-600 text-white p-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-pula-500/30 active:scale-95 transition-transform">
              <PlusCircle size={24} /> Log New Earning
            </button>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Today</p>
                 <p className="text-2xl font-black text-pula-600">{formatPula(todayEarnings)}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Weekly</p>
                 <p className="text-2xl font-black text-calm-600">
                    {formatPula(state.earnings.filter(e => {
                      const d = new Date(e.date);
                      const start = new Date();
                      start.setDate(start.getDate() - 7);
                      return d >= start;
                    }).reduce((s, e) => s + e.amount, 0))}
                 </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm h-72 overflow-hidden">
               <h3 className="font-bold mb-6 flex items-center gap-2 dark:text-white">
                 <TrendingUp size={18} className="text-pula-600" /> Earning Velocity
               </h3>
               <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={state.earnings}>
                    <defs>
                      <linearGradient id="colorEarning" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '16px', 
                        border: 'none', 
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)', 
                        padding: '12px',
                        backgroundColor: state.theme === 'dark' ? '#111827' : '#ffffff',
                        color: state.theme === 'dark' ? '#ffffff' : '#000000'
                      }} 
                      formatter={(val) => [formatPula(val as number), 'Earned']}
                    />
                    <Area type="monotone" dataKey="amount" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorEarning)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold dark:text-white">Transaction History</h3>
              {state.earnings.slice().reverse().map(e => (
                <div key={e.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex justify-between items-center group">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center text-gray-400">
                      <Wallet size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-sm group-hover:text-pula-600 transition-colors dark:text-gray-100">{e.source}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{e.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-pula-600 text-lg">{formatPula(e.amount)}</p>
                    <p className="text-[10px] text-gray-400 italic">{e.notes || 'No notes'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB: Apps --- */}
        {activeTab === 'apps' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
             <button onClick={() => setShowLogModal('application')} className="w-full bg-calm-600 text-white p-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-calm-500/30 active:scale-95 transition-transform">
               <PlusCircle size={24} /> Log Application
             </button>

             <div className="grid grid-cols-3 gap-3">
                {Object.values(ApplicationStatus).map(status => (
                  <div key={status} className={`p-4 rounded-3xl border border-gray-100 dark:border-gray-700 text-center ${status === ApplicationStatus.HIRED ? 'bg-pula-50 dark:bg-pula-900/20 border-pula-200 dark:border-pula-800' : 'bg-white dark:bg-gray-800'}`}>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{status}</p>
                    <p className={`text-xl font-black ${status === ApplicationStatus.HIRED ? 'text-pula-600' : 'dark:text-white'}`}>{state.applications.filter(a => a.status === status).length}</p>
                  </div>
                ))}
             </div>

             <div className="space-y-3">
               <h3 className="font-bold dark:text-white">Application Log</h3>
               {state.applications.slice().reverse().map(a => (
                 <div key={a.id} className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 bg-calm-50 dark:bg-calm-900/40 rounded-xl flex items-center justify-center text-calm-600 dark:text-calm-400 font-black text-xs uppercase border dark:border-calm-800">
                          {a.platform.substring(0, 1)}
                        </div>
                        <div>
                          <p className="font-black text-sm dark:text-white">{a.jobTitle}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{a.platform} • {a.date}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        a.status === ApplicationStatus.HIRED ? 'bg-pula-100 dark:bg-pula-900/50 text-pula-700 dark:text-pula-300 border dark:border-pula-800' :
                        a.status === ApplicationStatus.REJECTED ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border dark:border-red-800' :
                        'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border dark:border-gray-600'
                      }`}>
                        {a.status}
                      </div>
                    </div>
                    {a.status === ApplicationStatus.PENDING && (
                      <div className="flex gap-2">
                        <button onClick={() => setState(p => ({ ...p, applications: p.applications.map(app => app.id === a.id ? { ...app, status: ApplicationStatus.HIRED } : app) }))} className="flex-1 bg-pula-600 text-white text-[10px] font-black py-2.5 rounded-xl shadow-md shadow-pula-500/10 active:scale-95 transition-all">HIRED</button>
                        <button onClick={() => setState(p => ({ ...p, applications: p.applications.map(app => app.id === a.id ? { ...app, status: ApplicationStatus.REJECTED } : app) }))} className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-black py-2.5 rounded-xl active:scale-95 transition-all">REJECTED</button>
                      </div>
                    )}
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* --- TAB: Skills --- */}
        {activeTab === 'learning' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black dark:text-white">Skill Mastery</h2>
                <p className="text-sm text-gray-400">Master of none, becoming master of some.</p>
              </div>
              <button onClick={() => setShowLogModal('addSkill')} className="w-12 h-12 bg-amber-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 active:scale-90 transition-transform">
                <Plus size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {activeSkills.map(skill => {
                const progress = getSkillProgress(skill.id);
                const hours = getSkillHours(skill.id);
                return (
                  <div key={skill.id} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-black group-hover:text-amber-600 transition-colors text-lg dark:text-gray-100">{skill.name}</h4>
                          {skill.isDefault && <Star size={14} className="text-amber-400 fill-amber-400" />}
                        </div>
                        <div className="flex gap-3">
                           <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg border border-amber-100 dark:border-amber-800/50">{skill.level}</span>
                           <span className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1 tracking-wide">
                             <Target size={10} /> {hours} / {skill.goalHours}h Goal
                           </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => updateSkill(skill.id, { status: 'archived' })} className="p-3 bg-gray-50 dark:bg-gray-700 text-gray-400 rounded-2xl hover:text-red-500 transition-colors active:scale-90">
                          <Archive size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-4 border border-gray-50 dark:border-gray-900">
                      <div className="h-full bg-amber-500 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                    </div>

                    <div className="flex gap-2">
                       <button 
                         onClick={() => { setSelectedSkillId(skill.id); setShowLogModal('skill'); }} 
                         className="flex-1 bg-amber-600 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all"
                       >
                         <Timer size={18} /> Log Study Time
                       </button>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center">
                       <p className="text-[10px] text-gray-400 italic truncate max-w-[180px]">{skill.resources || 'No resources added'}</p>
                       <span className="text-xs font-black text-amber-600">{progress}% Complete</span>
                    </div>
                  </div>
                );
              })}
              {activeSkills.length === 0 && (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-gray-700">
                   <p className="text-gray-400 font-medium tracking-wide">No active skills. Let's add one!</p>
                </div>
              )}
            </div>
            
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-5 rounded-3xl border border-amber-100 dark:border-amber-800/50 flex gap-4 items-start shadow-sm">
              <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
                Research says learning for 30 mins daily builds a career in 2 years. Start with 10 mins!
              </p>
            </div>
          </div>
        )}

        {/* --- TAB: Settings/Goals --- */}
        {activeTab === 'settings' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="p-6 bg-gray-50/50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-black flex items-center gap-3 dark:text-white"><Settings size={18} /> Settings</h3>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly Target (Pula)</label>
                    <span className="font-black text-pula-600">{formatPula(state.monthlyGoalMin)}</span>
                  </div>
                  <input type="range" min="500" max="10000" step="100" value={state.monthlyGoalMin} onChange={(e) => setState(p => ({ ...p, monthlyGoalMin: parseInt(e.target.value) }))} className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pula-600" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Savings Goal (%)</label>
                    <span className="font-black text-calm-600">{state.savingsRate}%</span>
                  </div>
                  <input type="range" min="0" max="100" step="5" value={state.savingsRate} onChange={(e) => setState(p => ({ ...p, savingsRate: parseInt(e.target.value) }))} className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-calm-600" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
               <button onClick={() => setShowLogModal('weeklyGoal')} className="w-full flex items-center justify-between p-4 bg-pula-50/50 dark:bg-pula-900/20 rounded-2xl mb-4 group active:scale-[0.98] transition-transform border dark:border-pula-900/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-pula-600 shadow-sm group-active:scale-90 transition-transform">
                      <Target size={20} />
                    </div>
                    <span className="font-bold dark:text-gray-100">Add Weekly Goal</span>
                  </div>
                  <Plus size={20} className="text-pula-600" />
               </button>
               
               <div className="space-y-4 px-2">
                 {state.weeklyGoals[weekNum]?.map((goal, i) => (
                    <div key={i} className="flex gap-3 items-center text-sm font-medium text-gray-600 dark:text-gray-300">
                       <ArrowRight size={14} className="text-pula-500" />
                       {goal}
                    </div>
                 ))}
                 {(!state.weeklyGoals[weekNum] || state.weeklyGoals[weekNum].length === 0) && (
                   <p className="text-xs text-center text-gray-400 italic py-2">No weekly goals set yet.</p>
                 )}
               </div>
            </div>

            <div className="flex flex-col gap-3">
               <button onClick={exportData} className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm active:scale-[0.98] transition-all">
                  <div className="flex items-center gap-4">
                    <Download className="text-calm-600" />
                    <span className="font-bold dark:text-gray-100">Backup Your Progress</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
               </button>
               <button 
                 onClick={resetApp} 
                 className="flex items-center justify-between p-6 bg-red-50/50 dark:bg-red-900/20 rounded-3xl border border-red-100 dark:border-red-900/40 text-red-600 active:scale-[0.98] transition-all"
               >
                  <div className="flex items-center gap-4">
                    <Trash2 />
                    <span className="font-bold">Reset Tracker</span>
                  </div>
                  <ChevronRight size={18} className="text-red-300" />
               </button>
            </div>
            
            <p className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-[0.2em] pt-4">Botswana Hustle Tracker v2.0</p>
          </div>
        )}
      </main>

      {/* --- MODALS --- */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[3rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300 relative max-h-[90vh] overflow-y-auto scrollbar-hide">
            <button onClick={() => { setShowLogModal(null); setSelectedSkillId(null); }} className="absolute top-6 right-8 text-gray-300 hover:text-gray-500 transition-colors">
              <ChevronDown size={28} />
            </button>
            <div className="w-12 h-1.5 bg-gray-100 dark:bg-gray-800/80 rounded-full mx-auto mb-10" />
            
            {showLogModal === 'earning' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                addEarning({
                  date: todayKey,
                  source: (fd.get('source') as string) || 'Misc',
                  amount: parseFloat(fd.get('amount') as string) || 0,
                  notes: (fd.get('notes') as string) || ''
                });
              }} className="space-y-6">
                <h2 className="text-3xl font-black mb-2 dark:text-white">Logged! 💰</h2>
                <p className="text-sm text-gray-400 font-medium mb-6">Every Pula counts towards your freedom.</p>
                <div className="space-y-4">
                  <input name="source" required placeholder="Platform/Client (e.g. Fiverr)" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-pula-500 font-bold dark:text-white" />
                  <input name="amount" type="number" step="0.01" required placeholder="Amount (P)" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-pula-500 font-bold text-xl dark:text-white" />
                  <textarea name="notes" placeholder="Any details?" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-pula-500 font-medium h-28 dark:text-white" />
                </div>
                <button type="submit" className="w-full bg-pula-600 text-white p-6 rounded-2xl font-black text-lg shadow-xl shadow-pula-500/20 active:scale-95 transition-transform">Save Earning</button>
              </form>
            )}

            {showLogModal === 'application' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                addApplication({
                  platform: (fd.get('platform') as string) || 'Unknown',
                  jobTitle: (fd.get('title') as string) || 'Role',
                  date: todayKey,
                  status: ApplicationStatus.PENDING
                });
              }} className="space-y-6">
                <h2 className="text-3xl font-black mb-2 dark:text-white">Applied! 📄</h2>
                <p className="text-sm text-gray-400 font-medium mb-6">Seeds planted today are harvests tomorrow.</p>
                <div className="space-y-4">
                  <input name="platform" required placeholder="Where? (e.g. Upwork, Facebook)" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-calm-500 font-bold dark:text-white" />
                  <input name="title" required placeholder="Job Title (e.g. Virtual Assistant)" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-calm-500 font-bold dark:text-white" />
                </div>
                <button type="submit" className="w-full bg-calm-600 text-white p-6 rounded-2xl font-black text-lg shadow-xl shadow-calm-500/20 active:scale-95 transition-transform">Log Application</button>
              </form>
            )}

            {showLogModal === 'addSkill' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                addSkill({
                  name: fd.get('name') as string,
                  goalHours: parseInt(fd.get('goal') as string) || 0,
                  resources: fd.get('resources') as string,
                  level: SkillLevel.BEGINNER,
                  isDefault: false
                });
              }} className="space-y-6">
                <h2 className="text-3xl font-black mb-2 dark:text-white">New Path 🚀</h2>
                <p className="text-sm text-gray-400 font-medium mb-6">What mountain are we climbing today?</p>
                <div className="space-y-4">
                  <input name="name" required placeholder="Skill Name (e.g. Welding, Python)" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-amber-500 font-bold dark:text-white" />
                  <input name="goal" type="number" required placeholder="Total Goal (Hours)" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-amber-500 font-bold dark:text-white" />
                  <input name="resources" placeholder="Resources (Links, Books...)" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-amber-500 font-medium dark:text-white" />
                </div>
                <button type="submit" className="w-full bg-amber-600 text-white p-6 rounded-2xl font-black text-lg shadow-xl shadow-amber-500/20 active:scale-95 transition-transform">Create Skill</button>
              </form>
            )}

            {showLogModal === 'skill' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                if (selectedSkillId) {
                  addSkillLog({
                    skillId: selectedSkillId,
                    date: todayKey,
                    durationMinutes: parseInt(fd.get('mins') as string) || 0,
                    tutorialName: fd.get('desc') as string,
                    notes: fd.get('notes') as string
                  });
                }
              }} className="space-y-6">
                <h2 className="text-3xl font-black mb-2 dark:text-white">Leveled Up! ⚡</h2>
                <p className="text-sm text-gray-400 font-medium mb-6">Study hard, work easier.</p>
                <div className="space-y-4">
                  <input name="mins" type="number" required placeholder="Duration (Minutes)" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-amber-500 font-bold text-xl dark:text-white" />
                  <input name="desc" required placeholder="What did you study?" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-amber-500 font-bold dark:text-white" />
                  <textarea name="notes" placeholder="What did you learn?" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-amber-500 font-medium h-24 dark:text-white" />
                </div>
                <button type="submit" className="w-full bg-amber-600 text-white p-6 rounded-2xl font-black text-lg shadow-xl shadow-amber-500/20 active:scale-95 transition-transform">Log Session</button>
              </form>
            )}

            {showLogModal === 'customBadge' && (
               <form onSubmit={(e) => {
                 e.preventDefault();
                 const fd = new FormData(e.currentTarget);
                 addCustomBadge(fd.get('name') as string, fd.get('icon') as string);
               }} className="space-y-6">
                 <h2 className="text-3xl font-black mb-2 dark:text-white">Celebrate! 🏆</h2>
                 <p className="text-sm text-gray-400 font-medium mb-6">Create your own milestones.</p>
                 <div className="space-y-4">
                    <input name="name" required placeholder="Milestone Name (e.g. First P1000)" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-amber-500 font-bold dark:text-white" />
                    <div className="flex gap-4">
                       <input name="icon" required placeholder="Emoji Icon" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-amber-500 font-bold text-center text-3xl h-20 dark:text-white" />
                    </div>
                 </div>
                 <button type="submit" className="w-full bg-amber-600 text-white p-6 rounded-2xl font-black text-lg shadow-xl shadow-amber-500/20 active:scale-95 transition-transform">Achieve It</button>
               </form>
            )}

            {showLogModal === 'weeklyGoal' && (
               <form onSubmit={(e) => {
                 e.preventDefault();
                 const fd = new FormData(e.currentTarget);
                 addWeeklyGoal(fd.get('goal') as string);
               }} className="space-y-6">
                 <h2 className="text-3xl font-black mb-2 dark:text-white">Aim High 🎯</h2>
                 <p className="text-sm text-gray-400 font-medium mb-6">Focus for Week {weekNum}.</p>
                 <input name="goal" required placeholder="What will you achieve this week?" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 ring-pula-500 font-bold dark:text-white" />
                 <button type="submit" className="w-full bg-pula-600 text-white p-6 rounded-2xl font-black text-lg shadow-xl shadow-pula-500/20 active:scale-95 transition-transform">Set Goal</button>
               </form>
            )}

            {showLogModal === 'weeklyReview' && (
              <div className="space-y-8">
                 <div>
                    <h2 className="text-3xl font-black mb-1 dark:text-white">Week {weekNum} Snapshot</h2>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Growth Summary</p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-pula-50 dark:bg-pula-900/30 p-6 rounded-3xl border border-pula-100 dark:border-pula-800/60 shadow-sm">
                       <p className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-wider">Earned</p>
                       <p className="text-2xl font-black text-pula-600 dark:text-pula-400">{formatPula(totalEarnings)}</p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/30 p-6 rounded-3xl border border-amber-100 dark:border-amber-800/60 shadow-sm">
                       <p className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-wider">Studied</p>
                       <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{totalHours}h</p>
                    </div>
                 </div>

                 <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50">
                    <h4 className="font-bold text-sm mb-3 flex items-center gap-2 dark:text-gray-300">
                       <History size={14} className="text-gray-400" /> Skill Breakdown
                    </h4>
                    <div className="space-y-2">
                       {activeSkills.map(s => (
                          <div key={s.id} className="flex justify-between text-xs font-medium">
                             <span className="text-gray-500 dark:text-gray-400">{s.name}</span>
                             <span className="font-bold text-gray-900 dark:text-white">{getSkillHours(s.id)}h</span>
                          </div>
                       ))}
                    </div>
                 </div>

                 <button onClick={() => setShowLogModal(null)} className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-6 rounded-2xl font-black text-lg active:scale-95 transition-transform shadow-xl shadow-gray-500/10">Back to Work</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 pb-6 pt-3 z-40 max-w-md mx-auto shadow-2xl">
        <div className="flex justify-between items-center gap-1">
          <TabButton id="dashboard" icon={LayoutDashboard} label="Home" />
          <TabButton id="tasks" icon={CheckSquare} label="Habits" />
          <TabButton id="earnings" icon={Wallet} label="Money" />
          <TabButton id="apps" icon={Briefcase} label="Apps" />
          <TabButton id="learning" icon={BookOpen} label="Skills" />
          <TabButton id="settings" icon={Settings} label="Goals" />
        </div>
      </nav>
    </div>
  );
};

export default App;
