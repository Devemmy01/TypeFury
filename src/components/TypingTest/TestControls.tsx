import React from "react";
import { TestDuration, TextContent } from "../../types";

interface TestControlsProps {
  duration: TestDuration;
  onStart: () => void;
  onReset: () => void;
  onDurationChange: (duration: TestDuration) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedDifficulty: TextContent["difficulty"];
  onDifficultyChange: (difficulty: TextContent["difficulty"]) => void;
  isTestActive: boolean;
}

const DURATIONS: { value: TestDuration; label: string }[] = [
  { value: 15, label: "15s" },
  { value: 30, label: "30s" },
  { value: 60, label: "1m" },
  { value: 120, label: "2m" },
  { value: 300, label: "5m" },
];

const CATEGORIES = [
  { id: "quotes", label: "Quotes", icon: "💭" },
  { id: "practice", label: "Practice", icon: "✍️" },
  { id: "educational", label: "Educational", icon: "📚" },
  { id: "words", label: "Words", icon: "🔤" },
  { id: "programming", label: "Programming", icon: "💻" },
] as const;

const DIFFICULTIES: {
  value: TextContent["difficulty"];
  label: string;
  icon: string;
}[] = [
  { value: "easy", label: "Easy", icon: "🌱" },
  { value: "medium", label: "Medium", icon: "🌿" },
  { value: "hard", label: "Hard", icon: "🌳" },
];

export const TestControls: React.FC<TestControlsProps> = ({
  duration,
  onStart,
  onReset,
  onDurationChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  isTestActive,
}) => {
  return (
    <div className="hidden md:block w-full max-w-5xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-8">
      {/* Section Headers */}
      <div className="grid grid-cols-3 gap-8">
        {/* Duration Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-3">
            <span role="img" aria-label="timer" className="text-2xl">
              ⏱️
            </span>
            Duration
          </h3>
          <div className="flex flex-wrap gap-3">
            {DURATIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => onDurationChange(value)}
                className={`px-5 py-2.5 rounded-lg transition-all transform hover:scale-105 text-base ${
                  duration === value
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                disabled={isTestActive}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-3">
            <span role="img" aria-label="category" className="text-2xl">
              📋
            </span>
            Category
          </h3>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => onCategoryChange(id)}
                className={`px-5 py-2.5 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2 text-base ${
                  selectedCategory === id
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                disabled={isTestActive}
              >
                <span role="img" aria-label={label} className="text-xl">
                  {icon}
                </span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-3">
            <span role="img" aria-label="difficulty" className="text-2xl">
              🎯
            </span>
            Difficulty
          </h3>
          <div className="flex flex-wrap gap-3">
            {DIFFICULTIES.map(({ value, label, icon }) => (
              <button
                key={value}
                onClick={() => onDifficultyChange(value)}
                className={`px-5 py-2.5 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2 text-base ${
                  selectedDifficulty === value
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                disabled={isTestActive}
              >
                <span role="img" aria-label={label} className="text-xl">
                  {icon}
                </span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Start/Reset Button */}
      <div className="flex justify-center pt-6">
        <button
          onClick={isTestActive ? onReset : onStart}
          className={`px-10 py-4 rounded-lg text-xl font-semibold transition-all transform hover:scale-105 ${
            isTestActive
              ? "bg-red-500 text-white hover:bg-red-600 shadow-md"
              : "bg-primary text-white hover:bg-primary/90 shadow-md"
          }`}
        >
          {isTestActive ? (
            <span className="flex items-center gap-3">
              <span role="img" aria-label="reset" className="text-2xl">
                🔄
              </span>
              Reset Test
            </span>
          ) : (
            <span className="flex items-center gap-3">
              <span role="img" aria-label="start" className="text-2xl">
                ▶️
              </span>
              Start Test
            </span>
          )}
        </button>
      </div>

      {/* Screen Size Warning */}
      <div className="md:hidden fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6 text-center">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md border border-white/20">
          <div className="text-4xl mb-6 animate-bounce">⚡</div>
          <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Desktop Experience Required
          </h2>
          <div className="space-y-4 text-gray-300">
            <p className="text-lg">
              TypeFury is optimized for the full keyboard experience on larger
              screens.
            </p>
            <div className="bg-white/5 p-4 rounded-xl space-y-3">
              <p className="flex items-center gap-2">
                <span className="text-xl">🎯</span>
                Precision typing requires precision tools
              </p>
              <p className="flex items-center gap-2">
                <span className="text-xl">⌨️</span>
                Full keyboard experience
              </p>
              <p className="flex items-center gap-2">
                <span className="text-xl">💻</span>
                Desktop or iPad with keyboard
              </p>
            </div>
            <p className="text-sm text-gray-400 italic">
              "Your typing journey deserves the right tools"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
