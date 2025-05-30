import { useState, useCallback, useEffect, useRef } from "react";
import { TestDuration, TestResult, TextContent } from "../types";
import { storage } from "../utils/storage";

interface TypingTestState {
  isActive: boolean;
  isComplete: boolean;
  currentText: TextContent | null;
  userInput: string;
  startTime: number | null;
  endTime: number | null;
  mistakes: number;
  wpm: number;
  accuracy: number;
  duration: TestDuration;
  charactersTyped: number;
  charactersCorrect: number;
}

interface UseTypingTestReturn extends TypingTestState {
  startTest: (text: TextContent, duration: TestDuration) => void;
  handleInput: (input: string) => void;
  resetTest: () => void;
  getCurrentResult: () => TestResult | null;
}

const calculateWPM = (characters: number, timeInMinutes: number): number => {
  return Math.round(characters / 5 / timeInMinutes);
};

const calculateAccuracy = (correct: number, total: number): number => {
  return total === 0 ? 100 : Math.round((correct / total) * 100);
};

export const useTypingTest = (): UseTypingTestReturn => {
  const [state, setState] = useState<TypingTestState>({
    isActive: false,
    isComplete: false,
    currentText: null,
    userInput: "",
    startTime: null,
    endTime: null,
    mistakes: 0,
    wpm: 0,
    accuracy: 100,
    duration: 60,
    charactersTyped: 0,
    charactersCorrect: 0,
  });

  const timerRef = useRef<number | null>(null);

  const resetTest = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setState({
      isActive: false,
      isComplete: false,
      currentText: null,
      userInput: "",
      startTime: null,
      endTime: null,
      mistakes: 0,
      wpm: 0,
      accuracy: 100,
      duration: 60,
      charactersTyped: 0,
      charactersCorrect: 0,
    });
  }, []);

  const startTest = useCallback(
    (text: TextContent, duration: TestDuration) => {
      resetTest();

      setState((prev) => ({
        ...prev,
        isActive: true,
        currentText: text,
        startTime: Date.now(),
        duration,
      }));

      // Set timer for test duration
      timerRef.current = window.setTimeout(() => {
        setState((prev) => ({
          ...prev,
          isActive: false,
          isComplete: true,
          endTime: Date.now(),
        }));
      }, duration * 1000);
    },
    [resetTest]
  );

  const handleInput = useCallback(
    (input: string) => {
      if (!state.isActive || !state.currentText) return;

      const currentText = state.currentText.content;
      let mistakes = 0;
      let correctChars = 0;

      // Calculate mistakes and correct characters
      for (let i = 0; i < input.length; i++) {
        if (i < currentText.length) {
          if (input[i] === currentText[i]) {
            correctChars++;
          } else {
            mistakes++;
          }
        }
      }

      const timeElapsed =
        (Date.now() - (state.startTime || Date.now())) / 1000 / 60; // in minutes
      const wpm = calculateWPM(correctChars, timeElapsed);
      const accuracy = calculateAccuracy(correctChars, input.length);

      setState((prev) => ({
        ...prev,
        userInput: input,
        mistakes,
        wpm,
        accuracy,
        charactersTyped: input.length,
        charactersCorrect: correctChars,
      }));

      // Check if test is complete (user finished typing)
      if (input.length === currentText.length) {
        if (timerRef.current) {
          window.clearTimeout(timerRef.current);
          timerRef.current = null;
        }

        setState((prev) => ({
          ...prev,
          isActive: false,
          isComplete: true,
          endTime: Date.now(),
        }));
      }
    },
    [state.isActive, state.currentText, state.startTime]
  );

  const getCurrentResult = useCallback((): TestResult | null => {
    if (!state.isComplete || !state.currentText) return null;

    const totalChars = state.currentText.content.length;
    const completion =
      totalChars === 0
        ? 100
        : Math.round((state.charactersTyped / totalChars) * 100);

    return {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      duration: state.duration,
      wpm: state.wpm,
      accuracy: state.accuracy,
      textCategory: state.currentText.category,
      textDifficulty: state.currentText.difficulty,
      mistakes: state.mistakes,
      charactersTyped: state.charactersTyped,
      charactersCorrect: state.charactersCorrect,
      completion,
    };
  }, [state]);

  // Save result when test is complete
  useEffect(() => {
    if (state.isComplete) {
      const result = getCurrentResult();
      if (result) {
        storage.addTestResult(result);
      }
    }
  }, [state.isComplete, getCurrentResult]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    ...state,
    startTest,
    handleInput,
    resetTest,
    getCurrentResult,
  };
};
