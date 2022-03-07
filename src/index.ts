interface Streak {
  currentCount: number;
  startDate: string;
  lastLoginDate: string;
}

const KEY = "streak";

const assertStreakExists = (
  streakInLocalStorage: string | null
): streakInLocalStorage is string => {
  return streakInLocalStorage !== null && streakInLocalStorage !== "";
};

export const streakCounter = (_localStorage: Storage, date: Date): Streak => {
  const oldStreakString = _localStorage.getItem(KEY);

  if (assertStreakExists(oldStreakString)) {
    try {
      const streak: Streak = JSON.parse(oldStreakString);
      streak.lastLoginDate = formattedDate(date);
      streak.currentCount++;
      _localStorage.setItem(KEY, JSON.stringify(streak));
      return streak;
    } catch (error) {
      console.log("Failed to parse Streak from localStorage");
    }
  }
  const streak: Streak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  };
  _localStorage.setItem(KEY, JSON.stringify(streak));

  return streak;
};

export function formattedDate(date: Date): string {
  return date.toLocaleString("en-US").split(",")[0];
}
