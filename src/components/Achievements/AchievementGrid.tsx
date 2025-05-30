import React from "react";
import { motion } from "framer-motion";
import { useAchievements } from "../../hooks/useAchievements";
import { AchievementCard } from "./AchievementCard";

export const AchievementGrid: React.FC = () => {
  const { achievements } = useAchievements();

  // Group achievements by type
  const groupedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.type]) {
      acc[achievement.type] = [];
    }
    acc[achievement.type].push(achievement);
    return acc;
  }, {} as Record<string, typeof achievements>);

  const achievementTypes = [
    { type: "speed", title: "Speed Milestones", icon: "⚡" },
    { type: "accuracy", title: "Accuracy Awards", icon: "🎯" },
    { type: "streak", title: "Streak Achievements", icon: "🔥" },
    { type: "volume", title: "Volume Badges", icon: "📝" },
    { type: "explorer", title: "Explorer Badges", icon: "🗺️" },
    { type: "completion", title: "Completion Mastery", icon: "🏁" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
      {achievementTypes.map(({ type, title, icon }) => (
        <div key={type} className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{icon}</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {groupedAchievements[type]?.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </motion.div>
        </div>
      ))}

      {/* Achievement Stats */}
      <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-500">
              {achievements.filter((a) => a.unlockedAt).length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Achievements Unlocked
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-500">
              {Math.round(
                (achievements.filter((a) => a.unlockedAt).length /
                  achievements.length) *
                  100
              )}
              %
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Completion Rate
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-500">
              {
                achievements.filter((a) => a.type === "speed" && a.unlockedAt)
                  .length
              }
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Speed Badges
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-500">
              {
                achievements.filter((a) => a.type === "streak" && a.unlockedAt)
                  .length
              }
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Streak Badges
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
