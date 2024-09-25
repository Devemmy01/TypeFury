import { useRef } from "react";
import { MdRefresh } from "react-icons/md";

const Restart = ({
  onRestart: handleRestart,
  className = "",
}: {
  onRestart: () => void;
  className?: string;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    buttonRef.current?.blur();
    handleRestart();
  };
  return (
    <button
      tabIndex={-1}
      ref={buttonRef}
      onClick={handleClick}
      className={`items-center dark:text-white dark:shadow-slate-800 hover:scale-110 transition-transform duration-200 dark:shadow-sm gap-2 px-4 py-2 rounded-md flex shadow-md ${className}`}
    >
      <MdRefresh className="w-6 h-6 text-[#fbae39]" />
      Restart
    </button>
  );
};

export default Restart;
