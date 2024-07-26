import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const contentId = parseInt(url.pathname.split("/").pop());

  if (!contentId) {
    return NextResponse.json(
      { message: "Undefined contentId" },
      { status: 400 }
    );
  }

  const content = await prisma.content.findFirst({
    where: {
      id: contentId,
    },
  });

  if (!content) {
    return NextResponse.json({ message: "Content not found" }, { status: 404 });
  }

  const prompt = `You are an AI assistant tasked with creating multiple quiz entries on content: ${content.content}. Please generate 10 quiz entries with the following criteria:
  1. 4 tough questions
  2. 2 medium questions
  3. 4 easy questions
  
  For each quiz entry, provide the following fields:
  1. Question: A well-formed question appropriate for the difficulty level.
  2. Options: A JSON array of possible answers, including both correct and incorrect options.
  3. Correct Answer: The correct answer that corresponds to one of the options.
  4. Time Started: The timestamp for when the quiz should start (in ISO 8601 format).
  5. Time Ended: The timestamp for when the quiz should end (in ISO 8601 format).
  6. Content ID: An integer representing the ID of the associated content.
  7. Completed: A boolean indicating whether the quiz is completed.`;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    model: "gpt-4o",
  });

  const quizzes = JSON.parse(completion.choices[0].message.content);

  const createdQuizzes = await prisma.quiz.createMany({
    data: quizzes.map((quiz: any) => ({
      question: quiz.question,
      options: quiz.options,
      correct: quiz.correct,
      timeStarted: new Date(quiz.timeStarted),
      timeEnded: new Date(quiz.timeEnded),
      ContentId: quiz.ContentId,
      Completed: quiz.Completed,
    })),
  });

  return NextResponse.json({ quizzes: createdQuizzes });
}
