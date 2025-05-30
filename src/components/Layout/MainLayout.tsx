import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen">
      {/* Mobile Layout - No header/footer, just the content */}
      <div className="md:hidden">
        <Outlet />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
        <Header onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
