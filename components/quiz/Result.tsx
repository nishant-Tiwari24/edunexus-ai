import React from "react";

interface ResultProps {
  score: number;
  totalQuestions: number;
  incorrectQuestions: {
    question: string;
    correct_answer: string;
  }[];
  onHandleRevision: () => void;
}

const Result: React.FC<ResultProps> = ({
  score,
  totalQuestions,
  incorrectQuestions,
  onHandleRevision,
}) => {
  const percentage = (score / totalQuestions) * 100;
  let message = "";

  if (percentage >= 80) {
    message = "Excellent work! 🌟";
  } else if (percentage >= 50) {
    message = "Good job, but you can do better! 👍";
  } else {
    message = "You might need to review the material. 🤬";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white p-6">
      <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-lg shadow-lg w-full max-w-3xl text-center">
        <h2 className="text-3xl mb-4 font-bold">{message}</h2>
        <p className="text-xl mb-2">
          Your Score: <span className="font-semibold">{score}</span> /{" "}
          {totalQuestions}
        </p>
        <p className="text-lg mb-4">
          Percentage:{" "}
          <span className="font-semibold">{percentage.toFixed(2)}%</span>
        </p>

        {incorrectQuestions.length > 0 && (
          <div className="bg-zinc-800 p-4 rounded-lg shadow-md text-left mb-6">
            <h3 className="text-xl font-semibold mb-3">Incorrect Questions:</h3>
            {incorrectQuestions.map((question, index) => (
              <div key={index} className="mb-4">
                <p className="text-lg">
                  <strong>Q:</strong> {question.question}
                </p>
                <p className="text-md text-green-400">
                  <strong>Correct Answer:</strong> {question.correct_answer}
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onHandleRevision}
          className={`mt-4 py-2 px-6 rounded-lg text-white ${
            percentage >= 80
              ? "bg-green-600 hover:bg-green-500"
              : percentage >= 50
              ? "bg-yellow-600 hover:bg-yellow-500"
              : "bg-red-600 hover:bg-red-500"
          }`}
        >
          Revise Now ❤️‍🔥
        </button>
      </div>
    </div>
  );
};

export default Result;
