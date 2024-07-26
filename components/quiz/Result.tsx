import React from "react";

interface ResultProps {
  score: number;
  totalQuestions: number;
}

const Result: React.FC<ResultProps> = ({ score, totalQuestions }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className="bg-gradient-to-br from-purple-800 to-blue-800 p-6 rounded-lg shadow-md w-full max-w-3xl text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-xl mb-4">
          Your Score: {score} / {totalQuestions}
        </p>
      </div>
    </div>
  );
};

export default Result;
