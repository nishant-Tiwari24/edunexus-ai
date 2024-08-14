interface ProgressBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentQuestionIndex,
  totalQuestions,
}) => {
  return (
    <div className="flex justify-between items-center ">
      <div className="w-full bg-zinc-700 rounded-full h-2.5 mr-4">
        <div
          className="bg-lime-600 h-2.5 rounded-full"
          style={{
            width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
