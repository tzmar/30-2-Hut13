
export const formatPula = (amount: number) => {
  return new Intl.NumberFormat('en-BW', {
    style: 'currency',
    currency: 'BWP',
    minimumFractionDigits: 2
  }).format(amount).replace('BWP', 'P');
};

export const getDateKey = (date: Date = new Date()) => {
  return date.toISOString().split('T')[0];
};

export const getWeekNumber = (startDate: string) => {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.min(4, Math.ceil(diffDays / 7) || 1);
};

export const calculateStreak = (completedTasks: Record<string, string[]>) => {
  const dates = Object.keys(completedTasks).sort().reverse();
  if (dates.length === 0) return 0;
  
  let streak = 0;
  let curr = new Date();
  
  // Check today or yesterday as start
  const todayKey = getDateKey(curr);
  const yesterday = new Date(curr);
  yesterday.setDate(curr.getDate() - 1);
  const yesterdayKey = getDateKey(yesterday);

  if (!completedTasks[todayKey] && !completedTasks[yesterdayKey]) return 0;

  let checkDate = completedTasks[todayKey] ? curr : yesterday;

  while (true) {
    const key = getDateKey(checkDate);
    if (completedTasks[key] && completedTasks[key].length > 0) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
};
