import { formatPercentage } from "@/utils/helper";
import { motion } from "framer-motion";
import { State } from "@/hooks/Functionality";

const Result = ({
  state,
  errors,
  accuracy,
  total,
  className = "",
}: {
  state: State;
  errors: number;
  accuracy: number;
  total: number;
  className?: string;
}) => {
  if(state !== "finish"){
    return null
  }
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };

  return (
    <motion.ul
      className={`flex flex-col items-center text-green-700 space-y-3 ${className}`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 0 }}
        className="text-4xl font-semibold"
      >
        Result
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        Accuracy: {formatPercentage(accuracy)}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1 }}
        className="text-red-500"
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1.4 }}
      >
        Characters Typed: {total}
      </motion.li>
    </motion.ul>
  );
};

export default Result;
