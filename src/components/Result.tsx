import { motion } from "framer-motion";
const Result = ({
  errors,
  accuracy,
  total,
  className,
}: {
  errors: number;
  accuracy: number;
  total: number;
  className?: string;
}) => {
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };

  return (
    <motion.ul
      className={`flex flex-col items-center text-green-700 space-y-3 ${className}`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0 }}
        className="text-4xl font-semibold"
      >
        Result
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0.5 }}
      >
        Accuracy: {accuracy}{'%'}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1 }}
        className="text-red-500"
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1.4 }}
      >
        Characters Typed: {total}
      </motion.li>
    </motion.ul>
  );
};

export default Result;
