
const CountDown = ({ timeLeft }: { timeLeft: number }) => {
  return (
    <h2 className="text-[#fbae39] font-bold">Time: {timeLeft}</h2>
  )
}

export default CountDown;