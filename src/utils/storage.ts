import { UserStats, TestResult, Achievement } from "../types";

const STORAGE_KEYS = {
  USER_STATS: "typefury_user_stats",
  TEST_HISTORY: "typefury_test_history",
  ACHIEVEMENTS: "typefury_achievements",
  PREFERENCES: "typefury_preferences",
} as const;

const DEFAULT_USER_STATS: UserStats = {
  personalBests: {
    wpm15s: 0,
    wpm30s: 0,
    wpm60s: 0,
    wpm120s: 0,
    wpm300s: 0,
  },
  overallStats: {
    totalTests: 0,
    averageWpm: 0,
    averageAccuracy: 0,
    totalTime: 0,
    averageCompletion: 0,
  },
  streaks: {
    current: 0,
    longest: 0,
    lastTestDate: null,
  },
  testHistory: [],
  achievements: [],
  preferences: {
    theme: "light",
    soundEnabled: true,
  },
};

export const storage = {
  getUserStats: (): UserStats => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_STATS);
      return data ? JSON.parse(data) : DEFAULT_USER_STATS;
    } catch (error) {
      console.error("Error reading user stats:", error);
      return DEFAULT_USER_STATS;
    }
  },

  saveUserStats: (stats: UserStats): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
    } catch (error) {
      console.error("Error saving user stats:", error);
    }
  },

  addTestResult: (result: TestResult): void => {
    try {
      const stats = storage.getUserStats();
      stats.testHistory.unshift(result);
      // Keep only last 100 test results
      if (stats.testHistory.length > 100) {
        stats.testHistory = stats.testHistory.slice(0, 100);
      }

      // Update personal bests
      const durationKey =
        `wpm${result.duration}s` as keyof typeof stats.personalBests;
      if (result.wpm > stats.personalBests[durationKey]) {
        stats.personalBests[durationKey] = result.wpm;
      }

      // Update overall stats
      stats.overallStats.totalTests += 1;
      stats.overallStats.totalTime += result.duration;
      stats.overallStats.averageWpm =
        (stats.overallStats.averageWpm * (stats.overallStats.totalTests - 1) +
          result.wpm) /
        stats.overallStats.totalTests;
      stats.overallStats.averageAccuracy =
        (stats.overallStats.averageAccuracy *
          (stats.overallStats.totalTests - 1) +
          result.accuracy) /
        stats.overallStats.totalTests;
      if (!stats.overallStats.averageCompletion)
        stats.overallStats.averageCompletion = 0;
      stats.overallStats.averageCompletion =
        (stats.overallStats.averageCompletion *
          (stats.overallStats.totalTests - 1) +
          (result.completion || 0)) /
        stats.overallStats.totalTests;

      // Update streak
      const today = new Date().toISOString().split("T")[0];
      const lastTestDate = stats.streaks.lastTestDate;

      if (!lastTestDate) {
        stats.streaks.current = 1;
      } else {
        const lastDate = new Date(lastTestDate).toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .split("T")[0];

        if (lastDate === yesterday) {
          stats.streaks.current += 1;
        } else if (lastDate !== today) {
          stats.streaks.current = 1;
        }
      }

      stats.streaks.lastTestDate = today;
      if (stats.streaks.current > stats.streaks.longest) {
        stats.streaks.longest = stats.streaks.current;
      }

      storage.saveUserStats(stats);
    } catch (error) {
      console.error("Error adding test result:", error);
    }
  },

  updateAchievements: (achievements: Achievement[]): void => {
    try {
      const stats = storage.getUserStats();
      stats.achievements = achievements;
      storage.saveUserStats(stats);
    } catch (error) {
      console.error("Error updating achievements:", error);
    }
  },

  updatePreferences: (preferences: UserStats["preferences"]): void => {
    try {
      const stats = storage.getUserStats();
      stats.preferences = preferences;
      storage.saveUserStats(stats);
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  },

  clearAllData: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach((key) =>
        localStorage.removeItem(key)
      );
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  },

  exportData: (): string => {
    try {
      const stats = storage.getUserStats();
      return JSON.stringify(stats, null, 2);
    } catch (error) {
      console.error("Error exporting data:", error);
      return "";
    }
  },

  importData: (data: string): boolean => {
    try {
      const parsed = JSON.parse(data) as UserStats;
      storage.saveUserStats(parsed);
      return true;
    } catch (error) {
      console.error("Error importing data:", error);
      return false;
    }
  },
};
