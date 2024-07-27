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
import OpenAI from "openai";
import { useParams, useRouter } from "next/navigation";

const quizImages = [quiz1, quiz2, quiz3, quiz4, quiz5, quiz6];

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
  completed: boolean;
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

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
  const [incorrectQuestions, setIncorrectQuestions] = useState<QuizQuestion[]>(
    []
  );
  const [generatingRevision, setGeneratingRevision] = useState(false);
  const router = useParams();
  const router1 = useRouter();
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
    } else {
      setIncorrectQuestions([
        ...incorrectQuestions,
        quizQuestions[currentQuestionIndex],
      ]);
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

  const generateRevisionContent = async () => {
    const prompt = `
  You are a knowledgeable tutor. Based on the following incorrect quiz questions and answers, generate detailed revision notes. For each question, provide explanations, clarify why the provided answer is correct in detailed manner with examples and codes , and highlight any common misconceptions, codes and etc.
  Dont generate per question in markdown i want whole response in Markdown
  Here are the questions and correct answers:

  ${incorrectQuestions
    .map(
      (question, index) =>
        `### Question ${index + 1}
    
    **Q:** ${question.question}
    
    **Correct Answer:** ${question.correct_answer}`
    )
    .join("\n\n")}

  Provide detailed explanations and notes for each question in Markdown format .
  `;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a knowledgeable tutor." },
          { role: "user", content: prompt },
        ],
      });

      const aiContent = completion.choices[0].message.content;

      let markdownContent = "# Revision Content\n\n";
      markdownContent += `## Incorrect Questions and Explanations\n\n`;
      markdownContent += aiContent;

      return markdownContent;
    } catch (error) {
      console.error("Error generating revision content:", error);
      return "# Revision Content\n\nError generating content.";
    }
  };

  if (loading) {
    return (
      <div className="flex w-[100vw] h-[100vh] items-center justify-center">
        <QuizLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <QuizLoader />
      </div>
    );
  }

  const responseId = router.responses;
  const jsoncontentId = router.jsoncontent;
  if (showResult) {
    const handleRevision = async () => {
      setGeneratingRevision(true);
      const revisionContent = await generateRevisionContent();
      localStorage.setItem("revisionContent", revisionContent); // Save the revision content to localStorage
      setGeneratingRevision(false);
      router1.push(`/roadmap/${responseId}/${jsoncontentId}/revision`); // Navigate to the revision route
    };

    return (
      <>
        {generatingRevision ? (
          <div className="flex min-h-screen items-center justify-center">
            <QuizLoader />
          </div>
        ) : (
          <Result
            score={score}
            totalQuestions={quizQuestions.length}
            incorrectQuestions={incorrectQuestions.map((question) => ({
              question: question.question,
              correct_answer: question.correct_answer,
            }))}
            onHandleRevision={handleRevision}
          />
        )}
      </>
    );
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
            {currentQuestionIndex === quizQuestions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
