import { useState, useCallback, useEffect } from "react";
import { countErrors, debug } from "@/utils/helper";
import useWords from "./useWords";
import useCountDown from "./useCountDown";
import useTyping from "./useTyping";

export type State = "start" | "run" | "finish";

const NO_OF_WORDS = 12;
const COUNTDOWN_SEC = 30;

const Functionality = () => {
  const [state, setState] = useState<State>("start");
  const { timeLeft, startCountdown, resetCountdown } = useCountDown(COUNTDOWN_SEC);
  const { words, updateWords } = useWords(NO_OF_WORDS);
  const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTyping(state !== "finish");
  const [errors, setErrors] = useState(0);
  const [highestResult, setHighestResult] = useState<number>(() => {
    return parseInt(localStorage.getItem("highestResult") || "0", 10);
  });

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const restart = useCallback(() => {
    debug("restarting...");
    resetCountdown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

  const sumErrors = useCallback(() => {
    debug(`cursor: ${cursor} - words.length: ${words.length}`);
    const wordsReached = words.substring(0, Math.min(cursor, words.length));
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  useEffect(() => {
    if (!timeLeft && state === "run") {
      debug("time is up...");
      setState("finish");
      sumErrors();
    }
  }, [timeLeft, state, sumErrors]);

  useEffect(() => {
    if (state === "finish") {
      const result = totalTyped - errors;
      if (result > highestResult) {
        setHighestResult(result);
        localStorage.setItem("highestResult", result.toString());
      }
    }
  }, [state, totalTyped, errors, highestResult]);

  useEffect(() => {
    if (areWordsFinished) {
      debug("words are finished...");
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [clearTyped, areWordsFinished, updateWords, sumErrors]);

  return { state, words, typed, errors, restart, timeLeft, totalTyped, highestResult };
};

export default Functionality;