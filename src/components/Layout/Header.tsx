import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import logo from "../../assets/logo.png";
import { storage } from "../../utils/storage";

interface HeaderProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onThemeToggle,
  isDarkMode,
}) => {
  const location = useLocation();
  const stats = storage.getUserStats();

  const navItems = [
    { path: "/", label: "Practice" },
    { path: "/stats", label: "Statistics" },
    { path: "/achievements", label: "Achievements" },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-1">
              {/* <Keyboard className="w-6 h-6 text-primary dark:text-secondary" /> */}
              <img src={logo} className="w-12 h-12" alt="" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                typingfury
              </span>
            </Link>

            <nav className="hidden md:flex space-x-4">
              {navItems.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === path
                      ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Streak Display */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-2 text-sm"
            >
              <span className="text-2xl">🔥</span>
              <span className="font-mono text-gray-600 dark:text-gray-300">
                {stats.streaks.current} day streak
              </span>
            </motion.div>

            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === path
                  ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
