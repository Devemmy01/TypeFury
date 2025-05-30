import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTypingTest } from "../../hooks/useTypingTest";
import { TestDuration, TextContent } from "../../types";
import { motion, AnimatePresence } from "framer-motion";

// Add type for webkitAudioContext
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

interface TypingTestProps {
  text: TextContent;
  duration: TestDuration;
  onComplete?: (result: {
    wpm: number;
    accuracy: number;
    mistakes: number;
    time: number;
    completion: number;
  }) => void;
  isTestActive: boolean;
}

export const TypingTest: React.FC<TypingTestProps> = ({
  text,
  duration,
  onComplete,
  isTestActive,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isWarning, setIsWarning] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const {
    isActive,
    isComplete,
    userInput,
    wpm,
    accuracy,
    mistakes,
    startTest,
    handleInput,
    resetTest,
  } = useTypingTest();

  // Create audio context only when needed
  const createAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Initialize audio context
  useEffect(() => {
    // Cleanup function
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  // Start test when component mounts or when isTestActive changes
  useEffect(() => {
    if (isTestActive) {
      startTest(text, duration);
      setTimeLeft(duration);
      setIsWarning(false);
    }
  }, [text, duration, startTest, isTestActive]);

  // Focus input when test becomes active
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  // Handle timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && !isComplete && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = Math.max(0, prev - 1) as TestDuration;
          if (newTime <= 5) {
            setIsWarning(true);
            // Play beep sound when time is running low
            try {
              const audioContext = createAudioContext();
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();

              oscillator.connect(gainNode);
              gainNode.connect(audioContext.destination);

              oscillator.type = "sine";
              oscillator.frequency.setValueAtTime(
                800,
                audioContext.currentTime
              );
              gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

              oscillator.start();
              oscillator.stop(audioContext.currentTime + 0.1);
            } catch (error) {
              console.warn("Could not play beep sound:", error);
            }
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, isComplete, timeLeft]);

  // Handle test completion
  useEffect(() => {
    if (isComplete && onComplete) {
      const totalChars = text.content.length;
      const completion = Math.round((userInput.length / totalChars) * 100);
      const correctChars = userInput.length - mistakes;
      const strictAccuracy =
        totalChars === 0
          ? 100
          : Math.round(
              (Math.max(0, Math.min(userInput.length, correctChars)) /
                totalChars) *
                100
            );
      onComplete({
        wpm,
        accuracy: strictAccuracy,
        mistakes,
        time: duration - timeLeft,
        completion,
      });
    }
  }, [isComplete, onComplete, wpm, mistakes, duration, timeLeft]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow space key to be typed
      if (e.key === " " && !isActive) {
        e.preventDefault();
      }
    },
    [isActive]
  );

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderText = () => {
    const content = text.content;
    const input = userInput;
    const elements: JSX.Element[] = [];

    for (let i = 0; i < content.length; i++) {
      let className = "text-gray-400"; // Default color for untyped text

      if (i < input.length) {
        // Typed text
        className =
          input[i] === content[i]
            ? "text-green-500" // Correct
            : "text-red-500 bg-red-100 dark:bg-red-900/20"; // Incorrect
      } else if (i === input.length) {
        // Current position
        className = "text-blue-500 bg-blue-100 dark:bg-blue-900/20";
      }

      elements.push(
        <span key={i} className={className}>
          {content[i]}
        </span>
      );
    }

    return elements;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8">
      {/* Stats Display */}
      <div className="grid grid-cols-4 gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="text-base text-gray-500 dark:text-gray-400">WPM</div>
          <div className="text-3xl font-bold text-primary">{wpm}</div>
        </div>
        <div className="text-center">
          <div className="text-base text-gray-500 dark:text-gray-400">
            Accuracy
          </div>
          <div className="text-3xl font-bold text-secondary">{accuracy}%</div>
        </div>
        <div className="text-center">
          <div className="text-base text-gray-500 dark:text-gray-400">
            Mistakes
          </div>
          <div className="text-3xl font-bold text-red-500">{mistakes}</div>
        </div>
        <div className="text-center">
          <div className="text-base text-gray-500 dark:text-gray-400">Time</div>
          <div
            className={`text-3xl font-bold transition-colors ${
              isWarning
                ? "text-red-500 animate-pulse"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Text Display */}
      <div
        className="w-full p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg font-mono text-xl leading-relaxed min-h-[250px]"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="whitespace-pre-wrap tracking-wide">{renderText()}</div>
      </div>

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={(e) => handleInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="sr-only"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        disabled={!isActive || isComplete}
      />

      {/* Test Status */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-green-500 mb-4">
              Test Complete!
            </h3>
            <button
              onClick={resetTest}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text Info */}
      <div className="text-base text-gray-500 text-center space-y-2">
        {text.author && <div>Author: {text.author}</div>}
        {text.source && <div>Source: {text.source}</div>}
        <div className="flex justify-center gap-4">
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-base">
            {text.category}
          </span>
          <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-base">
            {text.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
};
