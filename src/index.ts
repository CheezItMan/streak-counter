import { buildStreak, formattedDate, Streak } from "./lib";

const ONE_DAY = 1000 * 60 * 60 * 24;
const KEY = "streak";

const streakExists = (
  streakInLocalStorage: string | null
): streakInLocalStorage is string => {
  return streakInLocalStorage !== null && streakInLocalStorage !== "";
};

type IncrementOrReset = "increment" | "reset" | undefined;

const shouldIncrementOrResetStreakCount = (
  currentDate: string,
  lastLoginDate: string
): IncrementOrReset => {
  const difference =
    parseInt(currentDate.split("/")[1]) - parseInt(lastLoginDate.split("/")[1]);

  if (difference === 1) {
    return "increment";
  }

  if (difference > 1) {
    return "reset";
  }
};

export const streakCounter = (_localStorage: Storage, date: Date): Streak => {
  const oldStreakString = _localStorage.getItem(KEY);
  let streak: Streak;
  if (streakExists(oldStreakString)) {
    const oldStreak = JSON.parse(oldStreakString);
    streak = buildStreak(date, oldStreak);

    const incrementOrReset = shouldIncrementOrResetStreakCount(
      formattedDate(date),
      oldStreak.lastLoginDate
    );

    if (incrementOrReset === "increment") {
      streak.currentCount += 1;
    } else if (incrementOrReset === "reset") {
      streak.currentCount = 1;
      streak.startDate = formattedDate(date);
    }

    streak.lastLoginDate = formattedDate(date);
  } else {
    streak = buildStreak(date);
  }

  _localStorage.setItem(KEY, JSON.stringify(streak));
  return streak;
};
