import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";
import { TypingTest } from "./components/TypingTest/TypingTest";
import { TestControls } from "./components/TypingTest/TestControls";
import { DailyChallenge } from "./components/DailyChallenge/DailyChallenge";
import { StatsOverview } from "./components/Dashboard/StatsOverview";
import { TestHistory } from "./components/Dashboard/TestHistory";
import { AchievementGrid } from "./components/Achievements/AchievementGrid";
import { TestDuration, TextContent } from "./types";
import { useTextContent } from "./hooks/useTextContent";

const PracticePage: React.FC = () => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<TestDuration>(60);
  const [selectedCategory, setSelectedCategory] = useState<string>("quotes");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<TextContent["difficulty"]>("medium");
  const { content, isLoading, error, fetchContent } = useTextContent();

  const handleStartTest = async () => {
    if (!isTestActive) {
      await fetchContent(selectedCategory, selectedDifficulty);
      setIsTestActive(true);
    }
  };

  const handleTestComplete = (result: {
    wpm: number;
    accuracy: number;
    time: number;
  }) => {
    setIsTestActive(false);
    // Here you would typically save the result to the user's statistics
  };

  const handleReset = () => {
    setIsTestActive(false);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (isTestActive) {
      setIsTestActive(false);
    }
  };

  const handleDifficultyChange = (difficulty: TextContent["difficulty"]) => {
    setSelectedDifficulty(difficulty);
    if (isTestActive) {
      setIsTestActive(false);
    }
  };

  const handleDurationChange = (duration: TestDuration) => {
    setSelectedDuration(duration);
    if (isTestActive) {
      setIsTestActive(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <TestControls
          duration={selectedDuration}
          onStart={handleStartTest}
          onReset={handleReset}
          isTestActive={isTestActive}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          onCategoryChange={handleCategoryChange}
          onDifficultyChange={handleDifficultyChange}
          onDurationChange={handleDurationChange}
        />

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              Error Loading Content
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
            <button
              onClick={() => fetchContent(selectedCategory, selectedDifficulty)}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : content && isTestActive ? (
          <TypingTest
            text={content}
            duration={selectedDuration}
            onComplete={handleTestComplete}
            isTestActive={isTestActive}
          />
        ) : (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Ready to Practice?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Select your preferences above and click Start to begin your typing
              practice.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const StatsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <StatsOverview />
      <TestHistory />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PracticePage />} />
          <Route path="daily" element={<DailyChallenge />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="achievements" element={<AchievementGrid />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
