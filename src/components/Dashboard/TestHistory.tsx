import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { storage } from "../../utils/storage";
// import { TestResult } from "../../types";

type SortField = "date" | "wpm" | "accuracy" | "duration";
type SortOrder = "asc" | "desc";

export const TestHistory: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");

  const stats = storage.getUserStats();
  const testHistory = stats.testHistory;

  const categories = useMemo(
    () => Array.from(new Set(testHistory.map((test) => test.textCategory))),
    [testHistory]
  );

  const difficulties = useMemo(
    () => Array.from(new Set(testHistory.map((test) => test.textDifficulty))),
    [testHistory]
  );

  const sortedAndFilteredHistory = useMemo(() => {
    let filtered = [...testHistory];

    // Apply filters
    if (filterCategory !== "all") {
      filtered = filtered.filter(
        (test) => test.textCategory === filterCategory
      );
    }
    if (filterDifficulty !== "all") {
      filtered = filtered.filter(
        (test) => test.textDifficulty === filterDifficulty
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "wpm":
          comparison = a.wpm - b.wpm;
          break;
        case "accuracy":
          comparison = a.accuracy - b.accuracy;
          break;
        case "duration":
          comparison = a.duration - b.duration;
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [testHistory, sortField, sortOrder, filterCategory, filterDifficulty]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg dark:text-white"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg dark:text-white"
        >
          <option value="all">All Difficulties</option>
          {difficulties.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* History Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-100">
              <th
                className="px-4 py-3 text-left cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSort("date")}
              >
                Date
                {sortField === "date" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSort("wpm")}
              >
                WPM
                {sortField === "wpm" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSort("accuracy")}
              >
                Accuracy
                {sortField === "accuracy" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSort("duration")}
              >
                Duration
                {sortField === "duration" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Difficulty</th>
              <th className="px-4 py-3 text-left">Mistakes</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredHistory.map((test) => (
              <motion.tr
                key={test.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(test.date)}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-blue-500">
                  {test.wpm}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-green-500">
                  {test.accuracy}%
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {test.duration}s
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {test.textCategory}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {test.textDifficulty}
                </td>
                <td className="px-4 py-3 text-sm text-red-500">
                  {test.mistakes}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Results */}
      {sortedAndFilteredHistory.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No test results found. Start typing to see your history!
        </div>
      )}
    </div>
  );
};
