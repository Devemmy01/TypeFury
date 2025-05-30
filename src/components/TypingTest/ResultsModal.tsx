import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  wpm: number;
  accuracy: number;
  mistakes: number;
  completion: number;
}

const shareText = (wpm: number, accuracy: number) =>
  `I just scored ${wpm} WPM with ${accuracy}% accuracy on TypeFury! Try to beat my score at https://typefury.app 🚀`;

export const ResultsModal: React.FC<ResultsModalProps> = ({
  isOpen,
  onClose,
  wpm,
  accuracy,
  mistakes,
  completion,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const url = encodeURIComponent("https://typefury.app");
  const text = encodeURIComponent(shareText(wpm, accuracy));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText(wpm, accuracy));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-xl w-full border border-primary/30"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-300" />
        </button>

        {/* Celebration */}
        <div className="flex flex-col items-center mb-6">
          <span className="text-5xl">🎉</span>
          <h2 className="text-2xl font-bold mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Typing Test Complete!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-center">
            You just unleashed your typing fury!
          </p>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
            <div className="text-sm text-gray-500 dark:text-gray-400">WPM</div>
            <div className="text-3xl font-bold text-primary">{wpm}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Accuracy
            </div>
            <div className="text-3xl font-bold text-secondary">{accuracy}%</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Mistakes
            </div>
            <div className="text-3xl font-bold text-red-500">{mistakes}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Completion
            </div>
            <div className="text-3xl font-bold text-blue-500">
              {completion}%
            </div>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex flex-row-reverse gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center w-full justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold"
          >
            {copied ? (
              <span>Copied!</span>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy Link
              </>
            )}
          </button>
          <a
            href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition-colors text-lg font-semibold w-full"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            Share on Twitter
          </a>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Powered by TypeFury</p>
          <p className="mt-1">typefury.app</p>
        </div>
      </motion.div>
    </motion.div>
  );
};
