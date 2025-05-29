import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTextContent } from "../../hooks/useTextContent";
import { TypingTest } from "../TypingTest/TypingTest";
import { TestControls } from "../TypingTest/TestControls";
import { TextContent } from "../../types";
import { format } from "date-fns";

export const DailyChallenge: React.FC = () => {
  const { content, isLoading, error, fetchDailyContent } = useTextContent();
  const [isTestActive, setIsTestActive] = useState(false);
  const [testResult, setTestResult] = useState<{
    wpm: number;
    accuracy: number;
    time: number;
  } | null>(null);

  useEffect(() => {
    fetchDailyContent();
  }, [fetchDailyContent]);

  const handleStartTest = () => {
    setIsTestActive(true);
    setTestResult(null);
  };

  const handleTestComplete = (result: {
    wpm: number;
    accuracy: number;
    time: number;
  }) => {
    setIsTestActive(false);
    setTestResult(result);
    // Here you would typically save the result to the user's statistics
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Error Loading Challenge
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
        <button
          onClick={() => fetchDailyContent()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          No Challenge Available
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please try again later.
        </p>
      </div>
    );
  }

  const today = format(new Date(), "MMMM d, yyyy");

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Daily Challenge
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{today}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {content.category}
            </span>
            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
              {content.difficulty}
            </span>
          </div>
        </div>

        {!isTestActive && !testResult && (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Ready for Today's Challenge?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Test your typing skills with today's specially curated content.
            </p>
            <button
              onClick={handleStartTest}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start Challenge
            </button>
          </div>
        )}

        {isTestActive && content && (
          <div className="space-y-6">
            <TestControls
              duration={60}
              onStart={handleStartTest}
              onReset={() => setIsTestActive(false)}
              isTestActive={isTestActive}
            />
            <TypingTest
              text={content}
              duration={60}
              onComplete={handleTestComplete}
              isTestActive={isTestActive}
            />
          </div>
        )}

        {testResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Challenge Complete!
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">WPM</p>
                <p className="text-2xl font-bold text-primary">
                  {testResult.wpm}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Accuracy
                </p>
                <p className="text-2xl font-bold text-secondary">
                  {testResult.accuracy}%
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {testResult.time}s
                </p>
              </div>
            </div>
            <button
              onClick={handleStartTest}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
