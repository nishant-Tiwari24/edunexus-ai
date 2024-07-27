"use client";
import React, { useState, useEffect } from "react";
import QuizImage from "./QuizImage";
import Question from "./Question";
import { QuizLoader } from "./Loader";
import Options from "./Options";
import ProgressBar from "./ProgressBar";
import Result from "./Result";
import quiz1 from "@/public/quiz/quiz1.jpeg";
import quiz2 from "@/public/quiz/quiz2.jpeg";
import quiz3 from "@/public/quiz/quiz3.jpeg";
import quiz4 from "@/public/quiz/quiz4.jpeg";
import quiz5 from "@/public/quiz/quiz5.jpeg";
import quiz6 from "@/public/quiz/quiz6.jpeg";
import { useParams } from "next/navigation";

const quizImages = [quiz1, quiz2, quiz3, quiz4, quiz5, quiz6];

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
  completed: boolean;
}

interface QuizData {
  id: number;
  ContentId: number;
  quizcontent: QuizQuestion[];
}

const Quiz: React.FC = () => {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [randomImage, setRandomImage] = useState(quizImages[0]);
  const router = useParams();
  const ContentId = router.quizId;

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`/api/quiz/${ContentId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: QuizData = await response.json();
        setQuizQuestions(data.quizcontent);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setError(true);
        setTimeout(() => {
          window.location.reload();
        }, 10000);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
    setRandomImage(getRandomImage());
  }, [ContentId]);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * quizImages.length);
    return quizImages[randomIndex];
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (option === quizQuestions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="flex w-[100vw] h-[100vh] items-center justify-center"></div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <QuizLoader />
      </div>
    );
  }

  if (showResult) {
    return <Result score={score} totalQuestions={quizQuestions.length} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className="bg-zinc-900 border-[2px] border-zinc-700 p-6 rounded-lg shadow-md w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Check Your Knowledge! 🌟
        </h1>
        <QuizImage imageSrc={randomImage} />
        <div className="flex justify-between mb-4">
          {quizQuestions.map((_, index) => (
            <div
              key={index}
              className={`w-12 h-12 rounded-full flex items-center justify-around ${
                index === currentQuestionIndex
                  ? "bg-purple-600 border-zinc-600 border-[1px]"
                  : "bg-zinc-700"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <Question question={quizQuestions[currentQuestionIndex].question} />
        <Options
          options={quizQuestions[currentQuestionIndex].options}
          selectedOption={selectedOption}
          correctAnswer={quizQuestions[currentQuestionIndex].correct_answer}
          handleOptionClick={handleOptionClick}
        />
        <ProgressBar
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={quizQuestions.length}
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleNextQuestion}
            className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
