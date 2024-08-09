"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { QuizLoader } from "../quiz/Loader";

interface MegaAssessment {
  hints: string[];
  question: string;
  completed: boolean;
  keyConcepts: string[];
  commonMistakes: string[];
  correctAnswers: string[];
}

const MegaAssessmentsPage: React.FC = () => {
  const [assessments, setAssessments] = useState<MegaAssessment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAnswerWarning, setShowAnswerWarning] = useState<boolean>(false);
  const [currentAnswer, setCurrentAnswer] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const params = useParams();
  const contentId = params.content;

  useEffect(() => {
    const fetchMegaQuestions = async () => {
      try {
        const res = await fetch(`/api/megaquestions/${contentId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch assessments");
        }
        const data = await res.json();
        setAssessments(data.megaAssessment);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMegaQuestions();
  }, [contentId]);

  const toggleDropdown = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.toggle("hidden");
    }
  };

  const handleShowAnswer = (answers: string[]) => {
    setCurrentAnswer(answers);
    setShowAnswerWarning(true);
  };

  const closeAnswerWarning = () => {
    setShowAnswerWarning(false);
  };

  const submitSolution = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Handle file upload here
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (error) {
    return <QuizLoader />;
  }

  return (
    <div className="p-10 max-w-7xl mx-auto text-white">
      <h1 className="text-3xl font-semibold text-purple-200 mb-8">
        🚀 Conquer These Mega Assessments 🚀
      </h1>
      {assessments && assessments.length > 0 ? (
        assessments.map((assessment, index) => (
          <div
            key={index}
            className="mb-3 p-4 bg-zinc-900 border-[1px] border-zinc-800 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl w-[800px] font-extralight text-zinc-300 mb-4">
                Question: {assessment.question}
              </h2>
              <div className="flex items-center">
                <button
                  onClick={() => toggleDropdown(`hints-${index}`)}
                  className="bg-zinc-800  border-zinc-700 border-[1px] text-white px-2 py-1 text-sm rounded-lg mr-2"
                >
                  Show Hints
                </button>
                <button
                  onClick={submitSolution}
                  className="bg-zinc-800 border-zinc-700 border-[1px] text-white px-2 py-1 text-sm rounded-lg"
                >
                  Submit Solution
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h3
                className="text-sm w-[135px] p-1 text-center rounded-lg bg-sky-700 text-blue-300 mb-2 cursor-pointer"
                onClick={() => toggleDropdown(`keyConcepts-${index}`)}
              >
                Key Concepts
              </h3>
              <ul id={`keyConcepts-${index}`} className="list-disc pl-6 hidden">
                {assessment.keyConcepts.map((concept, idx) => (
                  <li key={idx} className=" list-decimal text-blue-200">
                    {concept}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h3
                className="text-sm w-[135px] p-1 text-center rounded-lg bg-amber-600 text-yellow-300 mb-2 cursor-pointer"
                onClick={() => toggleDropdown(`commonMistakes-${index}`)}
              >
                Common Mistakes
              </h3>
              <ul
                id={`commonMistakes-${index}`}
                className="list-disc pl-6 hidden"
              >
                {assessment.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="list-decimal text-yellow-200">
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h3
                className="text-sm w-[135px] p-1 text-center rounded-lg bg-pink-300 text-red-600 mb-2 cursor-pointer"
                onClick={() => handleShowAnswer(assessment.correctAnswers)}
              >
                Correct Answer
              </h3>
            </div>

            <div className="mb-4">
              <ul id={`hints-${index}`} className="list-disc pl-6 hidden">
                {assessment.hints.map((hint, idx) => (
                  <li key={idx} className="list-decimal text-gray-200">
                    {hint}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No assessments found.</p>
      )}

      {showAnswerWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-900 border-zinc-700 border-[1px] text-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold mb-4">Warning ⚠️</h2>
            <p className="mb-4 font-extralight">
              Are you sure you want to see the correct answers?
            </p>
            <div className="flex justify-between">
              <button
                onClick={closeAnswerWarning}
                className="bg-red-500 border-zinc-700 border-[1px] text-white px-3 py-1 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={closeAnswerWarning}
                className="bg-green-600 border-zinc-700 border-[1px] text-white px-3 py-1 rounded-lg"
              >
                Show Answers
              </button>
            </div>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex mt-6">
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default MegaAssessmentsPage;
