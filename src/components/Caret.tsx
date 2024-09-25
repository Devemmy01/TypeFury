import {motion} from "framer-motion"

const Caret = () => {
  return (
    <motion.div 
        aria-hiddem={true}
        className="inline-block, text-green-700 w-0.5 h-7"
        animate={{opacity: 0}}
        exit={{opacity: 1}}
        initial={{opacity: 1}}
        transition={{repeat: Infinity, duration: 0.8, ease: "easeInOut"}}
    />
  )
}

export default Caret