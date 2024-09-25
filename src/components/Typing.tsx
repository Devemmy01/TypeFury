import Caret from "./Caret";


const Typing = ({
  Input,
  className,
}: {
  Input: string;
  className?: string;
}) => {
  const typedCharacters = Input.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => {
        return <Character key={`${char}_${index}`} char={char} />;
      })}
      <Caret />
    </div>
  );
};

const Character = ({ char }: { char: string }) => {
  return <div className="text-green-700 font-bold">{char}</div>;
};

export default Typing;
