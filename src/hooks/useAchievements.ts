import { useCallback, useEffect, useState } from "react";
import { Achievement, UserStats } from "../types";
import { storage } from "../utils/storage";

const ACHIEVEMENTS: Achievement[] = [
  // Speed milestones
  {
    id: "speed_20",
    title: "Getting Started",
    description: "Reach 20 WPM in any test",
    type: "speed",
    unlockedAt: null,
    progress: 0,
    target: 20,
    icon: "🚀",
  },
  {
    id: "speed_30",
    title: "Speed Demon",
    description: "Reach 30 WPM in any test",
    type: "speed",
    unlockedAt: null,
    progress: 0,
    target: 30,
    icon: "⚡",
  },
  {
    id: "speed_40",
    title: "Typing Pro",
    description: "Reach 40 WPM in any test",
    type: "speed",
    unlockedAt: null,
    progress: 0,
    target: 40,
    icon: "🏆",
  },
  {
    id: "speed_50",
    title: "Master Typist",
    description: "Reach 50 WPM in any test",
    type: "speed",
    unlockedAt: null,
    progress: 0,
    target: 50,
    icon: "👑",
  },
  {
    id: "speed_60",
    title: "Legendary Speed",
    description: "Reach 60 WPM in any test",
    type: "speed",
    unlockedAt: null,
    progress: 0,
    target: 60,
    icon: "🌟",
  },

  // Accuracy achievements
  {
    id: "accuracy_95",
    title: "Precision",
    description: "Achieve 95% accuracy in any test",
    type: "accuracy",
    unlockedAt: null,
    progress: 0,
    target: 95,
    icon: "🎯",
  },
  {
    id: "accuracy_98",
    title: "Sharpshooter",
    description: "Achieve 98% accuracy in any test",
    type: "accuracy",
    unlockedAt: null,
    progress: 0,
    target: 98,
    icon: "🎯",
  },
  {
    id: "accuracy_99",
    title: "Perfect Aim",
    description: "Achieve 99% accuracy in any test",
    type: "accuracy",
    unlockedAt: null,
    progress: 0,
    target: 99,
    icon: "🎯",
  },

  // Streak achievements
  {
    id: "streak_7",
    title: "Week Warrior",
    description: "Maintain a 7-day streak",
    type: "streak",
    unlockedAt: null,
    progress: 0,
    target: 7,
    icon: "🔥",
  },
  {
    id: "streak_30",
    title: "Monthly Master",
    description: "Maintain a 30-day streak",
    type: "streak",
    unlockedAt: null,
    progress: 0,
    target: 30,
    icon: "🔥",
  },
  {
    id: "streak_100",
    title: "Century Club",
    description: "Maintain a 100-day streak",
    type: "streak",
    unlockedAt: null,
    progress: 0,
    target: 100,
    icon: "🔥",
  },

  // Volume achievements
  {
    id: "tests_100",
    title: "Century Typist",
    description: "Complete 100 typing tests",
    type: "volume",
    unlockedAt: null,
    progress: 0,
    target: 100,
    icon: "📝",
  },
  {
    id: "tests_500",
    title: "Master Typist",
    description: "Complete 500 typing tests",
    type: "volume",
    unlockedAt: null,
    progress: 0,
    target: 500,
    icon: "📝",
  },
  {
    id: "tests_1000",
    title: "Grand Master",
    description: "Complete 1000 typing tests",
    type: "volume",
    unlockedAt: null,
    progress: 0,
    target: 1000,
    icon: "📝",
  },

  // Explorer achievements
  {
    id: "explorer_all",
    title: "Text Explorer",
    description: "Complete tests in all categories",
    type: "explorer",
    unlockedAt: null,
    progress: 0,
    target: 4, // quotes, programming, literature, news
    icon: "🗺️",
  },

  // Completion achievements
  {
    id: "completion_90",
    title: "Almost There!",
    description: "Achieve 90%+ completion in a test",
    type: "completion",
    unlockedAt: null,
    progress: 0,
    target: 90,
    icon: "🏁",
  },
  {
    id: "completion_100",
    title: "Full Fury!",
    description: "Achieve 100% completion in a test",
    type: "completion",
    unlockedAt: null,
    progress: 0,
    target: 100,
    icon: "🔥",
  },
  {
    id: "perfect_run",
    title: "Perfect Run",
    description: "100% completion and 100% accuracy in a test",
    type: "completion",
    unlockedAt: null,
    progress: 0,
    target: 1,
    icon: "💯",
  },
];

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const stats = storage.getUserStats();
    return stats.achievements && stats.achievements.length > 0
      ? stats.achievements
      : ACHIEVEMENTS;
  });

  const checkAchievements = useCallback((stats: UserStats) => {
    const updatedAchievements = [...ACHIEVEMENTS];
    let hasUpdates = false;

    // Check speed achievements
    const maxWpm = Math.max(
      stats.personalBests.wpm15s,
      stats.personalBests.wpm30s,
      stats.personalBests.wpm60s,
      stats.personalBests.wpm120s,
      stats.personalBests.wpm300s
    );

    updatedAchievements.forEach((achievement) => {
      if (achievement.type === "speed" && !achievement.unlockedAt) {
        achievement.progress = maxWpm;
        if (maxWpm >= achievement.target) {
          achievement.unlockedAt = new Date().toISOString();
          hasUpdates = true;
        }
      }
    });

    // Check accuracy achievements
    const maxAccuracy = stats.testHistory.reduce(
      (max, test) => Math.max(max, test.accuracy),
      0
    );

    updatedAchievements.forEach((achievement) => {
      if (achievement.type === "accuracy" && !achievement.unlockedAt) {
        achievement.progress = maxAccuracy;
        if (maxAccuracy >= achievement.target) {
          achievement.unlockedAt = new Date().toISOString();
          hasUpdates = true;
        }
      }
    });

    // Check streak achievements
    updatedAchievements.forEach((achievement) => {
      if (achievement.type === "streak" && !achievement.unlockedAt) {
        achievement.progress = stats.streaks.current;
        if (stats.streaks.current >= achievement.target) {
          achievement.unlockedAt = new Date().toISOString();
          hasUpdates = true;
        }
      }
    });

    // Check volume achievements
    const totalTests = stats.overallStats.totalTests;
    updatedAchievements.forEach((achievement) => {
      if (achievement.type === "volume" && !achievement.unlockedAt) {
        achievement.progress = totalTests;
        if (totalTests >= achievement.target) {
          achievement.unlockedAt = new Date().toISOString();
          hasUpdates = true;
        }
      }
    });

    // Check explorer achievements
    const categories = new Set(
      stats.testHistory.map((test) => test.textCategory)
    );
    updatedAchievements.forEach((achievement) => {
      if (achievement.type === "explorer" && !achievement.unlockedAt) {
        achievement.progress = categories.size;
        if (categories.size >= achievement.target) {
          achievement.unlockedAt = new Date().toISOString();
          hasUpdates = true;
        }
      }
    });

    // Check completion achievements
    const bestCompletion = stats.testHistory.reduce(
      (max, test) => Math.max(max, test.completion || 0),
      0
    );
    updatedAchievements.forEach((achievement) => {
      if (achievement.type === "completion" && !achievement.unlockedAt) {
        if (achievement.id === "perfect_run") {
          // Check for any test with 100% completion and 100% accuracy
          const hasPerfect = stats.testHistory.some(
            (test) => (test.completion || 0) === 100 && test.accuracy === 100
          );
          achievement.progress = hasPerfect ? 1 : 0;
          if (hasPerfect) {
            achievement.unlockedAt = new Date().toISOString();
            hasUpdates = true;
          }
        } else {
          achievement.progress = bestCompletion;
          if (bestCompletion >= achievement.target) {
            achievement.unlockedAt = new Date().toISOString();
            hasUpdates = true;
          }
        }
      }
    });

    if (hasUpdates) {
      storage.updateAchievements(updatedAchievements);
      setAchievements(updatedAchievements);
    } else {
      setAchievements(
        stats.achievements && stats.achievements.length > 0
          ? stats.achievements
          : updatedAchievements
      );
    }
    return updatedAchievements;
  }, []);

  useEffect(() => {
    const stats = storage.getUserStats();
    checkAchievements(stats);
  }, [checkAchievements]);

  return {
    achievements,
    checkAchievements,
  };
};
