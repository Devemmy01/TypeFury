import { ThemeProvider } from "./components/theme-provider";
import logo from "./assets/logo.png";
import { ModeToggle } from "./components/mode-toggle";
import GeneratedWords from "./components/GeneratedWords";
import CountDown from "./components/CountDown";
import { faker } from "@faker-js/faker";
import Restart from "./components/Restart";
import Result from "./components/Result";
import Typing from "./components/Typing";

const words = faker.word.words(25);
function App() {
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

      <div className="flex flex-col gap-6 justify-center font-mono tracking-wider px-4 md:px-36 pt-24">
        <CountDown timeLeft={30} />
        <WordsCont>
          <GeneratedWords words={words} />
          <Typing Input={"test"} className="absolute inset-0" />
        </WordsCont>
        <Restart onRestart={() => null} className="mx-auto mt-10" />
        <Result
          errors={0}
          accuracy={100}
          total={200}
          className="mx-auto mt-10"
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

export default App;
