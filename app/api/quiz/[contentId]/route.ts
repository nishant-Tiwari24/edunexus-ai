import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const contentId = parseInt(url.pathname.split("/").pop());

  if (isNaN(contentId)) {
    return NextResponse.json({ message: "Invalid contentId" }, { status: 400 });
  }

  const existingQuiz = await prisma.quiz.findFirst({
    where: { ContentId: contentId },
  });

  if (existingQuiz) {
    return NextResponse.json({ quiz: existingQuiz }, { status: 200 });
  }

  const content = await prisma.content.findFirst({
    where: { id: contentId },
  });

  if (!content) {
    return NextResponse.json({ message: "Content not found" }, { status: 404 });
  }

  const prompt = `You are an AI assistant tasked with creating multiple quiz entries on content: ${content.content}. Please generate 10 quiz entries in json format with the following criteria, Dont send anything else in response:
  1. 4 tough questions
  2. 2 medium questions
  3. 4 easy questions
  
  For each quiz entry, provide the following fields:
  1. Question: A well-formed question appropriate for the difficulty level.
  2. Options: A JSON array of possible answers, including both correct and incorrect options.
  3. Correct Answer: The correct answer that corresponds to one of the options.
  7. Completed: A boolean indicating whether the quiz is completed.
  8. Send me only what I asked for
  9. data should be in this format {
    "quizcontent": [
      {
        "options": [
          "op1",
          "op2",
          "op3",
          "op4"
        ],
        "question": "What is the time complexity of an algorithm that performs a binary search on a sorted array?",
        "completed": true,
        "correct_answer": "O(log n)"
      },
    ]
  }`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "gpt-4o-mini",
    });

    const responseContent = completion.choices[0].message.content;
    const jsonString = responseContent.substring(
      responseContent.indexOf("["),
      responseContent.lastIndexOf("]") + 1
    );
    const quizzes = JSON.parse(jsonString);

    const createdQuiz = await prisma.quiz.create({
      data: {
        quizcontent: quizzes,
        ContentId: contentId,
      },
    });

    return NextResponse.json({ quiz: createdQuiz });
  } catch (error) {
    console.error("Error generating or parsing quizzes:", error);
    return NextResponse.json(
      { message: "Error generating or parsing quizzes" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { contentId: string } }
) {
  const contentId = parseInt(params.contentId);

  if (isNaN(contentId)) {
    return NextResponse.json({ message: "Invalid contentId" }, { status: 400 });
  }

  const quiz = await prisma.quiz.findFirst({
    where: { ContentId: contentId },
  });

  if (!quiz) {
    return NextResponse.json(
      { message: "No quizzes found for this contentId" },
      { status: 404 }
    );
  }

  return NextResponse.json(quiz, { status: 200 });
}
