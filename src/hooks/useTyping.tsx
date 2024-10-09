import { useCallback, useState, useRef } from "react";

const useTyping = (enabled: boolean) => {
  const [cursor, setCursor] = useState(0);
  const [typed, setTyped] = useState<string>("");
  const totalTyped = useRef(0);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!enabled) return;
      if (event.key === "Backspace") {
        setTyped((prev) => prev.slice(0, -1));
        setCursor((cursor) => cursor - 1);
        totalTyped.current -= 1;
        event.preventDefault();
      }
    },
    [enabled]
  );

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!enabled) return;
      const { value } = event.target;
      const lastChar = value.slice(-1);

      if (lastChar !== "") {
        setTyped((prev) => prev + lastChar);
        setCursor((cursor) => cursor + 1);
        totalTyped.current += 1;
      }

      event.target.value = ""; // Clear the input value
    },
    [enabled]
  );

  const clearTyped = useCallback(() => {
    setTyped("");
    setCursor(0);
  }, []);

  const resetTotalTyped = useCallback(() => {
    totalTyped.current = 0;
  }, []);

  return {
    typed,
    cursor,
    clearTyped,
    resetTotalTyped,
    totalTyped: totalTyped.current,
    handleInput,
    handleKeyDown,
  };
};

export default useTyping;
