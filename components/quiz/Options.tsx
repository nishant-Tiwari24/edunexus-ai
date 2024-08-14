import { motion } from "framer-motion";

interface OptionsProps {
  options: string[];
  selectedOption: string | null;
  correctAnswer: string;
  handleOptionClick: (option: string) => void;
}

const Options: React.FC<OptionsProps> = ({
  options,
  selectedOption,
  correctAnswer,
  handleOptionClick,
}) => {
  const hoverAnimation = {
    scale: 1.05,
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {options.map((option) => (
        <motion.button
          key={option}
          onClick={() => handleOptionClick(option)}
          className={`w-full p-3 rounded-lg ${
            selectedOption === option
              ? option === correctAnswer
                ? "bg-green-600"
                : "bg-red-600"
              : "bg-zinc-800 hover:bg-zinc-700"
          }`}
          whileHover={hoverAnimation}
        >
          {option}
        </motion.button>
      ))}
    </div>
  );
};

export default Options;
