export function formattedDate(date: Date): string {
  return date.toLocaleString("en-US").split(",")[0];
}

const getDateInPST = (date: Date): Date => {
  return new Date(
    date.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    })
  );
};

export interface Streak {
  currentCount: number;
  startDate: string;
  lastLoginDate: string;
}

export const buildStreak = (
  date: Date,
  overrideDefaults?: Partial<Streak>
): Streak => {
  const defaultStreak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  };

  return {
    ...defaultStreak,
    ...overrideDefaults,
  };
};
