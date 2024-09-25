import { ThemeProvider } from "./components/theme-provider";
import logo from "./assets/logo.png";
import { ModeToggle } from "./components/mode-toggle";
import GeneratedWords from "./components/GeneratedWords";
import Restart from "./components/Restart";
import Result from "./components/Result";
import Typing from "./components/Typing";
import Functionality from "./hooks/Functionality";
import { calculateAccuracyPercentage } from "./utils/helper";

function App() {
  const {words, typed, timeLeft, errors, state, restart, totalTyped} = Functionality()

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <nav className="w-full flex items-center justify-between py-2 px-4 md:px-20 shadow-sm fixed bg-[#edf6f9] dark:bg-black">
        <img
          src={logo}
          className="w-[55px] h-[55px] md:h-[75px] md:w-[75px]"
          alt=""
        />

        <ModeToggle />
      </nav>

      <div className="font-mono tracking-wider px-4 md:px-36 pt-[170px]">
        <CountDown timeLeft={timeLeft} />
        <WordsCont>
          <GeneratedWords key={words} words={words} />
          <Typing words={words} Input={typed} className="absolute inset-0" />
        </WordsCont>
        <Restart onRestart={restart} className="mx-auto mt-10" />
        <Result
        state={state}
          errors={errors}
          accuracy={calculateAccuracyPercentage(errors, totalTyped)}
          total={totalTyped}
          className="mt-10"
        />
      </div>
    </ThemeProvider>
  );
}

const WordsCont = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="relative mt-3 text-3xl leading-relaxed break-all">
      {children}
    </div>
  )
}

const CountDown = ({ timeLeft }: { timeLeft: number }) => {
  return (
    <h2 className="text-[#fbae39] font-bold">Time: {timeLeft}</h2>
  )
}

export default App;