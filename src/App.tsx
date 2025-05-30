import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";
import { TypingTest } from "./components/TypingTest/TypingTest";
import { TestControls } from "./components/TypingTest/TestControls";
import { StatsOverview } from "./components/Dashboard/StatsOverview";
import { TestHistory } from "./components/Dashboard/TestHistory";
import { AchievementGrid } from "./components/Achievements/AchievementGrid";
import { TestDuration, TextContent } from "./types";
import { useTextContent } from "./hooks/useTextContent";
import { Keyboard, Laptop, Tablet } from "lucide-react";
import { ResultsModal } from "./components/TypingTest/ResultsModal";
import { Analytics } from "@vercel/analytics/react";

const PracticePage: React.FC = () => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<TestDuration>(60);
  const [selectedCategory, setSelectedCategory] = useState<string>("quotes");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<TextContent["difficulty"]>("medium");
  const { content, isLoading, error, fetchContent } = useTextContent();
  const [results, setResults] = useState<null | {
    wpm: number;
    accuracy: number;
    mistakes: number;
    time: number;
    completion: number;
  }>(null);

  const handleStartTest = async () => {
    if (!isTestActive) {
      await fetchContent(selectedCategory, selectedDifficulty);
      setIsTestActive(true);
    }
  };

  const handleTestComplete = (result: {
    wpm: number;
    accuracy: number;
    mistakes: number;
    time: number;
    completion: number;
  }) => {
    setIsTestActive(false);
    setResults(result);
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

  const handleCloseModal = () => {
    setResults(null);
  };

  // Simple mobile interface component
  const MobileInterface = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6 text-center">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md border border-white/20">
        <div className="text-4xl mb-6 flex justify-center">
          <Keyboard className="w-12 h-12 text-primary dark:text-secondary" />
        </div>
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Keyboard className="w-8 h-8 text-primary dark:text-secondary" />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TypeFury Desktop Only
          </span>
        </h2>
        <div className="space-y-4 text-gray-200">
          <p className="text-lg">
            TypeFury is a precision typing experience designed for the full
            keyboard experience.
          </p>
          <div className="bg-white/5 p-4 rounded-xl space-y-3">
            <p className="flex items-center gap-2 text-gray-100">
              <Laptop className="w-5 h-5 text-primary dark:text-secondary" />
              Desktop or laptop recommended
            </p>
            <p className="flex items-center gap-2 text-gray-100">
              <Keyboard className="w-5 h-5 text-primary dark:text-secondary" />
              External keyboard required
            </p>
            <p className="flex items-center gap-2 text-gray-100">
              <Tablet className="w-5 h-5 text-primary dark:text-secondary" />
              iPad with keyboard works too!
            </p>
          </div>
          <p className="text-sm text-gray-400 italic">
            "The best typing experience deserves the best setup"
          </p>
        </div>
      </div>
    </div>
  );

  // Render mobile interface on small screens, desktop interface on larger screens
  return (
    <>
      {/* Results Modal */}
      <ResultsModal
        isOpen={!!results}
        onClose={handleCloseModal}
        wpm={results?.wpm || 0}
        accuracy={results?.accuracy || 0}
        mistakes={results?.mistakes || 0}
        completion={results?.completion || 0}
      />
      {/* Mobile */}
      <div className="md:hidden">
        <MobileInterface />
      </div>
      {/* Desktop */}
      <div className="hidden md:block max-w-5xl mx-auto p-4">
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
                onClick={() =>
                  fetchContent(selectedCategory, selectedDifficulty)
                }
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
                Select your preferences above and click Start to begin your
                typing practice.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
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
      <Analytics />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PracticePage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="achievements" element={<AchievementGrid />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
