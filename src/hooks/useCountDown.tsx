import { useCallback, useEffect, useRef, useState } from "react";

const useCountDown = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasTimerEnded = timeLeft <= 0;
  const isRunning = interval.current != null;

  const startCountdown = useCallback(() => {
    if (!hasTimerEnded && !isRunning) {
      interval.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
  }, [setTimeLeft, hasTimerEnded, isRunning]);

  const resetCountdown = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    interval.current = null;
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (hasTimerEnded && interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, [hasTimerEnded]);

  useEffect(() => {
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  return { timeLeft, startCountdown, resetCountdown };
};

export default useCountDown;