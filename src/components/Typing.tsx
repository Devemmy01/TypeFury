import { useEffect, useRef } from "react";
import Caret from "./Caret";
import cn from "classnames";

const Typing = ({
  words,
  Input,
  className,
}: {
  words: string;
  Input: string;
  className?: string;
}) => {
  const typedCharacters = Input.split("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={`relative ${className}`} onClick={() => inputRef.current?.focus()}>
      {typedCharacters.map((char, index) => {
        return <Character key={`${char}_${index}`} actual={char} expected={words[index]} />;
      })}
      <Caret />
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0 w-0 h-0"
        onBlur={() => inputRef.current?.focus()}
      />
    </div>
  );
};

const Character = ({
  actual,
  expected,
}: {
  actual: string;
  expected: string;
}) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";

  return (
    <span
      className={cn({
        "text-red-500": !isCorrect && !isWhiteSpace,
        "text-green-600": isCorrect && !isWhiteSpace,
        "bg-red-500/50": !isCorrect && isWhiteSpace,
      })}
    >
      {expected}
    </span>
  );
};

export default Typing;