import React from "react";
import { motion } from "framer-motion";
import { storage } from "../../utils/storage";

export const StatsOverview: React.FC = () => {
  const stats = storage.getUserStats();
  const { personalBests, overallStats, streaks } = stats;

  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Personal Bests */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(personalBests).map(([duration, wpm]) => (
          <motion.div
            key={duration}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-blue-500">
              {formatNumber(wpm)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {duration.replace("wpm", "")}s Best WPM
            </div>
          </motion.div>
        ))}
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
        >
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Total Tests
          </div>
          <div className="text-2xl font-bold text-purple-500">
            {formatNumber(overallStats.totalTests)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
        >
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Average WPM
          </div>
          <div className="text-2xl font-bold text-green-500">
            {formatNumber(overallStats.averageWpm)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
        >
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Average Accuracy
          </div>
          <div className="text-2xl font-bold text-blue-500">
            {formatNumber(overallStats.averageAccuracy)}%
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
        >
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Total Time
          </div>
          <div className="text-2xl font-bold text-yellow-500">
            {formatTime(overallStats.totalTime)}
          </div>
        </motion.div>
      </div>

      {/* Streak Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Current Streak
              </div>
              <div className="text-2xl font-bold text-red-500">
                {streaks.current} days
              </div>
            </div>
            <span className="text-3xl">🔥</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Longest Streak
              </div>
              <div className="text-2xl font-bold text-orange-500">
                {streaks.longest} days
              </div>
            </div>
            <span className="text-3xl">🏆</span>
          </div>
        </motion.div>
      </div>

      {/* Last Test Date */}
      {streaks.lastTestDate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-gray-500 dark:text-gray-400"
        >
          Last test completed on{" "}
          {new Date(streaks.lastTestDate).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </motion.div>
      )}
    </div>
  );
};
