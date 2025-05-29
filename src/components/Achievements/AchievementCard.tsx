import React from "react";
import { motion } from "framer-motion";
import { Achievement } from "../../types";

interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
}) => {
  const isUnlocked = !!achievement.unlockedAt;
  const progress = Math.min(achievement.progress, achievement.target);
  const progressPercentage = (progress / achievement.target) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative p-4 rounded-lg border ${
        isUnlocked
          ? "bg-white dark:bg-gray-800 border-green-500"
          : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
      }`}
    >
      {/* Achievement Icon */}
      <div className="flex items-center space-x-3 mb-3">
        <span className="text-3xl">{achievement.icon}</span>
        <div>
          <h3
            className={`font-semibold ${
              isUnlocked
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {achievement.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {achievement.description}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-full ${isUnlocked ? "bg-green-500" : "bg-blue-500"}`}
        />
      </div>

      {/* Progress Text */}
      <div className="mt-2 flex justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">
          {progress} / {achievement.target}
        </span>
        {isUnlocked && (
          <span className="text-green-500">
            Unlocked {new Date(achievement.unlockedAt!).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Unlock Badge */}
      {isUnlocked && (
        <div className="absolute top-2 right-2">
          <span className="text-green-500 text-2xl">✓</span>
        </div>
      )}
    </motion.div>
  );
};
